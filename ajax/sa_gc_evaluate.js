var addGCEvaluate = function () {

    return {
		
		init: function (initdata) {		
			$.ajax({
					url: 'php/sa_gc_evaluate.php',
					dataType: 'json',
					type: 'post',
					data:{
						studentid:		function(){return $('#studentid1').val();},
						yearid: 		initdata
						},
					success: function (data) {
						//alert(data.reflection.length);

						$("#tbdata").empty();
						var tdata = '';
						var k = 1;
						for(var i = 0; i < data.reflection.length; i++){
							tdata += '<tr>'; 
							tdata += '<td class="fc-header-center">' + k + '</td>';  
							tdata += '<td>' + data.reflection[i].G_ActivityName + '</td>';
							
							tdata += '<td class="fc-header-center">' + data.reflection[i].G_Task + '</td>';
							tdata += '<td class="fc-header-center">' + data.reflection[i].G_Discipline + '</td>';
							tdata += '<td class="fc-header-center">' + data.reflection[i].G_Date + '</td>';
							
							tdata += '</tr>';
							k = k + 1;
						}
						
						$("#tbdata").append(tdata); 
						//alert(data.gmember.length);
						
					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },

    };

}();