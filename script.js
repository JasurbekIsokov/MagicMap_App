'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const fromElement = document.querySelector('.form');
const formElementV2 = document.querySelector('.form-2');
const myMap = document.querySelector('#map');
const btn_submit = document.querySelector('.form__btn');
const type_option = document.querySelector('.type__tour');
const speed = document.querySelector('.speed');

const typesTourRequires = ['50 smp/min', '70 km/h', '15 km/h'];

speed.value = '50 smp/min';
// Geolacation API

// if (navigator.geolocation){ // prompt orqali surab oladi shuning uchun if kerak.
// navigator.geolocation.getCurrentPosition((position) => {
//     // if succesfully get cordinates
//     const {latitude} = position.coords.latitude;
//     const {longitude} = position.coords.longitude;
//     console.log(`https://www.google.com/maps/@${latitude},${longitude},11z`)
// }, () => {
//     // otherwise
//     console.log('Couldnt get your position')
// })
// }

// Leaflet Library

/**
 * 1. L global object it get from CDN URL which we already setted in HTML head tag
 * 2. map - method gets id which we set i  html dag (Current example in DIV tag)
 * 3. setView - method, gets as a first argument is Array which is contains latitude
 * and longitude elements, and second argument is Zoom
 * 4.
 */

// prompt orqali surab oladi shuning uchun if kerak.
//   navigator.geolocation.getCurrentPosition(function (position){
//     // if succesfully get cordinates
//     let { latitude } = position.coords.latitude;
//     let { longitude } = position.coords.longitude;
//     console.log(latitude, longitude);
//     let coords = [latitude, longitude];

//   });

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     alert('Your browser is not support');
//   }
// }

// function showPosition(position) {
//   let { latitude } = position.coords;
//   let { longitude } = position.coords;
//   console.log(latitude, longitude);

//   const map = L.map('map').setView([latitude, longitude], 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }).addTo(map);

//   L.marker([latitude, longitude])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         autoPan: true,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup',
//       })
//         .setLatLng([latitude, longitude])
//         .setContent('Working')
//         .openOn(map)
//     )
//     .openPopup();

//   SelectPosition(map);
// }

// let form = `
// <form class="form">
//         <div class="form__row">
//           <label class="form__label">Type</label>
//           <select class="form__input form__input--type">
//             <option value="running">Running</option>
//             <option value="cycling">Cycling</option>
//           </select>
//         </div>
//         <div class="form__row">
//           <label class="form__label">Distance</label>
//           <input class="form__input form__input--distance" placeholder="km" />
//         </div>
//         <div class="form__row">
//           <label class="form__label">Duration</label>
//           <input class="form__input form__input--duration" placeholder="min" />
//         </div>
//         <div class="form__row">
//           <label class="form__label">Cadence</label>
//           <input class="form__input form__input--cadence" placeholder="step/min" />
//         </div>
//         <div class="form__row form__row--hidden">
//           <label class="form__label">Elev Gain</label>
//           <input class="form__input form__input--elevation" placeholder="meters" />
//         </div>
//         <button class="form__btn">OK</button>
//       </form>
// `

// function SelectPosition(map) {
//   map.on('click', positionCurrent => {
//     fromElement.classList.remove('hidden');
//     fromElement.addEventListener('submit', e => {
//       e.preventDefault();
//       let { lat: lat } = positionCurrent.latlng;
//       let { lng: long } = positionCurrent.latlng;
//       console.log(lat, long);
//       L.marker([lat, long], { draggable: true, riseOnHover: true })
//         .addTo(map)
//         .bindPopup(
//           L.popup({
//             autoPan: true,
//             autoClose: false,
//             closeOnClick: false,
//             className: 'running-popup',
//           })
//             .setLatLng([lat, long])
//             .setContent('Working')
//             .openOn(map)
//         )
//         .openPopup();
//     });
//   });

//   //   const popup = L.popup().setLatLng(lating)
// }

