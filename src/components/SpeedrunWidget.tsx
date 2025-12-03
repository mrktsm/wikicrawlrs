import { useState, useEffect } from "react";
import "./SpeedrunWidget.css";

interface Segment {
  name: string;
  timeDiff: string;
  cumulativeTime: string;
  isCurrent: boolean;
  isAhead: boolean | null; // true = ahead (green), false = behind (red), null = neutral
}

const SpeedrunWidget = () => {
  const [currentTime, setCurrentTime] = useState("1:00.00");

  // Sample data matching the image
  const segments: Segment[] = [
    {
      name: "Bye Bye Midgar",
      timeDiff: "+1:29",
      cumulativeTime: "1:32:01",
      isCurrent: false,
      isAhead: true,
    },
    {
      name: "Chocobo Acquired",
      timeDiff: "+2:06",
      cumulativeTime: "1:35:17",
      isCurrent: false,
      isAhead: false,
    },
    {
      name: "Bye Bye Kalm!",
      timeDiff: "+1:57",
      cumulativeTime: "1:37:34",
      isCurrent: false,
      isAhead: true,
    },
    {
      name: "Apple Bottomswell",
      timeDiff: "+2:58",
      cumulativeTime: "1:41:39",
      isCurrent: false,
      isAhead: false,
    },
    {
      name: "Force Stealer",
      timeDiff: "+3:15",
      cumulativeTime: "1:55:50",
      isCurrent: false,
      isAhead: false,
    },
    {
      name: "Jenova Birth",
      timeDiff: "+1:44",
      cumulativeTime: "1:58:55",
      isCurrent: true,
      isAhead: true,
    },
    {
      name: "Laser",
      timeDiff: "",
      cumulativeTime: "2:21:23",
      isCurrent: false,
      isAhead: null,
    },
    {
      name: "End",
      timeDiff: "",
      cumulativeTime: "6:40:50",
      isCurrent: false,
      isAhead: null,
    },
  ];

  useEffect(() => {
    // Simulate timer running (optional - can be removed if you want static time)
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        // Handle both formats: "M:SS.CC" and "H:MM:SS.CC"
        let parts = prev.split(":");
        let hours = 0;
        let minutes, seconds;

        if (parts.length === 2) {
          // Format: "M:SS.CC"
          minutes = parseInt(parts[0]);
          const [secs, centis] = parts[1].split(".");
          seconds = parseInt(secs);
          let totalCentis = minutes * 6000 + seconds * 100 + parseInt(centis);
          totalCentis += 1;
          hours = Math.floor(totalCentis / 360000);
          minutes = Math.floor((totalCentis % 360000) / 6000);
          seconds = Math.floor((totalCentis % 6000) / 100);
          const c = totalCentis % 100;

          if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}.${c.toString().padStart(2, "0")}`;
          } else {
            return `${minutes}:${seconds.toString().padStart(2, "0")}.${c
              .toString()
              .padStart(2, "0")}`;
          }
        } else {
          // Format: "H:MM:SS.CC"
          hours = parseInt(parts[0]);
          minutes = parseInt(parts[1]);
          const [secs, centis] = parts[2].split(".");
          seconds = parseInt(secs);
          let totalCentis =
            hours * 360000 + minutes * 6000 + seconds * 100 + parseInt(centis);
          totalCentis += 1;
          hours = Math.floor(totalCentis / 360000);
          minutes = Math.floor((totalCentis % 360000) / 6000);
          seconds = Math.floor((totalCentis % 6000) / 100);
          const c = totalCentis % 100;

          if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}.${c.toString().padStart(2, "0")}`;
          } else {
            return `${minutes}:${seconds.toString().padStart(2, "0")}.${c
              .toString()
              .padStart(2, "0")}`;
          }
        }
      });
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="speedrun-widget">
      <div className="speedrun-header">
        <div className="game-title">
          <div>Final Fantasy VII</div>
          <div className="category">
            PSX Digital Any% No Slots{" "}
            <span className="category-number">57</span>
          </div>
        </div>
      </div>

      <div className="segments-list">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`segment ${segment.isCurrent ? "current-segment" : ""}`}
          >
            <div className="segment-name">{segment.name}</div>
            <div className="segment-times">
              {segment.timeDiff && (
                <span
                  className={`time-diff ${
                    segment.isAhead === true
                      ? "ahead"
                      : segment.isAhead === false
                      ? "behind"
                      : ""
                  }`}
                >
                  {segment.timeDiff}
                </span>
              )}
              <span className="cumulative-time">{segment.cumulativeTime}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="current-time-display">
        {currentTime.slice(0, -2)}
        <span className="timer-centiseconds">{currentTime.slice(-2)}</span>
      </div>

      <div className="speedrun-stats">
        <div className="stat">
          <span className="stat-label">Previous Segment:</span>
          <span className="stat-value behind">+17.5</span>
        </div>
        <div className="stat">
          <span className="stat-label">Best Possible Time:</span>
          <span className="stat-value">6:44:06.5</span>
        </div>
        <div className="stat">
          <span className="stat-label">Sum of Best Segments:</span>
          <span className="stat-value">6:40:39.3</span>
        </div>
      </div>
    </div>
  );
};

export default SpeedrunWidget;
