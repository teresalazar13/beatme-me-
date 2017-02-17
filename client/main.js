import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.submit.helpers({

});

Template.submit.events({
  'submit .new-meme': function(error){
    event.preventDefault();
    var target = event.target;
    var text = target.text.value;
  },
});
