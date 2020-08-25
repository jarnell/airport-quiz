import React, { useRef, useEffect } from 'react';

import styles from './ICAOInput.module.scss';

const ICAOInput = ({ value, onChange, disabled }) => {
  const input = useRef(null);

  // Focus when value is cleared
  useEffect(() => {
    if (!value) input.current.focus();
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        maxLength="4"
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        value={value}
        ref={input}
        disabled={disabled}
      />

      <div className={styles.borderContainer}>
        <span className={styles.border}></span>
        <span className={styles.border}></span>
        <span className={styles.border}></span>
        <span className={styles.border}></span>
      </div>
    </div>
  );
};

export default ICAOInput;
