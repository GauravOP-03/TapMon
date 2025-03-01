import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How does TapMon track health metrics?",
    answer:
      "TapMon uses IoT sensors to monitor your temperature and heart rate in real time. The data is processed and displayed in an easy-to-read format to help you stay informed about your health.",
  },
  {
    question: "Is the data stored securely?",
    answer:
      "Yes, TapMon ensures that all health data is encrypted and securely stored in compliance with data privacy regulations.",
  },
  {
    question: "How can I interpret my health data?",
    answer:
      "Our platform provides insights based on your vitals and trends over time. If you notice any irregularities, it's always best to consult a healthcare professional.",
  },
  {
    question: "Can I use TapMon without an internet connection?",
    answer:
      "While real-time data syncing requires an internet connection, TapMon can still collect and store data offline, which will sync once a connection is restored.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-min bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-8 pb-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 text-center mb-8 font-display"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-gray-200 rounded-xl bg-white shadow-md overflow-hidden"
          >
            <button
              className="w-full p-4 flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:bg-gray-100 transition"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 text-gray-600 border-t border-gray-200"
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
