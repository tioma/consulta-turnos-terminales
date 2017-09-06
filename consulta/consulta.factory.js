/**
 * Created by kolesnikov-a on 31/07/2017.
 */

consultaTurnosApp.filter("maxLength", [function(){
	return function(text,max){
		if(text != null){
			if(text.length > max){
				return text.substring(0,max);
			}
			else
				return text;
		}
		else
			return null;
	}
}]);

consultaTurnosApp.factory('consultaTurnosSocket', ['socketFactory', 'APP_CONFIG', function(socketFactory, APP_CONFIG){
	const ioSocket = io.connect(APP_CONFIG.SOCKET_URL);

	return socketFactory({ioSocket: ioSocket});
}]);


consultaTurnosApp.factory('turnosFactory', ['$http', '$q', 'APP_CONFIG', 'Appointment', function($http, $q, APP_CONFIG, Appointment){

	class turnosFactory {

		retrieveAppointments(appointmentsData){
			return appointmentsData.map(item => (new Appointment(item)));
		}

		consultarTurno(container){
			const deferred = $q.defer();
			const inserturl = `${APP_CONFIG.SERVER_URL}/containerTurno/${container}`;
			$http.get(inserturl).then((response) => {
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
			const deferred = $q.defer();
			const inserturl = `${APP_CONFIG.SERVER_URL}/camionTurno/${patente}`;
			$http.get(inserturl).then((response) => {
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

	}

	return new turnosFactory();

}]);