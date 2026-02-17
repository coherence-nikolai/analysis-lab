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
  VolumeX
} from "lucide-react";
import * as Tone from "tone";

const AnalysisLab = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedModule, setSelectedModule] = useState(null);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const synthRef = useRef(null);

  // Init synth once
  useEffect(() => {
    const synth = new Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
    }).toDestination();
    synth.volume.value = -10;

    synthRef.current = synth;

    return () => {
      try {
        synth.dispose();
      } catch {
        // ignore
      }
      synthRef.current = null;
    };
  }, []);

  const playSound = (note, duration = "16n") => {
    if (!soundEnabled) return;
    const synth = synthRef.current;
    if (!synth) return;
    synth.triggerAttackRelease(note, duration);
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
      icon: MessageSquare,
      color: "from-purple-500 to-pink-600",
      description: "Break down reasoning and evaluate claims",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-600/20"
    },
    {
      id: "systems",
      title: "System Thinker",
      icon: Target,
      color: "from-orange-500 to-red-600",
      description: "See how parts interact in complex systems",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-600/20"
    },
    {
      id: "scientific",
      title: "Scientific Method Lab",
      icon: Microscope,
      color: "from-green-500 to-emerald-600",
      description: "Form hypotheses and test with evidence",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-600/20"
    }
  ];

  // ----------------------------
  // Module 1: Cause & Effect
  // ----------------------------
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
          { id: 6, text: "People working from home", isCorrect: false, type: "opposite" }
        ],
        correctExplanation:
          "Multiple factors contribute: population growth leads to more cars, while inadequate public transport and road construction worsen the problem."
      },
      {
        situation: "Students perform better on tests after a new teaching method",
        options: [
          { id: 1, text: "Better student engagement", isCorrect: true, type: "direct" },
          { id: 2, text: "Clearer explanations", isCorrect: true, type: "contributing" },
          { id: 3, text: "Longer school year", isCorrect: false, type: "unrelated" },
          { id: 4, text: "More practice opportunities", isCorrect: true, type: "contributing" },
          { id: 5, text: "Stricter grading", isCorrect: false, type: "opposite" },
          { id: 6, text: "Enhanced understanding", isCorrect: true, type: "direct" }
        ],
        correctExplanation:
          "The new method works through engagement, clarity, and practice, leading to better understanding."
      }
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
          <h3 className="text-2xl font-bold text-cyan-400 mb-3">
            Scenario {currentScenario + 1}
          </h3>
          <p className="text-gray-200 text-lg">{scenario.situation}</p>
          <p className="text-cyan-300 mt-3 text-sm">Select ALL factors that contribute:</p>
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
                ${
                  showFeedback && option.isCorrect && !selectedItems.includes(option.id)
                    ? "border-green-500 bg-green-500/10"
                    : ""
                }
                ${
                  showFeedback && !option.isCorrect && selectedItems.includes(option.id)
                    ? "border-red-500 bg-red-500/10"
                    : ""
                }
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

        {showFeedback ? (
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
        ) : (
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

  // ----------------------------
  // Module 2: Argument Analyzer
  // ----------------------------
  const ArgumentGame = () => {
    const [currentCase, setCurrentCase] = useState(0);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const cases = [
      {
        argument:
          "Studies show that students who eat breakfast score higher on tests. Therefore, schools should provide free breakfast to all students to improve academic performance.",
        question: "What's the logical structure of this argument?",
        options: [
          {
            id: 1,
            text: "Correlation implies causation (flawed)",
            isCorrect: true,
            explanation:
              "It assumes breakfast causes better scores. But correlation doesn’t prove causation — other factors (sleep, income, routines) might drive both."
          },
          {
            id: 2,
            text: "Valid causal inference",
            isCorrect: false,
            explanation:
              "Without controlling variables, we can’t claim breakfast directly causes higher scores."
          },
          {
            id: 3,
            text: "Appeal to emotion only",
            isCorrect: false,
            explanation:
              "It uses evidence (studies), not only emotion."
          }
        ]
      },
      {
        argument:
          "Every successful entrepreneur I've met wakes up before 6 AM. If you want to be successful, you should wake up early too.",
        question: "What reasoning problem is present here?",
        options: [
          {
            id: 1,
            text: "Anecdotal evidence / Small sample",
            isCorrect: true,
            explanation:
              "Personal observations aren’t representative. Many successful people have different schedules, and waking early may not cause success."
          },
          {
            id: 2,
            text: "Sound logical reasoning",
            isCorrect: false,
            explanation:
              "This conclusion is based on limited personal experience, not robust evidence."
          },
          {
            id: 3,
            text: "Circular reasoning",
            isCorrect: false,
            explanation:
              "The conclusion doesn’t restate the premise — it’s a different (but flawed) inference."
          }
        ]
      }
    ];

    const currentArgument = cases[currentCase];

    const selectOption = (optionId) => {
      if (showResult) return;
      setSelectedAnalysis(optionId);
      playSound("A4", "16n");
    };

    const submitAnalysis = () => {
      const selected = currentArgument.options.find((o) => o.id === selectedAnalysis);
      setShowResult(true);

      if (selected?.isCorrect) {
        playSound("G5", "8n");
        setTimeout(() => playSound("C6", "8n"), 100);
        setScore((prev) => prev + 15);
      } else {
        playSound("C3", "8n");
      }
    };

    const nextCase = () => {
      if (currentCase < cases.length - 1) {
        setCurrentCase((prev) => prev + 1);
        setSelectedAnalysis(null);
        setShowResult(false);
      } else {
        setCurrentScreen("home");
      }
    };

    const selected = currentArgument.options.find((o) => o.id === selectedAnalysis);

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 p-6 rounded-2xl border border-purple-500/30">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">
            Case {currentCase + 1}: Analyze the Argument
          </h3>
          <div className="bg-gray-900/50 p-5 rounded-xl border-l-4 border-purple-500">
            <p className="text-gray-200 text-lg italic">"{currentArgument.argument}"</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 p-5 rounded-xl border border-pink-500/30">
          <p className="text-pink-300 font-semibold">{currentArgument.question}</p>
        </div>

        <div className="space-y-3">
          {currentArgument.options.map((option) => (
            <button
              key={option.id}
              onClick={() => selectOption(option.id)}
              disabled={showResult}
              className={`w-full p-5 rounded-xl border-2 transition-all duration-300 text-left
                ${
                  selectedAnalysis === option.id
                    ? "bg-purple-500/20 border-purple-400 scale-[1.02] shadow-lg shadow-purple-500/20"
                    : "bg-gray-800/50 border-gray-700 hover:border-purple-500/50 hover:bg-gray-800/70"
                }
              `}
            >
              <span className="text-gray-200 font-medium">{option.text}</span>
            </button>
          ))}
        </div>

        {showResult && selected ? (
          <div
            className={`p-6 rounded-2xl border-2 animate-slide-up ${
              selected.isCorrect ? "bg-green-500/10 border-green-500/50" : "bg-orange-500/10 border-orange-500/50"
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              {selected.isCorrect ? (
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={28} />
              ) : (
                <Lightbulb className="text-orange-400 flex-shrink-0 mt-1" size={28} />
              )}
              <div>
                <h4 className={`text-xl font-bold mb-2 ${selected.isCorrect ? "text-green-400" : "text-orange-400"}`}>
                  {selected.isCorrect ? "Excellent Analysis!" : "Let’s Think Deeper"}
                </h4>
                <p className="text-gray-200">{selected.explanation}</p>
              </div>
            </div>
            <button
              onClick={nextCase}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-white hover:scale-105 transition-transform flex items-center gap-2"
            >
              {currentCase < cases.length - 1 ? "Next Case" : "Complete Module"}
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={submitAnalysis}
            disabled={!selectedAnalysis}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Submit Analysis
          </button>
        )}
      </div>
    );
  };

  // ----------------------------
  // Module 3: Systems Thinking
  // ----------------------------
  const SystemsGame = () => {
    const [currentSystem, setCurrentSystem] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const systems = [
      {
        name: "Forest Ecosystem",
        components: ["Trees", "Soil", "Water", "Animals", "Sunlight", "Decomposers"],
        correctConnections: {
          Trees: ["Water", "Sunlight", "Soil", "Animals"],
          Soil: ["Trees", "Water", "Decomposers"],
          Water: ["Trees", "Soil", "Animals"],
          Animals: ["Trees", "Water", "Decomposers"],
          Sunlight: ["Trees"],
          Decomposers: ["Soil", "Animals"]
        },
        explanation:
          "In a forest ecosystem, everything is interconnected. Trees need water, sunlight and soil nutrients. Animals depend on trees and water. Decomposers recycle nutrients back into soil."
      }
    ];

    const system = systems[currentSystem];

    const checkSystem = () => {
      setShowAnswer(true);
      playSound("G5", "4n");
      setScore((prev) => prev + 20);
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 p-6 rounded-2xl border border-orange-500/30">
          <h3 className="text-2xl font-bold text-orange-400 mb-3">System: {system.name}</h3>
          <p className="text-gray-200">
            Think about how each component influences the others. Then tap “Show System Map”.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {system.components.map((component, idx) => (
            <button
              key={component}
              className="w-full p-6 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-2xl border-2 border-orange-500/40 font-bold text-white text-lg shadow-lg"
              style={{ animation: `float ${3 + idx * 0.5}s ease-in-out infinite` }}
              onClick={() => playSound("D4", "32n")}
            >
              {component}
            </button>
          ))}
        </div>

        {showAnswer ? (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-2xl border border-green-500/30 animate-slide-up">
            <div className="flex items-start gap-3">
              <Target className="text-green-400 flex-shrink-0 mt-1" size={28} />
              <div>
                <h4 className="text-xl font-bold text-green-400 mb-3">System Map</h4>
                <p className="text-gray-200 mb-4">{system.explanation}</p>

                <div className="space-y-2">
                  {Object.entries(system.correctConnections).map(([component, connections]) => (
                    <div key={component} className="bg-gray-900/50 p-3 rounded-lg">
                      <span className="text-orange-400 font-semibold">{component}</span>
                      <span className="text-gray-400"> → </span>
                      <span className="text-gray-200">{connections.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen("home")}
              className="mt-5 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white hover:scale-105 transition-transform flex items-center gap-2"
            >
              Complete Module
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={checkSystem}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white hover:scale-105 transition-transform"
          >
            Show System Map
          </button>
        )}
      </div>
    );
  };

  // ----------------------------
  // Module 4: Scientific Method
  // ----------------------------
  const ScientificMethodGame = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userInput, setUserInput] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);

    const experiment = {
      question: "Why do plants grow taller near the window?",
      steps: [
        {
          step: "Observation",
          prompt: "What did we observe?",
          options: [
            { text: "Plants near window are taller", correct: true },
            { text: "Plants are all the same height", correct: false },
            { text: "Windows are bigger than walls", correct: false }
          ]
        },
        {
          step: "Hypothesis",
          prompt: "What might explain this?",
          options: [
            { text: "Plants grow toward light (phototropism)", correct: true },
            { text: "Windows make plants happy", correct: false },
            { text: "Temperature near windows is better", correct: false }
          ]
        },
        {
          step: "Experiment Design",
          prompt: "How can we test this?",
          options: [
            { text: "Grow identical plants: some with light, some without", correct: true },
            { text: "Ask the plants what they prefer", correct: false },
            { text: "Assume the hypothesis is true", correct: false }
          ]
        },
        {
          step: "Data Collection",
          prompt: "What should we measure?",
          options: [
            { text: "Plant height and growth rate over time", correct: true },
            { text: "How green the plants look", correct: false },
            { text: "The color of the pots", correct: false }
          ]
        },
        {
          step: "Conclusion",
          prompt: "If plants with light grew taller, what can we conclude?",
          options: [
            { text: "Light promotes plant growth (hypothesis supported)", correct: true },
            { text: "All plants prefer windows", correct: false },
            { text: "We need to test more variables", correct: false }
          ]
        }
      ]
    };

    const currentStepData = experiment.steps[currentStep];

    const selectOption = (optionText) => {
      if (showFeedback) return;
      setUserInput({ ...userInput, [currentStep]: optionText });
      playSound("E4", "16n");
    };

    const submitStep = () => {
      const selected = currentStepData.options.find((o) => o.text === userInput[currentStep]);
      setShowFeedback(true);

      if (selected?.correct) {
        playSound("G5", "8n");
        setScore((prev) => prev + 10);
      } else {
        playSound("C3", "8n");
      }
    };

    const nextStep = () => {
      if (currentStep < experiment.steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setShowFeedback(false);
      } else {
        setCurrentScreen("home");
      }
    };

    const selectedOption = currentStepData.options.find((o) => o.text === userInput[currentStep]);

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 p-6 rounded-2xl border border-green-500/30">
          <h3 className="text-2xl font-bold text-green-400 mb-3">Research Question</h3>
          <p className="text-gray-200 text-lg italic">"{experiment.question}"</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          {experiment.steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? "w-12 bg-gradient-to-r from-green-500 to-emerald-600"
                  : idx < currentStep
                  ? "w-8 bg-green-600"
                  : "w-8 bg-gray-700"
              }`}
            />
          ))}
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 p-6 rounded-2xl border-2 border-emerald-500/40">
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="text-emerald-400" size={32} />
            <h4 className="text-2xl font-bold text-emerald-300">
              Step {currentStep + 1}: {currentStepData.step}
            </h4>
          </div>
          <p className="text-gray-200 text-lg">{currentStepData.prompt}</p>
        </div>

        <div className="space-y-3">
          {currentStepData.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => selectOption(option.text)}
              disabled={showFeedback}
              className={`w-full p-5 rounded-xl border-2 transition-all duration-300 text-left
                ${
                  userInput[currentStep] === option.text
                    ? "bg-green-500/20 border-green-400 scale-[1.02] shadow-lg shadow-green-500/20"
                    : "bg-gray-800/50 border-gray-700 hover:border-green-500/50 hover:bg-gray-800/70"
                }
              `}
            >
              <span className="text-gray-200 font-medium">{option.text}</span>
            </button>
          ))}
        </div>

        {showFeedback && selectedOption ? (
          <div
            className={`p-6 rounded-2xl border-2 animate-slide-up ${
              selectedOption.correct ? "bg-green-500/10 border-green-500/50" : "bg-yellow-500/10 border-yellow-500/50"
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedOption.correct ? (
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={28} />
              ) : (
                <Lightbulb className="text-yellow-400 flex-shrink-0 mt-1" size={28} />
              )}
              <div>
                <h4 className={`text-xl font-bold mb-2 ${selectedOption.correct ? "text-green-400" : "text-yellow-400"}`}>
                  {selectedOption.correct ? "Correct!" : "Not quite"}
                </h4>
                <p className="text-gray-200">
                  {selectedOption.correct
                    ? `Great thinking! This is how scientists approach the ${currentStepData.step.toLowerCase()} step.`
                    : `The correct answer is: "${currentStepData.options.find((o) => o.correct)?.text}"`}
                </p>
              </div>
            </div>

            <button
              onClick={nextStep}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white hover:scale-105 transition-transform flex items-center gap-2"
            >
              {currentStep < experiment.steps.length - 1 ? "Next Step" : "Complete Experiment"}
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={submitStep}
            disabled={!userInput[currentStep]}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Submit Answer
          </button>
        )}
      </div>
    );
  };

  // ----------------------------
  // Navigation helpers
  // ----------------------------
  const startModule = (moduleId) => {
    setSelectedModule(moduleId);
    setCurrentScreen("game");
    playSound("C5", "8n");
  };

  const renderGame = () => {
    switch (selectedModule) {
      case "cause-effect":
        return <CauseEffectGame />;
      case "argument":
        return <ArgumentGame />;
      case "systems":
        return <SystemsGame />;
      case "scientific":
        return <ScientificMethodGame />;
      default:
        return null;
    }
  };

  // Sound toggle: needs user gesture to start audio on mobile
  const toggleSound = async () => {
    try {
      // iOS/Safari requires resume in a user gesture
      await Tone.start();
    } catch {
      // ignore
    }
    setSoundEnabled((prev) => !prev);
    playSound("A4", "32n");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Animated background blobs */}
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
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="text-cyan-400 animate-pulse-slow" size={56} />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              The Analysis Lab
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Master critical thinking through interactive challenges
          </p>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="bg-gray-800/50 px-6 py-3 rounded-full border border-cyan-500/30">
              <span className="text-cyan-400 font-bold text-lg">Score: {score}</span>
            </div>

            <button
              onClick={toggleSound}
              className="bg-gray-800/50 p-3 rounded-full border border-purple-500/30 hover:bg-gray-700/50 transition-colors"
              aria-label="Toggle sound"
            >
              {soundEnabled ? (
                <Volume2 className="text-purple-400" size={24} />
              ) : (
                <VolumeX className="text-gray-500" size={24} />
              )}
            </button>
          </div>
        </header>

        {/* Home */}
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
                    style={{
                      animation: `slide-up 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon
                        className={`bg-gradient-to-r ${module.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}
                        size={48}
                      />
                      <Play className="text-gray-400 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{module.title}</h3>
                    <p className="text-gray-300 font-light">{module.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-8 rounded-3xl border border-gray-700 text-center">
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Why Critical Thinking Matters
              </h3>
              <p className="text-gray-300 text-lg font-light max-w-3xl mx-auto">
                These four skills help you understand the world deeply: see how events connect, evaluate arguments carefully,
                recognize patterns in complex systems, and test ideas with evidence. Master them, and you'll make better decisions
                in every area of life.
              </p>
            </div>
          </div>
        )}

        {/* Game */}
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

      {/* local animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-slow { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }

        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AnalysisLab;
