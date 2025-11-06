import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Connect from './pages/Connect'
import Chat from './pages/Chat'
import SharedRoom from './pages/SharedRoom'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/room/:id" element={<SharedRoom />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
