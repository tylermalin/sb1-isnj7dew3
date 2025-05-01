import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Laugh, ArrowRight, CheckCircle2 } from 'lucide-react';
import { gotchaQuestions } from '../data';
import { updateGameState } from '../utils/storage';

export default function Gotcha() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const currentQuestion = gotchaQuestions[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (!showAnswer) {
      setShowAnswer(true);
      if (!answeredQuestions.includes(currentQuestion.id)) {
        const newAnswered = [...answeredQuestions, currentQuestion.id];
        setAnsweredQuestions(newAnswered);
        
        if (newAnswered.length === gotchaQuestions.length) {
          updateGameState({ gotchaPassed: true });
        }
      }
    } else {
      if (currentQuestionIndex < gotchaQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setUserAnswer('');
        setShowAnswer(false);
      } else {
        navigate('/unlock');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <Laugh className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">The Gotcha Round!</h2>
        <p className="text-lg text-gray-600">
          Question {currentQuestionIndex + 1} of {gotchaQuestions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / gotchaQuestions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>

          {!showAnswer ? (
            <div className="space-y-4">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="What's your wildest guess?"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 
                         focus:border-transparent resize-none"
                rows={3}
              />
              <button
                onClick={handleSubmitAnswer}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 
                         rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 
                         transition-all duration-300 flex items-center justify-center gap-2"
              >
                Reveal Truth
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg text-yellow-700 font-medium">
                      {currentQuestion.answer}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmitAnswer}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 
                         rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 
                         transition-all duration-300 flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < gotchaQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  'Complete Gotcha Round'
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="text-center text-gray-600">
        <p className="font-medium">
          {answeredQuestions.length} of {gotchaQuestions.length} questions answered
        </p>
        <p className="text-sm mt-2">
          Answer all questions to unlock the next stage!
        </p>
      </div>
    </motion.div>
  );
}