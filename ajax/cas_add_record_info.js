var addGroupRecordInfo = function () {

    return {
		
		init: function () {		
			$.ajax({
					url: 'php/cas_add_mygroups_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						
						},
					success: function (data) {

						//$("#text_groupNo").val(data.groups[i].C_GroupNo);
						//$("#text_foundtime").val(data.groups[i].C_FoundTime);
						
						$("#select_my_group").empty();
						$("#select_my_group").append("<option value='0'>" + "选择活动组......" +  "</option>");
						
						for(var i=0; i < data.nogroups.length; i++){
							if(data.nogroups[i].C_GroupNo == '014001'){
								$("#select_my_group").append("<option value='" + data.nogroups[i].C_GroupsID + "'>" + data.nogroups[i].C_NameC + "("+ data.nogroups[i].C_NameE+ ")</option>");
							}
						}
						
						for(var i=0; i < data.groups.length; i++){
							$("#select_my_group").append("<option value='" + data.groups[i].C_GroupsID + "'>" + data.groups[i].C_GroupNo + "_" + data.groups[i].C_NameC + "("+ data.groups[i].C_NameE+ ")</option>");
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
		
	
		
		addInfo: function (valID) {		
			$.ajax({
					url: 'php/cas_add_record_info.php',
					dataType: 'json',
					type: 'post',
					data:{
						groupid: valID
						},
					success: function (data) {
						
						$("#s_my_group_name").empty();
						var groupName = '';
						groupName += '<a href="#"><i class="fa fa-group"></i> ' + data.groups[0].C_NameC;
						groupName += '(' + data.groups[0].C_NameE + ')</a>';
						$("#s_my_group_name").append(groupName);
						
						
						if(data.leaderyes != 0){
							$('#d_groupleader_yes').show();
						}else{
							$('#d_groupleader_yes').hide();
						}
						//////////////////////////////////////////////////////////////////////////////////
						$("#d_plan_progress").empty();
						var planProgress = '';
						
						if(parseInt(data.casDuration[0].Cdur) > parseInt(data.casPlan[0].C_CPDuration)){
							var cc = 100;
						}else{
							var cc = (data.casDuration[0].Cdur/data.casPlan[0].C_CPDuration)*100;
						}
						
						if(parseInt(data.casDuration[0].Adur) > parseInt(data.casPlan[0].C_APDuration)){
							var aa = 100;
						}else{
							var aa = (data.casDuration[0].Adur/data.casPlan[0].C_APDuration)*100;
						}
						
						if(parseInt(data.casDuration[0].Sdur) > parseInt(data.casPlan[0].C_SPDuration)){
							var ss = 100;
						}else{
							var ss = (data.casDuration[0].Sdur/data.casPlan[0].C_SPDuration)*100;
						}
						//alert(cc + ',' + aa + ',' +ss);
						if(data.status == 'ok'){
						//alert(20);
							planProgress +='<div class="progress">';
							planProgress += '<div style="width: ' + cc;
							planProgress += '%;" class="progress-bar progress-bar-danger" role="progressbar">';
							planProgress += '<p>C '+ String(parseInt(cc));
							planProgress += '%</p></div></div>';
							
							planProgress +='<div class="progress">';
							planProgress += '<div style="width: ' + aa;
							planProgress += '%;" class="progress-bar progress-bar-success" role="progressbar">';
							planProgress += '<p>A '+ String(parseInt(aa));
							planProgress += '%</p></div></div>';
							
							planProgress +='<div class="progress">';
							planProgress += '<div style="width: ' + ss;
							planProgress += '%;" class="progress-bar progress-bar-info" role="progressbar">';
							planProgress += '<p>S '+ String(parseInt(ss));
							planProgress += '%</p></div></div>';
							//alert(data.casDuration[0]);
						}else{
							planProgress +='<div class="progress">';
							planProgress += '<div style="width: 0';
							planProgress += '%;" class="progress-bar progress-bar-danger" role="progressbar">';
							planProgress += '<p>C 0';
							planProgress += '%</p></div></div>';
							
							planProgress +='<div class="progress">';
							planProgress += '<div style="width: 0';
							planProgress += '%;" class="progress-bar progress-bar-danger" role="progressbar">';
							planProgress += '<p>A 0';
							planProgress += '%</p></div></div>';
							
							planProgress +='<div class="progress">';
							planProgress += '<div style="width: 0';
							planProgress += '%;" class="progress-bar progress-bar-danger" role="progressbar">';
							planProgress += '<p>S 0';
							planProgress += '%</p></div></div>';
						}
						
						$("#d_plan_progress").append(planProgress);
						
						/////////////////////////////////////////////////////////////////////////////////
						$("#castabledata").empty();
						var casdata = '';
						//alert(data.casRecord[0].C_Theme);
						//if (dada.status == 'ok'){
							for(var i = 0; i < data.casRecord.length; i++){
								casdata += '<tr>';
								casdata += '<td class="fc-header-center">' +  (i + 1) + '</td>';
								casdata += '<td>' +  data.casRecord[i].C_Theme.substr(0,10) + '</td>';
								casdata += '<td class="fc-header-center">' +  data.casRecord[i].C_Date.substr(0,10) + '</td>';
								casdata += '<td class="fc-header-center"><span class="badge badge-important">';
								casdata += data.casRecord[i].C_DurationC + '</span></td>';
								casdata += '<td class="fc-header-center"><span class="badge badge-success">';
								casdata += data.casRecord[i].C_DurationA + '</span></td>';
								casdata += '<td class="fc-header-center"><span class="badge badge-info">';
								casdata += data.casRecord[i].C_DurationS + '</span></td>';
								
								if(data.casRecord[i].T_JoinY == 1){
									var joiny = '是';
								}else{
									var joiny = '否';
								}
								casdata += '<td class="fc-header-center">' + joiny + '</td>';
								
								if(data.casRecord[i].T_GroupY == 1){
									var groupy = '是';
								}else{
									var groupy = '否';
								}
								casdata += '<td class="fc-header-center">' + groupy + '</td>';
								
								if(data.casRecord[i].C_Confirm == 2){
									var rconfirm = '拒绝';
								}else{
									var rconfirm = '未';
								}
								casdata += '<td class="fc-header-center">' + rconfirm + '</td>';
								casdata += '<td>' + data.casRecord[i].C_Reflection.substr(0,14) + '</td>'
								//casdata += '<td class="fc-header-center">';
								//casdata += '<a href="javascript:;" class="btn default btn-xs purple">';
								//casdata += '<i class="fa fa-trash-o"></i> Delete</a></td>';
								
								casdata += '<td class="fc-header-center"><input type="hidden" name="calid" value="';
								casdata += data.casRecord[i].C_ARecordID + '">';
								casdata += '<div class="btn-group btn-group-xs btn-group-solid">';
								casdata += '<button type="button" id="' + data.casRecord[i].C_ARecordID;
								casdata += '" class="btn purple"><i class="fa fa-trash-o"></i> Delete</button></div></td>';
								casdata += '</tr>';
							}
						//}
						$("#castabledata").append(casdata);

					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		saveRecords: function () {		
			
			if($("#chkbox_g_record").attr("checked") == "checked"){
				var groupY = 1;
			}else{
				var groupY = 0;
			}
			if($("#chkbox_s_join").attr("checked") == "checked"){
				var joinY = 1;
			}else{
				var joinY = 0;
			}
			//alert(joinY);
			$.ajax({
					url: 'php/cas_save_record.php',
					dataType: 'json',
					type: 'post',
					data: {
						groupid:		function(){return $('#select_my_group').children('option:selected').val();},
						studentid:		function(){return $('#studentid1').val();},
						actdate:		function(){return $("input#text_a_date").val();},
						acttitle:		function(){return $("input#txt_active_title").val();},
						durationC:		function(){return $("input#text_du_c").val();},
						durationA:		function(){return $("input#text_du_a").val();},
						durationS:		function(){return $("input#text_du_s").val();},
						actdesc: 		function(){return $("#text_a_description").val();},
						groupy:			groupY,
						joiny:			joinY			
						
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							var selValue=$('#select_my_group').children('option:selected').val();
							
							$("input#text_a_date").val('');
							$("input#txt_active_title").val('');
							$("input#text_du_c").val('');
							$("input#text_du_a").val('');
							$("input#text_du_s").val('');
							$("#text_a_description").val('');
							$("#chkbox_g_record").attr("checked", false);
							$("#chkbox_s_join").attr("checked", false);
							addGroupRecordInfo.addInfo(selValue);
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
		
		deleteRecordData: function (recordID) {

			$.ajax({
					url: 'php/cas_delete_record_info.php',
					dataType: 'json',
					type: 'post',
					data:{
						recordid:		recordID
						
					},
					success: function (data) {
						if(data.status =='ok'){
							var selValue=$('#select_my_group').children('option:selected').val();
							addGroupRecordInfo.addInfo(selValue);
						}else{
							//alert(data.status);
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