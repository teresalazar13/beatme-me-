Template.battlePreview.helpers({
  challengerUsername: function() {
    return Meteor.users.findOne({"_id": this.challenger}).username;
  },

  opponentUsername: function() {
    return Meteor.users.findOne({"_id": this.opponent}).username;
  },

  roundNumber: function() {
    return Meteor.battles.find({"_id": this._id}).length;
  },

  category: function() {
    var catArray = Meteor.battles.find({"_id": this._id}).categories;
    return catArray[catArray.length-1];
  },
});
