'use client'

import Link from "next/link"
import { Playfair_Display as PlayfairDisplay } from "next/font/google"
import { motion } from "framer-motion"

const playfair = PlayfairDisplay({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 to-teal-900 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 60%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />

      <main className="z-10 text-center px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-6xl font-bold text-white mb-4 ${playfair.className}`}>
            SAUKHYAM
          </h1>
          <p className="text-xl text-white italic mb-2">
            Svastha śarīrasya svastha manaḥ
          </p>
          <p className="text-lg text-white opacity-90">
            A healthy mind resides in a healthy body
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/assessment">
            <motion.button
              className="bg-white text-green-800 px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Wellness Journey
            </motion.button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

