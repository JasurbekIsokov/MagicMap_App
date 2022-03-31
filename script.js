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

// Yangi variablelar

let latitude = 0; // geolocationdagi latitudeni oladi
let longitude = 0; // geolocationni longitudini oladi
let map = ''; // mapga latitude va longitudeni berish

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Umumiy bosh classni yaratish

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-8);

  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  _setTavsif() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Appni yaratuvchi class

class App {
  constructor() {
    this._getPosition();
  }

  // Hozirgi o'rnimizni cordinatalarini oluvchi function

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._showMap.bind(this),
      function () {
        alert(`Sizning turgan o'rninggizni ololmadim`);
      }
    );
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Ornimiz kirdinatalarini mapga berish kerak

  _showMap(e) {
    latitude = e.coords.latitude;
    longitude = e.coords.longitude;

    console.log(latitude, longitude);

    map = L.map('map').setView([latitude, longitude], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this._addMarker();
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Markerni mapda chiqarish

  _addMarker() {
    L.marker([latitude, longitude], { draggable: true })
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 160,
          minWidth: 40,
          autoClose: false,
          closeOnClick: false,
          className: `cycling-popup`,
        })
          .setLatLng([latitude, longitude])
          .setContent('Select')
          .openOn(map)
      )
      .openPopup();
  }
}

// ------------------------------------------------------------------------------------------------------

// mapni chaqirib ishlatish

const magicMap = new App();
