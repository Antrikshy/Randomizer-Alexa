/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.24d0e151-32b8-489a-a9e8-b5b2795763b2";

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
    var speechOutput = "You can ask the Randomizer skill to flip a coin, " +
                        "or to generate a random number by specifying a " +
                        "minimum and maximum. Just say 'flip a coin', or " +
                        "'generate a number between one and twenty'.";
    response.ask(speechOutput);
};

Randomizer.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Randomizer onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

Randomizer.prototype.intentHandlers = {
    GenerateNumberIntent: function (intent, session, response) {
        console.log("GenerateNumberIntent detected");
        
        var min = parseInt(intent.slots.Min.value);
        var max = parseInt(intent.slots.Max.value);

        console.log("Min and max: " + min + ", " + max);

        var output = getRandomInt(min, max);
        console.log("Random number: " + output);
        response.tell(output);
    },
    FlipCoinIntent: function (intent, session, response) {
        console.log("FlipCoinIntent detected");

        var random = Math.random() >= 0.5;

        var output = (random) ? "Heads." : "Tails.";
        console.log("Coin flip result: " + output);
        response.tell(output);
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var randomizer = new Randomizer();
    randomizer.execute(event, context);
};

// Helpers

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
