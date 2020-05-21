//Suggestor
var suggester = function (a) {
    var obj = this;
    var obj2 = '';
    var suggCount = '';
    if (!(a && typeof a == 'object')) { return false };//handling arguments

    obj2 = (a.sTextBox) ? $n('#' + a.sTextBox) : ''; (obj2) ? obj2.attr('value', '') : '';

    suggCount = (a.countSugg) ? a.countSugg : false;
    obj.id = $n(a.id[0]);
    obj.url = a.url;
    obj.layer = null;
    obj.layer2 = null;
    obj.cur = -1;
    obj.startVal = a.startVal;
    obj.position = 0;
    obj.client = a.client;
    obj.suggestions = a.arry || [];
    obj.ob = obj.id.currObj();
    obj.val4 = '';
    obj.suggCount1 = 0;
    obj.reqsess = '';
    obj.app_id = a.app_id;
    obj.suggestorName = a.suggestorName;
    obj.countPage = 0;
    obj.aSuggestions = [];
    obj.objNew = a.objNew;
    obj.serverArray = [];
    obj.width = a.width;
    obj.suggheading = a.suggheading;
    obj.callback = a.callback;
    obj.init = function () {
        /* my code */

        obj.flagForCreate = 0;
        obj.requestKeyword();
        var oEvent = (!oEvent) ? window.event : oEvent;
        for (var x = 0; x < a.id.length; x++) {
            obj.id = $n(a.id[x])
            obj.id.addEvent('keyup', function (oEvent) {
                if (!obj.flagForCreate) {
                    obj.createDropDown();
                    obj.flagForCreate = 1;
                }
                obj.id = $n(this); obj.ob = obj.id.currObj();
                if (a.domain) {
                    var reg = /\@[A-Z,0-9,a-z]{1}/;
                    var objVal = obj.id.attr('value');
                    if (!reg.test(objVal)) { obj.hideSuggestions(); return false; }
                }
                obj.handleKeyUp(oEvent);
            }).addEvent('keydown', function (oEvent) { obj.id = $n(this); obj.ob = obj.id.currObj(); obj.handleKeyDown(oEvent) }).addEvent('blur', function () { obj.id = $n(this); obj.ob = obj.id.currObj(); obj.hideSuggestions() });
        }


    }//init function end here	

    obj.requestKeyword = function (url) {						// save data on client machine
        if (obj.url && obj.client != 'server') {
            obj.callTheJsonp((url || obj.url + "?q=&app_id=" + obj.app_id + '&suggestor=' + obj.suggestorName + '&offset=' + 500 * obj.countPage + '&limit=500&callback=' + obj.objNew + '.parseRequest'))
        }
    }

    obj.callTheJsonp = function (url) {
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    obj.parseRequest = function (resp) {
        if (resp == 'ERROR') {
            return false;
        }
        for (var x in resp) {
            if (x != 'CONTD...')
                obj.suggestions[x] = resp[x]
            else if (x == 'CONTD...') {
                obj.countPage++;
                obj.requestKeyword(obj.url + "?q=&app_id=" + obj.app_id + '&suggestor=' + obj.suggestorName + '&offset=' + ((500 * obj.countPage) + 1) + '&limit=500&callback=' + obj.objNew + '.parseRequest');
            }
        }
    }

    obj.requestKeywordOnRequest = function (url, keyword) {
        if (url && obj.client == 'server') {
            keyword = decodeURIComponent(keyword).replace(/[\s]+/g, " ").replace(/^\s/, "");
            keyword = keyword.split(',');
            var lastKeyword = $n.trim(keyword[keyword.length - 1]).toLowerCase();
            obj.lastKeyword = lastKeyword;
            if (obj.serverArray[lastKeyword]) {
                obj.handlekeywordOnRequest(obj.serverArray[lastKeyword]);
                return false;
            }

            obj.callTheJsonp(url + "?q=" + encodeURIComponent(lastKeyword) + "&app_id=" + obj.app_id + '&suggestor=' + obj.suggestorName + '&offset=0&limit=' + suggCount + '&callback=' + obj.objNew + '.handlekeywordOnRequest')
        }
    }

    obj.handlekeywordOnRequest = function (resp) {
        obj.suggestions = resp;
        if (Object.prototype.toString.call(resp) === "[object Array]" && resp.length == 0)
            return false;
        var bTypeAhead = false;
        obj.aSuggestions.length = 0;

        var sTxtValue = obj.id.val();
        //			var splitTxtValue=sTxtValue.split(',')
        //			obj.serverArray[($n.trim(splitTxtValue[splitTxtValue.length-1])).toLowerCase()]=resp;
        obj.serverArray[obj.lastKeyword] = resp;
        obj.position = $n(obj.ob).position();
        obj.val4 = '';
        if (sTxtValue.length > obj.startVal) {
            obj.showBold(sTxtValue);
        }
        obj.reqautoSuggest(bTypeAhead);

    }

    obj.showBold = function (sTxtValue) {
        sTxtValue = sTxtValue.replace(/&amp;/gi, '&');
        for (var i in obj.suggestions) {
            if (typeof obj.suggestions[i] != 'function') {

                obj.suggestions[i] = (obj.suggestions[i]).replace(/&amp;/gi, '&')
                if (a.domain) {
                    var setTxtVal = sTxtValue.split('@');
                    if (obj.suggestions[i].indexOf(setTxtVal[1].toLowerCase()) == 0) { obj.aSuggestions.push(setTxtVal[0] + '@' + obj.suggestions[i]) }
                } else {
                    var val2 = sTxtValue.split(',');
                    if (val2[1]) {
                        obj.val4 = '';
                        sTxtValue = val2[val2.length - 1];
                        for (var k = 0; k < (val2.length - 1); k++) {
                            obj.val4 += $n.trim(val2[k]) + ', ';
                        }
                    }

                    sTxtValue = sTxtValue.replace(/[\s]+/g, " ").replace(/^\s/, "");
                    if (sTxtValue.length > obj.startVal) {
                        var str = obj.suggestions[i];
                        var getPos = (str.toLowerCase()).indexOf(sTxtValue.toLowerCase());
                        var strLower = str.toLowerCase();
                        var sTxtValueLower = sTxtValue.toLowerCase();
                        var spaceVal = ((strLower.indexOf(' ' + sTxtValueLower)) < 0) ? false : strLower.indexOf(' ' + sTxtValueLower);
                        var bracketVal = ((strLower.indexOf('(' + sTxtValueLower)) < 0) ? false : strLower.indexOf('(' + sTxtValueLower);
                        var slashVal = ((strLower.indexOf('/' + sTxtValueLower)) < 0) ? false : strLower.indexOf('/' + sTxtValueLower);
                        if (getPos >= 0 && ((spaceVal || bracketVal || slashVal)) || getPos == 0) {
                            if (getPos) {
                                if (spaceVal) {
                                    getPos = spaceVal + 1
                                } else if (bracketVal) {
                                    getPos = bracketVal + 1
                                } else if (slashVal) {
                                    getPos = slashVal + 1
                                }
                            }
                            var new1 = str.substr(0, getPos);
                            var e = '<b>' + str.substr(getPos, sTxtValue.length) + '</b>';
                            var new2 = str.substr(getPos + sTxtValue.length, str.length);
                            obj.aSuggestions.push(new1 + e + new2);
                        }
                    }
                }
            }
        }
    }
    obj.ajax = function (url, callback) {
        $n(document).ajaxReq({
            url: url,
            datatype: 'json',
            data: '',
            success: function (resp) {
                callback(resp)
            },
            error: function () {
                alert('Reqest not complete');
            }
        });
    }
    obj.requestSuggestions = function (bTypeAhead) {		// on request data received.
        obj.aSuggestions.length = 0;
        var sTxtValue = obj.id.attr('value');
        obj.position = $n(obj.ob).position();
        obj.val4 = '';
        if (sTxtValue.length > obj.startVal) {
            clearTimeout(obj.reqsess)
            if (obj.url && obj.client == 'server') {
                obj.reqsess = setTimeout(function () {
                    obj.requestKeywordOnRequest(obj.url, encodeURIComponent(sTxtValue));
                }, 400);
            }
            else {
                obj.showBold(sTxtValue);
            }
        }
        else {
            obj.hideSuggestions(); return false;
        }
        obj.reqautoSuggest(bTypeAhead)

    }//RequestSuggestion	

    obj.reqautoSuggest = function (bTypeAhead) {
        if ((obj.aSuggestions.length > 0) && (suggCount)) { obj.aSuggestions = obj.aSuggestions.slice(0, suggCount); }
        obj.autosuggest(obj.aSuggestions, bTypeAhead);
        obj.id.setFocus();
        /*
		obj.selectRange(obj.id.attr('value').length, obj.id.attr('value').length)
		obj.id.attr('value', obj.id.attr('value'));
		setTimeout(function(){obj.id.setFocus()}, 10)		
        */
    }

    obj.autosuggest = function (sSuggestions, bTypeAhead) {

        if (sSuggestions.length > 0) {
            if (bTypeAhead) { obj.typeAhead(sSuggestions[0]) }
            obj.showSuggestions(sSuggestions);
        } else { obj.hideSuggestions(); }
    }//autosuggest end here	

    obj.typeAhead = function (sSuggestions) {
        if (obj.id.currObj().createTextRange || obj.id.currObj().setSelectionRange) {
            if (obj2) { obj2.attr('value', sSuggestions) }
            else {
                var iLen = obj.id.attr('value').length;
                obj.id.attr('value', sSuggestions);

                obj.selectRange(iLen, sSuggestions.length)
            }
        }
    }//typeAhead end here			

    obj.selectRange = function (iStart, iEnd) {
        if (obj.id.currObj().createTextRange) {
            var oRng = obj.id.currObj().createTextRange();
            oRng.moveStart('character', iStart);
            oRng.moveEnd('character', iEnd - obj.id.attr('value').length)
            oRng.select();
        }
        else if (obj.id.currObj().setSelectionRange) { obj.id.currObj().setSelectionRange(iStart, iEnd) }
        obj.id.setFocus();
    }//selectRange end here

    obj.handleKeyDown = function (oEvent) {
        switch (oEvent.keyCode) {
            case 38://up arrow
                obj.previousSuggestion();
                break;
            case 39://right arrow
                obj.currentSuggestion(oEvent);
                break;
            case 40: //down arrow
                obj.nextSuggestion();
                break;
            case 13: //enter
                var divObj = (obj.layer) ? obj.layer.childrens('div') : '';
                for (var i = 0; i < divObj.length; i++) {
                    var curObj = divObj.eq(i)
                    if (curObj.getStyle(obj.layer.currObj(), 'visibility') == 'visible' && curObj.hasClass('current') == 'current') {
                        //obj.id.currObj().blur();

                        obj.id.attr('value', (obj.val4 + curObj.text()).replace(/&amp;/gi, '&'));
                        (obj2) ? obj2.attr('value', (obj.val4 + curObj.text()).replace(/&amp;/gi, '&')) : '';
                        obj.id.setFocus();
                        obj.selectRange(obj.id.attr('value').length, obj.id.attr('value').length)
                        obj.id.attr('value', obj.id.attr('value'));
                        setTimeout(function () { obj.id.setFocus() }, 10)
                        $n.preventDefault(oEvent);
                        if (obj.callback)
                            obj.callback();

                    }
                }

                obj.hideSuggestions(); return false;
                break;
        }
    }//handleKeyDown

    obj.handleKeyUp = function (oEvent) {
        var iKeyCode = oEvent.keyCode;
        if (iKeyCode == 8 || iKeyCode == 46) {//backspace and del
            obj.cur = -1;
            (obj2) ? obj.requestSuggestions(true) : obj.requestSuggestions(false)
        }
        else if (iKeyCode < 32 || (iKeyCode >= 33 && iKeyCode <= 46) || (iKeyCode >= 112 && iKeyCode <= 123)) { }
        else { (obj2 || a.typeahead) ? obj.requestSuggestions(true) : obj.requestSuggestions(false) }
    }//handleKeyUp end	

    obj.hideSuggestions = function () {// Added for xtra funct.
        if (obj.layer) {
            obj.layer.html('');
            obj.layer.css({ visibility: 'hidden' });
            obj.layer2.css({ visibility: 'hidden' });
            (obj2) ? obj2.attr('value', '') : '';
            obj.cur = -1;
        }
    }//hideSuggestions

    obj.highlightSuggestion = function (oSuggestionNode) {// Added for xtra funct.
        for (var i = 0; i < obj.layer.childrens('div').length; i++) {
            var oNd = obj.layer.childrens('div').eq(i);
            if (oNd.currObj() == oSuggestionNode.currObj()) { oNd.addClass('current'); obj.cur = i; }
            else if (oNd.hasClass('current')) { oNd.changeClass('') }
        }
    }//highlightSuggestion

    obj.nextSuggestion = function () {
        var cSuggestionNodes = obj.layer.childrens('div');
        if (cSuggestionNodes.length > 0 && obj.cur < cSuggestionNodes.length - 1) {
            var oNode = cSuggestionNodes.eq(++obj.cur);
            obj.highlightSuggestion(oNode);
            obj.id.attr('value', (obj.val4 + oNode.text()).replace(/&amp;/gi, '&'));
            (obj2) ? obj2.attr('value', (obj.val4 + oNode.text()).replace(/&amp;/gi, '&')) : '';
            obj.id.setFocus();
            obj.selectRange(obj.id.attr('value').length, obj.id.attr('value').length)
            obj.id.attr('value', obj.id.attr('value'));
            setTimeout(function () { obj.id.setFocus() }, 100)
        }
        else if (cSuggestionNodes.length > 0) {
            obj.cur = -1;
            var oNode = cSuggestionNodes.eq(++this.cur);
            obj.highlightSuggestion(oNode);
            obj.id.attr('value', (obj.val4 + oNode.text()).replace(/&amp;/gi, '&'));
            (obj2) ? obj2.attr('value', (obj.val4 + oNode.text()).replace(/&amp;/gi, '&')) : '';
            obj.id.setFocus();
            obj.selectRange(obj.id.attr('value').length, obj.id.attr('value').length)
            obj.id.attr('value', obj.id.attr('value'));
            setTimeout(function () { obj.id.setFocus() }, 100)

        }
    }//nextSuggestion

    obj.previousSuggestion = function () {
        var cSuggestionNodes = obj.layer.childrens('div');
        obj.cur--;
        if (cSuggestionNodes.length > 0 && obj.cur > -1) {
            var oNode = cSuggestionNodes.eq(obj.cur);
            obj.highlightSuggestion(oNode);
            obj.id.attr('value', (obj.val4 + oNode.text()).replace(/&amp;/gi, '&'));
            (obj2) ? obj2.attr('value', (obj.val4 + oNode.text()).replace(/&amp;/gi, '&')) : '';
            obj.id.setFocus();
            obj.selectRange(obj.id.attr('value').length, obj.id.attr('value').length)
            obj.id.attr('value', obj.id.attr('value'));
            setTimeout(function () { obj.id.setFocus() }, 100)
        }
        else if (cSuggestionNodes.length > 0) {
            obj.cur = cSuggestionNodes.length - 1;
            var oNode = cSuggestionNodes.eq(obj.cur);
            obj.highlightSuggestion(oNode);
            obj.id.attr('value', (obj.val4 + oNode.text()).replace(/&amp;/gi, '&'));
            (obj2) ? obj2.attr('value', (obj.val4 + oNode.text()).replace(/&amp;/gi, '&')) : '';
            obj.id.setFocus();
            obj.selectRange(obj.id.attr('value').length, obj.id.attr('value').length)
            obj.id.attr('value', obj.id.attr('value'));
            setTimeout(function () { obj.id.setFocus() }, 100)
        }
    }//previousSuggestion

    obj.currentSuggestion = function (e) {
        var iCaretPos = 0;
        if (document.selection) { //for IE
            obj.id.setFocus();
            var oSel = document.selection.createRange();
            oSel.moveStart('character', -obj.id.attr('value').length);
            iCaretPos = oSel.text.length;
        }
        // Firefox support
        else if (obj.id.currObj().selectionStart || obj.id.currObj().selectionStart == '0') { iCaretPos = obj.id.currObj().selectionStart; }
        if (obj.id.attr('value').length == iCaretPos) {

            if (obj.layer.first()) {
                var cN = obj.layer.childrens('div').eq((obj.cur >= 0) ? obj.cur : 0);
                obj.id.attr('value', (obj.val4 + cN.text()).replace(/&amp;/gi, '&'));
                (obj2) ? obj2.attr('value', (obj.val4 + cN.text()).replace(/&amp;/gi, '&')) : '';
                obj.id.setFocus();
                obj.selectRange(obj.id.attr('value').length, obj.id.attr('value').length)
                obj.id.attr('value', obj.id.attr('value'));
                setTimeout(function () { obj.id.setFocus() }, 10)
                $n.preventDefault(e);

                obj.hideSuggestions();
            }
        }
        else { return false }
    }//currentSuggestion end here

    obj.createDropDown = function () {
        obj.layer = $n('<div>').addClass('suggestions').css({ visibility: 'hidden', top: '-1000px' });

        //obj.layer=$n('div.suggestions');
        obj.layer2 = $n('<iframe>');
        obj.layer2.addClass('suggestions2').css({ visibility: 'hidden', top: '-1000px' });
        obj.layer2.attr({ scrolling: 'no', frameborder: '0', marginheight: '0', marginwidth: '0' });
        $n('body').append(obj.layer.currObj());
        $n('body').append(obj.layer2.currObj());
        var events = ['mousedown', 'mouseover', 'mouseup'];
        for (var i in events) {
            (function () {
                var cevnt = events[i];
                // obj.layer=$n('.suggestions');
                obj.layer.addEvent(cevnt, function (oEvent) {
                    oTarget = $n(oEvent.target || oEvent.srcElement);
                    if (oEvent.type == 'mousedown') {
                        obj.id.attr('value', (obj.val4 + oTarget.text()).replace(/&amp;/gi, '&'));

                        (obj2) ? obj2.attr('value', (obj.val4 + oTarget.text()).replace(/&amp;/gi, '&')) : '';
                        obj.hideSuggestions();
                        obj.id.setFocus();
                        obj.selectRange(obj.id.attr('value').length, obj.id.attr('value').length)
                        obj.id.attr('value', obj.id.attr('value'));

                        setTimeout(function () { obj.id.setFocus() }, 10)
                        $n.preventDefault(oEvent);
                        if (obj.callback)
                            obj.callback();
                    }
                    else if (oEvent.type == 'mouseover') { obj.highlightSuggestion(oTarget); }
                    else { obj.id.setFocus() }



                });

            })();

        }

    }//createDropDown

    obj.showSuggestions = function (aSuggestions) {
        var oDiv = null;
        //		obj.width = (obj.width == 'fixed') ? obj.id.width()-5 : 'auto';
        obj.layer.html('').css({ 'width': 'auto' });
        //append heading here;
        //var headtxt="<div class=\'sugghead\'>"+obj.suggheading+"</div>"
        //obj.layer.append(headtxt);
        for (var i = 0; i < aSuggestions.length; i++) {

            oDiv = $n('<div>').append(aSuggestions[i]);
            obj.layer.append(oDiv.currObj());

        }
        var getPadding = ($n.brewser().name == 'msie' && $n.brewser().version == '6.0') ? 2 : 0;
        var widthLayer = (obj.width == 'fixed') ? obj.id.width() : (obj.id.width() > obj.layer.width()) ? obj.id.width() : (obj.layer.width() + 5);
        obj.layer.css({ left: obj.id.position().left + 'px', top: (obj.id.position().top + obj.id.height()) + 'px', width: widthLayer - getPadding + 'px', visibility: 'visible' });
        obj.layer2.css({ left: obj.id.position().left + 'px', top: (obj.id.position().top + obj.id.height()) + 'px', width: widthLayer + 'px', height: obj.layer.height() + 'px', visibility: 'visible' })
    }//showSuggestions
    obj.init();
};
suggester.prototype.addPeople = function (e) {
    if (!(e && typeof e == 'object')) { return false };
    var obj = this,
        ulist = $n('<ul>');
    obj.selected_arr = e.selected_arr || [];
    obj.divid = e.divid || null;
    obj.addbtn = $n(e.addbtn);
    obj.duplicate = e.duplicate || null;
    obj.curentob = obj.ob;
    ulist.attr('id', obj.divid + '_ul');
    ulist.addClass(obj.divid);

    obj.addData = function (a, b) {

        var k = a, data = b, rid,
            spn = $n('<em>'),
            anc = $n('<a>');
        anc.attr({ 'href': 'javascript:void(0);', 'rel': k });
        anc.addClass('del_ic fr');
        anc.addEvent('click', function () {
            rid = ($n(this).attr('rel'));
            obj.suggestions[k];
            obj.suggestions[rid] = obj.selected_arr[rid];
            delete obj.selected_arr[$n(this).attr('rel')];
            $n(this).parent().remove();
        });
        var list = ulist.append($n('<li>').append(spn.append(data[k])).append(anc));
        $n('#' + obj.divid).append(list);

        (!(obj.duplicate)) ? (delete obj.suggestions[k]) : '';
    }
    if (typeof obj.selected_arr == 'object') {
        for (var i in obj.selected_arr) {
            obj.addData(i, obj.selected_arr);
        }
    }
    obj.populateData = function () {
        for (var i in obj.suggestions) {
            if (obj.curentob.value == obj.suggestions[i] && obj.curentob.value != '') {
                obj.selected_arr[i] = obj.curentob.value;
                obj.addData(i, obj.suggestions);

            }
        }
        obj.curentob.value = '';
    }
    obj.addbtn.addEvent('click', function () {
        obj.populateData()

    },
        $n(obj.curentob).addEvent('keydown', function (oEvent) {
            if (oEvent.keyCode === 13) {
                obj.populateData()
            }
        })

    )
};
//suggester end here


function getDocExtent() {
    var D = document;
    return {
        height: Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        ),
        width: Math.max(
            Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
            Math.max(D.body.clientWidth, D.documentElement.clientWidth)
        )
    }
}



