import React, { useState } from 'react';

import { Map, Intro, ICAOInput, Checkmark, Cross } from './components';
import airports from './airports.json';
import sampleSize from './utils/sampleSize';
import dmsToDecimal from './utils/dmsToDecimal';

import styles from './App.module.scss';

const QUIZ_SIZE = 50;

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [icao, setIcao] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState([]);

  const startQuiz = (categories) => {
    // Create a pool of airports from the categories user has selected
    const airportPool = [
      ...(categories.major
        ? Object.values(airports).filter((airport) => airport.type === 'M')
        : []),
      ...(categories.heli
        ? Object.values(airports).filter((airport) => airport.type === 'H')
        : []),
      ...(categories.other
        ? Object.values(airports).filter((airport) => !airport.type)
        : []),
    ];

    // Start quiz!
    setQuestions(sampleSize(airportPool, QUIZ_SIZE));
  };

  // Resetting state to defaults
  const resetQuiz = () => {
    setQuestions([]);
    setCurrent(0);
    setIcao('');
    setFeedback(null);
    setErrors([]);
  };

  const repeatErrors = () => {
    setQuestions(
      sampleSize(
        errors.reduce((acc, cur) => {
          return [...acc, airports[cur]];
        }, []),
        errors.length
      )
    );
    setCurrent(0);
    setIcao('');
    setFeedback(null);
    setErrors([]);
  };

  const handleInputChange = (value) => {
    if (/[A-Z]{0,4}/.test(value)) {
      setIcao(value);

      if (value.length === 4) {
        handleSubmit(value);
      }
    }
  };

  const handleSubmit = (icaoString) => {
    if (questions[current].icao === icaoString) {
      // User answered correctly
      setFeedback(1);
      setTimeout(goNext, 1200);
    } else {
      setFeedback(2);
      setErrors([...errors, questions[current].icao]);
      setTimeout(goNext, 3000);
    }
  };

  // Go to next question
  const goNext = () => {
    setFeedback(null);
    setIcao('');
    setCurrent(current + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <Map
          marker={
            questions[current] && dmsToDecimal(questions[current].coordinates)
          }
        />
      </div>

      {questions.length > 0 && questions.length > current && (
        <div className={styles.questionContainer}>
          <h3 className={styles.progress}>
            Fråga {current + 1} av {questions.length}
          </h3>
          <h2 className={styles.question}>Ange ICAO-koden för</h2>
          <h1 className={styles.city}>
            {questions[current].name.replace('/', ' / ')}
          </h1>

          <div className={styles.input}>
            <ICAOInput
              onChange={handleInputChange}
              value={icao}
              disabled={!!feedback}
            />
            {feedback === 1 && <Checkmark />}
            {feedback === 2 && <Cross />}
          </div>

          {feedback === 2 && (
            <>
              <h3 className={styles.correct}>
                <strong>Rätt svar:</strong> {questions[current].icao}
              </h3>

              <div className={styles.timer} />
            </>
          )}
        </div>
      )}

      {questions.length === 0 && <Intro onStart={startQuiz} />}

      {questions.length > 0 && current >= questions.length && (
        <Result
          questions={questions.length}
          errors={errors.length}
          onRepeatErrorsClick={repeatErrors}
          onPlayAgainClick={resetQuiz}
        />
      )}
    </div>
  );
}

const Result = ({
  questions,
  errors,
  onPlayAgainClick,
  onRepeatErrorsClick,
}) => (
  <div className={styles.resultContainer}>
    <h2 className={styles.city}>
      Slut!{' '}
      <span role="img" aria-label="Klapp">
        👏
      </span>
    </h2>
    <h3 className={styles.result}>
      Ditt resultat:{' '}
      <strong>{Math.round(((questions - errors) / questions) * 100)}%</strong>
      <br />
      <small>
        ({questions - errors} av {questions} rätt)
      </small>
    </h3>

    {errors > 0 && (
      <button className={styles.restart} onClick={onRepeatErrorsClick}>
        Repetera felen?{' '}
        <span role="img" aria-label="Restart">
          🤓
        </span>
      </button>
    )}

    <button className={styles.restart} onClick={onPlayAgainClick}>
      Spela igen?{' '}
      <span role="img" aria-label="Restart">
        💪
      </span>
    </button>
  </div>
);

export default App;
