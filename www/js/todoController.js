(function(angular) {
	angular.module("ionicApp")
	.config(function(localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix('ionic-todo');
	})
	.factory("todoFactory", ["localStorageService", function(localStorageService) {
		var tasks = [],
			taskData = 'task';;
		
		/**
		 * @description initializes the task array with data from local storage
		 */
		function init() {
			//fetches task from local storage
			if (localStorageService.get(taskData)) {
				tasks = localStorageService.get(taskData);
			} else {
				tasks = [];
			}
		}
		
		/**
		 * @param {object} task task to add/update
		 * @description Adds a task to the todo object
		 */
		function addTask(task) {
			var found = false;
			
			// initialize completed
			if (task.completed === undefined) {
				task.completed = false;
			}

			// initialize id
			if (!task.id) {
				task.id = tasks.length + 1;
			}
			
			// check if task already exists
			angular.forEach(tasks, function(t, key) {
				if(t.id === task.id) {
					tasks[key] = task;
					found = true;
				}
			})
			
			// add to the list if isn't found
			if(!found) {
				tasks.push(task);
			}
			
			syncTasks();
		}
		
		/**
		 * Gets a list of tasks
		 * @return {object} completed and todo tasks
		 */
		function getTasks() {
			if(tasks || tasks.length == 0) {
				init();
			}
			
			return {
				completed: getCompletedTasks(),
				todo: getTodoTasks()
			};
		}
		
		/**  
		 * @param {object} tasks task to remove
		 * @description removes a task from the list
		*/
		function removeTask(task) {
			tasks.splice(tasks.indexOf(task), 1);
			
			syncTasks();
		}
		
		/**
		 * @description gets a list of completed tasks
		 * @return {array} completed tasks
		 */
		function getCompletedTasks() {
			var completedTasks = [];
			angular.forEach(tasks, function(task) {
				if(task.completed) {
					completedTasks.push(task);
				}
			});
			
			return completedTasks;
		}
		
		/**
		 * @description gets a list of tasks that haven't been completed
		 * @return {array} tasks that haven't been completed
		 */
		function getTodoTasks() {
			var todoTasks = [];
			
			angular.forEach(tasks, function(task) {
				if(!task.completed) {
					todoTasks.push(task);
				}
			});
			
			return todoTasks;
		}
		
		/**
		 * Syncs tasks to localstorage 
		 */
		function syncTasks() {
			localStorageService.set(taskData, tasks);
		}
		
		return {
			init: init,
			addTask: addTask,
			getTasks: getTasks,
			removeTask: removeTask,
			syncTasks: syncTasks
		}
	}])
	.controller("todoController", ["$scope", "$ionicModal", "todoFactory", function ($scope, $ionicModal, todoFactory) {
		$scope.tasks = todoFactory.getTasks();
		
		$scope.task = {};

		$scope.messages = {
			create: {
				title: "Create a new Task",
				submit: "Create a new Task"
			},
			edit: {
				title: "Edit Task",
				submit: "Update Task"
			}
		}

		$scope.modalMessages = {
			title: $scope.messages.create,
			submit: $scope.messages.createButton
		}

		$ionicModal.fromTemplateUrl('new-task-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.newTaskModal = modal;
		});

		$scope.openTaskModal = function () {
			$scope.modalMessages = $scope.messages.create;
			$scope.task = {};
			$scope.newTaskModal.show();
		};
		
		$scope.closeTaskModal = function() {
			$scope.newTaskModal.hide();
		};
		
		$scope.createTask = function () {
			//creates a new task
			todoFactory.addTask($scope.task);
			$scope.task = {};

			$scope.newTaskModal.hide();
			$scope.tasks = todoFactory.getTasks();
		};

		/**
		 * @param {object} task task to remove
		 * @description removes a task
		 */
		$scope.removeTask = function (task) {
			//removes a task
			todoFactory.removeTask(task);
			$scope.tasks = todoFactory.getTasks();
		};

		/**
		 * @param {object} task task being editted
		 * @description sets up a task to be editted
		 */
		$scope.editTask = function (task) {
			$scope.modalMessages = $scope.messages.edit;
			$scope.task = angular.copy(task);
			$scope.newTaskModal.show();
		}
		
		/**
		 * @param {object} task task to complete
		 * @description completes a task
		 */
		$scope.completeTask = function(task) {
			todoFactory.addTask(task);
			$scope.tasks = todoFactory.getTasks();	
		}
	}]);
})(angular);