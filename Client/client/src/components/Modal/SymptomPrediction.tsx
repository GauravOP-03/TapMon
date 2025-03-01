import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlarmClockCheckIcon, FrownIcon, MehIcon, SmileIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/auth";

const SymptomPrediction = () => {
  useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{
    status: string;
    icon: React.JSX.Element;
    recommendations: string;
    color: string;
  } | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    "Have you experienced unusual fatigue recently?",
    "Are you feeling more irritable than usual?",
    "Have you had headaches in the past few days?",
    "Are you experiencing bloating or cramps?",
    "Have you noticed any sudden mood swings?",
    "Are you craving specific foods like sweets or salty snacks?",
    "Have you experienced difficulty sleeping lately?",
    "Do you feel more anxious than usual?"
  ];

  const determineSymptoms = () => {
    const positiveAnswers = Object.values(answers).filter((ans) => ans === "yes").length;
    const positivePercentage = (positiveAnswers / questions.length) * 100;

    let recommendations = "";
    if (answers[0] === "yes") recommendations += "• Consider adjusting your sleep schedule to improve energy levels.\n";
    if (answers[3] === "yes") recommendations += "• Drinking warm fluids and light exercise may help with cramps.\n";
    if (answers[5] === "yes") recommendations += "• Try balancing your meals to reduce cravings.\n";
    if (answers[6] === "yes") recommendations += "• Establish a calming bedtime routine to improve sleep.\n";

    if (positivePercentage >= 75) {
      return { status: "You may experience strong PMS symptoms.", icon: <FrownIcon className="w-14 h-14 text-red-500" />, recommendations: recommendations || "Consider tracking your symptoms for better management.", color: "text-red-600" };
    } else if (positivePercentage >= 40) {
      return { status: "Moderate PMS symptoms predicted.", icon: <MehIcon className="w-14 h-14 text-amber-500" />, recommendations: recommendations || "Stay mindful of symptoms and practice self-care.", color: "text-amber-600" };
    } else {
      return { status: "Minimal PMS symptoms expected.", icon: <SmileIcon className="w-14 h-14 text-green-500" />, recommendations: "Keep up healthy habits to maintain balance.", color: "text-green-600" };
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setResult(determineSymptoms());
      setShowResult(true);
    }
  };

  const resetTracker = () => {
    setIsOpen(false);
    setQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-8 bg-white shadow-xl rounded-2xl cursor-pointer hover:shadow-2xl transition-all max-w-lg mx-auto" onClick={() => setIsOpen(true)}>
          <AlarmClockCheckIcon className="w-16 h-16 text-blue-500 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-900">Symptom Prediction</h3>
          <p className="text-gray-600 text-lg">AI-driven insights predict upcoming PMS symptoms.</p>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl w-full p-8 rounded-lg bg-white shadow-xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">Daily Symptom Check-in</DialogTitle>
            {!showResult && <DialogDescription className="text-lg text-gray-600">Question {questionIndex + 1} of {questions.length}</DialogDescription>}
          </DialogHeader>
          {!showResult ? (
            <>
              <Progress value={(questionIndex / questions.length) * 100} className="mt-2" />
              <div className="my-6">
                <p className="text-gray-700 text-lg text-center font-medium mb-6">{questions[questionIndex]}</p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => handleAnswer("yes")} className="w-24">Yes</Button>
                  <Button onClick={() => handleAnswer("no")} variant="outline" className="w-24">No</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-4">
              {result && (
                <>
                  {result.icon}
                  <h3 className={`text-xl font-bold mb-4 ${result.color}`}>{result.status}</h3>
                  <div className="text-left w-full bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Recommendations:</h4>
                    <pre className="whitespace-pre-line text-gray-700">{result.recommendations}</pre>
                  </div>
                  <Button onClick={resetTracker} className="w-full">Log Complete - Save Results</Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SymptomPrediction;
