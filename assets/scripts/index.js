var Index = function () {

    return {
		 
		 initInfo: function () {
			
			var tRole = 0;
			
			$.ajax({
					url: 'php/init_info.php',
					dataType: 'json',
					type: 'post',
					data:{
						//classType:'subjectclass'
					},
					success: function (data) {
						
						$("#s_username").empty();
						userData = '<small>' + data.studentname + '(' + data.nickname + ')</small>';
						userData += '<input type="hidden" id="studentid1" value="' + data.studentid + '" />';
						$("#s_username").append(userData);
					},
					error: function(){ 
						alert('InitInfo Request failed !');
						
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});
			

			
            
        },
		 
		 initCalendar: function () {
            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            if ($('#calendar').width() <= 400) {
                $('#calendar').addClass("mobile");
                h = {
                    left: 'title, prev, next',
                    center: '',
                    right: 'today,month,agendaWeek,agendaDay'
                };
            } else {
                $('#calendar').removeClass("mobile");
                if (App.isRTL()) {
                    h = {
                        right: 'title',
                        center: '',
                        left: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                } else {
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }               
            }

            $('#calendar').fullCalendar('destroy'); // destroy the calendar
            $('#calendar').fullCalendar({ //re-initialize the calendar
                disableDragging: false,
                header: h,
                editable: true,
                events: [{
                        title: 'All Day Event',                        
                        start: new Date(y, m, 1),
                        backgroundColor: App.getLayoutColorCode('yellow')
                    }, {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2),
                        backgroundColor: App.getLayoutColorCode('green')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d - 3, 16, 0),
                        allDay: false,
                        backgroundColor: App.getLayoutColorCode('red')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0),
                        allDay: false,
                        backgroundColor: App.getLayoutColorCode('green')
                    }, {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false,
                    }, {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        backgroundColor: App.getLayoutColorCode('grey'),
                        allDay: false,
                    }, {
						title : 'myTest',
						start : '2013-12-05',
						end   : '2013-12-07'
					}, {
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        backgroundColor: App.getLayoutColorCode('purple'),
                        allDay: false,
                    }, {
                        title: 'Click for Google',
                        start: new Date(y, m, 27),
                        end: new Date(y, m, 29),
                        backgroundColor: App.getLayoutColorCode('yellow'),
                        url: 'http://google.com/',
                    }
                ]
            });
        },
		
		//Revolution Slider

        initRevolutionSlider: function () {
            var api;
			
				 //setTimeout("", 1000);
				 //jQuery('#revolutionul').show();
				 
            api =  jQuery('.fullwidthabnner').revolution(
	                {
	                    delay:2000,
	                    startheight:380,
	                    startwidth:1150,

	                    hideThumbs:10,

	                    thumbWidth:100,                         // Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
	                    thumbHeight:50,
	                    thumbAmount:5,

	                    navigationType:"bullet",                // bullet, thumb, none
	                    navigationArrows:"solo",                // nexttobullets, solo (old name verticalcentered), none

	                    navigationStyle:"round",                // round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


	                    navigationHAlign:"center",              // Vertical Align top,center,bottom
	                    navigationVAlign:"bottom",              // Horizontal Align left,center,right
	                    navigationHOffset:0,
	                    navigationVOffset:20,

	                    soloArrowLeftHalign:"left",
	                    soloArrowLeftValign:"center",
	                    soloArrowLeftHOffset:20,
	                    soloArrowLeftVOffset:0,

	                    soloArrowRightHalign:"right",
	                    soloArrowRightValign:"center",
	                    soloArrowRightHOffset:20,
	                    soloArrowRightVOffset:0,

	                    touchenabled:"on",                      // Enable Swipe Function : on/off
	                    onHoverStop:"on",                       // Stop Banner Timet at Hover on Slide on/off

	                    stopAtSlide:-1,
	                    stopAfterLoops:-1,

	                    hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
						hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
						hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value

	                    shadow:1,                               //0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
	                    fullWidth:"on"                          // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
	                });
        },
		
		initMenu: function () {
			
			var tRole = 0;
			
			$.ajax({
					url: 'php/init_menu.php',
					dataType: 'json',
					type: 'post',
					data:{
						//classType:'subjectclass'
					},
					success: function (data) {

						if(data[0].M_Notice != 1){
							$('#menu_notice').hide();	
						}
						if(data[0].M_Course != 1){
							$('#menu_course').hide();	
						}
						if(data[0].M_Course_Level != 1){
							$('#menu_course_level').hide();	
						}
						if(data[0].M_Course_Subj != 1){
							$('#menu_course_subj').hide();	
						}
						if(data[0].M_Course_Timetable != 1){
							$('#menu_course_timetable').hide();	
						}
						
						if(data[0].M_Trascript != 1){
							$('#menu_trascript').hide();	
						}
						if(data[0].M_Progress_report != 1){
							$('#menu_progress_report').hide();	
						}
						if(data[0].M_Trascript2 != 1){
							$('#menu_trascript2').hide();	
						}
						if(data[0].M_Progress_report2 != 1){
							$('#menu_progress_report2').hide();	
						}
						if(data[0].M_CAS != 1){
							$('#menu_cas').hide();
						}
						if(data[0].M_CAS_mygroup != 1){
							$('#menu_cas_mygroup').hide();
						}
						if(data[0].M_CAS_evalution != 1){
							$('#menu_cas_evalution').hide();
						}
						if(data[0].M_CAS_records != 1){
							$('#menu_cas_records').hide();
						}
						if(data[0].M_CAS_reflection != 1){
							$('#menu_cas_reflection').hide();
						}
						if(data[0].M_CAS_joingroup != 1){
							$('#menu_cas_joingroup').hide();
						}
						if(data[0].M_CAS_project != 1){
							$('#menu_cas_project').hide();
						}
						if(data[0].M_CAS_groupinfo != 1){
							$('#menu_cas_groupinfo').hide();
						}
						if(data[0].M_CAS_plan != 1){
							$('#menu_cas_plan').hide();
						}
						//////
						if(data[0].M_IA != 1){
							$('#menu_ia').hide();
						}

						if(data[0].M_EE != 1){
							$('#menu_ee').hide();
						}
						
						if(data[0].M_G4 != 1){
							$('#menu_g4').hide();
						}
						if(data[0].M_SA != 1){
							$('#menu_sa').hide();
						}
						
						if(data[0].M_GC != 1){
							$('#menu_gc').hide();
						}
						
						if(data[0].M_Extra != 1){
							$('#menu_extra').hide();
						}
						
						if(data[0].M_ExSel != 1){
							$('#menu_extra_sel').hide();
						}
						
						if(data[0].M_Show != 1){
							$('#menu_show').hide();
						}
						

					},
					error: function(){ 
						alert('Init Request failed!');
						$('#menu_notice').hide();
						$('#menu_course').hide();
						$('#menu_trascript').hide();
						$('#menu_cas').hide();
						$('#menu_ee').hide();
						$('#menu_show').hide();
						
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        },


    };
}();