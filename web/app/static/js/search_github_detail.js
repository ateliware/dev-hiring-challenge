$(document).ready(function () {
	$('.link-show-detail').click(function(){
		var repository_id = $(this).data("id"); 
		var url =  '/getdetail/' + repository_id;
		$.ajax({
			 url: url,
			 type: 'GET',
			 dataType: 'html',
			 success: function(data) {
				 	console.log(data);
   	      	$('.modal-body').html(data);
					$('#modal-repository-detail').modal('show');
			 },
			 error:function(request, status, error) {
				  console.log("ajax error:" + request.responseText);
			 }
		});
	});
});
