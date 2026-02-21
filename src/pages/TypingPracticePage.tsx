import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";

const faqs = [
    {
        question: "What is the best way to practice typing online for free?",
        answer: "The best approach is to practice daily with structured lessons. Start with the home row keys (ASDF JKL;) in touch typing lessons, then progress to full-word drills. TypingOS offers free structured lessons from beginner to advanced levels."
    },
    {
        question: "How many minutes a day should I practice typing?",
        answer: "15–30 minutes of focused daily practice is ideal. Consistency matters more than duration. Practicing for 20 minutes every day will yield better results than 2 hours once a week."
    },
    {
        question: "What is touch typing and why is it important?",
        answer: "Touch typing is typing without looking at the keyboard using all 10 fingers in specific positions. It dramatically increases speed and reduces fatigue compared to hunt-and-peck typing. Most touch typists reach 60–80 WPM, while hunt-and-peck typists rarely exceed 40 WPM."
    },
    {
        question: "Is there a free typing practice for kids?",
        answer: "Yes! TypingOS has beginner-friendly courses that start with simple key exercises, making it suitable for children aged 8 and above. The gamification system with XP points and achievements keeps young learners motivated."
    },
    {
        question: "How do I increase my typing accuracy?",
        answer: "Focus on slowing down and typing each character correctly, rather than rushing. Use TypingOS's error highlighting to identify recurring mistakes. Practice problem keys in isolation before returning to full-passage tests."
    }
];

const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Online Typing Practice",
    "description": "Practice typing online for free. Structured lessons from beginner to expert. Touch typing, word drills, and exam-specific practice.",
    "url": "https://typingos.com/typing-practice-online",
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://typingos.com" },
            { "@type": "ListItem", "position": 2, "name": "Typing Practice Online", "item": "https://typingos.com/typing-practice-online" }
        ]
    }
};

