import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './battle.html';


Template.newbattle.events({
	'click .memesubmit': function(event){
		var user =document.getElementById("battleuser").value;
		var opponent
		if(user != null){
			//RANDOM
		}else{
			 opponent = Meteor.call('users.findID',username);
		}
		Meteor.call('battles.invite',opponent);
	}
});