import classes from "./Footer.module.css";

function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={classes.links}>
                <span>Authors: </span>
                <a href="https://www.linkedin.com/in/sarkis-sanoyan/">Sarkis Sanoyan</a>
                <a href="https://www.linkedin.com/in/veronika-terteryan-00590b308/">Veronika Terteryan</a>
                <a href="https://www.linkedin.com/in/sargis-abgaryan-a622952b0/">Sargis Abgaryan</a>
            </div>

            <p>© {new Date().getFullYear()} QuizApp. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;