export default function TypingPracticePage() {
    return (
        <>
            <SEOHead
                title="Free Online Typing Practice — Touch Typing Lessons & Drills"
                description="Practice typing online for free. Structured touch typing lessons from beginner to expert. Improve WPM, train all 10 fingers, and practice for SSC, Railway, and Banking exams."
                keywords="typing practice online, free typing practice, touch typing practice, online typing lessons, learn to type faster, typing drills, beginner typing practice, typing practice for kids"
                url="https://typingos.com/typing-practice-online"
                faqs={faqs}
                schema={schema}
            />

            <div className="min-h-screen bg-background text-foreground">
                <div className="max-w-5xl mx-auto px-4 py-12">

                    {/* Hero */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Free Online Typing Practice
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Structured typing lessons for all levels. Learn touch typing, master all ten fingers,
                            and build real speed with personalized daily drills — completely free.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            <Link
                                to="/lessons"
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
                            >
                                🎓 Start Free Lessons
                            </Link>
                            <Link
                                to="/typing-speed-test"
                                className="inline-flex items-center gap-2 border border-border px-8 py-3 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
                            >
                                ⚡ Test My Speed
                            </Link>
                        </div>
                    </div>

                    {/* Learning Path */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 text-center">Your Typing Practice Journey</h2>
                        <div className="relative">
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
                            <div className="space-y-8">
                                {[
                                    {
                                        step: "Step 1",
                                        title: "Learn the Home Row",
                                        desc: "Place your left fingers on ASDF and right fingers on JKL;. The F and J keys have tactile bumps to guide you. This is your foundation — never skip it.",
                                        link: "/lessons",
                                        linkText: "Start Beginner Lessons"
                                    },
                                    {
                                        step: "Step 2",
                                        title: "Build Finger Reach Patterns",
                                        desc: "Progress to the top row (QWERTY) and bottom row (ZXCV). TypingOS lessons introduce each new key one at a time with targeted drills until it becomes muscle memory.",
                                        link: "/progressive-lessons",
                                        linkText: "Try Progressive Lessons"
                                    },
                                    {
                                        step: "Step 3",
                                        title: "Practice with Real Passages",
                                        desc: "Once you know all keys, practice with real English passages of increasing difficulty. TypingOS's book library lets you type from classic literature, news articles, and exam passages.",
                                        link: "/book-library",
                                        linkText: "Browse Book Library"
                                    },
                                    {
                                        step: "Step 4",
                                        title: "Drill Your Weak Keys with AI",
                                        desc: "TypingOS AI Coach analyzes your typing patterns and creates custom drills for the specific keys and bigrams where your speed drops. This is the fastest path to improvement.",
                                        link: "/ai-coach",
                                        linkText: "Try AI Typing Coach"
                                    },
                                ].map((item) => (
                                    <div key={item.step} className="md:w-5/12 md:even:ml-auto p-6 bg-card border border-border rounded-xl">
                                        <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">{item.step}</div>
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.desc}</p>
                                        <Link to={item.link} className="text-primary hover:underline text-sm font-medium">{item.linkText} →</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Practice Types */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Types of Typing Practice Available Free</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { title: "Touch Typing Lessons", desc: "Structured curriculum from ASDF to full keyboard. 40+ lessons for complete beginners.", link: "/lessons", icon: "⌨️" },
                                { title: "Custom Text Practice", desc: "Paste any text you want — emails, code, exam passages — and practice with it.", link: "/custom-practice", icon: "📝" },
                                { title: "Number & Symbol Drills", desc: "Most typists neglect numbers and symbols. Dedicated practice for the top row and special characters.", link: "/number-symbol-practice", icon: "🔢" },
                                { title: "Exam Mode Practice", desc: "Simulate official SSC, Railway, and Banking typing exams with authentic passage types.", link: "/exams", icon: "📋" },
                                { title: "Book Library Typing", desc: "Type from 100+ classic books, news articles, and programming texts for variety.", link: "/book-library", icon: "📚" },
                                { title: "Multiplayer Race", desc: "Race against other users in real time to add competition and urgency to your practice.", link: "/multiplayer-race", icon: "🏁" },
                            ].map(item => (
                                <Link
                                    key={item.title}
                                    to={item.link}
                                    className="block p-5 bg-card border border-border rounded-xl hover:border-primary transition-all group"
                                >
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Touch Typing Guide */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Touch Typing Guide: The 10-Finger Method</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            <strong>Touch typing</strong> is the technique of typing without looking at the keyboard. Each finger is assigned specific keys, and through practice, striking the right key becomes automatic. Here's the standard 10-finger layout:
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-border mb-4">
                            <table className="w-full text-sm">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="text-left p-4 font-semibold">Finger</th>
                                        <th className="text-left p-4 font-semibold">Left Hand Keys</th>
                                        <th className="text-left p-4 font-semibold">Right Hand Keys</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        ["Pinky", "Q, A, Z, 1, Tab, Caps, Shift", "P, ;, /, 0, [, '], Enter, Shift"],
                                        ["Ring", "W, S, X, 2", "O, L, ., 9"],
                                        ["Middle", "E, D, C, 3", "I, K, ,, 8"],
                                        ["Index", "R, F, V, T, G, B, 4, 5", "U, J, M, Y, H, N, 6, 7"],
                                        ["Thumb", "Space Bar", "Space Bar"],
                                    ].map(([finger, left, right]) => (
                                        <tr key={finger} className="hover:bg-muted/50 transition-colors">
                                            <td className="p-4 font-semibold">{finger}</td>
                                            <td className="p-4 text-muted-foreground font-mono text-xs">{left}</td>
                                            <td className="p-4 text-muted-foreground font-mono text-xs">{right}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            TypingOS lessons follow this exact layout. Our visual keyboard overlay shows you which finger to use for each keystroke.
                        </p>
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

                    {/* Internal Links */}
                    <section className="p-6 bg-muted/30 rounded-xl border border-border">
                        <h2 className="text-xl font-bold mb-4">Related Tools & Resources</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                { to: "/typing-speed-test", label: "Free Typing Speed Test" },
                                { to: "/wpm-calculator", label: "WPM Calculator" },
                                { to: "/courses", label: "Full Typing Courses" },
                                { to: "/exams", label: "Exam Prep (SSC/Railway)" },
                                { to: "/ai-coach", label: "AI Typing Coach" },
                                { to: "/statistics", label: "Progress Statistics" },
                            ].map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="block p-3 bg-card border border-border rounded-lg text-sm font-medium hover:bg-muted hover:border-primary transition-all"
                                >
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
