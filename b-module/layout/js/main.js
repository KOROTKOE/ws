const app = new Vue({
  el: "#app",
  data: {
    page: "main",
    forms: {
      busSearch: {
        from: "KZN",
        to: "CSY",
        date1: "2020-12-12",
        date2: "2020-12-15",
        passengers: 1,
      },
      flights: {
        flights_to: null,
        flights_back: null,
      },
      selectedFlights: {
        to: null,
        back: null,
      },
      passengers: [
        {
          first_name: null,
          last_name: null,
          birth_date: null,
          document_number: null,
        },
      ],
      seat: {
        passenger: null,
        seat: null,
        type: "from",
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
          first_name: null,
          last_name: null,
          birth_date: null,
          document_number: null,
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
      dateFrom: null,
    },
    currentBooking: {},
    user: {
      first_name: null,
      last_name: null,
      phone: null,
      document_number: null,
      flight_count: 10,
    },
    userFlights: {
      favorite: [],
      past: [],
    },
    upcomingBookings: [],
    token: null,
    redirectFromUser: true,
  },
  methods: {
    async findFlights() {
      this.clearErrors(this.errors.busSearch);
      let url = '/flight';
      const search = this.forms.busSearch;
      if(search.date2)
        url += `?from=${search.from}
                &to=${search.to}
                &date1=${search.date1}
                &date2=${search.date2}
                &passengers=${search.passengers}`
      else
        url += `?from=${search.from}
                &to=${search.to}
                &date1=${search.date1}
                &passengers=${search.passengers}`
      const response = await sendRequest(url,'GET');
      if(response.status != 200){
        let errors = response.json.error.errors;
        const searchError = this.errors.busSearch;
        if(errors.from)
          searchError.from = errors.from;
        if(errors.to)
          searchError.to = errors.to;
          if(errors.date1)
          searchError.date1 = errors.date1;
        if(errors.date2)
          searchError.date2 = errors.date2;
        if(errors.passengers)
          searchError.passengers = errors.passengers;
      }
      else {
        this.forms.flights = response.json.data;
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
        else {
          this.initializePassenger();
          this.go("booking");
        }
      else {
        if (!this.forms.selectedFlights.to) alert("Please, select flights");
        else {
          this.initializePassenger();
          this.go("booking");
        }
      }
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
      if (this.forms.passengers.length === this.forms.busSearch.passengers)
        alert("This is max passengers count");
      else {
        this.errors.passengers.push({
          first_name: null,
          last_name: null,
          birth_date: null,
          document_number: null,
        });
        this.forms.passengers.push({
          first_name: null,
          last_name: null,
          birth_date: null,
          document_number: null,
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
    async makeBooking() {
      for (const error of this.errors.passengers) this.clearErrors(error);
      const body = {
        flight_from:{
          id:this.forms.selectedFlights.to.flight_id,
          date:this.forms.selectedFlights.to.from.date
        },
        passengers:this.forms.passengers
      }
      if(this.forms.selectedFlights.back)
        body.flight_back = {
          id:this.forms.selectedFlights.back.flight_id,
          date:this.forms.selectedFlights.back.from.date
        }
      const response = await sendRequest('/booking','POST',body);
      if(response.status !== 201){
        if(response.json.error.errors){
          for(const errorKey in response.json.error.errors){
            const errorInfo = errorKey.split('.');
            if(errorInfo[0] === 'passengers'){
              this.errors.passengers[errorInfo[1]][errorInfo[2]] = response.json.error.errors[errorKey][0];
            }
          }
        }
      }
      else{
        const bookingResponse = await sendRequest(`/booking/${response.json.data.code}`,'GET');
        this.currentBooking = bookingResponse.json.data;
        this.go("booking_management");
      }
    },
    async goToSeats() {
      await this.go("seats");
      let seats = document.querySelectorAll(".seat");
      seats.forEach((seat) => seat.addEventListener("click", this.selectSeat));
    },
    selectSeat(e) {
      if (!this.forms.seat.passenger) return;
      setSelectedSeat(e.target);
      this.forms.seat.seat = e.target.classList[1].split("-")[2].toUpperCase();
    },
    selectPassenger(id) {
      if (id !== this.forms.seat.passenger)
      this.forms.seat.passenger = id;
    },
    returnToManagementFromSeats() {
      let seats = document.querySelectorAll(".seat");
      seats.forEach((seat) =>
        seat.removeEventListener("click", this.selectSeat)
      );
        this.go("main");
    },
    checkSeats(){
      if(!this.currentBooking.passengers.every(passenger=>passenger.place_back||passenger.place_from))
        this.errors.seat.push("Вы не выбрали все места");
      else
        this.returnToManagementFromSeats();
    },
    async changeSeat() {
      this.errors.seat = [];
      const response = await sendRequest(`/booking/${this.currentBooking.code}/seat`,'PATCH',this.forms.seat);
      if(response.status !== 200){
        if(response.json.error.errors)
          for(let errKey in response.json.error.errors)
            this.errors.seat.push(...response.json.error.errors[errKey]);
        else if(response.json.error.message)
          this.errors.seat.push(response.json.error.message);
      }
      else{
        setSelectedSeat();
        this.currentBooking.passengers.find(passenger=>passenger.id=this.forms.seat.passenger)[`place_${this.forms.seat.type}`]=this.forms.seat.seat;
        this.forms.seat = {
          passenger:null,
          seat:null,
          type:"from"
        }
        console.log(this.currentBooking.passengers)
      }
    },
    async register() {
      this.clearErrors(this.errors.registration);
      const response = await sendRequest('/register','POST',this.forms.registration);
      if(response.status !== 204){
        const errors = response.json.error.errors;
        for(let error in errors)
          this.errors.registration[error] = errors[error][0];
      }
      else
      this.go("login");
    },
    async login() {
      this.clearErrors(this.errors.login);
      const response = await sendRequest('/login','POST',this.forms.login);
      if(response.status !== 200){
        const errors = response.json.error.errors;
        if(errors.phone)
          this.errors.login.phone = errors.phone[0];
        if(errors.password)
          this.errors.login.password = errors.password[0];
      }
      else{
        this.token = response.json.data.token;
        const responseUser = await sendRequest('/user','GET',null,this.token);
        if(responseUser.status === 200){
          this.user=responseUser.json;
        }
        const responseBooking = await sendRequest('/user/booking','GET',null,this.token);
        if(responseBooking.status === 200)
        {
          this.clearUserHistory();
          const bookings = responseBooking.json.data.items;
          const now = new Date();
          for(let i = 0; i < bookings.length;i++){
            if(now > new Date(`${bookings[i].flights[0].from.date} ${bookings[i].flights[0].from.time}`))
              this.userFlights.past.push(...bookings[i].flights);
              else 
              this.upcomingBookings.push(bookings[i]);
          }
        }
        this.go("profile");
      }
    },
    clearUserHistory() {
      for (const key in this.userFlights) this.userFlights[key] = [];
      this.upcomingBookings = [];
    },
    goPersonalArea() {
      if (this.token) this.go("profile");
      else this.go("login");
    },
    bookNow(index) {
      this.initializePassenger();
      this.redirectFromUser = true;
      this.forms.selectedFlights.to = this.userFlights.favorite[index].from;
      this.forms.selectedFlights.back = this.userFlights.favorite[index].back;
      this.forms.selectedFlights.to.from.date = null;
      this.forms.selectedFlights.back.from.date = null;
      this.go("booking_again");
    },
    initializePassenger() {
      if (this.token) {
        this.forms.passengers[0].first_name = this.user.first_name;
        this.forms.passengers[0].last_name = this.user.last_name;
        this.forms.passengers[0].document_number = this.user.document_number;
      } else {
        this.forms.passengers = [
          {
            first_name: null,
            last_name: null,
            birth_date: null,
            document_number: null,
          },
        ];
      }
      console.log(this.forms.passengers,this.token)
    },
    addInFavorite(index) {
      if (
        !this.userFlights.favorite.find(
          (flight) =>
            flight.from.flight_id ===
            this.userFlights.past[index].from.flight_id
        )
      )
        this.userFlights.favorite.push(this.userFlights.past[index]);
      else alert("This flight is already in favority");
    },
    removeInFavorite(index) {
      this.userFlights.favorite.splice(index, 1);
    },
    logout() {
      this.token = false;
      this.go("main");
    },
  },
});

function setSelectedSeat(seat) {
  let seats = document.querySelectorAll(".seat");
  seats.forEach((seat) => seat.classList.remove("seat-selected"));
  if(!seat) return;
  if (typeof seat === "string")
    document
      .querySelector(`.test-100-${seat.toLowerCase()}`)
      .classList.add("seat-selected");
  else seat.classList.add("seat-selected");
}

const HOST = 'http://server/api';
async function sendRequest(url,method,body = null,token = null){
  const config = {
    method,
    headers:{
      'Content-Type':'application/json'
    }
  };
   if(body)
    config.body = JSON.stringify(body);
    if(token)
      config.headers['Authorization'] = `Bearer ${token}`;
  const result = await fetch(HOST+url,config);
  let response = {
    status:result.status
  };
  try{
    response.json = await result.json();
  } catch{}

  return response;
}