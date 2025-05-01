import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Unlock as UnlockIcon } from 'lucide-react';
import { getGameState, updateGameState } from '../utils/storage';

export default function Unlock() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const gameState = getGameState();
      if (gameState.answeredTriviaCount >= 3 && gameState.gotchaPassed) {
        updateGameState({ unlockedFinal: true });
        navigate('/final');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-8">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Lock className="w-full h-full text-purple-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <UnlockIcon className="w-full h-full text-green-500" />
        </motion.div>
      </div>

      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold text-gray-800 mb-4"
      >
        Unlocking Your Special Surprise...
      </motion.h2>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Trivia Progress</span>
            <span className="text-green-500">Complete ✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Gotcha Round</span>
            <span className="text-green-500">Complete ✓</span>
          </div>
          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}