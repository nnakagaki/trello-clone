TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  
  getOrFetch: function (id) {
    var model = TrelloClone.boards.get(id);
    if (model) {
      model.fetch();
    } else {
      model = new TrelloClone.Models.Board({id: id});
      model.fetch();
    }
    
    return model;
  }
})