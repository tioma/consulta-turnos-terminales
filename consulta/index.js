/**
 * Created by kolesnikov-a on 08/09/2017.
 */

import angular from 'angular';
import uirouter from 'angular-ui-router';

import 'angular-ui-bootstrap';

import APP_CONFIG from '../config.development';
import routing from './consulta.routing';

import TurnosConsultaCtrl from './consulta.controller';
import CacheService from '../services/cache.service';
import factories from './consulta.factory';
import AppointmentFactory from './appointment.class';

export default angular.module('consulta.turnos', [uirouter, 'ui.bootstrap'])
	.config(routing)
	.constant('APP_CONFIG', APP_CONFIG)
	.service('cacheService', CacheService)
	.factory('Appointment', AppointmentFactory)
	.factory('consultaTurnosSocket', factories.socketFactory)
	.factory('turnosFactory', factories.turnosFactory.getFactory)
	.controller('turnosConsultaCtrl', TurnosConsultaCtrl)
	.name;