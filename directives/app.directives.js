/**
 * Created by kolesnikov-a on 08/09/2017.
 */

import angular from 'angular';

function toUpperDirective() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			let mayusculas = function(input) {
				input ? element.css("text-transform","uppercase") : element.css("text-transform","initial");
				return input ? input.toUpperCase() : "";
			};

			modelCtrl.$parsers.push(mayusculas);

			scope.$watch(attrs.ngModel, function(valor){
				mayusculas(valor);
			});

		}
	};
}

export default angular.module('app.directives', [])
	.directive('toupper', toUpperDirective)
	.name;