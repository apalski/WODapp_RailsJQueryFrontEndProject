$(function(){
  $("a.load_movements").on("click", function(e) {
 	 $.ajax({
 		 url: this.href,
 		 dataType: "script"
 	 });
 	 e.preventDefault();
  });	 
});

$(function(){
	$("a.load_new_movement").on("click", function(e) {
		$.ajax({
			url: this.href,
			dataType: "script"
		});
		e.preventDefault();
	});
});