Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  waitOn: function() {
    return Meteor.subscribe("memes");
  },
  notFoundTemplate: "notFound"
});

Router.route('/', function () {
  this.render('main');
});

Router.route('/authentication', function () {
  this.render('authentication');
});

Router.route("/profile/:username", {
  name: "profile",
  data: function() {
    return Meteor.users.findOne({
      username: this.params.username
    });
  }
});
