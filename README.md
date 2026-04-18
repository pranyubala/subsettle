# ⚡️ SubStream Protocol
**The Autonomous Fiat-to-Crypto Settlement Layer for the Global Internet.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-substream.vercel.app-blue?style=for-the-badge)](https://YOUR_VERCEL_LINK_HERE.vercel.app)
[![Pitch Video](https://img.shields.io/badge/Pitch_Video-YouTube-red?style=for-the-badge)](https://YOUR_YOUTUBE_LINK_HERE)
[![Powered By](https://img.shields.io/badge/Powered_By-Solana_|_Dodo_Payments-black?style=for-the-badge)]()

> **Built for the Dodo Payments x Solana Global Hackathon.**

## 🚨 The Billion-Dollar Problem
The next iteration of the internet is being built by a borderless workforce of global freelancers and autonomous AI agents. Yet, they are forced to rely on fractured, legacy financial rails. 
1. **The Human Tax:** Global creators and freelancers lose 5% to 7% of their income to SWIFT network fees, currency conversion, and banking delays that take 3-5 business days to settle.
2. **The AI Lockout:** Autonomous AI models can generate immense value (research, code, data), but they cannot open traditional bank accounts. Because they lack financial rails, they cannot autonomously charge humans for their work.

## 💡 The SubStream Solution
**Zero-friction fiat onboarding. Instant Web3 settlement.** SubStream is a decentralized payment bridge. It allows clients to pay for services in their local fiat currency (via standard credit cards), while the creator or AI agent instantly receives stablecoins (USDC) directly on the Solana blockchain.
* **Bypass SWIFT:** Eliminate legacy banking fees and cross-border delays entirely.
* **Instant Settlement:** Funds are bridged and settled on-chain in seconds.
* **Programmable Revenue:** AI agents can now gate their execution behind SubStream paywalls, autonomously collecting revenue without human intervention.

---

## 🧠 The Technical Flex (Why this is hard)
Building a fiat-to-crypto bridge requires solving complex Web2/Web3 synchronization issues. Here is how we engineered SubStream to be bulletproof:
* **Dynamic ATA Routing:** Sending SOL is easy; sending USDC is hard. SubStream uses `@solana/spl-token` to dynamically calculate and locate the user's Associated Token Account (ATA), creating it on the fly if it doesn't exist before transferring funds.
* **Secure Webhook Verification:** We don't rely on frontend callbacks. Our Next.js Edge API acts as a secure Oracle, listening for Dodo's server-side webhooks to verify fiat clearance before authorizing the Treasury to sign the Solana transaction.
* **Isolated Treasury Architecture:** The system utilizes a hot-wallet Treasury pattern, keeping the signing authority strictly on the backend. The frontend remains entirely trustless.

## 🏗️ System Architecture Flow
```text
[Web2 Client] -> Swipes Credit Card ($50)
      ↓
[Dodo Payments] -> Clears Fiat -> Deposits to Real Bank Account
      ↓
(Secure Webhook Ping)
      ↓
[SubStream API] -> Verifies Payment -> Unlocks Treasury Private Key
      ↓
[Solana Devnet] -> Mints/Transfers 50 USDC to Connected User Wallet (ATA)
      ↓
[SubStream UI] -> Displays Cryptographic Solscan Hash to User

Judge's Testing Guide (Quick Start)
This application is currently live and optimized for testing on Solana Devnet and Dodo Test Mode.

To experience the full fiat-to-crypto bridge:

Connect a Solana Wallet (e.g., Phantom) to the dashboard and ensure it is set to Devnet.

Click Deploy Smart Invoice (or run the x402 AI simulation).

Open the generated Dodo payment link.

Use the official Dodo Test Credit Card:

Card Number: 4242 4242 4242 4242

Expiry: Any future date (e.g., 12/30)

CVC: 123

Upon redirect, watch the dashboard update from "Awaiting Fiat" to "Settled". Click the purple View on Solscan button to verify the real on-chain transfer!

🛡️ Treasury Security Notice: To preserve our Treasury's Devnet liquidity for all judges and prevent automated draining, manual invoices and AI agent simulations are strictly capped at a $15.00 maximum per transaction.

💼 The Business Model
SubStream isn't just a protocol; it's a highly profitable FinTech architecture. As the middle-layer bridge, SubStream captures a 1.5% routing fee on the spread between the fiat ingested via Dodo and the USDC dispensed via Solana, vastly undercutting Stripe Crypto and MoonPay while remaining highly profitable.

💻 Technical Stack
Frontend: Next.js 14 (App Router), React, Tailwind CSS, Lucide Icons

Web3 Infrastructure: @solana/web3.js, @solana/spl-token, Solana Wallet Adapter

Fiat Processing: Dodo Payments API & Secure Webhooks

Deployment & Edge: Vercel

🔮 Future Roadmap (Mainnet & Beyond)
Mainnet Beta Deployment: Swapping Dodo test keys for live production keys and shifting the RPC endpoint to Solana Mainnet.

Automated Liquidity Pools: Integrating with Raydium to automatically swap incoming fiat-backed USDC into SOL, BONK, or any token the user prefers upon settlement.

x402 SDK: Releasing an npm package allowing AI developers to install our billing protocol directly into their Python/Node agents with two lines of code.

Built with passion, caffeine, and Web3 magic.
