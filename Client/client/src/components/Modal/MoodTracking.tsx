import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SmileIcon, FrownIcon, MehIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/auth";

const MoodTracking = () => {
  useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  interface MoodResult {
    status: string;
    icon: React.JSX.Element;
    recommendations: string;
    color: string;
  }
  
  const [result, setResult] = useState<MoodResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    "Are you feeling stressed today?",
    "Did you get enough sleep last night?",
    "Have you been eating well recently?",
    "Are you experiencing any physical discomfort?",
    "Have you exercised in the past 48 hours?",
    "Are you feeling motivated today?",
    "Have you taken time for self-care recently?",
    "Are you experiencing any mood swings?",
  ];

  const determineMood = () => {
    const positiveAnswers = Object.values(answers).filter((ans) => ans === "yes").length;
    const positivePercentage = (positiveAnswers / questions.length) * 100;

    let recommendations = "";
    if (answers[0] === "yes") recommendations += "• Try 5 minutes of deep breathing or meditation\n";
    if (answers[1] === "no") recommendations += "• Consider going to bed 30 minutes earlier tonight\n";
    if (answers[2] === "no") recommendations += "• Focus on balanced meals with protein and vegetables\n";
    if (answers[3] === "yes") recommendations += "• Track your symptoms and consider gentle stretching\n";
    if (answers[4] === "no") recommendations += "• Try a 10-minute walk or gentle yoga session\n";

    if (positivePercentage >= 75) {
      return { status: "You're doing well today!", icon: <SmileIcon className="w-14 h-14 text-green-500" />, recommendations: recommendations || "Keep up the good habits!", color: "text-green-600" };
    } else if (positivePercentage >= 40) {
      return { status: "You're having a mixed day.", icon: <MehIcon className="w-14 h-14 text-amber-500" />, recommendations: recommendations || "Try to incorporate some self-care today.", color: "text-amber-600" };
    } else {
      return { status: "You might need extra self-care today.", icon: <FrownIcon className="w-14 h-14 text-red-500" />, recommendations: recommendations || "Consider reaching out to someone you trust.", color: "text-red-600" };
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setResult(determineMood());
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
          <SmileIcon className="w-16 h-16 text-pink-500 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-900">Mood Tracking</h3>
          <p className="text-gray-600 text-lg">Log daily emotions & recognize patterns.</p>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl w-full p-8 rounded-lg bg-white shadow-xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">Daily Mood Check-in</DialogTitle>
            {!showResult && <DialogDescription className="text-lg text-gray-600">Question {questionIndex + 1} of {questions.length}</DialogDescription>}
          </DialogHeader>

          {!showResult ? (
            <div className="space-y-6">
              <Progress value={(questionIndex / questions.length) * 100} className="mt-2" />
              <p className="text-xl font-medium text-center text-gray-800">{questions[questionIndex]}</p>
              <div className="flex justify-center gap-6">
                <Button onClick={() => handleAnswer("yes")} className="px-6 py-3 text-lg">Yes</Button>
                <Button onClick={() => handleAnswer("no")} variant="outline" className="px-6 py-3 text-lg">No</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-6">
              {result && (
                <>
                  {result.icon}
                  <h3 className={`text-2xl font-bold ${result.color}`}>{result.status}</h3>
                  <div className="w-full p-4 bg-gray-50 rounded-lg text-lg">
                    <h4 className="font-semibold mb-2">Recommendations:</h4>
                    <pre className="text-gray-700 whitespace-pre-line">{result.recommendations}</pre>
                  </div>
                </>
              )}
              <Button onClick={resetTracker} className="px-8 py-3 text-lg">Save & Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MoodTracking;