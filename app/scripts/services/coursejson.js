'use strict';

angular.module('mooc').factory('CourseDataService', function($http,appConstants) {
	return {
		getCourseData: function(courseName) {
			return $http.get('/json-data-storage/'+courseName.toLowerCase()+'.json').then(function(response) {
				return response.data;
			});
		}
};
});
