Router.route('/', function () {
  this.render('main');
});

Router.route('/authentication', function () {
  this.render('authentication');
});

Router.route('/new_battle',function(){
	this.render('newbattle')
})

Router.route("/profile/:username", {
  name: "profile",
  data: function() {
    return Meteor.users.findOne({
      username: this.params.username
    });
  }
});
