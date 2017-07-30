class BusStop {
  constructor (code, direction, idText, lat, lon, name, busLineToAttach) {
    // MTA data also has a RouteIds value but I'm not using it
    this.stopNum = code
    this.direction = direction
    this.idText = idText
    this.lat = lat
    this.long = lon
    this.name = name
    this.vehiclesPopulated = false
    this.googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
    store.busStops.push(this)
    busLineToAttach.stops.push(this)

  }

  getVehicles() {
    let url = VEHICLES_FOR_STOP_URL + '&MonitoringRef='+ this.stopNum
    return fetch(url).then(BusAdapter.convertToJSON)
    .then((data) => this.populateVehicles(data))
  }

  populateVehicles(data) {

    let vehicleData = data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit
    let vehicleList = []
    vehicleData.forEach((bus) => {
      vehicleList.push({
        destination: bus.MonitoredVehicleJourney.DestinationName,
        direction: bus.MonitoredVehicleJourney.DirectionRef,
        arrivalText: bus.MonitoredVehicleJourney.MonitoredCall.ArrivalProximityText,
        distanceFromStop: bus.MonitoredVehicleJourney.MonitoredCall.DistanceFromStop,
        expectedArrivalTime: bus.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime,
        numberOfStopsAway: bus.MonitoredVehicleJourney.MonitoredCall.NumberOfStopsAway
      })
      this.vehiclesPopulated = true
      this.vehicles = vehicleList

    })


  }


  static findOrCreate(code, direction, idText, lat, lon, name, busLineToAttach) {
    let result = store.busStops.find((busStop) => {
      return busStop.idText == idText
    })
    if(result != null) {
      return result
    } else {
      return new BusStop(code, direction, idText, lat, lon, name, busLineToAttach)
    }
  }

  static find(idText) {
    return store.busStops.find((busStop) => {
      return busStop.idText === idText
    })
  }



}
