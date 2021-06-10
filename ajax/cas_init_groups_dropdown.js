var initCASGroupsDropDown = function () {

    return {
        //main function to initiate the module
        init: function (initData) {
           
		   $.ajax({
					url: 'php/cas_init_groups_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						categoryid: 	initData,
					},
					success: function (data) {
						//alert(data[0].title);

						$("#select_group").empty();
						$("#select_group").append("<option value='0'>" + "选择社团 ..." +  "</option>");
						
						for(var i=0; i < data.length; i++){
							$("#select_group").append("<option value='" + data[i].C_GroupsID + "'>" + data[i].C_NameC +  "(" + data[i].C_GroupNo + ")</option>");
						}
						//}else{
						//	$("#select_item_mytasks").empty();
						//}
					},
					error: function(){ 
						 alert('Request Initdropdow failed2!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        }

    };

}();