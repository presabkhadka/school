import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/view/school/Landing";
import { ThemeProvider } from "@/components/theme-provider";
import AboutUs from "./pages/view/school/AboutUs";
import { Toaster } from "react-hot-toast";
import Gallery from "./pages/view/school/Gallery";
import Contact from "./pages/view/school/Contact";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", element: <Landing /> },
          { path: "/about", element: <AboutUs /> },
          { path: "/gallery", element: <Gallery /> },
          { path: "/contact-us", element: <Contact /> },
        ])}
      ></RouterProvider>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
