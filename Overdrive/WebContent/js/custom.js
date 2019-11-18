  
/*Initialising various variables */
  var entireData=[]; 
  var finalData=[];
  var uniqueCarBrands=[];
  var uniqueCarTypes=[];
  var count=0;
  var index=0;
  var selectedCar="";
  var featuredCarList=[];
  
  /*getting the json file */
 $.getJSON('carco.json', function(data) 
               {
	          
	             count=data.cars.length;
	             entireData=data.cars;
               
	            var  carBrandscount =0 ;
	            var carBrands=[];
	            var carTypes=[];
	            var years=[];
	            var price=[];
	                
	             /* Fetching all brand names */
	         	 var j=0;          
	             for (i = 0; i < count; i++)
	             {
	            	
	            		
	            			carBrands[j]=entireData[i].name;
	            			carTypes[j]=entireData[i].type;
	            			years[j]=entireData[i].year;
	            			
	            		    j++;
	              } 
	             /*picking up unique car brands for dropdown */
	             var uniqueCarBrands= carBrands.filter(function(itm,i,carBrands)
	            		 {
	            	       return i==carBrands.indexOf(itm);
	            	 
	            		 });
	             
	             /*picking up unique car types for dropdown */
	             var uniqueCarTypes= carTypes.filter(function(itm,i,carTypes)
	            		 {
	            	       return i==carTypes.indexOf(itm);
	            	 
	            		 });
	             
	             /*picking up unique car years for dropdown */
	            var years = years.filter(function(itm,i,years)
	            		 {
         	       return i==years.indexOf(itm);
         	 
         		 });
	            
	             // populating the various dropdowns
	             var $carBrandsDD= $("#carBrands");
	             for (var i=0; i< uniqueCarBrands.length ;i++ )
	            	 {
	            	 $carBrandsDD.append($("<option />").val(uniqueCarBrands[i]).text(uniqueCarBrands[i]));	             

	            	 }
	           
	             var $carTypesDD= $("#carTypes");
	             for (var i=0; i< uniqueCarTypes.length ;i++ )
	            	 {
	            	 $carTypesDD.append($("<option />").val(uniqueCarTypes[i]).text(uniqueCarTypes[i]));	             

	            	 }
	                 years.sort();
	             var $yearsDD= $("#years");
	             for (var i=0; i< years.length ;i++ )
	            	 {
	            	 $yearsDD.append($("<option />").val(years[i]).text(years[i]));	             

	            	 }
	             
	          // featured cars functionality  		
	    		 var k=0;          
	             for (i = 0; i < count; i++)
	             {            	
	               			price[k]=entireData[i].price; 	          			
	            		    k++;
	              }
	          
	          ar=[]
	          p=0
	          for(j = 0; j < 4; j++){	        	  
		          p = Math.max(...price);		            
	        	
	        	  ar[j] = p;
	        	  price.splice(price.indexOf(p),1);
	          }  
	       
	          
	          fcarId = [];
	          for(j = 0; j < 4; j++){
	        	  	  for(i = 0; i < count; i++){
	        	  		  if(ar[j] == entireData[i].price){
	        	  			fcarId.push(entireData[i].id);
	        	  		  }
	        	  	  }
	          }
	         
	      
	         			         
	         var $indexCar = $("#indexCarList");
	        
	             
	      	 for(j = 0; j < 4; j++){
	        	 $indexCar
	        	 .append($("<div>").attr("class","index-featured-car")
	        	 .append($("<span>").attr("class","car-image")
	     		 .append($("<img>").attr("src", entireData[fcarId[j]].image1)))
	     		 .append($("<br>")).append($("<span>").attr("class","car-description").text(entireData[fcarId[j]].name)).append($("<br>"))
	     		 .append($("<span>").attr("class","car-price").text("Euro" + " "+entireData[fcarId[j]].price)).append($("<br>"))
	     		 .append($("<span>").attr("class","car-button").append($("<button>").attr("id",entireData[fcarId[j]].id).attr("class","fCarButton").text("VIEW MORE"))));
	     		 
	                           
	        }  
	      	 
	      	 
	      	$(".fCarButton").click(function() {
	      		 finalData=entireData;
	      	     var id = this.id;
	      	     index=id;
	      	 	 const image1 = document.getElementById("image1");
        	     image1.innerHTML = '';
        	     const image2 = document.getElementById("image2");
        	     image2.innerHTML = '';
        	     const image3 = document.getElementById("image3");
        	     image3.innerHTML = '';
        	     
        	     $('html, body').animate({
        	         scrollTop: $("#rowResult").offset().top
        	     }, 500);
        	     
        	   //  selectedCar=entireData[index].name +"-"+entireData[index].model;
	      	   
	      		   var $name1 = $("#image1");
	               var $name2 = $("#image2");
	               var $name3 = $("#image3");	               
	               
	               document.getElementById("search-car-details").style.display = "none";
   	               document.getElementById("selected-car-details").style.display = "";
   	               $('#expandedImg').removeAttr('src');
   	           
   	               document.getElementById("carDet").style.display = "none";
	               $name1.append($("<img>").attr('src', entireData[id].image1).attr('style',"width:100%").attr('onclick',"myFunction(this);"));
	               $name2.append($("<img>").attr('src', entireData[id].image2).attr('style',"width:100%").attr('onclick',"myFunction(this);"));
	               $name3.append($("<img>").attr('src', entireData[id].image3).attr('style',"width:100%").attr('onclick',"myFunction(this);"));
	             
	               document.getElementById("carName").innerHTML = "Brand : "+ entireData[id].name ;
	    		   document.getElementById("carModel").innerHTML = "Model : "+ entireData[id].model ;
	    		   document.getElementById("carType").innerHTML = "Type : "+entireData[id].type ;
	    		   document.getElementById("carPrice").innerHTML = "Price : &euro; " +entireData[id].price;
	    		   document.getElementById("carYear").innerHTML =  "Year : "+entireData[id].year;
	      	});
	         
	       //featured car functionality ends.   
	       
	      //searched  car functionality starts
	       $("#search").click(function() 
	            { 
	    	         finalData=[];
	    	         //clearing the details
     	             document.getElementById("search-car-details").style.display = "";
     	             document.getElementById("selected-car-details").style.display = "none";
     	             $('#expandedImg').removeAttr('src');
	            	 var brandState = $("#carBrands").children(":selected").attr("value");
	   	             var typeState = $("#carTypes").children(":selected").attr("value");
	   	             var minState = $("#minPrice").children(":selected").attr("value");
	   	             var maxState = $("#maxPrice").children(":selected").attr("value");
	   	             var yearState = $("#years").children(":selected").attr("value");
	   	             
	   	             //clearing the car details
	   	             document.getElementById("open-button").style.display = "";  
	   	 	         document.getElementById("carName").innerHTML="";
	   	 	         document.getElementById("carModel").innerHTML="";
	   	 	         document.getElementById("carType").innerHTML="";
	   	 	         document.getElementById("carPrice").innerHTML="";
	   	 	         document.getElementById("carYear").innerHTML="";
	   	             document.getElementById("noresult").style.display ="none";
	            	 var $sectionId = $("#search-car") 
	            	 const myNode = document.getElementById("search-car");
	            	 myNode.innerHTML = '';
	            	 const image1 = document.getElementById("image1");
	            	 image1.innerHTML = '';
	            	 const image2 = document.getElementById("image2");
	            	 image2.innerHTML = '';
	            	 const image3 = document.getElementById("image3");
	            	 image3.innerHTML = '';
	            	 const expandedImg =document.getElementById("expandedImg");
	            	 expandedImg.innerHTML ='';
	            	 var element = document.getElementById("search-car");
	            	
	            	 //removing slickslider
	            	 element.classList.remove("slick-initialized");
	            	 element.classList.remove("slick-slider");
	            	 
	            	 
	            	//filter conditions
	           		 if(brandState == "All Brands" && typeState=="All Types" && yearState =="All Years")
	            		 {  
	           			    if (minState ==0 && maxState== 0)
	           			    	{
	           			    		finalData=entireData;
	           			    	}
	           			    else
	           			    	{   
	           			    	    
	           			    	    
	           			    	     j=0;
	           			    		 for (var i = 0; i < entireData.length; i++)
    	            		 			{  
	           			    			
	           			    			 if (maxState > entireData[i].price && minState < entireData[i].price)
	           			    				 {
	           			    				
	           			    					finalData[j]=entireData[i];
    	            							j++;
	           			    				 }
    	            		 			}
	           			    	}
	            	 		
	           			 	for(var i=0;i<finalData.length;i++ )
	            	 			{
	            	 		        var id= "image_"+finalData[i].id;
	            	 		       
	            	 		//		$sectionId.append($("<div>").append($("<img>").attr('src', entireData[i].image1).attr('id',id).attr('class','selectedCar')));           	 		
	        	 					$sectionId.append($("<div>").append($("<img>").attr('src', finalData[i].image1)));           	 		
	
	            	 			}
	            	   
	           			 /*	console.log(finalData);*/
	           			 	 var windowWidth = $(window).width();

                            // alert(windowWidth);
                             
                             if( windowWidth >= 320 &&  windowWidth<=500)
                            	 {
                            	 $(".regular").slick({
         	 	            		
    	 	            	   		 dots: false,
    	 	            	  		 infinite: true,
    	 	            	    	 slidesToShow: 1,
    	 	            	  	     slidesToScroll: 1,
    	 	            	  	     
    	 	            	  	    
    	 	            	 		 });        
                            	 
                            	 }
                             else if( windowWidth >= 501 &&  windowWidth<=767)
                        	 {
                        	 $(".regular").slick({
     	 	            		
	 	            	   		 dots: false,
	 	            	  		 infinite: true,
	 	            	    	 slidesToShow: 2,
	 	            	  	     slidesToScroll: 1,
	 	            	  	     
	 	            	  	    
	 	            	 		 });        
                        	 
                        	 }
                             else if( windowWidth >= 768 &&  windowWidth<=900)
                        	 {
                        	 $(".regular").slick({
     	 	            		
	 	            	   		 dots: false,
	 	            	  		 infinite: true,
	 	            	    	 slidesToShow: 3,
	 	            	  	     slidesToScroll: 1,
	 	            	  	     
	 	            	  	    
	 	            	 		 });        
                        	 
                        	 }
                             
                             else{
                            	 
                            	 $(".regular").slick({
         	 	            		
    	 	            	   		 dots: false,
    	 	            	  		 infinite: true,
    	 	            	    	 slidesToShow: 4,
    	 	            	  	     slidesToScroll: 4
    	 	            	 		 });    
                             }
	            	 		     
	            	 	
	            		 }
	            	 else
	            		 {
	            			 if (maxState ==0)
	            				{
	            					maxState=2000000;
	            				}
	            		
	            			 j=0;
	    	           		  for (var i = 0; i < entireData.length; i++)
	    	            		 {  
	    	            		   if(brandState == "All Brands")
	    	            			 {
	    	            				if(typeState!="All Types" && typeState ==entireData[i].type && (maxState > entireData[i].price && minState < entireData[i].price) ) 
	    	            		
	    	            					{
	    	            						finalData[j]=entireData[i];
	    	            						j++;
	    	            				
	    	            					}
	    	            				else if (typeState=="All Types" && (maxState > entireData[i].price && minState < entireData[i].price))
	    	            				
	    	            					{
	    	            		
	    	            						finalData[j]=entireData[i];
         										j++;
	    	            		
	    	            					}
	    	            			 }
	    	            	  		else 
	    	             	   	 		{    
	    	            	  			 if(brandState == entireData[i].name && typeState!="All Types" && typeState==entireData[i].type &&  (maxState > entireData[i].price && minState < entireData[i].price) ) 
		    	            		
	            							{
	            								finalData[j]=entireData[i];
	            								j++;
	            							}
	            					 	 else if (brandState == entireData[i].name && typeState=="All Types" &&  (maxState > entireData[i].price && minState < entireData[i].price))
	            				
	            							{
	            		
	            								finalData[j]=entireData[i];
												j++;
	            		
	            							}
	    	            	   
	    	               				 } 
	    	            		 
	    	            		   
	    	                 }
	    	           		  
	    	           		  
	    	           	//filter conditions for years
	    	           	  var finaldata= finalData;
   	            		  if (yearState!="All Years")
   	            			  {
   	            			     finalData=[];
   	            			     j=0;
   	            			     for(var i=0;i< finaldata.length ;i++)
   	            			    	 {
   	            			    	 if(finaldata[i].year==yearState)
   	            			    		 {
   	            			    		 finalData[j]=finaldata[i]
   	            			    		 j++;
   	            			    		 }
   	            			    	 
   	            			    	 }
   	            			  }
	    	           		  
	    	           	for(var i=0;i<finalData.length;i++)
        	 				{
        	 		
        	 					$sectionId.append($("<div>").append($("<img>").attr('src', finalData[i].image1)));           	 		
        	 			            	 		
        	 				}
	    	        	
	    	        	
	    	          
            		  	 $(".regular").slick({
	 	            		        
	            	   				 dots: false,
	            	  		 		 infinite: true,
	            	    			 slidesToShow: 4,
	            	  	  			 slidesToScroll: 4,
	            	  	  			 focusOnSelect:true,
	            	  	  			  touchMove: false,
	            	 			 });     
            		  	 
            		  	 
            	
	    	           	if (finalData.length==0)
	    	           		{
	    	           		document.getElementById("noresult").style.display ="";
	    	           		document.getElementById("noresult").innerHTML="No cars available...sorry";
	    	           		
	    	           		}
	            		 }
	           		
	           		 
	           		//action on clicking any car image on slick slider
	           		$('.slick-slide').on('click', function(ev)
	           			{
	           		           index=$(ev.currentTarget).data('slick-index')
	           			      
	           		       //    console.log('onClick slick-index:', $(ev.currentTarget).data('slick-index'));
	           	           //    console.log("final=",finalData[index])
	           	                document.getElementById("open-button").style.display = "none";
	           	               document.getElementById("search-car-details").style.display = "none";
	           	               document.getElementById("selected-car-details").style.display = "";
	           	               var $name1 = $("#image1");
	           	               var $name2 = $("#image2");
	           	               var $name3 = $("#image3");
	           	               
	           	               $name1.append($("<img>").attr('src', finalData[index].image1).attr('style',"width:100%").attr('onclick',"myFunction(this);"));
	           	               $name2.append($("<img>").attr('src', finalData[index].image2).attr('style',"width:100%").attr('onclick',"myFunction(this);"));
	           	               $name3.append($("<img>").attr('src', finalData[index].image3).attr('style',"width:100%").attr('onclick',"myFunction(this);"));
	           		     });
	           		
	           		//scroll animation using jquery
	           		$('html, body').animate({
	        	        scrollTop: $("#search-car-details").offset().top
	        	    }, 500);
	           	  
	           	 
	             }); 
	       
	     

	            
               }); 
     
	//opening bigger image of the clicked car image along with car details
 function myFunction(imgs) {
	   
		  var expandImg = document.getElementById("expandedImg");
		  var imgText = document.getElementById("imgtext");
		  document.getElementById("carDet").style.display = "";
		  document.getElementById("open-button").style.display = "";
		
 	     
 	      document.getElementById("carName").innerHTML="";
 	      document.getElementById("carModel").innerHTML="";
 	      document.getElementById("carType").innerHTML="";
 	      document.getElementById("carPrice").innerHTML="";
 	      document.getElementById("carYear").innerHTML="";
 	    
		  expandImg.src = imgs.src;
		  imgText.innerHTML = imgs.alt;
		  expandImg.parentElement.style.display = "block";
		  $('html, body').animate({
  	        scrollTop: $("#expandedImg").offset().top
  	    }, 500);
		   selectedCar=finalData[index].name +"-"+finalData[index].model;
		   document.getElementById("carName").innerHTML = "Brand : "+ finalData[index].name ;
		   document.getElementById("carModel").innerHTML = "Model : "+ finalData[index].model ;
		   document.getElementById("carType").innerHTML = "Type : "+finalData[index].type ;
		   document.getElementById("carPrice").innerHTML = "Price : &euro; " +finalData[index].price;
		   document.getElementById("carYear").innerHTML =  "Year : "+finalData[index].year;


		   
		}
       
