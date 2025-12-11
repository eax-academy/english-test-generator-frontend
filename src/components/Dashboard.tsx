import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, Trophy } from 'lucide-react';
import type { UserData } from '../types/types';

interface DashboardProps {
    user: UserData | null;
}

const Dashboard = ({ user }: DashboardProps) => {
    const navigate = useNavigate();



    const handleStart = (difficulty: "basic" | "intermediate" | "advanced") => {
        navigate('/generate', { state: { difficulty } });
    };

    return (
        <div className="dashboard-container relative">
            <h1>Welcome, {user?.name}!</h1>
            <p>Select a difficulty level to start a test.</p>
            {/* Reuse levels grid or simpler view */}
            <div className="levels-grid">
                <div className="level-card basic">
                    <div className="level-icon-wrapper green-bg">
                        <BookOpen size={24} className="green-icon" />
                    </div>
                    <h3>Basic Test</h3>
                    <button className="start-test-btn" onClick={() => handleStart('basic')}>Start</button>
                </div>
                <div className="level-card intermediate">
                    <div className="level-icon-wrapper blue-bg">
                        <Target size={24} className="blue-icon" />
                    </div>
                    <h3>Intermediate Test</h3>
                    <button className="start-test-btn" onClick={() => handleStart('intermediate')}>Start</button>
                </div>
                <div className="level-card advanced">
                    <div className="level-icon-wrapper orange-bg">
                        <Trophy size={24} className="orange-icon" />
                    </div>
                    <h3>Advanced Test</h3>
                    <button className="start-test-btn" onClick={() => handleStart('advanced')}>Start</button>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;
