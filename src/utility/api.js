import config from './config.json';

const service = new window.google.maps.places.PlacesService(document.createElement('div'));
const GOOGLE_STATUSES = ['ZERO_RESULTS', 'OVER_QUERY_LIMIT'];
export const searchPlacesByText = (searchText, cb, lat = '', lng = '') => {
    let request = {
        type: [config.google.placeType],
        query: searchText
    };

    if(lat && lng) {
        request.location = new window.google.maps.LatLng(lat, lng);
        request.radius = config.google.radius;
    }

    service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            cb(null, results);
        } else if(GOOGLE_STATUSES.indexOf(status) > -1) {
            cb(null, []);
        } else {
            cb('Something went wrong! Try again later.');
        }
    });
}

export const searchPlacesByLatLng = (lat, lng, cb) => {
    let request = {
        type: [config.google.placeType],
        location: new window.google.maps.LatLng(lat, lng),
        radius: config.google.radius
    };

    service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            cb(null, results);
        } else if(GOOGLE_STATUSES.indexOf(status) > -1) {
            cb(null, []);
        } else {
            cb('Something went wrong! Try again later.');
        }
    })
}