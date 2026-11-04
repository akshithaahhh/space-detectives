import { useProgress } from "../context/ProgressContext";
import "./ProgressDashboard.css";

function ProgressDashboard() {
  const { score, completedMissions } = useProgress();

  const badges = [
    {
      name: "Moon Explorer",
      emoji: "🌙",
      unlocked: completedMissions.includes("apollo11") ||
        completedMissions.includes("lunar-rover")
    },
    {
      name: "Mars Explorer",
      emoji: "🔴",
      unlocked: completedMissions.includes("sojourner") ||
        completedMissions.includes("opportunity")
    },
    {
      name: "Space Detective",
      emoji: "🔍",
      unlocked: completedMissions.length >= 2
    },
    {
      name: "Master Detective",
      emoji: "🏆",
      unlocked: completedMissions.length >= 4
    }
  ];

  const level = Math.floor(score / 40) + 1;
  const nextLevel = level * 40;
  const progressPercent = (score % 40) / 40 * 100;

  return (
    <section className="progress-dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="dashboard-label">YOUR JOURNEY</p>
          <h2>🕵️ Junior Space Detective</h2>
          <p>Keep exploring. Keep discovering!</p>
        </div>

        <div className="level-box">
          <span>LEVEL</span>
          <strong>{level}</strong>
        </div>
      </div>

      <div className="score-card">
        <div>
          <span className="score-label">TOTAL POINTS</span>
          <h1>{score} XP ⭐</h1>
          <p>{completedMissions.length} missions completed</p>
        </div>

        <div className="score-icon">🚀</div>
      </div>

      <div className="level-progress">
        <div className="progress-text">
          <span>Next Level Progress</span>
          <span>{score % 40}/40 XP</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="badges-section">
        <h3>🏅 Your Detective Badges</h3>

        <div className="badges-grid">
          {badges.map((badge) => (
            <div
              className={`badge-card ${badge.unlocked ? "unlocked" : "locked"}`}
              key={badge.name}
            >
              <span className="badge-emoji">
                {badge.unlocked ? badge.emoji : "🔒"}
              </span>

              <strong>{badge.name}</strong>

              <small>
                {badge.unlocked ? "Unlocked!" : "Keep exploring"}
              </small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgressDashboard;