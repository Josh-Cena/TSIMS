var sTableEditable = function () {

    return {
		
		addDataToTable: function (yearIDVal) {		
			$.ajax({
					url: 'php/search_student_progress_report.php',
					dataType: 'json',
					type: 'post',
					data:{
						//studentID: studentVal,
						yearID: yearIDVal
					},
					success: function (data) {
						//alert(data.sName); 
						$("#s_yearterm").empty();
						var termData =  data.yearTerm ;
						$("#s_yearterm").append(termData);
						
						
						$("#ul_student").empty();
						var studentData = '<li> ' + data.studentNo  + '</li>';
						studentData += '<li>' + data.sName + '(' + data.sNickname +')</li>';
						$("#ul_student").append(studentData);
						
						$("#ul_class").empty();
						var classData = '<li> ' + data.Dept + data.Grade + "(" + data.Class + ')</li>';
						classData += '<li>Form Teacher:' + data.tName + '</li>';
						$("#ul_class").append(classData);
						
						$("#tbdata").empty();
						var tdata='';
						var k = 1;
						var total=0;
						for(var i = 0; i < data.scoreData.length; i++){
							tdata += '<tr>'; 
							tdata += '<td class="fc-header-center">' + k + '</td>';  
							tdata += '<td>' + data.scoreData[i].IB_SubjectE + '</td>';
							if (data.scoreData[i].Score1 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].Score1 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore1 + '</td>';
							}
							if (data.scoreData[i].Score2 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].Score2 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore2 + '</td>';
							}
							if (data.scoreData[i].Score3 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].Score3 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore3 + '</td>';
							}
							if (data.scoreData[i].Score4 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].Score4 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore4 + '</td>';
							}
							if (data.scoreData[i].Score5 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].Score5 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore4 + '</td>';
							}
							if (data.scoreData[i].Score6 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].Score6 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore4 + '</td>';
							}
							if (data.scoreData[i].LScore6 == '0'){
								tdata += '<td class="fc-header-center">-</td>';
								//tdata += '<td class="fc-header-center">-</td>';
							}else{
								tdata += '<td class="fc-header-center">' + data.scoreData[i].LScore6 + '</td>';
								//tdata += '<td class="fc-header-center">' + data[i].LScore4 + '</td>';
							}
							
							tdata += '</tr>';
							total += Number(data.scoreData[i].LScore6);
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
							if (data.subjAss[i].S_Submittask == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].S_Submittask + '</td>';
							}
							if (data.subjAss[i].S_Activepaticipation == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].S_Activepaticipation + '</td>';
							}
							if (data.subjAss[i].S_Effort == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].S_Effort + '</td>';
							}
							if (data.subjAss[i].S_Behaviour == '0'){
								assdata += '<td class="fc-header-center">NA</td>';
							}else{
								assdata += '<td class="fc-header-center">' + data.subjAss[i].S_Behaviour + '</td>';
							}
							
							assdata += '</tr>';
							k = k + 1;
						}
						$("#asstbdata").append(assdata);
						
						
						$("#castbdata").empty();
						var casdata='';
						for(var i = 0; i < data.casAss.length; i++){
							casdata += '<tr>'; 
							if (data.casAss[i].W_Participation == '0'){
								casdata += '<td class="fc-header-center">NA</td>';
							}else{
								casdata += '<td class="fc-header-center">' + data.casAss[i].W_Participation + '</td>';
							}
							if (data.casAss[i].W_Reflection == '0'){
								casdata += '<td class="fc-header-center">NA</td>';
							}else{
								casdata += '<td class="fc-header-center">' + data.casAss[i].W_Reflection + '</td>';
							}
							if (data.casAss[i].W_Teamwork == '0'){
								casdata += '<td class="fc-header-center">NA</td>';
							}else{
								casdata += '<td class="fc-header-center">' + data.casAss[i].W_Teamwork + '</td>';
							}
							if (data.casAss[i].W_Persistency == '0'){
								casdata += '<td class="fc-header-center">NA</td>';
							}else{
								casdata += '<td class="fc-header-center">' + data.casAss[i].W_Persistency + '</td>';
							}
							if (data.casAss[i].W_Archive == '0'){
								casdata += '<td class="fc-header-center">NA</td>';
							}else{
								casdata += '<td class="fc-header-center">' + data.casAss[i].W_Archive + '</td>';
							}
							casdata += '</tr>';
						}
						$("#castbdata").append(casdata);
						
						$("#attetbdata").empty();
						var attdata='';
						for(var i = 0; i < data.sAttendance.length; i++){
							attdata += '<tr>'; 
							if (data.sAttendance[i].S_Sickleave == '0'){
								attdata += '<td class="fc-header-center">NA</td>';
							}else{
								attdata += '<td class="fc-header-center">' + data.sAttendance[i].S_SickLeave + '</td>';
							}
							if (data.sAttendance[i].S_SpecialLeave == '0'){
								attdata += '<td class="fc-header-center">NA</td>';
							}else{
								attdata += '<td class="fc-header-center">' + data.sAttendance[i].S_SpecialLeave + '</td>';
							}
							if (data.sAttendance[i].S_Lateness == '0'){
								attdata += '<td class="fc-header-center">NA</td>';
							}else{
								attdata += '<td class="fc-header-center">' + data.sAttendance[i].S_Lateness + '</td>';
							}
							attdata += '</tr>';
						}
						$("#attetbdata").append(attdata);
						
						$("#toktbdata").empty();
						var tokdata = '<tr>';
						if (data.tokAss == ''){
							tokdata += '<td class="fc-header-center">NA</td>';
						}else{
							tokdata += '<td class="fc-header-center">' + data.tokAss + '</td>';
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