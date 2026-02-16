# The Analysis Lab 🧠

An interactive educational game designed to develop critical thinking skills through engaging challenges in cause & effect analysis, argument evaluation, systems thinking, and the scientific method.

![The Analysis Lab](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🧬 Cause & Effect Explorer** - Trace chains of events and understand causality
- **🎯 Argument Analyzer** - Break down reasoning and evaluate logical claims
- **🔄 System Thinker** - Explore how components interact in complex systems
- **🔬 Scientific Method Lab** - Practice hypothesis formation and evidence-based thinking

### Design Highlights

- Beautiful gradient-based UI with smooth animations
- Interactive sound effects powered by Tone.js
- Responsive design for all devices
- Progressive difficulty suitable for all ages
- Real-time scoring and feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/coherence-nikolai/analysis-lab.git
cd analysis-lab
```

1. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm start
```

1. Open <http://localhost:3000> in your browser

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🌐 Deployment

### Deploy to Netlify

1. Push your code to GitHub
1. Go to [Netlify](https://netlify.com)
1. Click “New site from Git”
1. Connect your GitHub repository
1. Build settings:
- Build command: `npm run build`
- Publish directory: `build`
1. Click “Deploy site”

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
1. Run: `vercel`
1. Follow the prompts

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
1. Add to package.json:

```json
"homepage": "https://coherence-nikolai.github.io/analysis-lab",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

1. Run: `npm run deploy`

## 🎮 How to Use

1. **Choose a Module** - Select from the four critical thinking challenges
1. **Enable Sound** - Click the sound icon for audio feedback (optional)
1. **Complete Challenges** - Work through scenarios and earn points
1. **Learn & Improve** - Review explanations to understand the “why” behind each answer

## 🛠️ Built With

- [React](https://reactjs.org/) - UI framework
- [Tone.js](https://tonejs.github.io/) - Audio synthesis
- [Lucide React](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📚 Educational Goals

This tool helps students develop:

- **Analytical thinking** - Understanding cause and effect relationships
- **Logical reasoning** - Identifying fallacies and evaluating arguments
- **Systems thinking** - Recognizing interconnections and feedback loops
- **Scientific literacy** - Applying the scientific method to real problems

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Add new scenarios or modules
- Improve the UI/UX

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ by coherence-nikolai

## 🙏 Acknowledgments

- Inspired by the need for better critical thinking education
- Built to make analytical skills accessible and engaging for all ages

-----

**Enjoy developing your critical thinking skills! 🎯**
