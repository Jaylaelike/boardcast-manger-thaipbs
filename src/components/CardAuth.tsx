import CardLogin from "./CardLogin"
import { ThemeProvider } from "./ui/theme-provider"


function CardAuth() {
  return (
   <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-8">
        <div className="flex justify-center mx-auto">
          <CardLogin />
        </div>
      </div>
    
    </ThemeProvider>

   </>
  )
}

export default CardAuth