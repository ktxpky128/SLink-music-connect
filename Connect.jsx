import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'

// 模擬附近用戶資料（MVP）
const MOCK_USERS = [
  { id: 'u1', name: 'Maya', nowPlaying: 'Blinding Lights', tags:['流行','電子'], distance:120 },
  { id: 'u2', name: 'Chen', nowPlaying: 'Butter', tags:['K-pop','流行'], distance:320 },
  { id: 'u3', name: 'Ivy', nowPlaying: 'Blinding Lights', tags:['流行','爵士'], distance:480 },
  { id: 'u4', name: 'Alex', nowPlaying: 'bad guy', tags:['流行','電子'], distance:80 }
]

export default function Connect() {
  const [nearby, setNearby] = useState(MOCK_USERS)
  const [filter, setFilter] = useState('')

  // 假裝提示機制：如果附近有人 and same song => show a simulated "提示"
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // 偵測「同曲提示」：若至少兩位在500m內聽同歌就觸發一個notification
    const grouped = {}
    nearby.forEach(u=>{
      if (u.distance <= 500) {
        grouped[u.nowPlaying] = grouped[u.nowPlaying] || []
        grouped[u.nowPlaying].push(u)
      }
    })
    const nots = []
    Object.keys(grouped).forEach(song=>{
      if (grouped[song].length >= 2) {
        nots.push({song, users: grouped[song]})
      }
    })
    setNotifications(nots)
  }, [nearby])

  return (
    <div>
      <h2>發現共鳴</h2>
      <p>開啟定位（模擬）後，SLink 會提示附近正在聽同一首歌的人。</p>

      <div className="noti-area">
        {notifications.length === 0 ? <div className="muted">目前未偵測到相同歌曲的共鳴</div> :
          notifications.map((n, idx)=>(
            <div key={idx} className="noti">
              <div className="noti-song">🎵 {n.song}</div>
              <div>在附近的聽眾： {n.users.map(u=>u.name).join('、')}</div>
              <div className="noti-actions">
                <button className="primary" onClick={()=>alert(`向 ${n.users[0].name} 傳送好友邀請（模擬）`)}>傳送好友邀請</button>
              </div>
            </div>
          ))
        }
      </div>

      <div style={{marginTop:12}}>
        <label>依標籤過濾</label>
        <input placeholder="輸入標籤（例如 K-pop）" value={filter} onChange={e=>setFilter(e.target.value)} />
      </div>

      <div className="list">
        {nearby.filter(u => !filter || u.tags.join().includes(filter)).map(u => <UserCard key={u.id} user={u} />)}
      </div>
    </div>
  )
}
