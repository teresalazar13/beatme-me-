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
    var n = Math.round(Math.random() * cat.length);
    var newcat = cat[n];
    Battles.insert({
      challenger: Meteor.userId(),
      opponent: Meteor.users.findOne({"username": opponent})._id,
      challengerVotes: [],
      opponentVotes: [],
      accepted: false,
      rounds: [{category: newcat, challenger: null,  opponent: null}],
      teresa: 0,
      createdAt: new Date()
    });
  },

  'vote.challenger': function(battle) {
    console.log("vote");
    console.log(battle);
    var votes = battle.challengerVotes;
    votes.push(Meteor.userId());
      Battles.update({"_id":battle}, { $push: {challengerVotes: Meteor.userId()} });
      console.log(battle);
      if(battle.opponentVotes.indexOf(Meteor.userId())!=-1){
        console.log("voto duplo");
      /*  votes = battle.opponentVotes;
        votes.slice(votes.indexOf(battle),1);*/
        Battles.update({"_id":battle}, { $pull : { opponentVotes: Meteor.userId() } });
      }
  },

  'vote.opponent': function(battle) {
      console.log("vote");
      console.log(battle);
      var votes = battle.challengerVotes;
      Battles.update({"_id":battle}, { $push : { opponentVotes: Meteor.userId() } });
      console.log(battle);
      if(battle.challengerVotes.indexOf(Meteor.userId())!=-1){
        console.log("voto duplo");
      /*  votes = battle.challengerVotes;
        votes.slice(votes.indexOf(battle),1);*/
        Battles.update({"_id":battle}, { $pull: { challengerVotes: Meteor.userId() } });
      }
    },

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
      ];
      var newcat  = cat.random();
      catArray.push(newcat);
      Battles.update(battle, { $set: {categories: memeArray} });
    }
  },

  'battles.start': function(battle) {
    Battles.update(battle, { $set: { accepted: true } });
  },

  'battles.delete': function(battle){
    Battles.remove(battle);
  },

  'battle.memes.insert': function(url, battle) {
    var meme_id = Memes.insert({
      url: url,
      user: Meteor.userId(),
      createdAt: new Date()
    });
    var rounds = Battles.findOne({"_id": battle}).rounds;
    var property = null;
    if (Meteor.userId() == Battles.findOne({"_id": battle}).challenger)
      property = "challenger";
    else
      property = "opponent";
    rounds[rounds.length - 1][property] = url;
    Battles.update({
      _id: battle}, { $set: {rounds: rounds} }
    );
  }
});
