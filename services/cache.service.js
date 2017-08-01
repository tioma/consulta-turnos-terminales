/**
 * Created by kolesnikov-a on 28/07/2016.
 */
/**
 * Created by leo on 12/03/15.
 */
consultaTurnosApp.service('cacheService', ['$http', 'APP_CONFIG', '$q',
    function ($http, APP_CONFIG, $q) {

        //Se encarga de asegurarse de que antes de cargar cada vista, esta tenga los datos necesarios para funcionar, si no están hace las llamadas y los guarda en caché
        //No devuelve datos.
        //Siempre devuelve el resolve para no entorpecer la operatoria, ya que por lo general son datos accesorios, y errores en las cargas en definitiva significarían
        //algún problema con el servidor

        class cacheService {

            cargaContainersList(){
                const deferred = $q.defer();
				const inserturl = `${APP_CONFIG.SERVER_URL}/containerTurnoList`;
				$http.get(inserturl).then((response) => {
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
				const deferred = $q.defer();
				const inserturl = `${APP_CONFIG.SERVER_URL}/camionTurnoList`;
				$http.get(inserturl).then((response) => {
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

        return new cacheService();
    }]);