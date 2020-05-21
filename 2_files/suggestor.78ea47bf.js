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
var ieObj={scrollHandler:function(a,b,c,d){if(d.length){var e,f=b.height(),g=b.scrollTop(),h=f+g,i=d.position().top+b.scrollTop(),j=i+d.outerHeight();return j>=h?(e=j-f>0?j-f:0,b.scrollTop(e)):i<b.scrollTop()&&(e=i,b.scrollTop(e)),e}}};$.support.placeholder=function(){var a=document.createElement("input");return"placeholder"in a}(jQuery),/*** JSONP*****/
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
var f=d.hdElm.val().toLowerCase().split(",");index=$.inArray(e.replace("|xudrscrx|","_"),f),index!=-1?f.splice(index,1):"",e=f,d.retainText&&(d.sugElm?d.sugElm.val(e):""),d.hdElm.val(e),setTimeout(function(){a.remove()},100)},d=function(a,b){var c=a.keyCode||a.which,d=this.parent(),e=d.prev().children(".dCross"),f=d.next().children(".dCross");37==c?e.length?e[0].focus():"":39==c?f.length?f[0].focus():"":38==c?b.find(".tagit").first().children(".dCross")[0].focus():40==c&&b.find(".tagit").last().children(".dCross")[0].focus()};return{setValue:b,remValue:c,keyHandling:d,bindEvent_cross:a}}();var smToggle=function(a){var b=this;b.obj=a.ids,b.contid=a.contid,b.showit=a.showit||!1,b.showcl=a.showcl||"",b.hidecl=a.hidecl||"",b.init=function(){for(var a=0;a<b.obj.length;a++){var c=$(b.obj[a]);c&&("input"!=c[0].tagName.toLowerCase()&&(1==b.showit?c.addClass(b.hidecl):c.addClass(b.showcl)),c.bind("click",function(){b.toggleit($(this))}),"input"!=c[0].tagName.toLowerCase()&&b.toggleit(c))}},b.toggleit=function(a){var c=a?a:$(this),d=c[0].tagName.toLowerCase(),e=""!=c.attr("rel")?c.attr("rel"):c.attr("id")+"_toggle";"input"===d&&"text"!=c.attr("type")?c.checked?$("#"+e).show():$("#"+e).hide():c.hasClass(b.hidecl)==b.hidecl?($("#"+e).show(),c.removeClass(b.hidecl),c.addClass(b.showcl)):($("#"+e).hide(),c.removeClass(b.showcl),c.addClass(b.hidecl))},b.init()};
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
g.anchorNode.parentNode.href="#",g.anchorNode.parentNode.setAttribute("onclick","window.open('"+c+"');return false;")):
//Chrome Fix
/chrome/.test(j)||/safari/.test(j)||/yandex/.test(j)?(
//selection.anchorNode.parentElement.target = '_blank';
g.anchorNode.parentElement.href="#",g.anchorNode.parentElement.setAttribute("onclick","window.open('"+c+"');return false;")):
//Mozilla Fix
/mozilla/.test(j)&&(
//selection.anchorNode.target = '_blank';
g.anchorNode.href="#",g.anchorNode.setAttribute("onclick","window.open('"+c+"');return false;"))}}else document.selection&&document.selection.createRange&&"None"!=document.selection.type&&(d=document.selection.createRange(),d.execCommand(a,!1,c));
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
"style"==d?e(a(h),f):e(a(h),!1))}else if(document.selection&&document.selection.createRange&&"None"!=document.selection.type){var k=document.selection.createRange(),l=k.htmlText,m="<"+c+" "+d+'="'+f+'">'+l+"</"+c+">";document.selection.createRange().pasteHTML(m)}}
// the function of replacement styles to the around tags (parent and child)
function e(a,b){var c=ba();
// (for replacement with execCommand) affect to child tags with parent tag's styles
if(// the selected node
c=c?c:a,c&&0==b)
// apply to the selected node with parent tag's styles
c.parent().is("[style]")&&c.attr("style",c.parent().attr("style")),
// apply to child tags with parent tag's styles
c.is("[style]")&&c.find("*").attr("style",c.attr("style"));else if(a&&b&&a.is("[style]")){var d=b.split(";");// split the styles
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
b.attr(O,"")):d("a",O,"")}else K.val(c).focus();
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
"2"!=M.data("linktype")?c("createlink",K.val()):(c("insertImage",K.val()),// insert image url of link-input to the selected node
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
"fSize"==b?styleField=_:"colors"==b&&(styleField=aa),
// display the style-field
q(styleField,!0),
// the event of click to style button
styleField.find("a").unbind("click").click(function(){var c=a(this).attr(i.css+"-styleval");// the property of style value to be added
// if selected to changing the font-size value
"fSize"==b?(styleType="font-size",c+=i.funit):"colors"==b&&(styleType="color",c="rgb("+c+")");var e=s(styleType);// affect styles to child tags (and extract to the new style attributes)
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
for(var V=0;V<i.formats.length;V++)F.find("."+i.css+"_formats").append("<a "+i.css+'-formatval="'+i.formats[V][0]+'" class="'+i.css+"_format "+i.css+"_format_"+V+'" role="menuitem" unselectable>'+i.formats[V][1]+"</a>");F.find("."+i.css+"_formats").data("status",!1)}else if("fsize"==k[R].name&&a.isArray(i.fsizes)){F.find("."+i.css+"_tool_"+k[R].cls).append('<div class="'+i.css+'_fontsizes" unselectable></div>');
// add font-sizes to font-size-selector
for(var V=0;V<i.fsizes.length;V++)F.find("."+i.css+"_fontsizes").append("<a "+i.css+'-styleval="'+i.fsizes[V]+'" class="'+i.css+'_fontsize" style="font-size:'+i.fsizes[V]+i.funit+'" role="menuitem" unselectable>Abcdefgh...</a>')}else if("color"==k[R].name&&a.isArray(g)){F.find("."+i.css+"_tool_"+k[R].cls).append('<div class="'+i.css+'_cpalette" unselectable></div>');
// create color palette to color-selector field
for(var W=0;W<g.length;W++)null!=g[W]?F.find("."+i.css+"_cpalette").append("<a "+i.css+'-styleval="'+g[W]+'" class="'+i.css+'_color" style="background-color: rgb('+g[W]+')" role="gridcell" unselectable></a>'):F.find("."+i.css+"_cpalette").append('<div class="'+i.css+'_colorSeperator"></div>')}}
// the default value of the link-type
M.data("linktype","0");
// add link types to link-type-selector
for(var R=0;R<3;R++)M.append("<a "+i.css+'-linktype="'+R+'" unselectable>'+i.linktypes[R]+"</a>"),N.html('<div class="'+i.css+'_linktypearrow" unselectable></div><div class="'+i.css+'_linktypetext">'+M.find("a:eq("+M.data("linktype")+")").text()+"</div>");
// add the prefix of css according to browser
var X="";
// the feature of placeholder
if(// ie
X=/msie/.test(j)?"-ms-":/chrome/.test(j)||/safari/.test(j)||/yandex/.test(j)?"-webkit-":/mozilla/.test(j)?"-moz-":/opera/.test(j)?"-o-":/konqueror/.test(j)?"-khtml-":"",i.placeholder&&""!=i.placeholder){E.prepend('<div class="'+i.css+'_placeholder" unselectable><div class="'+i.css+'_placeholder_text">'+i.placeholder+"</div></div>");var Y=E.find("."+i.css+"_placeholder");Y.click(function(){H.focus()})}
// make unselectable to unselectable attribute ones
E.find("[unselectable]").css(X+"user-select","none").addClass("unselectable").attr("unselectable","on").on("selectstart mousedown",!1);
// each button of the toolbar
var Z=F.find("."+i.css+"_tool"),$=F.find("."+i.css+"_formats"),_=F.find("."+i.css+"_fontsizes"),aa=F.find("."+i.css+"_cpalette"),ba=function(){var b,c;if(window.getSelection&&(c=getSelection(),b=c.anchorNode),!b&&document.selection&&document.selection.createRange&&"None"!=document.selection.type){c=document.selection;var d=c.getRangeAt?c.getRangeAt(0):c.createRange();b=d.commonAncestorContainer?d.commonAncestorContainer:d.parentElement?d.parentElement():d.item(0)}return!!b&&a("#text"==b.nodeName?b.parentNode:b)};
// the event of click to the toolbar buttons
Z.unbind("click").click(function(b){
// if source button is clicked
"displaysource"!=a(this).data("command")||F.data("sourceOpened")?(
// if source field is closed
F.data("sourceOpened")?(
// update to data of source hiding
F.data("sourceOpened",!1),
// display all the toolbar buttons
F.find("."+i.css+"_tool").removeClass(i.css+"_hiddenField"),P.addClass(i.css+"_hiddenField"),H.removeClass(i.css+"_hiddenField")):
// if insert-link-button is clicked
"linkcreator"==a(this).data("command")?F.data("linkOpened")?(
// hide the link-form-field
m(!1),
// hide format field
u(!1)):h():"formats"==a(this).data("command")?("formats"!=a(this).data("command")||a(b.target).hasClass(i.css+"_format")||t(),
// hide all style-fields
q("",!1),H.not(":focus")&&H.focus()):"fSize"==a(this).data("command")||"colors"==a(this).data("command")?(("fSize"==a(this).data("command")&&!a(b.target).hasClass(i.css+"_fontsize")||// the font-size button
"colors"==a(this).data("command")&&!a(b.target).hasClass(i.css+"_color"))&&p(a(this).data("command")),
// hide format field
u(!1),H.not(":focus")&&H.focus()):(
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
grouping:!0,isPrefetch:!0,source:"server",versionKey:"__infoEdge/versions",onSelect:function(){},scrollStyle:"",returnFocus:!0,relatedConceptCategory:{// for RC category
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
(a.prefetchObj.keywords&&c.keyword_based_data===!1||+new Date(c.ttl)-+new Date<0)&&f.call(a,a.prefetchObj.url+"&segments="+c.segments,function(b){o(a.prefetchObj.key,h(c,b))},"Error!!!");else{isDataExist=e.getItem(d.prefetchData.key);var g=isDataExist?isDataExist.segments:"";f.call(a,a.prefetchObj.url+"&segments="+g,function(b){o(a.prefetchObj.key,b)},"Error!!!")}},"Error while prefetch data")},j=function(a,b){// need to rewrite this function
var c=b,d=b;if(a.setSelectionRange)a.focus(),a.setSelectionRange(c,d);else if(a.createTextRange){var e=a.createTextRange();e.collapse(!0),e.moveEnd("character",d),e.moveStart("character",c),e.select()}},k=function(a){//'Unit Test Done':
return a.replace(/(<([^>]+)>)/gi,"").replace(/&amp;/gi,"&")},l=function(b){return b=a.trim(b).toLowerCase(),b=a.trim(b.substring(b.lastIndexOf(",")+1,b.length))},m=function(b){var c=a.trim(b).replace(/,*$/g,"");return a.trim(c.substring(c.lastIndexOf(",")+1,c.length)).toLowerCase()},n=function(){return"undefined"!=typeof Storage},o=function(a,b){e.setItem(a,b)},p=function(a,b){if(this.prefetchObj){var c=e.getItem(this.prefetchObj.key);return c&&c[b][a]||(c=e.getItem(d.prefetchData.key)),!!c&&c[b][a]}return!1},q=function(){var a=this,b=a.inpElm.val();b&&a.inpElm.val(b.replace(/,\s*$/,""))},r=function(b){//'Unit Test Done':     
var c=this,e=c.inpElm.val(),f=e.substring(0,e.lastIndexOf(",")+1);return f=f?f+" ":"",b=a.trim(k(b).replace(/,*$/g,"")),d.multiSearch?f+b+", ":b},s=function(b,c){return a.inArray(b[0],c.find("li.sugTouple"))+1},t=function(b){var c=this,e=c.inpElm.next("[trackobj]"),f=l(b.replace(/[,\s]*$/,""));if("autoconcepts"==c.dataType){var g={};g[l(c.queryChar)]={text:f,pos:c.posIndex},c.tObj.push(g)}else if("relatedConcept"==c.dataType){var h=c.tObj[c.tObj.length-1];a.isArray(h.ms_rc)?h.ms_rc.push({rcFor:c.Qry,text:f,pos:c.posIndex}):h.ms_rc=[{rcFor:c.Qry,text:f,pos:c.posIndex}]}var i={tObject:c.tObj,sourceId:d.sourceId};e.val(a.stringify(i))},u=function(a,b){var c=this,e=c.id,f=c.inpElm,g=a.html(),h=r.call(c,g);h.length<d.maxlength?(f.val(h),d.trackUserInteraction&&t.call(c,h),d.returnFocus&&j(f[0],f.val().length),b&&M.call(c,f.val()),d.onSelect&&d.onSelect(e,k(g),f)):d.onSelect&&d.onSelect(e,"Warning: maximum length reached",f)},v=function(a){// no Unit Test
var b=this,c=b.dropCont.find(a);return c=c.hasClass("category")?c.next():c},w=function(a){a&&a.find(".sAct").removeClass("sAct")},x=function(a,b){// handled on arrow key up and down
var c=this,e=a;return a="prev"==b?a.prev().hasClass("category")?a.prev().prev().length?a.prev().prev():v.call(c," li:last-child"):a.prev().length?a.prev():v.call(c," li:last-child"):a.next().length?a.next().hasClass("category")?a.next().next():a.next():v.call(c," li:first-child"),c.curElm.find(".Sarw").hasClass("sAct")?a.find(".Sarw").addClass("sAct"):a.find(".Sbtn").addClass("sAct"),w(e),d.multiSearch||c.inpElm.val(k(a.find(".Sbtn").html())),a},y=function(b,c){// handled on arrow key up and down
var e=this;return c=a("#"+b),c=c.hasClass("category")?c.next():c,c.find(".Sbtn").addClass("sAct"),d.multiSearch||e.inpElm.val(k(c.find(".Sbtn").html())),c},A=function(a,b){//'Unit Test Done':   
var c;c="object"==typeof a?a.displayTextEn:a;var e="",f="",g="",h="";c=c.replace(/&amp;/gi,"&"),b.split(",")[1]&&d.multiSearch&&(b=L(b)),b=b.replace(/[\s]+/g," ").replace(/^\s/,"").toLowerCase();var i=c,j=i.toLowerCase(),k=j.indexOf(b),l=j,m=b,n=!(l.indexOf(" "+m)<0)&&l.indexOf(" "+m),o=!(l.indexOf("("+m)<0)&&l.indexOf("("+m),p=!(l.indexOf("/"+m)<0)&&l.indexOf("/"+m);(k>=0&&(n||o||p)||0===k)&&(k&&(n?k=n+1:o?k=o+1:p&&(k=p+1)),f=i.substr(0,k),g=i.substr(k,b.length),h="<strong>"+i.substr(k+b.length,i.length)+"</strong>"),g=g?g:c;var q;q=b?f+g+h:g;var r=d.suggestOnClick?'<div class="wrapTable"><div tabindex="-1" class="Sbtn">'+f+g+h+'</div></div><span class="Sarw"></span>':'<div tabindex="-1" class="Sbtn" style="width:100%">'+q+"</div>";return e='<li class="sugTouple">'+r+"</li>"},B=function(a,b){var c={},d=0;for(var e in b)a[e]&&(c[e]=a[e],d++);return[c,d]},C=function(b,c,e){var f,g=this,h="";f="resultConcepts"==e?d.relatedConceptCategory:"autoComplete"==e?d.category:{onFocus:""};var i=B(c,f),j=i[1];c=i[0],b=b.replace(/&amp;/gi,"&");for(var k in c){var l="",m=0;for(var n in c[k])if(e||m++<d.maxSuggestions){// show max number of suggestion specified in plugin call
var o=g.inpElm.val().replace(/\s,/g,",").replace(/,\s/g,",").toLowerCase();if(o.indexOf(",")!=-1&&a.inArray(c[k][n].displayTextEn.toLowerCase(),o.split(","))!=-1)continue;// exclude the value which already in search box
l+=A.call(g,c[k][n],b)}l&&j>1?h+=d.grouping?'<li class="category '+k+'">'+(d.category[k]?d.category[k]:k)+"</li>"+l:l:l&&!e&&d.onFocusSuggest.title?h+='<li class="category '+k+'">'+d.onFocusSuggest.title+"</li>"+l:h=l}return a.isEmptyObject(c)||("resultCorrections"==e?h='<li class="category">'+d.relatedCorrectionText+"</li>"+h:"resultConcepts"==e&&(h='<li class="category">'+d.relatedConceptText+"</li>"+h)),h},D=function(){var a=_t.inpElm;d.placeholderTxt=a?a[0].getAttribute("placeholder"):"",a.val(d.placeholderTxt).css({color:"#8B8B8B"})},E=function(){_t.inpElm.val("").css({color:"#444"})},F=function(a){var b=this;I.call(b,b.queryChar,a.resultList,"autoComplete")},G=function(a){var b,c="";b=a?d.relatedConceptCategory:d.category;for(var e in b)c+=e+",";return c.replace(/,$/g,"")},H=function(a,b,c){var f=this,g="",h=d.appId?"&appId="+d.appId:"",i=d.sourceId?"&sourceId="+d.sourceId:"",j=new RegExp("[^a-zA-Z0-9,\\s"+d.whiteListSpecialChar+"]","g");if(f.Qry=b.replace(j,""),f.Qry){if(n()&&f.prefetchObj)var k=e.getItem(d.versionKey),g=k?"&version="+k.suggester_v:0;return a+"query="+encodeURIComponent(f.Qry)+h+"&category="+G(c)+"&limit="+d.maxSuggestions+i+g}return!1},I=function(a,b,c){var d=this;/**
                --> _t.curElm = undefined
               issue : handle tab case : type "ja" and scroll to any position(e.g. third or fourth) 
               and again type "a"(final keyword : jav), now press tab key, val of last selected index
                fill in input box, which should not be.
                Fix : blank the _t.curElm reference
             */
d.curElm=void 0;var e=C.call(d,L(a),b,c);e?(d.dropCont.find("ul").html(e),P.call(d)):O.call(d)},J=function(a){var b=this;if(d.multiSearch&&(a=L(a)),a){var c=H.call(b,d.url.autoComplete,a,!1);f.call(b,c,function(a){F.call(b,a)},"Error while fetching data",b.id)}},K=function(a,b,c){var d,e=0;if(a&&n()){(new Date).getMilliseconds();if(d=p.call(this,a,b))for(var f in c)d[f]&&(e=1)}return[e,d]},L=function(b){//'Unit Test Done':    this function gets last character after comma
var c=a.trim(b).replace(/,*$/g,"").toLowerCase();return a.trim(c.substring(c.lastIndexOf(",")+1,c.length))},M=function(a){var b=this;z=L(a);var c=K.call(b,z,"rc",d.relatedConceptCategory);if(c[0])O.call(b),I.call(b,z,c[1],"resultConcepts"),b.relatedConceptMaxCounter++;else{O.call(b);var e=H.call(b,d.url.relatedConcept,z,!0);f.call(b,e,function(a){for(var c in a);I.call(b,z,a[c],c)},"Error while fetching data related concept and autocorrect data",b.id)}},N=function(){var b=this;return function(c){var e,f;a(this);a(c.target).hasClass("Sarw")?(e=a(c.target).parents("li"),flag=!0):(a(c.target).hasClass("Sbtn")||a(c.target).is("strong"))&&(e=a(c.target).closest("li"),flag=!d.suggestOnClick),f=e.find(".Sbtn"),(!d.showRelatedConcept||b.relatedConceptMaxCounter>=d.relatedConceptsLimit-1)&&(// prevent RC after 'n' number of RC
flag=!1,O.call(b)),b.posIndex=s(e,b.dropCont),u.call(b,f,flag),d.suggestOnClick&&O.call(b)}},O=function(){var b=this,c=b.id;w(b.curElm),
// _t.dropCont.slideUp(100);
b.dropCont.removeClass("slideDown"),b.curElm="",a("#"+c).find(".sWrap").removeClass("sOpen").addClass("sHide")},P=function(){var b=this,c=b.id;d.width?b.wth=d.width:b.wth=a(document.getElementById(c)).outerWidth()+"px",b.dropCont.css({width:b.wth}).addClass("slideDown"),
//.slideDown('fast');
a("#"+c).find(".sWrap").removeClass("sHide").addClass("sOpen")},Q=function(){var b=this;b.dropCont.on("mouseover",".Sbtn,.Sarw,strong",function(c){a(this).hasClass("Sbtn")?a(this).addClass("sAct"):a(this).is("strong")?a(this).parent().addClass("sAct"):a(this).addClass("sAct"),w(b.curElm),b.curElm=a(this)}).mouseout(function(c){b.curElm=void 0,w(a(this))})},R=function(b){var c=b.target||b.srcElement;a(c).hasClass("inpWrap")&&a(this).find(".sugInp").focus()},T=function(a,b){var c=[],d={};for(var e in b)c.push({displayTextEn:b[e]});return d[a]=c,d},U=function(b){var c=this;val=a.trim(c.inpElm.val()),c.curOpenSugg=c.id,d.onFocusSuggest.visibility&&(a.trim(c.inpElm.val())||
// params.category = $.extend({}, params.category, {
//     'rs': ''
// });
//if (_t.rs_kWrdsStr) {
I.call(c,"",T("onFocus",d.onFocusSuggest.data))),d.multiSearch&&val&&val!=d.placeholderTxt?a.support.placeholder?c.inpElm.val(val.replace(/[,\s]*$/,", ")):setTimeout(function(){c.inpElm.val(val.replace(/[,\s]*$/,", "))},10):!a.support.placeholder&&d.placeholder&&d.placeholderTxt==val&&E.call(c)},V=function(){var a=this.val();return a.charCodeAt(a.length-1)},W=function(b,c){var e=this,f=(b.attr("id"),c.keyCode||c.which);0!=f&&229!=f||(//for android chrome keycode fix
f=V.call(b));var g=e.inpElm,h=e.id,i=a.trim(g.val());if(e.queryChar=i,13==f&&"block"==e.dropCont.css("display"))if(e.curElm){e.posIndex=s(e.curElm,e.dropCont);var j;j=!(!d.showRelatedConcept||e.relatedConceptMaxCounter>=d.relatedConceptsLimit-1)&&(!d.suggestOnClick||!e.curElm.find(".Sbtn").hasClass("sAct")),u.call(e,e.curElm.find(".Sbtn"),j),j||O.call(e)}else O.call(e);else if(27==f)O.call(e);else if(i||8!=f&&46!=f)if(f>=48&&f<90||f>=97&&f<=122||16==f||188==f||8==f){if(c.ctrlKey&&86===f&&(//to handle on paste case (ctrl+v)
i=i.replace(/,$/,""),g.val(i)),i)if("server"==d.source)if(188==f&&i.lastIndexOf(",")!=-1&&d.multiSearch)d.showRelatedConcept&&M.call(e,m(i));else{var k=d.multiSearch?l(i):i;if(k.length>d.startSearchAfter-1){var n=K.call(e,k,"ac",d.category);n[0]?I.call(e,i,n[1],"autoComplete"):J.call(e,i)}}else"local"==S.client[h]&&S.returnDataArray(h,i);a("#"+h).find(".sCross").show().click(function(){e.inpElm.val("").focus(),a(this).hide(),O.call(e),e.dropCont.find("ul").html("")})}else c.ctrlKey&&39==f||c.ctrlKey&&40==f?(e.curElm.find(".Sbtn").removeClass("sAct"),e.curElm.children(".Sarw").addClass("sAct")):c.ctrlKey&&37==f||c.ctrlKey&&38==f?(e.curElm.children(".Sarw").removeClass("sAct"),e.curElm.find(".Sbtn").addClass("sAct")):e.dropCont.find("li").length&&("none"==e.dropCont.css("display")&&40==f?P.call(e):38==f?(e.curElm?e.curElm=x.call(e,e.curElm,"prev"):e.curElm=y.call(e,h+" li:last-child",e.curElm),P.call(e)):40==f&&(e.curElm?e.curElm=x.call(e,e.curElm,"next"):e.curElm=y.call(e,h+" li:first-child",e.curElm)));else// on backspace or delete btn
a("#"+h+" .sCross").hide(),O.call(e)},X=function(a){var b=this,c=a.which||a.keyCode;if(38==c)a.preventDefault();else if(13==c)
//Enter is prevent Default when an item in suggestor is under selection
"block"==b.dropCont.css("display")&&b.curElm&&a.preventDefault();else if(9==c){if(b.curElm){var d=b.curElm.html().replace(/(<([^>]+)>)/gi,"").replace(/&amp;/gi,"&");b.inpElm.val(r.call(b,d))}q.call(b),O.call(b)}},Y=function(b){var c=this;if(c.id=b.attr("id"),c.dataType="autoconcepts",c.tObj=[],c.relatedConceptMaxCounter=0,c.inpElm=b.find(".sugInp"),// $('#' + x + ' input.sugInp');
d.placeholderTxt=c.inpElm.attr("placeholder"),c.inpElm.attr({autocomplete:"off"}),d.maxlength=c.inpElm.attr("maxlength")||1e4,c.dropCont=a('<div class="sugCont '+d.scrollStyle+'" id="sugDrp_'+c.id+'">').append('<ul class="Sdrop"></ul>'),b.append(c.dropCont),d.trackUserInteraction){var e=c.inpElm.attr("name")?'name="'+c.inpElm.attr("name")+"_"+c.id+'"':"",f=a('<input id="hid_'+c.id+'" type="hidden" trackObj '+e+"/>");f.insertAfter(c.inpElm)}!d.placeholder||a.support.placeholder||a.trim(c.inpElm.val())||D.call(this),
//Bind events
c.inpElm.focus(function(){U.call(c)}).keyup(function(b){W.call(c,a(this),b)}).keydown(function(a){c.curOpenSugg||(// to handle bug for: if suggestor not initialized and user already foucs on suggestor
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
var b=this;"undefined"!=typeof module&&module.exports?module.exports=a:"function"==typeof define&&define.amd?define(function(){return a}):b.Cache=a}(),/*!
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