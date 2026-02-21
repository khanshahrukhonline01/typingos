import { useState } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";

const faqs = [
    {
        question: "What does WPM stand for?",
        answer: "WPM stands for Words Per Minute. It measures typing speed by counting the number of 'standard words' (5 characters including spaces) typed in one minute. A score of 40 WPM means you type 40 five-character groups per minute."
    },
    {
        question: "How do I calculate my words per minute (WPM)?",
        answer: "WPM = (Total Characters Typed ÷ 5) ÷ Minutes Taken. For example, if you type 1,200 characters in 5 minutes: (1200 ÷ 5) ÷ 5 = 48 WPM. Our calculator below does this instantly."
    },
    {
        question: "What is a good WPM score?",
        answer: "40 WPM is the average. 60 WPM is good for office work. 80+ WPM is excellent. 100+ WPM is professional-level. For SSC/Railway exams, you need a minimum of 30–35 WPM at 95% accuracy."
    },
    {
        question: "What is net WPM vs gross WPM?",
        answer: "Gross WPM counts all words typed regardless of errors. Net WPM subtracts errors: Net WPM = Gross WPM − (Errors ÷ Minutes). Net WPM is the standard used in professional and competitive contexts."
    },
    {
        question: "How do keystrokes per hour (KPH) relate to WPM?",
        answer: "KPH = WPM × 5 × 60. So 60 WPM = 18,000 KPH. Data entry jobs in India often specify KPH requirements (e.g., 10,000 KPH for clerical posts), so this conversion is useful."
    }
];

const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "WPM Calculator — Words Per Minute Calculator",
    "description": "Free WPM calculator. Enter your characters typed and time to instantly calculate your typing speed in Words Per Minute.",
    "url": "https://typingos.com/wpm-calculator"
};

function WPMCalc() {
    const [chars, setChars] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [errors, setErrors] = useState("");

    const totalMinutes = (parseFloat(minutes) || 0) + (parseFloat(seconds) || 0) / 60;
    const grossWpm = totalMinutes > 0 ? Math.round((parseFloat(chars) || 0) / 5 / totalMinutes) : 0;
    const netWpm = Math.max(0, Math.round(grossWpm - (parseFloat(errors) || 0) / totalMinutes));
    const kph = Math.round(grossWpm * 5 * 60);
    const accuracy = chars && errors
        ? Math.round((1 - parseFloat(errors) / (parseFloat(chars) || 1)) * 100)
        : 100;

    return (
        <div className="p-6 bg-card border border-border rounded-xl mb-12">
            <h2 className="text-xl font-bold mb-4 text-center">⚡ Instant WPM Calculator</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Characters Typed</label>
                    <input
                        type="number"
                        value={chars}
                        onChange={e => setChars(e.target.value)}
                        placeholder="e.g. 1200"
                        className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        min="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Errors Made</label>
                    <input
                        type="number"
                        value={errors}
                        onChange={e => setErrors(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        min="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Minutes</label>
                    <input
                        type="number"
                        value={minutes}
                        onChange={e => setMinutes(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        min="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Seconds (optional)</label>
                    <input
                        type="number"
                        value={seconds}
                        onChange={e => setSeconds(e.target.value)}
                        placeholder="e.g. 30"
                        className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        min="0"
                        max="59"
                    />
                </div>
            </div>
            {chars && totalMinutes > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "Gross WPM", value: grossWpm, highlight: false },
                        { label: "Net WPM", value: netWpm, highlight: true },
                        { label: "KPH", value: kph.toLocaleString(), highlight: false },
                        { label: "Accuracy", value: `${accuracy}%`, highlight: false },
                    ].map(item => (
                        <div key={item.label} className={`text-center p-4 rounded-lg border ${item.highlight ? 'bg-primary/10 border-primary/30' : 'bg-muted/50 border-border'}`}>
                            <div className={`text-2xl font-bold ${item.highlight ? 'text-primary' : ''}`}>{item.value}</div>
                            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                        </div>
                    ))}
                </div>
            )}
            {(!chars || totalMinutes <= 0) && (
                <p className="text-center text-muted-foreground text-sm">Enter characters and time above to see your WPM instantly</p>
            )}
        </div>
    );
}

