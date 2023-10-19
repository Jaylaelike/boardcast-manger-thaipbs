import { ThemeProvider } from "./ui/theme-provider";
import ActiveSlider from "./ActiveSlider";
import ListHome from "./ListHome";


function Home() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="">
          <ActiveSlider />
        </div>

        <div className="grid justify-items-center p-4">
          <p className="text-3xl text-gray-900 dark:text-white">
            Station List Favorite
          </p>
        </div>

        <div className="grid justify-items-center ">
          <ListHome />
        </div>
      </ThemeProvider>
    </>
  );
}

export default Home;
