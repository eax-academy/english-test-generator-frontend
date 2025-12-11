import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <MainNavigation />
            <main style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>{children}</main>
            <Footer />
        </>
    );
}
