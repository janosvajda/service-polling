(this["webpackJsonpservices-crud"]=this["webpackJsonpservices-crud"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var i=n(1),s=n.n(i),c=n(8),r=n.n(c),a=(n(13),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,i=t.getFID,s=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),i(e),s(e),c(e),r(e)}))}),u=n(2),o=n(3),d=n(4),l=n(6),h=n(5),v=n(0),j=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"createService",value:function(e){return Object(v.jsx)("li",{children:e.url},e.id)}},{key:"render",value:function(){var e=this.props.entries.map(this.createService);return Object(v.jsx)("ul",{className:"serviceList",children:e})}}]),n}(i.Component),m=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var i;return Object(u.a)(this,n),(i=t.call(this,e)).state={items:[]},i.addItem=i.addItem.bind(Object(d.a)(i)),i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("http://localhost:8888/service").then((function(e){return e.json()})).then((function(t){console.log("Result of componentDidMount in ServiceList: ",t),e.setState({isLoaded:!0,items:t})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"loadTestItems",value:function(){return[{id:"1",url:"https://test.service1",status:"0"},{id:"2",url:"https://test.service2",status:"0"}]}},{key:"addItem",value:function(e){if(""!==this._inputElement.value){var t={url:this._inputElement.value,id:0,status:0};this.setState((function(e){return{items:e.items.concat(t)}})),this._inputElement.value=""}e.preventDefault()}},{key:"render",value:function(){var e=this;return Object(v.jsxs)("div",{className:"serviceListMain",children:[Object(v.jsx)("div",{className:"header",children:Object(v.jsxs)("form",{onSubmit:this.addItem,children:[Object(v.jsx)("input",{ref:function(t){return e._inputElement=t},placeholder:"Enter new service name"}),Object(v.jsx)("button",{type:"Add",children:"add"})]})}),Object(v.jsx)(j,{entries:this.state.items})]})}}]),n}(i.Component);r.a.render(Object(v.jsx)(s.a.StrictMode,{children:Object(v.jsx)(m,{})}),document.getElementById("root")),a()}},[[15,1,2]]]);
//# sourceMappingURL=main.bf693912.chunk.js.map