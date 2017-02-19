import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.setDefault("toptext", "");
Session.setDefault("bottomtext", "");
Session.setDefault("urltext", "");
Session.setDefault("use-url", true);

Template.main.helpers({
  memes: function() {
    return Memes.find({}, {$sort:{createdAt:-1}});
  },

  use_url: function () {
    return Session.get("use-url");
  }
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
    var select = null;
    if (e !== null) {
      select = e.options[e.selectedIndex].value;
    }
    var toptext = document.getElementById("toptext").value;
    var bottomtext = document.getElementById("bottomtext").value;
    var url = null;
    var urltext = null;
    if (e === null) {
      urltext = document.getElementById("urltext").value;
    	url = "https://memegen.link/custom/" + toptext + "/" + bottomtext+ ".jpg?alt=" + urltext;
    }
    else {
    	url = "https://memegen.link/" + select + "/" + toptext + "/" + bottomtext + ".jpg";
    }
  	Meteor.call('memes.insert', url);
  },

  'click #use-template': function(event) {
    Session.set("use-url", false);
    var button1 = document.getElementById("use-template");
    var button2 = document.getElementById("use-url");
    button1.setAttribute("style","background-color:#333; color:white");
    button2.setAttribute("style","background-color:white; color:#333");
  },

  'click #use-url': function(event) {
    Session.set("use-url", true);
    var button1 = document.getElementById("use-template");
    var button2 = document.getElementById("use-url");
    button1.setAttribute("style","background-color:white;");
    button2.setAttribute("style","background-color:#333; ");
  }
});
