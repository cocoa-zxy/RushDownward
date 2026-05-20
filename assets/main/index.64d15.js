System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, AudioClip, AudioSource, resources, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      resources = module.resources;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3;
      cclegacy._RF.push({}, "7fa153cg1xE26Ej6lULwc7t", "AudioManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AudioManager = exports('AudioManager', (_dec = ccclass('AudioManager'), _dec2 = property(AudioClip), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioManager, _Component);
        function AudioManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // 当前播放音乐
          _initializerDefineProperty(_this, "currentAudio", _descriptor, _assertThisInitialized(_this));
          // 是否正在播放
          _this.isPlay = false;
          _this.audioSource = null;
          return _this;
        }
        var _proto = AudioManager.prototype;
        _proto.onLoad = function onLoad() {
          if (AudioManager._instance) {
            this.destroy();
            return;
          }
          AudioManager._instance = this;
          this.audioSource = this.node.getComponent(AudioSource);
          this.audioSource.loop = true;
        };
        _proto.onDestroy = function onDestroy() {
          if (AudioManager._instance === this) AudioManager._instance = null;
        };
        _proto.setAudio = function setAudio(audioClip) {
          this.currentAudio = audioClip;
          this.audioSource.clip = this.currentAudio;
        };
        _proto.setAudioByPath = function setAudioByPath(audioClipPath) {
          var _this2 = this;
          resources.load(audioClipPath, AudioClip, function (err, clip) {
            if (err) {
              console.log("\u52A0\u8F7D\u80CC\u666F\u97F3\u4E50\u5931\u8D25:" + audioClipPath, err);
              return;
            }
            _this2.currentAudio = clip;
            _this2.audioSource.clip = _this2.currentAudio;
          });
        };
        _proto.playMusic = function playMusic() {
          if (this.isPlay || !this.currentAudio) return;
          this.audioSource.play();
          this.isPlay = true;
        };
        _proto.pauseMusic = function pauseMusic() {
          if (this.isPlay) {
            this.audioSource.pause();
            this.isPlay = false;
          }
        };
        _createClass(AudioManager, null, [{
          key: "instance",
          get: function get() {
            return this._instance;
          }
        }]);
        return AudioManager;
      }(Component), _class3._instance = null, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentAudio", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Barrier.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventManager.ts', './ScoreManager.ts', './ColliderTagManager.ts', './PropManager.ts', './RewindSystem.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, RigidBody2D, Vec2, Collider2D, UITransform, Vec3, resources, Prefab, instantiate, Contact2DType, Component, EventManager, Score, ColliderTagType, PropManager, RewindSystem;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RigidBody2D = module.RigidBody2D;
      Vec2 = module.Vec2;
      Collider2D = module.Collider2D;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      resources = module.resources;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Contact2DType = module.Contact2DType;
      Component = module.Component;
    }, function (module) {
      EventManager = module.EventManager;
    }, function (module) {
      Score = module.Score;
    }, function (module) {
      ColliderTagType = module.ColliderTagType;
    }, function (module) {
      PropManager = module.PropManager;
    }, function (module) {
      RewindSystem = module.RewindSystem;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "a97a2AB7vBIjZwswK7qWirw", "Barrier", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Barrier = exports('Barrier', (_dec = ccclass('Barrier'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Barrier, _Component);
        function Barrier() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.rigidBody = null;
          _this.collider = null;
          _this.parentUI = null;
          _initializerDefineProperty(_this, "velY", _descriptor, _assertThisInitialized(_this));
          //单位：像素/秒
          //道具出现概率
          _initializerDefineProperty(_this, "propRate", _descriptor2, _assertThisInitialized(_this));
          //道具数组
          _this.allPropPrefab = [];
          //是否已加分
          _this.hasAddScore = false;
          //分数
          _this.score = 10;
          _this.barrierRewind = null;
          return _this;
        }
        var _proto = Barrier.prototype;
        _proto.onLoad = function onLoad() {
          this.barrierRewind = this.node.getComponent(RewindSystem);
          this.velY = 1.6 + Score.value / 200;

          //设置竖直速度
          this.rigidBody = this.getComponent(RigidBody2D);
          this.rigidBody.linearVelocity = new Vec2(0, this.velY);
          this.collider = this.getComponent(Collider2D);

          //设置起始位置
          this.parentUI = this.node.parent.getComponent(UITransform);
          var width = this.getComponent(UITransform).width;
          var posX = Math.floor(Math.random() * (this.parentUI.width - width)) - this.parentUI.width / 2 + width / 2;
          this.node.position = new Vec3(posX, -this.parentUI.height / 2, 0);
          if (Math.random() < this.propRate) this.loadProp();
        };
        _proto.loadProp = function loadProp() {
          var _this2 = this;
          var propList = PropManager.instance.getPropList();
          var randomPropIndex = Math.floor(Math.random() * PropManager.instance.getPropNumber());
          // console.log(randomPropIndex, PropManager.instance.getPropNumber());
          console.log(propList);
          resources.load("prefabs/props/" + propList[randomPropIndex], Prefab, function (err, prefab) {
            if (err) {
              console.error('加载道具失败', err);
            } else {
              var prop = instantiate(prefab);
              prop.setPosition(new Vec3(0, 20, 0));
              prop.getComponent(RigidBody2D).linearVelocity = _this2.rigidBody.linearVelocity.clone();
              prop.setParent(_this2.node);
            }
          });
        };
        _proto.start = function start() {
          this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        };
        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider) {
          var _this3 = this;
          if (otherCollider.node.name === 'DestroyArea') {
            this.scheduleOnce(function () {
              _this3.node.destroy();
            }, 0);
            // console.log('平台已销毁');
            // 2代表玩家
          } else if (otherCollider.tag === ColliderTagType.Player) {
            if (!this.hasAddScore) {
              this.hasAddScore = true;
              EventManager.instance.emit('ADD_SCORE', this.score);
            }
          }
        };
        _proto.onEndContact = function onEndContact(selfCollider, otherCollider) {};
        _proto.update = function update(dt) {};
        _proto.onDestroy = function onDestroy() {
          this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          this.collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        };
        return Barrier;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "velY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.6;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "propRate", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BarrierManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, instantiate, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "19fabubAjNLmrxqFpGSdkQK", "BarrierManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BarrierType = exports('BarrierType', /*#__PURE__*/function (BarrierType) {
        BarrierType[BarrierType["NORMAL"] = 0] = "NORMAL";
        BarrierType[BarrierType["SPIKES"] = 1] = "SPIKES";
        return BarrierType;
      }({}));
      var BarrierManager = exports('BarrierManager', (_dec = ccclass('BarrierManager'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BarrierManager, _Component);
        function BarrierManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // 平台预制体类型
          // 普通平台
          _initializerDefineProperty(_this, "normalBarrier", _descriptor, _assertThisInitialized(_this));
          //地刺平台
          _initializerDefineProperty(_this, "spikesBarrier", _descriptor2, _assertThisInitialized(_this));
          //下一个要生成的平台类型
          _this.nextBarrierType = BarrierType.NORMAL;
          // 需要生成的平台列表
          _this.barrierList = [];
          return _this;
        }
        var _proto = BarrierManager.prototype;
        _proto.onLoad = function onLoad() {
          if (BarrierManager._instance) {
            this.destroy();
            return;
          }
          BarrierManager._instance = this;
        };
        _proto.onDestroy = function onDestroy() {
          if (BarrierManager._instance === this) BarrierManager._instance = null;
        };
        _proto.setBarrierList = function setBarrierList(barrierList) {
          this.barrierList = barrierList;
        };
        _proto.createNextBarrier = function createNextBarrier(parent) {
          this.setNextBarrierType();
          var barrierNode = null;
          switch (this.nextBarrierType) {
            case BarrierType.NORMAL:
              barrierNode = instantiate(this.normalBarrier);
              break;
            case BarrierType.SPIKES:
              barrierNode = instantiate(this.spikesBarrier);
              break;
          }
          barrierNode.setParent(parent);
        };
        _proto.setNextBarrierType = function setNextBarrierType() {
          var randNumber = Math.random();
          for (var i = 0; i < this.barrierList.length; i++) {
            if (randNumber < this.barrierList[i].probabilityEnd) {
              this.nextBarrierType = this.barrierList[i].type;
              return;
            }
          }
        };
        _createClass(BarrierManager, null, [{
          key: "instance",
          get: function get() {
            return this._instance;
          }
        }]);
        return BarrierManager;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "normalBarrier", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spikesBarrier", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "df5a6/IiFJNsrrxHCjQ53gM", "BaseUI", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BaseUI = exports('BaseUI', (_dec = ccclass('BaseUI'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BaseUI, _Component);
        function BaseUI() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = BaseUI.prototype;
        /**
         * UI打开时调用，由UIManager传入参数
         * @param params 任意参数
         */
        _proto.onOpen = function onOpen(param) {
          // 子类覆盖
        }

        /**
         * UI关闭时调用
         */;
        _proto.onClose = function onClose() {
          // 子类覆盖
        };
        return BaseUI;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BlockInput.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a47c1ipfm9OgoVEPkaNZL/E", "BlockInput", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      // 辅助组件：用于遮罩拦截点击事件
      var BlockInput = exports('BlockInput', (_dec = ccclass('BlockInput'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BlockInput, _Component);
        function BlockInput() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = BlockInput.prototype;
        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, function (e) {
            return e.propagationStopped = true;
          }, this);
          this.node.on(Node.EventType.TOUCH_MOVE, function (e) {
            return e.propagationStopped = true;
          }, this);
          this.node.on(Node.EventType.TOUCH_END, function (e) {
            return e.propagationStopped = true;
          }, this);
        };
        return BlockInput;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ColliderTagManager.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c7c71NqFNVKSpQ0VwS4IGqs", "ColliderTagManager", undefined);
      var ColliderTagType = exports('ColliderTagType', /*#__PURE__*/function (ColliderTagType) {
        ColliderTagType[ColliderTagType["Barrier"] = 1] = "Barrier";
        ColliderTagType[ColliderTagType["Player"] = 2] = "Player";
        ColliderTagType[ColliderTagType["Foot"] = 3] = "Foot";
        ColliderTagType[ColliderTagType["Destroy"] = 4] = "Destroy";
        return ColliderTagType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6593dFcrWFLC5hdbHFAxi8t", "EventManager", undefined);
      var EventManager = exports('EventManager', /*#__PURE__*/function () {
        function EventManager() {
          this.eventMap = new Map();
        }
        var _proto = EventManager.prototype;
        //注册监听
        _proto.on = function on(event, callback, target) {
          if (!this.eventMap.has(event)) this.eventMap.set(event, []);
          this.eventMap.get(event).push({
            callback: callback,
            target: target
          });
        }

        //注册一次监听
        ;

        _proto.once = function once(event, callback, target) {
          if (!this.eventMap.has(event)) this.eventMap.set(event, []);
          this.eventMap.get(event).push({
            callback: callback,
            target: target,
            once: true
          });
        }

        //取消监听
        ;

        _proto.off = function off(event, callback, target) {
          var listeners = this.eventMap.get(event);
          if (!listeners) return;
          for (var i = listeners.length - 1; i >= 0; i--) {
            var listener = listeners[i];
            if ((!callback || listener.callback === callback) && (!target || listener.target === target)) listeners.splice(i, 1);
          }
        }

        //触发事件
        ;

        _proto.emit = function emit(event) {
          var listeners = this.eventMap.get(event);
          if (!listeners) return;
          var copy = listeners.slice();
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          for (var _iterator = _createForOfIteratorHelperLoose(copy), _step; !(_step = _iterator()).done;) {
            var listener = _step.value;
            listener.callback.apply(listener.target, args);
            if (listener.once) this.off(event, listener.callback, listener.target);
          }
        };
        _createClass(EventManager, null, [{
          key: "instance",
          get: function get() {
            if (!this._instance) this._instance = new EventManager();
            return this._instance;
          }
        }]);
        return EventManager;
      }());
      EventManager._instance = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameMain.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts', './EventManager.ts', './ScoreManager.ts', './ScoreFloating.ts', './Barrier.ts', './UIManager.ts', './AudioManager.ts', './LevelCreate.ts', './LevelConfig.ts', './LevelSelectManager.ts', './PlayerSelectManager.ts', './PropManager.ts', './ResourceLoadUtil.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Prefab, AudioClip, Node, PhysicsSystem2D, input, Input, KeyCode, instantiate, RigidBody2D, Vec2, UITransform, Component, GameManager, GameState, EventManager, Score, ScoreFloating, Barrier, UIManager, AudioManager, LevelCreate, LEVELS, LevelSelectManager, PlayerSelectManager, PropManager, LoadResource;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      AudioClip = module.AudioClip;
      Node = module.Node;
      PhysicsSystem2D = module.PhysicsSystem2D;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      instantiate = module.instantiate;
      RigidBody2D = module.RigidBody2D;
      Vec2 = module.Vec2;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
      GameState = module.GameState;
    }, function (module) {
      EventManager = module.EventManager;
    }, function (module) {
      Score = module.Score;
    }, function (module) {
      ScoreFloating = module.ScoreFloating;
    }, function (module) {
      Barrier = module.Barrier;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      LevelCreate = module.LevelCreate;
    }, function (module) {
      LEVELS = module.LEVELS;
    }, function (module) {
      LevelSelectManager = module.LevelSelectManager;
    }, function (module) {
      PlayerSelectManager = module.PlayerSelectManager;
    }, function (module) {
      PropManager = module.PropManager;
    }, function (module) {
      LoadResource = module.LoadResource;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "3987d5qxr1Oa56lypbT+3yz", "GameMain", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameMain = exports('GameMain', (_dec = ccclass('GameMain'), _dec2 = property(Prefab), _dec3 = property(AudioClip), _dec4 = property(Node), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameMain, _Component);
        function GameMain() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          //普通平台
          _initializerDefineProperty(_this, "barrierPrefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "timer", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "audioClip", _descriptor3, _assertThisInitialized(_this));
          //分数UI
          _initializerDefineProperty(_this, "scoreLabel", _descriptor4, _assertThisInitialized(_this));
          //分数飘字UI
          _initializerDefineProperty(_this, "scoreFloatingPrefab", _descriptor5, _assertThisInitialized(_this));
          //默认玩家预制体
          _initializerDefineProperty(_this, "defaultPlayerPrefab", _descriptor6, _assertThisInitialized(_this));
          // 玩家节点
          _this.player = null;
          //雪花
          _initializerDefineProperty(_this, "snowParticlePrefab", _descriptor7, _assertThisInitialized(_this));
          // LevelCreate实例
          _this.levelCreate = null;
          return _this;
        }
        var _proto = GameMain.prototype;
        _proto.start = function start() {
          // 创建关卡
          this.levelCreate = this.node.getChildByName('LevelCreate').getComponent(LevelCreate);
          if (!this.levelCreate) console.error('关卡创建失败');
          this.levelCreate.initLevel(LEVELS[LevelSelectManager.instance.getCurrentLevelId()]);
          UIManager.instance.registerPersistentUI('scoreLabel', this.scoreLabel);

          //连接服务器
          // NetworkManager.connect();

          GameManager.instance.switchGameState(GameState.RUN);

          // 播放音乐
          AudioManager.instance.setAudio(this.audioClip);
          AudioManager.instance.playMusic();
          PhysicsSystem2D.instance.enable = true;
          // PhysicsSystem2D.instance.debugDrawFlags = 1;

          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

          //监听玩家死亡事件
          EventManager.instance.on('PLAYER_DEAD', this.gameOver, this);
          //监听加分事件
          EventManager.instance.on('ADD_SCORE', this.onAddScore, this);
          //监听播放音乐事件
          EventManager.instance.on('PLAY_MUSIC', this.onPlayMusic, this);

          //创造雪花预制体
          this.spawnSnow();

          // // 注册道具
          // PropManager.instance.addCurrentProp('Shield');
          // PropManager.instance.addCurrentProp('Rewind');

          // 加载资源
          var playerId = PlayerSelectManager.instance.getPlayerId();
          this.loadResources(playerId);
          UIManager.instance.closeAll();
        };
        _proto.loadResources = /*#__PURE__*/function () {
          var _loadResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(playerId) {
            var playerPrefab;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return LoadResource("prefabs/players/Player_" + playerId, Prefab);
                case 3:
                  playerPrefab = _context.sent;
                  this.player = instantiate(playerPrefab);
                  this.player.setParent(this.node);
                  this.player.setPosition(0, 0);
                  this.loadProp();
                  this.createStartBarrier();
                  _context.next = 14;
                  break;
                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](0);
                  console.error('加载文件出现错误', _context.t0);
                case 14:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[0, 11]]);
          }));
          function loadResources(_x) {
            return _loadResources.apply(this, arguments);
          }
          return loadResources;
        }() // 加载道具
        ;

        _proto.loadProp = function loadProp() {
          var propMap = PropManager.instance.getAllCurrentProps();
          for (var _iterator = _createForOfIteratorHelperLoose(propMap), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              key = _step$value[0],
              value = _step$value[1];
            var prop = this.node.addComponent(key + "Prop");
            prop.onInit("prefabs/prop_icons/" + key + "Button", "prefabs/effects/" + key);
          }
        };
        _proto.onKeyDown = function onKeyDown(e) {
          switch (e.keyCode) {
            case KeyCode.ESCAPE:
              if (GameManager.instance.getCurrentGameState() === GameState.RUN) {
                GameManager.instance.switchGameState(GameState.PAUSE);
                AudioManager.instance.pauseMusic();
                UIManager.instance.open(UIManager.instance.pausePanelPrefab, true);
              }
              break;
          }
        };
        _proto.update = function update(dt) {
          // console.log('游戏状态:', GameManager.instance.getCurrentGameState());
          var state = GameManager.instance.getCurrentGameState();
          if (state !== GameState.RUN && state !== GameState.REWIND) {
            PhysicsSystem2D.instance.enable = false;
            AudioManager.instance.pauseMusic();
            return;
          } else if (state !== GameState.REWIND) {
            if (this.levelCreate) this.levelCreate.updateGame(dt);
          }
        }

        //创建第一个平台
        ;

        _proto.createStartBarrier = function createStartBarrier() {
          var startBarrier = instantiate(this.barrierPrefab);
          startBarrier.setParent(this.node);
          startBarrier.setPosition(0, -100);
          startBarrier.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
          var script = startBarrier.getComponent(Barrier);
          script.onEndContact = function (selfCollider, otherCollider) {
            // 2代表玩家
            if (otherCollider.tag === 2) {
              startBarrier.destroy();
            }
          };
          script.onBeginContact = function (selfCollider, otherCollider) {};
        }

        //游戏结束
        ;

        _proto.gameOver = function gameOver() {
          PropManager.instance.clearAllCurrentProps();
          PhysicsSystem2D.instance.enable = false;
          AudioManager.instance.pauseMusic();
          UIManager.instance.open(UIManager.instance.gameOverUIPrefab, true, {
            finalScore: Score.value
          });
          GameManager.instance.switchGameState(GameState.END);
          Score.value = 0;
        }

        //加分事件回调函数
        ;

        _proto.onAddScore = function onAddScore(value) {
          UIManager.instance.updateScore(value);
          var scoreFloating = instantiate(this.scoreFloatingPrefab);
          scoreFloating.setParent(this.node);
          var canvas = this.node.parent;
          var playerPos = canvas.getComponent(UITransform).convertToNodeSpaceAR(this.player.worldPosition);
          scoreFloating.getComponent(ScoreFloating).play(value, playerPos);
        }

        //创造雪花预制体
        ;

        _proto.spawnSnow = function spawnSnow() {
          var snow = instantiate(this.snowParticlePrefab);
          snow.setParent(this.node);
          // snow.setPosition(-500, 1000, 0);
        };

        _proto.onPlayMusic = function onPlayMusic() {
          AudioManager.instance.playMusic();
        };
        _proto.onDestroy = function onDestroy() {
          var _UIManager$instance;
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          EventManager.instance.off('PLAYER_DEAD', this.gameOver, this);
          EventManager.instance.off('ADD_SCORE', this.onAddScore, this);
          EventManager.instance.off('PLAY_MUSIC', this.onPlayMusic, this);
          (_UIManager$instance = UIManager.instance) == null || _UIManager$instance.unregisterPersistentUI('scoreLabel');
        };
        return GameMain;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "barrierPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timer", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "audioClip", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "scoreFloatingPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "defaultPlayerPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "snowParticlePrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "69e88badLxE4rNlXE2Nd+nQ", "GameManager", undefined);
      var GameState = exports('GameState', /*#__PURE__*/function (GameState) {
        GameState[GameState["START"] = 0] = "START";
        GameState[GameState["RUN"] = 1] = "RUN";
        GameState[GameState["PAUSE"] = 2] = "PAUSE";
        GameState[GameState["END"] = 3] = "END";
        GameState[GameState["REWIND"] = 4] = "REWIND";
        return GameState;
      }({}));
      var GameManager = exports('GameManager', /*#__PURE__*/function () {
        function GameManager() {
          this.currentGameState = GameState.START;
        }
        var _proto = GameManager.prototype;
        _proto.switchGameState = function switchGameState(newState) {
          if (this.currentGameState === newState) return true;
          this.currentGameState = newState;
          return true;
        };
        _proto.getCurrentGameState = function getCurrentGameState() {
          return this.currentGameState;
        };
        _createClass(GameManager, null, [{
          key: "instance",
          get: function get() {
            if (!this._instance) this._instance = new GameManager();
            return this._instance;
          }
        }]);
        return GameManager;
      }());
      GameManager._instance = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameOverUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts', './ScoreManager.ts', './UIManager.ts', './PropNumberManager.ts', './GameManager.ts', './PropManager.ts', './AudioManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, director, PhysicsSystem2D, BaseUI, Score, UIManager, PropNumber, GameManager, GameState, PropManager, AudioManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      director = module.director;
      PhysicsSystem2D = module.PhysicsSystem2D;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      Score = module.Score;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      PropNumber = module.PropNumber;
    }, function (module) {
      GameManager = module.GameManager;
      GameState = module.GameState;
    }, function (module) {
      PropManager = module.PropManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "af712RLlJpEFokuh1agRd57", "GameOverUI", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameOverUI = exports('GameOverUI', (_dec = ccclass('GameOverUI'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(GameOverUI, _BaseUI);
        function GameOverUI() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseUI.call.apply(_BaseUI, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "scoreLabel", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = GameOverUI.prototype;
        _proto.onOpen = function onOpen(param) {
          if (param && param.finalScore !== undefined) {
            this.scoreLabel.string = "Score:" + param.finalScore;
          } else {
            this.scoreLabel.string = "Score:" + Score.value;
          }
        };
        _proto.onClickRestart = function onClickRestart() {
          GameManager.instance.switchGameState(GameState.RUN);
          Score.value = 0;
          PropNumber.clear();
          director.loadScene('GameScene');
        };
        _proto.onClickBackToStart = function onClickBackToStart() {
          PropManager.instance.clearAllCurrentProps();
          PhysicsSystem2D.instance.enable = false;
          AudioManager.instance.pauseMusic();
          UIManager.instance.open(UIManager.instance.gameOverUIPrefab, true, {
            finalScore: Score.value
          });
          Score.value = 0;
          GameManager.instance.switchGameState(GameState.START);
          director.loadScene('StartScene');
        };
        return GameOverUI;
      }(BaseUI), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HealthBar.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, instantiate, Component, EventManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "8d3f5vq5QJDPo8UE76YHaVs", "HealthBar", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var HealthBar = exports('HealthBar', (_dec = ccclass('HealthBar'), _dec2 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HealthBar, _Component);
        function HealthBar() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "hpGrid", _descriptor, _assertThisInitialized(_this));
          _this.currentHP = 50;
          _this.maxHP = 50;
          _this.hpPerGrid = 10;
          _this.gridList = [];
          return _this;
        }
        var _proto = HealthBar.prototype;
        _proto.start = function start() {
          var gridCount = this.maxHP / this.hpPerGrid;
          var gridContainer = this.node.getChildByName('GridContainer');
          if (!gridContainer) return;
          for (var i = 0; i < gridCount; i++) {
            var grid = instantiate(this.hpGrid);
            grid.parent = gridContainer;
            this.gridList.push(grid);
          }
          this.updateGridContainer();
          EventManager.instance.on('UPDATE_HP', this.onUpdateHP, this);
        };
        _proto.onUpdateHP = function onUpdateHP(value) {
          this.currentHP += value;
          if (this.currentHP > this.maxHP) {
            this.currentHP = this.maxHP;
          } else if (this.currentHP <= 0) {
            this.currentHP = 0;
            EventManager.instance.emit('PLAYER_DEAD');
          }
          this.updateGridContainer();
        };
        _proto.getCurrentHP = function getCurrentHP() {
          return this.currentHP;
        }

        //更新血条UI
        ;

        _proto.updateGridContainer = function updateGridContainer() {
          var activeGrids = Math.ceil(this.currentHP / this.hpPerGrid);
          for (var i = 0; i < this.gridList.length; i++) {
            var activeIcon = this.gridList[i];
            activeIcon.active = i < activeGrids;
          }
        };
        _proto.update = function update(deltaTime) {};
        _proto.onDestroy = function onDestroy() {
          EventManager.instance.off('UPDATE_HP', this.onUpdateHP, this);
        };
        return HealthBar;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "hpGrid", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IAbility.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "be77fWY84hNvoZu5I/N3UiR", "IAbility", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IProp.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cb619tkO1dFzbY9HWRl97cA", "IProp", undefined);
      /**
       * 道具接口
       * 实现这个接口的组件为道具组件
       * 在进入关卡时添加对应的道具组件，使得在进入关卡时拥有不同的道具
       */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JoyStick.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec2, UITransform, input, Input, Vec3, Component, EventManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec2 = module.Vec2;
      UITransform = module.UITransform;
      input = module.input;
      Input = module.Input;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "d2516GbT0hMsoljMs0DKT0k", "JoyStick", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var JoyStick = exports('JoyStick', (_dec = ccclass('JoyStick'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(JoyStick, _Component);
        function JoyStick() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          //摇杆底座
          _initializerDefineProperty(_this, "bgNode", _descriptor, _assertThisInitialized(_this));
          //摇杆头
          _initializerDefineProperty(_this, "stickNode", _descriptor2, _assertThisInitialized(_this));
          //摇杆的最大移动半径
          _initializerDefineProperty(_this, "maxRadius", _descriptor3, _assertThisInitialized(_this));
          _this.isTouching = false;
          _this.isFull = false;
          //是否滑到最远端
          _this.direction = new Vec2(0, 0);
          //方向向量，给Player.ts
          _this.bgUITransform = null;
          return _this;
        }
        var _proto = JoyStick.prototype;
        _proto.start = function start() {
          this.bgUITransform = this.bgNode.getComponent(UITransform);
          this.maxRadius = this.bgUITransform.width / 2;

          //监听触摸事件
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        _proto.onTouchStart = function onTouchStart(event) {
          var touchPos = event.getUILocation();
          if (this.isInBgRange(touchPos)) {
            this.updateStickPosition(touchPos);
            this.isTouching = true;
          }
        };
        _proto.onTouchMove = function onTouchMove(event) {
          if (!this.isTouching) return;
          var touchPos = event.getUILocation();
          this.updateStickPosition(touchPos);
          this.isFull = Math.abs(this.stickNode.position.x) >= this.maxRadius / 2;
        };
        _proto.onTouchEnd = function onTouchEnd(event) {
          this.isTouching = false;
          this.stickNode.setPosition(0, 0, 0);
          this.direction.set(0, 0);
          EventManager.instance.emit('STOP_MOVE');
        };
        _proto.updateStickPosition = function updateStickPosition(touchLocation) {
          var touchVec3 = new Vec3(touchLocation.x, touchLocation.y, 0);
          var localPos = this.bgUITransform.convertToNodeSpaceAR(touchVec3);
          var clampedX = localPos.x;
          var clampedY = 0;
          if (Math.abs(clampedX) > this.maxRadius) clampedX = clampedX > 0 ? this.maxRadius : -this.maxRadius;
          this.stickNode.setPosition(clampedX, clampedY, 0);
          this.direction.set(clampedX, clampedY);
          EventManager.instance.emit('MOVE', {
            left: this.direction.x < -10,
            right: this.direction.x > 10
          });
        };
        _proto.isInBgRange = function isInBgRange(touchLocation) {
          var touchVec3 = new Vec3(touchLocation.x, touchLocation.y, 0);
          var localPosInBg = this.bgUITransform.convertToNodeSpaceAR(touchVec3);
          var bgHeight = this.bgUITransform.contentSize.height;
          return Math.abs(localPosInBg.x) < this.maxRadius && Math.abs(localPosInBg.y) < bgHeight / 2;
        };
        _proto.update = function update(dt) {};
        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        _proto.getDirection = function getDirection() {
          return this.direction;
        };
        _proto.getIsFull = function getIsFull() {
          return this.isFull;
        };
        return JoyStick;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "stickNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 75;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JumpAbility.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Player.ts', './EventManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, RigidBody2D, Component, Player, EventManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RigidBody2D = module.RigidBody2D;
      Component = module.Component;
    }, function (module) {
      Player = module.Player;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "b6c0dNiYOpAm4R0dg0SEJSy", "JumpAbility", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var JumpAbility = exports('JumpAbility', (_dec = ccclass('JumpAbility'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(JumpAbility, _Component);
        function JumpAbility() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "jumpVel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "maxFallSpeed", _descriptor2, _assertThisInitialized(_this));
          _this.jumpBufferTime = 0.08;
          _this.coyoteTime = 0.08;
          _this.jumpBufferTimer = 0;
          _this.coyoteTimer = 0;
          _this.rigidBody = null;
          _this.player = null;
          return _this;
        }
        var _proto = JumpAbility.prototype;
        _proto.start = function start() {
          this.rigidBody = this.node.getComponent(RigidBody2D);
          this.player = this.node.getComponent(Player);

          // 监听跳跃按钮点击事件
          EventManager.instance.on('CLICK_JUMP', this.onClickJump, this);
        };
        _proto.onClickJump = function onClickJump() {
          this.jumpBufferTimer = this.jumpBufferTime;
        };
        _proto.onUpdate = function onUpdate(dt) {
          if (!this.player || !this.rigidBody) return;
          var vel = this.rigidBody.linearVelocity.clone();
          this.updateTimer(dt);
          if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
            vel.y = this.jumpVel;
            this.jumpBufferTimer = this.coyoteTimer = 0;
          }
          if (vel.y < this.maxFallSpeed) vel.y = this.maxFallSpeed;
          this.rigidBody.linearVelocity = vel;
        }

        // 钩子方法（留给子类重写，例如二段跳等）
        ;

        _proto.updateTimer = function updateTimer(dt) {
          if (this.player.getIsGround()) {
            this.coyoteTimer = this.coyoteTime;
          } else {
            this.coyoteTimer -= dt;
          }
          this.jumpBufferTimer -= dt;
        };
        _proto.onInput = function onInput(key, pressed) {
          if (key === 'jump' && pressed) this.jumpBufferTimer = this.jumpBufferTime;
        };
        _proto.onDestroy = function onDestroy() {
          EventManager.instance.off('CLICK_JUMP', this.onClickJump, this);
        };
        return JumpAbility;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "jumpVel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "maxFallSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -20;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelConfig.ts", ['cc', './BarrierManager.ts'], function (exports) {
  var cclegacy, BarrierType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BarrierType = module.BarrierType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a55b1NYjutM/bujZu3yyvXn", "LevelConfig", undefined);

      /**
       * 平台生成指令
       * 列表中请保持概率区间右边界递增排列，且最后一项的右边界为1
       */

      // 关卡配置

      // 关卡配置表
      var LEVELS = exports('LEVELS', {
        1: {
          id: 1,
          name: '第一关',
          barrierList: [{
            type: BarrierType.SPIKES,
            probabilityEnd: 0.2
          }, {
            type: BarrierType.NORMAL,
            probabilityEnd: 1
          }]
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelCreate.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BarrierManager.ts', './ScoreManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, BarrierManager, Score;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      BarrierManager = module.BarrierManager;
    }, function (module) {
      Score = module.Score;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "39bd7363s5E4bCB+l0RTGha", "LevelCreate", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LevelCreate = exports('LevelCreate', (_dec = ccclass('LevelCreate'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LevelCreate, _Component);
        function LevelCreate() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // 当前关卡数据
          _this.currentLevelData = null;
          _this.isSpawning = false;
          // 平台生成间隔
          _this.barrierInterval = 2;
          // 平台生成计时器
          _this.timer = 0;
          return _this;
        }
        var _proto = LevelCreate.prototype;
        /**
         * 初始化关卡数据
         * @param levelData 关卡数据
         */
        _proto.initLevel = function initLevel(levelData) {
          var _this$currentLevelDat, _this$currentLevelDat2;
          this.currentLevelData = levelData;
          var barrierList = this.currentLevelData.barrierList;
          var backgroundPath = (_this$currentLevelDat = this.currentLevelData.backgroundPath) != null ? _this$currentLevelDat : 'images/background.png';
          var backgroundMusicPath = (_this$currentLevelDat2 = this.currentLevelData.backgroundMusicPath) != null ? _this$currentLevelDat2 : 'audios/ikoliks_aj-acoustic-spring-mothers-day-music-320427.mp3';
          BarrierManager.instance.setBarrierList(barrierList);
          // if (backgroundMusicPath)
          //     this.setBackgroundMusic(backgroundMusicPath);
          // if (backgroundPath)
          //     this.setBackground(backgroundPath);
          this.isSpawning = true;
        };
        _proto.updateGame = function updateGame(dt) {
          if (!this.isSpawning || !this.currentLevelData) return;
          var barrierList = this.currentLevelData.barrierList;
          this.createBarrier(dt, barrierList);
          this.barrierInterval = 2 - Score.value / 500;
        };
        _proto.createBarrier = function createBarrier(dt, barrierList) {
          this.timer += dt;
          if (this.timer >= this.barrierInterval) {
            BarrierManager.instance.createNextBarrier(this.node.parent);
            this.timer = 0;
          }
        };
        _proto.setBackgroundMusic = function setBackgroundMusic(audioClipPath) {};
        _proto.setBackground = function setBackground(backgroundPath) {};
        return LevelCreate;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelSelectItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LevelSelectManager.ts', './UIManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, tween, Vec3, Component, LevelSelectManager, UIManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      LevelSelectManager = module.LevelSelectManager;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "30264KUJB5Ge7gnXMW6KtW5", "LevelSelectItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LevelSelectItem = exports('LevelSelectItem', (_dec = ccclass('LevelSelectItem'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LevelSelectItem, _Component);
        function LevelSelectItem() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = LevelSelectItem.prototype;
        _proto.start = function start() {
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        _proto.onTouchEnd = function onTouchEnd() {
          var levelIdStr = this.node.getChildByName('Text');
          LevelSelectManager.instance.setCurrentLevelId(Number(levelIdStr.string));

          // 点击动画
          tween(this.node).to(0.1, {
            scale: new Vec3(0.8, 0.8, 0.8)
          }).to(0.1, {
            scale: new Vec3(1, 1, 1)
          }).call(function () {
            UIManager.instance.open(UIManager.instance.propSelectPanelPrefab, true);
          }).start();
        };
        _proto.update = function update(deltaTime) {};
        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        return LevelSelectItem;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelSelectManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "517c6eN2mdFVJ4aR/g6p4Cq", "LevelSelectManager", undefined);
      var LevelSelectManager = exports('LevelSelectManager', /*#__PURE__*/function () {
        function LevelSelectManager() {
          this.currentLevelId = 1;
        }
        var _proto = LevelSelectManager.prototype;
        _proto.setCurrentLevelId = function setCurrentLevelId(levelId) {
          this.currentLevelId = levelId;
        };
        _proto.getCurrentLevelId = function getCurrentLevelId() {
          return this.currentLevelId;
        };
        _createClass(LevelSelectManager, null, [{
          key: "instance",
          get: function get() {
            if (!this._instance) this._instance = new LevelSelectManager();
            return this._instance;
          }
        }]);
        return LevelSelectManager;
      }());
      LevelSelectManager._instance = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelSelectPanel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LevelConfig.ts', './BaseUI.ts', './UIManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, instantiate, LEVELS, BaseUI, UIManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
    }, function (module) {
      LEVELS = module.LEVELS;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "1400er/2YNEJ5oh0WqaIFCt", "LevelSelectPanel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LevelSelectPanel = exports('LevelSelectPanel', (_dec = ccclass('LevelSelectPanel'), _dec2 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(LevelSelectPanel, _BaseUI);
        function LevelSelectPanel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseUI.call.apply(_BaseUI, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "LevelSelectPrefab", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = LevelSelectPanel.prototype;
        _proto.onOpen = function onOpen(param) {
          for (var i = 0; i < Object.keys(LEVELS).length; i++) {
            var level = instantiate(this.LevelSelectPrefab);
            var levelText = level.getChildByName('Text');
            levelText.string = (i + 1).toString();
            level.setParent(this.node.getChildByName('Layout'));
          }
        };
        _proto.onClickBack = function onClickBack() {
          UIManager.instance.close();
        };
        return LevelSelectPanel;
      }(BaseUI), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "LevelSelectPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./socket.io.min.mjs_cjs=&original=.js', './Barrier.ts', './GameMain.ts', './HealthBar.ts', './JoyStick.ts', './LevelCreate.ts', './Palette.ts', './Player.ts', './PlayerAnimationController.ts', './Rewind.ts', './RewindData.ts', './RewindSystem.ts', './ScoreFloating.ts', './Shield.ts', './StartUI.ts', './IAbility.ts', './JumpAbility.ts', './MoveAbility.ts', './RepeatedlyJump.ts', './LevelConfig.ts', './PlayerConfig.ts', './PropConfig.ts', './AudioManager.ts', './BarrierManager.ts', './ColliderTagManager.ts', './EventManager.ts', './GameManager.ts', './LevelSelectManager.ts', './NetworkManager.ts', './PlayerSelectManager.ts', './PlayerStateManager.ts', './PropManager.ts', './PropNumberManager.ts', './UIManager.ts', './IProp.ts', './RewindProp.ts', './ShieldProp.ts', './spikesBarrier.ts', './BaseUI.ts', './BlockInput.ts', './GameOverUI.ts', './LevelSelectItem.ts', './LevelSelectPanel.ts', './PausePanel.ts', './PlayerSelectItem.ts', './PlayerSelectPanel.ts', './PropSelectItem.ts', './PropSelectPanel.ts', './ScoreManager.ts', './ResourceLoadUtil.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MoveAbility.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Player.ts', './EventManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, RigidBody2D, Component, Player, EventManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RigidBody2D = module.RigidBody2D;
      Component = module.Component;
    }, function (module) {
      Player = module.Player;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "eb2e5aSruNG5riFno7xGmKY", "MoveAbility", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MoveAbility = exports('MoveAbility', (_dec = ccclass('MoveAbility'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MoveAbility, _Component);
        function MoveAbility() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "moveMax", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "groundAccel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "airAccel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "groundDamping", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "airDamping", _descriptor5, _assertThisInitialized(_this));
          _this.left = false;
          _this.right = false;
          _this.rigidBody = null;
          _this.player = null;
          return _this;
        }
        var _proto = MoveAbility.prototype;
        _proto.start = function start() {
          this.rigidBody = this.node.getComponent(RigidBody2D);
          this.player = this.node.getComponent(Player);

          // 监听摇杆发出的移动事件
          EventManager.instance.on('MOVE', this.onMove, this);
          EventManager.instance.on('STOP_MOVE', this.onStopMove, this);
        };
        _proto.onMove = function onMove(data) {
          this.left = data.left;
          this.right = data.right;
        };
        _proto.onStopMove = function onStopMove() {
          this.left = this.right = false;
        };
        _proto.onUpdate = function onUpdate(dt) {
          if (!this.player || !this.rigidBody) return;
          var targetSpeed = this.left ? -this.moveMax : this.right ? this.moveMax : 0;
          // if (!this.joyStick.getComponent(JoyStick).getIsFull())
          //     targetSpeed = targetSpeed / 2;
          var accel = this.player.getIsGround() ? this.groundAccel : this.airAccel;
          var damping = this.player.getIsGround() ? this.groundDamping : this.airDamping;
          var vel = this.rigidBody.linearVelocity;
          if (targetSpeed != 0) {
            var diff = targetSpeed - vel.x;
            var maxStep = accel * dt;
            vel.x += Math.max(-maxStep, Math.min(maxStep, diff));
          } else {
            var decel = damping * dt;
            if (Math.abs(vel.x) < decel) vel.x = 0;else vel.x -= Math.sign(vel.x) * decel;
          }
          this.rigidBody.linearVelocity = vel;
        };
        _proto.onInput = function onInput(key, pressed) {
          if (key === 'left') this.left = pressed;else if (key === 'right') this.right = pressed;
        };
        _proto.setDirection = function setDirection(left, right) {
          this.left = left;
          this.right = right;
        };
        return MoveAbility;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveMax", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "groundAccel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "airAccel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "groundDamping", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "airDamping", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetworkManager.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f99bfsMYp1GUp9VsOEDPsMp", "NetworkManager", undefined);
      var NetworkManager = exports('NetworkManager', /*#__PURE__*/function () {
        function NetworkManager() {}
        NetworkManager.connect = function connect() {
          var _this = this;
          // 不要限制 transports，让客户端自动选择
          this.socket = io('https://c3cc7e8.r12.vip.cpolar.cn');
          this.socket.on("connect", function () {
            return console.log("✅ 已连接服务器:", _this.socket.id);
          });
          this.socket.on("connect_error", function (err) {
            return console.log("❌ 连接失败:", err.message);
          });
          this.socket.on("disconnect", function (reason) {
            return console.log("⚠️ 与服务器断开:", reason);
          });

          //发送测试信息
          this.socket.emit('client-message', '客户端上线啦!');

          //接受服务器消息
          this.socket.on('server-message', function (msg) {
            console.log('📩 收到服务器消息:', msg);
          });
        };
        return NetworkManager;
      }());
      NetworkManager.socket = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Palette.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './env'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, UIRenderer, Sprite, Label, director, Director, clamp, Component, Color, DEV;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIRenderer = module.UIRenderer;
      Sprite = module.Sprite;
      Label = module.Label;
      director = module.director;
      Director = module.Director;
      clamp = module.clamp;
      Component = module.Component;
      Color = module.Color;
    }, function (module) {
      DEV = module.DEV;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "826a4YZWZ1HjrDekTvab7vC", "Palette", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        executeInEditMode = _decorator.executeInEditMode,
        requireComponent = _decorator.requireComponent,
        menu = _decorator.menu;
      var Palette = exports('Palette', (_dec = requireComponent(UIRenderer), _dec2 = menu('Public/Palette'), _dec3 = property({
        displayName: DEV
      }), _dec4 = property({
        displayName: DEV
      }), _dec5 = property({
        displayName: DEV
      }), _dec6 = property({
        displayName: DEV
      }), _dec7 = property({
        range: [0, 1],
        step: 0.01,
        slide: true,
        displayName: '🌈 色相'
      }), _dec8 = property({
        range: [0, 1],
        step: 0.01,
        slide: true,
        displayName: '🌞 暗度'
      }), ccclass(_class = executeInEditMode(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Palette, _Component);
        function Palette() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "_colorLB", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_colorRB", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_colorLT", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_colorRT", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_hueRatio", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_darkness", _descriptor6, _assertThisInitialized(_this));
          _this.ur = null;
          _this.hue = [1, 1, 1];
          return _this;
        }
        var _proto = Palette.prototype;
        //色相分量
        _proto.onLoad = function onLoad() {
          this.ur = this.node.getComponent(UIRenderer);
          if (!(this.ur instanceof Sprite || this.ur instanceof Label)) {
            console.warn('Palette只对Sprite和Label有效！');
            this.destroy();
            return;
          }
          this.ur['_useVertexOpacity'] = true; //启用顶点透明度（否则透明度只受color.a影响）
        };

        _proto.onEnable = function onEnable() {
          this.updateHueRatio();
          director.once(Director.EVENT_AFTER_DRAW, this.updateColor, this);
        };
        _proto.onDisable = function onDisable() {
          if (!this.ur['_renderData']) return;
          var vb = this.ur['_renderData'].chunk.vb;
          var color = this.ur.color;
          vb[5] = vb[14] = vb[23] = vb[32] = color.r / 255;
          vb[6] = vb[15] = vb[24] = vb[33] = color.g / 255;
          vb[7] = vb[16] = vb[25] = vb[34] = color.b / 255;
          vb[8] = vb[17] = vb[26] = vb[35] = color.a / 255;
        };
        _proto.updateColor = function updateColor() {
          var vb = this.ur['_renderData'].chunk.vb;
          var lb = this._colorLB,
            rb = this._colorRB,
            lt = this._colorLT,
            rt = this._colorRT;
          var d = this._darkness / 255,
            h = this.hue,
            r = h[0] * d,
            g = h[1] * d,
            b = h[2] * d;
          vb[5] = lb.r * r;
          vb[6] = lb.g * g;
          vb[7] = lb.b * b;
          vb[8] = lb.a / 255;
          vb[14] = rb.r * r;
          vb[15] = rb.g * g;
          vb[16] = rb.b * b;
          vb[17] = rb.a / 255;
          vb[23] = lt.r * r;
          vb[24] = lt.g * g;
          vb[25] = lt.b * b;
          vb[26] = lt.a / 255;
          vb[32] = rt.r * r;
          vb[33] = rt.g * g;
          vb[34] = rt.b * b;
          vb[35] = rt.a / 255;
        };
        _proto.updateHueRatio = function updateHueRatio() {
          var step = 1 / 7;
          var hueRatio = this._hueRatio;
          if (hueRatio < step) this.hue = [1, hueRatio / step, 0];else if (hueRatio < step * 2) this.hue = [2 - hueRatio / step, 1, 0];else if (hueRatio < step * 3) this.hue = [0, 1, hueRatio / step - 2];else if (hueRatio < step * 4) this.hue = [0, 4 - hueRatio / step, 1];else if (hueRatio < 5 * step) this.hue = [hueRatio / step - 4, 0, 1];else if (hueRatio < 6 * step) this.hue = [1, 0, 6 - hueRatio / step];else {
            this.hue = [1, hueRatio / step - 6, hueRatio / step - 6];
          }
        };
        _createClass(Palette, [{
          key: "colorLB",
          get: function get() {
            return this._colorLB;
          },
          set: function set(value) {
            this._colorLB = value;
            this.updateColor();
          }
        }, {
          key: "colorRB",
          get: function get() {
            return this._colorRB;
          },
          set: function set(value) {
            this._colorRB = value;
            this.updateColor();
          }
        }, {
          key: "colorLT",
          get: function get() {
            return this._colorLT;
          },
          set: function set(value) {
            this._colorLT = value;
            this.updateColor();
          }
        }, {
          key: "colorRT",
          get: function get() {
            return this._colorRT;
          },
          set: function set(value) {
            this._colorRT = value;
            this.updateColor();
          }
        }, {
          key: "hueRatio",
          get: function get() {
            return this._hueRatio;
          },
          set: function set(val) {
            this._hueRatio = clamp(val, 0, 1);
            this.updateHueRatio();
            this.updateColor();
          }
        }, {
          key: "darkness",
          get: function get() {
            return this._darkness;
          },
          set: function set(val) {
            this._darkness = clamp(val, 0, 1);
            this.updateColor();
          }
        }]);
        return Palette;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_colorLB", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(255, 255, 255, 255);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "colorLB", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "colorLB"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_colorRB", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(255, 255, 255, 255);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "colorRB", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "colorRB"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_colorLT", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(255, 255, 255, 255);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "colorLT", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "colorLT"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_colorRT", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(255, 255, 255, 255);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "colorRT", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "colorRT"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_hueRatio", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "hueRatio", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "hueRatio"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_darkness", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "darkness", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "darkness"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PausePanel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts', './GameManager.ts', './UIManager.ts', './AudioManager.ts', './ScoreManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, PhysicsSystem2D, BaseUI, GameManager, GameState, UIManager, AudioManager, Score;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      PhysicsSystem2D = module.PhysicsSystem2D;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      GameManager = module.GameManager;
      GameState = module.GameState;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      Score = module.Score;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "155d9sQqOFKm6t+EG48vU/Q", "PausePanel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PausePanel = exports('PausePanel', (_dec = ccclass('PausePanel'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(PausePanel, _BaseUI);
        function PausePanel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseUI.call.apply(_BaseUI, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "textLabel", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = PausePanel.prototype;
        _proto.onOpen = function onOpen(param) {
          if (this.textLabel) {
            this.textLabel.string = "\u5F53\u524D\u5206\u6570\uFF1A" + Score.value;
          }
        };
        _proto.onClickResume = function onClickResume() {
          GameManager.instance.switchGameState(GameState.RUN);
          PhysicsSystem2D.instance.enable = true;
          AudioManager.instance.playMusic();
          UIManager.instance.close();
        };
        _proto.onClickEnd = function onClickEnd() {
          PhysicsSystem2D.instance.enable = false;
          AudioManager.instance.pauseMusic();
          UIManager.instance.close();
          UIManager.instance.open(UIManager.instance.gameOverUIPrefab, true, {
            finalScore: Score.value
          });
          GameManager.instance.switchGameState(GameState.END);
          Score.value = 0;
        };
        return PausePanel;
      }(BaseUI), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "textLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Player.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerAnimationController.ts', './EventManager.ts', './RewindSystem.ts', './ColliderTagManager.ts', './PlayerStateManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Node, Component, input, Input, RigidBody2D, BoxCollider2D, Contact2DType, KeyCode, PlayerAnimationController, PlayerAnimState, EventManager, RewindSystem, ColliderTagType, PlayerStateManager, PlayerState;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
      input = module.input;
      Input = module.Input;
      RigidBody2D = module.RigidBody2D;
      BoxCollider2D = module.BoxCollider2D;
      Contact2DType = module.Contact2DType;
      KeyCode = module.KeyCode;
    }, function (module) {
      PlayerAnimationController = module.PlayerAnimationController;
      PlayerAnimState = module.PlayerAnimState;
    }, function (module) {
      EventManager = module.EventManager;
    }, function (module) {
      RewindSystem = module.RewindSystem;
    }, function (module) {
      ColliderTagType = module.ColliderTagType;
    }, function (module) {
      PlayerStateManager = module.PlayerStateManager;
      PlayerState = module.PlayerState;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "9680chrJIRJfKFgIIzLYxpd", "Player", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Player = exports('Player', (_dec = ccclass('Player'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Player, _Component);
        function Player() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.bodyCollider = null;
          _this.footCollider = null;
          _this.abilities = [];
          _this.isGround = false;
          _this.barrierContactCount = 0;
          _this.rigidBody = null;
          _this.isDead = false;
          //动画组件
          _this.anim = null;
          //Sprite
          _initializerDefineProperty(_this, "playerSprite", _descriptor, _assertThisInitialized(_this));
          //回溯系统
          _this.playerRewind = null;
          return _this;
        }
        var _proto = Player.prototype;
        _proto.onLoad = function onLoad() {
          this.initCollider();
          var comps = this.node.getComponents(Component);
          for (var _iterator = _createForOfIteratorHelperLoose(comps), _step; !(_step = _iterator()).done;) {
            var comp = _step.value;
            if (typeof comp.onUpdate === 'function') {
              this.abilities.push(comp);
            }
          }
          this.playerRewind = this.node.getComponent(RewindSystem);
          this.anim = this.getComponent(PlayerAnimationController);
          if (this.anim) console.log('玩家动画控制器加载成功');
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
          this.rigidBody = this.getComponent(RigidBody2D);
          this.rigidBody.linearDamping = 0;
          this.rigidBody.fixedRotation = true;
          this.enableCanvasFocus();
          EventManager.instance.on('HURT', this.onHurt, this);
        };
        _proto.initCollider = function initCollider() {
          var colliders = this.node.getComponents(BoxCollider2D);
          for (var _iterator2 = _createForOfIteratorHelperLoose(colliders), _step2; !(_step2 = _iterator2()).done;) {
            var collider = _step2.value;
            if (collider.tag === ColliderTagType.Player) {
              this.bodyCollider = collider;
            } else if (collider.tag === ColliderTagType.Foot) {
              this.footCollider = collider;
            }
          }
          console.log('bodyCollider:', this.bodyCollider, this.node.name);
          console.log('footCollider:', this.footCollider, this.node.name);
          this.bodyCollider.on(Contact2DType.BEGIN_CONTACT, this.onBodyBeginContact, this);
          this.footCollider.on(Contact2DType.BEGIN_CONTACT, this.onFootBeginContact, this);
          this.footCollider.on(Contact2DType.END_CONTACT, this.onFootEndContact, this);
        };
        _proto.start = function start() {};
        _proto.onKeyDown = function onKeyDown(e) {
          var key = this.mapKeyCode(e.keyCode);
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.abilities), _step3; !(_step3 = _iterator3()).done;) {
            var ability = _step3.value;
            ability.onInput == null || ability.onInput(key, true);
          }
        };
        _proto.onKeyUp = function onKeyUp(e) {
          var key = this.mapKeyCode(e.keyCode);
          for (var _iterator4 = _createForOfIteratorHelperLoose(this.abilities), _step4; !(_step4 = _iterator4()).done;) {
            var ability = _step4.value;
            ability.onInput == null || ability.onInput(key, false);
          }
        };
        _proto.onBodyBeginContact = function onBodyBeginContact(self, other) {
          if (other.tag === ColliderTagType.Destroy) {
            this.gameOver();
          }
        };
        _proto.onFootBeginContact = function onFootBeginContact(self, other) {
          if (other.tag === ColliderTagType.Barrier) {
            this.barrierContactCount++;
            this.isGround = true;
          }
        };
        _proto.onFootEndContact = function onFootEndContact(self, other) {
          if (other.tag === ColliderTagType.Barrier) {
            this.barrierContactCount--;
            if (this.barrierContactCount <= 0) {
              this.isGround = false;
              this.barrierContactCount = 0;
            }
          }
        };
        _proto.update = function update(dt) {
          // if(GameState.isPaused) return;

          //游戏结束
          if (this.node.position.y < -360) this.gameOver();

          // 统一驱动所有能力
          for (var _iterator5 = _createForOfIteratorHelperLoose(this.abilities), _step5; !(_step5 = _iterator5()).done;) {
            var ability = _step5.value;
            ability.onUpdate(dt);
          }
          var vel = this.rigidBody.linearVelocity;
          //翻转
          if (vel.x > 0) {
            this.playerSprite.setScale(1, 1, 1);
          } else if (vel.x < 0) {
            this.playerSprite.setScale(-1, 1, 1);
          }
          //设置最终速度
          this.rigidBody.linearVelocity = vel;
          //更新角色动画
          this.updateAnimation();
        };
        _proto.onHurt = function onHurt(hurtValue) {
          var playerStateList = PlayerStateManager.instance.getStateList();
          if (playerStateList.has(PlayerState.Shield)) {
            EventManager.instance.emit('LOSE_SHIELD');
          } else {
            console.log('扣血');
            EventManager.instance.emit('UPDATE_HP', -hurtValue);
          }
        };
        _proto.enableCanvasFocus = function enableCanvasFocus() {
          if (typeof document === 'undefined') return;
          var canvas = document.querySelector('canvas');
          if (canvas) {
            canvas.setAttribute('tabindex', '0');
            canvas.style.outline = 'none';
            setTimeout(function () {
              return canvas.focus();
            }, 100);
          }
        };
        _proto.updateAnimation = function updateAnimation() {
          var vel = this.getComponent(RigidBody2D).linearVelocity;
          //优先空中状态
          if (!this.isGround) {
            if (vel.y > 0) this.anim.changeState(PlayerAnimState.JUMP);else if (vel.y < 0) this.anim.changeState(PlayerAnimState.FALL);
          } else {
            if (Math.abs(vel.x) > 0.1) this.anim.changeState(PlayerAnimState.WALK);else this.anim.changeState(PlayerAnimState.IDLE);
          }
        };
        _proto.gameOver = function gameOver() {
          if (this.isDead) return;
          this.isDead = true;
          EventManager.instance.emit("PLAYER_DEAD");
        }

        //获取isGround
        ;

        _proto.getIsGround = function getIsGround() {
          return this.isGround;
        };
        _proto.onClickJump = function onClickJump() {
          EventManager.instance.emit('CLICK_JUMP');
        };
        _proto.mapKeyCode = function mapKeyCode(code) {
          switch (code) {
            case KeyCode.KEY_A:
              return 'left';
            case KeyCode.KEY_D:
              return 'right';
            case KeyCode.SPACE:
              return 'jump';
            default:
              return '';
          }
        };
        _proto.setIsGround = function setIsGround(value) {
          this.isGround = value;
        };
        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
          this.bodyCollider.off(Contact2DType.BEGIN_CONTACT, this.onBodyBeginContact, this);
          this.footCollider.off(Contact2DType.BEGIN_CONTACT, this.onFootBeginContact, this);
          this.footCollider.off(Contact2DType.END_CONTACT, this.onFootEndContact, this);
          EventManager.instance.off('HURT', this.onHurt, this);
        };
        return Player;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerAnimationController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerSelectManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Animation, Component, PlayerSelectManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      PlayerSelectManager = module.PlayerSelectManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "7eee97c+ohHQ46gAqNvF5Y/", "PlayerAnimationController", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PlayerAnimState = exports('PlayerAnimState', /*#__PURE__*/function (PlayerAnimState) {
        PlayerAnimState["IDLE"] = "player_idle";
        PlayerAnimState["WALK"] = "player_walk";
        PlayerAnimState["JUMP"] = "player_jump";
        PlayerAnimState["FALL"] = "player_fall";
        return PlayerAnimState;
      }({}));
      var PlayerAnimationController = exports('PlayerAnimationController', (_dec = ccclass('PlayerAnimationController'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerAnimationController, _Component);
        function PlayerAnimationController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.anim = null;
          //当前状态
          _this.currentState = PlayerAnimState.IDLE;
          //动画切换淡入淡出时间
          _this.crossFadeTime = 0.15;
          return _this;
        }
        var _proto = PlayerAnimationController.prototype;
        _proto.start = function start() {
          this.anim = this.node.getChildByName('PlayerSprite').getComponent(Animation);
          if (!this.anim) {
            console.log('未找到Animation组件');
          }
          console.log('加载组件成功');
          this.anim.play('PlayerAnimState.IDLE' + '_' + ("" + PlayerSelectManager.instance.getPlayerId()));
        };
        _proto.getCurrentState = function getCurrentState() {
          return this.currentState;
        };
        _proto.changeState = function changeState(newState) {
          if (!this.anim) return false;
          if (newState === this.currentState) return true;
          this.anim.crossFade(newState + '_' + ("" + PlayerSelectManager.instance.getPlayerId()), this.crossFadeTime);
          this.currentState = newState;
          return true;
        };
        return PlayerAnimationController;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d9fe7XKpHFGMrXEXBR3Khcx", "PlayerConfig", undefined);
      var PLAYERS = exports('PLAYERS', {
        1: {
          id: 1,
          name: '小白',
          spriteFramePath: 'images/players/player_1/spriteFrame'
        },
        2: {
          id: 2,
          name: '小绿',
          spriteFramePath: 'images/players/player_2/spriteFrame'
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerSelectItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, Label, Component, EventManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "2de882CfrtF1ZsQaQu26R2s", "PlayerSelectItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PlayerSelectItem = exports('PlayerSelectItem', (_dec = ccclass('PlayerSelectItem'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerSelectItem, _Component);
        function PlayerSelectItem() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = PlayerSelectItem.prototype;
        _proto.start = function start() {
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        _proto.onTouchEnd = function onTouchEnd() {
          var playerIDNode = this.node.getChildByName('ID');
          var playerIDText = playerIDNode.getComponent(Label).string;
          EventManager.instance.emit('SWITCH_PLAYER', Number(playerIDText));
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        return PlayerSelectItem;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerSelectManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "830b0YCQdVEiLOJ9WvF4ZlV", "PlayerSelectManager", undefined);
      var PlayerSelectManager = exports('PlayerSelectManager', /*#__PURE__*/function () {
        function PlayerSelectManager() {
          this.currentPlayerId = 1;
        }
        var _proto = PlayerSelectManager.prototype;
        _proto.setPlayerId = function setPlayerId(playerId) {
          this.currentPlayerId = playerId;
        };
        _proto.getPlayerId = function getPlayerId() {
          return this.currentPlayerId;
        };
        _createClass(PlayerSelectManager, null, [{
          key: "instance",
          get: function get() {
            if (!this._instance) this._instance = new PlayerSelectManager();
            return this._instance;
          }
        }]);
        return PlayerSelectManager;
      }());
      PlayerSelectManager._instance = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerSelectPanel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts', './PlayerConfig.ts', './EventManager.ts', './PlayerSelectManager.ts', './UIManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, UIOpacity, instantiate, Label, resources, SpriteFrame, Sprite, BaseUI, PLAYERS, EventManager, PlayerSelectManager, UIManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      UIOpacity = module.UIOpacity;
      instantiate = module.instantiate;
      Label = module.Label;
      resources = module.resources;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      PLAYERS = module.PLAYERS;
    }, function (module) {
      EventManager = module.EventManager;
    }, function (module) {
      PlayerSelectManager = module.PlayerSelectManager;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "0550fPTfiNBWZUB9qM0cKll", "PlayerSelectPanel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PlayerSelectPanel = exports('PlayerSelectPanel', (_dec = ccclass('PlayerSelectPanel'), _dec2 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(PlayerSelectPanel, _BaseUI);
        function PlayerSelectPanel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseUI.call.apply(_BaseUI, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "playerSelectPrefab", _descriptor, _assertThisInitialized(_this));
          _this.players = [];
          _this.currentPlayer = null;
          return _this;
        }
        var _proto = PlayerSelectPanel.prototype;
        _proto.start = function start() {
          EventManager.instance.on('SWITCH_PLAYER', this.onSwitchPlayer, this);
        };
        _proto.onSwitchPlayer = function onSwitchPlayer(playerID) {
          if (this.currentPlayer) {
            this.cancelSelect();
          }
          this.currentPlayer = this.players[playerID - 1];
          if (this.currentPlayer === undefined) return;
          var background = this.currentPlayer.getChildByName('Background');
          background.getComponent(UIOpacity).opacity = 128;
          PlayerSelectManager.instance.setPlayerId(playerID);
          console.log(PlayerSelectManager.instance.getPlayerId());
        };
        _proto.cancelSelect = function cancelSelect() {
          if (this.currentPlayer) {
            var background = this.currentPlayer.getChildByName('Background');
            background.getComponent(UIOpacity).opacity = 0;
            PlayerSelectManager.instance.setPlayerId(0);
            this.currentPlayer = null;
          }
        };
        _proto.onClosePanel = function onClosePanel() {
          UIManager.instance.close();
        };
        _proto.onOpen = function onOpen(param) {
          var _this2 = this;
          var playerList = Object.keys(PLAYERS);
          var _loop = function _loop() {
            // 根据预制体创造模板
            var playerSelectNode = instantiate(_this2.playerSelectPrefab);
            // 人物选择项
            playerSelectNode.setParent(_this2.node);
            var playerData = PLAYERS[Number(playerList[i])];
            var playerName = playerSelectNode.getChildByName('Name');
            playerName.getComponent(Label).string = playerData.name;
            var playerID = playerSelectNode.getChildByName('ID');
            playerID.getComponent(Label).string = playerData.id.toString();
            console.log("真实加载路径：", playerData.spriteFramePath);
            resources.load(playerData.spriteFramePath, SpriteFrame, function (err, spriteFrame) {
              if (err) {
                console.log('加载角色图片出错', err);
              } else {
                playerSelectNode.getChildByName('Image').getComponent(Sprite).spriteFrame = spriteFrame;
                _this2.players.push(playerSelectNode);
                _this2.onSwitchPlayer(PlayerSelectManager.instance.getPlayerId());
              }
            });
          };
          for (var i = 0; i < Object.keys(PLAYERS).length; i++) {
            _loop();
          }
        };
        _proto.onDestroy = function onDestroy() {
          EventManager.instance.off('SWITCH_PLAYER', this.onSwitchPlayer, this);
          this.players = [];
        };
        return PlayerSelectPanel;
      }(BaseUI), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerSelectPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerStateManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d1e56bZowBKq7xJEbZ1Kuio", "PlayerStateManager", undefined);
      var PlayerState = exports('PlayerState', /*#__PURE__*/function (PlayerState) {
        PlayerState[PlayerState["Shield"] = 0] = "Shield";
        return PlayerState;
      }({}));
      var PlayerStateManager = exports('PlayerStateManager', /*#__PURE__*/function () {
        function PlayerStateManager() {
          this.stateList = new Set();
        }
        var _proto = PlayerStateManager.prototype;
        _proto.setState = function setState(state) {
          this.stateList.add(state);
        };
        _proto.removeState = function removeState(state) {
          this.stateList["delete"](state);
        };
        _proto.findState = function findState(state) {
          return this.stateList.has(state);
        };
        _proto.getStateList = function getStateList() {
          return this.stateList;
        };
        _createClass(PlayerStateManager, null, [{
          key: "instance",
          get: function get() {
            if (!this._instance) this._instance = new PlayerStateManager();
            return this._instance;
          }
        }]);
        return PlayerStateManager;
      }());
      PlayerStateManager._instance = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PropConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "13375DvTVdKlaL2TAjCl2Ba", "PropConfig", undefined);
      var PROPS = exports('PROPS', {
        1: {
          id: 1,
          name: 'Shield',
          iconPath: 'images/props/shield/spriteFrame'
        },
        2: {
          id: 2,
          name: 'Rewind',
          iconPath: 'images/props/rewind/spriteFrame'
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PropManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "b62a3zZwLVNtpfUnmF7DbZ7", "PropManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PropManager = exports('PropManager', (_dec = ccclass('PropManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PropManager, _Component);
        function PropManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.propNumber = 0;
          _this.currentProps = new Map();
          _this.propList = [];
          return _this;
        }
        var _proto = PropManager.prototype;
        _proto.onLoad = function onLoad() {
          if (PropManager._instance) {
            this.destroy();
            return;
          }
          PropManager._instance = this;
          director.addPersistRootNode(this.node);
        };
        _proto.addCurrentProp = function addCurrentProp(prop) {
          if (!this.currentProps.has(prop)) {
            this.currentProps.set(prop, false);
            this.propList.push(prop);
            console.log('添加道具成功');
            this.propNumber++;
          }
        };
        _proto.setCurrentPropState = function setCurrentPropState(prop, isUse) {
          if (!this.currentProps.has(prop)) return;
          this.currentProps[prop] = isUse;
        };
        _proto.getPropUsingState = function getPropUsingState(prop) {
          if (!this.currentProps.has(prop)) return false;
          return this.currentProps[prop];
        };
        _proto.getAllCurrentProps = function getAllCurrentProps() {
          return this.currentProps;
        };
        _proto.getPropList = function getPropList() {
          return this.propList;
        };
        _proto.clearAllCurrentProps = function clearAllCurrentProps() {
          this.currentProps.clear();
          this.propList = [];
          this.propNumber = 0;
        };
        _proto.getPropNumber = function getPropNumber() {
          return this.propNumber;
        };
        _proto.onDestroy = function onDestroy() {
          this.currentProps = null;
          this.propList = [];
          if (PropManager._instance === this) PropManager._instance = null;
          director.removePersistRootNode(this.node);
        };
        _createClass(PropManager, null, [{
          key: "instance",
          get: function get() {
            return this._instance;
          }
        }]);
        return PropManager;
      }(Component), _class2._instance = null, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PropNumberManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Component, EventManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "bdbb8Ut5RZC/IldAvdwQ3q0", "PropNumberManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PropNumber = exports('PropNumber', {
        shield: 0,
        rewind: 0,
        clear: function clear() {
          PropNumber.rewind = 0;
          PropNumber.shield = 0;
        }
      });
      var PropNumberManager = exports('PropNumberManager', (_dec = ccclass('PropNumberManager'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PropNumberManager, _Component);
        function PropNumberManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          //护盾数量
          _initializerDefineProperty(_this, "shieldNumberLabel", _descriptor, _assertThisInitialized(_this));
          //回溯数量
          _initializerDefineProperty(_this, "rewindNumberLabel", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = PropNumberManager.prototype;
        _proto.start = function start() {
          EventManager.instance.on('UPDATE_REWIND_NUMBER', this.onUpddateRewindNumber, this);
        };
        _proto.onUpddateRewindNumber = function onUpddateRewindNumber(value) {
          PropNumber.rewind += value;
          var rewindNumber = this.rewindNumberLabel.getComponent(Label);
          rewindNumber.string = PropNumber.rewind.toString();
        };
        _proto.update = function update(deltaTime) {};
        _proto.clear = function clear() {
          PropNumber.rewind = PropNumber.shield = 0;
        };
        _proto.onDestroy = function onDestroy() {
          EventManager.instance.off('UPDATE_REWIND_NUMBER', this.onUpddateRewindNumber, this);
        };
        return PropNumberManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "shieldNumberLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rewindNumberLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PropSelectItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, Label, Component, EventManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "6b3e9huNV1Ob6hD9aHh8XHQ", "PropSelectItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PropSelectItem = exports('PropSelectItem', (_dec = ccclass('PropSelectItem'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PropSelectItem, _Component);
        function PropSelectItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.isSelect = false;
          return _this;
        }
        var _proto = PropSelectItem.prototype;
        _proto.start = function start() {
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        _proto.onTouchEnd = function onTouchEnd() {
          this.node.getChildByName('Background').active = !this.isSelect;
          EventManager.instance.emit('SELECT_PROP', this.node.getChildByName('Name').getComponent(Label).string, !this.isSelect);
          this.isSelect = !this.isSelect;
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        };
        return PropSelectItem;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PropSelectPanel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts', './PropConfig.ts', './GameManager.ts', './UIManager.ts', './PropManager.ts', './EventManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Prefab, director, instantiate, Label, resources, SpriteFrame, Sprite, BaseUI, PROPS, GameManager, GameState, UIManager, PropManager, EventManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      director = module.director;
      instantiate = module.instantiate;
      Label = module.Label;
      resources = module.resources;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      PROPS = module.PROPS;
    }, function (module) {
      GameManager = module.GameManager;
      GameState = module.GameState;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      PropManager = module.PropManager;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "55692Teos5Ae5WciFcv7m90", "PropSelectPanel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PropSelectPanel = exports('PropSelectPanel', (_dec = ccclass('PropSelectPanel'), _dec2 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseUI) {
        _inheritsLoose(PropSelectPanel, _BaseUI);
        function PropSelectPanel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseUI.call.apply(_BaseUI, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "propSelectItemPrefab", _descriptor, _assertThisInitialized(_this));
          _this.allProps = [];
          _this.selectedProps = null;
          return _this;
        }
        var _proto = PropSelectPanel.prototype;
        _proto.onOpen = function onOpen(param) {
          var _this2 = this;
          this.selectedProps = new Set();
          var propList = Object.keys(PROPS);
          var _loop = function _loop() {
            var propSelectItem = instantiate(_this2.propSelectItemPrefab);
            propSelectItem.setParent(_this2.node.getChildByName('Layout'));
            var propData = PROPS[Number(propList[i])];
            propSelectItem.getChildByName('Name').getComponent(Label).string = propData.name;
            resources.load(propData.iconPath, SpriteFrame, function (err, spriteFrame) {
              if (err) {
                console.error('加载道具图片失败', err);
              } else {
                propSelectItem.getChildByName('Image').getComponent(Sprite).spriteFrame = spriteFrame;
                _this2.allProps.push(propSelectItem);
              }
            });
          };
          for (var i = 0; i < propList.length; i++) {
            _loop();
          }
          EventManager.instance.on('SELECT_PROP', this.onSelect, this);
        };
        _proto.onClose = function onClose() {
          this.allProps = [];
          this.selectedProps = null;
          EventManager.instance.off('SELECT_PROP', this.onSelect, this);
        };
        _proto.onSelect = function onSelect(propName, isSelect) {
          if (isSelect) {
            this.selectedProps.add(propName);
          } else {
            this.selectedProps["delete"](propName);
          }
        };
        _proto.onStartGame = function onStartGame() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.selectedProps), _step; !(_step = _iterator()).done;) {
            var prop = _step.value;
            PropManager.instance.addCurrentProp(prop);
          }
          UIManager.instance.closeAll();
          UIManager.instance.open(UIManager.instance.loadingPanel, true);
          GameManager.instance.switchGameState(GameState.RUN);
          director.loadScene('GameScene');
        };
        _proto.onClickBack = function onClickBack() {
          UIManager.instance.close();
        };
        return PropSelectPanel;
      }(BaseUI), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "propSelectItemPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RepeatedlyJump.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './JumpAbility.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, JumpAbility;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      JumpAbility = module.JumpAbility;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "4f0fdXhxHxD7ZsEhUgUXHnv", "RepeatedlyJump", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RepeatedlyJump = exports('RepeatedlyJump', (_dec = ccclass('RepeatedlyJump'), _dec(_class = (_class2 = /*#__PURE__*/function (_JumpAbility) {
        _inheritsLoose(RepeatedlyJump, _JumpAbility);
        function RepeatedlyJump() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _JumpAbility.call.apply(_JumpAbility, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "repeatedJumpCount", _descriptor, _assertThisInitialized(_this));
          _this.isFirstFall = false;
          _this.hasRepeatedJumpCount = _this.repeatedJumpCount;
          return _this;
        }
        var _proto = RepeatedlyJump.prototype;
        _proto.updateTimer = function updateTimer(dt) {
          if (this.player.getIsGround() || this.hasRepeatedJumpCount > 0) {
            this.coyoteTimer = this.coyoteTime;
          } else {
            this.coyoteTimer -= dt;
          }
          this.jumpBufferTimer -= dt;
          if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0) {
            this.hasRepeatedJumpCount--;
          }
          if (this.player.getIsGround()) this.hasRepeatedJumpCount = this.repeatedJumpCount;
        };
        return RepeatedlyJump;
      }(JumpAbility), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "repeatedJumpCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResourceLoadUtil.ts", ['cc'], function (exports) {
  var cclegacy, resources;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
    }],
    execute: function () {
      exports('LoadResource', LoadResource);
      cclegacy._RF.push({}, "fead3mtcWRCG6RfgNYVsn8p", "ResourceLoadUtil", undefined);
      function LoadResource(path, type) {
        return new Promise(function (resolve, reject) {
          resources.load(path, type, function (err, asset) {
            if (err) {
              reject(err);
            } else {
              resolve(asset);
            }
          });
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Rewind.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventManager.ts', './ColliderTagManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, BoxCollider2D, Contact2DType, Component, EventManager, ColliderTagType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      BoxCollider2D = module.BoxCollider2D;
      Contact2DType = module.Contact2DType;
      Component = module.Component;
    }, function (module) {
      EventManager = module.EventManager;
    }, function (module) {
      ColliderTagType = module.ColliderTagType;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ca7a7vsGR5IpYPNTyDocg7d", "Rewind", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Rewind = exports('Rewind', (_dec = ccclass('Rewind'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Rewind, _Component);
        function Rewind() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.collider = null;
          return _this;
        }
        var _proto = Rewind.prototype;
        _proto.start = function start() {
          this.collider = this.node.getComponent(BoxCollider2D);
          if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          }
        };
        _proto.onBeginContact = function onBeginContact(self, other) {
          // 2代表玩家
          if (other.tag === ColliderTagType.Player) {
            EventManager.instance.emit('UPDATE_REWIND_NUMBER', 1);
            this.node.destroy();
          }
        };
        _proto.update = function update(deltaTime) {};
        _proto.onDestroy = function onDestroy() {
          this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        };
        return Rewind;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewindData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, Vec3, Vec2;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Vec2 = module.Vec2;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e97f5D4dbNHJLfaqQkmBYU2", "RewindData", undefined);
      var RecordItem = exports('RecordItem', function RecordItem() {
        this.pos = new Vec3();
        this.linearVelocity = new Vec2();
      });
      var PlayerRecordItem = exports('PlayerRecordItem', /*#__PURE__*/function (_RecordItem) {
        _inheritsLoose(PlayerRecordItem, _RecordItem);
        function PlayerRecordItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _RecordItem.call.apply(_RecordItem, [this].concat(args)) || this;
          _this.hasShield = false;
          return _this;
        }
        return PlayerRecordItem;
      }(RecordItem));
      var RecordBuffer = exports('RecordBuffer', /*#__PURE__*/function () {
        // maxSeconds:回溯总时长；recordInterval:记录频率
        function RecordBuffer(maxSeconds, recordInterval) {
          this.records = [];
          this.maxLength = 60;
          this.maxLength = Math.ceil(maxSeconds / recordInterval);
        }

        // 添加一条新纪录
        var _proto = RecordBuffer.prototype;
        _proto.push = function push(record) {
          this.records.push(record);
          if (this.records.length > this.maxLength) {
            this.records.shift();
          }
        }

        // 取出最后一条记录
        ;

        _proto.pop = function pop() {
          return this.records.pop() || null;
        };
        _proto.clear = function clear() {
          this.records = [];
        };
        return RecordBuffer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewindProp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PropManager.ts', './GameManager.ts', './EventManager.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Component, resources, Prefab, instantiate, Button, PropManager, GameManager, GameState, EventManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
      resources = module.resources;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Button = module.Button;
    }, function (module) {
      PropManager = module.PropManager;
    }, function (module) {
      GameManager = module.GameManager;
      GameState = module.GameState;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "12ce5EQG49HwLEPPUOFnz0R", "RewindProp", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RewindProp = exports('RewindProp', (_dec = ccclass('RewindProp'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RewindProp, _Component);
        function RewindProp() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.isUse = false;
          _this.number = 0;
          _this.iconNode = null;
          return _this;
        }
        var _proto = RewindProp.prototype;
        _proto.onInit = /*#__PURE__*/function () {
          var _onInit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(iconPath) {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  PropManager.instance.addCurrentProp('Rewind');
                  resources.load(iconPath, Prefab, function (err, prefab) {
                    if (err) {
                      console.error('加载道具图标失败', err);
                    } else {
                      _this2.iconNode = instantiate(prefab);
                      _this2.iconNode.setParent(_this2.node.getChildByName('PropContainer'));
                      _this2.iconNode.on(Button.EventType.CLICK, _this2.onUse, _this2);
                      EventManager.instance.on('UPDATE_REWIND_NUMBER', _this2.onUpdateRewindNumber, _this2);
                      EventManager.instance.on('STOP_REWIND', _this2.onEnd, _this2);
                    }
                  });
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function onInit(_x) {
            return _onInit.apply(this, arguments);
          }
          return onInit;
        }();
        _proto.onUpdateRewindNumber = function onUpdateRewindNumber(value) {
          this.number += value;
          this.iconNode.getChildByName('RewindNumber').getComponent(Label).string = this.number.toString();
        };
        _proto.onUse = function onUse() {
          if (this.number <= 0) {
            this.number = 0;
            return;
          }
          if (this.isUse) return;
          this.isUse = true;
          this.onUpdateRewindNumber(-1);
          GameManager.instance.switchGameState(GameState.REWIND);
        };
        _proto.onEnd = function onEnd() {
          this.isUse = false;
        };
        _proto.onDestroy = function onDestroy() {
          EventManager.instance.off('UPDATE_REWIND_NUMBER', this.onUpdateRewindNumber, this);
          EventManager.instance.off('STOP_REWIND', this.onEnd, this);
        };
        return RewindProp;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewindSystem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RewindData.ts', './GameManager.ts', './EventManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, RigidBody2D, PhysicsSystem2D, Component, RecordBuffer, RecordItem, GameManager, GameState, EventManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RigidBody2D = module.RigidBody2D;
      PhysicsSystem2D = module.PhysicsSystem2D;
      Component = module.Component;
    }, function (module) {
      RecordBuffer = module.RecordBuffer;
      RecordItem = module.RecordItem;
    }, function (module) {
      GameManager = module.GameManager;
      GameState = module.GameState;
    }, function (module) {
      EventManager = module.EventManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "10107Nz2KNInq+IzQ9C55P9", "RewindSystem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RewindSystem = exports('RewindSystem', (_dec = ccclass('RewindSystem'), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RewindSystem, _Component);
        function RewindSystem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          //记录频率
          _initializerDefineProperty(_this, "recordInterval", _descriptor, _assertThisInitialized(_this));
          //回退时长
          _initializerDefineProperty(_this, "rewindDuration", _descriptor2, _assertThisInitialized(_this));
          //记录
          // protected records: RecordItem[] = [];
          //刚体组件
          _this.rigidBody = null;
          _this.recordBuffer = null;
          //是否正在回溯
          _this.isRewinding = false;
          _this.timer = 0;
          return _this;
        }
        var _proto = RewindSystem.prototype;
        _proto.start = function start() {
          this.rigidBody = this.node.getComponent(RigidBody2D);
          this.recordBuffer = new RecordBuffer(this.rewindDuration, this.recordInterval);
        };
        _proto.update = function update(deltaTime) {
          this.isRewinding = GameManager.instance.getCurrentGameState() === GameState.REWIND;
          //回溯
          if (this.isRewinding) {
            this.rewind();
            return;
          }

          //存档
          this.timer += deltaTime;
          if (this.timer >= this.recordInterval) {
            this.saveRecord();
            this.timer = 0;
          }
        }

        //回溯
        ;

        _proto.rewind = function rewind() {
          var lastRecord = this.recordBuffer.pop();
          if (!lastRecord) {
            this.stopRewind();
            EventManager.instance.emit('STOP_REWIND');
            return;
          }

          //恢复状态
          this.node.setPosition(lastRecord.pos);
          if (this.rigidBody) {
            this.rigidBody.linearVelocity = lastRecord.linearVelocity;
          }
        }

        //存档
        ;

        _proto.saveRecord = function saveRecord() {
          //存储状态
          if (!this.rigidBody) return;
          var record = new RecordItem();
          //保存位置
          record.pos.set(this.node.position);
          //保存速度
          record.linearVelocity.set(this.rigidBody.linearVelocity);
          this.recordBuffer.push(record);
        };
        _proto.stopRewind = function stopRewind() {
          if (GameManager.instance.getCurrentGameState() !== GameState.REWIND) return;
          GameManager.instance.switchGameState(GameState.PAUSE);
          this.scheduleOnce(function () {
            GameManager.instance.switchGameState(GameState.RUN);
            PhysicsSystem2D.instance.enable = true;
            EventManager.instance.emit('PLAY_MUSIC');
          }, 1);
        };
        _createClass(RewindSystem, null, [{
          key: "instance",
          get: function get() {
            return this._instance;
          }
        }]);
        return RewindSystem;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "recordInterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.05;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rewindDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScoreFloating.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Vec3, UIOpacity, tween, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Vec3 = module.Vec3;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "8400eO479FB3L/OXQnH2Bfm", "ScoreFloating", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ScoreFloating = exports('ScoreFloating', (_dec = ccclass('ScoreFloating'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScoreFloating, _Component);
        function ScoreFloating() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ScoreFloating.prototype;
        _proto.start = function start() {};
        _proto.play = function play(value, startPos) {
          var _this2 = this;
          console.log('ScoreFloating.play函数调用');
          this.label.string = "+" + value;
          this.node.setPosition(startPos);
          this.node.setScale(new Vec3(1, 1, 1));
          this.node.getComponent(UIOpacity).opacity = 255;
          tween(this.node).parallel(tween(this.node).to(0.8, {
            position: new Vec3(startPos.x, startPos.y + 80, startPos.z),
            scale: new Vec3(1.5, 1.5, 1)
          }), tween(this.node.getComponent(UIOpacity)).to(0.8, {
            opacity: 0
          })).call(function () {
            _this2.node.destroy();
          }).start();
        };
        _proto.update = function update(deltaTime) {};
        return ScoreFloating;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScoreManager.ts", ['cc'], function (exports) {
  var cclegacy, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b39f3f3QzBDLImDQZcLd/wz", "ScoreManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Score = exports('Score', {
        value: 0
      });

      // @ccclass('ScoreManager')
      // export class ScoreManager extends Component {

      //     @property(Label)
      //     private scoreLabel: Label = null;

      //     // private score: number = 0;

      //     start() {
      //         this.updateScore();
      //     }

      //     public addScore(value: number) {
      //         Score.value += value;
      //         this.updateScore();
      //     }

      //     private updateScore() {
      //         this.scoreLabel.string = Score.value.toString();
      //         this.scoreLabel.node.setScale(new Vec3(1, 1, 1));
      //         tween(this.scoreLabel.node)
      //             .to(0.1, {scale: new Vec3(1.3, 1.3, 1)})
      //             .to(0.1, {scale: new Vec3(1, 1, 1)})
      //             .start();
      //     }
      // }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Shield.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventManager.ts', './ColliderTagManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, BoxCollider2D, Contact2DType, Component, EventManager, ColliderTagType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      BoxCollider2D = module.BoxCollider2D;
      Contact2DType = module.Contact2DType;
      Component = module.Component;
    }, function (module) {
      EventManager = module.EventManager;
    }, function (module) {
      ColliderTagType = module.ColliderTagType;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "8d848eHhN9NMZ1bX2MzT/VI", "Shield", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Shield = exports('Shield', (_dec = ccclass('Shield'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Shield, _Component);
        function Shield() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.collider = null;
          return _this;
        }
        var _proto = Shield.prototype;
        _proto.start = function start() {
          this.collider = this.node.getComponent(BoxCollider2D);
          if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          }
        };
        _proto.onBeginContact = function onBeginContact(self, other) {
          // 2代表玩家
          if (other.tag === ColliderTagType.Player) {
            console.log('获得道具');
            EventManager.instance.emit('UPDATE_SHIELD_NUMBER', 1);
            this.node.destroy();
          }
        };
        _proto.update = function update(deltaTime) {};
        _proto.onDestroy = function onDestroy() {
          this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        };
        return Shield;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShieldProp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PropManager.ts', './EventManager.ts', './PlayerSelectManager.ts', './PlayerStateManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, resources, Prefab, instantiate, Button, Label, Component, PropManager, EventManager, PlayerSelectManager, PlayerStateManager, PlayerState;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Button = module.Button;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      PropManager = module.PropManager;
    }, function (module) {
      EventManager = module.EventManager;
    }, function (module) {
      PlayerSelectManager = module.PlayerSelectManager;
    }, function (module) {
      PlayerStateManager = module.PlayerStateManager;
      PlayerState = module.PlayerState;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "98c88h3rkVAmpA8yRMFvZ9r", "ShieldProp", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ShieldProp = exports('ShieldProp', (_dec = ccclass('ShieldProp'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShieldProp, _Component);
        function ShieldProp() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.number = 0;
          _this.isUse = false;
          _this.iconPrefab = null;
          _this.iconNode = null;
          _this.imagePrefab = null;
          _this.player = null;
          return _this;
        }
        var _proto = ShieldProp.prototype;
        _proto.onInit = function onInit(iconPath, imagePath) {
          var _this2 = this;
          resources.load(iconPath, Prefab, function (err, prefab) {
            if (err) {
              console.error('加载护盾图标失败', err);
            } else {
              _this2.iconPrefab = prefab;
              _this2.iconNode = instantiate(_this2.iconPrefab);
              _this2.iconNode.setParent(_this2.node.getChildByName('PropContainer'));
              _this2.iconNode.on(Button.EventType.CLICK, _this2.onUse, _this2);
              EventManager.instance.on('UPDATE_SHIELD_NUMBER', _this2.onUpdateShiledNumber, _this2);
              EventManager.instance.on('LOSE_SHIELD', _this2.onEnd, _this2);
            }
          });
          resources.load(imagePath, Prefab, function (err, prefab) {
            if (err) {
              console.error('加载护盾图片失败', err);
            } else {
              _this2.imagePrefab = prefab;
              _this2.player = _this2.node.getChildByName("Player_" + PlayerSelectManager.instance.getPlayerId());
              console.log(_this2.player);
              var imageNode = instantiate(_this2.imagePrefab);
              imageNode.active = false;
              imageNode.name = 'Shield';
              _this2.player.addChild(imageNode);
            }
          });
        };
        _proto.onUpdateShiledNumber = function onUpdateShiledNumber(value) {
          this.number += value;
          this.iconNode.getChildByName('ShieldNumber').getComponent(Label).string = this.number.toString();
        };
        _proto.onUse = function onUse() {
          if (this.number <= 0) {
            this.number = 0;
            return;
          }
          if (this.isUse) return;
          PropManager.instance.setCurrentPropState('Shield', true);
          PlayerStateManager.instance.setState(PlayerState.Shield);
          console.log(PropManager.instance.getPropUsingState('Shield'));
          this.player.getChildByName('Shield').active = true;
          this.isUse = true;
          this.onUpdateShiledNumber(-1);
        };
        _proto.onEnd = function onEnd() {
          PropManager.instance.setCurrentPropState('Shield', false);
          PlayerStateManager.instance.removeState(PlayerState.Shield);
          this.player.getChildByName('Shield').active = false;
          this.isUse = false;
        };
        _proto.onDestroy = function onDestroy() {
          EventManager.instance.off('UPDATE_SHIELD_NUMBER', this.onUpdateShiledNumber, this);
          EventManager.instance.off('LOSE_SHIELD', this.onEnd, this);
          if (this.iconNode && this.iconNode.isValid) this.iconNode.off(Button.EventType.CLICK, this.onUse, this);
        };
        return ShieldProp;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/socket.io.min.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);
      var _cjsExports;
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE

        /*!
         * Socket.IO v4.7.2
         * (c) 2014-2023 Guillermo Rauch
         * Released under the MIT License.
         */
        !function (t, e) {
          "object" == typeof exports$1 && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).io = e();
        }(this, function () {
          function t(e) {
            return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
              return typeof t;
            } : function (t) {
              return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            }, t(e);
          }
          function e(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
          }
          function n(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, (i = r.key, o = void 0, "symbol" == typeof (o = function (t, e) {
                if ("object" != typeof t || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != typeof r) return r;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === e ? String : Number)(t);
              }(i, "string")) ? o : String(o)), r);
            }
            var i, o;
          }
          function r(t, e, r) {
            return e && n(t.prototype, e), r && n(t, r), Object.defineProperty(t, "prototype", {
              writable: !1
            }), t;
          }
          function i() {
            return i = Object.assign ? Object.assign.bind() : function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            }, i.apply(this, arguments);
          }
          function o(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: t,
                writable: !0,
                configurable: !0
              }
            }), Object.defineProperty(t, "prototype", {
              writable: !1
            }), e && a(t, e);
          }
          function s(t) {
            return s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            }, s(t);
          }
          function a(t, e) {
            return a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
              return t.__proto__ = e, t;
            }, a(t, e);
          }
          function u() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
            } catch (t) {
              return !1;
            }
          }
          function c(t, e, n) {
            return c = u() ? Reflect.construct.bind() : function (t, e, n) {
              var r = [null];
              r.push.apply(r, e);
              var i = new (Function.bind.apply(t, r))();
              return n && a(i, n.prototype), i;
            }, c.apply(null, arguments);
          }
          function h(t) {
            var e = "function" == typeof Map ? new Map() : void 0;
            return h = function h(t) {
              if (null === t || (n = t, -1 === Function.toString.call(n).indexOf("[native code]"))) return t;
              var n;
              if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
              if (void 0 !== e) {
                if (e.has(t)) return e.get(t);
                e.set(t, r);
              }
              function r() {
                return c(t, arguments, s(this).constructor);
              }
              return r.prototype = Object.create(t.prototype, {
                constructor: {
                  value: r,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0
                }
              }), a(r, t);
            }, h(t);
          }
          function f(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }
          function l(t) {
            var e = u();
            return function () {
              var n,
                r = s(t);
              if (e) {
                var i = s(this).constructor;
                n = Reflect.construct(r, arguments, i);
              } else n = r.apply(this, arguments);
              return function (t, e) {
                if (e && ("object" == typeof e || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                return f(t);
              }(this, n);
            };
          }
          function p() {
            return p = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
              var r = function (t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = s(t)););
                return t;
              }(t, e);
              if (r) {
                var i = Object.getOwnPropertyDescriptor(r, e);
                return i.get ? i.get.call(arguments.length < 3 ? t : n) : i.value;
              }
            }, p.apply(this, arguments);
          }
          function d(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
          }
          function y(t, e) {
            var _n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!_n) {
              if (Array.isArray(t) || (_n = function (t, e) {
                if (t) {
                  if ("string" == typeof t) return d(t, e);
                  var n = Object.prototype.toString.call(t).slice(8, -1);
                  return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? d(t, e) : void 0;
                }
              }(t)) || e && t && "number" == typeof t.length) {
                _n && (t = _n);
                var r = 0,
                  i = function i() {};
                return {
                  s: i,
                  n: function n() {
                    return r >= t.length ? {
                      done: !0
                    } : {
                      done: !1,
                      value: t[r++]
                    };
                  },
                  e: function e(t) {
                    throw t;
                  },
                  f: i
                };
              }
              throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var o,
              s = !0,
              a = !1;
            return {
              s: function s() {
                _n = _n.call(t);
              },
              n: function n() {
                var t = _n.next();
                return s = t.done, t;
              },
              e: function e(t) {
                a = !0, o = t;
              },
              f: function f() {
                try {
                  s || null == _n["return"] || _n["return"]();
                } finally {
                  if (a) throw o;
                }
              }
            };
          }
          var v = Object.create(null);
          v.open = "0", v.close = "1", v.ping = "2", v.pong = "3", v.message = "4", v.upgrade = "5", v.noop = "6";
          var g = Object.create(null);
          Object.keys(v).forEach(function (t) {
            g[v[t]] = t;
          });
          var m,
            b = {
              type: "error",
              data: "parser error"
            },
            k = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob),
            w = "function" == typeof ArrayBuffer,
            _ = function _(t) {
              return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer;
            },
            A = function A(t, e, n) {
              var r = t.type,
                i = t.data;
              return k && i instanceof Blob ? e ? n(i) : O(i, n) : w && (i instanceof ArrayBuffer || _(i)) ? e ? n(i) : O(new Blob([i]), n) : n(v[r] + (i || ""));
            },
            O = function O(t, e) {
              var n = new FileReader();
              return n.onload = function () {
                var t = n.result.split(",")[1];
                e("b" + (t || ""));
              }, n.readAsDataURL(t);
            };
          function E(t) {
            return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
          }
          for (var T = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", R = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), C = 0; C < 64; C++) R[T.charCodeAt(C)] = C;
          var B,
            S = "function" == typeof ArrayBuffer,
            N = function N(t, e) {
              if ("string" != typeof t) return {
                type: "message",
                data: x(t, e)
              };
              var n = t.charAt(0);
              return "b" === n ? {
                type: "message",
                data: L(t.substring(1), e)
              } : g[n] ? t.length > 1 ? {
                type: g[n],
                data: t.substring(1)
              } : {
                type: g[n]
              } : b;
            },
            L = function L(t, e) {
              if (S) {
                var n = function (t) {
                  var e,
                    n,
                    r,
                    i,
                    o,
                    s = 0.75 * t.length,
                    a = t.length,
                    u = 0;
                  "=" === t[t.length - 1] && (s--, "=" === t[t.length - 2] && s--);
                  var c = new ArrayBuffer(s),
                    h = new Uint8Array(c);
                  for (e = 0; e < a; e += 4) n = R[t.charCodeAt(e)], r = R[t.charCodeAt(e + 1)], i = R[t.charCodeAt(e + 2)], o = R[t.charCodeAt(e + 3)], h[u++] = n << 2 | r >> 4, h[u++] = (15 & r) << 4 | i >> 2, h[u++] = (3 & i) << 6 | 63 & o;
                  return c;
                }(t);
                return x(n, e);
              }
              return {
                base64: !0,
                data: t
              };
            },
            x = function x(t, e) {
              return "blob" === e ? t instanceof Blob ? t : new Blob([t]) : t instanceof ArrayBuffer ? t : t.buffer;
            },
            P = String.fromCharCode(30);
          function q() {
            return new TransformStream({
              transform: function transform(t, e) {
                !function (t, e) {
                  k && t.data instanceof Blob ? t.data.arrayBuffer().then(E).then(e) : w && (t.data instanceof ArrayBuffer || _(t.data)) ? e(E(t.data)) : A(t, !1, function (t) {
                    m || (m = new TextEncoder()), e(m.encode(t));
                  });
                }(t, function (n) {
                  var r,
                    i = n.length;
                  if (i < 126) r = new Uint8Array(1), new DataView(r.buffer).setUint8(0, i);else if (i < 65536) {
                    r = new Uint8Array(3);
                    var o = new DataView(r.buffer);
                    o.setUint8(0, 126), o.setUint16(1, i);
                  } else {
                    r = new Uint8Array(9);
                    var s = new DataView(r.buffer);
                    s.setUint8(0, 127), s.setBigUint64(1, BigInt(i));
                  }
                  t.data && "string" != typeof t.data && (r[0] |= 128), e.enqueue(r), e.enqueue(n);
                });
              }
            });
          }
          function j(t) {
            return t.reduce(function (t, e) {
              return t + e.length;
            }, 0);
          }
          function D(t, e) {
            if (t[0].length === e) return t.shift();
            for (var n = new Uint8Array(e), r = 0, i = 0; i < e; i++) n[i] = t[0][r++], r === t[0].length && (t.shift(), r = 0);
            return t.length && r < t[0].length && (t[0] = t[0].slice(r)), n;
          }
          function U(t) {
            if (t) return function (t) {
              for (var e in U.prototype) t[e] = U.prototype[e];
              return t;
            }(t);
          }
          U.prototype.on = U.prototype.addEventListener = function (t, e) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
          }, U.prototype.once = function (t, e) {
            function n() {
              this.off(t, n), e.apply(this, arguments);
            }
            return n.fn = e, this.on(t, n), this;
          }, U.prototype.off = U.prototype.removeListener = U.prototype.removeAllListeners = U.prototype.removeEventListener = function (t, e) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
            var n,
              r = this._callbacks["$" + t];
            if (!r) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + t], this;
            for (var i = 0; i < r.length; i++) if ((n = r[i]) === e || n.fn === e) {
              r.splice(i, 1);
              break;
            }
            return 0 === r.length && delete this._callbacks["$" + t], this;
          }, U.prototype.emit = function (t) {
            this._callbacks = this._callbacks || {};
            for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
            if (n) {
              r = 0;
              for (var i = (n = n.slice(0)).length; r < i; ++r) n[r].apply(this, e);
            }
            return this;
          }, U.prototype.emitReserved = U.prototype.emit, U.prototype.listeners = function (t) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
          }, U.prototype.hasListeners = function (t) {
            return !!this.listeners(t).length;
          };
          var I = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")();
          function F(t) {
            for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
            return n.reduce(function (e, n) {
              return t.hasOwnProperty(n) && (e[n] = t[n]), e;
            }, {});
          }
          var M = I.setTimeout,
            V = I.clearTimeout;
          function H(t, e) {
            e.useNativeTimers ? (t.setTimeoutFn = M.bind(I), t.clearTimeoutFn = V.bind(I)) : (t.setTimeoutFn = I.setTimeout.bind(I), t.clearTimeoutFn = I.clearTimeout.bind(I));
          }
          var K,
            Y = function (t) {
              o(i, t);
              var n = l(i);
              function i(t, r, o) {
                var s;
                return e(this, i), (s = n.call(this, t)).description = r, s.context = o, s.type = "TransportError", s;
              }
              return r(i);
            }(h(Error)),
            W = function (t) {
              o(i, t);
              var n = l(i);
              function i(t) {
                var r;
                return e(this, i), (r = n.call(this)).writable = !1, H(f(r), t), r.opts = t, r.query = t.query, r.socket = t.socket, r;
              }
              return r(i, [{
                key: "onError",
                value: function value(t, e, n) {
                  return p(s(i.prototype), "emitReserved", this).call(this, "error", new Y(t, e, n)), this;
                }
              }, {
                key: "open",
                value: function value() {
                  return this.readyState = "opening", this.doOpen(), this;
                }
              }, {
                key: "close",
                value: function value() {
                  return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this;
                }
              }, {
                key: "send",
                value: function value(t) {
                  "open" === this.readyState && this.write(t);
                }
              }, {
                key: "onOpen",
                value: function value() {
                  this.readyState = "open", this.writable = !0, p(s(i.prototype), "emitReserved", this).call(this, "open");
                }
              }, {
                key: "onData",
                value: function value(t) {
                  var e = N(t, this.socket.binaryType);
                  this.onPacket(e);
                }
              }, {
                key: "onPacket",
                value: function value(t) {
                  p(s(i.prototype), "emitReserved", this).call(this, "packet", t);
                }
              }, {
                key: "onClose",
                value: function value(t) {
                  this.readyState = "closed", p(s(i.prototype), "emitReserved", this).call(this, "close", t);
                }
              }, {
                key: "pause",
                value: function value(t) {}
              }, {
                key: "createUri",
                value: function value(t) {
                  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                  return t + "://" + this._hostname() + this._port() + this.opts.path + this._query(e);
                }
              }, {
                key: "_hostname",
                value: function value() {
                  var t = this.opts.hostname;
                  return -1 === t.indexOf(":") ? t : "[" + t + "]";
                }
              }, {
                key: "_port",
                value: function value() {
                  return this.opts.port && (this.opts.secure && Number(443 !== this.opts.port) || !this.opts.secure && 80 !== Number(this.opts.port)) ? ":" + this.opts.port : "";
                }
              }, {
                key: "_query",
                value: function value(t) {
                  var e = function (t) {
                    var e = "";
                    for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                    return e;
                  }(t);
                  return e.length ? "?" + e : "";
                }
              }]), i;
            }(U),
            z = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
            J = 64,
            Q = 0;
          function G(t) {
            var e = "";
            do {
              e = z[t % J] + e, t = Math.floor(t / J);
            } while (t > 0);
            return e;
          }
          function Z() {
            var t = G(+new Date());
            return t !== K ? (Q = 0, K = t) : t + "." + G(Q++);
          }
          var tt = !1;
          try {
            tt = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest();
          } catch (t) {}
          var et = tt;
          function nt(t) {
            var e = t.xdomain;
            try {
              if ("undefined" != typeof XMLHttpRequest && (!e || et)) return new XMLHttpRequest();
            } catch (t) {}
            if (!e) try {
              return new I[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
            } catch (t) {}
          }
          function rt() {}
          var it = null != new nt({
              xdomain: !1
            }).responseType,
            ot = function (t) {
              o(s, t);
              var n = l(s);
              function s(t) {
                var r;
                if (e(this, s), (r = n.call(this, t)).polling = !1, "undefined" != typeof location) {
                  var i = "https:" === location.protocol,
                    o = location.port;
                  o || (o = i ? "443" : "80"), r.xd = "undefined" != typeof location && t.hostname !== location.hostname || o !== t.port;
                }
                var a = t && t.forceBase64;
                return r.supportsBinary = it && !a, r.opts.withCredentials && (r.cookieJar = void 0), r;
              }
              return r(s, [{
                key: "name",
                get: function get() {
                  return "polling";
                }
              }, {
                key: "doOpen",
                value: function value() {
                  this.poll();
                }
              }, {
                key: "pause",
                value: function value(t) {
                  var e = this;
                  this.readyState = "pausing";
                  var n = function n() {
                    e.readyState = "paused", t();
                  };
                  if (this.polling || !this.writable) {
                    var r = 0;
                    this.polling && (r++, this.once("pollComplete", function () {
                      --r || n();
                    })), this.writable || (r++, this.once("drain", function () {
                      --r || n();
                    }));
                  } else n();
                }
              }, {
                key: "poll",
                value: function value() {
                  this.polling = !0, this.doPoll(), this.emitReserved("poll");
                }
              }, {
                key: "onData",
                value: function value(t) {
                  var e = this;
                  (function (t, e) {
                    for (var n = t.split(P), r = [], i = 0; i < n.length; i++) {
                      var o = N(n[i], e);
                      if (r.push(o), "error" === o.type) break;
                    }
                    return r;
                  })(t, this.socket.binaryType).forEach(function (t) {
                    if ("opening" === e.readyState && "open" === t.type && e.onOpen(), "close" === t.type) return e.onClose({
                      description: "transport closed by the server"
                    }), !1;
                    e.onPacket(t);
                  }), "closed" !== this.readyState && (this.polling = !1, this.emitReserved("pollComplete"), "open" === this.readyState && this.poll());
                }
              }, {
                key: "doClose",
                value: function value() {
                  var t = this,
                    e = function e() {
                      t.write([{
                        type: "close"
                      }]);
                    };
                  "open" === this.readyState ? e() : this.once("open", e);
                }
              }, {
                key: "write",
                value: function value(t) {
                  var e = this;
                  this.writable = !1, function (t, e) {
                    var n = t.length,
                      r = new Array(n),
                      i = 0;
                    t.forEach(function (t, o) {
                      A(t, !1, function (t) {
                        r[o] = t, ++i === n && e(r.join(P));
                      });
                    });
                  }(t, function (t) {
                    e.doWrite(t, function () {
                      e.writable = !0, e.emitReserved("drain");
                    });
                  });
                }
              }, {
                key: "uri",
                value: function value() {
                  var t = this.opts.secure ? "https" : "http",
                    e = this.query || {};
                  return !1 !== this.opts.timestampRequests && (e[this.opts.timestampParam] = Z()), this.supportsBinary || e.sid || (e.b64 = 1), this.createUri(t, e);
                }
              }, {
                key: "request",
                value: function value() {
                  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                  return i(t, {
                    xd: this.xd,
                    cookieJar: this.cookieJar
                  }, this.opts), new st(this.uri(), t);
                }
              }, {
                key: "doWrite",
                value: function value(t, e) {
                  var n = this,
                    r = this.request({
                      method: "POST",
                      data: t
                    });
                  r.on("success", e), r.on("error", function (t, e) {
                    n.onError("xhr post error", t, e);
                  });
                }
              }, {
                key: "doPoll",
                value: function value() {
                  var t = this,
                    e = this.request();
                  e.on("data", this.onData.bind(this)), e.on("error", function (e, n) {
                    t.onError("xhr poll error", e, n);
                  }), this.pollXhr = e;
                }
              }]), s;
            }(W),
            st = function (t) {
              o(i, t);
              var n = l(i);
              function i(t, r) {
                var o;
                return e(this, i), H(f(o = n.call(this)), r), o.opts = r, o.method = r.method || "GET", o.uri = t, o.data = void 0 !== r.data ? r.data : null, o.create(), o;
              }
              return r(i, [{
                key: "create",
                value: function value() {
                  var t,
                    e = this,
                    n = F(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
                  n.xdomain = !!this.opts.xd;
                  var r = this.xhr = new nt(n);
                  try {
                    r.open(this.method, this.uri, !0);
                    try {
                      if (this.opts.extraHeaders) for (var o in r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0), this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(o) && r.setRequestHeader(o, this.opts.extraHeaders[o]);
                    } catch (t) {}
                    if ("POST" === this.method) try {
                      r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                    } catch (t) {}
                    try {
                      r.setRequestHeader("Accept", "*/*");
                    } catch (t) {}
                    null === (t = this.opts.cookieJar) || void 0 === t || t.addCookies(r), "withCredentials" in r && (r.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (r.timeout = this.opts.requestTimeout), r.onreadystatechange = function () {
                      var t;
                      3 === r.readyState && (null === (t = e.opts.cookieJar) || void 0 === t || t.parseCookies(r)), 4 === r.readyState && (200 === r.status || 1223 === r.status ? e.onLoad() : e.setTimeoutFn(function () {
                        e.onError("number" == typeof r.status ? r.status : 0);
                      }, 0));
                    }, r.send(this.data);
                  } catch (t) {
                    return void this.setTimeoutFn(function () {
                      e.onError(t);
                    }, 0);
                  }
                  "undefined" != typeof document && (this.index = i.requestsCount++, i.requests[this.index] = this);
                }
              }, {
                key: "onError",
                value: function value(t) {
                  this.emitReserved("error", t, this.xhr), this.cleanup(!0);
                }
              }, {
                key: "cleanup",
                value: function value(t) {
                  if (void 0 !== this.xhr && null !== this.xhr) {
                    if (this.xhr.onreadystatechange = rt, t) try {
                      this.xhr.abort();
                    } catch (t) {}
                    "undefined" != typeof document && delete i.requests[this.index], this.xhr = null;
                  }
                }
              }, {
                key: "onLoad",
                value: function value() {
                  var t = this.xhr.responseText;
                  null !== t && (this.emitReserved("data", t), this.emitReserved("success"), this.cleanup());
                }
              }, {
                key: "abort",
                value: function value() {
                  this.cleanup();
                }
              }]), i;
            }(U);
          if (st.requestsCount = 0, st.requests = {}, "undefined" != typeof document) if ("function" == typeof attachEvent) attachEvent("onunload", at);else if ("function" == typeof addEventListener) {
            addEventListener("onpagehide" in I ? "pagehide" : "unload", at, !1);
          }
          function at() {
            for (var t in st.requests) st.requests.hasOwnProperty(t) && st.requests[t].abort();
          }
          var ut = "function" == typeof Promise && "function" == typeof Promise.resolve ? function (t) {
              return Promise.resolve().then(t);
            } : function (t, e) {
              return e(t, 0);
            },
            ct = I.WebSocket || I.MozWebSocket,
            ht = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(),
            ft = function (t) {
              o(i, t);
              var n = l(i);
              function i(t) {
                var r;
                return e(this, i), (r = n.call(this, t)).supportsBinary = !t.forceBase64, r;
              }
              return r(i, [{
                key: "name",
                get: function get() {
                  return "websocket";
                }
              }, {
                key: "doOpen",
                value: function value() {
                  if (this.check()) {
                    var t = this.uri(),
                      e = this.opts.protocols,
                      n = ht ? {} : F(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
                    this.opts.extraHeaders && (n.headers = this.opts.extraHeaders);
                    try {
                      this.ws = ht ? new ct(t, e, n) : e ? new ct(t, e) : new ct(t);
                    } catch (t) {
                      return this.emitReserved("error", t);
                    }
                    this.ws.binaryType = this.socket.binaryType, this.addEventListeners();
                  }
                }
              }, {
                key: "addEventListeners",
                value: function value() {
                  var t = this;
                  this.ws.onopen = function () {
                    t.opts.autoUnref && t.ws._socket.unref(), t.onOpen();
                  }, this.ws.onclose = function (e) {
                    return t.onClose({
                      description: "websocket connection closed",
                      context: e
                    });
                  }, this.ws.onmessage = function (e) {
                    return t.onData(e.data);
                  }, this.ws.onerror = function (e) {
                    return t.onError("websocket error", e);
                  };
                }
              }, {
                key: "write",
                value: function value(t) {
                  var e = this;
                  this.writable = !1;
                  for (var n = function n() {
                      var n = t[r],
                        i = r === t.length - 1;
                      A(n, e.supportsBinary, function (t) {
                        try {
                          e.ws.send(t);
                        } catch (t) {}
                        i && ut(function () {
                          e.writable = !0, e.emitReserved("drain");
                        }, e.setTimeoutFn);
                      });
                    }, r = 0; r < t.length; r++) n();
                }
              }, {
                key: "doClose",
                value: function value() {
                  void 0 !== this.ws && (this.ws.close(), this.ws = null);
                }
              }, {
                key: "uri",
                value: function value() {
                  var t = this.opts.secure ? "wss" : "ws",
                    e = this.query || {};
                  return this.opts.timestampRequests && (e[this.opts.timestampParam] = Z()), this.supportsBinary || (e.b64 = 1), this.createUri(t, e);
                }
              }, {
                key: "check",
                value: function value() {
                  return !!ct;
                }
              }]), i;
            }(W),
            lt = function (t) {
              o(i, t);
              var n = l(i);
              function i() {
                return e(this, i), n.apply(this, arguments);
              }
              return r(i, [{
                key: "name",
                get: function get() {
                  return "webtransport";
                }
              }, {
                key: "doOpen",
                value: function value() {
                  var t = this;
                  "function" == typeof WebTransport && (this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]), this.transport.closed.then(function () {
                    t.onClose();
                  })["catch"](function (e) {
                    t.onError("webtransport error", e);
                  }), this.transport.ready.then(function () {
                    t.transport.createBidirectionalStream().then(function (e) {
                      var n = function (t, e) {
                          B || (B = new TextDecoder());
                          var n = [],
                            r = 0,
                            i = -1,
                            o = !1;
                          return new TransformStream({
                            transform: function transform(s, a) {
                              for (n.push(s);;) {
                                if (0 === r) {
                                  if (j(n) < 1) break;
                                  var u = D(n, 1);
                                  o = 128 == (128 & u[0]), i = 127 & u[0], r = i < 126 ? 3 : 126 === i ? 1 : 2;
                                } else if (1 === r) {
                                  if (j(n) < 2) break;
                                  var c = D(n, 2);
                                  i = new DataView(c.buffer, c.byteOffset, c.length).getUint16(0), r = 3;
                                } else if (2 === r) {
                                  if (j(n) < 8) break;
                                  var h = D(n, 8),
                                    f = new DataView(h.buffer, h.byteOffset, h.length),
                                    l = f.getUint32(0);
                                  if (l > Math.pow(2, 21) - 1) {
                                    a.enqueue(b);
                                    break;
                                  }
                                  i = l * Math.pow(2, 32) + f.getUint32(4), r = 3;
                                } else {
                                  if (j(n) < i) break;
                                  var p = D(n, i);
                                  a.enqueue(N(o ? p : B.decode(p), e)), r = 0;
                                }
                                if (0 === i || i > t) {
                                  a.enqueue(b);
                                  break;
                                }
                              }
                            }
                          });
                        }(Number.MAX_SAFE_INTEGER, t.socket.binaryType),
                        r = e.readable.pipeThrough(n).getReader(),
                        i = q();
                      i.readable.pipeTo(e.writable), t.writer = i.writable.getWriter();
                      !function e() {
                        r.read().then(function (n) {
                          var r = n.done,
                            i = n.value;
                          r || (t.onPacket(i), e());
                        })["catch"](function (t) {});
                      }();
                      var o = {
                        type: "open"
                      };
                      t.query.sid && (o.data = '{"sid":"'.concat(t.query.sid, '"}')), t.writer.write(o).then(function () {
                        return t.onOpen();
                      });
                    });
                  }));
                }
              }, {
                key: "write",
                value: function value(t) {
                  var e = this;
                  this.writable = !1;
                  for (var n = function n() {
                      var n = t[r],
                        i = r === t.length - 1;
                      e.writer.write(n).then(function () {
                        i && ut(function () {
                          e.writable = !0, e.emitReserved("drain");
                        }, e.setTimeoutFn);
                      });
                    }, r = 0; r < t.length; r++) n();
                }
              }, {
                key: "doClose",
                value: function value() {
                  var t;
                  null === (t = this.transport) || void 0 === t || t.close();
                }
              }]), i;
            }(W),
            pt = {
              websocket: ft,
              webtransport: lt,
              polling: ot
            },
            dt = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            yt = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
          function vt(t) {
            var e = t,
              n = t.indexOf("["),
              r = t.indexOf("]");
            -1 != n && -1 != r && (t = t.substring(0, n) + t.substring(n, r).replace(/:/g, ";") + t.substring(r, t.length));
            for (var i, o, s = dt.exec(t || ""), a = {}, u = 14; u--;) a[yt[u]] = s[u] || "";
            return -1 != n && -1 != r && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a.pathNames = function (t, e) {
              var n = /\/{2,9}/g,
                r = e.replace(n, "/").split("/");
              "/" != e.slice(0, 1) && 0 !== e.length || r.splice(0, 1);
              "/" == e.slice(-1) && r.splice(r.length - 1, 1);
              return r;
            }(0, a.path), a.queryKey = (i = a.query, o = {}, i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, n) {
              e && (o[e] = n);
            }), o), a;
          }
          var gt = function (n) {
            o(a, n);
            var s = l(a);
            function a(n) {
              var r,
                o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return e(this, a), (r = s.call(this)).binaryType = "arraybuffer", r.writeBuffer = [], n && "object" === t(n) && (o = n, n = null), n ? (n = vt(n), o.hostname = n.host, o.secure = "https" === n.protocol || "wss" === n.protocol, o.port = n.port, n.query && (o.query = n.query)) : o.host && (o.hostname = vt(o.host).host), H(f(r), o), r.secure = null != o.secure ? o.secure : "undefined" != typeof location && "https:" === location.protocol, o.hostname && !o.port && (o.port = r.secure ? "443" : "80"), r.hostname = o.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), r.port = o.port || ("undefined" != typeof location && location.port ? location.port : r.secure ? "443" : "80"), r.transports = o.transports || ["polling", "websocket", "webtransport"], r.writeBuffer = [], r.prevBufferLen = 0, r.opts = i({
                path: "/engine.io",
                agent: !1,
                withCredentials: !1,
                upgrade: !0,
                timestampParam: "t",
                rememberUpgrade: !1,
                addTrailingSlash: !0,
                rejectUnauthorized: !0,
                perMessageDeflate: {
                  threshold: 1024
                },
                transportOptions: {},
                closeOnBeforeunload: !1
              }, o), r.opts.path = r.opts.path.replace(/\/$/, "") + (r.opts.addTrailingSlash ? "/" : ""), "string" == typeof r.opts.query && (r.opts.query = function (t) {
                for (var e = {}, n = t.split("&"), r = 0, i = n.length; r < i; r++) {
                  var o = n[r].split("=");
                  e[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
                }
                return e;
              }(r.opts.query)), r.id = null, r.upgrades = null, r.pingInterval = null, r.pingTimeout = null, r.pingTimeoutTimer = null, "function" == typeof addEventListener && (r.opts.closeOnBeforeunload && (r.beforeunloadEventListener = function () {
                r.transport && (r.transport.removeAllListeners(), r.transport.close());
              }, addEventListener("beforeunload", r.beforeunloadEventListener, !1)), "localhost" !== r.hostname && (r.offlineEventListener = function () {
                r.onClose("transport close", {
                  description: "network connection lost"
                });
              }, addEventListener("offline", r.offlineEventListener, !1))), r.open(), r;
            }
            return r(a, [{
              key: "createTransport",
              value: function value(t) {
                var e = i({}, this.opts.query);
                e.EIO = 4, e.transport = t, this.id && (e.sid = this.id);
                var n = i({}, this.opts, {
                  query: e,
                  socket: this,
                  hostname: this.hostname,
                  secure: this.secure,
                  port: this.port
                }, this.opts.transportOptions[t]);
                return new pt[t](n);
              }
            }, {
              key: "open",
              value: function value() {
                var t,
                  e = this;
                if (this.opts.rememberUpgrade && a.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket";else {
                  if (0 === this.transports.length) return void this.setTimeoutFn(function () {
                    e.emitReserved("error", "No transports available");
                  }, 0);
                  t = this.transports[0];
                }
                this.readyState = "opening";
                try {
                  t = this.createTransport(t);
                } catch (t) {
                  return this.transports.shift(), void this.open();
                }
                t.open(), this.setTransport(t);
              }
            }, {
              key: "setTransport",
              value: function value(t) {
                var e = this;
                this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", function (t) {
                  return e.onClose("transport close", t);
                });
              }
            }, {
              key: "probe",
              value: function value(t) {
                var e = this,
                  n = this.createTransport(t),
                  r = !1;
                a.priorWebsocketSuccess = !1;
                var i = function i() {
                  r || (n.send([{
                    type: "ping",
                    data: "probe"
                  }]), n.once("packet", function (t) {
                    if (!r) if ("pong" === t.type && "probe" === t.data) {
                      if (e.upgrading = !0, e.emitReserved("upgrading", n), !n) return;
                      a.priorWebsocketSuccess = "websocket" === n.name, e.transport.pause(function () {
                        r || "closed" !== e.readyState && (f(), e.setTransport(n), n.send([{
                          type: "upgrade"
                        }]), e.emitReserved("upgrade", n), n = null, e.upgrading = !1, e.flush());
                      });
                    } else {
                      var i = new Error("probe error");
                      i.transport = n.name, e.emitReserved("upgradeError", i);
                    }
                  }));
                };
                function o() {
                  r || (r = !0, f(), n.close(), n = null);
                }
                var s = function s(t) {
                  var r = new Error("probe error: " + t);
                  r.transport = n.name, o(), e.emitReserved("upgradeError", r);
                };
                function u() {
                  s("transport closed");
                }
                function c() {
                  s("socket closed");
                }
                function h(t) {
                  n && t.name !== n.name && o();
                }
                var f = function f() {
                  n.removeListener("open", i), n.removeListener("error", s), n.removeListener("close", u), e.off("close", c), e.off("upgrading", h);
                };
                n.once("open", i), n.once("error", s), n.once("close", u), this.once("close", c), this.once("upgrading", h), -1 !== this.upgrades.indexOf("webtransport") && "webtransport" !== t ? this.setTimeoutFn(function () {
                  r || n.open();
                }, 200) : n.open();
              }
            }, {
              key: "onOpen",
              value: function value() {
                if (this.readyState = "open", a.priorWebsocketSuccess = "websocket" === this.transport.name, this.emitReserved("open"), this.flush(), "open" === this.readyState && this.opts.upgrade) for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t]);
              }
            }, {
              key: "onPacket",
              value: function value(t) {
                if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), this.resetPingTimeout(), t.type) {
                  case "open":
                    this.onHandshake(JSON.parse(t.data));
                    break;
                  case "ping":
                    this.sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong");
                    break;
                  case "error":
                    var e = new Error("server error");
                    e.code = t.data, this.onError(e);
                    break;
                  case "message":
                    this.emitReserved("data", t.data), this.emitReserved("message", t.data);
                }
              }
            }, {
              key: "onHandshake",
              value: function value(t) {
                this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.maxPayload = t.maxPayload, this.onOpen(), "closed" !== this.readyState && this.resetPingTimeout();
              }
            }, {
              key: "resetPingTimeout",
              value: function value() {
                var t = this;
                this.clearTimeoutFn(this.pingTimeoutTimer), this.pingTimeoutTimer = this.setTimeoutFn(function () {
                  t.onClose("ping timeout");
                }, this.pingInterval + this.pingTimeout), this.opts.autoUnref && this.pingTimeoutTimer.unref();
              }
            }, {
              key: "onDrain",
              value: function value() {
                this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emitReserved("drain") : this.flush();
              }
            }, {
              key: "flush",
              value: function value() {
                if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
                  var t = this.getWritablePackets();
                  this.transport.send(t), this.prevBufferLen = t.length, this.emitReserved("flush");
                }
              }
            }, {
              key: "getWritablePackets",
              value: function value() {
                if (!(this.maxPayload && "polling" === this.transport.name && this.writeBuffer.length > 1)) return this.writeBuffer;
                for (var t, e = 1, n = 0; n < this.writeBuffer.length; n++) {
                  var r = this.writeBuffer[n].data;
                  if (r && (e += "string" == typeof (t = r) ? function (t) {
                    for (var e = 0, n = 0, r = 0, i = t.length; r < i; r++) (e = t.charCodeAt(r)) < 128 ? n += 1 : e < 2048 ? n += 2 : e < 55296 || e >= 57344 ? n += 3 : (r++, n += 4);
                    return n;
                  }(t) : Math.ceil(1.33 * (t.byteLength || t.size))), n > 0 && e > this.maxPayload) return this.writeBuffer.slice(0, n);
                  e += 2;
                }
                return this.writeBuffer;
              }
            }, {
              key: "write",
              value: function value(t, e, n) {
                return this.sendPacket("message", t, e, n), this;
              }
            }, {
              key: "send",
              value: function value(t, e, n) {
                return this.sendPacket("message", t, e, n), this;
              }
            }, {
              key: "sendPacket",
              value: function value(t, e, n, r) {
                if ("function" == typeof e && (r = e, e = void 0), "function" == typeof n && (r = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                  (n = n || {}).compress = !1 !== n.compress;
                  var i = {
                    type: t,
                    data: e,
                    options: n
                  };
                  this.emitReserved("packetCreate", i), this.writeBuffer.push(i), r && this.once("flush", r), this.flush();
                }
              }
            }, {
              key: "close",
              value: function value() {
                var t = this,
                  e = function e() {
                    t.onClose("forced close"), t.transport.close();
                  },
                  n = function n() {
                    t.off("upgrade", n), t.off("upgradeError", n), e();
                  },
                  r = function r() {
                    t.once("upgrade", n), t.once("upgradeError", n);
                  };
                return "opening" !== this.readyState && "open" !== this.readyState || (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", function () {
                  t.upgrading ? r() : e();
                }) : this.upgrading ? r() : e()), this;
              }
            }, {
              key: "onError",
              value: function value(t) {
                a.priorWebsocketSuccess = !1, this.emitReserved("error", t), this.onClose("transport error", t);
              }
            }, {
              key: "onClose",
              value: function value(t, e) {
                "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (this.clearTimeoutFn(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), "function" == typeof removeEventListener && (removeEventListener("beforeunload", this.beforeunloadEventListener, !1), removeEventListener("offline", this.offlineEventListener, !1)), this.readyState = "closed", this.id = null, this.emitReserved("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0);
              }
            }, {
              key: "filterUpgrades",
              value: function value(t) {
                for (var e = [], n = 0, r = t.length; n < r; n++) ~this.transports.indexOf(t[n]) && e.push(t[n]);
                return e;
              }
            }]), a;
          }(U);
          gt.protocol = 4, gt.protocol;
          var mt = "function" == typeof ArrayBuffer,
            bt = function bt(t) {
              return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer;
            },
            kt = Object.prototype.toString,
            wt = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === kt.call(Blob),
            _t = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === kt.call(File);
          function At(t) {
            return mt && (t instanceof ArrayBuffer || bt(t)) || wt && t instanceof Blob || _t && t instanceof File;
          }
          function Ot(e, n) {
            if (!e || "object" !== t(e)) return !1;
            if (Array.isArray(e)) {
              for (var r = 0, i = e.length; r < i; r++) if (Ot(e[r])) return !0;
              return !1;
            }
            if (At(e)) return !0;
            if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return Ot(e.toJSON(), !0);
            for (var o in e) if (Object.prototype.hasOwnProperty.call(e, o) && Ot(e[o])) return !0;
            return !1;
          }
          function Et(t) {
            var e = [],
              n = t.data,
              r = t;
            return r.data = Tt(n, e), r.attachments = e.length, {
              packet: r,
              buffers: e
            };
          }
          function Tt(e, n) {
            if (!e) return e;
            if (At(e)) {
              var r = {
                _placeholder: !0,
                num: n.length
              };
              return n.push(e), r;
            }
            if (Array.isArray(e)) {
              for (var i = new Array(e.length), o = 0; o < e.length; o++) i[o] = Tt(e[o], n);
              return i;
            }
            if ("object" === t(e) && !(e instanceof Date)) {
              var s = {};
              for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (s[a] = Tt(e[a], n));
              return s;
            }
            return e;
          }
          function Rt(t, e) {
            return t.data = Ct(t.data, e), delete t.attachments, t;
          }
          function Ct(e, n) {
            if (!e) return e;
            if (e && !0 === e._placeholder) {
              if ("number" == typeof e.num && e.num >= 0 && e.num < n.length) return n[e.num];
              throw new Error("illegal attachments");
            }
            if (Array.isArray(e)) for (var r = 0; r < e.length; r++) e[r] = Ct(e[r], n);else if ("object" === t(e)) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (e[i] = Ct(e[i], n));
            return e;
          }
          var Bt,
            St = ["connect", "connect_error", "disconnect", "disconnecting", "newListener", "removeListener"];
          !function (t) {
            t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
          }(Bt || (Bt = {}));
          var Nt = function () {
            function t(n) {
              e(this, t), this.replacer = n;
            }
            return r(t, [{
              key: "encode",
              value: function value(t) {
                return t.type !== Bt.EVENT && t.type !== Bt.ACK || !Ot(t) ? [this.encodeAsString(t)] : this.encodeAsBinary({
                  type: t.type === Bt.EVENT ? Bt.BINARY_EVENT : Bt.BINARY_ACK,
                  nsp: t.nsp,
                  data: t.data,
                  id: t.id
                });
              }
            }, {
              key: "encodeAsString",
              value: function value(t) {
                var e = "" + t.type;
                return t.type !== Bt.BINARY_EVENT && t.type !== Bt.BINARY_ACK || (e += t.attachments + "-"), t.nsp && "/" !== t.nsp && (e += t.nsp + ","), null != t.id && (e += t.id), null != t.data && (e += JSON.stringify(t.data, this.replacer)), e;
              }
            }, {
              key: "encodeAsBinary",
              value: function value(t) {
                var e = Et(t),
                  n = this.encodeAsString(e.packet),
                  r = e.buffers;
                return r.unshift(n), r;
              }
            }]), t;
          }();
          function Lt(t) {
            return "[object Object]" === Object.prototype.toString.call(t);
          }
          var xt = function (t) {
              o(i, t);
              var n = l(i);
              function i(t) {
                var r;
                return e(this, i), (r = n.call(this)).reviver = t, r;
              }
              return r(i, [{
                key: "add",
                value: function value(t) {
                  var e;
                  if ("string" == typeof t) {
                    if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
                    var n = (e = this.decodeString(t)).type === Bt.BINARY_EVENT;
                    n || e.type === Bt.BINARY_ACK ? (e.type = n ? Bt.EVENT : Bt.ACK, this.reconstructor = new Pt(e), 0 === e.attachments && p(s(i.prototype), "emitReserved", this).call(this, "decoded", e)) : p(s(i.prototype), "emitReserved", this).call(this, "decoded", e);
                  } else {
                    if (!At(t) && !t.base64) throw new Error("Unknown type: " + t);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    (e = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, p(s(i.prototype), "emitReserved", this).call(this, "decoded", e));
                  }
                }
              }, {
                key: "decodeString",
                value: function value(t) {
                  var e = 0,
                    n = {
                      type: Number(t.charAt(0))
                    };
                  if (void 0 === Bt[n.type]) throw new Error("unknown packet type " + n.type);
                  if (n.type === Bt.BINARY_EVENT || n.type === Bt.BINARY_ACK) {
                    for (var r = e + 1; "-" !== t.charAt(++e) && e != t.length;);
                    var o = t.substring(r, e);
                    if (o != Number(o) || "-" !== t.charAt(e)) throw new Error("Illegal attachments");
                    n.attachments = Number(o);
                  }
                  if ("/" === t.charAt(e + 1)) {
                    for (var s = e + 1; ++e;) {
                      if ("," === t.charAt(e)) break;
                      if (e === t.length) break;
                    }
                    n.nsp = t.substring(s, e);
                  } else n.nsp = "/";
                  var a = t.charAt(e + 1);
                  if ("" !== a && Number(a) == a) {
                    for (var u = e + 1; ++e;) {
                      var c = t.charAt(e);
                      if (null == c || Number(c) != c) {
                        --e;
                        break;
                      }
                      if (e === t.length) break;
                    }
                    n.id = Number(t.substring(u, e + 1));
                  }
                  if (t.charAt(++e)) {
                    var h = this.tryParse(t.substr(e));
                    if (!i.isPayloadValid(n.type, h)) throw new Error("invalid payload");
                    n.data = h;
                  }
                  return n;
                }
              }, {
                key: "tryParse",
                value: function value(t) {
                  try {
                    return JSON.parse(t, this.reviver);
                  } catch (t) {
                    return !1;
                  }
                }
              }, {
                key: "destroy",
                value: function value() {
                  this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
                }
              }], [{
                key: "isPayloadValid",
                value: function value(t, e) {
                  switch (t) {
                    case Bt.CONNECT:
                      return Lt(e);
                    case Bt.DISCONNECT:
                      return void 0 === e;
                    case Bt.CONNECT_ERROR:
                      return "string" == typeof e || Lt(e);
                    case Bt.EVENT:
                    case Bt.BINARY_EVENT:
                      return Array.isArray(e) && ("number" == typeof e[0] || "string" == typeof e[0] && -1 === St.indexOf(e[0]));
                    case Bt.ACK:
                    case Bt.BINARY_ACK:
                      return Array.isArray(e);
                  }
                }
              }]), i;
            }(U),
            Pt = function () {
              function t(n) {
                e(this, t), this.packet = n, this.buffers = [], this.reconPack = n;
              }
              return r(t, [{
                key: "takeBinaryData",
                value: function value(t) {
                  if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
                    var e = Rt(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), e;
                  }
                  return null;
                }
              }, {
                key: "finishedReconstruction",
                value: function value() {
                  this.reconPack = null, this.buffers = [];
                }
              }]), t;
            }(),
            qt = Object.freeze({
              __proto__: null,
              protocol: 5,
              get PacketType() {
                return Bt;
              },
              Encoder: Nt,
              Decoder: xt
            });
          function jt(t, e, n) {
            return t.on(e, n), function () {
              t.off(e, n);
            };
          }
          var Dt = Object.freeze({
              connect: 1,
              connect_error: 1,
              disconnect: 1,
              disconnecting: 1,
              newListener: 1,
              removeListener: 1
            }),
            Ut = function (t) {
              o(a, t);
              var n = l(a);
              function a(t, r, o) {
                var s;
                return e(this, a), (s = n.call(this)).connected = !1, s.recovered = !1, s.receiveBuffer = [], s.sendBuffer = [], s._queue = [], s._queueSeq = 0, s.ids = 0, s.acks = {}, s.flags = {}, s.io = t, s.nsp = r, o && o.auth && (s.auth = o.auth), s._opts = i({}, o), s.io._autoConnect && s.open(), s;
              }
              return r(a, [{
                key: "disconnected",
                get: function get() {
                  return !this.connected;
                }
              }, {
                key: "subEvents",
                value: function value() {
                  if (!this.subs) {
                    var t = this.io;
                    this.subs = [jt(t, "open", this.onopen.bind(this)), jt(t, "packet", this.onpacket.bind(this)), jt(t, "error", this.onerror.bind(this)), jt(t, "close", this.onclose.bind(this))];
                  }
                }
              }, {
                key: "active",
                get: function get() {
                  return !!this.subs;
                }
              }, {
                key: "connect",
                value: function value() {
                  return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), "open" === this.io._readyState && this.onopen()), this;
                }
              }, {
                key: "open",
                value: function value() {
                  return this.connect();
                }
              }, {
                key: "send",
                value: function value() {
                  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                  return e.unshift("message"), this.emit.apply(this, e), this;
                }
              }, {
                key: "emit",
                value: function value(t) {
                  if (Dt.hasOwnProperty(t)) throw new Error('"' + t.toString() + '" is a reserved event name');
                  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                  if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags["volatile"]) return this._addToQueue(n), this;
                  var i = {
                    type: Bt.EVENT,
                    data: n,
                    options: {}
                  };
                  if (i.options.compress = !1 !== this.flags.compress, "function" == typeof n[n.length - 1]) {
                    var o = this.ids++,
                      s = n.pop();
                    this._registerAckCallback(o, s), i.id = o;
                  }
                  var a = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
                  return this.flags["volatile"] && (!a || !this.connected) || (this.connected ? (this.notifyOutgoingListeners(i), this.packet(i)) : this.sendBuffer.push(i)), this.flags = {}, this;
                }
              }, {
                key: "_registerAckCallback",
                value: function value(t, e) {
                  var n,
                    r = this,
                    i = null !== (n = this.flags.timeout) && void 0 !== n ? n : this._opts.ackTimeout;
                  if (void 0 !== i) {
                    var o = this.io.setTimeoutFn(function () {
                      delete r.acks[t];
                      for (var n = 0; n < r.sendBuffer.length; n++) r.sendBuffer[n].id === t && r.sendBuffer.splice(n, 1);
                      e.call(r, new Error("operation has timed out"));
                    }, i);
                    this.acks[t] = function () {
                      r.io.clearTimeoutFn(o);
                      for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                      e.apply(r, [null].concat(n));
                    };
                  } else this.acks[t] = e;
                }
              }, {
                key: "emitWithAck",
                value: function value(t) {
                  for (var e = this, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
                  var o = void 0 !== this.flags.timeout || void 0 !== this._opts.ackTimeout;
                  return new Promise(function (n, i) {
                    r.push(function (t, e) {
                      return o ? t ? i(t) : n(e) : n(t);
                    }), e.emit.apply(e, [t].concat(r));
                  });
                }
              }, {
                key: "_addToQueue",
                value: function value(t) {
                  var e,
                    n = this;
                  "function" == typeof t[t.length - 1] && (e = t.pop());
                  var r = {
                    id: this._queueSeq++,
                    tryCount: 0,
                    pending: !1,
                    args: t,
                    flags: i({
                      fromQueue: !0
                    }, this.flags)
                  };
                  t.push(function (t) {
                    if (r === n._queue[0]) {
                      if (null !== t) r.tryCount > n._opts.retries && (n._queue.shift(), e && e(t));else if (n._queue.shift(), e) {
                        for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) o[s - 1] = arguments[s];
                        e.apply(void 0, [null].concat(o));
                      }
                      return r.pending = !1, n._drainQueue();
                    }
                  }), this._queue.push(r), this._drainQueue();
                }
              }, {
                key: "_drainQueue",
                value: function value() {
                  var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                  if (this.connected && 0 !== this._queue.length) {
                    var e = this._queue[0];
                    e.pending && !t || (e.pending = !0, e.tryCount++, this.flags = e.flags, this.emit.apply(this, e.args));
                  }
                }
              }, {
                key: "packet",
                value: function value(t) {
                  t.nsp = this.nsp, this.io._packet(t);
                }
              }, {
                key: "onopen",
                value: function value() {
                  var t = this;
                  "function" == typeof this.auth ? this.auth(function (e) {
                    t._sendConnectPacket(e);
                  }) : this._sendConnectPacket(this.auth);
                }
              }, {
                key: "_sendConnectPacket",
                value: function value(t) {
                  this.packet({
                    type: Bt.CONNECT,
                    data: this._pid ? i({
                      pid: this._pid,
                      offset: this._lastOffset
                    }, t) : t
                  });
                }
              }, {
                key: "onerror",
                value: function value(t) {
                  this.connected || this.emitReserved("connect_error", t);
                }
              }, {
                key: "onclose",
                value: function value(t, e) {
                  this.connected = !1, delete this.id, this.emitReserved("disconnect", t, e);
                }
              }, {
                key: "onpacket",
                value: function value(t) {
                  if (t.nsp === this.nsp) switch (t.type) {
                    case Bt.CONNECT:
                      t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                      break;
                    case Bt.EVENT:
                    case Bt.BINARY_EVENT:
                      this.onevent(t);
                      break;
                    case Bt.ACK:
                    case Bt.BINARY_ACK:
                      this.onack(t);
                      break;
                    case Bt.DISCONNECT:
                      this.ondisconnect();
                      break;
                    case Bt.CONNECT_ERROR:
                      this.destroy();
                      var e = new Error(t.data.message);
                      e.data = t.data.data, this.emitReserved("connect_error", e);
                  }
                }
              }, {
                key: "onevent",
                value: function value(t) {
                  var e = t.data || [];
                  null != t.id && e.push(this.ack(t.id)), this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e));
                }
              }, {
                key: "emitEvent",
                value: function value(t) {
                  if (this._anyListeners && this._anyListeners.length) {
                    var e,
                      n = y(this._anyListeners.slice());
                    try {
                      for (n.s(); !(e = n.n()).done;) {
                        e.value.apply(this, t);
                      }
                    } catch (t) {
                      n.e(t);
                    } finally {
                      n.f();
                    }
                  }
                  p(s(a.prototype), "emit", this).apply(this, t), this._pid && t.length && "string" == typeof t[t.length - 1] && (this._lastOffset = t[t.length - 1]);
                }
              }, {
                key: "ack",
                value: function value(t) {
                  var e = this,
                    n = !1;
                  return function () {
                    if (!n) {
                      n = !0;
                      for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
                      e.packet({
                        type: Bt.ACK,
                        id: t,
                        data: i
                      });
                    }
                  };
                }
              }, {
                key: "onack",
                value: function value(t) {
                  var e = this.acks[t.id];
                  "function" == typeof e && (e.apply(this, t.data), delete this.acks[t.id]);
                }
              }, {
                key: "onconnect",
                value: function value(t, e) {
                  this.id = t, this.recovered = e && this._pid === e, this._pid = e, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
                }
              }, {
                key: "emitBuffered",
                value: function value() {
                  var t = this;
                  this.receiveBuffer.forEach(function (e) {
                    return t.emitEvent(e);
                  }), this.receiveBuffer = [], this.sendBuffer.forEach(function (e) {
                    t.notifyOutgoingListeners(e), t.packet(e);
                  }), this.sendBuffer = [];
                }
              }, {
                key: "ondisconnect",
                value: function value() {
                  this.destroy(), this.onclose("io server disconnect");
                }
              }, {
                key: "destroy",
                value: function value() {
                  this.subs && (this.subs.forEach(function (t) {
                    return t();
                  }), this.subs = void 0), this.io._destroy(this);
                }
              }, {
                key: "disconnect",
                value: function value() {
                  return this.connected && this.packet({
                    type: Bt.DISCONNECT
                  }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
                }
              }, {
                key: "close",
                value: function value() {
                  return this.disconnect();
                }
              }, {
                key: "compress",
                value: function value(t) {
                  return this.flags.compress = t, this;
                }
              }, {
                key: "volatile",
                get: function get() {
                  return this.flags["volatile"] = !0, this;
                }
              }, {
                key: "timeout",
                value: function value(t) {
                  return this.flags.timeout = t, this;
                }
              }, {
                key: "onAny",
                value: function value(t) {
                  return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this;
                }
              }, {
                key: "prependAny",
                value: function value(t) {
                  return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this;
                }
              }, {
                key: "offAny",
                value: function value(t) {
                  if (!this._anyListeners) return this;
                  if (t) {
                    for (var e = this._anyListeners, n = 0; n < e.length; n++) if (t === e[n]) return e.splice(n, 1), this;
                  } else this._anyListeners = [];
                  return this;
                }
              }, {
                key: "listenersAny",
                value: function value() {
                  return this._anyListeners || [];
                }
              }, {
                key: "onAnyOutgoing",
                value: function value(t) {
                  return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this;
                }
              }, {
                key: "prependAnyOutgoing",
                value: function value(t) {
                  return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this;
                }
              }, {
                key: "offAnyOutgoing",
                value: function value(t) {
                  if (!this._anyOutgoingListeners) return this;
                  if (t) {
                    for (var e = this._anyOutgoingListeners, n = 0; n < e.length; n++) if (t === e[n]) return e.splice(n, 1), this;
                  } else this._anyOutgoingListeners = [];
                  return this;
                }
              }, {
                key: "listenersAnyOutgoing",
                value: function value() {
                  return this._anyOutgoingListeners || [];
                }
              }, {
                key: "notifyOutgoingListeners",
                value: function value(t) {
                  if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
                    var e,
                      n = y(this._anyOutgoingListeners.slice());
                    try {
                      for (n.s(); !(e = n.n()).done;) {
                        e.value.apply(this, t.data);
                      }
                    } catch (t) {
                      n.e(t);
                    } finally {
                      n.f();
                    }
                  }
                }
              }]), a;
            }(U);
          function It(t) {
            t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
          }
          It.prototype.duration = function () {
            var t = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
              var e = Math.random(),
                n = Math.floor(e * this.jitter * t);
              t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
            }
            return 0 | Math.min(t, this.max);
          }, It.prototype.reset = function () {
            this.attempts = 0;
          }, It.prototype.setMin = function (t) {
            this.ms = t;
          }, It.prototype.setMax = function (t) {
            this.max = t;
          }, It.prototype.setJitter = function (t) {
            this.jitter = t;
          };
          var Ft = function (n) {
              o(s, n);
              var i = l(s);
              function s(n, r) {
                var o, a;
                e(this, s), (o = i.call(this)).nsps = {}, o.subs = [], n && "object" === t(n) && (r = n, n = void 0), (r = r || {}).path = r.path || "/socket.io", o.opts = r, H(f(o), r), o.reconnection(!1 !== r.reconnection), o.reconnectionAttempts(r.reconnectionAttempts || 1 / 0), o.reconnectionDelay(r.reconnectionDelay || 1e3), o.reconnectionDelayMax(r.reconnectionDelayMax || 5e3), o.randomizationFactor(null !== (a = r.randomizationFactor) && void 0 !== a ? a : 0.5), o.backoff = new It({
                  min: o.reconnectionDelay(),
                  max: o.reconnectionDelayMax(),
                  jitter: o.randomizationFactor()
                }), o.timeout(null == r.timeout ? 2e4 : r.timeout), o._readyState = "closed", o.uri = n;
                var u = r.parser || qt;
                return o.encoder = new u.Encoder(), o.decoder = new u.Decoder(), o._autoConnect = !1 !== r.autoConnect, o._autoConnect && o.open(), o;
              }
              return r(s, [{
                key: "reconnection",
                value: function value(t) {
                  return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;
                }
              }, {
                key: "reconnectionAttempts",
                value: function value(t) {
                  return void 0 === t ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this);
                }
              }, {
                key: "reconnectionDelay",
                value: function value(t) {
                  var e;
                  return void 0 === t ? this._reconnectionDelay : (this._reconnectionDelay = t, null === (e = this.backoff) || void 0 === e || e.setMin(t), this);
                }
              }, {
                key: "randomizationFactor",
                value: function value(t) {
                  var e;
                  return void 0 === t ? this._randomizationFactor : (this._randomizationFactor = t, null === (e = this.backoff) || void 0 === e || e.setJitter(t), this);
                }
              }, {
                key: "reconnectionDelayMax",
                value: function value(t) {
                  var e;
                  return void 0 === t ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, null === (e = this.backoff) || void 0 === e || e.setMax(t), this);
                }
              }, {
                key: "timeout",
                value: function value(t) {
                  return arguments.length ? (this._timeout = t, this) : this._timeout;
                }
              }, {
                key: "maybeReconnectOnOpen",
                value: function value() {
                  !this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
                }
              }, {
                key: "open",
                value: function value(t) {
                  var e = this;
                  if (~this._readyState.indexOf("open")) return this;
                  this.engine = new gt(this.uri, this.opts);
                  var n = this.engine,
                    r = this;
                  this._readyState = "opening", this.skipReconnect = !1;
                  var i = jt(n, "open", function () {
                      r.onopen(), t && t();
                    }),
                    o = function o(n) {
                      e.cleanup(), e._readyState = "closed", e.emitReserved("error", n), t ? t(n) : e.maybeReconnectOnOpen();
                    },
                    s = jt(n, "error", o);
                  if (!1 !== this._timeout) {
                    var a = this._timeout,
                      u = this.setTimeoutFn(function () {
                        i(), o(new Error("timeout")), n.close();
                      }, a);
                    this.opts.autoUnref && u.unref(), this.subs.push(function () {
                      e.clearTimeoutFn(u);
                    });
                  }
                  return this.subs.push(i), this.subs.push(s), this;
                }
              }, {
                key: "connect",
                value: function value(t) {
                  return this.open(t);
                }
              }, {
                key: "onopen",
                value: function value() {
                  this.cleanup(), this._readyState = "open", this.emitReserved("open");
                  var t = this.engine;
                  this.subs.push(jt(t, "ping", this.onping.bind(this)), jt(t, "data", this.ondata.bind(this)), jt(t, "error", this.onerror.bind(this)), jt(t, "close", this.onclose.bind(this)), jt(this.decoder, "decoded", this.ondecoded.bind(this)));
                }
              }, {
                key: "onping",
                value: function value() {
                  this.emitReserved("ping");
                }
              }, {
                key: "ondata",
                value: function value(t) {
                  try {
                    this.decoder.add(t);
                  } catch (t) {
                    this.onclose("parse error", t);
                  }
                }
              }, {
                key: "ondecoded",
                value: function value(t) {
                  var e = this;
                  ut(function () {
                    e.emitReserved("packet", t);
                  }, this.setTimeoutFn);
                }
              }, {
                key: "onerror",
                value: function value(t) {
                  this.emitReserved("error", t);
                }
              }, {
                key: "socket",
                value: function value(t, e) {
                  var n = this.nsps[t];
                  return n ? this._autoConnect && !n.active && n.connect() : (n = new Ut(this, t, e), this.nsps[t] = n), n;
                }
              }, {
                key: "_destroy",
                value: function value(t) {
                  for (var e = 0, n = Object.keys(this.nsps); e < n.length; e++) {
                    var r = n[e];
                    if (this.nsps[r].active) return;
                  }
                  this._close();
                }
              }, {
                key: "_packet",
                value: function value(t) {
                  for (var e = this.encoder.encode(t), n = 0; n < e.length; n++) this.engine.write(e[n], t.options);
                }
              }, {
                key: "cleanup",
                value: function value() {
                  this.subs.forEach(function (t) {
                    return t();
                  }), this.subs.length = 0, this.decoder.destroy();
                }
              }, {
                key: "_close",
                value: function value() {
                  this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close"), this.engine && this.engine.close();
                }
              }, {
                key: "disconnect",
                value: function value() {
                  return this._close();
                }
              }, {
                key: "onclose",
                value: function value(t, e) {
                  this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, e), this._reconnection && !this.skipReconnect && this.reconnect();
                }
              }, {
                key: "reconnect",
                value: function value() {
                  var t = this;
                  if (this._reconnecting || this.skipReconnect) return this;
                  var e = this;
                  if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;else {
                    var n = this.backoff.duration();
                    this._reconnecting = !0;
                    var r = this.setTimeoutFn(function () {
                      e.skipReconnect || (t.emitReserved("reconnect_attempt", e.backoff.attempts), e.skipReconnect || e.open(function (n) {
                        n ? (e._reconnecting = !1, e.reconnect(), t.emitReserved("reconnect_error", n)) : e.onreconnect();
                      }));
                    }, n);
                    this.opts.autoUnref && r.unref(), this.subs.push(function () {
                      t.clearTimeoutFn(r);
                    });
                  }
                }
              }, {
                key: "onreconnect",
                value: function value() {
                  var t = this.backoff.attempts;
                  this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t);
                }
              }]), s;
            }(U),
            Mt = {};
          function Vt(e, n) {
            "object" === t(e) && (n = e, e = void 0);
            var r,
              i = function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                  n = arguments.length > 2 ? arguments[2] : void 0,
                  r = t;
                n = n || "undefined" != typeof location && location, null == t && (t = n.protocol + "//" + n.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? n.protocol + t : n.host + t), /^(https?|wss?):\/\//.test(t) || (t = void 0 !== n ? n.protocol + "//" + t : "https://" + t), r = vt(t)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
                var i = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
                return r.id = r.protocol + "://" + i + ":" + r.port + e, r.href = r.protocol + "://" + i + (n && n.port === r.port ? "" : ":" + r.port), r;
              }(e, (n = n || {}).path || "/socket.io"),
              o = i.source,
              s = i.id,
              a = i.path,
              u = Mt[s] && a in Mt[s].nsps;
            return n.forceNew || n["force new connection"] || !1 === n.multiplex || u ? r = new Ft(o, n) : (Mt[s] || (Mt[s] = new Ft(o, n)), r = Mt[s]), i.query && !n.query && (n.query = i.queryKey), r.socket(i.path, n);
          }
          return i(Vt, {
            Manager: Ft,
            Socket: Ut,
            io: Vt,
            connect: Vt
          }), Vt;
        });

        // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
      }, {});
    }
  };
});

