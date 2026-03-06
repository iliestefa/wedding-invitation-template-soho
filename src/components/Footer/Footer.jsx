import { useTemplateData } from '../../context/TemplateContext';

import './Footer.scss';

const Footer = () => {
  const { brideName, groomName, weddingDateDisplay, footerMessage } = useTemplateData();

  const brideInitial = brideName ? brideName.charAt(0).toUpperCase() : 'S';
  const groomInitial = groomName ? groomName.charAt(0).toUpperCase() : 'A';

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__monogram" aria-hidden="true">
          {brideInitial} &amp; {groomInitial}
        </div>

        <span className="footer__rule" aria-hidden="true" />

        <p className="footer__date">{weddingDateDisplay}</p>

        <p className="footer__message">{footerMessage}</p>

        <p className="footer__credit">
          Hecho con amor · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
