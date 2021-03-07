import { useContext, useEffect, useState } from "react";
import { ChallengesContexts } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContexts);
  const totalTime = 0.1 * 60;
  const [time, setTime] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  let countdownTimeout: NodeJS.Timeout;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(totalTime);
  }

  // o vai executar = function , quando  = array de dependências, variaveis qeu vao mudar valor
  useEffect(() => {
    if (isActive) {
      if (time > 0) {
        countdownTimeout = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else {
        resetCountdown();
        setHasFinished(true);
        startNewChallenge();
      }
    }
  }, [isActive, time]);

  useEffect(() => {
    console.log("hasFinished: ", hasFinished);
  }, [hasFinished]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : isActive ? (
        <button
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetCountdown}
        >
          Abandonar um ciclo
        </button>
      ) : (
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Iniciar um ciclo
        </button>
      )}
    </div>
  );
}