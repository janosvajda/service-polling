(this["webpackJsonpservices-crud"]=this["webpackJsonpservices-crud"]||[]).push([[0],{15:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var s=n(1),i=n.n(s),c=n(9),r=n.n(c),a=(n(15),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,s=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),s(e),i(e),c(e),r(e)}))}),o=n(8),u=n.n(o),l=n(10),d=n(2),h=n(3),v=n(4),p=n(6),f=n(5),j=n(0),m=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"createService",value:function(e){return Object(j.jsx)("li",{children:e.url},e.id)}},{key:"render",value:function(){var e=this.props.entries.map(this.createService);return Object(j.jsx)("ul",{className:"serviceList",children:e})}}]),n}(s.Component),b=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(e){var s;return Object(d.a)(this,n),(s=t.call(this,e)).state={items:[]},s.addItem=s.addItem.bind(Object(v.a)(s)),s}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"loadTestItems",value:function(){return[{id:"1",url:"https://test.service1",status:"0"},{id:"2",url:"https://test.service2",status:"0"}]}},{key:"loadData",value:function(){var e=this;fetch("http://localhost:8888/service").then((function(e){return e.json()})).then((function(t){console.log("Result of componentDidMount in ServiceList: ",t),e.setState({isLoaded:!0,items:t})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"saveItem",value:function(e){Object(l.a)(u.a.mark((function t(){var n,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8888/service",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});case 2:return n=t.sent,t.next=5,n.json();case 5:s=t.sent,console.log("Response of saveItem in ServiceList componenet: ",s);case 7:case"end":return t.stop()}}),t)})))()}},{key:"addItem",value:function(e){if(""!==this._inputElement.value){var t={url:this._inputElement.value,id:0,status:0};this.setState((function(e){return{items:e.items.concat(t)}})),this._inputElement.value="",console.log("New item: ",t),this.saveItem(t)}e.preventDefault()}},{key:"render",value:function(){var e=this;return Object(j.jsxs)("div",{className:"serviceListMain",children:[Object(j.jsx)("div",{className:"header",children:Object(j.jsxs)("form",{onSubmit:this.addItem,children:[Object(j.jsx)("input",{ref:function(t){return e._inputElement=t},placeholder:"Enter new service name"}),Object(j.jsx)("button",{type:"Add",children:"add"})]})}),Object(j.jsx)(m,{entries:this.state.items})]})}}]),n}(s.Component);r.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(b,{})}),document.getElementById("root")),a()}},[[18,1,2]]]);
//# sourceMappingURL=main.a7bc019d.chunk.js.map