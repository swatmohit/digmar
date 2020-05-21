function uEscp(a){// decode key
return unescape(a.replace(/AxMpS/gi,"&").replace(/dot/gi,".").replace(/SxP/gi," ").replace(/opBrcX/gi,"(").replace(/clBrcX/gi,")").replace(/xSlashX/gi,"/")).replace(/HxF/gi,"-")}function assignValuestoHidden(a,b,c){if("undefined"==typeof c&&(c=""),$n("#"+c+"tempName").length>0&&$n("#"+c+"tempName").val($n("#"+c+"templateName").val()),$n("#"+c+"shareWith").length&&$n("#"+c+"shareWith").val($n("#"+c+"shared2").val()),$n("#templateType").length&&"f"==$n("#templateType").val()&&($editor.viewSrc(),$n("#templateBody").val($editor.cInput.val())),$n("#"+c+"selFields").length){elems=document.getElementById(c+"selFields").children;var d="";if(elems.length>0)for(d+=uEscp(elems[0].id.substring(0,elems[0].id.length-2)),i=1;i<elems.length;i++)d+="--"+uEscp(elems[i].id.substring(0,elems[i].id.length-2).replace(/undrxxscr/gi,"_"));d=d.replace(/tg_/gi,""),a?$n("#"+a+" #"+c+"fields").val(d):$n("#"+c+"fields").val(d)}}function assignValuestoHiddenForPreview(a,b){if("undefined"==typeof b&&(b=""),$n("#"+b+"tempName").length&&$n("#"+b+"tempName").val($n("#"+b+"templateName").val()),$n("#"+b+"selFields").length){elems=document.getElementById(b+"selFields").children;var c="";if(elems.length>0)for(c+=uEscp(elems[0].id.substring(0,elems[0].id.length-2)),i=1;i<elems.length;i++)c+="--"+uEscp(elems[i].id.substring(0,elems[i].id.length-2).replace(/undrxxscr/gi,"_"));c=c.replace(/tg_/gi,""),$n("#"+b+"fields").val(c)}}function saveTemplate(){var tempSubject="",tempBody="";"f"==$n("#templateType").val()&&(tempSubject=$n("#downloadTemplateSubject").val(),tempBody=$n("#templateBody").val()),"undefined"!=typeof makeAjax?(assignValuestoHidden("",makeAjax),assignValuestoHiddenForPreview(makeAjax)):(assignValuestoHidden("",""),assignValuestoHiddenForPreview()),$n(this).ajaxReq({type:"post",async:"true",datatype:"text",url:saveTemp,data:"templateName="+encodeURIComponent(trim($n("#tempName").val().replace(/\s{2,}/g," ")))+"&id="+$n("#templateId").val()+"&sharedWith="+$n("#shareWith").val()+"&type="+$n("#templateType").val()+"&fieldOrder="+$n("#fields").val()+"&clientId="+$n("#clientId").val()+"&addedBy="+$n("#currentUserId").val()+"&templateType="+$n("#templateType").val()+"&fromListing="+$n("#fromListingPage").val()+"&templateSubject="+tempSubject+"&templateBody="+tempBody,success:function(resp){var respArr=JSON.parse(resp);if(respArr.error&&0!=respArr.error){errorList=respArr.errorList;for(i in errorList)"name"==i&&($n("#templateName_err").show(),$n("#templateName_err").html(errorList[i]),$n("#templateName_err").addClass("msg_errf"))}else{if(
//Hide the existing error messages from name field 
$n("#templateName_err")&&($n("#templateName_err").hide(),$n("#templateName_err").html(""),$n("#templateName_err").removeClass("msg_errf")),1==respArr.fromListing)$n("#templateTuples").html(respArr.template),attachAllEvents();else{
// this is the case when template is created from page other than listing pages
// this will be handled seperately
var tplChooser=$n("#downloadTemplateSelector").currObj();if(tplChooser){var responseJSON;eval("responseJSON="+resp),tplChooser.options.length=0;for(templateId in responseJSON){var value=responseJSON[templateId],opt=new Option(value,templateId);tplChooser.options[tplChooser.options.length]=opt}}}hideLayer()}}})}function prefillTemplate(a){selectedTemp=$n("#hid_prefillTemp").val(),$n(this).ajaxReq({type:"get",async:"true",datatype:"text",url:createTemp+"?tempId="+selectedTemp+"&prefill=1&edit=0",success:function(a){$n("#appCandFields").html(a),initializeDropDowns(),tagManager(),createTemplateValidation()}})}function createTemplateDD(a){var b=$n("#"+a).val(),c=JSON.parse(b),d={id:{prefillTemp:[c]},Checkbox:!1,max_height:100,placeHolderText:" Select template",onClickReq:function(a,b,c){prefillTemplate(b)}};new DD(d)}function initializeDropDowns(a){"undefined"==typeof a&&(a=""),createCandidateFieldDD(a),createApplicationFieldDD(a)}function resetTemplateParams(){$n("#tempName").val(""),$n("#shareWith").val(""),$n("#fields").val(""),$n("#templateId").val(""),
//$n('#templateName').val('');
$n("#shared2").childrens("option[value=1]").currObj().selected="true",$n("#fieldJSON").val(""),$n("#selFields").html(""),$n("#selFieldCnt").html("0")}function createTemplate(a){$n(this).ajaxReq({type:"get",async:"true",datatype:"text",url:createTemp+"?tempType="+$n("#templateType").val(),success:function(b){$n("#createTempLB").html(b),lightBox({contId:"createNewCont",close:"createclose",contWidth:829,ecp:!0,fixedLayer:!1,returnFocus:!1,fLink:"flink1"}),createTemplateDD(a&&"string"==typeof a?a:"templatesStr"),createCandidateFieldDD(),createApplicationFieldDD(),createTemplateValidation(),clearErrorFields(),
//tagManager();
resetTemplateParams(),setTrackerLBtitle()}})}function createTemplateValidation(){var a=$n.browser();"msie"==a.name&&a.version<8&&setPlaceholderDynamically({templateName:"Please enter a name"}),commonValidator.validate({formNames:"createNewTemplate",errors:commonErrList,styles:{errorClass:"msg_errf",okClass:"ok",softMandClass:"softMand"},clearOnFocus:!1,
//messageBox : {id:'msgBx',content: {customContent:'My custom content for the MsgBox',errorCount:'Total [errCount] errors found - Custom.',errorMessages:true}, hideOthers:false},
inlineErrors:!0,
//defaultEvents : ['blur','keyup'],
submitButton:["createTemplateBtn"]}),$n("#createTemplateBtn").click(function(){
// isValidSelFields = validateSelectedFields();
if("d"==$n("#templateType").val()){if(!commonValidator.isValid("templateName")||!commonValidator.isValid("hiddenForSel"))return!1;saveTemplate()}if("f"==$n("#templateType").val()){if(!(commonValidator.isValid("templateName")&&commonValidator.isValid("hiddenForSel")&&commonValidator.isValid("downloadTemplateSubject")&&commonValidator.isValid("hiddenTemplateBodyForShowingErr")))return!1;saveTemplate()}})}function changeSelectedFieldCount(a){"undefined"==typeof a&&(a=""),elems=document.getElementById(a+"selFields").children,$n("#"+a+"selFieldCnt").html(elems.length)}function listUpandDown(a){return{onCreate:function(a,b,c){this.attachUpDownEvent(a),this.bindUpDown(b,c)},onDelete:function(a,b,c){var d=$n("#"+c+"selFields li");d.length>0&&this.bindUpDown(b,c)},attachUpDownEvent:function(a){if(a.attr("udset")&&1==a.attr("udset"));else{a.attr("udset",1);var b=$n("<div>"),c=a.childrens("a"),d=a.childrens("a").eq(c.length-1);b.addClass("ud"),d.addClass("delIcon"),b.html('<a class="DwnArw" href="javascript:void(0)" move="up"></a><a class="UpArw" href="javascript:void(0)" move="down"></a>'),a.append(b.append(d))}},bindUpDown:function(a,b){"undefined"==typeof b&&(b=""),reOrder.init({ids:[b+"selFields"],callBack:function(b,c){var d=c.attr("id");a.Fn.preserveEventafterClone(d+" a.dCross",d,d.split("_")[1],!1)}})}}}function createCandidateFieldDD(a){"undefined"==typeof a&&(a=""),temparr=[];var b=[];if($n("#"+a+"fieldJSON").length>0){if($n("#"+a+"fieldJSON").val()){var c=JSON.parse($n("#"+a+"fieldJSON").val()),d=0;for(index in c)c.hasOwnProperty(index)&&c[index].indexOf("candidateField")!=-1&&(b[" "+d++]=c[index].replace(/candidateField_/gi,""))}var e={id:{},checkBox:!0,maxHeight:230,openDDLayer:!0,searchBox:!1,tagInSepContainer:a+"selFields",placeHolderText:"Candidate Fields",resetPrefillValues:!0,tagsSorting:!1,maintianMergePrefillArrayOrder:!0,onClickReq:function(b,c,d,e){changeSelectedFieldCount(a),assignInstance("candidateField","onClickReq",b,c,d,e,a);var f=c.replace(/undrxxscr/g,"_").replace("MHx","-");if(f="candidateField_"+f,"Checked"===d)temparr.push(f);else{var g=temparr.indexOf(f);g>-1&&temparr.splice(g,1)}},onTagClick:function(){assignInstance("candidateField","onTagClick")}};e.id[a+"candidateField"]=[candidateFieldJSON,b],candFieldInst=new DD(e)}}function createApplicationFieldDD(a){"undefined"==typeof a&&(a="");var b=[];if($n("#"+a+"fieldJSON").length>0){if($n("#"+a+"fieldJSON").val()){var c=JSON.parse($n("#"+a+"fieldJSON").val()),d=0,e=new Array;for(index in c)c.hasOwnProperty(index)&&c[index].indexOf("applicationField")!=-1&&(b[" "+d]=c[index].replace(/applicationField_/gi,""),e[index]=c[index].replace(/applicationField_/gi,"")),/*else if (jsonValues[index].indexOf('candidateField') != -1) {
                    arr[index] = jsonValues[index].replace(/candidateField_/gi, '');
                }*/
d++}var f={id:{},checkBox:!0,maxHeight:230,openDDLayer:!0,searchBox:!1,tagInSepContainer:a+"selFields",placeHolderText:"Application Details",tagsSorting:!1,resetPrefillValues:!0,maintianMergePrefillArrayOrder:!0,onClickReq:function(b,c,d,e){changeSelectedFieldCount(a),assignInstance("applicationField","onClickReq",b,c,d,e,a);var f=c.replace(/undrxxscr/g,"_").replace("MHx","-");if(f="applicationField_"+f,"Checked"===d)temparr.push(f);else{var g=temparr.indexOf(f);g>-1&&temparr.splice(g,1)}},onTagClick:function(){assignInstance("applicationField","onTagClick")}};f.id[a+"applicationField"]=[applicationFieldJSON,e],appFieldInst=new DD(f)}}/*Up and down*/
/*
 function onCreate(li) {
 attachUpDownEvent(li);
 bindUpDown();
 }
 
 function onDelete(li) {
 var lis = $n('#hiddenFieldContainer li');
 if (lis.length > 0) {
 bindUpDown()
 }
 }
 function attachUpDownEvent(obj) {
 if (obj.attr('udset') && obj.attr('udset') == 1) {
 }
 else {
 obj.attr('udset', 1);
 var udCnt = $n('<div>'),
 chldrn = obj.childrens('a'),
 cross = obj.childrens('a').eq((chldrn.length) - 1);
 udCnt.addClass('ud');
 udCnt.html('<a class="top" href="javascript:void(0)" move="up"></a><a class="btm" href="javascript:void(0)" move="down"></a>');
 obj.currObj().insertBefore(udCnt.currObj(), cross.currObj());
 }
 }
 
 function bindUpDown() {
 
 reOrder.init({
 ids: ["selFields"],
 callBack: function(obj, li) {
 
 var id = li.attr('id');
 
 appFieldInst.Fn.preserveEventafterClone(id + ' a.dCross', id, id.split('_')[1], false)
 
 }
 });
 }
 */
