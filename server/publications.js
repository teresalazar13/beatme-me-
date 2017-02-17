Meteor.publish("memes", function() {
  return Memes.find({}, {
    sort: {
      createdAt: -1
    }
  });
});
