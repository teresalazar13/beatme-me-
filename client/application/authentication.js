var currentTab = 'sign_up';

Template.authentication.events({
  'click #sign-in': function(event, err) {
    if (currentTab == 'sign_in') {
      Meteor.loginWithPassword($('#sign-in-tab').find('#username-input').val(), $('#sign-in-tab').find('#password-input').val(), function(err) {
        if (err) {
          console.log(err.reason);
        }
      });
    }
    currentTab = 'sign_in';
  },

  'click #sign-up': function(event) {
    console.log("cenasd");
    if (currentTab == 'sign_up') {
      console.log("cenasd");
      Accounts.createUser({
          username: $('#sign-up-tab').find('#username-input').val(),
          password: $('#sign-up-tab').find('#password-input').val()
      });
    }
    currentTab = 'sign_up';
  }
});

Template.authentication.helpers({

});
