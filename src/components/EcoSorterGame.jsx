import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, RefreshCw, AlertTriangle, CheckCircle, ShieldAlert, Award, Timer, HelpCircle } from 'lucide-react';

const gameItems = [
  { name: 'Broken Smartphone (Swollen Battery)', category: 'recycle', co2: 2.1, desc: 'Swollen batteries are hazardous; chemical recycling is required.' },
  { name: 'Slightly Used Office Laptop', category: 'refurbish', co2: 15.0, desc: 'Refurbishing avoids heavy mining for raw silicon and metals.' },
  { name: 'Banana Peel & Organic Food scraps', category: 'compost', co2: 0.8, desc: 'Composting returns nutrients to soil and reduces landfill methane.' },
  { name: 'Dead Fluorescent Tube Light', category: 'recycle', co2: 1.2, desc: 'Contains mercury; requires specialized recycling processes.' },
  { name: 'Scratched Bluetooth Headphones', category: 'refurbish', co2: 4.5, desc: 'Sanitization and new pads make them resellable in the circular shop.' },
  { name: 'Greasy Cardboard Takeout Box', category: 'compost', co2: 1.0, desc: 'Food grease ruins paper recycling, but composting handles it fine.' },
  { name: 'Old Copper Charger Cables', category: 'recycle', co2: 3.2, desc: 'Copper cores are highly valuable and endlessly recyclable.' },
  { name: 'Dusty but Functional Smartwatch', category: 'refurbish', co2: 6.0, desc: 'A quick factory reset and cosmetic polish readies it for reuse.' }
];

