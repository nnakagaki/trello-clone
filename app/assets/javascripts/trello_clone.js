window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TrelloClone.boards = new TrelloClone.Collections.Boards();
    new TrelloClone.Routers.Board({$main: $("div#main")});
    TrelloClone.boards.fetch();
    Backbone.history.start();
  }
};

$(document).ready(function () {
  TrelloClone.initialize();
})
