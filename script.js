$(function(){
  var $button = $('#button');
  var $input = $('#input');
  var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  // Bind Enter key to $button
  $(window).keypress(function(e){
    if(e.keyCode==13)
    $button.click();
  });
  function changeButton(){
    $button.prop('disabled', true);
    $input.prop('disabled', true);
    $button.html('Searching...');
  }
  function buttonReset(){
    $button.prop('disabled', false);
    $input.prop('disabled', false);
    $button.html('Go!');
  }
  function loadPics(tag){
      // AJAX configuration
    var flickrOptions = {
        tags: tag,
        format: "json"
    };
    function displayPhotos(data) {
      var photoHTML;
      if (data.items.length > 0) {
        $.each(data.items,function(i,photo) {
          photoHTML =`<div class="col-md-6 col-lg-4 col-xl-3 pics-container">
                        <div class="pics">
                          <a href="${photo.link}" class="thumbnail" target="_blank">
                            <img src=${photo.media.m} alt="thumbnail">
                           </a>
                        </div>
                      </div>`;
          $('.row').append(photoHTML);
          // $('.row').hide();
          // $('.row').fadeIn();
        }); // end each
      }else{
        photoHTML = `<div class="container"><div class=" alert alert-danger" role="alert">No photos with tag "${tag}" is found</div><div>`;
        $('.row').append(photoHTML);
      }
      buttonReset();
    } 
    $('.row').empty();
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
  } 
  // load "nature" photos once window loads
  loadPics('nature');
  $button.click(function(event) {
    var keyWord = $input.val();
    changeButton();
    loadPics(keyWord);
  });
});  
  







      
      
