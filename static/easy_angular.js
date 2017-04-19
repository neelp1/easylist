(function(){
    var app = angular.module("MyApp", []);

    app.controller("mainController",

    function($scope, $http) {

        // Item List Arrays
        $scope.items = [];
        // $scope.checked = [];
        // $scope.dependent = {amount:0,name:"no dependency",showMe:false,dependentOn:""};//bound to "dependent" in Angular front end
        // $scope.currentDependent = $scope.dependent;
        // $scope.show = false;

        //successfully reads json object from file
        // $http.get('post.json').success(function(data){
        //     str_data = JSON.stringify(data)
        //     parse_data = JSON.parse(str_data)
        //     arr_data = parse_data.items
        //
        //     arr_data.forEach(function(entry){
        //         $scope.items.push({
        //             amount: entry.amount,
        //             name: entry.name,
        //             showMe: entry.showMe,
        //             dependentOn: entry.dependentOn
        //         });
        //     });
        //
        //     console.log($scope.items);
        //
        // });
        $http.get('/test')
          .success(function(data){
            $scope.list = data;
            console.log(data)
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
        // Add a Item to the list
        $scope.addItem = function(){

            // $scope.currentDependent = $scope.dependent.name;

            $scope.items.push({
                // amount: $scope.itemAmount,
                name: $scope.itemName
                // showMe: false,
                // dependentOn: $scope.currentDependent
            });

            $scope.postData();

            // Clear input fields after push
            // $scope.itemAmount = "";
            // $scope.itemName = "";
            // $scope.dependent = {amount:0,name:"no dependency",showMe:false,dependentOn:""};
            // $scope.currentDependent = "";
        };

        // $scope.showMessage = function(){
        //     $scope.show = true;
        // };
        //
        // $scope.dontShowMessage = function(){
        //     $scope.show = false;
        // };
        //
        // $scope.isShow = function(){
        //     return $scope.show;
        // };
        //
        // $scope.checkBtnDisabled = function(index){
        //     if($scope.checkDependency($scope.items[index])){
        //         //console.log("button disabled");
        //         return true;
        //     }else{
        //         return false;
        //     }
        // };
        //
        // // Add Item to Checked List and delete from Unchecked List
        // // dependency must be checked before item can be checked
        // $scope.toggleChecked = function (index) {
        //     // Perform dependency check
        //     if($scope.checkDependency($scope.items[index])){
        //         console.log("exists in items");
        //     }else{
        //         $scope.checked.push($scope.items[index]);
        //         $scope.items.splice(index, 1);
        //
        //         $scope.postData();
        //     }
        // };
        //
        // // Helper function for toggleChecked
        // $scope.checkDependency = function (item){
        //     for(var i = 0; i < $scope.items.length; i++){
        //         if($scope.items[i].name === item.dependentOn){
        //             return true;
        //         }
        //     }
        //
        //     return false;
        // };
        //
        // //Lets an item to be edited
        // $scope.editItem = function(index){
        //     if($scope.items[index].showMe){
        //         $scope.items[index].showMe = false;
        //     }else{
        //         $scope.items[index].showMe = true;
        //     }
        // };
        //
        // //Item can be saved once edited
        // $scope.saveItem = function(index){
        //     if($scope.uncheckedAmount)
        //         $scope.items[index].amount = $scope.uncheckedAmount;
        //
        //     if($scope.uncheckedName)
        //         $scope.items[index].name = $scope.uncheckedName;
        //
        //     $scope.items[index].showMe = false;
        //
        //     $scope.postData();
        //
        //     // Clear input fields after push
        //     $scope.uncheckedAmount = "";
        //     $scope.uncheckedName = "";
        // };
        //
        // //POST method after stringyfy
        $scope.postData = function(){
          // var rawData = $scope.items
          // var data = JSON.stringify(rawData[0]);

          console.log("data: " + $scope.itemName);

          $http.post('http://localhost:8888/test', JSON.stringify({name:$scope.itemName}))
          .then(function(data){
            console.log("successful!");
          })
          .catch(function(err){
            console.log("post error");
          });
          //NodeJS http POST
          // $http({
          //     url: '/test',
          //     method: 'POST',
          //     data: data,
          //     header: 'Content-Type: application/json; charset=utf-8'
          // })
          // .then(function(response) {
          //   console.log(response);
          // },
          // function(response) {
          //   console.log(response);
          // });
        };
        //
        // // Get Total Items
        // $scope.getTotalItems = function () {
        //     return $scope.items.length;
        // };
        //
        // // Get Total Checked Items
        // $scope.getTotalCheckedItems = function () {
        //     return $scope.checked.length;
        // };
    });
})();
