"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./firebaseConfig");

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getSongs(callback) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://music-history-54c84.firebaseio.com/songs.json',
    }).done(function (songData) {
      resolve(songData);
    });
  });
}

function addSong(songFormObj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://music-history-54c84.firebaseio.com/songs.json',
      type: 'POST',  // used for first time posting to DB
      data: JSON.stringify(songFormObj),
      dataType: 'json'
    }).done(function (songId) {
      resolve(songId);
    });
  });
}

function deleteSong(songId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://music-history-54c84.firebaseio.com/songs/${songId}.json`,
      type: 'DELETE',
    }).done(function (data) {
      resolve(data);
    });
  });
}

function getSong(songId) {
  return new Promise(function (resolve, reject) {
  $.ajax({
      url: `https://music-history-54c84.firebaseio.com/songs/${songId}.json`
    }).done(function (songData) {
      console.log("songData", songData);
      resolve(songData);
    }).fail(function(error) {
      reject(error);
    });
  });  // end of promise
}

function editSong(songFormObj, songId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://music-history-54c84.firebaseio.com/songs/${songId}.json`,
      type: 'PUT',  // used for updating something in the same spot
      data: JSON.stringify(songFormObj)
    }).done(function (data) {
      resolve(data);
    });
  });
}

module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};
