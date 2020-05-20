/*
 * @author tarunjeet.saini
 */

commonValidator = {
	
	validate : function(params){
		commonValidator.lastErr=null;
		commonValidator.isVld=null;
		commonValidator.erArry={};
		commonValidator.errs=params.errors || commonErrList;
		commonValidator.cFocus=params.clearOnFocus || false;
		commonValidator.noVld=false;
		var inlineErr=(params.inlineErrors!=false)?true:false;
		if(params.messageBox){var mBoxId=params.messageBox.id || null, mBoxCnt=params.messageBox.content || null, mBoxHid=params.messageBox.hideOthers || false}
		else{var mBoxId,mBoxCnt=null}
		if(params.styles){var errClass=params.styles.errorClass || null, okClass=params.styles.okClass || null, sOkClass=params.styles.softMandClass || null}
		else{var errClass='err', okClass='ok', sOkClass='softMand'}
		var fNames=params.formNames || null, dEvts=params.defaultEvents || null;
		var sBts=params.submitButton || null;
		var delay=params.fireDelay || 0;
		if(fNames.constructor===Array){for(var x=0;x<fNames.length;x++){commonValidator.validInit(fNames[x],sBts,errClass,okClass,sOkClass,mBoxId,mBoxCnt,mBoxHid,inlineErr,dEvts,delay)}}
		else{commonValidator.validInit(fNames,sBts,errClass,okClass,sOkClass,mBoxId,mBoxCnt,mBoxHid,inlineErr,dEvts,delay)}
	},
		
	validInit : function(fN,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr,dEvts,delay){
		var z,frmElm=$n('form[name='+fN+']').currObj() || document.forms[fN], sBtns, rStat, noVldSt=false,sbtFlg;
		if(!this.supportPlaceholder()){
			this.setDefaultValues(frmElm);
		}
		this.checkEvents(frmElm,eC,oC,soC,inErr,dEvts);
		if(sB){
			sBtns=commonValidator.getSbtBtns($n(frmElm),sB);
			for(z=0;z<sBtns.length;z++){
				if(sBtns[z].attr('type')!='submit'){
					if(sBtns[z].attr('rel')!='' && sBtns[z].attr('rel')=='noValidate'){sBtns[z].addEvent('click',function(){commonValidator.noVld=true;$n(frmElm).submit()})}
					else{sBtns[z].addEvent('click',function(){
						setTimeout(function(){commonValidator.isVld=commonValidator.checkSubmit(frmElm,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr)},parseInt(delay));
					})
				}
		}}}
		$n(frmElm).submit(function(){
			if(parseInt(delay)==0){
				(commonValidator.noVld)?rStat=true:rStat=commonValidator.checkSubmit(frmElm,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr);
				return rStat;
			}
			else{
				setTimeout(function(){
					(commonValidator.noVld)?rStat=true:rStat=commonValidator.checkSubmit(frmElm,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr);
					if(rStat){
						commonValidator.sanitizeDefaultValues(frmElm);
						$n(frmElm).currObj().submit();
					}
				},parseInt(delay));
				return false;
			}
		})
	},
	
	setDefaultValues : function(fElm){
		var x,fEls=commonValidator.getFrmElms($n(fElm),true);
		for(x=0;x<fEls.length;x++){
			//if(fEls[x].attr('value')!=fEls[x].attr('placeholder')){
				if(fEls[x].attr('value')=='' || fEls[x].attr('value')==fEls[x].attr('placeholder')){fEls[x].val(fEls[x].attr('placeholder'));fEls[x].css({'color':'#666'})}				
				fEls[x].addEvent('focus',function(){defTextFocus($n(this),'f')})
				fEls[x].addEvent('blur',function(){defTextFocus($n(this),'b')})
			//}
		}
		var defTextFocus=function(obj,e){
			if(obj.val()==obj.attr('placeholder') && e=='f'){obj.val('');obj.removeAttr('style')}
			else if((obj.val()=='' || obj.val()==obj.attr('placeholder')) && e=='b'){obj.val(obj.attr('placeholder'));obj.css({'color':'#666'})}
		}
	},
	
	sanitizeDefaultValues : function(fElm){
		var x,fEls=commonValidator.getFrmElms($n(fElm),true);
		for(x=0;x<fEls.length;x++){
			if(fEls[x].attr('value')==fEls[x].attr('placeholder')){fEls[x].val('')}
		}
	},
	
	checkEvents : function(fElm,eC,oC,soC,inErr,dEvts){
		var x,y,evts=null, fEls=commonValidator.getFrmElms($n(fElm),false);
		for(x=0;x<fEls.length;x++){
			/*var edtr=eval(fEls[x].attr('editor'));
			if(edtr){
				console.log(edtr.viewSrc());
				console.log(edtr.cInput.val())
			}*/
			var valids=fEls[x].attr('rel').split('|')[0];
			if(fEls[x].attr('rel').split('|')[1] || dEvts){
				if(dEvts){(dEvts.constructor===Array)?'':dEvts=new Array(dEvts)}
				evts=(fEls[x].attr('rel').split('|')[1])?fEls[x].attr('rel').split('|')[1].split(','):dEvts;
				if(evts){
					for(y=0;y<evts.length;y++){
						//console.log(fEls[x].currObj()+'-----------'+evts[y]);
						var edtr = this.checkEditor(fEls[x]);
						if(edtr){
							if(edtr){
								var edtrObj = ($n.browser().name=='msie')?edtr.obj:edtr.objContDoc;
								$n(edtrObj).addEvent(evts[y],function(vlds,obj,frm,eCp,oCp,soCp){
									return function(e){commonValidator.checkValids(vlds,obj,e,frm,eCp,oCp,soCp,true)}
								}(valids,edtr,fElm,eC,oC,soC))
							}
						}
						else{
							fEls[x].addEvent(evts[y],function(vlds,obj,frm,eCp,oCp,soCp){
								return function(e){commonValidator.checkValids(vlds,obj,e,frm,eCp,oCp,soCp,true)}
							}(valids,fEls[x],fElm,eC,oC,soC))
						}
					}
				}
			}
			if(commonValidator.cFocus){
				fEls[x].addEvent('focus',function(vlds,obj,frm,eCp,oCp,soCp){
					return function(e){commonValidator.clearError(e,vlds,obj,frm,eCp,oCp,soCp,true)}
				}(valids,fEls[x],fElm,eC,oC,soC))
			}
		}
	},
	
	checkSubmit : function(fElm,sB,eC,oC,soC,mBoxId,mBoxCnt,mBH,inErr){
			var s,x,vlds,cV,chkVld=false,sbtCallB,fEls=commonValidator.getFrmElms($n(fElm),false),sBtns=commonValidator.getSbtBtns($n(fElm),sB);
			(mBH)?$n('.mgBox').hide():''; $n(fElm).attr('chk',false); commonValidator.erArry={};
			for(s=0;s<sBtns.length;s++){
				if(sBtns[s].attr('rel')!='' && $n.trim(sBtns[s].attr('rel')).length && sBtns[s].attr('rel')!='noValidate'){
					sbtCallB='custom:'+sBtns[s].attr('rel').split('|')[0];
					cV=commonValidator.checkValids(sbtCallB,sBtns[s],'submit',fElm,eC,oC,soC,inErr);
					if(!chkVld){if(!cV){chkVld=true}}
				}
			}
			for(x=fEls.length-1;x>=0;x--){
				vlds=fEls[x].attr('rel').split('|')[0];
				var edtr = this.checkEditor(fEls[x]);
				if(edtr){cV=commonValidator.checkValids(vlds,edtr,'submit',fElm,eC,oC,soC,inErr)}
				else{cV=commonValidator.checkValids(vlds,fEls[x],'submit',fElm,eC,oC,soC,inErr)}
				if(!chkVld){if(!cV){chkVld=true}}
			}
			if(commonValidator.lastErr && $n(fElm).attr('chk')=='true'){
				if(mBoxId){
					($n('#'+mBoxId+'_cMsgCnt'))?$n('#'+mBoxId+'_cMsgCnt').remove():'';
					if(mBoxCnt){
						var y,cVeR=[], msgDiv=$n('<div>');
						msgDiv.attr('id',mBoxId+'_cMsgCnt');							
						for(y in commonValidator.erArry){cVeR.push(commonValidator.erArry[y])}
						if(mBoxCnt.customContent){
							var cstMsg=mBoxCnt.customContent, cP=$n('<p>');
							cP.html(cstMsg);
							msgDiv.append(cP);
						}
						if(mBoxCnt.errorMessages){
							var x,ul=$n('<ul>');
							for(x=cVeR.length-1;x>=0;x--){
								var li=$n('<li>');
								li.html(cVeR[x]);
								ul.append(li);
							}msgDiv.append(ul);
						}
						if(mBoxCnt.errorCount){
							var cntMsg=mBoxCnt.errorCount, p=$n('<p>');
							if(cntMsg!=true){cntMsg=cntMsg.replace('[errCount]',cVeR.length)}else{cntMsg='Total '+cVeR.length+ ' errors found in the form.'};
							p.html(cntMsg);
							msgDiv.append(p);
						}$n('#'+mBoxId).append(msgDiv);
					}$n('#'+mBoxId).show()
				}
				(commonValidator.lastErr.obj)?$n(commonValidator.lastErr.objCont).setFocus():commonValidator.lastErr.setFocus();
			}
			else{(mBoxId)?$n('#'+mBoxId).hide():''}
		return !chkVld;
	},
	
	clearError : function(e,vlds,obj,fElm,eC,oC,soC){
		var x,vds=vlds.split(','), vCode='';
		for(x=0;x<vds.length;x++){
			vCode=commonValidator.errs[vds[x].split(':')[1]] || vds[x].split(':')[1];
			if(vCode.constructor === Function){vCode=vCode()};
			this.heighlightErrOk(vCode,obj,fElm,'rem',eC,oC,soC);
		}
	},
	
	isValid : function(id){
		var obj=$n('#'+id),x,vlds,cV,chkVld=false;
		if(obj.currObj().nodeName.toLowerCase()=='form'){
			var fEls=commonValidator.getFrmElms(obj,false);
			for(x=fEls.length-1;x>=0;x--){				
				if(fEls[x].attr('type')!='button'&&fEls[x].attr('type')!='submit'&&fEls[x].attr('rel')!=''&&fEls[x].attr('rel').split('|')[0].indexOf('softReq')<0){					
					vlds=fEls[x].attr('rel').split('|')[0];
					if(!chkVld){if(commonValidator.checkValids(vlds,fEls[x])){chkVld=true}}
			}}return !chkVld;
		}
		else{
			if(obj.attr('rel')!=''){
				var vldds=obj.attr('rel').split('|')[0];
				return !commonValidator.checkValids(vldds,obj);
			}
		}
	},
	
	isValidSrv : function(vType,val){
		switch (vType){
			
		}
	},
	
	checkValids : function(vlds,obj,e,fElm,eC,oC,soC,inErr){
		var argChk=false,evtChk=0,argSts=false,obVal,sReq=false,etr=false;
		if(obj.obj){etr=true}
		if(arguments.length==2){argChk=true;evtChk=1}
		else{if(e.keyCode!=9&&e.keyCode!=16&&e.keyCode!=17&&e.keyCode!=18&&e.keyCode!=35&&e.keyCode!=36&&e.keyCode!=27&&e.keyCode!=20&&e.keyCode!=13){evtChk=1}}
		if(evtChk==1){
			var x,vRet=false, vCode='', vds=vlds.split(',');
			for(x=0;x<vds.length;x++){if(!vRet){
					switch (vds[x].split(':')[0]){
						case 'softReq' :
							(obj.attr('placeholder') && obj.val()==obj.attr('placeholder'))?obVal='':obVal=obj.val();
							if(argChk){(argSts)?'':argSts=this.validators.reqChk(obVal,vds[x].split(':')[1])}
							else{								
								vRet=this.validators.reqChk(obVal,vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1];
								(vRet)?sReq=true:sReq=false;
							}
							break;

						case 'required' :
							(obj.attr('placeholder') && obj.val()==obj.attr('placeholder'))?obVal='':obVal=obj.val();
							if(argChk){(argSts)?'':argSts=this.validators.reqChk(obVal,vds[x].split(':')[1])}
							else{
								vRet=this.validators.reqChk(obVal,vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}
							break;

						case 'alphaDS' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
								if(argChk){(argSts)?'':argSts=this.validators.alphadsChk(obj.val(),vds[x].split(':')[1])}
								else{
									vRet=this.validators.alphadsChk(obj.val(),vds[x].split(':')[1]);
									vCode=vds[x].split(':')[1]
								}}
							break;

						case 'alpha' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.alphaChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.alphaChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'num' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
								if(argChk){(argSts)?'':argSts=this.validators.numChk(obj.val(),vds[x].split(':')[1])}
								else{
									vRet=this.validators.numChk(obj.val(),vds[x].split(':')[1]);
									vCode=vds[x].split(':')[1]
							}}
							break;

						case 'float' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.floatChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.floatChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'alphanum' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.alphanumChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.alphanumChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'email' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.emailChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.emailChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'specialChar' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							if(argChk){(argSts)?'':argSts=this.validators.splChk(obj.val(),vds[x].split(':')[1])}
							else{
								vRet=this.validators.splChk(obj.val(),vds[x].split(':')[1]);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'charRange' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							var o=obj, minL=(o.attr('minL')!='')?o.attr('minL'):o.attr('minlength'), maxL=(o.attr('maxL')!='')?o.attr('maxL'):o.attr('maxlength'), scop='';
				(!o.attr('scope') || o.attr('scope')=='')?scop='in':scop=o.attr('scope');
							if(argChk){(argSts)?'':argSts=this.validators.rangeChk(o.val(),minL,maxL,scop)}
							else{
								vRet=this.validators.rangeChk(o.val(),minL,maxL,scop);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'valRange' :
							if(obj.attr('placeholder') && obj.val()==obj.attr('placeholder')){vRet=false}
							else{
							var o=obj, minV=(o.attr('minval')!='')?parseFloat(o.attr('minval')):parseFloat(o.attr('minV')), maxV=(o.attr('maxval')!='')?parseFloat(o.attr('maxval')):parseFloat(o.attr('maxV')), scop='';
							(!o.attr('scope') || o.attr('scope')=='')?scop='in':scop=o.attr('scope');
							if(argChk){(argSts)?'':argSts=this.validators.rangeVChk(o.val(),minV,maxV,scop)}
							else{
								vRet=this.validators.rangeVChk(o.val(),minV,maxV,scop);
								vCode=vds[x].split(':')[1]
							}}
							break;

						case 'checked' :
							if(argChk){
								if(obj.attr('type')=='checkbox'){
									var fElm,fPar=obj;
									while(fPar.currObj().nodeName.toLowerCase()!='form'){fPar=fPar.parent()}
									(argSts)?'':argSts=this.validators.checkedChk(obj,fPar.currObj());
								}
								else if(obj.attr('type')=='radio'){
									var fElm,fPar=obj;
									while(fPar.currObj().nodeName.toLowerCase()!='form'){fPar=fPar.parent()}
									(argSts)?'':argSts=this.validators.checkedRadChk(obj,fPar.currObj());
								}
							}
							else{
								if(obj.attr('type')=='checkbox'){vRet=this.validators.checkedChk(obj,fElm)}
								else if(obj.attr('type')=='radio'){vRet=this.validators.checkedRadChk(obj,fElm)}
								vCode=vds[x].split(':')[1]
							}
							break;
							
						case 'selected' :
							if(argChk){(argSts)?'':argSts=this.validators.selectedChk(obj)}
							else{
								vRet=this.validators.selectedChk(obj);
								vCode=vds[x].split(':')[1]
							}
							break;

						case 'custom' :
							if(etr){obj.viewSrc();obVal=obj.cInput.val()}
							else{(obj.attr('placeholder') && obj.val()==obj.attr('placeholder'))?obVal='':obVal=obj.val()}
							if(argChk){
								var fnc = commonValidator.errs[vds[x].split(':')[1]],vR=fnc(obj);
								(vR.constructor===Object)?vR=vR.msg:'';
								(vR)?vR=true:vR;
								(argSts)?'':argSts=vR;
							}
							else if(commonValidator.errs[vds[x].split(':')[1]]){var fnc = commonValidator.errs[vds[x].split(':')[1]], vR=fnc(obj)}
							(vR.constructor===Object)?vRet=vR.msg:vRet=vR;
							vCode=vR;
							break;
							
						default :{break;}
			}}}
			if(argChk){return argSts}
			else{
				if(vRet && !sReq){this.heighlightErrOk(vCode,obj,fElm,'err',eC,oC,soC,inErr);commonValidator.lastErr=obj;return false}
				if(vRet && sReq){this.heighlightErrOk(vCode,obj,fElm,'sMnd',eC,oC,soC,inErr);commonValidator.lastErr=commonValidator.lastErr;return true}
				else{this.heighlightErrOk(vCode,obj,fElm,'ok',eC,oC,soC,inErr);return true;}
			}
	}},
			
	heighlightErrOk : function(vCode,obj,fElm,hTyp,eC,oC,soC,inErr){
		if(obj.obj){var etr=true;obj=$n(obj.obj)}else{etr=false}
		var x,errLbl=null, errM=commonValidator.errs[vCode] || vCode, errI=obj.attr('id')+'_err', errN=obj.attr('name')+'_err', frLbs=$n(fElm).childrens('.erLbl'), eArrIndx=obj.attr('id') || obj.attr('name');
		if(vCode.constructor === Object && !commonValidator.errs[vCode]){errM=vCode.msg;(vCode.id)?errI=errN=vCode.id:''}
		if(errM.constructor===Object){var eM=errM;errM=eM.msg;(eM.id)?errI=errN=eM.id:''}
		for(x=0;x<frLbs.length;x++){if(frLbs.eq(x).attr('id')==errI || frLbs.eq(x).attr('id')==errN){errLbl=frLbs.eq(x)}}
		if(hTyp=='err'){
			if(etr){obj.parent().removeClass(eC);obj.parent().removeClass(oC);obj.parent().removeClass(soC);obj.parent().addClass(eC)}
			else{obj.removeClass(eC);obj.removeClass(oC);obj.removeClass(soC);obj.addClass(eC)}
			if(errLbl){
				errLbl.removeClass(oC);errLbl.removeClass(soC);
				(errLbl.hasClass(eC)!=eC && inErr)?errLbl.addClass(eC):'';
				if(!etr){
				var minL=obj.attr('minL') || obj.attr('minlength'), maxL=obj.attr('maxL') || obj.attr('maxlength'), minV=obj.attr('minV') || obj.attr('minval'), maxV=obj.attr('maxV') || obj.attr('maxval'), errLblId=errLbl.attr('id');
				errM=errM.replace('[MinL]',minL).replace('[MaxL]',maxL).replace('[MinV]',minV).replace('[MaxV]',maxV).replace('[currVal]',obj.val().replace('<','&lt;').replace('>','&gt;'));
				}
				(inErr)?errLbl.html(errM):'';
				commonValidator.erArry[eArrIndx]=errM;
			}$n(fElm).attr('chk','true');
		}
		else if(hTyp=='ok'){
			if(etr){obj.parent().removeClass(eC);obj.parent().removeClass(oC);obj.parent().removeClass(soC);obj.parent().addClass(oC)}
			else{obj.removeClass(eC);obj.removeClass(oC);obj.removeClass(soC);obj.addClass(oC)}
			if(errLbl){errLbl.html('');errLbl.removeClass(eC);errLbl.removeClass(soC)}
		}
		else if(hTyp=='sMnd'){
			obj.removeClass(eC);obj.removeClass(oC);obj.removeClass(soC);obj.addClass(soC);
			if(errLbl){
				errLbl.removeClass(eC);errLbl.removeClass(oC);
				(errLbl.hasClass(soC)!=soC && inErr)?errLbl.addClass(soC):'';
				var minL=obj.attr('minL') || obj.attr('minlength'), maxL=obj.attr('maxL') || obj.attr('maxlength'), minV=obj.attr('minV') || obj.attr('minval'), maxV=obj.attr('maxV') || obj.attr('maxval'),errLblId=errLbl.attr('id');
				errM=errM.replace('[MinL]',minL).replace('[MaxL]',maxL).replace('[MinV]',minV).replace('[MaxV]',maxV).replace('[currVal]',obj.val().replace('<','&lt;').replace('>','&gt;'));
				(inErr)?errLbl.html(errM):'';
				commonValidator.erArry[eArrIndx]=errM;
			}
		}
		else if(hTyp=='rem'){
			obj.removeClass(eC);obj.removeClass(soC);
			if(errLbl){errLbl.html('');errLbl.removeClass(eC);errLbl.removeClass(soC)}
		}
	},
		
	validators : {
		reqChk:function(val,vCd){
			var regX=/^\s*$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			return (regX.test(val))?true:false
		},
		
		alphadsChk:function(val,vCd){
			var regX=/^[a-zA-Z.\s]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){
				val=this.trimVal(val);
				if(val.indexOf('.')==0){return true}
				else if(!regX.test(val)){return true}
				else{return false}
			}else{return false}
		},
		
		alphaChk:function(val,vCd){
			var regX=/^[a-zA-Z]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		numChk:function(val,vCd){
			var regX=/^[-]?[0-9]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		floatChk:function(val,vCd){
			var regX=/^[-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		alphanumChk:function(val,vCd){
			var regX=/^[a-zA-Z0-9]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		emailChk:function(val,vCd){
			var regX=/^([0-9a-zA-Z]([\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,4})$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		splChk:function(val,vCd){
			var regX=/^[a-zA-Z\d\s]+$/;
			if(commonValidator.errs[vCd]){regX=new RegExp(commonValidator.errs[vCd].regEx || regX)};
			if(val!=''){if(!regX.test(this.trimVal(val))){return true}else{return false}}else{return false}
		},
		
		rangeChk:function(val,minL,maxL,scop){
			if(!maxL || maxL==''){maxL=val.length+1}
			if(val!=''){
				var scop=scop||'in';
				if(scop=='in'){if(val.length<minL || val.length>maxL){return minL+':'+maxL}else{return false}}
				else if(scop=='out'){if(val.length>minL){if(val.length<maxL){return minL+':'+maxL}}else{return false}}
			}else{return false}
		},
		
		rangeVChk:function(val,minV,maxV,scop){
			if(val!=''){
				var scop=scop||'in';
				if(scop=='in'){if(parseFloat(this.trimVal(val))<minV || parseFloat(this.trimVal(val))>maxV){return minV+':'+maxV}else{return false}}
				else if(scop=='out'){if(parseFloat(this.trimVal(val))>minV){if(parseFloat(this.trimVal(val))<maxV){return minV+':'+maxV}}else{return false}}
			}else{return false}
		},
		
		checkedRadChk:function(elm,frm){
			var x, f=false, fElm=$n(frm).childrens("input:radio");
			for(x=0;x<fElm.length;x++){if(fElm.eq(x).attr('name')==elm.attr('name')){(fElm.eq(x).currObj().checked==true)?f=true:'';}}
			return (f)?ret=false:ret=true;
		},
		
		//checkedChk:function(elm){return (elm.currObj().checked==true)?false:true},
		checkedChk:function(elm,frm){
			var x, f=false, fElm=$n(frm).childrens("input:checkbox");
			for(x=0;x<fElm.length;x++){if(fElm.eq(x).attr('name')==elm.attr('name')){(fElm.eq(x).currObj().checked==true)?f=true:'';}}
			return (f)?ret=false:ret=true;
		},
		
		checkedChkSrv:function(val){return (val==null || val=="")?true:false},
				
		selectedChk:function(elm){return (elm.currObj().selectedIndex!=0)?false:true},
		
		selectedChkSrv:function(val,dVal){return (val==dVal)?true:false},
		
		trimVal : function(val){var val=val.replace(new RegExp("^[\\s]+", "g"), "");val=val.replace(new RegExp("[\\s]+$", "g"), "");return val}
	},
	
	getFrmElms : function(frmElm,fg){
		var x, els=[], fElms=frmElm.currObj().elements;
		for(x=0;x<fElms.length;x++){
			var nodNam = fElms[x].nodeName.toLowerCase();
			if(fg){if((nodNam=='input' || nodNam=='select' || nodNam=='textarea') && $n(fElms[x]).attr('type')!='submit' && $n(fElms[x]).attr('placeholder')!=''){els.push($n(fElms[x]))}}
			else{if((nodNam=='input' || nodNam=='select' || nodNam=='textarea') && $n(fElms[x]).attr('type')!='submit' && $n(fElms[x]).attr('rel') && $n(fElms[x]).attr('rel')!=''){els.push($n(fElms[x]))}}
		}
		return els;
	},
	
	getSbtBtns : function(frmElm,sB){
		var x, y, els=[], fElms=frmElm.childrens();
		if(frmElm.childrens("input:submit").length>0){els.push(frmElm.childrens("input:submit"))}
		if(frmElm.childrens("button:submit").length>0){els.push(frmElm.childrens("button:submit"))};
		if(sB){if(sB.constructor===Array){for(y=0;y<sB.length;y++){els.push($n('#'+sB[y]))}}else{els.push($n('#'+sB))}}
		return els;
	},
	
	hideElement : function(elmIds){
		var x,elmIds = elmIds || null;
		if(elmIds){if(elmIds.constructor===Array){for(x=0;x<elmIds.length;x++){this.processAltRel(elmIds[x],'h')}}else{this.processAltRel(elmIds,'h')}}
	},
	
	showElement : function(elmIds){
		var x,elmIds = elmIds || null;
		if(elmIds){if(elmIds.constructor===Array){for(x=0;x<elmIds.length;x++){this.processAltRel(elmIds[x],'s')}}else{this.processAltRel(elmIds,'s')}}
	},
	
	processAltRel : function(eId,stat){
		if(stat=='s'){$n('#'+eId).attr('rel',$n('#'+eId).attr('altrel'))}
		else if(stat=='h'){($n('#'+eId).attr('altrel'))?'':$n('#'+eId).attr('altrel',$n('#'+eId).attr('rel'));$n('#'+eId).removeAttr('rel')}
	},
	
	supportPlaceholder : function(){var x = document.createElement('input');return ('placeholder' in x)},
	
	checkEditor : function(o){
		var attrEdtr = o.attr('editor');
		if(attrEdtr && attrEdtr!=''){
			return eval(attrEdtr);
		}
	},
	
	fillVal : function(arr){if(arr.constructor===Object){for(var x in arr){$n('#'+x).val(arr[x]).currObj().style.color = ''}}}
}