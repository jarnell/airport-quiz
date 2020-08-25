import React from 'react';

import styles from './Checkmark.module.scss';

const Checkmark = () => (
  <div className={styles.container}>
    <svg
      className={styles.checkmark}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <path
        className={styles.check}
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  </div>
);

export default Checkmark;
