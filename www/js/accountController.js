angular.module("ionicApp")
	.factory("accountService", ["localStorageService", function (localStorageService) {
		// get/set account info
		// authentication
		// list of users
		var userList;

		function getUser(userId) {
			if(!userList) {
				userList = localStorageService.get("user-list") || [];
			}
			
			if (userList[userId]) {
				return angular.copy(userList[userId] || {});
			};

			return {};
		};

		function updateUser(userId, model) {
			userList[userId] = model;
			syncTasks();
		};
		
		/**
		 * Syncs tasks to localstorage 
		 */
		function syncTasks() {
			localStorageService.set("user-list", userList);
		}

		return {
			getUser: getUser,
			updateUser: updateUser
		}
	}])
	.controller("accountController", ["$scope", "$ionicHistory", "accountService", function ($scope, $ionicHistory, accountService) {
		$scope.myGoBack = function () {
			$ionicHistory.goBack();
		};

		$scope.saveChanges = function () {
			accountService.updateUser('1', angular.copy($scope.person));

			$ionicHistory.goBack();
		};

		$scope.cancelChanges = function () {
			$scope.person = {};
			$ionicHistory.goBack();
		};

		$scope.$on("$ionicView.enter", function (test) {
			console.log(test);
			//Here your view content is fully loaded !!
			$scope.person = accountService.getUser('1');
		});
	}]);