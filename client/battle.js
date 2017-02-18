Template.battle.helpers({
  challengerUsername: function() {
    return Meteor.users.findOne({"_id": this.challenger}).username;
  },

  opponentUsername: function() {
    return Meteor.users.findOne({"_id": this.opponent}).username;
  },
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
  }
});
