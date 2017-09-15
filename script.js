const findUser = (data, query) => {
  return data.find(user => {
    return user.FirstName === query.FirstName &&
      user.LastName === query.LastName;
  });
};

// Code goes here
$(document).ready(function(){

 $.ajaxSetup({ cache: false });
 $('#search').keyup(function(){
  $('#result').html('');
  $('#state').val('');
  var searchField = $('#search').val();
  var expression = new RegExp(searchField, "i");
  $.getJSON('salzburg.json', function(data) {
   $.each(data, function(key, value){
    if (value.FirstName.search(expression) != -1 || value.LastName.search(expression) != -1)
    {
     $('#result').append('<li class="list-group-item link-class"><img src="https://github.com/uzotex/salzburgProject/blob/master/SAG_bullet_icon.png?raw=true" height="40" width="40" /> '+value.FirstName+' <span class="text-muted">'+value.LastName+'</span></li>');
    }
  });   
  });
  }); 
 
 $('#result').on('click', 'li', function() {
 var click_text = $(this).text().split('|');
  $('#search').val($.trim(click_text[0]));
 $("#result").html('');
 });

 $("#submit").on("click", function() {
  
   const searchInfo = $('#search').val();
   const searchInfoArray = searchInfo.split(' ');
   let searchQuery = {
     FirstName: searchInfoArray[0],
     LastName: searchInfoArray[1],
   };
   
    $('html, body').animate({scrollTop:
    $("#contactInfo").offset().top}, 5);
   
   console.log(searchInfoArray, searchQuery);
    $.getJSON("salzburg.json", function(json) {
      let html = "";
      const result = findUser(json, searchQuery);
      html += ` <br/><br/><br/>
      <div class=row>
      <div class=" col-xs-1 "></div>
      <div class="col-xs-3 sag-image text-right"><img class="img-responsive img-circle" src="${result.image}"> </div>
      <div class=" col-xs-3 "></div>
      <div class="col-xs-3 bg-callimage">
      <p id="name">${result.FirstName} ${result.LastName} </p>
      <p id="phone">${result.MobilePhone} </p>
      <button></button>
     </div> 
     </div>`;
      $('#contactInfo').html(html);
});
      
       
      
    });
   
  });

   
 