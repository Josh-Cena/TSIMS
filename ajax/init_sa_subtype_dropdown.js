var initSubTypeDropDown = function () {

    return {
        //main function to initiate the module
        init: function (initdata) {
            
			$.ajax({
					url: 'php/init_sa_subtype_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						satypeid:		initdata
					},
					success: function (data) {
						//alert(data);
						$("#select_sa_subtype").empty();
						$("#select_sa_subtype").append("<option value='0'>选择项目......</option>"); 
						for(var i=0; i<data.length; i++){  
							$("#select_sa_subtype").append("<option value='" + data[i].SA_STypeID + "'>" + data[i].SA_SType  + "</option>"); 
						 }
					},
					error: function(){ 
						 alert('InitSubItem Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        }

    };

}();