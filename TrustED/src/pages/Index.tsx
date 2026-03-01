import { motion } from "framer-motion";
import { Shield, Scan, Eye, Bot, ChevronRight, Lock, AlertTriangle, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Scan,
    title: "Phishing Detection",
    description: "AI-powered analysis of emails, URLs, and files with real-time risk scoring.",
  },
  {
    icon: Eye,
    title: "Privacy Analytics",
    description: "Aggregated threat metrics without exposing any student PII.",
  },
  {
    icon: Lock,
    title: "Consent-First Identity",
    description: "Secure authentication with fraud detection and full audit logging.",
  },
  {
    icon: AlertTriangle,
    title: "Explainable Alerts",
    description: "Every alert explained in plain language with actionable next steps.",
  },
  {
    icon: Bot,
    title: "Hygiene Assistant",
    description: "AI chatbot teaching digital safety with quizzes and weekly tips.",
  },
  {
    icon: FileSearch,
    title: "Security Lab",
    description: "Practice identifying threats with simulated phishing exercises.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono mb-8">
              <Shield className="h-4 w-4" />
              AI-Powered Cybersecurity for Education
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display leading-tight mb-6">
              Safer Digital{" "}
              <span className="text-gradient-cyber">Experiences</span>
              <br />for Students
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Detect phishing, protect privacy, and build digital resilience — all with explainable AI designed for educational institutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="cyber" size="xl" asChild>
                <Link to="/scanner">
                  <Scan className="h-5 w-5" />
                  Scan Now
                </Link>
              </Button>
              <Button variant="cyber-outline" size="xl" asChild>
                <Link to="/dashboard">
                  View Dashboard
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Animated shield */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse-glow" />
              <div className="relative glass-card border-glow p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-sm text-muted-foreground">threat_monitor_v2.1 — ACTIVE</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary font-mono">2,847</div>
                    <div className="text-xs text-muted-foreground">Threats Blocked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent font-mono">99.7%</div>
                    <div className="text-xs text-muted-foreground">Detection Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyber-blue font-mono">12ms</div>
                    <div className="text-xs text-muted-foreground">Avg Response</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold font-display mb-3">Core Security Modules</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enterprise-grade protection, designed for educational simplicity.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={item} className="glass-card border-glow p-6 group hover:border-primary/50 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-display mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border/30">
        <div className="container">
          <div className="glass-card border-glow p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/[0.03]" />
            <div className="relative">
              <h2 className="text-3xl font-bold font-display mb-4">Ready to Secure Your Campus?</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Start scanning for threats in seconds. No setup required.
              </p>
              <Button variant="cyber" size="xl" asChild>
                <Link to="/scanner">
                  <Shield className="h-5 w-5" />
                  Get Protected
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-display font-semibold">TrustED AI</span>
          </div>
          <p>Privacy by design. Built for education.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
