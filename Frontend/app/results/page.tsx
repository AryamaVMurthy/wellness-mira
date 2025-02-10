"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Playfair_Display as PlayfairDisplay } from "next/font/google"
import { Calendar } from "@/components/ui/calendar"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import rehypeRaw from "rehype-raw"

const playfair = PlayfairDisplay({ subsets: ["latin"] })

export default function Results() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [plan, setPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const responseData = sessionStorage.getItem("apiResponse")
    if (responseData) {
      try {
        const parsedData = JSON.parse(responseData)
        setPlan(parsedData.response || parsedData)
      } catch (err) {
        setError("Failed to parse response data")
        console.error("Parse error:", err)
      }
    } else {
      setError("No response data found")
    }
  }, [])

  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>
  }

  if (!plan) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-2xl">Loading your personalized plan...</p>
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
      <div className="max-w-4xl mx-auto">
        <h1 className={`${playfair.className} text-4xl text-center text-green-800 mb-8`}>
          Your Personalized Wellness Plan
        </h1>

        <div className="mb-8">
          <div className="prose prose-green max-w-none p-6 bg-white rounded-lg shadow-sm">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Add better styling for markdown elements
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold my-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold my-2" {...props} />,
                p: ({node, ...props}) => <p className="my-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
              }}
            >
              {/*
                Transform the plan string:
                - Replace literal "\n" with actual newlines.
                - Replace headings (lines starting with "#" characters) with bold text.
                - Remove starting and ending curly braces if present.
              */}
              {(() => {
                const transformed = typeof plan === "string" 
                  ? plan.replace(/\\n/g, "\n").replace(/^(#{1,6})\s+(.*)$/gm, '**$2**')
                  : JSON.stringify(plan, null, 2).replace(/\\n/g, "\n").replace(/^(#{1,6})\s+(.*)$/gm, '**$2**');
                return transformed.replace(/^\{/, "").replace(/\}$/, "");
              })()}
            </ReactMarkdown>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className={`${playfair.className} text-2xl text-green-700 mb-4`}>Plan Calendar</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </div>
    </motion.div>
  )
}

