// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic', 'LocalStorageModule', 'helpers'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.
			state('menu', {
				url: "/nav",
				abstract: true,
				templateUrl: "templates/menu.html"
				})
			.state("menu.home", {
				url: "/home",
				views: {
					'menuContent': {
						templateUrl: "templates/home.html"
					}
				}
			})
			.state("menu.todo", {
				url: "/todo",
				views: {
					"menuContent": {
						templateUrl: "templates/todo.html",
						controller: "todoController"
					}
				}
			})
			.state("menu.other", {
				url: "/other",
				views: {
					"menuContent": {
						templateUrl: "templates/other.html",
						controller: "otherController"
					}
				}
			}).state("menu.profile", { // page for practice designing a page. Ability to edit (use of forms). Maybe Authentication
				url: "/profile",
				views: {
					"menuContent": {
						templateUrl: "templates/profile.html",
						controller: "accountController"
					}
				}
			}).state("menu.products", { // Page with grids and bottom navigation
				url: "/products",
				views: {
					"menuContent": {
						templateUrl: "templates/products.html",
						controller: "productController"
					}
				}
			}).state("menu.settings", {
				url: "/settings",
				views: {
					"menuContent": {
						templateUrl: "templates/settings.html",
						controller: "settingsController"
					}
				}
			}).state("menu.profileEdit", {
				url: "/profile/edit",
				views: {
					"menuContent": {
						templateUrl: "templates/editProfile.html",
						controller: "accountController"
					}
				}
			});

		$urlRouterProvider.otherwise("/nav/profile");
	})
	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})
	.controller("mainController", function ($scope, $ionicSideMenuDelegate) {
		$scope.toggleLeft = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};
		
		/*$scope.person = {
			firstName: "First",
			lastName: "Last",
			fullName: "First Last",
			telephone: "1234567890",
			email: "test@email.com",
			username: "test@email.com",
			fax: "1234567890"
		};*/
	});