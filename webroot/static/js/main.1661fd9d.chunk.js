(this["webpackJsonpservices-crud"]=this["webpackJsonpservices-crud"]||[]).push([[0],{55:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(7),s=n.n(c),o=(n(55),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,97)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),i(e),c(e),s(e)}))}),l=n(23),r=n.n(l),d=n(30),u=n(20),h=n(21),j=n(18),p=n(37),v=n(35),m=n(94),b=n(93),f=n(41),O=n.n(f),g=n(92),x=n(88),y=n(90),I=n(89),C=n(87),k=n(4),S=function(e){Object(p.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).handleClickOpen=function(){a.setState((function(e){return{open:!0}}))},a.handleClose=function(){a.setState((function(e){return{open:!1}}))},a.handleAgree=function(){console.log("Delete"),a.deleteItem(),a.handleClose()},a.handleDisagree=function(){console.log("Cancel deleting."),a.handleClose()},a.handleChange=function(){console.log("this.selectedId",Object(j.a)(a))},a.state={open:!1},a.selectedId=null,a.createService=a.createService.bind(Object(j.a)(a)),a}return Object(h.a)(n,[{key:"openDialog",value:function(){this.setState((function(e){return{open:!0}}))}},{key:"deleteItem",value:function(){var e=this;Object(d.a)(r.a.mark((function t(){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:e.selectedId})});case 2:return n=t.sent,t.next=5,n.json();case 5:"ok"===t.sent.result?document.getElementById(e.selectedId).remove():alert("Delete failed. Please, try it again."),e.selectedId=null;case 8:case"end":return t.stop()}}),t)})))()}},{key:"render",value:function(){var e=this.props.entries.map(this.createService);return Object(k.jsxs)("div",{className:"listDiv",children:[Object(k.jsx)(b.a,{width:"100%",bgcolor:"white",p:1,my:.5,children:e}),Object(k.jsxs)(g.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(k.jsx)(C.a,{id:"alert-dialog-title",children:"Delete"}),Object(k.jsx)(x.a,{children:Object(k.jsx)(I.a,{id:"alert-dialog-description",children:"Would you like to delete the selected item?"})}),Object(k.jsxs)(y.a,{children:[Object(k.jsx)(m.a,{onClick:this.handleDisagree,color:"primary",children:"No"}),Object(k.jsx)(m.a,{onClick:this.handleAgree,color:"primary",autoFocus:!0,children:"Yes"})]})]})]})}},{key:"createService",value:function(e){var t=this;console.log("Item in ServiceItems: ",e);return Object(k.jsx)(O.a,{left:!0,children:Object(k.jsxs)("div",{className:"itemRow",id:e.id,children:[Object(k.jsx)("span",{className:"textColumn",children:e.url}),Object(k.jsx)("span",{className:"itemRowStatus",children:e.status}),Object(k.jsx)("span",{className:"buttonColum",children:Object(k.jsx)(m.a,{color:"secondary",onClick:function(){return n=e.id,console.log("handleDelete row Id: ",n),t.selectedId=n,void t.openDialog();var n},children:"Delete"})}),Object(k.jsx)("span",{className:"buttonColum",children:Object(k.jsx)(m.a,{color:"primary",onClick:function(){return n=e.id,console.log("handleStatus row Id: ",n),t.selectedId=n,void t.openDialog();var n},children:"Edit URL"})})]},e.id)})}}]),n}(i.a.Component),D=function(){function e(){Object(u.a)(this,e)}return Object(h.a)(e,null,[{key:"isValidURL",value:function(e){return new RegExp("^(https?:\\/\\/)?((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])*\\.)+[a-zA-Z]{2,13})|((\\d{1,3}\\.){3}\\d{1,3})|localhost)(\\:\\d{1,5})?(\\/[a-zA-Z\\&\\d%_.~+-:@]*)*(\\?[a-zA-Z\\&\\d%_.,~+-:@=;&]*)?(\\#[-a-zA-Z&\\d_]*)?$").test(e)}}]),e}(),w=function(e){Object(p.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={items:[]},a.addItem=a.addItem.bind(Object(j.a)(a)),a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"loadData",value:function(){var e=this;fetch("http://localhost:8888/service").then((function(e){return e.json()})).then((function(t){console.log("Result of componentDidMount in ServiceList: ",t),e.setState({isLoaded:!0,items:t})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"saveItem",value:function(e){Object(d.a)(r.a.mark((function t(){var n,a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});case 2:return n=t.sent,t.next=5,n.json();case 5:a=t.sent,console.log("Response of saveItem in ServiceList componenet: ",a);case 7:case"end":return t.stop()}}),t)})))()}},{key:"addItem",value:function(e){if(""!==this._inputElement.value&&D.isValidURL(this._inputElement.value)){var t={url:this._inputElement.value,id:0,status:null};this.setState((function(e){return{items:e.items.concat(t)}})),this._inputElement.value="",console.log("New item: ",t),this.saveItem(t)}else alert("You can save only a valid url.");e.preventDefault()}},{key:"render",value:function(){var e=this;return Object(k.jsxs)("div",{className:"serviceListMain",children:[Object(k.jsx)("div",{className:"header",children:Object(k.jsxs)("form",{onSubmit:this.addItem,children:[Object(k.jsx)("input",{className:"addInput",ref:function(t){return e._inputElement=t},placeholder:"Add new service"}),Object(k.jsx)("button",{className:"addButton",type:"Add",children:"Add"})]})}),Object(k.jsx)(S,{entries:this.state.items})]})}}]),n}(a.Component);s.a.render(Object(k.jsx)(w,{}),document.getElementById("root")),o()}},[[64,1,2]]]);
//# sourceMappingURL=main.1661fd9d.chunk.js.map