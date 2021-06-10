var initYearDropDown = function () {

    return {
        //main function to initiate the module
        init: function () {
            
			$.ajax({
					url: 'php/init_year_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						//classType:'subjectclass'
					},
					success: function (data) {
						//alert(data);
						$("#select_year").empty();
						//$("#select_year").append("<option value='0'>Select Year ...</option>"); 
						for(var i=0; i<data.length; i++){  
							$("#select_year").append("<option value='" + data[i].W_YearID + "'>" + data[i].W_Year  + "</option>"); 
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