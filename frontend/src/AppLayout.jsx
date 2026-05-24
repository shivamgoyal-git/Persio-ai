import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

export default function AppLayout() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
