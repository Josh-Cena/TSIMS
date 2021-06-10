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
						
						$("#tableData").empty();
						var tableData = '';

						for(var i=0; i < data.groups.length; i++){
							tableData += '<tr>';
                        	tableData += '<td class="fc-header-center">' + (i + 1) + '</td>';
                        	
							tableData += '<td>' + data.groups[i].C_NameC + '(' + data.groups[i].C_NameE + ')</td>';
							tableData += '<td class="fc-header-center">' + data.groups[i].C_GroupNo + '</td>';
                        	tableData += '<td class="fc-header-center">' + data.groups[i].C_Category + '</td>';
                        	//tableData += '<td>辅导老师</td>';
							if(data.groups[i].ProjectYes == 1){
                        		var pYes = '是';
							}else{
								var pYes = '否';
							}
							tableData += '<td class="fc-header-center">' + pYes + '</td>';
                        	tableData += '<td class="fc-header-center">';
							tableData += '<div class="btn-group btn-group-xs btn-group-solid">';
							tableData += '<button type="button" id="' + data.groups[i].C_MemberID;
							tableData += '" class="btn blue"><i class="fa fa-check-square-o"></i> Confirm</button></div></td>';
                    		tableData += '</tr>';
						}
						$("#tableData").append(tableData);
					},
					error: function(){ 
						 alert('Request failed4!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },
		
	
		
		updateRecords: function (thisVal) {		
			
			$.ajax({
					url: 'php/cas_modify_projectyes.php',
					dataType: 'json',
					type: 'post',
					data: {
						memberid:	thisVal,

					},
					success: function(data) {
						
						if (data.status == 'ok'){
							addGroupRecordInfo.init();
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