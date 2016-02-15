angular
  .module("stockflare", ["ui.router"])
  .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "js/views/home.html"
    })
    .state('stocks', {
      url: "/:ticker",
      templateUrl: "js/views/stocks.html"
    });

  $urlRouterProvider.otherwise("/");
}