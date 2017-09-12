/**
 * Created by kolesnikov-a on 31/07/2017.
 */

import io from 'socket.io-client';

function consultaTurnosSocket (socketFactory, APP_CONFIG){
	const ioSocket = io.connect(APP_CONFIG.SOCKET_URL);

	return socketFactory({ioSocket: ioSocket});
}

consultaTurnosSocket.$inject = ['socketFactory', 'APP_CONFIG'];

class TurnosFactory {
	constructor($http, $q, APP_CONFIG, Appointment){
		this._$http = $http;
		this._$q = $q;
		this._APPCONFIG = APP_CONFIG;
		this.appointmentFactory = Appointment;
	}

	retrieveAppointments(appointmentsData){
		return appointmentsData.map(item => (new this.appointmentFactory(item)));
	}

	consultarTurno(container){
		const deferred = this._$q.defer();
		const inserturl = `${this._APPCONFIG.SERVER_URL}/containerTurno/${container}`;
		this._$http.get(inserturl).then((response) => {
			if (response.data.status == 'OK'){
				if (response.data.data.length > 0){
					const turnos = this.retrieveAppointments(response.data.data);
					deferred.resolve(turnos);
				} else {
					const error = {
						message: `No se ha encontrado ningún turno para el contenedor ${container}`
					};
					deferred.reject(error);
				}
			} else {
				deferred.reject(response.data);
			}
		}).catch((error) => {
			deferred.reject(error.data);
		});
		return deferred.promise;
	}

	consultarTurnoCamion(patente){
		const deferred = this._$q.defer();
		const inserturl = `${this._APPCONFIG.SERVER_URL}/camionTurno/${patente}`;
		this._$http.get(inserturl).then((response) => {
			if (response.data.status == 'OK'){
				if (response.data.data.length > 0){
					const turnos = this.retrieveAppointments(response.data.data);
					deferred.resolve(turnos);
				} else {
					const error = {
						message: `No se ha encontrado ningún turno para el camión de patente ${patente}`
					};
					deferred.reject(error);
				}
			} else {
				deferred.reject(response.data);
			}
		}).catch((error) => {
			deferred.reject(error.data);
		});
		return deferred.promise;
	}

	static getFactory($http, $q, APP_CONFIG, Appointment){
		return new TurnosFactory($http, $q, APP_CONFIG, Appointment);
	}

}

TurnosFactory.$inject = ['$http', '$q', 'APP_CONFIG', 'Appointment'];

const factories = {
	socketFactory: consultaTurnosSocket,
	turnosFactory: TurnosFactory
};

export default factories;