TrelloClone.Views.BoardShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    $("body").removeClass().addClass("board-show");
  },

  id: "board-show",

  template: JST["board_show"],
  render: function () {
    var content = this.template({
      title: this.model.get("title"),
      lists: this.model.get("lists")
    });
    //pass model
    this.$el.html(content)

    var searchableString = "";
    var currLists = this.model.get("lists");

    if (currLists) {
      currLists.forEach(function (list) {
        searchableString += "#sortable-" + list.id + ","
      });
    }

    this.$( searchableString.substring(0, searchableString.length - 1) ).sortable({
      connectWith: ".connectedSortable",
      placeholder: "ui-state-highlight"
    }).disableSelection();

    $( "#sortable-list" ).sortable({
      placeholder: "ui-state-highlight"
    })
    $( "#sortable" ).disableSelection();

    return this;
  },

  events: {
    "click button#create-new-list": "renderCreateList",
    "dblclick div#for-dblclick": "renderCreateList2",
    "click button#delete-list": "deleteList",
    "click button#create-new-card": "renderCreateCard",
    "click button#delete-card": "deleteCard",
    "mouseover div.card": "showDeleteButton",
    "mouseout div.card": "hideDeleteButton",
    "mouseover button.text#create-new-list": "addOpacity",
    "mouseout button.text#create-new-list": "removeOpacity"
  },

  renderCreateList: function (event) {
    var listNewView = new TrelloClone.Views.ListNew({
      model: this.model
    });
    var $insert = $("div#create-list-location");
    $insert.addClass("active")
    this.$("button#create-new-list").remove();
    $insert.append(listNewView.render().$el);
    $("input#list-title").focus();
  },

  renderCreateList2: function (event) {
    if (event.target === $("div#for-dblclick")[0]) {
      $("div#dblclick-event").remove();
      $("body").append("<div id='dblclick-event' style='top:" + event.offsetY + "px; left:" + event.offsetX + "px;'><h1>Add List</h1><hr><label for='list-title'></label><input type='text' id='list-title' placeholder='List'><button id='create-list'>Add</button></div>");
      $("div#dblclick-event input#list-title").focus();

      var that = this;

      $("div#dblclick-event button#create-list").on("click", function (event) {
        var listModel = new TrelloClone.Models.List({
          title: $("input#list-title").val(),
          board_id: that.model.id
        });

        listModel.save();
        that.model.fetch();

        $("div#dblclick-event").remove();
      });

      $("div#dblclick-event input#list-title").on("keypress", function (event) {
        if (event.charCode === 13) {
          var listModel = new TrelloClone.Models.List({
            title: $("input#list-title").val(),
            board_id: that.model.id
          });

          listModel.save();
          that.model.fetch();

          $("div#dblclick-event").remove();
        }
      });
    }
  },

  deleteList: function (event) {
    var id = $(event.currentTarget).data("id");

    var listToDelete = new TrelloClone.Models.List({id: id, board_id: this.model.id});

    listToDelete.destroy();
    this.model.fetch();
  },

  renderCreateCard: function (event) {
    var list_id = $(event.currentTarget).data("id")

    var cardNewView = new TrelloClone.Views.CardNew({
      list_id: list_id,
      model: this.model
    });

    $("div#card-create").remove();

    var $list = this.$("div#list-" + list_id);
    $list.append(cardNewView.render().$el);
    $("textarea#card-title").focus();
  },

  deleteCard: function (event) {
    var cardID = $(event.currentTarget).data("card-id");
    var listID = $(event.currentTarget).data("list-id")

    var cardToDelete = new TrelloClone.Models.Card({id: cardID, list_id: listID});

    cardToDelete.destroy();
    this.model.fetch();
  },

  showDeleteButton: function (event) {
    $(event.currentTarget).find("button#delete-card").addClass("active");
  },

  hideDeleteButton: function (event) {
    $(event.currentTarget).find("button#delete-card").removeClass("active");
  },

  addOpacity: function (event) {
    $("button.not-text#create-new-list").css("opacity", 0.5);
  },

  removeOpacity: function (event) {
    $("button.not-text#create-new-list").css("opacity", 0.2);
  }
})