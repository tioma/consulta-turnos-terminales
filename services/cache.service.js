/**
 * Created by kolesnikov-a on 28/07/2016.
 */
/**
 * Created by leo on 12/03/15.
 */

export default class CacheService {

	constructor($http, APP_CONFIG, $q){
		this._$http = $http;
		this._APPCONFIG = APP_CONFIG;
		this._$q = $q;
	}

	cargaContainersList(){
		const deferred = this._$q.defer();
		const inserturl = `${this._APPCONFIG.SERVER_URL}/containerTurnoList`;
		this._$http.get(inserturl).then((response) => {
			if (response.data.status == 'OK'){
				deferred.resolve(response.data.data);
			} else {
				deferred.resolve([]);
			}
		}).catch((error) => {
			deferred.resolve([]);
		});
		return deferred.promise;
	}

	cargaPatentesList(){
		const deferred = this._$q.defer();
		const inserturl = `${this._APPCONFIG.SERVER_URL}/camionTurnoList`;
		this._$http.get(inserturl).then((response) => {
			if (response.data.status == 'OK'){
				deferred.resolve(response.data.data);
			} else {
				deferred.resolve([]);
			}
		}).catch((error) => {
			deferred.resolve([]);
		});
		return deferred.promise;
	}
}

CacheService.$inject = ['$http', 'APP_CONFIG', '$q'];