import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction } from '@solana/spl-token';
import bs58 from 'bs58';

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY, 
  environment: "test_mode", 
});

// THE FIX: Official Circle Devnet USDC Mint (Standard spl-token)
const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("id");
    const targetWalletStr = searchParams.get("wallet"); 

    if (!paymentId || !targetWalletStr) {
      return NextResponse.json({ error: "Missing ID or Wallet" }, { status: 400 });
    }

    const payment = await dodo.payments.retrieve(paymentId);

    if (payment.status === 'succeeded') {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const secretKeyBytes = bs58.decode(process.env.TREASURY_PRIVATE_KEY as string);
      const treasuryWallet = Keypair.fromSecretKey(secretKeyBytes);
      const userWalletAddress = new PublicKey(targetWalletStr);

      // 1. Calculate ATAs securely without making network calls
      const senderATA = await getAssociatedTokenAddress(USDC_MINT, treasuryWallet.publicKey);
      const receiverATA = await getAssociatedTokenAddress(USDC_MINT, userWalletAddress);

      // 2. Check if the user's account actually exists on the network
      const receiverAccountInfo = await connection.getAccountInfo(receiverATA);

      // Initialize an empty transaction payload
      const transaction = new Transaction();

      // 3. If the user doesn't have an account, pack the creation instruction!
      if (!receiverAccountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            treasuryWallet.publicKey, // Payer
            receiverATA,              // The account being created
            userWalletAddress,        // The owner
            USDC_MINT                 // The official token mint
          )
        );
      }

      // 4. Calculate the exact USDC amount from the fiat receipt
      const fiatAmountPaid = payment.total_amount / 100; 
      const amountInMicroUSDC = fiatAmountPaid * 1000000;

      // 5. Pack the transfer instruction into the SAME payload
      transaction.add(
        createTransferInstruction(
          senderATA,
          receiverATA,
          treasuryWallet.publicKey,
          amountInMicroUSDC
        )
      );

      // 6. Blast the single transaction to the network!
      const signature = await sendAndConfirmTransaction(
        connection, 
        transaction, 
        [treasuryWallet]
      );

      return NextResponse.json({ status: payment.status, hash: signature });
    }

    return NextResponse.json({ status: payment.status });
  } catch (error) {
    console.error("Bridge Error:", error);
    return NextResponse.json({ error: "Bridge failed" }, { status: 500 });
  }
}