angular
  .module('stockflare')
  .controller('MainController', MainController);

MainController.$inject = ['$http'];
function MainController($http){
  var self = this;
  this.stock = [];
  this.history = [];
  
  // this.ticker = "";
  // this.price = "";
  // this.name = "";
  // this.description = "";
  // this.marketHigh = "";
  // this.marketLow = "";
  // this.marketValue = "";
  // this.classification = "";

  function getSearch(){

    var stock = {
      "term": "apple",
      "select": "_all"
    }

    $http
      .put('https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/search', stock)
      .then(function(response){
        self.stock = response.data[0];
        self.price = self.stock.price;
        self.name = self.stock.long_name;
        self.ticker = self.stock.ticker;
        self.description = self.stock.description;
        self.marketHigh = self.stock.fifty_two_week_high;
        self.marketLow = self.stock.fifty_two_week_low;
        self.classification = self.stock.classification;
        self.marketValue = self.stock.market_value;
      });
    
  }

  function getInstrument() {

    var instrument = {
    "sic": "6c8227be-6855-11e4-98bf-294717b2347c"
    }

    $http
      .put('https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/instruments', instrument)
      .then(function(response){
        console.log(response);
        self.instrument = response.data[0];
    })
  }

  function getHistory() {

    var history = {
      "sic": "6c8227be-6855-11e4-98bf-294717b2347c",
      "after": 0,
      "select": ["dividends", "return_on_equity"]
    }

    $http
    .put('https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/historical', history)
    .then(function(response){
      self.history = response.data[0];
      self.dividends = self.history.dividends;
      self.roe = self.history.return_on_equity
        // self.history = response.data[0];
        // self.price = self.stock.price;


      })

  }

  getSearch();
  getHistory();
  getInstrument();

}
