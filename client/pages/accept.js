Template.accept.helpers({
	unacceptedBattles: function(){
		return Battles.find({ $and: [{ opponent: Meteor.userId() }, { accepted: false }] });
	},

	acceptedBattles: function() {
		return Battles.find({ $and: [{ opponent: Meteor.userId() }, { accepted: true }] });
	},
});

Template.accept.events({
	'click .acceptBattle': function(){
		Meteor.call('battles.start', this._id);
	},

	'click .rejectBattle': function(){
		Meteor.call('battles.delete', this._id);
	}
});
