function Area({ selectedLocation, areaData, setSelectedArea }) {

  if (areaData[0]?.areas.length > 0) {
    return (
      <div className="areasDiv">
        {areaData[0]?.areas.map((area) => 
          <button className="areaButton" key={area?.url} id={area?.url} onClick={(e) => setSelectedArea(area?.url)}>
            {(area?.name).replace(/-/g, ' ')}
          </button>
        )}
      </div>
    )
  } else if (areaData[0]?.areas.length === 0) {
    return (
      <div>
        <h2>Pacific area</h2>
        <h3>Go somewhere else to fight</h3>
      </div>
    )
  } else {
    return (
      <h2 className='location-title'>Choose a location to fight!</h2>
    );
  }
}

export default Area;