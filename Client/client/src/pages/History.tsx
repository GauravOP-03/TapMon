import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_URL } from "@/config";

export default function History() {
  interface Vital {
    date: string;
    temperature: number;
    heartRate: number;
  }

  const [vitals, setVitals] = useState<Vital[]>([]);

  // Function to fetch vitals data from the backend
  const fetchVitals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/vitals/history`,{
        headers: { Authorization: token },
      });
      console.log(response.data)
      setVitals(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching vitals:", error.response?.data || error.message);
      } else {
        console.error("Error fetching vitals:", error);
      }
    }
  };

  useEffect(() => {
    fetchVitals(); // Initial fetch
    const interval = setInterval(fetchVitals, 10000); // Fetch every 5 sec

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Format data for the chart
  const formattedData = vitals.map((v) => ({
    ...v,
    time: format(new Date(v.date), "HH:mm"), // Updated date format
  }));
  

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-primary mb-8"
      >
        Vitals History
      </motion.h1>

      <div className="grid gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Temperature History</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <LineChart
                width={800}
                height={300}
                data={formattedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="hsl(330, 81%, 60%)"
                  name="Temperature (°C)"
                />
              </LineChart>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate History</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <LineChart
                width={800}
                height={300}
                data={formattedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="heartRate"
                  stroke="hsl(330, 81%, 60%)"
                  name="Heart Rate (BPM)"
                />
              </LineChart>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
