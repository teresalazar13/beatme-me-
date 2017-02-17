import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.helpers({

});

Template.main.events({
  'submit .new-meme': function(error){
    event.preventDefault();
    var target = event.target;
    var select  = document.getElementById('memetemplate')
    console.log(target);
    console.log(select);

    var toptext = target.toptext.value;
    var bottomtext = target.toptext.value;
    console.log(toptext);
    console.log(bottomtext);
    if(select == "default"){
    	var urltext = target.urltext.value;
    	var url= "https://memegen.link/custom/"+toptext+"/" + bottomtext+".jpg?alt="+url;
    }
    else {
    	var url = "https://memegen.link/api/templates/" + select +"/"+toptext+"/"+bottomtext;
    }
    var ID = Meteor.userId;
  	Meteor.memes.insert(url,ID);
  }
});
