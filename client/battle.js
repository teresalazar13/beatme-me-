Template.battle.helpers({
  challengerUsername: function() {
    return Meteor.users.findOne({"_id": this.challenger}).username;
  },

  opponentUsername: function() {
    console.log(this.opponent);
    console.log( Meteor.users.findOne({"_id": this.opponent}));

    //console.log(Meteor.users.findOne({"_id": }));
    return Meteor.users.findOne({"_id": this.opponent}).username;
  }
});
