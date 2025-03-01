import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_URL } from "@/config";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { Activity, Thermometer, Droplet, FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";

export default function VitalsMonitor() {
  const { toast } = useToast();
  const [vitals, setVitals] = useState({ temperature: 0, heartRate: 0 });

  // Function to generate random vitals
  const generateRandomVitals = () => {
    return {
      temperature: parseFloat((Math.random() * (37.5 - 36) + 36).toFixed(1)), // Normal range: 36 - 37.5°C
      heartRate: Math.floor(Math.random() * (90 - 65) + 65), // Normal range: 65 - 90 BPM
    };
  };

  // Function to send data to the backend
  const saveVitalsToDatabase = async (data: {
      temperature: string; // Normal range: 36 - 37.5°C
      heartRate: number;
    }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BACKEND_URL}/vitals/recieve`, data, {
        headers: { Authorization: token },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error saving vitals:", error.response?.data || error.message);
      } else {
        console.error("Error saving vitals:", error);
      }
    }
  };
  

  useEffect(() => {
    const updateVitals = () => {
      const newVitals = generateRandomVitals();
      setVitals(newVitals);
      saveVitalsToDatabase({ ...newVitals, temperature: newVitals.temperature.toString() });

      // Trigger alert if abnormal
      if (newVitals.temperature > 38.5 || newVitals.temperature < 35) {
        toast({
          title: "Temperature Alert",
          description: `Abnormal temperature detected: ${newVitals.temperature}°C`,
          variant: "destructive",
        });
      }

      if (newVitals.heartRate > 100 || newVitals.heartRate < 60) {
        toast({
          title: "Heart Rate Alert",
          description: `Abnormal heart rate detected: ${newVitals.heartRate} BPM`,
          variant: "destructive",
        });
      }
    };

    updateVitals(); // Initial update
    const interval = setInterval(updateVitals, 10000); // Update every 5 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const data = [
    { title: "Temperature", value: vitals.temperature, unit: "°C", Icon: Thermometer, delay: 0 },
    { title: "Heart Rate", value: vitals.heartRate, unit: "BPM", Icon: Activity, delay: 0.1 },
    { title: "Volume", value: "--", unit: "", Icon: Droplet, delay: 0.2 },
    { title: "pH Value", value: "--", unit: "", Icon: FlaskConical, delay: 0.3 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map(({ title, value, unit, Icon, delay }) => (
        <motion.div
          key={title}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center space-x-2">
              <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                <Icon className="w-6 h-6 text-primary" />
              </motion.div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {value} {unit}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
