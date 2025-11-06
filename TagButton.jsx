import React from 'react'

export default function TagButton({ tag, active, onClick }) {
  return (
    <button
      className={`tag ${active ? 'tag-active' : ''}`}
      onClick={() => onClick(tag)}
    >
      {tag}
    </button>
  )
}
