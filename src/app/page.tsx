/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, List } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
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

export default function AutoblockerExplainer() {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Token soumis:', token)
	console.log('Username soumis:', username)
	setUsername('')
    setToken('')
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-bold mb-4">Comment fonctionne l'Auto Blocker ?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span>Protection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Inscrivez votre compte Twitter pour activer la protection automatique contre les mentions négatives.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Surveillance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Toutes les 5 minutes, notre bot vérifie les nouvelles mentions de votre compte Twitter.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <List className="h-5 w-5 text-blue-500" />
                  <span>Action</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Les messages négatifs sont répertoriés dans votre tableau de bord pour un blocage facile et rapide.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <motion.div variants={itemVariants}>
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>Inscrivez votre compte Twitter</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username Twitter
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Entrez votre pseudo Twitter"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                  Token Twitter
                </label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Entrez votre token Twitter"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
			  <a href='/dashboard'>
              <Button className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white">
                Activer l'Auto Blocker
              </Button>
			  </a>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              En inscrivant votre compte, vous autorisez l'Auto Blocker à surveiller vos mentions et à les analyser pour détecter les contenus négatifs.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}