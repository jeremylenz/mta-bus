
const LIST_OF_BUS_LINES_URL = "http://bustime.mta.info/api/where/routes-for-agency/MTA%20NYCT.json?key=648d4b3b-938f-48e2-9502-addf58435739"
const LIST_OF_MTABC_LINES_URL = "http://bustime.mta.info/api/where/routes-for-agency/MTABC.json?key=648d4b3b-938f-48e2-9502-addf58435739"
const MTALINES_URL = "http://bustime.mta.info/api/where/routes-for-agency/MTA.json?key=648d4b3b-938f-48e2-9502-addf58435739"
const LIST_OF_VEHICLES_URL = "http://bustime.mta.info/api/siri/vehicle-monitoring.json?key=648d4b3b-938f-48e2-9502-addf58435739&version=2&OperatorRef=MTA"
const LIST_OF_AGENCIES_URL = "http://bustime.mta.info/api/where/agencies-with-coverage.json?key=648d4b3b-938f-48e2-9502-addf58435739"
const VEHICLES_FOR_STOP_URL = "http://bustime.mta.info/api/siri/stop-monitoring.json?key=648d4b3b-938f-48e2-9502-addf58435739&version=2&OperatorRef=MTA"

class BusAdapter {


  static convertToJSON(res) {
    return res.json();
  }


  static createBusLines(data) {
    let busLinesObj = data.data.list
    busLinesObj.forEach((busLine) => {
      new BusLine(busLine.shortName, busLine.agencyId, busLine.id, busLine.description)
    })
  }

  static createAgencies(data) {
    let agencyList = data.data
    agencyList.forEach((agencyInfoBlob) => {
      store.agencies.push(agencyInfoBlob.agency.id)
    })
  }

  

}

fetch(LIST_OF_AGENCIES_URL).then(BusAdapter.convertToJSON).then(BusAdapter.createAgencies)
fetch(LIST_OF_BUS_LINES_URL).then(BusAdapter.convertToJSON).then(BusAdapter.createBusLines)
fetch(LIST_OF_MTABC_LINES_URL).then(BusAdapter.convertToJSON).then(BusAdapter.createBusLines)
fetch(MTALINES_URL).then(BusAdapter.convertToJSON).then(BusAdapter.createBusLines)

// $.ajax(LIST_OF_AGENCIES_URL).then(BusAdapter.createAgencies)
