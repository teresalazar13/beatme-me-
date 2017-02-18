Meteor.methods({
  'memes.insert': function(url) {
    Memes.insert({
      url: url,
      user: Meteor.userId(),
      createdAt: new Date()
    });
  },

  'battles.invite': function(opponent) {
    var cat = [
      "Battle Ship",
      "Mad Lad",
      "Programming Jokes",
      "WildCard",
      "Crazy Animals",
      "We all have that one friend...",
      "Unexpected",
      "Trump Memes",
      "Selfie"
    ];
    var n= round(Math.random() * cat.length);
    var newcat = cat[n];
    Battles.insert({
      challenger: Meteor.userId(),
      opponent: Meteor.users.findOne({"username": opponent})._id,
      challengerVotes: 0,
      opponentVotes: 0,
      accepted: false,
      categories:[newcat],
      teresa: 0,
      memes: [],
      createdAt: new Date()
    });
  },

  'vote.challenger': function(battle) {
    Battles.update(battle, { $inc: { challengerVotes: 1 } });
  },

  'vote.opponent': function(battle) {
    Battles.update(battle, { $inc: { opponentVotes: 1 } });
  },
  'battles.addmeme': function(battle,meme,user,cat){
    var memeArray = Battles.find(battle).memes;
    memeArray.push([meme,user]);
    Battles.update(battle, {$set:{memes: memeArray}});
  }
  //VERIFICA SE É NECESSARIO NOVA CATEGORIA E SE FOR ADICIONA
  'battles.newcat': function(battle){
    var memeArray = Battles.find(battle).memes;
    var catArray = Battles.find(battle).categories;
    if(memeArray.length == catArray.length * 2){
      var cat = [
        "Battle Ship",
        "Mad Lad",
        "Programming Jokes",
        "WildCard",
        "Crazy Animals",
        "We all have that one friend...",
        "Unexpected",
        "Trump Memes",
        "Selfie"
      ]
      var newcat  = cat.random();
      catArray.push(newcat);
      Battles.update(battle, {$set:{categories: memeArray}});
    }
  }
  'battles.start': function(battle) {
    Battles.update(battle, { $set: { accepted: true } });
  },

  'battle.delete': function(battle){
    Battles.remove(battle);
  }
});
