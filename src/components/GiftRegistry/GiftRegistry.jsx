import { BANK_ACCOUNTS, GIFT_REGISTRY_INTRO } from '../../constants';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import BankAccountCard from './BankAccountCard/BankAccountCard';

import './GiftRegistry.scss';

const GiftRegistry = () => {
  const revealRef = useIntersectionObserver();

  const accountCards = BANK_ACCOUNTS.map(({ id, bankName, ownerName, accountAlias, cbu, accountType, accountNumberLabel }) => (
    <BankAccountCard
      key={id}
      bankName={bankName}
      ownerName={ownerName}
      accountAlias={accountAlias}
      cbu={cbu}
      accountType={accountType}
      accountNumberLabel={accountNumberLabel}
    />
  ));

  return (
    <section className="gift-registry" id="gifts">
      <div className="gift-registry__inner">
        <SectionHeader eyebrow="Cuentas para Regalo" title="Su presencia es el regalo" />

        <p ref={revealRef} className="gift-registry__intro">
          {GIFT_REGISTRY_INTRO}
        </p>

        <div className="gift-registry__cards">
          {accountCards}
        </div>
      </div>
    </section>
  );
};

export default GiftRegistry;
