Template.profile.helpers({
  memesByUser: function() {
    return Memes.find({"user": this._id});
  }
});


Template.profile.events({

});
