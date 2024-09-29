import React, { useState } from "react";

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({
    exercise: "",
    reps: "",
    sets: "",
    weight: "",
  });
  const [oneRepMax, setOneRepMax] = useState(null);
  const [loggedWorkouts, setLoggedWorkouts] = useState([]);

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workout.exercise && workout.reps && workout.sets && workout.weight) {
      setLoggedWorkouts([...loggedWorkouts, workout]); // Add new workout to the list
      setWorkout({ exercise: "", reps: "", sets: "", weight: "" }); // Reset form fields
    }
  };

  const calculateOneRepMax = () => {
    const { weight, reps } = workout;
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps, 10);

    if (!isNaN(weightNum) && !isNaN(repsNum) && repsNum > 0) {
      const max = weightNum * (1 + repsNum / 30);
      setOneRepMax(max.toFixed(2)); // Set the one-rep max with two decimal places
    } else {
      setOneRepMax(null); // Reset if input is invalid
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="exercise"
          value={workout.exercise}
          placeholder="Exercise"
          onChange={handleChange}
        />
        <input
          name="reps"
          value={workout.reps}
          placeholder="Reps"
          onChange={handleChange}
        />
        <input
          name="sets"
          value={workout.sets}
          placeholder="Sets"
          onChange={handleChange}
        />
        <input
          name="weight"
          value={workout.weight}
          placeholder="Weight (lbs or kg)"
          onChange={handleChange}
        />
        <button type="submit">Log workout</button>
        <button type="button" onClick={calculateOneRepMax}>
          Calculate 1RM
        </button>
      </form>

      {oneRepMax !== null && (
        <div className="ranking">
          <h2>Ranking</h2>
          <p>One Rep Max: {oneRepMax} lbs or kg</p>
        </div>
      )}

      <div>
        <h2>Logged Workouts</h2>
        {loggedWorkouts.length > 0 ? (
          <ul>
            {loggedWorkouts.map((w, index) => (
              <li key={index}>
                {w.exercise}: {w.reps} reps, {w.sets} sets, {w.weight} lbs or kg
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts logged yet.</p>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Workout Logger</h1>
      <WorkoutForm />
    </div>
  );
}
