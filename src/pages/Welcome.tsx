import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Gift, Joystick } from 'lucide-react';
import { motion } from 'framer-motion';
import { resetGameState } from '../utils/storage';

export default function Welcome() {
  const navigate = useNavigate();

  const startQuest = () => {
    resetGameState();
    navigate('/trivia');
  };

  const contributeToQuest = () => {
    navigate('/contribute');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-8"
    >
      {/* Retro Game Header */}
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48 mx-auto mb-8"
        >
          <img
            src="/emily-avatar.png"
            alt="Emily's Avatar"
            className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white"
          />
          <motion.div 
            className="absolute -top-4 -right-4 w-12 h-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-full h-full text-purple-500" />
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -left-4 w-12 h-12"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-full h-full text-rose-500" />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          EmilyQuest
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 italic mb-8"
        >
          The Interactive Birthday Game No One Asked For, But Everyone Will Love
        </motion.p>
      </div>

      {/* Origin Story */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-xl p-8 mb-8 border-2 border-purple-200"
      >
        <p className="text-lg text-gray-700 mb-6">
          On May 1, 1982, in the exotic land of Milwaukee, Wisconsin, a baby girl emerged into the world with a powerful gift:
          <br />
          <span className="font-semibold text-purple-600">Unmatched charm, suspicious levels of confidence, and a deep-rooted fear of skunks.</span>
        </p>
        
        <div className="space-y-2 text-center mb-6">
          <p className="text-xl font-bold text-gray-800">Her name? Emily.</p>
          <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Her destiny? To be the most legendary sister, friend, trivia subject, and roller-skating enthusiast of all time.
          </p>
        </div>
      </motion.div>

      {/* Game Instructions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
          <Joystick className="w-6 h-6 text-purple-500" />
          The Game Is Simple:
        </h2>
        
        <div className="space-y-4 text-lg">
          <div className="flex items-center gap-3 text-gray-700">
            <span className="text-2xl">✅</span>
            <span>Survive the Trivia Round (she once ate what?!)</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <span className="text-2xl">😳</span>
            <span>Face the Gotcha Round (mystery bacteria? frog wizard??)</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <span className="text-2xl">🎁</span>
            <span>Unlock the Final Surprise (we promise it's not another candle)</span>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p className="italic">
            This is your chance to relive the chaos, the cuddles, the questionable fashion phases — and celebrate Emily the way the universe intended:
            <br />
            <span className="font-semibold text-purple-600">With jokes, heart, and a mildly competitive interface.</span>
          </p>
        </div>
      </motion.div>

      {/* Credits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-12"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">🤔 Who Made This?</h3>
        <p className="text-gray-600 italic">
          People who love Emily. Possibly too much.<br />
          Definitely enough to turn her life into a web-based emotional rollercoaster.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <motion.button
          onClick={startQuest}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full 
                   text-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 
                   flex items-center justify-center gap-2"
        >
          <Gift className="w-6 h-6" />
          Start the Quest
        </motion.button>
        
        <motion.button
          onClick={contributeToQuest}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full 
                   text-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300"
        >
          Add Your Memory to Emily's Story
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center mt-8 text-gray-500 italic"
      >
        Best played with wine, WiFi, and waterproof mascara.
      </motion.div>
    </motion.div>
  );
}