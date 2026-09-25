"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import {
  CheckoutProgress,
  OrderSuccessCheckmark,
  ShineButton,
} from "../../components/MotionComponents";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  return (
    <main className="page">
      {done ? (
        <div className="success">
          <OrderSuccessCheckmark />
          <span className="eyebrow">ORDER COMPLETE</span>
          <h1>You're all <i>set.</i></h1>
          <p>Your order #NX-2026-921 has been placed. Encrypted courier tracking dispatch initiated.</p>
          <Link href="/shop" style={{ textDecoration: "none", display: "inline-block", marginTop: "20px" }}>
            <ShineButton as="span" variant="primary">
              Continue shopping <ArrowUpRight size={16} />
            </ShineButton>
          </Link>
        </div>
      ) : (
        <div className="checkout">
          <div>
            <CheckoutProgress currentStep={step} />

            <span className="eyebrow">CONCIERGE CHECKOUT</span>
            <h1>Almost <i>there.</i></h1>

            <label>Email<input type="email" placeholder="you@domain.com" /></label>
            <label>Full name<input placeholder="Full legal name" /></label>
            <label>Address<input placeholder="Delivery address & flat / suite" /></label>
            <div className="two">
              <label>City<input placeholder="City" /></label>
              <label>PIN code<input placeholder="PIN code" /></label>
            </div>

            <ShineButton
              variant="primary"
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  setDone(true);
                }
              }}
              style={{ marginTop: "20px", width: "100%" }}
            >
              {step === 3 ? "Place order & Pay Securely" : "Continue to Next Step"} <Check size={16} />
            </ShineButton>
          </div>

          <aside className="summary">
            <span className="eyebrow">SECURITY GUARANTEE</span>
            <h2>Your details stay encrypted.</h2>
            <p>Every transaction on NEXORA is protected with end-to-end 256-bit bank encryption and white-glove insured delivery.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
