
import { Link } from "react-router-dom";
import { ExternalLink, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link 
              to="/" 
              className="inline-flex items-center mb-4"
            >
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-medical-600 to-simplify-500 bg-clip-text text-transparent">
                Simplia
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Understand Medicine, Simply.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-medical-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-medical-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-medical-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/simplify" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Text Simplifier
                </Link>
              </li>
              <li>
                <Link to="/scan" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Document Scanner
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="text-gray-600 hover:text-medical-600 transition-colors">
                  My Glossary
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Medical Dictionary
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-600 transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Learning Resources
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-medical-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Simplia. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-medical-600 text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-600 text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-600 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
