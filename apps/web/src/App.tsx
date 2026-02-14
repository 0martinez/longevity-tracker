import { ThemeProvider } from "@/components/theme/theme-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <ThemeProvider>
      <AppLayout />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
