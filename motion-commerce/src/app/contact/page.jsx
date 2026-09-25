"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { MotionReveal } from "../../components/MotionComponents";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email) {
      setSubmitted(true);
    }
  };

  return (
    <main className="page" style={{ paddingTop: 110, maxWidth: 1100, margin: "0 auto", paddingBottom: 100 }}>
      <MotionReveal>
        <div className="pageHero" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 50px" }}>
          <span className="eyebrow" style={{ letterSpacing: "3px", color: "#d4af37", fontWeight: 700 }}>
            CONCIERGE & SUPPORT
          </span>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 52px)", margin: "16px 0", color: "#fff" }}>
            Get in <i>Touch.</i>
          </h1>
          <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6 }}>
            Our luxury concierge team is at your disposal 24/7. Reach out with inquiries regarding bespoke orders, styling advice, or order tracking.
          </p>
        </div>
      </MotionReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
        {/* Contact Info & Channels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            {
              icon: Mail,
              title: "Concierge Email",
              detail: "concierge@nexora.luxury",
              sub: "Average response: under 2 hours"
            },
            {
              icon: Phone,
              title: "Direct Assistance",
              detail: "+1 (800) 892-NEXORA",
              sub: "Mon - Sun: 24 Hours Worldwide"
            },
            {
              icon: MapPin,
              title: "Flagship Showroom",
              detail: "450 Avenue Montaigne, Paris",
              sub: "Private viewings by appointment"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: "rgba(18, 18, 24, 0.7)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  borderRadius: 16,
                  padding: "24px 26px",
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start"
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(212, 175, 55, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffd875",
                    flexShrink: 0
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>{item.title}</h4>
                  <p style={{ color: "#ffd875", fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>{item.detail}</p>
                  <small style={{ color: "#71717a", fontSize: 12 }}>{item.sub}</small>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div
          style={{
            background: "rgba(18, 18, 24, 0.8)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            borderRadius: 20,
            padding: "36px 32px"
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 10px" }}>
              <CheckCircle size={48} color="#d4af37" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Message Sent</h3>
              <p style={{ color: "#a1a1aa", fontSize: 14, maxWidth: 360, margin: "0 auto 24px" }}>
                Thank you, {form.name}. Our concierge specialists will review your message and reach out shortly.
              </p>
              <button
                type="button"
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                style={{
                  background: "rgba(212, 175, 55, 0.15)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  color: "#ffd875",
                  padding: "10px 24px",
                  borderRadius: 999,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>Direct Concierge Dispatch</h3>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#a1a1aa", fontWeight: 600, marginBottom: 6 }}>YOUR NAME</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, color: "#a1a1aa", fontWeight: 600, marginBottom: 6 }}>EMAIL ADDRESS</label>
                <input
                  required
                  type="email"
                  placeholder="e.g. elena@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, color: "#a1a1aa", fontWeight: 600, marginBottom: 6 }}>MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How may our concierge assist your experience?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "none"
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #9e7512)",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "14px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 6,
                  boxShadow: "0 8px 24px rgba(212,175,55,0.3)"
                }}
              >
                Dispatch Message <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
