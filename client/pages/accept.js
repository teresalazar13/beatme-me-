Template.accept.helpers({
	unacceptedBattles: function(){
		return Battles.find({ $and: [{ opponent: Meteor.userId() }, { accepted: false }] });
	},

	acceptedBattles: function() {
		return Battles.find({$or:[{ $and: [{ challenger: Meteor.userId() }, { accepted: true }]},{ $and: [{ opponent: Meteor.userId() }, { accepted: true }] }]});
	},
	challengerUsername: function() {
    return Meteor.users.findOne({"_id": this.challenger}).username;
  },
	opponentUsername: function() {
    return Meteor.users.findOne({"_id": this.opponent}).username;
  }
});

Template.accept.events({
	'click .acceptBattle': function(){
		Meteor.call('battles.start', this._id);
	},

	'click .rejectBattle': function(){
		Meteor.call('battles.delete', this._id);
	}
});
