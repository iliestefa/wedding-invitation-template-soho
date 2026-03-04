import { useState, useEffect } from 'react';

import { BRIDE_NAME, GROOM_NAME } from '../../constants';

import './Navigation.scss';

const NAV_LINKS = [
  { id: 'nav-historia',   href: '#story',     label: 'Historia' },
  { id: 'nav-ceremonia',  href: '#ceremony',  label: 'Ceremonia' },
  { id: 'nav-cronograma', href: '#schedule',  label: 'Cronograma' },
  { id: 'nav-vestimenta', href: '#dresscode', label: 'Vestimenta' },
  { id: 'nav-regalos',    href: '#gifts',     label: 'Regalos' },
  { id: 'nav-rsvp',       href: '#rsvp',      label: 'RSVP' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const navLinks = NAV_LINKS.map(({ id, href, label }) => (
    <li key={id} className="nav__item">
      <a href={href} className="nav__link" onClick={handleLinkClick}>
        {label}
      </a>
    </li>
  ));

  return (
    <header className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#hero" className="nav__monogram" aria-label="Inicio">
          <span className="nav__monogram-text">{BRIDE_NAME[0]}</span>
          <span className="nav__monogram-amp">&amp;</span>
          <span className="nav__monogram-text">{GROOM_NAME[0]}</span>
        </a>

        <nav className="nav__desktop" aria-label="Navegación principal">
          <ul className="nav__list">{navLinks}</ul>
        </nav>

        <button
          className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`nav__mobile ${menuOpen ? 'nav__mobile--open' : ''}`}
        aria-label="Menú móvil"
      >
        <ul className="nav__mobile-list">{navLinks}</ul>
      </nav>
    </header>
  );
};

export default Navigation;
