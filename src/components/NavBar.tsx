import AppBar from "./AppBar";
//import { ModeToggle } from "./ui/mode-toggle";
import { ThemeProvider } from "./ui/theme-provider";

function NavBar() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="p-2">
          {/* <div className="flex justify-start  mx-auto ">
            <ModeToggle />
          </div> */}
          <div className="flex justify-center mx-auto">
            <AppBar />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default NavBar;
