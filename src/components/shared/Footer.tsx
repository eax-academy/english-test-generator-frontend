import classes from "./Footer.module.css";

function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={classes.links}>
                <a href="#">FAQ</a>
                <a href="#">Help Center</a>
                <a href="#">Terms of Use</a>
                <a href="#">Privacy Policy</a>
            </div>

            <p>© {new Date().getFullYear()} QuizApp. All Rights Reserved. <span>Sanoyan Software Solutions.</span></p>
        </footer>
    );
}

export default Footer;
