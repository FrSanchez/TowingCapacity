$(document).ready(function() {

  var labels = ['passengers', 'cargo', 'curbWeight', 'gcvwr', 'gvwr', 'towingCapacity', 'payload', 'tt_hitch', 'tt_gvwr'];

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
    var data = [];
    for (i = 0; i < labels.length; i++) {
      data.push(get('#' + labels[i]));
    }
    var [pass, cargo, curbWeight, gcvwr, gvwr, towingCapacity, payload, tt_hitch, tt_gvwr] = data;
    var totalPayload = pass + cargo;
    var newgvw = curbWeight + totalPayload + tt_hitch;
    set('#totalPayload', totalPayload);
    set('#availablePayload', (payload - totalPayload) - tt_hitch);
    set('#newgvw', newgvw);
    set('#newgcvw', (tt_gvwr - tt_hitch) + newgvw);
    set('#newTowingCapacity', towingCapacity);
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
      for (i = 0; i < labels.length; i++) {
        set('#' + labels[i], data[i]);
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
