'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let latt = 0;
let langg = 0;
let formEvent = '';
let map = '';

//  - - - -   - - - - -    - - - -   - - - - -

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-8);

  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
}

//  - - - -   - - - - -    - - - -   - - - - -

class Yugurish extends Workout {
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcTime();
  }

  calcTime() {
    this.tezlikniTop = this.distance / this.duration;
    return this.tezlik;
  }
}

//  - - - -   - - - - -    - - - -   - - - - -

class Velo extends Workout {
  constructor(distance, duration, coords, elevation) {
    super(distance, duration, coords);
    this.elevation = elevation;
    this.calcSpead();
  }

  calcSpead() {
    this.tezlikniTop = this.distance / this.duration;
    return this.tezlik;
  }
}

//  - - - -   - - - - -    - - - -   - - - - -

class App {
  constructor() {
    this._getPosition();
    form.addEventListener(`submit`, this._createObject.bind(this));
    inputType.addEventListener('change', this._toggleSelect);
  }

  // Hozirgi o'rnimizni cordinatalarini olish metodi

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._showMap.bind(this),
      function () {
        alert(`Sizning turgan o'rninggizni ololmadim`);
      }
    );
  }

  // Ornimiz kirdinatalarini mapga berish kerak

  _showMap(e) {
    latt = e.coords.latitude;
    langg = e.coords.longitude;

    map = L.map('map').setView([latt, langg], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this._showForm();
  }

  // formani ochish metodi

  _showForm() {
    map.on(`click`, function (e) {
      formEvent = e;

      form.classList.remove(`hidden`);

      inputDistance.focus();
    });
  }

  // forma sabmit bo'lsa markerni chiqarish

  _addMarker(mashq) {
    L.marker([mashq.coords[0], mashq.coords[1]], { draggable: true })
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 160,
          minWidth: 40,
          autoClose: false,
          closeOnClick: false,
          className: `running-popup`,
        })
          .setLatLng([mashq.coords[0], mashq.coords[1]])
          .setContent('<p>Hello world!</p>')
          .openOn(map)
      )
      .openPopup();

    // this._createObject();

    inputDistance.value =
      inputElevation.value =
      inputDuration.value =
      inputCadence.value =
        '';
  }

  //  Formdagi optionni tanlanganda o'zgartirish kiritish

  _toggleSelect() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }

  // Forma malumotlarini Objectga berish

  _createObject(e) {
    e.preventDefault();

    let mashq = '';

    const checkNumber = (...inputs) => {
      return inputs.every(val => Number.isFinite(val));
    };

    const checkNumberPositive = (...inputs) => {
      return inputs.every(val => val > 0);
    };

    let distance = +inputDistance.value;
    let duration = +inputDuration.value;
    let type = inputType.value;

    if (type === 'running') {
      let cadence = inputCadence.value;
      if (
        !checkNumber(distance, duration, cadence) &&
        !checkNumberPositive(distance, duration, cadence)
      ) {
        return alert(`Musbat sonlarni kiriting`);
      }

      mashq = new Yugurish(
        distance,
        duration,
        [formEvent.latlng.lat, formEvent.latlng.lng],
        cadence
      );

      this._addMarker(mashq);
    }

    if (type === 'cycling') {
      let cycling = inputType.value;
    }
  }
}

// mapning ustiga bosilganda formni chiqardik ,
//  locationdagi iconni form submit bo'lganda chiqardik
// formni piyoda va velosipedda yurishni tanlashni qo'shdik.

const magicMap = new App();
