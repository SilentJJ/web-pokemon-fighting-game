import Area from './Area'

function Location({ locationData, selectedLocation, setSelectedLocation, areaData, setSelectedArea, locationsURL }) {
  
  const handleLocationSelect = (event) => {
    setSelectedLocation(locationsURL + (Number(event.target.value) + 1))
  }

  return (
    <div className='Location'>
      {/* <h2 className='location-title'>Choose a location to fight!</h2> */}
      <select onChange={handleLocationSelect}>
        {locationData.map((location, index) => 
          <option key={index} value={index}>
            {location.replace(/-/g, ' ')}
          </option>
        )}
      </select>
      <Area 
      selectedLocation={selectedLocation}
      areaData={areaData}
      setSelectedArea={setSelectedArea}
      />
    </div>
  );
}

export default Location;