//clearing form details
 function openForm() 
 {
   document.getElementById("open-button").style.display = "none";
   document.getElementById("myForm").style.display = "block";
   document.getElementById("email").value="";
   document.getElementById("name").value="";
   document.getElementById("carmodel").value=selectedCar;
   document.getElementById("contactnumber").value="";
 }

 
 //validate email functionality
 function validateEmail() 
 {
     var email= document.getElementById("email").value ;
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!re.test(String(email).toLowerCase()))
     {
        document.getElementById("emailerror").innerHTML="Invalid Email";
        return false;
       
     }
     else
     {

       document.getElementById("emailerror").innerHTML="";
       return true;
     }

 }

//validate name functionality
 function validateName()
 {
  var name = document.getElementById("name").value;
   

    if(name == "" || name== null)
    {
      document.getElementById("nameerror").innerHTML="Name cannot be blank";
      return false;
    }
    else
    {
     document.getElementById("nameerror").innerHTML="";
     return true;
    }
 }

//validate phone functionality
 function validatephno() 
 {
     var cno = document.getElementById("contactnumber").value;
      
     if(isNaN(parseFloat(cno)) || cno<1)
     {
       document.getElementById("contactnumbererror").innerHTML="Invalid number";
       return false;
     }
     else
     {

        document.getElementById("contactnumbererror").innerHTML="";
        return true;
     }
 }

