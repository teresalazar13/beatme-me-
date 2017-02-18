Template.header.events({
  'click #logout': function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
    document.location.reload(true);
  }
});

Template.header.helpers({
  username: function() {
    return Meteor.user().username;
  }
});
