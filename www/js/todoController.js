angular.module("ionicApp")
.config(function(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('ionic-todo');
})
.controller("todoController", function ($scope, $ionicModal, localStorageService) {
	$scope.tasks = [];
    var taskData = 'task';
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
    }

    $scope.closeTaskModal = function () {
        if ($scope.oldTask) {
            console.log($scope.oldTask);
            $scope.task = angular.copy($scope.oldTask);
            $scope.syncTasks();
            $scope.oldTask = null;
        }

        $scope.newTaskModal.hide();
    }

    $scope.getTasks = function () {
        //fetches task from local storage
        if (localStorageService.get(taskData)) {
            $scope.tasks = localStorageService.get(taskData);
        } else {
            $scope.tasks = [];
        }
    };

    $scope.createTask = function () {
        //creates a new task
        if ($scope.task.completed === undefined) {
            $scope.task.completed = false;
        }

        if (!$scope.task.id) {
            $scope.task.id = $scope.tasks.length + 1;
            $scope.tasks.push($scope.task);
        } else {
            angular.forEach($scope.tasks, function (task, key) {
                if (task.id === $scope.task.id) {
                    $scope.tasks[key] = angular.copy($scope.task);
                    return;
                }
            })
        }

        $scope.syncTasks();
        $scope.task = {};

        $scope.newTaskModal.hide();
    };

    $scope.removeTask = function (task) {
        //removes a task
        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
        $scope.syncTasks();
    };

    $scope.editTask = function (task) {
        $scope.modalMessages = $scope.messages.edit;
        $scope.task = angular.copy(task);
        $scope.newTaskModal.show();
    }

    $scope.syncTasks = function () {
        //updates a task as completed  
        localStorageService.set(taskData, $scope.tasks);
    };
}).filter("filterTasks", function () {
    return function (input, search) {
        var result = [];
        angular.forEach(input, function (value) {
            if (value.completed === search) {
                result.push(value);
            }
        });

        return result;
    }
});