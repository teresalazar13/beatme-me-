Template.meme.helpers({
  userUsername: function() {
    return Meteor.users.findOne({"_id": this.user}).username;
  }
});


Template.meme.events({

});
