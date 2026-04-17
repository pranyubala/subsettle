import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY, 
  environment: "test_mode", 
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("id");

    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment ID" }, { status: 400 });
    }

  
    const payment = await dodo.payments.retrieve(paymentId);

    
    return NextResponse.json({ status: payment.status });
    
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}