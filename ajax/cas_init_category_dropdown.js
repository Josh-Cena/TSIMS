var initCAScategoryDropDown = function () {

    return {
        //main function to initiate the module
        init: function () {
           
		   $.ajax({
					url: 'php/cas_init_category_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						
					},
					success: function (data) {
						//alert(data[0].title);

						$("#select_category").empty();
						$("#select_category").append("<option value='0'>" + "选择分组 ..." +  "</option>");
						
						for(var i=0; i < data.length; i++){
							$("#select_category").append("<option value='" + data[i].C_CategoryID + "'>" + data[i].C_Category +  "</option>");
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