import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Connect — 頻率共振 · 音樂交友</h1>
        <p>當附近有人正在聽和你同一首歌，你會收到提示。線上設定興趣，線下遇見同頻的人。</p>
        <div style={{marginTop:16}}>
          <Link className="primary" to="/connect">開始探索</Link>
          <Link style={{marginLeft:8}} className="outline" to="/profile">建立個人檔案</Link>
        </div>
      </section>

      <section>
        <h2>特色演示</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>發現共鳴</h3>
            <p>當你在 500 公尺內與他人聽同一首歌，雙方會收到提示。</p>
          </div>
          <div className="feature">
            <h3>興趣配對</h3>
            <p>以音樂與興趣標籤作為社交名片，自然生成話題。</p>
          </div>
          <div className="feature">
            <h3>共聽室</h3>
            <p>建立快閃共聽室，一鍵邀請附近同好進入同步播放與交流。</p>
          </div>
        </div>
      </section>
    </div>
  )
}
