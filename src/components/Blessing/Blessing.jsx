import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import { useTemplateData } from '../../context/TemplateContext';

import './Blessing.scss';

const Blessing = () => {
  const { blessingIntro, blessingParents } = useTemplateData();
  const blessingRef = useIntersectionObserver();

  return (
    <section className="blessing" id="blessing">
      <div ref={blessingRef} className="blessing__inner">
        <p className="blessing__intro">{blessingIntro}</p>
        <span className="blessing__rule" aria-hidden="true" />

        <div className="blessing__parents">
          {blessingParents.map(({ id, names, relation }) => (
            <div key={id} className="blessing__family">
              <p className="blessing__names">{names}</p>
              <p className="blessing__relation">{relation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blessing;
