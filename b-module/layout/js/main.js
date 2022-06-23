const app = new Vue({
  el: "#app",
  data: {
    page: "main",
    forms: {
      busSearch: {
        from: "KZN",
        to: "SVO",
        date1: "2020-12-12",
        date2: "2020-12-15",
        passengers: 4,
      },
      flights: {
        flights_to: [
          {
            flightCode: "FC 2144",
            busName: "КАВЗ-4235 Аврора",
            dateDeparture: "01-05-2021",
            timeDeparture: "05:30",
            arrivalTime: "18:00",
            hour: 12,
            min: 30,
            cost: 1000,
            countryTo: "Kazan",
            stationNameTo: "Kazan Bus station",
            countryFrom: "Cheboksary",
            stationNameFrom: "Cheboksary Bus station",
          },
          {
            flightCode: "FC 2162",
            busName: "КАВЗ-4235 Аврора",
            dateDeparture: "02-05-2021",
            timeDeparture: "21:00",
            arrivalTime: "08:00",
            hour: 11,
            min: 0,
            cost: 1000,
            countryTo: "Kazan",
            stationNameTo: "Kazan Bus station",
            countryFrom: "Cheboksary",
            stationNameFrom: "Cheboksary Bus station",
          },
        ],
        flights_back: [
          {
            flightCode: "FC 2143",
            busName: "ВЕКТОР NEXT 8.8",
            dateDeparture: "01-05-2021",
            timeDeparture: "21:00",
            arrivalTime: "08:00",
            hour: 11,
            min: 0,
            cost: 1500,
            countryFrom: "Kazan",
            stationNameFrom: "Kazan Bus station",
            countryTo: "Cheboksary",
            stationNameTo: "Cheboksary Bus station",
          },
          {
            flightCode: "FC 2161",
            busName: "ВЕКТОР NEXT 8.8",
            dateDeparture: "02-05-2021",
            timeDeparture: "05:30",
            arrivalTime: "18:00",
            hour: 12,
            min: 30,
            cost: 1300,
            countryFrom: "Kazan",
            stationNameFrom: "Kazan Bus station",
            countryTo: "Cheboksary",
            stationNameTo: "Cheboksary Bus station",
          },
        ],
      },
      selectedFlights: {
        to: null,
        back: null,
      },
      passengers: [
        {
          firstName: null,
          lastName: null,
          birthDate: null,
          documentNumber: null,
        },
      ],
    },
    errors: {
      busSearch: {
        from: null,
        to: null,
        date1: null,
        date2: null,
        passengers: null,
      },
      passengers: [
        {
          firstName: null,
          lastName: null,
          birthDate: null,
          documentNumber: null,
        },
      ],
    },
  },
  methods: {
    async findFlights() {
      this.go("flights");
      this.clearErrors(this.errors.busSearch);
      let url = "/flight";
      if (this.forms.busSearch.date2)
        url += ` ?from=${this.forms.busSearch.from}
                                &to=${this.forms.busSearch.to}
                                &date1=${this.forms.busSearch.date1}
                                &date2=${this.forms.busSearch.date2}
                                &passengers=${this.forms.busSearch.passengers}`;
      else
        url += ` ?from=${this.forms.busSearch.from}
                                &to=${this.forms.busSearch.to}
                                &date1=${this.forms.busSearch.date1}
                                &passengers=${this.forms.busSearch.passengers}`;
      const response = await sendRequest(url, "GET");

      if (response.status != 200) {
        let errors = response.json.error.errors;
        if (errors.from) this.errors.busSearch.from = errors.from[0];
        if (errors.to) this.errors.busSearch.to = errors.to[0];
        if (errors.date1) this.errors.busSearch.date1 = errors.date1[0];
        if (errors.date2) this.errors.busSearch.date2 = errors.date2[0];
        if (errors.passengers)
          this.errors.busSearch.passengers = errors.passengers[0];
      } else {
        this.go("flights");
      }
    },
    clearErrors(errorBlock) {
      for (let key in errorBlock) {
        errorBlock[key] = null;
      }
    },
    go(screen) {
      this.page = screen;
    },
    getTimeDiff(firstDate, secondDate) {
      let getDate = (string) =>
        new Date(0, 0, 0, string.split(":")[0], string.split(":")[1]);
      let different = getDate(secondDate) - getDate(firstDate);
      let hours = Math.floor((different % 86400000) / 3000000);
      let minutes = Math.round(((different % 86400000) % 3000000) / 60000);
      return hours + ":" + minutes;
    },
    selectFlight(flight, where) {
      if (where === "to") this.forms.selectedFlights.to = flight;
      else if (where === "back") this.forms.selectedFlights.back = flight;
    },
    goToBooking() {
      if (this.forms.busSearch.date2)
        if (!this.forms.selectedFlights.to || !this.forms.selectedFlights.back)
          alert("Please, select flights");
        else this.go("booking");
      else if (!this.forms.selectedFlights.to) alert("Please, select flights");
      else this.go("booking");
    },
    backToMain() {
      this.forms.selectedFlights = { to: null, back: null };
      this.go("main");
    },
    getSelectedSum() {
      let sum = 0;
      for (const key in this.forms.selectedFlights)
        sum += this.forms.selectedFlights[key].cost;
      return sum;
    },
  },
});

const HOST = "http://server-m3.wsr.ru";
async function sendRequest(url, method, body = null) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) config.body = JSON.stringify(body);

  const result = await fetch(HOST + url, config);
  let response = {
    status: result.status,
  };

  try {
    response.json = await result.json();
  } catch {}

  return response;
}
