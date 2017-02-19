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
  },

  isInBattle: function() {
    if (Meteor.userId() == this.challenger || Meteor.userId() == this.opponent) {
      return true;
    }
    return false;
  },

  hasNotSubmited: function() {
    var isOpponent = this.opponent == Meteor.userId();
    var lastRound = this.rounds[this.rounds.length - 1];
    if (isOpponent) {
      if (lastRound.opponent !== null) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      if (lastRound.challenger !== null) {
        return false;
      }
      else {
        return true;
      }
    }
  },

  notFinished: function(){
    return !this.finished;
  },

  timeFromNow: function() {
    return moment(this.createdAt).fromNow();
  },

  shittyHelper: function() {
    var now = new Date();
    var difTime = now - this.createdAt;
    if (difTime > 2000) {
      if (! this.finished) {
        Meteor.call("battle.finish", this, function(error, result) {
          if (result == "challenger") {
            return Meteor.users.findOne({"_id": this.challenger}).username + " WON";
          }
          else if(result == "opponent") {
            return Meteor.users.findOne({"_id": this.opponent}).username + " WON";
          }
          else {
            return "TIE";
          }
        });
      }
      else {
        var helper = this.challengerVotes.length;
        var helper2 = this.opponentVotes.length;
        if (helper > helper2) {
          return Meteor.users.findOne({"_id": this.challenger}).username + " WON";
        }
        else if (helper2 > helper) {
          return Meteor.users.findOne({"_id": this.opponent}).username + " WON";
        }
        else {
          return "TIE";
        }
      }
    }
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
