var Login = function () {

	var handleLogin = function() {

		$('.login-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                username: {
	                    required: true
						
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                }
	            },

	            messages: {
	                username: {
	                    required: "Username is required."
	                },
	                password: {
	                    required: "Password is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                //form.submit(); // form validation success, call ajax form submit
					
					$.ajax({
							url: 'php/login.php',
							dataType: 'json',
							type: 'post',
							data:{
								username:function(){return $("input#username").val();},
								password:function(){return $("input#password").val();}
							},
							success: function (data) {
								//alert(data.username+'-'+data.password+'-'+data.status); 
								if(data.status=='ok'){
									form.submit();
								 }else{
								    alert('Request failed!'); 
								 }
							},
							error: function(){ 
								 alert('Request failed2!');
							},
							beforeSend: function(){  //送请求前调
								//alert("正在载...");
							}
					});
	            }
	        });

	        $('.login-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                    //form validation success, call ajax form submit
						$.ajax({
								url: 'php/login.php',
								dataType: 'json',
								type: 'post',
								data:{
									username:function(){return $("input#username").val();},
									password:function(){return $("input#password").val();}
								},
								success: function (data) {
									//alert(data.username+'-'+data.password+'-'+data.status); 
									if(data.status=='ok'){
										$('.login-form').submit();
									 }else{
										alert('Request failed!'); 
									 }
								},
								error: function(){ 
									 alert('Request failed2!');
								},
								beforeSend: function(){  //送请求前调
									//alert("正在载...");
								}
						});
	                }
	                return false;
	            }
	        });
	}

	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "Email is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	        });

	}

	var handleRegister = function () {

		/**function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }


		$("#select2_sample4").select2({
		  	placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
            allowClear: true,
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) {
                return m;
            }
        });


			$('#select2_sample4').change(function () {
                $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });**/



         $('.register-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                
	                
	                opassword: {
	                    required: true
	                },
	                npassword: {
	                    required: true
	                },
	                rnpassword: {
	                    equalTo: "#npassword"
	                },

	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	                tnc: {
	                    required: "Please confirm it !"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.insertAfter($('#register_tnc_error'));
	                } else if (element.closest('.input-icon').size() === 1) {
	                    error.insertAfter(element.closest('.input-icon'));
	                } else {
	                	error.insertAfter(element);
	                }
	            },

	            submitHandler: function (form) {
	                $.ajax({
							url: 'php/login_register.php',
							dataType: 'json',
							type: 'post',
							data:{
								username:	function(){return $("input#rusername").val();},
								opassword:	function(){return $("input#opassword").val();},
								npassword:	function(){return $("input#npassword").val();}
							},
							success: function (data) {
								//alert(data.username+'-'+data.password+'-'+data.status); 
								if(data.status == 'ok'){
									alert('Password successfully changed, please login again!');
									form.submit();
								 }else{
								    alert('Register failed!'); 
								 }
							},
							error: function(){ 
								 //alert(data.status+'Register failed2!');
								 alert('Register failed 2!');
							},
							beforeSend: function(){  //送请求前调
								//alert("正在载...");
							}
					});
	            }
	        });

			$('.register-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.register-form').validate().form()) {
	                    $('.register-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#register-btn').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.register-form').show();
	        });

	        jQuery('#register-back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.register-form').hide();
	        });
	}
    
    return {
        //main function to initiate the module
        init: function () {
        	
			jQuery('.forget-form').hide();
			jQuery('.register-form').hide();
			
            handleLogin();
            handleForgetPassword();
            handleRegister();        
	       
        }

    };

}();