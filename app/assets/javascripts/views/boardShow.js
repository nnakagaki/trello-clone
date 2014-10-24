TrelloClone.Views.BoardShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync change", this.render)
  },
  
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

    this.$( "#sortable-list" ).sortable();
    this.$( "#sortable" ).disableSelection();
    
    return this;
  },
  
  events: {
    "click button#create-new-list": "renderCreateList",
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
    var $list = this.$("div#list-" + list_id);
    this.$("button#create-new-card").remove();
    $list.append(cardNewView.render().$el);
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