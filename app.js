/**
 * Created by kolesnikov-a on 31/07/2017.
 */
const consultaTurnosApp = angular.module('consultaTurnosApp', ['ui.router', 'ui.bootstrap', 'btford.socket-io', 'ui-dialogs']);


consultaTurnosApp.config(['$stateProvider', '$urlRouterProvider', '$provide', 'cacheServiceProvider', function ($stateProvider, $urlRouterProvider, $provide, cacheServiceProvider) {

	const initialLoadFactory = cacheServiceProvider.$get();

	// For any unmatched url, send to /login
	//$urlRouterProvider.otherwise("/login");
	$urlRouterProvider.otherwise( function($injector, $location) {
		const $state = $injector.get("$state");
		$state.go("consultaTurnos");
	});

	//noinspection JSValidateTypes
	$stateProvider
		//=========================================================================\\
		//******************************* TURNOS **********************************\\
		//=========================================================================\\
		.state('consultaTurnos', {
			url: '/',
			templateUrl: 'consulta/consulta.html',
			controller: 'turnosConsultaCtrl as vmTurnos',
			resolve: {
				containersList: function(){ return initialLoadFactory.cargaContainersList() },
				patentesList: function(){ return initialLoadFactory.cargaPatentesList() }
			}
		})

}]);