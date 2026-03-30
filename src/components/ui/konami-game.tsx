"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const questions = [
  {
    question: "What medal did Ved's Robotic Service Dog win?",
    options: ["Silver", "Gold", "Bronze", "Platinum"],
    answer: 1,
  },
  {
    question: "How many hackathons has Ved won?",
    options: ["3", "4", "5", "7"],
    answer: 2,
  },
  {
    question: "What blockchain does Knight Wallet use?",
    options: ["Ethereum L1", "Solana", "Base L2", "Polygon"],
    answer: 2,
  },
  {
    question: "Ved mentored at which NASA event?",
    options: ["Artemis Challenge", "Space Apps", "Hack the Moon", "Mars Hackathon"],
    answer: 1,
  },
  {
    question: "What language is RU Live built with?",
    options: ["Kotlin", "React Native", "Swift", "Flutter"],
    answer: 2,
  },
];


function ConfettiBurst() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 200 - 100,
    y: -(Math.random() * 200 + 50),
    rotate: Math.random() * 720 - 360,
    color: ["#22d3ee", "#a855f7", "#eab308", "#ef4444", "#22c55e"][Math.floor(Math.random() * 5)],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

interface KonamiGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KonamiGame({ isOpen, onClose }: KonamiGameProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentQ(0);
      setScore(0);
      setSelected(null);
      setShowResult(false);
      setGameComplete(false);
    }
  }, [isOpen]);

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);

    const correct = optionIndex === questions[currentQ].answer;
    if (correct) {
      setScore((s) => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }

    setShowResult(true);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const getMessage = () => {
    if (score === 5) return { text: "You're basically Ved's co-founder 🚀", color: "text-yellow-400" };
    if (score >= 3) return { text: "Pretty solid! Let's connect 🤝", color: "text-cyan-400" };
    return { text: "Explore the site and try again 😄", color: "text-purple-400" };
  };

  if (!isOpen) return null;

  return (
    <>
      {showConfetti && <ConfettiBurst />}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="relative bg-[#0a0a14] border border-white/10 rounded-3xl p-8 md:p-12 max-w-lg w-full mx-4 shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>

            {!gameComplete ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2">
                    🎮 Secret Challenge Unlocked
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    How Well Do You Know Ved?
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-1 rounded-full transition-colors duration-300 ${
                          i < currentQ ? "bg-cyan-500" : i === currentQ ? "bg-white" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white font-bold text-base md:text-lg mb-6 leading-relaxed">
                      {questions[currentQ].question}
                    </p>
                    <div className="space-y-3">
                      {questions[currentQ].options.map((opt, i) => {
                        let optClass = "bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:text-white";
                        if (showResult && selected !== null) {
                          if (i === questions[currentQ].answer) {
                            optClass = "bg-green-500/20 border-green-500/50 text-green-400";
                          } else if (i === selected && i !== questions[currentQ].answer) {
                            optClass = "bg-red-500/20 border-red-500/50 text-red-400";
                          } else {
                            optClass = "bg-white/5 border-white/5 text-gray-600";
                          }
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            disabled={selected !== null}
                            className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-bold transition-all duration-200 ${optClass}`}
                          >
                            <span className="text-[10px] font-mono opacity-40 mr-3">{String.fromCharCode(65 + i)}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Score */}
                <div className="text-center mt-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Score: {score}/{currentQ + (showResult ? 1 : 0)}
                  </span>
                </div>
              </>
            ) : (
              /* Results */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <p className="text-6xl md:text-7xl font-black text-white mb-4">
                  {score}/{questions.length}
                </p>
                <p className={`text-lg md:text-xl font-bold ${getMessage().color} mb-8`}>
                  {getMessage().text}
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      onClose();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-cyan-600 text-white font-black text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-cyan-500 transition-all"
                  >
                    Let&apos;s Connect
                  </button>
                  <button
                    onClick={() => {
                      setCurrentQ(0);
                      setScore(0);
                      setSelected(null);
                      setShowResult(false);
                      setGameComplete(false);
                    }}
                    className="bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-white/10 transition-all"
                  >
                    Play Again
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
