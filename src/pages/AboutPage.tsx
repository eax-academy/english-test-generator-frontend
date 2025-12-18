import { useNavigate } from "react-router-dom";

function AboutPage() {
    const navigate = useNavigate();

    return (
        <div className="text-white flex flex-col items-center justify-start py-16 px-4 md:px-16">
            <h1 className="text-2xl md:text-6xl font-semibold mb-6 text-red-600">
                Welcome dear guest!
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 mb-12 text-center max-w-3xl">
                Challenge yourself, learn new things, and see how you stack up against the world.
                Your ultimate destination for fun, interactive quizzes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl hover:cursor-pointer">
                <div className="bg-[#1f1f1f] p-6 rounded-lg hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Interactive Quizzes</h2>
                    <p className="text-gray-300">
                        Play quizzes on any topic you love, with instant feedback and rankings.
                    </p>
                </div>

                <div className="bg-[#1f1f1f] p-6 rounded-lg hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Track Your Progress</h2>
                    <p className="text-gray-300">
                        See your scores, track improvements, and compete with friends.
                    </p>
                </div>

                <div className="bg-[#1f1f1f] p-6 rounded-lg hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-bold mb-2 text-red-600">Custom Challenges</h2>
                    <p className="text-gray-300">
                        Create your own quizzes and challenge your friends to beat your high score.
                    </p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h3 className="text-3xl font-bold mb-4 text-white">Ready to Play?</h3>
                <p className="text-gray-400 mb-6">
                    Jump in and start your quiz adventure today!
                </p>

                <button className="bg-red-600 hover:bg-red-700 transition-colors px-8 py-3 rounded text-white font-semibold text-lg cursor-pointer"
                    onClick={() => navigate('/home')}>
                    Start Quiz
                </button>
            </div>
        </div>
    );
}

export default AboutPage;
