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
  const [locationData, setLocationData] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [areaData, setAreaData] = useState([])
  const [selectedArea, setSelectedArea] = useState('')
  const [ourPokemons, setOurPokemons] = useState([
  'https://pokeapi.co/api/v2/pokemon/magikarp',
  'https://pokeapi.co/api/v2/pokemon/snorlax',
  'https://pokeapi.co/api/v2/pokemon/eternatus'])
  const [selectedPokemon, setSelectedPokemon] = useState('')
  const [enemyPokemonData, setEnemyPokemonData] = useState('')

  useEffect(() => {
    const fetchAndSetLocations = () => {
      const data = fetchURL(locationsURL)
      const locations = data.result.map(location => location.name.toUpperCase())
      setLocationData(locations)
    }
    fetchAndSetLocations()
  }, [])
  
  if (pageNum === 1) {
    return (
      <Location 
      locationData={locationData}
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
