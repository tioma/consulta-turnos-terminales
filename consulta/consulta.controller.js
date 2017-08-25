/**
 * Created by kolesnikov-a on 31/07/2017.
 */
consultaTurnosApp.controller('turnosConsultaCtrl', ['$scope', 'turnosFactory', 'consultaTurnosSocket', 'dialogs', 'containersList', 'patentesList', '$uibModal',
	function($scope, turnosFactory, consultaTurnosSocket, dialogs, containersList, patentesList, $uibModal){

		this.containersList = containersList;
		this.patentesList = patentesList;

		this.searchBy = 'C';

		this.patenteSearch = '';
		this.containerSearch = '';

		this.turnos = [];

		this.patenteDataFlag = false;

		this.getTurno = () => {
			this.patenteDataFlag = false;
			this.turnos = [];
			let promise;
			if (this.searchBy == 'C'){
				promise = turnosFactory.consultarTurno(this.containerSearch)
			} else {
				promise = turnosFactory.consultarTurnoCamion(this.patenteSearch)
			}
			promise.then((turnos) => {
				this.turnos = turnos;
			}).catch((error) => {
				dialogs.error('Consulta de turnos', error.message);
			});
		};

		this.detalleCamion = () => {
			$uibModal.open({
				templateUrl: 'consulta/camion.detalle.modal.html',
				scope: $scope
			});
		};

		consultaTurnosSocket.on('cnrt', (data) => {
			$scope.patenteData = data;
			this.patenteDataFlag = true;
		})

	}]);

consultaTurnosApp.directive('toupper', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			var mayusculas = function(input) {
				input ? element.css("text-transform","uppercase") : element.css("text-transform","initial");
				return input ? input.toUpperCase() : "";
			};

			modelCtrl.$parsers.push(mayusculas);

			scope.$watch(attrs.ngModel, function(valor){
				mayusculas(valor);
			});

			//mayusculas();
		}
	};
});