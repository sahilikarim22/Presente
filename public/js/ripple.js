$(document).ready(function(){
	$(document).on('click','.ripple-button', function(e){
        console.log("oasda")
      $btn = $(this);
			var $offset = $(this).offset();
      $span = $('<span/>');
			var x = e.pageX - $offset.left
			var y = e.pageY - $offset.top;
      $span.addClass('ripple-span');
			$span.css({
         top: y +'px',
         left: x +'px',
			});
      $btn.append($span);
      window.setTimeout(function() {
        $span.remove();
      },2200);
		});

});