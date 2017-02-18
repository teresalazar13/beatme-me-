import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './battles.html';

Template.battles.helpers({
  battlesList: function() {
    return Battles.find();
  }
});

Template.battles.events({
  'click .battle-submit': function(event){
    var opponent = document.getElementById("battle-user").value;
    Meteor.call('battles.invite', opponent);
  }
});