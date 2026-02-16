import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  GitBranch,
  Lightbulb,
  Play,
  Volume2,
  VolumeX,
  XCircle
} from "lucide-react";
import * as Tone from "tone";

const AnalysisLab = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedModule, setSelectedModule] = useState(null);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const synthRef = useRef(null);

  // Init audio once
  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
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
      gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
    },
    {
      id: "argument",
      title: "Argument Analyzer",
      icon: Lightbulb,
      color: "from-purple-500 to-pink-600",
      description: "Break down reasoning and evaluate claims",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-600/20"
    },
    {
      id: "systems",
      title: "System Thinker",
      icon: Brain,
      color: "from-orange-500 to-red-600",
      description: "See how parts interact in complex systems",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-600/20"
    },
    {
      id: "scientific",
      title: "Scientific Method Lab",
      icon: Play,
      color: "from-green-500 to-emerald-600",
      description: "Form hypotheses and test with evidence",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-600/20"
    }
  ];

  // ------------------------
  // Cause & Effect Game
  // ------------------------

  const CauseEffectGame = () => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const scenarios = [
      {
        situation: "A city notices increased traffic congestion",
        options: [
          { id: 1, text: "Population growth", isCorrect: true },
          { id: 2, text: "More cars on roads", isCorrect: true },
          { id: 3, text: "Weather changes", isCorrect: false },
          { id: 4, text: "Inadequate public transport", isCorrect: true },
          { id: 5, text: "Road construction", isCorrect: true },
          { id: 6, text: "People working from home", isCorrect: false }
        ],
        correctExplanation:
          "Population growth leads to more cars, while weak transport and construction worsen congestion."
      },
      {
        situation: "Students perform better after a new teaching method",
        options: [
          { id: 1, text: "Better engagement", isCorrect: true },
          { id: 2, text: "Clearer explanations", isCorrect: true },
          { id: 3, text: "Longer school year", isCorrect: false },
          { id: 4, text: "More practice", isCorrect: true },
          { id: 5, text: "Stricter grading", isCorrect: false },
          { id: 6, text: "Better understanding", isCorrect: true }
        ],
        correctExplanation:
          "Engagement, clarity and practice improve understanding."
      }
    ];

    const scenario = scenarios[currentScenario];

    const toggle = (id) => {
      if (showFeedback) return;

      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter((i) => i !== id));
        playSound("C4", "32n");
      } else {
        setSelectedItems([...selectedItems, id]);
        playSound("E4", "32n");
      }
    };

    const check = () => {
      const correct = scenario.options
        .filter((o) => o.isCorrect)
        .map((o) => o.id);

      const ok =
        correct.length === selectedItems.length &&
        correct.every((i) => selectedItems.includes(i));

      setShowFeedback(true);

      if (ok) {
        playSound("G5", "8n");
        setScore((s) => s + 10);
      } else {
        playSound("C3", "8n");
      }
    };

    const next = () => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario((c) => c + 1);
        setSelectedItems([]);
        setShowFeedback(false);
      } else {
        setCurrentScreen("home");
      }
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
          <h3 className="text-2xl font-bold text-cyan-400 mb-2">
            Scenario {currentScenario + 1}
          </h3>
          <p>{scenario.situation}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {scenario.options.map((o) => (
            <button
              key={o.id}
              onClick={() => toggle(o.id)}
              disabled={showFeedback}
              className={`p-4 rounded-xl border ${
                selectedItems.includes(o.id)
                  ? "border-cyan-400 bg-cyan-500/20"
                  : "border-gray-700 bg-gray-800/50"
              }`}
            >
              {o.text}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="p-5 border rounded-xl border-blue-500/30 bg-blue-500/10">
            <p>{scenario.correctExplanation}</p>

            <button
              onClick={next}
              className="mt-4 px-5 py-2 bg-cyan-600 rounded-xl"
            >
              Next <ArrowRight size={18} />
            </button>
          </div>
        )}

        {!showFeedback && (
          <button
            onClick={check}
            disabled={!selectedItems.length}
            className="w-full py-3 bg-cyan-600 rounded-xl"
          >
            Check Answer
          </button>
        )}
      </div>
    );
  };

  // ------------------------
  // Navigation
  // ------------------------

  const startModule = (id) => {
    setSelectedModule(id);
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

  // ------------------------
  // UI
  // ------------------------

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Brain size={56} className="text-cyan-400" />
            <h1 className="text-6xl font-black">The Analysis Lab</h1>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <div className="px-4 py-2 bg-gray-800 rounded-full">
              Score: {score}
            </div>

            <button
              onClick={async () => {
                try {
                  await Tone.start();
                } catch {}
                setSoundEnabled((v) => !v);
              }}
              className="p-2 bg-gray-800 rounded-full"
            >
              {soundEnabled ? <Volume2 /> : <VolumeX />}
            </button>
          </div>
        </header>

        {/* Home */}
        {currentScreen === "home" && (
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
            {modules.map((m) => {
              const Icon = m.icon;

              return (
                <button
                  key={m.id}
                  onClick={() => startModule(m.id)}
                  className="p-6 border border-gray-700 rounded-2xl hover:scale-105 transition"
                >
                  <div className="flex justify-between mb-3">
                    <Icon size={40} />
                    <Play />
                  </div>

                  <h3 className="text-xl font-bold">{m.title}</h3>
                  <p className="text-gray-400">{m.description}</p>
                </button>
              );
            })}
          </div>
        )}

        {/* Game */}
        {currentScreen === "game" && (
          <div>
            <button
              onClick={() => {
                setCurrentScreen("home");
                setSelectedModule(null);
              }}
              className="mb-4 text-gray-400"
            >
              ← Back
            </button>

            {renderGame()}
          </div>
        )}

      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        .animate-fade-in {
          animation: fade-in .5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AnalysisLab;
