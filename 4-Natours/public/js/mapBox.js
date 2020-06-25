/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken = 'pk.eyJ1IjoidHVhbmRldmRsIiwiYSI6ImNrYnNyZG1lejAybDYzM3BpeHZ6aWZiODYifQ.h0ICPZjyoYVZ7fkuMlSjrw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/tuandevdl/ckbsru72w07at1il5yu2c6j09',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // create maker

  const el = document.createElement('div');
  el.className = 'marker';
  // Add marker

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);
  // add popup

  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>${loc.day}: ${loc.description} </p>`)
    .addTo(map);
  // extend map bounds to include current locations
  bounds.extend(loc.coordinates);
});
map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    right: 100,
    left: 100,
  },
});
