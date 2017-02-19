import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './battles.html';

Template.battles.helpers({
  battlesListOngoing: function() {
    return Battles.find({finished: false});
  },

  battlesListFinished: function() {
    return Battles.find({finished: true});
  },

  challengerUsername: function() {
    return Meteor.users.findOne({"_id": this.challenger}).username;
  },

  opponentUsername: function() {
    return Meteor.users.findOne({"_id": this.opponent}).username;
  },

  roundNumber: function() {
    return Meteor.battles.find({"_id": this._id}).length;
  },

  category: function() {
    var catArray = Meteor.battles.find({"_id": this._id}).categories;
    return catArray[catArray.length-1];
  },
});

Template.battles.events({
  'click .battle-submit': function(event){
    var opponent = document.getElementById("battle-user").value;
    Meteor.call('battles.invite', opponent);
  }
});
