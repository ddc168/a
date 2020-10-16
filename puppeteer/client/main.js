import { Template } from 'meteor/templating';

import './main.html'
import '../lib/router'
import './navbar.html'
import './navbar'
import './home.html'
import './data_page.html'
import './data_page'
import './data_site.html'
import './data_site'
import './data_doc.html'
import './data_db.html'
import './know_entity.html'
import './know_relation.html'
import './know_event.html'
import './show_drgs.html'
import './show_index.html'
import './show_hl7.html'
import './show_openehr.html'
import './class_drgs.html'
import './class_hl7.html'
import './class_openehr.html'
import './qa_drgs.html'
import './qa_hl7.html'
import './qa_openehr.html'

Site = new Mongo.Collection("site");
SiteConfig = new Mongo.Collection("siteConfig");
Slink = new Mongo.Collection("slink");
Spaper = new Mongo.Collection("spaper");
Sforum = new Mongo.Collection("sforum");
Snews = new Mongo.Collection("snews");
