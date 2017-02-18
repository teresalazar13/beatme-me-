Template.header.helpers({
  username: function() {
    return Meteor.user().username;
  },

  home_status: function() {
    var url = decodeURIComponent(Router.current().location.get().path.split("/")[1]);
    if (url === "")
      return "border-bottom: 3px solid rgb(163,46,46)";
  },

  battles_status: function() {
    var url = decodeURIComponent(Router.current().location.get().path.split("/")[1]);
    if (url == "battles")
      return "border-bottom: 3px solid rgb(163,46,46)";
  },

  leaderboard_status: function() {
    var url = decodeURIComponent(Router.current().location.get().path.split("/")[1]);
    if (url == "leaderboard")
      return "border-bottom: 3px solid rgb(163,46,46)";
  },

  profile_status: function() {
    var url = decodeURIComponent(Router.current().location.get().path.split("/")[1]);
    if (url == "profile")
      return "border-bottom: 3px solid rgb(163,46,46)";
  }
});

Template.header.events({
  'click #logout': function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
    document.location.reload(true);
  },
});
