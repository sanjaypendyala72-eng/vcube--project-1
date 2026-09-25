"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const TOPICS = [
  { id: "faq", label: "FAQ & Help Center", category: "Support" },
  { id: "returns", label: "Returns & Exchanges", category: "Support" },
  { id: "shipping", label: "Shipping Information", category: "Support" },
  { id: "sustainability", label: "Sustainability", category: "Company" },
  { id: "privacy", label: "Privacy Policy", category: "Legal" },
  { id: "terms", label: "Terms of Service", category: "Legal" },
  { id: "cookies", label: "Cookie Policy", category: "Legal" },
];

const CONTENT_DATA = {
  faq: (
    <div className="topic-content">
      <h2>Frequently Asked Questions</h2>
      <div className="qa-item">
        <h3>How can I track my order?</h3>
        <p>Once your order has shipped, you will receive an email with tracking information. You can also view your order status by logging into your account and clicking on "Track Order".</p>
      </div>
      <div className="qa-item">
        <h3>Do you ship internationally?</h3>
        <p>Yes, we ship to over 150 countries worldwide. International shipping costs are calculated at checkout based on destination and weight.</p>
      </div>
      <div className="qa-item">
        <h3>What payment methods do you accept?</h3>
        <p>We accept all major credit cards, PayPal, Apple Pay, Google Pay, and select local payment methods depending on your region.</p>
      </div>
    </div>
  ),
  returns: (
    <div className="topic-content">
      <h2>Returns & Exchanges</h2>
      <p>We want you to be completely satisfied with your purchase. If for any reason you are not, we gladly accept returns of unworn, unwashed, undamaged or defective merchandise purchased online for delivery within 30 days of the original purchase.</p>
      <br/>
      <h3>Return Process</h3>
      <ol>
        <li>Initiate a return request in your account portal.</li>
        <li>Print the prepaid return label provided via email.</li>
        <li>Securely pack your items in the original packaging.</li>
        <li>Drop off the package at any authorized shipping location.</li>
      </ol>
      <p>Refunds will be processed to the original form of payment within 5-7 business days of receiving your return.</p>
    </div>
  ),
  shipping: (
    <div className="topic-content">
      <h2>Shipping Information</h2>
      <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
      <br/>
      <table className="legal-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Delivery Time</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard Shipping</td>
            <td>3-5 Business Days</td>
            <td>Free on orders over $150</td>
          </tr>
          <tr>
            <td>Express Shipping</td>
            <td>2 Business Days</td>
            <td>$15.00</td>
          </tr>
          <tr>
            <td>Overnight Shipping</td>
            <td>1 Business Day</td>
            <td>$25.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  sustainability: (
    <div className="topic-content">
      <h2>Our Commitment to Sustainability</h2>
      <p>At NEXORA, luxury meets responsibility. We believe in creating beautiful products without compromising the health of our planet or the well-being of its people.</p>
      <br/>
      <h3>Ethical Sourcing</h3>
      <p>We trace 100% of our raw materials back to their origin to ensure ethical farming and mining practices. All our partners must comply with our strict environmental and social codes of conduct.</p>
      <br/>
      <h3>Carbon Neutrality</h3>
      <p>Since 2024, our operations and shipping have been 100% carbon neutral. We invest heavily in renewable energy projects and reforestation efforts to offset our global footprint.</p>
    </div>
  ),
  privacy: (
    <div className="topic-content">
      <h2>Privacy Policy</h2>
      <p>Last Updated: September 2026</p>
      <br/>
      <p>This Privacy Policy describes how NEXORA ("we", "us", or "our") collects, uses, and shares your personal information when you visit or make a purchase from our website.</p>
      <h3>Information We Collect</h3>
      <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
      <h3>How We Use Your Information</h3>
      <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
    </div>
  ),
  terms: (
    <div className="topic-content">
      <h2>Terms of Service</h2>
      <p>Last Updated: September 2026</p>
      <br/>
      <p>By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions.</p>
      <h3>General Conditions</h3>
      <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.</p>
    </div>
  ),
  cookies: (
    <div className="topic-content">
      <h2>Cookie Policy</h2>
      <p>Our website uses cookies and similar technologies to provide you with a better, faster, and safer experience.</p>
      <h3>What are cookies?</h3>
      <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
      <h3>Managing Cookies</h3>
      <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
    </div>
  ),
};

export default function HelpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryTopic = searchParams.get("topic");
  
  const [activeTopic, setActiveTopic] = useState("faq");

  // Sync state with URL
  useEffect(() => {
    if (queryTopic && CONTENT_DATA[queryTopic]) {
      setActiveTopic(queryTopic);
    } else if (queryTopic === null) {
      setActiveTopic("faq");
    }
  }, [queryTopic]);

  const handleSelect = (id) => {
    setActiveTopic(id);
    router.push(`/help?topic=${id}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Group topics by category
  const categories = TOPICS.reduce((acc, topic) => {
    if (!acc[topic.category]) acc[topic.category] = [];
    acc[topic.category].push(topic);
    return acc;
  }, {});

  return (
    <div className="help-layout">
      {/* Sidebar Navigation */}
      <aside className="help-sidebar">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="help-nav-group">
            <h4 className="help-nav-title">{category}</h4>
            <ul className="help-nav-list">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    className={`help-nav-btn ${activeTopic === item.id ? "active" : ""}`}
                    onClick={() => handleSelect(item.id)}
                  >
                    {item.label}
                    {activeTopic === item.id && <ChevronRight size={14} className="active-icon" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <section className="help-content-area">
        {CONTENT_DATA[activeTopic] || CONTENT_DATA.faq}
      </section>
    </div>
  );
}
