/**
 * Created by kolesnikov-a on 31/07/2017.
 */
export default class TurnosConsultaCtrl {
	constructor($scope, turnosFactory, consultaTurnosSocket, dialogs, containerList, patentesList, $uibModal){
		this._$scope = $scope;
		this._dialogs = dialogs;
		this._turnosFactory = turnosFactory;
		this._$uibModal = $uibModal;

		this.containerList = containerList;
		this.patentesList = patentesList;

		this.searchBy = 'C';

		this.patenteSearch = '';
		this.containerSearch = '';

		this.turnos = [];

		this.patenteDataFlag = false;

		consultaTurnosSocket.on('cnrt', (data) => {
			$scope.patenteData = data;
			this.patenteDataFlag = true;
		})
	}

	getTurno(){
		this.patenteDataFlag = false;
		this.turnos = [];
		let promise;
		if (this.searchBy == 'C'){
			promise = this._turnosFactory.consultarTurno(this.containerSearch)
		} else {
			promise = this._turnosFactory.consultarTurnoCamion(this.patenteSearch)
		}
		promise.then((turnos) => {
			this.turnos = turnos;
		}).catch((error) => {
			this._dialogs.error('Consulta de turnos', error.message);
		});
	}

	detalleCamion(){
		this._$uibModal.open({
			template: require('./camion.detalle.modal.html'),
			scope: this._$scope
		});
	}
}

TurnosConsultaCtrl.$inject = ['$scope', 'turnosFactory', 'consultaTurnosSocket', 'dialogs', 'containersList', 'patentesList', '$uibModal'];