// getLocation();
let select1 = false;
let select2 = false;
let map = null;
let positionFirst = null;
let currentPos = null;
let lat1 = null;
let lng1 = null;
let lat2 = null;
let lng2 = null;
let created = 0;
class Workout {
  date = new Date();
  id = (new Date().getTime() + '').slice(-7);
  constructor(distance, duration, coords) {
    //...
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
  calcSpeed() {
    this.speed = (this.distance / this.duration).toFixed(1);
  }
  _setExsTitle() {
    /**
     * @param {string} this.type
     */
    this.titleExs = [
      this.type[0].toUpperCase() + this.type.slice(1),
      'on',
      months[this.date.getMonth()],
      this.date.getDate(),
    ].join(' ');
  }
}

class Cyclic extends Workout {
  type = 'running';
  constructor(distance, duration, coords, elevation) {
    super(distance, duration, coords);
    this.elevation = elevation;
    this.calcSpeed();
    this._setExsTitle();
  }
}

class Elevation extends Workout {
  type = 'cycling';
  constructor(distance, duration, coords, cadance) {
    super(distance, duration, coords);
    this.cadance = cadance;
    this.calcSpeed();
    this._setExsTitle();
  }
}

class TourForm {
  constructor(title, distance) {
    //...
    this.title = title;
    this.distance = distance;
    this.selected = 0;
    this.speed = 50;
    this.icoArr = ['🏃‍♂️', '🚗', '🚴‍♀️'];
    type_option.addEventListener('change', this._selectSpeed.bind(this));
    btn_submit.addEventListener('click', this._formInformations.bind(this));
    formElementV2.classList.remove('hidden');
  }
  _formValidation() {
    //...
  }
  _selectSpeed(e) {
    //...
    this.selected = e.target.selectedIndex;
    console.log(this.selected);
    speed.value = typesTourRequires[this.selected];
    this.speed = +speed.value.split(' ')[0];
  }
  _formInformations(e) {
    e.preventDefault();
    let id_user = new Date().getTime();

    let html = `<li class="workout workout--running" data-id="${id_user}">
          <h2 class="workout__title">${this.title}</h2>
          <div class="workout__details">
            <span class="workout__icon">${this.icoArr[this.selected]} </span>
            <span class="workout__value">${this.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${
              this.selected == 0
                ? ((this.distance * 1000) / this.speed / 60).toFixed(1)
                : (this.distance / this.speed).toFixed(1)
            }</span>
            <span class="workout__unit">hour</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${this.speed}</span>
            <span class="workout__unit">${speed.value.split(' ')[1]}</span>
          </div>
        </li>
    `;
    fromElement.insertAdjacentHTML('afterend', html);
    //...
  }
}

class App {
  #mashq = [];
  constructor() {
    this._getLocation();
    inputType.addEventListener('change', this._toggleSelect.bind(this));
    fromElement.addEventListener('submit', this._formCreater.bind(this));
    containerWorkouts.addEventListener('click', this._moveCenter.bind(this));
    document.addEventListener('keydown', this._currentPosition.bind(this));
  }
  _getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._showPosition.bind(this));
    } else {
      alert('Your browser is not support');
    }
  }
  _showPosition(position) {
    let { latitude } = position.coords;
    let { longitude } = position.coords;
    console.log(latitude, longitude);

    map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    this._defaultMarker();
    this._getLocaleStorage();

    this._selectPosition.call(this, map);
  }
  _selectPosition(map) {
    map.on('click', positionCurrent => {
      this._showForm();
      currentPos = positionCurrent;
      console.log('click');
    });
    //   const popup = L.popup().setLatLng(lating)
  }

  _defaultMarker() {
    let position = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(e => this._addMarkerV2(e));
    } else {
      alert('Your browser is not support');
    }
  }
  _addMarkerV2(obj) {
    if (created == 2) return;
    console.log(obj);
    let textContent = ["Jo'nash nuqtasini tanlang", 'Borish nuqtasi tanlang'];
    let lat = obj.coords.latitude;
    let lng = obj.coords.longitude;
    if (created > 1) {
      lat2 = lat;
      lng2 = lng;
    } else {
      lat1 = lat;
      lng1 = lng;
    }

    let selected = 'unselected';

    positionFirst = L.marker([lat, lng], {
      draggable: true,
      riseOnHover: true,
      color: 'red',
    })
      .addTo(map)
      .bindPopup(
        L.popup({
          autoPan: true,
          autoClose: false,
          closeOnClick: false,
          className: `${selected}-popup`,
        })
          .setLatLng([lat, lng])
          .setContent(`${created == 1 ? textContent[1] : textContent[0]}`)
          .openOn(map)
      )
      .openPopup();
  }

  _currentPosition(e) {
    if (!(e.key === 'Enter')) return;
    let textContent = ["Jo'nash nuqtasi", 'Borish nuqtasi'];
    select1 = true;
    if (created == 1) {
      lat1 = positionFirst._latlng.lat;
      lng1 = positionFirst._latlng.lng;
    } else {
      lat2 = positionFirst._latlng.lat;
      lng2 = positionFirst._latlng.lng;
    }
    console.log(lat1, lng1, lat2, lng2);
    map.removeLayer(positionFirst);
    created++;
    let tempLat = created == 1 ? lat2 : lat1;
    let tempLng = created == 1 ? lng2 : lng1;
    // let selected = null;
    // if (created == 1)
    positionFirst = L.marker([tempLat, tempLng], {
      draggable: false,
      riseOnHover: true,
      color: 'red',
    })
      .addTo(map)
      .bindPopup(
        L.popup({
          autoPan: true,
          autoClose: false,
          closeOnClick: false,
          className: 'selected-popup',
        })
          .setLatLng([tempLat, tempLng])
          .setContent(`${created == 1 ? textContent[0] : textContent[1]}`)
          .openOn(map)
      )
      .openPopup();
    if (created < 2) {
      this._defaultMarker();
    }
    if (created == 2) {
      this._createRoute();
    }
    // If [ENTER] Key pressed
  }
  _formCreater(e) {
    e.preventDefault();
    this._createObject();
  }

  _addMarker(task) {
    let lat = task.coords[0];
    let long = task.coords[1];

    var greenIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      color: 'red',
    });

    L.marker(
      [lat, long],
      { icon: greenIcon },
      { draggable: true, riseOnHover: true, color: 'red' }
    )
      .addTo(map)
      .bindPopup(
        L.popup({
          autoPan: true,
          autoClose: false,
          closeOnClick: false,
          className: `${task.type}-popup`,
        })
          .setLatLng([lat, long])
          .setContent(task.titleExs)
          .openOn(map)
      )
      .openPopup();
  }
  _createRoute() {
    let distance = null;
    let name = null;
    let road = L.Routing.control({
      createMarker: function (e) {
        return null;
      },
      waypoints: [L.latLng(lat2, lng2), L.latLng(lat1, lng1)],
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.5, weight: 5 }],
      },
    })
      .on('routesfound', e => {
        distance = e.routes[0].summary.totalDistance;
        name = e.routes[0].name;
        console.log(name);
        new TourForm(name, Math.round(distance / 1000));
      })
      .addTo(map);
    // CREATED TPOUR OBJECT

    console.log(road);

    let btn = document.querySelector('.leaflet-routing-container');

    btn.classList.toggle('leaflet-routing-container-hide');

    btn.addEventListener('click', e => {
      btn.classList.toggle('leaflet-routing-container-hide');
    });
  }
  _createObject() {
    let mashq = '';
    const checkNumber = (...inputs) => {
      return inputs.every(val => Number.isFinite(val));
    };
    const checkPositive = (...inputs) => {
      return inputs.every(val => val > 0);
    };
    let distance = +inputDistance.value;
    let duration = +inputDuration.value;
    let type = inputType.value;

    if (type === 'running') {
      let cadance = +inputCadence.value;
      console.log(type, cadance);
      if (
        !(
          checkNumber(distance, duration, cadance) ||
          checkPositive(distance, duration, cadance)
        )
      ) {
        return alert('Musbat sonlarni kiriting');
      }
      mashq = new Cyclic(
        distance,
        duration,
        [currentPos.latlng.lat, currentPos.latlng.lng],
        cadance
      );
    } else if (type === 'cycling') {
      let elevation = +inputElevation.value;
      console.log(type, elevation);
      if (
        !(
          checkNumber(distance, duration, elevation) &&
          checkPositive(distance, duration, elevation)
        )
      ) {
        return alert('Musbat sonlarni kiriting');
      }

      mashq = new Elevation(
        distance,
        duration,
        [currentPos.latlng.lat, currentPos.latlng.lng],
        elevation
      );
    }
    this._renderList(mashq);

    this._hideForm();

    this._addMarker(mashq);

    this.#mashq.push(mashq);

    this._setLocaleStorage();
  }
  _moveCenter(e) {
    let element = e.target.closest('.workout');

    let obj = this.#mashq.find(
      item => item.id === element?.getAttribute('data-id')
    );
    if (!obj) {
      return;
    }
    let coords = obj?.coords;
    map.setView(coords, 13);
  }
  _hideForm() {
    fromElement.classList.add('hidden');
    inputCadence.value = '';
    inputDistance.value = '';
    inputDuration.value = '';
    inputElevation.value = '';
    fromElement.style.display = 'none';
  }

  _showForm() {
    fromElement.style.display = 'grid';
    fromElement.classList.remove('hidden');
  }

  _toggleSelect() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _renderList(obj) {
    console.log(obj);
    let taskHtml = `
    <li class="workout workout--${obj.type}" data-id="${obj.id}">
          <h2 class="workout__title">${obj.titleExs}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              obj.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            } </span>
            <span class="workout__value">${obj.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${obj.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${obj.speed}</span>
            <span class="workout__unit">${
              obj.type === 'running' ? 'min/km' : 'km/h'
            }</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${
              obj.type === 'running' ? '🦶🏼' : '⛰'
            }</span>
            <span class="workout__value">${
              obj.type === 'running' ? obj.elevation : obj.cadance
            }</span>
            <span class="workout__unit">${
              obj.type === 'running' ? 'spm' : 'm'
            }</span>
          </div>
        </li>
    `;
    fromElement.insertAdjacentHTML('afterend', taskHtml);
  }

  _setLocaleStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.#mashq));
  }
  _getLocaleStorage() {
    let data = JSON.parse(localStorage.getItem('tasks'));
    if (!data) return;
    this.#mashq = data;
    data.forEach(item => {
      this._addMarker(item);
      this._renderList(item);
    });
    console.log(this.#mashq);
  }
  _removeLocaleStorage() {
    localStorage.removeItem('tasks');
    location.reload();
  }
}

let app = new App();
