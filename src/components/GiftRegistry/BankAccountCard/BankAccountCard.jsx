import { useState } from 'react';
import PropTypes from 'prop-types';

import { copyToClipboard } from '../../../utils/formatters';

import './BankAccountCard.scss';

const BankAccountCard = ({ bankName, ownerName, cbu, accountType, accountNumberLabel, cedula }) => {
  const [cbuCopied, setCbuCopied]       = useState(false);
  const [cedulaCopied, setCedulaCopied] = useState(false);

  const handleCopyCbu = async () => {
    const success = await copyToClipboard(cbu);
    if (success) {
      setCbuCopied(true);
      setTimeout(() => setCbuCopied(false), 2200);
    }
  };

  const handleCopyCedula = async () => {
    const success = await copyToClipboard(cedula);
    if (success) {
      setCedulaCopied(true);
      setTimeout(() => setCedulaCopied(false), 2200);
    }
  };

  return (
    <div className="bank-card">
      <div className="bank-card__header">
        <span className="bank-card__bank">{bankName}</span>
        <span className="bank-card__owner">{ownerName}</span>
      </div>

      {accountType && (
        <span className="bank-card__type">{accountType}</span>
      )}

      <div className="bank-card__fields">
        <div className="bank-card__field">
          <span className="bank-card__field-label">{accountNumberLabel || 'N° de Cuenta'}</span>
          <span className="bank-card__field-value bank-card__field-value--mono">{cbu}</span>
          <button
            className={`bank-card__copy ${cbuCopied ? 'bank-card__copy--done' : ''}`}
            onClick={handleCopyCbu}
            aria-label={`Copiar CBU ${cbu}`}
          >
            {cbuCopied ? 'Copiado ✓' : 'Copiar'}
          </button>
        </div>

        {cedula && (
          <div className="bank-card__field">
            <span className="bank-card__field-label">Cédula</span>
            <span className="bank-card__field-value bank-card__field-value--mono">{cedula}</span>
            <button
              className={`bank-card__copy ${cedulaCopied ? 'bank-card__copy--done' : ''}`}
              onClick={handleCopyCedula}
              aria-label={`Copiar cédula ${cedula}`}
            >
              {cedulaCopied ? 'Copiado ✓' : 'Copiar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

BankAccountCard.propTypes = {
  bankName:           PropTypes.string.isRequired,
  ownerName:          PropTypes.string.isRequired,
  cbu:                PropTypes.string.isRequired,
  accountType:        PropTypes.string,
  accountNumberLabel: PropTypes.string,
  cedula:             PropTypes.string,
};

export default BankAccountCard;
