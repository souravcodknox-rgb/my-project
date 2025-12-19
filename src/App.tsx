import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import Index from "./pages/Index";
import Media from "./pages/Media";
import Playlist from "./pages/Playlist";
import Grouping from "./pages/Grouping";
import PlaybackLog from "./pages/PlaybackLog";
import RoleManagement from "./pages/RoleManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3b82f6",
          borderRadius: 8,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/media" element={<Media />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/grouping" element={<Grouping />} />
            <Route path="/playback-log" element={<PlaybackLog />} />
            <Route path="/role-management" element={<RoleManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