/*
 function attachUpDownEvent(obj) {
 if (obj.attr('udset') && obj.attr('udset') == 1) {
 
 }
 else {
 obj.attr('udset', 1);
 var udCnt = $n('<div>'),
 chldrn = obj.childrens('a'),
 cross = obj.childrens('a').eq((chldrn.length) - 1);
 obj.childrens('a').eq((chldrn.length) - 1).remove();
 cross.addClass('updel delIcon fr');
 
 udCnt.addClass('ud');
 udCnt.html('<a class="arrowOuter" href="javascript:void(0)" move="up"><small class="s_upArrow"></small></a><a class="arrowOuter" href="javascript:void(0)" move="down"><small class="s_downArrow"></small></a>');
 obj.append(udCnt.append(cross));
 }
 }
 */
function validateSelectedFields(){var a=document.getElementById("selFields").children;return 0!=a.length}function assignInstance(a,b,c,d,e,f,g){"undefined"==typeof g&&(g="");var h=new listUpandDown(g),i="";
// console.log(flg, trgr, thisObj, key, status, li)
if(i="applicationField"==a?appFieldInst:candFieldInst,"onClickReq"==b)if("Checked"==e){h.onCreate(f,i,g);var j=document.getElementById(g+"selFields");j.scrollTop=j.scrollHeight}else"Unchecked"==e&&h.onDelete(f,i,g);else h.bindUpDown(i,g)}function clearErrorFields(){$n("#templateName_err").html(""),$n("#templateName_err").removeClass("msg_errf"),$n("#templateName").removeClass("msg_errf"),$n("#hiddenForSel_err").html(""),$n("#hiddenForSel_err").removeClass("msg_errf"),$n("#hiddenForSel").removeClass("msg_errf")}function editorInt(){setTimeout(function(){$editor=new editorWindow,$editor.createEditor(AC_CSS_PATH+"/editor.css","","mailTemplateBody","$editor","project_detail","designation","ctc");new emailTagCreator({ancId:"#tagsLists2",editorRef:$editor,formElm:!1})},100)}function tagManager(){if($n("#mailSubjectBody").length>0){editorInt();var a=(showHidemMenuDD({linkId:"#tagsForSubject",containerId:"#insertCont1"}),showHidemMenuDD({linkId:"#tagsForBody",containerId:"#insertCont2"}),new emailTagCreator({ancId:"#tagsLists1",editorRef:"#downloadTemplateSubject",formElm:!0}),new tabbing);a.init("insertCont1");var b=new tabbing;b.init("insertCont2")}}function showDownloadTemplateSelector(a){$n(this).ajaxReq({type:"get",async:"true",datatype:"text",url:a,success:function(a){var b=JSON.parse(a),c=b.templateJson;$n("#downloadTemplateSelect").html(b.template),generateDropDown(c)}})}function removeDownloadTemplateSelector(){$n("downloadTemplateSelect").html("")}function hideshowTemplateSector(){$n("#xlsInp").currObj().checked?$n("#downloadTemplateSelect").length?($n("#downloadTemplateSelect").show(),$n("#selectedTemplateFields").show()):$n("#downloadTemplateSelect1").length&&($n("#downloadTemplateSelect1").show(),$n("#selectedTemplateFields1").show()):$n("#downloadTemplateSelect").length?($n("#downloadTemplateSelect").hide(),$n("#selectedTemplateFields").hide()):$n("#downloadTemplateSelect1").length&&($n("#downloadTemplateSelect1").hide(),$n("#selectedTemplateFields1").hide())}function createValidationOnDownload(){}commonErrList[3003]=function(a){return rtn=!1,IsValidGenericNameCommon(a.val())&&(rtn="Special characters other than . # @ - , $ & /  are not allowed"),{msg:rtn,id:a.attr("id")+"_err"}},commonErrList[3010]=function(a){var b=!1,c=JSON.parse($("#templateJson").val()),d=Object.keys(c).map(function(a){return c[a]});return d.indexOf($("input[name=templateName]").val())>-1&&(b="Template Name Already Exists"),""===$("#excelLightBox input[name=templateName]").val()&&(b="Required Field can't be blank"),{msg:b,id:a.attr("id")+"_err"}},commonErrList[3100]=function(a){var b=!1,c=document.getElementById("selFields").children;return 0==c.length?(b="Please select atleast one value",a.prev().attr("style","border-color:#be1e2d")):a.prev().attr("style",""),{msg:b,id:a.attr("id")+"_err"}},Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1};var updwnIns="",candFieldInst="";temparr=[];var appFieldInst="";commonErrList[7001]=function(a){rtn="";var b=document.getElementById("selFields").children;return 0==b.length?flag=!1:flag=!0,flag||(rtn="Please select atleast one value"),{msg:rtn,id:a.attr("id")+"_err"}},commonErrList[7010]=function(a){return rtn="",$editor.viewSrc(),""!=trim(strip_tags($editor.cInput.val()))&&"<br>"!=trim(strip_tags($editor.cInput.val()))||(rtn="Required Field can not be left blank"),trim($editor.cInput.val()).length>1e4&&(rtn=" Mail body can not be more than 10000 characters"),{msg:rtn,id:a.attr("id")+"_err"}},"undefined"!=typeof jQuery&&($(document).on("click",".expand",function(a){a.stopPropagation(),a.preventDefault(),$(".customAttach-content").toggleClass("oph0",1e3,"easeOutSine"),$(".attachDoc").toggleClass("dspN",1e3,"easeOutSine"),$(".expand span.plusIC").toggleClass("minusIC");var b=$("input[name=excelTemplateId]").val();_excelDataObj={key:b,type:"forward"}}),$(document).on("click","#closeExcel",function(a){$n("#selFields")&&$n("#selFields").html("")}));