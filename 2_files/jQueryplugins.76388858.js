/*
* Author: Nitin Giri 
* Version: 1.7
* Updated By: Rohit Dixit
* Description: Masking Changes integrated and new version created after merge conflict
*/
/*start of jquery Stringify*/
// formating, parameter rename, and optimize code
/***End***/
function createTags(a){var b,c,d,e=this;e.key=a.key||"",e.keyAsVal=a.keyAsVal,
//_t.text = ob.text.toLowerCase();
e.text=a.text.replace(/\\/g,""),e.contId=a.contId,e.sugElm=a.suggestorNode,e.deleteIcon=a.deleteIcon!==!1||a.deleteIcon,e.tagType=a.tagType||"li",e.onClick=a.onClick||function(){},e.onCreate=a.onCreate||function(){},e.onDelete=a.onDelete||function(){},e.placeTagEnd=a.placeTagEnd||!1,e.retainText=a.retainText||!1,e.hiddenAttr=a.hiddenAttr||!1;var f,g=e.text.replace(/\s/g,"-").replace(/\_/g,"|xudrScrx|").toLowerCase();b=e.deleteIcon?'<a class="dCross" href="javascript:void(0)"></a>':"",d=e.hiddenAttr?"data-hidden='"+e.hiddenAttr+"'":"","a"==e.tagType?(c='href="javascript:void(0)"',f=$('<li class="tagit" data-id='+e.key+"_"+g+"><"+e.tagType+" "+c+' class="tagTxt">'+e.text+"</span>"+b+"</"+e.tagType+">")):f=$("<li "+d+' class="tagit" data-id='+e.key+"_"+g+' > <span class="tagTxt">'+e.text+"</span>"+b+"</li>"),f.on("click",function(){e.onClick(f)}).children(".dCross").on("click",function(){e.onDelete(f)}),e.container=e.contId,e.hdElm=a.hiddenTag||e.container.children("input"),
//_t.hdElm 		= _t.container.children('input');
e.setValue(e.keyAsVal?e.key:e.text,f),// set value in hidden field
e.bindEvent_cross(f)}function themeActive(a){$(a).bind("click",function(){for(var b=$(this);"div"!=b[0].nodeName.toLowerCase();)b=b.parent();$(a).removeClass("active"),b.addClass("active")})}var DEBUG=!0;jQuery.extend({stringify:function(a){var b=typeof a;if("object"!=b||null===a)
// simple data type
return"string"==b&&(a='"'+a+'"'),String(a);
// recurse array or object
var c,d,e=[],f=a&&a.constructor==Array;for(c in a)d=a[c],b=typeof d,a.hasOwnProperty(c)&&("string"==b?d='"'+d+'"':"object"==b&&null!==d&&(d=jQuery.stringify(d)),e.push((f?"":'"'+c+'":')+String(d)));return(f?"[":"{")+String(e)+(f?"]":"}")}});/*End of jquery Stringify*/
var ieObj={scrollHandler:function(a,b,c,d){if(d.length){var e,f=b.height(),g=b.scrollTop(),h=f+g,i=d.position().top+b.scrollTop(),j=i+d.outerHeight();return j>=h?(e=j-f>0?j-f:0,b.scrollTop(e)):i<b.scrollTop()&&(e=i,b.scrollTop(e)),e}}};$.support.placeholder=function(){var a=document.createElement("input");return"placeholder"in a}(jQuery),/*Start of datepicker*/
/* =========================================================
 * bootstrap-datepicker.js 
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(a){
// Picker object
var b=function(b,d){if(this.element=a(b),this.format=c.parseFormat(d.format||this.element.data("date-format")||"mm/dd/yyyy"),this.picker=a(c.template).appendTo("body").on({click:a.proxy(this.click,this)}),this.isInput=this.element.is("input"),this.component=!!this.element.is(".date")&&this.element.find(".add-on"),this.isInput?this.element.on({focus:a.proxy(this.show,this),
//blur: $.proxy(this.hide, this),
keyup:a.proxy(this.update,this)}):this.component?this.component.on("click",a.proxy(this.show,this)):this.element.on("click",a.proxy(this.show,this)),this.minViewMode=d.minViewMode||this.element.data("date-minviewmode")||0,"string"==typeof this.minViewMode)switch(this.minViewMode){case"months":this.minViewMode=1;break;case"years":this.minViewMode=2;break;default:this.minViewMode=0}if(this.viewMode=d.viewMode||this.element.data("date-viewmode")||0,"string"==typeof this.viewMode)switch(this.viewMode){case"months":this.viewMode=1;break;case"years":this.viewMode=2;break;default:this.viewMode=0}this.startViewMode=this.viewMode,this.weekStart=d.weekStart||this.element.data("date-weekstart")||0,this.weekEnd=0===this.weekStart?6:this.weekStart-1,this.onRender=d.onRender,this.fillDow(),this.fillMonths(),this.update(),this.showMode()};b.prototype={constructor:b,show:function(b){this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.place(),a(window).on("resize",a.proxy(this.place,this)),b&&(b.stopPropagation(),b.preventDefault()),!this.isInput;var c=this;a(document).on("mousedown",function(b){0===a(b.target).closest(".datepicker").length&&c.hide()}),this.element.trigger({type:"show",date:this.date})},hide:function(){this.picker.hide(),a(window).off("resize",this.place),this.viewMode=this.startViewMode,this.showMode(),this.isInput||a(document).off("mousedown",this.hide),
//this.set();
this.element.trigger({type:"hide",date:this.date})},set:function(){var a=c.formatDate(this.date,this.format);this.isInput?this.element.prop("value",a):(this.component&&this.element.find("input").prop("value",a),this.element.data("date",a))},setValue:function(a){"string"==typeof a?this.date=c.parseDate(a,this.format):this.date=new Date(a),this.set(),this.viewDate=new Date(this.date.getFullYear(),this.date.getMonth(),1,0,0,0,0),this.fill()},place:function(){var a=this.component?this.component.offset():this.element.offset();this.picker.css({top:a.top+this.height,left:a.left})},update:function(a){this.date=c.parseDate("string"==typeof a?a:this.isInput?this.element.prop("value"):this.element.data("date"),this.format),this.viewDate=new Date(this.date.getFullYear(),this.date.getMonth(),1,0,0,0,0),this.fill()},fillDow:function(){for(var a=this.weekStart,b="<tr>";a<this.weekStart+7;)b+='<th class="dow">'+c.dates.daysMin[a++%7]+"</th>";b+="</tr>",this.picker.find(".datepicker-days thead").append(b)},fillMonths:function(){for(var a="",b=0;b<12;)a+='<span class="month">'+c.dates.monthsShort[b++]+"</span>";this.picker.find(".datepicker-months td").append(a)},fill:function(){var a=new Date(this.viewDate),b=a.getFullYear(),d=a.getMonth(),e=this.date.valueOf();this.picker.find(".datepicker-days th:eq(1)").text(c.dates.months[d]+" "+b);var f=new Date(b,d-1,28,0,0,0,0),g=c.getDaysInMonth(f.getFullYear(),f.getMonth());f.setDate(g),f.setDate(g-(f.getDay()-this.weekStart+7)%7);var h=new Date(f);h.setDate(h.getDate()+42),h=h.valueOf();for(var i,j,k,l=[];f.valueOf()<h;)f.getDay()===this.weekStart&&l.push("<tr>"),i=this.onRender(f),j=f.getFullYear(),k=f.getMonth(),k<d&&j===b||j<b?i+=" old":(k>d&&j===b||j>b)&&(i+=" new"),f.valueOf()===e&&(i+=" active"),l.push('<td class="day '+i+'">'+f.getDate()+"</td>"),f.getDay()===this.weekEnd&&l.push("</tr>"),f.setDate(f.getDate()+1);this.picker.find(".datepicker-days tbody").empty().append(l.join(""));var m=this.date.getFullYear(),n=this.picker.find(".datepicker-months").find("th:eq(1)").text(b).end().find("span").removeClass("active");m===b&&n.eq(this.date.getMonth()).addClass("active"),l="",b=10*parseInt(b/10,10);var o=this.picker.find(".datepicker-years").find("th:eq(1)").text(b+"-"+(b+9)).end().find("td");b-=1;for(var p=-1;p<11;p++)l+='<span class="year'+(p===-1||10===p?" old":"")+(m===b?" active":"")+'">'+b+"</span>",b+=1;o.html(l)},click:function(b){b.stopPropagation(),b.preventDefault();var d=a(b.target).closest("span, td, th");if(1===d.length)switch(d[0].nodeName.toLowerCase()){case"th":switch(d[0].className){case"switch":this.showMode(1);break;case"prev":case"next":this.viewDate["set"+c.modes[this.viewMode].navFnc].call(this.viewDate,this.viewDate["get"+c.modes[this.viewMode].navFnc].call(this.viewDate)+c.modes[this.viewMode].navStep*("prev"===d[0].className?-1:1)),this.fill(),this.set()}break;case"span":if(d.is(".month")){var e=d.parent().find("span").index(d);this.viewDate.setMonth(e)}else{var f=parseInt(d.text(),10)||0;this.viewDate.setFullYear(f)}0!==this.viewMode&&(this.date=new Date(this.viewDate),this.element.trigger({type:"changeDate",date:this.date,viewMode:c.modes[this.viewMode].clsName})),this.showMode(-1),this.fill(),this.set();break;case"td":if(d.is(".day")&&!d.is(".disabled")){var g=parseInt(d.text(),10)||1,h=this.viewDate.getMonth();d.is(".old")?h-=1:d.is(".new")&&(h+=1);var i=this.viewDate.getFullYear();this.date=new Date(i,h,g,0,0,0,0),this.viewDate=new Date(i,h,Math.min(28,g),0,0,0,0),this.fill(),this.set(),this.element.trigger({type:"changeDate",date:this.date,viewMode:c.modes[this.viewMode].clsName})}}},mousedown:function(a){a.stopPropagation(),a.preventDefault()},showMode:function(a){a&&(this.viewMode=Math.max(this.minViewMode,Math.min(2,this.viewMode+a))),this.picker.find(">div").hide().filter(".datepicker-"+c.modes[this.viewMode].clsName).show()}},a.fn.datepicker=function(c,d){return this.each(function(){var e=a(this),f=e.data("datepicker"),g="object"==typeof c&&c;f||e.data("datepicker",f=new b(this,a.extend({},a.fn.datepicker.defaults,g))),"string"==typeof c&&f[c](d)})},a.fn.datepicker.defaults={onRender:function(a){return""}},a.fn.datepicker.Constructor=b;var c={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],dates:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,c.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},parseFormat:function(a){var b=a.match(/[.\/\-\s].*?/),c=a.split(/\W+/);if(!b||!c||0===c.length)throw new Error("Invalid date format.");return{separator:b,parts:c}},parseDate:function(a,b){var c,d=a.split(b.separator),e=new Date;if(e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),d.length===b.parts.length){for(var f=e.getFullYear(),g=e.getDate(),h=e.getMonth(),i=0,j=b.parts.length;i<j;i++)switch(c=parseInt(d[i],10)||1,b.parts[i]){case"dd":case"d":g=c,e.setDate(c);break;case"mm":case"m":h=c-1,e.setMonth(c-1);break;case"yy":f=2e3+c,e.setFullYear(2e3+c);break;case"yyyy":f=c,e.setFullYear(c)}e=new Date(f,h,g,0,0,0)}return e},formatDate:function(a,b){var c={d:a.getDate(),m:a.getMonth()+1,yy:a.getFullYear().toString().substring(2),yyyy:a.getFullYear()};c.dd=(c.d<10?"0":"")+c.d,c.mm=(c.m<10?"0":"")+c.m;for(var d=[],e=0,f=b.parts.length;e<f;e++)d.push(c[b.parts[e]]);return d.join(b.separator)},headTemplate:'<thead><tr><th class="prev">&lsaquo;</th><th colspan="5" class="switch"></th><th class="next">&rsaquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>'};c.template='<div class="datepicker dropdown-menu"><div class="datepicker-days"><table class=" table-condensed">'+c.headTemplate+'<tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed">'+c.headTemplate+c.contTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+c.headTemplate+c.contTemplate+"</table></div></div>"}(window.jQuery);/*End of datepicker*/
/*Version dd_v7.6.1*/
/*Version dd_v7.6.1*/
var DD=function(a,b,c,d){function e(){return arguments.length?function(arguments){}:function(){}}function f(a){// to append data dynamically at run time in Dropdown
function b(a){return function(){var b=$(this).attr("id"),c=a[b],d=c.id;if(d)for(var e in d){d[e];
//X.inpHid.attr('value','');
m.chkBox?m.removeAllTags():(m.inpElm.val(""),m.inpHid.data("optGroupKey","")),m.Allflg="",m.hideDD(),m.dependent?m.onClickLi(m.obj,""):""}c.clrCalbackfun&&m.onClearTag[b](m.obj,0,$(this))}}for(var c=0;c<m.idLen;c++){var d,e=m.idKey[c];if(m.clearAllInside){var f="Clear All";for(var j in m.clearAllInside)f=m.clearAllInside[j];d=$("<div>").addClass("DDclearAll").attr({id:"clrAll_"+e}).html(f)}var k=$("#"+e).find(".srchTxt");if(!m.dpLyr||!m.dpLyr.length){
// to prevent create multiple drop loyer if same call initialize.
var l=k.attr("name");k.data({name:l});// to reset in destroy function
var n;$("#"+e).find(".arw").addClass("DDarwDwn");m.chkBox?n=$("#"+e+" .DDsearch li"):(n=$("#"+e).find(".DDsearch"),$("#"+e).addClass("singleSelect")),k.data("id","inp_"+e).attr({name:"",autocomplete:"off"}),m.placeholder&&k.data({placeholder:k.attr("placeholder")}),m.outerCont.find(".frst").css({"float":"none"}),$("#hid_"+e).length?m.inpHid=$("#hid_"+e):(
// create hidden input field if it's not aleredy there
m.inpHid=$("<input>").attr({type:"hidden",id:"hid_"+e,name:l}),n.append(m.inpHid));var o=$("<div>"),p=$("<div>"),q=$("<ul>"),r=$("#"+e),s=m.chkBox?"ChkboxEnb":"";m.dpLyr=o,// store reference of dropLayer container
p.addClass("nScroll").attr("id","ul_"+e),o.addClass("drop").attr("id","dp_"+e),q.addClass(s),p.append(q),d?o.append(d):"",o.append(p),r.append(o),
//ddCont.append(ifr[0]);
$("#"+e).on("click",".DDinputWrap, .DDsearch, .arw",function(a){a.stopPropagation(),k[0].focus()}).on("mouseenter",function(){m.layerOpenStatus=m.srchBx!==!1}).on("mouseleave",function(){m.layerOpenStatus=!1})}
//Add events in dropDown
k.on("focus",h).on("keydown",function(a){i(a,$(this))}).on("keyup",m.Fn.keyUpEv).on("blur",g),m.layerOpenStatus=m.srchBx!==!1}if(// for loop end
m.fillData(),m.clrId)
// clear all tags and data on html tag fire event
for(var j in m.clrId)$("#"+j).on("click",b(m.clrId))}function g(b){var c=m.id;if(!m.TagSpCnt&&m.chkBox?$("#"+c+" .tagit:last").removeClass("TagSelected"):"",!m.chkBox){var d=m.inpHid,e=m.inpElm,f=d.attr("opt"),g=f?m.uEscp(f):"",h=d.attr("value"),i=a.id[c][0],j=g?i[g][h]:i?i[h]:"";e.val()?j&&e.val(j).css({color:"#444"}):(d.val(""),m.onDeselect&&m.onDeselect(),m.placeholder&&!$.support.placeholder&&e.val(e.data("placeholder")).css({color:"#a9a9a9"}))}m.layerOpenStatus||m.hideDD()}function h(a){
//It fires when focus comes in dropdown text box
// if(DD.lastRef['lastOpen'] && DD.lastRef['lastOpen'] != X.id){
//          X.hideDD(DD.lastRef['lastOpen']);
//       }
// DD.lastRef['lastOpen'] = X.id;
m.layerOpenStatus=m.srchBx!==!1,m.inpt=$(this);var b=$(this).data("id");b.split("_")[1];if(
//  dropLayer = $('#dp_'+iD);
//X.dpLyr = $('#dp_'+iD);
m.DDSearch=$(this).parent(".DDSearch"),j(),$("#"+b).css({color:"#444"}),!m.chkBox&&m.placeholder&&!$.support.placeholder){/*  // $(this).val('');
            }else{*/
//if(X.placeholder && !$.support.placeholder){
var c=$("#"+b);$("#"+b).val()===c.data("placeholder")&&$("#"+b).val("")}}function i(a,b){var c,//td = 'inp_'+X.id,
d=m.id,e=a.keyCode||a.which,f=$("#"+d).width()-15,g=b.val().replace(/\b/g,""),h=m.dpLyr.css("display");if(13!=e&&38!=e||
//for multiple select
a.preventDefault(),13!=e||"none"!=h||m.chkBox||
// for single select
$("#dFrom")[0].submit(),9==e||27==e?m.hideDD():"",// check why it is not work no keyUp
(e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57)&&!m.TagSpCnt&&m.chkBox&&m.tags!==!1&&(c=k(f),m.inpElm.css({width:c+"px"})),!g&&m.chkBox){
//must be put code at keyDown event
var i=$("#"+d+" .tagit:last"),l=i.data("id");m.TagCnt>0&&8==a.keyCode&&!m.TagSpCnt&&l&&l.length>0?m.Tagfocus?(m.removeTag(l,i.children(".tagTxt").html(),!0),m.Tagfocus=0):($("#"+d+" .DDsearch").find('[data-id="'+l+'"]').addClass("TagSelected"),m.Tagfocus=1):l&&($("#"+d+" .DDsearch").find('[data-id="'+l+'"]').removeClass("TagSelected"),m.Tagfocus=0)}
//var ulCont_hghtCont = $('#dp_'+id);
var n=$("#ul_"+d),o=n.find("ul"),p=o.find("li:first-child");if(m.curActElm.length||(m.curActElm=p),40==e)
// down arrow key
if("none"==h)m.hideDD(),j();else{var q,r=m.curActElm.next();r.length&&!r.hasClass("noData")&&(q=r.hasClass("optgroup")?r.next():r,m.curActElm.removeClass("active"),q.addClass("active"),m.curActElm=q,ieObj.scrollHandler(m.dpLyr,o.parent(),p,m.curActElm))}else if(38==e){
// up arrow key
var s,t=m.curActElm.prev();t.length&&(s=t.hasClass("optgroup")?t.prev():t,s.length&&(m.curActElm.removeClass("active"),s.addClass("active"),m.curActElm=s,ieObj.scrollHandler(m.dpLyr,o.parent(),p,m.curActElm)))}}function j(){
// show dropdown
var a=m.id;$("#"+a).find(".DDwrap").addClass("brBotN"),$("#"+a+" .drop").show(),$("#ul_"+a)[0].scrollTop=0;var b=$("#"+a).outerWidth()-2+"px";m.dpLyr.css({width:b}),m.max_height(),m.chkBox||m.firstHighlight()}function k(a){
// increase texbox width while entering the character accordingly
// increase texbox width while entering the character accordingly
return a>p?p+=5:void(p+=1)}function l(a,b){
//Decrease texbox width while removing or deleting the charecter
if(""!==m.inpElm.val()&&p>o){if(b>p)return p-=5;p-=1}}var m=this,n=0,o=30,p=30;m.obj=a,m.prefillData=a.prefillData,m.parentRefData={},m.liCntrFx=[],m.preventClickFor=a.preventClickFor||[],m.onDeselect=a.onDeselect,m.liCntr=[],m.isReset=!0,// to enable/disabled reset for replace or add data
m.placeholder=a.placeholder||!1,m.sortPrefix=a.sortPrefix,m.idKey=[],m.hidValue=[],m.maxTagsCount=a.maxTagsCount||999,m.pKey=d,m.idLen=0,m.tagwithOptGroup=a.tagwithOptGroup||!1,m.srchBx=a.searchBox!==!1,m.sts=c,m.prevObj=b,m.clrId=a.clearTagId,m.depend=a.dependent,m.tagsSorting=a.tagsSorting!==!1,m.MrgPrfAryOrdr=a.appendTags||!1,m.Ary={},m.onClearTag=[];// call back function for click on clearTag/clearAllTsg
for(m.idKey[m.idKey.length]in a.id);// calculate the no of dropdown id's
m.idLen=m.idKey.length,// set no of id's in a single call
m.sugHgt=a.maxHeight||300,m.clearAllInside=a.clearAllInside||!1,m.parentChkBox=a.parentChkBox||!1,m.chkBox=a.checkBox||!1,m.allChk=a.allChk||!1,m.allChecked=a.allChecked||!1,m.layerOpenStatus=!1,m.tags=a.tags!==!1||a.tags,m.TagSpCnt=a.tagInSepContainer||!1,m.id=m.idKey[0],m.preTxt=a.preText===!1?"":a.preText||"You have selected",m.Allflg="",m.postTxt=a.postText===!1?"":a.postText||"item(s)",m.curActElm="",m.Tagfocus=0,m.onClickAll=a.onClickAll||e(),m.onClickLi=a.onClickReq||e(),m.onTagClk=a.onTagClick||e(),//Call back function on tag click
m.onTagCrt=a.onTagCreate||e(),//call when tag create
m.outerCont=$("#"+m.id),m.inpElm=m.outerCont.find(".srchTxt"),m.TagCnt=0,m.tagTitle=a.tagTitle||!1,m.optgrpNameRef=[],m.optgrpObject={},/*Bind Click event on document on Click*/
DD.lastRef.iseventBindOnDocument||($(document).on("click.dd",function(a){if(!$(a.target).parents(".ddwn").length){var b=$(".ddwn");b.find(".DDwrap").removeClass("brBotN"),b.find(".drop").hide()}}),DD.lastRef.iseventBindOnDocument=!0),/*End of Bind Click event on document on Click*/
m.obj.resetPrefillValues?
// to reset(empty checkBox Container) values to avoid prefill case... used in SM
m.ChkBoxContr={}:m.ChkBoxContr?"":m.ChkBoxContr={},m.pKey?(m.chkBox||(DD.Ary[m.id]={}),DD.Ary[m.id]?"":DD.Ary[m.id]={},DD.Ary[m.id][m.pKey]=a.id[m.id][0],m.Ary=DD.Ary[m.id]):(m.Ary={},m.Ary.A=a.id[m.id][0]);for(var q in a.clearTagId)for(var r in a.clearTagId[q])m.onClearTag[q]=a.clearTagId[q][r];m.Fn={preserveEventafterClone:function(b,c){var d,e=m.id;d=m.TagSpCnt?$("#"+m.TagSpCnt).find('[data-id="'+b+'"]'):$("#"+e+" .DDsearch").find('[data-id="'+b+'"]'),d.on("click",".dCross",function(d){
//remove tags by click on tag cross button
d.stopPropagation(),m.removeTag(b,$(this).find(".tagTxt").text(),c),m.max_height(),c?m.onTagClk(a,m.TagCnt):"",m.setInputText(),// for decrement count value when user click on tag cross sign
"block"==m.dpLyr.css("display")?$("#"+e).find(".srchTxt")[0].focus():""})},keyUpEv:function(a){
//must be put code at key_up event
var b=$(this).data("id"),c=$("#"+b).width()-15,d=(b.split("_")[1],a.keyCode||a.which),e=$(this).val().replace(/\b/g,"");if(13==d&&m.curActElm&&m.curActElm.length&&!m.curActElm.hasClass("noData")&&m.curActElm.hasClass("active")){var f=m.curActElm.children("a");if(m.chkBox){var g=f.data("id")+"_"+m.Escp(m.curActElm.attr("bindto"));f.hasClass("chkd")?m.removeTag("tg_"+g,f.html(),!0):m.CreateTags(f,g,"",m.tags)}else m.SingleSelection(f.html(),f.data("id").split("_")),m.hideDD()}8==d&&m.chkBox&&!m.TagSpCnt&&m.tags!==!1&&(e?wth=l(b,c)+"px":""!=m.inpHid.val()?wth="30px":wth="",m.inpElm.css({width:wth})),9!=d&&13!=d&&18!=d&&32!=d&&37!=d&&38!=d&&39!=d&&40!=d&&(m.Fn.initSearch(e,b,d),"none"==m.dpLyr.css("display")&&m.dpLyr.show())},initSearch:function(b,c,d){var e="";n=0,c=c.split("_")[1];var f=m.Ary;if(b){b=b.replace(/&amp;/gi,"&").replace(/[\s]+/g," ").replace(/^\s/,"");for(var g in f)for(var h in f[g])if("object"==typeof f[g][h]){
// for optgroup case
var i,j="";i=f[g][h];for(var k in i)j+=m.searchData(i[k],b,c,c+"_"+k+"_"+m.eUnderScore(h),m.Escp(g));j&&(e+='<li class="optgroup">'+m.eUnderScore(h)+"</li>"+j,n++)}else
// for single case
$("#"+c+" .cross").show(),e+=m.searchData(f[g][h],b,c,c+"_"+m.eUnderScore(h),m.Escp(g)),n++}else $("#"+c+" .cross").hide(),e=m.appendData(m.Ary,"","",d)[0],n=m.liCntrFx;if(!e){var l=a.noDataTxt?a.noDataTxt:"No data found in search";e='<li class="noData">'+l+"</li>",n++}
//$('#dp_'+id+' ul').html(html);
m.dpLyr.find("ul").html(e),1!=n&&(m.liCntr=n),m.max_height(),m.firstHighlight()}},m.fillDatainDropdwonLayer=function(a,b,c,d,e){m.inpElm;m.chkBox&&m.inpHid.attr({value:""}),m.srchBx===!1?($("#"+a).find(".DDwrap").hide(),$("#"+a).find(".drop").css({position:"static"})):$("#"+a+" div.drop").css({borderTop:0}),$("#ul_"+a+" ul").html(b),b="",m.srchBx===!1?j():"",(m.allChk||m.parentChkBox)&&m.chkForParent(m.optgrpObject,m.DATA,a)},m.liMousehover=function(){m.id;m.dpLyr.on("mouseover","li.pickVal",function(){m.curActElm.length?"":m.firstHighlight(),m.curActElm.removeClass("active"),$(this).addClass("active"),m.curActElm=$(this)}).on("mouseout","a",function(){$(this).removeClass("active")})},m.max_height=function(){for(
// set max heigh of dropdown according to the user specified if user not specified the set default maximum height
var a=m.id,b=$("#ul_"+a),c=0,d=$("#ul_"+a).find(" ul li:first");d.length&&m.sugHgt>=c;)c+=d.outerHeight(),d=d.next();m.sugHgt<c?b.css({height:m.sugHgt+"px"}):b.css({height:c+"px",width:"100%"}),b.length&&b[0].csb&&b[0].csb.reset()},m.PickValuesFromDD=function(){
// On selection it select the data from the dropdown and throw to specific(on the basic of ID) text field or or any HTML tag eg. Div, span, textarea
var b;m.id;m.dpLyr.on("click",".pickVal a",function(c){if(m.chkBox){var d=0,e=$(this),f=e.data("id");if(m.parentChkBox)var g=$(this).data("id").split("_"),h=g[g.length-1];if($(this).hasClass("chkd")&&(d=1),b=e.html(),f.split("_")[1]==m.eUnderScore(m.otherLabId))1==d?m.onClickLi(a,m.otherLabId,"unChecked"):m.onClickLi(a,m.otherLabId,"checked"),m.hideDD();else{var g=$(this).data("id").split("_");if(m.parentChkBox)var h=m.dUnderScore(m.uEscp(g[g.length-1])),i=m.uEscp(g[g.length-2]);else var h="All",i=m.uEscp(g[g.length-1]);if(1==d){var j=f;if($(this).parent().attr("bindto")&&(j=f+"_"+m.Escp($(this).parent().attr("bindto"))),m.removeTag("tg_"+j,b,!0),m.parentChkBox||m.allChk){var k=m.optgrpObject[h].checked.indexOf(i);k>-1&&m.optgrpObject[h].checked.splice(k,1),m.optgrpObject[h].unchecked.push(i),m.chkForParent(m.optgrpObject,"",f)}}else{var l=$(this).parent().attr("bindto");if(l?f=f+"_"+m.Escp(l):"",m.CreateTags(e,f,"",m.tags),m.parentChkBox||m.allChk){var k=m.optgrpObject[h].unchecked.indexOf(i);k>-1&&m.optgrpObject[h].unchecked.splice(k,1),m.optgrpObject[h].checked.push(i),m.chkForParent(m.optgrpObject,"",f)}}m.srchBx!==!1?setTimeout(function(){m.inpElm[0].focus()},100):""}}else m.SingleSelection($(this).html(),$(this).data("id").split("_"))})},m.SingleSelection=function(b,c){
// when dropdown having a single select functionality
var d=c[0],e=c[2]?c[2]:"";b=b.replace(/(<([^>]+)>)/gi,"").replace(/&amp;/gi,"&"),m.inpElm?m.inpElm.val(b):"",$("#"+d+" .cross").show(),m.inpHid.attr({value:m.dUnderScore(m.uEscp(c[1])).replace(m.sortPrefix,"")}).data("optGroupKey",e),m.layerOpenStatus?m.hideDD():"",m.onClickLi(a,m.dUnderScore(m.uEscp(c[1])))},m.CreateTags=function(b,c,d,e){
//checked
var f=m.id,g=c.split("_")[1];if(e="-1"==$.inArray(g,m.preventClickFor)&&0!=e,m.hidValue.length<m.maxTagsCount){var h,i=m.uEscp(c).split("_"),j=c.split("_"),k=3==j.length?j[0]+"_"+j[1]:j[0]+"_"+j[1]+"_"+j[2];if("string"!=typeof b?(h=b.html(),b.addClass("chkd")):h=b,m.TagCnt++,m.placeholder&&m.TagCnt&&m.inpElm.attr("placeholder",""),e!==!1){h=h.replace(/(<([^>]+)>)/gi,"").replace(/&amp;/gi,"&"),m.tagwithOptGroup?h="<b>"+i[2].replace("xSlashX","/").replace(/SxP/gi," ")+"</b>("+h+")":"";var l,n=$("<li>").append('<span class="tagTxt">'+h+"</span>"),o="tg_"+c;m.tagTitle&&n.attr("title",h);var p=m.TagSpCnt;if(p||e===!1){var q=n.append($("<a>").addClass("dCross")).addClass("tagit").attr({"data-id":o}),r=$("#"+p)[0];if(m.MrgPrfAryOrdr){var s=r.children[d];s?s.parentNode.insertBefore(q[0],s):$("#"+p).append(q)}else e===!1?"":r.insertBefore(q[0],r.firstChild);m.inpElm.css({color:"#444"}),l=o+" a.dCross"}else m.MrgPrfAryOrdr?$("#"+f+" ul.DDsearch li:last").before(n.append($("<span>").addClass("dCross")).addClass("tagit").attr({"data-id":o})):$("#"+f+" ul.DDsearch").prepend(n.append($("<span>").addClass("dCross")).addClass("tagit").attr({"data-id":o})),m.inpElm.css({width:"30px"}),l=o+" span.dCross";m.Fn.preserveEventafterClone(o,!0)}$("#ul_"+m.id).find('[data-id="'+k+'"]').addClass("chkd"),m.setValueInHiddenField(i[1],h),m.ChkBoxContr[i[1]]=c,m.onClickLi(a,m.dUnderScore(m.uEscp(i[1])),"Checked",$('li[data-id="tg'+c+'"]'),m.TagCnt),m.setInputText()}else m.onTagCrt("Maximum Tags Created")},m.setValueInHiddenField=function(a,b,c){var d=m.id;if(a&&b){"all"==b.toLowerCase()&&(m.Allflg="all"),a=m.dUnderScore(m.uEscp(a)).replace(m.sortPrefix,"");var e=m.inpHid.val();e?(m.hidValue.push(a),m.inpHid.val($.stringify(m.hidValue))):(m.hidValue.push(a),m.inpHid.val($.stringify(m.hidValue)),$("#clrAll_"+d).show(),m.TagSpCnt?$("#"+m.TagSpCnt).show():$("#"+d).find("li.frst").css({"float":"left"})),m.onTagCrt()}else c!==!1&&(m.inpElm.val(""),m.inpHid.val(""))},f(),m.PickValuesFromDD(),// Event deligation: event bind for data seelction or tag creation
m.liMousehover(),// Event Deligation: listing highlight on mouseover
m.clickParent(),// In parentChk case:: parent click(check/uncheck all childrens)
m.clickMain(),// In superParent Case:: check/uncheck all values
this.allChecked&&$('li.optgroup[data-id="opt_all"]').click()};/*Accordion call*/
//parameters
/*
active
collapsible
previousOpen
showHideSpeed
allOpen 
openEvent
icons
onClick
callBack
enabled
disabled
expand
collapse
*/
/*Replace children with find function*/
/*Start of lightbox*/
/* jslint curly : false	 */
/* jslint asi : true	 */
/*global pageXOffset */
/*global pageYOffset */
/*Start of lightBox*/
if(DD.prototype.prefillDataFormation=function(a){var b=this,c=(b.id,{});if(b.chkBox){if(a)for(var d in a)c[a[d]]="1"}else c=a;return c},DD.prototype.removeAllTags=function(){
//checked
var a=this,b=a.id;for(var c in a.ChkBoxContr){var d,e=a.ChkBoxContr[c],f=e.split("_");if(3==f.length?d=f[0]+"_"+f[1]:4==f.length&&(d=f[0]+"_"+f[1]+"_"+f[2]),$("#ul_"+b).find('[data-id="'+d+'"]').removeClass("chkd"),a.TagSpCnt?$("#"+a.TagSpCnt).find('[data-id="tg_'+e+'"]').remove():$("#"+b).find(".DDsearch").find('[data-id="tg_'+e+'"]').remove(),a.parentChkBox||a.allChk){if(a.parentChkBox)var g=a.dUnderScore(a.uEscp(f[2]));else var g="All";var h=f[1],i=a.optgrpObject[g].checked.indexOf(h);i>-1&&a.optgrpObject[g].checked.splice(i,1),a.optgrpObject[g].unchecked.push(h)}}a.parentChkBox&&$("#ul_"+b).find('li a[data-id="'+b+'"]').removeClass("chkd"),a.allChk&&($("#ul_"+b).find('li[data-id="opt_all"]').find("a").removeClass("chkd"),a.onClickAll("unchecked")),
//X.inpElm.val('');
a.resetInpWidth(b),a.ChkBoxContr={},a.inpHid.val(""),a.hidValue=[],// when click on clearon button then it should be removed
a.TagCnt=0,a.setPlaceHolderAttribute()},
// DD.prototype.destroyTags = function(){
//  var id = X.id;
//  for(var x in X.ChkBoxContr){
//  }
// }
DD.prototype.destroy=function(){var a=this,b=a.id;a.dpLyr.remove(),a.inpHid.remove(),$("#"+b).find(".DDsearch .tagit").remove(),a.inpElm.val("").attr({placeholder:a.inpElm.data("placeholder"),name:a.inpElm.data("name")}),a.inpElm.removeAttr("autocomplete style"),a.inpElm.off("focus keydown keyup blur")},DD.prototype.removeTag=function(tagId,txt,bool,remId){
//checked
var X=this,id=X.id,rep=tagId.replace("tg_",""),tgId=X.uEscp(rep).split("_"),reqId=eval($("#hid_"+id).val()),tmp=4==tgId.length?tgId[0]+"_"+tgId[1]+"_"+tgId[2]:tgId[0]+"_"+tgId[1];// tgId.length=4 for optgroup case
if($.inArray(X.dUnderScore(X.uEscp(tgId[1])),reqId)!=-1){if($("#ul_"+id).find('[data-id="'+X.Escp(tmp)+'"]').removeClass("chkd"),X.parentChkBox){var a=tmp.split("_");a=a[a.length-1];for(key in X.parentRefData[a])$(X.parentRefData[a][key]).find("a").hasClass("chkd")||($("#ul_"+id).find('li[data-id="opt_'+a+'"]').find("a").removeClass("chkd"),$("#ul_"+id).find('li[data-id="opt_all"]').find("a").hasClass("chkd")&&($("#ul_"+id).find('li[data-id="opt_all"]').find("a").removeClass("chkd"),X.onClickAll("unchecked")))}!X.parentChkBox&&X.allChk&&$("#ul_"+id).find('li[data-id="opt_all"]').find("a").hasClass("chkd")&&($("#ul_"+id).find('li[data-id="opt_all"]').find("a").removeClass("chkd"),X.onClickAll("unchecked")),remId?$("#"+remId).remove():X.TagSpCnt?$("#"+X.TagSpCnt).find('[data-id="'+tagId+'"]').remove():$("#"+id).find(".DDsearch").find('[data-id="'+tagId+'"]').remove(),X.emptyHidField(rep.split("_")[1],id,txt),X.TagCnt--,X.TagCnt||
//X.inpElm.val('');
X.setPlaceHolderAttribute();for(var x in X.ChkBoxContr)X.ChkBoxContr[x]==rep&&delete X.ChkBoxContr[x];bool?X.onClickLi(X.obj,X.dUnderScore(X.uEscp(tgId[1])),"Unchecked","",X.TagCnt):"",X.setInputText()}},DD.prototype.fillData=function(){for(var a=[],b=this,c=b.id,d=0;d<b.idLen;d++){var e=b.prefillData||b.obj.id[c][1],f=b.prefillDataFormation(e);a[c]=f;b.obj.dependTo?b.dpLyr&&b.dpLyr.length?(b.NLi=b.appendData(b.Ary,a,f),b.dpLyr.find("ul").html(b.NLi[0])):(b.NLi=b.appendData(c,a,f),b.fillDatainDropdwonLayer(c,b.NLi[0],d,b.NLi[3],b.NLi[4])):(b.inpHid.val()&&
// when user call dd form at trigger(eg:onClick) many times , then to solve the prefill duplicate problem
// _this.inpHid.val('');
b.removeAllTags(),b.NLi=b.appendData(b.Ary,a,f),b.fillDatainDropdwonLayer(c,b.NLi[0],d,b.NLi[3],b.NLi[4])),b.liCntrFx=b.liCntr=b.NLi[1],b.createTags_ifPrefillData(b.NLi[2])}},DD.prototype.appendData=function(a,b,c,d){var e,f,g="",h=this,i=h.id,j=[],k="",l=0,m=0;/*mustbe Defined null*/
h.allChk&&(
// for super parent case
g+=h.createParLi("all","All","0",!0));for(var n in a){f=n;// to extend data object for addData function
for(var o in a[n]){var p=h.sortPrefix?o.replace(new RegExp(h.sortPrefix,"g"),""):o,q=h.eUnderScore(h.Escp(p));if("object"==typeof a[n][o]){
//optgroup case
var r=h.parentChkBox;g+=h.createParLi(q,o,i,r);
// '<li class="optgroup" data-id='+'opt_'+ KY +' bindTo='+M+'>'+key+'</li>';
var s=[];l++;var t=[];h.optgrpObject[o]={},h.optgrpObject[o].checked=t,h.optgrpObject[o].unchecked=s;for(var u in a[n][o]){void 0!=c[u]?t.push(u):s.push(u),h.optgrpNameRef[u]={pName:o,text:a[n][o][u]};// to determine child belongs in which parent family/optgroup
var v=h.Escp(u);if(b[i])if(b[i][u]){var w;if(parseInt(b[i][u])?w=u:"",w===u){h.inpVal=u,k=a[n][o][u];var x=n?i+"_"+v+"_"+q+"_"+n:i+"_"+v+"_"+q,y=[k,x,i,v];j[m++]=y,l++,g+=h.createLi(i+"_"+v+"_"+q,a[n][o][u],n),e=q}}else{c===u&&(h.inpVal=u,k=a[n][o][u],e=q),l++;var z=h.selCheckBox(i,q,n,v);g+=h.createLi(i+"_"+v+"_"+q,a[n][o][u],n,z)}else{c===u&&(h.inpVal=u,k=a[n][o][u]);var A=h.selCheckBox(i,q,n,v);g+=h.createLi(i+"_"+v+"_"+q,a[n][o][u],n,A),l++}}}else{
// without optgroup case case
if(h.allChk){var s=[],t=[];h.optgrpObject.All={},h.optgrpObject.All.checked=t,h.optgrpObject.All.unchecked=s;
// to determine child belongs in which parent family/optgroup
for(var u in a[n])void 0!=c[u]?t.push(u):s.push(u)}if(h.optgrpNameRef[o]={text:a[n][o]},h.chkBox){
//checkBox Case
var B="";if(b&&!$.isEmptyObject(b[i])&&(b[i][p]?B=p:""),B==p){var C=[a[n][o],i+"_"+q+"_"+n,i,o];j[m++]=C,g+=h.createLi(i+"_"+q,a[n][o],n,""),l++}else{var D=h.selCheckBox(i,q,n);g+=h.createLi(i+"_"+q,a[n][o],n,D),l++}}else
//single Select without optgroup and without checkbox
h.obj.id[i][1]==o?(g+=h.createLi(i+"_"+q,a[n][o]),h.inpVal=o,k=a[n][o],l++,d?"":h.SingleSelection(a[n][o],[i,o])):(g+=h.createLi(i+"_"+q,a[n][o]),l++)}}}if(h.chkBox&&h.tagsSorting===!1){var E=[],F=0;for(var G in c)for(var H in j)j[H][3]==G&&(E[F++]=j[H]);j=E}return $.extend(h.Ary[f],a[f]),[g,l,j,k,e]},DD.prototype.chkForParent=function(a,b,c){var d=0,e=0,c=c.split("_")[0];for(key in a)d++,0==a[key].unchecked.length?($('li[data-id="opt_'+this.eUnderScore(this.Escp(key))+'"]').find("a").addClass("chkd"),e++):($("#ul_"+c).find('li[data-id="opt_'+this.eUnderScore(this.Escp(key))+'"]').find("a").removeClass("chkd"),$("#ul_"+c).find('li[data-id="opt_all"]').find("a").hasClass("chkd")&&($("#ul_"+c).find('li[data-id="opt_all"]').find("a").removeClass("chkd"),this.onClickAll("unchecked")));d==e&&($("#ul_"+c).find('li[data-id="opt_all"]').find("a").addClass("chkd"),this.onClickAll("checked"))},DD.prototype.Escp=function(a){
// encode key (space : [" "])
return a?a.replace(/\s/g,"SxP"):""},DD.prototype.uEscp=function(a){
// decode key
return!!a&&a.replace(/SxP/g," ")},DD.prototype.eUnderScore=function(a){return a?a.replace(/\_/g,"undrxxscr"):""},DD.prototype.dUnderScore=function(a){return a?a.replace(/undrxxscr/gi,"_"):""},DD.prototype.clickParent=function(){
//click event functionality of parent checkbox
var a=this,// must be initialize here
b=a.id;$("#ul_"+b).on("click","li.optgroup",function(){var a=this,b=$(this).nextUntil("li.optgroup"),c=b.length;if($(this).children("a").hasClass("chkd")){for(i=0;i<=c;i++)$(b).eq(i).find("a").hasClass("chkd")&&$(b).eq(i).find("a").click();$(a).children("a").removeClass("chkd")}else{for(i=0;i<=c;i++)$(b).eq(i).find("a").hasClass("chkd")||$(b).eq(i).find("a").click();$(a).children("a").addClass("chkd")}})},DD.prototype.clickMain=function(){
//click event functionality of parent checkbox
var a=this,// must be initialize here
b=a.id;$("#ul_"+b).on("click",'li.optgroup[data-id="opt_all"]',function(b){b.stopImmediatePropagation();var c=this,d=$(this).siblings("li.optgroup"),e=d.length;if($(this).children("a").hasClass("chkd")){for(j=0;j<=e;j++)$(d).eq(j).find("a").hasClass("chkd")||$(d).eq(j).click();$(c).children("a").addClass("chkd")}else{for(j=0;j<=e;j++)$(d).eq(j).find("a").hasClass("chkd")&&$(d).eq(j).click();$(c).children("a").removeClass("chkd"),a.onClickAll("unchecked")}})},DD.prototype.searchData=function(a,b,c,d,e){var f="",g=this,a=a.toString();if(getPos=a.toLowerCase().indexOf(b.toLowerCase()),strLower=a.toLowerCase(),sTxtValueLower=b.toLowerCase(),spaceVal=!(strLower.indexOf(" "+sTxtValueLower)<0)&&strLower.indexOf(" "+sTxtValueLower),bracketVal=!(strLower.indexOf("("+sTxtValueLower)<0)&&strLower.indexOf("("+sTxtValueLower),slashVal=!(strLower.indexOf("/"+sTxtValueLower)<0)&&strLower.indexOf("/"+sTxtValueLower),getPos>=0&&(spaceVal||bracketVal||slashVal)||0===getPos){getPos&&(spaceVal?getPos=spaceVal+1:bracketVal?getPos=bracketVal+1:slashVal&&(getPos=slashVal+1));var h=a.substr(0,getPos),i="<b>"+a.substr(getPos,b.length)+"</b>",j=a.substr(getPos+b.length,a.length),k=g.Escp(d);f=g.selChkBox(k+"_"+e,c)?g.createLi(k,h+i+j,e,"chkd"):g.createLi(k,h+i+j,e),g.srchCntr++}//end of getPos if
return f},DD.prototype.selChkBox=function(a,b){var c=0,d=this;for(var e in d.ChkBoxContr)a==d.ChkBoxContr[e]&&(c=1);return!!c},DD.prototype.selCheckBox=function(a,b,c,d){
// n is only avail in CASE of optGroup
var e=0;for(var f in this.ChkBoxContr){e=1;break}if(e)return d?this.selChkBox(a+"_"+d+"_"+b+"_"+c,a)?"chkd":"":this.selChkBox(a+"_"+b+"_"+c,a)?"chkd":""},DD.prototype.createParLi=function(a,b,c,d){
// code by Nitin
/*bnd = bnd?'bindTo="'+bnd+'"':'';*/
return d=d?'class="'+d+'"':"",d?'<li class="optgroup" data-id=opt_'+a+'><a href="javascript:;" data-id='+c+">"+b+"</li>":'<li class="optgroup" data-id=opt_'+a+">"+b+"</li>"},DD.prototype.createLi=function(a,b,c,d){return c=c?'bindTo="'+c+'"':"",d=d?'class="'+d+'"':"",'<li class="pickVal" '+c+'><a href="javascript:;" '+d+" data-id="+a+">"+b+"</a></li>"},DD.prototype.resetInpWidth=function(a){$("#clrAll_"+a).hide(),this.inpElm.css({width:""}),$("#"+a).find("li.frst").css({"float":"none"})},DD.prototype.firstHighlight=function(){var a,b=this,c=b.id,d=$("#ul_"+c),e=d.find("ul"),f=e.find("li:first-child");b.curActElm=f,b.curActElm.addClass("active");var g=b.inpHid.attr("value");if(g&&!b.chkBox){b.curActElm.removeClass("active");
//var key = X.sortPrefix?X.sortPrefix+X.Escp(hidVal):X.Escp(hidVal);
var h=b.Escp(g);a=b.inpHid.data("optGroupKey")?c+"_"+h+"_"+b.inpHid.data("optGroupKey"):c+"_"+h,b.curActElm=$("#ul_"+b.id).find("ul").find('[data-id="'+a+'"]').parent().addClass("active"),ieObj.scrollHandler(d,b.dpLyr,e,f,b.curActElm)}},DD.prototype.emptyHidField=function(a,b,c){
//checked
var d=this;c&&"all"==c.toLowerCase()?d.Allflg="":"";var e,f=d.dUnderScore(d.uEscp(a)).replace(d.sortPrefix,""),g=$.inArray(f,d.hidValue);g!==-1&&(d.hidValue.splice(g,1),e=$.stringify(d.hidValue)),0==d.hidValue.length&&(d.resetInpWidth(b),e=d.hidValue),d.inpHid.val(e)},DD.prototype.setInputText=function(){var a,b=this,c=b.id;a="all"==b.Allflg?"all":b.TagCnt,b.TagCnt?b.TagSpCnt||b.tags===!1?b.inpElm.val(b.preTxt+" "+a+" "+b.postTxt):"":b.inpHid.val()||($("#"+c+" .cross").hide(),b.placeholder&&!$.support.placeholder&&b.inpElm.val(b.inpElm.data("placeholder")).css({color:"#a9a9a9",width:""}),b.inpElm.css({width:""}))},DD.prototype.setPlaceHolderAttribute=function(){var a=this;a.inpElm.val(""),a.placeholder&&a.inpElm.attr("placeholder",a.inpElm.data("placeholder")),a.inpElm.parents(".frst").css({"float-left":"none"})},DD.prototype.removeData=function(a){var b=this,c=(b.id,0);b.dpLyr.find("ul li").each(function(){if($(this).attr("bindTo")==a.key){var d=$(this).children("a");if(d.length){var e=d.data("id");d.hasClass("chkd")&&(delete b.ChkBoxContr[b.uEscp(e.split("_")[1])],b.removeTag("tg_"+e+"_"+b.Escp(a.key),d.html(),!0))}c++,$(this).remove()}}),delete b.Ary[a.key],b.liCntr=b.liCntr-c,
//Hack for Cja bug --- should be remove when the issue will fixed
$("#ul_"+b.id).find("li").length||$("#"+b.id).find(".tagit").remove()},DD.prototype.removeBlockofData=function(a){this.removeData(a)},DD.prototype.addSelected=function(a,b){
// depricated removed in v10.0.0
var c=this.id;for(var d in a)this.CreateTags(a[d],c+"_"+d+"_A",0,b)},DD.prototype.deleteSelected=function(a){
// depricated removed in v10.0.0
var b=this.id;for(var c in a.keyObject)this.removeTag("tg_"+b+"_"+a.keyObject[c]+"_A","",a.tag_onof_flag,a.remId)},DD.prototype.select=function(a){
// key accept after removing sortprefix
var b=this,c=b.id;if(b.chkBox)for(var d in a.key){var e=a.key[d],f=b.sortPrefix?b.sortPrefix+e:e,g=b.optgrpNameRef[f];g.pName?b.CreateTags(g.text,c+"_"+e+"_"+g.pName+"_A"):b.CreateTags(g.text,c+"_"+e+"_A")}else{if(!b.optgrpNameRef[a.key])throw"DD: Key not exist";b.SingleSelection(b.optgrpNameRef[a.key].text,[c,a.key])}},DD.prototype.deselect=function(a){var b=this,c=b.id;if(b.chkBox)for(var d in a.key){var e=a.key[d],f=b.sortPrefix?b.sortPrefix+e:e,g=b.optgrpNameRef[f];g.pName?b.removeTag("tg_"+c+"_"+a.key[d]+"_"+g.pName+"_A"):b.removeTag("tg_"+c+"_"+a.key[d]+"_A")}else{if(!b.optgrpNameRef[a.key])throw"DD: Key not exist";b.SingleSelection("",[c])}},DD.prototype.addData=function(a){
// to append data in dropdown
var b=this,c={},d=[];a.status||(
// for lagacy support
a.status="Checked");a.key?a.key:"A";if("Checked"==a.status){c.A=a.data;
//X.ChkBoxContr = [];
var e=b.prefillDataFormation(a.prefillData);d[b.id]=e,b.NLi=b.appendData(c,d,e),$("#ul_"+b.id).find("ul").append(b.NLi[0]),b.createTags_ifPrefillData(b.NLi[2]),b.liCntr+=b.NLi[1]}else this.removeBlockofData(a)},DD.prototype.createTags_ifPrefillData=function(a){var b=this,c=b.id;if("Unchecked"!=b.sts&&b.chkBox&&a)
// create tag on prefill basis
for(var d=0;d<a.length;d++){for(var e in b.obj.id[c][1])if(b.obj.id[c][1][e]==a[d][3])break;b.CreateTags(a[d][0],a[d][1],e,b.tags)}b.setInputText()},DD.prototype.replaceData=function(a){var b=this;id=b.id;var c=a.isReset===!1?a.isReset:b.isReset,d=[],e=b.inpHid,f=$.trim(e.val());b.prefillData=a.prefillData;if(b.chkBox&&f&&(b.TagSpCnt?$("#"+b.TagSpCnt).find(".tagit").remove():$("#"+id).find(".DDsearch").find(".tagit").remove(),b.resetInpWidth(id),b.ChkBoxContr={},e.val(""),b.hidValue=[],// when click on clearon button then it should be removed
b.TagCnt=0,b.setPlaceHolderAttribute()),c&&(
// to enable/disabled reset filed
b.inpElm.val(""),e.val("")),$.isEmptyObject(a.data))throw"Either data object is empty or undefined";b.Ary={A:a.data},b.ChkBoxContr=[];var g=b.prefillDataFormation(a.prefillData);d[id]=g;var h=b.appendData(b.Ary,d,g);b.dpLyr.find("ul").html(h[0]),b.createTags_ifPrefillData(h[2]),b.liCntr=h[1]},DD.prototype.hideDD=function(){var a=this,b=a.id;if("block"==a.dpLyr.css("display")&&(a.dpLyr.hide(),$("#"+b).find(".DDwrap").removeClass("brBotN"),a.chkBox?a.inpElm.val(""):(a.curActElm?a.curActElm.removeClass("active"):"",a.inpHid.val()||a.inpElm.val("")),a.setInputText()),a.srchBx!==!1&&$("#ul_"+b).find("li").length<a.liCntrFx){//Changes liCntr to liCntrFx for reports page bug fix
var c=a.appendData(a.Ary,"","",!0);a.dpLyr.find("ul").html(c[0]),a.liCntr=a.liCntrFx}},DD.Ary={},DD.lastRef={},
//end of custom dropdown//
//v7.6.1 : Fix pre and post text bug :saeed
//v7.6.0 : code format ctrl+shift+H :saeed
//placeholder support is now by default false
// v7.5.4 : after search if dd closed and user again open dd then all data do not appear. : saeed
// v7.5.3 : set selected count in input field on check/ucheck of DD values : Sakshi
// v7.5.2: Super parent enhancement :nitin
// v7.5.1 resolve backspace width issue : mahima
// v7.5.0 : add functions  : select and deselect , and optimize some peace of code
// replaceData bug fix isReset : v7.4.2
// replaceData bug fix for multi-dimentional data : v7.4.1
// CSM enhancement Superparent of all Elements of drop down by Nitin: v7.4.0
// changes my mahima for adding title attribute on parameter base (tagTitle: true/false) - (v7.3.2)
// fix issue reported by Manish : saeed
// fix : previous open dd not closing :saeed
// parent checkbox enhancement : saeed
// addData fn optimize : saeed
// sortprefix issue: saeed
// bug fixing: scroll handler: saeed
//end of custom dropdown//
//v7.6.1 : Fix pre and post text bug :saeed
/* jQuery Accordion
 * https://github.com/naukri-engineering/accordion
 *
 * Copyright (c) 2014 Naukri.com (http://www.naukri.com)
 * Licensed under the MIT.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version v1.1.0
 * @Author : Mohd Saeed Khan (http://www.saeed3e.com)
 */
function(a){a.fn.accordion=function(b){function c(a){a.removeClass(b.icons.header).addClass(b.icons.activeHeader).next().slideDown(b.showHideSpeed).data("openState",1).removeClass("close").addClass("open"),b.onClick?b.onClick():b.callBack?b.callBack(a,"expand"):""}function d(a){a.removeClass(b.icons.activeHeader).addClass(b.icons.header).next().slideUp(b.showHideSpeed).data("openState",0).removeClass("open").addClass("close"),b.onClick?b.onClick():b.callBack?b.callBack(a,"collapse"):""}function e(b,e,f){b.each(function(b,g){a.inArray(b,e)===-1&&e.length||("collapse"==f?d(a(this)):(k=a(this).next(),c(a(this))))})}function f(a,b,c){b||0===b?"object"==typeof b?e(a.find(".acord_head"),b,c):e(a.find(".acord_head"),[b],c):e(a.find(".acord_head"),[],c)}function g(e){var f=(e.find("span"),e.next());b.collapsible&&!b.previousOpen?f.data("openState")?d(f.prev()):(k=a(this).next(),k.length&&k.data("openState")&&d(k.prev()),k=f,c(f.prev())):b.collapsible&&b.previousOpen?f.data("openState")?d(f.prev()):c(f.prev()):f.data("openState")||(k&&d(k.prev()),k=f,c(f.prev()))}function h(c,d){"disable"==d?c.addClass("disable").off(b.openEvent):"enable"==d&&c.removeClass("disable").on(b.openEvent,function(){g(a(this))})}function i(b,c,d){c||0===c?"[object Array]"==Object.prototype.toString.call(c)?c.length?b.each(function(b,e){a.inArray(b,c)!=-1&&h(a(this),d)}):h(b,d):h(b.eq(c),d):h(b,d)}var j={active:0,showHideSpeed:"fast",openEvent:"click",icons:{header:"acordUp",activeHeader:"acordDown"}};b&&b.active===!1?b.active="false":b&&b.active&&!b.active.length&&(b.active=0),b&&b.disabled===!0&&(b.disabled=[]);var k,b=a.fn.extend({},j,b);return this.each(function(){var c=a(this).find(".acord_head");b.disabled?i(c,b.disabled,"disable"):a(this).on(b.openEvent,".acord_head",function(){g(a(this))}),c.each(function(){a(this).addClass(b.icons.header).prepend('<span class="icon"></span>').next().addClass("close")}),b.openAll?e(c,[],"expand"):"false"!=b.active&&("object"==typeof b.active?e(c,b.active,"expand"):e(c,[b.active],"expand"))}),this.expand=function(b){f(a(this),b,"expand")},this.collapse=function(b){f(a(this),b,"collapse")},this.disabled=function(b){i(a(this).find(".acord_head"),b,"disable")},this.enabled=function(b){i(a(this).find(".acord_head"),b,"enable")},this}}(jQuery),!model)var model=function(){/** Refered : JQuery UI Code */
/** Detects focusable element */
function a(a,c){var d,e,f,g=a.nodeName.toLowerCase();
// the element and all of its ancestors must be visible
return"area"===g?(d=a.parentNode,e=d.name,!(!a.href||!e||"map"!==d.nodeName.toLowerCase())&&(f=$("img[usemap=#"+e+"]")[0],!!f&&b(f))):(/input|select|textarea|button|object/.test(g)?!a.disabled:"a"===g?a.href||c:c)&&b(a)}function b(a){return $.expr.filters.visible(a)&&!$(a).parents().addBack().filter(function(){return"hidden"===$.css(this,"visibility")}).length}
//for findOut max ZIndex on page
// * is replaced with .ltLayer as multiple ltCont are created when lightBox.js is included more than once.
function c(){var a=this.options.open.minZIndex;return $(".ltCont .ltLayer").each(function(){var b=parseInt($(this).css("z-index"));b>a&&(a=b)}),a}var d=function(){var a={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var b in a)if(void 0!==document.documentElement.style[b])return a[b]}();DEBUG&&(window.isTransitionEndSupported=d),$.expr[":"].focusable=function(b){return a(b,!isNaN($.attr(b,"tabindex")))};/** Refered : JQuery UI Code */
/** Some common Utility functions*/
var e={is_options_valid:function(a){return!(!a||!a.model||1!==a.model.prop("nodeType"))},switchClass:function(a,b){this.removeClass(a).addClass(b)}};DEBUG&&(window.util=e);var f={model:null,dimens:{height:"auto",width:"auto"},resetForm:!1,fixed:!1,zLayer:!0,open:{minZIndex:999,success:function(){},event:"click",selector:null,anim:""},close:{esc:!0,layer:!0,nodes:{target:"",event:"click",selector:""},success:function(){},returnFocus:!0,anim:""}},g=function(){var a=$('<div class="ltCont close"></div>').attr("tabIndex",0),b=$('<div class="ltLayer close"></div>');
//Reset lightBox on resize
//Close lightBox on close
//Close lightBox on layer click
return a.append(b),$(window).bind("resize",function(){if(g.stack.length){var a=g.stack[0];a.resize()}}),$("html").keydown(function(a){27===a.keyCode&&g.stack.length&&g.stack[0].options.close.esc&&g.stack[0].close()}),b.click(function(a){a.stopPropagation(),g.stack[0].close_target=this,g.stack.length&&g.stack[0].options.close.layer&&g.stack[0].close()}),{
//Top most visible lightbox is lt.stack[0]
stack:[],cont:a,layer:b}}();DEBUG&&(window.stack=g.stack),
//Document Ready
$(function(){$("body").append(g.cont)});var h=(function(){/** If tab is pressend on or in lightbox */
g.cont.keydown(function(a){if(g.stack.length&&9===a.keyCode){var b=g.stack[0].options.model.find(":focusable"),c=b.first(),d=b.last();return a.target!==d[0]&&a.target!==a.currentTarget||a.shiftKey?a.target!==c[0]&&a.target!==a.currentTarget||!a.shiftKey?void a.stopPropagation():(d?d.focus():"",!1):(c?c.focus():"",!1)}}),/** If tab is pressed on first or last focusable element and lightbox is open */
$("html").keydown(function(a){if(9===a.keyCode)/** If lightbox is open */
/** If lightbox is open */
return g.stack.length?(g.cont.focus(),!1):void 0})}(),function(){this.options.model.css({position:this.options.fixed?"fixed":"absolute",width:this.options.dimens.width,height:this.options.dimens.height})}),i=function(a){this.options=$.extend(!0,{},this.default_opt,a)},j=function(){var a=this.options.model.parent();/** Check if lightBox alerady present in ltCont */
a.hasClass("ltCont")||g.cont.append(this.options.model)},k={open:function(){var a=[this.options.close.anim,this.options.open.anim];e.switchClass.apply(this.options.model,a)},close:function(a){var b=[this.options.open.anim,this.options.close.anim];e.switchClass.apply(this.options.model,b)}},l=function(){/** IE specific fix, for scroll move on focus*/
var a=document.documentElement.scrollTop,b=this.options.open.firstFocus;b?b.focus():g.cont.focus(),/** IE specific fix, for scroll move on focus*/
document.documentElement.scrollTop=a},m=function(){if(this.options.resetForm)for(var a=this.options.model.find("form"),b=0;b<a.length;b++)a[b].reset()},n=function(){if(!g.stack.length){var a=this.options.close.returnFocus;a===!0?this.options.trigger.focus():$(a).focus()}},o=function(){if(this.options.model.removeClass("model_open"),this.options.model.css("zIndex","-1"),g.stack.length){var a=g.stack[0];this.options.zLayer&&g.layer.css("zIndex",a.options.model.css("zIndex"))}else g.cont.addClass("close");n.call(this),m.call(this),this.options.close.success.call(this,this.close_target)},p=function(){var a=this;a.state="close",/** Adding event on trigger */
this.openEventHandler=function(){a.open()},this.options.trigger.on(this.options.open.event+"."+this.pluginName,this.options.open.selector,this.openEventHandler),/**Adding events Closing nodes */
q.call(this,this.options.close.nodes)},q=function(a){var b=this;if("array"===$.type(a))
//Recursive
return void $.each(a,function(a,c){q.call(b,c)});var c=null;a.constructor===jQuery?(c=$.extend({},this.default_opt.close.nodes),c.target=a):c={target:$(a.target),event:a.event,selector:a.selector},c.target.on(c.event,c.selector,function(){b.close()})},r=function(a){i.call(this,a),this.init_structure(),h.call(this),p.call(this),this.options.model.addClass(this.options.close.anim)},s=function(a){this.options.trigger.off(this.options.open.event+"."+this.pluginName)},t=function(){this.options.trigger.off(this.options.open.event,this.openEventHandler)},u=function(){this.options.trigger.on(this.options.open.event,this.openEventHandler)},v=function(){model.lt.cont.css({width:"auto",height:"auto"});var a=$(document).height(),b=$(document).width();model.lt.cont.css({width:b+"px",height:a+"px"})},w=function(){this.state="open",this.options.model.addClass("model_open"),this.options.model.data("model",this);/** Setting zIndex of lightBox and black layer */
var a=c.call(this);this.options.zLayer&&g.layer.css("zIndex",a+3),"drawer"!=this.pluginName&&this.options.model.css("zIndex",a+3),g.stack.length||(g.cont.css("zIndex",a+1),this.util.switchClass.call(g.layer,"close","open"),g.cont.removeClass("close")),m.call(this),/** Stack Update */
$.inArray(this,g.stack)===-1&&g.stack.unshift(this),/** Center align LightBox */
this.resize(),/** Animation Code */
k.open.call(this),/** Focus Element */
l.call(this),/** Success callback */
this.options.open.success.call(this)},x=function(a,b){a=a||$(g.stack).index(this),!g.stack.length||a<0||(this.state="close",this.options.model.data("model",this),g.stack.splice(a,1),d&&!b&&this.options.open.anim?k.close.call(this):o.call(this),g.stack.length||this.util.switchClass.call(g.layer,"open","close"))},y=function(a){function b(a,b){/** Cleaning registered events for same trigger-lightBox*/
var c=b.data("model");c&&c.options&&c.options.model[0]===a.model[0]&&s.call(this),a.trigger=b,r.call(this,a)}var c=function(){};c.prototype=model;var d=new c;return d.pluginName=a,b.prototype=d,b};return{pluginName:"",util:e,lt:g,reInit:s,close_returnFocus:n,getNewModel:y,open:w,close:x,on:u,off:t,resize:v,default_opt:f,init_structure:j,closeTransEnd_cb:o}}();/* jslint curly : false	 */
/* jslint asi : true	 */
/*global pageXOffset */
/*global pageYOffset */
/*Start of lightBox*/
!function(a){/** Singleton Pattern */
/** If options are given each time a new object will be returned otherwise last configure object will be returend  */
var b="lightBox",c=model.getNewModel(b);c.prototype.resize=function(){model.resize();var b=document.documentElement||document.body,c=a(window).height(),d=a(window).width(),e=window.pageYOffset?pageYOffset:b.scrollTop,f=(window.pageXOffset?pageXOffset:b.scrollLeft,c-this.options.model.height()),g=0,h=d-this.options.model.width(),i=0;/*scrollT = totalH > innerH ? scrollT - 20 : scrollT;
			tpPos = scrollT + availH;*/
return f>0?g=(this.options.fixed?0:e)+f/2:(g=0,window.scrollTo(0,g)),i=h>0?h/2:0,this.options.model.css({top:g+"px",left:i+"px"}),!0},a.fn.lightBox=function(b){var d,e=null,f=null;if(b)try{if(d=b.model,b.model=b.ltBox,b.ltBox=null,!b.model)throw d}catch(g){b.model=g}if(model.util.is_options_valid(b)){/** Support for legacy option : anim*/
if(b.open)try{if(d=b.open.anim,d&&!(b.open.anim=b.open.anim.className))throw d}catch(g){b.open.anim=g}if(b.close)try{if(d=b.close.anim,d&&!(b.close.anim=b.close.anim.className))throw d}catch(g){b.close.anim=g}a.each(this,function(d,g){var h=a(g);e=new c(b,h),f={resize:function(){e.resize()},open:function(){e.open()},close:function(a,b){e.close(a,b)},on:function(){e.on()},off:function(){e.off()}},h.data("model",f)}),b.model.on(isTransitionEndSupported,function(){e&&b.model.hasClass(e.options.close.anim)&&// check for obj introduced because it gets null in some cases
model.closeTransEnd_cb.call(b.model.data("model"))})}return this.data("model")||e},a.fn.lightBox.close=function(a){var b,c;b=0,c=0,a=a||{},a.all&&(b=model.lt.stack.length-1),a.allPrevious?(b=model.lt.stack.length-1,c=1):a.index&&(c=b=a.index);for(var d=b;d>=c;d--)d in model.lt.stack?model.lt.stack[d].close(d,a.noAnim):""},a.fn.lightBox.closeAll=function(b){a.fn.lightBox.close(b||{all:!0})}}(jQuery),/*End of lightBox*/
/*Start of drag drop*/
!function(a){var b,c=a();a.fn.sortable=function(d){var e=String(d);return d=a.extend({connectWith:!1},d),this.each(function(){if(/^enable|disable|destroy$/.test(e)){var f=a(this).children(a(this).data("items")).attr("draggable","enable"==e);return void("destroy"==e&&f.add(this).removeData("connectWith items").off("dragstart dragend selectstart dragover dragenter drop"))}var g,h,f=a(this).children(d.items),i=a("<"+(/^ul|ol|div$/i.test(this.tagName)?"li":"div")+' class="sortable-placeholder">');f.find(d.handle).mousedown(function(){g=!0}).mouseup(function(){g=!1}),a(this).data("items",d.items),c=c.add(i),d.connectWith&&a(d.connectWith).add(this).data("connectWith",d.connectWith),f.attr("draggable","true").on("dragstart",function(c){if(d.handle&&!g)return!1;g=!1;var e=c.originalEvent.dataTransfer;e.effectAllowed="move",e.setData("Text","dummy"),b=a(this),h=b.addClass("sortable-dragging").index()}).on("dragend",function(){(b=a(this)).removeClass("sortable-dragging").show(),c.detach(),h!=b.index()&&f.parent().trigger("sortupdate",{item:b,prevIndex:h,currIndex:b.index()}),b=null}).not("a[href], img").on("selectstart",function(){return this.dragDrop&&this.dragDrop(),!1}).end().add([this,i]).on("dragover dragenter drop",function(e){return!f.is(b)&&d.connectWith!==a(b).parent().data("connectWith")||("drop"==e.type?(e.stopPropagation(),c.filter(":visible").after(b),!1):(e.preventDefault(),e.originalEvent.dataTransfer.dropEffect="move",f.is(this)?(d.forcePlaceholderSize&&i.height(b.outerHeight()),b.hide(),a(this)[i.index()<a(this).index()?"after":"before"](i),c.not(i).detach()):c.is(this)||a(this).children(d.items).length||(c.detach(),a(this).append(i)),!1))})})}}(jQuery),/*end of drag drop*/
/*******Start of commonValidator*/
commonValidator=function(){var a={validate:function(b){var c=a;c.befSbt=b.beforeSubmit||null,c.disSbt=b.disableSubmit||null,c.lastErr=null,c.isVld=null,c.erArry={},c.noVld=!1,c.errs=b.errors||commonErrList,c.cFocus=b.clearOnFocus||!1;var d=b.inlineErrors!==!1;if(b.messageBox)var e=b.messageBox.id||null,f=b.messageBox.content||null,g=b.messageBox.hideOthers||!1;else var e,f=null;if(b.styles){var h=b.styles.errorClass||null,i=b.styles.okClass||null,j=b.styles.softMandClass||null;k=b.styles.parentObjectClass||null,l=b.styles.maxLevel||1}else var h="err",i="ok",j="softMand",k=null,l=1;var m=b.formNames||null,n=b.defaultEvents||null,o=b.submitButton||null,p=b.fireDelay||0;if(m.constructor===Array)for(var q=0;q<m.length;q++)c.validInit(m[q],o,h,i,j,k,l,e,f,g,d,n,p);else c.validInit(m,o,h,i,j,k,l,e,f,g,d,n,p)},validInit:function(b,c,d,e,f,g,h,i,j,k,l,m,n){var o,p,q,r=a,s=$("form[name="+b+"]").get(0);if(!s){var t=new Error(b);throw t.name="CommonValidator Form",t}if(r.fName=b,r[b]={pExist:g,pLevel:h},/*if(!c.supportPlaceholder()){
				c.setDefaultValues(frmElm);
			}*/
r.checkEvents(s,d,e,f,l,m),c)for(p=r.getSbtBtns($(s),c),o=0;o<p.length;o++)"submit"!=p[o].attr("type")&&(""!=p[o].attr("rel")&&"noValidate"==p[o].attr("rel")?p[o].on("click",function(){r.noVld=!0,$(s).submit()}):p[o].on("click",function(){setTimeout(function(){r.isVld=r.checkSubmit(s,c,d,e,f,i,j,k,l)},parseInt(n))}));$(s).submit(function(){return 0===parseInt(n)?(q=!!r.noVld||r.checkSubmit(s,c,d,e,f,i,j,k,l),r.befSbt&&r.befSbt(),!r.disSbt&&q):(setTimeout(function(){q=!!r.noVld||r.checkSubmit(s,c,d,e,f,i,j,k,l),r.befSbt&&r.befSbt(),!r.disSbt&&q&&(r.sanitizeDefaultValues(s),$(s).get(0).submit())},parseInt(n)),!1)})},setDefaultValues:function(b){var c,d=a,e=b?$(b):$("form[name="+d.fName+"]"),f=d.getFrmElms($(e),!0);for(c=0;c<f.length;c++)""!=f[c].val()&&f[c].val()!=f[c].attr("placeholder")||(f[c].val(f[c].attr("placeholder")),f[c].css({color:"#a9a9a9"})),f[c].on("focus blur",function(a){g(a,$(this))});var g=function(a,b){b.val()==b.attr("placeholder")&&"focus"==a.type?(b.val(""),b.css({color:""})):""!=b.val()&&b.val()!=b.attr("placeholder")||"blur"!=a.type||(b.val(b.attr("placeholder")),b.css({color:"#a9a9a9"}))}},sanitizeDefaultValues:function(b){var c,d=a,e=b?$(b):$("form[name="+d.fName+"]"),f=d.getFrmElms($(e),!0);for(c=0;c<f.length;c++)f[c].val()==f[c].attr("placeholder")&&f[c].val("")},checkEvents:function(b,c,d,e,f,g){var h,i,j=a,k=null,l=j.getFrmElms($(b),!1);for(h=0;h<l.length;h++){var m=l[h].attr("rel").split("|")[0];if((l[h].attr("rel").split("|")[1]||g)&&(g&&(g.constructor===Array?"":g=new Array(g)),k=l[h].attr("rel").split("|")[1]?l[h].attr("rel").split("|")[1].split(","):g))for(i=0;i<k.length;i++)l[h].on(k[i],function(a,b,c,d,e,g){return function(h){j.checkValids(a,b,h,c,d,e,g,f)}}(m,l[h],b,c,d,e));j.cFocus&&l[h].on("focus",function(a,b,c,d,e,f){return function(g){j.clearError(g,a,b,c,d,e,f,!0)}}(m,l[h],b,c,d,e))}},checkSubmit:function(b,c,d,e,f,g,h,i,j){var k,l,m,n,o,p=a,q=!1,r=p.getFrmElms($(b),!1),s=p.getSbtBtns($(b),c);for(i?$(".mgBox").hide():"",$(b).attr("chk",!1),p.erArry={},k=0;k<s.length;k++)""!=s[k].attr("rel")&&$.trim(s[k].attr("rel")).length&&"noValidate"!=s[k].attr("rel")&&(o="custom:"+s[k].attr("rel").split("|")[0],n=p.checkValids(o,s[k],"submit",b,d,e,f,j),q||n||(q=!0));for(l=r.length-1;l>=0;l--)m=r[l].attr("rel").split("|")[0],n=p.checkValids(m,r[l],"submit",b,d,e,f,j),q||n||(q=!0);if(p.lastErr&&"true"==$(b).attr("chk")){if(g){if($("#"+g+"_cMsgCnt")?$("#"+g+"_cMsgCnt").remove():"",h){var t,u=[],v=$("<div>");v.attr("id",g+"_cMsgCnt");for(t in p.erArry)u.push(p.erArry[t]);if(h.customContent){var w=h.customContent,x=$("<p>");x.html(w),v.append(x)}if(h.errorMessages){var l,y=$("<ul>");for(l=u.length-1;l>=0;l--){var z=$("<li>");z.html(u[l]),y.append(z)}v.append(y)}if(h.errorCount){var A=h.errorCount,B=$("<p>");A=1!=A?A.replace("[errCount]",u.length):"Total "+u.length+" errors found in the form.",B.html(A),v.append(B)}$("#"+g).append(v)}$("#"+g).show()}p.lastErr.obj?$(p.lastErr.objCont).focus():p.lastErr.focus()}else g?$("#"+g).hide():"";return!q},clearError:function(b,c,d,e,f,g,h){var i,j=a,k=c.split(","),l="";for(i=0;i<k.length;i++)l=j.errs[k[i].split(":")[1]]||k[i].split(":")[1],l.constructor===Function&&(l=l()),j.heighlightErrOk(l,d,e,"rem",f,g,h)},isValid:function(b){var c,d,e=a,f=b?$("#"+b):$("form[name="+e.fName+"]"),g=!1;if("form"==f.get(0).nodeName.toLowerCase()){var h=e.getFrmElms(f,!1);for(c=h.length-1;c>=0;c--)"button"!=h[c].attr("type")&&"submit"!=h[c].attr("type")&&""!=h[c].attr("rel")&&h[c].attr("rel").split("|")[0].indexOf("softReq")<0&&(d=h[c].attr("rel").split("|")[0],g||e.checkValids(d,h[c])&&(g=!0));return!g}if(""!=f.attr("rel")){var i=f.attr("rel").split("|")[0];return!e.checkValids(i,f)}},isValidSrv:function(b){function c(a,b,c,f,g,h,i,j,k,l,m){switch(a){case"required":return e.reqChk(b,m);case"alphaDS":return e.alphadsChk(b,m);case"alpha":return e.alphaChk(b,m);case"num":return e.numChk(b,m);case"float":return e.floatChk(b,m);case"alphanum":return e.alphanumChk(b,m);case"email":return e.emailChk(b,m);case"specialChar":return e.splChk(b,m);case"charRange":return e.rangeChk(b,g,h,k);case"valRange":return e.rangeVChk(b,i,j,k);case"checked":return e.checkedChkSrv(b);case"selected":return e.selectedChkSrv(b,f);case"custom":var n=d.errs[m];fn=this[n.func];var o=fn.apply(this,n.fields);return"object"==typeof o&&0==o.msg&&(o=""),o}}var d=a,e=d.validators;d.errs=b.custom||{},d.errs.__proto__=commonErrList;for(var f=b.name,g=b.val||"",h=b.custom||null,i="",j=arr[f],k=j.rel.split(","),l=j.defVal||null,m=j.defSelected||"-1",n=j.minL||null,o=j.maxL||null,p=j.minV||null,q=j.maxV||null,r=j.scope||"in",s=0;s<k.length;)if(c(k[s].split(":")[0],g,l,m,n,o,p,q,r,h,k[s].split(":")[1])){if(i+=f+":"+k[s].split(":")[0]+">"+k[s].split(":")[1]+">","custom"!=k[s].split(":")[0]){var t=d.errs[k[s].split(":")[1]].msg?d.errs[k[s].split(":")[1]].msg:d.errs[k[s].split(":")[1]];i+=t.replace("[currVal]",g).replace("[MinL]",n).replace("[MaxL]",o).replace("[MinV]",p).replace("[MaxV]",q)}else i+=c("custom",g,"","","","","","","",h,k[s].split(":")[1]);s=k.length+1,i+=","}else s++;return i+=";",0==i.lastIndexOf(";")&&(i=""),i},checkValids:function(b,c,d,e,f,g,h,i){var j,k=a,l=!1,m=0,n=!1,o=!1;if(2==arguments.length?(l=!0,m=1):9!=d.keyCode&&16!=d.keyCode&&17!=d.keyCode&&18!=d.keyCode&&35!=d.keyCode&&36!=d.keyCode&&27!=d.keyCode&&20!=d.keyCode&&13!=d.keyCode&&(m=1),1==m){var p,q=!1,r="",s=b.split(",");for(p=0;p<s.length;p++)if(!q)switch(s[p].split(":")[0]){case"softReq":j=c.attr("placeholder")&&c.val()==c.attr("placeholder")?"":c.val(),l?n?"":n=k.validators.reqChk(j,s[p].split(":")[1]):(q=k.validators.reqChk(j,s[p].split(":")[1]),r=s[p].split(":")[1],o=!!q);break;case"required":j=c.attr("placeholder")&&c.val()==c.attr("placeholder")?"":c.val(),l?n?"":n=k.validators.reqChk(j,s[p].split(":")[1]):(q=k.validators.reqChk(j,s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"alphaDS":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.alphadsChk(c.val(),s[p].split(":")[1]):(q=k.validators.alphadsChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"alpha":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.alphaChk(c.val(),s[p].split(":")[1]):(q=k.validators.alphaChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"num":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.numChk(c.val(),s[p].split(":")[1]):(q=k.validators.numChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"float":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.floatChk(c.val(),s[p].split(":")[1]):(q=k.validators.floatChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"alphanum":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.alphanumChk(c.val(),s[p].split(":")[1]):(q=k.validators.alphanumChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"email":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.emailChk(c.val(),s[p].split(":")[1]):(q=k.validators.emailChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"specialChar":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.splChk(c.val(),s[p].split(":")[1]):(q=k.validators.splChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"charRange":if(c.attr("placeholder")&&c.val()==c.attr("placeholder"))q=!1;else{var t=c,u=t.attr("minL")?t.attr("minL"):t.attr("minlength"),v=t.attr("maxL")?t.attr("maxL"):t.attr("maxlength"),w="";w=t.attr("scope")&&""!=t.attr("scope")?t.attr("scope"):"in",l?n?"":n=k.validators.rangeChk(t.val(),u,v,w):(q=k.validators.rangeChk(t.val(),u,v,w),r=s[p].split(":")[1])}break;case"valRange":if(c.attr("placeholder")&&c.val()==c.attr("placeholder"))q=!1;else{var t=c,x=t.attr("minval")?parseFloat(t.attr("minval")):parseFloat(t.attr("minV")),y=t.attr("maxval")?parseFloat(t.attr("maxval")):parseFloat(t.attr("maxV")),w="";w=t.attr("scope")&&""!=t.attr("scope")?t.attr("scope"):"in",l?n?"":n=k.validators.rangeVChk(t.val(),x,y,w):(q=k.validators.rangeVChk(t.val(),x,y,w),r=s[p].split(":")[1])}break;case"checked":if(l){if("checkbox"==c.attr("type")){for(var e,z=c;"form"!=z.get(0).nodeName.toLowerCase();)z=z.parent();n?"":n=k.validators.checkedChk(c,z.get(0))}else if("radio"==c.attr("type")){for(var e,z=c;"form"!=z.get(0).nodeName.toLowerCase();)z=z.parent();n?"":n=k.validators.checkedRadChk(c,z.get(0))}}else"checkbox"==c.attr("type")?q=k.validators.checkedChk(c,e):"radio"==c.attr("type")&&(q=k.validators.checkedRadChk(c,e)),r=s[p].split(":")[1];break;case"selected":l?n?"":n=k.validators.selectedChk(c):(q=k.validators.selectedChk(c),r=s[p].split(":")[1]);break;case"custom":if(j=c.attr("placeholder")&&c.val()==c.attr("placeholder")?"":c.val(),l){var A=k.errs[s[p].split(":")[1]],B=A(c,!0);B.constructor===Object?B=B.msg:"",B?B=!0:B,n?"":n=B}else if(k.errs[s[p].split(":")[1]])var A=k.errs[s[p].split(":")[1]],B=A(c);q=B&&B.constructor===Object?B.msg:B,r=B}return l?n:q&&!o?(k.heighlightErrOk(r,c,e,"err",f,g,h,i),k.lastErr=c,!1):q&&o?(k.heighlightErrOk(r,c,e,"sMnd",f,g,h,i),k.lastErr=k.lastErr,!0):(k.heighlightErrOk(r,c,e,"ok",f,g,h,i),!0)}},heighlightErrOk:function(b,c,d,e,f,g,h,i){var j,k=a,l=null,m=k.errs[b]||b,n=c.attr("id")+"_err",o=c.attr("name")+"_err",p=$(d).find(".erLbl"),q=c.attr("id")||c.attr("name"),r=null,s=$(d).attr("name");if(b&&b.constructor===Object&&!k.errs[b]&&(m=b.msg,b.id?n=o=b.id:"",b.errorField?r=b.errorField:""),m&&m.constructor===Object){var t=m;m=t.msg,t.id?n=o=t.id:"",t.errorField?r=t.errorField:""}for(j=0;j<p.length;j++)p.eq(j).attr("id")!=n&&p.eq(j).attr("id")!=o||(l=p.eq(j));var u,v=null;if(k[s].pExist)for(u=0;u<k[s].pLevel;u++)if(c.parents().eq(u).hasClass(k[s].pExist)){v=c.parents().eq(u);break}if("err"==e){if(v&&v.length>0)v.removeClass(f+" "+g+" "+h).addClass(f);else{if(r){var w=$(d).find(r);w.removeClass(f+" "+g+" "+h).addClass(f)}else c.removeClass(f+" "+g+" "+h).addClass(f);l&&(l.removeClass(g+" "+h),!l.hasClass(f)&&i?l.addClass(f):"")}if(l){var x=c.attr("minL")||c.attr("minlength"),y=c.attr("maxL")||c.attr("maxlength"),z=c.attr("minV")||c.attr("minval"),A=c.attr("maxV")||c.attr("maxval");l.attr("id");m=m.replace("[MinL]",x).replace("[MaxL]",y).replace("[MinV]",z).replace("[MaxV]",A).replace("[currVal]",c.val()?c.val().toString().replace("<","&lt;").replace(">","&gt;"):""),i?l.html(m):"",k.erArry[q]=m}$(d).attr("chk","true")}else if("ok"==e){if(v&&v.length>0)v.removeClass(f+" "+g+" "+h).addClass(g);else if(r){var w=$(d).find(r);w.removeClass(f+" "+g+" "+h).addClass(g)}else c.removeClass(f+" "+g+" "+h).addClass(g);l&&(l.html(""),l.removeClass(f+" "+h))}else if("sMnd"==e){if(v&&v.length>0?v.removeClass(f+" "+g+" "+h).addClass(h):(c.removeClass(f+" "+g+" "+h).addClass(h),l&&(l.removeClass(f+" "+g),!l.hasClass(h)&&i?l.addClass(h):"")),l){var x=c.attr("minL")||c.attr("minlength"),y=c.attr("maxL")||c.attr("maxlength"),z=c.attr("minV")||c.attr("minval"),A=c.attr("maxV")||c.attr("maxval");l.attr("id");m=m.toString().replace("[MinL]",x).replace("[MaxL]",y).replace("[MinV]",z).replace("[MaxV]",A).replace("[currVal]",c.val().replace("<","&lt;").replace(">","&gt;")),i?l.html(m):"",k.erArry[q]=m}}else"rem"==e&&(v&&v.length>0?v.removeClass(f+" "+h):(c.removeClass(f+" "+h),l&&l.removeClass(f+" "+h)),l&&l.html(""))},validators:{reqChk:function(b,c){var d=/^\s*$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),!!d.test(b)},alphadsChk:function(b,c){var d=/^[a-zA-Z.\s]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&(b=$.trim(b),0==b.indexOf(".")||!d.test(b))},alphaChk:function(b,c){var d=/^[a-zA-Z]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},numChk:function(b,c){var d=/^[-]?[0-9]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},floatChk:function(b,c){var d=/^[-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},alphanumChk:function(b,c){var d=/^[a-zA-Z0-9]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},emailChk:function(b,c){var d=/^([0-9a-zA-Z]([\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,4})$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},splChk:function(b,c){var d=/^[a-zA-Z\d\s]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},rangeChk:function(a,b,c,d){if(c&&""!=c||(c=a.length+1),""==a)return!1;var d=d||"in",a=new String(a);if("in"==d)return(a.length<b||a.length>c)&&b+":"+c;if("out"==d){if(!(a.length>b))return!1;if(a.length<c)return b+":"+c}},rangeVChk:function(a,b,c,d){if(""==a)return!1;var d=d||"in";if("in"==d)return(parseFloat($.trim(a))<b||parseFloat($.trim(a))>c)&&b+":"+c;if("out"==d){if(!(parseFloat($.trim(a))>b))return!1;if(parseFloat($.trim(a))<c)return b+":"+c}},checkedRadChk:function(a,b){var c,d=!1,e=$(b).find("input[type=radio]");for(c=0;c<e.length;c++)e.eq(c).attr("name")==a.attr("name")&&(e.eq(c).is(":checked")?d=!0:"");return d?ret=!1:ret=!0},checkedChk:function(a,b){var c,d=!1,e=$(b).find("input[type=checkbox]");for(c=0;c<e.length;c++)e.eq(c).attr("name")==a.attr("name")&&(e.eq(c).is(":checked")?d=!0:"");return d?ret=!1:ret=!0},checkedChkSrv:function(a){return null==a||""==a},selectedChk:function(a){return 0==a.get(0).selectedIndex},selectedChkSrv:function(a,b){return a==b}},getFrmElms:function(a,b){var c,d=[],e=a.get(0).elements;for(c=0;c<e.length;c++){var f=e[c].nodeName.toLowerCase();b?"input"!=f&&"select"!=f&&"textarea"!=f||"submit"==$(e[c]).attr("type")||""==$(e[c]).attr("placeholder")||d.push($(e[c])):"input"!=f&&"select"!=f&&"textarea"!=f||"submit"==$(e[c]).attr("type")||!$(e[c]).attr("rel")||""==$(e[c]).attr("rel")||d.push($(e[c]))}return d},getSbtBtns:function(a,b){var c,d=[],e=a.find("input[type=submit], button[type=submit]");if(e.length>0&&d.push(e),b)if(b.constructor===Array)for(c=0;c<b.length;c++)d.push($("#"+b[c]));else d.push($("#"+b));return d},hideElement:function(b){var c,d=a,b=b||null;if(b)if(b.constructor===Array)for(c=0;c<b.length;c++)d.processAltRel(b[c],"h");else d.processAltRel(b,"h")},showElement:function(b){var c,d=a,b=b||null;if(b)if(b.constructor===Array)for(c=0;c<b.length;c++)d.processAltRel(b[c],"s");else d.processAltRel(b,"s")},processAltRel:function(a,b){"s"==b?$("#"+a).attr("rel",$("#"+a).attr("altrel")):"h"==b&&($("#"+a).attr("altrel")?"":$("#"+a).attr("altrel",$("#"+a).attr("rel")),$("#"+a).removeAttr("rel"))},supportPlaceholder:function(){var a=document.createElement("input");return"placeholder"in a},fillVal:function(a){if(a.constructor===Object)for(var b in a)$("#"+b).val(a[b]).css({color:""})}};return{validate:a.validate,showElement:a.showElement,hideElement:a.hideElement,isValid:a.isValid,checkValids:a.checkValids,fillVal:a.fillVal,setDefaultValues:a.setDefaultValues,sanitizeDefaultValues:a.sanitizeDefaultValues,isValidSrv:a.isValidSrv,validators:a.validators}},/*******End of commonValidator*/
/* sticky*/
$.fn.sticky=function(a){function b(){(h||i)&&(c=!!h&&h.inView().status,d=h?h.inView().position:"bottom",e=!!i&&i.inView().status,f=i?i.inView().position:"bottom"),l=!("bottom"!=k||(!c||e)&&(c||e||"top"!=d||"bottom"!=f))||!("top"!=k||c||"top"!=d||"bottom"!=f&&"inside"!=f),l?g.addClass(j):g.removeClass(j)}var c,d,e,f,g=$(this),h=a.topLimit||null,i=a.bottomLimit||null,j=(a.container||null,a["class"]),k=a.relatedTo||"bottom",l=!1;k=k.toLowerCase(),$(window).on("scroll",function(){b()}),b()},$.fn.inViewCallback=function(a){var b=this,c=a.inCallback,d=a.outCallback,e="undefined"==typeof a.repeatInCbFlag||a.repeatInCbFlag,f="undefined"==typeof a.repeatOutCbFlag||a.repeatOutCbFlag,g=b.attr("id"),h=!0,i=!1;$(window).scroll(function(){var a=b.inView().status;a!=i&&(i=a,i&&g?(e||(g=e),c?c():""):!i&&h&&(f||(h=!1),d?d():""))}),$(window).scroll()},$.fn.inView=function(a){var b,c,d=0,e=0,f=$(window),g=$(this),h=f.scrollTop(),i=f.scrollTop()+f.height(),j=g.offset().top+g.outerHeight();return a&&(d=a.topOff||0,e=a.bottomOff||0),c=h>j+e?"top":i<j-d?"bottom":"inside",b=i>=j-d&&h<=j+e,{status:b,position:c}},/*end of sticky*/
/*******Start of commonValidator*/
commonValidator=function(){var a={validate:function(b){var c=a;c.befSbt=b.beforeSubmit||null,c.disSbt=b.disableSubmit||null,c.lastErr=null,c.isVld=null,c.erArry={},c.noVld=!1,c.errs=b.errors||commonErrList,c.cFocus=b.clearOnFocus||!1;var d=b.inlineErrors!==!1;if(b.messageBox)var e=b.messageBox.id||null,f=b.messageBox.content||null,g=b.messageBox.hideOthers||!1;else var e,f=null;if(b.styles){var h=b.styles.errorClass||null,i=b.styles.okClass||null,j=b.styles.softMandClass||null;k=b.styles.parentObjectClass||null,l=b.styles.maxLevel||1}else var h="err",i="ok",j="softMand",k=null,l=1;var m=b.formNames||null,n=b.defaultEvents||null,o=b.submitButton||null,p=b.fireDelay||0;if(m.constructor===Array)for(var q=0;q<m.length;q++)c.validInit(m[q],o,h,i,j,k,l,e,f,g,d,n,p);else c.validInit(m,o,h,i,j,k,l,e,f,g,d,n,p)},validInit:function(b,c,d,e,f,g,h,i,j,k,l,m,n){var o,p,q,r=a,s=$("form[name="+b+"]").get(0);if(!s){var t=new Error(b);throw t.name="CommonValidator Form",t}if(r.fName=b,r[b]={pExist:g,pLevel:h},/*if(!c.supportPlaceholder()){
				c.setDefaultValues(frmElm);
			}*/
r.checkEvents(s,d,e,f,l,m),c)for(p=r.getSbtBtns($(s),c),o=0;o<p.length;o++)"submit"!=p[o].attr("type")&&(""!=p[o].attr("rel")&&"noValidate"==p[o].attr("rel")?p[o].on("click",function(){r.noVld=!0,$(s).submit()}):p[o].on("click",function(){setTimeout(function(){r.isVld=r.checkSubmit(s,c,d,e,f,i,j,k,l)},parseInt(n))}));$(s).submit(function(){return 0===parseInt(n)?(q=!!r.noVld||r.checkSubmit(s,c,d,e,f,i,j,k,l),r.befSbt&&r.befSbt(),!r.disSbt&&q):(setTimeout(function(){q=!!r.noVld||r.checkSubmit(s,c,d,e,f,i,j,k,l),r.befSbt&&r.befSbt(),!r.disSbt&&q&&(r.sanitizeDefaultValues(s),$(s).get(0).submit())},parseInt(n)),!1)})},setDefaultValues:function(b){var c,d=a,e=b?$(b):$("form[name="+d.fName+"]"),f=d.getFrmElms($(e),!0);for(c=0;c<f.length;c++)""!=f[c].val()&&f[c].val()!=f[c].attr("placeholder")||(f[c].val(f[c].attr("placeholder")),f[c].css({color:"#a9a9a9"})),f[c].on("focus blur",function(a){g(a,$(this))});var g=function(a,b){b.val()==b.attr("placeholder")&&"focus"==a.type?(b.val(""),b.css({color:""})):""!=b.val()&&b.val()!=b.attr("placeholder")||"blur"!=a.type||(b.val(b.attr("placeholder")),b.css({color:"#a9a9a9"}))}},sanitizeDefaultValues:function(b){var c,d=a,e=b?$(b):$("form[name="+d.fName+"]"),f=d.getFrmElms($(e),!0);for(c=0;c<f.length;c++)f[c].val()==f[c].attr("placeholder")&&f[c].val("")},checkEvents:function(b,c,d,e,f,g){var h,i,j=a,k=null,l=j.getFrmElms($(b),!1);for(h=0;h<l.length;h++){var m=l[h].attr("rel").split("|")[0];if((l[h].attr("rel").split("|")[1]||g)&&(g&&(g.constructor===Array?"":g=new Array(g)),k=l[h].attr("rel").split("|")[1]?l[h].attr("rel").split("|")[1].split(","):g))for(i=0;i<k.length;i++)l[h].on(k[i],function(a,b,c,d,e,g){return function(h){j.checkValids(a,b,h,c,d,e,g,f)}}(m,l[h],b,c,d,e));j.cFocus&&l[h].on("focus",function(a,b,c,d,e,f){return function(g){j.clearError(g,a,b,c,d,e,f,!0)}}(m,l[h],b,c,d,e))}},checkSubmit:function(b,c,d,e,f,g,h,i,j){var k,l,m,n,o,p=a,q=!1,r=p.getFrmElms($(b),!1),s=p.getSbtBtns($(b),c);for(i?$(".mgBox").hide():"",$(b).attr("chk",!1),p.erArry={},k=0;k<s.length;k++)""!=s[k].attr("rel")&&$.trim(s[k].attr("rel")).length&&"noValidate"!=s[k].attr("rel")&&(o="custom:"+s[k].attr("rel").split("|")[0],n=p.checkValids(o,s[k],"submit",b,d,e,f,j),q||n||(q=!0));for(l=r.length-1;l>=0;l--)m=r[l].attr("rel").split("|")[0],n=p.checkValids(m,r[l],"submit",b,d,e,f,j),q||n||(q=!0);if(p.lastErr&&"true"==$(b).attr("chk")){if(g){if($("#"+g+"_cMsgCnt")?$("#"+g+"_cMsgCnt").remove():"",h){var t,u=[],v=$("<div>");v.attr("id",g+"_cMsgCnt");for(t in p.erArry)u.push(p.erArry[t]);if(h.customContent){var w=h.customContent,x=$("<p>");x.html(w),v.append(x)}if(h.errorMessages){var l,y=$("<ul>");for(l=u.length-1;l>=0;l--){var z=$("<li>");z.html(u[l]),y.append(z)}v.append(y)}if(h.errorCount){var A=h.errorCount,B=$("<p>");A=1!=A?A.replace("[errCount]",u.length):"Total "+u.length+" errors found in the form.",B.html(A),v.append(B)}$("#"+g).append(v)}$("#"+g).show()}p.lastErr.obj?$(p.lastErr.objCont).focus():p.lastErr.focus()}else g?$("#"+g).hide():"";return!q},clearError:function(b,c,d,e,f,g,h){var i,j=a,k=c.split(","),l="";for(i=0;i<k.length;i++)l=j.errs[k[i].split(":")[1]]||k[i].split(":")[1],l.constructor===Function&&(l=l()),j.heighlightErrOk(l,d,e,"rem",f,g,h)},isValid:function(b){var c,d,e=a,f=b?$("#"+b):$("form[name="+e.fName+"]"),g=!1;if("form"==f.get(0).nodeName.toLowerCase()){var h=e.getFrmElms(f,!1);for(c=h.length-1;c>=0;c--)"button"!=h[c].attr("type")&&"submit"!=h[c].attr("type")&&""!=h[c].attr("rel")&&h[c].attr("rel").split("|")[0].indexOf("softReq")<0&&(d=h[c].attr("rel").split("|")[0],g||e.checkValids(d,h[c])&&(g=!0));return!g}if(""!=f.attr("rel")){var i=f.attr("rel").split("|")[0];return!e.checkValids(i,f)}},isValidSrv:function(b){function c(a,b,c,f,g,h,i,j,k,l,m){switch(a){case"required":return e.reqChk(b,m);case"alphaDS":return e.alphadsChk(b,m);case"alpha":return e.alphaChk(b,m);case"num":return e.numChk(b,m);case"float":return e.floatChk(b,m);case"alphanum":return e.alphanumChk(b,m);case"email":return e.emailChk(b,m);case"specialChar":return e.splChk(b,m);case"charRange":return e.rangeChk(b,g,h,k);case"valRange":return e.rangeVChk(b,i,j,k);case"checked":return e.checkedChkSrv(b);case"selected":return e.selectedChkSrv(b,f);case"custom":var n=d.errs[m];fn=this[n.func];var o=fn.apply(this,n.fields);return"object"==typeof o&&0==o.msg&&(o=""),o}}var d=a,e=d.validators;d.errs=b.custom||{},d.errs.__proto__=commonErrList;for(var f=b.name,g=b.val||"",h=b.custom||null,i="",j=arr[f],k=j.rel.split(","),l=j.defVal||null,m=j.defSelected||"-1",n=j.minL||null,o=j.maxL||null,p=j.minV||null,q=j.maxV||null,r=j.scope||"in",s=0;s<k.length;)if(c(k[s].split(":")[0],g,l,m,n,o,p,q,r,h,k[s].split(":")[1])){if(i+=f+":"+k[s].split(":")[0]+">"+k[s].split(":")[1]+">","custom"!=k[s].split(":")[0]){var t=d.errs[k[s].split(":")[1]].msg?d.errs[k[s].split(":")[1]].msg:d.errs[k[s].split(":")[1]];i+=t.replace("[currVal]",g).replace("[MinL]",n).replace("[MaxL]",o).replace("[MinV]",p).replace("[MaxV]",q)}else i+=c("custom",g,"","","","","","","",h,k[s].split(":")[1]);s=k.length+1,i+=","}else s++;return i+=";",0==i.lastIndexOf(";")&&(i=""),i},checkValids:function(b,c,d,e,f,g,h,i){var j,k=a,l=!1,m=0,n=!1,o=!1;if(2==arguments.length?(l=!0,m=1):9!=d.keyCode&&16!=d.keyCode&&17!=d.keyCode&&18!=d.keyCode&&35!=d.keyCode&&36!=d.keyCode&&27!=d.keyCode&&20!=d.keyCode&&13!=d.keyCode&&(m=1),1==m){var p,q=!1,r="",s=b.split(",");for(p=0;p<s.length;p++)if(!q)switch(s[p].split(":")[0]){case"softReq":j=c.attr("placeholder")&&c.val()==c.attr("placeholder")?"":c.val(),l?n?"":n=k.validators.reqChk(j,s[p].split(":")[1]):(q=k.validators.reqChk(j,s[p].split(":")[1]),r=s[p].split(":")[1],o=!!q);break;case"required":j=c.attr("placeholder")&&c.val()==c.attr("placeholder")?"":c.val(),l?n?"":n=k.validators.reqChk(j,s[p].split(":")[1]):(q=k.validators.reqChk(j,s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"alphaDS":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.alphadsChk(c.val(),s[p].split(":")[1]):(q=k.validators.alphadsChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"alpha":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.alphaChk(c.val(),s[p].split(":")[1]):(q=k.validators.alphaChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"num":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.numChk(c.val(),s[p].split(":")[1]):(q=k.validators.numChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"float":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.floatChk(c.val(),s[p].split(":")[1]):(q=k.validators.floatChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"alphanum":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.alphanumChk(c.val(),s[p].split(":")[1]):(q=k.validators.alphanumChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"email":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.emailChk(c.val(),s[p].split(":")[1]):(q=k.validators.emailChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"specialChar":c.attr("placeholder")&&c.val()==c.attr("placeholder")?q=!1:l?n?"":n=k.validators.splChk(c.val(),s[p].split(":")[1]):(q=k.validators.splChk(c.val(),s[p].split(":")[1]),r=s[p].split(":")[1]);break;case"charRange":if(c.attr("placeholder")&&c.val()==c.attr("placeholder"))q=!1;else{var t=c,u=t.attr("minL")?t.attr("minL"):t.attr("minlength"),v=t.attr("maxL")?t.attr("maxL"):t.attr("maxlength"),w="";w=t.attr("scope")&&""!=t.attr("scope")?t.attr("scope"):"in",l?n?"":n=k.validators.rangeChk(t.val(),u,v,w):(q=k.validators.rangeChk(t.val(),u,v,w),r=s[p].split(":")[1])}break;case"valRange":if(c.attr("placeholder")&&c.val()==c.attr("placeholder"))q=!1;else{var t=c,x=t.attr("minval")?parseFloat(t.attr("minval")):parseFloat(t.attr("minV")),y=t.attr("maxval")?parseFloat(t.attr("maxval")):parseFloat(t.attr("maxV")),w="";w=t.attr("scope")&&""!=t.attr("scope")?t.attr("scope"):"in",l?n?"":n=k.validators.rangeVChk(t.val(),x,y,w):(q=k.validators.rangeVChk(t.val(),x,y,w),r=s[p].split(":")[1])}break;case"checked":if(l){if("checkbox"==c.attr("type")){for(var e,z=c;"form"!=z.get(0).nodeName.toLowerCase();)z=z.parent();n?"":n=k.validators.checkedChk(c,z.get(0))}else if("radio"==c.attr("type")){for(var e,z=c;"form"!=z.get(0).nodeName.toLowerCase();)z=z.parent();n?"":n=k.validators.checkedRadChk(c,z.get(0))}}else"checkbox"==c.attr("type")?q=k.validators.checkedChk(c,e):"radio"==c.attr("type")&&(q=k.validators.checkedRadChk(c,e)),r=s[p].split(":")[1];break;case"selected":l?n?"":n=k.validators.selectedChk(c):(q=k.validators.selectedChk(c),r=s[p].split(":")[1]);break;case"custom":if(j=c.attr("placeholder")&&c.val()==c.attr("placeholder")?"":c.val(),l){var A=k.errs[s[p].split(":")[1]],B=A(c,!0);B.constructor===Object?B=B.msg:"",B?B=!0:B,n?"":n=B}else if(k.errs[s[p].split(":")[1]])var A=k.errs[s[p].split(":")[1]],B=A(c);q=B&&B.constructor===Object?B.msg:B,r=B}return l?n:q&&!o?(k.heighlightErrOk(r,c,e,"err",f,g,h,i),k.lastErr=c,!1):q&&o?(k.heighlightErrOk(r,c,e,"sMnd",f,g,h,i),k.lastErr=k.lastErr,!0):(k.heighlightErrOk(r,c,e,"ok",f,g,h,i),!0)}},heighlightErrOk:function(b,c,d,e,f,g,h,i){var j,k=a,l=null,m=k.errs[b]||b,n=c.attr("id")+"_err",o=c.attr("name")+"_err",p=$(d).find(".erLbl"),q=c.attr("id")||c.attr("name"),r=null,s=$(d).attr("name");if(b&&b.constructor===Object&&!k.errs[b]&&(m=b.msg,b.id?n=o=b.id:"",b.errorField?r=b.errorField:""),m&&m.constructor===Object){var t=m;m=t.msg,t.id?n=o=t.id:"",t.errorField?r=t.errorField:""}for(j=0;j<p.length;j++)p.eq(j).attr("id")!=n&&p.eq(j).attr("id")!=o||(l=p.eq(j));var u,v=null;if(k[s].pExist)for(u=0;u<k[s].pLevel;u++)if(c.parents().eq(u).hasClass(k[s].pExist)){v=c.parents().eq(u);break}if("err"==e){if(v&&v.length>0)v.removeClass(f+" "+g+" "+h).addClass(f);else{if(r){var w=$(d).find(r);w.removeClass(f+" "+g+" "+h).addClass(f)}else c.removeClass(f+" "+g+" "+h).addClass(f);l&&(l.removeClass(g+" "+h),!l.hasClass(f)&&i?l.addClass(f):"")}if(l){var x=c.attr("minL")||c.attr("minlength"),y=c.attr("maxL")||c.attr("maxlength"),z=c.attr("minV")||c.attr("minval"),A=c.attr("maxV")||c.attr("maxval");l.attr("id");m=m.replace("[MinL]",x).replace("[MaxL]",y).replace("[MinV]",z).replace("[MaxV]",A).replace("[currVal]",c.val()?c.val().toString().replace("<","&lt;").replace(">","&gt;"):""),i?l.html(m):"",k.erArry[q]=m}$(d).attr("chk","true")}else if("ok"==e){if(v&&v.length>0)v.removeClass(f+" "+g+" "+h).addClass(g);else if(r){var w=$(d).find(r);w.removeClass(f+" "+g+" "+h).addClass(g)}else c.removeClass(f+" "+g+" "+h).addClass(g);l&&(l.html(""),l.removeClass(f+" "+h))}else if("sMnd"==e){if(v&&v.length>0?v.removeClass(f+" "+g+" "+h).addClass(h):(c.removeClass(f+" "+g+" "+h).addClass(h),l&&(l.removeClass(f+" "+g),!l.hasClass(h)&&i?l.addClass(h):"")),l){var x=c.attr("minL")||c.attr("minlength"),y=c.attr("maxL")||c.attr("maxlength"),z=c.attr("minV")||c.attr("minval"),A=c.attr("maxV")||c.attr("maxval");l.attr("id");m=m.toString().replace("[MinL]",x).replace("[MaxL]",y).replace("[MinV]",z).replace("[MaxV]",A).replace("[currVal]",c.val().replace("<","&lt;").replace(">","&gt;")),i?l.html(m):"",k.erArry[q]=m}}else"rem"==e&&(v&&v.length>0?v.removeClass(f+" "+h):(c.removeClass(f+" "+h),l&&l.removeClass(f+" "+h)),l&&l.html(""))},validators:{reqChk:function(b,c){var d=/^\s*$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),!!d.test(b)},alphadsChk:function(b,c){var d=/^[a-zA-Z.\s]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&(b=$.trim(b),0==b.indexOf(".")||!d.test(b))},alphaChk:function(b,c){var d=/^[a-zA-Z]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},numChk:function(b,c){var d=/^[-]?[0-9]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},floatChk:function(b,c){var d=/^[-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},alphanumChk:function(b,c){var d=/^[a-zA-Z0-9]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},emailChk:function(b,c){var d=/^([0-9a-zA-Z]([\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,4})$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},splChk:function(b,c){var d=/^[a-zA-Z\d\s]+$/;return a.errs[c]&&(d=new RegExp(a.errs[c].regEx||d)),""!=b&&!d.test($.trim(b))},rangeChk:function(a,b,c,d){if(c&&""!=c||(c=a.length+1),""==a)return!1;var d=d||"in",a=new String(a);if("in"==d)return(a.length<b||a.length>c)&&b+":"+c;if("out"==d){if(!(a.length>b))return!1;if(a.length<c)return b+":"+c}},rangeVChk:function(a,b,c,d){if(""==a)return!1;var d=d||"in";if("in"==d)return(parseFloat($.trim(a))<b||parseFloat($.trim(a))>c)&&b+":"+c;if("out"==d){if(!(parseFloat($.trim(a))>b))return!1;if(parseFloat($.trim(a))<c)return b+":"+c}},checkedRadChk:function(a,b){var c,d=!1,e=$(b).find("input[type=radio]");for(c=0;c<e.length;c++)e.eq(c).attr("name")==a.attr("name")&&(e.eq(c).is(":checked")?d=!0:"");return d?ret=!1:ret=!0},checkedChk:function(a,b){var c,d=!1,e=$(b).find("input[type=checkbox]");for(c=0;c<e.length;c++)e.eq(c).attr("name")==a.attr("name")&&(e.eq(c).is(":checked")?d=!0:"");return d?ret=!1:ret=!0},checkedChkSrv:function(a){return null==a||""==a},selectedChk:function(a){return 0==a.get(0).selectedIndex},selectedChkSrv:function(a,b){return a==b}},getFrmElms:function(a,b){var c,d=[],e=a.get(0).elements;for(c=0;c<e.length;c++){var f=e[c].nodeName.toLowerCase();b?"input"!=f&&"select"!=f&&"textarea"!=f||"submit"==$(e[c]).attr("type")||""==$(e[c]).attr("placeholder")||d.push($(e[c])):"input"!=f&&"select"!=f&&"textarea"!=f||"submit"==$(e[c]).attr("type")||!$(e[c]).attr("rel")||""==$(e[c]).attr("rel")||d.push($(e[c]))}return d},getSbtBtns:function(a,b){var c,d=[],e=a.find("input[type=submit], button[type=submit]");if(e.length>0&&d.push(e),b)if(b.constructor===Array)for(c=0;c<b.length;c++)d.push($("#"+b[c]));else d.push($("#"+b));return d},hideElement:function(b){var c,d=a,b=b||null;if(b)if(b.constructor===Array)for(c=0;c<b.length;c++)d.processAltRel(b[c],"h");else d.processAltRel(b,"h")},showElement:function(b){var c,d=a,b=b||null;if(b)if(b.constructor===Array)for(c=0;c<b.length;c++)d.processAltRel(b[c],"s");else d.processAltRel(b,"s")},processAltRel:function(a,b){"s"==b?$("#"+a).attr("rel",$("#"+a).attr("altrel")):"h"==b&&($("#"+a).attr("altrel")?"":$("#"+a).attr("altrel",$("#"+a).attr("rel")),$("#"+a).removeAttr("rel"))},supportPlaceholder:function(){var a=document.createElement("input");return"placeholder"in a},fillVal:function(a){if(a.constructor===Object)for(var b in a)$("#"+b).val(a[b]).css({color:""})}};return{validate:a.validate,showElement:a.showElement,hideElement:a.hideElement,isValid:a.isValid,checkValids:a.checkValids,fillVal:a.fillVal,setDefaultValues:a.setDefaultValues,sanitizeDefaultValues:a.sanitizeDefaultValues,isValidSrv:a.isValidSrv,validators:a.validators}},/*******End of commonValidator*/
/*** JSONP*****/
/*
 * jQuery JSONP Core Plugin 2.4.0 (2012-08-21)
 *
 * https://github.com/jaubourg/jquery-jsonp
 *
 * Copyright (c) 2012 Julian Aubourg
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
function(a){
// ###################### UTILITIES ##
// Noop
function b(){}
// Generic callback
function c(a){g=[a]}
// Call if defined
function d(a,b,c){return a&&a.apply(b.context||b,c)}
// Give joining character given url
function e(a){return/\?/.test(a)?"&":"?"}
// ###################### MAIN FUNCTION ##
function f(f){
// Success notifier
function n(a){X++||(Y(),
// Pagecache if needed
S&&(A[U]={s:[a]}),
// Apply the data filter if provided
O&&(a=O.apply(f,[a])),
// Call success then complete
d(L,f,[a,v,f]),d(N,f,[f,v]))}
// Error notifier
function F(a){X++||(
// Clean up
Y(),
// If pure error (not timeout), cache if needed
S&&a!=w&&(A[U]=a),
// Call error then complete
d(M,f,[f,a]),d(N,f,[f,a]))}
// Build data with default
f=a.extend({},C,f);
// References to xOptions members (for better minification)
var G,
// Request execution vars
H,I,J,K,L=f.success,M=f.error,N=f.complete,O=f.dataFilter,P=f.callbackParameter,Q=f.callback,R=f.cache,S=f.pageCache,T=f.charset,U=f.url,V=f.data,W=f.timeout,
// Abort/done flag
X=0,
// Life-cycle functions
Y=b;
// Call beforeSend if provided (early abort if false returned)
// If we have Deferreds:
// - substitute callbacks
// - promote xOptions to a promise
// Create the abort method
// Call beforeSend if provided (early abort if false returned)
// Control entries
// Build final url
// Add callback parameter if provided as option
// Add anticache parameter if needed
// Replace last ? by callback parameter
// Check page cache
// Install the generic callback
// (BEWARE: global namespace pollution ahoy)
// Create the script tag
// Set charset if provided
// onerror is not supported: do not set as async and assume in-order execution.
// Add a trailing script to emulate the event
// onerror is supported: set the script as async to avoid requests blocking each others
// Internet Explorer: event/htmlFor trick
// Attached event handlers
// Set source
// Re-declare cleanUp function
// Append main script
// Append trailing script if needed
// If a timeout is needed, install it
return y&&y(function(a){a.done(L).fail(M),L=a.resolve,M=a.reject}).promise(f),f.abort=function(){!X++&&Y()},d(f.beforeSend,f,[f])===!1||X?f:(U=U||j,V=V?"string"==typeof V?V:a.param(V,f.traditional):j,U+=V?e(U)+V:j,P&&(U+=e(U)+encodeURIComponent(P)+"=?"),!R&&!S&&(U+=e(U)+"_"+(new Date).getTime()+"="),U=U.replace(/=\?(&|$)/,"="+Q+"$1"),S&&(G=A[U])?G.s?n(G.s[0]):F(G):(x[Q]=c,I=a(u)[0],I.id=m+B++,T&&(I[i]=T),D&&D.version()<11.6?(J=a(u)[0]).text="document.getElementById('"+I.id+"')."+p+"()":I[h]=h,E&&(I.htmlFor=I.id,I.event=o),I[q]=I[p]=I[r]=function(a){
// Test readyState if it exists
if(!I[s]||!/i/.test(I[s])){try{I[o]&&I[o]()}catch(b){}a=g,g=0,a?n(a[0]):F(k)}},I.src=U,Y=function(a){K&&clearTimeout(K),I[r]=I[q]=I[p]=null,z[t](I),J&&z[t](J)},z[l](I,H=z.firstChild),J&&z[l](J,H),K=W>0&&setTimeout(function(){F(w)},W)),f)}var
// Last returned value
g,// String constants (for better minification)
h="async",i="charset",j="",k="error",l="insertBefore",m="_jqjsp",n="on",o=n+"click",p=n+k,q=n+"load",r=n+"readystatechange",s="readyState",t="removeChild",u="<script>",v="success",w="timeout",
// Window
x=window,
// Deferred
y=a.Deferred,
// Head element
z=a("head")[0]||document.documentElement,
// Page cache
A={},
// Counter
B=0,
// ###################### DEFAULT OPTIONS ##
C={
//beforeSend: undefined,
//cache: false,
callback:m,
//callbackParameter: undefined,
//charset: undefined,
//complete: undefined,
//context: undefined,
//data: "",
//dataFilter: undefined,
//error: undefined,
//pageCache: false,
//success: undefined,
//timeout: 0,
//traditional: false,
url:location.href},
// opera demands sniffing :/
D=x.opera,
// IE < 10
E=!!a("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;
// ###################### SETUP FUNCTION ##
f.setup=function(b){a.extend(C,b)},
// ###################### INSTALL in jQuery ##
a.jsonp=f}(jQuery),/***end***/
/*** Suggestor*****/
/*jslint eqeq:true, boss:true*/
/*Start of Suggestor.js (newJquerySugg_6.2.0)*/
$(document).on("click.suggestor",function(a){var b=a.srcElement||a.target;$(b).parents(".suggest").length||$(".suggest .sugCont").slideUp(100)}),createTags.prototype=function(){var a=function(a){var b=this;a.children(".dCross").on("click",function(){b.remValue($(this).parent())}).on("keydown",function(a){b.keyHandling.call($(this),a,b.contId)})},b=function(a,b){var c,d=this,e=d.hdElm.val()||"",f=e.toLowerCase().split(",");$.inArray(a.toLowerCase(),f)==-1&&(1==d.placeTagEnd?(c=d.container.find(".lastLi"),c.before(b),d.onCreate()):(d.container.append(b),d.onCreate()),
//key = key.replace(/|xudrScrx|/g,'_');
e?d.hdElm.val(e+","+a):d.hdElm.val(a))},c=function(a){var b=a.next().children(".dCross"),c=a.prev().children(".dCross"),d=this;b.length?b[0].focus():c.length&&c[0].focus();var e;e=d.keyAsVal?a.data("id").split("_")[0]:a.data("id").split("_")[1].replace(/\-/g," ");
// var key = _this.data('id').split('_')[keyIndex].replace(/\-/g,' '),
var f=d.hdElm.val().toLowerCase().split(",");index=$.inArray(e.replace("|xudrscrx|","_"),f),index!=-1?f.splice(index,1):"",e=f,d.retainText&&(d.sugElm?d.sugElm.val(e):""),d.hdElm.val(e),setTimeout(function(){a.remove()},100)},d=function(a,b){var c=a.keyCode||a.which,d=this.parent(),e=d.prev().children(".dCross"),f=d.next().children(".dCross");37==c?e.length?e[0].focus():"":39==c?f.length?f[0].focus():"":38==c?b.find(".tagit").first().children(".dCross")[0].focus():40==c&&b.find(".tagit").last().children(".dCross")[0].focus()};return{setValue:b,remValue:c,keyHandling:d,bindEvent_cross:a}}();var smToggle=function(a){var b=this;b.obj=a.ids,b.contid=a.contid,b.showit=a.showit||!1,b.showcl=a.showcl||"",b.hidecl=a.hidecl||"",b.init=function(){for(var a=0;a<b.obj.length;a++){var c=$(b.obj[a]);c&&("input"!=c[0].tagName.toLowerCase()&&(1==b.showit?c.addClass(b.hidecl):c.addClass(b.showcl)),c.bind("click",function(){b.toggleit($(this))}),"input"!=c[0].tagName.toLowerCase()&&b.toggleit(c))}},b.toggleit=function(a){var c=a?a:$(this),d=c[0].tagName.toLowerCase(),e=""!=c.attr("rel")?c.attr("rel"):c.attr("id")+"_toggle";"input"===d&&"text"!=c.attr("type")?c.checked?$("#"+e).show():$("#"+e).hide():c.hasClass(b.hidecl)==b.hidecl?($("#"+e).show(),c.removeClass(b.hidecl),c.addClass(b.showcl)):($("#"+e).hide(),c.removeClass(b.showcl),c.addClass(b.hidecl))},b.init()};/*!
 *
 * jQuery TE 1.4.0 , http://jqueryte.com/
 * Copyright (C) 2013, Fatih Koca (fattih@fattih.com), (http://jqueryte.com/about)

 * jQuery TE is provided under the MIT LICENSE.
 *
*/
//DO NOT REMOVE BELOW SEMI-COLON.
//DO NOT REMOVE ABOVE SEMI-COLON.
!function(a){a.fn.jqte=function(b){
// insertion function for parameters to toolbar
function c(a,b,c,d,e){var f=k.length+1;return k.push({name:a,cls:f,command:b,key:c,tag:d,emphasis:e})}
// default titles of buttons
var d=[{title:"Text Format"},{title:"Font Size"},{title:"Color"},{title:"Bold",hotkey:"B"},{title:"Italic",hotkey:"I"},{title:"Underline",hotkey:"U"},{title:"Ordered List",hotkey:"."},{title:"Unordered List",hotkey:","},{title:"Subscript",hotkey:"down arrow"},{title:"Superscript",hotkey:"up arrow"},{title:"Outdent",hotkey:"left arrow"},{title:"Indent",hotkey:"right arrow"},{title:"Justify Left"},{title:"Justify Center"},{title:"Justify Right"},{title:"Strike Through",hotkey:"K"},{title:"Add Link",hotkey:"L"},{title:"Remove Link"},{title:"Cleaner Style",hotkey:"Delete"},{title:"Horizontal Rule",hotkey:"H"},{title:"Source"}],e=[["p","Normal"],["h1","Header 1"],["h2","Header 2"],["h3","Header 3"],["h4","Header 4"],["h5","Header 5"],["h6","Header 6"],["pre","Preformatted"]],f=["10","12","16","18","20","24","28"],g=["0,0,0","68,68,68","102,102,102","153,153,153","204,204,204","238,238,238","243,243,243","255,255,255",null,"255,0,0","255,153,0","255,255,0","0,255,0","0,255,255","0,0,255","153,0,255","255,0,255",null,"244,204,204","252,229,205","255,242,204","217,234,211","208,224,227","207,226,243","217,210,233","234,209,220","234,153,153","249,203,156","255,229,153","182,215,168","162,196,201","159,197,232","180,167,214","213,166,189","224,102,102","246,178,107","255,217,102","147,196,125","118,165,175","111,168,220","142,124,195","194,123,160","204,0,0","230,145,56","241,194,50","106,168,79","69,129,142","61,133,198","103,78,167","166,77,121","153,0,0","180,95,6","191,144,0","56,118,29","19,79,92","11,83,148","53,28,117","116,27,71","102,0,0","120,63,4","127,96,0","39,78,19","12,52,61","7,55,99","32,18,77","76,17,48"],h=["Web Address","E-mail Address","Picture URL"],i=a.extend({
// options
status:!0,css:"jqte",title:!0,titletext:d,button:"OK",format:!1,formats:e,fsize:!1,fsizes:f,funit:"px",color:!1,linktypes:h,b:!1,i:!1,u:!1,ol:!1,ul:!1,sub:!1,sup:!1,outdent:!1,indent:!1,left:!1,center:!1,right:!1,strike:!1,link:!1,unlink:!1,remove:!1,rule:!1,source:!1,placeholder:!1,br:!1,p:!1,
// events
change:"",focus:"",blur:""},b);
// methods
a.fn.jqteVal=function(b){a(this).closest("."+i.css).find("."+i.css+"_editor").html(b)};
// browser information is received
var j=navigator.userAgent.toLowerCase();
// if browser is ie and it version is 7 or even older, close title property
/msie [1-7]./.test(j)&&(i.title=!1);var k=[];// feature of displaying source
// add parameters for toolbar buttons
// text format button  --> no hotkey
// font size button --> no hotkey
// text color button  --> no hotkey
// bold --> ctrl + b
// italic --> ctrl + i
// underline --> ctrl + u
// ordered list --> ctrl + .(dot)
// unordered list --> ctrl + ,(comma)
// sub script --> ctrl + down arrow
// super script --> ctrl + up arrow
// outdent --> ctrl + left arrow
// indent --> ctrl + right arrow
// justify Left --> no hotkey
// justify center --> no hotkey
// justify right --> no hotkey
// strike through --> ctrl + K
// insertion link  --> ctrl + L
// remove link --> ctrl + N
// remove all styles --> ctrl + delete
// insertion horizontal rule --> ctrl + H
return c("format","formats","","",!1),c("fsize","fSize","","",!1),c("color","colors","","",!1),c("b","Bold","B",["b","strong"],!0),c("i","Italic","I",["i","em"],!0),c("u","Underline","U",["u"],!0),c("ol","insertorderedlist","¾",["ol"],!0),c("ul","insertunorderedlist","¼",["ul"],!0),c("sub","subscript","(",["sub"],!0),c("sup","superscript","&",["sup"],!0),c("outdent","outdent","%",["blockquote"],!1),c("indent","indent","'",["blockquote"],!0),c("left","justifyLeft","","",!1),c("center","justifyCenter","","",!1),c("right","justifyRight","","",!1),c("strike","strikeThrough","K",["strike"],!0),c("link","linkcreator","L",["a"],!0),c("unlink","unlink","",["a"],!1),c("remove","removeformat",".","",!1),c("rule","inserthorizontalrule","H",["hr"],!1),c("source","displaysource","","",!1),this.each(function(){
// get the selected text as plain format
function b(){
// for webkit, mozilla, opera
// for webkit, mozilla, opera
return window.getSelection?window.getSelection():document.selection&&document.selection.createRange&&"None"!=document.selection.type?document.selection.createRange():void 0}
// the function of changing to the selected text with "execCommand" method
function c(a,c){var d,f=b();
// for webkit, mozilla, opera
if(window.getSelection){
// Pradeep - Added Support for target blank in anchor tags.
if(f.anchorNode&&f.getRangeAt&&(d=f.getRangeAt(0)),d&&(f.removeAllRanges(),f.addRange(d)),j.match(/msie/)||document.execCommand("StyleWithCSS",!1,!1),document.execCommand(a,!1,c),"createlink"==a){var g=document.getSelection();
//IE-11 Fix
j.match(/trident.*rv\:11\./)?(
//selection.anchorNode.parentNode.target = "_blank";
g.anchorNode.parentNode.href="#",g.anchorNode.parentNode.setAttribute("onclick","window.open('"+c+"');return false;")):/chrome/.test(j)||/safari/.test(j)||/yandex/.test(j)?(
//Chrome Fix
//selection.anchorNode.parentElement.target = '_blank';
g.anchorNode.parentElement.href="#",g.anchorNode.parentElement.setAttribute("onclick","window.open('"+c+"');return false;")):/mozilla/.test(j)&&(
//Mozilla Fix
//selection.anchorNode.target = '_blank';
g.anchorNode.href="#",g.anchorNode.setAttribute("onclick","window.open('"+c+"');return false;"))}}else document.selection&&document.selection.createRange&&"None"!=document.selection.type&&(
// for ie
d=document.selection.createRange(),d.execCommand(a,!1,c));
// change styles to around tags
e(!1,!1)}
// the function of changing to the selected text with tags and tags's attributes
function d(c,d,f){
// for webkit, mozilla, opera
if(
// first, prevent to conflict of different jqte editors
H.not(":focus")&&H.focus(),window.getSelection){var g,h,i,j=b();j.anchorNode&&j.getRangeAt&&(g=j.getRangeAt(0),
// create to new element
h=document.createElement(c),
// add the attribute to the new element
a(h).attr(d,f),
// extract to the selected text
i=g.extractContents(),
// add the contents to the new element
h.appendChild(i),g.insertNode(h),j.removeAllRanges(),
// if the attribute is "style", change styles to around tags
"style"==d?e(a(h),f):
// for other attributes
e(a(h),!1))}else if(document.selection&&document.selection.createRange&&"None"!=document.selection.type){
// for ie
var k=document.selection.createRange(),l=k.htmlText,m="<"+c+" "+d+'="'+f+'">'+l+"</"+c+">";document.selection.createRange().pasteHTML(m)}}
// the function of replacement styles to the around tags (parent and child)
function e(a,b){var c=ba();
// (for replacement with execCommand) affect to child tags with parent tag's styles
if(// the selected node
c=c?c:a,c&&0==b)
// apply to the selected node with parent tag's styles
c.parent().is("[style]")&&c.attr("style",c.parent().attr("style")),
// apply to child tags with parent tag's styles
c.is("[style]")&&c.find("*").attr("style",c.attr("style"));else if(a&&b&&a.is("[style]")){
// (for replacement with html changing method)
var d=b.split(";");// split the styles
d=d[0].split(":"),// get the key of first style feature
// apply to child tags with parent tag's styles
a.is("[style*="+d[0]+"]")&&a.find("*").css(d[0],d[1]),
// select to the selected node again
f(a)}}
// the function of making selected to a element
function f(b){if(b){var b=b[0];if(document.body.createTextRange){var c=document.body.createTextRange();c.moveToElementText(b),c.select()}else if(window.getSelection){var d=window.getSelection(),c=document.createRange();"undefined"!=b&&null!=b&&(c.selectNodeContents(b),d.removeAllRanges(),d.addRange(c),a(b).is(":empty")&&(a(b).append("&nbsp;"),f(a(b))))}}}
// the function of converting text to link
function h(){if(F.data("sourceOpened"))
// hide the link-form-field
m(!1);else{var b=ba(),c="http://";if(// default the input value of the link-form-field
// display the link-form-field
m(!0),b){var e=b.prop("tagName").toLowerCase();
// if tag name of the selected node is "a" and the selected node have "href" attribute
"a"==e&&b.is("[href]")?(c=b.attr("href"),
//setting target to _blank for anchor tags.
b.attr(O,"")):
// if it don't have "a" tag name
d("a",O,"")}else K.val(c).focus();
// the method of displaying-hiding to link-types
J.click(function(b){(a(b.target).hasClass(i.css+"_linktypetext")||a(b.target).hasClass(i.css+"_linktypearrow"))&&n(!0)}),
// the method of selecting to link-types
M.find("a").click(function(){var b=a(this).attr(i.css+"-linktype");M.data("linktype",b),N.find("."+i.css+"_linktypetext").html(M.find("a:eq("+M.data("linktype")+")").text()),o(c),n()}),o(c),
// the method of link-input
K.focus().val(c).bind("keypress keyup",function(a){if(13==a.keyCode)return l(E.find("["+O+"]")),!1}),
// the event of click link-button
L.click(function(){l(E.find("["+O+"]"))})}}function l(b){
// focus to link-input
K.focus(),
// select to the selected node
f(b),
// remove pre-link attribute (mark as "link will be added") of the selected node
b.removeAttr(O),
// if not selected to link-type of picture
"2"!=M.data("linktype")?c("createlink",K.val()):(
// insert link url of link-input to the selected node
// if selected to link-type of picture
c("insertImage",K.val()),// insert image url of link-input to the selected node
// the method of all pictures in the editor
H.find("img").each(function(){var b=a(this).prev("a"),c=a(this).next("a");
// if "a" tags of the front and rear of the picture is empty, remove
b.length>0&&""==b.html()?b.remove():c.length>0&&""==c.html()&&c.remove()})),
// hide the link-form-field
m(),
// export contents of the text to the sources
H.trigger("change")}
// the function of switching link-form-field
function m(a){
// remove all pre-link attribute (mark as "link will be added")
r("["+O+"]:not([href])"),E.find("["+O+"][href]").removeAttr(O),a?(F.data("linkOpened",!0),G.show()):(F.data("linkOpened",!1),G.hide()),n()}
// the function of switching link-type-selector
function n(a){a?M.show():M.hide()}
// the function of updating the link-input according to the link-type
function o(a){var b=M.data("linktype");
// if selected type of e-mail
"1"!=b||"http://"!=K.val()&&!K.is("[value^=http://]")&&K.is("[value^=mailto]")?"1"==b||K.is("[value^=http://]")?K.val(a):K.val("http://"):K.val("mailto:")}
// the function of adding style to selected text
function p(b){F.data("sourceOpened")?
// hide the style-field
q(styleField,!1):(
// if selected to changing the font-size value
"fSize"==b?styleField=_:"colors"==b&&(
// if selected to changing the text-color value
styleField=aa),
// display the style-field
q(styleField,!0),
// the event of click to style button
styleField.find("a").unbind("click").click(function(){var c=a(this).attr(i.css+"-styleval");// the property of style value to be added
// if selected to changing the font-size value
"fSize"==b?(styleType="font-size",c+=i.funit):"colors"==b&&(
// if selected to changing the text-color value
styleType="color",c="rgb("+c+")");var e=s(styleType);// affect styles to child tags (and extract to the new style attributes)
// change to selected text
d("span","style",styleType+":"+c+";"+e),
// hide all style-fields
q("",!1),
// remove title bubbles
a("."+i.css+"_title").remove(),
// export contents of the text to the sources
H.trigger("change")})),
// hide the link-form-field
m(!1)}
// the function of switching the style-field
function q(a,b){var c="",// the style data of the actual wanted
d=[{d:"fsizeOpened",f:_},{d:"cpallOpened",f:aa}];// all style datas
// if the style data of the actual wanted isn't empty
if(""!=a)
// return to all datas and find the main data
for(var e=0;e<d.length;e++)a==d[e].f&&(c=d[e]);
// display the style-field
if(b){F.data(c.d,!0),// stil seçme alanının açıldığını belirten parametre yaz
c.f.slideDown(100);// stil seçme alanını aç
// return to all datas and close the fields of external datas
for(var e=0;e<d.length;e++)c.d!=d[e].d&&(F.data(d[e].d,!1),d[e].f.slideUp(100))}else
// hide all style-fields
// return to all datas and close all style fields
for(var e=0;e<d.length;e++)F.data(d[e].d,!1),d[e].f.slideUp(100)}
// the function of removing all pre-link attribute (mark as "link will be added")
function r(b){E.find(b).each(function(){a(this).before(a(this).html()).remove()})}
// the function of refusing some styles
function s(a){var b=ba();// the selected node
// if the selected node have attribute of "style" and it have unwanted style
if(b&&b.is("[style]")&&""!=b.css(a)){var c=b.css(a);// first get key of unwanted style
b.css(a,"");// clear unwanted style
var d=b.attr("style");// add unwanted style to the selected node again
// cleaned style
return b.css(a,c),d}return""}
// the function of adding style to selected text
function t(){u(!0),$.find("a").click(function(){a("*",this).click(function(a){return a.preventDefault(),!1}),v(a(this).text());var b=a(this).attr(i.css+"-formatval");// the type of format value
// convert to selected format
c("formatBlock","<"+b+">"),u(!1)})}
// the function of switching the style-field
function u(a){var b=!!a;b=!(!a||!$.data("status")),b||!a?$.data("status",!1).slideUp(200):$.data("status",!0).slideDown(200)}
// change format label
function v(a){var b=$.closest("."+i.css+"_tool").find("."+i.css+"_tool_label").find("."+i.css+"_tool_text");a.length>10&&(a=a.substr(0,7)+"..."),
// change format label of button
b.html(a)}
// the function of insertion a specific form to texts
function w(a){var b,c,d;
// repeat the cleaning process 5 times
for(
// first remove to unnecessary gaps
b=a.replace(/\n/gim,"").replace(/\r/gim,"").replace(/\t/gim,"").replace(/&nbsp;/gim," "),c=[/\<span(|\s+.*?)><span(|\s+.*?)>(.*?)<\/span><\/span>/gim,// trim nested spans
/<(\w*[^p])\s*[^\/>]*>\s*<\/\1>/gim,// remove empty or white-spaces tags (ignore paragraphs (<p>) and breaks (<br>))
/\<div(|\s+.*?)>(.*?)\<\/div>/gim,// convert div to p
/\<strong(|\s+.*?)>(.*?)\<\/strong>/gim,// convert strong to b
/\<em(|\s+.*?)>(.*?)\<\/em>/gim],d=["<span$2>$3</span>","","<p$1>$2</p>","<b$1>$2</b>","<i$1>$2</i>"],W=0;W<5;W++)
// create loop as the number of pattern
for(var e=0;e<c.length;e++)b=b.replace(c[e],d[e]);
// if break is false (<br>), convert <br> to <p>
if(
// if paragraph is false (<p>), convert <p> to <br>
i.p||(b=b.replace(/\<p(|\s+.*?)>(.*?)\<\/p>/gi,"<br/>$2")),!i.br){c=[/\<br>(.*?)/gi,/\<br\/>(.*?)/gi],d=["<p>$1</p>","<p>$1</p>"];
// create loop as the number of pattern (for breaks)
for(var e=0;e<c.length;e++)b=b.replace(c[e],d[e])}
// if paragraph and break is false (<p> && <br>), convert <p> to <div>
return i.p||i.br||(b=b.replace(/\<p>(.*?)\<\/p>/gi,"<div>$1</div>")),b}
// the function of exporting contents of the text field to the source field (to be the standard in all browsers)
function x(){
// clear unnecessary tags when editor view empty
var a=""==H.text()&&H.html().length<12?"":H.html();B.val(w(a))}
// the function of exporting contents of the source field to the text field (to be the standard in all browsers)
function y(){H.html(w(B.val()))}
// the function of getting parent (or super parent) tag name of the selected node
function z(b){var c,d=!1,e=ba();return!!e&&(a.each(b,function(b,f){c=e.prop("tagName").toLowerCase(),c==f?d=!0:e.parents().each(function(){c=a(this).prop("tagName").toLowerCase(),c==f&&(d=!0)})}),d)}
// the function of highlighting the toolbar buttons according to the cursor position in jqte editor
function A(b){for(var c=0;c<k.length;c++)i[k[c].name]&&k[c].emphasis&&""!=k[c].tag&&(z(k[c].tag)?F.find("."+i.css+"_tool_"+k[c].cls).addClass(I):a("."+i.css+"_tool_"+k[c].cls).removeClass(I));
// showing text format
if(i.format&&a.isArray(i.formats)){for(var d=!1,e=0;e<i.formats.length;e++){var f=[];if(f[0]=i.formats[e][0],i.formats[e][0].length>0&&z(f)){v(i.formats[e][1]),d=!0;break}}d||v(i.formats[0][1])}
// hide all style-fields
q("",!1),u(!1)}
// is the status false of the editor
if(a(this).data("jqte")&&null!=a(this).data("jqte")&&"undefined"!=a(this).data("jqte")?a(this).data("jqte",!1):a(this).data("jqte",!0),i.status&&a(this).data("jqte")){
// element will converted to the jqte editor
var B=a(this),C=a(this).prop("tagName").toLowerCase();
// tag name of origin
a(this).attr("data-origin",C);
// contents of the element
var D=a(this).is("[value]")||"textarea"==C?a(this).val():a(this).html();
// decode special html characters
D=D.replace(/&#34;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"),
// start jqte editor to after the element
a(this).after('<div class="'+i.css+'"></div>');
// jqte
var E=a(this).next("."+i.css);
// insert toolbar in jqte editor
E.html('<div class="'+i.css+'_toolbar" role="toolbar" unselectable></div><div class="'+i.css+'_linkform" style="display:none" role="dialog"></div><div class="'+i.css+'_editor"></div>');var F=E.find("."+i.css+"_toolbar"),G=E.find("."+i.css+"_linkform"),H=E.find("."+i.css+"_editor"),I=i.css+"_tool_depressed";// highlight style of the toolbar buttons
// add to some tools in link form area
G.append('<div class="'+i.css+'_linktypeselect" unselectable></div><input class="'+i.css+'_linkinput" type="text/css" value=""><div class="'+i.css+'_linkbutton" unselectable>'+i.button+'</div> <div style="height:1px;float:none;clear:both"></div>');var J=G.find("."+i.css+"_linktypeselect"),K=G.find("."+i.css+"_linkinput"),L=G.find("."+i.css+"_linkbutton");// the button of insertion link
// add to the link-type-selector sub tool parts
J.append('<div class="'+i.css+'_linktypeview" unselectable></div><div class="'+i.css+'_linktypes" role="menu" unselectable></div>');var M=J.find("."+i.css+"_linktypes"),N=J.find("."+i.css+"_linktypeview"),O=i.css+"-setlink";// the selected text add to mark as "link will be added"
// create to the source-area
H.after('<div class="'+i.css+"_source "+i.css+'_hiddenField"></div>');var P=E.find("."+i.css+"_source");
// if the element isn't a textarea, convert this to textarea
if(// the source-area variable
// move the element to the source-area
B.appendTo(P),"textarea"!=C){
// add all attributes of element to new textarea (type and value except)
var Q="";a(B[0].attributes).each(function(){"type"!=this.nodeName&&"value"!=this.nodeName&&(Q=Q+" "+this.nodeName+'="'+this.nodeValue+'"')}),
// convert the element to textarea
B.replaceWith("<textarea "+Q+">"+D+"</textarea>"),
// update to variable of thisElement
B=P.find("textarea")}
// add feature editable to the text-field ve copy from the element's value to text-field
H.attr("contenteditable","true").html(D);
// insertion the toolbar button
for(var R=0;R<k.length;R++)
// if setting of this button is activated (is it true?)
if(i[k[R].name]){
// if it have a title, add to this button
var S=k[R].key.length>0&&null!=i.titletext[R].hotkey&&"undefined"!=i.titletext[R].hotkey&&""!=i.titletext[R].hotkey?" (Ctrl+"+i.titletext[R].hotkey+")":"",T=null!=i.titletext[R].title&&"undefined"!=i.titletext[R].title&&""!=i.titletext[R].title?i.titletext[R].title+S:"";
// format-selector field
if(
// add this button to the toolbar
F.append('<div class="'+i.css+"_tool "+i.css+"_tool_"+k[R].cls+'" role="button" data-tool="'+R+'" unselectable><a class="'+i.css+'_tool_icon" unselectable></a></div>'),
// add the parameters to this button
F.find("."+i.css+"_tool[data-tool="+R+"]").data({tag:k[R].tag,command:k[R].command,emphasis:k[R].emphasis,title:T}),"format"==k[R].name&&a.isArray(i.formats)){
// selected text format
var U=i.formats[0][1].length>0&&"undefined"!=i.formats[0][1]?i.formats[0][1]:"";F.find("."+i.css+"_tool_"+k[R].cls).find("."+i.css+"_tool_icon").replaceWith('<a class="'+i.css+'_tool_label" unselectable><span class="'+i.css+'_tool_text" unselectable>'+U+'</span><span class="'+i.css+'_tool_icon" unselectable></span></a>'),F.find("."+i.css+"_tool_"+k[R].cls).append('<div class="'+i.css+'_formats" unselectable></div>');
// add font-sizes to font-size-selector
for(var V=0;V<i.formats.length;V++)F.find("."+i.css+"_formats").append("<a "+i.css+'-formatval="'+i.formats[V][0]+'" class="'+i.css+"_format "+i.css+"_format_"+V+'" role="menuitem" unselectable>'+i.formats[V][1]+"</a>");F.find("."+i.css+"_formats").data("status",!1)}else if("fsize"==k[R].name&&a.isArray(i.fsizes)){
// font-size-selector field
F.find("."+i.css+"_tool_"+k[R].cls).append('<div class="'+i.css+'_fontsizes" unselectable></div>');
// add font-sizes to font-size-selector
for(var V=0;V<i.fsizes.length;V++)F.find("."+i.css+"_fontsizes").append("<a "+i.css+'-styleval="'+i.fsizes[V]+'" class="'+i.css+'_fontsize" style="font-size:'+i.fsizes[V]+i.funit+'" role="menuitem" unselectable>Abcdefgh...</a>')}else if("color"==k[R].name&&a.isArray(g)){
// color-selector field
F.find("."+i.css+"_tool_"+k[R].cls).append('<div class="'+i.css+'_cpalette" unselectable></div>');
// create color palette to color-selector field
for(var W=0;W<g.length;W++)null!=g[W]?F.find("."+i.css+"_cpalette").append("<a "+i.css+'-styleval="'+g[W]+'" class="'+i.css+'_color" style="background-color: rgb('+g[W]+')" role="gridcell" unselectable></a>'):F.find("."+i.css+"_cpalette").append('<div class="'+i.css+'_colorSeperator"></div>')}}
// the default value of the link-type
M.data("linktype","0");
// add link types to link-type-selector
for(var R=0;R<3;R++)M.append("<a "+i.css+'-linktype="'+R+'" unselectable>'+i.linktypes[R]+"</a>"),N.html('<div class="'+i.css+'_linktypearrow" unselectable></div><div class="'+i.css+'_linktypetext">'+M.find("a:eq("+M.data("linktype")+")").text()+"</div>");
// add the prefix of css according to browser
var X="";
// the feature of placeholder
if(
// ie
X=/msie/.test(j)?"-ms-":/chrome/.test(j)||/safari/.test(j)||/yandex/.test(j)?"-webkit-":/mozilla/.test(j)?"-moz-":/opera/.test(j)?"-o-":/konqueror/.test(j)?"-khtml-":"",i.placeholder&&""!=i.placeholder){E.prepend('<div class="'+i.css+'_placeholder" unselectable><div class="'+i.css+'_placeholder_text">'+i.placeholder+"</div></div>");var Y=E.find("."+i.css+"_placeholder");Y.click(function(){H.focus()})}
// make unselectable to unselectable attribute ones
E.find("[unselectable]").css(X+"user-select","none").addClass("unselectable").attr("unselectable","on").on("selectstart mousedown",!1);
// each button of the toolbar
var Z=F.find("."+i.css+"_tool"),$=F.find("."+i.css+"_formats"),_=F.find("."+i.css+"_fontsizes"),aa=F.find("."+i.css+"_cpalette"),ba=function(){var b,c;if(window.getSelection&&(c=getSelection(),b=c.anchorNode),!b&&document.selection&&document.selection.createRange&&"None"!=document.selection.type){c=document.selection;var d=c.getRangeAt?c.getRangeAt(0):c.createRange();b=d.commonAncestorContainer?d.commonAncestorContainer:d.parentElement?d.parentElement():d.item(0)}return!!b&&a("#text"==b.nodeName?b.parentNode:b)};
// the event of click to the toolbar buttons
Z.unbind("click").click(function(b){
// if source button is clicked
"displaysource"!=a(this).data("command")||F.data("sourceOpened")?(
// if other buttons is clicked
// if source field is closed
F.data("sourceOpened")?(
// hide the source field and display the text field
// update to data of source hiding
F.data("sourceOpened",!1),
// display all the toolbar buttons
F.find("."+i.css+"_tool").removeClass(i.css+"_hiddenField"),P.addClass(i.css+"_hiddenField"),H.removeClass(i.css+"_hiddenField")):
// if insert-link-button is clicked
"linkcreator"==a(this).data("command")?F.data("linkOpened")?(
// hide the link-form-field
m(!1),
// hide format field
u(!1)):h():"formats"==a(this).data("command")?(
// if the format button is clicked
"formats"!=a(this).data("command")||a(b.target).hasClass(i.css+"_format")||t(),
// hide all style-fields
q("",!1),H.not(":focus")&&H.focus()):"fSize"==a(this).data("command")||"colors"==a(this).data("command")?(
// if the style buttons are clicked
("fSize"==a(this).data("command")&&!a(b.target).hasClass(i.css+"_fontsize")||// the font-size button
"colors"==a(this).data("command")&&!a(b.target).hasClass(i.css+"_color"))&&p(a(this).data("command")),
// hide format field
u(!1),H.not(":focus")&&H.focus()):(
// if other buttons is clicked
// first, prevent to conflict of different jqte editors
H.not(":focus")&&H.focus(),
// apply command of clicked button to the selected text
c(a(this).data("command"),null),
// hide all menu-fields
q("",!1),u(!1),n(),
// to highlight the toolbar buttons according to the cursor position in jqte editor
1!=a(this).data("emphasis")||a(this).hasClass(I)?a(this).removeClass(I):a(this).addClass(I),P.addClass(i.css+"_hiddenField"),H.removeClass(i.css+"_hiddenField")),i.placeholder&&""!=i.placeholder&&(""!=H.html()?Y.hide():Y.show())):(
// hide all the toolbar buttons (except the source button)
F.find("."+i.css+"_tool").addClass(i.css+"_hiddenField"),a(this).removeClass(i.css+"_hiddenField"),
// update to data of source displaying
F.data("sourceOpened",!0),
// equalize height of the text field with height of the source field
B.css("height",H.outerHeight()),P.removeClass(i.css+"_hiddenField"),H.addClass(i.css+"_hiddenField"),B.focus(),
// hide the link-form-field
m(!1),
// hide all style-fields
q("",!1),
// hide format field
u(),
// hide placeholder
i.placeholder&&""!=i.placeholder&&Y.hide()),
// export contents of the text to the sources
H.trigger("change")}).hover(function(b){if(i.title&&""!=a(this).data("title")&&(a(b.target).hasClass(i.css+"_tool")||a(b.target).hasClass(i.css+"_tool_icon"))){a("."+i.css+"_title").remove(),
// create the title bubble
E.append('<div class="'+i.css+'_title"><div class="'+i.css+'_titleArrow"><div class="'+i.css+'_titleArrowIcon"></div></div><div class="'+i.css+'_titleText">'+a(this).data("title")+"</div></div>");var c=a("."+i.css+"_title:first"),d=(c.find("."+i.css+"_titleArrowIcon"),a(this).position()),e=d.left+a(this).outerWidth()-c.outerWidth()/2-a(this).outerWidth()/2,f=d.top+a(this).outerHeight()+5;
// show the title bubble and set to its position
c.delay(400).css({top:f,left:e}).fadeIn(200)}},function(){a("."+i.css+"_title").remove()});
// prevent multiple calling postToSource()
var ca=null;
// the methods of the text fields
H.bind("keypress keyup keydown drop cut copy paste DOMCharacterDataModified DOMSubtreeModified",function(){
// export contents of the text to the sources
F.data("sourceOpened")||a(this).trigger("change"),
// hide the link-type-field
n(),
// if the change method is added run the change method
a.isFunction(i.change)&&i.change(),
// the feature of placeholder
i.placeholder&&""!=i.placeholder&&(""!=a(this).text()?Y.hide():Y.show())}).bind("change",function(){F.data("sourceOpened")||(clearTimeout(ca),ca=setTimeout(x,10))}).keydown(function(a){
// if ctrl key is clicked
if(a.ctrlKey)
// check all toolbar buttons
for(var b=0;b<k.length;b++)
// if this settings of this button is activated (is it true)
// if the keyed button with ctrl is same of hotkey of this button
if(i[k[b].name]&&a.keyCode==k[b].key.charCodeAt(0))return""!=k[b].command&&"linkcreator"!=k[b].command?c(k[b].command,null):"linkcreator"==k[b].command&&h(),!1}).bind("mouseup keyup",A).focus(function(){
// prevent focus problem on opera
if(
// if the focus method is added run the focus method
a.isFunction(i.focus)&&i.focus(),
// add onfocus class
E.addClass(i.css+"_focused"),/opera/.test(j)){var b=document.createRange();b.selectNodeContents(H[0]),b.collapse(!1);var c=window.getSelection();c.removeAllRanges(),c.addRange(b)}}).focusout(function(){
// remove to highlights of all toolbar buttons
Z.removeClass(I),
// hide all menu-fields
q("",!1),u(!1),n(),
// if the blur method is added run the blur method
a.isFunction(i.blur)&&i.blur(),
// remove onfocus class
E.removeClass(i.css+"_focused"),
// show default text format
a.isArray(i.formats)&&v(i.formats[0][1])}),
// the event of key in the source field
B.bind("keydown keyup",function(){
// export contents of the source to the text field
setTimeout(y,0),
// auto extension for the source field
a(this).height(a(this)[0].scrollHeight),
// if the source field is empty, shorten to the source field
""==a(this).val()&&a(this).height(0)}).focus(function(){
// add onfocus class
E.addClass(i.css+"_focused")}).focusout(function(){
// remove onfocus class
E.removeClass(i.css+"_focused")})}else
// if wanting the false status later
if(a(this).closest("."+i.css).length>0){var da=a(this).closest("."+i.css).find("."+i.css+"_editor").html(),Q="";a(a(this)[0].attributes).each(function(){"style"!=this.nodeName&&(Q=Q+" "+this.nodeName+'="'+this.nodeValue+'"')});var C=a(this).is("[data-origin]")&&""!=a(this).attr("data-origin")?a(this).attr("data-origin"):"textarea",ea=">"+da;
// if this element is input or option
"input"!=C&&"option"!=C||(
// encode special html characters
da=da.replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),
// the value of this element
ea='value="'+da+'">');var fa=a(this).clone();a(this).data("jqte",!1).closest("."+i.css).before(fa).remove(),fa.replaceWith("<"+C+Q+ea+"</"+C+">")}})},
// Added star rating plugin jquery version 07-11-2016 - Ankit Saini
window.starRate={init:function(b){var c,d,e,f=this,g=b.containerId.constructor==Array?b.containerId:b.containerId.split(","),h=b.inactiveClass||"inactive",i=b.activeClass||"active",j=b.activeHoverClass||"",k=b.selectedClass||"selected",l=b.onSelect||null,m=b.uncheckable||!1,n=b.starCount||5;for(d=0;d<g.length;d++){var o=g[d].split("|")[0],p=g[d].split("|")[1]||0;e=f.generateStars(o,h,i,j,k,l,m,p,n),c=a("<input>").attr({type:"hidden",id:o+"_val",value:p}),a("#"+o).append(e).append(c)}},generateStars:function(b,c,d,e,f,g,h,i,j){function k(){var b,c=a(this),g=c.parent().children("li"),h=c.attr("id").split("_")[1];for(b=0;b<g.length;b++)g.eq(b).attr("id").split("_")[1]<=h&&g.eq(b).hasClass(f)!=f?g.eq(b).addClass(d):g.eq(b).attr("id").split("_")[1]<=h&&g.eq(b).hasClass(f)==f&&g.eq(b).addClass(e);e&&g.removeClass(f)}function l(){var c=a(this),g=c.parent().children("li"),h=(c.attr("id").split("_")[1],a("#"+b+"_val").val());for(g.removeClass(d).removeClass(e),o=0;o<h;o++)g.eq(o).removeClass(f).addClass(f)}function m(){function c(){a("#"+b+"_val").val(m),starRate.ratingValue=m,starRate.id=b,g&&g(j)}var i,j=a(this),k=j.parent().children("li"),l=j.attr("id").split("_")[1],m=0,n=!0;if(h&&+l+1==a("#"+b+"_val").val())if(j.next()&&j.next().hasClass(f)!=f||!j.next()){for(k.removeClass(f),i=0;i<k.length;i++)k.eq(i).attr("id").split("_")[1]<=l&&(k.eq(i).removeClass(f).removeClass(e).addClass(d),m++);m=0}else for(k.removeClass(f),i=0;i<k.length;i++)k.eq(i).attr("id").split("_")[1]<=l&&(k.eq(i).removeClass(d).removeClass(e).addClass(f),m++);else for(j.hasClass(f)==f&&(j.next()&&j.next().hasClass(f)!=f||!j.next())&&(n=!1),k.removeClass(f),i=0;i<k.length;i++)k.eq(i).attr("id").split("_")[1]<=l&&(k.eq(i).removeClass(d).removeClass(e).addClass(f),m++);n&&c()}var n,o,p=a("<ul>");for(o=0;o<j;o++)n=a("<li>"),n.attr({id:b+"Str_"+o}),i>0&&o<i?n.attr({"class":f}):n.attr({"class":c}),n.on("mouseover",k),n.on("mouseout",l),n.on("click",m),p.append(n);return p}}}(jQuery),/*jslint eqeq:true, boss:true*/
/*Start of Suggestor.js (newJquerySugg_7.2.0)*/
function(a){a.fn.suggestor=function(b){var c={url:{},showRelatedConcept:!0,relatedConcept_dataLayer:!0,// once relatedConcept data received,
// using 'relatedConcept_dataLayer' parameter we can configure whether we want to show/hide data list
autoCorrect_dataLayer:!0,maxSuggestions:15,maxHeight:300,multiSearch:!1,startSearchAfter:1,suggestOnClick:!1,whiteListSpecialChar:[],relatedCorrectionText:"Did you mean ?",relatedConceptText:"Related Skills",glbArray:!1,placeholder:!1,trackUserInteraction:!1,// to track user Interaction
grouping:!0,isPrefetch:!0,source:"server",versionKey:"__infoEdge/versions",onSelect:function(){},scrollStyle:"",returnFocus:!0,relatedConceptCategory:{
// for RC category
skill:"Skills"},personalization:{},onFocusSuggest:{visibility:!0,data:{}}},d=a.extend(!0,{},c,b),e=ncCacheFactory.getCache("sgtr"),f=function(b,c,e,f){if(b){var g=this;a.jsonp({url:b+"&callback=suggestInfoEdge",cache:!0,callback:"suggestInfoEdge",beforeSend:function(){a("#"+f+" .nLoder").show()},success:function(b){b.resultList?a.isEmptyObject(b.resultList)?O.call(g):(g.dataType="autoconcepts",c(b)):b.resultConcepts?(a.isEmptyObject(b.resultConcepts)?O.call(g):(g.dataType="relatedConcept",d.getRelatedConcepts&&d.getRelatedConcepts(b,g.Qry),// to pass related concept data in callback
d.relatedConcept_dataLayer&&c(b)),g.relatedConceptMaxCounter++):b.resultCorrections?(a.isEmptyObject(b.resultCorrections)?O.call(g):(g.dataType="relatedConcept",d.getAutoCorrect&&d.getAutoCorrect(b,g.Qry),// to pass autoCorrect data in callback
d.autoCorrect_dataLayer&&c(b)),g.relatedConceptMaxCounter++):c(b)},complete:function(){g.node.find(".nLoder").hide()},error:function(a,b){g.node.find(".nLoder").hide(),O.call(g)}})}},g=function(){var b=this;b.rs_kWrds=[],b.rs_kWrdsStr="",
//if (params.onFocusSuggest.visibility) {
// //var recentSearches = getRecentSearchArray('rcnt_srch', getSection());
// var recentSearches = [
//     ['java'],
//     ['Java'],
//     ['java%2C%20php'],
//     ['java%2C%20php%2C%20c++'],
//     ['SQL%2C%20php'],
//     [',sales manager,,java']
// ];
/*for (var i = recentSearches.length - 1; i >= 0; i--) {
                var tmp = $.trim(decodeURIComponent(recentSearches[i][0]));
                if (tmp && $.inArray(tmp.toLowerCase(), tempAry) == -1) {
                    tempAry.push(tmp.toLowerCase());
                    _t.rs_kWrds.push(tmp);
                }
            }
            _t.rs_kWrdsStr = _t.rs_kWrds.join(',').replace(/\s,|,\s/g, ',');*/
//}
a.isEmptyObject(d.personalization)||(b.rs_kWrdsStr=d.personalization.keywords.join(","));var c=d.prefetchData,e=d.personalization.userCookie?getCookie(d.personalization.userCookie):"";return e?{key:c.key+"/uId/"+e,url:d.url.prefetch+"&"+Math.random(1,100)+"&keywords="+b.rs_kWrdsStr+"&uid="+e,keywords:b.rs_kWrdsStr}:b.rs_kWrdsStr?{key:c.key,url:d.url.prefetch+"&"+Math.random(1,100)+"&keywords="+b.rs_kWrdsStr,keywords:b.rs_kWrdsStr}:{key:c.key,url:d.url.prefetch+"&"+Math.random(1,100)+"&keywords=",keywords:b.rs_kWrdsStr}},h=function(b,c){var d=a.extend({},b.ac,c.ac),e=a.extend({},b.ac,c.rc);return{ac:d,rc:e,ttl:c.ttl,segments:c.segments,keyword_based_data:c.keyword_based_data}},i=function(){var a=this;d.url.checkVersion+=Math.random(0,100),a.prefetchObj=g.call(a),f.call(a,d.url.checkVersion,function(b){o(d.versionKey,b);var c=e.getItem(a.prefetchObj.key);if(c)/**
						 * [if description]
						 * @param  {String} isData.keyword_based_data [need to check with black string, because in some cases false is treated as a true]
						 */
(a.prefetchObj.keywords&&c.keyword_based_data===!1||+new Date(c.ttl)-+new Date<0)&&f.call(a,a.prefetchObj.url+"&segments="+c.segments,function(b){o(a.prefetchObj.key,h(c,b))},"Error!!!");else{isDataExist=e.getItem(d.prefetchData.key);var g=isDataExist?isDataExist.segments:"";f.call(a,a.prefetchObj.url+"&segments="+g,function(b){o(a.prefetchObj.key,b)},"Error!!!")}},"Error while prefetch data")},j=function(a,b){
// need to rewrite this function
var c=b,d=b;if(a.setSelectionRange)a.focus(),a.setSelectionRange(c,d);else if(a.createTextRange){var e=a.createTextRange();e.collapse(!0),e.moveEnd("character",d),e.moveStart("character",c),e.select()}},k=function(a){
//'Unit Test Done':
return a.replace(/(<([^>]+)>)/gi,"").replace(/&amp;/gi,"&")},l=function(b){return b=a.trim(b).toLowerCase(),b=a.trim(b.substring(b.lastIndexOf(",")+1,b.length))},m=function(b){var c=a.trim(b).replace(/,*$/g,"");return a.trim(c.substring(c.lastIndexOf(",")+1,c.length)).toLowerCase()},n=function(){return"undefined"!=typeof Storage},o=function(a,b){e.setItem(a,b)},p=function(a,b){if(this.prefetchObj){var c=e.getItem(this.prefetchObj.key);return c&&c[b][a]||(c=e.getItem(d.prefetchData.key)),!!c&&c[b][a]}return!1},q=function(){var a=this,b=a.inpElm.val();b&&a.inpElm.val(b.replace(/,\s*$/,""))},r=function(b){
//'Unit Test Done':
var c=this,e=c.inpElm.val(),f=e.substring(0,e.lastIndexOf(",")+1);return f=f?f+" ":"",b=a.trim(k(b).replace(/,*$/g,"")),d.multiSearch?f+b+", ":b},s=function(b,c){return a.inArray(b[0],c.find("li.sugTouple"))+1},t=function(b){var c=this,e=c.inpElm.next("[trackobj]"),f=l(b.replace(/[,\s]*$/,""));if("autoconcepts"==c.dataType){var g={};g[l(c.queryChar)]={text:f,pos:c.posIndex},c.tObj.push(g)}else if("relatedConcept"==c.dataType){var h=c.tObj[c.tObj.length-1];a.isArray(h.ms_rc)?h.ms_rc.push({rcFor:c.Qry,text:f,pos:c.posIndex}):h.ms_rc=[{rcFor:c.Qry,text:f,pos:c.posIndex}]}var i={tObject:c.tObj,sourceId:d.sourceId};e.val(a.stringify(i))},u=function(a,b){var c=this,e=c.id,f=c.inpElm,g=a.html(),h=r.call(c,g);h.length<d.maxlength?(f.val(h),d.trackUserInteraction&&t.call(c,h),d.returnFocus&&j(f[0],f.val().length),b&&M.call(c,f.val()),d.onSelect&&d.onSelect(e,k(g),f)):d.onSelect&&d.onSelect(e,"Warning: maximum length reached",f)},v=function(a){
// no Unit Test
var b=this,c=b.dropCont.find(a);return c=c.hasClass("category")?c.next():c},w=function(a){a&&a.find(".sAct").removeClass("sAct")},x=function(a,b){
// handled on arrow key up and down
var c=this,e=a;return a="prev"==b?a.prev().hasClass("category")?a.prev().prev().length?a.prev().prev():v.call(c," li:last-child"):a.prev().length?a.prev():v.call(c," li:last-child"):a.next().length?a.next().hasClass("category")?a.next().next():a.next():v.call(c," li:first-child"),c.curElm.find(".Sarw").hasClass("sAct")?a.find(".Sarw").addClass("sAct"):a.find(".Sbtn").addClass("sAct"),w(e),d.multiSearch||c.inpElm.val(k(a.find(".Sbtn").html())),a},y=function(b,c){
// handled on arrow key up and down
var e=this;return c=a("#"+b),c=c.hasClass("category")?c.next():c,c.find(".Sbtn").addClass("sAct"),d.multiSearch||e.inpElm.val(k(c.find(".Sbtn").html())),c},A=function(a,b){
//'Unit Test Done':
var c;c="object"==typeof a?a.displayTextEn:a;var e="",f="",g="",h="";c=c.replace(/&amp;/gi,"&"),b.split(",")[1]&&d.multiSearch&&(b=L(b)),b=b.replace(/[\s]+/g," ").replace(/^\s/,"").toLowerCase();var i=c,j=i.toLowerCase(),k=j.indexOf(b),l=j,m=b,n=!(l.indexOf(" "+m)<0)&&l.indexOf(" "+m),o=!(l.indexOf("("+m)<0)&&l.indexOf("("+m),p=!(l.indexOf("/"+m)<0)&&l.indexOf("/"+m);(k>=0&&(n||o||p)||0===k)&&(k&&(n?k=n+1:o?k=o+1:p&&(k=p+1)),f=i.substr(0,k),g=i.substr(k,b.length),h="<strong>"+i.substr(k+b.length,i.length)+"</strong>"),g=g?g:c;var q;q=b?f+g+h:g;var r=d.suggestOnClick?'<div class="wrapTable"><div tabindex="-1" class="Sbtn">'+f+g+h+'</div></div><span class="Sarw"></span>':'<div tabindex="-1" class="Sbtn" style="width:100%">'+q+"</div>";return e='<li class="sugTouple">'+r+"</li>"},B=function(a,b){var c={},d=0;for(var e in b)a[e]&&(c[e]=a[e],d++);return[c,d]},C=function(b,c,e){var f,g=this,h="";f="resultConcepts"==e?d.relatedConceptCategory:"autoComplete"==e?d.category:{onFocus:""};var i=B(c,f),j=i[1];c=i[0],b=b.replace(/&amp;/gi,"&");for(var k in c){var l="",m=0;for(var n in c[k])if(e||m++<d.maxSuggestions){
// show max number of suggestion specified in plugin call
var o=g.inpElm.val().replace(/\s,/g,",").replace(/,\s/g,",").toLowerCase();if(o.indexOf(",")!=-1&&a.inArray(c[k][n].displayTextEn.toLowerCase(),o.split(","))!=-1)continue;
// exclude the value which already in search box
l+=A.call(g,c[k][n],b)}l&&j>1?h+=d.grouping?'<li class="category '+k+'">'+(d.category[k]?d.category[k]:k)+"</li>"+l:l:l&&!e&&d.onFocusSuggest.title?h+='<li class="category '+k+'">'+d.onFocusSuggest.title+"</li>"+l:h=l}return a.isEmptyObject(c)||("resultCorrections"==e?h='<li class="category">'+d.relatedCorrectionText+"</li>"+h:"resultConcepts"==e&&(h='<li class="category">'+d.relatedConceptText+"</li>"+h)),h},D=function(){var a=_t.inpElm;d.placeholderTxt=a?a[0].getAttribute("placeholder"):"",a.val(d.placeholderTxt).css({color:"#8B8B8B"})},E=function(){_t.inpElm.val("").css({color:"#444"})},F=function(a){var b=this;I.call(b,b.queryChar,a.resultList,"autoComplete")},G=function(a){var b,c="";b=a?d.relatedConceptCategory:d.category;for(var e in b)c+=e+",";return c.replace(/,$/g,"")},H=function(a,b,c){var f=this,g="",h=d.appId?"&appId="+d.appId:"",i=d.sourceId?"&sourceId="+d.sourceId:"",j=new RegExp("[^a-zA-Z0-9,\\s"+d.whiteListSpecialChar+"]","g");if(f.Qry=b.replace(j,""),f.Qry){if(n()&&f.prefetchObj)var k=e.getItem(d.versionKey),g=k?"&version="+k.suggester_v:0;return a+"query="+encodeURIComponent(f.Qry)+h+"&category="+G(c)+"&limit="+d.maxSuggestions+i+g}return!1},I=function(a,b,c){var d=this;/**
                --> _t.curElm = undefined
               issue : handle tab case : type "ja" and scroll to any position(e.g. third or fourth) 
               and again type "a"(final keyword : jav), now press tab key, val of last selected index
                fill in input box, which should not be.
                Fix : blank the _t.curElm reference
             */
d.curElm=void 0;var e=C.call(d,L(a),b,c);e?(d.dropCont.find("ul").html(e),P.call(d)):O.call(d)},J=function(a){var b=this;if(d.multiSearch&&(a=L(a)),a){var c=H.call(b,d.url.autoComplete,a,!1);f.call(b,c,function(a){F.call(b,a)},"Error while fetching data",b.id)}},K=function(a,b,c){var d,e=0;if(a&&n()){(new Date).getMilliseconds();if(d=p.call(this,a,b))for(var f in c)d[f]&&(e=1)}return[e,d]},L=function(b){
//'Unit Test Done':    this function gets last character after comma
var c=a.trim(b).replace(/,*$/g,"").toLowerCase();return a.trim(c.substring(c.lastIndexOf(",")+1,c.length))},M=function(a){var b=this;z=L(a);var c=K.call(b,z,"rc",d.relatedConceptCategory);if(c[0])O.call(b),I.call(b,z,c[1],"resultConcepts"),b.relatedConceptMaxCounter++;else{O.call(b);var e=H.call(b,d.url.relatedConcept,z,!0);f.call(b,e,function(a){for(var c in a);I.call(b,z,a[c],c)},"Error while fetching data related concept and autocorrect data",b.id)}},N=function(){var b=this;return function(c){var e,f;a(this);a(c.target).hasClass("Sarw")?(e=a(c.target).parents("li"),flag=!0):(a(c.target).hasClass("Sbtn")||a(c.target).is("strong"))&&(e=a(c.target).closest("li"),flag=!d.suggestOnClick),f=e.find(".Sbtn"),(!d.showRelatedConcept||b.relatedConceptMaxCounter>=d.relatedConceptsLimit-1)&&(
// prevent RC after 'n' number of RC
flag=!1,O.call(b)),b.posIndex=s(e,b.dropCont),u.call(b,f,flag),d.suggestOnClick&&O.call(b)}},O=function(){var b=this,c=b.id;w(b.curElm),
// _t.dropCont.slideUp(100);
b.dropCont.removeClass("slideDown"),b.curElm="",a("#"+c).find(".sWrap").removeClass("sOpen").addClass("sHide")},P=function(){var b=this,c=b.id;d.width?b.wth=d.width:b.wth=a(document.getElementById(c)).outerWidth()+"px",b.dropCont.css({width:b.wth}).addClass("slideDown"),
//.slideDown('fast');
a("#"+c).find(".sWrap").removeClass("sHide").addClass("sOpen")},Q=function(){var b=this;b.dropCont.on("mouseover",".Sbtn,.Sarw,strong",function(c){a(this).hasClass("Sbtn")?a(this).addClass("sAct"):a(this).is("strong")?a(this).parent().addClass("sAct"):a(this).addClass("sAct"),w(b.curElm),b.curElm=a(this)}).mouseout(function(c){b.curElm=void 0,w(a(this))})},R=function(b){var c=b.target||b.srcElement;a(c).hasClass("inpWrap")&&a(this).find(".sugInp").focus()},T=function(a,b){var c=[],d={};for(var e in b)c.push({displayTextEn:b[e]});return d[a]=c,d},U=function(b){var c=this;val=a.trim(c.inpElm.val()),c.curOpenSugg=c.id,d.onFocusSuggest.visibility&&(a.trim(c.inpElm.val())||
// params.category = $.extend({}, params.category, {
//     'rs': ''
// });
//if (_t.rs_kWrdsStr) {
I.call(c,"",T("onFocus",d.onFocusSuggest.data))),d.multiSearch&&val&&val!=d.placeholderTxt?a.support.placeholder?c.inpElm.val(val.replace(/[,\s]*$/,", ")):setTimeout(function(){c.inpElm.val(val.replace(/[,\s]*$/,", "))},10):!a.support.placeholder&&d.placeholder&&d.placeholderTxt==val&&E.call(c)},V=function(){var a=this.val();return a.charCodeAt(a.length-1)},W=function(b,c){var e=this,f=(b.attr("id"),c.keyCode||c.which);0!=f&&229!=f||(
//for android chrome keycode fix
f=V.call(b));var g=e.inpElm,h=e.id,i=a.trim(g.val());if(e.queryChar=i,13==f&&"block"==e.dropCont.css("display"))if(e.curElm){e.posIndex=s(e.curElm,e.dropCont);var j;j=!(!d.showRelatedConcept||e.relatedConceptMaxCounter>=d.relatedConceptsLimit-1)&&(!d.suggestOnClick||!e.curElm.find(".Sbtn").hasClass("sAct")),u.call(e,e.curElm.find(".Sbtn"),j),j||O.call(e)}else O.call(e);else if(27==f)O.call(e);else if(i||8!=f&&46!=f)if(f>=48&&f<90||f>=97&&f<=122||16==f||188==f||8==f){if(c.ctrlKey&&86===f&&(
//to handle on paste case (ctrl+v)
i=i.replace(/,$/,""),g.val(i)),i)if("server"==d.source)if(188==f&&i.lastIndexOf(",")!=-1&&d.multiSearch)d.showRelatedConcept&&M.call(e,m(i));else{var k=d.multiSearch?l(i):i;if(k.length>d.startSearchAfter-1){var n=K.call(e,k,"ac",d.category);n[0]?I.call(e,i,n[1],"autoComplete"):J.call(e,i)}}else"local"==S.client[h]&&S.returnDataArray(h,i);a("#"+h).find(".sCross").show().click(function(){e.inpElm.val("").focus(),a(this).hide(),O.call(e),e.dropCont.find("ul").html("")})}else c.ctrlKey&&39==f||c.ctrlKey&&40==f?(e.curElm.find(".Sbtn").removeClass("sAct"),e.curElm.children(".Sarw").addClass("sAct")):c.ctrlKey&&37==f||c.ctrlKey&&38==f?(e.curElm.children(".Sarw").removeClass("sAct"),e.curElm.find(".Sbtn").addClass("sAct")):e.dropCont.find("li").length&&("none"==e.dropCont.css("display")&&40==f?P.call(e):38==f?(e.curElm?e.curElm=x.call(e,e.curElm,"prev"):e.curElm=y.call(e,h+" li:last-child",e.curElm),P.call(e)):40==f&&(e.curElm?e.curElm=x.call(e,e.curElm,"next"):e.curElm=y.call(e,h+" li:first-child",e.curElm)));else
// on backspace or delete btn
a("#"+h+" .sCross").hide(),O.call(e)},X=function(a){var b=this,c=a.which||a.keyCode;if(38==c)a.preventDefault();else if(13==c)
//Enter is prevent Default when an item in suggestor is under selection
"block"==b.dropCont.css("display")&&b.curElm&&a.preventDefault();else if(9==c){if(b.curElm){var d=b.curElm.html().replace(/(<([^>]+)>)/gi,"").replace(/&amp;/gi,"&");b.inpElm.val(r.call(b,d))}q.call(b),O.call(b)}},Y=function(b){var c=this;if(c.id=b.attr("id"),c.dataType="autoconcepts",c.tObj=[],c.relatedConceptMaxCounter=0,c.inpElm=b.find(".sugInp"),// $('#' + x + ' input.sugInp');
d.placeholderTxt=c.inpElm.attr("placeholder"),c.inpElm.attr({autocomplete:"off"}),d.maxlength=c.inpElm.attr("maxlength")||1e4,c.dropCont=a('<div class="sugCont '+d.scrollStyle+'" id="sugDrp_'+c.id+'">').append('<ul class="Sdrop"></ul>'),b.append(c.dropCont),d.trackUserInteraction){var e=c.inpElm.attr("name")?'name="'+c.inpElm.attr("name")+"_"+c.id+'"':"",f=a('<input id="hid_'+c.id+'" type="hidden" trackObj '+e+"/>");f.insertAfter(c.inpElm)}!d.placeholder||a.support.placeholder||a.trim(c.inpElm.val())||D.call(this),
//Bind events
c.inpElm.focus(function(){U.call(c)}).keyup(function(b){W.call(c,a(this),b)}).keydown(function(a){c.curOpenSugg||(
// to handle bug for: if suggestor not initialized and user already foucs on suggestor
c.curOpenSugg=c.id),X.call(c,a)}).blur(function(a){if(!c.insideBoundry){O.call(c);var b=c.inpElm.val();b&&c.inpElm.val(b.replace(/,\s*$/,""))}}),
// .blur(function() {
//     if (params.placeholder)
//      showPlaceHolder.call(_t);
//     setTimeout(function() {
//      hide.call(_t);
//     }, 60);
// });
b.on("mouseenter",function(){c.insideBoundry=!0}).on("mouseleave",function(){c.insideBoundry=!1}).find(".sWrap").click(R),Q.call(c),c.dropCont.on("click",".sugTouple",N.call(c)),
// isFirstCall : if multiple suggestor call in a page then version check only goes for once
!window.isFistCall&&d.url.prefetch&&n()&&d.isPrefetch&&(i.call(c),isFistCall=!0)},Z=function(a){this.node=a,Y.call(this,a),this.setTrackingObject=t},$=this.data("suggestor");return $||this.each(function(b,c){var d=a(c);$=new Z(d),d.data("suggestor",$)}),$}}(window.jQuery||window.Zepto),/**v7.1.0 : enhancement
 * add parameter returnFocus : this is for to disable focus on input field after selection.
 * add width 100% support
 */
/**
 * v7.0.1 :  showrelatedconcept param fix,
 * fix : after comma startSearchAfter support
 */
/**
 * v7.0.0 : Enhancements -->
 * a) Add support of RC(related concept) data in prefetch library, previous version only support AC("auto complete")
 *    data in prefech library.
 * b) Add support of bucketing/grouping in Related concept data.
 * c) Now prefetch data library will be update/replace based on TTL(Time to live) from local storage
 */
/*
 * v6.5.1: 
 * Bug fix : handle showrelated concept on/off by pressing comma also
 *         : Also handle tab case 
 */
/**
 * v6.5.0:
 * Enhancement: Enhance versioning control system: if multiple suggestor call trigger from the same page then
                versioning check goes only for first call.
 * Bug Fix: if user type only special character
             in suggestor and that's special character not specify in "whiteListSpecialChar" param,
             then a blanck query goes to server
 */
// v6.4.0: for whitelistingSpecialCharacter paramater : whitelisting only from query URL
// v6.4.0: add missing getRelatedConcepts parameter
// v6.3.0: add sourceId in tracking object
// formating, parameter rename, and optimize code
/*global module*/
/*
MIT LICENSE
Copyright (c) 2007 Monsur Hossain (http://monsur.hossai.in)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
// Avoid polluting the global namespace if we're using a module loader
function(){/**
	 * Creates a new Cache object.
	 * @param {number} maxSize The maximum size of the cache (or -1 for no max).
	 * @param {boolean} debug Whether to log events to the console.log.
	 * @constructor
	 */
function a(b,c,d){this.maxSize_=b||-1,this.debug_=c||!1,this.storage_=d||new a.BasicCacheStorage,this.fillFactor_=.75,this.stats_={},this.stats_.hits=0,this.stats_.misses=0,this.log_("Initialized cache with size "+b)}/**
	 * An easier way to refer to the priority of a cache item
	 * @enum {number}
	 */
a.Priority={LOW:1,NORMAL:2,HIGH:4},/**
	 * Basic in memory cache storage backend.
	 * @constructor
	 */
a.BasicCacheStorage=function(){this.items_={},this.count_=0},a.BasicCacheStorage.prototype.get=function(a){return this.items_[a]},a.BasicCacheStorage.prototype.set=function(a,b){"undefined"==typeof this.get(a)&&this.count_++,this.items_[a]=b},a.BasicCacheStorage.prototype.size=function(a,b){return this.count_},a.BasicCacheStorage.prototype.remove=function(a){var b=this.get(a);return"undefined"!=typeof b&&this.count_--,delete this.items_[a],b},a.BasicCacheStorage.prototype.keys=function(){var a,b=[];for(a in this.items_)b.push(a);return b},/**
	 * Local Storage based persistant cache storage backend.
	 * If a size of -1 is used, it will purge itself when localStorage
	 * is filled. This is 5MB on Chrome/Safari.
	 * WARNING: The amortized cost of this cache is very low, however,
	 * when a the cache fills up all of localStorage, and a purge is required, it can
	 * take a few seconds to fetch all the keys and values in storage.
	 * Since localStorage doesn't have namespacing, this means that even if this
	 * individual cache is small, it can take this time if there are lots of other
	 * other keys in localStorage.
	 *
	 * @param {string} namespace A string to namespace the items in localStorage. Defaults to 'default'.
	 * @constructor
	 */
a.LocalStorageCacheStorage=function(a){this.prefix_="cache-storage."+(a||"default")+".";
// Regexp String Escaping from http://simonwillison.net/2006/Jan/20/escape/#p-6
var b=this.prefix_.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");this.regexp_=new RegExp("^"+b)},a.LocalStorageCacheStorage.prototype.get=function(a){var b=window.localStorage[this.prefix_+a];return b?JSON.parse(b):null},a.LocalStorageCacheStorage.prototype.set=function(a,b){window.localStorage[this.prefix_+a]=JSON.stringify(b)},a.LocalStorageCacheStorage.prototype.size=function(a,b){return this.keys().length},a.LocalStorageCacheStorage.prototype.remove=function(a){var b=this.get(a);return delete window.localStorage[this.prefix_+a],b},a.LocalStorageCacheStorage.prototype.keys=function(){var a,b=[];for(a in window.localStorage)a.match(this.regexp_)&&b.push(a.replace(this.prefix_,""));return b},/**
	 * Retrieves an item from the cache.
	 * @param {string} key The key to retrieve.
	 * @return {Object} The item, or null if it doesn't exist.
	 */
a.prototype.getItem=function(a){
// retrieve the item from the cache
var b=this.storage_.get(a);null!=b&&(this.isExpired_(b)?(
// if the item is expired, remove it from the cache
this.removeItem(a),b=null):
// if the item is not expired
// update its last accessed date
b.lastAccessed=(new Date).getTime());
// return the item value (if it exists), or null
var c=b?b.value:null;return c?(this.stats_.hits++,this.log_("Cache HIT for key "+a)):(this.stats_.misses++,this.log_("Cache MISS for key "+a)),c},a._CacheItem=function(b,c,d){if(!b)throw new Error("key cannot be null or empty");this.key=b,this.value=c,d=d||{},d.expirationAbsolute&&(d.expirationAbsolute=d.expirationAbsolute.getTime()),d.priority||(d.priority=a.Priority.NORMAL),this.options=d,this.lastAccessed=(new Date).getTime()},/**
	 * Sets an item in the cache.
	 * @param {string} key The key to refer to the item.
	 * @param {Object} value The item to cache.
	 * @param {Object} options an optional object which controls various caching
	 *    options:
	 *      expirationAbsolute: the datetime when the item should expire
	 *      expirationSliding: an integer representing the seconds since
	 *                         the last cache access after which the item
	 *                         should expire
	 *      priority: How important it is to leave this item in the cache.
	 *                You can use the values Cache.Priority.LOW, .NORMAL, or
	 *                .HIGH, or you can just use an integer.  Note that
	 *                placing a priority on an item does not guarantee
	 *                it will remain in cache.  It can still be purged if
	 *                an expiration is hit, or if the cache is full.
	 *      callback: A function that gets called when the item is purged
	 *                from cache.  The key and value of the removed item
	 *                are passed as parameters to the callback function.
	 */
a.prototype.setItem=function(b,c,d){
// if the cache is full, purge it
if(
// add a new cache item to the cache
null!=this.storage_.get(b)&&this.removeItem(b),this.addItem_(new a._CacheItem(b,c,d)),this.log_("Setting key "+b),this.maxSize_>0&&this.size()>this.maxSize_){var e=this;setTimeout(function(){e.purge_.call(e)},0)}},/**
	 * Removes all items from the cache.
	 */
a.prototype.clear=function(){for(var a=this.storage_.keys(),b=0;b<a.length;b++)this.removeItem(a[b]);this.log_("Cache cleared")},/**
	 * @return {Object} The hits and misses on the cache.
	 */
a.prototype.getStats=function(){return this.stats_},/**
	 * @return {string} Returns an HTML string representation of the cache.
	 */
a.prototype.toHtmlString=function(){for(var a=this.size()+" item(s) in cache<br /><ul>",b=this.storage_.keys(),c=0;c<b.length;c++){var d=this.storage_.get(b[c]);a=a+"<li>"+d.key.toString()+" = "+d.value.toString()+"</li>"}return a+="</ul>"},/**
	 * Allows it to resize the Cache capacity if needed.
	 * @param   {integer} newMaxSize the new max amount of stored entries within the Cache
	 */
a.prototype.resize=function(a){this.log_("Resizing Cache from "+this.maxSize_+" to "+a);
// Set new size before purging so we know how many items to purge
var b=this.maxSize_;this.maxSize_=a,a>0&&(b<0||a<b)&&this.size()>a&&
// Cache needs to be purged as it does contain too much entries for the new size
this.purge_(),
// else if newMaxSize >= maxSize nothing to do
this.log_("Resizing done")},/**
	 * Removes expired items from the cache.
	 */
a.prototype.purge_=function(){var a=new Array,b=Math.round(this.maxSize_*this.fillFactor_);this.maxSize_<0&&(b=this.size()*this.fillFactor_);for(var c=this.storage_.keys(),d=0;d<c.length;d++){var e=c[d],f=this.storage_.get(e);this.isExpired_(f)?this.removeItem(e):a.push(f)}if(a.length>b)
// remove items from the end of the array
for(
// sort this array based on cache priority and the last accessed date
a=a.sort(function(a,b){return a.options.priority!=b.options.priority?b.options.priority-a.options.priority:b.lastAccessed-a.lastAccessed});a.length>b;){var g=a.pop();this.removeItem(g.key)}this.log_("Purged cached")},/**
	 * Add an item to the cache.
	 * @param {Object} item The cache item to add.
	 * @private
	 */
a.prototype.addItem_=function(a,b){try{this.storage_.set(a.key,a)}catch(c){if(b)throw this.log_("Failed setting again, giving up: "+c.toString()),c;this.log_("Error adding item, purging and trying again: "+c.toString()),this.purge_(),this.addItem_(a,!0)}},/**
	 * Remove an item from the cache, call the callback function (if it exists).
	 * @param {String} key The key of the item to remove
	 */
a.prototype.removeItem=function(a){var b=this.storage_.remove(a);
// if there is a callback function, call it at the end of execution
return this.log_("removed key "+a),b&&b.options&&b.options.callback&&setTimeout(function(){b.options.callback.call(null,b.key,b.value)},0),b?b.value:null},/**
	 * Scan through each item in the cache and remove that item if it passes the
	 * supplied test.
	 * @param {Function} test   A test to determine if the given item should be removed.
	 *                          The item will be removed if test(key, value) returns true.
	 */
a.prototype.removeWhere=function(a){for(var b=this.storage_.keys(),c=0;c<b.length;c++){var d=b[c],e=this.storage_.get(d);a(d,e.value)===!0&&this.removeItem(d)}},a.prototype.size=function(){return this.storage_.size()},/**
	 * @param {Object} item A cache item.
	 * @return {boolean} True if the item is expired
	 * @private
	 */
a.prototype.isExpired_=function(a){var b=(new Date).getTime(),c=!1;if(a.options.expirationAbsolute&&a.options.expirationAbsolute<b&&(
// if the absolute expiration has passed, expire the item
c=!0),!c&&a.options.expirationSliding){
// if the sliding expiration has passed, expire the item
var d=a.lastAccessed+1e3*a.options.expirationSliding;d<b&&(c=!0)}return c},/**
	 * Logs a message to the console.log if debug is set to true.
	 * @param {string} msg The message to log.
	 * @private
	 */
a.prototype.log_=function(a){this.debug_};
// Establish the root object, `window` in the browser, or `global` on the server.
var b=this;"undefined"!=typeof module&&module.exports?module.exports=a:"function"==typeof define&&define.amd?define("ncCache",function(){return a}):b.Cache=a}(),/*!
 * Naukri.com Cache Library
 * http://www.naukri.com/
 *
 * Author: Rahul Batra (rahul.batra@naukri.com, rahul.batra@gmail.com)
 * Copyright 2014 Naukri.com
 */
// jQuery.extend({
//   stringify: function stringify(obj) {
//     var t = typeof (obj);
//     if (t != "object" || obj === null) {
//       if (t == "string") obj = '"' + obj + '"';
//       return String(obj);
//     } else {
//       var n, v, json = [], arr = (obj && obj.constructor == Array);
//       for (n in obj) {
//         v = obj[n];
//         t = typeof(v);
//         if (obj.hasOwnProperty(n)) {
//           if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
//           json.push((arr ? "" : '"' + n + '":') + String(v));
//         }
//       }
//       return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
//     }
//   }
// });
Cache.UserDataCacheStorage=function(a){var a=a,b=document.createElement("div");b.style.display="none",document.getElementsByTagName("head")[0].appendChild(b),b.addBehavior("#default#userdata"),this.get=function(c){b.load(a);var d=b.getAttribute(c);return d?$.parseJSON(d):null},this.set=function(c,d){b.load(a),b.setAttribute(c,$.stringify(d)),b.save(a)},this.size=function(a,c){return b.XMLDocument.documentElement.attributes.length},this.remove=function(c){b.load(a),b.removeAttribute(c),b.save(a)},this.keys=function(){b.load(a);for(var c,d=-1,e=[];c=b.XMLDocument.documentElement.attributes[++d];)e.push(c.name);return e}},/*!
 * Naukri.com Cache Library
 * http://www.naukri.com/
 *
 * Author: Rahul Batra (rahul.batra@naukri.com, rahul.batra@gmail.com)
 * Copyright 2014 Naukri.com
 */
ncCacheFactory=function(){},ncCacheFactory.getCache=function(a,b){if("undefined"==typeof a||parseInt(a)<=0)throw new"Invalid app id: "+a;b=b||"localStorage";var c=window.navigator.userAgent.match(/MSIE 7/),d=null;if("localStorage"==b&&(c?d=new Cache.UserDataCacheStorage(String(a)):"undefined"!=typeof window.localStorage&&(d=new Cache.LocalStorageCacheStorage(String(a)))),null==d)throw"Unsupported storage type: "+b;return new Cache((-1),(!1),d)};