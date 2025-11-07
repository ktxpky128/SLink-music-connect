// ---------- 共用工具 ----------
function $id(id){return document.getElementById(id)}
function playChime(){
  // 若有 chime.mp3，就播放，否則 alert 模擬
  const audio = new Audio('chime.mp3')
  audio.play().catch(()=>{ alert('提示音（模擬） — 附近有人跟你在同一頻率') })
}

// ---------- rooms 入口 ----------
function enterRoom(roomId){
  // 進入 room.html 並以 query 傳 roomId
  location.href = `room.html?room=${encodeURIComponent(roomId)}`
}

// ---------- 當 document ready ----------
document.addEventListener('DOMContentLoaded', () => {
  // 若在 room.html，初始化聊天室
  if (document.body.classList.contains('chatroom-page') || location.pathname.endsWith('room.html')) {
    initRoom()
  }

  // profile 頁面初始化
  if (location.pathname.endsWith('profile.html')) initProfile()

  // settings 初始化
  if (location.pathname.endsWith('settings.html')) initSettings()

  // rooms.html 無需額外
  // 全站：綁定任何可用的模擬提示按鈕
  document.querySelectorAll('button').forEach(btn=>{
    if (btn.dataset.chime==='true'){
      btn.addEventListener('click',playChime)
    }
  })
})

/* ---------- 房間聊天室 ---------- */
function getQueryParam(name){
  const url = new URL(location.href)
  return url.searchParams.get(name)
}

function initRoom(){
  const roomKey = getQueryParam('room') || 'kpop'
  const titles = {
    'kpop':'K-POP 星光區',
    'pure':'純音樂空間',
    'asmr':'ASMR 治癒角',
    'metal':'一起嗨！重金屬區',
    'band':'Band Live 現場'
  }
  const roomTitle = titles[roomKey] || '共聽房間'
  const titleEl = $id('roomTitle')
  if (titleEl) titleEl.textContent = roomTitle

  const chatWindow = $id('chatWindow')
  const sendBtn = $id('sendBtn')
  const input = $id('userMessage')

  // 載入歷史訊息（簡單模擬 localStorage）
  const storageKey = 'slink_room_' + roomKey
  const history = JSON.parse(localStorage.getItem(storageKey) || '[]')
  history.forEach(m=>{
    appendMessage(m.text, m.type)
  })

  // 送出
  if (sendBtn){
    sendBtn.addEventListener('click', () => {
      const txt = input.value.trim()
      if (!txt) return
      appendMessage(txt,'user')
      // 儲存
      history.push({text:txt,type:'user',ts:Date.now()})
      localStorage.setItem(storageKey, JSON.stringify(history))
      input.value=''
      // 模擬對方回覆（1秒後）
      setTimeout(()=> {
        const reply = `🎧 他人：我也在聽這首，喜歡 ${txt}！`
        appendMessage(reply,'other')
        history.push({text:reply,type:'other',ts:Date.now()})
        localStorage.setItem(storageKey, JSON.stringify(history))
      },1000)
    })
    // allow Enter
    input.addEventListener('keydown', (e)=>{
      if (e.key==='Enter') sendBtn.click()
    })
  }

  function appendMessage(text,type='other'){
    const wnd = $id('chatWindow')
    if (!wnd) return
    const div = document.createElement('div')
    div.className = 'message ' + (type==='user' ? 'user' : (type==='system' ? 'system' : ''))
    div.textContent = text
    wnd.appendChild(div)
    wnd.scrollTop = wnd.scrollHeight
  }
}

/* ---------- profile ---------- */
function initProfile(){
  // load from localStorage
  const data = JSON.parse(localStorage.getItem('slink_profile') || '{}')
  if (data.avatar) $id('avatarPreview').src = data.avatar
  if (data.nickname) $id('nickname').value = data.nickname
  if (data.bio) $id('bio').value = data.bio
  if (data.tags) $id('tags').value = data.tags.join(', ')
  renderTags(data.tags || [])
  // avatar input preview
  const ai = $id('avatarInput')
  if (ai){
    ai.addEventListener('change', (e)=>{
      const f = e.target.files[0]
      if (!f) return
      const reader = new FileReader()
      reader.onload = () => {
        $id('avatarPreview').src = reader.result
      }
      reader.readAsDataURL(f)
    })
  }
}

function saveProfile(){
  const nick = $id('nickname').value.trim()
  const bio = $id('bio').value.trim()
  const tagsRaw = $id('tags').value.trim()
  const tags = tagsRaw ? tagsRaw.split(',').map(s=>s.trim()).filter(Boolean) : []
  // avatar currently from preview src
  const avatar = $id('avatarPreview').src
  const obj = {nickname:nick,bio:bio,tags:tags,avatar:avatar}
  localStorage.setItem('slink_profile', JSON.stringify(obj))
  renderTags(tags)
  alert('已儲存個人檔案（僅儲存在此裝置）')
}

function resetProfile(){
  if (confirm('確定要重設個人檔案？')) {
    localStorage.removeItem('slink_profile')
    location.reload()
  }
}

function renderTags(tags){
  const container = $id('previewTags')
  if (!container) return
  container.innerHTML = ''
  tags.forEach(t=>{
    const s = document.createElement('div'); s.className='tag'; s.textContent = '#'+t
    container.appendChild(s)
  })
}

/* ---------- settings ---------- */
function initSettings(){
  const data = JSON.parse(localStorage.getItem('slink_settings') || '{}')
  $id('locToggle').checked = data.locEnabled !== false
  $id('rangeSelect').value = data.range || 'mid'
  $id('chimeToggle').checked = data.chime !== false
}

function saveSettings(){
  const obj = {
    locEnabled: $id('locToggle').checked,
    range: $id('rangeSelect').value,
    chime: $id('chimeToggle').checked
  }
  localStorage.setItem('slink_settings', JSON.stringify(obj))
  alert('已儲存設定')
}
