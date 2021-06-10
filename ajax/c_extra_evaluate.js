var addExtraEvaluate = function () {

    return {
		
		init: function () {		
			$.ajax({
					url: 'php/c_extra_evaluate.php',
					dataType: 'json',
					type: 'post',
					data:{
						
						},
					success: function (data) {
						
						$("#s_Course").empty();
						
						for(var i = 0; i < data.Course.length; i++){
							$("#s_Course").append(i+1);
							$("#s_Course").append(".");
							$("#s_Course").append(data.Course[i].Ex_CourseName);
							$("#s_Course").append(" ");


						}

						$("#tbdata").empty();
						var tdata = '';
						var k = 1;
						for(var i = 0; i < data.evaluation.length; i++){
							tdata += '<tr>'; 
							tdata += '<td class="fc-header-center">' + k + '</td>';  
							tdata += '<td class="fc-header-center">' + data.evaluation[i].W_Year + '(T' + data.evaluation[i].W_Term +')</td>';
							
							tdata += '<td>' + data.evaluation[i].Ex_CourseName + '</td>';
							tdata += '<td>' + data.evaluation[i].Ex_CatName + '</td>';
							tdata += '<td class="fc-header-center">' + data.evaluation[i].E_Level + '</td>';
							tdata += '<td class="fc-header-center">' + data.evaluation[i].E_Credit + '</td>';
							
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