import { NavLink } from 'react-router-dom';
import brainLogo from '../../assets/Brain.png';
import classes from './MainNavigation.module.css';


function MainNavigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <NavLink to="/">
                    <img src={brainLogo} alt="Brain Logo" />
                </NavLink>
                <span>English Test Generator</span>
            </div>

            <nav>
                <ul className={classes.links}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default MainNavigation;
