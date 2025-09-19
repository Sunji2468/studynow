import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Library, Home } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            {/* <div className="w-10 h-10 hero-gradient rounded-xl flex items-center justify-center glow-effect transition-all duration-300">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div> */}
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              StudyNow
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Link to="/decks">
              <Button 
                variant={location.pathname === "/decks" ? "default" : "ghost"}
                className="gap-2"
              >
                <Library className="w-4 h-4" />
                My Decks
              </Button>
            </Link>
            <Link to="/create">
              <Button 
                variant={location.pathname === "/create" ? "default" : "ghost"}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Deck
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};