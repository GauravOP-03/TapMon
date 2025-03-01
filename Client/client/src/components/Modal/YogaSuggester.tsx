import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Activity, SmileIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/auth";

const YogaSuggester = () => {
    useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // Questions to ask the user
  const questions = [
    {
      id: "pain",
      question: "Are you experiencing any pain or cramps?",
      options: ["Yes, severe", "Yes, mild", "No"]
    },
    {
      id: "mood",
      question: "How would you describe your current mood?",
      options: ["Anxious/Stressed", "Tired/Fatigued", "Irritable", "Calm"]
    },
    {
      id: "cycle",
      question: "Which phase of your cycle are you in?",
      options: ["Menstruation", "Pre-menstruation", "Mid-cycle", "Not sure"]
    },
    {
      id: "time",
      question: "How much time do you have for yoga today?",
      options: ["Less than 10 minutes", "10-20 minutes", "More than 20 minutes"]
    }
  ];
  
  // Database of yoga poses
  const yogaPoses = [
    {
      pose: "Child's Pose (Balasana)",
      description: "A gentle resting pose that stretches the back and relieves menstrual cramps.",
      video: "https://www.youtube.com/watch?v=4JaCcp39iVI",
      forPain: ["Yes, severe", "Yes, mild"],
      forMood: ["Anxious/Stressed", "Tired/Fatigued"],
      forCycle: ["Menstruation", "Pre-menstruation"],
      forTime: ["Less than 10 minutes", "10-20 minutes", "More than 20 minutes"]
    },
    {
      pose: "Reclined Bound Angle Pose (Supta Baddha Konasana)",
      description: "This pose helps in reducing anxiety and promotes relaxation.",
      video: "https://www.youtube.com/watch?v=MjUA_MlVUwk",
      forPain: ["Yes, mild", "No"],
      forMood: ["Anxious/Stressed", "Irritable"],
      forCycle: ["Menstruation", "Pre-menstruation", "Mid-cycle", "Not sure"],
      forTime: ["Less than 10 minutes", "10-20 minutes", "More than 20 minutes"]
    },
    {
      pose: "Fish Pose (Matsyasana)",
      description: "A back-bending pose that stimulates the abdominal region, aiding in regulating menstrual cycles.",
      video: "https://www.youtube.com/watch?v=21Yw7Dj2JbM",
      forPain: ["No"],
      forMood: ["Calm", "Tired/Fatigued"],
      forCycle: ["Mid-cycle"],
      forTime: ["10-20 minutes", "More than 20 minutes"]
    },
    {
      pose: "Cat-Cow Pose (Marjaryasana-Bitilasana)",
      description: "A gentle flow between two poses that warms the body and brings flexibility to the spine.",
      video: "https://www.youtube.com/watch?v=4JaCcp39iVI",
      forPain: ["Yes, mild", "No"],
      forMood: ["Anxious/Stressed", "Tired/Fatigued", "Irritable", "Calm"],
      forCycle: ["Menstruation", "Pre-menstruation", "Mid-cycle", "Not sure"],
      forTime: ["Less than 10 minutes", "10-20 minutes", "More than 20 minutes"]
    },
    {
      pose: "Legs Up the Wall (Viparita Karani)",
      description: "A restorative inversion that improves circulation and reduces swelling.",
      video: "https://youtu.be/xmcDj4Bf--0?si=IlsOomYvb2PLBvS5",
      forPain: ["Yes, severe", "Yes, mild"],
      forMood: ["Tired/Fatigued", "Irritable"],
      forCycle: ["Menstruation", "Pre-menstruation"],
      forTime: ["Less than 10 minutes", "10-20 minutes", "More than 20 minutes"]
    },
    {
      pose: "Corpse Pose (Savasana)",
      description: "A relaxation pose that calms the mind and relaxes the body.",
      video: "https://youtu.be/1VYlOKUdylM?si=6PDpeAMo6-y9d3bW",
      forPain: ["Yes, severe", "Yes, mild", "No"],
      forMood: ["Anxious/Stressed", "Tired/Fatigued", "Irritable"],
      forCycle: ["Menstruation", "Pre-menstruation", "Mid-cycle", "Not sure"],
      forTime: ["Less than 10 minutes", "10-20 minutes", "More than 20 minutes"]
    }
  ];
  
  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    const currentQuestion = questions[currentStep];
    const updatedAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(updatedAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate suggestions based on all answers
      generateSuggestions(updatedAnswers);
    }
  };
  
  // Generate pose suggestions based on answers
  const generateSuggestions = (userAnswers) => {
    // Filter poses that match user's answers
    const matchedPoses = yogaPoses.filter(pose => {
      const painMatch = pose.forPain.includes(userAnswers.pain);
      const moodMatch = pose.forMood.includes(userAnswers.mood);
      const cycleMatch = pose.forCycle.includes(userAnswers.cycle);
      const timeMatch = pose.forTime.includes(userAnswers.time);
      
      // A pose is considered a match if it matches at least 3 criteria
      const matchScore = [painMatch, moodMatch, cycleMatch, timeMatch].filter(Boolean).length;
      return matchScore >= 2;
    });
    
    // Sort by most relevant (most matching criteria)
    matchedPoses.sort((a, b) => {
      const aMatches = [
        a.forPain.includes(userAnswers.pain),
        a.forMood.includes(userAnswers.mood),
        a.forCycle.includes(userAnswers.cycle),
        a.forTime.includes(userAnswers.time)
      ].filter(Boolean).length;
      
      const bMatches = [
        b.forPain.includes(userAnswers.pain),
        b.forMood.includes(userAnswers.mood),
        b.forCycle.includes(userAnswers.cycle),
        b.forTime.includes(userAnswers.time)
      ].filter(Boolean).length;
      
      return bMatches - aMatches;
    });
    
    // If no poses match, provide a general recommendation
    if (matchedPoses.length === 0) {
      setSuggestions([yogaPoses[3], yogaPoses[5]]); // Cat-Cow and Corpse pose are generally safe
    } else {
      setSuggestions(matchedPoses.slice(0, 3)); // Top 3 most relevant poses
    }
    
    setShowResults(true);
  };
  
  // Restart the questionnaire
  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setSuggestions([]);
    setShowResults(false);
  };
  
  // Render the current question
  const renderQuestion = () => {
    const currentQuestion = questions[currentStep]; 
    
    return (
      <div className="space-y-6">
        <Progress value={(currentStep / questions.length) * 100} className="mt-2" />
        <p className="text-xl font-medium text-center text-gray-800">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button 
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className="w-full py-3 text-lg"
              variant={index % 2 === 0 ? "default" : "outline"}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };
  
  // Render the results
  const renderResults = () => {
    return (
      <div className="flex flex-col items-center space-y-6">
        <h4 className="text-2xl font-bold text-pink-600">Your Recommended Poses</h4>
        
        <div className="w-full space-y-4">
          {suggestions.map((suggestion, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <h5 className="text-lg font-bold text-gray-800 mb-2">{suggestion.pose}</h5>
              <p className="text-gray-700 mb-3">{suggestion.description}</p>
              <a 
                href={suggestion.video} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-pink-500 inline-block hover:underline"
              >
                Watch Video Tutorial
              </a>
            </motion.div>
          ))}
        </div>
        
        <Button onClick={restart} className="px-8 py-3 text-lg">
          Try Again
        </Button>
      </div>
    );
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
          <Activity className="w-16 h-16 text-pink-500 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-900">Yoga Suggester</h3>
          <p className="text-gray-600 text-lg">Personalized poses for your cycle & mood.</p>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl w-full p-8 rounded-lg bg-white shadow-xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">Yoga Practice Finder</DialogTitle>
            {!showResults && (
              <DialogDescription className="text-lg text-gray-600">
                Question {currentStep + 1} of {questions.length}
              </DialogDescription>
            )}
          </DialogHeader>

          {!showResults ? renderQuestion() : renderResults()}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default YogaSuggester;