TrelloClone.Views.ListNew = Backbone.View.extend({
  template: JST["list_new"],

  id: "list-create",

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  events: {
    "click button#create-list": "createList",
    "keypress input#list-title": "keyPress"
  },

  keyPress: function (event) {
    if (event.charCode === 13) {
      this.createList();
    }
  },

  createList: function (event) {
    var listModel = new TrelloClone.Models.List({
      title: $("input#list-title").val(),
      board_id: this.model.id
    });

    listModel.save();
    this.model.fetch();

    $("div#list-create").remove();
  }

})