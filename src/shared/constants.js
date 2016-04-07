module.exports = {
  // Content
  IMAGE_UPLOAD_REQUEST: 'IMAGE_UPLOAD_REQUEST',
  IMAGE_UPLOAD_SUCCESS: 'IMAGE_UPLOAD_SUCCESS',
  IMAGE_UPLOAD_ERROR: 'IMAGE_UPLOAD_ERROR',

  // Login and Auth
  // LOGIN_URL: 'http://localhost:3000',
  LOGIN_URL: getHostURL() + ':3000',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  TOKEN_REQUEST: 'TOKEN_REQUEST',
  TOKEN_SUCCESS: 'TOKEN_SUCCESS',
  TOKEN_FAILURE: 'TOKEN_FAILURE',
  FIREBASE_AUTH_REQUEST: 'FIREBASE_AUTH_REQUEST',
  FIREBASE_AUTH_SUCCESS: 'FIREBASE_AUTH_SUCCESS',
  FIREBASE_AUTH_FAILURE: 'FIREBASE_AUTH_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  // Database
  FIREBASE_URL: 'https://toitoidev.firebaseio.com/buckets/',
  FIREBASE_REQUEST: 'FIREBASE_REQUEST',
  FIREBASE_RECEIVE: 'FIREBASE_RECEIVE',
  FIREBASE_SAVE: 'FIREBASE_SAVE',
  FIREBASE_UPDATE: 'FIREBASE_UPDATE',
  FIREBASE_FAILURE: 'FIREBASE_FAILURE',

  // Generate & Images
  // GENERATE_URL: 'http://localhost:6557',
  GENERATE_URL: getHostURL() + ':6557',

  // Themes
  THEMES_REQUEST: 'THEMES_REQUEST',
  THEMES_REQUEST_SUCCESS: 'THEMES_REQUEST_SUCCESS',
  THEMES_REQUEST_FAILURE: 'THEMES_REQUEST_FAILURE',
  THEME_SELECTION: 'THEME_SELECTION',
  THEME_SELECTION_SUCCESS: 'THEME_SELECTION_SUCCESS',
  THEME_SELECTION_FAILURE: 'THEME_SELECTION_FAILURE',

  // User
  USER_STORED: 'USER_STORED',

  // WebSocket
  // WEBSOCKET_URL: 'ws://localhost:6557/ws',
  WEBSOCKET_URL: 'ws://' + window.location.hostname + ':6557/ws',
  PUBLISH_REQUEST: 'PUBLISH_REQUEST',
  PUBLISH_SUCCESS: 'PUBLISH_SUCCESS',
  PUBLISH_ERROR: 'PUBLISH_ERROR'
}

function getHostURL() {
  var http = location.protocol;
  var slashes = http.concat('//');
  return slashes.concat(window.location.hostname);
}
