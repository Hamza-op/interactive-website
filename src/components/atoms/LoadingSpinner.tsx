import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  progress?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ progress }) => {
  const spinTransition = {
    loop: Infinity,
    ease: 'linear',
    duration: 1,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 z-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={spinTransition}
          className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
        />
        {progress !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            Loading... {progress.toFixed(0)}%
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
