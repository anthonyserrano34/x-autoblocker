/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Shield, RefreshCw } from "lucide-react"
import { useAuth } from '../contexts/AuthContext'
import LoginForm from '../components/LoginForm'

const initialTweets = [
  { id: 1, user: { name: 'John Doe', handle: '@johndoe', avatar: '/placeholder.svg?height=40&width=40' }, content: 'Ceci est un contenu de tweet nuisible...', timestamp: 'Il y a 2h' },
  { id: 2, user: { name: 'Jane Smith', handle: '@janesmith', avatar: '/placeholder.svg?height=40&width=40' }, content: 'Un autre tweet nuisible ici...', timestamp: 'Il y a 5h' },
  { id: 3, user: { name: 'Bob Johnson', handle: '@bobjohnson', avatar: '/placeholder.svg?height=40&width=40' }, content: 'Encore une autre mention nuisible...', timestamp: 'Il y a 1j' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function HarmfulTweets() {
  const [tweets, setTweets] = useState(initialTweets)
  const { isAuthenticated, username, logout } = useAuth()
  const [countdown, setCountdown] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer)
            window.location.reload()
            return 0
          }
          return prevCountdown - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isAuthenticated])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleBlock = (id: number) => {
    // console.log('Blocage de l'utilisateur qui a posté le tweet avec l'id:', id)
    setTweets(tweets.filter(tweet => tweet.id !== id))
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex flex-col space-y-4 mb-6" variants={itemVariants}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Mentions Nuisibles</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Connecté en tant que {username}</span>
            <Button onClick={logout} variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
              Déconnexion
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-yellow-500">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>{tweets.length} tweets nuisibles détectés</span>
          </div>
          <div className="flex items-center text-blue-500">
            <RefreshCw className="h-5 w-5 mr-2" />
            <span>Prochaine mise à jour dans {formatTime(countdown)}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {tweets.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {tweets.map((tweet) => (
              <motion.div key={tweet.id} variants={itemVariants} exit={{ opacity: 0, y: -20 }}>
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={tweet.user.avatar} alt={tweet.user.name} />
                          <AvatarFallback>{tweet.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{tweet.user.name}</h3>
                            <span className="text-sm text-gray-500">{tweet.user.handle}</span>
                            <span className="text-sm text-gray-500">·</span>
                            <span className="text-sm text-gray-500">{tweet.timestamp}</span>
                          </div>
                          <p className="mt-1 text-gray-700">{tweet.content}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleBlock(tweet.id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Bloquer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun tweet nuisible</h3>
            <p className="mt-1 text-sm text-gray-500">Excellent ! Il n'y a actuellement aucun tweet nuisible vous mentionnant.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}