var taskConfirm = function () {

    return {
		
		initTaskDropdown: function (valID) {		
			$.ajax({
					url: 'php/ia_task_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						subjectid:		valID,
					},
					success: function (data) {
						
						$("#select_ia_task").empty();
						$("#select_ia_task").append("<option value='0'>Select Task ...</option>"); 
						for(var i=0; i < data.task.length; i++){
							$("#select_ia_task").append("<option value='" + data.task[i].I_TaskID + "'>" + data.task[i].I_TaskName + "(" + data.task[i].I_StartTime.substr(0,10) + "～" +data.task[i].I_EndTime.substr(0,10)+")</option>"); 
						}
					},
					error: function(){ 
						 alert('Request failed2!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		initSubjectDropdown: function (valID) {		
			$.ajax({
					url: 'php/ia_subject_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						
					},
					success: function (data) {
						$("#select_ia_subject").append("<option value='0'>Select Subject ...</option>"); 
						for(var i=0; i < data.subject.length; i++){
							$("#select_ia_subject").append("<option value='" + data.subject[i].I_SubjectID + "'>" + data.subject[i].I_Subject + "</option>"); 
						}
					},
					error: function(){ 
						 alert('Request failed2!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		addTaskToTable: function (taskID) {	
			
			$.ajax({
					url: 'php/ia_task_student_project.php',
					dataType: 'json',
					type: 'post',
					data:{
						taskid:		taskID
						
						},
					success: function (data) {
						
						//alert(data.project.length);
						
						$("#ia_tbdata").empty();
						var tdata='';
						//var percentage = 0;
						
					    for(var i =0; i < data.project.length; i++){
								
								tdata += '<tr>';  
								tdata += '<td>' + (i + 1) + '</td>'; 
								tdata += '<td>' + data.project[i].I_TaskName + '</td>';
								tdata += '<td>' + data.project[i].I_Title + '</td>';
								tdata += '<td>' + data.project[i].I_Subject + '</td>';
								
								var iyes = data.project[i].I_Yes;
								if (iyes == -1){
									var myes = '未确认';
								}else if(iyes == 0){
									var myes = '已确认';
								}else{
									var myes = '拒绝';
								}
								tdata += '<td class="fc-header-center">' + myes + '</td>';
								tdata += '<td>' + data.project[i].I_YesNote + '</td>';
								
								tdata += '<td class="fc-header-center">';
							  	tdata += '<a href="#"></a>';
							  	tdata += '<div class="btn-group btn-group-xs btn-group-solid">';
							  	tdata += '<button type="button" id="';
							  	tdata += data.project[i].OutlID;
							  	tdata += '" class="btn purple" >';
							  	tdata += '<i class="fa fa-trash-o"></i> Delete</button>';
							  	tdata += '</div>';

								tdata += '</td></tr>';
								
								
						 }
						 
	 					
						 
						 $("#ia_tbdata").append(tdata); 
						 


					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		/////////////////////////////////
		
		
		
		saveProject: function () {		
			
			$.ajax({
					url: 'php/ia_task_student_save_project.php',
					dataType: 'json',
					type: 'post',
					data: {
						taskid:			function(){return $('#select_ia_task').children('option:selected').val();},
						pTitle:			function(){return $("input#txt_task_theme").val();},
						pEquipment:		function(){return $("input#txt_task_device").val();},
						pMaterial:		function(){return $("input#txt_task_material").val();},
						pOutline:		function(){return $('#text_task_description').val();},
					},
					success: function(data) {
						
						//alert(data.status);
						if (data.status == 'ok'){
							
							var taskValue = $('#select_ia_task').children('option:selected').val(); 
							
							$("input#txt_task_theme").val('');
							$("input#txt_task_device").val('');
							$("input#txt_task_material").val('');
							$("#text_task_description").val('');
							taskConfirm.addTaskToTable(taskValue);
							
							$("#bn_save_project_info").removeAttr("disabled");
							
						}else{
							alert(data.status);
							$("#bn_save_project_info").removeAttr("disabled");
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
		
		deleteProject: function (outlID) {

			$.ajax({
					url: 'php/ia_task_student_delete_project.php',
					dataType: 'json',
					type: 'post',
					data:{
						outlineid:		outlID
						
					},
					success: function (data) {
						if(data.status =='ok'){
							var taskValue = $('#select_ia_task').children('option:selected').val(); 
							taskConfirm.addTaskToTable(taskValue);
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