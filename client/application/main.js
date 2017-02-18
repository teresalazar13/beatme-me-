import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.setDefault("toptext", "");
Session.setDefault("bottomtext", "");
Session.setDefault("urltext", "");

Template.main.helpers({
  memes: function() {
    return Memes.find();
  },
  /*

  sourcePreview: function() {
    url = "https://memegen.link/" + select + "/" + Session.get("toptext") + "/" + Session.get("bottomtext") + ".jpg";
    console.log(url);
    return url;
  }*/
});

Template.main.events({
  /*
  'keyup #toptext': function (event) {
    Session.set("toptext", event.target.value);
  },

  'keyup #urltext': function (event) {
    Session.set("urltext", event.target.value);
  },

  'keyup #bottomtext': function (event) {
    Session.set("bottomtext", event.target.value);
  },

  'click .meme-preview': function(event) {
    var e = document.getElementById('meme-template');
    var select = e.options[e.selectedIndex].value;
    if (select == "default") {
      url = "https://memegen.link/custom/" + Session.get("toptext") + "/" + Session.get("bottomtext")+ ".jpg?alt=" + Session.get("urltext");
    }
    else {
      url = "https://memegen.link/" + select + "/" + Session.get("toptext") + "/" + Session.get("bottomtext") + ".jpg";
    }
    console.log(url);
  },*/

  'click .meme-submit': function(event) {
    event.preventDefault();
    var e = document.getElementById('meme-template');
    var select = e.options[e.selectedIndex].value;
    var toptext = document.getElementById("toptext").value;
    var bottomtext = document.getElementById("bottomtext").value;
    var urltext = document.getElementById("urltext").value;
    var url = null;
    if (select == "default") {
    	url = "https://memegen.link/custom/" + toptext + "/" + bottomtext+ ".jpg?alt=" + urltext;
    }
    else {
    	url = "https://memegen.link/" + select + "/" + toptext + "/" + bottomtext + ".jpg";
    }

  	Meteor.call('memes.insert', url);
  }
});
