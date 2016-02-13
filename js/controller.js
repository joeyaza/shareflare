angular
  .module('stockflare')
  .controller('MainController', MainController);

MainController.$inject = ['$http'];
function MainController($http){
  var self = this;
  this.all = [];
  
  this.ticker = "";
  this.price = "";
  this.name = "";
  this.description = "";
  this.marketHigh = "";
  this.marketLow = "";
  this.marketValue = "";
  this.classification = "";

  function getStocks(){

    var stock = {
      "term": "citigroup",
      "select": "_all"
    }

    $http
      .put('https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/search', stock)
      .then(function(response){
        console.log(response);
        self.all = response.data[0];
        self.price = self.all.price;
        self.name = self.all.long_name;
        self.ticker = self.all.ticker;
        self.description = self.all.description;
        self.marketHigh = self.all.fifty_two_week_high;
        self.marketLow = self.all.fifty_two_week_low;
        self.classification = self.all.classification;
        self.marketValue = self.all.market_value;
      });
    
  }

  getStocks();

}