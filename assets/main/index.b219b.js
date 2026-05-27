System.register("chunks:///_virtual/main",["./Start.ts"],(function(){return{setters:[null],execute:function(){}}}));

System.register("chunks:///_virtual/Start.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var r,t,n,o,a,i,l,s,c,u;return{setters:[function(e){r=e.applyDecoratedDescriptor,t=e.inheritsLoose,n=e.initializerDefineProperty,o=e.assertThisInitialized},function(e){a=e.cclegacy,i=e._decorator,l=e.Node,s=e.assetManager,c=e.director,u=e.Component}],execute:function(){var p,f,g,d,b,y,S;a._RF.push({},"faaebNTlRdK+6tUTJ3O30ss","Start",void 0);var h=i.ccclass,v=i.property;e("Start",(p=h("Start"),f=v(l),g=v(l),p((y=r((b=function(e){function r(){for(var r,t=arguments.length,a=new Array(t),i=0;i<t;i++)a[i]=arguments[i];return r=e.call.apply(e,[this].concat(a))||this,n(r,"progressBar",y,o(r)),n(r,"progressLabel",S,o(r)),r}t(r,e);var a=r.prototype;return a.start=function(){console.log("开始加载游戏分包..."),s.loadBundle("GameAssets",(function(e,r){e?console.error("加载分包失败:",e):(console.log("分包加载成功，进入游戏"),c.loadScene("StartScene"))}))},a.update=function(e){},r}(u)).prototype,"progressBar",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),S=r(b.prototype,"progressLabel",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),d=b))||d));a._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});