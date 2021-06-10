var tTableEditable = function () {

    return {
		
		addDataToTable: function (yData) {		
			$.ajax({
					url: 'php/school_student_timetable.php',
					dataType: 'json',
					type: 'post',
					data:{
						timetableType:	'teachertb',
						yearID: 		yData
					},
					success: function (data) {
						 
						 //$("#div_timetable_year").empty();
						 //var actrecord = '<i class="fa fa-coffee"></i>School Timetable (' + data[0][0] + ')';
						 //$("#div_timetable_year").append(actrecord);
						 
						 $("#tbdata").empty();
						 var tdata='';
						 var k = 1;
						 for(var i = 1; i < 11; i++){
							//alert(k);
							if(i == 5){
								tdata += '<tr><td colspan="6"></td></tr>';
							}else{
								tdata += '<tr>'; 
								tdata += '<td class="fc-header-center">' + k + '</td>';  
								tdata += '<td class="fc-header-center">' + data[k][1] + '</td>';
								tdata += '<td class="fc-header-center">' + data[k][2] + '</td>';
								tdata += '<td class="fc-header-center">' + data[k][3] + '</td>';
								tdata += '<td class="fc-header-center">' + data[k][4] + '</td>';
								tdata += '<td class="fc-header-center">' + data[k][5] + '</td>'; 
								tdata += '</tr>';
								k += 1;
							}
						 }
						 $("#tbdata").append(tdata); 
					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        }

    };

}();