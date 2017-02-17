Meteor.methods({
  'memes.insert': function(url) {
    Memes.insert({
          url: url,
          user: userId,
          createdAt: new Date()
    })
  }
  
  'users.findId': function(username){
  	return Meteor.users.find({username: username});	
  }
});
