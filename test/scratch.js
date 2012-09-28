var es = require('event-stream');
var createEvent = require("../events/createEvent");
var saveEvent = require("../events/saveEvent");

es.pipeline(
  es.readArray([{}]),
  createEvent(),
  saveEvent(),
  es.stringify(),
  process.stdout
);