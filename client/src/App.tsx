import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing-page/LandingPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import LoginPage from "./pages/login-page/LoginPage";
import BoadsPage from "./pages/boards-page/BoadsPage";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";
import AuthGuard from "./guard/AuthGuard";
import PreLoginGuard from "./guard/PreLoginGuard";
import MainLayout from "./components/main-layout/MainLayout";
import BoardDetailPage from "./pages/board-details-page/BoardDetailPage";
import { boardLoader } from "./pages/board-details-page/boardDetailsLoader";
import ErrorPage from "./pages/error-page/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <PreLoginGuard />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "login", element: <LoginPage /> },
        ],
      },
      {
        element: <AuthGuard />,
        children: [
          { path: "boards", element: <BoadsPage /> },
          { path: "boards/:id", element: <BoardDetailPage />, loader: boardLoader, errorElement: <ErrorPage/>},
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
