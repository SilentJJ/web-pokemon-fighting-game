function RandomEnemy(fetchURL, setEnemyPokemonData, selectedArea, getPokemonDatas) {
  fetchURL(selectedArea)
    .then(data =>
      data['pokemon_encounters'].map(pokemon => {
        const name = pokemon.pokemon.name;
        const number = pokemon.pokemon.url.match(/\/(\d+)\//)[1];
        return pokemon.pokemon.url.replace(number, name);
      }))
    .then(enemyURLs => {
      const randomIndex = Math.floor(Math.random() * enemyURLs.length)
      return getPokemonDatas(enemyURLs[randomIndex])
    })
    .then(enemy => { console.log(enemy) })
    .then(enemy => setEnemyPokemonData(enemy))
}

export default RandomEnemy;