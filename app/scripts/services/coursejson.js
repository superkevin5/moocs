'use strict';

angular.module('mooc').factory('CourseDataService', function($http) {
	return {
		getCourseData: function() {
			return $http.get('/json-data-storage/p2p-coursedata.json').then(function(response) {
				return response.data;
			});
		}
};
});
