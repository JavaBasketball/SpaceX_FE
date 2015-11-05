var app = angular.module('app', ["ngTouch", "angucomplete-alt", "infinite-scroll"]);

app.factory('fetchServer', ['$http', '$rootScope', function($http, $rootScope) {
  
 var items = [];
 busy = false;
 after ='';
 $rootScope.currentPage = 0;
 var pageSize = 4;
 nextPage = function(cb){
  if (busy) return;
  $rootScope.currentPage ++;
  // 初始化
  if($rootScope.currentPage == 1){
	  items = [];
  }
  
    busy = true;
//     var url = "http://api.reddit.com/hot?after=" + after + "&jsonp=JSON_CALLBACK";
     var url = "http://localhost:8080/SpaceX_BE/rest/SpaceXBusinessServiceImpl/selectBusinessList?keyWord=" + $rootScope.keyWord + "&jsonp=JSON_CALLBACK";
/*     $http.jsonp(url).success(function(data) {
      var item = data.data.children;
      for (var i = 0; i < item.length; i++) {
        items.push(item[i].data);
      }
      after = "t3_" + items[items.length - 1].id;
      busy = false;
      cb(items);
    });*/
     
/*     $http.jsonp(url).success(function(data) {
         var item = data.data.children;
         for (var i = 0; i < item.length; i++) {
           items.push(item[i].data);
         }
         after = "t3_" + items[items.length - 1].id;
         busy = false;
         cb(items);
       });*/
        var params = {
        		selectedName: $rootScope.selectedName,
        		currentPage:  $rootScope.currentPage,
        		pageSize: pageSize,
        		keyWord: $rootScope.keyWord
        }
     
	    $http({
		       method: 'GET',
		       url:"http://localhost:8080/SpaceX_BE/rest/SpaceXBusinessServiceImpl/selectBusinessList",
//		       data: JSON.stringify(params)
		       params: params
		      }).success(function(data){
		          busy = false;
		          for (var i = 0; i < data.length; i++) {
		              items.push(data[i]);
		            }
		          cb(items);
		    	    
		     }).error(function(data){
//		      alert("error:" + data);
		    	 //elemeAlert.add(data);
		      });
     
     
};
return nextPage
}]);

/*.controller('MainCtrl',['$scope','fetchServer',function($scope,fetchServer) {
  
  $scope.nextPage = function() {
    fetchServer(function(items){
      $scope.items=items;
    })
  };
  
}]);*/
app.controller('MainController', ['$scope', '$http', '$rootScope', 'fetchServer',
  function MainController($scope, $http, $rootScope, fetchServer) {
	
	// 设置访问url
	//$scope.remoteUrl = "http://localhost:8080/SpaceX_FE/rest/SpaceXBusinessServiceImpl/selectAutoComplete";
	
	
    $scope.remoteUrlRequestFn = function(str) {
    	$rootScope.keyWord = str;
      return {keyWord: str};
    };


    // 选中自动提示
    $scope.selectedBusiness = function(selected) {
        if (selected) {
          //window.alert('You have selected ' + selected.title);
          $rootScope.currentPage = 0;
          $rootScope.selectedName = selected.title;
          $scope.items = [];
          $scope.nextPage();
          
        } else {
          console.log('cleared');
        }
      };
    
    $scope.nextPage = function() {
    	    fetchServer(function(items){
    	      $scope.items = items;
    	    })
    	  };  
      
/*      
    $scope.people = [
      {firstName: "Daryl", surname: "Rowland", twitter: "@darylrowland", pic: "img/daryl.jpeg"},
      {firstName: "Alan", surname: "Partridge", twitter: "@alangpartridge", pic: "img/alanp.jpg"},
      {firstName: "Annie", surname: "Rowland", twitter: "@anklesannie", pic: "img/annie.jpg"}
    ];*/


/*    $scope.countrySelected9 = {name: 'Zimbabwe', code: 'ZW'};
    $scope.countrySelectedFn9 = function(selected) {
      if (selected) {
        $scope.countrySelected9 = selected.originalObject;
      } else {
        $scope.countrySelected9 = null;
      }
    }*/
/*
    $scope.selectedCountry16 = {name: 'Russia'};

    $scope.inputChanged = function(str) {
      $scope.console10 = str;
    }*/

/*    $scope.focusState = 'None';
    $scope.focusIn = function() {
      var focusInputElem = document.getElementById('ex12_value');
      $scope.focusState = 'In';
      focusInputElem.classList.remove('small-input');
    }
    $scope.focusOut = function() {
      var focusInputElem = document.getElementById('ex12_value');
      $scope.focusState = 'Out';
      focusInputElem.classList.add('small-input');
    }*/

    /***
     * Send a broadcast to the directive in order to clear itself
     * if an id parameter is given only this ancucomplete is cleared
     * @param id
     */
    $scope.clearInput = function (id) {
      if (id) {
        $scope.$broadcast('angucomplete-alt:clearInput', id);
      }
      else{
        $scope.$broadcast('angucomplete-alt:clearInput');
      }
    }

    /***
     * Send a broadcast to the directive in order to change itself
     * if an id parameter is given only this ancucomplete is changed
     * @param id
     */
    $scope.changeInput = function (id) {
      if (id) {
        var pos = Math.floor(Math.random() * ($scope.countries.length - 1));
        $scope.$broadcast('angucomplete-alt:changeInput', id, $scope.countries[pos]);
      }
    }

    $scope.disableInput = true;

    $scope.requireExample8a = true;
    $scope.requireExample8b = true;
  }
]);
