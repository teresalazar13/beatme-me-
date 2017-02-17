import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.helpers({

});

Template.main.events({
  'click .memesubmit': function(event){
    event.preventDefault();
    var target = event.target;
    var e  = document.getElementById('memetemplate');    
    var select = e.options[e.selectedIndex].value;
    console.log(target);
    console.log(select);
    var toptext =document.getElementById("toptext").value;;
    var bottomtext = document.getElementById("bottomtext").value;;
    console.log(toptext);
    console.log(bottomtext);
    var urltext = document.getElementById("urltext").value;
    console.log(urltext);
    if(select == "default"){
    	var url= "https://memegen.link/custom/"+toptext+"/" + bottomtext+".jpg?alt="+urltext;
    }
    else {
    	var url = "https://memegen.link/api/templates/" + select +"/"+toptext+"/"+bottomtext;
    }
    var ID = Meteor.userId;
  	Meteor.call('memes.insert',url, ID);
  }
});
