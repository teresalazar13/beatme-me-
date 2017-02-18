Template.header.helpers({
  username: function() {
    return Meteor.user().username;
  },

  home_status: function() {
    var url = decodeURIComponent(Router.current().location.get().path.split("/")[1]);
    if (url === "")
      return "active";
  },

  battles_status: function() {
    var url = decodeURIComponent(Router.current().location.get().path.split("/")[1]);
    if (url == "battles")
      return "active";
  },

  leaderboard_status: function() {
    var url = decodeURIComponent(Router.current().location.get().path.split("/")[1]);
    if (url == "leaderboard")
      return "active";
  },

  profile_status: function() {
    var url = decodeURIComponent(Router.current().location.get().path.split("/")[1]);
    if (url == "profile")
      return "active";
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
