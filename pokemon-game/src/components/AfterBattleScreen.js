import winVideo from '../images/squirtle-pikachu.mp4'
import LoseVideo from '../images/twerking-pokemon.mp4'


function AfterBattleScreen({ battlePhase, pokemon, enemy, handleGoingBackToTheLocations }) {

  if ((!battlePhase && pokemon.hp > 1) || (pokemon.hp < 1 && enemy.hp < 1)) {
    return (
      <div className='after-battle-container'>
        <video autoPlay loop>
          <source src={winVideo} type="video/mp4" />
        </video>
        <div className='text-box'>
          <h1 className='win'>You WON!</h1>
          <h2 className='text-after-battle'> The enemy pokemon has been added to your team!</h2>
        </div>
        <button
          className='go-back-to-the-locations'
          onClick={handleGoingBackToTheLocations}>
          Go back to the locations
        </button>
      </div>
    )
  } else if (enemy.hp > 1 && !battlePhase) {
    return (
      <div className='after-battle-container'>
        <video autoPlay loop>
          <source src={LoseVideo} type="video/mp4" />
        </video>
        <div className='text-box'>
          <h1 className='lose'>You Lost!</h1>
          <h2 className='text-after-battle'>Better luck next time!</h2>
        </div>
        <button
          className='go-back-to-the-locations'
          onClick={handleGoingBackToTheLocations}>
          Go back to the locations
        </button>
      </div>
    )
  }
}

export default AfterBattleScreen;