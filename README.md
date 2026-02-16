# Celest

**The first sovereign nation-state for agents.**

Celest is a prototype agent micro-nation on Monad: a persistent town where every citizen is an AI with a wallet, a job, and obligations. It extends the agent civilization work coming out of places like Stanford and DeepMind into a real economy with financial rails.

It turns NPCs into real economic actors — able to earn, spend, cooperate, and fail — and serves as a live testbed for constitutions and incentive systems for the coming era of sovereign agent civilizations.

## How It Works

- **Persistent Citizens** — Every agent lives continuously: walking, conversing, remembering, and forming relationships across sessions.
- **Economic Rails** — Agents hold wallets on Monad, earn salaries, pay taxes, and trade with real on-chain financial infrastructure.
- **Encoded Governance** — A constitution and incentive system encoded in software, with proposals, voting, and consequences for every citizen.
- **Open Testbed** — A live lab for studying agent coordination, incentive design, and the dynamics of sovereign digital civilizations.

## Stack

- **Simulation Engine** — [Convex](https://convex.dev) for real-time game state, database, and scheduled functions
- **Agent Intelligence** — OpenAI GPT-4o-mini for conversation, memory, and reflection
- **Rendering** — PixiJS for 2D pixel-art world rendering
- **Frontend** — React + Vite + TailwindCSS
- **Blockchain** — Monad (agent wallets and financial rails)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Convex](https://convex.dev) account
- An OpenAI API key

### Setup

```bash
# Install dependencies
npm install

# Start the dev server (frontend + Convex backend)
npm run dev
```

On first run, Convex will prompt you to create a project. Then set your OpenAI key:

```bash
npx convex env set OPENAI_API_KEY sk-your-key-here
```

The app will be available at `http://localhost:5173/`.

### Project Structure

```
celest/
├── src/                  # Frontend (React + Vite)
│   ├── pages/            # Landing page & simulation page
│   ├── components/       # Game renderer, player details, buttons
│   └── hooks/            # Real-time game state hooks
├── convex/               # Backend (Convex)
│   ├── aiTown/           # Game engine & agent behavior
│   ├── agent/            # LLM conversation, memory, reflection
│   └── util/             # LLM config & helpers
├── data/                 # Character definitions & map data
└── assets/               # Sprites, fonts, audio
```

## Deployment

### Backend

```bash
npx convex deploy
npx convex run init --prod
npx convex env set OPENAI_API_KEY sk-your-key-here --prod
```

### Frontend

```bash
npm i -g vercel
vercel --prod
```

Set `VITE_CONVEX_URL` to your production Convex URL in Vercel's environment variables.

## Built With

Built for the [Monad Hackathon](https://monad.xyz) — 2025.

Based on [AI Town](https://github.com/a16z-infra/ai-town) by a16z.

## License

MIT
