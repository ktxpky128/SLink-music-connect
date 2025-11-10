import React, { useState, useEffect } from 'react'
import TagButton from '../components/TagButton'

const TAGS = ['搖滾','流行','電子','爵士','古典','K-pop','動漫','運動','美食']

export default function Profile() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [tags, setTags] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('slink_profile') || '{}')
    if (saved.name) setName(saved.name)
    if (saved.bio) setBio(saved.bio)
    if (saved.tags) setTags(saved.tags)
  }, [])

  function toggle(tag) {
    setTags(prev => prev.includes(tag) ? prev.filter(t=>t!==tag) : [...prev, tag])
  }

  function save() {
    localStorage.setItem('slink_profile', JSON.stringify({name,bio,tags}))
    alert('已儲存個人檔案')
  }

  return (
    <div>
      <h2>建立個人檔案</h2>
      <div className="card profile-card">
        <label>暱稱</label>
        <input value={name} onChange={e=>setName(e.target.value)} />
        <label>自我介紹</label>
        <textarea value={bio} onChange={e=>setBio(e.target.value)} />
        <label>興趣標籤（點選）</label>
        <div className="tags">
          {TAGS.map(t => <TagButton key={t} tag={t} active={tags.includes(t)} onClick={toggle} />)}
        </div>
        <div style={{marginTop:12}}>
          <button className="primary" onClick={save}>儲存</button>
        </div>
      </div>
    </div>
  )
}
