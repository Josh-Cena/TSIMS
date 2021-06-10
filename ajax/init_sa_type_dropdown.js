var initTypeDropDown = function () {

    return {
        //main function to initiate the module
        init: function () {
            
			$.ajax({
					url: 'php/init_sa_type_dropdown.php',
					dataType: 'json',
					type: 'post',
					data:{
						//classType:'subjectclass'
					},
					success: function (data) {
						//alert(data);
						$("#select_sa_type").empty();
						$("#select_sa_type").append("<option value='0'>选择项目分类......</option>"); 
						for(var i=0; i<data.length; i++){  
							$("#select_sa_type").append("<option value='" + data[i].SA_ITypeID + "'>" + data[i].SA_IType  + "</option>"); 
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