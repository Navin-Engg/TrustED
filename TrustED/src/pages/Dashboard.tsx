import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Activity, Wifi, Eye, Lock, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const recentAlerts = [
  { type: "high" as const, title: "Phishing email detected", time: "2 min ago", desc: "Suspicious email from 'admin@g00gle.com' blocked" },
  { type: "medium" as const, title: "Unusual login location", time: "1 hour ago", desc: "Login attempt from new IP address detected" },
  { type: "low" as const, title: "Software update available", time: "3 hours ago", desc: "Security patch available for your browser" },
  { type: "low" as const, title: "Password strength check", time: "1 day ago", desc: "3 passwords meet recommended strength" },
];

const alertColors = {
  low: "border-accent/30 bg-accent/5",
  medium: "border-warning/30 bg-warning/5",
  high: "border-destructive/30 bg-destructive/5",
};
const alertDot = {
  low: "bg-accent",
  medium: "bg-warning",
  high: "bg-destructive",
};

const hygieneChecklist = [
  { label: "Strong unique passwords", done: true, icon: Lock },
  { label: "Two-factor authentication", done: true, icon: Smartphone },
  { label: "Privacy settings reviewed", done: false, icon: Eye },
  { label: "Software up to date", done: true, icon: Activity },
  { label: "Secure Wi-Fi connection", done: false, icon: Wifi },
];

const DashboardPage = () => {
  const hygieneScore = Math.round((hygieneChecklist.filter((c) => c.done).length / hygieneChecklist.length) * 100);
  const riskScore = 23;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display mb-1">Student Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your personal security overview</p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card border-glow p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Risk Score</span>
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div className="text-4xl font-bold font-mono text-accent mb-2">{riskScore}</div>
            <Progress value={riskScore} className="h-1.5 bg-secondary [&>div]:bg-accent" />
            <p className="text-xs text-muted-foreground mt-2">Low risk — looking good!</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card border-glow p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Hygiene Score</span>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="text-4xl font-bold font-mono text-primary mb-2">{hygieneScore}%</div>
            <Progress value={hygieneScore} className="h-1.5 bg-secondary [&>div]:bg-primary" />
            <p className="text-xs text-muted-foreground mt-2">Complete 2 more items to improve</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card border-glow p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Threats Blocked</span>
              <TrendingUp className="h-5 w-5 text-cyber-blue" />
            </div>
            <div className="text-4xl font-bold font-mono text-cyber-blue mb-2">14</div>
            <Progress value={70} className="h-1.5 bg-secondary [&>div]:bg-cyber-blue" />
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Recent Alerts */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold font-display">Recent Alerts</h2>
              <span className="text-xs text-muted-foreground font-mono">4 alerts</span>
            </div>
            {recentAlerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn("glass-card p-4 border", alertColors[alert.type])}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("h-2 w-2 rounded-full mt-2 flex-shrink-0", alertDot[alert.type])} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold truncate">{alert.title}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">{alert.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{alert.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <Button variant="cyber-outline" className="w-full" asChild>
              <Link to="/scanner">Run New Scan</Link>
            </Button>
          </div>

          {/* Hygiene checklist */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold font-display mb-4">Digital Hygiene</h2>
            <div className="glass-card border-glow p-5 space-y-3">
              {hygieneChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.done ? (
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
                  )}
                  <span className={cn("text-sm", item.done ? "text-foreground" : "text-warning")}>{item.label}</span>
                </div>
              ))}

              <div className="pt-3 border-t border-border/50">
                <h3 className="text-xs text-muted-foreground font-mono mb-2">WEEKLY TIP</h3>
                <p className="text-sm text-muted-foreground">
                  Never reuse passwords across different websites. Use a password manager to keep track of unique, strong passwords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
