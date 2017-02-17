var currentTab = 'sign_up';


Template.authetication.events({
  'click .sign-in': function(event, err) {
    if (currentTab == 'sign_in') {
        callback_signin();
    }
    currentTab = 'sign_in';
  },

  'click #sign-up': function(event) {
    if (currentTab == 'sign_up') {
        callback_signup();
    }
    currentTab = 'sign_up';
  },
});


Template.authetication.helpers({

});
