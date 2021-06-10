var sTableEditable = function () {

    return {
		
		addDataToTable: function () {		
			
			$.ajax({
					url: 'php/sel_subject_level.php',
					dataType: 'json',
					type: 'post',
					data:{
						//studentID: studentVal,
						//yearID: yearIDVal
					},
					success: function (data) {
						
						$("#s_studentNo").empty();
						$("#s_studentNo").append(data.studentNo);
						
						$("#s_studentNanme").empty();
						$("#s_studentNanme").append(data.studentName);

						
						
						for(var i = 0; i < data.selSubject.length  ; i++){
							
							var subj = '#subject' + String(i+1);
							$(subj).empty();
							$(subj).append(data.selSubject[i].IB_Subject);
							
							var subj = '#select_level_' + String(i+1);
							$(subj).empty();
							var selsubj ='';
							selsubj += '<option value="0">选择Level ...</option>';

							for(var j = 0; j < data.Subject.length  ; j++){
								if(data.Subject[j].IB_Subject == data.selSubject[i].IB_Subject){
									selsubj += '<option value="'+ data.Subject[j].IB_SubjectID+'">';
									selsubj += data.Subject[j].IB_SubjectE + '</option>';
								}
							}
							
							$(subj).append(selsubj);
							
							var a = '#div_subject_' + String(i+1);
							$(a).show();
						}
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
		
		addSelToTable: function () {		
			
			$.ajax({
					url: 'php/sel_subject_level.php',
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
						
						for(var i = 0; i < data.selSubjectLevel.length; i++){
							
							tdata += '<tr>';
                            
							tdata += '<td style="width: 20%" class="fc-header-center">';
							tdata += '<span class="badge badge-info">' + k + '</span></td>';
                                
                            tdata += '<td style="width: 50%">'+ data.selSubjectLevel[i].IB_SubjectE + '</td>';
                                
                            tdata += '<td style="width: 30%">';
							tdata += '<button type="button" id="'+ data.selSubjectLevel[i].W_SClassTempID;
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
		
		addSelLevel: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_save_subject_level.php',
					dataType: 'json',
					type: 'post',
					data: {
						subjectid: val
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							//addG4Info.init();
							sTableEditable.addSelToTable(); 
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
		
		delSelLevel: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_del_subject_level.php',
					dataType: 'json',
					type: 'post',
					data: {
						sTempID: val
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							//addG4Info.init();
							sTableEditable.addSelToTable(); 
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

    };

}();