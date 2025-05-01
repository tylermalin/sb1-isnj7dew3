import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { triviaQuestions } from '../data';
import { getGameState, updateGameState } from '../utils/storage';

function Trivia() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const gameState = getGameState();

  React.useEffect(() => {
    if (gameState.answeredTriviaCount >= 3 && gameState.gotchaPassed) {
      navigate('/unlock');
    }
  }, [gameState, navigate]);

  const currentQuestion = triviaQuestions[currentQuestionIndex];

  const getVerdict = (questionIndex: number) => {
    const verdicts = [
      "Fine, we'll give it to ya! 😉",
      "Close Enough! 👌",
      "You do know Emily, don't you? 🎯",
      "A for Effort! 🌟",
      "Fine, we'll give it to ya! 😉"
    ];
    return verdicts[questionIndex % verdicts.length];
  };

  const handleSubmitAnswer = () => {
    if (!showAnswer) {
      setShowAnswer(true);
      if (!answeredQuestions.includes(currentQuestion.id)) {
        const newAnswered = [...answeredQuestions, currentQuestion.id];
        setAnsweredQuestions(newAnswered);
        updateGameState({ answeredTriviaCount: newAnswered.length });
      }
    } else {
      if (currentQuestionIndex < triviaQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setUserAnswer('');
        setShowAnswer(false);
      } else if (answeredQuestions.length >= 3) {
        navigate('/gotcha');
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
        <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Trivia Time!</h2>
        <p className="text-lg text-gray-600">
          Question {currentQuestionIndex + 1} of {triviaQuestions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / triviaQuestions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
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
                placeholder="What's your guess?"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent resize-none"
                rows={3}
              />
              <button
                onClick={handleSubmitAnswer}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 
                         rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 
                         transition-all duration-300 flex items-center justify-center gap-2"
              >
                Check Answer
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-purple-600 font-medium mb-2">Your Answer:</p>
                      <p className="text-lg text-purple-700">{userAnswer || "No answer provided"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-purple-600 font-medium mb-2">Actual Answer:</p>
                      <p className="text-lg text-purple-700 font-medium mb-2">
                        {currentQuestion.answer}
                      </p>
                      <p className="text-purple-600 italic">
                        {currentQuestion.caption}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                  <p className="text-green-600 font-medium">{getVerdict(currentQuestionIndex)}</p>
                </div>
              </div>

              <button
                onClick={handleSubmitAnswer}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 
                         rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 
                         transition-all duration-300 flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < triviaQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  'Complete Trivia Round'
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="text-center text-gray-600">
        <p className="font-medium">
          {answeredQuestions.length} of 3 required questions answered
        </p>
        <p className="text-sm mt-2">
          Answer at least 3 questions to proceed to the next challenge!
        </p>
      </div>
    </motion.div>
  );
}

export default Trivia;