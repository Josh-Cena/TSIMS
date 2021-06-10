var recordsList = function () {

    return {
		
		addDataTolist: function () {		
			$.ajax({
					url: 'php/cas_student_reflection_browse.php',
					dataType: 'json',
					type: 	'post',
					//cache:	false,
					data:{
						studentid: 	function(){return $("#select_item_student").children('option:selected').val();},
						yearid:   	function(){return $("#select_item_term").children('option:selected').val();},
						recordYes: 	function(){return $("#select_reco_or_refle").children('option:selected').val();},
						},
					success: function (data) {
						 //alert(data.length);
						if(data.recordYes ==1){
							//////////////////记录
							$("#records_head").empty();
							var thead='';
							
							thead +='<h4>活动记录</h4>';
							thead +='<div class="blog-item">';
							thead +='<ul class="blog-info" id="u_grouprecord">';
							thead +='<li><i class="fa  fa-user"></i></li>';
							thead +='<li>' + data.sname + '</li>';
							thead +='<li><i class="fa fa-comments"></i>记录总数</li>';
							thead +=' <li>' + data.recordCount[0].recCount + '</li>';    
							thead +='<li><i class="fa fa-clock-o"></i>活动时间：</li>';    
							thead +='<li> C ' + data.recordCount[0].SumC + 'hr</li>';    
							thead +='<li> A ' + data.recordCount[0].SumA + 'hr</li>';
							thead +='<li> S ' + data.recordCount[0].SumS + 'hr</li>';
							thead +='<li><i class="fa fa-clock-o"></i>累计时间</li>';
							thead +='<li> ' + data.recordCount[0].SumCAS + 'hr</li>';
							thead +='</ul></div>';
						
							$("#records_head").append(thead); 
							
							////////////////////////////////////////////////////////////////////////
							
							var pageLength = 5;
							
							if(data.recordlist.length >pageLength){
								var iL = pageLength;
							}else{
								var iL=(data.recordlist.length);
							}
							
							$("#records_or_reflection").empty();
							var rdata='';
							
							for(var i =0; i<iL; i++){
								
								rdata +='<hr><div class="news-item-page">';
								rdata +='<ul class="list-inline">';
								rdata +='<li><a href="#"><i class="fa fa-calendar"></i></a>' + data.recordlist[i].C_Date.substr(0,10) + ' </li>';
								rdata +='<li><a href="#"><i class="fa fa-tags"></i></a>' + data.recordlist[i].C_NameE + ' </li>';
								rdata +='<li><a href="#"><i class="fa fa-clock-o"></i></a>时间：</li>';
								rdata +='<li> C ' + data.recordlist[i].C_DurationC + 'hr, </li>';
								rdata +='<li> A ' + data.recordlist[i].C_DurationA + 'hr, </li>';
								rdata +='<li> S ' + data.recordlist[i].C_DurationS + 'hr </li>';
								rdata +='</ul>';
								rdata +='<p>' + data.recordlist[i].C_Reflection + '</p>';
								rdata +='</div>';
	
							 }
								 
							 $("#records_or_reflection").append(rdata); 
							 $("#dynamic_pager_content1").html("Showing " + 1  + " to " + iL + " of " + data.recordlist.length + " entries");
							 
							 var totalVal = Math.ceil((data.recordlist.length) / pageLength) ;
							 
							 $('#dynamic_pager_demo1').bootpag({
								  
								  paginationClass: 'pagination',
								  next: '<icon class="fa fa-angle-right"></i>',
								  prev: '<icon class="fa fa-angle-left"></i>',
								  total: totalVal,
								  page: 1,
							  
							  }).on("page", function(event, num){
								  
								  
								  $("#records_or_reflection").empty();
								  var rdata='';
								  
								  if ((data.recordlist.length - (num * pageLength))>0){ 
									  var iLength = (num * pageLength);
									  var initV = (num - 1) * pageLength;
									 
								  }else{
									  var iLength = data.recordlist.length;
									  var initV = (num - 1) * pageLength;
								  }
	
								  for(var i = initV; i<iLength; i++){
									  //var i=12;
									  rdata +='<div class="news-item-page">';
									  rdata +='<ul class="list-inline">';
									  rdata +='<li><a href="#"><i class="fa fa-calendar"></i></a>' + data.recordlist[i].C_Date.substr(0,10) + ' </li>';
									  rdata +='<li><a href="#"><i class="fa fa-tags"></i></a>' + data.recordlist[i].C_NameE + ' </li>';
									  rdata +='<li><a href="#"><i class="fa fa-clock-o"></i></a>时间：</li>';
									  rdata +='<li> C ' + data.recordlist[i].C_DurationC + 'hr, </li>';
									  rdata +='<li> A ' + data.recordlist[i].C_DurationA + 'hr, </li>';
									  rdata +='<li> S ' + data.recordlist[i].C_DurationS + 'hr </li>';
									  rdata +='</ul>';
									  rdata +='<p>' + data.recordlist[i].C_Reflection + '</p>';
									  rdata +='</div>';
	
								   } 
								  //alert(data[0].StudentNo); 
								  $("#records_or_reflection").append(rdata); 
								  $("#dynamic_pager_content1").html("Showing " + (1 + initV) + " to " +(iLength) + " of " + data.recordlist.length + " entries"); 
	
							  });
							  /////////////////记录end
							  
						}else if(data.recordYes == 2){
							//////////////////////////////////////////////////////////
							/////反思
							$("#records_head").empty();
							var thead='';
							
							thead +='<h4>活动反思</h4>';
							thead +='<div class="blog-item">';
							thead +='<ul class="blog-info" id="u_grouprecord">';
							thead +='<li><i class="fa  fa-user"></i> ' + data.sname + ' </li>';
							thead +='<li><i class="fa fa-tags"></i> 参加社团数</li>';    
							thead +='<li> ' + data.groupCount + ' </li>';    
							thead +='<li><i class="fa fa-comments"></i>篇数</li>';
							thead +=' <li>' + data.refleCount[0].refCount + ' </li>';
							thead +='<li><i class="fa fa-star-o"></i>平均分</li>';    
							thead +='<li> ' + parseFloat(data.refleCount[0].AvgE).toFixed(1) + ' </li>'; 
							thead +='</ul></div>';
						
							$("#records_head").append(thead); 

							////////////////////////////////////////////////////////////////////////
							
							var pageLength = 1;
							
							if(data.reflelist.length >pageLength){
								var iL = pageLength;
							}else{
								var iL=(data.reflelist.length);
							}
							
							$("#records_or_reflection").empty();
							var rdata='';
							
							for(var i =0; i<iL; i++){
								
								rdata +='<div class="news-item-page">';
								
								rdata +='<div class="well"><h4>' + data.reflelist[i].C_Title + ' </h4>';
								rdata += data.reflelist[i].C_Content +'</div>';
								rdata +='<ul class="list-inline">';
								rdata +='<li><a href="#"><i class="fa fa-calendar"></i></a> ' + data.reflelist[i].C_Date.substr(0,10) + ' </li>';
								rdata +='<li><a href="#"><i class="fa fa-tags"></i></a> ' + data.reflelist[i].C_NameE + ' </li>';
								
								rdata +='<li><a href="#"><i class="fa fa-star-o"></i></a>评分</li>';    
								rdata +='<li> ' + data.reflelist[i].C_Evaluate + ' </li>'; 
								rdata +='</ul>';
								rdata += '<hr><p><strong>Keywords: </strong></p><p> ';
								if(data.reflelist[i].C_lo_1 != ''){
									rdata += '(1)'+ data.reflelist[i].C_lo_1 + ', ';
								}
								if(data.reflelist[i].C_lo_2 != ''){
									rdata += '(2)'+ data.reflelist[i].C_lo_2+ ', ';
								}
								if(data.reflelist[i].C_lo_3 != ''){
									rdata += '(3)'+data.reflelist[i].C_lo_3+ ', ';
								}
								if(data.reflelist[i].C_lo_4 != ''){
									rdata += '(4)'+data.reflelist[i].C_lo_4+ ', ';
								}
								if(data.reflelist[i].C_lo_5 != ''){
									rdata += '(5)'+data.reflelist[i].C_lo_5+ ', ';
								}
								if(data.reflelist[i].C_lo_6 != ''){
									rdata += '(6)'+data.reflelist[i].C_lo_6+ ', ';
								}
								if(data.reflelist[i].C_lo_7 != ''){
									rdata += '(7)'+data.reflelist[i].C_lo_7+ ', ';
								}
								if(data.reflelist[i].C_lo_8 != ''){
									rdata += '(8)'+data.reflelist[i].C_lo_8;
								}
								rdata += '</p>'
								rdata += '<p><strong>Evaluation: </strong></p><p> ';
								rdata += '<p>' + data.reflelist[i].C_Review + '</p>';
								rdata +='</div>';
	
							 }
								 
							 $("#records_or_reflection").append(rdata); 
							 $("#dynamic_pager_content1").html("Showing " + 1  + " to " + iL + " of " + data.reflelist.length + " entries");
							 
							 var totalVal = Math.ceil((data.reflelist.length) / pageLength) ;
							 
							 $('#dynamic_pager_demo1').bootpag({
								  
								  paginationClass: 'pagination',
								  next: '<icon class="fa fa-angle-right"></i>',
								  prev: '<icon class="fa fa-angle-left"></i>',
								  total: totalVal,
								  page: 1,
							  
							  }).on("page", function(event, num){
								  
								  
								  $("#records_or_reflection").empty();
								  var rdata='';
								  
								  if ((data.reflelist.length - (num * pageLength))>0){ 
									  var iLength = (num * pageLength);
									  var initV = (num - 1) * pageLength;
									 
								  }else{
									  var iLength = data.reflelist.length;
									  var initV = (num - 1) * pageLength;
								  }
	
								  for(var i = initV; i<iLength; i++){
									  //var i=12;
									  rdata +='<div class="news-item-page">';
									 
									  rdata +='<div class="well"><h4>' + data.reflelist[i].C_Title + ' </h4>';
									  rdata += data.reflelist[i].C_Content + ' </div>';
									   rdata +='<ul class="list-inline">';
									  rdata +='<li><a href="#"><i class="fa fa-calendar"></i></a>' + data.reflelist[i].C_Date.substr(0,10) + ' </li>';
									  rdata +='<li><a href="#"><i class="fa fa-tags"></i></a>' + data.reflelist[i].C_NameE + ' </li>';
									  rdata +='<li><a href="#"><i class="fa fa-star-o"></i></a>评分</li>';    
									  rdata +='<li> ' + data.reflelist[i].C_Evaluate + ' </li>'; 
									  rdata +='</ul>';
									  rdata += '<hr><p><strong>Keywords: </strong></p><p> ';
									  if(data.reflelist[i].C_lo_1 != ''){
										  rdata += '(1)'+ data.reflelist[i].C_lo_1 + ', ';
									  }
									  if(data.reflelist[i].C_lo_2 != ''){
										  rdata += '(2)'+ data.reflelist[i].C_lo_2+ ', ';
									  }
									  if(data.reflelist[i].C_lo_3 != ''){
										  rdata += '(3)'+data.reflelist[i].C_lo_3+ ', ';
									  }
									  if(data.reflelist[i].C_lo_4 != ''){
										  rdata += '(4)'+data.reflelist[i].C_lo_4+ ', ';
									  }
									  if(data.reflelist[i].C_lo_5 != ''){
										  rdata += '(5)'+data.reflelist[i].C_lo_5+ ', ';
									  }
									  if(data.reflelist[i].C_lo_6 != ''){
										  rdata += '(6)'+data.reflelist[i].C_lo_6+ ', ';
									  }
									  if(data.reflelist[i].C_lo_7 != ''){
										  rdata += '(7)'+data.reflelist[i].C_lo_7+ ', ';
									  }
									  if(data.reflelist[i].C_lo_8 != ''){
										  rdata += '(8)'+data.reflelist[i].C_lo_8;
									  }
									  rdata += '</p>';
									  rdata += '<p><strong>Evaluation: </strong></p><p> ';
									  rdata += '<p>' + data.reflelist[i].C_Review + '</p>';
									  rdata +='</div>';
	
								   } 
								  //alert(data[0].StudentNo); 
								  $("#records_or_reflection").append(rdata); 

								  $("#dynamic_pager_content1").html("Showing " + (1 + initV) + " to " +(iLength) + " of " + data.reflelist.length + " entries"); 
	
							  });

							
						}else if(data.recordYes == 3){
							
							$("#records_head").empty();
							var thead='';
							thead +='<h4>没有记录</h4>';
							$("#records_head").append(thead);
							
							$("#records_or_reflection").empty();
							var rdata='<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />';
               				rdata +='<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />';
							$("#records_or_reflection").append(rdata); 
							
						}
						  ///////////////////////////////////////////////////////////////////////////////////////
					},
					error: function(){ 
						 //alert('Request failed!');
					},
					beforeSend: function(){ 
						//alert("Loading!...");
					}
			});

        }

    };

}();