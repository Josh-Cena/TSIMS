var addReflecInfo = function () {

    return {
		
		init: function (thisVal) {		
			$.ajax({
					url: 'php/cas_add_reflection.php',
					dataType: 'json',
					type: 'post',
					data:{
						groupid:  thisVal
						},
					success: function (data) {
						//alert(data.reflection.length);
						
						
						$("#d_essay_list").empty();
						var actreflec = '';
						//alert(data.gmember.length);
						for(var i=0; i < data.reflection.length; i++){
							actreflec += '<ul class="blog-info"><li><i class="fa fa-calendar"></i> ';
							actreflec += data.reflection[i].C_Date + '</li>';
							actreflec += '<li><i class="fa fa-tags"></i> ';
							actreflec += data.reflection[i].C_Title + '</li><li><input type="hidden"';
							actreflec += data.reflection[i].C_RefID + '"></li>';
							
							actreflec += '<li><div class="btn-group btn-group-xs btn-group-solid">';
							actreflec += '<button type="button" id="' + data.reflection[i].C_RefID;
							actreflec += '" class="btn default"><i class="fa fa-trash-o"></i> Delete</button></div></li></ul>';

							actreflec += '<p>' + data.reflection[i].C_Summary + '</p><br />';

						}
						$("#d_essay_list").append(actreflec);
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
		
		initMygroupsDropdow: function () {		
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
							if(data.nogroups[i].C_GroupNo == '014002'){
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

		saveRefleRecords: function () {		
			
			if($("#chkbox_lo1").attr("checked") == "checked"){
				var lo_1 = $("#chkbox_lo1").val();
			}else{
				var lo_1  = '';
			}
			if($("#chkbox_lo2").attr("checked") == "checked"){
				var lo_2 = $("#chkbox_lo2").val();
			}else{
				var lo_2  = '';
			}
			if($("#chkbox_lo3").attr("checked") == "checked"){
				var lo_3 = $("#chkbox_lo3").val();
			}else{
				var lo_3  = '';
			}
			if($("#chkbox_lo4").attr("checked") == "checked"){
				var lo_4 = $("#chkbox_lo4").val();
			}else{
				var lo_4  = '';
			}
			if($("#chkbox_lo5").attr("checked") == "checked"){
				var lo_5 = $("#chkbox_lo5").val();
			}else{
				var lo_5  = '';
			}
			if($("#chkbox_lo6").attr("checked") == "checked"){
				var lo_6 = $("#chkbox_lo6").val();
			}else{
				var lo_6  = '';
			}
			if($("#chkbox_lo7").attr("checked") == "checked"){
				var lo_7 = $("#chkbox_lo7").val();
			}else{
				var lo_7  = '';
			}
			if($("#chkbox_lo8").attr("checked") == "checked"){
				var lo_8 = $("#chkbox_lo8").val();
			}else{
				var lo_8  = '';
			}
			
			$.ajax({
					url: 'php/cas_save_reflection.php',
					dataType: 'json',
					type: 'post',
					data: {
						groupid:		function(){return $('#select_my_group').children('option:selected').val();},
						refltitle:		function(){return $("input#text_title").val();},
						summary:		function(){return $("#text_summary").val();},
						refnote:		function(){return $("#text_reflection").val();},
						studentid:		function(){return $('#studentid1').val();},
						c_lo1:     		lo_1,
						c_lo2:     		lo_2,
						c_lo3:     		lo_3,
						c_lo4:     		lo_4,
						c_lo5:     		lo_5,
						c_lo6:     		lo_6,
						c_lo7:     		lo_7,
						c_lo8:     		lo_8,
					},
					success: function(data) {
						if (data.status == 'ok'){
							$("input#text_title").val('');
							$("#text_summary").val('');
							$("#text_reflection").val('');
							$("#chkbox_lo1").attr("checked", false);
							$("#chkbox_lo2").attr("checked", false);
							$("#chkbox_lo3").attr("checked", false);
							$("#chkbox_lo4").attr("checked", false);
							$("#chkbox_lo5").attr("checked", false);
							$("#chkbox_lo6").attr("checked", false);
							$("#chkbox_lo7").attr("checked", false);
							$("#chkbox_lo8").attr("checked", false);
							var selValue=$('#select_my_group').children('option:selected').val();
							addReflecInfo.init(selValue);
							addReflecInfo.initMygroupsDropdow();
							alert("Data were saved successfully!");
						}else{
							alert(data.status);
							$('#bn_save_your_reflection').removeAttr("disabled");
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
		
		deleteRefleRecords: function (recordID) {

			$.ajax({
					url: 'php/cas_delete_reflection.php',
					dataType: 'json',
					type: 'post',
					data:{
						reflecid:		recordID
						
					},
					success: function (data) {
						if(data.status =='ok'){
							var selValue=$('#select_my_group').children('option:selected').val();
							addReflecInfo.init(selValue);
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
				  $("#bn_preview_your_contents").empty();
				  $("#bn_preview_your_contents").append('Continue Edit');
				  $("#d_text_contents").hide();
				  $("#id_contents").val(1);
			  }else{
				  $('#d_preview').hide();
				  $("#d_text_contents").show();
				  $("#id_contents").val(0);
				  $("#bn_preview_your_contents").empty();
				  $("#bn_preview_your_contents").append('Preview');
			  }
            
        },


    };

}();