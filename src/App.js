import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Brain,
  GitBranch,
  MessageSquare,
  Microscope,
  Target,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import * as Tone from "tone";

const AnalysisLab = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedModule, setSelectedModule] = useState(null);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const synthRef = useRef(null);

  // Initialize sound system (Tone needs user gesture to actually start)
  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 },
    }).toDestination();

    synthRef.current.volume.value = -10;

    return () => {
      try {
        synthRef.current?.dispose?.();
      } catch {}
      synthRef.current = null;
    };
  }, []);

  const playSound = (note, duration = "16n") => {
    if (soundEnabled && synthRef.current) {
      try {
        synthRef.current.triggerAttackRelease(note, duration);
      } catch {}
    }
  };

  const modules = [
    {
      id: "cause-effect",
      title: "Cause & Effect Explorer",
      icon: GitBranch,
      color: "from-cyan-500 to-blue-600",
      description: "Trace chains of events and understand causality",
      gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
    },
    {
      id: "argument",
      title: "Argument Analyzer",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-600",
      description: "Break down reasoning and evaluate claims",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-600/20",
    },
    {
      id: "systems",
      title: "System Thinker",
      icon: Target,
      color: "from-orange-500 to-red-600",
      description: "See how parts interact in complex systems",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-600/20",
    },
    {
      id: "scientific",
      title: "Scientific Method Lab",
      icon: Microscope,
      color: "from-green-500 to-emerald-600",
      description: "Form hypotheses and test with evidence",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-600/20",
    },
  ];

  // Cause & Effect Module
  const CauseEffectGame = () => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const scenarios = [
      {
        situation: "A city notices increased traffic congestion",
        options: [
          { id: 1, text: "Population growth", isCorrect: true, type: "root" },
          { id: 2, text: "More cars on roads", isCorrect: true, type: "direct" },
          { id: 3, text: "Weather changes", isCorrect: false, type: "unrelated" },
          { id: 4, text: "Inadequate public transport", isCorrect: true, type: "contributing" },
          { id: 5, text: "Road construction", isCorrect: true, type: "contributing" },
          { id: 6, text: "People working from home", isCorrect: false, type: "opposite" },
        ],
        correctExplanation:
          "Multiple factors contribute: population growth leads to more cars, while inadequate public transport and road construction worsen the problem.",
      },
      {
        situation: "Students perform better on tests after a new teaching method",
        options: [
          { id: 1, text: "Better student engagement", isCorrect: true, type: "direct" },
          { id: 2, text: "Clearer explanations", isCorrect: true, type: "contributing" },
          { id: 3, text: "Longer school year", isCorrect: false, type: "unrelated" },
          { id: 4, text: "More practice opportunities", isCorrect: true, type: "contributing" },
          { id: 5, text: "Stricter grading", isCorrect: false, type: "opposite" },
          { id: 6, text: "Enhanced understanding", isCorrect: true, type: "direct" },
        ],
        correctExplanation:
          "The new method works through engagement, clarity, and practice, leading to better understanding.",
      },
    ];

    const scenario = scenarios[currentScenario];

    const handleSelect = (optionId) => {
      if (showFeedback) return;

      if (selectedItems.includes(optionId)) {
        setSelectedItems(selectedItems.filter((id) => id !== optionId));
        playSound("C4", "32n");
      } else {
        setSelectedItems([...selectedItems, optionId]);
        playSound("E4", "32n");
      }
    };

    const checkAnswer = () => {
      const correct = scenario.options.filter((o) => o.isCorrect).map((o) => o.id);
      const isCorrect =
        correct.length === selectedItems.length && correct.every((id) => selectedItems.includes(id));

      setShowFeedback(true);

      if (isCorrect) {
        playSound("G5", "8n");
        setTimeout(() => playSound("C6", "8n"), 100);
        setScore((prev) => prev + 10);
      } else {
        playSound("C3", "8n");
      }
    };

    const nextScenario = () => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario((prev) => prev + 1);
        setSelectedItems([]);
        setShowFeedback(false);
      } else {
        setCurrentScreen("home");
      }
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-6 rounded-2xl border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-cyan-400 mb-3">Scenario {currentScenario + 1}</h3>
          <p className="text-gray-200 text-lg">{scenario.situation}</p>
          <p className="text-cyan-300 mt-3 text-sm">Select ALL factors that contribute to this situation:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={showFeedback}
              className={`p-5 rounded-xl border-2 transition-all duration-300 text-left
                ${
                  selectedItems.includes(option.id)
                    ? "bg-cyan-500/20 border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20"
                    : "bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/70"
                }
                ${showFeedback && option.isCorrect && !selectedItems.includes(option.id) ? "border-green-500 bg-green-500/10" : ""}
                ${showFeedback && !option.isCorrect && selectedItems.includes(option.id) ? "border-red-500 bg-red-500/10" : ""}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-200 font-medium">{option.text}</span>
                {showFeedback && option.isCorrect && <CheckCircle className="text-green-400" size={20} />}
                {showFeedback && !option.isCorrect && selectedItems.includes(option.id) && (
                  <XCircle className="text-red-400" size={20} />
                )}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-blue-500/30 animate-slide-up">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-yellow-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="text-xl font-bold text-blue-300 mb-2">Analysis</h4>
                <p className="text-gray-200">{scenario.correctExplanation}</p>
              </div>
            </div>
            <button
              onClick={nextScenario}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:scale-105 transition-transform flex items-center gap-2"
            >
              {currentScenario < scenarios.length - 1 ? "Next Scenario" : "Complete Module"}
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {!showFeedback && (
          <button
            onClick={checkAnswer}
            disabled={selectedItems.length === 0}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Check Answer
          </button>
        )}
      </div>
    );
  };

  const startModule = (moduleId) => {
    setSelectedModule(moduleId);
    setCurrentScreen("game");
    playSound("C5", "8n");
  };

  const renderGame = () => {
    switch (selectedModule) {
      case "cause-effect":
        return <CauseEffectGame />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white p-4 md:p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="text-cyan-400 animate-pulse-slow" size={56} />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              The Analysis Lab
            </h1>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="bg-gray-800/50 px-6 py-3 rounded-full border border-cyan-500/30">
              <span className="text-cyan-400 font-bold text-lg">Score: {score}</span>
            </div>

            <button
              onClick={async () => {
                // Tone needs a user gesture to start audio on iOS
                try {
                  await Tone.start();
                } catch {}
                setSoundEnabled((v) => !v);
                playSound("A4", "32n");
              }}
              className="bg-gray-800/50 p-3 rounded-full border border-purple-500/30 hover:bg-gray-700/50 transition-colors"
            >
              {soundEnabled ? <Volume2 className="text-purple-400" size={24} /> : <VolumeX className="text-gray-500" size={24} />}
            </button>
          </div>
        </header>

        {currentScreen === "home" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => startModule(module.id)}
                    className={`${module.gradient} p-8 rounded-3xl border-2 border-gray-700 hover:border-opacity-0 hover:shadow-2xl transition-all duration-500 text-left group hover:scale-105`}
                    style={{ animation: `slide-up 0.6s ease-out ${index * 0.1}s both` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="text-white/90 group-hover:text-white transition-colors" size={48} />
                      <Play className="text-gray-400 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{module.title}</h3>
                    <p className="text-gray-300 font-light">{module.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentScreen === "game" && (
          <div>
            <button
              onClick={() => {
                setCurrentScreen("home");
                setSelectedModule(null);
                playSound("C4", "16n");
              }}
              className="mb-6 px-6 py-3 bg-gray-800/50 rounded-xl border border-gray-700 hover:bg-gray-700/50 transition-colors text-gray-300 hover:text-white flex items-center gap-2"
            >
              ← Back to Modules
            </button>
            {renderGame()}
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
        .animate-fade-in { animation: fade-in 0.35s ease-out both; }

        @keyframes slide-up { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: translateY(0);} }
        .animate-slide-up { animation: slide-up 0.35s ease-out both; }

        @keyframes pulse-slow { 0%,100% { transform: scale(1); opacity: .9; } 50% { transform: scale(1.05); opacity: .7; } }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AnalysisLab;
