import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "./components/AdminLayout";
import Layout from "./components/Layout";

// Public Pages
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminResults from "./pages/admin/AdminResults";

import { QuizContextProvider } from "./store/QuizContext";

// function AdminRoute({ children }: React.PropsWithChildren) {
//   const token = localStorage.getItem("admin_token");
//   return token ? children : <Navigate to="/login" replace />;
// }

function App() {
  return (
    <QuizContextProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />}>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            <Route path="/results/:quizId" element={<ResultsPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            {/* <Route path="/admin" element={      // more secure route for admin
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
            > */}
              <Route index element={<AdminDashboard />} />
              <Route path="quizzes" element={<AdminQuizzes />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="results" element={<AdminResults />} />
            </Route>

            <Route path="*" element={<div>404 Not Found</div>} />

        </Routes>
      </BrowserRouter>
    </QuizContextProvider>
  );
}

export default App;
