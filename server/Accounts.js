Accounts.onCreateUser(function(options, user) {
  user.victories_length = 0;
  user.victories = [];
  user.defeats = [];
  return user;
});
