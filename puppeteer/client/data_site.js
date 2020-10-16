import { Template } from 'meteor/templating';

Template.data_site_info.helpers({
  sites() {
    return Site.find({}).fetch()
  }
});
  
Template.data_site_info.events({

})
