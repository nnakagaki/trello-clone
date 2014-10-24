TrelloClone.Views.BoardNew = Backbone.View.extend({
  template: JST["board_new"],

  id: "board-create",

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  events: {
    "click button#create-board": "createBoard",
    "keypress input#board-title": "keyPress"
  },

  keyPress: function (event) {
    if (event.charCode === 13) {
      this.createBoard();
    }
  },

  createBoard: function (event) {
    var model = this.collection.create({title: $("input#board-title").val()},{
      success: function (resp) {
        Backbone.history.navigate("#/boards/" + resp.id);
      }
    })
    $("div#board-create").remove();
  }

})