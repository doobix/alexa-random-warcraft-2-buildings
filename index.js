/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const SeeWarcraft2 = require('see-warcraft-2');

const APP_ID = 'amzn1.ask.skill.5cb6f956-d11e-4fd0-a538-1381e262b4a5';

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetRandomWarcraftBuilding');
  },
  'GetRandomWarcraftBuilding': function() {
    const swc = new SeeWarcraft2();
    const randomBuilding = swc.getRandomBuilding();
    const speechOutput = `Your random Warcraft 2 building is: ${randomBuilding.name}, from the ${randomBuilding.faction} faction.`;
    this.emit(
      ':tellWithCard',
      speechOutput,
      'Random Warcraft II Buildings',
      `Building: ${randomBuilding.name}. Faction: ${randomBuilding.faction}.`
    );
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = 'This skill tells you a random Warcraft 2 building. Would you like to hear one?';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.YesIntent': function() {
    this.emit('GetRandomWarcraftBuilding');
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};
