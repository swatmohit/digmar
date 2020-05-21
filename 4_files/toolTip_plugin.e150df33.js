$.fn.tooltipNew=function(a){function b(a,b){this.toolTipCont.css({left:a,top:b})}function c(a){this.toolTipCont.find("em").removeClass().addClass("arrow-leftC"),b.call(this,a.rigthDir_LeftPos,a.nodeTop-a.tooltipHt/2),this.toolTipCont.removeClass(a.animatnGrp[0],a.animatnGrp[2],a.animatnGrp[3]).addClass(a.animatnGrp[1])}function d(a){this.toolTipCont.find("em").removeClass().addClass("arrow-upC"),b.call(this,a.nodeLeft-a.tooltipWdth/2+a.nodeWidth/2,a.bottomDir_topPos+a.ttTipHeight),this.toolTipCont.removeClass(a.animatnGrp[0],a.animatnGrp[1],a.animatnGrp[3]).addClass(a.animatnGrp[2])}function e(a){this.toolTipCont.find("em").removeClass().addClass("arrow-rightC"),b.call(this,a.leftDir_leftPos,a.nodeTop-a.tooltipHt/2),this.toolTipCont.removeClass(a.animatnGrp[0],a.animatnGrp[2],a.animatnGrp[1]).addClass(a.animatnGrp[3])}function f(a){this.toolTipCont.find("em").removeClass().addClass("arrow-downC"),b.call(this,a.nodeLeft-a.tooltipWdth/2+a.nodeWidth/2,a.topDir_topPos-a.ttTipHeight),this.toolTipCont.removeClass(a.animatnGrp[1],a.animatnGrp[2],a.animatnGrp[3]).addClass(a.animatnGrp[0])}function g(b){// This function set tooltip at right side if sufficent space available to show tooltip then return true else false
// This function set tooltip at right side if sufficent space available to show tooltip then return true else false
return b.horizontal_distance>=b.tooltipWdth&&b.nodeTop-(a(window).scrollTop()+b.wrapperTop)>b.tooltipHt&&b.vertical_distance>=b.tooltipHt&&(c.call(this,b),!0)}function h(a){// This function set tooltip at bottom
// This function set tooltip at bottom
//	if((((obj.nodeLeft-20)-obj.viewportLeft) >= obj.tooltipWdth)/* && (obj.horizontal_distance >= obj.tooltipWdth)*/) {
return a.vertical_distance>=a.tooltipHt&&(d.call(this,a),!0)}function j(b){// This function set tooltip at left
// This function set tooltip at left
return b.nodeLeft-b.viewportLeft>=b.tooltipWdth&&b.nodeTop-(a(window).scrollTop()+b.wrapperTop)>b.tooltipHt&&b.vertical_distance>=b.tooltipHt&&(e.call(this,b),!0)}function k(b){// This function set tooltip on top	
// This function set tooltip on top	
return b.nodeTop-(a(window).scrollTop()+b.wrapperTop)>b.tooltipHt&&(f.call(this,b),!0)}var l=["top","right","bottom","left"],m=null,n={list:{},"class":"tooltipDflt",dir:"right",tipWidth:20,tipHeight:20,wrapper:"body",open:{event:"mouseover",anim:""},close:{event:"mouseleave",node:"",//Selector
anim:""}},o=function(b){this.options=a.extend(!0,{},n,b)},p=function(a,b){return"top"==a?k.call(this,b):"right"==a?g.call(this,b):"bottom"==a?h.call(this,b):"left"==a?j.call(this,b):void 0},q=function(b,c){
//console.log(this,dir,obj)
var d=p.call(this,b,c);if(d)return d;var e=a.inArray(b,l),f=(e+1)%l.length,g=a.inArray(this.options.dir,l);
//console.log(index,indexNext,defaultIndex);
//console.log(index,indexNext,defaultIndex);
return f==g||void q.call(this,l[f],c)},r=function(){
//this : toolTipObject
//this.node : target
//this.options :
//Node's events
var b=this.options.open.event,c=this.options.close.event,d=this.options.close.node,e=this.toolTipCont=a('<div class="tooltipBox">');
//Inject tooltip Structure
//toolTipCont.insertAfter(this.node);
e.appendTo("body");
//Add classes from user's options			
var f=this.options["class"],g=f.replace(/\,/g," ");e.addClass(g);
//Open and close event on strucute
var h=this;this.node.on(b,function(){h.open()}),this.node.on(c,function(){var a=0;h.toolTipCont.on("mouseenter",function(){a=1}),setTimeout(function(){a?h.toolTipCont.on("mouseleave",function(){h.close()}):h.close()},100)}),d&&this.node.on("click",d,function(){h.close()})},s={open:function(){
//direction for tooltip
var b={};a(".tooltipBox");b.ttDirection=this.options.dir;
//animation classes for opening the tooltip
var c=this.options.open.anim,d=b.animatnGrp=c.split(",");if(1==d.length)for(i=0;i<3;i++)d.push(c);
//wrapper 
b.wrapElem=a(this.options.wrapper);var e=b.wrapElem.offset();b.wrapperLeft=e.left,b.wrapperTop=e.top,b.wrapperHt=b.wrapElem.height(),
//Get node's tooltip number and value
b.ttTipWidth=this.options.tipWidth,b.ttTipHeight=this.options.tipHeight;
//console.log(ttTipWidth)
var f=this.node.attr("tooltip"),g=this.options.list[f];a(this.toolTipCont).css("max-width",a(window).width()/2);var h=this.toolTipCont;
//Node's(Target) height and width
b.nodeHeight=this.node.outerHeight(),b.nodeWidth=this.node.outerWidth();
//Node's(Target) position
var j=this.node.offset();b.nodeLeft=j.left,b.nodeTop=j.top,
//show tooltip
h.html(g).show(),
//get height of tooltip
b.tooltipHt=h.height(),
//get Outerheight of tooltip
b.tooltipOuterHt=h.outerHeight(),
//get width of tooltip
b.tooltipWdth=h.outerWidth(),b.rigthDir_LeftPos=b.nodeLeft+b.nodeWidth+b.ttTipWidth,b.topDir_topPos=b.nodeTop-b.tooltipOuterHt,b.leftDir_leftPos=b.nodeLeft-b.tooltipWdth-b.ttTipWidth,b.bottomDir_topPos=b.nodeTop+b.nodeHeight;/* Responsive tooltip */
var k=this.node.offset().left,l=this.node.offset().top,n=k+this.node.outerWidth(),o=l+this.node.outerHeight(),p=a(window).width()+a(window).scrollLeft(),r=a(window).height()+a(window).scrollTop();b.viewportLeft=a(window).width()-a(window).scrollLeft()-k,b.horizontal_distance=p-n,b.vertical_distance=r-o;q.call(this,b.ttDirection,b),/*				if(ttDirection == 'left'){
					checkForLeft();					
					}
				if(ttDirection == 'right'){
					checkForRight();										
					}
				if(ttDirection == 'top'){
					checkForTop();					
					}
				if(ttDirection == 'bottom'){
					checkForBottom();					
					}*/
/*function checkForRight(){  // This function set tooltip at right side if sufficent space available to show tooltip then return true else false
					rightCount++;							
					if(($(wrapElem).width()-(nodeLeft+nodeWidth))>tooltipWdth){									
						rightCondition();
						return true;
					}
					return false;
					/*else{
						if(rightCount == 1){checkForLeft()}
						if(rightCount == 2){checkForTop()}
						if(rightCount == 3){checkForBottom()}
						if(rightCount == 4){
								rightCondition();								
							}
					}										
				}				
				function checkForBottom(){ // This function set tooltip at bottom
					bottomCount++;
					if((wrapperHt)-(nodeTop+nodeHeight)>=(tooltipHt)){					
						if($(window).height()-(nodeTop-$(window).scrollTop()+nodeHeight)>(tooltipHt)){							
							bottomCondition();
							return true;
						}					
						return false;
						/*}else{
							if(bottomCount == 1){checkForTop()}
							if(bottomCount == 2){checkForLeft()}
							if(bottomCount == 3){checkForRight()}
							if(bottomCount == 4){
									bottomCondition();									
								}					
						}
					}
					else{
							if(bottomCount == 1){checkForTop()}
							if(bottomCount == 2){checkForLeft()}
							if(bottomCount == 3){checkForRight()}
							if(bottomCount == 4){
									bottomCondition();									
								}		
					}
				}
				function checkForLeft(){	// This function set tooltip at left
						leftCount++;
						if((nodeLeft-wrapperLeft) > tooltipWdth){
							leftCondition();
							return true;
						}
						return false;
						/*else{
							if(leftCount == 1){checkForRight()}
							if(leftCount == 2){checkForTop()}
							if(leftCount == 3){checkForBottom()}
							if(leftCount == 4){
									leftCondition();
								
								}				
							}
						}						
				function checkForTop(){		// This function set tooltip on top	
						topCount++
						if((nodeTop-($(window).scrollTop()+wrapperTop)) > tooltipHt){							
							topCondition();
							return true;
						}
						return false;
						
						/*else{
							if(topCount == 1){checkForBottom()}
							if(topCount == 2){checkForRight()}
							if(topCount == 3){checkForLeft()}
							if(topCount == 4){
									topCondition();
								
								}	
						}
					}*/
m?m.close():"",h.fadeIn(),m=this},close:function(){this.toolTipCont.hide()}},t=function(a,b){o.call(this,a),this.node=b,r.call(this)};return t.prototype=s,function(b){return a.each(this,function(c,d){if(!a(d).data("tooltip")){var e=new t(b,a(d));a(d).data("tooltip",e)}}),this.data("tooltip")}}(jQuery);var menuContent={tip_1000:"<p>Click to watch video tutorial</p><span>Understanding Requirements in RMS</span><p> A complete guide to understanding the concept of Requirements, and best practices you need to follow when advertising Jobs on external platforms.</p>",tip_1001:"<p>Click to watch video tutorial</p><span>Posting Requirements on Job Boards</span><p> RMS enables you to easily advertise open positions on external job platforms. Learn more about the Group/Employer and Recruiter Visibility concepts in RMS.</p>",tip_1002:"<p>Click to watch video tutorial</p><span>Using Questionnaires in RMS</span><p> Get the most relevant applications to your jobs. We'll show you why Questionnaires are important and how you can use them in RMS.</p>",tip_1003:"<p>Click to watch video tutorial</p><span>Response Filters help you filter out matching applications</span><p> Create Custom Filters for your jobs to get only relevant applications in your Inbox while filtering out junk profiles.</p>",tip_1004:"<p>Click to watch video tutorial</p><span>Tracking the Requirements that you are working on</span><p> RMS makes it easy for you to track your Requirements to closure. Learn the concepts of Requirement Listing page, Requirement Dashboard, Application Inbox and CV Details page.</p>",tip_1005:"<p>Click to watch video tutorial</p><span>Clusters in RMS</span><p> Use RMS's Clusters and Filters to manage applications and profiles that are available in your system more efficiently. Identify the right candidates with greater ease.</p>",tip_1006:"<p>Click to watch video tutorial</p><span>Basic Search in RMS</span><p> Use RMS's Quick Search feature to readily filter out relevant profiles from your database and use your ever growing candidate database more effectively.</p>",tip_1007:"<p>Click to watch video tutorial</p><span>Advanced Search in RMS</span><p> Learn how to use RMS's powerful Advanced Search feature.</p>",tip_1009:"<p>Click to watch video tutorial</p><span>Bulk Uploading Data into RMS</span><p>  Use RMS’s data upload feature to convert your static personal data into searchable profiles. You can upload Excel sheets, resume dumps in doc, pdf, zip, pst formats and more.</p>",tip_1010:"<p>Click to watch video tutorial</p><span>Link Emails to Import Data into RMS</span><p>  Convert the static profiles and resumes you receive on your Email Ids into searchable profiles in RMS. Check out RMS’s unique Email Import feature.</p>",tip_1011:"<p>Click to watch video tutorial</p><span>Linking your Gmail account to RMS</span><p> You can also securely link your Gmail Ids into RMS to import profiles and resumes. We show you how to do this using Google’s 2-step verification process.</p>"},vidTipOptions={list:menuContent,order:["left","right","bottom","top"],dir:"bottom",tipWidth:5,tipHeight:5,wrapper:"body",open:{event:"mouseover"},close:{event:"mouseout"}};$(window).on("load",function(){$(".tip").tooltipNew(vidTipOptions)});