# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list
json.(@board,:id,:title,:user_id,:created_at,:updated_at)

json.lists do
  json.array!(@board.lists) do |list|
    json.(list,:id,:title,:board_id,:ord,:created_at,:updated_at)
    json.cards do
      json.array!(list.cards) do |card|
      json.(card,:id,:title,:list_id,:description,:ord,:created_at,:updated_at)
      end
    end
  end
end


