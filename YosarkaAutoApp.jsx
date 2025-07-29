// YÖSARKA - Automaattinen versio (MVP)
// Automaattisesti tarkistettavat tehtävät: koodit, linkit, ajastettu palaute

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function YosarkaAutoApp() {
  const [teamCode, setTeamCode] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [taskIndex, setTaskIndex] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState('')

  const tasks = [
    {
      title: 'Tehtävä 1: Salakoodi',
      question: 'Löydä salakoodi kiven alta. Syötä se tähän kenttään.',
      type: 'code',
      answer: 'KUU23'
    },
    {
      title: 'Tehtävä 2: Videolinkki',
      question: 'Kuvaa pantomiimivideo ja liitä linkki (esim. YouTube, TikTok, Google Drive)',
      type: 'link'
    },
    {
      title: 'Tehtävä 3: Yön ääni',
      question: 'Kirjoita lyhyesti millainen ääni kuuluu yöllä tällä rastilla.',
      type: 'text'
    }
  ]

  const handleLogin = () => {
    if (teamCode.trim() !== '') setLoggedIn(true)
  }

  const handleSubmit = () => {
    const task = tasks[taskIndex]
    if (task.type === 'code') {
      if (input.trim().toUpperCase() === task.answer.toUpperCase()) {
        setFeedback('✅ Oikein! Tehtävä hyväksytty.')
      } else {
        setFeedback('❌ Väärin. Yritä uudelleen.')
        return
      }
    } else if (task.type === 'link') {
      const isValid = input.startsWith('http')
      setFeedback(isValid ? '✅ Linkki vastaanotettu!' : '❌ Anna toimiva linkki.')
      if (!isValid) return
    } else {
      if (input.trim().length < 5) {
        setFeedback('❌ Kirjoita hieman pidempi vastaus.')
        return
      }
      setFeedback('✅ Vastaus vastaanotettu!')
    }
    setTimeout(() => {
      setInput('')
      setFeedback('')
      if (taskIndex < tasks.length - 1) {
        setTaskIndex(taskIndex + 1)
      }
    }, 2000)
  }

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <Card className="w-full max-w-md bg-gray-900">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-bold">YÖSARKA | Tiimin kirjautuminen</h2>
            <Input
              placeholder="Syötä tiimikoodi"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value)}
            />
            <Button onClick={handleLogin}>Kirjaudu sisään</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const task = tasks[taskIndex]

  return (
    <div className="min-h-screen p-4 bg-black text-white">
      <Card className="max-w-xl mx-auto bg-gray-900">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <p>{task.question}</p>

          <Input
            placeholder="Kirjoita vastauksesi tähän..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={feedback !== ''}
          />
          <Button onClick={handleSubmit} disabled={feedback !== ''}>Lähetä vastaus</Button>
          {feedback && <p className="text-sm pt-2">{feedback}</p>}
        </CardContent>
      </Card>
    </div>
  )
}