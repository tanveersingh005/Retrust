import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin, Github, Instagram, Linkedin, Leaf } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800/80 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and Mission */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl shadow-lg shadow-teal-500/10">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent tracking-tight">
                ReTrust+
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering a sustainable tomorrow. Trade refurbished products, return your recyclables, track your carbon footprints, and earn eco-credits.
            </p>
            <div>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 hover:border-teal-500/30 text-slate-300 hover:text-white font-medium text-xs transition duration-300 backdrop-blur-sm"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition duration-300" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wider text-xs uppercase">Explore Platform</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shop" className="text-slate-400 hover:text-teal-400 transition-colors duration-250">
                  Shop Refurbished
                </Link>
              </li>
              <li>
                <Link to="/return" className="text-slate-400 hover:text-teal-400 transition-colors duration-250">
                  Recycle Items
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-slate-400 hover:text-teal-400 transition-colors duration-250">
                  Impact Dashboard
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-400 hover:text-teal-400 transition-colors duration-250">
                  Partner Locator
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-teal-400 transition-colors duration-250">
                  Our Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-5">
            <h4 className="font-semibold text-white tracking-wider text-xs uppercase">Get in Touch</h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span className="hover:text-slate-200 transition-colors">support@retrustplus.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span className="hover:text-slate-200 transition-colors">+91 7719538411</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>IIIT Kota, Rajasthan, India</span>
              </li>
            </ul>

            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/tanveersingh005"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/40 text-slate-400 hover:text-teal-400 hover:border-teal-500/20 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/itztanveer_singh411"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/40 text-slate-400 hover:text-teal-400 hover:border-teal-500/20 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/tanveer-singh005"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/40 text-slate-400 hover:text-teal-400 hover:border-teal-500/20 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} ReTrust+. Dedicated to a cleaner earth.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;