'use strict';

angular.module('mooc').factory('CourseDataService', function($http,appConstants) {
	return {
		getCourseData: function(courseName) {
			return $http.get('https://cc3948027cc783f6aae60587c570b1b52afa7eec.googledrive.com/host/0B5lCcvQYS1mRZ3Bsd05KcUFGTE0/json-data-storage/'+courseName.toLowerCase()+'.json').then(function(response) {
				return response.data;
			});
		}
};
});
