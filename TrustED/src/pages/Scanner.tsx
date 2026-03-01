import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Link2, Mail, AlertTriangle, CheckCircle, XCircle, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type RiskLevel = "low" | "medium" | "high" | "critical";

interface ScanResult {
  riskLevel: RiskLevel;
  score: number;
  confidence: number;
  explanation: string;
  indicators: string[];
  actions: string[];
}

const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  low: { label: "Low Risk", color: "text-accent", bg: "bg-accent/10" },
  medium: { label: "Medium Risk", color: "text-warning", bg: "bg-warning/10" },
  high: { label: "High Risk", color: "text-destructive", bg: "bg-destructive/10" },
  critical: { label: "Critical", color: "text-destructive", bg: "bg-destructive/20" },
};

// Mock analysis
function analyzeEmail(text: string): ScanResult {
  const suspicious = ["urgent", "click here", "verify your account", "password", "suspended", "winner", "congratulations", "act now", "limited time"];
  const found = suspicious.filter((w) => text.toLowerCase().includes(w));
  const score = Math.min(found.length * 25, 100);
  const riskLevel: RiskLevel = score <= 20 ? "low" : score <= 50 ? "medium" : score <= 75 ? "high" : "critical";

  return {
    riskLevel,
    score,
    confidence: 85 + Math.random() * 14,
    explanation:
      score <= 20
        ? "This email appears safe. No significant phishing indicators detected."
        : `This email contains ${found.length} suspicious indicator(s) commonly found in phishing attempts. The language uses urgency tactics to pressure you into acting quickly.`,
    indicators: found.length > 0 ? found.map((w) => `Contains "${w}" — a common phishing keyword`) : ["No suspicious patterns detected"],
    actions:
      score <= 20
        ? ["No action needed", "Stay vigilant"]
        : ["Do not click any links in this email", "Do not provide personal information", "Report to your IT department", "Delete the email"],
  };
}

function analyzeUrl(url: string): ScanResult {
  const suspicious = url.includes("bit.ly") || url.includes("tinyurl") || url.includes("login") || url.includes("verify") || !url.startsWith("https");
  const score = suspicious ? 60 + Math.floor(Math.random() * 30) : 5 + Math.floor(Math.random() * 15);
  const riskLevel: RiskLevel = score <= 20 ? "low" : score <= 50 ? "medium" : score <= 75 ? "high" : "critical";

  return {
    riskLevel,
    score,
    confidence: 80 + Math.random() * 18,
    explanation: suspicious
      ? "This URL shows signs of being potentially malicious. It may redirect to a phishing page or contain malware."
      : "This URL appears to be legitimate. No immediate threats detected.",
    indicators: suspicious
      ? ["URL uses a shortener service", "May redirect to unknown destination", "Does not use HTTPS encryption"]
      : ["Uses HTTPS encryption", "Domain appears legitimate"],
    actions: suspicious
      ? ["Do not visit this URL", "If you already clicked, change your passwords", "Scan your device for malware"]
      : ["Safe to proceed with caution", "Verify the domain matches expected site"],
  };
}

const ScannerPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);

  const runScan = (type: "email" | "url") => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setResult(type === "email" ? analyzeEmail(emailInput) : analyzeUrl(urlInput));
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-4">
            <Shield className="h-3 w-3" /> THREAT SCANNER
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">AI Phishing & Malware Scanner</h1>
          <p className="text-muted-foreground">Paste suspicious emails or URLs for instant AI-powered analysis.</p>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary border border-border">
            <TabsTrigger value="email" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Mail className="h-4 w-4" /> Email Scanner
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Link2 className="h-4 w-4" /> URL Scanner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="mt-6">
            <div className="glass-card border-glow p-6">
              <textarea
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Paste the suspicious email content here...&#10;&#10;Example: 'URGENT: Your account has been suspended. Click here to verify your password immediately or your account will be deleted.'"
                className="w-full h-40 bg-background/50 border border-border rounded-lg p-4 text-sm font-mono placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                variant="cyber"
                className="mt-4 w-full"
                disabled={!emailInput.trim() || scanning}
                onClick={() => runScan("email")}
              >
                {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scan className="h-4 w-4" />}
                {scanning ? "Analyzing..." : "Analyze Email"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-6">
            <div className="glass-card border-glow p-6">
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://suspicious-link.example.com/login"
                className="w-full bg-background/50 border border-border rounded-lg p-4 text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                variant="cyber"
                className="mt-4 w-full"
                disabled={!urlInput.trim() || scanning}
                onClick={() => runScan("url")}
              >
                {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scan className="h-4 w-4" />}
                {scanning ? "Scanning..." : "Scan URL"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 space-y-4"
            >
              {/* Risk score header */}
              <div className="glass-card border-glow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {result.riskLevel === "low" ? (
                      <CheckCircle className={cn("h-8 w-8", riskConfig[result.riskLevel].color)} />
                    ) : (
                      <AlertTriangle className={cn("h-8 w-8", riskConfig[result.riskLevel].color)} />
                    )}
                    <div>
                      <h3 className={cn("text-xl font-bold font-display", riskConfig[result.riskLevel].color)}>
                        {riskConfig[result.riskLevel].label}
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        Confidence: {result.confidence.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-4xl font-bold font-mono", riskConfig[result.riskLevel].color)}>
                      {result.score}
                    </div>
                    <div className="text-xs text-muted-foreground">/100</div>
                  </div>
                </div>

                {/* Risk bar */}
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn("h-full rounded-full", {
                      "bg-accent": result.riskLevel === "low",
                      "bg-warning": result.riskLevel === "medium",
                      "bg-destructive": result.riskLevel === "high" || result.riskLevel === "critical",
                    })}
                  />
                </div>
              </div>

              {/* Explanation */}
              <div className="glass-card p-6">
                <h4 className="font-semibold font-display mb-2 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-primary" /> What Happened
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
              </div>

              {/* Indicators */}
              <div className="glass-card p-6">
                <h4 className="font-semibold font-display mb-3">Indicators Found</h4>
                <ul className="space-y-2">
                  {result.indicators.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className={cn("mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0", riskConfig[result.riskLevel].bg.replace("/10", "").replace("/20", ""))} />
                      <span className="text-muted-foreground">{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="glass-card p-6">
                <h4 className="font-semibold font-display mb-3">Recommended Actions</h4>
                <ul className="space-y-2">
                  {result.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScannerPage;
