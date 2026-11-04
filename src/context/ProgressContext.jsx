import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ProgressContext = createContext(null);

const STORAGE_KEY = "spaceDetectivesProgress";

// Load previously saved progress
const loadProgress = () => {
  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);

      return {
        score: Number(parsed.score) || 0,
        completedMissions: Array.isArray(parsed.completedMissions)
          ? parsed.completedMissions
          : []
      };
    }
  } catch (error) {
    console.error("Could not load progress:", error);
  }

  return {
    score: 0,
    completedMissions: []
  };
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress);

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Award points only once for each mission
  const completeMission = (missionId, points = 10) => {
    setProgress((previous) => {
      if (previous.completedMissions.includes(missionId)) {
        return previous;
      }

      return {
        score: previous.score + points,
        completedMissions: [
          ...previous.completedMissions,
          missionId
        ]
      };
    });
  };

  const value = {
    score: progress.score,
    completedMissions: progress.completedMissions,
    completeMission
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

// Access progress from any page or component
export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error(
      "useProgress must be used inside ProgressProvider"
    );
  }

  return context;
}