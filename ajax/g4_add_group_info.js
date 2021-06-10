var addG4Info = function () {

    return {
		
		init: function () {		
			$.ajax({
					url: 'php/g4_add_group_info.php',
					dataType: 'json',
					type: 'post',
					data:{
						//groupid: valID
						},
					success: function (data) {
						
						//alert(data.myInfo1[0]);
						
						if(data.myInfo1 == 'ok'){
							
							$("#s_studentno").empty();
							//$("#s_studentno").val('');
							$("#s_studentno").append(data.myInfo[0].StudentNo);
							$("#s_studentname").empty();
							//$("#s_studentname").val('');
							$("#s_studentname").append(data.myInfo[0].S_Name);
							$("#s_group").empty();
							//$("#s_group").val('');
							$("#s_group").append("第" + data.myInfo[0].ProjectNo + "组");
							var subj = "";
							if(data.myInfo[0].Subject == "p"){
								subj = "物理";
							}else if(data.myInfo[0].Subject == "c"){
								subj = "化学";
							}else{
								subj = "生物";
							}
							$("#s_subject").empty();
							$("#s_subject").append(subj);
						}
						
						/////////////////////////////////////////////////////////////////////////////////
						
						$("#tbdata").empty();
						$("#students_details").empty();
						var g4data = '';
						var modalDet = '';
						//alert(data.groups.students[0].length);
						//if (dada.status == 'ok'){
							for(var i = 0; i < data.groups.groupNo.length; i++){
								g4data += '<tr>';
								g4data += '<td class="fc-header-center">第' + data.groups.groupNo[i] + '组</td>';
								g4data += '<td  class="fc-header-center">' + data.groups.Psum[i] + '</td> ';
								g4data += '<td class="fc-header-center"><span class="badge badge-info">';
								 
								g4data +=  Number(data.groups.Pcunt[i])+ Number(data.groups.Ccunt[i])+ Number(data.groups.Bcunt[i]) ;
								g4data += '</span></td>';
								
								if((Number(data.groups.Pcunt[i])>= Number(data.groupsID[i].pPm)) || (Number(data.groups.Ccunt[i])+ Number(data.groups.Bcunt[i])>(Number(data.groupsID[i].Psum)-Number(data.groupsID[i].pPs)))  ||(Number(data.groups.Ccunt[i])+ Number(data.groups.Pcunt[i])> (Number(data.groupsID[i].Psum)-Number(data.groupsID[i].bPs)))|| (Number(data.groups.Ccunt[i])+ Number(data.groups.Bcunt[i])+ Number(data.groups.Pcunt[i])>= (Number(data.groupsID[i].Psum)))){
									g4data += '<td  class="fc-header-center">' + data.groups.Pcunt[i] + '</td>';
									g4data += '<td class="fc-header-center"><input type="hidden" name="calid" value="';
									g4data +=  data.groupsID[i].pID + '">';
									g4data += '<div class="btn-group btn-group-xs btn-group-solid">';
									g4data += '<button type="button" id="' + data.groupsID[i].pID;
									g4data += '" class="btn default" disabled="disabled"><i class="fa fa-lock"></i> 已满</button></div></td>';
									
								}else{
								
									g4data += '<td  class="fc-header-center">' + data.groups.Pcunt[i] + '</td>';
									g4data += '<td class="fc-header-center"><input type="hidden" name="calid" value="';
									g4data +=  data.groupsID[i].pID + '">';
									g4data += '<div class="btn-group btn-group-xs btn-group-solid">';
									g4data += '<button type="button" id="' +data.groupsID[i].pID;
									g4data += '" class="btn blue"><i class="fa fa-check-square-o"></i> 加入</button></div></td>';
								}
								
								if((Number(data.groups.Ccunt[i])>= Number(data.groupsID[i].cPm)) || (Number(data.groups.Pcunt[i])+ Number(data.groups.Bcunt[i]) > (Number(data.groupsID[i].Psum)-Number(data.groupsID[i].cPs)))  ||(Number(data.groups.Pcunt[i])+ Number(data.groups.Ccunt[i])> (Number(data.groupsID[i].Psum)-Number(data.groupsID[i].bPs)))|| (Number(data.groups.Ccunt[i])+ Number(data.groups.Bcunt[i])+ Number(data.groups.Pcunt[i])>=(Number(data.groupsID[i].Psum)))){
									g4data += '<td  class="fc-header-center">' + data.groups.Ccunt[i] + '</td>';
									g4data += '<td class="fc-header-center"><input type="hidden" name="calid" value="';
									g4data +=  data.groupsID[i].cID + '">';
									g4data += '<div class="btn-group btn-group-xs btn-group-solid">';
									g4data += '<button type="button" id="' +data.groupsID[i].cID;
									g4data += '" class="btn default" disabled="disabled"><i class="fa fa-lock"></i> 已满</button></div></td>';
									
								}else{
								
									g4data += '<td  class="fc-header-center">' + data.groups.Ccunt[i] + '</td>';
									g4data += '<td class="fc-header-center"><input type="hidden" name="calid" value="';
									g4data +=  data.groupsID[i].cID + '">';
									g4data += '<div class="btn-group btn-group-xs btn-group-solid">';
									g4data += '<button type="button" id="' +data.groupsID[i].cID;
									g4data += '" class="btn blue"><i class="fa fa-check-square-o"></i> 加入</button></div></td>';
								}
								
								if((Number(data.groups.Bcunt[i])>Number(data.groupsID[i].bPm)) || (Number(data.groups.Bcunt[i])+ Number(data.groups.Ccunt[i])> (Number(data.groupsID[i].Psum)-Number(data.groupsID[i].pPm))) || (Number(data.groups.Pcunt[i])+ Number(data.groups.Bcunt[i])> (Number(data.groupsID[i].Psum)-Number(data.groupsID[i].cPm)))|| (Number(data.groups.Ccunt[i])+ Number(data.groups.Bcunt[i])+ Number(data.groups.Pcunt[i])>=(Number(data.groupsID[i].Psum)))){
									g4data += '<td  class="fc-header-center">' + data.groups.Bcunt[i] + '</td>';
									g4data += '<td class="fc-header-center"><input type="hidden" name="calid" value="';
									g4data +=  data.groupsID[i].bID + '">';
									g4data += '<div class="btn-group btn-group-xs btn-group-solid">';
									g4data += '<button type="button" id="' +data.groupsID[i].bID;
									g4data += '" class="btn default" disabled="disabled"><i class="fa fa-lock"></i> 已满</button></div></td>';
									
								}else{
								
									g4data += '<td  class="fc-header-center">' + data.groups.Bcunt[i] + '</td>';
									g4data += '<td class="fc-header-center"><input type="hidden" name="calid" value="';
									g4data +=  data.groupsID[i].bID + '">';
									g4data += '<div class="btn-group btn-group-xs btn-group-solid">';
									g4data += '<button type="button" id="' +data.groupsID[i].bID;
									g4data += '" class="btn blue"><i class="fa fa-check-square-o"></i> 加入</button></div></td>';
								}
								
								
								
								
								
								g4data += '<td class="fc-header-center">';
                                g4data += '<a class="btn default btn-xs purple" data-toggle="modal" ';
								g4data += 'href="#basic' + data.groups.groupNo[i] + '"';
                                g4data += '><i class="fa fa-group"></i> 小组成员</a></td>';
								
								g4data += '</tr>';
								
								
								
								////////////////////
								modalDet +='<div class="modal fade" id="basic'+ data.groups.groupNo[i] + '" tabindex="-1" role="basic" aria-hidden="true">';
								modalDet +='<div class="modal-dialog">';
                            	modalDet +='<div class="modal-content">';
                                modalDet +='<div class="modal-header">';
                                modalDet +='<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>';
                                modalDet +='<h4 class="modal-title">小组成员</h4>';
                                modalDet +='</div>';
                                modalDet +='<div class="modal-body">';
								
								/////////////////////////////////////
								var stu = '';
								
								//alert(data.groups.students[4][0].S_Nickname);
								var aa = Number(data.groups.Pcunt[i])+Number(data.groups.Ccunt[i])+Number(data.groups.Bcunt[i]);
								if(aa >0 ){
								
									for(var j = 0; j < data.groups.students[i].length; j++){
										var subj = "";
										if(data.groups.students[i][j].Subject == "p"){
											subj = "物理";
										}else if(data.groups.students[i][j].Subject == "c"){
											subj = "化学";
										}else{
											subj = "生物";
										}
										stu += data.groups.students[i][j].S_Name + "_" + data.groups.students[i][j].S_Nickname;
										stu += '(' + subj + ')；';
										
									}
								}else{
									stu += '无';
								}
								
								modalDet += stu ;
								//////////////////////////////////////
								
                                modalDet +='</div>';
                                modalDet +='<div class="modal-footer">';
                                modalDet +='<button type="button" class="btn default" data-dismiss="modal">Close</button>';
                                modalDet +='</div>';
                            	modalDet +='</div>';
                            	modalDet +='</div>';
                        		modalDet +='</div>';
								
							}
						//}
						$("#tbdata").append(g4data);
						$("#students_details").append(modalDet);

					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		addMemberInfo: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/g4_save_member_info.php',
					dataType: 'json',
					type: 'post',
					data: {
						groupid: val
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							
							addG4Info.init();
							//$("#bn_save_records_info").removeAttr("disabled");
						}else{
							alert(data.status);
						}
						//alert('Record has been saved!');
					},
					error: function(){ 
						 alert('Save Record failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		deleteMemberInfo: function () {

			$.ajax({
					url: 'php/g4_delete_member_info.php',
					dataType: 'json',
					type: 'post',
					data:{
						//recordid:		recordID
					},
					success: function (data) {
						if(data.status =='ok'){
							$("#s_group").empty();
							$("#s_subject").empty();
							addG4Info.init();
						}else{
							alert(data.status);
						}
						
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