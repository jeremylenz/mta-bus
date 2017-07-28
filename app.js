const GET_LIST_OF_STOPS_URL = "http://bustime.mta.info/api/where/routes-for-agency/MTA%20NYCT.json?key=648d4b3b-938f-48e2-9502-addf58435739"

let data
const store = {busLines: []}

data = fetch(GET_LIST_OF_STOPS_URL, {
  mode: 'no-cors'
})

.then(convertToJSON)
.then(createBusLines)

function convertToJSON(res) {
  return res.json();
}

class BusLine {
  constructor(name, agency, idText, desc) {
    this.name = name
    this.agency = agency
    this.idText = idText
    this.description = desc
    store.busLines.push(this)

  }
}

function createBusLines(data) {
  let stopsObj = data.data.list
  stopsObj.forEach((busLine) => {
    new BusLine(busLine.shortName, busLine.agencyId, busLine.id, busLine.description)
  })
  debugger;
}
//
// function then(callback) {
//   // do somework
//   // set a var called data
//   var data
//   return Promise.resolve(callback(data))
// }


function getStopData() {
  let closestVehicle = data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney
  let distanceInfo = closestVehicle.MonitoredCall
  let presentableDistance = closestVehicle.MonitoredCall.Extensions.Distances.PresentableDistance
  let metersAway = closestVehicle.MonitoredCall.Extensions.Distances.DistanceFromCall
  let stopsAway = closestVehicle.MonitoredCall.Extensions.Distances.StopsFromCall
  let stopName = closestVehicle.MonitoredCall.StopPointName
  let progressRate = closestVehicle.ProgressRate
  let progressStatus = closestVehicle.ProgressStatus
}
