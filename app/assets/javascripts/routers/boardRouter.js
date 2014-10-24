TrelloClone.Routers.Board = Backbone.Router.extend({
  initialize: function (options) {
    this.$main = options.$main;
  },
  
  routes: {
    "": "homePage",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow"
  },
  
  homePage: function () {
    TrelloClone.boards.fetch();
    var boardIndexView = new TrelloClone.Views.BoardIndex({
      collection: TrelloClone.boards
    });
    
    this.$main.html(boardIndexView.render().$el);
  },
  
  boardsNew: function () {
    var boardNewView = new TrelloClone.Views.BoardNew({
      collection: TrelloClone.boards
    });
    
    this.$main.html(boardNewView.render().$el);
  },
  
  boardsShow: function (id) {
    var boardShowView = new TrelloClone.Views.BoardShow({
      model: TrelloClone.boards.getOrFetch(id)
    });
    
    this.$main.html(boardShowView.render().$el)
  }
  
})