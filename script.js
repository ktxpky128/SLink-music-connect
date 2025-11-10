// SPA switching, rooms, chat, profile, settings, simulate detection & chime
document.addEventListener('DOMContentLoaded', ()=>{

  // elements
  const views = {
    home: document.getElementById('view-home'),
    rooms: document.getElementById('view-rooms'),
    room: document.getElementById('view-room'),
    profile: document.getElementById('view-profile'),
    settings: document.getElementById('view-settings')
  }
  const navBtns = document.querySelectorAll('.nav-btn')
  navBtns.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      navBtns.forEach(b=>b.classList.remove('active'))
      btn.classList.add('active')
      const t = btn.dataset.target
      switchView(t)
    })
  })

  function switchView(target){
    Object.values(views).forEach(v=>v.classList.remove('active'))
    if (target==='home') views.home.classList.add('active')
    if (target==='rooms') {
      renderRooms()
      views.rooms.classList.add('active')
    }
    if (target==='profile') {
      loadProfile()
      views.profile.classList.add('active')
    }
    if (target==='settings') views.settings.classList.add('active')
  }

  // default
  switchView('home')

  // --------------- detection (simulated) ---------------
  const detectBtn = document.getElementById('detectBtn')
  const stopBtn = document.getElementById('stopBtn')
  const locToggle = document.getElementById('locToggle')
  const rangeSelect = document.getElementById('rangeSelect')
  const detectLog = document.getElementById('detectLog')
  const chimeToggle = document.getElementById('chimeToggle')

  let detectTimer = null
  detectBtn.addEventListener('click', ()=> {
    if (!locToggle.checked){
      alert('請先開啟定位開關再開始偵測')
      return
    }
    detectBtn.style.display='none'; stopBtn.style.display='inline-block'
    log('開始偵測中… 距離: ' + rangeSelect.value)
    // 模擬：每 5–12 秒隨機觸發一次「共鳴」
    detectTimer = setInterval(()=>{
      // 機率依距離不同 (near 高, far 低)
      const p = rangeSelect.value==='near' ? 0.45 : (rangeSelect.value==='mid'?0.25:0.12)
      if (Math.random() < p) {
        // 觸發提示音與提示卡
        handleResonance()
      } else {
        log('暫無共鳴，繼續偵測...')
      }
    }, 6000 + Math.floor(Math.random()*6000))
  })

  stopBtn.addEventListener('click', ()=> {
    if (detectTimer) clearInterval(detectTimer)
    detectTimer = null
    detectBtn.style.display='inline-block'; stopBtn.style.display='none'
    log('已停止偵測')
  })

  function log(t){
    const p = document.createElement('div'); p.textContent = `[${new Date().toLocaleTimeString()}] ${t}`
    detectLog.prepend(p)
  }

  function playChime(){
    const audio = new Audio('chime.mp3')
    audio.play().catch(()=> {
      // fallback: browser blocked autoplay or file missing
      console.log('chime fail — fallback')
      alert('提示音（模擬）: 附近有人與你同曲／同風格')
    })
  }

  function handleResonance(){
    log('偵測到附近有人與你產生共鳴！')
    if (chimeToggle && chimeToggle.checked) playChime()
    // 還顯示小彈窗提醒，按下可進入該房間
    const r = confirm('SLink：附近有人和你是同曲／同風格，是否前往共聽室查看？')
    if (r) {
      // 切到 rooms view，並自動進入一個隨機相關房間（簡單模擬）
      switchView('rooms')
      // after render, auto open one room (simulate)
      setTimeout(()=> {
        // 將會進入 kpop 或 pure 等
        const pool = ['kpop','pure','asmr','metal','band']
        const pick = pool[Math.floor(Math.random()*pool.length)]
        openRoom(pick)
      }, 300)
    }
  }

  // --------------- rooms & chat ---------------
  const roomsDef = [
    {id:'kpop', name:'K-POP 星光區', ico:'🎤'},
    {id:'pure', name:'純音樂空間', ico:'🎼'},
    {id:'asmr', name:'ASMR 治癒角', ico:'🧸'},
    {id:'metal', name:'一起嗨！重金屬區', ico:'🤘'},
    {id:'band', name:'Band Live 現場', ico:'🎸'}
  ]
  const roomsGrid = document.getElementById('roomsGrid')
  function renderRooms(){
    roomsGrid.innerHTML=''
    roomsDef.forEach(r=>{
      const card = document.createElement('div'); card.className='room-card'
      card.innerHTML = `<div style="display:flex;gap:10px;align-items:center">
        <div class="room-icon">${r.ico}</div>
        <div class="room-info"><div style="font-weight:800">${r.name}</div><div class="muted">多人聊 / 公開</div></div>
      </div>
      <div><button class="btn" data-room="${r.id}">進入</button></div>`
      roomsGrid.appendChild(card)
      card.querySelector('button').addEventListener('click', ()=>openRoom(r.id))
    })
  }

  // open a room (SPA)
  const roomTitle = document.getElementById('roomTitle')
  const chatWindow = document.getElementById('chatWindow')
  const chatInput = document.getElementById('chatInput')
  const chatSend = document.getElementById('chatSend')
  const roomBack = document.getElementById('roomBack')
  let currentRoom = null

  function openRoom(roomId){
    currentRoom = roomId
    const info = roomsDef.find(r=>r.id===roomId)
    roomTitle.textContent = info ? info.name : '房間'
    chatWindow.innerHTML = ''
    // load history
    const hist = JSON.parse(localStorage.getItem('slink_room_'+roomId) || '[]')
    hist.forEach(m => {
      appendMsgToWindow(m.text, m.type)
    })
    switchView('room')
  }

  function appendMsgToWindow(txt, type='other'){
    const div = document.createElement('div'); div.className='message'
    if (type==='user') div.classList.add('user')
    div.textContent = txt
    chatWindow.appendChild(div)
    chatWindow.scrollTop = chatWindow.scrollHeight
  }

  function persistRoomMsg(roomId, text, type){
    const key = 'slink_room_'+roomId
    const hist = JSON.parse(localStorage.getItem(key) || '[]')
    hist.push({text, type, ts:Date.now()})
    localStorage.setItem(key, JSON.stringify(hist))
  }

  chatSend.addEventListener('click', ()=> {
    const txt = chatInput.value.trim(); if(!txt) return
    appendMsgToWindow('你：' + txt, 'user')
    persistRoomMsg(currentRoom, '你：' + txt, 'user')
    chatInput.value=''
    // simulate reply
    setTimeout(()=> {
      const reply = '他人：我也喜歡這首！' // simple canned reply
      appendMsgToWindow(reply, 'other'); persistRoomMsg(currentRoom, reply, 'other')
    }, 900)
  })
  chatInput.addEventListener('keydown', (e)=> { if (e.key==='Enter') chatSend.click() })
  roomBack.addEventListener('click', ()=> switchView('rooms'))

  // --------------- profile (avatar + tags) ---------------
  const avatarInput = document.getElementById('avatarInput')
  const avatarPreview = document.getElementById('avatarPreview')
  const nicknameInput = document.getElementById('nickname')
  const tagsInput = document.getElementById('tags')
  const saveProfileBtn = document.getElementById('saveProfile')
  const resetProfileBtn = document.getElementById('resetProfile')
  const tagPreview = document.getElementById('tagPreview')

  avatarInput.addEventListener('change', (e)=> {
    const f = e.target.files[0]; if(!f) return
    const r = new FileReader(); r.onload = ()=> avatarPreview.src = r.result; r.readAsDataURL(f)
  })

  function loadProfile(){
    const data = JSON.parse(localStorage.getItem('slink_profile') || '{}')
    if (data.avatar) avatarPreview.src = data.avatar
    nicknameInput.value = data.nickname || ''
    tagsInput.value = (data.tags||[]).join(', ')
    renderTags(data.tags || [])
  }
  function renderTags(tags){
    tagPreview.innerHTML = ''
    (tags||[]).forEach(t=>{
      const d = document.createElement('div'); d.className='tag'; d.textContent='#'+t
      tagPreview.appendChild(d)
    })
  }
  saveProfileBtn.addEventListener('click', ()=> {
    const obj = {avatar: avatarPreview.src, nickname: nicknameInput.value.trim(), tags: tagsInput.value.split(',').map(s=>s.trim()).filter(Boolean)}
    localStorage.setItem('slink_profile', JSON.stringify(obj))
    renderTags(obj.tags)
    alert('已儲存個人資料（僅保存在此裝置）')
  })
  resetProfileBtn.addEventListener('click', ()=>{ localStorage.removeItem('slink_profile'); loadProfile(); alert('已重設') })

  // --------------- settings ---------------
  const chimeToggleEl = document.getElementById('chimeToggle')
  function loadSettings(){
    const s = JSON.parse(localStorage.getItem('slink_settings') || '{}')
    chimeToggleEl.checked = s.chime !== false
    document.getElementById('locToggle').checked = s.locEnabled !== false
    document.getElementById('rangeSelect').value = s.range || 'mid'
  }
  function saveSettings(){
    const s = { chime: chimeToggleEl.checked, locEnabled: document.getElementById('locToggle').checked, range: document.getElementById('rangeSelect').value }
    localStorage.setItem('slink_settings', JSON.stringify(s))
    alert('設定已儲存')
  }
  // on save action
  document.getElementById('rangeSelect').addEventListener('change', ()=> saveSettings())
  document.getElementById('locToggle').addEventListener('change', ()=> saveSettings())
  chimeToggleEl.addEventListener('change', ()=> saveSettings())

  // init
  loadProfile(); loadSettings()
})
