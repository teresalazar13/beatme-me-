Meteor.methods({
  'memes.insert': function(url) {
    Memes.insert({
      url: url,
      user: Meteor.userId(),
      createdAt: new Date()
    });
  },

  'battles.invite': function(opponent) {
    Battles.insert({
      challenger: Meteor.userId(),
      opponent: Meteor.users.findOne({"username": opponent})._id,
      challengerVotes: 0,
      opponentVotes: 0,
      accepted: false,
      createdAt: new Date()
    });
  },

  'vote.challenger': function(battle) {
    Battles.update(battle, { $inc: { challengerVotes: 1 } });
  },

  'vote.opponent': function(battle) {
    Battles.update(battle, { $inc: { opponentVotes: 1 } });
  },

  'battles.start': function(battle) {
    Battles.update(battle, { $set: { accepted: true } });
  },

  'battle.delete': function(battle){
    Battles.remove(battle);
  }
});
