Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  waitOn: function() {
    return Meteor.subscribe("memes");
  },
  notFoundTemplate: "notFound"
});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('authentication');
  }
  else {
    this.next();
  }
});

Router.route('/', function () {
  this.render('main');
});

Router.route('/new_battle',function(){
	this.render('newbattle');
});

Router.route('/accept',function(){
  this.render('accept');
});

Router.route("/profile/:username", {
  name: "profile",
  data: function() {
    return Meteor.users.findOne({
      username: this.params.username
    });
  }
});