System.register("chunks:///_virtual/socket.io.min.mjs_cjs=&original=.js", ['./socket.io.min.js', './cjs-loader.mjs'], function (exports, module) {
  var __cjsMetaURL, loader;
  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './socket.io.min.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./socket.io.min.js', module.meta.url);
      }
      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/spikesBarrier.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Barrier.ts', './EventManager.ts', './ColliderTagManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Barrier, EventManager, ColliderTagType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Barrier = module.Barrier;
    }, function (module) {
      EventManager = module.EventManager;
    }, function (module) {
      ColliderTagType = module.ColliderTagType;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "fed91/GG1FFZK0HKABY1y19", "spikesBarrier", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var spikesBarrier = exports('spikesBarrier', (_dec = ccclass('spikesBarrier'), _dec(_class = /*#__PURE__*/function (_Barrier) {
        _inheritsLoose(spikesBarrier, _Barrier);
        function spikesBarrier() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Barrier.call.apply(_Barrier, [this].concat(args)) || this;
          //是否已使玩家受伤
          _this.hasHurt = false;
          //伤害
          _this.hurtValue = 10;
          return _this;
        }
        var _proto = spikesBarrier.prototype;
        _proto.start = function start() {
          _Barrier.prototype.start.call(this);
        };
        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider) {
          _Barrier.prototype.onBeginContact.call(this, selfCollider, otherCollider);
          // 2代表玩家
          if (otherCollider.tag === ColliderTagType.Player) {
            if (!this.hasHurt) {
              this.hasHurt = true;
              EventManager.instance.emit('HURT', this.hurtValue);
              // if (!PropManager.instance.getPropUsingState('Shield'))
              //     EventManager.instance.emit('UPDATE_HP', this.hurtValue);
              // else
              //     EventManager.instance.emit('LOSE_SHIELD');
            }
          }

          console.log('地刺平台碰撞');
        };
        _proto.update = function update(deltaTime) {};
        return spikesBarrier;
      }(Barrier)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StartUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts', './UIManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, GameManager, GameState, UIManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GameManager = module.GameManager;
      GameState = module.GameState;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a5785M+r/1Ij4ShrKx1jZ3d", "StartUI", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var StartUI = exports('StartUI', (_dec = ccclass('StartUI'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StartUI, _Component);
        function StartUI() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = StartUI.prototype;
        _proto.start = function start() {
          GameManager.instance.switchGameState(GameState.START);
        };
        _proto.onCLikStart = function onCLikStart() {
          UIManager.instance.open(UIManager.instance.levelSelectPanelPrefab, true);
        };
        _proto.onClickPlayerSelect = function onClickPlayerSelect() {
          UIManager.instance.open(UIManager.instance.playerSelectPanePrefab, true);
        };
        return StartUI;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseUI.ts', './BlockInput.ts', './ScoreManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, director, Node, DirectorEvent, instantiate, UITransform, Label, Vec3, tween, Component, BaseUI, BlockInput, Score;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      director = module.director;
      Node = module.Node;
      DirectorEvent = module.DirectorEvent;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Label = module.Label;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      BaseUI = module.BaseUI;
    }, function (module) {
      BlockInput = module.BlockInput;
    }, function (module) {
      Score = module.Score;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3;
      cclegacy._RF.push({}, "fcf3cufX3BNqbrDp3PGYdsS", "UIManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var UIManager = exports('UIManager', (_dec = ccclass('UIManager'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UIManager, _Component);
        function UIManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // 所有动态 UI 的根节点（通常是一个独立的 Canvas 节点）
          _this.uiRoot = null;
          //---常用动态UI---
          //游戏结束UI
          _initializerDefineProperty(_this, "gameOverUIPrefab", _descriptor, _assertThisInitialized(_this));
          // 暂停面板UI
          _initializerDefineProperty(_this, "pausePanelPrefab", _descriptor2, _assertThisInitialized(_this));
          // 关卡选择面板UI
          _initializerDefineProperty(_this, "levelSelectPanelPrefab", _descriptor3, _assertThisInitialized(_this));
          // 玩家选择面板UI
          _initializerDefineProperty(_this, "playerSelectPanePrefab", _descriptor4, _assertThisInitialized(_this));
          // 道具选择面板UI
          _initializerDefineProperty(_this, "propSelectPanelPrefab", _descriptor5, _assertThisInitialized(_this));
          // 加载游戏面板UI
          _initializerDefineProperty(_this, "loadingPanel", _descriptor6, _assertThisInitialized(_this));
          // UI栈
          _this.uiStack = [];
          _this.currentMask = null;
          // ---------- 常驻 UI 引用（独立于栈，不会被 closeAll 销毁）----------
          _this.persistentUIs = new Map();
          return _this;
        }
        var _proto = UIManager.prototype;
        _proto.onLoad = function onLoad() {
          if (UIManager._instance) {
            this.destroy();
            return;
          }
          UIManager._instance = this;
          this.initUIRoot();
          director.addPersistRootNode(this.node);
        };
        _proto.initUIRoot = function initUIRoot() {
          this.uiStack = [];
          this.currentMask = null;
          var scene = director.getScene();
          if (!scene) return;
          var canvas = scene.getChildByName('Canvas');
          if (!canvas) {
            canvas = new Node('Canvas');
            scene.addChild(canvas);
          }
          var uiRoot = canvas.getChildByName('UIRoot');
          if (!uiRoot) {
            uiRoot = new Node('UIRoot');
            canvas.addChild(uiRoot);
          }
          this.uiRoot = uiRoot;
        };
        _proto.start = function start() {
          director.on(DirectorEvent.AFTER_SCENE_LAUNCH, this.initUIRoot, this);
        };
        _proto.onDestroy = function onDestroy() {
          if (UIManager._instance === this) UIManager._instance = null;
          director.removePersistRootNode(this.node);
          director.off(DirectorEvent.AFTER_SCENE_LAUNCH, this.initUIRoot, this);
        }

        // ==================== 动态 UI（栈管理） ====================

        /**
         * 打开一个 UI 界面（入栈）
         * @param prefab 预制体
         * @param params 传递给 UI 脚本 onOpen 的参数
         * @param blockInput 是否阻断底层输入（弹窗一般设为 true）
         * @param onClose 关闭时的回调
         * @returns UI 节点实例
         */;
        _proto.open = function open(prefab, blockInput, params, onClose) {
          console.log("uiRoot:", this.uiRoot.name, "parent:", this.uiRoot.parent);
          var uiNode = instantiate(prefab);
          this.uiRoot.addChild(uiNode);
          var baseUI = uiNode.getComponent(BaseUI);
          if (baseUI && baseUI.onOpen) {
            baseUI.onOpen(params);
          }

          // 入栈
          this.uiStack.push({
            node: uiNode,
            prefab: prefab,
            blockInput: blockInput,
            onClose: onClose
          });
          this.refreshMask();
          return uiNode;
        }

        /**
         * 关闭当前顶层UI(出栈)
         */;
        _proto.close = function close() {
          if (this.uiStack.length === 0) return;
          var uiStackItem = this.uiStack.pop();
          var baseUI = uiStackItem.node.getComponent(BaseUI);
          if (baseUI && baseUI.onClose) baseUI.onClose();
          if (uiStackItem.onClose) uiStackItem.onClose();
          if (uiStackItem.node && uiStackItem.node.isValid) uiStackItem.node.destroy();
          this.refreshMask();
        }

        /**
         * 关闭所有UI,清空栈(不影响常驻UI)
         */;
        _proto.closeAll = function closeAll() {
          while (this.uiStack.length) {
            var uiStackItem = this.uiStack.pop();
            var baseUI = uiStackItem.node.getComponent(BaseUI);
            if (baseUI && baseUI.onClose) baseUI.onClose();
            if (uiStackItem.onClose) uiStackItem.onClose();
            if (uiStackItem.node && uiStackItem.node.isValid) uiStackItem.node.destroy();
          }
          this.removeMask();
        }

        /**
         * 返回上一页
         */;
        _proto.back = function back() {
          this.close();
        }

        // ==================== 常驻 UI 管理（独立于栈） ====================

        /**
         * 注册一个常驻UI(如分数面板、血量条),不会被closeAll销毁
         * @param key 唯一标识
         * @param node 节点
         */;
        _proto.registerPersistentUI = function registerPersistentUI(key, node) {
          if (this.persistentUIs.has(key)) console.warn("Persistent UI with key \"" + key + "\" already exists, overwriting.");
          this.persistentUIs.set(key, node);
        }

        /**
         * 获得UI节点
         * @param key UI唯一标识
         * @returns Node UI节点
         */;
        _proto.getPersistentUI = function getPersistentUI(key) {
          return this.persistentUIs.get(key) || null;
        }

        /**
         * 移除常驻UI(一般不需要主动调用，场景切换时会自动清理)
         * @param key UI唯一标识
         */;
        _proto.unregisterPersistentUI = function unregisterPersistentUI(key) {
          this.persistentUIs["delete"](key);
        }

        // ==================== 遮罩管理 ====================

        // 刷新遮罩
        ;

        _proto.refreshMask = function refreshMask() {
          this.removeMask();
          if (this.uiStack.length === 0) return;
          var top = this.uiStack[this.uiStack.length - 1];
          if (top.blockInput) this.addMask(top.node);
        }

        // 去除遮罩
        ;

        _proto.removeMask = function removeMask() {
          if (this.currentMask && this.currentMask.isValid) {
            this.currentMask.destroy();
          }
          this.currentMask = null;
        };
        _proto.addMask = function addMask(targetNode) {
          if (this.currentMask) return;
          // 动态创建全屏半透明遮罩
          var maskNode = new Node('UIMask');
          var uiTransform = maskNode.addComponent(UITransform);
          uiTransform.setContentSize(1280, 720);
          maskNode.addComponent(BlockInput);
          maskNode.layer = this.uiRoot.layer;
          this.uiRoot.insertChild(maskNode, this.uiRoot.children.indexOf(targetNode));
          this.currentMask = maskNode;
        }

        // ---常驻UI接口---
        ;

        _proto.updateScore = function updateScore(value) {
          Score.value += value;
          var scoreNode = this.persistentUIs.get('scoreLabel');
          if (scoreNode) {
            var scoreLabel = scoreNode.getComponent(Label);
            scoreLabel.string = Score.value.toString();
            scoreLabel.node.setScale(new Vec3(1, 1, 1));
            tween(scoreLabel.node).to(0.1, {
              scale: new Vec3(1.3, 1.3, 1)
            }).to(0.1, {
              scale: new Vec3(1, 1, 1)
            }).start();
          }
        };
        _createClass(UIManager, null, [{
          key: "instance",
          get: function get() {
            return this._instance;
          }
        }]);
        return UIManager;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gameOverUIPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pausePanelPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "levelSelectPanelPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playerSelectPanePrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "propSelectPanelPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "loadingPanel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

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