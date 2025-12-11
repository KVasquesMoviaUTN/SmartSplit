# Smart Split: Advanced Hypertrophy Tracker

![Smart Split Banner](https://via.placeholder.com/1200x400.png?text=Smart+Split+Preview)

> **Live Demo:** [Link to Demo] | **Status:** Production Ready

**Smart Split** is a high-performance Progressive Web App (PWA) engineered to solve a specific problem in resistance training: quantifying systemic fatigue. Unlike generic trackers, it uses a custom **Linear Fatigue Algorithm** to visualize cumulative stress and muscle recovery in real-time.

## 🎯 Why I Built This
I wanted to bridge the gap between simple loggers and complex biomechanics software. The goal was to demonstrate how **modern web technologies** can deliver native-like performance and complex data visualization without sacrificing accessibility or SEO.

## 🛠 Engineering Spotlight

### Core Architecture
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) for server-side rendering and SEO optimization.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) selected over Redux for its atomic updates and reduced boilerplate, ensuring 60fps performance during complex heatmap re-renders.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with a mobile-first approach, implementing a custom design system without relying on heavy component libraries.
- **Type Safety:** **Strict TypeScript** configuration to eliminate runtime errors and ensure self-documenting code.

### Key Features & Challenges Solved
1.  **Real-Time Data Visualization**:
    - *Challenge:* Rendering complex SVG heatmaps efficiently on mobile devices.
    - *Solution:* Implemented a component-level hydration strategy where the SVG layers are decoupled from the main thread logic, ensuring smooth interactions even with large datasets.

2.  **Offline Capability (PWA)**:
    - *Challenge:* Users need access to their logs in gyms with poor connectivity.
    - *Solution:* Integrated a custom Service Worker Strategy that caches static assets and queues API mutations for background sync (staged).

3.  **Algorithmic Complexity**:
    - *Challenge:* Calculating "System Stress" requires aggregating multi-variable inputs (volume, intensity, muscle groups).
    - *Solution:* Developed a pure function `calculateRecovery` engine that is fully unit-tested with **Jest** to ensure accuracy across edge cases.

## ✅ Quality Assurance
- **Testing:** 
  - **Unit:** 100% coverage on core logic modules (`__tests__/store.test.ts`, `recovery.test.ts`).
  - **E2E:** Critical user flows automated with **Playwright**.
- **CI/CD:** Automated pipelines via **GitHub Actions** run linting, type checking, and tests on every push.
- **Code Quality:** Enforced with **Husky** (pre-commit hooks) and **Lint-staged** to prevent bad commits.

## 🚀 Quick Start for Reviewers

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
