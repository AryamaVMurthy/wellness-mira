"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Playfair_Display as PlayfairDisplay } from "next/font/google"

const playfair = PlayfairDisplay({ subsets: ["latin"] })

export default function Assessment() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    drinkingHabits: "",
    ailments: "",
    exerciseRoutine: "",
    wakeUpTime: "",
    dinnerTime: "",
    jobStress: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const payload = {
      prime_input_1: formData.age,
      prime_input_2: formData.gender,
      prime_input_3: formData.drinkingHabits,
      prime_input_4: formData.ailments,
      prime_input_5: formData.exerciseRoutine,
      prime_input_6: formData.wakeUpTime,
      prime_input_7: formData.dinnerTime,
      prime_input_8: formData.jobStress,
    }

    const backendUrl = 'http://localhost:8000'  // Hardcode for testing
    
    try {
      console.log('Attempting to connect to:', backendUrl)
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Server error ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log('Received response:', data)
      
      sessionStorage.setItem('apiResponse', JSON.stringify(data))
      router.replace("/results")
    } catch (error) {
      console.error("Error details:", error)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setError('Cannot connect to backend server. Please ensure the server is running on http://localhost:8000')
      } else {
        setError(error instanceof Error ? 
          `Connection failed: ${error.message}` : 
          'Failed to connect to server. Please check if the backend is running.'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <p className="text-red-500 text-center">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8"
    >
      <h1 className={`${playfair.className} text-4xl text-center text-green-800 mb-8`}>
        Your Wellness Journey Begins Here
      </h1>
      { isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-green-700 text-2xl">Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <label htmlFor="age" className="block text-green-700 mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-green-700 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="drinkingHabits" className="block text-green-700 mb-2">
              Drinking Habits
            </label>
            <input
              type="text"
              id="drinkingHabits"
              name="drinkingHabits"
              value={formData.drinkingHabits}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ailments" className="block text-green-700 mb-2">
              Current and Past Ailments
            </label>
            <textarea
              id="ailments"
              name="ailments"
              value={formData.ailments}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="exerciseRoutine" className="block text-green-700 mb-2">
              Exercise Routine
            </label>
            <input
              type="text"
              id="exerciseRoutine"
              name="exerciseRoutine"
              value={formData.exerciseRoutine}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="wakeUpTime" className="block text-green-700 mb-2">
              Wake Up Time
            </label>
            <input
              type="time"
              id="wakeUpTime"
              name="wakeUpTime"
              value={formData.wakeUpTime}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dinnerTime" className="block text-green-700 mb-2">
              Dinner Time
            </label>
            <input
              type="time"
              id="dinnerTime"
              name="dinnerTime"
              value={formData.dinnerTime}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobStress" className="block text-green-700 mb-2">
              Job Stress Level
            </label>
            <input
              type="text"
              id="jobStress"
              name="jobStress"
              value={formData.jobStress}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Get Your Personalized Plan
          </button>
        </form>
      )}
    </motion.div>
  )
}

