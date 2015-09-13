/**
 * App ID for the skill
 */
var APP_ID = undefined;

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var Randomizer = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Randomizer.prototype = Object.create(AlexaSkill.prototype);
Randomizer.prototype.constructor = Randomizer;

Randomizer.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Randomizer onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

Randomizer.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Randomizer onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    response.ask(speechOutput);
};

Randomizer.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Randomizer onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

Randomizer.prototype.intentHandlers = {
    RandomizerIntent: function (intent, session, response) {
        response.tellWithCard("Hello World!", "Greeter", "Hello World!");
    },
    HelpIntent: function (intent, session, response) {
        response.ask("You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var Randomizer = new Randomizer();
    Randomizer.execute(event, context);
};