const EcoSorterGame = () => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'finished'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [co2Saved, setCo2Saved] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, text: string } | null
  const [shuffledItems, setShuffledItems] = useState([]);

  // Shuffle items at start
  const startGame = () => {
    const shuffled = [...gameItems].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCo2Saved(0);
    setTimeLeft(45);
    setFeedback(null);
    setGameState('playing');
  };

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('finished');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const handleSort = (choice) => {
    if (feedback) return; // Wait for explanation to be seen/toggled
    const current = shuffledItems[currentIndex];
    const isCorrect = current.category === choice;

    if (isCorrect) {
      setScore(prev => prev + 10);
      setCo2Saved(prev => parseFloat((prev + current.co2).toFixed(1)));
      setFeedback({
        isCorrect: true,
        text: `Correct! ${current.desc} (+10 pts, +${current.co2}kg CO₂ saved)`
      });
    } else {
      setFeedback({
        isCorrect: false,
        text: `Incorrect. "${current.name}" actually belongs in "${current.category.toUpperCase()}". ${current.desc}`
      });
    }

    // Advance after 2.5 seconds
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < shuffledItems.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameState('finished');
      }
    }, 2800);
  };

  // Evaluate final rating
  const getRating = () => {
    if (score >= 60) return { title: 'Carbon Neutral Legend', desc: 'Incredible! You are a circular economy master.', color: 'text-emerald-500' };
    if (score >= 30) return { title: 'Eco-Hero', desc: 'Great job! You know your waste sorting basics.', color: 'text-teal-500' };
    return { title: 'Eco-Novice', desc: 'Keep practicing to reduce your carbon footprint!', color: 'text-amber-500' };
  };

  return (
    <div className="relative max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden mt-16 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Title */}
      <div className="flex items-center justify-between mb-8 relative z-10 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <Leaf className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg md:text-xl">EcoSorter Challenge</h3>
            <p className="text-slate-400 dark:text-slate-500 text-xs">Test your sorting skills & maximize carbon savings</p>
          </div>
        </div>
        {gameState === 'playing' && (
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full font-bold text-sm">
            <Timer className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* State: Idle */}
        {gameState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-8 relative z-10"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 mb-6">
              <Leaf className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-800 dark:text-white mb-3">Green Citizen Mini-Game</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Drag or match circular items into the correct bins: **Chemical Recycle**, **Circular Refurbish**, or **Composting**. Earn mock credits and see how much CO₂ you can save!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold shadow-md hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-0.5 transition duration-300 cursor-pointer"
            >
              Start Sorting
            </button>
          </motion.div>
        )}

        {/* State: Playing */}
        {gameState === 'playing' && shuffledItems.length > 0 && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            {/* Score Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-3 text-center">
                <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Your Score</span>
                <div className="text-xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">{score} pts</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-3 text-center">
                <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Carbon Saved</span>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{co2Saved} kg CO₂</div>
              </div>
            </div>

            {/* Active Item Container */}
            <div className="relative min-h-[180px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-6 mb-8 overflow-hidden">
              <AnimatePresence mode="wait">
                {!feedback ? (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="text-center space-y-4"
                  >
                    <div className="text-4xl">
                      {shuffledItems[currentIndex].category === 'recycle' && '🔋'}
                      {shuffledItems[currentIndex].category === 'refurbish' && '💻'}
                      {shuffledItems[currentIndex].category === 'compost' && '🍎'}
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-800 dark:text-white max-w-lg">
                      {shuffledItems[currentIndex].name}
                    </h4>
                    <div className="inline-flex gap-1 items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>Saves {shuffledItems[currentIndex].co2} kg CO₂</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center p-2"
                  >
                    {feedback.isCorrect ? (
                      <CheckCircle className="w-10 h-10 text-emerald-500 mb-3" />
                    ) : (
                      <ShieldAlert className="w-10 h-10 text-rose-500 mb-3" />
                    )}
                    <p className={`font-bold text-sm max-w-md ${feedback.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {feedback.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sorting Bins Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                disabled={!!feedback}
                onClick={() => handleSort('recycle')}
                className="group py-4 px-5 rounded-2xl bg-teal-50 hover:bg-teal-100/80 dark:bg-teal-950/20 dark:hover:bg-teal-950/40 border border-teal-200/50 dark:border-teal-900/40 text-teal-700 dark:text-teal-400 font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex flex-col items-center gap-1.5"
              >
                <span className="text-xl">♻️</span>
                <span>Chemical Recycle</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Hazardous & Metal/Plastics</span>
              </button>

              <button
                disabled={!!feedback}
                onClick={() => handleSort('refurbish')}
                className="group py-4 px-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex flex-col items-center gap-1.5"
              >
                <span className="text-xl">🛠️</span>
                <span>Circular Shop</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Working electronics & items</span>
              </button>

              <button
                disabled={!!feedback}
                onClick={() => handleSort('compost')}
                className="group py-4 px-5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/40 text-amber-700 dark:text-amber-400 font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex flex-col items-center gap-1.5"
              >
                <span className="text-xl">🍃</span>
                <span>Composting Organic</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Organics, food & paper</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* State: Finished */}
        {gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-6 relative z-10"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 mb-5 animate-bounce">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-1">Challenge Completed!</h4>
            <div className={`font-bold text-sm mb-6 ${getRating().color}`}>
              {getRating().title}
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
              {getRating().desc} You sorted through the items, correctly matched waste categories, and saved a total of **{co2Saved} kg of carbon emissions**!
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 p-5 max-w-sm mx-auto mb-8 space-y-2.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 dark:text-slate-500">Correct Matches:</span>
                <span className="font-bold text-slate-800 dark:text-white">{score / 10} / {shuffledItems.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 dark:text-slate-500">CO₂ Avoided:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{co2Saved} kg</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Simulated Credits Reward:</span>
                <span className="font-extrabold text-teal-600 dark:text-teal-400">+{score} cr</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                Play Again
              </button>
              <button
                onClick={() => {
                  alert(`Congratulations! You earned ${score} mock credits added to your profile!`);
                  setGameState('idle');
                }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold shadow-md hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
              >
                Claim Reward Credits
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcoSorterGame;
