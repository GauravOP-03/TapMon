import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EducationCardProps {
  title: string;
  content: string;
  image: string;
  delay?: number;
}

export function EducationCard({
  title,
  content,
  image,
  delay = 0,
}: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl border border-pink-200">
        {/* Top right decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-50">
          <svg viewBox="0 0 100 100" className="w-full h-full text-pink-300">
            <circle cx="75" cy="25" r="20" fill="currentColor" />
            <path
              d="M20 80 Q50 20 80 80"
              stroke="currentColor"
              fill="none"
              strokeWidth="4"
            />
            <circle
              cx="20"
              cy="20"
              r="8"
              fill="currentColor"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Bottom left decorative elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-70">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-purple-200/50"
          >
            <path
              d="M10 90 Q30 60 50 90"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
            />
            <circle cx="25" cy="75" r="15" fill="currentColor" />
            <circle
              cx="85"
              cy="25"
              r="8"
              fill="currentColor"
              className="animate-pulse"
            />
            <circle cx="15" cy="15" r="5" fill="currentColor" />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row relative">
          <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden rounded-t-lg md:rounded-l-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 rounded-t-lg md:rounded-l-lg"
            />
          </div>
          <div className="w-full md:w-2/3 relative p-6">
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl lg:text-4xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-extrabold transition-all duration-300 group-hover:scale-105">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium relative">
                {content}
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
