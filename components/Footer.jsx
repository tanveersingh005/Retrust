import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col md:flex-row justify-between items-start gap-10">
      {/* Brand and Mission */}
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-2 mb-2">
          {/* <span className="inline-block w-7 h-7 bg-green-600 rounded-md" /> */}
          <span className="font-bold text-2xl text-gray-900">ReTrust+</span>
        </div>
        <div className="text-gray-500 text-sm mb-4">
          Building a circular future, one product at a time.
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-2 px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold hover:bg-green-200 transition"
        >
          ↑ Back to top
        </button>
      </div>
      {/* Navigation */}
      <div className="flex-1 min-w-[180px]">
        <div className="font-semibold text-gray-900 mb-2">Explore</div>
        <ul className="space-y-1">
          <li><Link to="/shop" className="text-gray-600 hover:text-green-700">Shop</Link></li>
          <li><Link to="/return" className="text-gray-600 hover:text-green-700">Return</Link></li>
          <li><Link to="/impact" className="text-gray-600 hover:text-green-700">Impact</Link></li>
          <li><Link to="/partners" className="text-gray-600 hover:text-green-700">Partners</Link></li>
          <li><Link to="/about" className="text-gray-600 hover:text-green-700">About</Link></li>
          <li><Link to="/contact" className="text-gray-600 hover:text-green-700">Contact</Link></li>
        </ul>
      </div>
      {/* Contact & Social */}
      <div className="flex-1 min-w-[220px]">
        <div className="font-semibold text-gray-900 mb-2">Contact</div>
        <div className="text-gray-600 text-sm mb-1">support@retrustplus.com</div>
        <div className="text-gray-600 text-sm mb-1">+91 7719538411</div>
        <div className="text-gray-600 text-sm mb-4">Indian Institute Of Information Technology Kota</div>
        <div className="flex gap-4">
          <a href="https://github.com/tanveersingh005" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-green-700 text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          </a>
          <a href="https://instagram.com/itztanveer_singh411" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-700 text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
          </a>
          <a href="https://linkedin.com/tanveer-singh005" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-green-700 text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-400 text-xs py-4 border-t border-gray-100">
      &copy; {new Date().getFullYear()} ReTrust+. All rights reserved.
    </div>
  </footer>
);

export default Footer;