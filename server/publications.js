Meteor.publish("memes", function() {
  return Memes.find({}, {
    sort: {
      createdAt: -1
    }
  });
});

Meteor.publish("battles", function() {
  return Battles.find({}, {
    sort: {
      createdAt: -1
    }
  });
});

Meteor.publish("usersData", function() {
    if (this.userId) {
      return Meteor.users.find({}, {
        fields: {
          "username": true,
          "victories": true,
          "defeats": true
        }
      });
    } else {
      this.ready();
    }
});
