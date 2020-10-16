FlowRouter.route('/', {
  name: 'Lists.home',
  action() {
    BlazeLayout.render('home', {main: 'Lists_show_page'});
  }
});
  
FlowRouter.route('/data_page', {
  name: 'Lists.data_page',
  action() {
    BlazeLayout.render('data_page', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/data_site', {
  name: 'Lists.data_site',
  action() {
    BlazeLayout.render('data_site', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/data_doc', {
  name: 'Lists.data_doc',
  action() {
    BlazeLayout.render('data_doc', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/data_db', {
  name: 'Lists.data_db',
  action() {
    BlazeLayout.render('data_db', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/know_entity', {
  name: 'Lists.know_entity',
  action() {
    BlazeLayout.render('know_entity', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/know_relation', {
  name: 'Lists.know_relation',
  action() {
    BlazeLayout.render('know_relation', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/know_event', {
  name: 'Lists.know_event',
  action() {
    BlazeLayout.render('know_event', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/show_drgs', {
  name: 'Lists.show_drgs',
  action() {
    BlazeLayout.render('show_drgs', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/show_index', {
  name: 'Lists.show_index',
  action() {
    BlazeLayout.render('show_index', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/show_hl7', {
  name: 'Lists.show_hl7',
  action() {
    BlazeLayout.render('show_hl7', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/show_openehr', {
  name: 'Lists.show_openehr',
  action() {
    BlazeLayout.render('show_openehr', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/class_drgs', {
  name: 'Lists.class_drgs',
  action() {
    BlazeLayout.render('class_drgs', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/class_hl7', {
  name: 'Lists.class_hl7',
  action() {
    BlazeLayout.render('class_hl7', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/class_openehr', {
  name: 'Lists.class_openehr',
  action() {
    BlazeLayout.render('class_openehr', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/qa_drgs', {
  name: 'Lists.qa_drgs',
  action() {
    BlazeLayout.render('qa_drgs', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/qa_hl7', {
  name: 'Lists.qa_hl7',
  action() {
    BlazeLayout.render('qa_hl7', {main: 'Lists_show_page'});
  }
});

FlowRouter.route('/qa_openehr', {
  name: 'Lists.qa_openehr',
  action() {
    BlazeLayout.render('qa_openehr', {main: 'Lists_show_page'});
  }
});