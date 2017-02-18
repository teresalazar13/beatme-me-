Template.leaderboard.helpers({
	leaderboard: function(){
		return Meteor.users.find({},{sort: users.victories}).limit(10);	
	}
});
