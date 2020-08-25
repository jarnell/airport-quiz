import React, { useState } from 'react';

import styles from './Intro.module.scss';

const Intro = ({ onStart }) => {
  const [categories, setCategories] = useState({
    major: true,
    heli: true,
    other: true,
  });

  return (
    <div>
      <h1 className={styles.header}>Flygplats-quiz</h1>
      <h3 className={styles.intro}>
        Välj vilka kategorier du vill inkludera. Femtio flygplatser slumpas fram
        och du ska ange ICAO-kod för dom.
      </h3>

      <div className={styles.categories}>
        <Category
          name="Större flygplatser"
          count={48}
          selected={categories.major}
          onClick={() =>
            setCategories({ ...categories, major: !categories.major })
          }
        />
        <Category
          name="Helipads"
          count={39}
          selected={categories.heli}
          onClick={() =>
            setCategories({ ...categories, heli: !categories.heli })
          }
        />
        <Category
          name="Övriga fält"
          count={92}
          selected={categories.other}
          onClick={() =>
            setCategories({ ...categories, other: !categories.other })
          }
        />
      </div>

      <StartButton
        onClick={() => {
          onStart(categories);
        }}
        disabled={!categories.major && !categories.heli && !categories.other}
      >
        Starta quizet
      </StartButton>
    </div>
  );
};

const Category = ({ name, count, selected, onClick }) => (
  <button
    className={selected ? styles.category : styles.categoryNotSelected}
    onClick={onClick}
  >
    <span role="img" aria-label={name}>
      {selected ? '✅' : '❌'}
    </span>{' '}
    {name} <small>({count} st)</small>
  </button>
);

const StartButton = ({ children, disabled, onClick }) => (
  <button className={styles.startButton} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Intro;
