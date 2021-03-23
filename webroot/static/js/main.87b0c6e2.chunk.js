(this["webpackJsonpservices-crud"]=this["webpackJsonpservices-crud"]||[]).push([[0],{68:function(e,t,n){},76:function(e,t,n){"use strict";n.r(t);var l=n(0),i=n.n(l),a=n(10),s=n.n(a),c=(n(68),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,124)).then((function(t){var n=t.getCLS,l=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),l(e),i(e),a(e),s(e)}))}),o=n(23),r=n.n(o),d=n(32),u=n(27),h=n(28),j=n(20),p=n(45),m=n(44),f=n(119),g=n(118),b=n(51),v=n.n(b),O=n(121),D=n(113),x=n(115),C=n(114),y=n(112),E=n(116),I=function(){function e(){Object(u.a)(this,e)}return Object(h.a)(e,null,[{key:"isValidURL",value:function(e){return new RegExp("^(https?:\\/\\/)?((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])*\\.)+[a-zA-Z]{2,13})|((\\d{1,3}\\.){3}\\d{1,3})|localhost)(\\:\\d{1,5})?(\\/[a-zA-Z\\&\\d%_.~+-:@]*)*(\\?[a-zA-Z\\&\\d%_.,~+-:@=;&]*)?(\\#[-a-zA-Z&\\d_]*)?$").test(e)}}]),e}(),k=n(6),U=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(e){var l;return Object(u.a)(this,n),(l=t.call(this,e)).handleUrlFieldChange=function(e){l.selectedUrl=e.target.value},l.handleTitleFieldChange=function(e){l.selectedTitle=e.target.value},l.handleClickOpenDeleteDialog=function(){l.setState((function(e){return{open:!0}}))},l.handleCloseDeleteDialog=function(){l.setState((function(e){return{open:!1}}))},l.handleAgreeDeleteDialog=function(){console.log("Delete"),l.deleteItem(),l.handleCloseDeleteDialog()},l.handleDisagreeDeleteDialog=function(){console.log("Cancel deleting."),l.handleCloseDeleteDialog()},l.handleClickOpenEditDialog=function(){l.setState((function(e){return{openEdit:!0}}))},l.handleCloseEditDialog=function(){l.setState((function(e){return{openEdit:!1}}))},l.handleAgreeEditDialog=function(){console.log("Edit"),l.editItem(),l.handleCloseEditDialog()},l.handleDisagreeEditDialog=function(){console.log("Cancel editing."),l.handleCloseEditDialog()},l.handleChange=function(){console.log("this.selectedId",Object(j.a)(l))},l.state={open:!1,openEdit:!1},l.selectedId=null,l.selectedUrl="",l.selectedTitle="",l.createService=l.createService.bind(Object(j.a)(l)),l.render=l.render.bind(Object(j.a)(l)),l}return Object(h.a)(n,[{key:"openDeleteDialog",value:function(){this.setState((function(e){return{open:!0}}))}},{key:"openEditDialog",value:function(){this.setState((function(e){return{openEdit:!0}}))}},{key:"editItem",value:function(){var e=this;console.log("this.selectedUrl in editItem",this.selectedUrl),console.log("this.selectedTitle in editItem",this.selectedTitle),""!==this.selectedUrl&&I.isValidURL(this.selectedUrl)?""!==this.selectedTitle?""!==this.selectedId&&null!==this.selectedId&&(console.log("Amended items",this.selectedId,this.selectedUrl),Object(d.a)(r.a.mark((function t(){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:e.selectedId,url:e.selectedUrl,title:e.selectedTitle})});case 2:return n=t.sent,t.next=5,n.json();case 5:"ok"!==t.sent.result&&alert("Edit failed. Please, try it again."),e.selectedId=null,e.selectedUrl="",e.selectedTitle="",window.document.location.reload();case 11:case"end":return t.stop()}}),t)})))()):alert("Name is a required field."):alert("Not valid or empty URL.")}},{key:"deleteItem",value:function(){var e=this;Object(d.a)(r.a.mark((function t(){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:e.selectedId})});case 2:return n=t.sent,t.next=5,n.json();case 5:"ok"===t.sent.result?document.getElementById(e.selectedId).remove():alert("Delete failed. Please, try it again."),e.selectedId=null;case 8:case"end":return t.stop()}}),t)})))()}},{key:"render",value:function(){var e=this.props.entries.map(this.createService);return Object(k.jsxs)("div",{className:"listDiv",children:[Object(k.jsx)(g.a,{width:"100%",bgcolor:"white",p:1,my:.5,children:e}),Object(k.jsxs)(O.a,{open:this.state.open,onClose:this.handleCloseDeleteDialog,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(k.jsx)(y.a,{id:"alert-dialog-title",children:"Delete"}),Object(k.jsx)(D.a,{children:Object(k.jsx)(C.a,{id:"alert-dialog-description",children:"Would you like to delete the selected item?"})}),Object(k.jsxs)(x.a,{children:[Object(k.jsx)(f.a,{onClick:this.handleDisagreeDeleteDialog,color:"primary",children:"No"}),Object(k.jsx)(f.a,{onClick:this.handleAgreeDeleteDialog,color:"primary",autoFocus:!0,children:"Yes"})]})]}),Object(k.jsxs)(O.a,{open:this.state.openEdit,fullWidth:!0,onClose:this.handleCloseEditDialog,"aria-labelledby":"form-dialog-title",children:[Object(k.jsx)(y.a,{id:"form-dialog-title",children:"Edit"}),Object(k.jsxs)(D.a,{children:[Object(k.jsx)(C.a,{children:"Amending of selected service."}),Object(k.jsx)(E.a,{autoFocus:!0,margin:"dense",id:"titleField",label:"Name",defaultValue:this.selectedTitle,onChange:this.handleTitleFieldChange,fullWidth:!0}),Object(k.jsx)(E.a,{autoFocus:!0,margin:"dense",id:"urlField",label:"URL",defaultValue:this.selectedUrl,onChange:this.handleUrlFieldChange,fullWidth:!0})]}),Object(k.jsxs)(x.a,{children:[Object(k.jsx)(f.a,{onClick:this.handleDisagreeEditDialog,color:"primary",children:"Cancel"}),Object(k.jsx)(f.a,{onClick:this.handleAgreeEditDialog,color:"primary",children:"Save"})]})]})]})}},{key:"createService",value:function(e){var t=this;console.log("Item in ServiceItems: ",e),null!==e.status&&""!==e.status||(e.status="QUEUEING");return Object(k.jsx)(v.a,{left:!0,children:Object(k.jsxs)("div",{className:"itemRow",id:e.id,children:[Object(k.jsx)("span",{className:"textColumn bolder",children:e.title}),Object(k.jsx)("span",{className:"textColumn",children:e.url}),Object(k.jsx)("span",{className:"itemRowStatus",children:e.status}),Object(k.jsx)("span",{className:"buttonColum",children:Object(k.jsx)(f.a,{color:"secondary",onClick:function(){return n=e.id,console.log("handleDelete row Id: ",n),t.selectedId=n,void t.openDeleteDialog();var n},children:"Delete"})}),Object(k.jsx)("span",{className:"buttonColum",children:Object(k.jsx)(f.a,{color:"primary",onClick:function(){return n=e.id,l=e.url,i=e.title,console.log("handleStatus row Id: ",n),t.selectedId=n,t.selectedUrl=l,t.selectedTitle=i,void t.openEditDialog();var n,l,i},children:"Edit"})})]},e.id)})}}]),n}(i.a.Component),S=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(e){var l;return Object(u.a)(this,n),(l=t.call(this,e)).state={items:[]},l.addItem=l.addItem.bind(Object(j.a)(l)),l}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"loadData",value:function(){var e=this;fetch("http://localhost:8888/service").then((function(e){return e.json()})).then((function(t){console.log("Result of componentDidMount in ServiceList: ",t),e.setState({isLoaded:!0,items:t})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"saveItem",value:function(e){Object(d.a)(r.a.mark((function t(){var n,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});case 2:return n=t.sent,t.next=5,n.json();case 5:l=t.sent,console.log("Response of saveItem in ServiceList componenet: ",l);case 7:case"end":return t.stop()}}),t)})))()}},{key:"addItem",value:function(e){if(""!==this._inputElementTitle.value){if(""!==this._inputElementUrl.value&&I.isValidURL(this._inputElementUrl.value)){var t={title:this._inputElementTitle.value,url:this._inputElementUrl.value,id:0,status:null};this.setState((function(e){return{items:e.items.concat(t)}})),this._inputElementTitle.value="",this._inputElementUrl.value="",console.log("New item: ",t),this.saveItem(t)}else alert("You can add only a valid url.");e.preventDefault()}else alert("Nama of the service is required.")}},{key:"render",value:function(){var e=this;return Object(k.jsxs)("div",{className:"serviceListMain",children:[Object(k.jsx)("div",{className:"header",children:Object(k.jsxs)("form",{onSubmit:this.addItem,children:[Object(k.jsx)("span",{className:"inputTitle",children:"Add new service:"}),Object(k.jsx)("input",{className:"addInput",ref:function(t){return e._inputElementTitle=t},placeholder:"Name of the service..."}),Object(k.jsx)("input",{className:"addInput",ref:function(t){return e._inputElementUrl=t},placeholder:"Url of the service..."}),Object(k.jsx)("button",{className:"addButton",type:"Add",children:"Add"})]})}),Object(k.jsx)(U,{entries:this.state.items})]})}}]),n}(l.Component);s.a.render(Object(k.jsx)(S,{}),document.getElementById("root")),c()}},[[76,1,2]]]);
//# sourceMappingURL=main.87b0c6e2.chunk.js.map