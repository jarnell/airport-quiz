import React from 'react';

import styles from './Cross.module.scss';

const Cross = () => (
  <div className={styles.container}>
    <svg
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.cross}
    >
      <circle fill="none" cx="25" cy="25" r="25" />
      <path
        d="M15.6 15.7l18.6 18.7M15.2 34.8l19.3-19.5-19.3 19.5z"
        stroke="#FFF"
        strokeWidth="4"
        className={styles.lines}
      />
    </svg>
  </div>
);

export default Cross;
