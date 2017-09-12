/**
 * Created by kolesnikov-a on 08/09/2017.
 */

import angular from 'angular';

function maxLengthFilter(){
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
}

export default angular.module('app.filters', [])
	.filter('maxLength', maxLengthFilter)
	.name;