/*! 2021-11-23 */
var _bgo={bg:{}};window.bgo?_bgo=window.bgo:window.bgo=_bgo;var ajaxRequest={jsonP:function(){this._done=!1,this._requestData=null,this.handleLoad=function(a){if(!a._done){a._done=!0;var b=_bgo.bg.response;1==b.status?a._requestData.ok(b):a._requestData.error(b),a._requestData=null}},this.request=function(a,b){function c(){d._done||"complete"!==e.readyState||d.handleLoad(d)}var d=this;d._done=!1,d._requestData=b;var e=document.createElement("script");document.body.appendChild(e),e.onreadystatechange=c,e.onload=function(){d.handleLoad(d)},e.src=a,b.done||(b.done=function(a){console.info(a)})}}},_processedPromotions=0,_promotionsGadget={init:function(){this.hideUnavailablePromos()},showTerms:function(a){var b=document.getElementById(a);return b?(b.style.display="block",!0):!1},hideTerms:function(a){var b=document.getElementById(a);return b?(b.style.display="none",!0):!1},removeRelatedNodes:function(a){var b=document.getElementById("subnavigation_"+a.id);b&&b.parentNode.parentNode.removeChild(b.parentNode),a.parentNode.removeChild(a)},hideUnavailablePromos:function(){for(var a=this.getTodayDateTime(),b={},c=document.querySelectorAll("[data-promotionid]"),d=0;d<c.length;d++){var e=c[d],f=JSON.parse(e.dataset.promotioninfo),g=this.getDateTime(f.startSellingDate);if(g&&g>a)this.removeRelatedNodes(e);else{var h=this.getDateTime(f.stopSellingDate);if(h&&a>h)this.removeRelatedNodes(e);else{var i=this.getDateTime(f.checkInDateTo);i&&a>i?this.removeRelatedNodes(e):b[f.packageid]={node:e,data:f}}}}this.checkBestRateAdvanceBooking(b)},filterResponse:function(a){var b,c={};for(var d in a)b=d.split(".")[0],c[b]?parseFloat(a[d].rate)<parseFloat(c[b].rate)&&(c[b]=a[d]):c[b]=a[d];return c},checkBestRateAdvanceBooking:function(a){var b=Object.keys(a).map(function(a){return a.split(".")[0]}),c=window.sessId||"ws"+(new Date).getTime(),d=securePath+"/logic/requestHandler.v04.php?action=bestOffersRates&hasPromotions=1&sess_id="+c+"&apikey="+apiKey+"&hotelId="+hotelId+"&language="+bginit.vars.language+"&offers="+JSON.stringify(b),e=new ajaxRequest.jsonP;e.request(d,{ok:function(c){var c=c.js||[],d=c.inactive||[],e=_promotionsGadget.filterResponse(c.bars);for(var f in b){var g=b[f],h=a[g].data,i=h.promotionid,j=a[g].node;if(d.length>0&&-1!=d.indexOf(h.packageid)){var k=document.getElementById("subnavigation_"+j.id);k&&k.parentNode.parentNode.removeChild(k.parentNode),j.parentNode.removeChild(j)}else{var l,m=document.getElementsByClassName("minRateValue_"+i),n=j.getElementsByClassName("bgLink");for(var o in n)if(!isNaN(o)&&n[o]&&-1!==n[o].rel.indexOf("bglinkBAR")){l=n[o];break}if(l)if(e[g]){if(m.length>0){var p,q=_promotionsGadget.formatCurrency(e[g].rate);for(p=0;p<m.length;p++)m[p].innerHTML=q,m[p].parentNode.style.display="block"}else m=document.getElementById("minRateValue_"+i),m.innerHTML=q,m.style.display="block";-1!==l.rel.indexOf("bglinkBARMobile")&&(l.href=l.href+"&startDay="+e[g].day),l.rel=l.rel.replace("[0","["+e[g].day),j.dataset.price=e[g].rate,j.dataset.checkin=e[g].day,_processedPromotions++;for(var r=document.getElementById(i+"_terms"),s=0;s<r.children.length;s++){if("promotions-termsText"==r.children[s].className&&("undefined"==typeof e[g].cancel_policy.cancellation_text&&(e[g].cancel_policy.cancellation_text=""),r.children[s].innerHTML=e[g].cancel_policy.cancellation_text,e[g].cancel_policy.cancel_rules))for(var t=0;t<e[g].cancel_policy.cancel_rules.length;t++)r.children[s].innerHTML+=e[g].cancel_policy.cancel_rules[t].text+"<br>";if("promotions-cancelText"==r.children[s].className&&("undefined"==typeof e[g].cancel_policy.guarantee_text&&(e[g].cancel_policy.guarantee_text=""),r.children[s].innerHTML=e[g].cancel_policy.guarantee_text,e[g].cancel_policy.deposit_rules))for(var t=0;t<e[g].cancel_policy.deposit_rules.length;t++)r.children[s].innerHTML+=e[g].cancel_policy.deposit_rules[t].text+"<br>"}}else l.parentNode.removeChild(l)}}for(var u in e){var v=e[u];if(a[u]){j=a[u].node;var n=j.getElementsByClassName("bgLink");if(v.startDate||v.nights)for(var o in n)if(!isNaN(o)&&n[o]&&-1!==n[o].rel.indexOf("bglink")){l=n[o];var w=l.rel.match(/^[^\[]*/);w=w[0];var x=l.rel.match(/\[.+?\]/g);x=x[0].split(","),v.startDate&&(x[0]="["+v.startDate),v.nights&&(x[1]=v.nights),x=x.join(),l.rel=w+x,l.addEventListener("click",function(){var a=this.rel,b=a.match(/^bglink.*?\[(.*?)\]/i)[1],c=b.split(",");window.location.href=bginit.vars.purl+"?apikey="+bginit.vars.apikey+"&startDay="+c[0]+"&nrNights="+c[1]+"&preselect="+c[2]+(bginit.vars.linkerParam?"&"+bginit.vars.linkerParam:"")})}}}for(var y in a)if(!e[y]){j=a[y].node;var z=j.getAttribute("data-migrated"),A=j.getElementsByClassName("promotions-showTermsTrigger");z&&A[0]&&A[0].remove()}var B=document.getElementById("specialoffers"),C=B.getElementsByClassName("roomContainer").length;"true"==B.dataset.orderbyprice&&_processedPromotions>=C&&_promotionsGadget.sortPromotions()},error:function(a){console.info("error:"),console.info(a)}})},getTodayDateTime:function(){var a=new Date;return a.setHours(0,0,0,0),a.getTime()},getDateTime:function(a){return a&&void 0!=a&&"0000-00-00"!=a?(a=new Date(a),a.setHours(0,0,0,0),a.getTime()):!1},sortPromotions:function(){for(var a=document.querySelectorAll("[data-promotionid]"),b={},c=0;c<a.length;c++){var d=a[c],e=d.dataset.price;for(e=parseFloat(e).toFixed(2),-1==d.dataset.price.indexOf(".")&&(e=String(e)+".00"),e=parseInt(e.replace(".",""));void 0!==b[e];)e+=1;b[e]=d}for(var f=document.getElementById("specialoffers");f.firstChild;)f.removeChild(f.firstChild);for(var g in b)b.hasOwnProperty(g)&&f.appendChild(b[g])},formatCurrency:function(a){if("number"!=typeof a&&(a=a.replace(",","."),a=parseFloat(a)),null!=a&&void 0!=a){var b=a.toFixed(2).toString(),c=currencyPlaceHolder;return-1!==currencyPlaceHolder.indexOf(",")?(b=b.replace(".",","),c.replace("0,00",b)):c.replace("0.00",b)}}};_promotionsGadget.init();