var sTableEditable = function () {

    return {
		
		addDataToTable: function () {		
			
			$.ajax({
					url: 'php/sel_subject.php',
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

						
						
						for(var i = 0; i < data.maxSL  ; i++){
							
							
							var subj = '#select_subject_' + String(i+1);
							$(subj).empty();
							var selsubj ='';
							
							selsubj += '<option value="0">选择学科 ...</option>';
							if( i == 0 ){
								
								selsubj += '<option value="'+ data.selSubjectSL[0].IB_SubjectID+'">';
								selsubj += data.selSubjectSL[0].IB_SubjectE + '</option>';
								//selsubj += '<option value="'+ data.selSubjectSL[1].IB_SubjectID+'">';
								//selsubj += data.selSubjectSL[1].IB_SubjectE + '</option>';
							}
							if( i == 1 ){
								
								selsubj += '<option value="'+ data.selSubjectSL[1].IB_SubjectID+'">';
								selsubj += data.selSubjectSL[1].IB_SubjectE + '</option>';
								//selsubj += '<option value="'+ data.selSubjectSL[1].IB_SubjectID+'">';
								//selsubj += data.selSubjectSL[1].IB_SubjectE + '</option>';
							}

							for(var j = 2; j < data.selSubjectSL.length   ; j++){
								
								if(data.selSubjectSL[j].IB_Selgroup == i + 2){
									selsubj += '<option value="'+ data.selSubjectSL[j].IB_SubjectID+'">';
									selsubj += data.selSubjectSL[j].IB_SubjectE + '</option>';
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
					url: 'php/sel_subject.php',
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
		
		addSelSubject: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_save_subject.php',
					dataType: 'json',
					type: 'post',
					data: {
						subjectid: val
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							sTableEditable.addSelToTable(); 
						}else{
							alert(data.status);
						}
					},
					error: function(){ 
						//alert(data.status);
						alert('Save Record failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		delSelSubject: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_del_subject.php',
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