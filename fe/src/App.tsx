import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/view/school/Landing";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider
        router={createBrowserRouter([{ path: "/", element: <Landing /> }])}
      ></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
