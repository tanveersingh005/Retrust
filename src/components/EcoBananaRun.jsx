import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Play, RotateCcw, Award, Volume2, VolumeX, LogOut, Heart } from 'lucide-react';

const EcoBananaRun = ({ onExit }) => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('eco_banana_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [lives, setLives] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // Game assets/state for physics loop
  const gameRef = useRef({
    monkey: { x: 80, y: 220, width: 40, height: 40, vy: 0, gravity: 0.5, jumpForce: -10, isGrounded: false },
    obstacles: [], // human waste hurdles
    bananas: [],
    particles: [],
    bgOffset: 0,
    frameCount: 0,
    speed: 4,
    score: 0,
    lives: 3
  });

  // Handle high score updates
  const updateHighScore = (finalScore) => {
    if (finalScore > highScore) {
      setHighScore(finalScore);
      try {
        localStorage.setItem('eco_banana_highscore', finalScore.toString());
      } catch (e) {}
    }
  };

  // Beep synthesis using Web Audio API for feedback
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'jump') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'banana') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.setValueAtTime(900, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {}
  };

  // Jump controls
  const triggerJump = () => {
    if (gameState !== 'playing') return;
    const { monkey } = gameRef.current;
    if (monkey.isGrounded) {
      monkey.vy = monkey.jumpForce;
      monkey.isGrounded = false;
      playSound('jump');
    }
  };

  // Start loop
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);

    // Reset loop variables
    gameRef.current = {
      monkey: { x: 80, y: 220, width: 40, height: 40, vy: 0, gravity: 0.5, jumpForce: -10, isGrounded: false },
      obstacles: [],
      bananas: [],
      particles: [],
      bgOffset: 0,
      frameCount: 0,
      speed: 4,
      score: 0,
      lives: 3
    };
  };

  // Input Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Canvas Drawing & Physics Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let active = true;

    const startLoop = () => {
      if (!active) return;
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId.current = requestAnimationFrame(startLoop);
        return;
      }
      const ctx = canvas.getContext('2d');

      const loop = () => {
        if (!active) return;
        const { monkey, obstacles, bananas, particles } = gameRef.current;
        gameRef.current.frameCount++;

        // 1. Clear Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Draw Sky/Jungle Canopy Gradient Background
        const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGrad.addColorStop(0, '#ecfdf5'); // Mint light
        skyGrad.addColorStop(1, '#a7f3d0'); // Emerald tint
        // Support dark mode colors directly drawn on Canvas
        if (document.documentElement.classList.contains('dark')) {
          skyGrad.addColorStop(0, '#064e3b'); // Dark emerald
          skyGrad.addColorStop(1, '#022c22'); // Forest green dark
        }
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. Parallax Tree background shapes
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        gameRef.current.bgOffset = (gameRef.current.bgOffset - 0.5) % 800;
        for (let i = 0; i < 3; i++) {
          const xPos = gameRef.current.bgOffset + i * 400;
          ctx.beginPath();
          ctx.moveTo(xPos, 280);
          ctx.lineTo(xPos + 100, 100);
          ctx.lineTo(xPos + 200, 280);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(xPos - 200, 280);
          ctx.lineTo(xPos - 100, 100);
          ctx.lineTo(xPos, 280);
          ctx.fill();
        }

        // 4. Ground Line
        const groundY = 270;
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(canvas.width, groundY);
        ctx.stroke();

        // Grass Fill
        ctx.fillStyle = '#10b981';
        if (document.documentElement.classList.contains('dark')) {
          ctx.fillStyle = '#065f46';
        }
        ctx.fillRect(0, groundY + 2, canvas.width, canvas.height - groundY);

        // 5. Update Monkey Physics
        monkey.vy += monkey.gravity;
        monkey.y += monkey.vy;

        // Ground bounds
        if (monkey.y >= groundY - monkey.height) {
          monkey.y = groundY - monkey.height;
          monkey.vy = 0;
          monkey.isGrounded = true;
        } else {
          monkey.isGrounded = false;
        }

        // Running dust particles
        if (monkey.isGrounded && gameRef.current.frameCount % 6 === 0) {
          particles.push({
            x: monkey.x + 8,
            y: groundY - 2,
            vx: -2 - Math.random() * 2, // move left
            vy: -0.5 - Math.random() * 1, // rise slightly
            life: 15,
            color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.08)'
          });
        }

        // Draw shadow beneath monkey (dynamic size based on height)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.beginPath();
        const heightAboveGround = groundY - (monkey.y + monkey.height);
        const shadowWidth = Math.max(18 - heightAboveGround * 0.08, 4);
        ctx.ellipse(monkey.x + 20, groundY, shadowWidth, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw Monkey (Flipped horizontally and rotated dynamically)
        ctx.save();
        const monkeyCenterX = monkey.x + monkey.width / 2;
        const monkeyCenterY = monkey.y + monkey.height / 2;
        ctx.translate(monkeyCenterX, monkeyCenterY);
        ctx.scale(-1, 1); // Flip horizontally so monkey faces right (running direction)
        
        let tilt = monkey.vy * 0.025; // Tilt based on vertical velocity
        ctx.rotate(-tilt); // Negate tilt to match horizontal flip coordinate change
        ctx.fillStyle = '#000000';
        ctx.font = '36px sans-serif';
        ctx.fillText('🐒', -18, 12); // Center text within translates
        ctx.restore();

        // 6. Spawn Obstacles (Waste products)
        const obstacleTypes = [
          { emoji: '🔋', name: 'Battery', co2Multiplier: 1.5 },
          { emoji: '🍼', name: 'Plastic Bottle', co2Multiplier: 1.0 },
          { emoji: '🥫', name: 'Tin Can', co2Multiplier: 1.2 },
          { emoji: '📺', name: 'Old TV', co2Multiplier: 2.5 }
        ];

        // Spawn every ~120 frames
        if (gameRef.current.frameCount % 130 === 0) {
          const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
          obstacles.push({
            x: canvas.width + 50,
            y: groundY - 32,
            width: 30,
            height: 30,
            emoji: type.emoji,
            name: type.name
          });
        }

        // 7. Spawn Bananas
        if (gameRef.current.frameCount % 80 === 0) {
          bananas.push({
            x: canvas.width + 50,
            y: groundY - 80 - Math.random() * 80, // floating in air
            width: 25,
            height: 25,
            collected: false
          });
        }

        // 8. Update & Draw Bananas
        for (let i = bananas.length - 1; i >= 0; i--) {
          const banana = bananas[i];
          banana.x -= gameRef.current.speed;

          // Draw Banana
          if (!banana.collected) {
            ctx.fillStyle = '#000000';
            ctx.font = '24px sans-serif';
            ctx.fillText('🍌', banana.x, banana.y + 20);

            // Collision Check
            if (
              banana.x < monkey.x + monkey.width &&
              banana.x + banana.width > monkey.x &&
              banana.y < monkey.y + monkey.height &&
              banana.y + banana.height > monkey.y
            ) {
              banana.collected = true;
              gameRef.current.score += 10;
              setScore(gameRef.current.score);
              playSound('banana');

              // Emit particles
              for (let p = 0; p < 8; p++) {
                particles.push({
                  x: banana.x + 10,
                  y: banana.y + 10,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  life: 30,
                  color: '#fbbf24'
                });
              }
            }
          }

          // Remove offscreen
          if (banana.x < -50) {
            bananas.splice(i, 1);
          }
        }

        // 9. Update & Draw Obstacles (Hurdles)
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.x -= gameRef.current.speed;

          // Draw Hurdle
          ctx.fillStyle = '#000000';
          ctx.font = '28px sans-serif';
          ctx.fillText(obs.emoji, obs.x, obs.y + 25);

          // Draw tiny label for educational context
          ctx.font = '9px font-sans';
          ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b';
          ctx.fillText(obs.name, obs.x, obs.y - 5);

          // Collision Check
          if (
            obs.x < monkey.x + monkey.width - 5 &&
            obs.x + obs.width - 5 > monkey.x &&
            obs.y < monkey.y + monkey.height - 5 &&
            obs.y + obs.height - 5 > monkey.y
          ) {
            // Collision! Remove obstacle, deduct life
            obstacles.splice(i, 1);
            gameRef.current.lives--;
            setLives(gameRef.current.lives);
            playSound('hit');

            // Shake screen effect or flash
            ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (gameRef.current.lives <= 0) {
              setGameState('gameover');
              updateHighScore(gameRef.current.score);
              return;
            }
          }

          // Remove offscreen
          if (obs.x < -50) {
            obstacles.splice(i, 1);
          }
        }

        // 10. Update & Draw Particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * (p.life / 30), 0, Math.PI * 2);
          ctx.fill();

          if (p.life <= 0) {
            particles.splice(i, 1);
          }
        }

        // Speed up game gradually
        if (gameRef.current.frameCount % 500 === 0) {
          gameRef.current.speed += 0.5;
        }

        animationFrameId.current = requestAnimationFrame(loop);
      };

      animationFrameId.current = requestAnimationFrame(loop);
    };

    startLoop();

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState]);

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden mt-16 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-6 relative z-10 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <Leaf className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base md:text-lg">Eco-Banana Run</h3>
            <p className="text-slate-400 dark:text-slate-500 text-xs">Help the monkey jump branches & dodge waste hurdles!</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          {onExit && (
            <button
              onClick={onExit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 text-xs font-bold transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit Game
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* State: Idle */}
        {gameState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12 relative z-10"
          >
            <div className="text-6xl mb-6 select-none animate-bounce">🐒</div>
            <h4 className="text-xl font-extrabold text-slate-800 dark:text-white mb-2">Help the Monkey Run!</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Human garbage is cluttering the forest floor! Collect delicious bananas for points, and jump over hazardous waste hurdles (batteries, TVs, bottles).
            </p>

            {/* High Score Panel */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 text-teal-700 dark:text-teal-400 font-bold text-xs mb-8">
              <Award className="w-4 h-4" />
              <span>Jungle High Score: {highScore} pts</span>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={startGame}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold shadow-md hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-0.5 transition duration-300 cursor-pointer flex items-center gap-2"
              >
                <Play className="w-4.5 h-4.5 fill-white" />
                Play Game
              </button>
            </div>
          </motion.div>
        )}

        {/* State: Playing */}
        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            {/* Live Stats Bar */}
            <div className="flex justify-between items-center mb-4 text-sm font-bold">
              <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
                <span>Score:</span>
                <span className="text-slate-800 dark:text-white font-extrabold">{score}</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-500">
                <span>Lives:</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-4 h-4 ${i < lives ? 'fill-rose-500 text-rose-500' : 'text-slate-200 dark:text-slate-800'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Canvas Element */}
            <div className="relative border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-inner bg-slate-50 dark:bg-slate-950">
              <canvas
                ref={canvasRef}
                width={1000}
                height={300}
                onClick={triggerJump}
                className="w-full h-auto block cursor-pointer"
              />
              {/* Keyboard helper overlay */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-slate-900/60 backdrop-blur px-2.5 py-1 rounded-md pointer-events-none select-none">
                Tap Screen or Press [SPACEBAR] to Jump
              </div>
            </div>
          </motion.div>
        )}

        {/* State: Gameover */}
        {gameState === 'gameover' && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-10 relative z-10"
          >
            <div className="text-5xl mb-4 select-none">🤕</div>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Game Over!</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6">
              The monkey hit too much garbage and ran out of lives! Good job keeping the jungle clean of obstacles.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 p-5 max-w-xs mx-auto mb-8 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Your Score:</span>
                <span className="font-bold text-slate-800 dark:text-white">{score} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Jungle High Score:</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">{Math.max(score, highScore)} pts</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setGameState('idle')}
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-350 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-200 cursor-pointer"
              >
                Back to Menu
              </button>
              <button
                onClick={startGame}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold shadow-md hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-0.5 transition duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 animate-spin-slow" />
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcoBananaRun;
