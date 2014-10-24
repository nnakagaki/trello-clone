TrelloClone.Views.BoardNew = Backbone.View.extend({
  template: JST["board_new"],
  
  id: "board-create",
  
  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  
  events: {
    "click button#create-board": "createBoard"
  },
  
  createBoard: function (event) {
    this.collection.create({title: $("input#board-title").val()})
    $("div#board-create").remove();
  }
  
})