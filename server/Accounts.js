Accounts.onCreateUser(function(options, user) {
  user.victories = 0;
  user.defeats = 0;
  return user;
});
