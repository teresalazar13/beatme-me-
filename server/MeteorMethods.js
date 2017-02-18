Meteor.methods({
  'memes.insert': function(url) {
    Memes.insert({
          url: url,
          user: userId,
          createdAt: new Date()
    })
  },
  
  'users.findId': function(username){
  	return Meteor.users.find({username: username});	
  },

  'battles.invite': function( opponent){
    Battles.insert({
      challenger: this._id,
      opponent: opponent,
      accepted: false,
      createdAt: new Date()
    })
  },
  'battles.start': function(battle){
    Battle.update(battle, { $set: { accepted: true } });
  },
  'battle.delete': function(battle){
    Battle.remove(battle);
  }
});
