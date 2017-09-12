/**
 * Created by kolesnikov-a on 31/07/2017.
 */

import './css/bootstrap.cerulean.css';
import './css/app.css';
import './css/dialogs.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import 'angular-ui-bootstrap'; //Not prepared for Webpack
import 'angular-socket-io'; //Not prepared for Webpack

import turnosModule from './consulta';
import appFilters from './filters/app.filters.js';
import appDirectives from './directives/app.directives';
import dialogs from './services/dialogs';

import routing from './app.config';

const consultaTurnosApp = angular.module('consultaTurnosApp', [uirouter, 'ui.bootstrap', 'btford.socket-io', dialogs, turnosModule, appFilters, appDirectives])
	.config(routing);