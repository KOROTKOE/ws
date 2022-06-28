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
        type: "back",
      },
      registration: {
        first_name: "Ivan",
        last_name: "Ivanov",
        phone: "89001234567",
        password: "paSSword",
        document_number: "7567999222",
        double_password: "paSSword",
      },
      login: {
        phone: "89001234567",
        password: "paSSword",
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
      registration: {
        first_name: null,
        last_name: null,
        phone: null,
        password: null,
        document_number: null,
        double_password: null,
      },
      login: {
        phone: null,
        password: null,
      },
    },
    currentBooking: {},
    user: {
      first_name: "Ivan",
      last_name: "Ivanov",
      phone: "89001234567",
      document_number: "1224567890",
    },
    userFlights: {
      favorite: [],
      past: [
        {
          flight_id: 1,
          flight_code: "FP2100",
          from: {
            city: "Cheboksary",
            station: "Cheboksary Bus station",
            iata: "CHB",
            date: "2020-05-01",
            time: "05:30",
          },
          to: {
            city: "Kazan",
            station: "Kazan Bus station",
            iata: "KZN",
            date: "2020-05-01",
            time: "18:00",
          },
          cost: 3000,
          availability: 58,
        },
        {
          flight_id: 2,
          flight_code: "FP1200",
          from: {
            city: "Kazan",
            station: "Kazan Bus station",
            iata: "KZN",
            date: "2020-05-01",
            time: "21:00",
          },
          to: {
            city: "Cheboksary",
            station: "Cheboksary Bus station",
            iata: "CSY",
            date: "2020-05-02",
            time: "08:00",
          },
          cost: 4000,
          availability: 58,
        },
      ],
    },
    upcomingBookings: [],
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
      if (!this.forms.seat.passenger) return;
      setSelectedSeat(e.target);
      this.forms.seat.seat = e.target.classList[1].split("-")[2];
    },
    async goToSeats() {
      await this.go("seats");
      let seats = document.querySelectorAll(".seat");
      seats.forEach((seat) => seat.addEventListener("click", this.selectSeat));
    },
    selectPassenger(documentNumber) {
      if (documentNumber === this.forms.seat.passenger) return;
      let selectedPassangerSeat;
      this.currentBooking.passengers = this.currentBooking.passengers.map(
        (passenger) => {
          if (passenger.documentNumber === documentNumber)
            selectedPassangerSeat = passenger.placeBack;
          if (passenger.documentNumber === this.forms.seat.passenger)
            passenger.placeBack = this.forms.seat.seat;
          return passenger;
        }
      );
      this.forms.seat.passenger = documentNumber;
      this.forms.seat.seat = selectedPassangerSeat;
      setSelectedSeat(selectedPassangerSeat);
    },
    returnToManagementFromSeats() {
      this.currentBooking.passengers = this.currentBooking.passengers.map(
        (passenger) => {
          if (passenger.documentNumber === this.forms.seat.passenger)
            passenger.placeBack = this.forms.seat.seat;
          return passenger;
        }
      );
      let seats = document.querySelectorAll(".seat");
      seats.forEach((seat) =>
        seat.removeEventListener("click", this.selectSeat)
      );
      this.go("booking_management");
    },
    changeSeat() {
      this.errors.seat = [];
      this.returnToManagementFromSeats();
    },
    register() {
      const data = this.forms.registration;
      const errors = this.errors.registration;
      this.clearErrors(errors);
      for (const key in data) errors[key] = this.checkError(key, data[key]);
      for (const key in errors) if (errors[key]) return;
      this.go("login");
    },
    login() {
      const data = this.forms.login;
      const errors = this.errors.login;
      this.clearErrors(errors);
      for (const key in data) errors[key] = this.checkError(key, data[key]);
      for (const key in errors) if (errors[key]) return;
      this.go("profile");
    },
    clearUserHistory() {
      for (const key in this.userFlights) this.userFlights[key] = [];
      this.upcomingBookings = [];
    },
    goPersonalArea() {
      if (this.user) this.go("profile");
      else this.go("login");
    },
  },
});

function setSelectedSeat(seat) {
  let seats = document.querySelectorAll(".seat");
  seats.forEach((seat) => seat.classList.remove("seat-selected"));
  if (typeof seat === "string")
    document
      .querySelector(`.test-100-${seat.toLowerCase()}`)
      .classList.add("seat-selected");
  else seat.classList.add("seat-selected");
}
