import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3Icon, 
  PlusCircleIcon, 
  ListIcon, 
  TrendingUpIcon,
  TrashIcon, 
  CheckCircleIcon,
  XCircleIcon 
} from "lucide-react";
import useAuth from "@/hooks/auth";

const LifestyleManagement = () => {
  // Define habit categories for better organization
  useAuth()
  const categories = ["Health", "Fitness", "Nutrition", "Mindfulness", "Productivity"];
  
  // Enhanced state management
  interface Habit {
    id: number;
    name: string;
    category: string;
    createdAt: string;
    completed: boolean;
  }

  const [habits, setHabits] = useState<Habit[]>([]);
  const [inputHabit, setInputHabit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Health");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [streaks, setStreaks] = useState<{ [key: number]: number }>({});
  const [activeTab, setActiveTab] = useState("habits");
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    const savedStreaks = localStorage.getItem("streaks");
    
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedStreaks) setStreaks(JSON.parse(savedStreaks));
  }, []);
  
  // Save data to localStorage whenever habits or streaks change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("streaks", JSON.stringify(streaks));
  }, [habits, streaks]);
  
  // Add a new habit with enhanced details
  const addHabit = () => {
    if (!inputHabit.trim()) return;
    
    const newHabit = {
      id: Date.now(),
      name: inputHabit,
      category: selectedCategory,
      createdAt: new Date().toISOString(),
      completed: false
    };
    
    setHabits([...habits, newHabit]);
    setInputHabit("");
  };
  
  // Toggle habit completion status
  const toggleHabitCompletion = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        // Update streak when completing habit
        const updatedStreak = streaks[id] || 0;
        setStreaks({
          ...streaks,
          [id]: habit.completed ? updatedStreak - 1 : updatedStreak + 1
        });
        
        return { ...habit, completed: !habit.completed };
      }
      return habit;
    }));
  };
  
  // Remove a habit
  const removeHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
    // Also remove the streak data
    const updatedStreaks = { ...streaks };
    delete updatedStreaks[id];
    setStreaks(updatedStreaks);
  };
  
  // Generate personalized recommendations based on habits
  const generateRecommendations = () => {
    if (habits.length === 0) {
      setRecommendations(["Please add some habits to get recommendations."]);
      return;
    }
    
    // Count habits by category
    const categoryCounts = habits.reduce((acc: { [key: string]: number }, habit) => {
      acc[habit.category] = (acc[habit.category] || 0) + 1;
      return acc;
    }, {});
    
    const newRecommendations = [];
    
    // Check for balance across categories
    const coveredCategories = Object.keys(categoryCounts);
    const missingCategories = categories.filter(cat => !coveredCategories.includes(cat));
    
    if (missingCategories.length > 0) {
      newRecommendations.push(`Consider adding habits in these areas: ${missingCategories.join(", ")}`);
    }
    
    // Check for habit completion rate
    const completedHabits = habits.filter(h => h.completed).length;
    const completionRate = habits.length > 0 ? (completedHabits / habits.length) * 100 : 0;
    
    if (completionRate < 50) {
      newRecommendations.push("Try to focus on completing your existing habits before adding new ones.");
    } else if (completionRate > 80) {
      newRecommendations.push("Great job keeping up with your habits! Consider challenging yourself with new goals.");
    }
    
    // Add specific recommendations based on categories
    if (categoryCounts["Health"] > 0 && categoryCounts["Fitness"] > 0) {
      newRecommendations.push("Your combined health and fitness habits will create compound benefits!");
    }
    
    if (categoryCounts["Nutrition"] > 0) {
      newRecommendations.push("Maintaining nutritious eating habits is key to overall wellness.");
    }
    
    if (categoryCounts["Mindfulness"] > 0) {
      newRecommendations.push("Regular mindfulness practice can reduce stress and improve focus.");
    }
    
    if (categoryCounts["Productivity"] > 0) {
      newRecommendations.push("Building productivity habits creates a foundation for success in all areas.");
    }
    
    if (newRecommendations.length === 0) {
      newRecommendations.push("Maintain a balanced routine with proper diet, exercise, and relaxation.");
    }
    
    setRecommendations(newRecommendations);
    setActiveTab("recommendations");
  };
  
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <BarChart3Icon className="w-12 h-12 text-indigo-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">Lifestyle Management</h3>
          <p className="text-gray-600">Track your habits and get personalized guidance</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="habits">
              <ListIcon className="w-4 h-4 mr-2" />
              Habits
            </TabsTrigger>
            <TabsTrigger value="add">
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              Add New
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <TrendingUpIcon className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="habits" className="mt-0">
            {habits.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No habits added yet. Start by adding some habits!
              </div>
            ) : (
              <ul className="space-y-2 mb-4">
                {habits.map((habit) => (
                  <li key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`mr-2 ${habit.completed ? "text-green-500" : "text-gray-400"}`}
                        onClick={() => toggleHabitCompletion(habit.id)}
                      >
                        {habit.completed ? <CheckCircleIcon className="h-5 w-5" /> : <XCircleIcon className="h-5 w-5" />}
                      </Button>
                      <div>
                        <span className={`font-medium ${habit.completed ? "line-through text-gray-400" : ""}`}>
                          {habit.name}
                        </span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {habit.category}
                          </Badge>
                          {streaks[habit.id] > 0 && (
                            <Badge className="bg-orange-500 text-white text-xs">
                              {streaks[habit.id]} streak
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500" 
                      onClick={() => removeHabit(habit.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            
            <Button 
              onClick={generateRecommendations} 
              className="w-full mt-4" 
              disabled={habits.length === 0}
            >
              Generate Insights
            </Button>
          </TabsContent>
          
          <TabsContent value="add" className="mt-0">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Habit Name
                </label>
                <Input 
                  type="text" 
                  value={inputHabit} 
                  onChange={(e) => setInputHabit(e.target.value)} 
                  placeholder="Enter a habit..." 
                  className="w-full" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      type="button"
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="text-sm py-1"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={addHabit} 
                className="w-full mt-2" 
                disabled={!inputHabit.trim()}
              >
                Add Habit
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-0">
            {recommendations.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                Click "Generate Insights" to get personalized recommendations.
              </div>
            ) : (
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-indigo-50 rounded-lg">
                    <p className="text-indigo-700">{rec}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
};

export default LifestyleManagement;