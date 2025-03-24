import { motion } from "motion/react";

function LoadingDots() {
  return (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 bg-gray-500 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div>
      <LoadingDots />
    </div>
  );
}
