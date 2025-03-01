import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-purple-600 py-8 px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h3 className="text-2xl font-semibold mb-2 text-shadow">
          Stay Connected
        </h3>
        <p className="mb-4 text-gray-200">
          Follow us on social media for the latest updates and health tips.
        </p>

        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="#"
            className="hover:text-gray-300 transition transform hover:scale-110"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition transform hover:scale-110"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition transform hover:scale-110"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>

        <p className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} TapMon. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
