/*
 * Author: Abhishek Dhadse
 * Version:v1.3
 * Description: Added isCalendarInvite parameter to url
 */
//  NOTE_FIX: mlhTupleToken
function getLightBoxForDownloadByIndex(a,b,c){var d=0;if(b){var e=$n(b).attr("rel");if($n("#appCount"+e).length&&"0"==$n("#appCount"+e).text())return!1;d=$n("#appCount"+e).text()}if(
// if ($n('#stick').length > 0) {
//     disableDiv('stick');
// }
// showLoader('_bodyContent');
// if ($n('#projectTuples').length) {
//     showLoader('projectTuples');
// } else {
//     showLoader('_bodyContent');
// }
$n("#formIdForDownloadTrackerValidation").val("downloadSrpByIndexForm"),$n("#submitButtonForDownloadTrackerValidation").val("downloadByIndexSubmit"),clearAllPrefillTemplateDivs(),void 0==typeof f)var f=0;"function"==typeof getCheckedProfiles?window.downloadApplicationTracker("BY_RANGE",c):window.downloadByIndexOnRequirement(e,d,c)}function generateDropDown(a,b,c,d){"undefined"==typeof d&&(d="");var e,f=[];
//tempDDId = "prefillTemp" + suffix;
if(b&&""!=b&&(f[0]=" "+b+" "),b&&"number"==typeof b&&(f=b.toString()),b&&"undefined"!=typeof hasClientTrackerFlow&&hasClientTrackerFlow&&(f=b.toString()),a&&(e="object"==typeof a?a:JSON.parse(a)),"summary"===d?($n("#summaryfields").val(""),$n("#summaryTrackerLabels").val("")):($n("#fields").val(""),$n("#trackerLabels").val("")),"forward"==c)var g={id:{prefillTemp:[e,f]},Checkbox:!1,max_height:100,placeHolderText:" Select template",onClickReq:function(a,b,e){"forward"==c&&($n("#"+d+"selFields")&&$n("#"+d+"selFields").html(""),"summary"===d?($n("#summaryfields").val(""),$n("#summaryTrackerLabels").val("")):($n("#fields").val(""),$n("#trackerLabels").val("")),makeAjax=!0,temparr=[],_excelDataObj.key=b,_excelDataObj.type="forward")}};else var g={id:{prefillTemp:[e,f]},Checkbox:!1,max_height:100,placeHolderText:" Select template",onClickReq:function(a,b,c){getFieldForSelectedTemplate(a,b,c)}};var h={};h[d+"prefillTemp"]=[e,f],g.id=h,/*if (type == "forward") {
        objTemplate.id[tempDDId] = [obj, x];
    }*/
mainTempDD=new DD(g)}function saveTemplateView(a,b){"undefined"==typeof b&&(b="");var c="",d="";"f"==$n("#templateType").val()&&(c=$n("#downloadTemplateSubject").val(),d=$n("#templateBody").val());var e=a?"":_excelDataObj.key;assignValuestoHidden("",""),assignValuestoHidden("","",b);var f="templateName="+encodeURIComponent(trim($n("#"+b+"tempName").val().replace(/\s{2,}/g," ")))+"&id="+e+"&type=d&fieldOrder="+$n("#"+b+"fields").val()+"&clientId="+$n("#clientId").val()+"&addedBy="+$n("#currentUserId").val()+"&templateType=d&fromListing="+$n("#fromListingPage").val()+"&templateSubject="+c+"&templateBody="+d+"&fieldsPrefix="+b;a&&(f+="&sharedWith="+$("#"+b+"shared2").val()),$n(this).ajaxReq({type:"post",async:"true",datatype:"text",url:saveTemp,data:f,success:function(c){if(a){var d=JSON.parse(c);if(d.error&&0!=d.error){errorList=d.errorList;for(i in errorList)"name"==i&&($n("#"+b+"templateName_err").show(),$n("#"+b+"templateName_err").html(errorList[i]),$n("#"+b+"templateName_err").addClass("msg_errf"))}else{
//Hide the existing error messages from name field 
$n("#"+b+"templateName_err")&&($n("#"+b+"templateName_err").hide(),$n("#"+b+"templateName_err").html(""),$n("#"+b+"templateName_err").removeClass("msg_errf"));var e=JSON.parse(JSON.parse(c).templateListJson);for(var f in e)if(e[f]===$("input[name="+b+"templateName]").val())break;makeAjax=!0,temparr=[],
//console.log(key);
window.hideLayer(),
//$('#closeExcel').off('click');
//hideltBoxCallBack();//this is problem for cleaning selfields
$n("#templateJson").val(JSON.stringify(e)),""==b?prevKey=$("input[name=summaryExcelTemplateId]").val():prevKey=$("input[name=excelTemplateId]").val(),prevKey=$.trim(prevKey),mainTempDD.destroyDD(),_excelDataObj.key=f,_excelDataObj.type="forward",f=f.replace(/ /g,""),""!=b?(generateDropDown(e,f,"forward","summary"),generateDropDown(e,prevKey,"forward")):(generateDropDown(e,f,"forward"),generateDropDown(e,prevKey,"forward","summary"))}}}})}function checkName(a){"undefined"==typeof a&&(a="");var b=!1,c=$("input[name="+a+"templateName]").val();if(""===c)b="This field can not be left blank.";else if(IsValidGenericNameCommon(c))b="Special characters other than . # @ - , $ & /  are not allowed";else{var d=JSON.parse($n("#templateJson").val()),e=Object.keys(d).map(function(a){return d[a]});b=e.indexOf(c)>-1&&"Please enter a unique name."}return b}function tagCount(a){if("undefined"==typeof a&&(a=""),""==a)var b=document.getElementById("selFields").children;else var b=document.getElementById(a+"selFields").children;return 0==b.length?flag=!1:flag=!0,flag}
// function viewcrtTemplate(toshow, keyId, fieldsPrefix) {
//     if (typeof(fieldsPrefix) == "undefined") {
//         fieldsPrefix = "";
//     }
//     if (typeof(keyId) == "undefined") {
//         keyId = "";
//     }
//     var type = _excelDataObj.type;
//     if (keyId.length>0) {
//         key = $("input[name='"+keyId+"']").attr("value");
//     } else {
//         key = _excelDataObj.key;
//     }
//     if (type == "forward") {
//         var params = '&applicationCount=' + applicationCount + '&profileIdCount=' + profileIdCount + '&isCalendarInvite=' + isCalendarInvite + '&isForwardAction=' + isForwardAction +'&forwardMailSimple=1';
//         if (fieldsPrefix.length>0)
//             params = params + '&fieldsPrefix=' + fieldsPrefix;
//         /*Case of forward mail*/
//     }
//     if (makeAjax) {
//         showLoader("downloadTemplateSelect1", true);
//         $n(this).ajaxReq({
//             type: 'get',
//             async: 'true',
//             datatype: 'text',
//             url: fieldsForTemplate + '?tempId=' + key + params,
//             success: function(_response) {
//                  tempResponse=_response;
//                 $('#'+fieldsPrefix+'excelTemplate').html(_response);
//                 temparr=[];
//                 lightBox({
//                     contId: fieldsPrefix+"excelLightBox",
//                     firstFocus: 'forFocus',
//                     contWidth: 820,
//                     ecp: true,
//                     fixedLayer: false,
//                     returnFocus: false,
//                     fLink: 'flink1',
//                     hideCallBack: function(evt) {
//                         candFieldInst.destroyDD();
//                         appFieldInst.destroyDD();
//                     }
//                 });
//                 //makeAjax=false;
//                 hideLoader();
//                 //console.log("success");
//                 parseScript(fieldsPrefix+"excelTemplate");
//                 initializeDropDowns(fieldsPrefix);
//                 bindEventsToTracker(fieldsPrefix);
//                 prevKeyValue = key;
//                 _defaultName = JSON.parse($n('#templateJson').val())[key];
//                 $n("#templateName").val(_defaultName);
//                 if (toshow) {
//                     $n("#"+fieldsPrefix+"nameSection,#"+fieldsPrefix+"createTemplateBtn").removeClass("dspN");
//                     $n(".saveExistingTemplate,#"+fieldsPrefix+"saveTemplateBtn").addClass("dspN");
//                     $n(".templateType").html("Create Template");
//                 } else {
//                     $n("#"+fieldsPrefix+"nameSection,#"+fieldsPrefix+"createTemplateBtn").addClass("dspN");
//                     $n(".saveExistingTemplate,#"+fieldsPrefix+"saveTemplateBtn").removeClass("dspN");
//                     $n(".templateName").html('\"' + _defaultName + '\"');
//                     $n(".templateType").html("View Template");
//                 }
//             }
//         });
//     } else {
//         var _inpElem = $("#"+fieldsPrefix+"fieldJSON").clone();
//         $n('#'+fieldsPrefix+'excelTemplate').html(tempResponse);
//         $n("#"+fieldsPrefix+"fieldJSON").remove();
//         $('#'+fieldsPrefix+'excelTemplate').append(_inpElem);
//         lightBox({
//             contId: fieldsPrefix+"excelLightBox",
//             firstFocus: 'forFocus',
//             contWidth: 820,
//             ecp: true,
//             fixedLayer: false,
//             returnFocus: false,
//             fLink: 'flink1',
//             hideCallBack: function(evt) {
//                 candFieldInst.destroyDD();
//                 appFieldInst.destroyDD();
//             }
//         });
//         parseScript(fieldsPrefix+"excelTemplate");
//         initializeDropDowns(fieldsPrefix);
//         if (toshow) {
//             $n("#"+fieldsPrefix+"nameSection,#"+fieldsPrefix+"createTemplateBtn").removeClass("dspN");
//             $n(".saveExistingTemplate,#"+fieldsPrefix+"saveTemplateBtn").addClass("dspN");
//             $n(".templateType").html("Create Template");
//         } else {
//             $n("#"+fieldsPrefix+"nameSection,#"+fieldsPrefix+"createTemplateBtn").addClass("dspN");
//             $n(".saveExistingTemplate,#"+fieldsPrefix+"saveTemplateBtn").removeClass("dspN");
//             $n(".templateName").html('\"' + _defaultName + '\"');
//             $n(".templateType").html("View Template");
//         }
//         bindEventsToTracker(fieldsPrefix);
//         el = document.getElementById('closeExcel'),
//         elClone = el.cloneNode(true);
//     }
// }
/**
 * This function finds values of tracker to open tracker component of react for forward  
 * @param {bool} isCreateMode used for checking for preview mode(false) or create mode(true)
 * @param {String} trackerType takes two value for two types of tracker in forward
 *                              excelTemplateId or summaryExcelTemplateId 
 * */
