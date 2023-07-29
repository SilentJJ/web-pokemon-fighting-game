import './App.css';
import { useState, useEffect } from 'react'
import Location from './components/Location'
import RandomEnemy from './components/RandomEnemy'
import Choose from './components/Choose'
import Battle from './components/Battle';

const locationsURL = 'https://pokeapi.co/api/v2/location/'

const fetchURL = (url) => {
  const data = fetch(url).then(data => data.json())
  return data
}

function App() {

  const [pageNum, setPageNum] = useState(1)
  const [locations, setLocations] = useState('')
  const [ourPokemons, setOurPokemons] = useState([
  'https://pokeapi.co/api/v2/pokemon/pikachu',
  'https://pokeapi.co/api/v2/pokemon/snorlax',
  'https://pokeapi.co/api/v2/pokemon/eternatus'])

  useEffect(() => {
    const fetchAndSetLocatio = () => {
      const data = fetchURL(locationsURL)
      const locations = data.result.map(location => location.name.toUpperCase())
      setLocations(locations)
    }
    fetchAndSetLocatio()
  }, [])
  
  if (pageNum === 1) {
    return (
      <Location 
      locations={locations}
      />
    )
  } else if (pageNum === 2) {
    return (
      <Choose
      ourPokemons={ourPokemons}
      />
    )
  } else {
    return (
      <Battle
      setOurPokemons={setOurPokemons}
      />
    )
  }
}

export default App;
