import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.helpers({
  memes: function() {
    return Memes.find();
  },
});

Template.main.events({
  'click .meme-submit': function(event) {
    event.preventDefault();
    var e = document.getElementById('memetemplate');
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
