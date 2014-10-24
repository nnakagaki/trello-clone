TrelloClone.Views.CardNew = Backbone.View.extend({
  initialize: function (options) {
    this.list_id = options.list_id;
  },

  id: "card-create",

  template: JST["card_new"],
  render: function () {
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  events: {
    "click button#create-card": "createCard",
    "keypress textarea#card-title": "keyPress"
  },

  keyPress: function (event) {
    if (event.charCode === 13) {
      this.createCard();
    }
  },

  createCard: function (event) {
    if ($("textarea#card-title").val() !== "") {
      var newCard = new TrelloClone.Models.Card({
        list_id: this.list_id,
        title: $("textarea#card-title").val()
      });

      newCard.save();
      this.model.fetch();

      $("div#card-create").remove();
    }
  }
})