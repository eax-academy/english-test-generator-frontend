import { Outlet } from "react-router-dom";

import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

export default function Layout() {
    return (
        <>
            <MainNavigation />
            <main style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}