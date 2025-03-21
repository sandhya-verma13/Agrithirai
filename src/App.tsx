
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

// Pages
import Index from "./pages/Index";
import Weather from "./pages/Weather";
import Schemes from "./pages/Schemes";
import Equipment from "./pages/Equipment";
import Crops from "./pages/Crops";
import AIAssistant from "./pages/AIAssistant";
import LiveMarketPrices from "./pages/LiveMarketPrices";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protect routes that require authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // Check if user is logged in - could be enhanced with a real auth system
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/crops" element={
              <ProtectedRoute>
                <Crops />
              </ProtectedRoute>
            } />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/market-prices" element={<LiveMarketPrices />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
