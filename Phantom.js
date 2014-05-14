/**
* Created by RockyF on 14-5-12.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Stage = (function () {
    function Stage(canvas, root) {
        var _this = this;
        this.onTimer = function () {
            _this.root.draw();
        };
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        root.root = root;
        root.stage = this;
        this.root = root;
        Graphics.context = this.context;
    }
    Stage.prototype.start = function () {
        this.stop();

        setInterval(this.onTimer, 1000 / this.frameRate);
    };

    Stage.prototype.stop = function () {
        if (this.sign > 0) {
            clearInterval(this.sign);
        }
    };
    return Stage;
})();

var PEvent = (function () {
    function PEvent(type) {
        this.type = type;
    }
    PEvent.ACTIVATE = 'activate';
    PEvent.ADDED = 'added';
    PEvent.ADDED_TO_STAGE = 'addedToStage';
    PEvent.CANCEL = 'cancel';
    PEvent.CHANGE = 'change';
    PEvent.CLEAR = 'clear';
    PEvent.COMPLETE = 'complete';
    PEvent.CONNECT = 'connect';
    PEvent.COPY = 'copy';
    PEvent.CUT = 'cut';
    PEvent.DEACTIVATE = 'deactivate';
    PEvent.DISPLAYING = 'displaying';
    PEvent.ENTER_FRAME = 'enterFrame';
    PEvent.EXIT_FRAME = 'exitFrame';
    PEvent.FRAME_CONSTRUCTED = 'frameConstructed';
    PEvent.FULLSCREEN = 'fullScreen';
    PEvent.INIT = 'init';
    PEvent.MOUSE_LEAVE = 'mouseLeave';
    PEvent.OPEN = 'open';
    PEvent.PASTE = 'pause';
    PEvent.REMOVED = 'remove';
    PEvent.REMOVED_FROM_STAGE = 'removedFromStage';
    PEvent.RENDER = 'render';
    PEvent.RESIZE = 'resize';
    PEvent.SCROLL = 'scroll';
    PEvent.SELECT = 'select';
    PEvent.SELECT_ALL = 'selectAll';
    PEvent.SOUND_COMPLETE = 'soundComplete';
    PEvent.TAB_CHILDREN_CHANGE = 'tabChildrenChange';
    PEvent.TAB_ENABLED_CHANGE = 'tabEnabledChange';
    PEvent.TAB_INDEX_CHANGE = 'tabIndexChange';
    PEvent.UNLOAD = 'unload';
    return PEvent;
})();

var PMouseEvent = (function () {
    function PMouseEvent() {
    }
    PMouseEvent.MOUSE_MOVE = 'mouseMove';
    PMouseEvent.MOUSE_DOWN = 'mouseMove';
    PMouseEvent.MOUSE_UP = 'mouseUp';
    PMouseEvent.MOUSE_OVER = 'mouseOver';
    PMouseEvent.MOUSE_OUT = 'mouseOut';
    PMouseEvent.ROLL_OVER = 'rollOver';
    PMouseEvent.ROLL_OUT = 'rollOut';
    return PMouseEvent;
})();

var EventDispatcher = (function () {
    function EventDispatcher() {
        this.listenersMap = [];
    }
    EventDispatcher.prototype.addEventListener = function (type, listener) {
        var listeners = this.listenersMap[type];
        if (!listeners) {
            listeners = this.listenersMap[type] = [];
        }

        listeners.push(listener);
    };

    EventDispatcher.prototype.dispatchEvent = function (event) {
        var listeners = this.listenersMap[event.type];
        if (listeners) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].call(this, event);
            }
        }
    };

    EventDispatcher.prototype.hasEventListener = function (type) {
        return this.listenersMap[type];
    };
    return EventDispatcher;
})();

var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.format = function (fmt) {
        var params = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            params[_i] = arguments[_i + 1];
        }
        var result = fmt;
        for (var i = 0, len = params.length; i < len; i++) {
            result = result.replace('{' + i + '}', params[i]);
        }

        return result;
    };
    return StringUtils;
})();

var Color = (function () {
    function Color(color, alpha) {
        if (typeof color === "undefined") { color = 0; }
        if (typeof alpha === "undefined") { alpha = 1; }
        this.color = 0;
        this.alpha = 1;
        this.color = color;
        this.alpha = alpha;
    }
    Color.prototype.toWeb = function () {
        var b = this.color % 256;
        var g = (this.color >> 8) % 256;
        var r = this.color >> 16;
        return StringUtils.format('rgba({0}, {1}, {2}, {3})', r, g, b, this.alpha);
    };

    Color.prototype.toHex = function () {
        return '#' + this.color.toString(16);
    };

    Color.prototype.fromWeb = function (value) {
        value = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
        var arr = value.split(',');

        var r = parseInt(arr[0]);
        var g = parseInt(arr[1]);
        var b = parseInt(arr[2]);
        this.color = r << 16 + g << 8 + b;
        if (arr.length == 4) {
            this.alpha = parseFloat(arr[3]);
        }
    };

    Color.prototype.fromHex = function (value) {
        if (value.indexOf('#')) {
            value = value.substr(0);
        }
        this.color = parseInt(value, 16);
    };
    return Color;
})();

var Point = (function () {
    function Point(x, y) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Point.prototype.distance = function (p) {
        return Math.sqrt((p.x + this.x) * (p.x + this.x) + (p.y + this.y) * (p.y + this.y));
    };
    return Point;
})();

var Rect = (function () {
    function Rect(x, y, width, height) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof width === "undefined") { width = 0; }
        if (typeof height === "undefined") { height = 0; }
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rect.prototype.containsPoint = function (point) {
        return point.x > this.x && point.y > this.y && point.x < this.x + this.width && point.y < this.y + this.height;
    };
    return Rect;
})();

var Graphics = (function () {
    function Graphics() {
    }
    return Graphics;
})();

var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        var _this = this;
        _super.call(this);
        this.children = [];
        this.broadcastAddedToStage = function (child) {
            child.stage = child.parent.stage;
            child.root = child.parent.root;
            child.dispatchEvent(new PEvent(PEvent.ADDED_TO_STAGE));
            for (var i = 0, len = _this.children; i < len; i++) {
                child.broadcastAddedToStage(_this.children[i]);
            }
        };
        this.broadcastRemovedFromStage = function (child) {
            child.stage = null;
            child.root = null;
            child.dispatchEvent(new PEvent(PEvent.REMOVED_FROM_STAGE));
            for (var i = 0, len = _this.children; i < len; i++) {
                child.broadcastRemovedFromStage(_this.children[i]);
            }
        };
    }
    DisplayObject.prototype.draw = function () {
    };

    DisplayObject.prototype.contains = function (child) {
        return this.getChildIndex(child) >= 0;
    };

    DisplayObject.prototype.getChildIndex = function (child) {
        return this.children.indexOf(child);
    };

    DisplayObject.prototype.setChildIndex = function (child, index) {
        if (this.contains(child) && index >= 0 && index < this.children.length) {
            this.children.splice(this.getChildIndex(child), 1);
            this.children.splice(index, 0, child);
        }
        return this;
    };

    DisplayObject.prototype.addChild = function (child) {
        if (!this.contains(child)) {
            child.remove();
            child.parent = this;
            child.root = this.root;
            this.children.push(child);

            child.dispatchEvent(new PEvent(PEvent.ADDED));
            if (this.stage) {
                this.broadcastAddedToStage(child);
            }
        }
        return this;
    };

    DisplayObject.prototype.addChildAt = function (child, index) {
        this.addChild(child);
        this.setChildIndex(child, index);
        return this;
    };

    DisplayObject.prototype.getChildAt = function (index) {
        if (index >= 0 && index < this.children.length) {
            return this.children[index];
        }

        return null;
    };

    DisplayObject.prototype.remove = function () {
        if (this.parent) {
            this.parent.removeChild(this);

            return true;
        }
        return false;
    };

    DisplayObject.prototype.removeChild = function (child) {
        if (this.contains(child)) {
            this.children.splice(this.getChildIndex(child), 1);
            var onStage = child.stage != null;

            child.parent = null;

            child.dispatchEvent(new PEvent(PEvent.REMOVED));
            if (onStage) {
                this.broadcastRemovedFromStage(child);
            }
            return true;
        }
        return this;
    };
    return DisplayObject;
})(EventDispatcher);

var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        _super.apply(this, arguments);
    }
    Shape.prototype.draw = function () {
    };
    return Shape;
})(DisplayObject);

var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite() {
        _super.apply(this, arguments);
    }
    return Sprite;
})(DisplayObject);

var Rectantle = (function (_super) {
    __extends(Rectantle, _super);
    function Rectantle() {
        _super.apply(this, arguments);
    }
    return Rectantle;
})(Shape);
