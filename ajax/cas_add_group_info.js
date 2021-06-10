var addGroupInfo = function () {

    return {
		
		init: function (valID) {		
			$.ajax({
					url: 'php/cas_add_group_info.php',
					dataType: 'json',
					type: 'post',
					data:{
						groupid: valID
						},
					success: function (data) {

						//$("#text_groupNo").val(data.groups[i].C_GroupNo);
						//$("#text_foundtime").val(data.groups[i].C_FoundTime);
						
						$("#span_group_name").empty();
						
						var groupName = '';
						groupName += '<h4>' + data.groups[0].C_NameC;
						groupName += '(' + data.groups[0].C_NameE + ')</h4>';
						$("#span_group_name").append(groupName);
						
						$("#span_descriptionC").empty();
						
						var DescC = '';
						DescC += '<p>' + data.groups[0].C_DescriptionC + '</p>';
						$("#span_descriptionC").append(DescC);
						
						$("#span_descriptionE").empty();
						
						var DescE = '';
						DescE += '<p>' + data.groups[0].C_DescriptionE + '</p>';
						$("#span_descriptionE").append(DescE);
						
						$("#d_teamleader").empty();
						var TeamLeader = '<div class="row">';
						//alert(data.gmember.length);
						for(var i=0; i < data.gmember.length; i++){
							if (data.gmember[i].LeaderYes > 0){ 
								TeamLeader += '<div class="col-md-4">';
								TeamLeader += '<ul class="list-inline sidebar-tags">';
								TeamLeader += '<li><a href="#"><i class="fa fa-user"></i>';
								TeamLeader += data.gmember[i].S_Name + '(';
								TeamLeader += data.gmember[i].S_Nickname + ')</a></li></ul>';
								TeamLeader += 'Email: <a href="#">' + data.gmember[i].S_Email + '</a>';
								TeamLeader += '<p>TEL：' + data.gmember[i].S_STel + '</p>';
								TeamLeader += '</div>';
							}
						}
						TeamLeader += '</div>';
						$("#d_teamleader").append(TeamLeader);
						
						/////////////////////////////////////////////////////////
						$("#d_supervisor").empty();
						var Supervisor = '';
						if (data.supervisor.length != 0){
						
							Supervisor += '<ul class="list-inline sidebar-tags" >';
							Supervisor += '<li><a href="#"><i class="fa fa-user"></i>' + data.supervisor[0].T_Name;
							Supervisor += '(' + data.supervisor[0].T_Nickname + ')</a></li></ul>';
							Supervisor += 'Email: <a href="#">' + data.supervisor[0].T_Email +'</a>';
							Supervisor += '<p>TEL：' + data.supervisor[0].T_MTel + '</p>';
						}
						$("#d_supervisor").append(Supervisor);
						
						//////////////////////////////////////////////////////
						$("#d_group_leader").empty();
						var Groupleader = '';
						
						for(var i=0; i < data.gmember.length; i++){
							if (data.gmember[i].LeaderYes == 2){
								Groupleader += '<ul class="list-inline sidebar-tags" >';
								Groupleader += '<li><a href="#"><i class="fa fa-user"></i>' + data.gmember[0].S_Name;
								Groupleader += '(' + data.gmember[0].S_Nickname + ')</a></li></ul>';
								Groupleader += 'Email: <a href="#">' + data.gmember[0].S_Email +'</a>';
								Groupleader += '<p>TEL：' + data.gmember[0].S_STel + '</p>';
							}
						}
						$("#d_group_leader").append(Groupleader);
						
						
						///////////////////////////////////////////////////////
						$("#s_tNumber").empty();
						//alert(data.gmember.length);
						var TNumber = '';
						TNumber += data.gmember.length;

						$("#s_tNumber").append(TNumber);

						///////////////////////////////////////////////////////
						$("#u_teammate").empty();
						var teammate = '';
						//alert(data.gmember.length);
						for(var i=0; i < data.gmember.length; i++){
							teammate += '<li><a href="#"><i class="fa fa-user"></i>';
							teammate += data.gmember[i].S_Name;
							teammate += '(' + data.gmember[i].S_Nickname;
							teammate += ')</a></li>';
						}
						$("#u_teammate").append(teammate);
						
						if(data.projectyes == 0){
							$('#d_projectyes').show();
						}else{
							$('#d_projectyes').hide();
						}
						
						$("#d_activity_records").empty();
						var actrecord = '';
						//alert(data.gmember.length);
						for(var i=0; i < data.grecord.length; i++){
							actrecord += '<ul class="blog-info"><li><i class="fa fa-calendar"></i>';
							actrecord += data.grecord[i].C_Date.substr(0,10) + '</li>';
							//actrecord += '<li><i class="fa fa-comments"></i>' + 17 +'</li>';
							actrecord += '<li><i class="fa fa-tags"></i>';
							actrecord += data.grecord[i].C_Theme + '</li></ul>';
							actrecord += '<p>' + data.grecord[i].C_Reflection + '</p>';
						}
						$("#d_activity_records").append(actrecord);

					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		saveGroupMember: function () {		
			
			if($("#chkbox_projectyes").attr("checked") == "checked"){
				var projectyes = 1;
			}else{
				var projectyes = 0;
			}

			$.ajax({
					url: 'php/cas_save_member_info.php',
					dataType: 'json',
					type: 'post',
					data: {
						groupid:	function(){return $('#select_group').children('option:selected').val();},
						projYes: 	projectyes
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							var selValue=$('#select_group').children('option:selected').val();
							addGroupInfo.init(selValue);
							$("#chkbox_projectyes").removeAttr("checked");
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
		
		deleteGroupMember: function () {		
			
			$.ajax({
					url: 'php/cas_delete_member_info.php',
					dataType: 'json',
					type: 'post',
					data: {
						groupid:	function(){return $('#select_group').children('option:selected').val();},
						
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							var selValue=$('#select_group').children('option:selected').val();
							addGroupInfo.init(selValue);
						}else{
							alert(data.status);
						}
						//alert('Record has been saved!');
					},
					error: function(){ 
						 alert('Delete Record failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        }

    };

}();