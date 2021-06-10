var Logout = function () {

	var handleLogout = function() {

		  $.ajax({
				  url: 'php/login.php',
				  dataType: 'json',
				  type: 'post',
				  data:{
					 
				  },
				  success: function (data) {
					 alert('Logout!'); 
				  },
				  error: function(){ 
					   alert('Request failed2!');
				  },
				  beforeSend: function(){  //送请求前调
					  //alert("正在载...");
				  }
		  });

    };

}();