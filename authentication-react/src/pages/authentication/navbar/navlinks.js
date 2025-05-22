import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {BackEnd_url}  from '../../../constance';
import './nav.css';

export default function Navlinks() {
    const [links, setlinks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    // Track which dropdown is open for mobile and desktop
    const [openDropdown, setOpenDropdown] = useState(null);

    // Toggle dropdown for mobile
    const handleDropdownToggle = idx => {
        if (openDropdown === idx) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(idx);
        }
    };

    useEffect(() => {
        fetch(`${BackEnd_url}/api/category`)
            .then(res => res.json())
            .then(data => setlinks(data));
    }, []);

    return (
      <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-2">
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-yellow-300 hover:border-yellow-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
          <div className={`flex-1 flex flex-col md:flex-row items-start md:items-center w-full md:w-auto ${isOpen ? '' : 'hidden'} md:flex bg-blue-950 md:bg-transparent rounded-xl md:rounded-none shadow-lg md:shadow-none mt-4 md:mt-0 p-4 md:p-0 transition-all duration-300`}>
            <Link to="/" className="text-lg font-bold tracking-wide px-4 py-2 hover:text-yellow-300 transition w-full md:w-auto text-center">Home</Link>
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
                {links.map((item, idx) => (
                  <li
                    key={item._id}
                    className="relative group w-full md:w-auto"
                    onMouseEnter={() => !isOpen && setOpenDropdown(idx)}
                  >
                    <div className="flex items-center w-full md:w-auto">
                      <Link to={`/${item.name}`} className="px-4 py-2 rounded hover:bg-blue-800 transition flex-1 md:flex-none flex items-center w-full md:w-auto text-center md:text-left">
                        {item.name}
                        {item.subcategory && item.subcategory.length > 0 && (
                          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        )}
                      </Link>
                      {/* Show dropdown toggle button only on mobile */}
                      {item.subcategory && item.subcategory.length > 0 && (
                        <button
                          type="button"
                          className="ml-2 px-2 py-1 rounded bg-blue-800 hover:bg-blue-700 focus:outline-none md:hidden"
                          onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                          aria-label="Toggle subcategories"
                        >
                          <svg className={`w-4 h-4 transition-transform ${openDropdown === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                      )}
                    </div>
                    {/* Desktop dropdown: hover to show, auto-hide on click */}
                    {item.subcategory && item.subcategory.length > 0 && openDropdown === idx && (
                      <ul
                        className="desktop-dropdown absolute left-0 mt-2 min-w-0 max-w-xs md:w-56 bg-white text-blue-900 rounded-xl shadow-2xl border border-blue-200 transition pointer-events-auto z-50 animate-fade-in overflow-x-hidden"
                        tabIndex={0}
                      >
                        {item.subcategory.map((subcategory, index) => (
                          <li key={index}>
                            <Link
                              to={`/${item.name}/${subcategory}`}
                              className="block px-4 py-2 hover:bg-blue-100 whitespace-nowrap font-medium rounded"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subcategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.subcategory && item.subcategory.length > 0 && isOpen && openDropdown === idx && (
                      <ul className="block md:hidden w-full bg-blue-900 text-white rounded-lg shadow-lg mt-2">
                        {item.subcategory.map((subcategory, index) => (
                          <li key={index}>
                            <Link
                              to={`/${item.name}/${subcategory}`}
                              className="block px-4 py-2 hover:bg-blue-800 whitespace-nowrap font-medium rounded"
                              onClick={e => {
                                setOpenDropdown(null);
                                setIsOpen(false);
                              }}
                            >
                              {subcategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
}