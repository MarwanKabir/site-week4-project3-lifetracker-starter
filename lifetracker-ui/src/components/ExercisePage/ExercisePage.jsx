import axios from "axios"
import { useState } from "react"
export default function Workouts({loggedIn}) {
    const [exerciseData, setExerciseData] = useState({
      name: '',
      category: '',
      duration: '',
      intensity: '',
    });

    const[workouts, setWorkouts] = useState([])
  
    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token")
          const response = await axios.post("http://localhost:3001/auth/exercise", {...exerciseData, token:token})
          console.log("Exercise saved successfully:", response.data)

          const newWorkout = response.data.workout
          setWorkouts(newWorkout)

        } catch (error) {
          console.log("Error saving exercise:", error)
        }
      }
  
    return (
      <div>
        {loggedIn ?
        <>
        <section>
          <h2>Exercise</h2>
          <form>
            <h3>Record Exercise</h3>
            <label>
              Name:
              <input
                type="text"
                value={exerciseData.name}
                onInput={(event) =>
                  setExerciseData({
                    ...exerciseData,
                    name: event.target.value,
                  })
                }
              />
            </label>
            <br />
            <label>
              Category:
              <select
                value={exerciseData.category}
                onInput={(event) =>
                  setExerciseData({
                    ...exerciseData,
                    category: event.target.value,
                  })
                }
              >
                <option value="">Select a category</option>
                <option value="run">Run</option>
                <option value="bike">Bike</option>
                <option value="lift">Lift</option>
                <option value="swim">Swim</option>
                <option value="sports">Sports</option>
              </select>
            </label>
            <br />
            <label>
              Duration (min):
              <input type="text" value={exerciseData.duration} onInput={(event) => setExerciseData({ ...exerciseData, duration: event.target.value})}/>
            </label>
            <br />
            <label>
              Intensity:
              <input type="text" value={exerciseData.intensity} onInput={(event) => setExerciseData({...exerciseData,intensity: event.target.value})}/>
            </label>
            <br />
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        </section>
        <section>
            <h2>My Workouts</h2>
            {workouts.map((workout) => {
                const worktime = new Date(workout.worktime)
                const formattedDateTime = `${worktime.toLocaleDateString()} ${worktime.toLocaleTimeString()}`
                return (
                    <div>
                        <h3>{workout?.name}</h3>
                        <p>{formattedDateTime}</p>
                        <p>Category: {workout?.category}</p>
                        <p>Duration: {workout?.duration}</p>
                        <p>Intensity: {workout?.intensity}</p>
                    </div>
                ) 
            }
            )}
        </section>
        </>
        :
        <h1>LOG IN TO VIEW</h1>}
      </div>
    )
  }
  