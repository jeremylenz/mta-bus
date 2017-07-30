

const store = {busLines: [], agencies: [], busStops: []}



function seed (busLine) {
  let m42 = BusLine.find(busLine)
  m42.getStops()
  m42.getVehicles()
}

function seedV(busLine) {
  BusLine.find(busLine).stops[0].getVehicles()
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
