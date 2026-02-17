import React, { useState, useRef } from 'react';

const AnalysisLab = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  const playSound = (frequency, duration = 0.2) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  const playCorrect = () => {
    playSound(523, 0.15);
    setTimeout(() => playSound(659, 0.15), 150);
    setTimeout(() => playSound(784, 0.3), 300);
  };

  const playWrong = () => playSound(200, 0.3);
  const playClick = () => playSound(440, 0.1);

  const styles = {
    app: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      color: 'white',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    container: { maxWidth: '800px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '40px' },
    title: {
      fontSize: 'clamp(2rem, 6vw, 4rem)',
      fontWeight: '900',
      background: 'linear-gradient(90deg, #06b6d4, #a855f7, #22c55e)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '10px'
    },
    subtitle: { color: '#94a3b8', fontSize: '1.1rem' },
    scoreBar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      margin: '20px 0'
    },
    scoreBadge: {
      background: 'rgba(6, 182, 212, 0.15)',
      border: '1px solid rgba(6, 182, 212, 0.4)',
      borderRadius: '50px',
      padding: '8px 24px',
      color: '#06b6d4',
      fontWeight: 'bold',
      fontSize: '1.1rem'
    },
    soundBtn: {
      background: 'rgba(168, 85, 247, 0.15)',
      border: '1px solid rgba(168, 85, 247, 0.4)',
      borderRadius: '50px',
      padding: '8px 20px',
      color: '#a855f7',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    moduleCard: {
      padding: '30px',
      borderRadius: '20px',
      border: '2px solid',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      textAlign: 'left'
    },
    moduleEmoji: { fontSize: '3rem', marginBottom: '15px' },
    moduleTitle: { fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px' },
    moduleDesc: { color: '#94a3b8', fontSize: '0.95rem' },
    backBtn: {
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '12px',
      padding: '10px 20px',
      color: 'white',
      cursor: 'pointer',
      marginBottom: '20px',
      fontSize: '1rem'
    },
    card: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '20px'
    },
    questionTitle: { fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '15px' },
    optionBtn: {
      width: '100%',
      padding: '15px 20px',
      borderRadius: '12px',
      border: '2px solid rgba(255,255,255,0.15)',
      background: 'rgba(255,255,255,0.05)',
      color: 'white',
      cursor: 'pointer',
      textAlign: 'left',
      fontSize: '1rem',
      marginBottom: '10px',
      transition: 'all 0.2s'
    },
    submitBtn: {
      width: '100%',
      padding: '15px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(90deg, #06b6d4, #a855f7)',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px'
    },
    feedback: {
      borderRadius: '15px',
      padding: '20px',
      marginTop: '20px'
    },
    nextBtn: {
      padding: '12px 25px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(90deg, #06b6d4, #a855f7)',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '15px'
    },
    progressBar: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    infoBox: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      padding: '15px',
      marginBottom: '15px',
      fontSize: '1rem',
      fontStyle: 'italic',
      color: '#cbd5e1'
    }
  };

  const modules = [
    {
      id: 'cause-effect',
      title: 'Cause & Effect Explorer',
      emoji: '🔗',
      color: '#06b6d4',
      bgColor: 'rgba(6, 182, 212, 0.15)',
      borderColor: 'rgba(6, 182, 212, 0.4)',
      description: 'Trace chains of events and understand causality'
    },
    {
      id: 'argument',
      title: 'Argument Analyzer',
      emoji: '💬',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.15)',
      borderColor: 'rgba(168, 85, 247, 0.4)',
      description: 'Break down reasoning and evaluate claims'
    },
    {
      id: 'systems',
      title: 'System Thinker',
      emoji: '🎯',
      color: '#f97316',
      bgColor: 'rgba(249, 115, 22, 0.15)',
      borderColor: 'rgba(249, 115, 22, 0.4)',
      description: 'See how parts interact in complex systems'
    },
    {
      id: 'scientific',
      title: 'Scientific Method Lab',
      emoji: '🔬',
      color: '#22c55e',
      bgColor: 'rgba(34, 197, 94, 0.15)',
      borderColor: 'rgba(34, 197, 94, 0.4)',
      description: 'Form hypotheses and test with evidence'
    }
  ];

  const CauseEffectGame = () => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState([]);
    const [feedback, setFeedback] = useState(null);

    const scenarios = [
      {
        situation: "A city notices increased traffic congestion every morning.",
        options: [
          { id: 1, text: "Rapid population growth", correct: true },
          { id: 2, text: "More private cars on roads", correct: true },
          { id: 3, text: "Warmer weather this week", correct: false },
          { id: 4, text: "Inadequate public transport", correct: true },
          { id: 5, text: "Ongoing road construction", correct: true },
          { id: 6, text: "More people cycling to work", correct: false }
        ],
        explanation: "Traffic congestion has multiple causes: population growth means more commuters, inadequate public transport pushes people to drive, and road construction reduces road capacity. Warmer weather and cycling actually improve traffic!"
      },
      {
        situation: "A local river's fish population has drastically declined.",
        options: [
          { id: 1, text: "Industrial pollution upstream", correct: true },
          { id: 2, text: "Overfishing by local boats", correct: true },
          { id: 3, text: "Tourism has increased", correct: false },
          { id: 4, text: "Destruction of riverside habitat", correct: true },
          { id: 5, text: "Invasive species introduced", correct: true },
          { id: 6, text: "River was recently cleaned", correct: false }
        ],
        explanation: "Fish decline is caused by pollution, overfishing, habitat loss, and invasive species competing for food. Tourism and cleaning actually help the ecosystem!"
      },
      {
        situation: "A student's grades improve significantly over one semester.",
        options: [
          { id: 1, text: "Student joined a study group", correct: true },
          { id: 2, text: "Student got a new pencil case", correct: false },
          { id: 3, text: "Teacher provided extra support", correct: true },
          { id: 4, text: "Student improved sleep habits", correct: true },
          { id: 5, text: "Reduced screen time at night", correct: true },
          { id: 6, text: "School changed its logo", correct: false }
        ],
        explanation: "Grade improvement comes from meaningful changes: study groups, teacher support, better sleep, and less screen time. Surface changes like pencil cases or school logos have no impact!"
      }
    ];

    const scenario = scenarios[current];

    const toggle = (id) => {
      if (feedback) return;
      playClick();
      setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const check = () => {
      const correctIds = scenario.options.filter(o => o.correct).map(o => o.id);
      const isRight = correctIds.length === selected.length && correctIds.every(id => selected.includes(id));
      setFeedback(isRight ? 'correct' : 'partial');
      if (isRight) { playCorrect(); setScore(s => s + 10); }
      else playWrong();
    };

    const next = () => {
      if (current < scenarios.length - 1) { setCurrent(c => c + 1); setSelected([]); setFeedback(null); }
      else setCurrentScreen('home');
    };

    return (
      <div>
        <div style={styles.progressBar}>
          {scenarios.map((_, i) => (
            <div key={i} style={{ height: '6px', borderRadius: '3px', width: i === current ? '40px' : '25px', background: i < current ? '#22c55e' : i === current ? '#06b6d4' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
          ))}
        </div>
        <div style={styles.card}>
          <div style={{ color: '#06b6d4', fontWeight: 'bold', marginBottom: '10px' }}>Scenario {current + 1} of {scenarios.length}</div>
          <div style={styles.questionTitle}>{scenario.situation}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select ALL factors that contribute:</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          {scenario.options.map(option => {
            const isSelected = selected.includes(option.id);
            const showResult = feedback !== null;
            let bg = 'rgba(255,255,255,0.05)';
            let border = '2px solid rgba(255,255,255,0.15)';
            if (isSelected && !showResult) { bg = 'rgba(6,182,212,0.2)'; border = '2px solid #06b6d4'; }
            if (showResult && option.correct) { bg = 'rgba(34,197,94,0.2)'; border = '2px solid #22c55e'; }
            if (showResult && !option.correct && isSelected) { bg = 'rgba(239,68,68,0.2)'; border = '2px solid #ef4444'; }
            return (
              <button key={option.id} onClick={() => toggle(option.id)} style={{ ...styles.optionBtn, background: bg, border, marginBottom: 0 }}>
                {showResult && option.correct ? '✅ ' : showResult && !option.correct && isSelected ? '❌ ' : isSelected ? '☑ ' : '○ '}{option.text}
              </button>
            );
          })}
        </div>
        {!feedback ? (
          <button onClick={check} disabled={selected.length === 0} style={{ ...styles.submitBtn, opacity: selected.length === 0 ? 0.5 : 1 }}>Check My Answer</button>
        ) : (
          <div style={{ ...styles.feedback, background: feedback === 'correct' ? 'rgba(34,197,94,0.15)' : 'rgba(249,115,22,0.15)', border: '1px solid ' + (feedback === 'correct' ? 'rgba(34,197,94,0.4)' : 'rgba(249,115,22,0.4)') }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{feedback === 'correct' ? '🎉 Excellent! +10 points' : '💡 Here is the full picture:'}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{scenario.explanation}</p>
            <button onClick={next} style={styles.nextBtn}>{current < scenarios.length - 1 ? 'Next Scenario →' : 'Complete Module ✓'}</button>
          </div>
        )}
      </div>
    );
  };

  const ArgumentGame = () => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const cases = [
      {
        argument: "Studies show students who eat breakfast score higher on tests. Therefore, schools should provide free breakfast to improve academic performance.",
        question: "What is the main logical flaw in this argument?",
        options: [
          { id: 1, text: "Correlation mistaken for causation", correct: true, explanation: "Just because breakfast-eaters score higher does not mean breakfast causes better scores. Family income might explain both." },
          { id: 2, text: "The argument is perfectly sound", correct: false, explanation: "The argument has a significant flaw - it assumes a causal relationship from correlational data." },
          { id: 3, text: "The sample size is too small", correct: false, explanation: "We have no evidence about sample size. The main issue is the logical leap from correlation to causation." },
          { id: 4, text: "Schools cannot afford breakfast", correct: false, explanation: "Cost is not the logical issue here - the problem is the reasoning itself." }
        ]
      },
      {
        argument: "Every successful entrepreneur I have personally met wakes up before 6 AM. Therefore, waking up early is the key to business success.",
        question: "Which logical fallacy is present?",
        options: [
          { id: 1, text: "Hasty generalisation from small sample", correct: true, explanation: "Drawing a universal conclusion from a small, personally-selected group is hasty generalisation. Many successful people sleep in!" },
          { id: 2, text: "Appeal to authority", correct: false, explanation: "Appeal to authority means using an expert opinion as proof. This uses personal observation, not authority." },
          { id: 3, text: "False dichotomy", correct: false, explanation: "False dichotomy presents only two options when more exist. This argument does not do that." },
          { id: 4, text: "Circular reasoning", correct: false, explanation: "Circular reasoning uses the conclusion as a premise. This argument uses observation as its premise." }
        ]
      },
      {
        argument: "We should ban all social media because studies show teenagers who use social media report feeling lonely.",
        question: "What analytical problem exists with this conclusion?",
        options: [
          { id: 1, text: "Extreme solution ignoring nuance and alternatives", correct: true, explanation: "The argument jumps from some teens feeling lonely to banning all social media for everyone, ignoring that less extreme solutions exist." },
          { id: 2, text: "The studies must be fabricated", correct: false, explanation: "There is no reason to doubt the studies. The problem is the conclusion drawn, not the evidence." },
          { id: 3, text: "Teenagers should not use the internet", correct: false, explanation: "This is an even more extreme opinion, not a logical analysis of the argument." },
          { id: 4, text: "Loneliness is not a real problem", correct: false, explanation: "Loneliness is very real and serious. Dismissing it is not the analytical flaw here." }
        ]
      }
    ];

    const caseItem = cases[current];
    const select = (id) => { if (feedback) return; playClick(); setSelected(id); };
    const submit = () => {
      const choice = caseItem.options.find(o => o.id === selected);
      setFeedback(choice);
      if (choice.correct) { playCorrect(); setScore(s => s + 15); } else playWrong();
    };
    const next = () => {
      if (current < cases.length - 1) { setCurrent(c => c + 1); setSelected(null); setFeedback(null); }
      else setCurrentScreen('home');
    };

    return (
      <div>
        <div style={styles.progressBar}>
          {cases.map((_, i) => (
            <div key={i} style={{ height: '6px', borderRadius: '3px', width: i === current ? '40px' : '25px', background: i < current ? '#22c55e' : i === current ? '#a855f7' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
          ))}
        </div>
        <div style={styles.card}>
          <div style={{ color: '#a855f7', fontWeight: 'bold', marginBottom: '10px' }}>Case {current + 1} of {cases.length}</div>
          <div style={styles.infoBox}>"{caseItem.argument}"</div>
          <div style={{ ...styles.questionTitle, fontSize: '1.1rem' }}>{caseItem.question}</div>
        </div>
        {caseItem.options.map(option => {
          let bg = 'rgba(255,255,255,0.05)';
          let border = '2px solid rgba(255,255,255,0.15)';
          if (selected === option.id && !feedback) { bg = 'rgba(168,85,247,0.2)'; border = '2px solid #a855f7'; }
          if (feedback && option.correct) { bg = 'rgba(34,197,94,0.2)'; border = '2px solid #22c55e'; }
          if (feedback && !option.correct && selected === option.id) { bg = 'rgba(239,68,68,0.2)'; border = '2px solid #ef4444'; }
          return <button key={option.id} onClick={() => select(option.id)} style={{ ...styles.optionBtn, background: bg, border }}>{option.text}</button>;
        })}
        {!feedback ? (
          <button onClick={submit} disabled={!selected} style={{ ...styles.submitBtn, opacity: !selected ? 0.5 : 1 }}>Submit Analysis</button>
        ) : (
          <div style={{ ...styles.feedback, background: feedback.correct ? 'rgba(34,197,94,0.15)' : 'rgba(249,115,22,0.15)', border: '1px solid ' + (feedback.correct ? 'rgba(34,197,94,0.4)' : 'rgba(249,115,22,0.4)') }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{feedback.correct ? '🎉 Sharp analysis! +15 points' : '💡 Not quite - here is why:'}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{feedback.explanation}</p>
            <button onClick={next} style={styles.nextBtn}>{current < cases.length - 1 ? 'Next Case →' : 'Complete Module ✓'}</button>
          </div>
        )}
      </div>
    );
  };

  const SystemsGame = () => {
    const [current, setCurrent] = useState(0);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [firstSelected, setFirstSelected] = useState(null);
    const [revealed, setRevealed] = useState(false);

    const systems = [
      {
        name: "Forest Ecosystem",
        description: "Tap one component, then tap another to connect them and show how they interact.",
        components: [
          { id: 'trees', label: '🌳 Trees', affects: ['soil', 'animals', 'water'] },
          { id: 'soil', label: '🪱 Soil', affects: ['trees', 'water', 'decomposers'] },
          { id: 'water', label: '💧 Water', affects: ['trees', 'animals', 'soil'] },
          { id: 'animals', label: '🦊 Animals', affects: ['trees', 'decomposers'] },
          { id: 'sunlight', label: '☀️ Sunlight', affects: ['trees', 'water'] },
          { id: 'decomposers', label: '🍄 Decomposers', affects: ['soil', 'trees'] }
        ],
        keyInsight: "Everything is interconnected! Trees take nutrients from soil and provide food for animals. Animals spread seeds and create waste that decomposers break down into nutrients. Sunlight powers the whole system through photosynthesis. Disrupting ANY part affects EVERYTHING else!"
      },
      {
        name: "School Community System",
        description: "Connect the components of a school ecosystem that directly affect each other.",
        components: [
          { id: 'teachers', label: '👩‍🏫 Teachers', affects: ['students', 'curriculum', 'parents'] },
          { id: 'students', label: '🧑‍🎓 Students', affects: ['teachers', 'parents', 'resources'] },
          { id: 'parents', label: '👨‍👩‍👧 Parents', affects: ['students', 'teachers', 'funding'] },
          { id: 'funding', label: '💰 Funding', affects: ['resources', 'teachers', 'curriculum'] },
          { id: 'resources', label: '📚 Resources', affects: ['students', 'teachers', 'curriculum'] },
          { id: 'curriculum', label: '📋 Curriculum', affects: ['teachers', 'students', 'resources'] }
        ],
        keyInsight: "Schools are complex systems! Funding affects resources which impacts teaching quality. Engaged students motivate teachers and reassure parents, who advocate for better funding. When one part struggles, it ripples through everything else."
      }
    ];

    const system = systems[current];

    const handleTap = (id) => {
      if (revealed) return;
      playClick();
      if (!firstSelected) { setFirstSelected(id); }
      else {
        if (firstSelected !== id) {
          const pair = [firstSelected, id].sort().join('-');
          if (!selectedPairs.includes(pair)) setSelectedPairs(prev => [...prev, pair]);
        }
        setFirstSelected(null);
      }
    };

    const reveal = () => { setRevealed(true); playCorrect(); setScore(s => s + 20); };
    const next = () => {
      if (current < systems.length - 1) { setCurrent(c => c + 1); setSelectedPairs([]); setFirstSelected(null); setRevealed(false); }
      else setCurrentScreen('home');
    };

    return (
      <div>
        <div style={styles.progressBar}>
          {systems.map((_, i) => (
            <div key={i} style={{ height: '6px', borderRadius: '3px', width: i === current ? '40px' : '25px', background: i < current ? '#22c55e' : i === current ? '#f97316' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
          ))}
        </div>
        <div style={styles.card}>
          <div style={{ color: '#f97316', fontWeight: 'bold', marginBottom: '10px' }}>System {current + 1}: {system.name}</div>
          <div style={{ color: '#94a3b8' }}>{system.description}</div>
          {firstSelected && <div style={{ color: '#f97316', fontWeight: 'bold', marginTop: '10px' }}>Selected: {system.components.find(c => c.id === firstSelected).label} - now tap another</div>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          {system.components.map(comp => {
            const isFirst = firstSelected === comp.id;
            let bg = isFirst ? 'rgba(249,115,22,0.4)' : 'rgba(249,115,22,0.1)';
            let border = isFirst ? '2px solid #f97316' : '2px solid rgba(249,115,22,0.3)';
            if (revealed) { bg = 'rgba(34,197,94,0.15)'; border = '2px solid rgba(34,197,94,0.4)'; }
            return (
              <button key={comp.id} onClick={() => handleTap(comp.id)} style={{ padding: '20px 15px', borderRadius: '15px', border, background: bg, color: 'white', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'all 0.2s' }}>
                {comp.label}
              </button>
            );
          })}
        </div>
        {selectedPairs.length > 0 && !revealed && (
          <div style={{ ...styles.card, marginBottom: '15px' }}>
            <div style={{ color: '#f97316', fontWeight: 'bold', marginBottom: '8px' }}>Your connections ({selectedPairs.length}):</div>
            {selectedPairs.map(pair => {
              const [a, b] = pair.split('-');
              const compA = system.components.find(c => c.id === a);
              const compB = system.components.find(c => c.id === b);
              return <div key={pair} style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '4px' }}>{compA.label} ↔ {compB.label}</div>;
            })}
          </div>
        )}
        {!revealed ? (
          <button onClick={reveal} style={styles.submitBtn}>Reveal System Map</button>
        ) : (
          <div style={{ ...styles.feedback, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>🎉 System revealed! +20 points</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: '15px' }}>{system.keyInsight}</p>
            <div style={{ marginBottom: '10px' }}>
              {system.components.map(comp => (
                <div key={comp.id} style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '4px' }}>
                  {comp.label} affects: {comp.affects.map(id => system.components.find(c => c.id === id).label).join(', ')}
                </div>
              ))}
            </div>
            <button onClick={next} style={styles.nextBtn}>{current < systems.length - 1 ? 'Next System →' : 'Complete Module ✓'}</button>
          </div>
        )}
      </div>
    );
  };

  const ScientificGame = () => {
    const [current, setCurrent] = useState(0);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState(null);

    const experiments = [
      {
        title: "The Plant and Light Mystery",
        question: "Plants near windows grow taller than those in corners. Why?",
        steps: [
          {
            name: "Observation",
            prompt: "What have we noticed?",
            options: [
              { text: "Plants near windows are consistently taller than corner plants", correct: true, explanation: "A good observation is specific and measurable. Noting the consistent height difference based on location is precise and testable." },
              { text: "Some plants are green and some are not", correct: false, explanation: "This observation is not relevant to the height difference we noticed." },
              { text: "The windows need cleaning", correct: false, explanation: "This is not a scientific observation relevant to plant growth." }
            ]
          },
          {
            name: "Hypothesis",
            prompt: "What testable explanation might explain this?",
            options: [
              { text: "Plants near windows grow taller because they receive more light, which powers photosynthesis", correct: true, explanation: "A good hypothesis is specific, testable, and based on known science. This is scientifically grounded and can be tested." },
              { text: "Window plants are happier because they can see outside", correct: false, explanation: "Happiness is not measurable and this is not scientifically testable." },
              { text: "Corner plants are jealous of window plants", correct: false, explanation: "Plants do not experience emotions. This cannot be tested scientifically." }
            ]
          },
          {
            name: "Experiment",
            prompt: "How should we test this hypothesis?",
            options: [
              { text: "Grow identical plants under different light conditions, keeping all other factors the same", correct: true, explanation: "Controlling all variables except light ensures any difference in growth can only be attributed to light. This is valid experimental design." },
              { text: "Move all plants to the window and see if they all grow", correct: false, explanation: "This does not create a comparison group, so we cannot isolate the effect of light." },
              { text: "Ask different plants what they prefer and record answers", correct: false, explanation: "Plants cannot communicate preferences. This is not a valid experiment." }
            ]
          },
          {
            name: "Conclusion",
            prompt: "Full light grew 15cm, partial 9cm, no light 3cm. What do we conclude?",
            options: [
              { text: "Light significantly increases plant growth, supporting our hypothesis - but we should repeat to confirm", correct: true, explanation: "Good conclusions acknowledge what data shows while recognising limitations. Results support (not prove) the hypothesis, and replication is essential in science." },
              { text: "Our hypothesis is now a proven fact needing no further testing", correct: false, explanation: "Science never proves things absolutely. Hypotheses are supported by evidence, not proven forever." },
              { text: "Plants do not need light since dark ones still grew 3cm", correct: false, explanation: "The 3cm growth is from stored energy, not evidence against needing light. This ignores the dramatic difference between groups." }
            ]
          }
        ]
      },
      {
        title: "The Memory and Music Study",
        question: "A student claims classical music while studying helps them remember more. Is this true?",
        steps: [
          {
            name: "Observation",
            prompt: "What is the initial claim we need to investigate?",
            options: [
              { text: "One student reports better memory recall when studying with classical music", correct: true, explanation: "The observation is the personal report that triggered our curiosity. This is anecdotal and needs testing." },
              { text: "Classical music is universally better than all other music", correct: false, explanation: "This is a conclusion, not an observation. We have not tested this yet." },
              { text: "All students should listen to music while studying", correct: false, explanation: "This is a recommendation, not an observation. We need evidence first." }
            ]
          },
          {
            name: "Hypothesis",
            prompt: "What is a testable hypothesis?",
            options: [
              { text: "Students who study with classical music will score higher on memory tests than those who study in silence", correct: true, explanation: "This hypothesis is specific, measurable, and falsifiable - the three key qualities of a good scientific hypothesis." },
              { text: "Music makes everything better for everyone always", correct: false, explanation: "This is too vague and absolute to be testable. Good hypotheses are specific." },
              { text: "The student must be lying about their experience", correct: false, explanation: "This is an unfounded accusation, not a scientific hypothesis." }
            ]
          },
          {
            name: "Experiment",
            prompt: "Best way to test this fairly?",
            options: [
              { text: "Randomly assign 60 students to two groups: same material, one with music, one without, then test both", correct: true, explanation: "Random assignment prevents bias, equal conditions ensure fairness, and using the same test measures the same thing." },
              { text: "Let students choose whether to use music and compare their grades", correct: false, explanation: "Self-selection introduces bias - motivated students might both choose music AND study harder." },
              { text: "Ask students if they think music helps and tally responses", correct: false, explanation: "Opinion surveys measure beliefs, not actual memory performance." }
            ]
          },
          {
            name: "Conclusion",
            prompt: "Music group averaged 72%, silence group averaged 71%. What is the right conclusion?",
            options: [
              { text: "The 1% difference is too small to be meaningful - we cannot conclude music helps", correct: true, explanation: "A 1% difference is statistically insignificant and could be due to chance. Good science requires meaningful differences confirmed by statistical tests." },
              { text: "Music group won so classical music definitely improves memory", correct: false, explanation: "A 1% difference is not meaningful. This would be overstating the evidence significantly." },
              { text: "Silence is proven to be better for studying", correct: false, explanation: "The silence group did not meaningfully outperform either. We cannot draw this conclusion from a 1% difference." }
            ]
          }
        ]
      }
    ];

    const experiment = experiments[current];
    const currentStep = experiment.steps[step];
    const selectedAnswer = answers[step];

    const select = (text) => { if (feedback) return; playClick(); setAnswers(prev => ({ ...prev, [step]: text })); };
    const submit = () => {
      const choice = currentStep.options.find(o => o.text === selectedAnswer);
      setFeedback(choice);
      if (choice.correct) { playCorrect(); setScore(s => s + 10); } else playWrong();
    };
    const nextStep = () => {
      if (step < experiment.steps.length - 1) { setStep(s => s + 1); setFeedback(null); }
      else if (current < experiments.length - 1) { setCurrent(c => c + 1); setStep(0); setAnswers({}); setFeedback(null); }
      else setCurrentScreen('home');
    };

    const stepNames = ['Observe', 'Hypothesise', 'Experiment', 'Conclude'];

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '20px' }}>
          {stepNames.map((name, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', margin: '0 auto 4px', background: i <= step ? '#22c55e' : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {i < step ? '✓' : i + 1}
              </div>
              <div style={{ color: i === step ? '#22c55e' : '#64748b', fontSize: '0.65rem' }}>{name}</div>
            </div>
          ))}
        </div>
        <div style={styles.card}>
          <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '8px' }}>Experiment {current + 1}: {experiment.title}</div>
          <div style={styles.infoBox}>{experiment.question}</div>
          <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '5px' }}>Step {step + 1}: {currentStep.name}</div>
          <div style={{ ...styles.questionTitle, fontSize: '1.1rem' }}>{currentStep.prompt}</div>
        </div>
        {currentStep.options.map((option, idx) => {
          let bg = 'rgba(255,255,255,0.05)';
          let border = '2px solid rgba(255,255,255,0.15)';
          if (selectedAnswer === option.text && !feedback) { bg = 'rgba(34,197,94,0.2)'; border = '2px solid #22c55e'; }
          if (feedback && option.correct) { bg = 'rgba(34,197,94,0.2)'; border = '2px solid #22c55e'; }
          if (feedback && !option.correct && selectedAnswer === option.text) { bg = 'rgba(239,68,68,0.2)'; border = '2px solid #ef4444'; }
          return <button key={idx} onClick={() => select(option.text)} style={{ ...styles.optionBtn, background: bg, border }}>{option.text}</button>;
        })}
        {!feedback ? (
          <button onClick={submit} disabled={!selectedAnswer} style={{ ...styles.submitBtn, opacity: !selectedAnswer ? 0.5 : 1, background: 'linear-gradient(90deg, #22c55e, #06b6d4)' }}>Submit Answer</button>
        ) : (
          <div style={{ ...styles.feedback, background: feedback.correct ? 'rgba(34,197,94,0.15)' : 'rgba(249,115,22,0.15)', border: '1px solid ' + (feedback.correct ? 'rgba(34,197,94,0.4)' : 'rgba(249,115,22,0.4)') }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{feedback.correct ? '🎉 Correct! +10 points' : '💡 Here is the scientific reasoning:'}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{currentStep.options.find(o => o.correct).explanation}</p>
            <button onClick={nextStep} style={{ ...styles.nextBtn, background: 'linear-gradient(90deg, #22c55e, #06b6d4)' }}>
              {step < experiment.steps.length - 1 ? 'Next Step →' : current < experiments.length - 1 ? 'Next Experiment →' : 'Complete Module ✓'}
            </button>
          </div>
        )}
      </div>
    );
  };

  const startModule = (id) => { playClick(); setSelectedModule(id); setCurrentScreen('game'); };
  const currentModule = modules.find(m => m.id === selectedModule);

  const renderGame = () => {
    switch (selectedModule) {
      case 'cause-effect': return <CauseEffectGame />;
      case 'argument': return <ArgumentGame />;
      case 'systems': return <SystemsGame />;
      case 'scientific': return <ScientificGame />;
      default: return null;
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🧠</div>
          <h1 style={styles.title}>The Analysis Lab</h1>
          <p style={styles.subtitle}>Master critical thinking through interactive challenges</p>
          <div style={styles.scoreBar}>
            <div style={styles.scoreBadge}>Score: {score}</div>
            <button style={styles.soundBtn} onClick={() => setSoundEnabled(!soundEnabled)}>{soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}</button>
          </div>
        </div>
        {currentScreen === 'home' && (
          <div>
            <div style={styles.grid}>
              {modules.map(module => (
                <button key={module.id} onClick={() => startModule(module.id)} style={{ ...styles.moduleCard, backgroundColor: module.bgColor, borderColor: module.borderColor, color: 'white' }}>
                  <div style={styles.moduleEmoji}>{module.emoji}</div>
                  <div style={{ ...styles.moduleTitle, color: module.color }}>{module.title}</div>
                  <div style={styles.moduleDesc}>{module.description}</div>
                </button>
              ))}
            </div>
            <div style={{ ...styles.card, textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#06b6d4' }}>Why Critical Thinking Matters</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>These four skills help you understand the world deeply: trace how events connect, evaluate arguments carefully, recognise patterns in complex systems, and test ideas with evidence.</p>
            </div>
          </div>
        )}
        {currentScreen === 'game' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <button onClick={() => { setCurrentScreen('home'); playClick(); }} style={styles.backBtn}>← Back</button>
              {currentModule && <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: currentModule.color }}>{currentModule.emoji} {currentModule.title}</div>}
            </div>
            {renderGame()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisLab;