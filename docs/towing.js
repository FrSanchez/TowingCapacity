//
// towing.js
// Created by Francisco Sanchez on 11/26/19
// Copyright © 2019 Sanchez Parra Labs. All rights reserved.
//
$(document).ready(function() {

  var labels = ['passengers', 'cargo', 'curbWeight', 'gcvwr', 'gvwr', 'towingCapacity', 'payload', 'tt_hitch', 'tt_gvwr', 'tt_uvw'];

  function createCookie(cookieName, cookieValue, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString() + "; SameSite=Strict";
  }

  function accessCookie(cookieName) {
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for (var i = 0; i < allCookieArray.length; i++) {
      var temp = allCookieArray[i].trim();
      if (temp.indexOf(name) == 0)
        return temp.substring(name.length, temp.length);
    }
    return "";
  }

  function calculate() {
    var data = {};
    for (i = 0; i < labels.length; i++) {
      data[labels[i]] = get('#' + labels[i]);
    }
    var totalPayload = data.passengers + data.cargo;
    var newgvw = data.curbWeight + totalPayload + data.tt_hitch;
    set('#totalPayload', totalPayload);
    set('#availablePayload', (data.payload - totalPayload) - data.tt_hitch);
    set('#newgvw', newgvw);
    set('#newgcvw', (data.tt_gvwr - data.tt_hitch) + newgvw);
    set('#newTowingCapacity', data.towingCapacity);
    createCookie('towingData', JSON.stringify(data), 365);
    console.log('set cookie towingData = ' + JSON.stringify(data));
  }

  function get(selector) {
    var value = parseInt($(selector).val(), 10);
    return value;
  }

  function set(selector, value) {
    if (!isNaN(value)) {
      $(selector).val(value);
    }
  }

  function loadCookies() {
    var raw = accessCookie('towingData');
    if (raw !="") {
      console.log(raw);
      data = JSON.parse(raw);
      for(var key in data) {
        set('#' + key, data[key]);
      }
      calculate();
    } else {
      console.log('no data saved');
    }
  }

  $('[data-toggle="tooltip"]').tooltip();

  $("div").focusout(function() {
    calculate();
  });

  loadCookies();
});
