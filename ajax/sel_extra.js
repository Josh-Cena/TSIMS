var sSelExtra = function () {

    return {
		
		init: function () {
           
		   $.ajax({
					url: 'php/sel_extra_ini.php',
					dataType: 'json',
					type: 'post',
					data:{
						
					},
					success: function (data) {
						//alert(data[0].title);
						
						$("#s_studentNo").empty();
						$("#s_studentNo").append(data.studentNo);
						
						$("#s_studentNanme").empty();
						$("#s_studentNanme").append(data.studentName);


						$("#select_extra_group1").empty();
						$("#select_extra_group1").append("<option value='0'>" + "选择分组 ..." +  "</option>");
						
						for(var i=0; i < data.selCategory.length; i++){
							$("#select_extra_group1").append("<option value='" + data.selCategory[i].Ex_CatID + "'>" + data.selCategory[i].Ex_CatName +  "(" + data.selCategory[i].Ex_CatNameE + ")</option>");
						}
						//}else{
						

						$("#select_extra_group2").empty();
						$("#select_extra_group2").append("<option value='0'>" + "选择分组 ..." +  "</option>");
						
						for(var i=0; i < data.selCategory.length; i++){
							$("#select_extra_group2").append("<option value='" + data.selCategory[i].Ex_CatID + "'>" + data.selCategory[i].Ex_CatName +  "(" + data.selCategory[i].Ex_CatNameE + ")</option>");
						}
						//}else{
						//	$("#select_item_mytasks").empty();
						//}
					

						$("#select_extra_group3").empty();
						$("#select_extra_group3").append("<option value='0'>" + "选择分组 ..." +  "</option>");
						
						for(var i=0; i < data.selCategory.length; i++){
							$("#select_extra_group3").append("<option value='" + data.selCategory[i].Ex_CatID + "'>" + data.selCategory[i].Ex_CatName +  "(" + data.selCategory[i].Ex_CatNameE + ")</option>");
						}
						
						
						/////////////////////////////////////////////
						//////////////////////////////////////////////
						
						$("#tb_selSubject").empty();
						var tdata='';
						var k = 1;
						
						for(var i = 0; i < data.selCourse.length; i++){
							
							tdata += '<tr>';
                            
							tdata += '<td style="width: 10%" class="fc-header-center">';
							tdata += '<span class="badge badge-info">' + k + '</span></td>';
                                
                            tdata += '<td style="width: 65%">'+ data.selCourse[i].Ex_CourseName + '(' + data.selCourse[i].Ex_Priority + ')</td>';
                                
                            tdata += '<td style="width: 25%">';
							tdata += '<button type="button" id="'+ data.selCourse[i].Ex_CSelID;
							tdata += '" class="btn btn-xs purple"><i class="fa fa-trash-o"></i> Delete</button></td>';
							
							tdata += '</tr>';

							k = k + 1;
						}
						$("#tb_selSubject").append(tdata); 
						//$("#div_subject").append(subjdata); 
						
					},
					error: function(){ 
						 alert('Request Initdropdow failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		addSeladdSelCour: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_extra_cour_ini.php',
					dataType: 'json',
					type: 'post',
					data: {
						catid: val
					},
					success: function(data) {
						
						$("#select_extra_cour1").empty();
						$("#select_extra_cour1").append("<option value='0'>" + "选择分组 ..." +  "</option>");
						
						for(var i=0; i < data.selCour.length; i++){
							$("#select_extra_cour1").append("<option value='" + data.selCour[i].Ex_CourseID + "'>" + data.selCour[i].Ex_CourseName +   "</option>");
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
		
		addSeladdSelCour2: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_extra_cour_ini.php',
					dataType: 'json',
					type: 'post',
					data: {
						catid: val
					},
					success: function(data) {
						
						$("#select_extra_cour2").empty();
						$("#select_extra_cour2").append("<option value='0'>" + "选择分组 ..." +  "</option>");
						
						for(var i=0; i < data.selCour.length; i++){
							$("#select_extra_cour2").append("<option value='" + data.selCour[i].Ex_CourseID + "'>" + data.selCour[i].Ex_CourseName +  "</option>");
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
		
		addSeladdSelCour3: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_extra_cour_ini.php',
					dataType: 'json',
					type: 'post',
					data: {
						catid: val
					},
					success: function(data) {
						
						$("#select_extra_cour3").empty();
						$("#select_extra_cour3").append("<option value='0'>" + "选择分组 ..." +  "</option>");
						
						for(var i=0; i < data.selCour.length; i++){
							$("#select_extra_cour3").append("<option value='" + data.selCour[i].Ex_CourseID + "'>" + data.selCour[i].Ex_CourseName +  "</option>");
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
		
		//////////////////////////////////////////////////////
		
		addCour: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_extra_cour.php',
					dataType: 'json',
					type: 'post',
					data: {
						courseid: val
					},
					success: function(data) {
						
						
						
						$("#group1").empty();
						$("#group1").append(data.selCourMAXQut);
						
						$("#grpA1").empty();
						$("#grpA1").append(data.selCourQut);
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
		
		addCour2: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_extra_cour.php',
					dataType: 'json',
					type: 'post',
					data: {
						courseid: val
					},
					success: function(data) {
						
						
						
						$("#group2").empty();
						$("#group2").append(data.selCourMAXQut);
						
						$("#grpA2").empty();
						$("#grpA2").append(data.selCourQut);
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
		
		addCour3: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_extra_cour.php',
					dataType: 'json',
					type: 'post',
					data: {
						courseid: val
					},
					success: function(data) {
						
						
						
						$("#group3").empty();
						$("#group3").append(data.selCourMAXQut);
						
						$("#grpA3").empty();
						$("#grpA3").append(data.selCourQut);
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
		
		
		/////////////////////////////////////
		////////////////////////////////////////
		
		
				
		addSelExtraCour: function (val,val2) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_save_extra.php',
					dataType: 'json',
					type: 'post',
					data: {
						courid: val,
						prty:   val2
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							sSelExtra.init(); 
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
		
		delSelExtra: function (val) {		
			//$v= $("input#text_a_date").val();
			
			//alert(val);
			$.ajax({
					url: 'php/sel_del_extra.php',
					dataType: 'json',
					type: 'post',
					data: {
						cselid: val
					},
					success: function(data) {
						
						if (data.status == 'ok'){
							//addG4Info.init();
							sSelExtra.init(); 
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