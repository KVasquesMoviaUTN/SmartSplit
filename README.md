# Smart Split: Advanced Hypertrophy Tracker

![Smart Split Banner](https://via.placeholder.com/1200x400.png?text=Smart+Split+Preview)

> **Live Demo:** [Link to Demo] | **Status:** Production Ready

**Smart Split** is a high-performance Progressive Web App (PWA) engineered to quantify systemic fatigue and visualize muscle recovery in real-time. Unlike generic trackers, it combines **physiological algorithms** (Mifflin-St Jeor) with **biomechanical data** to provide personalized insights.

## 🎯 Why I Built This
To bridge the gap between simple workout loggers and complex biomechanics software. The goal was to demonstrate how **modern web technologies** can deliver native-like performance, complex data visualization, and offline capabilities without sacrificing accessibility or SEO.

## 🛠 Engineering Spotlight

### Core Architecture
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) for server-side rendering and SEO optimizations.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) with **Persistence Middleware** for an offline-first experience.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) implementing a custom design system with Glassmorphism and hardware-accelerated animations.
- **Type Safety:** **Strict TypeScript** configuration to eliminate runtime errors.

### Key Features & Technical Implementations

#### 1. Real-Time Biomechanical Heatmap
- *Implementation:* Decoupled SVG layer rendering component that maps 24+ unique muscle groups to a 4-tier fatigue scale.
- *Performance:* optimized for 60fps interaction on mobile devices using separate hydration layers.
- *UX:* "Scanner" animations and dynamic contrast adjustment for Dark/Light modes.

#### 2. Advanced Algorithmic Logic
- **Calorie Burn Engine:** Implements the **Mifflin-St Jeor Equation** combined with exercise-specific **MET (Metabolic Equivalent)** values to calculate personalized energy expenditure based on user biometrics (height, weight, age, gender).
- **Linear Fatigue Modeling:** Aggregates volume load across primary and secondary muscle movers (e.g., a Bench Press fatigues Triceps at 70% of Pecs) to predict recovery times (12h - 96h).

#### 3. Global Accessibility
- **Internationalization (i18n):** Native support for 10+ languages including RTL support for Arabic, managed via a scalable dictionary store.
- **Data Portability:** Client-side **CSV Generation** allowing users to instantly export their raw workout data for external analysis.

#### 4. System Stability
- **Duration Estimation:** Dynamic time forecasting based on Rep/Set tempo settings.
- **Unit Conversion:** Real-time bidirectional conversion between Imperial (lbs) and Metric (kg) systems.

## ✅ Quality Assurance
- **Testing Strategy:** 
  - **Unit:** 100% coverage on core logic modules (recovery algorithms, calorie math) using **Jest**.
  - **E2E:** Critical user flows automated with **Playwright**.
- **CI/CD:** Automated pipelines via **GitHub Actions** run linting and type checking on every push.
- **Code Quality:** Enforced with **Husky** (pre-commit hooks) and **Lint-staged**.

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/KVasquesMoviaUTN/SmartSplit.git

# Install dependencies (Node 20+)
npm install

# Run the development server
npm run dev

# Run the full test suite
npm test && npx playwright test
```

## 👨‍💻 Author

Built by **[Kalil Vasques Movia]**.
*Software Engineer specializing in React, TypeScript, and Performance Optimization.*

[Portfolio] • [[LinkedIn](https://www.linkedin.com/in/kalil-vasques-movia/)] • [[GitHub](https://github.com/KVasquesMoviaUTN)]
