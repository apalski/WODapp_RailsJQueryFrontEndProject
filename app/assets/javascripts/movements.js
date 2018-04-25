$(function(){
  $("a.load_movements").on("click", function(e) {
 	 $.ajax({
 		 url: this.href,
 		 dataType: "script"
 	 });
 	 e.preventDefault();
  });	 
});
