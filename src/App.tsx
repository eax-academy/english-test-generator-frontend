import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/shared/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import ResultsPage from "./pages/ResultsPage.tsx";

import { QuizContextProvider } from "./store/QuizContext.tsx";


function App() {
  return (
    <QuizContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            <Route path="/results/:quizId" element={<ResultsPage />} />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QuizContextProvider>
  );
}

export default App;
