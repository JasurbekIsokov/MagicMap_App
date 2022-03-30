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

// class Joy {
//   date = new Date();
//   id = Date.now().slice(-7);

//   constructor(qayergaBoryapmiz, qayerdanBoryapmiz, tezlik) {
//     this.qayergaBoryapmiz = qayergaBoryapmiz;
//     this.qayerdanBoryapmiz = qayerdanBoryapmiz;
//     this.tezlik = tezlik;
//   }
// }

class App {
  constructor() {
    this._getPosition();
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
    isCliked();

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

      console.log(e);

      form.classList.remove(`hidden`);

      inputDistance.focus();
    });
  }

  // forma sabmit bo'lsa markerni chiqarish
}

function isCliked() {
  console.log('navigatorga ruhsat berildi');
}

form.addEventListener(`submit`, function (e) {
  e.preventDefault();

  L.marker([formEvent.latlng.lat, formEvent.latlng.lng], { draggable: true })
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 160,
        minWidth: 40,
        autoClose: false,
        closeOnClick: false,
        className: `running-popup`,
      })
        .setLatLng([formEvent.latlng.lat, formEvent.latlng.lng])
        .setContent('<p>Hello world!</p>')
        .openOn(map)
    )
    .openPopup();

  inputDistance.value =
    inputElevation.value =
    inputDuration.value =
    inputCadence.value =
      '';
});

// mapning ustiga bosilganda formni chiqardik ,
//  locationdagi iconni form submit bo'lganda chiqardik

inputType.addEventListener('change', function () {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
});

// formni piyoda va velosipedda yurishni tanlashni qo'shdik.

const magicMap = new App();
