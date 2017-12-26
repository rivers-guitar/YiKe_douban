//实例一个模块，用来专门管理所有的控制器
angular.module('Controllers', [])

    .controller('DemoController', ['$scope', function ($scope) {
        console.log("启动了");

    }])

    // 导航菜单
    .controller('NavController', ['$scope', function ($scope) {
        // 导航数据
        $scope.navs = [
            {link: '#/today', text: '今日一刻', icon: 'icon-home'},
            {link: '#/older', text: '往期内容', icon: 'icon-file-empty'},
            {link: '#/author', text: '热门作者', icon: 'icon-pencil'}
        ];
    }])

    //  今日一刻
    .controller('TodayController', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
        //获取计算机时间
        var today = $filter('date')(new Date, 'yyyy-MM-dd');

        $rootScope.title = '今日一刻';
        $rootScope.index = 0;
        $rootScope.loaded = false;

        $http({
            url: './api/today.php', // 请求地址，解决跨域问题
            method: 'get',
            params: {today: today}
        }).success(function (info) {
            //note：V1.5以后的angularJS 取消了success / error
            // console.log(info);

            $rootScope.loaded = true;
            // 日期
            $scope.date = info.date;

            // 文章数据
            $scope.posts = info.posts;
        })
    }])

    // 往期内容
    .controller('OlderController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

        $rootScope.title = '往期内容';
        $rootScope.index = 1;
        $rootScope.loaded = false;

        $http({
            url: './api/older.php',
        }).success(function (info) {
            console.log(info);
            $rootScope.loaded = true;
            $scope.date = info.date;
            $scope.posts = info.posts;
        });
    }])

    // 热门作者
    .controller('AuthorController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        //
        $rootScope.index = 2;
        $rootScope.title = '热门作者';
        $rootScope.loaded = false;

        $http({
            url: './api/author.php'
        }).success(function (info) {
            console.log(info);
            $scope.rec = info.rec;
            $scope.all = info.all;
            $rootScope.loaded = true;
        })
    }])



