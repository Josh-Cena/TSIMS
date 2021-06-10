var addInfoProgressing = function () {

    return {
        //main function to initiate the module
        init: function (gradeData,studentData) {
            
			$.ajax({
					url: 'php/ee_student_progress.php',
					dataType: 'json',
					type: 'post',
					data:{
						gradeID:	gradeData,
						studentID:  studentData
					},
					success: function (data) {

						$("#span_subject").empty();
						$("#span_subject").append(data.subjectE);
						
						$("#span_teacherName").empty();
						$("#span_teacherName").append(data.t_name);
						
						$("#span_max_deadline").empty();
						$("#span_max_deadline").append(data.maxDeadline);
						
						$("#p_text_title").empty();
						$("#p_text_title").append(data.eetitle);
						$("#text_ee_title").val(data.eetitle);
						$("#text_ee_eid").val(data.EID);
						
						 $("#div_workflow").empty();
						 var divdata='';
						 //alert( data.workflow.E_Deadline[0]);
						 
						 for(var i =0; i < data.workflow.length; i++){
							 if(data.workflow[i].E_CompletID){
								 divdata += '<ul class="blog-info">';
								 divdata += '<li><span>Deadline： </span> <span id="p_deadline">';
								 divdata += data.workflow[i].E_Deadline + '</span> <i class="fa fa-check-square-o"></i> Completed</li>';
								 divdata += '</ul>';
							 }else{
								 divdata += '<ul class="blog-info">';
								 divdata += '<li><i class="fa fa-calendar"></i> <span>Deadline： </span> <span id="p_deadline">';
								 divdata += data.workflow[i].E_Deadline + '</span></li>';
							 }
							 //divdata += '<p><strong>' + data.workflow[i].E_Deadline + '</strong></p>';
							 divdata += '<p>Task: ' + data.workflow[i].E_Content + '</p>';
							 divdata += '<p>Action: ' + data.workflow[i].E_Action + '</p>';
							 //divdata += '<p><br/></p>';
						 }
						 $("#div_workflow").append(divdata); 

						
						//alert(data.progress.Deadline.length);
						//////////////////////////////////////////////
						if( data.progress.Deadline.length == 3){
							
							$("#p_deadline").empty();
							$("#p_deadline").append(data.progress.Deadline[1]);
							$("#text_ee_progressid").val(data.progress.ProgressID[1]);
							$("#text_ee_nextdeadline").val(data.progress.Deadline[2]);
							
							$("#p_text_task").empty();
							$("#p_text_task").append(data.progress.Content[1]);
							
							$("#p_text_action").empty();
							$("#p_text_action").append(data.progress.Action[1]);
							
							$("#progress_completed").empty();
							var days = Math.round((data.progress.CurDays[0] / data.Days )*100);
							var tdada = '<div class="progress-bar progress-bar-info" role="progressbar"';
							tdada += '  aria-valuemin="0" aria-valuemax="100" style="width: ';
							tdada += days + '%">';
							tdada += '<class="sr-only"></span>';
							tdada += '<span>'+ days +'</span>% Completed !</div>';
							
							$("#progress_completed").append(tdada);
							
						}else if(data.progress.Deadline.length == 2){
							
							$("#p_deadline").empty();
							$("#p_deadline").append(data.progress.Deadline[0]);
							$("#text_ee_progressid").val(data.progress.ProgressID[0]);
							$("#text_ee_nextdeadline").val(data.progress.Deadline[1]);
							
							$("#p_text_task").empty();
							$("#p_text_task").append(data.progress.Content[0]);
							
							$("#p_text_action").empty();
							$("#p_text_action").append(data.progress.Action[0]);
							
							$("#progress_completed").empty();
							
							if (data.progress.ProgressNo[0] == 1){
								
							    var tdada = '<div class="progress-bar progress-bar-info" role="progressbar" ';
								tdada += 'aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: ';
								tdada += 0 + '%">';
								tdada += '<class="sr-only"></span>';
								tdada += '<span>'+ 0 +'</span>% Completed !</div>';
								
							}else {
								var days = Math.round((data.progress.CurDays[0] / data.Days ) * 100);
								var tdada = '<div class="progress-bar progress-bar-info" role="progressbar" ';
								tdada += 'aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: ';
								tdada += days + '%">';
								tdada += '<class="sr-only"></span>';
								tdada += '<span>'+ days +'</span>% Completed !</div>';
							}
							
							$("#progress_completed").append(tdada);
							
						}else{
							
							$("#p_deadline").empty();
							$("#p_deadline").append(data.progress.Deadline[0]);
							$("#text_ee_progressid").val(data.progress.ProgressID[0]);
							$("#text_ee_nextdeadline").val(0);
							
							$("#p_text_task").empty();
							$("#p_text_task").append(data.progress.Content[0]);
							
							$("#p_text_action").empty();
							$("#p_text_action").append(data.progress.Action[0]);
							
							$("#progress_completed").empty();
							
							var days = Math.round((data.progress.CurDays[0] / data.Days )*100);
							var tdada = '<div class="progress-bar progress-bar-info" role="progressbar" ';
							tdada += 'aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: ';
							tdada += days + '%">';
							tdada += '<class="sr-only"></span>';
							tdada += '<span>'+ days +'</span>% Completed !</div>';
							
							$("#progress_completed").append(tdada);
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
		
		addCompletToTable: function () {		
			
			
			
			$.ajax({
					url: 'php/ee_student_confirm_progress.php',
					dataType: 'json',
					type: 'post',
					data:{
						//studentID: studentVal,
						//yearID: yearIDVal
					},
					success: function (data) {
						
						
						$("#tb_selSubject").empty();
						var tdata='';
						var k = 1;
						
						for(var i = 0; i < data.complet.length; i++){
							
							tdata += '<tr>';
                            
							tdata += '<td style="width: 10%" class="fc-header-center">';
							tdata += '<span class="badge badge-info">' + k + '</span></td>';
                                
                            tdata += '<td style="width: 70%">'+ data.complet[i].E_Deadline + '</td>';
                                
                            tdata += '<td style="width: 20%">';
							tdata += '<button type="button" id="'+ data.complet[i].E_CompletID;
							tdata += '" class="btn btn-xs purple"><i class="fa fa-trash-o"></i> Delete</button></td>';
							
							tdata += '</tr>';

							k = k + 1;
						}
						$("#tb_selSubject").append(tdata); 
						//$("#div_subject").append(subjdata); 
					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		saveInfoToData: function () {		
			
			$.ajax({
					url: 'php/ee_save_progressing.php',
					dataType: 'json',
					type: 'post',
					data: {
						
						eeid:			function(){return $("#text_ee_eid").val();},
						progressid:		function(){return $("#text_ee_progressid").val();},
						nextdeadline:	function(){return $("#text_ee_nextdeadline").val();},
						annotation:		function(){return $("#text_annotation").val();},
					},
					success: function(data) {
						
						if (data[0] == 'ok'){
							
							addInfoProgressing.init();
							addInfoProgressing.addCompletToTable();
							
							alert('Record has been saved!');
							$("#text_annotation").val("");
						}
						
					},
					error: function(){ 
						 alert('Save Record failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		deleteCompletInfo: function (initData) {		

			$.ajax({
					url: 'php/ee_delete_complet_progress.php',
					dataType: 'json',
					type: 'post',
					data: {
						CompletID:	initData
					},
					success: function(data) {
						//alert('ok');
						
						
						addInfoProgressing.init();
						addInfoProgressing.addCompletToTable();
						$("#text_annotation").val("");

					},
					error: function(){ 
						 alert('Delete Info error!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		updateTitleToData: function () {		
			//alert($("#chkbox_p2").attr("checked"));
			$.ajax({
					url: 'php/ee_update_title.php',
					dataType: 'json',
					type: 'post',
					data: {
						
						eeid:		function(){return $("#text_ee_eid").val();},
						eetitle:	function(){return $("#text_ee_title").val();},
					},
					success: function(data) {
						//alert(data[0]);
						if (data[0] == 'ok'){
							addInfoProgressing.init();
							addInfoProgressing.addCompletToTable();
							
						}else{
							alert(data[0]);
						}
					},
					error: function(){ 
						 alert('Update Info failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        }

    };

}();