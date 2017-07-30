class BusLine {
  constructor(name, agency, idText, desc) {
    this.name = name
    this.agency = agency
    this.idText = idText
    this.description = desc
    this.stops = []
    this.stopsPopulated = false
    this.vehiclesPopulated = false
    store.busLines.push(this)

  }


  static find(busNumberString) {
    return store.busLines.find((busLine) => {
      return busLine.name == busNumberString
    })
  }

  getVehicles() {
    let url = LIST_OF_VEHICLES_URL + "&LineRef=" + encodeURIComponent(this.idText)
    return fetch(url)
      .then(BusAdapter.convertToJSON)
      .then((data) => this.populateVehicles(data))
  }

  populateVehicles(data) {
    let vehicleList = data.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity
    this.vehicles = vehicleList
    return vehicleList

    debugger;
  }

  getStops() {
    const LIST_OF_STOPS_URL=`http://bustime.mta.info/api/where/stops-for-route/${this.idText}.json?key=648d4b3b-938f-48e2-9502-addf58435739&includePolylines=false&version=2`
    return fetch(LIST_OF_STOPS_URL).then(BusAdapter.convertToJSON).then((data) => this.populateStops(data)) // Using arrow function and passing in data to preserve this as the BusLine to attach the stops to!

  }

  populateStops(data) {
    let stopsList = data.data.references.stops
    stopsList.forEach((stop) => {
      BusStop.findOrCreate(stop.code, stop.direction, stop.id, stop.lat, stop.lon, stop.name, this)
    })
    this.stopsPopulated = true;
  }

  checkForBunching() {
    if(this.stopsPopulated === false) {
      throw new Error("Stops must be populated first")
    }
    let stopsToCheck = this.stops.filter((stop) => {
      return stop.vehiclesPopulated === true
    })
    if(stopsToCheck.length < 1) {
      this.stops[0].getVehicles()
      stopsToCheck = [this.stops[0]]
    }
    let stopsAwayArray = []
    stopsToCheck.forEach((stop) => {
      let innerAr = []
      stop.vehicles.forEach((bus) => {
        innerAr.push(bus.numberOfStopsAway)
      })
      stopsAwayArray.push(innerAr)
    })
    return stopsAwayArray
  }

}
