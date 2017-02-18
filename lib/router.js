Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  waitOn: function() {
    return Meteor.subscribe("memes") && Meteor.subscribe("battles") && Meteor.subscribe("usersData");
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

Router.route('/battles',function(){
	this.render('battles');
});

Router.route("/battle/:_id", {
  name: "battle",
  data: function() {
    return Battles.findOne({
      "_id": this.params._id
    });
  }
});

Router.route("/profile/:username", {
  name: "profile",
  data: function() {
    return Meteor.users.findOne({
      username: this.params.username
    });
  }
});

Router.route("/leaderboard",function(){
  this.render("leaderboard");
});

Router.route("/send",function(){
  this.render("send");
});
