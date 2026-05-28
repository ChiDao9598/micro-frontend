import React from 'react';
import { navigateToUrl } from 'single-spa';
import "../assets/css/navbar.css";
import logo from "../assets/images/logo/logo.png";

const NAV_ITEMS = [
  { label: 'Home',         path: '/'            },
  { label: 'React App',   path: '/virtual-office-3d'   },
  { label: 'Vue App',     path: '/vue-app'     },
  { label: 'Angular App', path: '/angular-app' },
  { label: 'Svelte App',  path: '/svelte-app'  },
];

export default function Navbar() {
  const currentPath = window.location.pathname;

  function handleNav(e, path) {
    e.preventDefault();
    navigateToUrl(path); // Single-SPA's navigation (no full page reload)
  }

  return (
    <div className="wrap-navbar">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-logo">
            <img src={logo} alt="logo"></img>
          </span>
        </div>

        <ul className="navbar-links">
          {NAV_ITEMS.map(({ label, path }) => (
            <li key={path}>
              <a
                href={path}
                className={`navbar-link ${
                  currentPath.startsWith(path) && path !== "/"
                    ? "active"
                    : currentPath === "/" && path === "/"
                    ? "active"
                    : ""
                }`}
                onClick={(e) => handleNav(e, path)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