function viewcrtTemplate(a,b){var c=$("#hid_prefillTemp").val().trim(),d="";"summaryExcelTemplateId"===b&&(c=$("#hid_summaryprefillTemp").val().trim()),$("#hid_employerId").length&&(d=$("#hid_employerId").val().trim()),forwardApplicationTracker(a,b,c,d)}function getFieldForSelectedTemplate(a,b,c){if("1"==$n("#isTemplate").val())return!1;if("forward"==c){var d="&applicationCount="+applicationCount+"&profileIdCount="+profileIdCount+"&isCalendarInvite="+isCalendarInvite+"&isForwardAction="+isForwardAction;showLoader("downloadTemplateSelect1",!0)}else{var d="";showLoader("downloadTemplateSelect",!0)}$n(this).ajaxReq({type:"get",async:"true",datatype:"text",url:fieldsForTemplate+"?tempId="+b+d,success:function(a){hideLoader(),"forward"!=c?($n("#selectedTemplateFields").html(a),parseScript("selectedTemplateFields")):($n("#selectedTemplateFields1").html(a),parseScript("selectedTemplateFields1"))}})}function hideShowNameSection(){$n("#saveAsNew").currObj().checked?$n("#nameSection").show():$n("#nameSection").hide()}function clearAllPrefillTemplateDivs(){$n("#downloadTemplateSelect").length&&$n("#downloadTemplateSelect").html(""),$n("#downloadTemplateSelect1").length&&$n("#downloadTemplateSelect1").html(""),$n("#selectedTemplateFields").length&&$n("#selectedTemplateFields").html(""),$n("#selectedTemplateFields1").length&&$n("#selectedTemplateFields1").html("")}function createTemplateValidationForDownload(a,b){a=$n("#formIdForDownloadTrackerValidation").val(),b=$n("#submitButtonForDownloadTrackerValidation").val();var c=$n.browser();"msie"==c.name&&c.version<8&&setPlaceholderDynamically({templateName:"Please enter a name"}),commonErrList[9010]=function(a){rtn=!1;var b=/^[a-zA-Z0-9\s\.\#\{\}\_\@\-\,\$\&\/\[\]\(\)]+$/;return b.test(a.val())||(rtn="Special characters other than . # @ _ { } - , $ & / [ ] ( ) are not allowed"),{msg:rtn,id:a.attr("id")+"_err"}},commonValidator.validate({formNames:a,errors:commonErrList,styles:{errorClass:"msg_errf",okClass:"ok",softMandClass:"softMand"},clearOnFocus:!1,inlineErrors:!0,submitButton:[b]})}function validateDownloadForm(){return""==$n("#fieldJSON").val()||0==$n("#fieldJSON").length||($n("#hiddenForSel_err").length&&($n("#hiddenForSel_err").html(""),$n("#hiddenForSel_err").hide(),$n("#hiddenForSel_err").removeClass("msg_errf")),$n("#templateName_err").length&&($n("#templateName_err").html(""),$n("#templateName_err").hide(),$n("#templateName_err").removeClass("msg_errf")),!0)}function bindEventsToTracker(a){"undefined"==typeof a&&(a=""),$(document).off("click","#"+a+"saveTemplateBtn").on("click","#"+a+"saveTemplateBtn",function(){if(tagCount(a)){$n("#"+a+"hiddenForSel_err").removeClass("msg_errf");var b=!!$n("#"+a+"saveExistTemp:checked").length;b&&saveTemplateView(!1,a),$("#"+a+"fieldJSON").val(JSON.stringify(temparr)),
//$("#closeExcel").remove();
window.hideLayer()}else $n("#"+a+"hiddenForSel_err").html("Please select atleast one value").addClass("msg_errf")}),$(document).off("click","#"+a+"createTemplateBtn").on("click","#"+a+"createTemplateBtn",function(){$(".templateExist").addClass("dspN"),$("#excelLightBox input[name="+a+"templateName]").removeClass("err");var b=tagCount(a),c=checkName(a);0==b?$n("#"+a+"hiddenForSel_err").html("Please select atleast one value").addClass("msg_errf"):1==b&&$n("#"+a+"hiddenForSel_err").html("").removeClass("msg_errf"),0==c?$n("#"+a+"templateName_err").html("").removeClass("msg_errf"):$n("#"+a+"templateName_err").html(c).addClass("msg_errf"),b&&0==c&&saveTemplateView(!0,a)}),$n("#"+a+"closeExcel")&&($("#"+a+"closeExcel").off("click").on("click",function(){window.hideLayer(),$n("#"+a+"selFields")&&($n("#"+a+"selFields").html(""),makeAjax=!0),candFieldInst.destroyDD(),appFieldInst.destroyDD()}),$("#"+a+"cancelTracker").off("click").on("click",function(){window.hideLayer(),$n("#"+a+"selFields")&&($n("#"+a+"selFields").html(""),makeAjax=!0),candFieldInst.destroyDD(),appFieldInst.destroyDD()}))}function hideltBoxCallBack(a){"undefined"==typeof a&&(a=""),$("#"+a+"closeExcel")[0].click()}var mainTempDD=[];makeAjax=!0,newResponseData="",nowsaved=!1,
//sfx = $n("#suffix").val();
prevKeyValue=$n("input[name=excelTemplateId]").val(),prevKeyValueSummary=$n("input[name=summaryExcelTemplateId]").val(),_defaultName="",commonErrList[3100]=function(a){var b=!1,c=document.getElementById("selFields").children;return 0==c.length?(b="Please select atleast one value",a.prev().attr("style","border-color:#be1e2d")):a.prev().attr("style",""),{msg:b,id:a.attr("id")+"_err"}},"undefined"!=typeof jQuery;