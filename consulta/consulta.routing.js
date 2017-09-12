/**
 * Created by kolesnikov-a on 08/09/2017.
 */

export default function routes($stateProvider, cacheServiceProvider) {
	const initialLoadFactory = cacheServiceProvider.$get();

	$stateProvider
	//=========================================================================\\
	//******************************* TURNOS **********************************\\
	//=========================================================================\\
		.state('consultaTurnos', {
			url: '/',
			template: require('./consulta.html'),
			controller: 'turnosConsultaCtrl as vmTurnos',
			resolve: {
				containersList: function(){ return initialLoadFactory.cargaContainersList() },
				patentesList: function(){ return initialLoadFactory.cargaPatentesList() }
			}
		})
}

routes.$inject = ['$stateProvider', 'cacheServiceProvider'];