import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DumbbellIcon, SmileIcon, MehIcon, FrownIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/auth";

const PersonalizedTips = () => {
  useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ status: string; icon: React.JSX.Element; recommendations: string; color: string } | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    "Are you maintaining a balanced diet?",
    "Do you exercise regularly?",
    "Are you managing stress effectively?",
    "Do you get at least 7 hours of sleep per night?",
    "Are you staying hydrated throughout the day?",
    "Do you take breaks to relax and unwind?",
    "Have you been spending time outdoors recently?",
    "Do you engage in mindfulness or meditation?"
  ];

  const determineTips = () => {
    const positiveAnswers = Object.values(answers).filter((ans) => ans === "yes").length;
    const positivePercentage = (positiveAnswers / questions.length) * 100;

    let recommendations = "";
    if (answers[0] === "no") recommendations += "• Consider adding more fruits and vegetables to your meals.\n";
    if (answers[1] === "no") recommendations += "• Aim for at least 30 minutes of physical activity daily.\n";
    if (answers[2] === "no") recommendations += "• Practice deep breathing exercises to reduce stress.\n";
    if (answers[3] === "no") recommendations += "• Try to establish a consistent sleep routine.\n";
    if (answers[4] === "no") recommendations += "• Keep a water bottle with you to stay hydrated.\n";

    if (positivePercentage >= 75) {
      return { status: "You're on a great path!", icon: <SmileIcon className="w-14 h-14 text-green-500" />, recommendations: recommendations || "Keep up the healthy habits!", color: "text-green-600" };
    } else if (positivePercentage >= 40) {
      return { status: "There's room for improvement.", icon: <MehIcon className="w-14 h-14 text-amber-500" />, recommendations: recommendations || "Consider making small daily changes.", color: "text-amber-600" };
    } else {
      return { status: "You might need extra care.", icon: <FrownIcon className="w-14 h-14 text-red-500" />, recommendations: recommendations || "Try focusing on one small habit at a time.", color: "text-red-600" };
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setResult(determineTips());
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
          <DumbbellIcon className="w-16 h-16 text-green-500 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-900">Personalized Tips</h3>
          <p className="text-gray-600 text-lg">Get tailored advice on diet, exercise & stress relief.</p>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl w-full p-8 rounded-lg bg-white shadow-xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">Personalized Wellness Tips</DialogTitle>
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

export default PersonalizedTips;