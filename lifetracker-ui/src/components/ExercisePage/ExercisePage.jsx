import axios from "axios"
import { useState } from "react"
export default function Workouts({loggedIn}) {
    const [exerciseData, setExerciseData] = useState({
      name: '',
      category: '',
      duration: '',
      intensity: '',
    });
  
    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token")
          const response = await axios.post("http://localhost:3001/auth/exercise", {...exerciseData, token:token})
          console.log("Exercise saved successfully:", response.data)
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
        </>
        :
        <h1>LOG IN TO VIEW</h1>}
      </div>
    )
  }
  