function setpossnow(o) {

    var thisobj = o.nmenu,
        dropdown = o.dropdown;

    dropdown.addEvent('click', function (e) {
        if (!e) var e = window.event;
        (e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
    });

    var nmenu_position = thisobj.position(),
        nmenu_width = thisobj.width(),
        nmenu_height = thisobj.height(),
        dropdown_width = dropdown.width(),
        dropdown_height = dropdown.height(),
        droptip = dropdown.childrens('.' + o.droptipUpC),
        outarrow = (o.nmenuArrowC) ? thisobj.childrens(o.nmenuArrowC) : thisobj;

    function configposition() {
        var bodybottom = getDocExtent();
        var nmenubottom = nmenu_position.top + nmenu_height + dropdown_height;
        if (nmenubottom < bodybottom.height) {
            return true;
        }
        return false;
    }
    $n('html').addEvent('click', function () { dropdown.hide() });

    var menuposition = configposition();

    var dropLeft = nmenu_width - dropdown_width,
        nmenu_arrow = outarrow,
        nmenu_arrow_height = nmenu_arrow.height(),
        nmenu_arrow_rect = nmenu_arrow.currObj().getBoundingClientRect(),
        droptip_height = droptip.height(),
        droptipLeft = (((nmenu_arrow_rect.left - nmenu_position.left) + (nmenu_arrow.width() / 2)) - (droptip.width() / 2) - dropLeft);
    //console.log(nmenu_position.left,nmenu_width,dropdown_width)
    if (menuposition) {
        dropdown.css({ 'left': (dropLeft + nmenu_position.left + 10) + 'px', 'bottom': 'auto', 'top': (nmenu_position.top + nmenu_height + droptip.height()) + 'px' });
        droptip.css({ 'left': droptipLeft - 10 + 'px', 'bottom': 'auto', 'top': '-' + (droptip_height - 1) + 'px' })
        if (droptip.hasClass('menuDownIc') == 'menuDownIc') { droptip.removeClass('menuDownIc').addClass('topArowIc') } else { droptip.addClass('topArowIc') }

    } else {

        dropdown.css({ 'left': (dropLeft + nmenu_position.left + 10) + 'px', 'top': 'auto', 'top': (nmenu_position.top - dropdown_height - droptip.height()) + 'px' })
        droptip.css({ 'left': droptipLeft - 10 + 'px', 'top': 'auto', 'bottom': '-' + (droptip_height - 1) + 'px' });
        if (droptip.hasClass('menuDownIc') == 'menuDownIc') { droptip.removeClass('menuDownIc').addClass('menuDownIc') } else { droptip.addClass('menuDownIc') }




    }
    var tpt = dropdown.position();
    $n('iframe#nifr').css({ 'width': dropdown_width + 'px', 'height': dropdown_height + 'px', 'left': tpt.left + 'px', 'top': tpt.top + 'px' });

}

/** Function : Wrapper for core lightBox
	Maps contId with lightBox object, thus allowing simply calling lightBox function
*/

function lightBox(arr) {

    if (typeof ltBox == 'undefined') {
        ltBox = {};
        ltBox.stack = []
        ltBox.stack.indexOf = Array.prototype.indexOf || function (obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
        window.hideLayer = function () {
            if (ltBox.stack.length) {
                ltBox.stack.pop().hideLayer();
            }
        }

        $n(document.body).addEvent('keyup', function (e) {

            var e = e || window.event;
            var len = ltBox.stack.length;
            if (e.keyCode == 27 && len) {
                if (ltBox.stack[len - 1].escapeObj)
                    hideLayer();
            }
        });

        /** Get max width and height of scroller*/
        ltBox.getDocExtent = function () {

            var D = document;
            return {
                height: Math.max(
                    Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                    Math.max(D.body.clientHeight, D.documentElement.clientHeight)
                ),
                width: Math.max(
                    Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
                    Math.max(D.body.clientWidth, D.documentElement.clientWidth)
                )
            }
        }

        ltBox.resetOnRestart = function (evType, len) {

            if (typeof ltBox != "undefined" && (len = ltBox.stack.length)) {
                for (var i = 0; i < len; i++) {
                    if (evType != 'scroll')
                        ltBox.stack[i].centerLayer();
                    ltBox.stack[i].resizeOverLay();
                }
            }

        }

        var resize = window.onresize;
        window.onresize = function () {
            (resize || function () { })();
            ltBox.resetOnRestart();
        }

        var scroll = window.onscroll;
        window.onscroll = function () {
            (scroll || function () { })();
            var new_scrollHeight = ltBox.getDocExtent().height;
            if ((ltBox.prev_scrollHeight || 0) != new_scrollHeight) {
                ltBox.resetOnRestart('scroll');
                ltBox.prev_scrollHeight = ltBox.getDocExtent().height;
            }
        }

    }

    if (!ltBox[arr.contId]) {
        ltBox[arr.contId] = new core_lt(arr);
        var a = document.createDocumentFragment();
        a.appendChild(ltBox[arr.contId].contId.currObj());
        $n('body').prepend($n(a));
    }


    ltBox[arr.contId].showLayer(arr);

    /** Logic to maintain stack of lightbox, in order of their opening */
    var pushBox = ltBox[arr.contId];
    var index = ltBox.stack.indexOf(ltBox[arr.contId]);

    /** If lightBox alerady at top of stack*/
    if (ltBox.stack.length && index == ltBox.stack.length - 1)
        return;
    else {
        /** If lightBox already exist need to bring at top of statck*/
        if (index != -1)
            pushBox = ltBox.stack.splice(index, 1)[0];

        /** Reinitalize or update z-index*/
        pushBox.frame.currObj().style.zIndex = !ltBox.stack.length ? (ltBox.zIndex = 999) : ++ltBox.zIndex;
        pushBox.layer.currObj().style.zIndex = ++ltBox.zIndex;
        pushBox.contId.currObj().style.zIndex = ++ltBox.zIndex;


        ltBox.stack.push(pushBox);
    }
}


function core_lt(arr) {
    var n = this;
    n.contId = $n('#' + arr.contId);

    n.initVar = function (larr) {

        //Fix for closeBtn and close property ambiguity

        larr.close = larr.close || larr.closeBtn

        n.closeB = $n('#' + larr.close);

        n.hideCallBack = larr.hideCallBack;
        n.formEle = '';
        n.currObj = "";
        n.escapeObj = larr.ecp;
        n.returnFocus = larr.returnFocus;
        n.trigger = $n('#' + larr.trigger);
        n.shouldNotFocusElements = larr.shouldNotFocusElements || false;
        n.fixedLayer = larr.fixedLayer;

        n.contWidth = larr.contWidth;

        n.afterClosedFocus = larr.afterClosedFocus;
        n.reset = larr.reset;
        n.firstFocus = larr.firstFocus;
    }

    n.initVar(arr);

    var scrollHeight, scrollWidth;

    n.getTop = function () {
        var DocH = document.documentElement.clientHeight,
            objH = n.contId.height();
        DocH = (DocH > objH) ? (DocH - objH) : 0;
        return DocH;
    }

    n.getLeft = function () {
        var DocW = document.documentElement.clientWidth,
            objW = n.contId.width();
        DocW = (DocW > objW) ? (DocW - objW) : 0;
        return DocW;
    }

    n.centerLayer = function () {

        var browserName = navigator.appName;
        var browserVer = parseInt(navigator.appVersion);

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

        if (browserName == "Microsoft Internet Explorer" && browserVer >= 4) {

            if (ltBox.stack.indexOf(n) == -1 && !n.windowscroll) {
                n.windowscroll = true;
                n.contId.css({
                    'position': 'absolute'
                })
                var a = window.onscroll || function () { };

                window.onscroll = function () {
                    a();
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
                    if (n.fixedLayer) {
                        n.contId.css({
                            top: n.getTop() / 2 + scrollTop + "px"
                        })
                        n.contId.css({
                            left: n.getLeft() / 2 + scrollLeft + "px"
                        });
                    }
                }
            }

            var val_y = n.getTop() / 2 + scrollTop;
            var val_x = n.getLeft() / 2 + scrollLeft;
            n.contId.css({
                "top": val_y + "px",
                "left": val_x + "px"
            })

        } else {
            if (n.fixedLayer) {
                n.contId.css({
                    top: n.getTop() / 2 + "px"
                })
                n.contId.css({
                    left: n.getLeft() / 2 + "px"
                });
            } else {
                n.contId.css({
                    top: n.getTop() / 2 + scrollTop + "px"
                })
                n.contId.css({
                    left: n.getLeft() / 2 + scrollLeft + "px"
                });

            }
        }

        if (!n.fixedLayer)
            n.contId.css({
                'position': 'absolute'
            })
        else if (!(browserName == "Microsoft Internet Explorer" && browserVer >= 4)) //As IE6 showing wiered result with foxed position
            n.contId.css({
                'position': 'fixed'
            })


    }



    n.resetLayer = function () {

        if (n.reset == false)
            return false;

        n.formOb = $n('#' + n.contId.attr('id') + ' form');
        for (var i = 0; i < n.formOb.length; i++) {
            n.formOb.eq(i).currObj().reset()
        }


    }
    var p = 0;

    /** Provide invisible Anchor, as a true JS Object*/
    n.makeInvisibleAnchor = function () {
        var iAnchor = $n('<a>');
        iAnchor.attr('href', 'javascript:void(0)')
        iAnchor.addClass('viewout1')
        iAnchor.html('&nbsp;')
        return iAnchor.currObj();
    }

    /** Initialise FAnchor and LAnchor*/
    n.firstLastNew = function () {

        n.contId.FAnchor = $n(n.makeInvisibleAnchor());
        n.contId.FAnchor.addClass('falink');
        n.contId.prepend(n.contId.FAnchor);

        n.contId.LAnchor = $n(n.makeInvisibleAnchor());
        n.contId.LAnchor.addClass('falink');
        n.contId.append(n.contId.LAnchor);

    }

    n.overLay = function () {
        if (!n.layer && !n.frame) {
            n.layer = $n('<div>');
            n.layer.addClass('layer');
            $n('body').append(n.layer);
            n.frame = $n('<iframe>');
            n.frame.addClass('ifrm');
            n.frame.attr('scrolling', 'no');
            n.frame.attr('frameborder', 0);
            $n('body').append(n.frame);
            var scrollW = document.body.scrollWidth - document.body.offsetWidth;
            var scrollH = document.body.scrollHeight - document.body.offsetHeight;
            n.resizeOverLay();


            n.layer.addEvent('click', function () {

                if (n.returnFocus == true) {

                    if (n.formEle)
                        n.formEle.setFocus();
                }
            })
        } else {
            n.layer.show();
            n.frame.show();
        }
    }

    /** Get computed style of an element*/
    n.getStyleProp = function (elem, prop) {
        if (window.getComputedStyle)
            return window.getComputedStyle(elem, null).getPropertyValue(prop);
        else if (elem.currentStyle)
            return elem.currentStyle[prop]; //IE
    }

    /** Check if obj is focusable*/
    n.isFocusable = function (obj) {
        //Taking care of obj as null
        if (!obj)
            return false;
        var focusElem = {
            'INPUT': true,
            'BUTTON': true,
            'TEXTAREA': true,
            'SELECT': true,
            'A': true
        };
        var nodeName = obj['nodeName'];

        var extraCondition = function () {
            if (n.firstVw) {
                var a = ($n(obj).currObj() == n.closeB.currObj());
                if (a) {
                    n.firstVw = !n.firstVw;
                    return !a;
                }
            }
            return true;
        }
        if ((focusElem[nodeName] && extraCondition() && obj.nodeType == 1 && !$n(obj).hasClass('falink')) || $n(obj).hasClass('ltFocusable'))
            return true;
        return false;
    }

    /** Check if element is hidden or not */
    n.isHidden = function (obj) {
        if (obj.type != 'hidden' && n.getStyleProp(obj, 'display') != 'none' && n.getStyleProp(obj, 'visibility') != 'hidden')
            return false;
        return true;
    }

    /** Recursively traverse the nodes, and find the first or last focusable element depending on rev_flag */
    n.getFocusable = function (obj, rev_flag) {
        /**  Hidden element is not looked into for any child focusable node*/
        if (!n.isHidden(obj)) {
            if (!n.isFocusable(obj)) {
                var a = obj.childNodes;
                if (rev_flag) {
                    for (var i = a.length - 1; i > -1; i--) {
                        var res = false;
                        if (a[i].nodeType == 1)
                            res = n.getFocusable(a[i], rev_flag)
                        if (res)
                            return res;
                    }
                } else {
                    for (var i = 0; i < a.length; i++) {
                        var res = false;
                        if (a[i].nodeType == 1)
                            res = n.getFocusable(a[i], rev_flag)
                        if (res)
                            return res;
                    }
                }
            } else
                return obj;
        }
        return false;
    }

    /** This function traverese from child to visible parent, untill it finds a hidden parent in between */
    n.isHiddenX = function (parent, child) {

        if (n.isHidden(child.currObj()))
            return true;
        var childPar = child.parent();
        if (!childPar)
            return true;
        while (childPar && childPar.currObj() != parent.currObj()) {
            var tempParent = childPar;
            if (n.isHidden(tempParent.currObj()))
                return true;
            childPar = tempParent.parent();
        }
        return false;

    }

    n.showLayer = function (foo) {

        //To prevent close button on calling showLayer

        ltBox[arr.contId].firstVw = true;

        /** Overwriting properties of n, Supprot same contID for multiple trigger */
        if (typeof foo != 'undefined')
            n.initVar(foo)

        if (!n.contId.FAnchor && !n.contId.LAnchor) {

            n.firstLastNew();

            /** Will be focussed, when shift Tabeed from first focusable element*/
            n.contId.FAnchor.addEvent('focus', function (e) {

                var elem = false;

                elem = n.getFocusable(n.contId.currObj(), true);

                if (!elem) {
                    if (n.closeB.currObj())
                        elem = n.closeB.currObj();
                    else {
                        elem = n.makeInvisibleAnchor();
                        n.contId.currObj().insertBefore(elem, n.contId.LAnchor.currObj());
                    }
                }

                $n(elem).setFocus();
                n.formEle = $n(elem);
            });

            /** Will be focussed, when Tabeed from last focusable element*/
            n.contId.LAnchor.addEvent('focus', function (e) {

                var elem = false;
                elem = n.getFocusable(n.contId.currObj(), false);

                if (!elem) {

                    if (n.closeB.currObj())
                        elem = n.closeB.currObj();
                    else {
                        elem = n.makeInvisibleAnchor();
                        n.contId.currObj().insertBefore(elem, n.contId.LAnchor.currObj());
                    }
                }
                $n(elem).setFocus();
                n.formEle = $n(elem);

            });




            /** Dynamic element proof*/
            n.contId.addEvent('click', function (e) {

                if (n.shouldNotFocusElements) {
                    return false
                }
                var e = e || window.event;
                var target = e.target || e.srcElement;

                /** Check whether target is focusable and if its not hidden anyhow*/
                if (n.isFocusable($n(target).currObj()) && !n.isHiddenX(n.contId, $n(target))) {
                    n.formEle = $n(target);
                }
                /** When focus() is called on some element through code*/
                else if (document.activeElement != document.body && n.isFocusable(document.activeElement)) {
                    n.formEle = $n(document.activeElement);
                }

                /** Otherwise we check the last focussed element, if still focusable and not hidden anyhow we focus it */
                else if (e.currentTarget.id != "bulkStatusUpdateLtBox") {
                    if (n.formEle && ($n(target).currObj() != n.formEle.currObj()) && n.isFocusable(n.formEle.currObj()) && !n.isHiddenX(n.contId, n.formEle)) {
                        setTimeout(function () {
                            n.formEle.setFocus();
                        }, 25)
                        return;
                    } else {/** Otherwise we focus the first element*/
                        n.contId.LAnchor.setFocus();
                    }
                }

            }).addEvent('keyup', function (e) {
                var e = e || window.event;
                if (e.keyCode == 9) {
                    n.formEle = $n(document.activeElement)
                }
            })


        }
        n.overLay();
        n.contId.css({ width: n.contWidth + "px" })
        if (n.reset) {
            n.resetLayer();
        }
        n.contId.show();
        n.centerLayer();
        n.resizeOverLay();

        n.closeB.addEvent('click', function a(e) {
            $n.stopPropagation(e)
            window.hideLayer();
            n.closeB.removeEvent('click', a);
        })


        /** Will Treat it as Tab to LAnchor */
        if (!n.firstFocus) {
            n.contId.LAnchor.setFocus();
        } else {

            $n('#' + n.firstFocus).setFocus();
            n.formEle = $n('#' + n.firstFocus)
        }
    }

    n.hideLayer = function () {
        ltBox.prev_scrollHeight = 0;
        ltBox.zIndex -= 3;
        if (n.reset) {
            n.resetLayer();
        }
        n.contId.hide();
        n.layer.hide();
        n.frame.hide();
        if (n.hideCallBack) {
            n.hideCallBack();
        }

        /** If light box is empty then we check afterCloseFocus else we focus previous lightBox*/
        if (!ltBox.stack.length) {
            var aCF = n.afterClosedFocus;
            if (aCF == false)
                document.body.focus()
            else if (typeof aCF == 'string')
                $n('#' + aCF).setFocus();
            else
                n.trigger.setFocus(); // return focus to the trigger.
        } else {
            ltBox.stack[ltBox.stack.length - 1].formEle.setFocus();
        }

    }
    n.resizeOverLay = function () {
        n.layer.hide();
        n.frame.hide();
        scrollHeight = ltBox.getDocExtent().height;
        scrollWidth = ltBox.getDocExtent().width;

        if (n.layer && scrollHeight) {

            n.layer.css({
                'height': scrollHeight + "px",
                'width': scrollWidth + "px"
            });
            n.frame.css({
                'height': scrollHeight + "px",
                'width': scrollWidth + "px"
            });
            n.layer.show();
            n.frame.show();
        }
    }
}


// JavaScript Document


// texteditor
var editorWindow = function () {
    var eW = this;
    eW.createEditor = function (cssPath, defaultcontent, id, objectName, formName, prv, nxt, iframeCountSpan, count, countMess) {
        eW.id = id;
        eW.allButton = new Array('editor_Bold' + eW.id, 'editor_Italic' + eW.id, 'editor_under' + eW.id, 'editor_ol' + eW.id, 'editor_ul' + eW.id, 'editor_jl' + eW.id, 'editor_jc' + eW.id, 'editor_jr' + eW.id);
        eW.abClass = new Array('edt_bold', 'edt_Itl', 'edt_undr', 'edt_iol', 'edt_iul', 'edt_jl', 'edt_jc', 'edt_jr');
        var getTextarea = $n('#' + eW.id);
        var getTextareaParent = getTextarea.parent();
        var wid = getTextarea.width() - 6;
        var hei = getTextarea.height() + 10;

        eW.contText = getTextarea.html();
        eW.cInput = $n('<input>').attr({
            type: 'hidden',
            name: getTextarea.attr('name')
        })
        //.val(eW.contText)
        eW.ieFlag = 0;
        eW.prv = prv;
        eW.nxt = nxt;
        eW.iframeCountSpan = iframeCountSpan;
        eW.count = count;
        eW.countMess = countMess;
        $n('#' + formName).append(eW.cInput);
        getTextarea.remove();
        getTextareaParent.html('<span class="bdrbl bgwht" style="display:inline-block;width:' + (wid + 3) + 'px; height:' + (hei + 39) + 'px;"><div class="editorBut" id="editBut' + eW.id + '"><a title="Bold" href="javascript:void(0)" onclick="' + objectName + '.changeProp(\'Bold\', \'\', this)" class="edt_bold" id="editor_Bold' + eW.id + '">&nbsp;</a><a title="Italic" href="javascript:void(0)" onclick="' + objectName + '.changeProp(\'Italic\', \'\', this)" class="edt_Itl" id="editor_Italic' + eW.id + '">&nbsp;</a><a title="Underline" href="javascript:void(0)" onclick="' + objectName + '.changeProp(\'Underline\', \'\', this)" class="edt_undr" id="editor_under' + eW.id + '">&nbsp;</a><a title="Ordered List" href="javascript:void(0)" onclick="' + objectName + '.changeProp(\'InsertOrderedList\', \'listId\', this)" class="edt_iol" id="editor_ol' + eW.id + '">&nbsp;</a><a title="Unordered List" href="javascript:void(0)" onclick="' + objectName + '.changeProp(\'InsertUnorderedList\', \'listId\', this)" class="edt_iul" id="editor_ul' + eW.id + '">&nbsp;</a><a title="Left Justify" href="javascript:void(0)" onclick="' + objectName + '.changeProp(\'JustifyLeft\', \'\', this)" class="edt_jl" id="editor_jl' + eW.id + '">&nbsp;</a><a title="Center Justify" href="javascript:void(0)" onclick="' + objectName + '.changeProp(\'JustifyCenter\', \'\', this)" class="edt_jc" id="editor_jc' + eW.id + '">&nbsp;</a><a title="Right Justify" href="javascript:void(0)" onclick="' + objectName + '.changeProp(\'JustifyRight\', \'\', this)" class="edt_jr" id="editor_jr' + eW.id + '">&nbsp;</a></div><iframe id="' + eW.id + '" frameBorder="0" border="0" style="background:transparent;width:' + (wid - 1) + 'px; overflow:auto;background:#fff !important; margin-left:2px; height:' + hei + 'px;" allowtransparency="true"></iframe></span>');

        eW.stylesheet = cssPath;
        eW.content = eW.contText == '' ? defaultcontent : eW.contText;
        eW.obj = $n('#' + eW.id).currObj();
        eW.objCont = eW.obj.contentWindow;
        eW.objContDoc = eW.objCont.document;
        eW.objContDoc.designMode = 'On';
        eW.objContDoc.open();
        eW.browser = $n.brewser();
        eW.contentBlank = 0;
        eW.isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;

        $n('#editBut' + eW.id + ' a').addEvent('focus', function () {
            $n(eW.objCont).setFocus();
        })
        if (typeof document.documentElement.style.opacity != 'undefined' && eW.browser.name == 'msie') {
            eW.objContDoc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en" contenteditable="true"><head>');
        } else {
            eW.objContDoc.write('<html><head>');
        }
        if (eW.stylesheet) {
            // must be done after the document has been opened
            eW.objContDoc.write('<style type="text/css">@import url(' + eW.stylesheet + ');</style>');
        }
        if (!this.content && eW.browser.name == 'mozilla' && eW.browser.version >= 17) {
            this.content = '&nbsp;';
            eW.contentBlank = 1;
        }
        eW.objContDoc.write('</head><body>' + this.content.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;nbsp;/gi, '&nbsp;').replace(/<(P|p)>[\s]+<\/(P|p)>/gi, '<p>&nbsp;</p>').replace(/&amp;gt;/gi, '&gt;').replace(/&amp;lt;/gi, '&lt;').replace(/&amp;amp;/gi, '&').replace(/(\s*style=("|')(font-size|font-family):\s[a-zA-Z0-9;\s]+("|'))/gi, ''));
        eW.objContDoc.write('</body></html>');
        eW.objContDoc.close();
        eW.objContDocBody = eW.objCont.document.body;
        var objContDoc = $n(eW.objContDoc);
        //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
        //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
        function strip_tags(input, allowed) {
            allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
            var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
                commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi,
                scriptReplace = /<script[^>]*>.*?<\/script>/,
                replaceBulletwithULLI = /(<\s*(a|p|div)[^>]*>)?•(.?)(<\s\s*(a|p|div)>)/g;

            return (
                input
                    .replace(commentsAndPhpTags, "")
                    .replace(scriptReplace, "")
                    .replace(tags, function ($0, $1) {
                        return allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
                    })
                // .replace(/<\s*(\w+).*?>/gi, function($0, $1) {
                //   return "<" + $1 + ">";
                // })

                //   .replace(/<(p|div)>•/g, function($0, $1) {
                //     return "\n<" + $1 + ">•";
                //   })
                //   .replace(/^(\s*(?:<(?:p|div)>)?)•(.+?)(?:<\/(p|div)>)?(\s*$)/gm, function($0, $1, $2) {
                //     return "<li>" + $2 + "</li>";
                //   })
            )
                .replace(/(&nbsp;)/g, "");

        }
        objContDoc.addEvent("paste", function (e) {
            if(eW.isIE11 || e.clipboardData === undefined) {
                return;
            }
            var content = '';
            if ((e.clipboardData).getData('text/html')) {
                content = e.clipboardData
                    .getData('text/html')
                    .replace(/[\n\r]/g, " ")
                    .replace(/·/g, "•")
                    .replace(/•/g, "")
                //   .replace(/(<(p|div)>)•(.+?)(<\/(p|div)>)/gm, function($0, $1, $2) {
                //     return "<li>" + $2 + "</li>";
                //   });
                var div = document.createElement("div");
                div.innerHTML = content;
                var listElements = $("[class^='MsoListParagraph']", $(div));
                if (listElements.length) {
                    listElements.replaceWith(function () {
                        return $("<li/>", {
                            class: this.className,
                            html: this.innerHTML
                        });
                    });
                    $(".MsoListParagraphCxSpLast", $(div)).each(function () {
                        $(this)
                            .prevAll("[class^='MsoListParagraph']")
                            .add(this)
                            .wrapAll("<ul>");
                    });
                }
                $(div).find("*").each(function () {
                    var self = this;
                    if(self.nodeName === "STYLE") {
                        self.remove();
                    }
                    if (self.attributes.length) {
                        var attributes = $.map(self.attributes, function (item) {
                            return item.name;
                        });
                        attributes.forEach(function(attr) {
                            self.removeAttribute(attr)
                        });
                    }
                })
                content = div.innerHTML;
            } else {
                content = (e.clipboardData).getData("text/plain").replace(/(?:\r\n|\r|\n)/gi, "<br>");

                // .replace(/•(.+?)(\s*$)/gm, function($0,$1){
                //     return "<li>"+$1+"</li>"
                // })
            }
            var div = document.createElement("div");
            div.innerHTML = content;
            var allowed = "<div><ol><ul><li><p><b><strong><i><u><br><em>";
            var newHtml = strip_tags(div.innerHTML, allowed);
            e.currentTarget.execCommand("insertHTML", false, newHtml);
            e.preventDefault();
        });
        if ( eW.isIE11 && !$n('#contextMenu').length) {
            var clickA = $n('<div>').attr({
                'id': 'contextMenu'
            }).css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'background': '#fff',
                'border': '1px solid #000',
                'display': 'none'
            }).html('<a>Paste</a>');
            $n('body').append(clickA)

        }
        // if (document.onclick) {
        //     if (window.addEventListener)
        //         document.addEventListener('click', function () {
        //             $n('#contextMenu').hide()
        //         }, false);
        //     else
        //         document.attachEvent('onclick', function () {
        //             $n('#contextMenu').hide()
        //         });
        // } else
        //     document.onclick = function () {
        //         $n('#contextMenu').hide()
        //     }

        //		eW.objContDoc.click();
        var objContDoc = $n(eW.objContDoc);
        objContDoc.addEvent("mousedown", function (e) {
            if(eW.isIE11) {
                eW.contextMenuDown(e);
            }
            eW.setScroll_IE()
        }).addEvent("keydown", function (e) {
            eW.getkeyCode(e);
        }).addEvent("keyup", function (e) {
            eW.keyupEvent();
            eW.setScroll_IE();
        }).addEvent("mouseup", function (e) {
            eW.keyupEvent()
        }).addEvent("contextmenu", function (e) {
            eW.contextShow(e, eW.id, eW.objContDoc)
        });
        delete getTextarea;
        delete getTextareaParent;
        delete wid;
        delete hei;
    }
    eW.setScroll_IE = function () {
        var curObj_iframe = $n('#' + eW.id).currObj();
        if (curObj_iframe.contentWindow.document.body) {
            curObj_iframe.contentWindow.document.body.scroll = 'yes'
            if (eW.objContDocBody.scrollHeight > eW.objContDocBody.offsetHeight)
                curObj_iframe.contentWindow.document.body.scroll = 'yes';
            else
                curObj_iframe.contentWindow.document.body.scroll = 'no';
        }
    }
    eW.getkeyCode = function (event) {
        if (event == null)
            event = window.event;
        var code = (document.all) ? event.keyCode : event.which;
        var ctrl = typeof event.modifiers == 'undefined' ? event.ctrlKey : event.modifiers & Event.CONTROL_MASK;
        var command = typeof event.modifiers == 'undefined' ? event.metaKey : event.modifiers & Event.CONTROL_MASK;
        var sft = typeof event.modifiers == 'undefined' ? event.shiftKey : event.modifiers & Event.SHIFT_MASK;
        // Do stuff here
        if (eW.isIE11 && (ctrl || command) && code == 86 || code == 45) {
            //paste
            eW.paste();
        } else if (ctrl && code == 66 && eW.browser.name == 'mozilla') { // Bold
            $n.preventDefault(event);
            $n('#editor_Bold' + eW.id).click();
        } else if (ctrl && code == 73 && eW.browser.name == 'mozilla') {
            // italic
            $n.preventDefault(event);
            $n('#editor_Italic' + eW.id).click();
        } else if (ctrl && code == 85 && eW.browser.name == 'mozilla') {
            // underline
            $n.preventDefault(event);
            $n('#editor_under' + eW.id).click();
        } else if (sft && code == 9) {
            $n.preventDefault(event);
            $n('#' + eW.prv).setFocus();
        } else if (code == 9) {
            $n.preventDefault(event);
            $n('#' + eW.nxt).setFocus();
        }

        delete code;
        delete ctrl;
        delete sft;
    }
    eW.resetButton = function () {
        for (var i = 0; i < eW.allButton.length; i++) {
            $n('#' + eW.allButton[i]).removeClass('selected');
        }
    }
    eW.qcs = function (command) {
        try {

            return eW.objContDoc.queryCommandState(command);
        } catch (e) { }
    }
    eW.keyupEvent = function () {
        $n('#contextMenu').hide()
        eW.resetButton();
        if (eW.qcs('Bold'))
            eW.setSelection(eW.allButton[0])
        if (eW.qcs('Italic'))
            eW.setSelection(eW.allButton[1])
        if (eW.qcs('Underline'))
            eW.setSelection(eW.allButton[2])
        if (eW.qcs('InsertOrderedList'))
            eW.setSelection(eW.allButton[3])
        if (eW.qcs('InsertUnorderedList'))
            eW.setSelection(eW.allButton[4])
        if (!eW.qcs('JustifyCenter') && !eW.qcs('JustifyRight'))
            eW.setSelection(eW.allButton[5])
        if (eW.qcs('JustifyCenter'))
            eW.setSelection(eW.allButton[6])
        if (eW.qcs('JustifyRight'))
            eW.setSelection(eW.allButton[7])
        eW.changeCountText();
    }

    eW.changeCountText = function () {
        if (eW.iframeCountSpan) {
            var b = eW.textCount();
            var cnt = 0;
            if (b <= eW.count) {
                cnt = eW.count - b;
            } else if (b >= eW.count) {
                cnt = 0;
            }
            $n('#' + eW.iframeCountSpan).html(cnt);
        }
    }

    eW.textCount = function () {
        var tmp = eW.objCont.document.body;
        var b = '';
        if (document.body.textContent)
            b = tmp.textContent;
        else
            b = tmp.innerText;
        return b.replace(/\n/gi, '').length;
    }
    eW.setSelection = function (id) {
        $n('#' + id).addClass('selected');
    }
    eW.changeProp = function (command, optz, obj) {
        if (eW.objContDoc.queryCommandEnabled) {
            eW.ieFlag = 0;
            eW.objCont.focus();
            eW.setCSSCreate(command);
            eW.objContDoc.execCommand(command, false, optz);
            eW.keyupEvent();
            return true;
        } else {
            return false;
        }
    }
    eW.setCSSCreate = function (aUseCss) {
        if (eW.objContDoc && eW.browser.name != 'msie') {
            eW.objContDoc.execCommand('useCSS', false, aUseCss)
        }
    }
    eW.paste = function (rg) {
        var doc = $n(eW.objContDoc.body);
        eW.savedData = doc.html();
        eW.range = rg || eW.saveRange();
        if (eW.browser.name != 'msie')
            eW.objContDoc.designMode = 'Off';
        $n('#editortxtArea').val('');

        modalwin(500, 200, 'adLayer', document.getElementsByTagName('body')[0]);
        // for old lightbox
        //		modalwin(500, 'adLayer', document.getElementsByTagName('body')[0]);// for new lightbox
        if (eW.browser.name != 'msie')
            setTimeout(function () {
                eW.objContDoc.designMode = 'On';
            }, 500);
        setTimeout(function () {
            $n('#editortxtArea').val('');
        }, 50)
        createTxtarea = $n('#editortxtArea');
        $n('#editorButton').click(function () {
            var d = createTxtarea.val();
            if (d.trim().length && window.jQuery) {
                var ajaxParam = {
                    "actionName": "jd-paste",
                    "companyId": $("#companyId").val()
                }
                $.ajax({
                    url: "../../restApi/logger/logActionCount",
                    data: ajaxParam,
                    method: "POST"
                });
            }

            createTxtarea.val('');
            hidemodal();
            eW.insertHtmlAtCursor(d);
        })
        var alen = $n('#editorButton').parent().childrens('a');
        for (var x = 0; x < alen.length; x++) {
            var alenX = alen.eq(x);
            if (alenX.attr('rel') == 'last') {
                alenX.addEvent('click', eW.closeLB);
                break;
            }
        }
    }
    eW.closeLB = function () {
        hidemodal();
        $n(eW.objCont).setFocus();
    }
    eW.checkPaste = function () {
        var objbodyHTML = $n(eW.objContDocBody).html();
        if (objbodyHTML && objbodyHTML != '<br>') {
            return objbodyHTML;
        }
        setTimeout(function () {
            eW.checkPaste()
        }, 10)
    }
    eW.viewSrc = function () {
        var d = (eW.objContDocBody.innerHTML).replace(/(\r\n|\n|\r)/gm, ' ')
        eW.cInput.val(d);
        return false;
    }

    eW.checkHTMLTags = function (alwdTag) {
        if (!alwdTag) {
            if ($n.trim($n(eW.objContDocBody).html()) === "" || $n(eW.objContDocBody).html().match(/\&lt;.+\&gt;/gi)) {
                return false;
            }
            return true;
        } else {
            var html = $n.trim($n(eW.objContDocBody).html());
            if (html == "")
                return false;
            if (html !== "" && strip_tags(html, alwdTag).length == html.length) {
                return false;
            }
            return true;
        }
    }

    eW.checkBlank = function () {
        if (!($n(eW.objContDocBody).html().replace(/\&lt;.+\&gt;/gi, '').replace(/\&nbsp;/gi, '').replace(/^\s+|\s+$/g, "").replace(/(<([^>]+)>)/ig, ''))) {
            return false;
        }
        return true;
    }

    eW.newRange = null;
    eW.newSelection = null;
    eW.selRange = null;
    eW.saveRange = function () {
        if (eW.objCont.document.selection && eW.objCont.document.selection.createRange) {
            range = eW.objCont.document.body.createTextRange();
            eW.selRange = eW.objCont.document.selection.createRange();
        } else if (window.getSelection && eW.objCont.window.getSelection().getRangeAt) {
            eW.newSelection = eW.objCont.window.getSelection();
            range = eW.newSelection.getRangeAt(0);
            eW.newRange = range.cloneRange();
        }
        return range;
    }
    eW.insertHtmlAtCursor = function (html) {
        $n(eW.objCont).setFocus();
        html = html.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
        html = (eW.browser.name == 'msie') ? html.replace(/(\r\n|\n|\r)/i, '<p>').replace(/(\r\n|\n|\r)/gi, '</p><p>').replace(/(<p><\/p>){2,}/gi, '<p>&nbsp;</p><p>&nbsp;</p>') : html.replace(/(\r\n|\n|\r)/gi, '<br />').replace(/(<br \/>){3,}/gi, '<br /><br /><br />');
        html = html.replace(/[^A-Za-z0-9><.,?\/'";:\\|\]\[\}\{\=\+\-_\)\(\*&\^%\$#@\!\s]+/gi, '');
        if (eW.browser.name == 'msie' && html.match(/<p>/gi)) {
            var pos = html.split('<p>');
            var a = pos[0];
            for (i = 1; i <= pos.length - 1; i++) {
                a += '<p>' + pos[i];
            }
            html = a;
        }
        var range, node;
        range = eW.range || eW.saveRange();
        if (eW.objContDoc.selection && eW.objContDoc.selection.createRange) {
            eW.selRange.pasteHTML(html);
            eW.selRange.select()
        } else if (window.getSelection && eW.objCont.window.getSelection().getRangeAt && range.createContextualFragment) {
            eW.objCont.focus();
            var nRange = eW.newRange.cloneRange();
            nRange.deleteContents();
            html += '<span id="cursorAtThis"></span>';
            node = nRange.createContextualFragment(html) || nRange.pasteHTML(html);
            if (nRange.startContainer.nodeName.toLowerCase() == 'html')
                nRange.startContainer = eW.objContDoc;
            if (eW.contentBlank)
                nRange.startContainer.textContent = '';
            nRange.setStart(nRange.startContainer, nRange.startOffset)
            nRange.setEnd(nRange.endContainer, nRange.endOffset)
            nRange.insertNode(node);
            var elemToSelect = eW.objCont.document.getElementById("cursorAtThis");
            var selection = eW.objCont.window.getSelection();
            var rangeToSelect = eW.objCont.document.createRange();
            rangeToSelect.selectNodeContents(elemToSelect);
            selection.removeAllRanges();
            selection.addRange(rangeToSelect);
            elemToSelect.parentNode.removeChild(elemToSelect)

        } else {
            node = range.pasteHTML(html);
            range.insertNode(node);
        }
        eW.changeCountText();
    }
    eW.contextFlag = false;
    eW.rg = '';
    eW.contextMenuDown = function (event) {
        if (eW.objCont.document.body.textContent == '')
            eW.objCont.document.body.textContent = ' ';
        eW.objCont.focus();
        setTimeout(function () {
            eW.rg = eW.saveRange()
        }, 400);

        $n('#contextMenu a').click(function () {
            $n('#contextMenu').hide();
            eW.contextFlag = false;
            eW.objCont.focus();
            eW.paste(eW.rg);
        })
        if (event == null)
            event = window.event;

        $n('#contextMenu').hide();
        if (event.button == 2)
            eW.contextFlag = true;
        else
            eW.contextFlag = false;
    }

    eW.contextShow = function (event, id, objIframe) {
        if (event == null)
            event = window.event;
        if (eW.contextFlag) {
            $n.preventDefault(event)
            var _divContext = $n('#contextMenu');
            var getPos = $n('#' + eW.id).position();
            _divContext.css({
                'left': event.clientX + getPos['left'] + 10 + 'px',
                'top': event.clientY + getPos['top'] + 5 + 'px'
            });
            _divContext.show();
        }
    }
}

// texteditor

// email Tage creator

var emailTagCreator = function (objk) {
    var t = this;
    t.objanc = objk.ancId;
    t.editorRef = objk.editorRef;
    t.formElm = objk.formElm;
    t.callB = objk.callBack;

    $n(t.objanc).childrens('a').addEvent('click', function (e) {
        $n.preventDefault(e);
        var ele = e.target || e.srcElement;
        if ($n(ele).currObj().nodeName.toLowerCase() == 'a' && $n(ele).html() != '') {
            var tags = '[' + $n(ele).html() + ']';


            if (t.formElm) {
                var inpval = ($n(t.editorRef).attr('placeholder') && $n(t.editorRef).attr('placeholder') == $n(t.editorRef).val()) ? '' : $n(t.editorRef).val();
                var pos = doGetCaretPosition($n(t.editorRef).currObj());
                if (pos) {
                    var str1 = inpval.substring(0, pos),
                        str2 = inpval.substring(pos),
                        newval = str1 + tags + str2,
                        setpos = (str1 + tags).length;
                    $n(t.editorRef).val(newval);


                } else {
                    var inpvap = (inpval) ? inpval : '';
                    setpos = tags.length;
                    idVal = t.editorRef.replace('#', '');
                    var jsonToPass = {};
                    jsonToPass[idVal] = tags + ' ' + inpvap;
                    commonValidator.fillVal(jsonToPass);
                }
                setCaretPosition($n(t.editorRef).currObj(), setpos);
            } else {
                t.editorRef.insertHtmlAtCursor(tags);
            }
        }
        t.callB();
    });


};


var smToggle = function (e) {
    var t = this;
    t.obj = e.ids;
    t.contid = e.contid;
    t.showit = e.showit || false;
    t.showcl = e.showcl || '';
    t.hidecl = e.hidecl || '';

    t.init = function () {
        for (var k = 0; k < t.obj.length; k++) {
            var cobj = $n(t.obj[k]);


            if (cobj.currObj()) {
                if (cobj.currObj().tagName.toLowerCase() != 'input') { (t.showit == true) ? cobj.addClass(t.hidecl) : cobj.addClass(t.showcl) };

                cobj.addEvent('click', function () {
                    t.toggleit($n(this));
                });
                if (cobj.currObj().tagName.toLowerCase() != 'input') { t.toggleit(cobj); }

            }
        }
    },
        t.toggleit = function (cbj) {
            var anc = (cbj) ? cbj : $n(this), anct = anc.currObj().tagName.toLowerCase();
            var opit = (anc.attr('rel') != '') ? anc.attr('rel') : anc.attr('id') + '_toggle';
            if (anct === 'input' && anc.attr('type') != 'text') {
                if (anc.currObj().checked) {
                    $n('#' + opit).show();
                } else {
                    $n('#' + opit).hide();
                }
            } else {
                if (anc.hasClass(t.hidecl) == t.hidecl) {

                    $n('#' + opit).show();
                    anc.removeClass(t.hidecl);
                    anc.addClass(t.showcl);
                }
                else {
                    $n('#' + opit).hide();
                    anc.removeClass(t.showcl);
                    anc.addClass(t.hidecl);
                }
            }

        }



    t.init();
}

chainingFunction.prototype.accordion = function (arr) {

    var that = this;
    that.tab = arr.tab;
    that.callFunc = arr.callFunc || null;
    var flag = 0;
    var prev = '';
    var clk = ''
    var cObj = '';
    var local_d = [];
    var relEle = $n("[rel^='acc']", '#' + el[0].id);
    relEle.addEvent('click', function (e) {

        var obj = $n(this).currObj();
        while (obj) {
            if ($n(obj).attr('rel')) {
                if ($n(obj).attr('rel').split('#')[0] == 'acc') {
                    cObj = obj;
                    break;
                }
            }
            obj = obj.parentNode;

        }
        that.currObj = $n(cObj).attr('rel').split('#')[1]
        var e = e || window.event;
        $n.stopPropagation(e)
        if (!$n(cObj).hasClass('selCo') && arr.openAlways === false) {

            $n(cObj).addClass('selCo');
        }
        else {
            if (arr.openAlways == false)
                $n(cObj).removeClass('selCo');
        }
        if (arr.openAlways) {
            if (flag == 0) {
                prev = relEle.eq(0).attr('rel').split('#')[1];
                clk = relEle.eq(0);
            }
            if (!$n(cObj).hasClass('selCo')) {


                var a = $n(cObj)
                var jid = a.attr('rel');
                jid = jid.split('@');
                if (jid[1] != 'undefined') {
                    extraParam = jid[1];
                }
                else {
                    extraParam = '';
                }

                $n(cObj).addClass('selCo');
                $n('#' + prev).hide()
                $n('#' + that.currObj).show();

                clk.removeClass('selCo');
                flag = 1;
            }
        }
        if (arr.openAll) {
            $n('#' + that.currObj).toggle();

        }
        if (arr.openOne) {
            $n('#' + that.currObj).toggle();
            if (prev != '' && prev != that.currObj) {
                $n('#' + prev).hide();
                clk.removeClass('selCo');
            }
        }

        var objnow = $n('#' + that.currObj);
        if (objnow.getStyle(objnow.currObj(), 'display') == 'block') {
            if (that.callFunc) {
                that.callFunc.call(window, local_d, that.currObj);
            }
        }

        clk = $n(cObj);
        prev = that.currObj;
    })


}

/* checkbox on off */
var ckhtogle;
var checkboxSwitch = function (_callback) {
    $n('.on_off').css({ 'display': 'none' });
    var i, rbtn, inpbtn, button;
    rbtn = $n('input[type=hidden].on_off');
    for (i = 0; i < rbtn.length; i++) {
        if (rbtn.eq(i).val() == 'on') {
            rbtn.eq(i).parent().css({ 'backgroundPosition': 'top' });
        }
        else if (rbtn.eq(i).val() == 'off') {
            rbtn.eq(i).parent().css({ 'backgroundPosition': 'bottom' });
        }
    }
    ckhtogle = function switchToggleEvent() {
        inpbtn = $n(this).childrens('input[type=hidden]');
        button = null;
        button = inpbtn.val();
        if (button == 'on') { inpbtn.attr('value', 'off'); $n(this).css({ 'backgroundPosition': 'bottom' }); }
        else { inpbtn.attr('value', 'on'); $n(this).css({ 'backgroundPosition': 'top' }); }
        if (_callback && typeof _callback == 'function') {
            _callback($n(this));
        }
    }
    $n(".switch").addEvent('click', ckhtogle);
}

/* check all Uncheck all */
function checkboxToggle(a, ob, c) {
    if (a.checked) {
        $n(ob).each(function (a, b) { (b.nodeName.toLowerCase() == 'input' && b.disabled == false) ? b.checked = true : '' });
        (c) ? $n('input[name=' + c + ']').currObj().checked = true : ''
    } else {
        $n(ob).each(function (a, b) { (b.nodeName.toLowerCase() == 'input' && b.disabled == false) ? b.checked = false : '' });
        (c) ? $n('input[name=' + c + ']').currObj().checked = false : ''
    }
}


/* tabbing */
var tabbing = function () {

    //Declaring variables
    var me = this;
    me.tNavTagAnc = ''; //navigation li anchor tag
    me.ancLength = '';
    me.allEle = [];

    me.init = function (tNavCont, selTab) {
        me.tNavTagAnc = $n('#' + tNavCont + ' li a[rel]');
        me.ancLength = me.tNavTagAnc.length;
        for (var k = 0; k < me.ancLength; k++) {
            me.allEle.push(me.tNavTagAnc.eq(k));
            me.allEle[me.allEle.length - 1].addEvent('click', function (objNo) { //changing tab on click
                return function () {
                    me.tabFunc(objNo);
                }
            }(k));
        }
        if (selTab > 0)
            me.tabFunc(selTab);
        //me.tabFunc((selTab == null || selTab>me.ancLength) ? 0 : selTab); //passing first tab ref in case of condition failur
    }
    this.tabFunc = function (currObj) {
        for (var i = 0; i < me.ancLength; i++) {
            var b = me.allEle[i];
            b.parent().changeClass((currObj == i) ? 'sel' : '');
            $n('#' + b.attr('rel')).replaceClass((currObj != i) ? 'tabPanel-show' : 'tabPanel-hide', (currObj != i) ? 'tabPanel-hide' : 'tabPanel-show');
        }
    }
}


function navdown(navdd) {
    var t = this, i;
    t.menu = navdd.menu;
    t.ids = navdd.id;
    t.menuDir = navdd.menu_postion;
    t.init = function () {
        for (i = 0; i < t.ids.length; i++) {
            var objt = (t.ids[i]).toString();

            t.addmenuEvent(objt);
        }
        //$n('body').append($n('<iframe>').addClass('menuframe'));
    },
        t.addmenuEvent = function (objt) {
            $n(objt).addEvent('mouseover', function (e) {
                $n('body').mouseover = '';
                var e = (!e) ? window.event : e;
                (e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
                var targetEle = (e.target) ? e.target : e.srcElement;
                var node = targetEle.tagName.toLowerCase();
                if (node == 'a') {

                    var obj = $n(targetEle);
                    var ul = (obj.next()) ? obj.next() : false;
                    if (obj.attr('rel') && obj.attr('rel') != null) {
                        /*var next=obj.parent().next();
                        while(next){
                            if(next.first().next())
                            next.first().next().hide()
                            next=next.next();
                        }
                        var prev=obj.parent().prev();
                        while(prev){
                            if(prev.first().next())
                            prev.first().next().hide();
                            prev=prev.prev();
                        }
                */
                        if (ul) {
                            //					var nextLI=ul.first();
                            //					while(nextLI){
                            //					if(nextLI.first().next()){var checkUL=(nextLI.first().next().currObj().nodeName.toLowerCase == 'ul')?nextLI.first().next():false;}
                            //							if(checkUL)
                            //								checkUL.hide();
                            //							nextLI=nextLI.next();
                            //						}

                        } else { $n('iframe.menuframe').css({ 'display': 'none' }); }
                        obj.pos = obj.parent().position();
                        obj.top = obj.offTop();
                        obj.left = obj.offLeft();
                        obj.width = obj.parent().width();
                        obj.height = obj.parent().height();

                        if (t.menuDir == 'vert') {
                            ul.show().css({ top: 0, left: (obj.width) + 'px' })
                        }
                        else if (t.menuDir == 'horz') {
                            if (obj.attr('rel') == 'ver') {
                                ul.show()
                                ul.width = ul.width();
                                ul.height = ul.height();
                                obj.parent().css({ 'zIndex': '999' })
                                ul.hide();
                                ul.show().css({ top: (obj.top + obj.height - 1) + 'px', left: (obj.left - ul.width + obj.width + 7) + 'px' })




                                //$n('iframe.menuframe').css({'width':ul.width+"px",'height':ul.height+"px",'position':'absolute','display':'block','zIndex':'10','overflow':'hidden','left':(obj.left-ul.width+obj.width+16)+"px",'top':(obj.top+obj.height)+"px"});
                            }

                            else if (obj.attr('rel') == 'hor') {
                                ul.show().css({ top: 0, left: (obj.width) + 'px' })

                            }
                        }
                    }


                }


            }).addEvent('mouseout', function (e) {
                var e = (!e) ? window.event : e;
                $n('body').addEvent('mouseover', function (e) {
                    $n(objt + ' > li').removeAttr('style');
                    $n(objt).removeAttr('style');
                    $n(objt + ' ul').hide();

                })
            })
        }
    t.init();
}


var navmenu = function (o) {
    if (!(this instanceof navmenu)) {

        return new navmenu(o);
    }

    var t = this;
    t.obj = o.sel;
    t.hide = 1;
    t.dropC = o.dropClass;
    t.arrC = o.arrowclass || false;
    t.tipC = o.tipclass || false;
    t.seltype = o.selectype || false;
    t.callB = o.callB || false;
    t.myobj;
    t.nobj = $n(t.obj).childrens(t.dropC).parents(t.dropC);

    if (!($n('iframe#nifr').currObj())) {
        t.ifrm = $n('<iframe>').attr({ 'id': 'nifr', 'scrolling': 'no', 'frameborder': '0', 'marginheight': '0', 'marginwidth': '0' });
        t.ifrm.addClass('backlayer');
        $n('body').append(t.ifrm);
    }

    var selectBOX = function (sm) {
        var tp = this;
        tp.smbox = sm;
        $n(tp.smbox).childrens('li').addEvent('click', selectvalue);


        function selectvalue(e) {
            if (!e) var e = window.event;
            (e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
            var anco = ($n(this).currObj().nodeName == 'A') ? $n(this) : $n(this).childrens('a');
            var selectedtext = gettextNode(anco);

            var dText = gettextNode($n(tp.smbox).childrens(t.dropC).siblings('a'));
            dText.nodeValue = selectedtext.nodeValue;

            if (t.callB) {

                var p = $n(tp.smbox).childrens(t.dropC).attr('pid'),
                    c = anco.attr('cid');
                t.callB({ pid: p, cid: c });
            }

            $n(tp.smbox).childrens(t.dropC).hide();




        };


        function gettextNode(d) {
            var oDiv = d.currObj();
            for (var i = 0; i < oDiv.childNodes.length; i++) {
                var curNode = oDiv.childNodes[i],
                    whitespace = /^\s*$/;
                if (curNode.nodeName === "#text" && !(whitespace.test(curNode.nodeValue))) {
                    return curNode;
                }
            }
        }

    };

    t.setPosition = function () {

        var nmenu = t.myobj,
            nmenu_height = nmenu.height(),
            nmenu_width = nmenu.width(),
            nmenu_position = nmenu.position(),

            dropdown = nmenu.childrens(t.dropC);
        dropdown.currObj().removeAttribute('style');
        dropdown.css({ 'display': 'block' });

        var dropdown_width = dropdown.width(),
            dropdown_height = dropdown.height(),
            dropdown_rect = dropdown.currObj().getBoundingClientRect(),
            droptip = dropdown.childrens(t.tipC),
            droptip_height = droptip.height(),
            isdroptip = droptip.length;


        // set menu postion 
        if (!t.tipC || !t.arrC || !isdroptip) {
            dropdown.css({ 'left': '0', 'top': (nmenu_height) + 'px' })
        } else {

            setpossnowmenu();
        }

        function setpossnowmenu() {
            var menuposition = configposition();
            var dropLeft = nmenu_width - dropdown_width,
                nmenu_arrow = nmenu.childrens(t.arrC),
                nmenu_arrow_height = nmenu_arrow.height(),
                nmenu_arrow_rect = nmenu_arrow.currObj().getBoundingClientRect(),
                droptipLeft = (((nmenu_arrow_rect.left - nmenu_position.left) + (nmenu_arrow.width() / 2)) - (droptip.width() / 2) - dropLeft);
            //console.log(droptipLeft,nmenu_arrow_rect.left,nmenu_position.left);

            if (menuposition) {
                dropdown.css({ 'left': dropLeft + 'px', 'bottom': 'auto', 'top': (nmenu_height + nmenu_arrow_height) + 'px' });
                droptip.css({ 'left': droptipLeft + 'px', 'bottom': 'auto', 'top': '-' + droptip_height + 'px' })
                if (droptip.hasClass('menuDownIc') == 'menuDownIc') { droptip.removeClass('menuDownIc').addClass('topArowIc') } else { droptip.addClass('topArowIc') }

                //$n('iframe#nifr').css({'width':dropdown_width+'px','height':dropdown_height+'px','left':dropdown_rect.left+'px','bottom':'auto','top':'-'+droptip_height+'px'});

            } else {

                dropdown.css({ 'left': dropLeft + 'px', 'top': 'auto', 'bottom': (nmenu_height + nmenu_arrow_height) + 'px' })
                droptip.css({ 'left': droptipLeft + 'px', 'top': 'auto', 'bottom': '-' + droptip_height + 'px' });
                if (droptip.hasClass('menuDownIc') == 'menuDownIc') { droptip.removeClass('menuDownIc').addClass('menuDownIc') } else { droptip.addClass('menuDownIc') }




            }
            var tpt = dropdown.position();
            $n('iframe#nifr').css({ 'width': dropdown_width + 'px', 'height': dropdown_height + 'px', 'left': tpt.left + 'px', 'top': tpt.top + 'px' });

            //$n('iframe#nifr').css({'width':dropdown_width+'px','height':dropdown_height+'px','left':dropdown_rect.left+'px','top':dropdown_rect.top+'px'});


        }

        function getDocExtent() {
            var D = document;
            return {
                height: Math.max(
                    Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                    Math.max(D.body.clientHeight, D.documentElement.clientHeight)
                ),
                width: Math.max(
                    Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
                    Math.max(D.body.clientWidth, D.documentElement.clientWidth)
                )
            }
        }

        function configposition() {
            var bodybottom = getDocExtent();
            var nmenubottom = nmenu_position.top + nmenu_height + dropdown_height;
            if (nmenubottom < bodybottom.height) {
                return true;
            }
            return false;
        }







    };
    t.nobj.addEvent('mouseover', function (e) {

        (!t.myobj || t.hide) ? t.myobj = $n(this) : '';
        if (!e) var e = window.event;
        (e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
        var currelem = e.target || e.srcElement;
        var reltg = e.relatedTarget || e.fromElement;
        if (reltg && reltg.nodeName != 'HTML') { while (currelem != t.myobj.currObj()) { currelem = currelem.parentNode; } }
        if (t.myobj.currObj() == currelem && t.hide) {
            while (t.myobj.childrens(t.dropC).length == 0) {
                t.myobj = t.myobj.parent();
            }
            clearTimeout(t.outTime);
            t.nobj.removeAttr('style');
            $n(t.dropC).hide();
            t.myobj.css({ 'zIndex': '100' });
            t.myobj.childrens(t.dropC).show();
            t.setPosition(t.myobj);
            t.hide = 0;
        }

    }).addEvent('mouseout', function (e) {
        if (!e) var e = window.event;
        (e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
        var currelem = e.target || e.srcElement;
        var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
        if (reltg && reltg.nodeName != 'HTML') { while (reltg != t.myobj.currObj() && reltg.nodeName != 'BODY') { reltg = reltg.parentNode; } }
        if (reltg == t.myobj.currObj()) { return; } else {

            t.outTime = setTimeout(function () { $n('iframe#nifr').removeAttr('style'); t.myobj.removeAttr('style'); t.myobj.childrens(t.dropC).hide(); }, 50);
            t.hide = 1;
        }





    })


    t.checkSelelectbox = function () {
        if (t.seltype) {
            var selectBoxobj = t.nobj;
            return selectBoxobj.each(function () {
                new selectBOX(this);
            });

        }
    };



    t.checkSelelectbox();

}


/* tooltip */
chainingFunction.prototype.tooltip = function () { for (var e = 0; e < arguments.length; e++) { this.event = arguments[e].events ? arguments[e].events : false; this.closeBtn = arguments[e].closeBtn ? arguments[e].closeBtn : false; this.content = arguments[e].content ? arguments[e].content : ""; this.closeEvent = arguments[e].closeEvent ? arguments[e].closeEvent : false; this.dir = arguments[e].dir ? arguments[e].dir : "right"; this.arrow = arguments[e].arrow ? arguments[e].arrow : false } var t = this; var n = document.compatMode == "CSS1Compat" ? document.documentElement : document.body; if ($n("#tdv").length == 0) { var r = $n("<div>"); r.attr("id", "tdv"); var i = $n("<iframe>"); i.attr({ scrolling: "no", frameborder: "0", marginheight: "0", marginwidth: "0", id: "tifrm" }); $n("body").append(r.currObj()).append(i.currObj()) } r = $n("#tdv"); r.hide(); i = $n("#tifrm").hide(); t.event ? t.addEvent(t.event, function () { t.showTT() }) : t.showTT(); t.showTT = function () { var e = window.pageYOffset ? pageYOffset : n.scrollTop; var s = n.scrollLeft; var o = t.position(); t.left = o.left; t.top = o.top; t.innerW = t.innerwidth(); t.innerH = t.innerheight(); if (/^[#]/.test(t.content)) { var u = $n(t.content); u.clss = u.attr("class"); r.show(); i.show(); r.html(u.html()); r.changeClass(""); i.changeClass(""); r.addClass(u.clss); i.addClass(u.clss) } else { r.show(); i.show(); t.arrow ? r.html('<div class="defaultCont"><div class="arrow"></div>' + t.content + "</div>") : r.html('<div class="defaultCont">' + t.content + "</div>"); r.changeClass(""); i.changeClass(""); r.addClass("default"); i.addClass("default") } var a = t.left + t.width(); var f = t.top + t.height(); var l = t.top - e; var c = t.left - s; var h = l - r.height() + e - 10; var p = t.left - r.width() - 15; var d = t.height() + r.height(); var v = l + r.height() + t.height() + 10; var m = r.width(); var g = t.width() + r.width() + c; var y = t.left + t.width(); var b = t.innerW - (c + t.width()); switch (t.dir.toLowerCase()) { case "top": (function () { var e = c + m < t.innerW ? t.left : p + t.width(); if (t.arrow) { l > d ? c + m < t.innerW ? r.addClass("topar") : r.addClass("toparR") : c + m < t.innerW ? r.addClass("btmar") : r.addClass("btmarR") } h = l > d ? h : f; r.css({ left: e + "px", top: h + "px" }); i.css({ left: e + "px", top: h + "px", height: r.height() + "px" }) })(); break; case "bottom": (function () { var e = c + m < t.innerW ? t.left : p + t.width(); if (t.arrow) { v < t.innerH ? c + m < t.innerW ? r.addClass("btmar") : r.addClass("btmarR") : c + m < t.innerW ? r.addClass("topar") : r.addClass("toparR") } h = v < t.innerH ? f : h; r.css({ left: e + "px", top: h + "px" }); i.css({ left: e + "px", top: h + "px", height: r.height() + "px" }) })(); break; case "left": (function () { var e = l + r.height(); if (t.arrow) { c > m || b < c ? e > t.innerH ? r.addClass("leftarR") : r.addClass("leftar") : e > t.innerH ? r.addClass("rightarR") : r.addClass("rightar") } p = c > m || b < c ? p : a; e = e < t.innerH ? t.top : h + t.height() + 10; r.css({ left: p + "px", top: e + "px" }); i.css({ left: p + "px", top: e + "px", height: r.height() + "px" }) })(); break; case "right": default: (function () { var e = l + r.height(); if (t.arrow) { t.innerW > g || b > c ? e > t.innerH ? r.addClass("rightarR") : r.addClass("rightar") : e > t.innerH ? r.addClass("leftarR") : r.addClass("leftar") } y = t.innerW > g || b > c ? y : p; e = e < t.innerH ? t.top : h + t.height() + 10; r.css({ left: y + "px", top: e + "px" }); i.css({ left: y + "px", top: e + "px", height: r.height() + "px" }) })(); break }if (t.closeBtn) { var w = document.createElement("a"); t.cbtn = $n(w); t.cbtn.addClass("closeT").html("X"); r.first() ? r.first().append(w) : r.append(w) } t.hideTT() }; t.hideTT = function () { if (t.closeBtn) { t.cbtn.addEvent("click", function () { r.changeClass(""); r.hide(); i.hide(); i.changeClass("") }) } else { t.addEvent(t.closeEvent, function () { r.changeClass(""); r.hide(); i.hide(); i.changeClass("") }) } } }

chainingFunction.prototype.tagIt = function (params) {
    //handle user defined parameters
    var hlpTxtId = params.hlpTxtId || null;
    var hiddenName = params.name || alert("provide name for the hidden input");
    var hiddenId = params.id || alert("provide id for the hidden input")
    var isMandatory = params.mandatory || false;
    var initTag = params.initTag || 0;
    var tagInpId = params.tagInpId;
    var tagLiId = params.tagLiId;
    var tagContId = params.tagContId;
    var currObject = this;
    var tagArr = [];
    var inputValueArr = [], index, currIndex, ipVal;
    var isCtrl = false, isShift = false, rmvAll = false;
    var funcClose = params.callfunc; // callback function on tagadd or delete // my
    var errId = params.errId;    // error div id
    var regExp = params.regExp;
    var maxLength = params.maxLength || 250;  // tag text length
    var maxTags = params.tagslength || 500;   // max tag length
    var errspecial = "Special characters other than -#&+/_.  are not allowed.";
    var errmax = 'Text exceeded allowed length ' + maxLength + '.';
    var errdup = 'Duplicate keywords values are not allowed. ';
    var errtaglimit = 'Max ' + maxTags + ' Tags allowed.';
    var errblank = 'Tag should not be Blank.';
    currObject.init = function () {
        var tagInputId = tagInpId;
        var InputLiId = tagLiId;
        var InputLi = $n("#" + InputLiId);
        var bspaceCount = 0;
        var leftKeyCount = 0;
        if (initTag.length > 0) {//handle case to create previosusly created tags.
            $n("#" + hlpTxtId).hide();
            currObject.show();
            for (var i = 0; i < initTag.length; i++) {
                currObject.createTag(null, initTag[i], null, InputLi);
                currObject.validateOK(initTag[i]);
            }
        }
        $n("#" + tagInputId).addEvent('keyup', function (evt) {
            if (evt.keyCode == 17) isCtrl = false;//reset ctrl val on keyup
            if (evt.keyCode == 16) isShift = false;//reset shift val on keyup
        })
        $n("#" + tagInputId).addEvent('keydown', function (evt) {
            currObject.addRemoveErr(tagInputId, "remove");
            var currSelTag = currObject.childrens(".readyToRemove").first().html();
            var tagsLen = currObject.childrens(".tagList").length;
            ipVal = $n("#" + tagInputId).val();
            var currIdx = -1;
            if (currSelTag) {
                for (var i = 0; i < tagArr.length; i++) {
                    if (tagArr[i] == (" " + currSelTag.toString())) {
                        currIdx = i;
                    }
                }
            }
            if ((evt.keyCode == 46) && (bspaceCount != 0 || leftKeyCount != 0) && ipVal == "") {//handle backspace and left arrow with delete key
                if (currIdx == tagArr.length - 1) {//removing the last element
                    currObject.removeTag();
                } else {//removing random tags
                    currObject.removeTag(null, currIdx);
                }
            }
            if (currIdx != -1 && evt.keyCode == 8 && ipVal == "") {
                currObject.removeTag(null, currIdx);
            }
            if (evt.keyCode == 17) isCtrl = true;//if ctrl
            if (evt.keyCode == 16) isShift = true;//reset shift val on keyup
            if (isCtrl == true && evt.keyCode == 65) {//handle ctrl+A
                for (var i = 0; i < tagsLen; i++) {
                    currObject.childrens(".tagList").eq(i).addClass('remAll');
                }
                rmvAll = true;
            }
            if ((evt.keyCode == 8 || evt.keyCode == 46) && rmvAll == true) {
                for (var i = 0; i < tagsLen; i++) {
                    currObject.childrens(".tagList").eq(i).remove();
                }
                rmvAll = false;
                tagArr = [];//empty array once all tags are deleted.
                $n("#" + hiddenId).val("");
                currObject.callBackfunc();  // my code
            }
            if (evt.keyCode == 188 || (isShift == false && evt.keyCode == 188) || evt.keyCode == 13 || evt.keyCode == 9 || (isShift == false && evt.keyCode == 9)) {// allowed delimiters [comma,enter,tab,autocomplete]
                if (evt.keyCode != 9) $n.preventDefault(evt); //allow default behaviour for tab
                currObject.shouldCreateTag(evt, tagInputId, InputLi);
            }
            if ((isShift == true && evt.keyCode == 188) || ((isShift == true && evt.keyCode == 190))) $n.preventDefault(evt);
            if (evt.keyCode == 8 && ipVal == "" && currIdx == -1) {// if backspace
                leftKeyCount = 0;
                if (bspaceCount == 0) {// just select the tag on first backspace
                    currObject.childrens(".tagList:last").addClass('readyToRemove');
                    bspaceCount++;
                } else if (bspaceCount != 0 && tagsLen) {// delete tag on next backspace
                    currObject.removeTag();
                    bspaceCount--;
                }
            } else {
                bspaceCount = 0;// resets the bkspace count to handle case where user hits backspace once and without deleting the tag continues typing.
                if (tagArr.length == 0) leftKeyCount = 0;//reset leftKeyCount;
            }
            if (ipVal.length == 0 && evt.keyCode == 39) {//right arrow
                if (currIndex >= 0 && currIndex < tagArr.length - 1) {
                    currObject.childrens(".tagList").eq(currIndex + 1).addClass('readyToRemove');
                }
                currObject.childrens(".tagList").eq(currIndex).removeClass('readyToRemove');
                currIndex = currIndex + 1;
                index = currIndex - 1;
            }
            if (ipVal == 0 && evt.keyCode == 37) {//left arrow
                var currSelTag = $n(".readyToRemove").first().html();
                if (currSelTag) var currIdx = tagArr.indexOf(currSelTag.toString().toLowerCase());
                if (leftKeyCount == 0) {
                    if (currIdx != -1) {//handle case where user hits left arrow aftr backspace
                        currObject.childrens(".tagList").eq(currIdx).removeClass('readyToRemove');
                        currObject.childrens(".tagList").eq(currIdx - 1).addClass('readyToRemove');
                        index = currObject.childrens(".tagList").length - 3;
                        currIndex = currIdx - 1;
                    } else {
                        currObject.childrens(".tagList:last").addClass('readyToRemove');
                        index = currObject.childrens(".tagList").length - 2;
                    }
                    leftKeyCount++;
                } else {
                    if (index >= 0 && index < tagArr.length) {
                        currObject.childrens(".tagList").eq(index + 1).removeClass('readyToRemove');
                        currObject.childrens(".tagList").eq(index).addClass('readyToRemove');
                        currIndex = index;
                        index = index - 1;
                    } else {//continue to move in a loop
                        currObject.childrens(".tagList").eq(0).removeClass('readyToRemove');
                        currObject.childrens(".tagList:last").addClass('readyToRemove');
                        index = currObject.childrens(".tagList").length - 2;
                        currIndex = index + 1;
                        leftKeyCount = 1;
                    }
                }
            }
        })
        $n("#" + tagInputId).addEvent('blur', function (evt) {
            if ($n("#" + tagInputId).val() != "") {
                currObject.shouldCreateTag(evt, tagInputId, InputLi);
            }
            if ($n("#" + tagInputId).val() == "" && tagArr.length == 0) {
                $n("#" + hlpTxtId).show();
                currObject.hide();
            }
        })
    }
    currObject.shouldCreateTag = function (evt, tagInputId, InputLi) {
        var inputValue = $n.trim($n("#" + tagInputId).val());
        inputValue = inputValue.replace(/\s+/g, ' ').toString();
        var ifSplChar = currObject.validateSplChar(evt, inputValue, isMandatory);
        //var checkDup,isCtrlAll =  currObject.childrens(".remAll").length;
        if (ifSplChar == 'Blank') {
            var errblankTxt = errblank + ' ' + errspecial;
            currObject.addRemoveErr(tagInputId, "add", errblankTxt);
            //setTimeout(function(){$n("#"+tagInputId).val(inputValue.replace('/amp;/g',''))},80);
        } else if (ifSplChar == 'splchar') {
            currObject.addRemoveErr(tagInputId, "add", errspecial);
        } else if (ifSplChar == true) {
            if (commonValidator.isValid(tagInpId) != false) {
                if (tagArr.length < maxTags) {
                    var checkDup, isCtrlAll = currObject.childrens(".remAll").length;

                    var retVal = currObject.validateComma(inputValue);
                    if (retVal == true) {
                        inputValueArr = inputValue.split(',');
                        for (var i = 0; i < inputValueArr.length; i++) {
                            inputValueArr[i] = $n.trim(inputValueArr[i]);
                            checkDup = currObject.validateDupTag(inputValueArr[i], "array", i);
                            if (inputValueArr[i].length <= maxLength) {
                                if (checkDup == true) {
                                    currObject.addRemoveErr(tagInputId, "remove");
                                    currObject.createTag(evt, inputValueArr[i], tagInputId, InputLi);
                                    currObject.validateOK(inputValueArr[i]);
                                    if (isCtrlAll != 0) currObject.resetIndex(isCtrlAll);
                                    currObject.resetIndex(null);
                                } else {
                                    $n("#" + tagInputId).val("");// if all the comma seperated val are already present than clear the inp.
                                }
                            }
                            else {
                                currObject.addRemoveErr(tagInputId, "add", errmax);
                            }
                        }
                    } else if (inputValue.length <= maxLength) {
                        checkDup = currObject.validateDupTag(inputValue);
                        if (checkDup == true) {
                            currObject.addRemoveErr(tagInputId, "remove");
                            currObject.createTag(evt, null, tagInputId, InputLi);
                            currObject.validateOK(inputValue);
                            if (isCtrlAll != 0) {
                                currObject.resetIndex(isCtrlAll);
                                currObject.resetIndex(null);
                            }
                        } else {
                            currObject.addRemoveErr(tagInputId, "add", errdup);
                        }
                    } else {
                        currObject.addRemoveErr(tagInputId, "add", errmax);
                    }

                    currObject.callBackfunc();
                }
                else {
                    currObject.addRemoveErr(tagInputId, "add", errtaglimit);
                }
            } else {
                return false;
            }
        }
        currObject.callBackfunc();

        setTimeout(function () {
            $n("#" + tagInputId).val('');
        }, 10);
    }
    currObject.validateSplChar = function (evt, inputValue, isMandatory) {
        var regEx, returnval = true; //invalid characters
        regEx = (regExp) ? regExp : /[;$^?*()|\\@'<>%!="{}\[\]~`:]/;
        inputValue = inputValue.toString();

        function checkSpelchar() {
            if (inputValue.length == 0) {
                return false;
            }
            else if (regEx.test(inputValue) == true) {
                return 'splchar';
            } else {
                return true;
            }
        }

        if (tagArr.length == '0') {
            if (isMandatory && inputValue.length == 0) {
                returnval = 'Blank';
            } else {
                returnval = checkSpelchar();
            }
        } else {
            returnval = checkSpelchar();
        }

        return returnval;
    }





    currObject.validateComma = function (inputValue) {
        var inpContainsComma = inputValue.match(',');
        if (inpContainsComma != null && inpContainsComma.length != 0) {
            return true;
        } else {
            return false;
        }
    }
    currObject.validateDupTag = function (inputValue, inpType, index) {
        if (tagArr.length != 0) {
            for (var j = 0; j < tagArr.length; j++) {
                if (inputValue.toLowerCase() == $n.trim(tagArr[j].toLowerCase())) {// check to restrict duplicate tag values
                    if (inpType == "array") {//if comma seperated val
                        return;
                    } else {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    currObject.validateOK = function (inputValue) {
        if (inputValue != "") {
            var inputValue = $n.trim(inputValue);
            tagArr.push(inputValue.replace(/\s+/g, ' '));// if valid then insert tag value to an array.
        }
        $n("#" + hiddenId).val(tagArr.toString().replace(/\s+/g, ' '));// insert tag val to hidden input as comma seperated values.
    }
    currObject.createTag = function (evt, inpVal, tagInputId, InputLi) {
        var tagLi = $n("<li>");
        var tagLabel = $n("<span>");
        var removeAnchor = $n("<a>");
        var removeSpan = $n("<span>");
        var tagInputVal;
        if (inpVal == "") return;
        (inpVal) ? tagInputVal = inpVal : tagInputVal = $n("#" + tagInputId).val();
        tagInputVal = $n.trim(tagInputVal);
        tagLi.addClass("tagList");
        removeAnchor.addClass("tagit-close");
        removeSpan.addClass("close-icon");
        tagLabel.addClass("tagit-label").attr('title', tagInputVal.replace(/\s+/g, ' '));
        tagLabel.html(tagInputVal.replace(/&/g, '&amp;').replace(/\s/g, ' '));
        removeSpan.html("&times;");
        removeAnchor.append(removeSpan);
        tagLi.append(tagLabel);
        tagLi.append(removeAnchor);
        $n("#" + currObject.attr('id')).currObj().insertBefore(tagLi.currObj(), InputLi.currObj());
        $n("#" + tagInputId).val("");
        removeAnchor.addEvent("click", function (evt) {
            currObject.removeTag(evt, null);
            $n("#" + tagInpId).setFocus();
        })
    }
    currObject.removeTag = function (evt, tagToRemove) {
        var currTagValue, targ;
        if (evt) {
            (evt.target) ? targ = $n(evt.target) : targ = $n(evt.srcElement);
            currTagValue = targ.parent().parent().childrens().eq(0).html();
            if (targ.currObj().nodeName.toLowerCase() == 'a') {
                targ = targ.childrens('span');
            }
            targ.parent().parent().remove(); //delete by clicking "remove" icon
            currObject.resetIndex();
        } else if (tagToRemove >= 0 && tagToRemove < tagArr.length - 1) {//removing thru navigation
            currTagValue = $n(".tagit-label").eq(tagToRemove).html();
            if (tagToRemove == 0) {//if deleting the last tag, select the next tag after deletion
                currObject.childrens(".tagList").eq(tagToRemove).remove();
                currObject.childrens(".tagList").eq(0).addClass('readyToRemove');
            } else {
                currObject.childrens(".tagList").eq(tagToRemove).remove();
                currObject.childrens(".tagList").eq(tagToRemove - 1).addClass('readyToRemove');
                index = tagToRemove - 2;
                currIndex = tagToRemove - 1;
            }
        } else {
            currTagValue = $n.trim(currObject.childrens(".tagit-label:last").html());
            currObject.childrens(".tagList:last").remove(); //delete by backspace
        }

        currTagValue = currTagValue.replace(/\s+/g, ' ');
        for (var k = 0; k < tagArr.length; k++) {// delete the removed tag's entry form the array
            currTagValue = currTagValue.replace(/\&amp;/g, '&');
            tagArr[k] = tagArr[k].replace(/\&amp;/g, '&');
            if ($n.trim(currTagValue.toLowerCase()) == $n.trim(tagArr[k].toLowerCase())) {
                tagArr.splice(k, 1);
            }
        }
        $n("#" + hiddenId).val(tagArr.toString());
        currObject.callBackfunc();
    }
    currObject.addRemoveErr = function (tagInputId, errStatus, eMsg) {
        if (errStatus == "add") {
            $n("#" + tagContId).addClass('errfldd');
            $n("#" + tagInputId).addClass('errfldd');
            //$n(".errLabel").show();
            $n("#" + errId).html(eMsg);
            $n("#" + errId).addClass('msg_errf');
        } else {
            $n("#" + tagInputId).removeClass('errfldd');
            $n("#" + tagContId).removeClass('errfldd');
            $n("#" + errId).removeClass('msg_errf');
            $n("#" + errId).html("");
        }
    }
    currObject.resetIndex = function (arg) {
        if (arg) {
            for (var i = 0; i < arg; i++) {
                currObject.childrens(".remAll").eq(i).removeClass("remAll");
            }
            rmvAll = false;
        } else {
            var currSelTag = currObject.childrens(".readyToRemove").first().html();
            if (currSelTag) var currIdx = tagArr.indexOf(currSelTag.toString().toLowerCase());
            if (currIdx != -1) currObject.childrens(".tagList").eq(currIdx).removeClass('readyToRemove');
        }
        index = tagArr.length - 1;//reset index once tag is created
        currIndex = tagArr.length + 1;//reset index once tag is created

    }

    //callback function
    currObject.callBackfunc = function () {
        if (typeof funcClose == 'function') {
            funcClose(hiddenName);
        }
    }

    $n("#" + hlpTxtId).addEvent('focus', function (evt) {
        $n("#" + hlpTxtId).hide();
        currObject.show();
        $n("#" + tagInpId).setFocus();
    })
    $n("#" + hlpTxtId).addEvent('click', function (evt) {
        $n("#" + hlpTxtId).hide();
        currObject.show();
        $n("#" + tagInpId).setFocus();
    })
    currObject.parent().addEvent("click", function (evt) {
        if (tagArr.length != 0) {
            $n("#" + tagInpId).setFocus();
        }
    })
    currObject.init();
}


/* sticky bar js */
function sticky(params) {
    var tId = params.topId, sId = params.stickyId, bId = params.bottomId, fixCss = params.fixedPositionCss || { 'top': '', 'bottom': '', 'left': '', 'right': '' }, relatedTo = params.relatedTo || 'top', fnc;
    if (relatedTo.toLowerCase() == 'top') {
        addEvent1(window, 'load', function () { processStickyTop($n('#' + tId), $n('#' + bId), $n('#' + sId)) });
        addEvent1(window, 'scroll', function () { processStickyTop($n('#' + tId), $n('#' + bId), $n('#' + sId)) });
    }
    else if (relatedTo.toLowerCase() == 'bottom') {
        addEvent1(window, 'load', function () { processStickyBottom($n('#' + tId), $n('#' + bId), $n('#' + sId)) });
        addEvent1(window, 'scroll', function () { processStickyBottom($n('#' + tId), $n('#' + bId), $n('#' + sId)) });
    }

    function processStickyBottom(tObj, bObj, fObj) {
        if (checkViewport(tObj).inView && checkViewport(tObj).top < (checkViewport(tObj).sTop + checkViewport(tObj).clH)) {
            fObj.css({ 'position': 'fixed', 'top': '', 'bottom': '', 'left': '', 'right': '' }); fObj.css(fixCss);
            if ($n.browser().name == 'msie' && $n.browser().version == 6.0) { fObj.css({ 'position': 'absolute' }) };
        }
        (checkViewport(bObj).inView && checkViewport(bObj).top < (checkViewport(bObj).sTop + checkViewport(bObj).clH)) ? fObj.css({ 'position': 'relative', 'top': '', 'bottom': '', 'left': '', 'right': '' }) : '';
        if (!checkViewport(tObj).inView && checkViewport(tObj).top > (checkViewport(tObj).sTop + checkViewport(tObj).clH)) { fObj.css({ 'position': 'relative', 'top': '', 'bottom': '', 'left': '', 'right': '' }) }
        else if (!checkViewport(bObj).inView && checkViewport(bObj).top > (checkViewport(bObj).sTop + checkViewport(bObj).clH)) {
            fObj.css({ 'position': 'fixed', 'top': '', 'bottom': '', 'left': '', 'right': '' }); fObj.css(fixCss);
            if ($n.browser().name == 'msie' && $n.browser().version == 6.0) { fObj.css({ 'position': 'absolute' }) };
        }
    }

    function processStickyTop(tObj, bObj, fObj) {
        if (checkViewport(tObj).inView && checkViewport(tObj).top > checkViewport(tObj).sTop) {
            fObj.css({ 'position': 'relative', 'top': '', 'bottom': '', 'left': '', 'right': '' })
        }
        if (!checkViewport(tObj).inView && checkViewport(tObj).top < checkViewport(tObj).sTop) {
            fObj.css({ 'position': 'fixed', 'top': '', 'bottom': '', 'left': '', 'right': '' }); fObj.css(fixCss);
            if ($n.browser().name == 'msie' && $n.browser().version == 6.0) { fObj.css({ 'position': 'absolute' }) };
        }
        if (!checkViewport(tObj).inView && (!checkViewport(bObj).inView && checkViewport(bObj).top < checkViewport(bObj).sTop)) {
            fObj.css({ 'position': 'relative', 'top': '', 'bottom': '', 'left': '', 'right': '' })
        }
    }

    function checkViewport(el1) {
        el = el1.currObj();
        var top = el1.offTop(), left = el1.offLeft(), width = el1.innerwidth(), height = el1.innerheight();

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }
        var sTop = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop, clH = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight, sLeft = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft, clW = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;

        return ({
            inView: top > sTop && (sTop + height > top),
            top: top,
            left: left,
            sTop: sTop,
            sLeft: sLeft,
            clH: clH,
            clW: clW
        });
    }
    function addEvent1(obj, evt, fn) { (obj.addEventListener) ? obj.addEventListener(evt, fn, false) : obj.attachEvent('on' + evt, fn) }
}
// validation plugin call 
function validateit(fname) {
    commonValidator.validate({
        //formNames : ['myFrm1','myFrm2'],
        formNames: fname,
        errors: commonErrList,
        styles: { errorClass: 'msg_errf', okClass: 'ok', softMandClass: 'softMand' },
        clearOnFocus: false,
        messageBox: { id: 'msgBx', content: { customContent: 'My custom content for the MsgBox', errorCount: 'Total [errCount] errors found - Custom.', errorMessages: true }, hideOthers: false },
        inlineErrors: true,
        defaultEvents: ['blur', 'keyup']
    });
}
// validation plugin call 

// cal code 
var calpobj = '';
function calender(arr) {
    var me = this;
    me.onClickDt = arr.onClickReq || emptyCallBckFun();
    function emptyCallBckFun() { return arguments.length ? function (arguments) { } : function () { }; };
    var newDate = new Date();
    var currDate = newDate.getDate(), currDay = newDate.getDay(), currMonth = newDate.getMonth(), temp = newDate.setDate(1);
    var currentDate = new Date(), d2 = Math.round(currentDate.getTime() / 1000);
    me.show = function (e) {
        var e = e || window.event
        $n.stopPropagation(e)
        if (!me.contId) {


            me.contId = arr.contId;
            me.tabClass = arr.tabClass;
            me.tabId = arr.tabId;
            var weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
            var navArr = ['&#9668;', '&laquo;', '', '&raquo;', '&#9658;'];
            //alert(navArr)
            var eventArr = ['me.prevYear', 'me.prevMonth', 'me.prevMonth', 'nextMonth', 'nextYear']
            me.obj = $n('<div>');
            me.obj.css({ 'position': 'absolute' });
            me.obj.attr('id', me.contId);
            me.obj.addClass('calender');
            var body = $n(document.body);
            body.append(me.obj.currObj());
            me.obj.hide();

            me.ul = $n('<ul>');
            for (k = 0; k < 5; k++) {
                me.li = $n('<li>');
                me.li.html(navArr[k]);

                if (navArr[k] == '') {
                    me.li.addClass('yr nav')
                }
                else { me.li.addClass('nav') }
                me.ul.append(me.li.currObj());
            }
            me.obj.append(me.ul.currObj())
            me.li = $n('#' + me.obj.attr('id') + ' li')
            me.li.eq(0).addEvent('click', me.prevYear)
            me.li.eq(1).addEvent('click', me.prevMonth)
            me.li.eq(3).addEvent('click', me.nextMonth)
            me.li.eq(4).addEvent('click', me.nextYear)
            me.tbs = $n('<table>');
            var tbody = $n('<tbody>');
            me.tbs.attr('cellspacing', '0');
            me.tbs.attr('id', me.tabId)
            me.tbs.addClass(me.tabClass)
            var row = $n("<tr>");
            tbody.append(row.currObj());
            for (m = 0; m < 7; m++) {
                var th = $n("<th>");
                th.html(weekDays[m]);
                row.append(th.currObj());
            }
            for (i = 1; i <= 6; i++) {	//table created one time starts
                var row = $n("<tr>");
                for (j = 0; j < 7; j++) {
                    var td1 = $n("<td>");
                    row.append(td1.currObj());
                }
                tbody.append(row.currObj());
            }
            me.tbs.append(tbody.currObj());
            me.obj.append(me.tbs.currObj())				//table created one time ends


            me.tbs.addEvent('click', function (e) {
                me.dateFiller(e);
                me.onClickDt(me.obj);
            });

        }


        me.currEl = arr.currEl; me.activeF = arr.activeF; me.activeB = arr.activeB; me.sep = arr.sep; me.format = arr.format; me.totalDays = arr.totalDays; me.parentCont = me.calenCont; me.display = me.li.eq(2); me.showDate = $n('#' + arr.showDate); me.monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; me.monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; me.Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        endDate = new Date(), end = endDate.setDate(endDate.getDate() + me.totalDays), backDate = new Date(),
            endB = backDate.setDate(backDate.getDate() - me.totalDays);
        me.contObj = me.obj;
        var pos = $n('#' + me.currEl).position();
        me.contObj.css({ 'left': pos.left + 'px', 'top': pos.top + 20 + 'px' });
        var temp = me.obj;
        if (calpobj !== '' && calpobj != me.obj) { calpobj.hide() };
        me.obj.toggle();
        calpobj = temp;
        var currYear = newDate.getFullYear();
        me.isLeap(currYear);
        me.update(currMonth);	//populate calender		
        me.dateFiller = function (e) {
            me.targ;
            me.e = !e ? window.event : e;
            var targ = (e.target) ? e.target : e.srcElement;
            var disp = $n('#' + me.tbs.attr('id') + ' td')
            me.targ = $n(targ);

            if (me.targ.hasClass('act') || me.targ.hasClass('currDate')) {
                for (h = 0; h < disp.length; h++) {
                    if (disp.eq(h).hasClass('currDate') == 'currDate') {
                        disp.eq(h).changeClass('act');
                        me.targ.changeClass('currDate');

                    }
                    else {
                        me.targ.changeClass('currDate');
                    }
                }
                var yr = newDate.getFullYear(), dat = targ.innerHTML, mon = parseInt(newDate.getMonth() + 1)
                if (me.format == 'ymd') {

                    me.showDate.val(yr + me.sep + mon + me.sep + dat)
                    me.contObj.hide();

                }
                else if (me.format == 'mdy') {
                    me.showDate.val(mon + me.sep + dat + me.sep + yr)
                    me.contObj.hide();
                }
                else if (me.format == 'dmy') {
                    me.showDate.val(dat + me.sep + mon + me.sep + yr)
                    me.contObj.hide();
                }
            }
        }



        document.onclick = function (e) {

            if (!e) var e = window.event;
            if (e.target) targ = e.target;
            else if (e.srcElement) targ = e.srcElement;
            while (targ.parentNode) {
                targ = targ.parentNode;
                if (targ.id == me.contId)
                    return false;
            }
            me.contObj.hide()
        }
    }
    me.isLeap = function (year) {								// check leap year
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            return me.monthArr[1] = 29;
        }
        else {
            return me.monthArr[1] = 28;
        }
    }
    me.splitDate = function (dateObj) {
        var dateObj = dateObj.toString();
        dateObj = dateObj.split(" ")
        return dateObj;
    }
    me.currDay = function (t) {
        for (i = 0; i < me.Days.length; i++) {						// find day for 1 date of every month
            if (me.Days[i] == t[0]) {
                return currDay = i;
            }
        }
    }
    var demo = new Date()
    var d1 = Math.round(demo.getTime() / 1000);
    me.update = function (currVal) {
        var disp = $n('#' + me.obj.attr('id') + ' td')
        var t = me.splitDate(newDate);
        currDay = me.currDay(t);
        var mm = newDate.getMonth();
        var yrr = newDate.getFullYear();
        me.display.html(me.monthName[mm] + " " + newDate.getFullYear());								// display current month & year
        for (i = 0; i < 42; i++) {																			// empty table to refill it starts
            disp.html("");																	// appy to all objects						
            disp.eq(i).changeClass('disable'); 						//  set class blank if already not set
        }
        /* empty table to refill it ends*/
        for (k = 0; k < me.monthName.length; k++) {
            me.monthName[k] == t[1] ? currVal = k : '';
        }
        for (j = 0; j < me.monthArr[currVal]; j++) {						//loop through month
            var d = demo.setDate(j + 1);
            var d = demo.setMonth(currVal);
            var d = demo.setYear(newDate.getFullYear());
            disp.eq(j + currDay).html(j + 1);
            var d1 = Math.round(demo.getTime() / 1000);
            disp.eq(j + currDay).changeClass('act');
            if (me.activeF) {
                disp.eq(j + currDay).changeClass('disable');
                if (demo >= currentDate) {
                    if (demo <= endDate) {
                        disp.eq(j + currDay).changeClass('act');
                    }
                }
            }
            if (me.activeB) {
                disp.eq(j + currDay).changeClass('disable');
                demo <= currentDate ? (demo >= backDate ? disp.eq(j + currDay).changeClass('act') : '') : '';		// keep dates active for 90 days
            }
            if (me.showDate.attr('value') != '') {
                var ddd = me.showDate.attr('value');
                ddd = ddd.split(me.sep)
                var yr = newDate.getDate()
                if (me.format == 'mdy') {
                    var dateIn = ddd[1];
                    var MonIn = ddd[0];
                    var YrIn = ddd[2];
                }
                if (me.format == 'ymd') {
                    var dateIn = ddd[2];
                    var MonIn = ddd[1];
                    var YrIn = ddd[0];

                }
                else if (me.format == 'dmy') {
                    var dateIn = ddd[1];
                    var MonIn = ddd[0];
                    var YrIn = ddd[2];
                }
                if (MonIn == mm + 1 && dateIn == disp.eq(j + currDay).html() && YrIn == yrr) {
                    disp.eq(j + currDay).changeClass('currDate')
                }
            }
            else {
                if (disp.eq(j + currDay).html() == currentDate.getDate()) {
                    var d1 = Math.round(demo.getTime() / 1000);
                    d1 == d2 ? disp.eq(j + currDay).changeClass('currDate') : '';
                }
            }
        }
    }
    me.nextMonth = function () {
        var currMonth = newDate.getMonth();
        me.isLeap(newDate.getFullYear());
        newDate.setMonth(currMonth + 1);
        currMonth = newDate.getMonth();
        me.update(currMonth)
        var t = me.splitDate(newDate);
        currDay = me.currDay(t)			// getting a day for the 1st of the current month					
    }
    me.prevMonth = function () {
        var currYear = newDate.getFullYear();
        me.isLeap(currYear);
        var currMonth = newDate.getMonth();
        newDate.setMonth(currMonth - 1)
        currMonth = newDate.getMonth();
        me.update(currMonth);
        var t = me.splitDate(newDate);
        currDay = me.currDay(t)			// getting a day for the 1st of the current month
    }
    me.nextYear = function () {
        var currMonth = newDate.getMonth();
        var currYr = newDate.getFullYear();
        newDate.setYear(currYr + 1);
        newDate.setMonth(currMonth);
        currYr = newDate.getFullYear()
        var t = me.splitDate(newDate)
        me.display.html(t[1] + " " + t[3]);
        currYr = t[3]
        me.isLeap(currYr);
        me.update(currMonth)
    }
    me.prevYear = function () {
        var currMonth = newDate.getMonth();
        var currYr = newDate.getFullYear();
        newDate.setYear(currYr - 1);
        currYr = newDate.getFullYear();
        newDate.setMonth(currMonth);
        var t = me.splitDate(newDate);
        me.display.html(t[1] + " " + t[3]);
        currYr = t[3]
        me.isLeap(currYr);
        me.update(currMonth)
    }


}



// single menu

var showHidemMenuDD = function (jobj) {
    if (!(this instanceof showHidemMenuDD)) return new showHidemMenuDD(jobj);

    var T = this, timer;
    T.cId = jobj.containerId;
    T.linkId = jobj.linkId;
    T.mapping = {};
    T.currOpen = '';
    T.c = $n(T.cId),
        T.a = $n(T.linkId);
    var tobj = T.cId + ',' + T.linkId;
    $n(tobj).addEvent("mouseover", function () {
        clearTimeout(timer)
        if (T.a.hasClass("active")) return;
        var pos = $n(this);
        if (pos.currObj().nodeName == "EM") {
            pos = pos.parent();
        }
        T.c.show().css({ 'top': pos.offTop() + pos.height() + 'px', 'left': pos.offLeft() - T.c.width() + pos.width() + 'px' });
        T.a.addClass("active");
        T.currOpen = ($n.browser().name == "msie") ? $n(this).parent() : $n(this)
    }).addEvent("mouseout", function () {
        timer = setTimeout(function () {
            T.a.removeClass("active")
            T.c.hide();
        }, 50)
    });
}



function doGetCaretPosition(ctrl) {
    var CaretPos = 0; // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}

function setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}


var scrollY = 0;
var distance = 40;
var speed = 24;

function autoScrollTo(el) {
    var currentY = window.pageYOffset;
    var targetY = document.getElementById(el).offsetTop;
    var bodyHeight = (document.body.offsetHeight) - (window.innerHeight / 10);
    var yPos = currentY + window.innerHeight;
    var animator = setTimeout('autoScrollTo(\'' + el + '\')', 24);
    if (yPos > bodyHeight) {
        clearTimeout(animator);
    } else {
        if (currentY < targetY - distance) {
            scrollY = currentY + distance;
            window.scroll(0, scrollY);
        } else {
            clearTimeout(animator);
        }
    }
}

/*Set placeholder to those IE versions which not support placeholder*/

var PlaceHolder = function (input, defVal) {
    if (!input) return;
    input.onfocus = function () {
        if (input.value == defVal) {
            input.value = "";
            input.style.color = '#444';
        }
    };
    function remove() {
        if (input.value == "") {
            input.value = defVal;
            input.style.color = '#999';
        }
    }
    if (input.value == defVal) {
        input.style.color = '#999';
    }
    else {
        input.style.color = '#444';
    }
    input.onblur = remove;
    remove();
}

/*set Placeholder dynamically on each element at run time to remove IE7 "getAttribute('placeholder')" problem*/
function setPlaceholderDynamically(data) {
    for (var id in data) {
        $n('#' + id).attr('placeholder', data[id]);
    }
}

//addactive Class on obj

function themeActive(obj) {
    $n(obj).addEvent('click', function () {
        var myobj = $n(this);
        while (myobj.currObj().nodeName.toLowerCase() != 'div') {
            myobj = myobj.parent();
        }
        $n(obj).removeClass('active');
        myobj.addClass('active');
    })
}


// ajax loader start
var ajaxOverlay = function (o) {
    var t = this;
    t.context = $n(o.elem);
    t.width = o.width || 75;
    t.height = o.height;
    t.flexH = o.flexHeight || false;
    t.fixed = o.fixed;
    t.relative = o.relative || false;
    t.addCl = o.addClass || '';
    t.overlay = null;

};

ajaxOverlay.prototype = {
    resetFixedOverlayPosition: function (f) {
        var e = this.context.position(), d = f ? f : 0;
        if (e) {
            this.overlay.css({ 'left': e.left + 'px', 'top': e.top - d / 2 + this.context.height() / 2 + 'px' });
        }
    },

    show: function (i) {

        var mo = i || this.context,
            overlayer = this.overlay,
            moheight = mo.height(),
            mowidth = mo.width(),
            lw = this.width,
            oh = (moheight < lw) ? lw : moheight,
            ow = (mowidth < lw) ? lw : mowidth,
            po = mo.position()
        bod = $n('body');

        if (!overlayer) {
            overlayer = $n('<div>').addClass('processing-overlay processing-overlay-' + this.width + ' ' + this.addCl);


            if (!this.relative) {
                bod.append(overlayer);
            } else {
                mo.append(overlayer);
            }
            this.overlay = overlayer;
        }

        if (overlayer.parent().currObj().nodeName !== 'BODY') {
            if (!this.relative) {
                bod.append(overlayer);
            } else {
                mo.append(overlayer);
            }
        }
        overlayer.css({ 'width': ow + 'px' });
        overlayer.css({ 'height': (this.flexH) ? '100%' : oh + 'px' });

        if (!this.relative) {
            if (!this.fixed) {
                overlayer.css({ 'left': po.left + 'px', 'top': po.top + 'px' });
            } else {
                overlayer.css({ 'position': 'fixed' });
                this.resetFixedOverlayPosition(oh)
            }
        } else {
            overlayer.css({ 'left': '0', 'top': '0' });
        }
        if (!mo.length) {
            return;
        }
        if (mo.currObj().getAttribute('id') === "_bodyContent") {
            overlayer.currObj().style.position = "fixed";
            overlayer.css({ 'top': '0px', 'left': '0px' });
            overlayer.removeClass("top");
        }
        overlayer.css({ 'visibility': 'visible' });
    },
    hide: function () {
        var e;
        //console.log(this.overlay.currObj() && this.overlay.currObj());
        if (this.context.html() == '') { this.overlay = null; }
        if (this.overlay && this.context.html() != '') {
            this.overlay.remove();
            this.overlay = null;
        }
    }
}
// ajax loader end


// check json obj empty
function objnotEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return true;
    }
    return false;
}
Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) { return i; }
    }
    return -1;
}


// check json obj empty
function objnotEmpty(obj) { for (var key in obj) { if (obj.hasOwnProperty(key)) return true; } return false; }

var starRate = { init: function (e) { var m = this, k = (e.containerId.constructor == Array) ? e.containerId : e.containerId.split(","), j = e.inactiveClass || "inactive", a = e.activeClass || "active", d = e.activeHoverClass || "", f = e.selectedClass || "selected", o = e.onSelect || null, i = e.uncheckable || false, l = e.starCount || 5, c, n, h; for (n = 0; n < k.length; n++) { var b = k[n].split("|")[0], g = k[n].split("|")[1] || 0; h = m.generateStars(b, j, a, d, f, o, i, g, l); c = $n("<input>").attr({ type: "hidden", id: b + "_val", value: g }); $n("#" + b).append(h).append(c) } }, generateStars: function (l, i, j, m, p, e, d, g, c) { var h = $n("<ul>"), o, k; for (k = 0; k < c; k++) { o = $n("<li>"); o.attr({ id: l + "Str_" + k }); if (g > 0 && k < g) { o.attr({ "class": p }) } else { o.attr({ "class": i }) } o.addEvent("mouseover", f); o.addEvent("mouseout", b); o.addEvent("click", a); h.append(o) } function f() { var s = $n(this), r = s.parent().childrens("li"), q = s.attr("id").split("_")[1], n; for (n = 0; n < r.length; n++) { if (r.eq(n).attr("id").split("_")[1] <= q && r.eq(n).hasClass(p) != p) { r.eq(n).addClass(j) } else { if (r.eq(n).attr("id").split("_")[1] <= q && r.eq(n).hasClass(p) == p) { r.eq(n).addClass(m) } } } if (m) { r.removeClass(p) } } function b() { var s = $n(this), r = s.parent().childrens("li"), q = s.attr("id").split("_")[1], n = $n("#" + l + "_val").val(); r.removeClass(j).removeClass(m); for (k = 0; k < n; k++) { r.eq(k).removeClass(p).addClass(p) } } function a() { var u = $n(this), t = u.parent().childrens("li"), s = u.attr("id").split("_")[1], v = 0, n, r = true; if (d && (+s + 1) == $n("#" + l + "_val").val()) { if ((u.next() && u.next().hasClass(p) != p) || !u.next()) { t.removeClass(p); for (n = 0; n < t.length; n++) { if (t.eq(n).attr("id").split("_")[1] <= s) { t.eq(n).removeClass(p).removeClass(m).addClass(j); v++ } } v = 0 } else { t.removeClass(p); for (n = 0; n < t.length; n++) { if (t.eq(n).attr("id").split("_")[1] <= s) { t.eq(n).removeClass(j).removeClass(m).addClass(p); v++ } } } } else { if (u.hasClass(p) == p) { if ((u.next() && u.next().hasClass(p) != p) || !u.next()) { r = false } } t.removeClass(p); for (n = 0; n < t.length; n++) { if (t.eq(n).attr("id").split("_")[1] <= s) { t.eq(n).removeClass(j).removeClass(m).addClass(p); v++ } } } if (r) { q() } function q() { $n("#" + l + "_val").val(v); starRate.ratingValue = v; starRate.id = l; if (e) { e(u) } } } return h } };


$n(document).ready(function () { customScroll.init(); if (window.onresize) window.onresize() }); customScroll = (function () { var g = $n.browser(); if (g.name == "msie") { if (g.version == "8.0") { g.offset = 4 } else { if (g.version == "7.0") { $n("html").css({ overflow: "auto" }) } } } SCROLL = {}; var k = function (m, n) { m[n].area.fadeIn(); m[n].area.show(); if (m[n].hideId) { window.clearTimeout(m[n].hideId) } m[n].hideId = window.setTimeout(function () { m[n].area.fadeOut() }, 3000) }; var j = function (m, n) { m[n].area.hide() }; var i = function (m, p, n) { var o = m.csb_covered.currObj(); n == "X" ? o.scrollLeft += p || 10 : o.scrollTop += p || 10 }; var h = function (m, p, n) { var o = m.csb_covered.currObj(); n == "X" ? o.scrollLeft -= p || 10 : o.scrollTop -= p || 10 }; var e = function (m) { var n = m.csb_covered.currObj(); n.scrollTop = n.scrollHeight }; var d = function (m, o) { var n = m.csb_covered.currObj(); if (o == "Y") { var p = n.scrollTop; n.scrollTop = n.scrollHeight; m[o].maxScrollBack = n.scrollTop; n.scrollTop = p; m[o].RATIO = (m[o].pane.height() - m[o].bar.height()) / m[o].maxScrollBack } else { var p = n.scrollLeft; n.scrollLeft = n.scrollWidth; m[o].maxScrollBack = n.scrollLeft; n.scrollLeft = p; m[o].RATIO = (m[o].pane.width() - (g.version == "7.0" ? 0 : (m[o].pane.siblings().width() * 2)) - m[o].bar.width()) / m[o].maxScrollBack } }; var f = function (m) { m.sH = m.csb_covered.currObj().scrollHeight; m.cH = m.csb_covered.currObj().clientHeight; m.sW = m.csb_covered.currObj().scrollWidth; m.cW = m.csb_covered.currObj().clientWidth; return { X: m.sW > m.cW, Y: m.sH > m.cH } }; var c = function (o) { var r = f(o); if (r.Y) { k(o, "Y"); var t = (o.Y.area.currObj().clientHeight) - (o.Y.pane.siblings().height() * 2); t > 0 ? o.Y.pane.show() : o.Y.pane.hide(); o.Y.pane.css({ height: t + "px" }); var q = Math.pow(t, 2); var n = Math.max(q / o.sH, 20); o.Y.bar.css({ height: n + "px" }); d(o, "Y") } else { j(o, "Y") } if (r.X) { k(o, "X"); var p = o.X.pane.width() - (g.version == "7.0" ? 0 : (o.X.pane.siblings().width() * 2)); var m = Math.pow(p, 2); var s = Math.max(m / o.sW, 20); o.X.bar.css({ width: s + "px" }); d(o, "X") } else { j(o, "X") } return false }; var b = function (o, n, q, p, m) { n = '<div class="csb_cover" onscroll="this.scrollTop = this.scrollLeft = 0"><div class="csb_area_common csb_area"><a class="anchor up back"></a><div class="csb_pane"><div class="csb_bar"></div></div><a class="anchor down forward"></a></div><div class="csb_area_common csb_area_hoz"><a class="anchor left back"></a><a class="anchor right forward"></a><div class="csb_pane"><div class="csb_bar"></div></div></div><div class="csb_covered"><div class="content_Cont"></div></div></div>'; p = $n("<div>").html(n).first(); var m = {}; m.Y = { area: p.childrens(".csb_area:last"), pane: p.childrens(".csb_area .csb_pane:last"), bar: p.childrens(".csb_area .csb_bar:last") }; m.X = { area: p.childrens(".csb_area_hoz:last"), pane: p.childrens(".csb_area_hoz .csb_pane:last"), bar: p.childrens(".csb_area_hoz .csb_bar:last") }; m.csb_cover = p; m.csb_covered = p.childrens(".csb_covered:last"); m.content_Cont = p.childrens(".content_Cont:last"); m.elem = o; q = o.currObj().childNodes; while (q.length) { m.content_Cont.append($n(q[0])) } o.append(p); return m }; var a = function (m) { m.csb_covered.addEvent("scroll", function (r) { if (m.csb_covered.currObj().scrollHeight != m.sH || m.csb_covered.currObj().scrollWidth != m.sW) { c(m) } if ((m.lastScrollTop || 0) != m.csb_covered.currObj().scrollTop) { k(m, "Y"); m.lastScrollTop = m.csb_covered.currObj().scrollTop; var q = (m.lastScrollTop) * m.Y.RATIO || 0; m.Y.bar.css({ top: q + "px" }) } if ((m.lastScrollLeft || 0) != m.csb_covered.currObj().scrollLeft) { k(m, "X"); m.lastScrollLeft = m.csb_covered.currObj().scrollLeft; var p = (m.lastScrollLeft) * m.X.RATIO || 0; m.X.bar.css({ left: p + "px" }) } }); var o = function (p, t, q) { q = q || "Y"; var u = q == "X" ? t.clientX : t.clientY; var s = p[q].bar; var r = s.currObj().getBoundingClientRect(); if ($n(t.target).hasClass("csb_pane")) { direction = (q == "X" ? u < r.left : u < r.top) ? h : i } else { direction = $n(t.target).hasClass("back") ? h : i } p[q].intvID = window.setInterval(function (w) { w = document.elementFromPoint(SCROLL.mouseX, SCROLL.mouseY); if (!$n(w).hasClass("csb_pane") && !$n(w).hasClass("anchor")) { return window.clearInterval(p[q].intvID) } var v = 10; if ($n(w).hasClass("csb_pane")) { v *= 10 } direction(p, v, q) }, 100); document.body.onselectstart = function () { return false } }; var n = { X: 1, Y: 1 }; for (key in n) { (function (p) { m[p].area.addEvent("mousedown", function (q) { $n.preventDefault(q); q = q || window.event; q.target = q.target || q.srcElement; o(m, q, p) }).addEvent("mouseup", function () { window.clearInterval(m[p].intvID); document.body.onselectstart = null }); m[p].bar.addEvent("mousedown", function (q) { q = q || window.event; m[p]["prev_pos"] = q["client" + p]; SCROLL.dir = p; SCROLL.dragged = m; document.body.onselectstart = function () { return false }; $n.preventDefault(q) }); m.csb_covered.addEvent("mouseover", function () { if (m.csb_covered.currObj().scrollHeight != m.sH || m.csb_covered.currObj().scrollWidth != m.sW) { c(m) } else { var q = f(m); if (q.X) { k(m, "X") } if (q.Y) { k(m, "Y") } } }) }(key)) } }; var l = function (o, m, n) { o = $n(".nScroll"); for (n = o.length - 1; n > -1; n--) { o.eq(n).toggleClass("nScroll", "nScrollable"); m = b(o.eq(n)); a(m); c(m); if (o.eq(n).currObj().nodeName == "BODY") { $n("body").css({ margin: "0px" }); window.onresize = function () { $n("body").css({ height: $n("body").innerheight() - (g.offset || 0) + "px" }); $n("body").css({ width: $n("body").innerwidth() - (g.offset || 0) + "px" }); c(m) } } var p = (function (v) { o.eq(n).currObj().scrollDownMax = function () { e(v) }; var s = v.elem.currObj().style.minHeight.slice(0, -2) || 0; var t = v.elem.currObj().style.maxHeight.slice(0, -2) || 0; var w = v.elem.currObj().style.minWidth.slice(0, -2) || 0; var u = v.elem.currObj().style.maxWidth.slice(0, -2) || 0; if (s || t || w || u) { v.csb_cover.css({ maxHeight: t + "px", minHeight: s }); v.csb_covered.css({ maxHeight: t + "px", minHeight: s }); c(v); var r = document.createElement("iframe"); var q = document.createElement("div"); q.className = "resizeIframe"; v.content_Cont.append($n(q)); $n(q).append($n(r)); r.src = "about:blank"; setTimeout((function (x) { return function () { var y = window.frames[window.frames.length - 1]; $n(y).addEvent("resize", function () { c(x) }) } }(v)), 1000) } }(m)) } }; $n(document.documentElement).addEvent("mousemove", function (m, o, n) { return function (r) { r = r || window.event; m = SCROLL.mouseX = r.clientX; o = SCROLL.mouseY = r.clientY; if (SCROLL.dragged) { var t = SCROLL.dir == "X" ? m : o; var s = SCROLL.dragged[SCROLL.dir]; prev_pos = s.prev_pos; prev_absDiff = s.prev_absDiff || 0; var q = Math.abs(t - prev_pos); if (q) { if (prev_absDiff != q) { n = q / s.RATIO } var p = (t > prev_pos) ? i(SCROLL.dragged, n, SCROLL.dir) : h(SCROLL.dragged, n, SCROLL.dir) } s.prev_pos = t; s.prev_absDiff = q } } }()).addEvent("mouseup", function (m) { if (SCROLL.dragged) { SCROLL.dragged = null; document.body.onselectstart = null } }).addEvent("mouseenter", function () { if (SCROLL.dragged && (g.name == "msie")) { SCROLL.dragged = null; document.body.onselectstart = null } }); return { init: l } }());

// List Up and down

var reOrder = { browserSupport: function () { return false }, init: function (c) { var b = c.ids || null; reOrder.cB = c.callBack || null; if (b && b.constructor === Array) { for (var a = 0; a < b.length; a++) { (function (d) { reOrder.process(d) })(b[a]) } } else { this.process(b) } }, process: function (d) { var b = $n("#" + d); if (b.currObj()) { var a = b.childrens("li"), c = []; a.each(function () { c = c.concat(reOrder.getUDElms($n(this), true)) }); this.bindUpDownEvents(c) } }, getUDElms: function (b, c) { var a = []; b.childrens().each(function () { if ($n(this).attr("move") && ($n(this).attr("move") == "up" || $n(this).attr("move") == "down")) { if (c) { $n(this).removeAttr("ochk") } a.push($n(this)) } }); return a }, bindUpDownEvents: function (b) { for (var a = 0; a < b.length; a++) { if (b[a].attr("move") == "up") { this.bindUp(b[a]) } else { if (b[a].attr("move") == "down") { this.bindDown(b[a]) } } } }, bindUp: function (a) { if (a.attr("ochk") == "undefined" || a.attr("ochk") != 1) { a.attr("ochk", 1); a.addEvent("click", function () { var h = $n(this), d = $n(this).parent().parent(), l = d.prev(), n = $n(d.clone()), f = d.parent(); if (reOrder.browserSupport()) { try { var k = $n(d.clone()), g = reOrder.getPos(d), m = reOrder.getPos(l); g.top = g.top - reOrder.getStyle(d.currObj(), "padding-top") - (d.height() - d.currObj().clientHeight); g.width = d.width() - (reOrder.getStyle(d.currObj(), "padding-left") * 2) - (d.width() - d.currObj().clientWidth); k.css({ position: "absolute", left: g.left + "px", top: g.top + "px", width: g.width + "px", "z-index": 9999 }); m.top = m.top - reOrder.getStyle(l.currObj(), "padding-top") - (l.height() - l.currObj().clientHeight); m.width = l.width() - (reOrder.getStyle(l.currObj(), "padding-left") * 2) - (l.width() - l.currObj().clientWidth) } catch (i) { } } if (l) { n.childrens().each(function () { if ($n(this).attr("move") && ($n(this).attr("move") == "up" || $n(this).attr("move") == "down")) { $n(this).removeAttr("ochk") } }); d.remove(); if (reOrder.browserSupport()) { f.append(k); n.css({ visibility: "hidden" }) } else { n.hide() } f.currObj().insertBefore(n.currObj(), l.currObj()); if (reOrder.browserSupport()) { var b = setInterval(function () { k.currObj().style.top = (parseInt(k.currObj().style.top) - 1) + "px"; if (parseInt(k.currObj().style.top) <= m.top) { clearInterval(b); k.remove(); n.css({ visibility: "visible" }) } }, 3) } else { n.fadeIn() } var j = reOrder.getUDElms(n, false); reOrder.bindUpDownEvents(j); n.show(); if (reOrder.cB) { reOrder.cB(f, n) } } }) } }, bindDown: function (a) { if (a.attr("ochk") != 1) { a.attr("ochk", 1); a.addEvent("click", function () { var h = $n(this), c = $n(this).parent().parent(), k = c.next(), m = $n(c.clone()), f = c.parent(); if (reOrder.browserSupport()) { try { var j = $n(c.clone()), g = reOrder.getPos(c), l = reOrder.getPos(k); g.top = g.top - reOrder.getStyle(c.currObj(), "padding-top") - (c.height() - c.currObj().clientHeight); g.width = c.width() - (reOrder.getStyle(c.currObj(), "padding-left") * 2) - (c.width() - c.currObj().clientWidth); j.css({ position: "absolute", left: g.left + "px", top: g.top + "px", width: g.width + "px", "z-index": 9999 }); l.top = l.top - reOrder.getStyle(k.currObj(), "padding-top") - (k.height() - k.currObj().clientHeight); l.width = k.width() - (reOrder.getStyle(k.currObj(), "padding-left") * 2) - (k.width() - k.currObj().clientWidth) } catch (i) { } } if (k) { var d = k.next(); if (d) { m.childrens().each(function () { if ($n(this).attr("move") && ($n(this).attr("move") == "up" || $n(this).attr("move") == "down")) { $n(this).removeAttr("ochk") } }); c.remove(); if (reOrder.browserSupport()) { f.append(j); m.css({ visibility: "hidden" }) } else { m.hide() } f.currObj().insertBefore(m.currObj(), d.currObj()); if (reOrder.browserSupport()) { var b = setInterval(function () { j.currObj().style.top = (parseInt(j.currObj().style.top) + 1) + "px"; if (parseInt(j.currObj().style.top) >= l.top) { clearInterval(b); j.remove(); m.css({ visibility: "visible" }) } }, 3) } else { m.fadeIn() } var n = reOrder.getUDElms(m, false); reOrder.bindUpDownEvents(n); m.show(); if (reOrder.cB) { reOrder.cB(f, m) } } else { m.childrens().each(function () { if ($n(this).attr("move") && ($n(this).attr("move") == "up" || $n(this).attr("move") == "down")) { $n(this).removeAttr("ochk") } }); c.remove(); if (reOrder.browserSupport()) { f.append(j); m.css({ visibility: "hidden" }) } else { m.hide() } f.append(m); if (reOrder.browserSupport()) { var b = setInterval(function () { j.currObj().style.top = (parseInt(j.currObj().style.top) + 1) + "px"; if (parseInt(j.currObj().style.top) >= l.top) { clearInterval(b); j.remove(); m.css({ visibility: "visible" }) } }, 3) } else { m.fadeIn() } var n = reOrder.getUDElms(m, false); reOrder.bindUpDownEvents(n); m.show(); if (reOrder.cB) { reOrder.cB(f, m) } } } }) } }, getPos: function (b) { try { return b.position() } catch (a) { } }, getStyle: function (c, b) { var a = ""; if (document.defaultView && document.defaultView.getComputedStyle) { a = document.defaultView.getComputedStyle(c, "").getPropertyValue(b) } else { if (c.currentStyle) { b = b.replace(/\-(\w)/g, function (g, f) { return f.toUpperCase() }); a = c.currentStyle[b] } } return parseInt(a) } };// JavaScript Document