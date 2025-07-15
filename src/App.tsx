import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import Index from "./pages/Index";
import Communities from "./pages/Communities";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";
import Features from "./pages/Features";
import Analytics from "./pages/Analytics";
import Pricing from "./pages/Pricing";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import ApiDocs from "./pages/ApiDocs";
import Status from "./pages/Status";
import AuthCallback from "./pages/AuthCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/features" element={<Features />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/status" element={<Status />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
