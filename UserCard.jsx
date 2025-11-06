import React from 'react'
import { Link } from 'react-router-dom'

export default function UserCard({ user }) {
  return (
    <div className="card">
      <div className="avatar">{user.name[0]}</div>
      <div className="card-body">
        <div className="card-title">{user.name}</div>
        <div className="card-sub">正在聽：{user.nowPlaying}</div>
        <div className="card-tags">{user.tags.map(t => <span key={t} className="pill">{t}</span>)}</div>
      </div>
      <div className="card-actions">
        <Link to={`/chat/${user.id}`} className="btn">聊天</Link>
      </div>
    </div>
  )
}