export default function WpmCalculatorPage() {
    return (
        <>
            <SEOHead
                title="WPM Calculator — Free Words Per Minute Calculator Online"
                description="Free WPM calculator. Instantly calculate your typing speed in Words Per Minute from characters typed and time. Convert between gross WPM, net WPM, and KPH."
                keywords="wpm calculator, words per minute calculator, typing speed calculator, calculate wpm, gross wpm net wpm, kph to wpm, typing speed converter, characters per minute"
                url="https://typingos.com/wpm-calculator"
                faqs={faqs}
                schema={schema}
            />

            <div className="min-h-screen bg-background text-foreground">
                <div className="max-w-4xl mx-auto px-4 py-12">

                    {/* Hero */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            WPM Calculator
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Calculate your typing speed in <strong>Words Per Minute</strong> instantly. Enter your characters typed,
                            time taken, and errors to get your gross WPM, net WPM, KPH, and accuracy.
                        </p>
                    </div>

                    {/* Interactive Calculator */}
                    <WPMCalc />

                    {/* WPM Formula */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">How to Calculate WPM</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The standard formula for calculating typing speed is based on a <strong>"standard word"</strong> defined as 5 characters (including spaces). This makes comparison fair regardless of the actual words typed.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <div className="p-5 bg-card border border-border rounded-xl">
                                <h3 className="font-bold mb-2 text-primary">Gross WPM Formula</h3>
                                <code className="block text-sm font-mono bg-muted p-3 rounded-lg mb-2">
                                    Gross WPM = (Total Characters ÷ 5) ÷ Minutes
                                </code>
                                <p className="text-muted-foreground text-sm">This is your raw typing speed counting everything typed, including errors.</p>
                            </div>
                            <div className="p-5 bg-card border border-border rounded-xl">
                                <h3 className="font-bold mb-2 text-primary">Net WPM Formula</h3>
                                <code className="block text-sm font-mono bg-muted p-3 rounded-lg mb-2">
                                    Net WPM = Gross WPM − (Errors ÷ Minutes)
                                </code>
                                <p className="text-muted-foreground text-sm">The industry-standard metric that subtracts errors. Used in most professional and competitive tests.</p>
                            </div>
                        </div>
                        <div className="p-5 bg-muted/50 rounded-xl border border-border">
                            <h3 className="font-bold mb-2">Example</h3>
                            <p className="text-muted-foreground text-sm">
                                You type <strong>1,500 characters</strong> in <strong>5 minutes</strong> with <strong>10 errors</strong>:<br /><br />
                                • Gross WPM = (1500 ÷ 5) ÷ 5 = <strong>60 WPM</strong><br />
                                • Net WPM = 60 − (10 ÷ 5) = <strong>58 WPM</strong><br />
                                • KPH = 60 × 5 × 60 = <strong>18,000 KPH</strong>
                            </p>
                        </div>
                    </section>

                    {/* WPM Conversion Table */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">WPM to KPH Conversion Table</h2>
                        <p className="text-muted-foreground mb-4">
                            Government and data entry jobs often advertise requirements in Keystrokes Per Hour (KPH), also called KSPH. Use this table to convert between WPM and KPH.
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-border">
                            <table className="w-full text-sm">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="text-left p-4 font-semibold">WPM</th>
                                        <th className="text-left p-4 font-semibold">KPH (KPH = WPM × 300)</th>
                                        <th className="text-left p-4 font-semibold">Level</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        [20, "6,000", "Beginner"],
                                        [30, "9,000", "SSC/Railway minimum"],
                                        [40, "12,000", "Average typist"],
                                        [50, "15,000", "Competent"],
                                        [60, "18,000", "Good / Office standard"],
                                        [80, "24,000", "Excellent"],
                                        [100, "30,000", "Professional"],
                                        [120, "36,000", "Expert"],
                                    ].map(([wpm, kph, level]) => (
                                        <tr key={wpm} className="hover:bg-muted/50 transition-colors">
                                            <td className="p-4 font-mono font-bold text-primary">{wpm}</td>
                                            <td className="p-4 font-mono">{kph}</td>
                                            <td className="p-4 text-muted-foreground">{level}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="p-5 bg-card border border-border rounded-xl">
                                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA + Internal Links */}
                    <section className="p-6 bg-muted/30 rounded-xl border border-border">
                        <h2 className="text-xl font-bold mb-2">Test Your Actual WPM Live</h2>
                        <p className="text-muted-foreground text-sm mb-4">Stop calculating — take the real test and get your WPM measured automatically.</p>
                        <div className="flex flex-wrap gap-3 mb-6">
                            <Link to="/typing-speed-test" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
                                ⚡ Free Typing Speed Test
                            </Link>
                            <Link to="/typing-practice-online" className="border border-border px-6 py-2 rounded-lg font-semibold text-sm hover:bg-muted transition-colors">
                                🎓 Practice to Improve WPM
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                            {[
                                { to: "/exams", label: "Exam Typing Test (SSC/Railway)" },
                                { to: "/lessons", label: "Touch Typing Lessons" },
                                { to: "/ai-coach", label: "AI Typing Coach" },
                            ].map(link => (
                                <Link key={link.to} to={link.to} className="block p-3 bg-card border border-border rounded-lg text-sm font-medium hover:bg-muted hover:border-primary transition-all">
                                    {link.label} →
                                </Link>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
