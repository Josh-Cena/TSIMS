var addStudentList = function () {

    return {
		
		init: function () {		
			
			
			$.ajax({
					url: 'php/cas_student_activity_evalution.php',
					dataType: 'json',
					type: 'post',
					data:{
						studentid: 	function(){return $("#select_item_student").children('option:selected').val();},
						yearid:   	function(){return $("#select_item_term").children('option:selected').val();},	
						},
					success: function (data) {
						
						$("#recorddata").empty();
						var tdata='';
						var C = 0;
						var A = 0;
						var S = 0;
						var CAS = 0;
						var RegC = 0;
					    for(var i =0; i < data.recordlist.length; i++){
								
							tdata += '<tr>';  
							tdata += '<td class="fc-header-center">' + (i + 1) + '</td>'; 
							tdata += '<td>' + data.recordlist[i].C_NameC + '</td>';
							tdata += '<td>' + data.recordlist[i].C_NameE + '</td>';
							
							if(data.recordlist[i].LeaderYes == 2){
								var leader = '社长';
							}else if(data.recordlist[i].LeaderYes == 1){
								var leader = '副社长';
							}else{
								var leader = '成员';
							}
							tdata += '<td class="fc-header-center">' + leader + '</td>';
							if(data.recordlist[i].ProjectYes == 1){
								var proj = '是';
							}else{
								var proj = '否';
							}
							
							tdata += '<td class="fc-header-center">' + proj + '</td>';
							tdata += '<td class="fc-header-center">' + data.recordlist[i].recCount + '</td>';
							tdata += '<td class="fc-header-center">' + data.recordlist[i].SumC + '</td>';
							tdata += '<td class="fc-header-center">' + data.recordlist[i].SumA + '</td>';
							tdata += '<td class="fc-header-center">' + data.recordlist[i].SumS + '</td>';
							RegC +=  parseFloat(data.recordlist[i].recCount);
							C += parseFloat(data.recordlist[i].SumC);
							A += parseFloat(data.recordlist[i].SumA);
							S += parseFloat(data.recordlist[i].SumS);
							var timeC = (parseFloat(data.recordlist[i].SumC) + parseFloat(data.recordlist[i].SumA) + parseFloat(data.recordlist[i].SumS))
							CAS += parseFloat(timeC);
							tdata += '<td class="fc-header-center">' + timeC + '</td>';
							tdata += '</tr>';
						 }
						 
						  tdata += '<tr>';  
						  tdata += '<th class="fc-header-center"></th>'; 
						  tdata += '<th class="fc-header-center">合计</th>';
						  tdata += '<th class="fc-header-center">—</th>';
						  tdata += '<th class="fc-header-center">—</th>';
						  tdata += '<th class="fc-header-center">—</th>';
						  tdata += '<th class="fc-header-center">' + RegC + '</th>';
						  tdata += '<th class="fc-header-center">' + C + '</th>';
						  tdata += '<th class="fc-header-center">' + A + '</th>';
						  tdata += '<th class="fc-header-center">' + S + '</th>';
						  tdata += '<th class="fc-header-center">' + CAS + '</th>';
						  tdata += '</tr>';
	 
						 $("#recorddata").append(tdata); 
						
						$("#reflectdata").empty();
						var tdata='';
						//alert(data.recordlist.length);

					    for(var i =0; i < data.reflelist.length; i++){
								
								tdata += '<tr>';  
								tdata += '<td class="fc-header-center">' + (i + 1) + '</td>'; 
								tdata += '<td>' + data.reflelist[i].C_Title + '</td>';
								tdata += '<td>' + data.reflelist[i].C_NameC + '</td>';
								tdata += '<td class="fc-header-center">' + data.reflelist[i].C_Date.substr(0,10) + '</td>';
								tdata += '<td class="fc-header-center">' + data.reflelist[i].C_Evaluate + '</td>';
								var LOut = '';
								if(data.reflelist[i].C_lo_1 != ''){
									LOut += '1. ';
								}
								if(data.reflelist[i].C_lo_2 != ''){
									LOut += '2. ';
								}
								if(data.reflelist[i].C_lo_3 != ''){
									LOut += '3. ';
								}
								if(data.reflelist[i].C_lo_4 != ''){
									LOut += '4. ';
								}
								if(data.reflelist[i].C_lo_5 != ''){
									LOut += '5. ';
								}
								if(data.reflelist[i].C_lo_6 != ''){
									LOut += '6. ';
								}
								if(data.reflelist[i].C_lo_7 != ''){
									LOut += '7. ';
								}
								if(data.reflelist[i].C_lo_8 != ''){
									LOut += '8. ';
								}
								
								tdata += '<td>' + LOut + '</td>';
								tdata += '</tr>';
						 }
	 
						 $("#reflectdata").append(tdata); 
						
						$("#finaltdata").empty();
						 var fdata='';

						 fdata += '<tr>'; 
						 if(data.recLevel == 0){ 
						 	 fdata += '<td class="fc-header-center">—</td>'; 
						 }else{
							 fdata += '<td class="fc-header-center">' + data.recLevel + '</td>'; 
						 }
						 if(data.refLevel == 0){ 
						 	 fdata += '<td class="fc-header-center">—</td>'; 
						 }else{
							 fdata += '<td class="fc-header-center">' + data.refLevel + '</td>'; 
						 }
						 if(data.talk == 0){ 
						 	 fdata += '<td class="fc-header-center">—</td>'; 
						 }else{
							 fdata += '<td class="fc-header-center">' + data.talk + '</td>'; 
						 }
						 fdata += '<td class="fc-header-center">' + data.final + '</td>'; 
						 fdata += '</tr>';
						 
						 $("#finaltdata").append(fdata); 
						 

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