
import { useNavigate } from "react-router-dom";
import styles from "./AboutPage.module.css";

function AboutPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.aboutContainer}>
            <h1 className={styles.aboutTitle}>Welcome dear guest!</h1>
            <p className={styles.aboutSubtitle}>
                Challenge yourself, learn new things, and see how you stack up against the world.
                Your ultimate destination for fun, interactive quizzes.
            </p>
            <div className={styles.aboutCards}>
                <div className={styles.aboutCard}>
                    <h2 className={styles.aboutCardTitle}>Interactive Quizzes</h2>
                    <p className={styles.aboutCardText}>
                        Play quizzes on any topic you love, with instant feedback and rankings.
                    </p>
                </div>
                <div className={styles.aboutCard}>
                    <h2 className={styles.aboutCardTitle}>Track Your Progress</h2>
                    <p className={styles.aboutCardText}>
                        See your scores, track improvements, and compete with friends.
                    </p>
                </div>
                <div className={styles.aboutCard}>
                    <h2 className={styles.aboutCardTitle}>Custom Challenges</h2>
                    <p className={styles.aboutCardText}>
                        Create your own quizzes and challenge your friends to beat your high score.
                    </p>
                </div>
            </div>
            <div className={styles.aboutAction}>
                <h3 className={styles.aboutActionTitle}>Ready to Play?</h3>
                <p className={styles.aboutActionText}>
                    Jump in and start your quiz adventure today!
                </p>
                <button
                    className={styles.aboutButton}
                    onClick={() => navigate('/home')}
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}

export default AboutPage;
