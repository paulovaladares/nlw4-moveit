import { createContext, ReactNode, useState } from "react";

interface ChallengesProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

export const ChallengesContexts = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  function levelUp() {
    setLevel(level + 1);
  }
  function startNewChallenge() {
    console.log(`New Challenge`);
  }
  return (
    <ChallengesContexts.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
      }}
    >
      {children};
    </ChallengesContexts.Provider>
  );
}
