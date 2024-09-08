import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";

// Pages --->
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ViewPost from "./pages/ViewPost";
import WritePost from "./pages/WritePost";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";

function App() {
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    console.log("Inside useEffect");
    if (user !== null) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.setItem("user", null);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, showErrorToast, showSuccessToast }}
    >
      <Navbar />
      <Outlet />
    </UserContext.Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        index: true,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "post/:postId",
        element: <ViewPost />,
      },
      {
        path: "writePost",
        element: <WritePost />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
