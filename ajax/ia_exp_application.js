var addExpRecordInfo = function () {

    return {
		
		addProjectDropdown: function () {		
			$.ajax({
					url: 'php/ia_add_project_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						
						},
					success: function (data) {

						//$("#text_groupNo").val(data.groups[i].C_GroupNo);
						//$("#text_foundtime").val(data.groups[i].C_FoundTime);
						
						$("#select_my_project").empty();
						$("#select_my_project").append("<option value='0'>" + "选择项目......" +  "</option>");
						
						
						for(var i=0; i < data.project.length; i++){
							$("#select_my_project").append("<option value='" + data.project[i].OutlID + "'>" + data.project[i].I_Title + "(" + data.project[i].I_Subject + ")</option>");
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
		
		 addPeriodDropdown: function () {
           
		   $.ajax({
					url: 'php/ia_period_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
					},
					success: function (data) {
						
						$("#select_period").empty();
						$("#select_period").append("<option value='0'>" + "选择时间......" +  "</option>");
						for(var i=0; i < data.length; i++){
							if (data[i].W_LessonNo == 4.5){
								$("#select_period").append("<option value='" + data[i].W_LessonNo + "'>" + "Lunchtime" + "  (" + data[i].W_PeriodTime + ")</option>");
							}else{
								$("#select_period").append("<option value='" + data[i].W_LessonNo + "'>" + "Period " + data[i].W_LessonNo + "  (" + data[i].W_PeriodTime + ")</option>");
							}
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
	
		
		addExpTabal: function () {		
			$.ajax({
					url: 'php/ia_add_exp_tabal.php',
					dataType: 'json',
					type: 'post',
					data:{
						
						},
					success: function (data) {
						
						$("#ul_notice").empty();
						var ultext = '';
						var j = 0;
						
						for(var i = 0; i < data.experiment.length; i++){
							if(data.experiment[i].Exp_Yes == 1 ){
								ultext += '<li><a href="#">Period ' + data.experiment[i].W_LessonNo + ', ';
								ultext += data.experiment[i].Exp_Date +' <span class="text-success">(已确认)</span></a></li>';
								j = j + 1;
							}
								
						}
						if (j ==0){
							$("#ul_notice").append('<li><a href="#">No message.</a></li>');
						}else{
							$("#ul_notice").append(ultext);
						}
						/////////////////////////////////////////////////////////////////////////////////
						$("#exptabledata").empty();
						var expdata = '';
						var k = 0;
						//alert(data.experiment.length);
						//if (dada.status == 'ok'){
						for(var i = 0; i < data.experiment.length; i++){
							
							if ((data.experiment[i].Exp_Yes != 1)&&(data.experiment[i].Exp_Absent == 0)){
								k = k + 1;
								expdata += '<tr>';
								expdata += '<td class="fc-header-center">' +  k + '</td>';
								//expdata += '<td>' +  data.experiment[i].Exp_Content.substr(0,10) + '</td>';
								expdata += '<td>' +  data.experiment[i].Exp_Content + '</td>';
								expdata += '<td>' +  data.experiment[i].I_Subject + '</td>';
								expdata += '<td class="fc-header-center">' +  data.experiment[i].Exp_Date + '</td>';
								expdata += '<td class="fc-header-center">' +  data.experiment[i].W_LessonNo + '</td>';
								if(data.experiment[i].Exp_Yes == 0){
									expdata += '<td class="fc-header-center"><span class="text-primary">未确认</span></td>';
								}else{
									expdata += '<td class="fc-header-center"><span class="text-danger">拒绝</span></td>';
								}
								
								if(data.experiment[i].Exp_Absent == 1){
									expdata += '<td class="fc-header-center"><span class="text-success">完成</span></td>';
								}else if(data.experiment[i].Exp_Absent == -1){
									expdata += '<td class="fc-header-center"><span class="text-danger">缺席</span></td>';
								}else{
									expdata += '<td class="fc-header-center"><span class="text-primary">-</span></td>';
								}
								
								//expdata += '<td class="fc-header-center">' +  data.experiment[i].Exp_Absent + '</td>';
								expdata += '<td>' +  data.experiment[i].Refusal_explain + '</td>';
								expdata += '<td class="fc-header-center"><input type="hidden" name="calid" value="';
								expdata += data.experiment[i].ExpID + '">';
								expdata += '<div class="btn-group btn-group-xs btn-group-solid">';
								expdata += '<button type="button" id="' + data.experiment[i].ExpID;
								expdata += '" class="btn purple"><i class="fa fa-trash-o"></i> Delete</button></div></td>';
								expdata += '</tr>';
							}
						}
						
						$("#exptabledata").append(expdata);

					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		saveExpInfo: function () {		

			$.ajax({
					url: 'php/ia_task_student_save_exp.php',
					dataType: 'json',
					type: 'post',
					data: {
						oulid:			function(){return $('#select_my_project').children('option:selected').val();},
						expContent:		function(){return $("input#txt_content").val();},
						expDate:		function(){return $("input#text_a_date").val();},
						expPeriod:		function(){return $('#select_period').children('option:selected').val();},
						expDevice:		function(){return $("#text_device").val();},
						expMaterial:	function(){return $("#text_material").val();},
					},
					success: function(data) {
						
						if (data.status == 'ok'){
						
							$("input#txt_content").val('');
							$("input#text_a_date").val('');
							$("#text_device").val('');
							$("#text_material").val('');
							//$("#chkbox_g_record").attr("checked", false);
							//$("#chkbox_s_join").attr("checked", false);
							addExpRecordInfo.addExpTabal();
							$("#bn_save_records_info").removeAttr("disabled");
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
		
		deleteExpInfo: function (expID) {
			
			$.ajax({
					url: 'php/ia_exp_delete_application.php',
					dataType: 'json',
					type: 'post',
					data:{
						expid:		expID
						
					},
					success: function (data) {

						if(data.status =='ok'){
							addExpRecordInfo.addExpTabal();
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