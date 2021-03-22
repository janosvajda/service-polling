(this["webpackJsonpservices-crud"]=this["webpackJsonpservices-crud"]||[]).push([[0],{68:function(e,t,n){},76:function(e,t,n){"use strict";n.r(t);var i=n(0),l=n.n(i),a=n(10),s=n.n(a),o=(n(68),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,124)).then((function(t){var n=t.getCLS,i=t.getFID,l=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),i(e),l(e),a(e),s(e)}))}),c=n(23),r=n.n(c),d=n(32),u=n(27),h=n(28),j=n(20),p=n(45),f=n(44),m=n(119),g=n(118),b=n(51),v=n.n(b),O=n(121),D=n(113),x=n(115),y=n(114),C=n(112),I=n(116),E=function(){function e(){Object(u.a)(this,e)}return Object(h.a)(e,null,[{key:"isValidURL",value:function(e){return new RegExp("^(https?:\\/\\/)?((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])*\\.)+[a-zA-Z]{2,13})|((\\d{1,3}\\.){3}\\d{1,3})|localhost)(\\:\\d{1,5})?(\\/[a-zA-Z\\&\\d%_.~+-:@]*)*(\\?[a-zA-Z\\&\\d%_.,~+-:@=;&]*)?(\\#[-a-zA-Z&\\d_]*)?$").test(e)}}]),e}(),k=n(6),S=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(e){var i;return Object(u.a)(this,n),(i=t.call(this,e)).handleTextFieldChange=function(e){i.selectedUrl=e.target.value},i.handleClickOpenDeleteDialog=function(){i.setState((function(e){return{open:!0}}))},i.handleCloseDeleteDialog=function(){i.setState((function(e){return{open:!1}}))},i.handleAgreeDeleteDialog=function(){console.log("Delete"),i.deleteItem(),i.handleCloseDeleteDialog()},i.handleDisagreeDeleteDialog=function(){console.log("Cancel deleting."),i.handleCloseDeleteDialog()},i.handleClickOpenEditDialog=function(){i.setState((function(e){return{openEdit:!0}}))},i.handleCloseEditDialog=function(){i.setState((function(e){return{openEdit:!1}}))},i.handleAgreeEditDialog=function(){console.log("Edit"),i.editItem(),i.handleCloseEditDialog()},i.handleDisagreeEditDialog=function(){console.log("Cancel editing."),i.handleCloseEditDialog()},i.handleChange=function(){console.log("this.selectedId",Object(j.a)(i))},i.state={open:!1,openEdit:!1},i.selectedId=null,i.selectedUrl="",i.createService=i.createService.bind(Object(j.a)(i)),i.render=i.render.bind(Object(j.a)(i)),i}return Object(h.a)(n,[{key:"openDeleteDialog",value:function(){this.setState((function(e){return{open:!0}}))}},{key:"openEditDialog",value:function(){this.setState((function(e){return{openEdit:!0}}))}},{key:"editItem",value:function(){var e=this;console.log("this.selectedUrl in editItem",this.selectedUrl),""!==this.selectedUrl&&E.isValidURL(this.selectedUrl)?""!==this.selectedId&&null!==this.selectedId&&(console.log("Amended items",this.selectedId,this.selectedUrl),Object(d.a)(r.a.mark((function t(){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:e.selectedId,url:e.selectedUrl})});case 2:return n=t.sent,t.next=5,n.json();case 5:"ok"!==t.sent.result&&alert("Edit failed. Please, try it again."),e.selectedId=null,e.selectedUrl="",window.document.location.reload();case 10:case"end":return t.stop()}}),t)})))()):alert("Not valid or empty URL.")}},{key:"deleteItem",value:function(){var e=this;Object(d.a)(r.a.mark((function t(){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:e.selectedId})});case 2:return n=t.sent,t.next=5,n.json();case 5:"ok"===t.sent.result?document.getElementById(e.selectedId).remove():alert("Delete failed. Please, try it again."),e.selectedId=null;case 8:case"end":return t.stop()}}),t)})))()}},{key:"render",value:function(){var e=this.props.entries.map(this.createService);return Object(k.jsxs)("div",{className:"listDiv",children:[Object(k.jsx)(g.a,{width:"100%",bgcolor:"white",p:1,my:.5,children:e}),Object(k.jsxs)(O.a,{open:this.state.open,onClose:this.handleCloseDeleteDialog,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(k.jsx)(C.a,{id:"alert-dialog-title",children:"Delete"}),Object(k.jsx)(D.a,{children:Object(k.jsx)(y.a,{id:"alert-dialog-description",children:"Would you like to delete the selected item?"})}),Object(k.jsxs)(x.a,{children:[Object(k.jsx)(m.a,{onClick:this.handleDisagreeDeleteDialog,color:"primary",children:"No"}),Object(k.jsx)(m.a,{onClick:this.handleAgreeDeleteDialog,color:"primary",autoFocus:!0,children:"Yes"})]})]}),Object(k.jsxs)(O.a,{open:this.state.openEdit,onClose:this.handleCloseEditDialog,"aria-labelledby":"form-dialog-title",children:[Object(k.jsx)(C.a,{id:"form-dialog-title",children:"Amend URL"}),Object(k.jsxs)(D.a,{children:[Object(k.jsx)(y.a,{children:"Amending of the selected URL."}),Object(k.jsx)(I.a,{autoFocus:!0,margin:"dense",id:"urlField",label:"URL",defaultValue:this.selectedUrl,onChange:this.handleTextFieldChange,fullWidth:!0})]}),Object(k.jsxs)(x.a,{children:[Object(k.jsx)(m.a,{onClick:this.handleDisagreeEditDialog,color:"primary",children:"Cancel"}),Object(k.jsx)(m.a,{onClick:this.handleAgreeEditDialog,color:"primary",children:"Save"})]})]})]})}},{key:"createService",value:function(e){var t=this;console.log("Item in ServiceItems: ",e),null!==e.status&&""!==e.status||(e.status="NOT CHECKED");return Object(k.jsx)(v.a,{left:!0,children:Object(k.jsxs)("div",{className:"itemRow",id:e.id,children:[Object(k.jsx)("span",{className:"textColumn",children:e.url}),Object(k.jsx)("span",{className:"itemRowStatus",children:e.status}),Object(k.jsx)("span",{className:"buttonColum",children:Object(k.jsx)(m.a,{color:"secondary",onClick:function(){return n=e.id,console.log("handleDelete row Id: ",n),t.selectedId=n,void t.openDeleteDialog();var n},children:"Delete"})}),Object(k.jsx)("span",{className:"buttonColum",children:Object(k.jsx)(m.a,{color:"primary",onClick:function(){return n=e.id,i=e.url,console.log("handleStatus row Id: ",n),t.selectedId=n,t.selectedUrl=i,void t.openEditDialog();var n,i},children:"Amend URL"})})]},e.id)})}}]),n}(l.a.Component),A=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(e){var i;return Object(u.a)(this,n),(i=t.call(this,e)).state={items:[]},i.addItem=i.addItem.bind(Object(j.a)(i)),i}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"loadData",value:function(){var e=this;fetch("http://localhost:8888/service").then((function(e){return e.json()})).then((function(t){console.log("Result of componentDidMount in ServiceList: ",t),e.setState({isLoaded:!0,items:t})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"saveItem",value:function(e){Object(d.a)(r.a.mark((function t(){var n,i;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});case 2:return n=t.sent,t.next=5,n.json();case 5:i=t.sent,console.log("Response of saveItem in ServiceList componenet: ",i);case 7:case"end":return t.stop()}}),t)})))()}},{key:"addItem",value:function(e){if(""!==this._inputElement.value&&E.isValidURL(this._inputElement.value)){var t={url:this._inputElement.value,id:0,status:null};this.setState((function(e){return{items:e.items.concat(t)}})),this._inputElement.value="",console.log("New item: ",t),this.saveItem(t)}else alert("You can save only a valid url.");e.preventDefault()}},{key:"render",value:function(){var e=this;return Object(k.jsxs)("div",{className:"serviceListMain",children:[Object(k.jsx)("div",{className:"header",children:Object(k.jsxs)("form",{onSubmit:this.addItem,children:[Object(k.jsx)("input",{className:"addInput",ref:function(t){return e._inputElement=t},placeholder:"Add new service"}),Object(k.jsx)("button",{className:"addButton",type:"Add",children:"Add"})]})}),Object(k.jsx)(S,{entries:this.state.items})]})}}]),n}(i.Component);s.a.render(Object(k.jsx)(A,{}),document.getElementById("root")),o()}},[[76,1,2]]]);
//# sourceMappingURL=main.7131ce93.chunk.js.map