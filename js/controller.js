angular
  .module('stockflare')
  .controller('MainController', MainController);

MainController.$inject = ['$http', '$state', '$stateParams'];
function MainController($http, $state, $stateParams){
  var self = this;
  self.all = [];
  self.sic = "";
  self.ticker = $stateParams.ticker;

  function getStock(){
    var stock = {
      "conditions": {
          "ticker": self.ticker
      },
      "select": "_all"
    }

    $http
      .put('https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/search/filter', stock)
      .then(function(response){
        self.all = response.data[0];
        self.sic = self.all.sic;
        getHistorical();
      });
  }

  function getHistorical(){

    var stock = {
      "sic": self.sic,
      "after": 0,
      "select": ["price", "market_value_usd"]
    }

    $http
      .put('https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/historical', stock)
      .then(function(response){
        self.graphData = response.data;
        convertData(self.graphData);
        truncate();
      });
  }

  function convertData(data){
    var prices = [];
    var labels = [];
    for (i = 0; i < 90; i++) { 
      prices.push(data[i].price);
      var date = moment.unix(data[i].updated_at).format("MMM Do YYYY");
      labels.push(date);
    }
    buildGraph(prices, labels);
  }

  function buildGraph(prices, labels){
    var ctx = $('#price-chart');
    var myChart = new Chart(ctx, {
      type: 'line',
      fontColor: '#25CED1',
      data: {
        labels: labels.reverse(),
        datasets: [{
          label: 'Price in $',
          fill: false,
          borderJoinStyle: 'miter',
          borderColor: "#25CED1",
          data: prices.reverse()
        }]
      },
      options:{
      }
    });
  }

  function truncate(){
    $('.truncate').trunk8({
      lines: 16
    });
  }

  getStock();

  $(window).resize(function(){
    truncate();
  });
}