# 🌊 SubStream Protocol

> **The Fiat-to-Crypto Settlement Layer for Human Freelancers & Autonomous AI Agents.**
> Built for the Global Solana Hackathon.

![SubStream Demo](https://via.placeholder.com/1200x600.png?text=SubStream+Dashboard+Screenshot+Here) 
*(Note: Replace this placeholder link with a real screenshot of your beautiful dashboard!)*

## ⚠️ The Legacy Problem
The current global banking infrastructure is fundamentally broken for the modern internet economy:
1. **Human Friction:** Global freelancers lose 5-7% of their income to cross-border SWIFT wire fees and bad FX rates, waiting 3-5 business days for settlement.
2. **The AI Disconnect:** Autonomous AI models have no bank accounts and no native way to charge human users for completed computational tasks.

## 💡 The SubStream Solution
SubStream is an enterprise-grade settlement gateway built on **Solana** and powered by **Dodo Payments**. We bypass the legacy banking system entirely.
* **For Humans:** Generate a decentralized checkout link. Your client pays in their local fiat. You receive USDC directly to your Solana wallet in under 400ms.
* **For Machines (x402 Protocol):** A dedicated machine-to-machine API allowing AI agents to generate instant payment gates for their data outputs, autonomously routing fiat payments into Web3 wallets.

## ⚙️ Core Architecture & Features

### 1. Frictionless, Localized Fiat On-Ramp
Clients do not need to understand crypto or own a wallet. SubStream utilizes Dodo's localized checkout UI, automatically adapting to the client's geographic IP. A user in the US sees Apple Pay, while a user in India sees RBI-compliant local card options. 

### 2. x402 Autonomous Billing Agent
SubStream equips AI models with native Web3 financial rails using dynamic, usage-based pricing. 

```json
// Example x402 AI Agent Payload Request
{
  "agent_id": "research_bot_v4",
  "amount_usd": 57.00,
  "description": "Generated 38 seconds via Video Render (4k)"
}
```

When an agent hits this endpoint, SubStream calculates the compute cost and generates a `402 Payment Required` fiat gate. Once the human pays with a credit card, the AI releases the data, and the developer earns instant USDC.

### 3. On-Chain Settlement Ledger
Every generated link, pending payment, failed checkout, and settled transaction is tracked in real-time via the SubStream Dashboard, ensuring 100% transparency.

## 🛠️ Tech Stack
* **Frontend:** Next.js 14, Tailwind CSS, Lucide Icons
* **Web3 Integration:** `@solana/wallet-adapter`
* **Payments & Fiat Bridging:** Dodo Payments API
* **Deployment:** Vercel

## 🚀 Running Locally

1. Clone the repository:
```bash
git clone [https://github.com/yourusername/substream.git](https://github.com/yourusername/substream.git)
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Dodo API Key:
```env
DODO_PAYMENTS_API_KEY=your_dodo_secret_key_here
```

4. Run the development server:
```bash
npm run dev
```

---
*Built with 🩵 for the Solana Ecosystem.*