(this["webpackJsonpcoin-watch"]=this["webpackJsonpcoin-watch"]||[]).push([[0],{383:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=a(18),i=a.n(r),s=a(21),o=a(206),l=a(19),j=a(207),u=a(447),d=a(448),b=a(416),m=a(419),h=a(420),p=a(421),O=a(422),x=a(423),g=a(424),f=a(425),y=a(426),v=a(451),k=a(429),w=a(450),_=a(435),C=a(427),S=a(428),F=a(111),I=a(110),P=a(36),L=a.n(P),M=a(55),D=a(201),N=a.n(D).a.create({baseURL:"https://api.coingecko.com/api/v3"}),V=a(2),R=n.a.createContext(null),T=function(e){var t=e.children,a=Object(c.useState)(window.localStorage.getItem("currency")||"usd"),n=Object(s.a)(a,2),r=n[0],i=n[1],o=Object(c.useState)(!0),l=Object(s.a)(o,2),j=l[0],u=l[1],d=Object(c.useState)([]),b=Object(s.a)(d,2),m=b[0],h=b[1],p=Object(c.useState)(0),O=Object(s.a)(p,2),x=O[0],g=O[1],f=Object(c.useState)(10),y=Object(s.a)(f,2),v=y[0],k=y[1],w=Object(c.useState)(0),_=Object(s.a)(w,2),C=_[0],S=_[1],F=Object(c.useState)([]),I=Object(s.a)(F,2),P=I[0],D=I[1];Object(c.useEffect)((function(){(function(){var e=Object(M.a)(L.a.mark((function e(){var t,a,c,n,i,s;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u(!0),t=new Intl.NumberFormat("en-US",{style:"currency",currency:r,maximumFractionDigits:6}),a=new Intl.NumberFormat(void 0,{maximumFractionDigits:2,style:"percent"}),0!==C){e.next=10;break}return e.next=6,N.get("/coins/list",{params:{include_platform:!1}});case 6:c=e.sent,n=c.data.length,S(n),D(c.data);case 10:return e.next=12,N.get("/coins/markets",{params:{vs_currency:r,order:"market_cap_desc",per_page:v,page:x+1,price_change_percentage:"24h"}});case 12:i=e.sent,s=i.data,h(s.map((function(e){return c=e.id,n=e.market_cap_rank,r=e.image,i=e.name,s=t.format(e.current_price),o=a.format(e.price_change_percentage_24h/100),l=t.format(e.market_cap),j=t.format(e.total_volume),{id:c,rank:n,image:r,name:i,price:s,priceChange:o,marketCap:l,volume:j};var c,n,r,i,s,o,l,j}))),u(!1);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[r,x,v,C]);return Object(V.jsx)(R.Provider,{value:{currency:r,isLoading:j,list:m,page:x,perPage:v,activeCryptos:C,setCurrency:function(e){window.localStorage.setItem("currency",e),i(e)},setPage:g,setPerPage:k,search:function(e){return P.filter((function(t){return t.name.toLowerCase().startsWith(e.toLowerCase())||t.id.toLowerCase().startsWith(e.toLowerCase())}))}},children:t})},A=function(){var e=Object(c.useContext)(R),t=e.isLoading,a=e.list,n=e.page,r=e.perPage,i=e.setPage,s=e.setPerPage,o=e.activeCryptos,j=Object(l.f)();return Object(V.jsx)(b.a,{children:Object(V.jsx)(m.a,{children:Object(V.jsxs)(h.a,{children:[Object(V.jsx)(p.a,{children:Object(V.jsxs)(O.a,{size:"small",children:[Object(V.jsx)(x.a,{children:Object(V.jsxs)(g.a,{children:[Object(V.jsx)(f.a,{sortDirection:"asc",children:"#"}),Object(V.jsx)(f.a,{}),Object(V.jsx)(f.a,{children:"name"}),Object(V.jsx)(f.a,{children:"price"}),Object(V.jsx)(f.a,{children:"24h %"}),Object(V.jsx)(f.a,{children:"market cap"}),Object(V.jsx)(f.a,{children:"volume"})]})}),Object(V.jsx)(y.a,{children:a.map((function(e){return Object(V.jsxs)(g.a,{hover:!0,style:{cursor:"pointer"},onClick:function(t){return a=e.id,void j.push("/coin-watch/".concat(a));var a},children:[Object(V.jsx)(f.a,{children:e.rank}),Object(V.jsx)(f.a,{children:Object(V.jsx)(v.a,{src:e.image})}),Object(V.jsx)(f.a,{children:e.name}),Object(V.jsx)(f.a,{children:e.price}),Object(V.jsx)(f.a,{children:Object(V.jsxs)("span",{style:{display:"flex",color:e.priceChange.slice(0,-1)>=0?F.a[400]:I.a[400]},children:[e.priceChange.slice(0,-1)>=0?Object(V.jsx)(C.a,{}):Object(V.jsx)(S.a,{}),e.priceChange]})}),Object(V.jsx)(f.a,{children:e.marketCap}),Object(V.jsx)(f.a,{children:e.volume})]},e.rank)}))}),Object(V.jsx)(k.a,{children:Object(V.jsx)(g.a,{children:Object(V.jsx)(w.a,{rowsPerPageOptions:[10,25,50,100,250],count:o,rowsPerPage:r,page:n,onChangePage:function(e,t){i(t)},onChangeRowsPerPage:function(e){s(e.target.value),i(0)}})})})]})}),t&&Object(V.jsx)(_.a,{})]})})})},H=a(437),E=a(436),U=a(433),W=a(438),B=function(e){var t=e.marketData,a=e.currency,c=e.isLoading,r=new Intl.NumberFormat("en-US",{style:"currency",currency:a,maximumFractionDigits:6}),i=new Intl.NumberFormat(void 0,{maximumFractionDigits:2,style:"percent"}),s=new Intl.NumberFormat,o=Object(E.a)((function(e){return e.breakpoints.down("xs")})),l=[[{name:"Market Cap",value:!c&&r.format(t.market_data.market_cap[a])||"--",percent:!c&&i.format(t.market_data.market_cap_change_percentage_24h/100)||"--"},{name:"All Time High",value:!c&&r.format(t.market_data.ath[a])||"--",percent:!c&&i.format(t.market_data.ath_change_percentage[a]/100)||"--"},{name:"All Time Low",value:!c&&r.format(t.market_data.atl[a])||"--",percent:!c&&i.format(t.market_data.atl_change_percentage[a]/100)||"--"},{name:"Volume",value:!c&&r.format(t.market_data.total_volume[a])||"--"},{name:"Circulating Supply",value:"".concat(c?"-":s.format(t.market_data.circulating_supply)+" ").concat(c?"-":t.symbol.toUpperCase())},{name:"Fully Diluted Valuation",value:!c&&t.market_data.fully_diluted_valuation[a]&&!c&&r.format(t.market_data.fully_diluted_valuation[a])||"--"}]];return Object(V.jsxs)(n.a.Fragment,{children:[c&&Object(V.jsx)(_.a,{}),l.map((function(e,t){return Object(V.jsx)(H.a,{container:!0,direction:"row",justify:"space-between",spacing:3,children:e.map((function(t,a){return Object(V.jsxs)(H.a,{md:4,xs:12,item:!0,children:[Object(V.jsx)(U.a,{variant:"subtitle2",display:"block",children:t.name}),Object(V.jsx)(U.a,{variant:"h6",display:"block",children:t.value}),t.percent&&Object(V.jsxs)(U.a,{variant:"caption",style:{display:"flex",color:!c&&(t.percent>=0?F.a[400]:I.a[400])},children:[!c&&(t.percent>=0?Object(V.jsx)(C.a,{}):Object(V.jsx)(S.a,{})),t.percent]}),o&&a<e.length-1&&Object(V.jsx)(W.a,{variant:"fullWidth"})]},a)}))},t)}))]})},z=a(33),J=a.n(z),G=(a(381),a(382),a(439)),Y=a(45),Z=a(430),q=a(441),K=a(440),Q=Object(G.a)((function(e){return{chartChangeBtnChecked:{color:e.palette.info.light},daysSelected:{background:e.palette.info.light,"&:hover":{background:e.palette.info.light}},daysBtn:{paddingLeft:"0.1rem",paddingRight:"0.1rem",minWidth:"40px"}}})),X=function(e){var t=e.coin,a=e.currency,r=e.marketData,i=Object(c.useState)([]),o=Object(s.a)(i,2),l=o[0],j=o[1],u=Object(c.useState)(!0),d=Object(s.a)(u,2),b=d[0],m=d[1],h=Object(c.useState)(!1),p=Object(s.a)(h,2),O=p[0],x=p[1],g=Object(c.useState)([!0,!1,!1,!1,!1,!1]),f=Object(s.a)(g,2),y=f[0],k=f[1],w=Object(Y.a)(),P=Q(),D=new Intl.NumberFormat("en-US",{style:"currency",currency:a,maximumFractionDigits:6}),R=new Intl.NumberFormat(void 0,{maximumFractionDigits:2,style:"percent"});Object(c.useEffect)((function(){m(!0);var e=[1,7,30,180,365,"max"];(function(){var c=Object(M.a)(L.a.mark((function c(){var n,r;return L.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,N.get("/coins/".concat(t,"/ohlc"),{params:{vs_currency:a,days:e[y.indexOf(!0)]}});case 2:n=c.sent,r=n.data.map((function(e){return{date:new Date(e[0]),o:e[1],h:e[2],l:e[3],c:e[4]}})),j(r),m(!1);case 6:case"end":return c.stop()}}),c)})));return function(){return c.apply(this,arguments)}})()()}),[t,a,y]);var T=function(e){var t=y.map((function(t,a){return a===e}));k(t)};return Object(V.jsxs)(n.a.Fragment,{children:[b&&Object(V.jsx)(_.a,{}),Object(V.jsxs)(H.a,{container:!0,direction:"row",justify:"space-between",alignItems:"center",children:[Object(V.jsx)(H.a,{item:!0,children:Object(V.jsxs)(H.a,{container:!0,direction:"row",spacing:2,alignItems:"center",children:[Object(V.jsx)(H.a,{item:!0,children:Object(V.jsx)(v.a,{src:r&&r.image.small})}),Object(V.jsxs)(H.a,{item:!0,children:[Object(V.jsx)(U.a,{children:r&&D.format(r.market_data.current_price[a])}),Object(V.jsxs)(U.a,{style:{display:"flex",color:r&&(r.market_data.price_change_percentage_24h>=0?F.a[400]:I.a[400])},children:[r&&(r.market_data.price_change_percentage_24h>=0?Object(V.jsx)(C.a,{}):Object(V.jsx)(S.a,{})),r&&R.format(r.market_data.price_change_percentage_24h/100)]})]})]})}),Object(V.jsx)(H.a,{item:!0,children:Object(V.jsx)(Z.a,{size:"small",disableRipple:!0,className:O?P.chartChangeBtnChecked:"",onClick:function(){x(!O)},children:Object(V.jsx)(K.a,{})})})]}),Object(V.jsxs)(J.a,{id:"chart",theme:"generic.".concat(w.palette.type),title:r&&r.name+" Price",dataSource:l,children:[Object(V.jsx)(z.LoadingIndicator,{show:b}),Object(V.jsx)(z.CommonSeriesSettings,{argumentField:"date",type:O?"":"candlestick"}),Object(V.jsx)(z.Series,{name:r&&r.name,openValueField:"o",highValueField:"h",lowValueField:"l",closeValueField:"c",valueField:"c",children:Object(V.jsx)(z.Reduction,{color:"red"})}),Object(V.jsx)(z.ArgumentAxis,{children:Object(V.jsx)(z.Label,{format:["HH:mm","HH:mm\nMMM dd","HH:mm\nMMM dd","MMM dd, yyyy","MMM dd, yyyy","MMM dd, yyyy"][y.indexOf(!0)]})}),Object(V.jsx)(z.ValueAxis,{position:"left",children:Object(V.jsx)(z.Label,{children:Object(V.jsx)(z.Format,{precision:r&&(r.market_data.current_price[a]>100?0:2),type:"currency",currency:a})})}),Object(V.jsx)(z.Tooltip,{enabled:!0,location:"edge",customizeTooltip:function(e){return{html:"<div><b>".concat(e.originalArgument.toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short",hourCycle:"h23"}),"</b><br/><br/>")+(e.openValue?"<b>Open:</b> ".concat(D.format(e.openValue),"<br/>\n<b>Close:</b> ").concat(D.format(e.closeValue),"<br/>\n<b>High:</b> ").concat(D.format(e.highValue),"<br/>\n<b>Low:</b> ").concat(D.format(e.lowValue),"</div>"):"<b>Price:</b> ".concat(D.format(e.value),"</div>"))}}}),Object(V.jsx)(z.Legend,{visible:!1}),Object(V.jsx)(z.ZoomAndPan,{argumentAxis:"both"})]}),Object(V.jsx)("br",{}),Object(V.jsx)(H.a,{container:!0,spacing:1,children:["1D","7D","1M","6M","1Y","All"].map((function(e,t){return Object(V.jsx)(H.a,{item:!0,children:Object(V.jsx)(q.a,{className:"".concat(P.daysBtn).concat(y[t]?" "+P.daysSelected:""),variant:"outlined",onClick:T.bind(undefined,t),children:e},t)},t)}))})]})},$=function(e){var t=e.match,a=Object(c.useState)(null),n=Object(s.a)(a,2),r=n[0],i=n[1],o=Object(c.useState)(!0),l=Object(s.a)(o,2),j=l[0],u=l[1],d=Object(c.useContext)(R).currency,p=t.params.coinId;return Object(c.useEffect)((function(){(function(){var e=Object(M.a)(L.a.mark((function e(){var t;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(!0),e.next=3,N.get("/coins/".concat(p),{params:{localization:!1,tickers:!1,market_data:!0,community_data:!1,developer_data:!1,sparkline:!1}});case 3:t=e.sent,i(t.data),u(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[p]),Object(V.jsx)(b.a,{children:Object(V.jsxs)(H.a,{container:!0,spacing:2,justify:"center",direction:"row",children:[Object(V.jsx)(H.a,{item:!0,xs:12,children:Object(V.jsx)(m.a,{style:{height:"100%",justifyItems:"center"},children:Object(V.jsx)(h.a,{children:Object(V.jsx)(X,{coin:p,currency:d,marketData:r})})})}),Object(V.jsx)(H.a,{item:!0,xs:12,children:Object(V.jsx)(m.a,{children:Object(V.jsx)(h.a,{children:Object(V.jsx)(B,{marketData:r,currency:d,isLoading:j})})})})]})})},ee=a(137),te=a(17),ae=a(442),ce=a(432),ne=a(452),re=a(209),ie=a(434),se=a(385),oe=a(444),le=a(449),je=a(431),ue=a(443),de=a(445),be=a(446),me=Object(G.a)((function(e){return{search:Object(ee.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(te.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(te.b)(e.palette.common.white,.25)},marginRight:e.spacing(1),width:"100%"},e.breakpoints.up("xs"),{marginLeft:e.spacing(1),width:"auto"}),searchIcon:{padding:e.spacing(0,1),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(ee.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(3),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("xs"),{width:"8ch","&:focus":{width:"15ch"}})}})),he=function(e){var t=e.themeType,a=e.setThemeType,n=me(),r=Object(l.f)(),i=Object(Y.a)(),o=Object(c.useContext)(R),j=o.search,u=o.currency,d=o.setCurrency,b=Object(c.useState)([]),m=Object(s.a)(b,2),h=m[0],p=m[1],O=Object(c.useState)(!1),x=Object(s.a)(O,2),g=x[0],f=x[1],y=Object(c.useState)(""),k=Object(s.a)(y,2),w=k[0],_=k[1],C=Object(c.useState)([u]),S=Object(s.a)(C,2),F=S[0],I=S[1];Object(c.useEffect)((function(){(function(){var e=Object(M.a)(L.a.mark((function e(){var t;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.get("/simple/supported_vs_currencies");case 2:t=e.sent,I(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);return Object(V.jsx)(ae.a,{color:"default",position:"sticky",style:{marginBottom:i.spacing(1)},children:Object(V.jsxs)(ce.a,{children:[Object(V.jsx)(U.a,{style:{flexGrow:1,cursor:"pointer"},onClick:function(){return r.push("/coin-watch")},children:"Coin Watch"}),Object(V.jsxs)("div",{className:n.search,children:[Object(V.jsx)("div",{className:n.searchIcon,children:Object(V.jsx)(ue.a,{})}),Object(V.jsx)(ne.a,{placeholder:"Search\u2026",classes:{root:n.inputRoot,input:n.inputInput},inputProps:{"aria-label":"search"},onChange:function(e){var t=e.target.value;_(t);var a=j(t);if(t.length<2||0===a.length)return f(!1),void p([]);p(a.slice(0,10)),f(!0)},value:w}),Object(V.jsx)("pre",{style:{position:"absolute",width:"100%",display:g?"block":"none"},children:Object(V.jsx)(re.a,{elevation:3,children:Object(V.jsx)(ie.a,{children:h.map((function(e,t){return Object(V.jsxs)(se.a,{style:{cursor:"pointer"},onClick:function(){r.push("/coin-watch/".concat(e.id)),f(!1),_("")},children:[Object(V.jsx)(v.a,{style:{marginRight:i.spacing(1),fontSize:i.spacing(2)},children:e.symbol}),Object(V.jsx)(U.a,{variant:"caption",noWrap:!0,children:e.name})]},t)}))})})})]}),Object(V.jsx)(oe.a,{children:Object(V.jsx)(le.a,{value:u.toUpperCase(),onChange:function(e){d(e.target.value.toLowerCase())},className:n.selectEmpty,inputProps:{"aria-label":"Without label"},children:F.map((function(e,t){if(e.length>3)return null;var a=e.toUpperCase();return Object(V.jsx)(je.a,{value:a,children:a},t)}))})}),Object(V.jsx)(Z.a,{onClick:function(e){var c="dark"===t?"light":"dark";window.localStorage.setItem("theme",c),a(c)},children:"dark"!==t?Object(V.jsx)(de.a,{}):Object(V.jsx)(be.a,{})})]})})};var pe=function(){var e=Object(c.useState)(window.localStorage.getItem("theme")||"dark"),t=Object(s.a)(e,2),a=t[0],r=t[1],i=Object(j.a)({palette:{type:a}});return Object(V.jsx)(n.a.Fragment,{children:Object(V.jsx)(u.a,{theme:i,children:Object(V.jsxs)(o.a,{children:[Object(V.jsx)(he,{themeType:a,setThemeType:r}),Object(V.jsx)(d.a,{}),Object(V.jsxs)(l.c,{children:[Object(V.jsx)(l.a,{exact:!0,path:"/coin-watch",component:A}),Object(V.jsx)(l.a,{path:"/coin-watch/:coinId",component:$})]})]})})})};i.a.render(Object(V.jsx)(T,{children:Object(V.jsx)(pe,{})}),document.getElementById("root"))}},[[383,1,2]]]);
//# sourceMappingURL=main.c4225f85.chunk.js.map