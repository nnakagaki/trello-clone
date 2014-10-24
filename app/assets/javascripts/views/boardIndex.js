TrelloClone.Views.BoardIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render);
    $("body").removeClass().addClass("board-index");
  },

  id: "board-index",

  template: JST["board_index"],

  render: function () {
    var context = this.template({boards: this.collection});
    this.$el.html(context);
    return this;
  },

  events: {
    "click li.jump-to": "jumpToBoard",
    "click li#create": "renderCreateBoard",
    "click button#delete-board": "deleteBoard"
  },

  jumpToBoard: function (event) {
    console.log(event)
    var id = event.currentTarget.id
    Backbone.history.navigate("#/boards/" + id)
  },

  renderCreateBoard: function (event) {
    var boardNewView = new TrelloClone.Views.BoardNew({
      collection: this.collection
    });
    var $main = $("div#board-index");
    $("li#create").remove();
    $main.append(boardNewView.render().$el);
    $("input#board-title").focus();
  },

  deleteBoard: function (event) {
    var id = $(event.currentTarget).data("id");
    var model = this.collection.get(id).destroy();
    this.collection.remove(model);
  }
})