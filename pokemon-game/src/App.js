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
  const [locationData, setLocationData] = useState([])
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
    fetchURL(locationsURL)
    .then(data => {
      const locations = data.results.map(location => location.name.toUpperCase())
      setLocationData(locations)
    })
  }, [])

  useEffect(() => {
    if (selectedLocation.length > 0) {
      fetchURL(selectedLocation)
      .then(data => setAreaData([data]))
    }
    }, [selectedLocation])
  
  if (pageNum === 1) {
    return (
      <div className='location-page'>
        <Location 
          locationData={locationData}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          areaData={areaData}
          setSelectedArea={setSelectedArea}
          locationsURL={locationsURL}
        />
      </div>
    )
  } else if (pageNum === 2) {
    return (
      <div className='choose-page'>
        <Choose
          ourPokemons={ourPokemons}
        />
      </div>
    )
  } else {
    return (
      <div className='battle-page'>
        <Battle
          setOurPokemons={setOurPokemons}
        />
      </div>
    )
  }
}

export default App;
