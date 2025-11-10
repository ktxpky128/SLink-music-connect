import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Chat() {
  const { id } = useParams()
  const [messages, setMessages] = useState([
    { from: 'them', text: '嗨！剛剛偵測到你也在聽 The Weeknd！' },
    { from: 'me', text: '對啊！超喜歡這首歌的 😊' }
  ])
  const [text, setText] = useState('')

  function send() {
    if (!text.trim()) return
    setMessages(prev => [...prev, {from:'me', text}])
    setText('')
  }

  return (
    <div>
      <h2>聊天 — {id}</h2>
      <div className="chat-box">
        {messages.map((m,i) => (
          <div key={i} className={'chat-msg '+ (m.from==='me' ? 'chat-me' : 'chat-them')}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="輸入訊息..." />
        <button onClick={send}>送出</button>
      </div>
    </div>
  )
}
