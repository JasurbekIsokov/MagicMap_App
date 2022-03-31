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
let longitude = 0; // geolocationdagi longitudini oladi
let map = ''; // mapga latitude va longitudeni berish
let latitude1 = 0; // geolocationdagi 1-manzil latitudeni olish
let longitude1 = 0; // geolocationdagi 1-manzil latitudeni olish
let latitude2 = 0; // geolocationdagi 2-manzil latitudeni  olish
let longitude2 = 0; // geolocationdagi 2-manzil longitudeni olish
let firstPosition = null;
let secondPosition = null;
let created = 0;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Umumiy bosh classni yaratish

class Workout {
  // date = new Date();
  // id = (Date.now() + '').slice(-8);

  constructor(distance, duration, coords) {
    // this.distance = distance;
    // this.duration = duration;
    // this.coords = coords;
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
    this._getPosition.call(this);
    document.addEventListener('keydown', e => this._position(e));
  }

  // Hozirgi o'rnimizni cordinatalarini oluvchi function

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      e => this._showMap(e),
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
    firstPosition = L.marker([latitude, longitude], { draggable: true })
      .on('move', e => {
        created == 1 ? (latitude2 = e.latlng.lat) : (latitude1 = e.latlng.lat);
        created == 1
          ? (longitude2 = e.latlng.lng)
          : (longitude1 = e.latlng.lng);
        console.log(created);
      })
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 160,
          minWidth: 40,
          autoClose: false,
          closeOnClick: false,
          className: `${created == 0 ? 'cycling' : 'running'}-popup`,
        })
          .setLatLng([latitude, longitude])
          .setContent('Select')
          .openOn(map)
      )
      .openPopup();

    created++;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  _position(e) {
    if (e.key != 'Enter' || created > 2) return;
    else if (created === 1) {
      firstPosition.dragging.disable();
      this._addMarker();
      // latitude1 = firstPosition._latlng.lat;
      // longitude1 = firstPosition._latlng.lng;

      console.log(latitude1, longitude1);
    } else {
      firstPosition.dragging.disable();
      // latitude2 = firstPosition._latlng.lat;
      // longitude2 = firstPosition._latlng.lng;
      this._createRoute();
      console.log(latitude2, longitude2);
    }
  }

  // Route(yo'l)ni chizish

  _createRoute() {
    let road = L.Routing.control({
      routWhitleDragging: false,
      createMarker: function () {
        return null;
      },
      waypoints: [
        L.latLng(latitude1, longitude1),
        L.latLng(latitude2, longitude2),
      ],
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.5, weight: 5 }],
      },
    })
      .on('routesfound', e => e)
      .addTo(map);
    console.log(road);

    let btn = document.querySelector('.leaflet-routing-container');
    btn.addEventListener('click', e => {
      console.log('click-btn');
      btn.classList.toggle('leaflet-routing-container-hide');
    });
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}

// ------------------------------------------------------------------------------------------------------

// mapni chaqirib ishlatish

const magicMap = new App();
