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
      finished: false,
      rounds: [{category: newcat, challenger: null,  opponent: null}],
      createdAt: new Date()
    });
  },

  'battle.finish': function(battle) {
    Battles.update({"_id":battle._id}, {$set: {finished: true}});
    var date = new Date();
    var date_after_day = date + 60 * 60 * 24 * 1000 + 987532867;
    if (battle.opponentVotes.length > battle.challengerVotes.length) {
      Meteor.users.update({"_id": battle.opponent}, { $push: {victories: date} });
      Meteor.users.update({"_id": battle.challenger}, { $push: {defeats: date} });
      if (Meteor.users.findOne({"_id": battle.opponent}).victories_length === 0) {
        Meteor.users.update({"_id": battle.opponent}, { $push: {victories: date_after_day} });
        Meteor.users.update({"_id": battle.opponent}, { $inc: {victories_length: 1} });
      }
      else {
        Meteor.users.update({"_id": battle.opponent}, { $inc: {victories_length: 1} });
      }      return "opponent";
    }
    else if (battle.opponentVotes.length < battle.challengerVotes.length) {
      Meteor.users.update({"_id": battle.challenger}, { $push: {victories: date} });
      Meteor.users.update({"_id": battle.opponent}, { $push: {defeats: date} });
      if (Meteor.users.findOne({"_id": battle.challenger}).victories_length === 0) {
        Meteor.users.update({"_id": battle.challenger}, { $push: {victories: date_after_day} });
        Meteor.users.update({"_id": battle.challenge}, { $inc: {victories_length: 1} });
      }
      else {
        Meteor.users.update({"_id": battle.challenge}, { $inc: {victories_length: 1} });
      }
      return "challenger";
    }
    else {
      return "tie";
    }
  },

  'vote.challenger': function(battle) {
    Battles.update({"_id": battle._id}, { $push: {challengerVotes: Meteor.userId()} });
  },

  'remove.vote.challenger': function(battle) {
    Battles.update({"_id": battle._id}, { $pull : { challengerVotes: Meteor.userId() } });
  },

  'vote.opponent': function(battle) {
    Battles.update({"_id": battle._id}, { $push : { opponentVotes: Meteor.userId() } });
  },

  'remove.vote.opponent': function(battle) {
    Battles.update({"_id": battle._id}, { $pull : { opponentVotes: Meteor.userId() } });
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
    var lastRound = Battles.findOne({"_id": battle}).rounds[rounds.length - 1];
    if (lastRound.opponent !== null && lastRound.challenger !== null && (rounds.length < 3)) {
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
      var n = Math.round(Math.random() * (cat.length-1));
      var newcat = cat[n];
      Battles.update({"_id": battle}, { $push: {rounds: {category: newcat, challenger: null,  opponent: null}} });
    }
  }
});
