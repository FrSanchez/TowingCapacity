function calculate() {
  var labels = ['passengers', 'cargo', 'curbWeight', 'gcvwr', 'gvwr', 'towingCapacity', 'payload', 'tt_hitch', 'tt_gvwr'];
  var data = [];
  for (i = 0; i < labels.length; i++) {
    data.push(get('#' + labels[i]));
  }
  var [pass, cargo, curbWeight, gcvwr, gvwr, towingCapacity, payload, tt_hitch, tt_gvwr ] = data;
  var totalPayload = pass + cargo;
  var newgvw = curbWeight + totalPayload + tt_hitch;
  set('#totalPayload', totalPayload);
  set('#availablePayload', (payload - totalPayload) - tt_hitch);
  set('#newgvw', newgvw);
  set('#newgcvw', (tt_gvwr - tt_hitch) + newgvw);
  set('#newTowingCapacity', towingCapacity);
}

function get(selector) {
  var value = parseInt($(selector).val(), 10);
  return value;
}

function set(selector, value) {
  if(!isNaN(value)) {
    $(selector).val(value);
  }
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();

  $("div").focusout(function(){
    calculate();
  });
});
