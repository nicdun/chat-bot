import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

export function LoadingDots() {
  return (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 bg-foreground rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function Preview() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <SparklesIcon className="h-12 w-12 mb-4" />
      <p className="text-lg mb-4">
        Type a new question or select an existing thread from the sidebar.
      </p>
      <LoadingDots />
    </div>
  );
}
