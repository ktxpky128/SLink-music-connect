import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const loc = useLocation()
  return (
    <nav className="nav">
      <div className="nav-brand">SLink</div>
      <div className="nav-links">
        <Link className={loc.pathname === '/' ? 'active' : ''} to="/">首頁</Link>
        <Link className={loc.pathname === '/connect' ? 'active' : ''} to="/connect">Connect</Link>
        <Link className={loc.pathname === '/profile' ? 'active' : ''} to="/profile">個人檔案</Link>
      </div>
    </nav>
  )
}
