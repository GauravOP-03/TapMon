import { motion } from "framer-motion";
import VitalsMonitor from "@/components/VitalsMonitor";
import { EducationCard } from "@/components/EducationCard";
import { Chatbot } from "@/components/Chatbot";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PMSPCOSFeatures from "@/components/PMSPCOSFeatures";
import useAuth from "@/hooks/auth";

const educationContent = [
  {
    title: "Understanding Tampons",
    content:
      "Tampons are menstrual products designed for internal use, providing comfort and discreet protection. Made from soft, highly absorbent materials like cotton, they are available in various sizes to accommodate different flow levels. Proper usage ensures safety and effectiveness. Regular changes, ideally every 4 to 8 hours, are crucial to maintaining hygiene and preventing infections, including the rare but serious Toxic Shock Syndrome (TSS). Understanding how to choose the right tampon based on absorbency and personal comfort is key to a healthy and stress-free period experience.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    title: "Advantages of IoT-Based TamPon",
    content:
      "IoT-based TapMon revolutionizes health monitoring by continuously tracking temperature and heart rate in real time. This technology provides early detection of irregularities, making it an invaluable tool for proactive health management. It is especially beneficial for athletes, patients with chronic conditions, and industrial workers, offering personalized insights and automated alerts. With seamless cloud integration, TapMon allows users and healthcare providers to analyze trends over time, leading to better health decisions. Its ability to operate remotely and efficiently ensures reliable, 24/7 monitoring, contributing to improved well-being and safety.",
    image: "https://images.unsplash.com/photo-1556228578-567ba127e37f",
  },
  {
    title: "Safe Usage Guidelines",
    content:
      "Maintaining proper hygiene when using tampons is essential to prevent infections and complications. Always wash your hands thoroughly before insertion and removal to avoid introducing bacteria. Choose the lowest absorbency necessary for your flow to minimize the risk of Toxic Shock Syndrome (TSS). Never wear a tampon for more than 8 hours, and consider alternating with pads or menstrual cups when possible. If you notice symptoms such as fever, rash, dizziness, or discomfort, remove the tampon immediately and seek medical attention. Prioritizing safety ensures a comfortable and worry-free menstrual experience.",
    image: "https://images.unsplash.com/photo-1516841273335-e39b37888115",
  },
  {
    title: "Understanding Your Cycle",
    content:
      "Tracking your menstrual cycle is crucial for predicting periods, understanding body changes, and managing symptoms effectively. A typical cycle lasts around 28 days, though variations are normal. Keeping a record of cycle length, symptoms, and overall well-being can help identify irregularities and potential health concerns. Our advanced monitoring system enables users to track not only their menstrual cycle but also important health indicators like heart rate and temperature fluctuations. By staying informed about your body's natural rhythm, you can make better health decisions and prepare for each phase of your cycle.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  },
  {
    title: "Environmental Impact",
    content:
      "The growing awareness of environmental sustainability has led to increased demand for eco-friendly menstrual products. Traditional tampons often contain synthetic materials and plastic applicators, contributing to waste. Choosing organic cotton tampons, biodegradable options, or reusable alternatives such as menstrual cups and period underwear can significantly reduce environmental impact. Many brands now prioritize sustainability without compromising on comfort and protection. Making informed choices about menstrual products helps preserve the environment while ensuring safe and effective menstrual care.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
  },
  {
    title: "Menstrual Health Education",
    content:
      "Understanding the connection between menstruation and overall health is vital for long-term well-being. Regular monitoring of vital signs such as heart rate and body temperature during menstruation can reveal patterns and potential health concerns. Our innovative system provides continuous tracking, helping users identify changes that may indicate hormonal imbalances, stress, or underlying medical conditions. With accurate, real-time data, individuals can take proactive steps to improve their menstrual health and seek medical advice when necessary. Education and awareness empower individuals to manage their health with confidence.",
    image: "https://img.freepik.com/free-vector/flat-design-menopause-illustration_23-2149375318.jpg?t=st=1740736829~exp=1740740429~hmac=a0c4a160bd39d3ae7b108de0774c609dc52cfa99e8d11d85f58a262688f57113&w=800",
  },
];

export default function Home() {
  useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-100/30 rounded-full blur-2xl -z-10" />

      {/* Medical themed icons */}
      <svg
        className="absolute top-20 right-20 text-primary/10 w-24 h-24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.5 12H9v-1.5H7.5V12h1.5v-1.5H10V12h1.5v1.5H10V15zm3.5-4h4v1.5h-4V11zM6 7h12v1.5H6V7z"
        />
      </svg>

      <svg
        className="absolute bottom-20 left-20 text-primary/10 w-20 h-20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 relative"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-4 text-center leading-tight font-display"
        >
          Innovative Women's Health Monitoring
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Empowering women through technology and education. Monitor your health
          metrics and learn about menstrual wellness in one comprehensive
          platform.
        </motion.p>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Vital Signs Monitor</h2>
          <VitalsMonitor />
        </section>

        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6"
          >
            Educational Resources
          </motion.h2>
          <div className="grid gap-6">
            {educationContent.map((content, index) => (
              <motion.div
                key={content.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <EducationCard {...content} delay={0} />
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
      <PMSPCOSFeatures/>
      <FAQ />
      <Footer />
      <Chatbot />
    </div>
  );
}
