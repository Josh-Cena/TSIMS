var sTableEditable = function () {

    return {
		
		addDataToTable: function (yearIDVal) {
			$.ajax({
					url: 'php/myp_search_student_progress_report.php',
					dataType: 'json',
					type: 'post',
					data:{
						//studentID: studentVal,
						yearID: yearIDVal
					},
					success: function (data) {

						$("#s_yearterm").empty();
						var termData =  data.yearTerm ;
						$("#s_yearterm").append(termData);
						
						/**
						$("#ul_student").empty();
						var studentData = '<li> ' + data.studentNo  + '</li>';
						studentData += '<li>' + data.sName + '(' + data.sNickname +')</li>';
						$("#ul_student").append(studentData);
						
						$("#ul_class").empty();
						var classData = '<li> ' + data.Dept + data.Grade + "(" + data.Class + ')</li>';
						classData += '<li>Form Teacher:' + data.tName + '</li>';
						$("#ul_class").append(classData);
						**/
						
						$("#tbdata").empty();
						var tdata='';
						var k = 1;
						var total=0;
						
						for(var i = 0; i < data.scoreData.length; i++){
							var total2 = 0;
							tdata += '<tr>'; 
							tdata += '<td class="fc-header-center">' + k + '</td>';  
							tdata += '<td>' + data.scoreData[i].IB_SubjectE + '</td>';
							if (data.scoreData[i].M_Achi_A == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].M_Achi_A + '</td>';
								total2 +=  Number(data.scoreData[i].M_Achi_A);
							}
							if (data.scoreData[i].M_Achi_B == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].M_Achi_B + '</td>';
								total2 +=  Number(data.scoreData[i].M_Achi_B);
							}
							if (data.scoreData[i].M_Achi_C == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].M_Achi_C + '</td>';
								total2 +=  Number(data.scoreData[i].M_Achi_C);
							}
							if (data.scoreData[i].M_Achi_D == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].M_Achi_D + '</td>';
								total2 +=  Number(data.scoreData[i].M_Achi_D);
							}
							if (isNaN(total2)){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + total2 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore4 + '</td>';
							}
							
							if (data.scoreData[i].M_Level == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].M_Level + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore4 + '</td>';
							}
							
							tdata += '</tr>';
							
							if(!isNaN(data.scoreData[i].M_Level)){
							   total += Number(data.scoreData[i].M_Level);
							}
							k = k + 1;
						}
						tdata += '</tr><td colspan="9">Total:&nbsp  ' + total + '</td></tr>';
						$("#tbdata").append(tdata);
						//alert(data.length); 
						
						$("#asstbdata").empty();
						var assdata='';
						var k = 1;
						
						for(var i = 0; i < data.subjAss.length; i++){
							assdata += '<tr>'; 
							assdata += '<td class="fc-header-center">' + k + '</td>';  
							assdata += '<td>' + data.subjAss[i].IB_SubjectE + '</td>';
							if (data.subjAss[i].M_Participation == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].M_Participation + '</td>';
							}
							if (data.subjAss[i].M_Discipline == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].M_Discipline + '</td>';
							}
							if (data.subjAss[i].M_Assignment == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].M_Assignment + '</td>';
							}
							if (data.subjAss[i].M_Quality == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].M_Quality + '</td>';
							}
							if (data.subjAss[i].M_Teamwork == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].M_Teamwork + '</td>';
							}
							if (data.subjAss[i].M_Efforts == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].M_Efforts + '</td>';
							}
							
							assdata += '</tr>';
							k = k + 1;
						}
						$("#asstbdata").append(assdata);
						
						
						$("#castbdata").empty();
						var casdata='';
						
						casdata += '<tr>'; 
						if (data.saitems == '0'){
							casdata += '<td class="fc-header-center">NA</td>';
						}else{
							casdata += '<td class="fc-header-center">' + data.saitems + '</td>';
						}
						if (data.satimes == '0'){
							casdata += '<td class="fc-header-center">NA</td>';
						}else{
							casdata += '<td class="fc-header-center">' + data.satimes + '</td>';
						}
						if (data.salevel == '0'){
							casdata += '<td class="fc-header-center">NA</td>';
						}else{
							casdata += '<td class="fc-header-center">' + data.salevel + '</td>';
						}

						casdata += '</tr>';
						$("#castbdata").append(casdata);
						
						$("#attetbdata").empty();
						var attdata='';
						for(var i = 0; i < data.sAttendance.length; i++){
							attdata += '<tr>'; 
							
							if (data.sAttendance[i].S_SpecialLeave == ''){
								attdata += '<td class="fc-header-center">NA</td>';
							}else{
								attdata += '<td class="fc-header-center">' + data.sAttendance[i].SpecialLeave + '</td>';
							}
							if (data.sAttendance[i].S_Sickleave == ''){
								attdata += '<td class="fc-header-center">NA</td>';
							}else{
								attdata += '<td class="fc-header-center">' + data.sAttendance[i].SickLeave + '</td>';
							}
							if (data.sAttendance[i].S_Lateness == ''){
								attdata += '<td class="fc-header-center">NA</td>';
							}else{
								attdata += '<td class="fc-header-center">' + data.sAttendance[i].Lateness + '</td>';
							}
							attdata += '</tr>';
						}
						$("#attetbdata").append(attdata);
						
						$("#toktbdata").empty();
						var tokdata = '<tr>';
						if (data.gcAss1 == ''){
							tokdata += '<td class="fc-header-center">NA</td>';
							
						}else{
							tokdata += '<td class="fc-header-center">' + data.gcAss1 + '</td>';
							
						}
						if (data.gcAss2 == ''){
							tokdata += '<td class="fc-header-center">NA</td>';
							
						}else{
							
							tokdata += '<td class="fc-header-center">' + data.gcAss2 + '</td>';
						}
						tokdata += '</tr>';
						$("#toktbdata").append(tokdata);
						
						$("#p_awards").empty();
						var awardsData = data.sAwards;
						$("#p_awards").append(awardsData);
						
						$("#p_teacher_comment").empty();
						var commentData = data.sConmmet;
						$("#p_teacher_comment").append(commentData);
						
					},
					error: function(){ 
						 alert('Request Progress report failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        }

    };

}();