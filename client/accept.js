Template.accept.helpers({
	unaccepted: function(){
		return Battles.find({opponent: this._id,waiting: false});
	}
});


Template.accept.events({
	'click .acceptBattle': function(){
		Meteor.call('battles.start',this);
	},

	'click .rejectBattle': function(){
		Meteor.call('battles.delete',this);
	}
});
