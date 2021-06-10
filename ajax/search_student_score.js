var sTableEditable = function () {

    return {
		
		addDataToTable: function (yearIDVal) {		
			$.ajax({
					url: 'php/search_student_score.php',
					dataType: 'json',
					type: 'post',
					data:{
						//studentID: studentVal,
						yearID: yearIDVal
					},
					success: function (data) {
						//alert(data.length);
						$("#tbdata").empty();
						var tdata='';
						var k = 1;
						for(var i = 0; i < data.length; i++){
							tdata += '<tr>'; 
							tdata += '<td class="fc-header-center">' + k + '</td>';  
							tdata += '<td>' + data[i].IB_SubjectE + '</td>';
							if (data[i].Score1 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data[i].Score1 + '</td>';
								tdata += '<td class="fc-header-center">' + data[i].LScore1 + '</td>';
							}
							if (data[i].Score2 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data[i].Score2 + '</td>';
								tdata += '<td class="fc-header-center">' + data[i].LScore2 + '</td>';
							}
							if (data[i].Score3 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data[i].Score3 + '</td>';
								tdata += '<td class="fc-header-center">' + data[i].LScore3 + '</td>';
							}
							if (data[i].Score4 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data[i].Score4 + '</td>';
								tdata += '<td class="fc-header-center">' + data[i].LScore4 + '</td>';
							}
							if (data[i].Score5 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data[i].Score5 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore4 + '</td>';
							}
							//tdata += '<td class="fc-header-center"></td>';
							tdata += '</tr>';
							k = k + 1;
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