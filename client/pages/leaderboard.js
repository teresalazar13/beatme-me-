Template.leaderboard.helpers({
	users: function() {

		var items = Meteor.users.find({}, {sort: {victories: -1}}).map(function(doc, index, cursor) {
			var i = _.extend(doc, {index: 1 + index});
			var user = doc._id;
			var position =  1 + index;
			return i;
		});
		return items;
	},

	cena: function() {
		if (this.index < 4) {
			return true;
		}
		return false;
	},

	winner: function() {
		if (this.index ==1) {
			return true;
		}
		return false;
	}
});
