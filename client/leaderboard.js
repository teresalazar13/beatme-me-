Template.leaderboard.helpers({
	leaderboard: function(){
		return Meteor.users.find({},{sort: victories}).limit(10);	
	}
});

