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
            flight_id: 2,
            flight_code: "FP 1200",
            bus: "КАВЗ-4235 Аврора",
            from: {
              city: "Cheboksary",
              station: "Cheboksary Bus station",
              iata: "CSY",
              date: "2021-05-01",
              time: "05:30",
            },
            to: {
              city: "Kazan",
              station: "Kazan Bus station ",
              iata: "KZN",
              date: "2021-05-01",
              time: "18:00",
            },
            cost: 3000,
            availability: 156,
          },
          {
            flight_id: 14,
            flight_code: "FP 1201",
            bus: "КАВЗ-4235 Аврора",
            from: {
              city: "Cheboksary",
              station: "Cheboksary Bus station",
              iata: "CSY",
              date: "2021-05-01",
              time: "21:00",
            },
            to: {
              city: "Kazan",
              station: "Kazan Bus station ",
              iata: "KZN",
              date: "2021-05-02",
              time: "08:00",
            },
            cost: 3000,
            availability: 156,
          },
        ],
        flights_back: [
          {
            flight_id: 1,
            flight_code: "FP 2100",
            bus: "ВЕКТОР NEXT 8.8",
            from: {
              city: "Kazan",
              station: "Kazan Bus station",
              iata: "KZN",
              date: "2021-05-01",
              time: "21:00",
            },
            to: {
              city: "Cheboksary",
              station: "Cheboksary Bus station",
              iata: "KZN",
              date: "2021-05-02",
              time: "08:00",
            },
            cost: 4000,
            availability: 156,
          },
          {
            flight_id: 13,
            flight_code: "FP 2101",
            bus: "ВЕКТОР NEXT 8.8",
            from: {
              city: "Kazan",
              station: "Kazan Bus station",
              iata: "KZN",
              date: "2021-05-02",
              time: "08:00",
            },
            to: {
              city: "Cheboksary",
              station: "Cheboksary Bus station",
              iata: "CSY",
              date: "2021-05-02",
              time: "21:30",
            },
            cost: 4000,
            availability: 156,
          },
        ],
      },
      selectedFlights: {
        to: null,
        back: null,
      },
      passengers: [
        {
          firstName: "Ivan",
          lastName: "Ivanov",
          birthDate: "1990-02-20",
          documentNumber: "1234567890",
        },
        // {
        //   firstName: "Ivan",
        //   lastName: "Gorbunov",
        //   birthDate: "1990-03-20",
        //   documentNumber: "1224567890",
        // },
      ],
      seat: {
        passenger: null,
        seat: null,
        type: "from",
      },
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
      seat: [],
    },
    currentBooking: {},
  },
  methods: {
    findFlights() {
      this.clearErrors(this.errors.busSearch);
      for (const key in this.forms.busSearch)
        this.errors.busSearch[key] = this.checkError(
          key,
          this.forms.busSearch[key]
        );
      for (const key in this.errors.busSearch)
        if (this.errors.busSearch[key]) return;
      this.go("flights");
    },
    clearErrors(errorBlock) {
      for (let key in errorBlock) {
        errorBlock[key] = null;
      }
    },
    go(screen) {
      this.page = screen;
    },
    getTimeDiff(flight) {
      const firstDate = new Date(flight.from.date + "T" + flight.from.time);
      const secondDate = new Date(flight.to.date + "T" + flight.to.time);
      const busTime = new Date(secondDate.getTime() - firstDate.getTime());
      return {
        hours: busTime.getHours() - 3,
        minutes:
          busTime.getMinutes() < 10
            ? "0" + busTime.getMinutes()
            : busTime.getMinutes(),
      };
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
    addNewPassenger() {
      if (this.forms.passengers.length === 6)
        alert("This is max passengers count");
      else {
        this.errors.passengers.push({
          firstName: null,
          lastName: null,
          birthDate: null,
          documentNumber: null,
        });
        this.forms.passengers.push({
          firstName: null,
          lastName: null,
          birthDate: null,
          documentNumber: null,
        });
      }
    },
    removePassenger(index) {
      if (this.forms.passengers.length === 1)
        alert("The last passenger cannot be removed");
      else {
        this.forms.passengers.splice(index, 1);
        this.errors.passengers.splice(index, 1);
      }
    },
    makeBooking() {
      for (const error of this.errors.passengers) this.clearErrors(error);
      this.forms.passengers.forEach((passenger, index) => {
        for (const key in passenger)
          this.errors.passengers[index][key] = this.checkError(
            key,
            passenger[key]
          );
      });
      for (const error of this.errors.passengers)
        for (const key in error) if (error[key]) return;
      this.currentBooking = {
        flights: { ...this.forms.selectedFlights },
        passengers: this.forms.passengers,
      };
      this.go("booking_management");
    },
    checkError(name, value) {
      if (name === "date2") return null;
      if (!value) return `The ${name} field is requiered`;
      switch (name) {
        case "birthDate":
          if (!/\d\d\d\d-\d\d-\d\d/.test(value))
            return `The ${name} does not match the format yyyy-mm-dd`;
          break;
        case "documentNumber":
          if (value.length !== 10) return `The ${name} must be 10 digitals`;
          break;
      }
      return null;
    },
    selectSeat(e) {
      let seats = document.querySelectorAll(".seat");
      seats.forEach((seat) => seat.classList.remove("selected"));
      e.target.classList.add("selected");
      this.forms.seat.seat = e.target.textContent;
    },
    async goToSeats() {
      await this.go("seats");
      this.forms.seat.passenger = null;
      this.forms.seat.seat = null;
      let seats = document.querySelectorAll(".seat");
      seats.forEach((seat) => seat.addEventListener("click", this.selectSeat));
    },
  },
});
