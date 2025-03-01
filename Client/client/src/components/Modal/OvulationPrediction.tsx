import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SparklesIcon } from "lucide-react";
import useAuth from "@/hooks/auth";

interface OvulationPredictionResult {
  ovulationDate: string;
  fertileWindow: string;
  nextPeriod: string;
  avgCycleLength: number;
}

interface CalculationResult {
  message: string;
  data: OvulationPredictionResult | null;
}

const calculateOvulation = (dates: string[]): CalculationResult => {
  useAuth();
  if (dates.length < 2) return {
    message: "Please enter at least two cycle dates.",
    data: null
  };

  // Sort dates chronologically
  const sortedDates = [...dates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  // Calculate cycle lengths between consecutive periods
  const cycleLengths: number[] = [];
  for (let i = 1; i < sortedDates.length; i++) {
    const daysDiff = Math.round(
      (new Date(sortedDates[i]).getTime() - new Date(sortedDates[i - 1]).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    // Only include reasonable cycle lengths (typically 21-40 days)
    if (daysDiff > 20 && daysDiff < 41) {
      cycleLengths.push(daysDiff);
    }
  }

  if (cycleLengths.length === 0) return {
    message: "Unable to calculate. Please check your dates.",
    data: null
  };

  // Calculate average cycle length
  const avgCycleLength = Math.round(
    cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length
  );

  // Most women ovulate 12-16 days before their next period
  // Instead of using a fixed 14 days from the start of the period
  const avgLutealPhase = 14;
  
  // Calculate from most recent period
  const lastPeriodDate = new Date(sortedDates[sortedDates.length - 1]);
  
  // Calculate next ovulation
  const nextOvulation = new Date(lastPeriodDate);
  nextOvulation.setDate(lastPeriodDate.getDate() + avgCycleLength - avgLutealPhase);
  
  // Calculate fertile window (5 days before ovulation plus day of ovulation)
  const fertileStart = new Date(nextOvulation);
  fertileStart.setDate(nextOvulation.getDate() - 5);
  
  // Calculate next period
  const nextPeriod = new Date(lastPeriodDate);
  nextPeriod.setDate(lastPeriodDate.getDate() + avgCycleLength);

  return {
    message: "Success",
    data: {
      ovulationDate: nextOvulation.toDateString(),
      fertileWindow: `${fertileStart.toDateString()} to ${nextOvulation.toDateString()}`,
      nextPeriod: nextPeriod.toDateString(),
      avgCycleLength
    }
  };
};

const OvulationPrediction = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [inputDate, setInputDate] = useState("");
  const [prediction, setPrediction] = useState<OvulationPredictionResult | null>(null);
  const [error, setError] = useState("");

  const addDate = () => {
    if (!inputDate) return;
    setDates([...dates, inputDate]);
    setInputDate("");
  };

  const removeDate = (index: number) => {
    const newDates = [...dates];
    newDates.splice(index, 1);
    setDates(newDates);
    // Reset prediction when data changes
    setPrediction(null);
    setError("");
  };

  const predictOvulation = () => {
    const result = calculateOvulation(dates);
    if (result.data) {
      setPrediction(result.data);
      setError("");
    } else {
      setPrediction(null);
      setError(result.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <SparklesIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900">Ovulation Prediction</h3>
        <p className="text-gray-600 mb-4">Enter your last period dates to predict your next ovulation date.</p>
        
        <div className="flex gap-2 mb-4">
          <Input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={addDate}>Add</Button>
        </div>
        
        {dates.length > 0 && (
          <div className="mb-4 text-left">
            <p className="text-sm text-gray-700 mb-1">Your period dates:</p>
            <ul className="text-gray-700 text-sm">
              {dates.map((date, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>• {new Date(date).toDateString()}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeDate(index)}
                    className="h-6 text-gray-500 hover:text-red-500"
                  >
                    ✕
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Button onClick={predictOvulation} className="w-full">Predict Ovulation</Button>
        
        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}
        
        {prediction && (
          <div className="mt-4 text-left">
            <p className="text-lg text-blue-600 font-semibold">Next Ovulation: {prediction.ovulationDate}</p>
            <p className="mt-1 text-sm text-gray-700">Fertile Window: {prediction.fertileWindow}</p>
            <p className="mt-1 text-sm text-gray-700">Next Period: {prediction.nextPeriod}</p>
            <p className="mt-1 text-sm text-gray-700">Average Cycle Length: {prediction.avgCycleLength} days</p>
            <p className="mt-3 text-xs text-gray-500 italic">This is an estimate based on your historical data. Individual cycles may vary.</p>
          </div>
        )}
      </Card>
    </section>
  );
};

export default OvulationPrediction;