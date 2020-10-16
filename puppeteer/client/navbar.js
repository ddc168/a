import { Template } from 'meteor/templating';

Template.navbar.events({
  'click #nav_home'(event, instance) {
    FlowRouter.go('/');
  },
  'click #nav_data'(event, instance) {
    FlowRouter.go('/data_page');
  },
  'click #nav_data_site'(event, instance) {
    FlowRouter.go('/data_site');
  },
  'click #nav_data_doc'(event, instance) {
    FlowRouter.go('/data_doc');
  },
  'click #nav_data_db'(event, instance) {
    FlowRouter.go('/data_db');
  },
  'click #nav_know_entity'(event, instance) {
    FlowRouter.go('/know_entity');
  },
  'click #nav_know_relation'(event, instance) {
    FlowRouter.go('/know_relation');
  },
  'click #nav_know_event'(event, instance) {
    FlowRouter.go('/know_event');
  },
  'click #nav_show_drgs'(event, instance) {
    FlowRouter.go('/show_drgs');
  },
  'click #nav_show_index'(event, instance) {
    FlowRouter.go('/show_index');
  },
  'click #nav_show_hl7'(event, instance) {
    FlowRouter.go('/show_hl7');
  },
  'click #nav_show_openehr'(event, instance) {
    FlowRouter.go('/show_openehr');
  },
  'click #nav_class_drgs'(event, instance) {
    FlowRouter.go('/class_drgs');
  },
  'click #nav_class_hl7'(event, instance) {
    FlowRouter.go('/class_hl7');
  },
  'click #nav_class_openehr'(event, instance) {
    FlowRouter.go('/class_openehr');
  },
  'click #nav_qa_drgs'(event, instance) {
    FlowRouter.go('/qa_drgs');
  },
  'click #nav_qa_hl7'(event, instance) {
    FlowRouter.go('/qa_hl7');
  },
  'click #nav_qa_openehr'(event, instance) {
    FlowRouter.go('/qa_openehr');
  }
})
