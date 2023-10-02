function latToTileY_Yandex(lat, zoom) {
  lat = (lat * Math.PI) / 180.0;
  const a = 6378137;
  const k = 0.0818191908426;
  const z1 = Math.tan(Math.PI / 4 + lat / 2) / Math.pow(Math.tan(Math.PI / 4 + Math.asin(k * Math.sin(lat)) / 2), k);
  const pix_Y = Math.round((20037508.342789 - a * Math.log(z1)) * 53.5865938 / Math.pow(2, 23 - zoom));
  return Math.floor(pix_Y / 256);
}

function longToTileX_Yandex(lon, zoom) {
  lon = (lon * Math.PI) / 180.0;
  const a = 6378137;
  const pix_X = Math.round((20037508.342789 + a * lon) * 53.5865938 / Math.pow(2.0, 23 - zoom));
  return Math.floor(pix_X / 256);
}

function geoToTileCoordinates(latitude, longitude, zoom) {
  const tileX = longToTileX_Yandex(longitude, zoom);
  const tileY = latToTileY_Yandex(latitude, zoom);

  return { x: tileX, y: tileY };
}

document.getElementById('calcForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const latitude = parseFloat(document.getElementById('latitude').value);
  const longitude = parseFloat(document.getElementById('longitude').value);
  const zoom = parseInt(document.getElementById('zoom').value);

  if (isNaN(latitude) || isNaN(longitude) || isNaN(zoom) || zoom < 1 || zoom > 23) {
    alert('Пожалуйста, введите правильные широту, долготу и масштаб.');
    return;
  }

  const tileCoordinates = geoToTileCoordinates(latitude, longitude, zoom);

  document.getElementById('tileX').innerText = tileCoordinates.x;
  document.getElementById('tileY').innerText = tileCoordinates.y;

  const previewUrl = `https://core-carparks-renderer-lots.maps.yandex.net/maps-rdr-carparks/tiles?l=carparks&x=${tileCoordinates.x}&y=${tileCoordinates.y}&z=${zoom}&scale=1&lang=ru_RU`;

  document.getElementById('previewImage').src = previewUrl;
});
