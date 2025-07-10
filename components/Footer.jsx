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
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-green-700 text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/></svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-700 text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-green-700 text-gray-400">
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