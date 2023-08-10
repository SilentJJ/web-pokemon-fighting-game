import './Battle.css'
import './winOrLose.css'
import { useState, useEffect } from 'react';
import PokemonFightingCards from './PokemonFightingCards';
import AfterBattleScreen from './AfterBattleScreen';

function Battle({ selectedPokemon, enemyPokemonData, ourPokemons, handleGoingBackToTheLocations, handleBattleEnding }) {

  const [ourTurn, setOurTurn] = useState(true)
  const [pokemon, setPokemon] = useState(Object.assign({}, selectedPokemon))
  const [enemy, setEnemy] = useState(Object.assign({}, enemyPokemonData))
  const [battlePhase, setBattlePhase] = useState(true)

  useEffect(() => {
    const simulateBattle = () => {

      const randomNum = Math.random() * (255 - 217) + 217;

      const dmgCalculation = (defender, attacker) => {
        defender.hp = defender.hp - Math.round(((((2 / 5 + 2) * attacker.attack * 60) / defender.defense / 50) + 2) * (randomNum / 255))
        return defender
      }

      if (ourTurn) {
        setEnemy(() => dmgCalculation(enemy, pokemon))
      } else {
        setPokemon(() => dmgCalculation(pokemon, enemy))
      }
      setOurTurn(!ourTurn)

      if (pokemon.hp > 1 && enemy.hp < 1) {
        setBattlePhase(false)
        handleBattleEnding(pokemon, enemy)
      } else if (pokemon.hp < 1 && enemy.hp > 1) {
        setBattlePhase(false)
        handleBattleEnding(pokemon, enemy)
      } else if (pokemon.hp < 1 && enemy.hp < 1) {
        pokemon.hp = 1;
        setBattlePhase(false)
        handleBattleEnding(pokemon, enemy)
      }
    }
    if (battlePhase) {
      setTimeout(() => { simulateBattle() }, 1000)
    }
  }, [ourTurn, battlePhase, selectedPokemon, handleBattleEnding, enemyPokemonData, ourPokemons, enemy, pokemon])


  if (pokemon.hp > 1 && enemy.hp > 1) {
    return (
      <div className="battle-container">
          <PokemonFightingCards
            pokemon={pokemon}
            ourTurn={!ourTurn}
            isItOurPokemon={true}
          />
          <PokemonFightingCards
            pokemon={enemy}
            ourTurn={ourTurn}
            isItOurPokemon={false}
          />
      </div>
    );
  } else {
    return <AfterBattleScreen
      battlePhase={battlePhase}
      pokemon={pokemon}
      enemy={enemy}
      handleGoingBackToTheLocations={handleGoingBackToTheLocations}
    />
  }
}

export default Battle;