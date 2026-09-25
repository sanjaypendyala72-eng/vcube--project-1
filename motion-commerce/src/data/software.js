export const softwareCategory = {
  id: "software",
  slug: "software",
  name: "Software & Cloud SaaS",
  shortTitle: "SOFTWARE & SAAS",
  subtitle: "Tools for a Smarter Digital Life.",
  tagline: "Autonomous neural agents, end-to-end encrypted databases, and developer acceleration.",
  accentColor: "#2563eb",
  accentGlow: "rgba(37, 99, 235, 0.18)",
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
  subcategories: [
    "All", "Productivity", "AI Tools", "Business", "Marketing", "Development", "Design", "Security", "Analytics", "Cloud"
  ],
  filterOptions: {
    billing: ["Monthly Billing", "Annual (Save 20%)", "Perpetual License"],
    deployments: ["Multi-Tenant Cloud", "Self-Hosted On-Premise", "Edge Network Serverless"],
    vendors: ["NEURALSTACK", "VAULTSEC", "NEXORA Cloud", "SYNAPSE AI", "METRICFLOW"]
  },
  promotions: [
    {
      title: "Autonomous Agentic Architecture",
      heading: "Synapse AI Enterprise Workspace",
      desc: "Deploy multi-agent swarms that automate research, code review, and CRM workflows.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
      cta: "Start 14-Day Free Trial"
    },
    {
      title: "Zero-Knowledge Database Encryption",
      heading: "VaultSec Cryptographic Storage",
      desc: "Post-quantum lattice encryption protecting distributed databases with SOC-2 compliance.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
      cta: "Explore Security"
    }
  ],
  products: [
    {
      id: "soft-01",
      name: "Synapse AI Agent Swarm Platform",
      brand: "SYNAPSE AI",
      category: "software",
      subcategory: "AI Tools",
      price: 2499, // Monthly
      annualPrice: 1999, // Monthly when billed annually
      originalPrice: 3499,
      rating: 4.9,
      reviews: 310,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=85",
      tag: "Top SaaS",
      billingCycle: "per user / month",
      freeTrial: "14-Day Full Access Trial",
      features: [
        "Autonomous Multi-Agent Workflow Orchestrator",
        "Fine-Tuned LLM Routing with Zero Data Retention",
        "API Webhook & Slack / GitHub Native Integrations",
        "SOC-2 Type II Certified & HIPAA Compliant"
      ],
      description: "Empower your product and engineering teams with collaborative autonomous agents capable of writing code, summarizing user feedback, and testing web builds."
    },
    {
      id: "soft-02",
      name: "VaultSec Zero-Knowledge Cloud Storage 5TB",
      brand: "VAULTSEC",
      category: "software",
      subcategory: "Security",
      price: 1499,
      annualPrice: 1199,
      originalPrice: 1999,
      rating: 5.0,
      reviews: 420,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",
      tag: "Encrypted",
      billingCycle: "per team / month",
      freeTrial: "30-Day Money-Back Guarantee",
      features: [
        "End-to-End Client-Side AES-256-GCM Encryption",
        "Zero-Knowledge Architecture (No Vendor Master Keys)",
        "Secure Password-Protected Expiring Share Links",
        "Automated Ransomware Version Rollback"
      ],
      description: "Cloud storage built for confidential IP, legal counsel, and biometric records. Even cloud server administrators cannot decrypt your uploaded data."
    },
    {
      id: "soft-03",
      name: "MetricFlow Real-Time Product Analytics Suite",
      brand: "METRICFLOW",
      category: "software",
      subcategory: "Analytics",
      price: 3999,
      annualPrice: 3199,
      originalPrice: 4999,
      rating: 4.8,
      reviews: 185,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      tag: "Fast Insights",
      billingCycle: "per project / month",
      freeTrial: "Free Starter Tier (Up to 100k events/mo)",
      features: [
        "Sub-Second ClickHouse Powered Analytical Queries",
        "Cohort Retention Heatmaps & Funnel Drop-off Tracing",
        "No-Code Event Tracking Visual Selector",
        "GDPR & CCPA Compliant Without Cookie Banners"
      ],
      description: "Understand user retention curves, churn drivers, and monetization bottlenecks across mobile and web apps without slowing down frontend page speeds."
    },
    {
      id: "soft-04",
      name: "NeuralStack Edge Serverless Database Pro",
      brand: "NEURALSTACK",
      category: "software",
      subcategory: "Development",
      price: 1999,
      annualPrice: 1599,
      originalPrice: 2699,
      rating: 4.9,
      reviews: 290,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",
      tag: "Developer Pick",
      billingCycle: "per database / month",
      freeTrial: "Free Developer Tier Included",
      features: [
        "Globally Distributed PostgreSQL with <10ms Read Latency",
        "Branching Workflows for Database Schema Migrations",
        "Vector Embeddings Storage with pgvector Native Support",
        "Automatic Cold-Storage Backup Every Hour"
      ],
      description: "Modern relational database that scales to zero when idle and seamlessly branches like Git. Perfect companion for Vercel, Fly.io, and Cloudflare Workers."
    },
    {
      id: "soft-05",
      name: "OmniCRM Unified Sales & Customer Pipeline",
      brand: "NEXORA Cloud",
      category: "software",
      subcategory: "Business",
      price: 2999,
      annualPrice: 2399,
      originalPrice: 3899,
      rating: 4.7,
      reviews: 140,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
      tag: "Sales Engine",
      billingCycle: "per seat / month",
      freeTrial: "14-Day Free Trial",
      features: [
        "AI Lead Scoring & Automated Follow-Up Sequences",
        "Integrated VoIP Softphone & Inbound Call Recording",
        "Drag-and-Drop Deal Pipeline Stages",
        "Native Stripe & QuickBooks Billing Sync"
      ],
      description: "Consolidate sales pipelines, customer emails, call recordings, and contract e-signatures into one lightning-fast interface with zero lag."
    },
    {
      id: "soft-06",
      name: "AeroDesign Cloud Collaborative Motion Studio",
      brand: "NEURALSTACK",
      category: "software",
      subcategory: "Design",
      price: 1799,
      annualPrice: 1449,
      originalPrice: 2299,
      rating: 4.9,
      reviews: 215,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=85",
      tag: "Creative Tool",
      billingCycle: "per creator / month",
      freeTrial: "7-Day Pro Access Trial",
      features: [
        "Web-Based 60fps Vector Animation Timeline",
        "Real-Time Multiplayer Cursor Co-Editing",
        "Export to Lottie JSON, MP4, WebM & SVG Code",
        "React & iOS Swift Component Code Generation"
      ],
      description: "Craft micro-interactions and interactive hero animations right in your browser. Inspect easing curves and export clean production code instantly."
    },
    {
      id: "soft-07",
      name: "SentinelGuard Automated Vulnerability & Code Scanner",
      brand: "VAULTSEC",
      category: "software",
      subcategory: "Security",
      price: 4999,
      annualPrice: 3999,
      originalPrice: 6299,
      rating: 4.8,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=85",
      tag: "DevSecOps",
      billingCycle: "per repository / month",
      freeTrial: "14-Day Free Scan Trial",
      features: [
        "CI/CD Pipeline Dependency & Secret Leak Detection",
        "One-Click Automated Fix Pull Requests",
        "License Compliance Scanning for Open-Source Packages",
        "Continuous Cloud Infrastructure Drift Auditing"
      ],
      description: "Blocks leaked API keys, expired certificates, and known CVE vulnerabilities from reaching production branches before code is merged."
    },
    {
      id: "soft-08",
      name: "ContentPilot AI Omnichannel Marketing Suite",
      brand: "SYNAPSE AI",
      category: "software",
      subcategory: "Marketing",
      price: 2199,
      annualPrice: 1749,
      originalPrice: 2899,
      rating: 4.7,
      reviews: 310,
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=900&q=85",
      tag: "Growth Tool",
      billingCycle: "per workspace / month",
      freeTrial: "7-Day Free Trial (10k words)",
      features: [
        "Brand Voice Memory Matrix with Tone Guidelines",
        "Automated SEO Blog, LinkedIn & X Thread Generator",
        "A/B Headline Testing with Viral Score Predictor",
        "Multi-Platform Social Auto-Publishing Calendar"
      ],
      description: "Maintains your unique brand voice while turning one product brief into a complete omnichannel content calendar across social, email, and blog channels."
    },
    {
      id: "soft-09",
      name: "FocusOS Cognitive Minimalist Task Workspace",
      brand: "NEXORA Cloud",
      category: "software",
      subcategory: "Productivity",
      price: 799,
      annualPrice: 599,
      originalPrice: 1199,
      rating: 4.9,
      reviews: 480,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=85",
      tag: "Deep Work",
      billingCycle: "per user / month",
      freeTrial: "Free Personal Plan Forever",
      features: [
        "Offline-First Markdown Editor with Bi-Directional Links",
        "Integrated Pomodoro Timer with Ambient Binaural Beats",
        "Lightning-Fast Global Keyboard Shortcuts",
        "Private End-to-End Encrypted Sync Across Desktop & Mobile"
      ],
      description: "Zero bloat, zero clutter. Designed for deep mental flow states with instantaneous load times and thoughtful typographic aesthetics."
    },
    {
      id: "soft-10",
      name: "API Fortress Mock & Contract Testing Gateway",
      brand: "NEURALSTACK",
      category: "software",
      subcategory: "Development",
      price: 1899,
      annualPrice: 1499,
      originalPrice: 2399,
      rating: 4.8,
      reviews: 130,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=85",
      tag: "Dev Tool",
      billingCycle: "per team / month",
      freeTrial: "14-Day Full Feature Trial",
      features: [
        "Instant OpenAPI / Swagger Spec Mock Servers",
        "Deterministic Chaos Engineering & Latency Injection",
        "Automated Breaking Change Detection in Git CI",
        "Dynamic Dynamic Synthetic Data Generation"
      ],
      description: "Frontend developers can build against realistic mocked APIs weeks before backend endpoints are built. Simulates network timeouts and error edge cases."
    },
    {
      id: "soft-11",
      name: "PulseBoard Real-Time Infrastructure Monitoring",
      brand: "METRICFLOW",
      category: "software",
      subcategory: "Cloud",
      price: 3499,
      annualPrice: 2799,
      originalPrice: 4299,
      rating: 4.9,
      reviews: 175,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      tag: "DevOps",
      billingCycle: "per cluster / month",
      freeTrial: "Free for First 3 Nodes",
      features: [
        "Kubernetes & Docker Container Pod Telemetry",
        "Distributed OpenTelemetry Tracing with Flame Graphs",
        "Intelligent Anomaly Detection Pager Alerts",
        "Customizable Real-Time Dark Mode Dashboards"
      ],
      description: "Zero-overhead eBPF agents collect CPU, memory, database query duration, and network packet loss metrics without degrading production throughput."
    },
    {
      id: "soft-12",
      name: "EchoSign Enterprise Cryptographic e-Signature Portal",
      brand: "VAULTSEC",
      category: "software",
      subcategory: "Business",
      price: 1699,
      annualPrice: 1299,
      originalPrice: 2199,
      rating: 4.8,
      reviews: 240,
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=85",
      tag: "Legal Binding",
      billingCycle: "per sender / month",
      freeTrial: "Send 5 Free Documents",
      features: [
        "Court-Admissible Cryptographic Tamper-Proof Audit Trail",
        "Biometric Touchscreen Signature Capture",
        "Reusable Contract Templates with Dynamic Merge Fields",
        "Automated Signer Reminders & Expiry Timers"
      ],
      description: "Close client retainers, NDAs, and employment offers with legally binding e-signatures that comply with eIDAS, ESIGN Act, and Indian IT Act."
    }
  ]
};

export default softwareCategory;
