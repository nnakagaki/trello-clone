TrelloClone.Views.BoardIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },
  
  id: "board-index",
  
  template: JST["board_index"],
  
  render: function () {
    var context = this.template({boards: this.collection});
    this.$el.html(context);
    return this;
  },
  
  events: {
    "click button#create-new-board": "renderCreateBoard",
    "click button#delete-board": "deleteBoard"
  },
  
  renderCreateBoard: function (event) {
    var boardNewView = new TrelloClone.Views.BoardNew({
      collection: this.collection
    });
    var $main = $("div#main");
    $("button#create-new-board").remove();
    $main.append(boardNewView.render().$el);
  },
  
  deleteBoard: function (event) {
    var id = $(event.currentTarget).data("id");
    var model = this.collection.get(id).destroy();
    this.collection.remove(model);
  }
})