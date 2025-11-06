import React from 'react'
import { useParams } from 'react-router-dom'

export default function SharedRoom() {
  const { id } = useParams()
  return (
    <div>
      <h2>共聽室 — {id}</h2>
      <p>（示範）這是 10 分鐘快閃共聽室。可同步播放、互動留言與邀請附近使用者。</p>
      <div className="card">
        <div>正在播放：Blinding Lights — The Weeknd</div>
        <div style={{marginTop:8}}>
          <button className="primary" onClick={()=>alert('加入共聽室（模擬）')}>加入共聽</button>
          <button style={{marginLeft:8}} onClick={()=>alert('邀請附近同好（模擬）')}>邀請附近同好</button>
        </div>
      </div>
    </div>
  )
}
