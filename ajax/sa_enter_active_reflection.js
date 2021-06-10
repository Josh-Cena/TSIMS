var addSAReflec = function () {

    return {
		
		init: function () {		
			$.ajax({
					url: 'php/sa_add_reflection.php',
					dataType: 'json',
					type: 'post',
					data:{
						studentid:		function(){return $('#studentid1').val();},
						
						},
					success: function (data) {
						//alert(data.reflection.length);
						
						$("#tbdata").empty();
						var tdata = '';
						var k = 1;
						for(var i = 0; i < data.reflection.length; i++){
							tdata += '<tr>'; 
							tdata += '<td class="fc-header-center">' + k + '</td>';  
							tdata += '<td>' + data.reflection[i].SA_Title + '</td>';
							tdata += '<td>' + data.reflection[i].SA_IType + '(' + data.reflection[i].SA_SType + ')</td>';
							tdata += '<td class="fc-header-center">' + data.reflection[i].SA_RecordDate + '</td>';
							if(data.reflection[i].SA_Confirm == 0){
								tdata += '<td class="fc-header-center">未确认</td>';
							}else if(data.reflection[i].SA_Confirm == 2){
								tdata += '<td class="fc-header-center"><p class="text-danger">被拒绝</p></td>';
							}else{
								tdata += '<td class="fc-header-center">-</td>';
							}
							
							tdata += '<td class="fc-header-center"><input type="hidden"' + data.reflection[i].SA_RefID;
							tdata += '<div class="btn-group btn-group-xs btn-group-solid">';
							tdata += '<button type="button" id="' + data.reflection[i].SA_RefID;
							tdata += '" class="btn yellow btn-xs"><i class="fa fa-trash-o"></i> Delete</button></div>';
							tdata += '</td>';
							
							tdata += '</tr>';
							k = k + 1;
						}
						
						$("#tbdata").append(tdata); 
						//alert(data.gmember.length);

						/**
						$("#d_essay_list").empty();
						var actreflec = '';
						//alert(data.gmember.length);
						for(var i = 0; i < data.reflection.length; i++){
							actreflec += '<ul class="blog-info"><li><i class="fa fa-files-o"></i> ';
							actreflec += data.reflection[i].SA_Title + '</li>';
							actreflec += '<li><i class="fa fa-tag"></i> ';
							actreflec += data.reflection[i].SA_IType + '(' + data.reflection[i].SA_SType + ')</li>';
							actreflec += '<li><i class="fa fa-calendar"></i> ';
							actreflec += data.reflection[i].SA_RecordDate + '</li>';
							actreflec += '<li><i class="fa fa-pencil-square-o"></i> 未确认</li>';
							actreflec += '<li><input type="hidden"';
							actreflec += data.reflection[i].SA_RefID + '"></li>';
							
							actreflec += '<li><div class="btn-group btn-group-xs btn-group-solid">';
							actreflec += '<button type="button" id="' + data.reflection[i].SA_RefID;
							actreflec += '" class="btn yellow"><i class="fa fa-trash-o"></i> Delete</button></div></li></ul>';

							//actreflec += '<p>' + data.reflection[i].C_Summary + '</p><br />';

						}
						$("#d_essay_list").append(actreflec);
						**/
						//alert(data.reflection[0].C_Summary);
					},
					error: function(){ 
						 alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		

		saveSARefle: function () {		
			
			$.ajax({
					url: 'php/sa_save_reflection.php',
					dataType: 'json',
					type: 'post',
					data: {
						subtypeid:		function(){return $('#select_sa_subtype').children('option:selected').val();},
						refltitle:		function(){return $("input#text_title").val();},
						refdate:		function(){return $("input#text_a_date").val();},
						refnote:		function(){return $("#text_reflection").val();},
						studentid:		function(){return $('#studentid1').val();},
					},
					success: function(data) {
						if (data.status == 'ok'){
							$("input#text_title").val('');
							$("#text_reflection").val('');
							var selValue=$('#select_sa_type').children('option:selected').val();
							initSubTypeDropDown.init(selValue);
							addSAReflec.init();
							$("#bn_save_sa_reflection").removeAttr("disabled");
							alert("Data were saved successfully!");
						}else{
							alert(data.status);
							$('#bn_save_sa_reflection').removeAttr("disabled");
						}
						//alert('Record has been saved!');
					},
					error: function(){ 
						$("#bn_save_sa_reflection").removeAttr("disabled");
						alert('Save Record failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
		deleteRefleRecords: function (reflID) {

			$.ajax({
					url: 'php/sa_delete_reflection.php',
					dataType: 'json',
					type: 'post',
					data:{
						reflecid:		reflID
						
					},
					success: function (data) {
						if(data.status =='ok'){
							addSAReflec.init();
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
        },
		
		previewRefle: function () {
			 
			  if($("#id_contents").val()!=1){
				  $('#d_preview').show();
				  var a = $("#text_reflection").val();
				  $("#text_preview").empty();
				  $("#text_preview").append(a);
				  $("#bn_preview_sa_contents").empty();
				  $("#bn_preview_sa_contents").append('Continue Edit');
				  $("#d_text_contents").hide();
				  $("#id_contents").val(1);
			  }else{
				  $('#d_preview').hide();
				  $("#d_text_contents").show();
				  $("#id_contents").val(0);
				  $("#bn_preview_sa_contents").empty();
				  $("#bn_preview_sa_contents").append('Preview');
			  }
            
        },


    };

}();