//block keyboard buttons
 function blockSpecialCharAndAlpha(e)
 {
         var k;
         document.all ? k = e.keyCode : k = e.which;
         return ( k == 8 || (k >= 48 && k <= 57));
 }

 function blockSpecialCharAndNumbers(e)
 {
        var k;
         document.all ? k = e.keyCode : k = e.which;
         return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k==39 );
 }

//final validation for form
 function submitForm()
 {
   var name = document.getElementById("name").value;
   var carmodel = document.getElementById("carmodel").value;

   if(!validateEmail() || !validateName() || !validatephno() )
   {
     return false;
   }


  alert(name+" your details registered successfully for the car model "+ carmodel);
  document.getElementById("myForm").style.display = "none";
 }
 
 //clearing the form on closing the form
 function closeForm()
 {
	 
	 document.getElementById("open-button").style.display = "";
	   document.getElementById("myForm").style.display = "none";
	   document.getElementById("email").value="";
	   document.getElementById("name").value="";
	   document.getElementById("carmodel").value="";
	   document.getElementById("contactnumber").value="";
	 
	 
 }
 
 //scroll down functionality when clicked on menu bar
 
 $("#aboutUs").click(function() {
    $('html, body').animate({
        scrollTop: $("#about-us").offset().top
    }, 1000);
});
 
 $("#contactUs").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#contact-us").offset().top
	    }, 1500);
	});
 
 
 $("#featuredCars").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#featured-car-list").offset().top
	    }, 1000);
	});
 
 
