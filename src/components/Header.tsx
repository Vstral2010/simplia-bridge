
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UploadCloud, Text, Home, Info, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-smooth",
        isScrolled 
          ? "py-2 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-medical-600 to-simplify-500 bg-clip-text text-transparent">
              Simplia
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={<Home className="h-4 w-4" />}>
              Home
            </NavLink>
            <NavLink to="/simplify" icon={<Text className="h-4 w-4" />}>
              Text
            </NavLink>
            <NavLink to="/scan" icon={<UploadCloud className="h-4 w-4" />}>
              Scan
            </NavLink>
            <NavLink to="/glossary" icon={<BookOpen className="h-4 w-4" />}>
              Glossary
            </NavLink>
            <NavLink to="/about" icon={<Info className="h-4 w-4" />}>
              About
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <a 
              href="#simplify"
              className="hidden md:inline-flex items-center justify-center rounded-full bg-medical-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-medical-700 transition-all duration-300 ease-out"
            >
              Get Started
            </a>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 md:hidden focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-smooth origin-top",
          isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <MobileNavLink to="/" icon={<Home className="h-5 w-5" />}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/simplify" icon={<Text className="h-5 w-5" />}>
            Text Simplifier
          </MobileNavLink>
          <MobileNavLink to="/scan" icon={<UploadCloud className="h-5 w-5" />}>
            Document Scanner
          </MobileNavLink>
          <MobileNavLink to="/glossary" icon={<BookOpen className="h-5 w-5" />}>
            My Glossary
          </MobileNavLink>
          <MobileNavLink to="/about" icon={<Info className="h-5 w-5" />}>
            About
          </MobileNavLink>
          <div className="pt-2">
            <a
              href="#simplify"
              className="block w-full text-center rounded-full bg-medical-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-medical-700 transition-all duration-300 ease-out"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const NavLink = ({ to, icon, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-medical-600 transition-all duration-300"
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, icon, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="flex items-center px-3 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-medical-600 transition-all duration-300"
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </Link>
  );
};

export default Header;
