$(function(){
  $("a.load_movements").on("click", function(e) {
 	 $.ajax({
 		 url: this.href,
 		 dataType: "script"
 	 });
 	 e.preventDefault();
  });	 

  $(".jsnext").on("click", function(e) {
	var nextId = parseInt(this.dataset.nextId) + 1;
	$.get({
		url: "/admin/movements/" + nextId + ".json",
		dataType: "script"
	});
	e.preventDefault();	
  });
});
