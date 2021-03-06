Template.accept.helpers({
	unacceptedBattles: function(){
		return Battles.find({ $and: [{ opponent: Meteor.userId() }, { accepted: false }] });
	},

	ongoingBattles: function() {
		return Battles.find({
			$or: [
				{$and:[
					{ opponent: Meteor.userId() },
					{ finished: false },
				]},
				{$and:[
					{ challenger: Meteor.userId() },
					{ finished: false },
				]}
			]
		});
	},

	finishedBattles: function() {
		return Battles.find({
			$or: [
				{$and:[
					{ opponent: Meteor.userId() },
					{ finished: true },
				]},
				{$and:[
					{ challenger: Meteor.userId() },
					{ finished: true },
				]}
			]
		});
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
