import React, { useState } from 'react';

import styles from './Intro.module.scss';

const Intro = ({ onStart }) => {
  const [categories, setCategories] = useState({
    major: true,
    heli: true,
    south: true,
    middle: true,
    north: true,
  });

  return (
    <div>
      <h1 className={styles.header}>Svenskt flygplats-quiz</h1>
      <h3 className={styles.intro}>
        Välj vilka kategorier du vill inkludera. Max femtio flygplatser slumpas
        fram och deras ICAO-koder kommer att efterfrågas. Lycka till!{' '}
        <span role="img" aria-label="Fist bump">
          👊
        </span>
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
          name="Småfält södra"
          count={21}
          selected={categories.south}
          onClick={() =>
            setCategories({ ...categories, south: !categories.south })
          }
        />
        <Category
          name="Småfält mellersta"
          count={36}
          selected={categories.middle}
          onClick={() =>
            setCategories({ ...categories, middle: !categories.middle })
          }
        />
        <Category
          name="Småfält norra"
          count={35}
          selected={categories.north}
          onClick={() =>
            setCategories({ ...categories, north: !categories.north })
          }
        />
      </div>

      <StartButton
        onClick={() => {
          onStart(categories);
        }}
        disabled={
          !categories.major &&
          !categories.heli &&
          !categories.south &&
          !categories.middle &&
          !categories.north
        }
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
