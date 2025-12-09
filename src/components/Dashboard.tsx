import { BookOpen, Target, Trophy } from 'lucide-react';
import type { UserData } from '../types';

interface DashboardProps {
    user: UserData | null;
}

const Dashboard = ({ user }: DashboardProps) => {
    return (
        <div className="dashboard-container">
            <h1>Welcome, {user?.name}!</h1>
            <p>Select a difficulty level to start a test.</p>
            {/* Reuse levels grid or simpler view */}
            <div className="levels-grid">
                <div className="level-card basic" onClick={() => alert('Start Basic Test')}>
                    <div className="level-icon-wrapper green-bg">
                        <BookOpen size={24} className="green-icon" />
                    </div>
                    <h3>Basic Test</h3>
                    <button className="start-test-btn">Start</button>
                </div>
                <div className="level-card intermediate" onClick={() => alert('Start Intermediate Test')}>
                    <div className="level-icon-wrapper blue-bg">
                        <Target size={24} className="blue-icon" />
                    </div>
                    <h3>Intermediate Test</h3>
                    <button className="start-test-btn">Start</button>
                </div>
                <div className="level-card advanced" onClick={() => alert('Start Advanced Test')}>
                    <div className="level-icon-wrapper orange-bg">
                        <Trophy size={24} className="orange-icon" />
                    </div>
                    <h3>Advanced Test</h3>
                    <button className="start-test-btn">Start</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
