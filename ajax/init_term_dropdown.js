var initTermDropDown = function () {

    return {
        //main function to initiate the module
        init: function () {
            
			$.ajax({
					url: 'php/init_term_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						//classType:'subjectclass'
					},
					success: function (data) {
						//alert(data);
						$("#select_item_term").empty();
						$("#select_item_term").append("<option value='0'>选择学期......</option>"); 
						for(var i=0; i<data.length; i++){  
							$("#select_item_term").append("<option value='" + data[i].W_YearID + "'>" + data[i].W_Year + "(T" + data[i].W_Term + ")</option>"); 
						 }
					},
					error: function(){ 
						 alert('InitTermDropdown Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        }

    };

}();