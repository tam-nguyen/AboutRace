(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{220:function(e,t,n){"use strict";n.r(t),n.d(t,"query",function(){return i}),n(229);var a=n(0),r=n.n(a),l=function(e){var t=e.data;return r.a.createElement("li",null,r.a.createElement("strong",null,"Article"),": ",t.title)},u=function(e){var t=e.data;return r.a.createElement("li",null,"Subtheme: ",r.a.createElement("strong",null,t.name),t.relationships.articles?r.a.createElement("ul",null,t.relationships.articles.map(function(e){return r.a.createElement(l,{data:e})})):r.a.createElement("span",{style:{color:"red"}}," (no articles)"))},c=function(e){var t=e.data;return r.a.createElement("li",null,"Theme: ",r.a.createElement("strong",null,t.name),t.relationships.subthemes?r.a.createElement("ul",null,t.relationships.subthemes.map(function(e){return r.a.createElement(u,{data:e})})):r.a.createElement("div",null,"No subthemes"))};t.default=function(e){var t=e.data;return r.a.createElement("ul",null,t.allTaxonomyTermThemes.edges.map(function(e){var t=e.node;return r.a.createElement(c,{data:t})}))};var i="81262399"},229:function(e,t,n){var a=n(13).f,r=Function.prototype,l=/^\s*function ([^ (]*)/;"name"in r||n(14)&&a(r,"name",{configurable:!0,get:function(){try{return(""+this).match(l)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=component---src-pages-themes-articles-js-d9b0291e15eebc741061.js.map