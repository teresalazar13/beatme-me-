Template.leaderboard.helpers({
	users: function(){
		return Meteor.users.find({},{$sort: {victories: 1}});
	},
	username: function(){
		return this.username;
	},
	victories: function(){
		 return this.victories;
 },
 position: function(){
	 var aux = Meteor.users.find({},{$sort: {victories: 1}});
	 var index = aux.indexOf(this);
	 return index +1;
 }
});
