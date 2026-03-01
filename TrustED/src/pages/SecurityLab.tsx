import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PhishingExample {
  id: number;
  type: "email" | "url";
  content: string;
  isPhishing: boolean;
  explanation: string;
  clues: string[];
}

const examples: PhishingExample[] = [
  {
    id: 1,
    type: "email",
    content: "From: security@university-portal.com\n\nDear Student,\n\nYour university email account will be SUSPENDED in 24 hours unless you verify your identity immediately.\n\nClick here to verify: http://uni-verify-login.tk/auth\n\nIT Department",
    isPhishing: true,
    explanation: "This is a phishing email using urgency tactics and a suspicious domain (.tk) to steal credentials.",
    clues: ["Urgency pressure (24 hours)", "Suspicious domain (.tk)", "Generic greeting", "Threatening account suspension"],
  },
  {
    id: 2,
    type: "email",
    content: "From: library@university.edu\n\nHi Alex,\n\nYour reserved book 'Introduction to Computer Science' is ready for pickup at the main library desk. It will be held until Friday.\n\nLibrary Services\nuniversity.edu/library",
    isPhishing: false,
    explanation: "This is a legitimate email from the university library with a proper .edu domain and no suspicious requests.",
    clues: ["Official .edu domain", "Specific personal details", "No urgent action required", "No suspicious links"],
  },
  {
    id: 3,
    type: "url",
    content: "https://www.paypa1.com/signin?verify=true&urgent=1",
    isPhishing: true,
    explanation: "This URL impersonates PayPal by replacing 'l' with '1' (paypa1 instead of paypal). This is a typosquatting attack.",
    clues: ["'paypa1' instead of 'paypal' (letter 'l' replaced with number '1')", "Suspicious query parameters", "Designed to steal login credentials"],
  },
  {
    id: 4,
    type: "email",
    content: "From: no-reply@github.com\n\n@student123 — You were mentioned in a comment on issue #42 in 'cs-project/final-assignment'.\n\nView the comment: https://github.com/cs-project/final-assignment/issues/42\n\nYou're receiving this because you were mentioned.",
    isPhishing: false,
    explanation: "This is a legitimate GitHub notification with proper formatting and a genuine github.com link.",
    clues: ["Official github.com domain", "Specific repository details", "Standard notification format", "No urgency or threats"],
  },
  {
    id: 5,
    type: "email",
    content: "CONGRATULATIONS!! You have been selected as the WINNER of our $10,000 Student Scholarship Grant!\n\nTo claim your prize, send us your full name, student ID, and bank account details to: scholarship-winner@gmail.com\n\nAct NOW — offer expires in 2 hours!",
    isPhishing: true,
    explanation: "Classic phishing scam using prize bait and requesting sensitive personal/financial information via a free email address.",
    clues: ["Too good to be true offer", "Requests bank details via email", "Gmail address (not institutional)", "Extreme urgency (2 hours)", "Excessive capitalization"],
  },
];

const SecurityLabPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const current = examples[currentIndex];
  const isCorrect = selected === current.isPhishing;

  const handleAnswer = (answer: boolean) => {
    if (selected !== null) return;
    setSelected(answer);
    setAnswered((a) => a + 1);
    if (answer === current.isPhishing) setScore((s) => s + 1);
  };

  const next = () => {
    if (currentIndex < examples.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setShowResults(false);
  };

  if (showResults) {
    const pct = Math.round((score / examples.length) * 100);
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container max-w-lg">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card border-glow p-10 text-center">
            <Trophy className={cn("h-16 w-16 mx-auto mb-4", pct >= 80 ? "text-accent" : pct >= 50 ? "text-warning" : "text-destructive")} />
            <h2 className="text-2xl font-bold font-display mb-2">Lab Complete!</h2>
            <div className="text-5xl font-bold font-mono text-primary my-4">{score}/{examples.length}</div>
            <p className="text-muted-foreground mb-2">{pct}% accuracy</p>
            <p className="text-sm text-muted-foreground mb-6">
              {pct >= 80 ? "Excellent work! You have strong phishing detection skills." : pct >= 50 ? "Good effort! Keep practicing to improve." : "Keep learning — review the explanations and try again."}
            </p>
            <Button variant="cyber" onClick={restart}>
              <RotateCcw className="h-4 w-4" /> Try Again
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-4">
            <Shield className="h-3 w-3" /> SECURITY LAB
          </div>
          <h1 className="text-2xl font-bold font-display mb-2">Phishing Detection Training</h1>
          <p className="text-sm text-muted-foreground">Can you tell the difference? Analyze each example and decide.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {examples.map((_, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", i < currentIndex ? "bg-primary" : i === currentIndex ? "bg-primary/50" : "bg-secondary")} />
          ))}
          <span className="text-xs font-mono text-muted-foreground ml-2">{currentIndex + 1}/{examples.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            {/* Example */}
            <div className="glass-card border-glow p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase">{current.type}</span>
              </div>
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground/90 leading-relaxed">{current.content}</pre>
            </div>

            {/* Answer buttons */}
            {selected === null ? (
              <div className="grid grid-cols-2 gap-4">
                <Button variant="danger" size="lg" onClick={() => handleAnswer(true)} className="h-14">
                  <AlertTriangleIcon /> It&apos;s Phishing
                </Button>
                <Button variant="cyber-outline" size="lg" onClick={() => handleAnswer(false)} className="h-14">
                  <CheckCircle className="h-5 w-5" /> It&apos;s Legitimate
                </Button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className={cn("glass-card p-6 mb-4 border", isCorrect ? "border-accent/30 bg-accent/5" : "border-destructive/30 bg-destructive/5")}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? <CheckCircle className="h-5 w-5 text-accent" /> : <XCircle className="h-5 w-5 text-destructive" />}
                    <span className={cn("font-semibold", isCorrect ? "text-accent" : "text-destructive")}>
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{current.explanation}</p>
                  <h4 className="text-xs font-mono text-muted-foreground mb-2">KEY CLUES:</h4>
                  <ul className="space-y-1">
                    {current.clues.map((c, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="cyber" onClick={next} className="w-full">
                  {currentIndex < examples.length - 1 ? (
                    <>Next Example <ChevronRight className="h-4 w-4" /></>
                  ) : (
                    <>View Results <Trophy className="h-4 w-4" /></>
                  )}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const AlertTriangleIcon = () => <AlertTriangle className="h-5 w-5" />;

export default SecurityLabPage;
