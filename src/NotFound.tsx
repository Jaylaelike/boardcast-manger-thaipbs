import { Link } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";

function NotFound() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="col-2 mx-auto flex flex-col items-center justify-center h-screen px-4 space-y-6">
          <h2 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0">
            Error 404 !!! , Page is not found...
          </h2>
          <p>
            <Link to="/">return home</Link>
          </p>
        </div>
      </ThemeProvider>
    </>
  );
}

export default NotFound;
