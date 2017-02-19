Template.battle.helpers({
  challengerUsername: function() {
    return Meteor.users.findOne({"_id": this.challenger}).username;
  },

  opponentUsername: function() {
    return Meteor.users.findOne({"_id": this.opponent}).username;
  },

  votedChallenger: function() {
    if (this.challengerVotes.indexOf(Meteor.userId()) != -1) {
      return true;
    }
    return false;
  },

  votedOpponent: function() {
    if (this.opponentVotes.indexOf(Meteor.userId()) != -1) {
      return true;
    }
    return false;
  }
});


Template.battle.events({
  'click .meme-submit': function(event) {
    event.preventDefault();
    var e = document.getElementById('meme-template');
    var select = e.options[e.selectedIndex].value;
    var toptext = document.getElementById("toptext").value;
    var bottomtext = document.getElementById("bottomtext").value;
    var urltext = document.getElementById("urltext").value;
    var url = null;
    if (select == "default") {
      url = "https://memegen.link/custom/" + toptext + "/" + bottomtext+ ".jpg?alt=" + urltext;
    }
    else {
      url = "https://memegen.link/" + select + "/" + toptext + "/" + bottomtext + ".jpg";
    }
    Meteor.call('battle.memes.insert', url, this._id);
  },

  'click .challenger-vote': function(event){
    event.preventDefault();
    if(this.challengerVotes.indexOf(Meteor.userId()) == -1) {
      Meteor.call('vote.challenger', this);
    }
    else {
      Meteor.call('remove.vote.challenger', this);
    }
  },

  'click .opponent-vote': function(event){
    event.preventDefault();
    if(this.opponentVotes.indexOf(Meteor.userId()) == -1) {
      Meteor.call('vote.opponent', this);
    }
    else {
      Meteor.call('remove.vote.opponent', this);
    }
  }
});
