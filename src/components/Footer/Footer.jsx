import { COUPLE_NAMES, WEDDING_DATE_DISPLAY, FOOTER_MESSAGE } from '../../constants';

import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__monogram" aria-hidden="true">S &amp; A</div>

      <p className="footer__names">{COUPLE_NAMES}</p>

      <span className="footer__rule" aria-hidden="true" />

      <p className="footer__date">{WEDDING_DATE_DISPLAY}</p>

      <p className="footer__message">{FOOTER_MESSAGE}</p>

      <p className="footer__credit">
        Hecho con amor · {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default Footer;
