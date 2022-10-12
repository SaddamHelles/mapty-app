class App {
  #map = '';
  #eventMap = '';

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', () => {
      inputElevation
        .closest('.form__row')
        .classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    });
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function (positionError) {
          console.log(`Position error: ${positionError}`);
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    console.log('this keyword: ', this);
    //   console.log(`https://www.google.com/maps/@${lat},${lon},15z`);
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    console.log('object: ', this);
    this.#eventMap = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {}

  _newWorkout(e) {
    e.preventDefault();

    console.log('this_newWorkout: ', this);
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        '';

    const { lat, lng } = this.#eventMap.latlng;
    const options = {
      riseOnHover: true,
      opacity: 0.8,
    };
    console.log(`lat: ${lat}, lng: ${lng}`);
    L.marker([lat, lng], options)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          keepInView: true,
          closeOnClick: false,
          autoClose: false,
          closeButton: false,
          autoPan: false,
          className: `${inputType.value}-popup`,
          riseOnHover: true,
        })
      )
      .setPopupContent('حبيبتي ليلى')
      .openPopup();
  }
}
export default App;
