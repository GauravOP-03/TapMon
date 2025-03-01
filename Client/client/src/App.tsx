import { Switch, Route } from "wouter";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import History from "@/pages/History";
import MoodTracking from "@/components/Modal/MoodTracking";
import SymptomPrediction from "@/components/Modal/SymptomPrediction";
import PersonalizedTips from "@/components/Modal/PersonalizedTips";
import ChatCommunity from "@/components/Modal/ChatCommunity";
import OvulationPrediction from "@/components/Modal/OvulationPrediction";
import SignupForm from "@/pages/SignUp";
import NotFound from "@/pages/not-found";
import LoginForm from "@/pages/Login";
import YogaSuggester from "./components/Modal/YogaSuggester";
import LifestyleManagement from "./components/Modal/LifestyleManagement";

function Router() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/history" component={History} />
      <Route path="/moodTracking" component={MoodTracking} />
      <Route path="/symptomPrediction" component={SymptomPrediction} />
      <Route path="/personalizedTips" component={PersonalizedTips} />
      <Route path="/chatCommunity" component={ChatCommunity} />
      <Route path="/ovulationPrediction" component={OvulationPrediction} />
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/lifestyleManagement" component={LifestyleManagement} />
      <Route path="/yogaSuggester" component={YogaSuggester} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Route path="/home"><Navbar /></Route>
      <Route path="/history"><Navbar /></Route>
      <Route path="/mood-tracking"><Navbar /></Route>
      <Route path="/symptom-prediction"><Navbar /></Route>
      <Route path="/personalized-tips"><Navbar /></Route>
      <Route path="/chat-community"><Navbar /></Route>
      <Route path="/ovulation-prediction"><Navbar /></Route>
      <Route path='/lifestyleManagement'><Navbar /></Route>
      <Route path='yogaSuggester'><Navbar /></Route>
      <Route path="/"><Navbar /></Route>

      <main className="flex-grow">
        <Router />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
