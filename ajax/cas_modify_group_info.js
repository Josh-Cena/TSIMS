var addGroupInfo = function () {

    return {
		
		initMyGroupDropdown: function (val) {		
			$.ajax({
					url: 'php/cas_init_mygroups_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						leaderYes: val
						},
					success: function (data) {


						$("#select_my_group").empty();
						$("#select_my_group").append("<option value='0'>" + "选择我的社团 ..." +  "</option>");
						
						for(var i=0; i < data.length; i++){
							$("#select_my_group").append("<option value='" + data[i].C_GroupsID + "'>" + data[i].C_NameC +  "(" + data[i].C_GroupNo + ")</option>");
						}

					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		addMyGroupInfo: function (valID) {		
			$.ajax({
					url: 'php/cas_add_group_info.php',
					dataType: 'json',
					type: 'post',
					data:{
						groupid: valID
						},
					success: function (data) {
						//alert(data.groups[0].C_NameC);
						//$("#text_groupNo").val(data.groups[i].C_GroupNo);
						//$("#text_foundtime").val(data.groups[i].C_FoundTime);
						
						$("#txt_group_nameC").empty();
						$("#txt_group_nameC").val(data.groups[0].C_NameC);
						$("#txt_group_nameE").empty();
						$("#txt_group_nameE").val(data.groups[0].C_NameE);
						
						$("#text_descriptionC").empty();
						$("#text_descriptionC").val(data.groups[0].C_DescriptionC);
						$("#text_descriptionE").empty();
						$("#text_descriptionE").val(data.groups[0].C_DescriptionE);

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
						
						///////////////////////////////////////////////
						$("#u_chief_group_leader").empty();
						var chiefleader = '';
						//alert(data.gmember.length);
						for(var i=0; i < data.gmember.length; i++){
							if(data.gmember[i].LeaderYes == 1){
								chiefleader += '<li><a href="#"><i class="fa fa-user"></i>';
								chiefleader += data.gmember[i].S_Name;
								chiefleader += '(' + data.gmember[i].S_Nickname;
								chiefleader += ')</a></li>';
							}
						}
						$("#u_chief_group_leader").append(chiefleader);
						
						//////////////////////////////////////////////////////
						$("#s_add_group_leader").empty();
						$("#s_add_group_leader").append("<option value='0'>" + "选择副社长 ..." +  "</option>");
						
						for(var i=0; i < data.gmember.length; i++){
							if(data.gmember[i].LeaderYes ==0){
							$("#s_add_group_leader").append("<option value='" + data.gmember[i].StudentID + "'>" + data.gmember[i].S_Name +  "(" + data.gmember[i].S_Nickname + ")</option>");
							}
						}
						
						/////////////////////////////////////////////////////////////////////////////////////
						$("#s_chief_groupleader").empty();
						$("#s_chief_groupleader").append("<option value='0'>" + "请选择 ..." +  "</option>");
						
						for(var i=0; i < data.gmember.length; i++){
							if(data.gmember[i].LeaderYes ==1){
								$("#s_chief_groupleader").append("<option value='" + data.gmember[i].StudentID + "'>" + data.gmember[i].S_Name +  "(" + data.gmember[i].S_Nickname + ")</option>");
							}
						}

						
						/////////////////////////////////////////////////////////////////////////////////////
						$("#s_delete_group_member").empty();
						$("#s_delete_group_member").append("<option value='0'>" + "选择组成员 ..." +  "</option>");
						
						for(var i=0; i < data.gmember.length; i++){
							if((data.gmember[i].LeaderYes !=2) && (data.gmember[i].C_Secede !=1)){
								$("#s_delete_group_member").append("<option value='" + data.gmember[i].StudentID + "'>" + data.gmember[i].S_Name +  "(" + data.gmember[i].S_Nickname + ")</option>");
							}
						}

						
						
						//document.getElementById("chkbox_c").checked = true; 
						//var ss=document.getElementById("chkbox_c").checked;
						
						//$("#textarea_annC").val(data.groups[i].C_DescriptionC); 
						//$("#textarea_annE").val(data.groups[i].C_DescriptionE);
						 

					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		modifyGroupName: function () {		
			
			$.ajax({
					url: 'php/cas_modify_group_name.php',
					dataType: 'json',
					type: 'post',
					data: {
						groupid:	function(){return $('#select_my_group').children('option:selected').val();},
						nameC: 		function(){return $('#txt_group_nameC').val();},
						nameE: 		function(){return $('#txt_group_nameE').val();},
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							//var selValue = 2;
							//addGroupInfo.initMyGroupDropdown(selValue);
							var selValue=$('#select_my_group').children('option:selected').val();
							addGroupInfo.addMyGroupInfo(selValue);
							//alert("Data has been modified!");
						}else{
							alert(data.status);
						}
						//alert('Record has been saved!');
					},
					error: function(){ 
						 alert('Modify Record failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		modifyChiefLeader: function () {		
			
			$.ajax({
					url: 'php/cas_modify_chief_leader.php',
					dataType: 'json',
					type: 'post',
					data: {
						studentid:	function(){return $('#s_add_group_leader').children('option:selected').val();},
						groupid:	function(){return $('#select_my_group').children('option:selected').val();},
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							var selValue=$('#select_my_group').children('option:selected').val();
							addGroupInfo.addMyGroupInfo(selValue);
							//alert("Data has been modified!");
						}else{
							alert(data.status);
						}
						//alert('Record has been saved!');
					},
					error: function(){ 
						 alert('Add Record failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		deleteChiefLeader: function () {		
			
			$.ajax({
					url: 'php/cas_delete_chief_leader.php',
					dataType: 'json',
					type: 'post',
					data: {
						studentid:	function(){return $('#s_chief_groupleader').children('option:selected').val();},
						groupid:	function(){return $('#select_my_group').children('option:selected').val();},
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							var selValue=$('#select_my_group').children('option:selected').val();
							addGroupInfo.addMyGroupInfo(selValue);
							//alert("Data has been modified!");
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

        },
		
		deleteMemberFromGroup: function () {		
			
			$.ajax({
					url: 'php/cas_delete_member_from_mygroup.php',
					dataType: 'json',
					type: 'post',
					data: {
						studentid:	function(){return $('#s_delete_group_member').children('option:selected').val();},
						groupid:	function(){return $('#select_my_group').children('option:selected').val();},
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							var selValue=$('#select_my_group').children('option:selected').val();
							addGroupInfo.addMyGroupInfo(selValue);
							//alert("Data has been modified!");
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

        },
		
		modifyGroupDescription: function () {		
			
			$.ajax({
					url: 'php/cas_modify_group_description.php',
					dataType: 'json',
					type: 'post',
					data: {
						groupid:			function(){return $('#select_my_group').children('option:selected').val();},
						descriptionC: 		function(){return $('#text_descriptionC').val();},
						descriptionE: 		function(){return $('#text_descriptionE').val();},
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							//var selValue = 2;
							//addGroupInfo.initMyGroupDropdown(selValue);
							var selValue=$('#select_my_group').children('option:selected').val();
							addGroupInfo.addMyGroupInfo(selValue);
							//alert("Data has been modified!");
						}else{
							alert(data.status);
						}
						//alert('Record has been saved!');
					},
					error: function(){ 
						 alert('Modify Record failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },

    };

}();