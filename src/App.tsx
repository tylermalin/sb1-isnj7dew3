import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Welcome from './pages/Welcome';
import Trivia from './pages/Trivia';
import Gotcha from './pages/Gotcha';
import Unlock from './pages/Unlock';
import Final from './pages/Final';
import Contribute from './pages/Contribute';
import { getGameState } from './utils/storage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100">
        <div className="container mx-auto px-4 py-8">
          <header className="flex items-center justify-center mb-8">
            <Heart className="text-rose-500 w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">EmilyQuest</h1>
          </header>
          
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/gotcha" element={<Gotcha />} />
            <Route 
              path="/unlock" 
              element={
                <ProtectedRoute>
                  <Unlock />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/final" 
              element={
                <ProtectedRoute>
                  <Final />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const gameState = getGameState();
  
  if (gameState.answeredTriviaCount >= 3 && gameState.gotchaPassed) {
    return <>{children}</>;
  }
  
  return <Navigate to="/trivia" replace />;
}

export default App;