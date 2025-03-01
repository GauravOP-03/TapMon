import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  SmileIcon,
  AlarmClockCheckIcon,
  DumbbellIcon,
  UsersIcon,
  ActivityIcon,
  SparklesIcon,
  Activity,
  BarChart3Icon
} from "lucide-react";
import { Link } from "wouter";

const features = [
  { icon: SmileIcon, title: "Mood Tracking", desc: "Log daily emotions & symptoms to recognize patterns.", color: "text-pink-500", link: "/moodTracking" },
  { icon: AlarmClockCheckIcon, title: "Symptom Prediction", desc: "AI-driven insights predict upcoming PMS symptoms.", color: "text-blue-500", link: "/symptomPrediction" },
  { icon: DumbbellIcon, title: "Personalized Tips", desc: "Get tailored advice on diet, exercise & stress relief.", color: "text-green-500", link: "/personalizedTips" },
  { icon: UsersIcon, title: "Community Support", desc: "Join forums & chat with others experiencing similar challenges.", color: "text-purple-500", link: "/chatCommunity" },
  { icon: ActivityIcon, title: "Hormone Tracking", desc: "Monitor estrogen, progesterone, & testosterone trends.", color: "text-red-500", link: "#" },
  { icon: SparklesIcon, title: "Ovulation Prediction", desc: "Wearable integration helps with fertility tracking.", color: "text-yellow-500", link: "/ovulationPrediction" },
  { icon: Activity, title: "Personalized Yoga Guide", desc: "Get tailored yoga recommendations for your needs.", color: "text-indigo-500", link: "/yogaSuggester" },  

  { icon: BarChart3Icon, title: "Lifestyle Management", desc: "Personalized guidance on diet, exercise & wellness.", color: "text-indigo-500", link: "/lifestyleManagement" },
];

const PMSPCOSFeatures = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 md:px-12"
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-6">
          Supporting PMS & PCOS Patients
        </h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-10 text-lg">
          Managing PMS and PCOS can be challenging, but our platform provides <b>personalized tracking, smart insights, and expert-backed recommendations</b> to help you take control of your health.
        </p>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Reusable Feature Card Component
interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  color: string;
  link:string;
}

const FeatureCard = ({ icon: Icon, title, desc, color,link }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-xl transition">
      <Link href={link}>
        <Icon className={`w-12 h-12 ${color} mb-4 justify-self-center`} />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </Link>
    </Card>
  </motion.div>
);

export default PMSPCOSFeatures;
