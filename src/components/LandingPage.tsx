import { BookOpen, CheckCircle2, Clock, Medal, Target, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <h1>Master English with Personalized Tests</h1>
                <p className="hero-subtitle">
                    Improve your English skills with our adaptive testing platform. Choose your difficulty level and track your progress over time.
                </p>
                <button className="cta-btn" onClick={() => navigate('/register')}>Start Learning Today</button>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="feature-card">
                    <div className="icon-wrapper blue-bg">
                        <CheckCircle2 size={24} className="blue-icon" />
                    </div>
                    <h3>Multiple Difficulty Levels</h3>
                    <p>Choose from Basic, Intermediate, or Advanced levels to match your current skill level.</p>
                </div>
                <div className="feature-card">
                    <div className="icon-wrapper purple-bg">
                        <Clock size={24} className="purple-icon" />
                    </div>
                    <h3>Timed Practice</h3>
                    <p>Test your knowledge under time pressure to simulate real exam conditions.</p>
                </div>
                <div className="feature-card">
                    <div className="icon-wrapper pink-bg">
                        <Medal size={24} className="pink-icon" />
                    </div>
                    <h3>Track Your Progress</h3>
                    <p>Monitor your improvement with detailed results and performance analytics.</p>
                </div>
            </section>

            {/* Difficulty Levels Section */}
            <section className="levels-section">
                <h2>Choose Your Level</h2>
                <div className="levels-grid">
                    {/* Basic */}
                    <div className="level-card basic">
                        <div className="level-icon-wrapper green-bg">
                            <BookOpen size={24} className="green-icon" />
                        </div>
                        <h3>Basic</h3>
                        <p className="level-desc">Perfect for beginners starting their English journey</p>
                        <ul className="level-features">
                            <li>• Simple grammar</li>
                            <li>• Common vocabulary</li>
                            <li>• Basic sentence structure</li>
                        </ul>
                    </div>

                    {/* Intermediate */}
                    <div className="level-card intermediate">
                        <div className="level-icon-wrapper blue-bg">
                            <Target size={24} className="blue-icon" />
                        </div>
                        <h3>Intermediate</h3>
                        <p className="level-desc">For learners with foundational English knowledge</p>
                        <ul className="level-features">
                            <li>• Complex grammar</li>
                            <li>• Broader vocabulary</li>
                            <li>• Reading comprehension</li>
                        </ul>
                    </div>

                    {/* Advanced */}
                    <div className="level-card advanced">
                        <div className="level-icon-wrapper orange-bg">
                            <Trophy size={24} className="orange-icon" />
                        </div>
                        <h3>Advanced</h3>
                        <p className="level-desc">Challenge yourself with professional-level content</p>
                        <ul className="level-features">
                            <li>• Advanced grammar</li>
                            <li>• Academic vocabulary</li>
                            <li>• Complex analysis</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
