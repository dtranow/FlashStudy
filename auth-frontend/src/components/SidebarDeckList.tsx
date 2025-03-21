import React from 'react'
import { LinearProgress } from '@mui/material'
import { Link } from 'react-router-dom'

interface Deck {
  id: string;
  name: string;
  progress: number;
}

interface props {
  decks: Deck[];
}

const SidebarDeckList: React.FC<props> = ({ decks }) => {
  return (
    <div>
      {decks.length === 0 ? (
        <p>No decks available</p>
      ) : (
        decks.map((deck, index) => (
          <Link to={`/deckpage/${deck.id}`}>
            <div key={deck.id}>
              <p>{deck.name}</p>
              <LinearProgress variant='determinate' value={deck.progress}></LinearProgress>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default SidebarDeckList