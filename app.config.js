/**
 * Created by kolesnikov-a on 08/09/2017.
 */

export default function routing($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
}

routing.$inject = ['$urlRouterProvider'];