var sTableEditable = function () {

    return {
		
		addDataToTable: function (yearIDVal) {	
			//alert(yearIDVal);	
			$.ajax({
					url: 'php/m_search_student_score.php',
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
						
						if(data.achiok == 'ok'){
						
							for(var i = 0; i < data.achi.length; i++){
								
								tdata += '<tr>'; 
								tdata += '<td class="fc-header-center">' + k + '</td>'; 
								tdata += '<td>' + data.achi[i].IB_SubjectE + '</td>';  
								
								if (isNaN(parseInt(data.achi[i].M_Achi_A))){
									tdata += '<td class="fc-header-center">' + data.achi[i].A + '</td>'; 
								}else{
									tdata += '<td class="fc-header-center">' + data.achi[i].A + ' <span class="label label-sm label-info">'+ data.achi[i].M_Achi_A +'</span></td>';
								}
								if (isNaN(parseInt(data.achi[i].M_Achi_B))){
									tdata += '<td class="fc-header-center">' + data.achi[i].B + '</td>'; 
								}else{
									tdata += '<td class="fc-header-center">' + data.achi[i].B + ' <span class="label label-sm label-info">'+ data.achi[i].M_Achi_B +'</span></td>';
								}
								if(isNaN(parseInt(data.achi[i].M_Achi_C))){
									tdata += '<td class="fc-header-center">' + data.achi[i].C + '</td>'; 
								}else{
									tdata += '<td class="fc-header-center">' + data.achi[i].C + ' <span class="label label-sm label-info">'+ data.achi[i].M_Achi_C +'</span></td>';
								}
								if (isNaN(parseInt(data.achi[i].M_Achi_D))){
									tdata += '<td class="fc-header-center">' + data.achi[i].D + '</td>'; 
								}else{
									tdata += '<td class="fc-header-center">' + data.achi[i].D + ' <span class="label label-sm label-info">'+ data.achi[i].M_Achi_D +'</span></td>';
								}
								if (isNaN(parseInt(data.achi[i].M_Level))){
									tdata += '<td class="fc-header-center"><span class="label label-sm label-success"></span></td>';
								}else{
									
									tdata += '<td class="fc-header-center"><span class="label label-sm label-success">' + data.achi[i].M_Level + '</span></td>'; 
								}
								
								//tdata += '<td class="fc-header-center"></td>';
								tdata += '</tr>';
								k = k + 1;
							}
						}else{
							for(var i = 0; i < data.achi2.length; i++){
							
								tdata += '<tr>'; 
								tdata += '<td class="fc-header-center">' + k + '</td>'; 
								tdata += '<td>' + data.achi2[i].IB_SubjectE + '</td>';  
								
								if (isNaN(parseInt(data.achi2[i].M_Achi_A))){
									tdata += '<td class="fc-header-center">-</td>'; 
								}else{
									tdata += '<td class="fc-header-center">'+ data.achi2[i].M_Achi_A +'</td>';
								}
								if (isNaN(parseInt(data.achi2[i].M_Achi_B))){
									tdata += '<td class="fc-header-center">-</td>'; 
								}else{
									tdata += '<td class="fc-header-center">'+ data.achi2[i].M_Achi_B +'</td>';
								}
								if(isNaN(parseInt(data.achi2[i].M_Achi_C))){
									tdata += '<td class="fc-header-center">-</td>'; 
								}else{
									tdata += '<td class="fc-header-center">'+ data.achi2[i].M_Achi_C +'</td>';
								}
								if (isNaN(parseInt(data.achi2[i].M_Achi_D))){
									tdata += '<td class="fc-header-center">-</td>'; 
								}else{
									tdata += '<td class="fc-header-center">'+ data.achi2[i].M_Achi_D +'</td>';
								}
								if (isNaN(parseInt(data.achi2[i].M_Level))){
									tdata += '<td class="fc-header-center"></td>';
								}else{
									
									tdata += '<td class="fc-header-center">' + data.achi2[i].M_Level + '</td>'; 
								}
								
								//tdata += '<td class="fc-header-center"></td>';
								tdata += '</tr>';
								k = k + 1;
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