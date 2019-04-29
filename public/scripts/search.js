$(document).ready(function() {
  const userSearch = req.params.get('search-text');

//search functionality
  $(() => {
  $('.search_button').on('click', function() {
    let searchInput = $('search-text').val();
    if (searchInput.length === 0) {
      return;
    }
    $('#search-bar').submit();
  });

//recieve search json result

$.get(`/:searchQuery/${userSearch}`, function(searchResults) {
    renderSearchLinks(searchResults);
  });


// render search links function//
  function renderSearchLinks(searchData) {
    for (let i = 0; i < searchData.length; i++) {
      //what is i + 970?
      $(".search_container").prepend(searchData[i], (i + 970));
    }


}

});









// id=search-bar  id of the search bar
// name=saerch-text (input field)
// class .search_button for search button
