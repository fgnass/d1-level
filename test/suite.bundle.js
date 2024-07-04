var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js
var init_dirname = __esm({
  "node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js"() {
  }
});

// node_modules/@jspm/core/nodelibs/browser/process.js
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function hrtime(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance.now()) * 1e-3);
  var clocktime = _performance.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec;
    }
  }
  return [seconds, nanoseconds];
}
var env, _performance, nowOffset, nanoPerSec;
var init_process = __esm({
  "node_modules/@jspm/core/nodelibs/browser/process.js"() {
    init_dirname();
    init_buffer2();
    init_process2();
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    env = {
      PATH: "/usr/bin",
      LANG: navigator.language + ".UTF-8",
      PWD: "/",
      HOME: "/home",
      TMP: "/tmp"
    };
    _performance = {
      now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
      timing: typeof performance !== "undefined" ? performance.timing : void 0
    };
    if (_performance.now === void 0) {
      nowOffset = Date.now();
      if (_performance.timing && _performance.timing.navigationStart) {
        nowOffset = _performance.timing.navigationStart;
      }
      _performance.now = () => Date.now() - nowOffset;
    }
    nanoPerSec = 1e9;
    hrtime.bigint = function(time) {
      var diff = hrtime(time);
      if (typeof BigInt === "undefined") {
        return diff[0] * nanoPerSec + diff[1];
      }
      return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
    };
  }
});

// node_modules/esbuild-plugin-polyfill-node/polyfills/process.js
var init_process2 = __esm({
  "node_modules/esbuild-plugin-polyfill-node/polyfills/process.js"() {
    init_process();
  }
});

// node_modules/@jspm/core/nodelibs/browser/buffer.js
var buffer_exports = {};
__export(buffer_exports, {
  Buffer: () => Buffer2,
  INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES,
  default: () => exports,
  kMaxLength: () => kMaxLength
});
function dew$2() {
  if (_dewExec$2) return exports$3;
  _dewExec$2 = true;
  exports$3.byteLength = byteLength;
  exports$3.toByteArray = toByteArray;
  exports$3.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i2 = 0, len = code.length; i2 < len; ++i2) {
    lookup[i2] = code[i2];
    revLookup[code.charCodeAt(i2)] = i2;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i3;
    for (i3 = 0; i3 < len2; i3 += 4) {
      tmp = revLookup[b64.charCodeAt(i3)] << 18 | revLookup[b64.charCodeAt(i3 + 1)] << 12 | revLookup[b64.charCodeAt(i3 + 2)] << 6 | revLookup[b64.charCodeAt(i3 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i3)] << 2 | revLookup[b64.charCodeAt(i3 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i3)] << 10 | revLookup[b64.charCodeAt(i3 + 1)] << 4 | revLookup[b64.charCodeAt(i3 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i3 = start; i3 < end; i3 += 3) {
      tmp = (uint8[i3] << 16 & 16711680) + (uint8[i3 + 1] << 8 & 65280) + (uint8[i3 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i3 = 0, len22 = len2 - extraBytes; i3 < len22; i3 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i3, i3 + maxChunkLength > len22 ? len22 : i3 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
  }
  return exports$3;
}
function dew$1() {
  if (_dewExec$1) return exports$2;
  _dewExec$1 = true;
  exports$2.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e2, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i2 = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s2 = buffer[offset + i2];
    i2 += d;
    e2 = s2 & (1 << -nBits) - 1;
    s2 >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e2 = e2 * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
    }
    m = e2 & (1 << -nBits) - 1;
    e2 >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
    }
    if (e2 === 0) {
      e2 = 1 - eBias;
    } else if (e2 === eMax) {
      return m ? NaN : (s2 ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e2 = e2 - eBias;
    }
    return (s2 ? -1 : 1) * m * Math.pow(2, e2 - mLen);
  };
  exports$2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e2, m, c2;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i2 = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e2 = eMax;
    } else {
      e2 = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c2 = Math.pow(2, -e2)) < 1) {
        e2--;
        c2 *= 2;
      }
      if (e2 + eBias >= 1) {
        value += rt / c2;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c2 >= 2) {
        e2++;
        c2 /= 2;
      }
      if (e2 + eBias >= eMax) {
        m = 0;
        e2 = eMax;
      } else if (e2 + eBias >= 1) {
        m = (value * c2 - 1) * Math.pow(2, mLen);
        e2 = e2 + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e2 = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
    }
    e2 = e2 << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i2] = e2 & 255, i2 += d, e2 /= 256, eLen -= 8) {
    }
    buffer[offset + i2 - d] |= s2 * 128;
  };
  return exports$2;
}
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  const base64 = dew$2();
  const ieee754 = dew$1();
  const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports$1.Buffer = Buffer3;
  exports$1.SlowBuffer = SlowBuffer;
  exports$1.INSPECT_MAX_BYTES = 50;
  const K_MAX_LENGTH = 2147483647;
  exports$1.kMaxLength = K_MAX_LENGTH;
  Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  }
  function typedArraySupport() {
    try {
      const arr = new Uint8Array(1);
      const proto = {
        foo: function() {
          return 42;
        }
      };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e2) {
      return false;
    }
  }
  Object.defineProperty(Buffer3.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer3.isBuffer(this)) return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer3.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer3.isBuffer(this)) return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer3.prototype);
    return buf;
  }
  function Buffer3(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError('The "string" argument must be of type string. Received type number');
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer3.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer3.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
  }
  Buffer3.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer3, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer3.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer3.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer3.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer3.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i2 = 0; i2 < length; i2 += 1) {
      buf[i2] = array[i2] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      const copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer3.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer3.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer3.alloc(+length);
  }
  Buffer3.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer3.prototype;
  };
  Buffer3.compare = function compare(a2, b) {
    if (isInstance(a2, Uint8Array)) a2 = Buffer3.from(a2, a2.offset, a2.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
    if (!Buffer3.isBuffer(a2) || !Buffer3.isBuffer(b)) {
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a2 === b) return 0;
    let x = a2.length;
    let y2 = b.length;
    for (let i2 = 0, len = Math.min(x, y2); i2 < len; ++i2) {
      if (a2[i2] !== b[i2]) {
        x = a2[i2];
        y2 = b[i2];
        break;
      }
    }
    if (x < y2) return -1;
    if (y2 < x) return 1;
    return 0;
  };
  Buffer3.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer3.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer3.alloc(0);
    }
    let i2;
    if (length === void 0) {
      length = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        length += list[i2].length;
      }
    }
    const buffer = Buffer3.allocUnsafe(length);
    let pos = 0;
    for (i2 = 0; i2 < list.length; ++i2) {
      let buf = list[i2];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer.length) {
          if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
          buf.copy(buffer, pos);
        } else {
          Uint8Array.prototype.set.call(buffer, buf, pos);
        }
      } else if (!Buffer3.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer, pos);
      }
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer3.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer3.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding) encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer3.prototype._isBuffer = true;
  function swap(b, n2, m) {
    const i2 = b[n2];
    b[n2] = b[m];
    b[m] = i2;
  }
  Buffer3.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i2 = 0; i2 < len; i2 += 2) {
      swap(this, i2, i2 + 1);
    }
    return this;
  };
  Buffer3.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i2 = 0; i2 < len; i2 += 4) {
      swap(this, i2, i2 + 3);
      swap(this, i2 + 1, i2 + 2);
    }
    return this;
  };
  Buffer3.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i2 = 0; i2 < len; i2 += 8) {
      swap(this, i2, i2 + 7);
      swap(this, i2 + 1, i2 + 6);
      swap(this, i2 + 2, i2 + 5);
      swap(this, i2 + 3, i2 + 4);
    }
    return this;
  };
  Buffer3.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
  Buffer3.prototype.equals = function equals(b) {
    if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer3.compare(this, b) === 0;
  };
  Buffer3.prototype.inspect = function inspect() {
    let str = "";
    const max = exports$1.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
  }
  Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer3.from(target, target.offset, target.byteLength);
    }
    if (!Buffer3.isBuffer(target)) {
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y2 = end - start;
    const len = Math.min(x, y2);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i2 = 0; i2 < len; ++i2) {
      if (thisCopy[i2] !== targetCopy[i2]) {
        x = thisCopy[i2];
        y2 = targetCopy[i2];
        break;
      }
    }
    if (x < y2) return -1;
    if (y2 < x) return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1;
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1;
    }
    if (typeof val === "string") {
      val = Buffer3.from(val, encoding);
    }
    if (Buffer3.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i3) {
      if (indexSize === 1) {
        return buf[i3];
      } else {
        return buf.readUInt16BE(i3 * indexSize);
      }
    }
    let i2;
    if (dir) {
      let foundIndex = -1;
      for (i2 = byteOffset; i2 < arrLength; i2++) {
        if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
          if (foundIndex === -1) foundIndex = i2;
          if (i2 - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i2 -= i2 - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i2 = byteOffset; i2 >= 0; i2--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i2 + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found) return i2;
      }
    }
    return -1;
  }
  Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i2;
    for (i2 = 0; i2 < length; ++i2) {
      const parsed = parseInt(string.substr(i2 * 2, 2), 16);
      if (numberIsNaN(parsed)) return i2;
      buf[offset + i2] = parsed;
    }
    return i2;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer3.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0) encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer3.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i2 = start;
    while (i2 < end) {
      const firstByte = buf[i2];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i2 + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i2 + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i2 + 1];
            thirdByte = buf[i2 + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i2 + 1];
            thirdByte = buf[i2 + 2];
            fourthByte = buf[i2 + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i2 += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  const MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i2 = 0;
    while (i2 < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i2 = start; i2 < end; ++i2) {
      ret += String.fromCharCode(buf[i2] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i2 = start; i2 < end; ++i2) {
      ret += String.fromCharCode(buf[i2]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for (let i2 = start; i2 < end; ++i2) {
      out += hexSliceLookupTable[buf[i2]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
      res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
    }
    return res;
  }
  Buffer3.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer3.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i2 = 0;
    while (++i2 < byteLength2 && (mul *= 256)) {
      val += this[offset + i2] * mul;
    }
    return val;
  };
  Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength2, this.length);
    }
    let val = this[offset + --byteLength2];
    let mul = 1;
    while (byteLength2 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength2] * mul;
    }
    return val;
  };
  Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
  Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
  Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i2 = 0;
    while (++i2 < byteLength2 && (mul *= 256)) {
      val += this[offset + i2] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    let i2 = byteLength2;
    let mul = 1;
    let val = this[offset + --i2];
    while (i2 > 0 && (mul *= 256)) {
      val += this[offset + --i2] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128)) return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
  });
  Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
  });
  Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
  }
  Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let mul = 1;
    let i2 = 0;
    this[offset] = value & 255;
    while (++i2 < byteLength2 && (mul *= 256)) {
      this[offset + i2] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let i2 = byteLength2 - 1;
    let mul = 1;
    this[offset + i2] = value & 255;
    while (--i2 >= 0 && (mul *= 256)) {
      this[offset + i2] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i2 = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i2 < byteLength2 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
        sub = 1;
      }
      this[offset + i2] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i2 = byteLength2 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i2] = value & 255;
    while (--i2 >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
        sub = 1;
      }
      this[offset + i2] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
    if (value < 0) value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    }
    return len;
  };
  Buffer3.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code = val.charCodeAt(0);
        if (encoding === "utf8" && code < 128 || encoding === "latin1") {
          val = code;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val) val = 0;
    let i2;
    if (typeof val === "number") {
      for (i2 = start; i2 < end; ++i2) {
        this[i2] = val;
      }
    } else {
      const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i2 = 0; i2 < end - start; ++i2) {
        this[i2 + start] = bytes[i2 % len];
      }
    }
    return this;
  };
  const errors = {};
  function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E("ERR_BUFFER_OUT_OF_BOUNDS", function(name2) {
    if (name2) {
      return `${name2} is outside of buffer bounds`;
    }
    return "Attempt to access memory outside buffer bounds";
  }, RangeError);
  E("ERR_INVALID_ARG_TYPE", function(name2, actual) {
    return `The "${name2}" argument must be of type number. Received type ${typeof actual}`;
  }, TypeError);
  E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input));
    } else if (typeof input === "bigint") {
      received = String(input);
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received);
      }
      received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
  }, RangeError);
  function addNumericalSeparator(val) {
    let res = "";
    let i2 = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i2 >= start + 4; i2 -= 3) {
      res = `_${val.slice(i2 - 3, i2)}${res}`;
    }
    return `${val.slice(0, i2)}${res}`;
  }
  function checkBounds(buf, offset, byteLength2) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
      boundsError(offset, buf.length - (byteLength2 + 1));
    }
  }
  function checkIntBI(value, min, max, buf, offset, byteLength2) {
    if (value > max || value < min) {
      const n2 = typeof min === "bigint" ? "n" : "";
      let range;
      if (byteLength2 > 3) {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n2} and < 2${n2} ** ${(byteLength2 + 1) * 8}${n2}`;
        } else {
          range = `>= -(2${n2} ** ${(byteLength2 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n2}`;
        }
      } else {
        range = `>= ${min}${n2} and <= ${max}${n2}`;
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength2);
  }
  function validateNumber(value, name2) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name2, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
  }
  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i2 = 0; i2 < length; ++i2) {
      codePoint = string.charCodeAt(i2);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i2 + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i2 = 0; i2 < str.length; ++i2) {
      byteArray.push(str.charCodeAt(i2) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c2, hi, lo;
    const byteArray = [];
    for (let i2 = 0; i2 < str.length; ++i2) {
      if ((units -= 2) < 0) break;
      c2 = str.charCodeAt(i2);
      hi = c2 >> 8;
      lo = c2 % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i2;
    for (i2 = 0; i2 < length; ++i2) {
      if (i2 + offset >= dst.length || i2 >= src.length) break;
      dst[i2 + offset] = src[i2];
    }
    return i2;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i2 = 0; i2 < 16; ++i2) {
      const i16 = i2 * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i2] + alphabet[j];
      }
    }
    return table;
  }();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
  return exports$1;
}
var exports$3, _dewExec$2, exports$2, _dewExec$1, exports$1, _dewExec, exports, Buffer2, INSPECT_MAX_BYTES, kMaxLength;
var init_buffer = __esm({
  "node_modules/@jspm/core/nodelibs/browser/buffer.js"() {
    init_dirname();
    init_buffer2();
    init_process2();
    exports$3 = {};
    _dewExec$2 = false;
    exports$2 = {};
    _dewExec$1 = false;
    exports$1 = {};
    _dewExec = false;
    exports = dew();
    exports["Buffer"];
    exports["SlowBuffer"];
    exports["INSPECT_MAX_BYTES"];
    exports["kMaxLength"];
    Buffer2 = exports.Buffer;
    INSPECT_MAX_BYTES = exports.INSPECT_MAX_BYTES;
    kMaxLength = exports.kMaxLength;
  }
});

// node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js
var init_buffer2 = __esm({
  "node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js"() {
    init_buffer();
  }
});

// node_modules/abstract-level/test/common.js
var require_common = __commonJS({
  "node_modules/abstract-level/test/common.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var kNone = Symbol("none");
    var kProtected = Symbol("protected");
    function testCommon(options) {
      const factory = options.factory;
      const test = options.test;
      if (typeof factory !== "function") {
        throw new TypeError("factory must be a function");
      }
      if (typeof test !== "function") {
        throw new TypeError("test must be a function");
      }
      if (options.legacyRange != null) {
        throw new Error("The legacyRange option has been removed");
      }
      let supports = kNone;
      return protect(options, {
        test,
        factory,
        internals: options.internals || {},
        // Expose manifest through testCommon to more easily skip tests based on
        // supported features. Use a getter to only create a db once. Implicitly
        // we also test that the manifest doesn't change after the db constructor.
        get supports() {
          if (supports === kNone) this.supports = this.factory().supports;
          return supports;
        },
        // Prefer assigning early via manifest-test unless test.only() is used
        // in which case we create the manifest on-demand. Copy it to be safe.
        set supports(value) {
          if (supports === kNone) supports = JSON.parse(JSON.stringify(value));
        }
      });
    }
    module.exports = testCommon;
    function protect(options, testCommon2) {
      const legacyOptions = [
        ["createIfMissing", true],
        ["errorIfExists", true],
        ["snapshots", true],
        ["seek", true],
        ["encodings", true],
        ["deferredOpen", true],
        ["streams", true],
        ["clear", true],
        ["getMany", true],
        ["bufferKeys", false],
        ["serialize", false],
        ["idempotentOpen", false],
        ["passiveOpen", false],
        ["openCallback", false]
      ];
      Object.defineProperty(testCommon2, kProtected, {
        value: true
      });
      for (const [k, exists] of legacyOptions) {
        const msg = exists ? "has moved to db.supports" : "has been removed";
        if (!options[kProtected] && k in options) {
          throw new Error(`The test suite option '${k}' ${msg}`);
        }
        Object.defineProperty(testCommon2, k, {
          get() {
            throw new Error(`The test suite option '${k}' ${msg}`);
          },
          set() {
            throw new Error(`The test suite option '${k}' ${msg}`);
          }
        });
      }
      return testCommon2;
    }
  }
});

// node_modules/abstract-level/test/factory-test.js
var require_factory_test = __commonJS({
  "node_modules/abstract-level/test/factory-test.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    module.exports = function(test, testCommon) {
      test("testCommon.factory() returns valid database", function(t2) {
        t2.plan(6);
        const db = testCommon.factory();
        const kEvent = Symbol("event");
        t2.is(typeof db, "object", "is an object");
        t2.isNot(db, null, "is not null");
        t2.is(typeof db.open, "function", "has open() method");
        t2.is(typeof db.on, "function", "has on() method");
        t2.is(typeof db.emit, "function", "has emit() method");
        db.once(kEvent, (v2) => t2.is(v2, "foo", "got event"));
        db.emit(kEvent, "foo");
      });
      test("testCommon.factory() returns a unique database", async function(t2) {
        const db1 = testCommon.factory();
        const db2 = testCommon.factory();
        t2.isNot(db1, db2, "unique instances");
        await db1.open();
        await db2.open();
        await db1.put("key", "value");
        const value = await db2.get("key");
        t2.is(value, void 0, "db2 should be empty");
        return Promise.all([db1.close(), db2.close()]);
      });
    };
  }
});

// node_modules/level-supports/test/shape.js
var require_shape = __commonJS({
  "node_modules/level-supports/test/shape.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = function shape(t2, manifest) {
      t2.ok(isObject(manifest), "manifest is object");
      t2.ok(isObject(manifest.additionalMethods), "additionalMethods is object");
      t2.ok(isObject(manifest.signals), "signals is object");
      for (const k in manifest) {
        if (!hasOwnProperty.call(manifest, k)) continue;
        if (manifest[k]) {
          t2.ok(manifest[k], "truthy: " + k);
        } else {
          t2.is(manifest[k], false, "false: " + k);
        }
      }
    };
    function isObject(o2) {
      return typeof o2 === "object" && o2 !== null;
    }
  }
});

// node_modules/level-supports/index.js
var require_level_supports = __commonJS({
  "node_modules/level-supports/index.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.supports = function supports(...manifests) {
      const manifest = manifests.reduce((acc, m) => Object.assign(acc, m), {});
      return Object.assign(manifest, {
        snapshots: manifest.snapshots || false,
        permanence: manifest.permanence || false,
        seek: manifest.seek || false,
        createIfMissing: manifest.createIfMissing || false,
        errorIfExists: manifest.errorIfExists || false,
        deferredOpen: manifest.deferredOpen || false,
        streams: manifest.streams || false,
        encodings: Object.assign({}, manifest.encodings),
        events: Object.assign({}, manifest.events),
        additionalMethods: Object.assign({}, manifest.additionalMethods),
        signals: Object.assign({}, manifest.signals)
      });
    };
  }
});

// node_modules/level-supports/test/cloneable.js
var require_cloneable = __commonJS({
  "node_modules/level-supports/test/cloneable.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { supports } = require_level_supports();
    module.exports = function cloneable(t2, manifest) {
      const copy = supports(manifest);
      verifyUnique(t2, "manifest", manifest, copy);
    };
    function verifyUnique(t2, path, a2, b) {
      if (isObject(a2) && isObject(b)) {
        t2.ok(a2 !== b, path + " has unique identity");
        Object.keys(a2).forEach(function(key) {
          verifyUnique(t2, path + "." + key, a2[key], b[key]);
        });
      }
    }
    function isObject(o2) {
      return typeof o2 === "object" && o2 !== null;
    }
  }
});

// node_modules/level-supports/test/index.js
var require_test = __commonJS({
  "node_modules/level-supports/test/index.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var shape = require_shape();
    var cloneable = require_cloneable();
    module.exports = function suite2(test, testCommon) {
      test("db has manifest", async function(t2) {
        const db = testCommon.factory();
        const manifest = db.supports;
        shape(t2, manifest);
        cloneable(t2, manifest);
        const before = Object.assign({}, manifest, {
          additionalMethods: Object.assign({}, manifest.additionalMethods)
        });
        await db.open();
        t2.same(db.supports, before, "manifest did not change after open");
        await db.close();
        t2.same(db.supports, before, "manifest did not change after close");
      });
    };
  }
});

// node_modules/abstract-level/test/manifest-test.js
var require_manifest_test = __commonJS({
  "node_modules/abstract-level/test/manifest-test.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var suite2 = require_test();
    module.exports = function(test, testCommon) {
      suite2(test, testCommon);
      test("manifest has expected properties", async function(t2) {
        const db = testCommon.factory();
        t2.is(db.supports.deferredOpen, true);
        testCommon.supports = db.supports;
        t2.ok(testCommon.supports, "can be accessed via testCommon");
        t2.ok(db.supports.encodings.utf8, "supports utf8");
        t2.ok(db.supports.encodings.json, "supports json");
        return db.close();
      });
    };
  }
});

// node_modules/abstract-level/test/open-test.js
var require_open_test = __commonJS({
  "node_modules/abstract-level/test/open-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.open = function(test, testCommon) {
      test("open() and close(), no options", async function(t2) {
        const db = testCommon.factory();
        t2.is(db.status, "opening");
        const promise1 = db.open();
        t2.is(db.status, "opening");
        await promise1;
        t2.is(db.status, "open");
        const promise2 = db.close();
        t2.is(db.status, "closing");
        await promise2;
        t2.is(db.status, "closed");
      });
      test("open() and close(), with empty options", async function(t2) {
        const db = testCommon.factory();
        await db.open({});
        return db.close();
      });
      test("open(), close() and open()", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        t2.is(db.status, "open");
        await db.close();
        t2.is(db.status, "closed");
        await db.open();
        t2.is(db.status, "open");
        return db.close();
      });
      test("open() and close() in same tick", function(t2) {
        t2.plan(5);
        const db = testCommon.factory();
        const order = [];
        db.open().then(function() {
          order.push("A");
          t2.is(db.status, "open", "is open");
        });
        t2.is(db.status, "opening", "is opening");
        db.close().then(function() {
          order.push("B");
          t2.same(order, ["open event", "A", "closed event", "B"], "order is correct");
          t2.is(db.status, "closed", "is closed");
        });
        t2.is(db.status, "opening", "is still opening");
        db.on("open", () => {
          order.push("open event");
        });
        db.on("closed", () => {
          order.push("closed event");
        });
      });
      test("open(), close() and open() in same tick", function(t2) {
        t2.plan(8);
        const db = testCommon.factory();
        const order = [];
        db.open().then(function() {
          order.push("A");
          t2.is(db.status, "open", "is open");
        });
        t2.is(db.status, "opening", "is opening");
        db.close().then(function() {
          order.push("B");
          t2.is(db.status, "closed", "is closed");
        });
        t2.is(db.status, "opening", "is still opening");
        db.open().then(function() {
          order.push("C");
          t2.same(order, ["open event", "A", "closed event", "B", "open event", "C"], "callback order is the same as call order");
          t2.is(db.status, "open", "is open");
          db.close().then(() => t2.pass("done"));
        });
        db.on("closed", () => {
          order.push("closed event");
        });
        db.on("open", () => {
          order.push("open event");
        });
        t2.is(db.status, "opening", "is still opening");
      });
      test("open() if already open (sequential)", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        await db.open();
        t2.is(db.status, "open", "is open");
        const promise = db.open();
        t2.is(db.status, "open", "not reopening");
        db.on("open", t2.fail.bind(t2));
        await promise;
        t2.is(db.status, "open", "is open");
        return db.close();
      });
      test("open() if already opening (parallel)", function(t2) {
        t2.plan(4);
        const db = testCommon.factory();
        let called = false;
        db.open().then(function() {
          called = true;
          t2.is(db.status, "open");
        });
        db.open().then(function() {
          t2.is(db.status, "open");
          t2.ok(called);
          db.close(() => t2.pass("done"));
        });
        t2.is(db.status, "opening");
      });
      test("close() if already closed", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        await db.open();
        await db.close();
        t2.is(db.status, "closed", "is closed");
        const promise = db.close();
        t2.is(db.status, "closed", "is closed", "not reclosing");
        db.on("closed", t2.fail.bind(t2));
        await promise;
        t2.is(db.status, "closed", "still closed");
      });
      test("close() if new", function(t2) {
        t2.plan(4);
        const db = testCommon.factory();
        t2.is(db.status, "opening", "status ok");
        db.close().then(function() {
          t2.is(db.status, "closed", "status ok");
        });
        t2.is(db.status, "closing", "status ok");
        if (!db.supports.deferredOpen) {
          t2.pass("skip");
          db.on("closed", t2.fail.bind(t2, "should not emit closed"));
        } else {
          db.on("closed", t2.pass.bind(t2, "got closed event"));
        }
      });
      for (const event of ["open", "opening"]) {
        test(`close() on ${event} event`, function(t2) {
          t2.plan(3);
          const db = testCommon.factory();
          const order = [];
          db.on(event, function() {
            order.push(`${event} event`);
            db.close().then(function() {
              order.push("B");
              t2.same(order, [`${event} event`, "A", "closed event", "B"], "order is correct");
              t2.is(db.status, "closed", "is closed");
            }, t2.fail.bind(t2));
          });
          db.open().then(function() {
            order.push("A");
            t2.is(db.status, "open", "is open");
          }, t2.fail.bind(t2));
          db.on("closed", () => {
            order.push("closed event");
          });
        });
      }
      for (const event of ["closed", "closing"]) {
        test(`open() on ${event} event`, function(t2) {
          t2.plan(3);
          const db = testCommon.factory();
          const order = [];
          db.on(event, function() {
            order.push(`${event} event`);
            db.open().then(function() {
              order.push("B");
              t2.same(order, [`${event} event`, "A", "open event", "B"], "order is correct");
              t2.is(db.status, "open", "is open");
            }, t2.fail.bind(t2));
          });
          db.close().then(function() {
            order.push("A");
            t2.is(db.status, "closed", "is closed");
          }, t2.fail.bind(t2));
          db.on("open", () => {
            order.push("open event");
          });
        });
      }
      test("passive open()", async function(t2) {
        t2.plan(1);
        const db = testCommon.factory();
        await db.open({ passive: true });
        await db.close();
        await db.open({ passive: true }).catch((err) => {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
        });
        await db.open();
        await db.open({ passive: true });
        return db.close();
      });
      test("passive option is ignored if set in constructor options", async function(t2) {
        const db = testCommon.factory({ passive: true });
        await new Promise((resolve) => db.once("open", resolve));
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.open(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/open-create-if-missing-test.js
var require_open_create_if_missing_test = __commonJS({
  "node_modules/abstract-level/test/open-create-if-missing-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.createIfMissing = function(test, testCommon) {
      test("open() with createIfMissing: false", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        try {
          await db.open({ createIfMissing: false });
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
          t2.ok(/does not exist/.test(err.cause.message), "error is about dir not existing");
        }
        return db.close();
      });
      test("open() with createIfMissing: false via constructor", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory({ createIfMissing: false });
        try {
          await db.open();
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
          t2.ok(/does not exist/.test(err.cause.message), "error is about dir not existing");
        }
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.createIfMissing(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/open-error-if-exists-test.js
var require_open_error_if_exists_test = __commonJS({
  "node_modules/abstract-level/test/open-error-if-exists-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.errorIfExists = function(test, testCommon) {
      test("open() with errorIfExists: true", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        await db.open();
        await db.close();
        try {
          await db.open({ createIfMissing: false, errorIfExists: true });
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
          t2.ok(/exists/.test(err.cause.message), "error is about already existing");
        }
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.errorIfExists(test, testCommon);
    };
  }
});

// node_modules/module-error/index.js
var require_module_error = __commonJS({
  "node_modules/module-error/index.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    module.exports = class ModuleError extends Error {
      /**
       * @param {string} message Error message
       * @param {{ code?: string, cause?: Error, expected?: boolean, transient?: boolean }} [options]
       */
      constructor(message, options) {
        super(message || "");
        if (typeof options === "object" && options !== null) {
          if (options.code) this.code = String(options.code);
          if (options.expected) this.expected = true;
          if (options.transient) this.transient = true;
          if (options.cause) this.cause = options.cause;
        }
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    };
  }
});

// node_modules/level-transcoder/lib/text-endec.js
var require_text_endec = __commonJS({
  "node_modules/level-transcoder/lib/text-endec.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var lazy = null;
    module.exports = function() {
      if (lazy === null) {
        lazy = {
          textEncoder: new TextEncoder(),
          textDecoder: new TextDecoder()
        };
      }
      return lazy;
    };
  }
});

// node_modules/level-transcoder/lib/encoding.js
var require_encoding = __commonJS({
  "node_modules/level-transcoder/lib/encoding.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var ModuleError = require_module_error();
    var formats = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
    var Encoding = class {
      /**
       * @param {IEncoding<TIn,TFormat,TOut>} options
       */
      constructor(options) {
        this.encode = options.encode || this.encode;
        this.decode = options.decode || this.decode;
        this.name = options.name || this.name;
        this.format = options.format || this.format;
        if (typeof this.encode !== "function") {
          throw new TypeError("The 'encode' property must be a function");
        }
        if (typeof this.decode !== "function") {
          throw new TypeError("The 'decode' property must be a function");
        }
        this.encode = this.encode.bind(this);
        this.decode = this.decode.bind(this);
        if (typeof this.name !== "string" || this.name === "") {
          throw new TypeError("The 'name' property must be a string");
        }
        if (typeof this.format !== "string" || !formats.has(this.format)) {
          throw new TypeError("The 'format' property must be one of 'buffer', 'view', 'utf8'");
        }
        if (options.createViewTranscoder) {
          this.createViewTranscoder = options.createViewTranscoder;
        }
        if (options.createBufferTranscoder) {
          this.createBufferTranscoder = options.createBufferTranscoder;
        }
        if (options.createUTF8Transcoder) {
          this.createUTF8Transcoder = options.createUTF8Transcoder;
        }
      }
      get commonName() {
        return (
          /** @type {string} */
          this.name.split("+")[0]
        );
      }
      /** @return {BufferFormat<TIn,TOut>} */
      createBufferTranscoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'buffer'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
      /** @return {ViewFormat<TIn,TOut>} */
      createViewTranscoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'view'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
      /** @return {UTF8Format<TIn,TOut>} */
      createUTF8Transcoder() {
        throw new ModuleError(`Encoding '${this.name}' cannot be transcoded to 'utf8'`, {
          code: "LEVEL_ENCODING_NOT_SUPPORTED"
        });
      }
    };
    exports2.Encoding = Encoding;
  }
});

// node_modules/level-transcoder/lib/formats.js
var require_formats = __commonJS({
  "node_modules/level-transcoder/lib/formats.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports)) || {};
    var { Encoding } = require_encoding();
    var textEndec = require_text_endec();
    var BufferFormat = class extends Encoding {
      /**
       * @param {Omit<IEncoding<TIn, Buffer, TOut>, 'format'>} options
       */
      constructor(options) {
        super({ ...options, format: "buffer" });
      }
      /** @override */
      createViewTranscoder() {
        return new ViewFormat({
          encode: this.encode,
          // Buffer is a view (UInt8Array)
          decode: (data) => this.decode(
            Buffer3.from(data.buffer, data.byteOffset, data.byteLength)
          ),
          name: `${this.name}+view`
        });
      }
      /** @override */
      createBufferTranscoder() {
        return this;
      }
    };
    var ViewFormat = class extends Encoding {
      /**
       * @param {Omit<IEncoding<TIn, Uint8Array, TOut>, 'format'>} options
       */
      constructor(options) {
        super({ ...options, format: "view" });
      }
      /** @override */
      createBufferTranscoder() {
        return new BufferFormat({
          encode: (data) => {
            const view = this.encode(data);
            return Buffer3.from(view.buffer, view.byteOffset, view.byteLength);
          },
          decode: this.decode,
          // Buffer is a view (UInt8Array)
          name: `${this.name}+buffer`
        });
      }
      /** @override */
      createViewTranscoder() {
        return this;
      }
    };
    var UTF8Format = class extends Encoding {
      /**
       * @param {Omit<IEncoding<TIn, string, TOut>, 'format'>} options
       */
      constructor(options) {
        super({ ...options, format: "utf8" });
      }
      /** @override */
      createBufferTranscoder() {
        return new BufferFormat({
          encode: (data) => Buffer3.from(this.encode(data), "utf8"),
          decode: (data) => this.decode(data.toString("utf8")),
          name: `${this.name}+buffer`
        });
      }
      /** @override */
      createViewTranscoder() {
        const { textEncoder, textDecoder } = textEndec();
        return new ViewFormat({
          encode: (data) => textEncoder.encode(this.encode(data)),
          decode: (data) => this.decode(textDecoder.decode(data)),
          name: `${this.name}+view`
        });
      }
      /** @override */
      createUTF8Transcoder() {
        return this;
      }
    };
    exports2.BufferFormat = BufferFormat;
    exports2.ViewFormat = ViewFormat;
    exports2.UTF8Format = UTF8Format;
  }
});

// node_modules/level-transcoder/lib/encodings.js
var require_encodings = __commonJS({
  "node_modules/level-transcoder/lib/encodings.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports)) || { Buffer: { isBuffer: () => false } };
    var { textEncoder, textDecoder } = require_text_endec()();
    var { BufferFormat, ViewFormat, UTF8Format } = require_formats();
    var identity = (v2) => v2;
    exports2.utf8 = new UTF8Format({
      encode: function(data) {
        return Buffer3.isBuffer(data) ? data.toString("utf8") : ArrayBuffer.isView(data) ? textDecoder.decode(data) : String(data);
      },
      decode: identity,
      name: "utf8",
      createViewTranscoder() {
        return new ViewFormat({
          encode: function(data) {
            return ArrayBuffer.isView(data) ? data : textEncoder.encode(data);
          },
          decode: function(data) {
            return textDecoder.decode(data);
          },
          name: `${this.name}+view`
        });
      },
      createBufferTranscoder() {
        return new BufferFormat({
          encode: function(data) {
            return Buffer3.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer3.from(data.buffer, data.byteOffset, data.byteLength) : Buffer3.from(String(data), "utf8");
          },
          decode: function(data) {
            return data.toString("utf8");
          },
          name: `${this.name}+buffer`
        });
      }
    });
    exports2.json = new UTF8Format({
      encode: JSON.stringify,
      decode: JSON.parse,
      name: "json"
    });
    exports2.buffer = new BufferFormat({
      encode: function(data) {
        return Buffer3.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer3.from(data.buffer, data.byteOffset, data.byteLength) : Buffer3.from(String(data), "utf8");
      },
      decode: identity,
      name: "buffer",
      createViewTranscoder() {
        return new ViewFormat({
          encode: function(data) {
            return ArrayBuffer.isView(data) ? data : Buffer3.from(String(data), "utf8");
          },
          decode: function(data) {
            return Buffer3.from(data.buffer, data.byteOffset, data.byteLength);
          },
          name: `${this.name}+view`
        });
      }
    });
    exports2.view = new ViewFormat({
      encode: function(data) {
        return ArrayBuffer.isView(data) ? data : textEncoder.encode(data);
      },
      decode: identity,
      name: "view",
      createBufferTranscoder() {
        return new BufferFormat({
          encode: function(data) {
            return Buffer3.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer3.from(data.buffer, data.byteOffset, data.byteLength) : Buffer3.from(String(data), "utf8");
          },
          decode: identity,
          name: `${this.name}+buffer`
        });
      }
    });
    exports2.hex = new BufferFormat({
      encode: function(data) {
        return Buffer3.isBuffer(data) ? data : Buffer3.from(String(data), "hex");
      },
      decode: function(buffer) {
        return buffer.toString("hex");
      },
      name: "hex"
    });
    exports2.base64 = new BufferFormat({
      encode: function(data) {
        return Buffer3.isBuffer(data) ? data : Buffer3.from(String(data), "base64");
      },
      decode: function(buffer) {
        return buffer.toString("base64");
      },
      name: "base64"
    });
  }
});

// node_modules/level-transcoder/index.js
var require_level_transcoder = __commonJS({
  "node_modules/level-transcoder/index.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var ModuleError = require_module_error();
    var encodings = require_encodings();
    var { Encoding } = require_encoding();
    var { BufferFormat, ViewFormat, UTF8Format } = require_formats();
    var kFormats = Symbol("formats");
    var kEncodings = Symbol("encodings");
    var validFormats = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
    var Transcoder = class {
      /**
       * @param {Array<'buffer'|'view'|'utf8'>} formats
       */
      constructor(formats) {
        if (!Array.isArray(formats)) {
          throw new TypeError("The first argument 'formats' must be an array");
        } else if (!formats.every((f2) => validFormats.has(f2))) {
          throw new TypeError("Format must be one of 'buffer', 'view', 'utf8'");
        }
        this[kEncodings] = /* @__PURE__ */ new Map();
        this[kFormats] = new Set(formats);
        for (const k in encodings) {
          try {
            this.encoding(k);
          } catch (err) {
            if (err.code !== "LEVEL_ENCODING_NOT_SUPPORTED") throw err;
          }
        }
      }
      /**
       * @returns {Array<Encoding<any,T,any>>}
       */
      encodings() {
        return Array.from(new Set(this[kEncodings].values()));
      }
      /**
       * @param {string|MixedEncoding<any, any, any>} encoding
       * @returns {Encoding<any, T, any>}
       */
      encoding(encoding) {
        let resolved = this[kEncodings].get(encoding);
        if (resolved === void 0) {
          if (typeof encoding === "string" && encoding !== "") {
            resolved = lookup[encoding];
            if (!resolved) {
              throw new ModuleError(`Encoding '${encoding}' is not found`, {
                code: "LEVEL_ENCODING_NOT_FOUND"
              });
            }
          } else if (typeof encoding !== "object" || encoding === null) {
            throw new TypeError("First argument 'encoding' must be a string or object");
          } else {
            resolved = from(encoding);
          }
          const { name: name2, format } = resolved;
          if (!this[kFormats].has(format)) {
            if (this[kFormats].has("view")) {
              resolved = resolved.createViewTranscoder();
            } else if (this[kFormats].has("buffer")) {
              resolved = resolved.createBufferTranscoder();
            } else if (this[kFormats].has("utf8")) {
              resolved = resolved.createUTF8Transcoder();
            } else {
              throw new ModuleError(`Encoding '${name2}' cannot be transcoded`, {
                code: "LEVEL_ENCODING_NOT_SUPPORTED"
              });
            }
          }
          for (const k of [encoding, name2, resolved.name, resolved.commonName]) {
            this[kEncodings].set(k, resolved);
          }
        }
        return resolved;
      }
    };
    exports2.Transcoder = Transcoder;
    function from(options) {
      if (options instanceof Encoding) {
        return options;
      }
      const maybeType = "type" in options && typeof options.type === "string" ? options.type : void 0;
      const name2 = options.name || maybeType || `anonymous-${anonymousCount++}`;
      switch (detectFormat(options)) {
        case "view":
          return new ViewFormat({ ...options, name: name2 });
        case "utf8":
          return new UTF8Format({ ...options, name: name2 });
        case "buffer":
          return new BufferFormat({ ...options, name: name2 });
        default: {
          throw new TypeError("Format must be one of 'buffer', 'view', 'utf8'");
        }
      }
    }
    function detectFormat(options) {
      if ("format" in options && options.format !== void 0) {
        return options.format;
      } else if ("buffer" in options && typeof options.buffer === "boolean") {
        return options.buffer ? "buffer" : "utf8";
      } else if ("code" in options && Number.isInteger(options.code)) {
        return "view";
      } else {
        return "buffer";
      }
    }
    var aliases = {
      binary: encodings.buffer,
      "utf-8": encodings.utf8
    };
    var lookup = {
      ...encodings,
      ...aliases
    };
    var anonymousCount = 0;
  }
});

// node_modules/@jspm/core/nodelibs/browser/chunk-4bd36a8f.js
function o() {
  o.init.call(this);
}
function u(e2) {
  if ("function" != typeof e2) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e2);
}
function f(e2) {
  return void 0 === e2._maxListeners ? o.defaultMaxListeners : e2._maxListeners;
}
function v(e2, t2, n2, r2) {
  var i2, o2, s2, v2;
  if (u(n2), void 0 === (o2 = e2._events) ? (o2 = e2._events = /* @__PURE__ */ Object.create(null), e2._eventsCount = 0) : (void 0 !== o2.newListener && (e2.emit("newListener", t2, n2.listener ? n2.listener : n2), o2 = e2._events), s2 = o2[t2]), void 0 === s2) s2 = o2[t2] = n2, ++e2._eventsCount;
  else if ("function" == typeof s2 ? s2 = o2[t2] = r2 ? [n2, s2] : [s2, n2] : r2 ? s2.unshift(n2) : s2.push(n2), (i2 = f(e2)) > 0 && s2.length > i2 && !s2.warned) {
    s2.warned = true;
    var a2 = new Error("Possible EventEmitter memory leak detected. " + s2.length + " " + String(t2) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a2.name = "MaxListenersExceededWarning", a2.emitter = e2, a2.type = t2, a2.count = s2.length, v2 = a2, console && console.warn && console.warn(v2);
  }
  return e2;
}
function a() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function l(e2, t2, n2) {
  var r2 = { fired: false, wrapFn: void 0, target: e2, type: t2, listener: n2 }, i2 = a.bind(r2);
  return i2.listener = n2, r2.wrapFn = i2, i2;
}
function h(e2, t2, n2) {
  var r2 = e2._events;
  if (void 0 === r2) return [];
  var i2 = r2[t2];
  return void 0 === i2 ? [] : "function" == typeof i2 ? n2 ? [i2.listener || i2] : [i2] : n2 ? function(e3) {
    for (var t3 = new Array(e3.length), n3 = 0; n3 < t3.length; ++n3) t3[n3] = e3[n3].listener || e3[n3];
    return t3;
  }(i2) : c(i2, i2.length);
}
function p(e2) {
  var t2 = this._events;
  if (void 0 !== t2) {
    var n2 = t2[e2];
    if ("function" == typeof n2) return 1;
    if (void 0 !== n2) return n2.length;
  }
  return 0;
}
function c(e2, t2) {
  for (var n2 = new Array(t2), r2 = 0; r2 < t2; ++r2) n2[r2] = e2[r2];
  return n2;
}
var e, t, n, r, i, s, y;
var init_chunk_4bd36a8f = __esm({
  "node_modules/@jspm/core/nodelibs/browser/chunk-4bd36a8f.js"() {
    init_dirname();
    init_buffer2();
    init_process2();
    n = "object" == typeof Reflect ? Reflect : null;
    r = n && "function" == typeof n.apply ? n.apply : function(e2, t2, n2) {
      return Function.prototype.apply.call(e2, t2, n2);
    };
    t = n && "function" == typeof n.ownKeys ? n.ownKeys : Object.getOwnPropertySymbols ? function(e2) {
      return Object.getOwnPropertyNames(e2).concat(Object.getOwnPropertySymbols(e2));
    } : function(e2) {
      return Object.getOwnPropertyNames(e2);
    };
    i = Number.isNaN || function(e2) {
      return e2 != e2;
    };
    e = o, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
    s = 10;
    Object.defineProperty(o, "defaultMaxListeners", { enumerable: true, get: function() {
      return s;
    }, set: function(e2) {
      if ("number" != typeof e2 || e2 < 0 || i(e2)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e2 + ".");
      s = e2;
    } }), o.init = function() {
      void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    }, o.prototype.setMaxListeners = function(e2) {
      if ("number" != typeof e2 || e2 < 0 || i(e2)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e2 + ".");
      return this._maxListeners = e2, this;
    }, o.prototype.getMaxListeners = function() {
      return f(this);
    }, o.prototype.emit = function(e2) {
      for (var t2 = [], n2 = 1; n2 < arguments.length; n2++) t2.push(arguments[n2]);
      var i2 = "error" === e2, o2 = this._events;
      if (void 0 !== o2) i2 = i2 && void 0 === o2.error;
      else if (!i2) return false;
      if (i2) {
        var s2;
        if (t2.length > 0 && (s2 = t2[0]), s2 instanceof Error) throw s2;
        var u2 = new Error("Unhandled error." + (s2 ? " (" + s2.message + ")" : ""));
        throw u2.context = s2, u2;
      }
      var f2 = o2[e2];
      if (void 0 === f2) return false;
      if ("function" == typeof f2) r(f2, this, t2);
      else {
        var v2 = f2.length, a2 = c(f2, v2);
        for (n2 = 0; n2 < v2; ++n2) r(a2[n2], this, t2);
      }
      return true;
    }, o.prototype.addListener = function(e2, t2) {
      return v(this, e2, t2, false);
    }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(e2, t2) {
      return v(this, e2, t2, true);
    }, o.prototype.once = function(e2, t2) {
      return u(t2), this.on(e2, l(this, e2, t2)), this;
    }, o.prototype.prependOnceListener = function(e2, t2) {
      return u(t2), this.prependListener(e2, l(this, e2, t2)), this;
    }, o.prototype.removeListener = function(e2, t2) {
      var n2, r2, i2, o2, s2;
      if (u(t2), void 0 === (r2 = this._events)) return this;
      if (void 0 === (n2 = r2[e2])) return this;
      if (n2 === t2 || n2.listener === t2) 0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : (delete r2[e2], r2.removeListener && this.emit("removeListener", e2, n2.listener || t2));
      else if ("function" != typeof n2) {
        for (i2 = -1, o2 = n2.length - 1; o2 >= 0; o2--) if (n2[o2] === t2 || n2[o2].listener === t2) {
          s2 = n2[o2].listener, i2 = o2;
          break;
        }
        if (i2 < 0) return this;
        0 === i2 ? n2.shift() : !function(e3, t3) {
          for (; t3 + 1 < e3.length; t3++) e3[t3] = e3[t3 + 1];
          e3.pop();
        }(n2, i2), 1 === n2.length && (r2[e2] = n2[0]), void 0 !== r2.removeListener && this.emit("removeListener", e2, s2 || t2);
      }
      return this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(e2) {
      var t2, n2, r2;
      if (void 0 === (n2 = this._events)) return this;
      if (void 0 === n2.removeListener) return 0 === arguments.length ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : void 0 !== n2[e2] && (0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : delete n2[e2]), this;
      if (0 === arguments.length) {
        var i2, o2 = Object.keys(n2);
        for (r2 = 0; r2 < o2.length; ++r2) "removeListener" !== (i2 = o2[r2]) && this.removeAllListeners(i2);
        return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
      }
      if ("function" == typeof (t2 = n2[e2])) this.removeListener(e2, t2);
      else if (void 0 !== t2) for (r2 = t2.length - 1; r2 >= 0; r2--) this.removeListener(e2, t2[r2]);
      return this;
    }, o.prototype.listeners = function(e2) {
      return h(this, e2, true);
    }, o.prototype.rawListeners = function(e2) {
      return h(this, e2, false);
    }, o.listenerCount = function(e2, t2) {
      return "function" == typeof e2.listenerCount ? e2.listenerCount(t2) : p.call(e2, t2);
    }, o.prototype.listenerCount = p, o.prototype.eventNames = function() {
      return this._eventsCount > 0 ? t(this._events) : [];
    };
    y = e;
    y.EventEmitter;
    y.defaultMaxListeners;
    y.init;
    y.listenerCount;
    y.EventEmitter;
    y.defaultMaxListeners;
    y.init;
    y.listenerCount;
  }
});

// node_modules/@jspm/core/nodelibs/browser/events.js
var events_exports = {};
__export(events_exports, {
  EventEmitter: () => EventEmitter,
  default: () => y,
  defaultMaxListeners: () => defaultMaxListeners,
  init: () => init,
  listenerCount: () => listenerCount,
  on: () => on,
  once: () => once
});
var EventEmitter, defaultMaxListeners, init, listenerCount, on, once;
var init_events = __esm({
  "node_modules/@jspm/core/nodelibs/browser/events.js"() {
    init_dirname();
    init_buffer2();
    init_process2();
    init_chunk_4bd36a8f();
    init_chunk_4bd36a8f();
    y.once = function(emitter, event) {
      return new Promise((resolve, reject) => {
        function eventListener(...args) {
          if (errorListener !== void 0) {
            emitter.removeListener("error", errorListener);
          }
          resolve(args);
        }
        let errorListener;
        if (event !== "error") {
          errorListener = (err) => {
            emitter.removeListener(name, eventListener);
            reject(err);
          };
          emitter.once("error", errorListener);
        }
        emitter.once(event, eventListener);
      });
    };
    y.on = function(emitter, event) {
      const unconsumedEventValues = [];
      const unconsumedPromises = [];
      let error = null;
      let finished = false;
      const iterator = {
        async next() {
          const value = unconsumedEventValues.shift();
          if (value) {
            return createIterResult(value, false);
          }
          if (error) {
            const p2 = Promise.reject(error);
            error = null;
            return p2;
          }
          if (finished) {
            return createIterResult(void 0, true);
          }
          return new Promise((resolve, reject) => unconsumedPromises.push({ resolve, reject }));
        },
        async return() {
          emitter.removeListener(event, eventHandler);
          emitter.removeListener("error", errorHandler);
          finished = true;
          for (const promise of unconsumedPromises) {
            promise.resolve(createIterResult(void 0, true));
          }
          return createIterResult(void 0, true);
        },
        throw(err) {
          error = err;
          emitter.removeListener(event, eventHandler);
          emitter.removeListener("error", errorHandler);
        },
        [Symbol.asyncIterator]() {
          return this;
        }
      };
      emitter.on(event, eventHandler);
      emitter.on("error", errorHandler);
      return iterator;
      function eventHandler(...args) {
        const promise = unconsumedPromises.shift();
        if (promise) {
          promise.resolve(createIterResult(args, false));
        } else {
          unconsumedEventValues.push(args);
        }
      }
      function errorHandler(err) {
        finished = true;
        const toError = unconsumedPromises.shift();
        if (toError) {
          toError.reject(err);
        } else {
          error = err;
        }
        iterator.return();
      }
    };
    ({
      EventEmitter,
      defaultMaxListeners,
      init,
      listenerCount,
      on,
      once
    } = y);
  }
});

// node_modules/maybe-combine-errors/index.js
var require_maybe_combine_errors = __commonJS({
  "node_modules/maybe-combine-errors/index.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var kErrors = Symbol("kErrors");
    module.exports = function(errors) {
      errors = errors.filter(defined);
      if (errors.length === 0) return;
      if (errors.length === 1) return errors[0];
      return new CombinedError(errors);
    };
    var CombinedError = class extends Error {
      constructor(errors) {
        const unique = new Set(errors.map(getMessage).filter(Boolean));
        const message = Array.from(unique).join("; ");
        super(message);
        value(this, "name", "CombinedError");
        value(this, kErrors, errors);
        getter(this, "stack", () => errors.map(getStack).join("\n\n"));
        getter(this, "transient", () => errors.length > 0 && errors.every(transient));
        getter(this, "expected", () => errors.length > 0 && errors.every(expected));
      }
      [Symbol.iterator]() {
        return this[kErrors][Symbol.iterator]();
      }
    };
    function value(obj, prop, value2) {
      Object.defineProperty(obj, prop, { value: value2 });
    }
    function getter(obj, prop, get) {
      Object.defineProperty(obj, prop, { get });
    }
    function defined(err) {
      return err != null;
    }
    function getMessage(err) {
      return err.message;
    }
    function getStack(err) {
      return err.stack;
    }
    function transient(err) {
      return err.transient === true;
    }
    function expected(err) {
      return err.expected === true;
    }
  }
});

// node_modules/abstract-level/lib/common.js
var require_common2 = __commonJS({
  "node_modules/abstract-level/lib/common.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var ModuleError = require_module_error();
    var deprecations = /* @__PURE__ */ new Set();
    exports2.getOptions = function(options, def) {
      if (typeof options === "object" && options !== null) {
        return options;
      }
      if (def !== void 0) {
        return def;
      }
      return {};
    };
    exports2.emptyOptions = Object.freeze({});
    exports2.noop = function() {
    };
    exports2.resolvedPromise = Promise.resolve();
    exports2.deprecate = function(message) {
      if (!deprecations.has(message)) {
        deprecations.add(message);
        const c2 = globalThis.console;
        if (typeof c2 !== "undefined" && typeof c2.warn === "function") {
          c2.warn(new ModuleError(message, { code: "LEVEL_LEGACY" }));
        }
      }
    };
  }
});

// node_modules/abstract-level/lib/errors.js
var require_errors = __commonJS({
  "node_modules/abstract-level/lib/errors.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var ModuleError = require_module_error();
    var AbortError = class extends ModuleError {
      constructor(cause) {
        super("Operation has been aborted", {
          code: "LEVEL_ABORTED",
          cause
        });
      }
      // Set name to AbortError for web compatibility. See:
      // https://dom.spec.whatwg.org/#aborting-ongoing-activities
      // https://github.com/nodejs/node/pull/35911#discussion_r515779306
      get name() {
        return "AbortError";
      }
    };
    exports2.AbortError = AbortError;
  }
});

// node_modules/abstract-level/abstract-iterator.js
var require_abstract_iterator = __commonJS({
  "node_modules/abstract-level/abstract-iterator.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var ModuleError = require_module_error();
    var combineErrors = require_maybe_combine_errors();
    var { getOptions, emptyOptions, noop } = require_common2();
    var { AbortError } = require_errors();
    var kWorking = Symbol("working");
    var kDecodeOne = Symbol("decodeOne");
    var kDecodeMany = Symbol("decodeMany");
    var kSignal = Symbol("signal");
    var kPendingClose = Symbol("pendingClose");
    var kClosingPromise = Symbol("closingPromise");
    var kKeyEncoding = Symbol("keyEncoding");
    var kValueEncoding = Symbol("valueEncoding");
    var kKeys = Symbol("keys");
    var kValues = Symbol("values");
    var kLimit = Symbol("limit");
    var kCount = Symbol("count");
    var kEnded = Symbol("ended");
    var CommonIterator = class {
      constructor(db, options) {
        if (typeof db !== "object" || db === null) {
          const hint = db === null ? "null" : typeof db;
          throw new TypeError(`The first argument must be an abstract-level database, received ${hint}`);
        }
        if (typeof options !== "object" || options === null) {
          throw new TypeError("The second argument must be an options object");
        }
        this[kWorking] = false;
        this[kPendingClose] = null;
        this[kClosingPromise] = null;
        this[kKeyEncoding] = options[kKeyEncoding];
        this[kValueEncoding] = options[kValueEncoding];
        this[kLimit] = Number.isInteger(options.limit) && options.limit >= 0 ? options.limit : Infinity;
        this[kCount] = 0;
        this[kSignal] = options.signal != null ? options.signal : null;
        this[kEnded] = false;
        this.db = db;
        this.db.attachResource(this);
      }
      get count() {
        return this[kCount];
      }
      get limit() {
        return this[kLimit];
      }
      async next() {
        startWork(this);
        try {
          if (this[kEnded] || this[kCount] >= this[kLimit]) {
            this[kEnded] = true;
            return void 0;
          }
          let item = await this._next();
          if (item === void 0) {
            this[kEnded] = true;
            return void 0;
          }
          try {
            item = this[kDecodeOne](item);
          } catch (err) {
            throw new IteratorDecodeError(err);
          }
          this[kCount]++;
          return item;
        } finally {
          endWork(this);
        }
      }
      async _next() {
      }
      async nextv(size, options) {
        if (!Number.isInteger(size)) {
          throw new TypeError("The first argument 'size' must be an integer");
        }
        options = getOptions(options, emptyOptions);
        if (size < 1) size = 1;
        if (this[kLimit] < Infinity) size = Math.min(size, this[kLimit] - this[kCount]);
        startWork(this);
        try {
          if (this[kEnded] || size <= 0) {
            this[kEnded] = true;
            return [];
          }
          const items = await this._nextv(size, options);
          if (items.length === 0) {
            this[kEnded] = true;
            return items;
          }
          try {
            this[kDecodeMany](items);
          } catch (err) {
            throw new IteratorDecodeError(err);
          }
          this[kCount] += items.length;
          return items;
        } finally {
          endWork(this);
        }
      }
      async _nextv(size, options) {
        const acc = [];
        while (acc.length < size) {
          const item = await this._next(options);
          if (item !== void 0) {
            acc.push(item);
          } else {
            this[kEnded] = true;
            break;
          }
        }
        return acc;
      }
      async all(options) {
        options = getOptions(options, emptyOptions);
        startWork(this);
        try {
          if (this[kEnded] || this[kCount] >= this[kLimit]) {
            return [];
          }
          const items = await this._all(options);
          try {
            this[kDecodeMany](items);
          } catch (err) {
            throw new IteratorDecodeError(err);
          }
          this[kCount] += items.length;
          return items;
        } catch (err) {
          endWork(this);
          await destroy(this, err);
        } finally {
          this[kEnded] = true;
          if (this[kWorking]) {
            endWork(this);
            await this.close();
          }
        }
      }
      async _all(options) {
        let count = this[kCount];
        const acc = [];
        while (true) {
          const size = this[kLimit] < Infinity ? Math.min(1e3, this[kLimit] - count) : 1e3;
          if (size <= 0) {
            return acc;
          }
          const items = await this._nextv(size, options);
          if (items.length === 0) {
            return acc;
          }
          acc.push.apply(acc, items);
          count += items.length;
        }
      }
      seek(target, options) {
        options = getOptions(options, emptyOptions);
        if (this[kClosingPromise] !== null) {
        } else if (this[kWorking]) {
          throw new ModuleError("Iterator is busy: cannot call seek() until next() has completed", {
            code: "LEVEL_ITERATOR_BUSY"
          });
        } else {
          const keyEncoding = this.db.keyEncoding(options.keyEncoding || this[kKeyEncoding]);
          const keyFormat = keyEncoding.format;
          if (options.keyEncoding !== keyFormat) {
            options = { ...options, keyEncoding: keyFormat };
          }
          const mapped = this.db.prefixKey(keyEncoding.encode(target), keyFormat, false);
          this._seek(mapped, options);
          this[kEnded] = false;
        }
      }
      _seek(target, options) {
        throw new ModuleError("Iterator does not support seek()", {
          code: "LEVEL_NOT_SUPPORTED"
        });
      }
      async close() {
        if (this[kClosingPromise] !== null) {
          return this[kClosingPromise].catch(noop);
        }
        this[kClosingPromise] = new Promise((resolve, reject) => {
          this[kPendingClose] = () => {
            this[kPendingClose] = null;
            privateClose(this).then(resolve, reject);
          };
        });
        if (!this[kWorking]) {
          this[kPendingClose]();
        }
        return this[kClosingPromise];
      }
      async _close() {
      }
      async *[Symbol.asyncIterator]() {
        try {
          let item;
          while ((item = await this.next()) !== void 0) {
            yield item;
          }
        } catch (err) {
          await destroy(this, err);
        } finally {
          await this.close();
        }
      }
    };
    var AbstractIterator2 = class extends CommonIterator {
      constructor(db, options) {
        super(db, options);
        this[kKeys] = options.keys !== false;
        this[kValues] = options.values !== false;
      }
      [kDecodeOne](entry) {
        const key = entry[0];
        const value = entry[1];
        if (key !== void 0) {
          entry[0] = this[kKeys] ? this[kKeyEncoding].decode(key) : void 0;
        }
        if (value !== void 0) {
          entry[1] = this[kValues] ? this[kValueEncoding].decode(value) : void 0;
        }
        return entry;
      }
      [kDecodeMany](entries) {
        const keyEncoding = this[kKeyEncoding];
        const valueEncoding = this[kValueEncoding];
        for (const entry of entries) {
          const key = entry[0];
          const value = entry[1];
          if (key !== void 0) entry[0] = this[kKeys] ? keyEncoding.decode(key) : void 0;
          if (value !== void 0) entry[1] = this[kValues] ? valueEncoding.decode(value) : void 0;
        }
      }
    };
    var AbstractKeyIterator = class extends CommonIterator {
      [kDecodeOne](key) {
        return this[kKeyEncoding].decode(key);
      }
      [kDecodeMany](keys) {
        const keyEncoding = this[kKeyEncoding];
        for (let i2 = 0; i2 < keys.length; i2++) {
          const key = keys[i2];
          if (key !== void 0) keys[i2] = keyEncoding.decode(key);
        }
      }
    };
    var AbstractValueIterator = class extends CommonIterator {
      [kDecodeOne](value) {
        return this[kValueEncoding].decode(value);
      }
      [kDecodeMany](values) {
        const valueEncoding = this[kValueEncoding];
        for (let i2 = 0; i2 < values.length; i2++) {
          const value = values[i2];
          if (value !== void 0) values[i2] = valueEncoding.decode(value);
        }
      }
    };
    var IteratorDecodeError = class extends ModuleError {
      constructor(cause) {
        super("Iterator could not decode data", {
          code: "LEVEL_DECODE_ERROR",
          cause
        });
      }
    };
    var startWork = function(iterator) {
      if (iterator[kClosingPromise] !== null) {
        throw new ModuleError("Iterator is not open: cannot read after close()", {
          code: "LEVEL_ITERATOR_NOT_OPEN"
        });
      } else if (iterator[kWorking]) {
        throw new ModuleError("Iterator is busy: cannot read until previous read has completed", {
          code: "LEVEL_ITERATOR_BUSY"
        });
      } else if (iterator[kSignal] !== null && iterator[kSignal].aborted) {
        throw new AbortError();
      }
      iterator[kWorking] = true;
    };
    var endWork = function(iterator) {
      iterator[kWorking] = false;
      if (iterator[kPendingClose] !== null) {
        iterator[kPendingClose]();
      }
    };
    var privateClose = async function(iterator) {
      await iterator._close();
      iterator.db.detachResource(iterator);
    };
    var destroy = async function(iterator, err) {
      try {
        await iterator.close();
      } catch (closeErr) {
        throw combineErrors([err, closeErr]);
      }
      throw err;
    };
    AbstractIterator2.keyEncoding = kKeyEncoding;
    AbstractIterator2.valueEncoding = kValueEncoding;
    exports2.AbstractIterator = AbstractIterator2;
    exports2.AbstractKeyIterator = AbstractKeyIterator;
    exports2.AbstractValueIterator = AbstractValueIterator;
  }
});

// node_modules/abstract-level/lib/default-kv-iterator.js
var require_default_kv_iterator = __commonJS({
  "node_modules/abstract-level/lib/default-kv-iterator.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var kIterator = Symbol("iterator");
    var kHandleOne = Symbol("handleOne");
    var kHandleMany = Symbol("handleMany");
    var DefaultKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options) {
        super(db, options);
        this[kIterator] = db.iterator({ ...options, keys: true, values: false });
      }
      [kHandleOne](entry) {
        return entry[0];
      }
      [kHandleMany](entries) {
        for (let i2 = 0; i2 < entries.length; i2++) {
          entries[i2] = entries[i2][0];
        }
      }
    };
    var DefaultValueIterator = class extends AbstractValueIterator {
      constructor(db, options) {
        super(db, options);
        this[kIterator] = db.iterator({ ...options, keys: false, values: true });
      }
      [kHandleOne](entry) {
        return entry[1];
      }
      [kHandleMany](entries) {
        for (let i2 = 0; i2 < entries.length; i2++) {
          entries[i2] = entries[i2][1];
        }
      }
    };
    for (const Iterator of [DefaultKeyIterator, DefaultValueIterator]) {
      Iterator.prototype._next = async function() {
        const entry = await this[kIterator].next();
        return entry === void 0 ? entry : this[kHandleOne](entry);
      };
      Iterator.prototype._nextv = async function(size, options) {
        const entries = await this[kIterator].nextv(size, options);
        this[kHandleMany](entries);
        return entries;
      };
      Iterator.prototype._all = async function(options) {
        const entries = await this[kIterator].all(options);
        this[kHandleMany](entries);
        return entries;
      };
      Iterator.prototype._seek = function(target, options) {
        this[kIterator].seek(target, options);
      };
      Iterator.prototype._close = async function() {
        return this[kIterator].close();
      };
    }
    exports2.DefaultKeyIterator = DefaultKeyIterator;
    exports2.DefaultValueIterator = DefaultValueIterator;
  }
});

// node_modules/abstract-level/lib/deferred-iterator.js
var require_deferred_iterator = __commonJS({
  "node_modules/abstract-level/lib/deferred-iterator.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { AbstractIterator: AbstractIterator2, AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var ModuleError = require_module_error();
    var kNut = Symbol("nut");
    var kUndefer = Symbol("undefer");
    var kFactory = Symbol("factory");
    var kSignalOptions = Symbol("signalOptions");
    var DeferredIterator = class extends AbstractIterator2 {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.iterator(options);
        this[kSignalOptions] = { signal: options.signal };
        this.db.defer(() => this[kUndefer](), this[kSignalOptions]);
      }
    };
    var DeferredKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.keys(options);
        this[kSignalOptions] = { signal: options.signal };
        this.db.defer(() => this[kUndefer](), this[kSignalOptions]);
      }
    };
    var DeferredValueIterator = class extends AbstractValueIterator {
      constructor(db, options) {
        super(db, options);
        this[kNut] = null;
        this[kFactory] = () => db.values(options);
        this[kSignalOptions] = { signal: options.signal };
        this.db.defer(() => this[kUndefer](), this[kSignalOptions]);
      }
    };
    for (const Iterator of [DeferredIterator, DeferredKeyIterator, DeferredValueIterator]) {
      Iterator.prototype[kUndefer] = function() {
        if (this.db.status === "open") {
          this[kNut] = this[kFactory]();
        }
      };
      Iterator.prototype._next = async function() {
        if (this[kNut] !== null) {
          return this[kNut].next();
        } else if (this.db.status === "opening") {
          return this.db.deferAsync(() => this._next(), this[kSignalOptions]);
        } else {
          throw new ModuleError("Iterator is not open: cannot call next() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          });
        }
      };
      Iterator.prototype._nextv = async function(size, options) {
        if (this[kNut] !== null) {
          return this[kNut].nextv(size, options);
        } else if (this.db.status === "opening") {
          return this.db.deferAsync(() => this._nextv(size, options), this[kSignalOptions]);
        } else {
          throw new ModuleError("Iterator is not open: cannot call nextv() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          });
        }
      };
      Iterator.prototype._all = async function(options) {
        if (this[kNut] !== null) {
          return this[kNut].all();
        } else if (this.db.status === "opening") {
          return this.db.deferAsync(() => this._all(options), this[kSignalOptions]);
        } else {
          throw new ModuleError("Iterator is not open: cannot call all() after close()", {
            code: "LEVEL_ITERATOR_NOT_OPEN"
          });
        }
      };
      Iterator.prototype._seek = function(target, options) {
        if (this[kNut] !== null) {
          this[kNut]._seek(target, options);
        } else if (this.db.status === "opening") {
          this.db.defer(() => this._seek(target, options), this[kSignalOptions]);
        }
      };
      Iterator.prototype._close = async function() {
        if (this[kNut] !== null) {
          return this[kNut].close();
        } else if (this.db.status === "opening") {
          return this.db.deferAsync(() => this._close());
        }
      };
    }
    exports2.DeferredIterator = DeferredIterator;
    exports2.DeferredKeyIterator = DeferredKeyIterator;
    exports2.DeferredValueIterator = DeferredValueIterator;
  }
});

// node_modules/abstract-level/lib/prefixes.js
var require_prefixes = __commonJS({
  "node_modules/abstract-level/lib/prefixes.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.prefixDescendantKey = function(key, keyFormat, descendant, ancestor) {
      while (descendant !== null && descendant !== ancestor) {
        key = descendant.prefixKey(key, keyFormat, true);
        descendant = descendant.parent;
      }
      return key;
    };
    exports2.isDescendant = function(db, ancestor) {
      while (true) {
        if (db.parent == null) return false;
        if (db.parent === ancestor) return true;
        db = db.parent;
      }
    };
  }
});

// node_modules/abstract-level/lib/prewrite-batch.js
var require_prewrite_batch = __commonJS({
  "node_modules/abstract-level/lib/prewrite-batch.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { prefixDescendantKey, isDescendant } = require_prefixes();
    var kDb = Symbol("db");
    var kPrivateOperations = Symbol("privateOperations");
    var kPublicOperations = Symbol("publicOperations");
    var PrewriteBatch = class {
      constructor(db, privateOperations, publicOperations) {
        this[kDb] = db;
        this[kPrivateOperations] = privateOperations;
        this[kPublicOperations] = publicOperations;
      }
      add(op) {
        const isPut = op.type === "put";
        const delegated = op.sublevel != null;
        const db = delegated ? op.sublevel : this[kDb];
        const keyError = db._checkKey(op.key);
        if (keyError != null) throw keyError;
        op.keyEncoding = db.keyEncoding(op.keyEncoding);
        if (isPut) {
          const valueError = db._checkValue(op.value);
          if (valueError != null) throw valueError;
          op.valueEncoding = db.valueEncoding(op.valueEncoding);
        } else if (op.type !== "del") {
          throw new TypeError("A batch operation must have a type property that is 'put' or 'del'");
        }
        const keyEncoding = op.keyEncoding;
        const preencodedKey = keyEncoding.encode(op.key);
        const keyFormat = keyEncoding.format;
        const siblings = delegated && !isDescendant(op.sublevel, this[kDb]) && op.sublevel !== this[kDb];
        const encodedKey = delegated && !siblings ? prefixDescendantKey(preencodedKey, keyFormat, db, this[kDb]) : preencodedKey;
        if (delegated && !siblings) {
          op.sublevel = null;
        }
        let publicOperation = null;
        if (this[kPublicOperations] !== null && !siblings) {
          publicOperation = Object.assign({}, op);
          publicOperation.encodedKey = encodedKey;
          if (delegated) {
            publicOperation.key = encodedKey;
            publicOperation.keyEncoding = this[kDb].keyEncoding(keyFormat);
          }
          this[kPublicOperations].push(publicOperation);
        }
        op.key = siblings ? encodedKey : this[kDb].prefixKey(encodedKey, keyFormat, true);
        op.keyEncoding = keyFormat;
        if (isPut) {
          const valueEncoding = op.valueEncoding;
          const encodedValue = valueEncoding.encode(op.value);
          const valueFormat = valueEncoding.format;
          op.value = encodedValue;
          op.valueEncoding = valueFormat;
          if (publicOperation !== null) {
            publicOperation.encodedValue = encodedValue;
            if (delegated) {
              publicOperation.value = encodedValue;
              publicOperation.valueEncoding = this[kDb].valueEncoding(valueFormat);
            }
          }
        }
        this[kPrivateOperations].push(op);
        return this;
      }
    };
    exports2.PrewriteBatch = PrewriteBatch;
  }
});

// node_modules/abstract-level/abstract-chained-batch.js
var require_abstract_chained_batch = __commonJS({
  "node_modules/abstract-level/abstract-chained-batch.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var combineErrors = require_maybe_combine_errors();
    var ModuleError = require_module_error();
    var { getOptions, emptyOptions, noop } = require_common2();
    var { prefixDescendantKey, isDescendant } = require_prefixes();
    var { PrewriteBatch } = require_prewrite_batch();
    var kStatus = Symbol("status");
    var kPublicOperations = Symbol("publicOperations");
    var kLegacyOperations = Symbol("legacyOperations");
    var kPrivateOperations = Symbol("privateOperations");
    var kClosePromise = Symbol("closePromise");
    var kLength = Symbol("length");
    var kPrewriteRun = Symbol("prewriteRun");
    var kPrewriteBatch = Symbol("prewriteBatch");
    var kPrewriteData = Symbol("prewriteData");
    var kAddMode = Symbol("addMode");
    var AbstractChainedBatch = class {
      constructor(db, options) {
        if (typeof db !== "object" || db === null) {
          const hint = db === null ? "null" : typeof db;
          throw new TypeError(`The first argument must be an abstract-level database, received ${hint}`);
        }
        const enableWriteEvent = db.listenerCount("write") > 0;
        const enablePrewriteHook = !db.hooks.prewrite.noop;
        this[kPublicOperations] = enableWriteEvent ? [] : null;
        this[kLegacyOperations] = enableWriteEvent || enablePrewriteHook ? null : [];
        this[kLength] = 0;
        this[kStatus] = "open";
        this[kClosePromise] = null;
        this[kAddMode] = getOptions(options, emptyOptions).add === true;
        if (enablePrewriteHook) {
          const data = new PrewriteData([], enableWriteEvent ? [] : null);
          this[kPrewriteData] = data;
          this[kPrewriteBatch] = new PrewriteBatch(db, data[kPrivateOperations], data[kPublicOperations]);
          this[kPrewriteRun] = db.hooks.prewrite.run;
        } else {
          this[kPrewriteData] = null;
          this[kPrewriteBatch] = null;
          this[kPrewriteRun] = null;
        }
        this.db = db;
        this.db.attachResource(this);
      }
      get length() {
        if (this[kPrewriteData] !== null) {
          return this[kLength] + this[kPrewriteData].length;
        } else {
          return this[kLength];
        }
      }
      put(key, value, options) {
        assertStatus(this);
        options = getOptions(options, emptyOptions);
        const delegated = options.sublevel != null;
        const db = delegated ? options.sublevel : this.db;
        const original = options;
        const keyError = db._checkKey(key);
        const valueError = db._checkValue(value);
        if (keyError != null) throw keyError;
        if (valueError != null) throw valueError;
        const op = Object.assign({}, options, {
          type: "put",
          key,
          value,
          keyEncoding: db.keyEncoding(options.keyEncoding),
          valueEncoding: db.valueEncoding(options.valueEncoding)
        });
        if (this[kPrewriteRun] !== null) {
          try {
            this[kPrewriteRun](op, this[kPrewriteBatch]);
            op.keyEncoding = db.keyEncoding(op.keyEncoding);
            op.valueEncoding = db.valueEncoding(op.valueEncoding);
          } catch (err) {
            throw new ModuleError("The prewrite hook failed on batch.put()", {
              code: "LEVEL_HOOK_ERROR",
              cause: err
            });
          }
        }
        const keyEncoding = op.keyEncoding;
        const preencodedKey = keyEncoding.encode(op.key);
        const keyFormat = keyEncoding.format;
        const siblings = delegated && !isDescendant(op.sublevel, this.db) && op.sublevel !== this.db;
        const encodedKey = delegated && !siblings ? prefixDescendantKey(preencodedKey, keyFormat, db, this.db) : preencodedKey;
        const valueEncoding = op.valueEncoding;
        const encodedValue = valueEncoding.encode(op.value);
        const valueFormat = valueEncoding.format;
        if (delegated && !siblings) {
          op.sublevel = null;
        }
        if (this[kPublicOperations] !== null && !siblings) {
          const publicOperation = Object.assign({}, op);
          publicOperation.encodedKey = encodedKey;
          publicOperation.encodedValue = encodedValue;
          if (delegated) {
            publicOperation.key = encodedKey;
            publicOperation.value = encodedValue;
            publicOperation.keyEncoding = this.db.keyEncoding(keyFormat);
            publicOperation.valueEncoding = this.db.valueEncoding(valueFormat);
          }
          this[kPublicOperations].push(publicOperation);
        } else if (this[kLegacyOperations] !== null && !siblings) {
          const legacyOperation = Object.assign({}, original);
          legacyOperation.type = "put";
          legacyOperation.key = key;
          legacyOperation.value = value;
          this[kLegacyOperations].push(legacyOperation);
        }
        op.key = siblings ? encodedKey : this.db.prefixKey(encodedKey, keyFormat, true);
        op.value = encodedValue;
        op.keyEncoding = keyFormat;
        op.valueEncoding = valueFormat;
        if (this[kAddMode]) {
          this._add(op);
        } else {
          this._put(op.key, encodedValue, op);
        }
        this[kLength]++;
        return this;
      }
      _put(key, value, options) {
      }
      del(key, options) {
        assertStatus(this);
        options = getOptions(options, emptyOptions);
        const delegated = options.sublevel != null;
        const db = delegated ? options.sublevel : this.db;
        const original = options;
        const keyError = db._checkKey(key);
        if (keyError != null) throw keyError;
        const op = Object.assign({}, options, {
          type: "del",
          key,
          keyEncoding: db.keyEncoding(options.keyEncoding)
        });
        if (this[kPrewriteRun] !== null) {
          try {
            this[kPrewriteRun](op, this[kPrewriteBatch]);
            op.keyEncoding = db.keyEncoding(op.keyEncoding);
          } catch (err) {
            throw new ModuleError("The prewrite hook failed on batch.del()", {
              code: "LEVEL_HOOK_ERROR",
              cause: err
            });
          }
        }
        const keyEncoding = op.keyEncoding;
        const preencodedKey = keyEncoding.encode(op.key);
        const keyFormat = keyEncoding.format;
        const encodedKey = delegated ? prefixDescendantKey(preencodedKey, keyFormat, db, this.db) : preencodedKey;
        if (delegated) op.sublevel = null;
        if (this[kPublicOperations] !== null) {
          const publicOperation = Object.assign({}, op);
          publicOperation.encodedKey = encodedKey;
          if (delegated) {
            publicOperation.key = encodedKey;
            publicOperation.keyEncoding = this.db.keyEncoding(keyFormat);
          }
          this[kPublicOperations].push(publicOperation);
        } else if (this[kLegacyOperations] !== null) {
          const legacyOperation = Object.assign({}, original);
          legacyOperation.type = "del";
          legacyOperation.key = key;
          this[kLegacyOperations].push(legacyOperation);
        }
        op.key = this.db.prefixKey(encodedKey, keyFormat, true);
        op.keyEncoding = keyFormat;
        if (this[kAddMode]) {
          this._add(op);
        } else {
          this._del(op.key, op);
        }
        this[kLength]++;
        return this;
      }
      _del(key, options) {
      }
      _add(op) {
      }
      clear() {
        assertStatus(this);
        this._clear();
        if (this[kPublicOperations] !== null) this[kPublicOperations] = [];
        if (this[kLegacyOperations] !== null) this[kLegacyOperations] = [];
        if (this[kPrewriteData] !== null) this[kPrewriteData].clear();
        this[kLength] = 0;
        return this;
      }
      _clear() {
      }
      async write(options) {
        assertStatus(this);
        options = getOptions(options);
        if (this[kLength] === 0) {
          return this.close();
        } else {
          this[kStatus] = "writing";
          const close = prepareClose(this);
          try {
            if (this[kPrewriteData] !== null) {
              const publicOperations = this[kPrewriteData][kPublicOperations];
              const privateOperations = this[kPrewriteData][kPrivateOperations];
              const length = this[kPrewriteData].length;
              for (let i2 = 0; i2 < length; i2++) {
                const op = privateOperations[i2];
                if (this[kAddMode]) {
                  this._add(op);
                } else if (op.type === "put") {
                  this._put(op.key, op.value, op);
                } else {
                  this._del(op.key, op);
                }
              }
              if (publicOperations !== null && length !== 0) {
                this[kPublicOperations] = this[kPublicOperations].concat(publicOperations);
              }
            }
            await this._write(options);
          } catch (err) {
            close();
            try {
              await this[kClosePromise];
            } catch (closeErr) {
              err = combineErrors([err, closeErr]);
            }
            throw err;
          }
          close();
          if (this[kPublicOperations] !== null) {
            this.db.emit("write", this[kPublicOperations]);
          } else if (this[kLegacyOperations] !== null) {
            this.db.emit("batch", this[kLegacyOperations]);
          }
          return this[kClosePromise];
        }
      }
      async _write(options) {
      }
      async close() {
        if (this[kClosePromise] !== null) {
          return this[kClosePromise].catch(noop);
        } else {
          prepareClose(this)();
          return this[kClosePromise];
        }
      }
      async _close() {
      }
    };
    var prepareClose = function(batch) {
      let close;
      batch[kClosePromise] = new Promise((resolve, reject) => {
        close = () => {
          privateClose(batch).then(resolve, reject);
        };
      });
      return close;
    };
    var privateClose = async function(batch) {
      batch[kStatus] = "closing";
      await batch._close();
      batch.db.detachResource(batch);
    };
    var PrewriteData = class {
      constructor(privateOperations, publicOperations) {
        this[kPrivateOperations] = privateOperations;
        this[kPublicOperations] = publicOperations;
      }
      get length() {
        return this[kPrivateOperations].length;
      }
      clear() {
        for (const k of [kPublicOperations, kPrivateOperations]) {
          const ops = this[k];
          if (ops !== null) {
            ops.splice(0, ops.length);
          }
        }
      }
    };
    var assertStatus = function(batch) {
      if (batch[kStatus] !== "open") {
        throw new ModuleError("Batch is not open: cannot change operations after write() or close()", {
          code: "LEVEL_BATCH_NOT_OPEN"
        });
      }
      if (batch.db.status !== "open") {
        throw new ModuleError("Database is not open", {
          code: "LEVEL_DATABASE_NOT_OPEN"
        });
      }
    };
    exports2.AbstractChainedBatch = AbstractChainedBatch;
  }
});

// node_modules/abstract-level/lib/default-chained-batch.js
var require_default_chained_batch = __commonJS({
  "node_modules/abstract-level/lib/default-chained-batch.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { AbstractChainedBatch } = require_abstract_chained_batch();
    var kEncoded = Symbol("encoded");
    var DefaultChainedBatch = class extends AbstractChainedBatch {
      constructor(db) {
        super(db, { add: true });
        this[kEncoded] = [];
      }
      _add(op) {
        this[kEncoded].push(op);
      }
      _clear() {
        this[kEncoded] = [];
      }
      async _write(options) {
        return this.db._batch(this[kEncoded], options);
      }
    };
    exports2.DefaultChainedBatch = DefaultChainedBatch;
  }
});

// node_modules/abstract-level/lib/hooks.js
var require_hooks = __commonJS({
  "node_modules/abstract-level/lib/hooks.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { noop } = require_common2();
    var kFunctions = Symbol("functions");
    var kAsync = Symbol("async");
    var DatabaseHooks = class {
      constructor() {
        this.postopen = new Hook({ async: true });
        this.prewrite = new Hook({ async: false });
        this.newsub = new Hook({ async: false });
      }
    };
    var Hook = class {
      constructor(options) {
        this[kAsync] = options.async;
        this[kFunctions] = /* @__PURE__ */ new Set();
        this.noop = true;
        this.run = runner(this);
      }
      add(fn) {
        assertFunction(fn);
        this[kFunctions].add(fn);
        this.noop = false;
        this.run = runner(this);
      }
      delete(fn) {
        assertFunction(fn);
        this[kFunctions].delete(fn);
        this.noop = this[kFunctions].size === 0;
        this.run = runner(this);
      }
    };
    var assertFunction = function(fn) {
      if (typeof fn !== "function") {
        const hint = fn === null ? "null" : typeof fn;
        throw new TypeError(`The first argument must be a function, received ${hint}`);
      }
    };
    var runner = function(hook) {
      if (hook.noop) {
        return noop;
      } else if (hook[kFunctions].size === 1) {
        const [fn] = hook[kFunctions];
        return fn;
      } else if (hook[kAsync]) {
        const run = async function(functions, ...args) {
          for (const fn of functions) {
            await fn(...args);
          }
        };
        return run.bind(null, Array.from(hook[kFunctions]));
      } else {
        const run = function(functions, ...args) {
          for (const fn of functions) {
            fn(...args);
          }
        };
        return run.bind(null, Array.from(hook[kFunctions]));
      }
    };
    exports2.DatabaseHooks = DatabaseHooks;
  }
});

// node_modules/abstract-level/lib/event-monitor.js
var require_event_monitor = __commonJS({
  "node_modules/abstract-level/lib/event-monitor.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { deprecate } = require_common2();
    exports2.EventMonitor = class EventMonitor {
      constructor(emitter, events) {
        for (const event of events) {
          this[event.name] = false;
          if (event.deprecated) {
            event.message = `The '${event.name}' event is deprecated in favor of '${event.alt}' and will be removed in a future version of abstract-level`;
          }
        }
        const map = new Map(events.map((e2) => [e2.name, e2]));
        const monitor = this;
        emitter.on("newListener", beforeAdded);
        emitter.on("removeListener", afterRemoved);
        function beforeAdded(name2) {
          const event = map.get(name2);
          if (event !== void 0) {
            monitor[name2] = true;
            if (event.deprecated) {
              deprecate(event.message);
            }
          }
        }
        function afterRemoved(name2) {
          if (map.has(name2)) {
            monitor[name2] = this.listenerCount(name2) > 0;
          }
        }
      }
    };
  }
});

// node_modules/abstract-level/lib/deferred-queue.js
var require_deferred_queue = __commonJS({
  "node_modules/abstract-level/lib/deferred-queue.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { getOptions, emptyOptions } = require_common2();
    var { AbortError } = require_errors();
    var kOperations = Symbol("operations");
    var kSignals = Symbol("signals");
    var kHandleAbort = Symbol("handleAbort");
    var DeferredOperation = class {
      constructor(fn, signal) {
        this.fn = fn;
        this.signal = signal;
      }
    };
    var DeferredQueue = class {
      constructor() {
        this[kOperations] = [];
        this[kSignals] = /* @__PURE__ */ new Set();
        this[kHandleAbort] = this[kHandleAbort].bind(this);
      }
      add(fn, options) {
        options = getOptions(options, emptyOptions);
        const signal = options.signal;
        if (signal == null) {
          this[kOperations].push(new DeferredOperation(fn, null));
          return;
        }
        if (signal.aborted) {
          fn(new AbortError());
          return;
        }
        if (!this[kSignals].has(signal)) {
          this[kSignals].add(signal);
          signal.addEventListener("abort", this[kHandleAbort], { once: true });
        }
        this[kOperations].push(new DeferredOperation(fn, signal));
      }
      drain() {
        const operations = this[kOperations];
        const signals = this[kSignals];
        this[kOperations] = [];
        this[kSignals] = /* @__PURE__ */ new Set();
        for (const signal of signals) {
          signal.removeEventListener("abort", this[kHandleAbort]);
        }
        for (const operation of operations) {
          operation.fn.call(null);
        }
      }
      [kHandleAbort](ev) {
        const signal = ev.target;
        const err = new AbortError();
        const aborted = [];
        this[kOperations] = this[kOperations].filter(function(operation) {
          if (operation.signal !== null && operation.signal === signal) {
            aborted.push(operation);
            return false;
          } else {
            return true;
          }
        });
        this[kSignals].delete(signal);
        for (const operation of aborted) {
          operation.fn.call(null, err);
        }
      }
    };
    exports2.DeferredQueue = DeferredQueue;
  }
});

// node_modules/abstract-level/lib/range-options.js
var require_range_options = __commonJS({
  "node_modules/abstract-level/lib/range-options.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var rangeOptions = /* @__PURE__ */ new Set(["lt", "lte", "gt", "gte"]);
    module.exports = function(options, keyEncoding) {
      const result = {};
      for (const k in options) {
        if (!hasOwnProperty.call(options, k)) continue;
        if (k === "keyEncoding" || k === "valueEncoding") continue;
        if (rangeOptions.has(k)) {
          result[k] = keyEncoding.encode(options[k]);
        } else {
          result[k] = options[k];
        }
      }
      result.reverse = !!result.reverse;
      result.limit = Number.isInteger(result.limit) && result.limit >= 0 ? result.limit : -1;
      return result;
    };
  }
});

// node_modules/abstract-level/lib/abstract-sublevel-iterator.js
var require_abstract_sublevel_iterator = __commonJS({
  "node_modules/abstract-level/lib/abstract-sublevel-iterator.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { AbstractIterator: AbstractIterator2, AbstractKeyIterator, AbstractValueIterator } = require_abstract_iterator();
    var kUnfix = Symbol("unfix");
    var kIterator = Symbol("iterator");
    var AbstractSublevelIterator = class extends AbstractIterator2 {
      constructor(db, options, iterator, unfix) {
        super(db, options);
        this[kIterator] = iterator;
        this[kUnfix] = unfix;
      }
      async _next() {
        const entry = await this[kIterator].next();
        if (entry !== void 0) {
          const key = entry[0];
          if (key !== void 0) entry[0] = this[kUnfix](key);
        }
        return entry;
      }
      async _nextv(size, options) {
        const entries = await this[kIterator].nextv(size, options);
        const unfix = this[kUnfix];
        for (const entry of entries) {
          const key = entry[0];
          if (key !== void 0) entry[0] = unfix(key);
        }
        return entries;
      }
      async _all(options) {
        const entries = await this[kIterator].all(options);
        const unfix = this[kUnfix];
        for (const entry of entries) {
          const key = entry[0];
          if (key !== void 0) entry[0] = unfix(key);
        }
        return entries;
      }
    };
    var AbstractSublevelKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options, iterator, unfix) {
        super(db, options);
        this[kIterator] = iterator;
        this[kUnfix] = unfix;
      }
      async _next() {
        const key = await this[kIterator].next();
        return key === void 0 ? key : this[kUnfix](key);
      }
      async _nextv(size, options) {
        const keys = await this[kIterator].nextv(size, options);
        const unfix = this[kUnfix];
        for (let i2 = 0; i2 < keys.length; i2++) {
          const key = keys[i2];
          if (key !== void 0) keys[i2] = unfix(key);
        }
        return keys;
      }
      async _all(options) {
        const keys = await this[kIterator].all(options);
        const unfix = this[kUnfix];
        for (let i2 = 0; i2 < keys.length; i2++) {
          const key = keys[i2];
          if (key !== void 0) keys[i2] = unfix(key);
        }
        return keys;
      }
    };
    var AbstractSublevelValueIterator = class extends AbstractValueIterator {
      constructor(db, options, iterator) {
        super(db, options);
        this[kIterator] = iterator;
      }
      async _next() {
        return this[kIterator].next();
      }
      async _nextv(size, options) {
        return this[kIterator].nextv(size, options);
      }
      async _all(options) {
        return this[kIterator].all(options);
      }
    };
    for (const Iterator of [AbstractSublevelIterator, AbstractSublevelKeyIterator, AbstractSublevelValueIterator]) {
      Iterator.prototype._seek = function(target, options) {
        this[kIterator].seek(target, options);
      };
      Iterator.prototype._close = async function() {
        return this[kIterator].close();
      };
    }
    exports2.AbstractSublevelIterator = AbstractSublevelIterator;
    exports2.AbstractSublevelKeyIterator = AbstractSublevelKeyIterator;
    exports2.AbstractSublevelValueIterator = AbstractSublevelValueIterator;
  }
});

// node_modules/abstract-level/lib/abstract-sublevel.js
var require_abstract_sublevel = __commonJS({
  "node_modules/abstract-level/lib/abstract-sublevel.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var ModuleError = require_module_error();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports)) || {};
    var {
      AbstractSublevelIterator,
      AbstractSublevelKeyIterator,
      AbstractSublevelValueIterator
    } = require_abstract_sublevel_iterator();
    var kGlobalPrefix = Symbol("prefix");
    var kLocalPrefix = Symbol("localPrefix");
    var kLocalPath = Symbol("localPath");
    var kGlobalPath = Symbol("globalPath");
    var kGlobalUpperBound = Symbol("upperBound");
    var kPrefixRange = Symbol("prefixRange");
    var kRoot = Symbol("root");
    var kParent = Symbol("parent");
    var kUnfix = Symbol("unfix");
    var textEncoder = new TextEncoder();
    var defaults = { separator: "!" };
    module.exports = function({ AbstractLevel: AbstractLevel2 }) {
      class AbstractSublevel extends AbstractLevel2 {
        static defaults(options) {
          if (options == null) {
            return defaults;
          } else if (!options.separator) {
            return { ...options, separator: "!" };
          } else {
            return options;
          }
        }
        // TODO: add autoClose option, which if true, does parent.attachResource(this)
        constructor(db, name2, options) {
          const { separator, manifest, ...forward } = AbstractSublevel.defaults(options);
          const names = [].concat(name2).map((name3) => trim(name3, separator));
          const reserved = separator.charCodeAt(0) + 1;
          const root = db[kRoot] || db;
          if (!names.every((name3) => textEncoder.encode(name3).every((x) => x > reserved && x < 127))) {
            throw new ModuleError(`Sublevel name must use bytes > ${reserved} < ${127}`, {
              code: "LEVEL_INVALID_PREFIX"
            });
          }
          super(mergeManifests(db, manifest), forward);
          const localPrefix = names.map((name3) => separator + name3 + separator).join("");
          const globalPrefix = (db.prefix || "") + localPrefix;
          const globalUpperBound = globalPrefix.slice(0, -1) + String.fromCharCode(reserved);
          this[kRoot] = root;
          this[kParent] = db;
          this[kLocalPath] = names;
          this[kGlobalPath] = db.prefix ? db.path().concat(names) : names;
          this[kGlobalPrefix] = new MultiFormat(globalPrefix);
          this[kGlobalUpperBound] = new MultiFormat(globalUpperBound);
          this[kLocalPrefix] = new MultiFormat(localPrefix);
          this[kUnfix] = new Unfixer();
        }
        prefixKey(key, keyFormat, local) {
          const prefix = local ? this[kLocalPrefix] : this[kGlobalPrefix];
          if (keyFormat === "utf8") {
            return prefix.utf8 + key;
          } else if (key.byteLength === 0) {
            return prefix[keyFormat];
          } else if (keyFormat === "view") {
            const view = prefix.view;
            const result = new Uint8Array(view.byteLength + key.byteLength);
            result.set(view, 0);
            result.set(key, view.byteLength);
            return result;
          } else {
            const buffer = prefix.buffer;
            return Buffer3.concat([buffer, key], buffer.byteLength + key.byteLength);
          }
        }
        // Not exposed for now.
        [kPrefixRange](range, keyFormat) {
          if (range.gte !== void 0) {
            range.gte = this.prefixKey(range.gte, keyFormat, false);
          } else if (range.gt !== void 0) {
            range.gt = this.prefixKey(range.gt, keyFormat, false);
          } else {
            range.gte = this[kGlobalPrefix][keyFormat];
          }
          if (range.lte !== void 0) {
            range.lte = this.prefixKey(range.lte, keyFormat, false);
          } else if (range.lt !== void 0) {
            range.lt = this.prefixKey(range.lt, keyFormat, false);
          } else {
            range.lte = this[kGlobalUpperBound][keyFormat];
          }
        }
        get prefix() {
          return this[kGlobalPrefix].utf8;
        }
        get db() {
          return this[kRoot];
        }
        get parent() {
          return this[kParent];
        }
        path(local = false) {
          return local ? this[kLocalPath] : this[kGlobalPath];
        }
        async _open(options) {
          return this[kParent].open({ passive: true });
        }
        async _put(key, value, options) {
          return this[kParent].put(key, value, options);
        }
        async _get(key, options) {
          return this[kParent].get(key, options);
        }
        async _getMany(keys, options) {
          return this[kParent].getMany(keys, options);
        }
        async _del(key, options) {
          return this[kParent].del(key, options);
        }
        async _batch(operations, options) {
          return this[kParent].batch(operations, options);
        }
        // TODO: call parent instead of root
        async _clear(options) {
          this[kPrefixRange](options, options.keyEncoding);
          return this[kRoot].clear(options);
        }
        // TODO: call parent instead of root
        _iterator(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kRoot].iterator(options);
          const unfix = this[kUnfix].get(this[kGlobalPrefix].utf8.length, options.keyEncoding);
          return new AbstractSublevelIterator(this, options, iterator, unfix);
        }
        _keys(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kRoot].keys(options);
          const unfix = this[kUnfix].get(this[kGlobalPrefix].utf8.length, options.keyEncoding);
          return new AbstractSublevelKeyIterator(this, options, iterator, unfix);
        }
        _values(options) {
          this[kPrefixRange](options, options.keyEncoding);
          const iterator = this[kRoot].values(options);
          return new AbstractSublevelValueIterator(this, options, iterator);
        }
      }
      return { AbstractSublevel };
    };
    var mergeManifests = function(parent, manifest) {
      return {
        // Inherit manifest of parent db
        ...parent.supports,
        // Disable unsupported features
        createIfMissing: false,
        errorIfExists: false,
        // Unset additional events because we're not forwarding them
        events: {},
        // Unset additional methods (like approximateSize) which we can't support here unless
        // the AbstractSublevel class is overridden by an implementation of `abstract-level`.
        additionalMethods: {},
        // Inherit manifest of custom AbstractSublevel subclass. Such a class is not
        // allowed to override encodings.
        ...manifest,
        encodings: {
          utf8: supportsEncoding(parent, "utf8"),
          buffer: supportsEncoding(parent, "buffer"),
          view: supportsEncoding(parent, "view")
        }
      };
    };
    var supportsEncoding = function(parent, encoding) {
      return parent.supports.encodings[encoding] ? parent.keyEncoding(encoding).name === encoding : false;
    };
    var MultiFormat = class {
      constructor(key) {
        this.utf8 = key;
        this.view = textEncoder.encode(key);
        this.buffer = Buffer3 ? Buffer3.from(this.view.buffer, 0, this.view.byteLength) : {};
      }
    };
    var Unfixer = class {
      constructor() {
        this.cache = /* @__PURE__ */ new Map();
      }
      get(prefixLength, keyFormat) {
        let unfix = this.cache.get(keyFormat);
        if (unfix === void 0) {
          if (keyFormat === "view") {
            unfix = function(prefixLength2, key) {
              return key.subarray(prefixLength2);
            }.bind(null, prefixLength);
          } else {
            unfix = function(prefixLength2, key) {
              return key.slice(prefixLength2);
            }.bind(null, prefixLength);
          }
          this.cache.set(keyFormat, unfix);
        }
        return unfix;
      }
    };
    var trim = function(str, char) {
      let start = 0;
      let end = str.length;
      while (start < end && str[start] === char) start++;
      while (end > start && str[end - 1] === char) end--;
      return str.slice(start, end);
    };
  }
});

// node_modules/abstract-level/abstract-level.js
var require_abstract_level = __commonJS({
  "node_modules/abstract-level/abstract-level.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { supports } = require_level_supports();
    var { Transcoder } = require_level_transcoder();
    var { EventEmitter: EventEmitter2 } = (init_events(), __toCommonJS(events_exports));
    var ModuleError = require_module_error();
    var combineErrors = require_maybe_combine_errors();
    var { AbstractIterator: AbstractIterator2 } = require_abstract_iterator();
    var { DefaultKeyIterator, DefaultValueIterator } = require_default_kv_iterator();
    var { DeferredIterator, DeferredKeyIterator, DeferredValueIterator } = require_deferred_iterator();
    var { DefaultChainedBatch } = require_default_chained_batch();
    var { DatabaseHooks } = require_hooks();
    var { PrewriteBatch } = require_prewrite_batch();
    var { EventMonitor } = require_event_monitor();
    var { getOptions, noop, emptyOptions, resolvedPromise } = require_common2();
    var { prefixDescendantKey, isDescendant } = require_prefixes();
    var { DeferredQueue } = require_deferred_queue();
    var rangeOptions = require_range_options();
    var kResources = Symbol("resources");
    var kCloseResources = Symbol("closeResources");
    var kQueue = Symbol("queue");
    var kDeferOpen = Symbol("deferOpen");
    var kOptions = Symbol("options");
    var kStatus = Symbol("status");
    var kStatusChange = Symbol("statusChange");
    var kStatusLocked = Symbol("statusLocked");
    var kDefaultOptions = Symbol("defaultOptions");
    var kTranscoder = Symbol("transcoder");
    var kKeyEncoding = Symbol("keyEncoding");
    var kValueEncoding = Symbol("valueEncoding");
    var kEventMonitor = Symbol("eventMonitor");
    var kArrayBatch = Symbol("arrayBatch");
    var AbstractLevel2 = class extends EventEmitter2 {
      constructor(manifest, options) {
        super();
        if (typeof manifest !== "object" || manifest === null) {
          throw new TypeError("The first argument 'manifest' must be an object");
        }
        options = getOptions(options);
        const { keyEncoding, valueEncoding, passive, ...forward } = options;
        this[kResources] = /* @__PURE__ */ new Set();
        this[kQueue] = new DeferredQueue();
        this[kDeferOpen] = true;
        this[kOptions] = forward;
        this[kStatus] = "opening";
        this[kStatusChange] = null;
        this[kStatusLocked] = false;
        this.hooks = new DatabaseHooks();
        this.supports = supports(manifest, {
          deferredOpen: true,
          // TODO (next major): add seek
          snapshots: manifest.snapshots !== false,
          permanence: manifest.permanence !== false,
          encodings: manifest.encodings || {},
          events: Object.assign({}, manifest.events, {
            opening: true,
            open: true,
            closing: true,
            closed: true,
            write: true,
            put: true,
            del: true,
            batch: true,
            clear: true
          })
        });
        this[kEventMonitor] = new EventMonitor(this, [
          { name: "write" },
          { name: "put", deprecated: true, alt: "write" },
          { name: "del", deprecated: true, alt: "write" },
          { name: "batch", deprecated: true, alt: "write" }
        ]);
        this[kTranscoder] = new Transcoder(formats(this));
        this[kKeyEncoding] = this[kTranscoder].encoding(keyEncoding || "utf8");
        this[kValueEncoding] = this[kTranscoder].encoding(valueEncoding || "utf8");
        for (const encoding of this[kTranscoder].encodings()) {
          if (!this.supports.encodings[encoding.commonName]) {
            this.supports.encodings[encoding.commonName] = true;
          }
        }
        this[kDefaultOptions] = {
          empty: emptyOptions,
          entry: Object.freeze({
            keyEncoding: this[kKeyEncoding].commonName,
            valueEncoding: this[kValueEncoding].commonName
          }),
          entryFormat: Object.freeze({
            keyEncoding: this[kKeyEncoding].format,
            valueEncoding: this[kValueEncoding].format
          }),
          key: Object.freeze({
            keyEncoding: this[kKeyEncoding].commonName
          }),
          keyFormat: Object.freeze({
            keyEncoding: this[kKeyEncoding].format
          })
        };
        queueMicrotask(() => {
          if (this[kDeferOpen]) {
            this.open({ passive: false }).catch(noop);
          }
        });
      }
      get status() {
        return this[kStatus];
      }
      get parent() {
        return null;
      }
      keyEncoding(encoding) {
        return this[kTranscoder].encoding(encoding != null ? encoding : this[kKeyEncoding]);
      }
      valueEncoding(encoding) {
        return this[kTranscoder].encoding(encoding != null ? encoding : this[kValueEncoding]);
      }
      async open(options) {
        options = { ...this[kOptions], ...getOptions(options) };
        options.createIfMissing = options.createIfMissing !== false;
        options.errorIfExists = !!options.errorIfExists;
        const postopen = this.hooks.postopen.noop ? null : this.hooks.postopen.run;
        const passive = options.passive;
        if (passive && this[kDeferOpen]) {
          await void 0;
        }
        assertUnlocked(this);
        while (this[kStatusChange] !== null) await this[kStatusChange].catch(noop);
        assertUnlocked(this);
        if (passive) {
          if (this[kStatus] !== "open") throw new NotOpenError();
        } else if (this[kStatus] === "closed" || this[kDeferOpen]) {
          this[kDeferOpen] = false;
          this[kStatusChange] = resolvedPromise;
          this[kStatusChange] = (async () => {
            this[kStatus] = "opening";
            try {
              this.emit("opening");
              await this._open(options);
            } catch (err) {
              this[kStatus] = "closed";
              this[kQueue].drain();
              try {
                await this[kCloseResources]();
              } catch (resourceErr) {
                err = combineErrors([err, resourceErr]);
              }
              throw new NotOpenError(err);
            }
            this[kStatus] = "open";
            if (postopen !== null) {
              let hookErr;
              try {
                this[kStatusLocked] = true;
                await postopen(options);
              } catch (err) {
                hookErr = convertRejection(err);
              } finally {
                this[kStatusLocked] = false;
              }
              if (hookErr) {
                this[kStatus] = "closing";
                this[kQueue].drain();
                try {
                  await this[kCloseResources]();
                  await this._close();
                } catch (closeErr) {
                  this[kStatusLocked] = true;
                  hookErr = combineErrors([hookErr, closeErr]);
                }
                this[kStatus] = "closed";
                throw new ModuleError("The postopen hook failed on open()", {
                  code: "LEVEL_HOOK_ERROR",
                  cause: hookErr
                });
              }
            }
            this[kQueue].drain();
            this.emit("open");
          })();
          try {
            await this[kStatusChange];
          } finally {
            this[kStatusChange] = null;
          }
        } else if (this[kStatus] !== "open") {
          throw new NotOpenError();
        }
      }
      async _open(options) {
      }
      async close() {
        assertUnlocked(this);
        while (this[kStatusChange] !== null) await this[kStatusChange].catch(noop);
        assertUnlocked(this);
        if (this[kStatus] === "open" || this[kDeferOpen]) {
          const fromInitial = this[kDeferOpen];
          this[kDeferOpen] = false;
          this[kStatusChange] = resolvedPromise;
          this[kStatusChange] = (async () => {
            this[kStatus] = "closing";
            this[kQueue].drain();
            try {
              this.emit("closing");
              await this[kCloseResources]();
              if (!fromInitial) await this._close();
            } catch (err) {
              this[kStatus] = "open";
              this[kQueue].drain();
              throw new NotClosedError(err);
            }
            this[kStatus] = "closed";
            this[kQueue].drain();
            this.emit("closed");
          })();
          try {
            await this[kStatusChange];
          } finally {
            this[kStatusChange] = null;
          }
        } else if (this[kStatus] !== "closed") {
          throw new NotClosedError();
        }
      }
      async [kCloseResources]() {
        if (this[kResources].size === 0) {
          return;
        }
        const resources = Array.from(this[kResources]);
        const promises = resources.map(closeResource);
        return Promise.allSettled(promises).then(async (results) => {
          const errors = [];
          for (let i2 = 0; i2 < results.length; i2++) {
            if (results[i2].status === "fulfilled") {
              this[kResources].delete(resources[i2]);
            } else {
              errors.push(convertRejection(results[i2].reason));
            }
          }
          if (errors.length > 0) {
            throw combineErrors(errors);
          }
        });
      }
      async _close() {
      }
      async get(key, options) {
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.get(key, options));
        }
        assertOpen(this);
        const err = this._checkKey(key);
        if (err) throw err;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding.format;
        if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        const encodedKey = keyEncoding.encode(key);
        const value = await this._get(this.prefixKey(encodedKey, keyFormat, true), options);
        try {
          return value === void 0 ? value : valueEncoding.decode(value);
        } catch (err2) {
          throw new ModuleError("Could not decode value", {
            code: "LEVEL_DECODE_ERROR",
            cause: err2
          });
        }
      }
      async _get(key, options) {
        return void 0;
      }
      async getMany(keys, options) {
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.getMany(keys, options));
        }
        assertOpen(this);
        if (!Array.isArray(keys)) {
          throw new TypeError("The first argument 'keys' must be an array");
        }
        if (keys.length === 0) {
          return [];
        }
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding.format;
        if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        const mappedKeys = new Array(keys.length);
        for (let i2 = 0; i2 < keys.length; i2++) {
          const key = keys[i2];
          const err = this._checkKey(key);
          if (err) throw err;
          mappedKeys[i2] = this.prefixKey(keyEncoding.encode(key), keyFormat, true);
        }
        const values = await this._getMany(mappedKeys, options);
        try {
          for (let i2 = 0; i2 < values.length; i2++) {
            if (values[i2] !== void 0) {
              values[i2] = valueEncoding.decode(values[i2]);
            }
          }
        } catch (err) {
          throw new ModuleError(`Could not decode one or more of ${values.length} value(s)`, {
            code: "LEVEL_DECODE_ERROR",
            cause: err
          });
        }
        return values;
      }
      async _getMany(keys, options) {
        return new Array(keys.length).fill(void 0);
      }
      async put(key, value, options) {
        if (!this.hooks.prewrite.noop) {
          return this.batch([{ type: "put", key, value }], options);
        }
        options = getOptions(options, this[kDefaultOptions].entry);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.put(key, value, options));
        }
        assertOpen(this);
        const err = this._checkKey(key) || this._checkValue(value);
        if (err) throw err;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const valueEncoding = this.valueEncoding(options.valueEncoding);
        const keyFormat = keyEncoding.format;
        const valueFormat = valueEncoding.format;
        const enableWriteEvent = this[kEventMonitor].write;
        const original = options;
        if (options === this[kDefaultOptions].entry) {
          options = this[kDefaultOptions].entryFormat;
        } else if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
        }
        const encodedKey = keyEncoding.encode(key);
        const prefixedKey = this.prefixKey(encodedKey, keyFormat, true);
        const encodedValue = valueEncoding.encode(value);
        await this._put(prefixedKey, encodedValue, options);
        if (enableWriteEvent) {
          const op = Object.assign({}, original, {
            type: "put",
            key,
            value,
            keyEncoding,
            valueEncoding,
            encodedKey,
            encodedValue
          });
          this.emit("write", [op]);
        } else {
          this.emit("put", key, value);
        }
      }
      async _put(key, value, options) {
      }
      async del(key, options) {
        if (!this.hooks.prewrite.noop) {
          return this.batch([{ type: "del", key }], options);
        }
        options = getOptions(options, this[kDefaultOptions].key);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.del(key, options));
        }
        assertOpen(this);
        const err = this._checkKey(key);
        if (err) throw err;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        const keyFormat = keyEncoding.format;
        const enableWriteEvent = this[kEventMonitor].write;
        const original = options;
        if (options === this[kDefaultOptions].key) {
          options = this[kDefaultOptions].keyFormat;
        } else if (options.keyEncoding !== keyFormat) {
          options = Object.assign({}, options, { keyEncoding: keyFormat });
        }
        const encodedKey = keyEncoding.encode(key);
        const prefixedKey = this.prefixKey(encodedKey, keyFormat, true);
        await this._del(prefixedKey, options);
        if (enableWriteEvent) {
          const op = Object.assign({}, original, {
            type: "del",
            key,
            keyEncoding,
            encodedKey
          });
          this.emit("write", [op]);
        } else {
          this.emit("del", key);
        }
      }
      async _del(key, options) {
      }
      // TODO (future): add way for implementations to declare which options are for the
      // whole batch rather than defaults for individual operations. E.g. the sync option
      // of classic-level, that should not be copied to individual operations.
      batch(operations, options) {
        if (!arguments.length) {
          assertOpen(this);
          return this._chainedBatch();
        }
        options = getOptions(options, this[kDefaultOptions].empty);
        return this[kArrayBatch](operations, options);
      }
      // Wrapped for async error handling
      async [kArrayBatch](operations, options) {
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this[kArrayBatch](operations, options));
        }
        assertOpen(this);
        if (!Array.isArray(operations)) {
          throw new TypeError("The first argument 'operations' must be an array");
        }
        if (operations.length === 0) {
          return;
        }
        const length = operations.length;
        const enablePrewriteHook = !this.hooks.prewrite.noop;
        const enableWriteEvent = this[kEventMonitor].write;
        const publicOperations = enableWriteEvent ? new Array(length) : null;
        const privateOperations = new Array(length);
        const prewriteBatch = enablePrewriteHook ? new PrewriteBatch(this, privateOperations, publicOperations) : null;
        for (let i2 = 0; i2 < length; i2++) {
          const op = Object.assign({}, options, operations[i2]);
          const isPut = op.type === "put";
          const delegated = op.sublevel != null;
          const db = delegated ? op.sublevel : this;
          const keyError = db._checkKey(op.key);
          if (keyError != null) throw keyError;
          op.keyEncoding = db.keyEncoding(op.keyEncoding);
          if (isPut) {
            const valueError = db._checkValue(op.value);
            if (valueError != null) throw valueError;
            op.valueEncoding = db.valueEncoding(op.valueEncoding);
          } else if (op.type !== "del") {
            throw new TypeError("A batch operation must have a type property that is 'put' or 'del'");
          }
          if (enablePrewriteHook) {
            try {
              this.hooks.prewrite.run(op, prewriteBatch);
              op.keyEncoding = db.keyEncoding(op.keyEncoding);
              if (isPut) op.valueEncoding = db.valueEncoding(op.valueEncoding);
            } catch (err) {
              throw new ModuleError("The prewrite hook failed on batch()", {
                code: "LEVEL_HOOK_ERROR",
                cause: err
              });
            }
          }
          const keyEncoding = op.keyEncoding;
          const preencodedKey = keyEncoding.encode(op.key);
          const keyFormat = keyEncoding.format;
          const siblings = delegated && !isDescendant(op.sublevel, this) && op.sublevel !== this;
          const encodedKey = delegated && !siblings ? prefixDescendantKey(preencodedKey, keyFormat, db, this) : preencodedKey;
          if (delegated && !siblings) {
            op.sublevel = null;
          }
          let publicOperation = null;
          if (enableWriteEvent && !siblings) {
            publicOperation = Object.assign({}, op);
            publicOperation.encodedKey = encodedKey;
            if (delegated) {
              publicOperation.key = encodedKey;
              publicOperation.keyEncoding = this.keyEncoding(keyFormat);
            }
            publicOperations[i2] = publicOperation;
          }
          op.key = siblings ? encodedKey : this.prefixKey(encodedKey, keyFormat, true);
          op.keyEncoding = keyFormat;
          if (isPut) {
            const valueEncoding = op.valueEncoding;
            const encodedValue = valueEncoding.encode(op.value);
            const valueFormat = valueEncoding.format;
            op.value = encodedValue;
            op.valueEncoding = valueFormat;
            if (enableWriteEvent && !siblings) {
              publicOperation.encodedValue = encodedValue;
              if (delegated) {
                publicOperation.value = encodedValue;
                publicOperation.valueEncoding = this.valueEncoding(valueFormat);
              }
            }
          }
          privateOperations[i2] = op;
        }
        await this._batch(privateOperations, options);
        if (enableWriteEvent) {
          this.emit("write", publicOperations);
        } else if (!enablePrewriteHook) {
          this.emit("batch", operations);
        }
      }
      async _batch(operations, options) {
      }
      sublevel(name2, options) {
        const xopts = AbstractSublevel.defaults(options);
        const sublevel = this._sublevel(name2, xopts);
        if (!this.hooks.newsub.noop) {
          try {
            this.hooks.newsub.run(sublevel, xopts);
          } catch (err) {
            throw new ModuleError("The newsub hook failed on sublevel()", {
              code: "LEVEL_HOOK_ERROR",
              cause: err
            });
          }
        }
        return sublevel;
      }
      _sublevel(name2, options) {
        return new AbstractSublevel(this, name2, options);
      }
      prefixKey(key, keyFormat, local) {
        return key;
      }
      async clear(options) {
        options = getOptions(options, this[kDefaultOptions].empty);
        if (this[kStatus] === "opening") {
          return this.deferAsync(() => this.clear(options));
        }
        assertOpen(this);
        const original = options;
        const keyEncoding = this.keyEncoding(options.keyEncoding);
        options = rangeOptions(options, keyEncoding);
        options.keyEncoding = keyEncoding.format;
        if (options.limit !== 0) {
          await this._clear(options);
          this.emit("clear", original);
        }
      }
      async _clear(options) {
      }
      iterator(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options.keys = options.keys !== false;
        options.values = options.values !== false;
        options[AbstractIterator2.keyEncoding] = keyEncoding;
        options[AbstractIterator2.valueEncoding] = valueEncoding;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding.format;
        if (this[kStatus] === "opening") {
          return new DeferredIterator(this, options);
        }
        assertOpen(this);
        return this._iterator(options);
      }
      _iterator(options) {
        return new AbstractIterator2(this, options);
      }
      keys(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options[AbstractIterator2.keyEncoding] = keyEncoding;
        options[AbstractIterator2.valueEncoding] = valueEncoding;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding.format;
        if (this[kStatus] === "opening") {
          return new DeferredKeyIterator(this, options);
        }
        assertOpen(this);
        return this._keys(options);
      }
      _keys(options) {
        return new DefaultKeyIterator(this, options);
      }
      values(options) {
        const keyEncoding = this.keyEncoding(options && options.keyEncoding);
        const valueEncoding = this.valueEncoding(options && options.valueEncoding);
        options = rangeOptions(options, keyEncoding);
        options[AbstractIterator2.keyEncoding] = keyEncoding;
        options[AbstractIterator2.valueEncoding] = valueEncoding;
        options.keyEncoding = keyEncoding.format;
        options.valueEncoding = valueEncoding.format;
        if (this[kStatus] === "opening") {
          return new DeferredValueIterator(this, options);
        }
        assertOpen(this);
        return this._values(options);
      }
      _values(options) {
        return new DefaultValueIterator(this, options);
      }
      defer(fn, options) {
        if (typeof fn !== "function") {
          throw new TypeError("The first argument must be a function");
        }
        this[kQueue].add(function(abortError) {
          if (!abortError) fn();
        }, options);
      }
      deferAsync(fn, options) {
        if (typeof fn !== "function") {
          throw new TypeError("The first argument must be a function");
        }
        return new Promise((resolve, reject) => {
          this[kQueue].add(function(abortError) {
            if (abortError) reject(abortError);
            else fn().then(resolve, reject);
          }, options);
        });
      }
      // TODO: docs and types
      attachResource(resource) {
        if (typeof resource !== "object" || resource === null || typeof resource.close !== "function") {
          throw new TypeError("The first argument must be a resource object");
        }
        this[kResources].add(resource);
      }
      // TODO: docs and types
      detachResource(resource) {
        this[kResources].delete(resource);
      }
      _chainedBatch() {
        return new DefaultChainedBatch(this);
      }
      _checkKey(key) {
        if (key === null || key === void 0) {
          return new ModuleError("Key cannot be null or undefined", {
            code: "LEVEL_INVALID_KEY"
          });
        }
      }
      _checkValue(value) {
        if (value === null || value === void 0) {
          return new ModuleError("Value cannot be null or undefined", {
            code: "LEVEL_INVALID_VALUE"
          });
        }
      }
    };
    var { AbstractSublevel } = require_abstract_sublevel()({ AbstractLevel: AbstractLevel2 });
    exports2.AbstractLevel = AbstractLevel2;
    exports2.AbstractSublevel = AbstractSublevel;
    var assertOpen = function(db) {
      if (db[kStatus] !== "open") {
        throw new ModuleError("Database is not open", {
          code: "LEVEL_DATABASE_NOT_OPEN"
        });
      }
    };
    var assertUnlocked = function(db) {
      if (db[kStatusLocked]) {
        throw new ModuleError("Database status is locked", {
          code: "LEVEL_STATUS_LOCKED"
        });
      }
    };
    var formats = function(db) {
      return Object.keys(db.supports.encodings).filter((k) => !!db.supports.encodings[k]);
    };
    var closeResource = function(resource) {
      return resource.close();
    };
    var convertRejection = function(reason) {
      if (reason instanceof Error) {
        return reason;
      }
      if (Object.prototype.toString.call(reason) === "[object Error]") {
        return reason;
      }
      const hint = reason === null ? "null" : typeof reason;
      const msg = `Promise rejection reason must be an Error, received ${hint}`;
      return new TypeError(msg);
    };
    var NotOpenError = class extends ModuleError {
      constructor(cause) {
        super("Database failed to open", {
          code: "LEVEL_DATABASE_NOT_OPEN",
          cause
        });
      }
    };
    var NotClosedError = class extends ModuleError {
      constructor(cause) {
        super("Database failed to close", {
          code: "LEVEL_DATABASE_NOT_CLOSED",
          cause
        });
      }
    };
  }
});

// node_modules/abstract-level/index.js
var require_abstract_level2 = __commonJS({
  "node_modules/abstract-level/index.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.AbstractLevel = require_abstract_level().AbstractLevel;
    exports2.AbstractSublevel = require_abstract_level().AbstractSublevel;
    exports2.AbstractIterator = require_abstract_iterator().AbstractIterator;
    exports2.AbstractKeyIterator = require_abstract_iterator().AbstractKeyIterator;
    exports2.AbstractValueIterator = require_abstract_iterator().AbstractValueIterator;
    exports2.AbstractChainedBatch = require_abstract_chained_batch().AbstractChainedBatch;
  }
});

// node_modules/abstract-level/test/util.js
var require_util = __commonJS({
  "node_modules/abstract-level/test/util.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { AbstractLevel: AbstractLevel2, AbstractChainedBatch } = require_abstract_level2();
    var { AbstractIterator: AbstractIterator2, AbstractKeyIterator, AbstractValueIterator } = require_abstract_level2();
    exports2.illegalKeys = [
      { name: "null key", key: null },
      { name: "undefined key", key: void 0 }
    ];
    exports2.illegalValues = [
      { name: "null key", value: null },
      { name: "undefined value", value: void 0 }
    ];
    exports2.assertPromise = function(p2) {
      if (typeof p2 !== "object" || p2 === null || typeof p2.then !== "function") {
        throw new TypeError("Expected a promise");
      }
      return p2;
    };
    exports2.mockLevel = function(methods, ...args) {
      class TestLevel extends AbstractLevel2 {
      }
      for (const k in methods) TestLevel.prototype[k] = methods[k];
      if (!args.length) args = [{ encodings: { utf8: true } }];
      return new TestLevel(...args);
    };
    exports2.mockIterator = function(db, options, methods, ...args) {
      class TestIterator extends AbstractIterator2 {
      }
      for (const k in methods) TestIterator.prototype[k] = methods[k];
      return new TestIterator(db, options, ...args);
    };
    exports2.mockChainedBatch = function(db, methods, ...args) {
      class TestBatch extends AbstractChainedBatch {
      }
      for (const k in methods) TestBatch.prototype[k] = methods[k];
      return new TestBatch(db, ...args);
    };
    exports2.nullishEncoding = {
      name: "nullish",
      format: "utf8",
      encode(v2) {
        return v2 === null ? "\0" : v2 === void 0 ? "\xFF" : String(v2);
      },
      decode(v2) {
        return v2 === "\0" ? null : v2 === "\xFF" ? void 0 : v2;
      }
    };
    var kEntries = Symbol("entries");
    var kPosition = Symbol("position");
    var kOptions = Symbol("options");
    var MinimalLevel = class extends AbstractLevel2 {
      constructor(options) {
        super({ encodings: { utf8: true }, seek: true }, options);
        this[kEntries] = /* @__PURE__ */ new Map();
      }
      async _put(key, value, options) {
        this[kEntries].set(key, value);
      }
      async _get(key, options) {
        return this[kEntries].get(key);
      }
      async _getMany(keys, options) {
        return keys.map((k) => this[kEntries].get(k));
      }
      async _del(key, options) {
        this[kEntries].delete(key);
      }
      async _clear(options) {
        for (const [k] of sliceEntries(this[kEntries], options, true)) {
          this[kEntries].delete(k);
        }
      }
      async _batch(operations, options) {
        const entries = new Map(this[kEntries]);
        for (const op of operations) {
          if (op.type === "put") entries.set(op.key, op.value);
          else entries.delete(op.key);
        }
        this[kEntries] = entries;
      }
      _iterator(options) {
        return new MinimalIterator(this, options);
      }
      _keys(options) {
        return new MinimalKeyIterator(this, options);
      }
      _values(options) {
        return new MinimalValueIterator(this, options);
      }
    };
    var MinimalIterator = class extends AbstractIterator2 {
      constructor(db, options) {
        super(db, options);
        this[kEntries] = sliceEntries(db[kEntries], options, false);
        this[kOptions] = options;
        this[kPosition] = 0;
      }
    };
    var MinimalKeyIterator = class extends AbstractKeyIterator {
      constructor(db, options) {
        super(db, options);
        this[kEntries] = sliceEntries(db[kEntries], options, false);
        this[kOptions] = options;
        this[kPosition] = 0;
      }
    };
    var MinimalValueIterator = class extends AbstractValueIterator {
      constructor(db, options) {
        super(db, options);
        this[kEntries] = sliceEntries(db[kEntries], options, false);
        this[kOptions] = options;
        this[kPosition] = 0;
      }
    };
    for (const Ctor of [MinimalIterator, MinimalKeyIterator, MinimalValueIterator]) {
      const mapEntry = Ctor === MinimalIterator ? (e2) => e2.slice() : Ctor === MinimalKeyIterator ? (e2) => e2[0] : (e2) => e2[1];
      Ctor.prototype._next = async function() {
        const entry = this[kEntries][this[kPosition]++];
        if (entry === void 0) return void 0;
        return mapEntry(entry);
      };
      Ctor.prototype._nextv = async function(size, options) {
        const entries = this[kEntries].slice(this[kPosition], this[kPosition] + size);
        this[kPosition] += entries.length;
        return entries.map(mapEntry);
      };
      Ctor.prototype._all = async function(options) {
        const end = this.limit - this.count + this[kPosition];
        const entries = this[kEntries].slice(this[kPosition], end);
        this[kPosition] = this[kEntries].length;
        return entries.map(mapEntry);
      };
      Ctor.prototype._seek = function(target, options) {
        this[kPosition] = this[kEntries].length;
        if (!outOfRange(target, this[kOptions])) {
          for (let i2 = 0; i2 < this[kPosition]; i2++) {
            const key = this[kEntries][i2][0];
            if (this[kOptions].reverse ? key <= target : key >= target) {
              this[kPosition] = i2;
            }
          }
        }
      };
    }
    var outOfRange = function(target, options) {
      if ("gte" in options) {
        if (target < options.gte) return true;
      } else if ("gt" in options) {
        if (target <= options.gt) return true;
      }
      if ("lte" in options) {
        if (target > options.lte) return true;
      } else if ("lt" in options) {
        if (target >= options.lt) return true;
      }
      return false;
    };
    var sliceEntries = function(entries, options, applyLimit) {
      entries = Array.from(entries).filter((e2) => !outOfRange(e2[0], options)).sort((a2, b) => a2[0] > b[0] ? 1 : a2[0] < b[0] ? -1 : 0);
      if (options.reverse) entries.reverse();
      if (applyLimit && options.limit !== -1) entries = entries.slice(0, options.limit);
      return entries;
    };
    exports2.MinimalLevel = MinimalLevel;
  }
});

// node_modules/abstract-level/test/traits/open.js
var require_open = __commonJS({
  "node_modules/abstract-level/test/traits/open.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    module.exports = function(name2, testCommon, run) {
      const test = testCommon.test;
      test(`${name2} on open db`, async function(t2) {
        const db = testCommon.factory();
        await db.open();
        t2.is(db.status, "open");
        await run(t2, db);
        t2.is(db.status, "open");
        return db.close();
      });
      test(`${name2} on opening db`, async function(t2) {
        const db = testCommon.factory();
        t2.is(db.status, "opening");
        await run(t2, db);
        t2.is(db.status, "open");
        return db.close();
      });
      test(`${name2} on reopened db`, async function(t2) {
        const db = testCommon.factory();
        await db.close();
        t2.is(db.status, "closed");
        await db.open();
        t2.is(db.status, "open");
        await run(t2, db);
        t2.is(db.status, "open");
        return db.close();
      });
      test(`${name2} on reopening db`, async function(t2) {
        const db = testCommon.factory();
        await db.close();
        t2.is(db.status, "closed");
        const promise = db.open();
        t2.is(db.status, "opening");
        await run(t2, db);
        t2.is(db.status, "open");
        await promise;
        return db.close();
      });
    };
  }
});

// node_modules/abstract-level/test/traits/closed.js
var require_closed = __commonJS({
  "node_modules/abstract-level/test/traits/closed.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    module.exports = function(name2, testCommon, run) {
      const test = testCommon.test;
      for (const deferred of [false, true]) {
        test(`${name2} on closed db fails (deferred open: ${deferred})`, async function(t2) {
          let error;
          const db = testCommon.factory();
          if (!deferred) await db.open();
          await db.close();
          try {
            await run(t2, db);
          } catch (err) {
            error = err;
          }
          t2.is(error.code, "LEVEL_DATABASE_NOT_OPEN");
        });
        test(`${name2} on closing db fails (deferred open: ${deferred})`, async function(t2) {
          let error;
          const db = testCommon.factory();
          if (!deferred) await db.open();
          const promise = db.close();
          try {
            await run(t2, db);
          } catch (err) {
            error = err;
          }
          await promise;
          t2.is(error.code, "LEVEL_DATABASE_NOT_OPEN");
        });
      }
    };
  }
});

// node_modules/abstract-level/test/traits/index.js
var require_traits = __commonJS({
  "node_modules/abstract-level/test/traits/index.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.open = require_open();
    exports2.closed = require_closed();
  }
});

// node_modules/abstract-level/test/put-test.js
var require_put_test = __commonJS({
  "node_modules/abstract-level/test/put-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { illegalKeys, illegalValues, assertPromise } = require_util();
    var traits = require_traits();
    var db;
    exports2.setUp = function(test, testCommon) {
      test("put() setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
    };
    exports2.args = function(test, testCommon) {
      test("put() with illegal keys", function(t2) {
        t2.plan(illegalKeys.length * 2);
        for (const { name: name2, key } of illegalKeys) {
          db.put(key, "value").catch(function(err) {
            t2.ok(err instanceof Error, name2 + " - is Error");
            t2.is(err.code, "LEVEL_INVALID_KEY", name2 + " - correct error code");
          });
        }
      });
      test("put() with illegal values", function(t2) {
        t2.plan(illegalValues.length * 2);
        for (const { name: name2, value } of illegalValues) {
          db.put("key", value).catch(function(err) {
            t2.ok(err instanceof Error, name2 + " - is Error");
            t2.is(err.code, "LEVEL_INVALID_VALUE", name2 + " - correct error code");
          });
        }
      });
    };
    exports2.put = function(test, testCommon) {
      test("simple put()", async function(t2) {
        t2.is(await assertPromise(db.put("foo", "bar")), void 0, "void promise");
        t2.is(await db.get("foo"), "bar");
        await db.put("foo", "new");
        t2.is(await db.get("foo"), "new", "value was overwritten");
        await db.put("bar", "foo", {});
        t2.is(await db.get("bar"), "foo");
      });
      traits.open("put()", testCommon, async function(t2, db2) {
        t2.is(await assertPromise(db2.put("foo", "bar")), void 0, "void promise");
        t2.is(await db2.get("foo"), "bar", "value is ok");
      });
      traits.closed("put()", testCommon, async function(t2, db2) {
        return db2.put("foo", "bar");
      });
    };
    exports2.events = function(test, testCommon) {
      test("put() emits put event", async function(t2) {
        t2.plan(3);
        t2.ok(db.supports.events.put);
        db.on("put", function(key, value) {
          t2.is(key, 123);
          t2.is(value, "b");
        });
        await db.put(123, "b");
      });
    };
    exports2.tearDown = function(test, testCommon) {
      test("put() teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.args(test, testCommon);
      exports2.put(test, testCommon);
      exports2.events(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/get-test.js
var require_get_test = __commonJS({
  "node_modules/abstract-level/test/get-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { illegalKeys, assertPromise } = require_util();
    var traits = require_traits();
    var db;
    exports2.setUp = function(test, testCommon) {
      test("get() setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
    };
    exports2.args = function(test, testCommon) {
      test("get() with illegal keys", function(t2) {
        t2.plan(illegalKeys.length * 2);
        for (const { name: name2, key } of illegalKeys) {
          db.get(key).catch(function(err) {
            t2.ok(err instanceof Error, name2 + " - is Error");
            t2.is(err.code, "LEVEL_INVALID_KEY", name2 + " - correct error code");
          });
        }
      });
    };
    exports2.get = function(test, testCommon) {
      test("simple get()", async function(t2) {
        await db.put("foo", "bar");
        t2.is(await assertPromise(db.get("foo")), "bar");
        t2.is(await db.get("foo", {}), "bar");
        t2.is(await db.get("foo", { valueEncoding: "utf8" }), "bar");
      });
      test("get() on non-existent key", async function(t2) {
        for (const key of ["non-existent", Math.random()]) {
          t2.is(await assertPromise(db.get(key)), void 0, "not found");
        }
      });
      test("simultaneous get()", async function(t2) {
        t2.plan(20);
        await db.put("hello", "world");
        const promises = [];
        for (let i2 = 0; i2 < 10; ++i2) {
          promises.push(db.get("hello").then((value) => {
            t2.is(value, "world");
          }));
        }
        for (let i2 = 0; i2 < 10; ++i2) {
          promises.push(db.get("non-existent").then((value) => {
            t2.is(value, void 0, "not found");
          }));
        }
        return Promise.all(promises);
      });
      traits.open("get()", testCommon, async function(t2, db2) {
        t2.is(await assertPromise(db2.get("foo")), void 0, "void promise");
      });
      traits.closed("get()", testCommon, async function(t2, db2) {
        return db2.get("foo");
      });
    };
    exports2.tearDown = function(test, testCommon) {
      test("get() teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.args(test, testCommon);
      exports2.get(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/del-test.js
var require_del_test = __commonJS({
  "node_modules/abstract-level/test/del-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { illegalKeys, assertPromise } = require_util();
    var traits = require_traits();
    var db;
    exports2.setUp = function(test, testCommon) {
      test("del() setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
    };
    exports2.args = function(test, testCommon) {
      test("del() with illegal keys", function(t2) {
        t2.plan(illegalKeys.length * 2);
        for (const { name: name2, key } of illegalKeys) {
          db.del(key).catch(function(err) {
            t2.ok(err instanceof Error, name2 + " - is Error");
            t2.is(err.code, "LEVEL_INVALID_KEY", name2 + " - correct error code");
          });
        }
      });
    };
    exports2.del = function(test, testCommon) {
      test("simple del()", async function(t2) {
        await db.put("foo", "bar");
        t2.is(await db.get("foo"), "bar");
        t2.is(await assertPromise(db.del("foo")), void 0, "void promise");
        t2.is(await db.get("foo"), void 0, "not found");
      });
      test("del() on non-existent key", async function(t2) {
        for (const key of ["nope", Math.random()]) {
          t2.is(await assertPromise(db.del(key)), void 0, "void promise");
        }
      });
      traits.open("del()", testCommon, async function(t2, db2) {
        let emitted = false;
        db2.once("del", () => {
          emitted = true;
        });
        t2.is(await assertPromise(db2.del("foo")), void 0, "void promise");
        t2.ok(emitted);
      });
      traits.closed("del()", testCommon, async function(t2, db2) {
        return db2.del("foo");
      });
    };
    exports2.events = function(test, testCommon) {
      test("del() emits del event", async function(t2) {
        t2.plan(2);
        const db2 = testCommon.factory();
        await db2.open();
        t2.ok(db2.supports.events.del);
        db2.on("del", function(key) {
          t2.is(key, 456);
        });
        await db2.del(456);
        return db2.close();
      });
    };
    exports2.tearDown = function(test, testCommon) {
      test("del() teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.args(test, testCommon);
      exports2.del(test, testCommon);
      exports2.events(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/put-get-del-test.js
var require_put_get_del_test = __commonJS({
  "node_modules/abstract-level/test/put-get-del-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
    var db;
    function makeTest(test, type, key, value, expectedValue) {
      const stringValue = arguments.length === 5 ? expectedValue : value.toString();
      test("put(), get(), del() with " + type, async function(t2) {
        await db.put(key, value);
        t2.is((await db.get(key)).toString(), stringValue);
        await db.del(key);
        t2.is(await db.get(key), void 0, "not found");
      });
    }
    exports2.setUp = function(test, testCommon) {
      test("put(), get(), del() setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
    };
    exports2.nonErrorKeys = function(test, testCommon) {
      makeTest(test, "`0` key", 0, "foo 0");
      makeTest(test, "empty string key", 0, "foo");
      makeTest(
        test,
        "long String key",
        "some long string that I'm using as a key for this unit test, cross your fingers human, we're going in!",
        "foo"
      );
      if (testCommon.supports.encodings.buffer) {
        makeTest(test, "Buffer key", Buffer3.from("0080c0ff", "hex"), "foo");
        makeTest(test, "empty Buffer key", Buffer3.alloc(0), "foo");
      }
      makeTest(test, "Array value", "foo", [1, 2, 3, 4]);
    };
    exports2.nonErrorValues = function(test, testCommon) {
      makeTest(test, "`false` value", "foo false", false);
      makeTest(test, "`0` value", "foo 0", 0);
      makeTest(test, "`NaN` value", "foo NaN", NaN);
      makeTest(test, "empty String value", "foo", "", "");
      makeTest(test, "empty Buffer value", "foo", Buffer3.alloc(0), "");
      makeTest(test, "empty Array value", "foo", [], "");
      makeTest(
        test,
        "long String value",
        "foo",
        "some long string that I'm using as a key for this unit test, cross your fingers human, we're going in!"
      );
      if (testCommon.supports.encodings.buffer) {
        makeTest(test, "Buffer value", "foo", Buffer3.from("0080c0ff", "hex"));
      }
      makeTest(test, "Array key", [1, 2, 3, 4], "foo");
    };
    exports2.tearDown = function(test, testCommon) {
      test("put(), get(), del() teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.nonErrorKeys(test, testCommon);
      exports2.nonErrorValues(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/get-many-test.js
var require_get_many_test = __commonJS({
  "node_modules/abstract-level/test/get-many-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { illegalKeys, assertPromise } = require_util();
    var traits = require_traits();
    var db;
    exports2.setUp = function(test, testCommon) {
      test("getMany() setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
    };
    exports2.args = function(test, testCommon) {
      test("getMany() requires an array argument", function(t2) {
        t2.plan(6);
        db.getMany().catch(function(err) {
          t2.is(err.name, "TypeError");
          t2.is(err && err.message, "The first argument 'keys' must be an array");
        });
        db.getMany("foo").catch(function(err) {
          t2.is(err.name, "TypeError");
          t2.is(err && err.message, "The first argument 'keys' must be an array");
        });
        db.getMany("foo", {}).catch(function(err) {
          t2.is(err.name, "TypeError");
          t2.is(err && err.message, "The first argument 'keys' must be an array");
        });
      });
      test("getMany() with illegal keys", function(t2) {
        t2.plan(illegalKeys.length * 4);
        for (const { name: name2, key } of illegalKeys) {
          db.getMany([key]).catch(function(err) {
            t2.ok(err instanceof Error, name2 + " - is Error");
            t2.is(err.code, "LEVEL_INVALID_KEY", name2 + " - correct error code");
          });
          db.getMany(["valid", key]).catch(function(err) {
            t2.ok(err instanceof Error, name2 + " - is Error (second key)");
            t2.is(err.code, "LEVEL_INVALID_KEY", name2 + " - correct error code (second key)");
          });
        }
      });
    };
    exports2.getMany = function(test, testCommon) {
      test("simple getMany()", async function(t2) {
        await db.put("foo", "bar");
        t2.same(await assertPromise(db.getMany(["foo"])), ["bar"]);
        t2.same(await db.getMany(["foo"], {}), ["bar"]);
        t2.same(await db.getMany(["foo"], { valueEncoding: "utf8" }), ["bar"]);
      });
      test("getMany() with multiple keys", async function(t2) {
        await db.put("beep", "boop");
        t2.same(await db.getMany(["foo", "beep"]), ["bar", "boop"]);
        t2.same(await db.getMany(["beep", "foo"]), ["boop", "bar"], "maintains order of input keys");
      });
      test("empty getMany()", async function(t2) {
        t2.same(await db.getMany([]), []);
        const encodings = Object.keys(db.supports.encodings).filter((k) => db.supports.encodings[k]);
        for (const valueEncoding of encodings) {
          t2.same(await db.getMany([], { valueEncoding }), []);
        }
      });
      test("getMany() on non-existent keys", async function(t2) {
        t2.same(await db.getMany(["nope", "another"]), [void 0, void 0]);
        t2.same(await db.getMany(["beep", "another"]), ["boop", void 0]);
        t2.same(await db.getMany(["nope", "beep", Math.random()]), [void 0, "boop", void 0]);
        const encodings = Object.keys(db.supports.encodings).filter((k) => db.supports.encodings[k]);
        for (const valueEncoding of encodings) {
          t2.same(await db.getMany(["nope", "another"], { valueEncoding }), [void 0, void 0]);
        }
      });
      test("simultaneous getMany()", async function(t2) {
        t2.plan(20);
        await db.put("hello", "world");
        const promises = [];
        for (let i2 = 0; i2 < 10; ++i2) {
          promises.push(db.getMany(["hello"]).then(function(values) {
            t2.same(values, ["world"]);
          }));
        }
        for (let i2 = 0; i2 < 10; ++i2) {
          promises.push(db.getMany(["non-existent"]).then(function(values) {
            t2.same(values, [void 0]);
          }));
        }
        return Promise.all(promises);
      });
      traits.open("getMany()", testCommon, async function(t2, db2) {
        t2.same(await assertPromise(db2.getMany(["foo"])), [void 0]);
      });
      traits.closed("getMany()", testCommon, async function(t2, db2) {
        return db2.getMany(["foo"]);
      });
      traits.open("getMany() with empty array", testCommon, async function(t2, db2) {
        t2.same(await assertPromise(db2.getMany([])), []);
      });
      traits.closed("getMany() with empty array", testCommon, async function(t2, db2) {
        return db2.getMany([]);
      });
    };
    exports2.tearDown = function(test, testCommon) {
      test("getMany() teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.args(test, testCommon);
      exports2.getMany(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/batch-test.js
var require_batch_test = __commonJS({
  "node_modules/abstract-level/test/batch-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
    var { illegalKeys, illegalValues } = require_util();
    var db;
    exports2.setUp = function(test, testCommon) {
      test("batch([]) setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
    };
    exports2.args = function(test, testCommon) {
      test("batch([]) with missing value fails", function(t2) {
        t2.plan(1);
        db.batch([{ type: "put", key: "foo1" }]).catch((err) => {
          t2.is(err.code, "LEVEL_INVALID_VALUE", "correct error code");
        });
      });
      test("batch([]) with illegal values fails", function(t2) {
        t2.plan(illegalValues.length * 2);
        for (const { name: name2, value } of illegalValues) {
          db.batch([{ type: "put", key: "foo1", value }]).catch(function(err) {
            t2.ok(err instanceof Error, name2 + " - is Error");
            t2.is(err.code, "LEVEL_INVALID_VALUE", name2 + " - correct error code");
          });
        }
      });
      test("batch([]) with missing key fails", function(t2) {
        t2.plan(1);
        db.batch([{ type: "put", value: "foo1" }]).catch(function(err) {
          t2.is(err.code, "LEVEL_INVALID_KEY", "correct error code");
        });
      });
      test("batch([]) with illegal keys fails", function(t2) {
        t2.plan(illegalKeys.length * 2);
        for (const { name: name2, key } of illegalKeys) {
          db.batch([{ type: "put", key, value: "foo1" }]).catch(function(err) {
            t2.ok(err instanceof Error, name2 + " - is Error");
            t2.is(err.code, "LEVEL_INVALID_KEY", name2 + " - correct error code");
          });
        }
      });
      test("batch([]) with missing or incorrect type fails", function(t2) {
        t2.plan(4);
        db.batch([{ key: "key", value: "value" }]).catch(function(err) {
          t2.is(err.name, "TypeError");
          t2.is(err.message, "A batch operation must have a type property that is 'put' or 'del'", "correct error message");
        });
        db.batch([{ key: "key", value: "value", type: "foo" }]).catch(function(err) {
          t2.is(err.name, "TypeError");
          t2.is(err.message, "A batch operation must have a type property that is 'put' or 'del'", "correct error message");
        });
      });
      test("batch([]) with missing or nullish operations fails", function(t2) {
        t2.plan(2 * 2);
        for (const array of [null, void 0]) {
          db.batch(array).catch(function(err) {
            t2.is(err.name, "TypeError");
            t2.is(err.message, "The first argument 'operations' must be an array", "correct error message");
          });
        }
      });
      test("batch([]) with empty operations array and empty options", async function(t2) {
        await db.batch([]);
        await db.batch([], null);
        await db.batch([], void 0);
        await db.batch([], {});
      });
      [null, void 0, 1, true].forEach(function(operation) {
        const type = operation === null ? "null" : typeof operation;
        test(`batch([]) with ${type} operation fails`, function(t2) {
          t2.plan(1);
          db.batch([operation]).catch(function(err) {
            t2.ok(err.name === "TypeError" || err.code === "LEVEL_INVALID_KEY");
          });
        });
      });
    };
    exports2.batch = function(test, testCommon) {
      test("simple batch([])", async function(t2) {
        const db2 = testCommon.factory();
        await db2.open();
        await db2.batch([{ type: "del", key: "non-existent" }]);
        t2.is(await db2.get("foo"), void 0, "not found");
        await db2.batch([{ type: "put", key: "foo", value: "bar" }]);
        t2.is(await db2.get("foo"), "bar");
        await db2.batch([{ type: "del", key: "foo" }]);
        t2.is(await db2.get("foo"), void 0, "not found");
        return db2.close();
      });
      test("batch([]) with multiple operations", async function(t2) {
        t2.plan(3);
        await db.batch([
          { type: "put", key: "foobatch1", value: "bar1" },
          { type: "put", key: "foobatch2", value: "bar2" },
          { type: "put", key: "foobatch3", value: "bar3" },
          { type: "del", key: "foobatch2" }
        ]);
        const promises = [
          db.get("foobatch1").then(function(value) {
            t2.is(value, "bar1");
          }),
          db.get("foobatch2").then(function(value) {
            t2.is(value, void 0, "not found");
          }),
          db.get("foobatch3").then(function(value) {
            t2.is(value, "bar3");
          })
        ];
        return Promise.all(promises);
      });
      for (const encoding of ["utf8", "buffer", "view"]) {
        if (!testCommon.supports.encodings[encoding]) continue;
        test(`empty values in batch with ${encoding} valueEncoding`, async function(t2) {
          const db2 = testCommon.factory({ valueEncoding: encoding });
          const values = ["", Uint8Array.from([]), Buffer3.alloc(0)];
          const expected = encoding === "utf8" ? values[0] : encoding === "view" ? values[1] : values[2];
          await db2.open();
          await db2.batch(values.map((value, i2) => ({ type: "put", key: String(i2), value })));
          for (let i2 = 0; i2 < values.length; i2++) {
            const value = await db2.get(String(i2));
            if (encoding === "view" && Buffer3.isBuffer(value)) {
              t2.same(value, values[2]);
            } else {
              t2.same(value, expected);
            }
          }
          return db2.close();
        });
        test(`empty keys in batch with ${encoding} keyEncoding`, async function(t2) {
          const db2 = testCommon.factory({ keyEncoding: encoding });
          const keys = ["", Uint8Array.from([]), Buffer3.alloc(0)];
          await db2.open();
          for (let i2 = 0; i2 < keys.length; i2++) {
            await db2.batch([{ type: "put", key: keys[i2], value: String(i2) }]);
            t2.same(await db2.get(keys[i2]), String(i2), `got value ${i2}`);
          }
          return db2.close();
        });
      }
    };
    exports2.atomic = function(test, testCommon) {
      test("batch([]) is atomic", async function(t2) {
        t2.plan(3);
        try {
          await db.batch([
            { type: "put", key: "foobah1", value: "bar1" },
            { type: "put", value: "bar2" },
            { type: "put", key: "foobah3", value: "bar3" }
          ]);
        } catch (err) {
          t2.is(err.code, "LEVEL_INVALID_KEY", "should error and not commit anything");
        }
        t2.is(await db.get("foobah1"), void 0, "not found");
        t2.is(await db.get("foobah3"), void 0, "not found");
      });
    };
    exports2.events = function(test, testCommon) {
      test("batch([]) emits batch event", async function(t2) {
        t2.plan(2);
        const db2 = testCommon.factory();
        await db2.open();
        t2.ok(db2.supports.events.batch);
        db2.on("batch", function(ops) {
          t2.same(ops, [{ type: "put", key: 456, value: 99, custom: 123 }]);
        });
        await db2.batch([{ type: "put", key: 456, value: 99, custom: 123 }]);
        return db2.close();
      });
    };
    exports2.tearDown = function(test, testCommon) {
      test("batch([]) teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.args(test, testCommon);
      exports2.batch(test, testCommon);
      exports2.atomic(test, testCommon);
      exports2.events(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/chained-batch-test.js
var require_chained_batch_test = __commonJS({
  "node_modules/abstract-level/test/chained-batch-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var db;
    exports2.setUp = function(test, testCommon) {
      test("chained batch setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
    };
    exports2.args = function(test, testCommon) {
      test("chained batch has db reference", async function(t2) {
        const batch = db.batch();
        t2.ok(batch.db === db);
        return batch.close();
      });
      test("chained batch.put() with missing or nullish value fails", async function(t2) {
        t2.plan(3 * 2);
        for (const args of [[null], [void 0], []]) {
          const batch = db.batch();
          try {
            batch.put("key", ...args);
          } catch (err) {
            t2.is(err.code, "LEVEL_INVALID_VALUE", "correct error code");
            t2.is(batch.length, 0, "length is not incremented on error");
          }
          await batch.close();
        }
      });
      test("chained batch.put() with missing of nullish key fails", async function(t2) {
        t2.plan(3 * 2);
        for (const args of [[], [null, "foo"], [void 0, "foo"]]) {
          const batch = db.batch();
          try {
            batch.put(...args);
          } catch (err) {
            t2.is(err.code, "LEVEL_INVALID_KEY", "correct error code");
            t2.is(batch.length, 0, "length is not incremented on error");
          }
          await batch.close();
        }
      });
      test("chained batch.del() with missing or nullish key fails", async function(t2) {
        t2.plan(3 * 2);
        for (const args of [[null], [void 0], []]) {
          const batch = db.batch();
          try {
            batch.del(...args);
          } catch (err) {
            t2.is(err.code, "LEVEL_INVALID_KEY", "correct error code");
            t2.is(batch.length, 0, "length is not incremented on error");
          }
          await batch.close();
        }
      });
      test("chained batch.clear() does not throw if empty", async function(t2) {
        return db.batch().clear().close();
      });
      test("chained batch.put() after write() fails", async function(t2) {
        t2.plan(1);
        const batch = db.batch().put("foo", "bar");
        await batch.write();
        try {
          batch.put("boom", "bang");
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN", "correct error code");
        }
      });
      test("chained batch.del() after write() fails", async function(t2) {
        t2.plan(1);
        const batch = db.batch().put("foo", "bar");
        await batch.write();
        try {
          batch.del("foo");
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN", "correct error code");
        }
      });
      test("chained batch.clear() after write() fails", async function(t2) {
        t2.plan(1);
        const batch = db.batch().put("foo", "bar");
        await batch.write();
        try {
          batch.clear();
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN", "correct error code");
        }
      });
      test("chained batch.write() after write() fails", async function(t2) {
        t2.plan(1);
        const batch = db.batch().put("foo", "bar");
        await batch.write();
        try {
          await batch.write();
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN", "correct error code");
        }
      });
      test("chained batch.write() after close() fails", async function(t2) {
        t2.plan(1);
        const batch = db.batch().put("foo", "bar");
        await batch.close();
        try {
          await batch.write();
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN", "correct error code");
        }
      });
      test("chained batch.write() with no operations", async function(t2) {
        return db.batch().write();
      });
      test("chained batch.close() with no operations", async function(t2) {
        return db.batch().close();
      });
      test("chained batch.close() is idempotent", async function(t2) {
        const batch = db.batch();
        await batch.close();
        await batch.close();
        return Promise.all([batch.close(), batch.close()]);
      });
    };
    exports2.batch = function(test, testCommon) {
      test("simple chained batch", async function(t2) {
        await db.batch([
          { type: "put", key: "one", value: "1" },
          { type: "put", key: "two", value: "2" },
          { type: "put", key: "three", value: "3" }
        ]);
        const batch = db.batch().put("1", "one").del("2", "two").put("3", "three");
        t2.is(batch.length, 3, "length was incremented");
        batch.clear();
        t2.is(batch.length, 0, "length is reset");
        batch.put("one", "I").put("two", "II").del("three").put("foo", "bar");
        t2.is(batch.length, 4, "length was incremented");
        await batch.write();
        t2.same(await db.iterator().all(), [
          ["foo", "bar"],
          ["one", "I"],
          ["two", "II"]
        ]);
      });
      test("chained batch requires database to be open", async function(t2) {
        t2.plan(5);
        const db1 = testCommon.factory();
        const db2 = testCommon.factory();
        try {
          db1.batch();
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
        }
        await db2.open();
        const batch = db2.batch();
        await db2.close();
        try {
          batch.put("beep", "boop");
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN");
        }
        try {
          batch.del("456");
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN");
        }
        try {
          batch.clear();
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN");
        }
        try {
          await batch.write();
        } catch (err) {
          t2.is(err.code, "LEVEL_BATCH_NOT_OPEN");
        }
        await batch.close();
        return Promise.all([db1.close(), db2.close()]);
      });
      test("chained batch with per-operation encoding options", async function(t2) {
        t2.plan(2);
        const db2 = testCommon.factory();
        await db2.open();
        db2.once("batch", function(operations) {
          t2.same(operations, [
            { type: "put", key: "a", value: "a", valueEncoding: "json" },
            { type: "put", key: "b", value: "b" },
            { type: "put", key: '"c"', value: "c" },
            { type: "del", key: "c", keyEncoding: "json", arbitraryOption: true }
          ]);
        });
        await db2.batch().put("a", "a", { valueEncoding: "json" }).put("b", "b").put('"c"', "c").del("c", { keyEncoding: "json", arbitraryOption: true }).write();
        t2.same(await db2.iterator().all(), [
          ["a", '"a"'],
          ["b", "b"]
        ]);
        return db2.close();
      });
    };
    exports2.events = function(test, testCommon) {
      test("chained batch emits batch event", async function(t2) {
        t2.plan(2);
        const db2 = testCommon.factory();
        await db2.open();
        t2.ok(db2.supports.events.batch);
        db2.on("batch", function(ops) {
          t2.same(ops, [
            { type: "put", key: 987, value: "b", custom: 123 },
            { type: "del", key: 216, custom: 999 }
          ]);
        });
        await db2.batch().put(987, "b", { custom: 123 }).del(216, { custom: 999 }).write();
        await db2.close();
      });
      test("db.close() on chained batch event", async function(t2) {
        const db2 = testCommon.factory();
        await db2.open();
        let promise;
        db2.on("batch", function() {
          promise = db2.close();
        });
        await db2.batch().put("a", "b").write();
        await promise;
        t2.ok(promise, "event was emitted");
      });
    };
    exports2.tearDown = function(test, testCommon) {
      test("chained batch teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.args(test, testCommon);
      exports2.batch(test, testCommon);
      exports2.events(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/iterator-test.js
var require_iterator_test = __commonJS({
  "node_modules/abstract-level/test/iterator-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
    var identity = (v2) => v2;
    var db;
    exports2.setUp = function(test, testCommon) {
      test("iterator setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
    };
    exports2.args = function(test, testCommon) {
      for (const mode of ["iterator", "keys", "values"]) {
        test(`${mode}() has db reference`, async function(t2) {
          const it = db[mode]();
          t2.ok(it.db === db || it.db === (db.db || db._db || db));
          await it.close();
        });
        test(`${mode}() has limit and count properties`, async function(t2) {
          const iterators = [db[mode]()];
          t2.is(iterators[0].limit, Infinity, "defaults to infinite");
          for (const limit of [-1, 0, 1, Infinity]) {
            const it = db[mode]({ limit });
            iterators.push(it);
            t2.is(it.limit, limit === -1 ? Infinity : limit, "has limit property");
          }
          t2.ok(iterators.every((it) => it.count === 0), "has count property");
          await Promise.all(iterators.map((it) => it.close()));
        });
        test(`${mode}().nextv() yields error if size is invalid`, async function(t2) {
          t2.plan(4);
          const it = db[mode]();
          for (const args of [[], [NaN], ["1"], [2.5]]) {
            try {
              await it.nextv(...args);
            } catch (err) {
              t2.is(err.message, "The first argument 'size' must be an integer");
            }
          }
          await it.close();
        });
      }
    };
    exports2.sequence = function(test, testCommon) {
      for (const mode of ["iterator", "keys", "values"]) {
        test(`${mode}().close() is idempotent`, async function(t2) {
          const iterator = db[mode]();
          await iterator.close();
          await iterator.close();
          return Promise.all([iterator.close(), iterator.close()]);
        });
        for (const method of ["next", "nextv", "all"]) {
          const requiredArgs = method === "nextv" ? [1] : [];
          test(`${mode}().${method}() after close() yields error`, async function(t2) {
            t2.plan(1);
            const iterator = db[mode]();
            await iterator.close();
            try {
              await iterator[method](...requiredArgs);
            } catch (err) {
              t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN", "correct message");
            }
          });
          for (const otherMethod of ["next", "nextv", "all"]) {
            const otherRequiredArgs = otherMethod === "nextv" ? [1] : [];
            test(`${mode}().${method}() while busy with ${otherMethod}() yields error`, async function(t2) {
              t2.plan(1);
              const iterator = db[mode]();
              const promise = iterator[otherMethod](...otherRequiredArgs);
              try {
                await iterator[method](...requiredArgs);
              } catch (err) {
                t2.is(err.code, "LEVEL_ITERATOR_BUSY");
              }
              await promise;
              return iterator.close();
            });
          }
          for (const deferred of [false, true]) {
            test(`${mode}().${method}() during close() yields error (deferred: ${deferred})`, async function(t2) {
              t2.plan(2);
              const db2 = testCommon.factory();
              if (!deferred) await db2.open();
              const it = db2[mode]();
              let promise = it[method](...requiredArgs).then(() => {
                t2.pass("Optionally succeeded");
              }, (err) => {
                t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
              });
              promise = promise.then(() => {
                return it[method](...requiredArgs).then(() => {
                  t2.fail("Expected an error");
                }, (err) => {
                  t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
                });
              });
              await Promise.all([it.close(), promise]);
              return db2.close();
            });
          }
          if (globalThis.AbortController) {
            test(`${mode}().${method}() with aborted signal yields error (deferred)`, async function(t2) {
              t2.plan(3);
              const db2 = testCommon.factory();
              const ac = new globalThis.AbortController();
              const it = db2[mode]({ signal: ac.signal });
              t2.is(db2.status, "opening", "is deferred");
              ac.abort();
              try {
                await it[method](...requiredArgs);
              } catch (err) {
                t2.is(err.code, "LEVEL_ABORTED");
                t2.is(err.name, "AbortError");
              }
              await it.close();
              return db2.close();
            });
          }
          if (globalThis.AbortController && testCommon.supports.signals && testCommon.supports.signals.iterators) {
            test(`${mode}().${method}() with signal yields error when aborted`, async function(t2) {
              t2.plan(2);
              const db2 = testCommon.factory();
              await db2.open();
              await db2.batch().put("a", "a").put("b", "b").write();
              const ac = new globalThis.AbortController();
              const it = db2[mode]({ signal: ac.signal });
              const promise = it[method](...requiredArgs);
              ac.abort();
              try {
                await promise;
              } catch (err) {
                t2.is(err.code, "LEVEL_ABORTED");
                t2.is(err.name, "AbortError");
              }
              await it.close();
              return db2.close();
            });
            test(`${mode}().${method}() with non-aborted signal`, async function(t2) {
              const db2 = testCommon.factory();
              await db2.open();
              await db2.batch().put("a", "a").put("b", "b").write();
              const ac = new globalThis.AbortController();
              const it = db2[mode]({ signal: ac.signal });
              await it[method](...requiredArgs);
              await it.close();
              return db2.close();
            });
          }
        }
      }
    };
    exports2.iterator = function(test, testCommon) {
      test("iterator data setup", function(t2) {
        return db.batch([
          { type: "put", key: "foobatch1", value: "bar1" },
          { type: "put", key: "foobatch2", value: "bar2" },
          { type: "put", key: "foobatch3", value: "bar3" }
        ]);
      });
      test("simple iterator().next()", async function(t2) {
        const iterator = db.iterator();
        t2.same(await iterator.next(), ["foobatch1", "bar1"]);
        t2.same(await iterator.next(), ["foobatch2", "bar2"]);
        t2.same(await iterator.next(), ["foobatch3", "bar3"]);
        t2.is(await iterator.next(), void 0);
        return iterator.close();
      });
      test("iterator().next() with values: false", async function(t2) {
        const it = db.iterator({ values: false });
        t2.same(await it.next(), ["foobatch1", void 0]);
        t2.same(await it.next(), ["foobatch2", void 0]);
        t2.same(await it.next(), ["foobatch3", void 0]);
        t2.is(await it.next(), void 0);
        return it.close();
      });
      test("iterator().next() with keys: false", async function(t2) {
        const it = db.iterator({ keys: false });
        t2.same(await it.next(), [void 0, "bar1"]);
        t2.same(await it.next(), [void 0, "bar2"]);
        t2.same(await it.next(), [void 0, "bar3"]);
        t2.is(await it.next(), void 0);
        return it.close();
      });
      test("keys().next()", async function(t2) {
        const it = db.keys();
        t2.is(await it.next(), "foobatch1");
        t2.is(await it.next(), "foobatch2");
        t2.is(await it.next(), "foobatch3");
        t2.is(await it.next(), void 0);
        return it.close();
      });
      test("values().next()", async function(t2) {
        const it = db.values();
        t2.is(await it.next(), "bar1");
        t2.is(await it.next(), "bar2");
        t2.is(await it.next(), "bar3");
        t2.is(await it.next(), void 0);
        return it.close();
      });
      for (const mode of ["iterator", "keys", "values"]) {
        const mapEntry = (e2) => mode === "iterator" ? e2 : mode === "keys" ? e2[0] : e2[1];
        test(`${mode}().nextv()`, async function(t2) {
          const it = db[mode]();
          t2.same(await it.nextv(1), [["foobatch1", "bar1"]].map(mapEntry));
          t2.same(await it.nextv(2, {}), [["foobatch2", "bar2"], ["foobatch3", "bar3"]].map(mapEntry));
          t2.same(await it.nextv(2), []);
          await it.close();
        });
        test(`${mode}().nextv() in reverse`, async function(t2) {
          const it = db[mode]({ reverse: true });
          t2.same(await it.nextv(1), [["foobatch3", "bar3"]].map(mapEntry));
          t2.same(await it.nextv(2, {}), [["foobatch2", "bar2"], ["foobatch1", "bar1"]].map(mapEntry));
          t2.same(await it.nextv(2), []);
          await it.close();
        });
        test(`${mode}().nextv() has soft minimum of 1`, async function(t2) {
          const it = db[mode]();
          t2.same(await it.nextv(0), [["foobatch1", "bar1"]].map(mapEntry));
          t2.same(await it.nextv(0), [["foobatch2", "bar2"]].map(mapEntry));
          t2.same(await it.nextv(0, {}), [["foobatch3", "bar3"]].map(mapEntry));
          t2.same(await it.nextv(0), []);
          await it.close();
        });
        test(`${mode}().nextv() requesting more than available`, async function(t2) {
          const it = db[mode]();
          t2.same(await it.nextv(10), [
            ["foobatch1", "bar1"],
            ["foobatch2", "bar2"],
            ["foobatch3", "bar3"]
          ].map(mapEntry));
          t2.same(await it.nextv(10), []);
          await it.close();
        });
        test(`${mode}().nextv() honors limit`, async function(t2) {
          const it = db[mode]({ limit: 2 });
          t2.same(await it.nextv(10), [["foobatch1", "bar1"], ["foobatch2", "bar2"]].map(mapEntry));
          t2.same(await it.nextv(10), []);
          await it.close();
        });
        test(`${mode}().nextv() honors limit and size`, async function(t2) {
          const it = db[mode]({ limit: 2 });
          t2.same(await it.nextv(1), [["foobatch1", "bar1"]].map(mapEntry));
          t2.same(await it.nextv(10), [["foobatch2", "bar2"]].map(mapEntry));
          t2.same(await it.nextv(10), []);
          await it.close();
        });
        test(`${mode}().nextv() honors limit in reverse`, async function(t2) {
          const it = db[mode]({ limit: 2, reverse: true });
          t2.same(await it.nextv(10), [["foobatch3", "bar3"], ["foobatch2", "bar2"]].map(mapEntry));
          t2.same(await it.nextv(10), []);
          await it.close();
        });
        test(`${mode}().nextv() honors limit and size in reverse`, async function(t2) {
          const it = db[mode]({ limit: 2, reverse: true });
          t2.same(await it.nextv(1), [["foobatch3", "bar3"]].map(mapEntry));
          t2.same(await it.nextv(10), [["foobatch2", "bar2"]].map(mapEntry));
          t2.same(await it.nextv(10), []);
          await it.close();
        });
        test(`${mode}().all()`, async function(t2) {
          t2.same(await db[mode]().all(), [
            ["foobatch1", "bar1"],
            ["foobatch2", "bar2"],
            ["foobatch3", "bar3"]
          ].map(mapEntry));
          t2.same(await db[mode]().all({}), [
            ["foobatch1", "bar1"],
            ["foobatch2", "bar2"],
            ["foobatch3", "bar3"]
          ].map(mapEntry));
        });
        test(`${mode}().all() with keys: false`, async function(t2) {
          t2.same(await db[mode]({ keys: false }).all(), [
            [mode === "iterator" ? void 0 : "foobatch1", "bar1"],
            [mode === "iterator" ? void 0 : "foobatch2", "bar2"],
            [mode === "iterator" ? void 0 : "foobatch3", "bar3"]
          ].map(mapEntry));
        });
        test(`${mode}().all() with values: false`, async function(t2) {
          t2.same(await db[mode]({ values: false }).all(), [
            ["foobatch1", mode === "iterator" ? void 0 : "bar1"],
            ["foobatch2", mode === "iterator" ? void 0 : "bar2"],
            ["foobatch3", mode === "iterator" ? void 0 : "bar3"]
          ].map(mapEntry));
        });
        test(`${mode}().all() in reverse`, async function(t2) {
          t2.same(await db[mode]({ reverse: true }).all(), [
            ["foobatch3", "bar3"],
            ["foobatch2", "bar2"],
            ["foobatch1", "bar1"]
          ].map(mapEntry));
        });
        test(`${mode}().all() honors limit`, async function(t2) {
          t2.same(await db[mode]({ limit: 2 }).all(), [
            ["foobatch1", "bar1"],
            ["foobatch2", "bar2"]
          ].map(mapEntry));
          const it = db[mode]({ limit: 2 });
          t2.same(await it.next(), mapEntry(["foobatch1", "bar1"]));
          t2.same(await it.all(), [["foobatch2", "bar2"]].map(mapEntry));
        });
        test(`${mode}().all() honors limit in reverse`, async function(t2) {
          t2.same(await db[mode]({ limit: 2, reverse: true }).all(), [
            ["foobatch3", "bar3"],
            ["foobatch2", "bar2"]
          ].map(mapEntry));
          const it = db[mode]({ limit: 2, reverse: true });
          t2.same(await it.next(), mapEntry(["foobatch3", "bar3"]));
          t2.same(await it.all(), [["foobatch2", "bar2"]].map(mapEntry));
        });
      }
      test("iterator() sorts lexicographically", async function(t2) {
        const db2 = testCommon.factory();
        await db2.open();
        await db2.put("f", "F");
        await db2.put("a", "A");
        await db2.put("~", "~");
        await db2.put("e", "E");
        await db2.put("\u{1F404}", "\u{1F404}");
        await db2.batch([
          { type: "put", key: "d", value: "D" },
          { type: "put", key: "b", value: "B" },
          { type: "put", key: "ff", value: "FF" },
          { type: "put", key: "a\u{1F404}", value: "A\u{1F404}" }
        ]);
        await db2.batch([
          { type: "put", key: "", value: "empty" },
          { type: "put", key: "2", value: "2" },
          { type: "put", key: "12", value: "12" },
          { type: "put", key: "	", value: "	" }
        ]);
        t2.same(await db2.iterator().all(), [
          ["", "empty"],
          ["	", "	"],
          ["12", "12"],
          ["2", "2"],
          ["a", "A"],
          ["a\u{1F404}", "A\u{1F404}"],
          ["b", "B"],
          ["d", "D"],
          ["e", "E"],
          ["f", "F"],
          ["ff", "FF"],
          ["~", "~"],
          ["\u{1F404}", "\u{1F404}"]
        ]);
        t2.same(await db2.iterator({ lte: "" }).all(), [
          ["", "empty"]
        ]);
        return db2.close();
      });
      for (const keyEncoding of ["buffer", "view"]) {
        if (!testCommon.supports.encodings[keyEncoding]) continue;
        test(`iterators have byte order (${keyEncoding} encoding)`, async function(t2) {
          const db2 = testCommon.factory({ keyEncoding });
          await db2.open();
          const ctor = keyEncoding === "buffer" ? Buffer3 : Uint8Array;
          const bytes = [2, 11, 1];
          const keys = bytes.map((b) => ctor.from([b]));
          const values = bytes.map((b) => String(b));
          await db2.batch(keys.map((key, i2) => ({ type: "put", key, value: values[i2] })));
          t2.same((await db2.keys().all()).map((k) => k[0]), [1, 2, 11], "order of keys() is ok");
          t2.same((await db2.iterator().all()).map((e2) => e2[0][0]), [1, 2, 11], "order of iterator() is ok");
          t2.same(await db2.values().all(), ["1", "2", "11"], "order of values() is ok");
          return db2.close();
        });
        test(`iterator() with byte range (${keyEncoding} encoding)`, async function(t2) {
          const db2 = testCommon.factory({ keyEncoding });
          await db2.open();
          await db2.put(Uint8Array.from([0]), "0");
          await db2.put(Uint8Array.from([128]), "128");
          await db2.put(Uint8Array.from([160]), "160");
          await db2.put(Uint8Array.from([192]), "192");
          const collect = async (range) => {
            const entries = await db2.iterator(range).all();
            t2.ok(entries.every((e2) => e2[0] instanceof Uint8Array));
            t2.ok(entries.every((e2) => e2[1] === String(e2[0][0])));
            return entries.map((e2) => e2[0][0]);
          };
          t2.same(await collect({ gt: Uint8Array.from([255]) }), []);
          t2.same(await collect({ gt: Uint8Array.from([192]) }), []);
          t2.same(await collect({ gt: Uint8Array.from([160]) }), [192]);
          t2.same(await collect({ gt: Uint8Array.from([128]) }), [160, 192]);
          t2.same(await collect({ gt: Uint8Array.from([0]) }), [128, 160, 192]);
          t2.same(await collect({ gt: Uint8Array.from([]) }), [0, 128, 160, 192]);
          t2.same(await collect({ lt: Uint8Array.from([255]) }), [0, 128, 160, 192]);
          t2.same(await collect({ lt: Uint8Array.from([192]) }), [0, 128, 160]);
          t2.same(await collect({ lt: Uint8Array.from([160]) }), [0, 128]);
          t2.same(await collect({ lt: Uint8Array.from([128]) }), [0]);
          t2.same(await collect({ lt: Uint8Array.from([0]) }), []);
          t2.same(await collect({ lt: Uint8Array.from([]) }), []);
          t2.same(await collect({ gte: Uint8Array.from([255]) }), []);
          t2.same(await collect({ gte: Uint8Array.from([192]) }), [192]);
          t2.same(await collect({ gte: Uint8Array.from([160]) }), [160, 192]);
          t2.same(await collect({ gte: Uint8Array.from([128]) }), [128, 160, 192]);
          t2.same(await collect({ gte: Uint8Array.from([0]) }), [0, 128, 160, 192]);
          t2.same(await collect({ gte: Uint8Array.from([]) }), [0, 128, 160, 192]);
          t2.same(await collect({ lte: Uint8Array.from([255]) }), [0, 128, 160, 192]);
          t2.same(await collect({ lte: Uint8Array.from([192]) }), [0, 128, 160, 192]);
          t2.same(await collect({ lte: Uint8Array.from([160]) }), [0, 128, 160]);
          t2.same(await collect({ lte: Uint8Array.from([128]) }), [0, 128]);
          t2.same(await collect({ lte: Uint8Array.from([0]) }), [0]);
          t2.same(await collect({ lte: Uint8Array.from([]) }), []);
          return db2.close();
        });
      }
    };
    exports2.decode = function(test, testCommon) {
      for (const deferred of [false, true]) {
        for (const mode of ["iterator", "keys", "values"]) {
          for (const method of ["next", "nextv", "all"]) {
            const requiredArgs = method === "nextv" ? [1] : [];
            for (const encodingOption of ["keyEncoding", "valueEncoding"]) {
              if (mode === "keys" && encodingOption === "valueEncoding") continue;
              if (mode === "values" && encodingOption === "keyEncoding") continue;
              test(`${mode}().${method}() catches decoding error from ${encodingOption} (deferred: ${deferred})`, async function(t2) {
                t2.plan(4);
                const encoding = {
                  format: "utf8",
                  decode: function(x) {
                    t2.is(x, encodingOption === "keyEncoding" ? "testKey" : "testValue");
                    throw new Error("from encoding");
                  },
                  encode: identity
                };
                const db2 = testCommon.factory();
                await db2.put("testKey", "testValue");
                if (deferred) {
                  await db2.close();
                  db2.open().then(t2.pass.bind(t2));
                } else {
                  t2.pass("non-deferred");
                }
                const it = db2[mode]({ [encodingOption]: encoding });
                try {
                  await it[method](...requiredArgs);
                } catch (err) {
                  t2.is(err.code, "LEVEL_DECODE_ERROR");
                  t2.is(err.cause && err.cause.message, "from encoding");
                }
                return db2.close();
              });
            }
          }
        }
      }
    };
    exports2.tearDown = function(test, testCommon) {
      test("iterator teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.args(test, testCommon);
      exports2.sequence(test, testCommon);
      exports2.iterator(test, testCommon);
      exports2.decode(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/iterator-range-test.js
var require_iterator_range_test = __commonJS({
  "node_modules/abstract-level/test/iterator-range-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var db;
    var data = function() {
      const d = [];
      let i2 = 0;
      let k;
      for (; i2 < 100; i2++) {
        k = (i2 < 10 ? "0" : "") + i2;
        d.push({
          key: k,
          value: String(Math.random())
        });
      }
      return d;
    }();
    exports2.setUp = function(test, testCommon) {
      test("iterator() range setup", async function(t2) {
        db = testCommon.factory();
        await db.open();
        return db.batch(data.map(function({ key, value }) {
          return { type: "put", key, value };
        }));
      });
    };
    exports2.range = function(test, testCommon) {
      function rangeTest(name2, opts, expected) {
        test("iterator() range with " + name2, async function(t2) {
          const entries = await db.iterator(opts).all();
          t2.is(entries.length, expected.length, "correct number of entries");
          t2.same(entries, expected.map((o2) => [o2.key, o2.value]));
        });
        if (!opts.reverse && !("limit" in opts)) {
          const reverseOpts = Object.assign({}, opts, { reverse: true });
          rangeTest(
            name2 + " (flipped)",
            reverseOpts,
            expected.slice().reverse()
          );
        }
      }
      rangeTest("no options", {}, data);
      rangeTest("reverse=true", {
        reverse: true
      }, data.slice().reverse());
      rangeTest("gte=00", {
        gte: "00"
      }, data);
      rangeTest("gte=50", {
        gte: "50"
      }, data.slice(50));
      rangeTest("lte=50 and reverse=true", {
        lte: "50",
        reverse: true
      }, data.slice().reverse().slice(49));
      rangeTest("gte=49.5 (midway)", {
        gte: "49.5"
      }, data.slice(50));
      rangeTest("gte=49999 (midway)", {
        gte: "49999"
      }, data.slice(50));
      rangeTest("lte=49.5 (midway) and reverse=true", {
        lte: "49.5",
        reverse: true
      }, data.slice().reverse().slice(50));
      rangeTest("lt=49.5 (midway) and reverse=true", {
        lt: "49.5",
        reverse: true
      }, data.slice().reverse().slice(50));
      rangeTest("lt=50 and reverse=true", {
        lt: "50",
        reverse: true
      }, data.slice().reverse().slice(50));
      rangeTest("lte=50", {
        lte: "50"
      }, data.slice(0, 51));
      rangeTest("lte=50.5 (midway)", {
        lte: "50.5"
      }, data.slice(0, 51));
      rangeTest("lte=50555 (midway)", {
        lte: "50555"
      }, data.slice(0, 51));
      rangeTest("lt=50555 (midway)", {
        lt: "50555"
      }, data.slice(0, 51));
      rangeTest("gte=50.5 (midway) and reverse=true", {
        gte: "50.5",
        reverse: true
      }, data.slice().reverse().slice(0, 49));
      rangeTest("gt=50.5 (midway) and reverse=true", {
        gt: "50.5",
        reverse: true
      }, data.slice().reverse().slice(0, 49));
      rangeTest("gt=50 and reverse=true", {
        gt: "50",
        reverse: true
      }, data.slice().reverse().slice(0, 49));
      rangeTest("lte=0", {
        lte: "0"
      }, []);
      rangeTest("lt=0", {
        lt: "0"
      }, []);
      rangeTest("gte=30 and lte=70", {
        gte: "30",
        lte: "70"
      }, data.slice(30, 71));
      rangeTest("gte=30 and lte=70 and gt=40 and lt=60", {
        gte: "30",
        lte: "70",
        gt: "40",
        lt: "60"
      }, data.slice(30, 71));
      rangeTest("gte=30 and lte=70 and gt=20 and lt=80", {
        gte: "30",
        lte: "70",
        gt: "20",
        lt: "80"
      }, data.slice(30, 71));
      rangeTest("gt=29 and lt=71", {
        gt: "29",
        lt: "71"
      }, data.slice(30, 71));
      rangeTest("gte=30 and lte=70 and reverse=true", {
        lte: "70",
        gte: "30",
        reverse: true
      }, data.slice().reverse().slice(29, 70));
      rangeTest("gt=29 and lt=71 and reverse=true", {
        lt: "71",
        gt: "29",
        reverse: true
      }, data.slice().reverse().slice(29, 70));
      rangeTest("limit=20", {
        limit: 20
      }, data.slice(0, 20));
      rangeTest("limit=20 and gte=20", {
        limit: 20,
        gte: "20"
      }, data.slice(20, 40));
      rangeTest("limit=20 and reverse=true", {
        limit: 20,
        reverse: true
      }, data.slice().reverse().slice(0, 20));
      rangeTest("limit=20 and lte=79 and reverse=true", {
        limit: 20,
        lte: "79",
        reverse: true
      }, data.slice().reverse().slice(20, 40));
      rangeTest("limit=-1 (all)", {
        limit: -1
      }, data);
      rangeTest("limit=0 (empty)", {
        limit: 0
      }, []);
      rangeTest("lte after limit", {
        limit: 20,
        lte: "50"
      }, data.slice(0, 20));
      rangeTest("lte before limit", {
        limit: 50,
        lte: "19"
      }, data.slice(0, 20));
      rangeTest("gte after database end", {
        gte: "9a"
      }, []);
      rangeTest("gt after database end", {
        gt: "9a"
      }, []);
      rangeTest("lte after database end and reverse=true", {
        lte: "9a",
        reverse: true
      }, data.slice().reverse());
      rangeTest("lt after database end", {
        lt: "a"
      }, data.slice());
      rangeTest("lt at database end", {
        lt: data[data.length - 1].key
      }, data.slice(0, -1));
      rangeTest("lte at database end", {
        lte: data[data.length - 1].key
      }, data.slice());
      rangeTest("lt before database end", {
        lt: data[data.length - 2].key
      }, data.slice(0, -2));
      rangeTest("lte before database end", {
        lte: data[data.length - 2].key
      }, data.slice(0, -1));
      rangeTest("lte and gte after database and reverse=true", {
        lte: "9b",
        gte: "9a",
        reverse: true
      }, []);
      rangeTest("lt and gt after database and reverse=true", {
        lt: "9b",
        gt: "9a",
        reverse: true
      }, []);
      rangeTest("gt greater than lt", {
        gt: "20",
        lt: "10"
      }, []);
      rangeTest("gte greater than lte", {
        gte: "20",
        lte: "10"
      }, []);
    };
    exports2.tearDown = function(test, testCommon) {
      test("iterator() range teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setUp(test, testCommon);
      exports2.range(test, testCommon);
      exports2.tearDown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/async-iterator-test.js
var require_async_iterator_test = __commonJS({
  "node_modules/abstract-level/test/async-iterator-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var input = [{ key: "1", value: "1" }, { key: "2", value: "2" }];
    var db;
    exports2.setup = function(test, testCommon) {
      test("async iterator setup", async function(t2) {
        db = testCommon.factory();
        await db.open();
        return db.batch(input.map((entry) => ({ ...entry, type: "put" })));
      });
    };
    exports2.asyncIterator = function(test, testCommon) {
      for (const mode of ["iterator", "keys", "values"]) {
        test(`for await...of ${mode}()`, async function(t2) {
          t2.plan(1);
          const it = db[mode]({ keyEncoding: "utf8", valueEncoding: "utf8" });
          const output = [];
          for await (const item of it) {
            output.push(item);
          }
          t2.same(output, input.map(({ key, value }) => {
            return mode === "iterator" ? [key, value] : mode === "keys" ? key : value;
          }));
        });
        testCommon.supports.permanence && test(`for await...of ${mode}() (deferred)`, async function(t2) {
          t2.plan(1);
          const db2 = testCommon.factory();
          await db2.batch(input.map((entry) => ({ ...entry, type: "put" })));
          await db2.close();
          db2.open();
          const it = db2[mode]({ keyEncoding: "utf8", valueEncoding: "utf8" });
          const output = [];
          for await (const item of it) {
            output.push(item);
          }
          t2.same(output, input.map(({ key, value }) => {
            return mode === "iterator" ? [key, value] : mode === "keys" ? key : value;
          }));
          await db2.close();
        });
        testCommon.supports.snapshots && test(`for await...of ${mode}() (deferred, with snapshot)`, async function(t2) {
          t2.plan(2);
          const db2 = testCommon.factory();
          const it = db2[mode]({ keyEncoding: "utf8", valueEncoding: "utf8" });
          const promise = db2.batch(input.map((entry) => ({ ...entry, type: "put" })));
          const output = [];
          for await (const item of it) {
            output.push(item);
          }
          t2.same(output, [], "used snapshot");
          await promise;
          for await (const item of db2[mode]({ keyEncoding: "utf8", valueEncoding: "utf8" })) {
            output.push(item);
          }
          t2.same(output, input.map(({ key, value }) => {
            return mode === "iterator" ? [key, value] : mode === "keys" ? key : value;
          }));
          await db2.close();
        });
        for (const deferred of [false, true]) {
          test(`for await...of ${mode}() (empty, deferred: ${deferred})`, async function(t2) {
            const db2 = testCommon.factory();
            const entries = [];
            if (!deferred) await db2.open();
            for await (const item of db2[mode]({ keyEncoding: "utf8", valueEncoding: "utf8" })) {
              entries.push(item);
            }
            t2.same(entries, []);
            await db2.close();
          });
        }
        test(`for await...of ${mode}() does not permit reuse`, async function(t2) {
          t2.plan(3);
          const it = db[mode]();
          for await (const item of it) {
            t2.pass("nexted");
          }
          try {
            for await (const item of it) {
              t2.fail("should not be called");
            }
          } catch (err) {
            t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
          }
        });
      }
    };
    exports2.teardown = async function(test, testCommon) {
      test("async iterator teardown", async function(t2) {
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.setup(test, testCommon);
      exports2.asyncIterator(test, testCommon);
      exports2.teardown(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/deferred-open-test.js
var require_deferred_open_test = __commonJS({
  "node_modules/abstract-level/test/deferred-open-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { DeferredIterator } = require_deferred_iterator();
    exports2.all = function(test, testCommon) {
      async function verifyValues(t2, db, entries) {
        const promises = [];
        for (let i2 = 1; i2 <= entries; i2++) {
          promises.push(db.get("k" + i2).then((v2) => {
            t2.is(v2, "v" + i2, "value is ok");
            t2.is(db.status, "open", "status is ok");
          }));
        }
        await Promise.all(promises);
        t2.is(await db.get("k" + (entries + 1)), void 0, "not found");
      }
      test("deferred open(): batch() on new database", async function(t2) {
        const db = testCommon.factory();
        const entries = 3;
        const ops = [];
        for (let i2 = 1; i2 <= entries; i2++) {
          ops.push({ type: "put", key: "k" + i2, value: "v" + i2 });
        }
        t2.is(db.status, "opening");
        await db.batch(ops);
        await verifyValues(t2, db, entries);
        return db.close();
      });
      test("deferred open(): value of deferred operation is not stringified", async function(t2) {
        const db = testCommon.factory({ valueEncoding: "json" });
        t2.is(db.status, "opening");
        await db.put("key", { thing: 2 });
        t2.is(db.status, "open");
        t2.same(await db.get("key"), { thing: 2 });
        return db.close();
      });
      test("deferred open(): key of deferred operation is not stringified", async function(t2) {
        const db = testCommon.factory({ keyEncoding: "json" });
        t2.is(db.status, "opening");
        await db.put({ thing: 2 }, "value");
        t2.is(db.status, "open");
        t2.same(await db.keys().all(), [{ thing: 2 }]);
        return db.close();
      });
      test("cannot operate on closed db", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        await db.open();
        await db.close();
        try {
          db.iterator();
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
        }
        try {
          db.keys();
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
        }
        try {
          db.values();
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
        }
      });
      test("cannot operate on closing db", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        await db.open();
        const promise = db.close();
        try {
          db.iterator();
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
        }
        try {
          db.keys();
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
        }
        try {
          db.values();
        } catch (err) {
          t2.is(err.code, "LEVEL_DATABASE_NOT_OPEN");
        }
        return promise;
      });
      test("deferred iterator - cannot operate on closed db", async function(t2) {
        t2.plan(4);
        const db = testCommon.factory();
        const it = db.iterator({ gt: "foo" });
        await db.open();
        await db.close();
        t2.ok(it instanceof DeferredIterator);
        const promises = [
          it.next().catch(function(err) {
            t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
          }),
          it.nextv(10).catch(function(err) {
            t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
          }),
          it.all().catch(function(err) {
            t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
          }),
          // Was already closed
          it.close().catch(function() {
            t2.fail("no close() error");
          })
        ];
        try {
          it.seek("foo");
        } catch (err) {
          t2.fail(err);
        }
        return Promise.all(promises);
      });
      test("deferred iterator - cannot operate on closing db", async function(t2) {
        t2.plan(4);
        const db = testCommon.factory();
        const it = db.iterator({ gt: "foo" });
        t2.ok(it instanceof DeferredIterator);
        await db.open();
        const promises = [
          db.close(),
          it.next().catch(function(err) {
            t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
          }),
          it.nextv(10).catch(function(err) {
            t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
          }),
          it.all().catch(function(err) {
            t2.is(err.code, "LEVEL_ITERATOR_NOT_OPEN");
          }),
          // Is already closing
          it.close().catch(function() {
            t2.fail("no close() error");
          })
        ];
        try {
          it.seek("foo");
        } catch (err) {
          t2.fail(err);
        }
        return Promise.all(promises);
      });
    };
  }
});

// node_modules/abstract-level/test/encoding-test.js
var require_encoding_test = __commonJS({
  "node_modules/abstract-level/test/encoding-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var db;
    var keySequence = 0;
    var testKey = () => "test" + ++keySequence;
    exports2.all = function(test, testCommon) {
      test("encoding setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
      test("encodings default to utf8", function(t2) {
        t2.is(db.keyEncoding().commonName, "utf8");
        t2.is(db.valueEncoding().commonName, "utf8");
        t2.end();
      });
      test("can set encoding options in factory", async function(t2) {
        const dbs = [];
        for (const name2 of ["buffer", "view", "json"]) {
          if (!testCommon.supports.encodings[name2]) continue;
          const db1 = testCommon.factory({ keyEncoding: name2 });
          const db2 = testCommon.factory({ valueEncoding: name2 });
          const db3 = testCommon.factory({ keyEncoding: name2, valueEncoding: name2 });
          t2.is(db1.keyEncoding().commonName, name2);
          t2.is(db1.keyEncoding(), db1.keyEncoding(name2));
          t2.is(db1.valueEncoding().commonName, "utf8");
          t2.is(db1.valueEncoding(), db1.valueEncoding("utf8"));
          t2.is(db2.keyEncoding().commonName, "utf8");
          t2.is(db2.keyEncoding(), db2.keyEncoding("utf8"));
          t2.is(db2.valueEncoding().commonName, name2);
          t2.is(db2.valueEncoding(), db2.valueEncoding(name2));
          t2.is(db3.keyEncoding().commonName, name2);
          t2.is(db3.keyEncoding(), db3.keyEncoding(name2));
          t2.is(db3.valueEncoding().commonName, name2);
          t2.is(db3.valueEncoding(), db3.valueEncoding(name2));
          dbs.push(db1, db2, db3);
        }
        await Promise.all(dbs.map((db2) => db2.close()));
      });
      for (const deferred of [false, true]) {
        test(`default utf8 encoding stringifies numbers (deferred: ${deferred})`, async function(t2) {
          const db2 = testCommon.factory();
          if (!deferred) await db2.open();
          await db2.put(1, 2);
          t2.is(await db2.get(1), "2");
          return db2.close();
        });
      }
      test("can decode from string to json", async function(t2) {
        const key = testKey();
        const data = { thisis: "json" };
        await db.put(key, JSON.stringify(data), { valueEncoding: "utf8" });
        t2.same(await db.get(key, { valueEncoding: "json" }), data, "got parsed object");
      });
      test("can decode from json to string", async function(t2) {
        const data = { thisis: "json" };
        const key = testKey();
        await db.put(key, data, { valueEncoding: "json" });
        t2.same(await db.get(key, { valueEncoding: "utf8" }), JSON.stringify(data), "got unparsed JSON string");
      });
      test("getMany() skips decoding not-found values", async function(t2) {
        t2.plan(2);
        const valueEncoding = {
          encode: JSON.stringify,
          decode(value) {
            t2.is(value, JSON.stringify(data));
            return JSON.parse(value);
          },
          format: "utf8"
        };
        const data = { beep: "boop" };
        const key = testKey();
        await db.put(key, data, { valueEncoding });
        t2.same(await db.getMany([key, testKey()], { valueEncoding }), [data, void 0]);
      });
      test("number keys with utf8 encoding", async function(t2) {
        const db2 = testCommon.factory();
        const numbers = [-Infinity, 0, 12, 2, Infinity];
        await db2.open();
        await db2.batch(numbers.map((key) => ({ type: "put", key, value: "value" })));
        const keys = await db2.keys({ keyEncoding: "utf8" }).all();
        t2.same(keys, numbers.map(String), "sorts lexicographically");
        return db2.close();
      });
      test("encoding teardown", async function(t2) {
        return db.close();
      });
    };
  }
});

// node_modules/abstract-level/test/encoding-json-test.js
var require_encoding_json_test = __commonJS({
  "node_modules/abstract-level/test/encoding-json-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.all = function(test, testCommon) {
      for (const deferred of [false, true]) {
        test(`json encoding: simple-object values (deferred: ${deferred})`, async function(t2) {
          return run(t2, deferred, [
            { key: "0", value: 0 },
            { key: "1", value: 1 },
            { key: "2", value: "a string" },
            { key: "3", value: true },
            { key: "4", value: false }
          ]);
        });
        test(`json encoding: simple-object keys (deferred: ${deferred})`, async function(t2) {
          return run(t2, deferred, [
            { value: "string", key: "a string" },
            { value: "0", key: 0 },
            { value: "1", key: 1 },
            { value: "false", key: false },
            { value: "true", key: true }
          ]);
        });
        test(`json encoding: complex-object values (deferred: ${deferred})`, async function(t2) {
          return run(t2, deferred, [{
            key: "0",
            value: {
              foo: "bar",
              bar: [1, 2, 3],
              bang: { yes: true, no: false }
            }
          }]);
        });
        test(`json encoding: complex-object keys (deferred: ${deferred})`, async function(t2) {
          return run(t2, deferred, [{
            value: "0",
            key: {
              foo: "bar",
              bar: [1, 2, 3],
              bang: { yes: true, no: false }
            }
          }]);
        });
      }
      async function run(t2, deferred, entries) {
        const db = testCommon.factory({ keyEncoding: "json", valueEncoding: "json" });
        const operations = entries.map((entry) => ({ type: "put", ...entry }));
        if (!deferred) await db.open();
        await db.batch(operations);
        await Promise.all([...entries.map(testGet), testIterator()]);
        return db.close();
        async function testGet(entry) {
          t2.same(await db.get(entry.key), entry.value);
        }
        async function testIterator() {
          const result = await db.iterator().all();
          t2.same(result, entries.map((kv) => [kv.key, kv.value]));
        }
      }
    };
  }
});

// node_modules/abstract-level/test/encoding-custom-test.js
var require_encoding_custom_test = __commonJS({
  "node_modules/abstract-level/test/encoding-custom-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.all = function(test, testCommon) {
      for (const deferred of [false, true]) {
        test(`custom encoding: simple-object values (deferred: ${deferred})`, async function(t2) {
          return run(t2, deferred, [
            { key: "0", value: 0 },
            { key: "1", value: 1 },
            { key: "string", value: "a string" },
            { key: "true", value: true },
            { key: "false", value: false }
          ]);
        });
        test(`custom encoding: simple-object keys (deferred: ${deferred})`, async function(t2) {
          return run(t2, deferred, [
            { value: "0", key: [1] },
            { value: "1", key: 1 },
            { value: "string", key: "a string" },
            { value: "true", key: true },
            { value: "false", key: false }
          ]);
        });
        test(`custom encoding: complex-object values (deferred: ${deferred})`, async function(t2) {
          return run(t2, deferred, [{
            key: "0",
            value: {
              foo: "bar",
              bar: [1, 2, 3],
              bang: { yes: true, no: false }
            }
          }]);
        });
        test(`custom encoding: complex-object keys (deferred: ${deferred})`, async function(t2) {
          return run(t2, deferred, [{
            value: "0",
            key: {
              foo: "bar",
              bar: [1, 2, 3],
              bang: { yes: true, no: false }
            }
          }, {
            value: "1",
            key: {
              foo: "different",
              bar: [1, 2, 3],
              bang: { yes: true, no: false }
            }
          }]);
        });
      }
      async function run(t2, deferred, entries) {
        const customEncoding = {
          encode: JSON.stringify,
          decode: JSON.parse,
          format: "utf8",
          type: "custom"
        };
        const db = testCommon.factory({
          keyEncoding: customEncoding,
          valueEncoding: customEncoding
        });
        const operations = entries.map((entry) => ({ type: "put", ...entry }));
        if (!deferred) await db.open();
        await db.batch(operations);
        await Promise.all(entries.map(testGet));
        async function testGet(entry) {
          t2.same(await db.get(entry.key), entry.value);
        }
        return db.close();
      }
    };
  }
});

// node_modules/abstract-level/test/encoding-buffer-test.js
var require_encoding_buffer_test = __commonJS({
  "node_modules/abstract-level/test/encoding-buffer-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
    var textEncoder = new TextEncoder();
    exports2.all = function(test, testCommon) {
      if (!testCommon.supports.encodings.buffer) return;
      test("put() and get() with buffer value and buffer valueEncoding", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.put("test", testBuffer(), { valueEncoding: "buffer" });
        t2.same(await db.get("test", { valueEncoding: "buffer" }), testBuffer());
        return db.close();
      });
      test("put() and get() with buffer value and buffer valueEncoding in factory", async function(t2) {
        const db = testCommon.factory({ valueEncoding: "buffer" });
        await db.open();
        await db.put("test", testBuffer());
        t2.same(await db.get("test"), testBuffer());
        return db.close();
      });
      test("put() and get() with buffer key and buffer keyEncoding", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.put(testBuffer(), "test", { keyEncoding: "buffer" });
        t2.same(await db.get(testBuffer(), { keyEncoding: "buffer" }), "test");
        return db.close();
      });
      test("put() and get() with buffer key and utf8 keyEncoding", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.put(Buffer3.from("foo\u{1F404}"), "test", { keyEncoding: "utf8" });
        t2.same(await db.get(Buffer3.from("foo\u{1F404}"), { keyEncoding: "utf8" }), "test");
        return db.close();
      });
      test("put() and get() with string value and buffer valueEncoding", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.put("test", "foo\u{1F404}", { valueEncoding: "buffer" });
        t2.same(await db.get("test", { valueEncoding: "buffer" }), Buffer3.from("foo\u{1F404}"));
        t2.same(await db.get("test", { valueEncoding: "utf8" }), "foo\u{1F404}");
        return db.close();
      });
      test("put() as string, get() as buffer and vice versa", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        const enc = { keyEncoding: "buffer", valueEncoding: "buffer" };
        const [a2, b] = ["\u{1F404}", "\u{1F404} says moo"];
        const promise1 = db.put(a2, a2).then(async () => {
          const value = await db.get(Buffer3.from(a2), enc);
          t2.same(value, Buffer3.from(a2), "got buffer value");
        });
        const promise2 = db.put(Buffer3.from(b), Buffer3.from(b), enc).then(async () => {
          const value = await db.get(b);
          t2.same(value, b, "got string value");
        });
        await Promise.all([promise1, promise2]);
        return db.close();
      });
      test("put() stringifies input to buffer", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.put(1, 2);
        const it = db.iterator({ keyEncoding: "buffer", valueEncoding: "buffer" });
        const entries = await it.all();
        t2.same(entries[0][0], Buffer3.from("1"), "key was stringified");
        t2.same(entries[0][1], Buffer3.from("2"), "value was stringified");
        return db.close();
      });
      test("put() as string, iterate as buffer", async function(t2) {
        const db = testCommon.factory({ keyEncoding: "utf8", valueEncoding: "utf8" });
        await db.open();
        await db.put("\u{1F404}", "\u{1F404}");
        const it = db.iterator({ keyEncoding: "buffer", valueEncoding: "buffer" });
        const entries = await it.all();
        t2.same(entries, [[Buffer3.from("\u{1F404}"), Buffer3.from("\u{1F404}")]]);
        return db.close();
      });
      test("put() as buffer, iterate as string", async function(t2) {
        const db = testCommon.factory({ keyEncoding: "buffer", valueEncoding: "buffer" });
        await db.open();
        await db.put(Buffer3.from("\u{1F404}"), Buffer3.from("\u{1F404}"));
        const it = db.iterator({ keyEncoding: "utf8", valueEncoding: "utf8" });
        const entries = await it.all();
        t2.same(entries, [["\u{1F404}", "\u{1F404}"]]);
        return db.close();
      });
      test("put() as view, iterate as view", async function(t2) {
        const db = testCommon.factory({ keyEncoding: "view", valueEncoding: "view" });
        const cow = textEncoder.encode("\u{1F404}");
        await db.open();
        await db.put(cow, cow);
        const it = db.iterator();
        const entries = await it.all();
        const key = Buffer3.isBuffer(entries[0][0]) ? Buffer3.from(cow) : cow;
        const value = Buffer3.isBuffer(entries[0][1]) ? Buffer3.from(cow) : cow;
        t2.same(entries, [[key, value]]);
        return db.close();
      });
      test("put() as string, iterate as view", async function(t2) {
        const db = testCommon.factory({ keyEncoding: "utf8", valueEncoding: "utf8" });
        const cow = textEncoder.encode("\u{1F404}");
        await db.open();
        await db.put("\u{1F404}", "\u{1F404}");
        const it = db.iterator({ keyEncoding: "view", valueEncoding: "view" });
        const entries = await it.all();
        const key = Buffer3.isBuffer(entries[0][0]) ? Buffer3.from(cow) : cow;
        const value = Buffer3.isBuffer(entries[0][1]) ? Buffer3.from(cow) : cow;
        t2.same(entries, [[key, value]]);
        return db.close();
      });
      test("put() as view, iterate as string", async function(t2) {
        const db = testCommon.factory({ keyEncoding: "view", valueEncoding: "view" });
        const cow = textEncoder.encode("\u{1F404}");
        await db.open();
        await db.put(cow, cow);
        const it = db.iterator({ keyEncoding: "utf8", valueEncoding: "utf8" });
        const entries = await it.all();
        t2.same(entries, [["\u{1F404}", "\u{1F404}"]]);
        return db.close();
      });
      test("batch() with multiple puts with buffer valueEncoding per batch", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.batch([
          { type: "put", key: "foo", value: testBuffer() },
          { type: "put", key: "bar", value: testBuffer() },
          { type: "put", key: "baz", value: "abazvalue" }
        ], { valueEncoding: "buffer" });
        t2.same(await db.get("foo", { valueEncoding: "buffer" }), testBuffer());
        t2.same(await db.get("bar", { valueEncoding: "buffer" }), testBuffer());
        t2.same(await db.get("baz", { valueEncoding: "buffer" }), Buffer3.from("abazvalue"));
        return db.close();
      });
      test("batch() with multiple puts with buffer valueEncoding per operation", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.batch([
          { type: "put", key: "foo", value: testBuffer(), valueEncoding: "buffer" },
          { type: "put", key: "bar", value: testBuffer(), valueEncoding: "buffer" },
          { type: "put", key: "baz", value: "abazvalue", valueEncoding: "buffer" }
        ]);
        t2.same(await db.get("foo", { valueEncoding: "buffer" }), testBuffer());
        t2.same(await db.get("bar", { valueEncoding: "buffer" }), testBuffer());
        t2.same(await db.get("baz", { valueEncoding: "buffer" }), Buffer3.from("abazvalue"));
        return db.close();
      });
      test("batch() with buffer encoding in factory", async function(t2) {
        const operations = [{
          type: "put",
          key: Buffer3.from([1, 2, 3]),
          value: Buffer3.from([4, 5, 6])
        }, {
          type: "put",
          key: Buffer3.from([7, 8, 9]),
          value: Buffer3.from([10, 11, 12])
        }];
        const db = testCommon.factory({ keyEncoding: "buffer", valueEncoding: "buffer" });
        await db.open();
        await db.batch(operations);
        t2.same(await db.get(operations[0].key), operations[0].value);
        t2.same(await db.get(operations[1].key), operations[1].value);
        return db.close();
      });
      for (const keyEncoding of ["buffer", "view"]) {
        test(`storage is byte-aware (${keyEncoding} encoding)`, async function(t2) {
          const db = testCommon.factory({ keyEncoding });
          await db.open();
          const one = Buffer3.from("80", "hex");
          const two = Buffer3.from("c0", "hex");
          t2.ok(two.toString() === one.toString(), "would be equal when not byte-aware");
          t2.ok(two.compare(one) > 0, "but greater when byte-aware");
          await db.put(one, "one");
          t2.is(await db.get(one), "one", "value one ok");
          await db.put(two, "two");
          t2.is(await db.get(one), "one", "value one did not change");
          return db.close();
        });
      }
    };
    function testBuffer() {
      return Buffer3.from("0080c0ff", "hex");
    }
  }
});

// node_modules/abstract-level/test/encoding-decode-error-test.js
var require_encoding_decode_error_test = __commonJS({
  "node_modules/abstract-level/test/encoding-decode-error-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var db;
    var keySequence = 0;
    var testKey = () => "test" + ++keySequence;
    exports2.all = function(test, testCommon) {
      test("decode error setup", async function(t2) {
        db = testCommon.factory();
        return db.open();
      });
      test("decode error is wrapped by get() and getMany()", async function(t2) {
        t2.plan(4);
        const key = testKey();
        const valueEncoding = {
          encode: (v2) => v2,
          decode: (v2) => {
            throw new Error("decode error xyz");
          },
          format: "utf8"
        };
        await db.put(key, "bar", { valueEncoding });
        try {
          await db.get(key, { valueEncoding });
        } catch (err) {
          t2.is(err.code, "LEVEL_DECODE_ERROR");
          t2.is(err.cause.message, "decode error xyz");
        }
        try {
          await db.getMany(["other-key", key], { valueEncoding });
        } catch (err) {
          t2.is(err.code, "LEVEL_DECODE_ERROR");
          t2.is(err.cause.message, "decode error xyz");
        }
      });
      test("get() and getMany() yield decode error if stored value is invalid", async function(t2) {
        t2.plan(4);
        const key = testKey();
        await db.put(key, "this {} is [] not : json", { valueEncoding: "utf8" });
        try {
          await db.get(key, { valueEncoding: "json" });
        } catch (err) {
          t2.is(err.code, "LEVEL_DECODE_ERROR");
          t2.is(err.cause.name, "SyntaxError");
        }
        try {
          await db.getMany(["other-key", key], { valueEncoding: "json" });
        } catch (err) {
          t2.is(err.code, "LEVEL_DECODE_ERROR");
          t2.is(err.cause.name, "SyntaxError");
        }
      });
      test("decode error teardown", async function(t2) {
        return db.close();
      });
    };
  }
});

// node_modules/abstract-level/test/iterator-seek-test.js
var require_iterator_seek_test = __commonJS({
  "node_modules/abstract-level/test/iterator-seek-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
    var identity = (v2) => v2;
    exports2.all = function(test, testCommon) {
      exports2.sequence(test, testCommon);
      exports2.seek(test, testCommon);
    };
    exports2.sequence = function(test, testCommon) {
      for (const deferred of [false, true]) {
        for (const mode of ["iterator", "keys", "values"]) {
          test(`${mode}().seek() throws if next() has not completed (deferred: ${deferred})`, async function(t2) {
            const db = testCommon.factory();
            if (!deferred) await db.open();
            const it = db[mode]();
            const promise = it.next();
            t2.throws(() => it.seek("two"), (err) => err.code === "LEVEL_ITERATOR_BUSY");
            await promise;
            await db.close();
          });
          test(`${mode}().seek() does not throw after close() (deferred: ${deferred})`, async function(t2) {
            const db = testCommon.factory();
            if (!deferred) await db.open();
            const it = db[mode]();
            await it.close();
            t2.doesNotThrow(() => it.seek("two"));
            await db.close();
          });
        }
      }
    };
    exports2.seek = function(test, testCommon) {
      const testData = () => [
        { type: "put", key: "one", value: "1" },
        { type: "put", key: "two", value: "2" },
        { type: "put", key: "three", value: "3" }
      ];
      for (const mode of ["iterator", "keys", "values"]) {
        const mapEntry = mode === "iterator" ? (e2) => e2 : mode === "keys" ? (e2) => e2[0] : (e2) => e2[1];
        test(`${mode}().seek() to string target`, async function(t2) {
          const db = testCommon.factory();
          await db.batch(testData());
          const it = db[mode]();
          it.seek("two");
          t2.same(await it.next(), mapEntry(["two", "2"]), "match");
          t2.same(await it.next(), void 0, "end of iterator");
          return db.close();
        });
        if (testCommon.supports.encodings.buffer) {
          test(`${mode}().seek() to buffer target`, async function(t2) {
            const db = testCommon.factory();
            await db.batch(testData());
            const it = db[mode]({ keyEncoding: "buffer" });
            it.seek(Buffer3.from("two"));
            t2.same(await it.next(), mapEntry([Buffer3.from("two"), "2"]), "match");
            t2.same(await it.next(), void 0, "end of iterator");
            return db.close();
          });
        }
        test(`${mode}().seek() to target with custom encoding`, async function(t2) {
          const db = testCommon.factory();
          await db.batch(testData());
          const it = db[mode]();
          const keyEncoding = { encode: () => "two", decode: identity, format: "utf8" };
          it.seek("xyz", { keyEncoding });
          t2.same(await it.next(), mapEntry(["two", "2"]), "match");
          t2.same(await it.next(), void 0, "end of iterator");
          return db.close();
        });
        test(`${mode}().seek() on reverse iterator`, async function(t2) {
          const db = testCommon.factory();
          await db.batch(testData());
          const it = db[mode]({ reverse: true, limit: 1 });
          it.seek("three!");
          t2.same(await it.next(), mapEntry(["three", "3"]), "match");
          t2.same(await it.next(), void 0, "end of iterator");
          return db.close();
        });
        test(`${mode}().seek() to out of range target`, async function(t2) {
          const db = testCommon.factory();
          await db.batch(testData());
          const it = db[mode]();
          it.seek("zzz");
          t2.same(await it.next(), void 0, "end of iterator");
          return db.close();
        });
        test(`${mode}().seek() on reverse iterator to out of range target`, async function(t2) {
          const db = testCommon.factory();
          await db.batch(testData());
          const it = db[mode]({ reverse: true });
          it.seek("zzz");
          t2.same(await it.next(), mapEntry(["two", "2"]), "match");
          t2.same(await it.next(), mapEntry(["three", "3"]), "match");
          t2.same(await it.next(), mapEntry(["one", "1"]), "match");
          t2.same(await it.next(), void 0, "end of iterator");
          return db.close();
        });
        test(`${mode}().seek() can be used to iterate twice`, async function(t2) {
          const db = testCommon.factory();
          await db.batch(testData());
          const it = db[mode]();
          t2.same(await it.nextv(10), [["one", "1"], ["three", "3"], ["two", "2"]].map(mapEntry), "match");
          t2.same(await it.nextv(10), [], "end of iterator");
          it.seek("one");
          t2.same(await it.nextv(10), [["one", "1"], ["three", "3"], ["two", "2"]].map(mapEntry), "match again");
          t2.same(await it.nextv(10), [], "end of iterator again");
          await it.close();
          return db.close();
        });
        test(`${mode}().seek() can be used to iterate twice, within limit`, async function(t2) {
          const db = testCommon.factory();
          await db.batch(testData());
          const limit = 4;
          const it = db[mode]({ limit });
          t2.same(await it.nextv(10), [["one", "1"], ["three", "3"], ["two", "2"]].map(mapEntry), "match");
          t2.same(await it.nextv(10), [], "end of iterator");
          it.seek("one");
          t2.same(await it.nextv(10), [["one", "1"]].map(mapEntry), "limit reached");
          t2.same(await it.nextv(10), [], "end of iterator");
          it.seek("one");
          t2.same(await it.nextv(10), [], "does not reset after limit has been reached");
          await it.close();
          return db.close();
        });
        if (testCommon.supports.snapshots) {
          for (const reverse of [false, true]) {
            for (const deferred of [false, true]) {
              test(`${mode}().seek() respects snapshot (reverse: ${reverse}, deferred: ${deferred})`, async function(t2) {
                const db = testCommon.factory();
                if (!deferred) await db.open();
                const it = db[mode]({ reverse });
                await db.put("a", "a");
                it.seek("a");
                t2.same(await it.next(), void 0);
                return db.close();
              });
            }
          }
        }
        test(`${mode}().seek() respects range`, async function(t2) {
          const db = testCommon.factory();
          await db.open();
          const ops = [];
          for (let i2 = 0; i2 < 10; i2++) {
            ops.push({ type: "put", key: String(i2), value: String(i2) });
          }
          await db.batch(ops);
          const promises = [];
          expect({ gt: "5" }, "4", void 0);
          expect({ gt: "5" }, "5", void 0);
          expect({ gt: "5" }, "6", "6");
          expect({ gte: "5" }, "4", void 0);
          expect({ gte: "5" }, "5", "5");
          expect({ gte: "5" }, "6", "6");
          expect({ gte: "5", gt: "7" }, "4", void 0);
          expect({ gte: "5", gt: "7" }, "5", "5");
          expect({ gte: "5", gt: "7" }, "6", "6");
          expect({ gte: "5", gt: "3" }, "4", void 0);
          expect({ gte: "5", gt: "3" }, "5", "5");
          expect({ gte: "5", gt: "3" }, "6", "6");
          expect({ lt: "5" }, "4", "4");
          expect({ lt: "5" }, "5", void 0);
          expect({ lt: "5" }, "6", void 0);
          expect({ lte: "5" }, "4", "4");
          expect({ lte: "5" }, "5", "5");
          expect({ lte: "5" }, "6", void 0);
          expect({ lte: "5", lt: "3" }, "4", "4");
          expect({ lte: "5", lt: "3" }, "5", "5");
          expect({ lte: "5", lt: "3" }, "6", void 0);
          expect({ lte: "5", lt: "7" }, "4", "4");
          expect({ lte: "5", lt: "7" }, "5", "5");
          expect({ lte: "5", lt: "7" }, "6", void 0);
          expect({ lt: "5", reverse: true }, "4", "4");
          expect({ lt: "5", reverse: true }, "5", void 0);
          expect({ lt: "5", reverse: true }, "6", void 0);
          expect({ lte: "5", reverse: true }, "4", "4");
          expect({ lte: "5", reverse: true }, "5", "5");
          expect({ lte: "5", reverse: true }, "6", void 0);
          expect({ gt: "5", reverse: true }, "4", void 0);
          expect({ gt: "5", reverse: true }, "5", void 0);
          expect({ gt: "5", reverse: true }, "6", "6");
          expect({ gte: "5", reverse: true }, "4", void 0);
          expect({ gte: "5", reverse: true }, "5", "5");
          expect({ gte: "5", reverse: true }, "6", "6");
          expect({ gt: "7", lt: "8" }, "7", void 0);
          expect({ gte: "7", lt: "8" }, "7", "7");
          expect({ gte: "7", lt: "8" }, "8", void 0);
          expect({ gt: "7", lte: "8" }, "8", "8");
          await Promise.all(promises);
          return db.close();
          function expect(range, target, expected) {
            promises.push(async function() {
              const ite = db[mode](range);
              ite.seek(target);
              const item = await ite.next();
              const json = JSON.stringify(range);
              const msg = "seek(" + target + ") on " + json + " yields " + expected;
              t2.is(mode === "iterator" ? item[0] : item, expected, msg);
              return ite.close();
            });
          }
        });
      }
    };
  }
});

// node_modules/abstract-level/test/iterator-snapshot-test.js
var require_iterator_snapshot_test = __commonJS({
  "node_modules/abstract-level/test/iterator-snapshot-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.snapshot = function(test, testCommon) {
      const make = (run) => async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.put("z", "from snapshot");
        const it = db.iterator({ highWaterMarkBytes: 0, highWaterMark: 0 });
        await run(t2, db, it);
        await it.close();
        return db.close();
      };
      test("delete key after snapshotting", make(async function(t2, db, it) {
        await db.del("z");
        t2.same(await it.next(), ["z", "from snapshot"], "correct entry");
      }));
      test("overwrite key after snapshotting", make(async function(t2, db, it) {
        await db.put("z", "not from snapshot");
        t2.same(await it.next(), ["z", "from snapshot"], "correct entry");
      }));
      test("add key after snapshotting that sorts first", make(async function(t2, db, it) {
        await db.put("a", "not from snapshot");
        t2.same(await it.next(), ["z", "from snapshot"], "correct entry");
      }));
      test("delete key after snapshotting, with more entries available", async function(t2) {
        const db = testCommon.factory();
        await db.open();
        await Promise.all([db.put("a", "A"), db.put("b", "B"), db.put("c", "C")]);
        const iterator = db.iterator({ gte: "a" });
        t2.same(await iterator.next(), ["a", "A"]);
        await db.del("b");
        t2.same(await iterator.next(), ["b", "B"]);
        t2.same(await iterator.next(), ["c", "C"]);
        await iterator.close();
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.snapshot(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/iterator-no-snapshot-test.js
var require_iterator_no_snapshot_test = __commonJS({
  "node_modules/abstract-level/test/iterator-no-snapshot-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    exports2.noSnapshot = function(test, testCommon) {
      const make = (run) => async function(t2) {
        const db = testCommon.factory();
        const operations = [
          { type: "put", key: "a", value: "a" },
          { type: "put", key: "b", value: "b" },
          { type: "put", key: "c", value: "c" }
        ];
        await db.open();
        await db.batch(operations);
        const it = db.iterator({ highWaterMarkBytes: 0, highWaterMark: 0 });
        await run(db);
        await verify(t2, it, db);
        return db.close();
      };
      async function verify(t2, it, db) {
        const entries = await it.all();
        const kv = entries.map(([key, value]) => key + value);
        if (kv.length === 3) {
          t2.same(kv, ["aa", "bb", "cc"], "maybe supports snapshots");
        } else {
          t2.same(kv, ["aa", "cc"], "ignores keys that have been deleted in the mean time");
        }
      }
      test("delete key after creating iterator", make(async function(db) {
        return db.del("b");
      }));
      test("batch delete key after creating iterator", make(async function(db) {
        return db.batch([{ type: "del", key: "b" }]);
      }));
    };
    exports2.all = function(test, testCommon) {
      exports2.noSnapshot(test, testCommon);
    };
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports2, module) {
    init_dirname();
    init_buffer2();
    init_process2();
    module.exports = function isBuffer(obj) {
      return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    };
  }
});

// node_modules/abstract-level/test/clear-test.js
var require_clear_test = __commonJS({
  "node_modules/abstract-level/test/clear-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var isBuffer = require_is_buffer();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
    exports2.clear = function(test, testCommon) {
      makeTest("string", ["a", "b"]);
      if (testCommon.supports.encodings.buffer) {
        makeTest("buffer", [Buffer3.from("a"), Buffer3.from("b")]);
        makeTest("mixed", [Buffer3.from("a"), "b"]);
        makeTest("non-utf8 buffer", [Buffer3.from("80", "hex"), Buffer3.from("c0", "hex")]);
      }
      function makeTest(type, keys) {
        test("simple clear() on " + type + " keys", async function(t2) {
          const db = testCommon.factory();
          const ops = keys.map(function(key) {
            return {
              type: "put",
              key,
              value: "foo",
              keyEncoding: isBuffer(key) ? "buffer" : "utf8"
            };
          });
          await db.open();
          await db.batch(ops);
          t2.is((await db.iterator().all()).length, keys.length, "has entries");
          await db.clear();
          t2.is((await db.iterator().all()).length, 0, "has no entries");
          return db.close();
        });
      }
      for (const deferred of [false, true]) {
        for (const [gte, keyEncoding] of [['"b"', "utf8"], ["b", "json"]]) {
          test(`clear() with ${keyEncoding} encoding (deferred: ${deferred})`, async function(t2) {
            const db = testCommon.factory();
            await db.open();
            await db.batch([
              { type: "put", key: '"a"', value: "a" },
              { type: "put", key: '"b"', value: "b" }
            ]);
            let promise;
            if (deferred) {
              await db.close();
              t2.is(db.status, "closed");
              promise = db.open();
              t2.is(db.status, "opening");
            }
            await db.clear({ gte, keyEncoding });
            await promise;
            const keys = await db.keys().all();
            t2.same(keys, ['"a"'], "got expected keys");
            return db.close();
          });
        }
      }
    };
    exports2.events = function(test, testCommon) {
      test("test clear() with options emits clear event", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        await db.open();
        t2.ok(db.supports.events.clear);
        db.on("clear", function(options) {
          t2.same(options, { gt: 567, custom: 123 });
        });
        await db.clear({ gt: 567, custom: 123 });
        return db.close();
      });
      test("test clear() without options emits clear event", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        await db.open();
        t2.ok(db.supports.events.clear);
        db.on("clear", function(options) {
          t2.same(options, {});
        });
        await db.clear();
        return db.close();
      });
    };
    exports2.all = function(test, testCommon) {
      exports2.events(test, testCommon);
      exports2.clear(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/clear-range-test.js
var require_clear_range_test = __commonJS({
  "node_modules/abstract-level/test/clear-range-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var data = function() {
      const d = [];
      let i2 = 0;
      let k;
      for (; i2 < 100; i2++) {
        k = (i2 < 10 ? "0" : "") + i2;
        d.push({
          key: k,
          value: String(Math.random())
        });
      }
      return d;
    }();
    exports2.range = function(test, testCommon) {
      function rangeTest(name2, opts, expected) {
        test("clear() range with " + name2, async function(t2) {
          const db = await prepare();
          await db.clear(opts);
          await verify(t2, db, expected);
          return db.close();
        });
      }
      async function prepare(t2) {
        const db = testCommon.factory();
        await db.open();
        await db.batch(data.map(function({ key, value }) {
          return { type: "put", key, value };
        }));
        return db;
      }
      async function verify(t2, db, expected) {
        const it = db.iterator({ keyEncoding: "utf8", valueEncoding: "utf8" });
        const entries = await it.all();
        t2.is(entries.length, expected.length, "correct number of entries");
        t2.same(entries, expected.map((kv) => [kv.key, kv.value]));
      }
      function exclude(data2, start, end, expectedLength) {
        data2 = data2.slice();
        const removed = data2.splice(start, end - start + 1);
        if (expectedLength != null) checkLength(removed, expectedLength);
        return data2;
      }
      function checkLength(arr, length) {
        if (arr.length !== length) {
          throw new RangeError("Expected " + length + " elements, got " + arr.length);
        }
        return arr;
      }
      rangeTest("no options", {}, []);
      rangeTest("reverse=true", {
        reverse: true
      }, []);
      rangeTest("gte=00", {
        gte: "00"
      }, []);
      rangeTest("gte=50", {
        gte: "50"
      }, data.slice(0, 50));
      rangeTest("lte=50 and reverse=true", {
        lte: "50",
        reverse: true
      }, data.slice(51));
      rangeTest("gte=49.5 (midway)", {
        gte: "49.5"
      }, data.slice(0, 50));
      rangeTest("gte=49999 (midway)", {
        gte: "49999"
      }, data.slice(0, 50));
      rangeTest("lte=49.5 (midway) and reverse=true", {
        lte: "49.5",
        reverse: true
      }, data.slice(50));
      rangeTest("lt=49.5 (midway) and reverse=true", {
        lt: "49.5",
        reverse: true
      }, data.slice(50));
      rangeTest("lt=50 and reverse=true", {
        lt: "50",
        reverse: true
      }, data.slice(50));
      rangeTest("lte=50", {
        lte: "50"
      }, data.slice(51));
      rangeTest("lte=50.5 (midway)", {
        lte: "50.5"
      }, data.slice(51));
      rangeTest("lte=50555 (midway)", {
        lte: "50555"
      }, data.slice(51));
      rangeTest("lt=50555 (midway)", {
        lt: "50555"
      }, data.slice(51));
      rangeTest("gte=50.5 (midway) and reverse=true", {
        gte: "50.5",
        reverse: true
      }, data.slice(0, 51));
      rangeTest("gt=50.5 (midway) and reverse=true", {
        gt: "50.5",
        reverse: true
      }, data.slice(0, 51));
      rangeTest("gt=50 and reverse=true", {
        gt: "50",
        reverse: true
      }, data.slice(0, 51));
      rangeTest("lte=0", {
        lte: "0"
      }, data);
      rangeTest("lt=0", {
        lt: "0"
      }, data);
      rangeTest("gte=30 and lte=70", {
        gte: "30",
        lte: "70"
      }, exclude(data, 30, 70));
      rangeTest("gte=30 and lte=70 and gt=40 and lt=60", {
        gte: "30",
        lte: "70",
        gt: "40",
        lt: "60"
      }, exclude(data, 30, 70));
      rangeTest("gte=30 and lte=70 and gt=20 and lt=80", {
        gte: "30",
        lte: "70",
        gt: "20",
        lt: "80"
      }, exclude(data, 30, 70));
      rangeTest("gt=29 and lt=71", {
        gt: "29",
        lt: "71"
      }, exclude(data, 30, 70));
      rangeTest("gte=30 and lte=70 and reverse=true", {
        lte: "70",
        gte: "30",
        reverse: true
      }, exclude(data, 30, 70));
      rangeTest("gt=29 and lt=71 and reverse=true", {
        lt: "71",
        gt: "29",
        reverse: true
      }, exclude(data, 30, 70));
      rangeTest("limit=20", {
        limit: 20
      }, data.slice(20));
      rangeTest("limit=20 and gte=20", {
        limit: 20,
        gte: "20"
      }, exclude(data, 20, 39, 20));
      rangeTest("limit=20 and reverse=true", {
        limit: 20,
        reverse: true
      }, data.slice(0, -20));
      rangeTest("limit=20 and lte=79 and reverse=true", {
        limit: 20,
        lte: "79",
        reverse: true
      }, exclude(data, 60, 79, 20));
      rangeTest("limit=-1 should clear whole database", {
        limit: -1
      }, []);
      rangeTest("limit=0 should not clear anything", {
        limit: 0
      }, data);
      rangeTest("lte after limit", {
        limit: 20,
        lte: "50"
      }, data.slice(20));
      rangeTest("lte before limit", {
        limit: 50,
        lte: "19"
      }, data.slice(20));
      rangeTest("gte after database end", {
        gte: "9a"
      }, data);
      rangeTest("gt after database end", {
        gt: "9a"
      }, data);
      rangeTest("lte after database end and reverse=true", {
        lte: "9a",
        reverse: true
      }, []);
      rangeTest("lte and gte after database and reverse=true", {
        lte: "9b",
        gte: "9a",
        reverse: true
      }, data);
      rangeTest("lt and gt after database and reverse=true", {
        lt: "9b",
        gt: "9a",
        reverse: true
      }, data);
      rangeTest("gt greater than lt", {
        gt: "20",
        lt: "10"
      }, data);
      rangeTest("gte greater than lte", {
        gte: "20",
        lte: "10"
      }, data);
    };
    exports2.all = function(test, testCommon) {
      exports2.range(test, testCommon);
    };
  }
});

// node_modules/abstract-level/test/sublevel-test.js
var require_sublevel_test = __commonJS({
  "node_modules/abstract-level/test/sublevel-test.js"(exports2) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
    exports2.all = function(test, testCommon) {
      for (const deferred of [false, true]) {
        test(`sublevel.clear() (deferred: ${deferred})`, async function(t2) {
          const db = testCommon.factory();
          const sub1 = db.sublevel("1");
          const sub2 = db.sublevel("2");
          if (!deferred) await sub1.open();
          if (!deferred) await sub2.open();
          await populate([sub1, sub2], ["a", "b"]);
          await verify(["!1!a", "!1!b", "!2!a", "!2!b"]);
          await clear([sub1], {});
          await verify(["!2!a", "!2!b"]);
          await populate([sub1], ["a", "b"]);
          await clear([sub2], { lt: "b" });
          await verify(["!1!a", "!1!b", "!2!b"]);
          await db.close();
          async function populate(subs, items) {
            return Promise.all(subs.map((sub) => {
              return sub.batch(items.map(function(item) {
                return { type: "put", key: item, value: item };
              }));
            }));
          }
          async function clear(subs, opts) {
            return Promise.all(subs.map((sub) => {
              return sub.clear(opts);
            }));
          }
          async function verify(expected) {
            const keys = await db.keys().all();
            t2.same(keys, expected);
          }
        });
      }
      for (const method of ["batch", "chained batch"]) {
        test(`${method} with descendant sublevel option`, async function(t2) {
          t2.plan(25);
          const db = testCommon.factory();
          await db.open();
          const a2 = db.sublevel("a");
          const b = a2.sublevel("b");
          const c2 = b.sublevel("c");
          await Promise.all([a2.open(), b.open(), c2.open()]);
          const utf8 = db.keyEncoding("utf8");
          const put = method === "batch" ? (db2, key, opts) => db2.batch([{ type: "put", key, value: "x", ...opts }]) : (db2, key, opts) => db2.batch().put(key, key, opts).write();
          const del = method === "batch" ? (db2, key, opts) => db2.batch([{ type: "del", key, ...opts }]) : (db2, key, opts) => db2.batch().del(key, opts).write();
          db.on("write", (ops) => t2.same(ops[0].key, utf8.encode("1"), "got put 1"));
          await put(db, "1", { sublevel: db });
          db.removeAllListeners("write");
          db.on("write", (ops) => t2.same(ops[0].key, utf8.encode("!a!2"), "got put 2"));
          await put(db, "2", { sublevel: a2 });
          await put(a2, "2", { sublevel: a2 });
          db.removeAllListeners("write");
          db.on("write", (ops) => t2.same(ops[0].key, utf8.encode("!a!!b!3"), "got put 3"));
          await put(db, "3", { sublevel: b });
          await put(a2, "3", { sublevel: b });
          await put(b, "3", { sublevel: b });
          db.removeAllListeners("write");
          db.on("write", (ops) => t2.same(ops[0].key, utf8.encode("!a!!b!!c!4"), "got put 4"));
          await put(db, "4", { sublevel: c2 });
          await put(a2, "4", { sublevel: c2 });
          await put(b, "4", { sublevel: c2 });
          await put(c2, "4", { sublevel: c2 });
          t2.same(await db.keys().all(), ["!a!!b!!c!4", "!a!!b!3", "!a!2", "1"], "db has entries");
          t2.same(await a2.keys().all(), ["!b!!c!4", "!b!3", "2"], "sublevel a has entries");
          t2.same(await b.keys().all(), ["!c!4", "3"], "sublevel b has entries");
          t2.same(await c2.keys().all(), ["4"], "sublevel c has entries");
          db.removeAllListeners("write");
          db.on("write", (ops) => t2.same(ops[0].key, utf8.encode("1"), "got del 1"));
          await del(db, "1", { sublevel: db });
          db.removeAllListeners("write");
          db.on("write", (ops) => t2.same(ops[0].key, utf8.encode("!a!2"), "got del 2"));
          await del(db, "2", { sublevel: a2 });
          await del(a2, "2", { sublevel: a2 });
          db.removeAllListeners("write");
          db.on("write", (ops) => t2.same(ops[0].key, utf8.encode("!a!!b!3"), "got del 3"));
          await del(db, "3", { sublevel: b });
          await del(a2, "3", { sublevel: b });
          await del(b, "3", { sublevel: b });
          db.removeAllListeners("write");
          db.on("write", (ops) => t2.same(ops[0].key, utf8.encode("!a!!b!!c!4"), "got del 4"));
          await del(db, "4", { sublevel: c2 });
          await del(a2, "4", { sublevel: c2 });
          await del(b, "4", { sublevel: c2 });
          await del(c2, "4", { sublevel: c2 });
          t2.same(await db.keys().all(), [], "db has no entries");
          return db.close();
        });
        test(`${method} with nondescendant sublevel option`, async function(t2) {
          const db = testCommon.factory();
          await db.open();
          const a2 = db.sublevel("a");
          const b = db.sublevel("b");
          await Promise.all([a2.open(), b.open()]);
          if (method === "batch") {
            await a2.batch([{ type: "put", key: "k", value: "v", sublevel: b }]);
          } else {
            await a2.batch().put("k", "v", { sublevel: b }).write();
          }
          t2.same(await db.keys().all(), ["!b!k"], "written to sublevel b");
        });
      }
      for (const deferred of [false, true]) {
        for (const keyEncoding of ["buffer", "view"]) {
          if (!testCommon.supports.encodings[keyEncoding]) return;
          test(`iterate sublevel keys with bytes above 196 (${keyEncoding}, deferred: ${deferred})`, async function(t2) {
            const db = testCommon.factory();
            const sub1 = db.sublevel("a", { keyEncoding });
            const sub2 = db.sublevel("b", { keyEncoding });
            const length = (db2) => db2.keys().all().then((x) => x.length);
            if (!deferred) await sub1.open();
            if (!deferred) await sub2.open();
            const batch1 = [];
            const batch2 = [];
            const keys = [];
            for (let i2 = 0; i2 < 256; i2++) {
              const key = keyEncoding === "buffer" ? Buffer3.from([i2]) : new Uint8Array([i2]);
              keys.push(key);
              batch1.push({ type: "put", key, value: "aa" });
              batch2.push({ type: "put", key, value: "bb" });
            }
            await Promise.all([sub1.batch(batch1), sub2.batch(batch2)]);
            const entries1 = await sub1.iterator().all();
            const entries2 = await sub2.iterator().all();
            t2.is(entries1.length, 256, "sub1 yielded all entries");
            t2.is(entries2.length, 256, "sub2 yielded all entries");
            t2.ok(entries1.every((x) => x[1] === "aa"));
            t2.ok(entries2.every((x) => x[1] === "bb"));
            const many1 = await sub1.getMany(keys);
            const many2 = await sub2.getMany(keys);
            t2.is(many1.length, 256, "sub1 yielded all values");
            t2.is(many2.length, 256, "sub2 yielded all values");
            t2.ok(many1.every((x) => x === "aa"));
            t2.ok(many2.every((x) => x === "bb"));
            const singles1 = await Promise.all(keys.map((k) => sub1.get(k)));
            const singles2 = await Promise.all(keys.map((k) => sub2.get(k)));
            t2.is(singles1.length, 256, "sub1 yielded all values");
            t2.is(singles2.length, 256, "sub2 yielded all values");
            t2.ok(singles1.every((x) => x === "aa"));
            t2.ok(singles2.every((x) => x === "bb"));
            await sub1.clear();
            t2.same(await length(sub1), 0, "cleared sub1");
            t2.same(await length(sub2), 256, "did not clear sub2");
            await db.close();
          });
        }
      }
    };
  }
});

// node_modules/abstract-level/test/events/write.js
var require_write = __commonJS({
  "node_modules/abstract-level/test/events/write.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    module.exports = function(test, testCommon) {
      for (const deferred of [false, true]) {
        const batchMethods = deferred ? ["batch"] : ["batch", "chained batch"];
        const allMethods = batchMethods.concat(["singular"]);
        for (const method of allMethods) {
          for (const withSublevel of method === "singular" ? [false] : [false, true]) {
            test(`db emits write event for ${method} put operation (deferred: ${deferred}, sublevel: ${withSublevel})`, async function(t2) {
              t2.plan(1);
              const db = testCommon.factory();
              const sublevel = withSublevel ? db.sublevel("abc") : null;
              if (!deferred) {
                await db.open();
                if (withSublevel) await sublevel.open();
              }
              const dbEncoding = db.keyEncoding("utf8");
              const subEncoding = withSublevel ? sublevel.keyEncoding("utf8") : null;
              db.on("write", function(ops) {
                t2.same(ops, [
                  {
                    type: "put",
                    key: withSublevel ? sublevel.prefixKey(subEncoding.encode("456"), subEncoding.format, true) : 456,
                    value: withSublevel ? subEncoding.encode("99") : 99,
                    keyEncoding: db.keyEncoding(withSublevel ? subEncoding.format : "utf8"),
                    valueEncoding: db.valueEncoding(withSublevel ? subEncoding.format : "utf8"),
                    encodedKey: withSublevel ? sublevel.prefixKey(subEncoding.encode("456"), subEncoding.format, true) : dbEncoding.encode("456"),
                    encodedValue: (withSublevel ? subEncoding : dbEncoding).encode("99"),
                    custom: 123,
                    sublevel: null
                    // Should be unset
                  }
                ], "got write event");
              });
              switch (method) {
                case "batch":
                  await db.batch([{ type: "put", key: 456, value: 99, custom: 123, sublevel }]);
                  break;
                case "chained batch":
                  await db.batch().put(456, 99, { custom: 123, sublevel }).write();
                  break;
                case "singular":
                  await db.put(456, 99, { custom: 123, sublevel });
                  break;
              }
              return db.close();
            });
            test(`db emits write event for ${method} del operation (deferred: ${deferred}, sublevel: ${withSublevel})`, async function(t2) {
              t2.plan(1);
              const db = testCommon.factory();
              const sublevel = withSublevel ? db.sublevel("abc") : null;
              if (!deferred) {
                await db.open();
                if (withSublevel) await sublevel.open();
              }
              const dbEncoding = db.keyEncoding("utf8");
              const subEncoding = withSublevel ? sublevel.keyEncoding("utf8") : null;
              db.on("write", function(ops) {
                t2.same(ops, [
                  {
                    type: "del",
                    key: withSublevel ? sublevel.prefixKey(subEncoding.encode("456"), subEncoding.format, true) : 456,
                    keyEncoding: db.keyEncoding(withSublevel ? subEncoding.format : "utf8"),
                    encodedKey: withSublevel ? sublevel.prefixKey(subEncoding.encode("456"), subEncoding.format, true) : dbEncoding.encode("456"),
                    custom: 123,
                    sublevel: null
                    // Should be unset
                  }
                ], "got write event");
              });
              switch (method) {
                case "batch":
                  await db.batch([{ type: "del", key: 456, custom: 123, sublevel }]);
                  break;
                case "chained batch":
                  await db.batch().del(456, { custom: 123, sublevel }).write();
                  break;
                case "singular":
                  await db.del(456, { custom: 123, sublevel });
                  break;
              }
              return db.close();
            });
          }
        }
        for (const method of batchMethods) {
          test(`db emits write event for multiple ${method} operations (deferred: ${deferred})`, async function(t2) {
            t2.plan(1);
            const db = testCommon.factory();
            if (!deferred) await db.open();
            db.on("write", function(ops) {
              t2.same(ops.map((op) => op.key), ["a", "b"], "got multiple operations in one event");
            });
            switch (method) {
              case "batch":
                await db.batch([{ type: "put", key: "a", value: "foo" }, { type: "del", key: "b" }]);
                break;
              case "chained batch":
                await db.batch().put("a", "foo").del("b").write();
                break;
            }
            return db.close();
          });
        }
        for (const method of allMethods) {
          test(`db emits write event for ${method} operation in favor of deprecated events (deferred: ${deferred})`, async function(t2) {
            t2.plan(5);
            const keys = [];
            const db = testCommon.factory();
            if (!deferred) await db.open();
            db.on("write", function(ops) {
              keys.push(...ops.map((op) => op.key));
            });
            db.on("batch", function() {
              t2.fail("should not get batch event");
            });
            db.on("put", function() {
              t2.fail("should not get put event");
            });
            db.on("del", function() {
              t2.fail("should not get del event");
            });
            t2.ok(db.supports.events.batch, "supports batch event");
            t2.ok(db.supports.events.put, "supports put event");
            t2.ok(db.supports.events.del, "supports del event");
            switch (method) {
              case "batch":
                await db.batch([{ type: "put", key: "a", value: "a" }]);
                t2.is(keys.pop(), "a", "got write event for batch put");
                await db.batch([{ type: "del", key: "b" }]);
                t2.is(keys.pop(), "b", "got write event for batch del");
                break;
              case "chained batch":
                await db.batch().put("c", "c").write();
                t2.is(keys.pop(), "c", "got write event for chained batch put");
                await db.batch().del("d").write();
                t2.is(keys.pop(), "d", "got write event for chained batch del");
                break;
              case "singular":
                await db.put("e", "e");
                t2.is(keys.pop(), "e", "got write event for put");
                await db.del("f");
                t2.is(keys.pop(), "f", "got write event for del");
                break;
            }
            return db.close();
          });
        }
      }
    };
  }
});

// node_modules/abstract-level/test/hooks/shared.js
var require_shared = __commonJS({
  "node_modules/abstract-level/test/hooks/shared.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    module.exports = function(test, testCommon, hook) {
      test(`can add and remove functions to/from ${hook} hook`, async function(t2) {
        const db = testCommon.factory();
        const fn1 = function() {
        };
        const fn2 = function() {
        };
        t2.is(db.hooks[hook].noop, true, "is initially a noop");
        t2.is(typeof db.hooks[hook].run, "function");
        db.hooks[hook].add(fn1);
        t2.is(db.hooks[hook].noop, false, "not a noop");
        t2.is(typeof db.hooks[hook].run, "function");
        db.hooks[hook].add(fn2);
        t2.is(db.hooks[hook].noop, false, "not a noop");
        t2.is(typeof db.hooks[hook].run, "function");
        db.hooks[hook].delete(fn1);
        t2.is(db.hooks[hook].noop, false, "not a noop");
        t2.is(typeof db.hooks[hook].run, "function");
        db.hooks[hook].delete(fn2);
        t2.is(db.hooks[hook].noop, true, "is a noop again");
        t2.is(typeof db.hooks[hook].run, "function");
        for (const invalid of [null, void 0, 123]) {
          t2.throws(() => db.hooks[hook].add(invalid), (err) => err.name === "TypeError");
          t2.throws(() => db.hooks[hook].delete(invalid), (err) => err.name === "TypeError");
        }
        t2.is(db.hooks[hook].noop, true, "still a noop");
        t2.is(typeof db.hooks[hook].run, "function");
        return db.close();
      });
    };
  }
});

// node_modules/abstract-level/test/hooks/postopen.js
var require_postopen = __commonJS({
  "node_modules/abstract-level/test/hooks/postopen.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var shared = require_shared();
    module.exports = function(test, testCommon) {
      shared(test, testCommon, "postopen");
      test("postopen hook function is called before deferred operations and open event", async function(t2) {
        t2.plan(5);
        const db = testCommon.factory();
        const order = [];
        db.hooks.postopen.add(async function(options) {
          t2.is(db.status, "open");
          order.push("postopen");
        });
        db.on("opening", function() {
          t2.is(db.status, "opening");
          order.push("opening");
        });
        db.defer(function() {
          t2.is(db.status, "open");
          order.push("undefer");
        });
        db.on("open", function() {
          t2.is(db.status, "open");
          order.push("open");
        });
        await db.open();
        t2.same(order, ["opening", "postopen", "undefer", "open"]);
        return db.close();
      });
      test("postopen hook functions are called sequentially", async function(t2) {
        t2.plan(1);
        const db = testCommon.factory();
        let waited = false;
        db.hooks.postopen.add(async function(options) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              waited = true;
              resolve();
            }, 100);
          });
        });
        db.hooks.postopen.add(async function(options) {
          t2.ok(waited);
        });
        await db.open();
        return db.close();
      });
      test("postopen hook function receives options from constructor", async function(t2) {
        t2.plan(1);
        const db = testCommon.factory({ userland: 123 });
        db.hooks.postopen.add(async function(options) {
          t2.same(options, {
            createIfMissing: true,
            errorIfExists: false,
            userland: 123
          });
        });
        await db.open();
        return db.close();
      });
      test("postopen hook function receives options from open()", async function(t2) {
        t2.plan(1);
        const db = testCommon.factory();
        db.hooks.postopen.add(async function(options) {
          t2.same(options, {
            createIfMissing: true,
            errorIfExists: false,
            userland: 456
          });
        });
        await db.open({ userland: 456 });
        return db.close();
      });
      test("error from postopen hook function closes the db", async function(t2) {
        t2.plan(4);
        const db = testCommon.factory();
        db.hooks.postopen.add(async function(options) {
          t2.is(db.status, "open");
          throw new Error("test");
        });
        try {
          await db.open();
        } catch (err) {
          t2.is(db.status, "closed");
          t2.is(err.code, "LEVEL_HOOK_ERROR");
          t2.is(err.cause.message, "test");
        }
      });
      test("error from postopen hook function must be an error", async function(t2) {
        t2.plan(5);
        const db = testCommon.factory();
        db.hooks.postopen.add(async function(options) {
          t2.is(db.status, "open");
          return Promise.reject(null);
        });
        try {
          await db.open();
        } catch (err) {
          t2.is(db.status, "closed");
          t2.is(err.code, "LEVEL_HOOK_ERROR");
          t2.is(err.cause.name, "TypeError");
          t2.is(err.cause.message, "Promise rejection reason must be an Error, received null");
        }
      });
      test("error from postopen hook function must be an error, but it can be cross-realm", async function(t2) {
        t2.plan(5);
        class FakeError {
          get [Symbol.toStringTag]() {
            return "Error";
          }
        }
        const fake = new FakeError();
        const db = testCommon.factory();
        t2.is(Object.prototype.toString.call(fake), "[object Error]");
        db.hooks.postopen.add(async function(options) {
          t2.is(db.status, "open");
          return Promise.reject(fake);
        });
        try {
          await db.open();
        } catch (err) {
          t2.is(db.status, "closed");
          t2.is(err.code, "LEVEL_HOOK_ERROR");
          t2.is(err.cause, fake);
        }
      });
      test("errors from both postopen hook function and resource lock the db", async function(t2) {
        t2.plan(9);
        const db = testCommon.factory();
        const resource = db.iterator();
        resource.close = async function() {
          throw new Error("error from resource");
        };
        db.hooks.postopen.add(async function(options) {
          t2.is(db.status, "open");
          throw new Error("error from hook");
        });
        try {
          await db.open();
        } catch (err) {
          t2.is(db.status, "closed");
          t2.is(err.code, "LEVEL_HOOK_ERROR");
          t2.is(err.cause.name, "CombinedError");
          t2.is(err.cause.message, "error from hook; error from resource");
        }
        try {
          await db.open();
        } catch (err) {
          t2.is(db.status, "closed");
          t2.is(err.code, "LEVEL_STATUS_LOCKED");
        }
        try {
          await db.close();
        } catch (err) {
          t2.is(db.status, "closed");
          t2.is(err.code, "LEVEL_STATUS_LOCKED");
        }
      });
      for (const method of ["open", "close"]) {
        test(`postopen hook function that attempts to call ${method}() results in error`, async function(t2) {
          t2.plan(5);
          const db = testCommon.factory();
          db.hooks.postopen.add(async function(options) {
            t2.is(db.status, "open");
            return db[method]();
          });
          db.on("open", function() {
            t2.fail("should not open");
          });
          try {
            await db.open();
          } catch (err) {
            t2.is(db.status, "closed");
            t2.is(err.code, "LEVEL_HOOK_ERROR");
            t2.is(err.cause.code, "LEVEL_STATUS_LOCKED");
            t2.is(err.cause.message, "Database status is locked");
          }
        });
      }
    };
  }
});

// node_modules/abstract-level/test/hooks/newsub.js
var require_newsub = __commonJS({
  "node_modules/abstract-level/test/hooks/newsub.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var shared = require_shared();
    module.exports = function(test, testCommon) {
      shared(test, testCommon, "newsub");
      test("newsub hook function receives sublevel and default options", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        let instance;
        db.hooks.newsub.add(function(sublevel, options) {
          instance = sublevel;
          t2.ok(sublevel.hooks, "can access sublevel hooks");
          t2.same(options, { separator: "!" });
        });
        t2.ok(db.sublevel("sub") === instance);
        return db.close();
      });
      test("newsub hook function receives userland options", async function(t2) {
        t2.plan(1);
        const db = testCommon.factory();
        db.hooks.newsub.add(function(sublevel, options) {
          t2.same(options, { separator: "!", userland: 123 });
        });
        db.sublevel("sub", { userland: 123 });
        return db.close();
      });
      test("db wraps error from newsub hook function", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        db.hooks.newsub.add(function(sublevel, options) {
          throw new Error("test");
        });
        try {
          db.sublevel("sub");
        } catch (err) {
          t2.is(err.code, "LEVEL_HOOK_ERROR");
          t2.is(err.cause.message, "test");
        }
        return db.close();
      });
    };
  }
});

// node_modules/abstract-level/test/hooks/prewrite.js
var require_prewrite = __commonJS({
  "node_modules/abstract-level/test/hooks/prewrite.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var shared = require_shared();
    module.exports = function(test, testCommon) {
      shared(test, testCommon, "prewrite");
      for (const deferred of [false, true]) {
        for (const type of ["put", "del"]) {
          for (const method of ["batch", "chained batch", "singular"]) {
            test(`prewrite hook function is called after open (deferred: ${deferred})`, async function(t2) {
              t2.plan(1);
              const db = testCommon.factory();
              if (!deferred) await db.open();
              db.hooks.prewrite.add(function(op, batch) {
                t2.is(db.status, "open");
              });
              if (type === "put") {
                switch (method) {
                  case "batch":
                    await db.batch([{ type: "put", key: "beep", value: "boop" }]);
                    break;
                  case "chained batch":
                    await db.open();
                    await db.batch().put("beep", "boop").write();
                    break;
                  case "singular":
                    await db.put("beep", "boop");
                    break;
                }
              } else if (type === "del") {
                switch (method) {
                  case "batch":
                    await db.batch([{ type: "del", key: "beep" }]);
                    break;
                  case "chained batch":
                    await db.open();
                    await db.batch().del("beep").write();
                    break;
                  case "singular":
                    await db.del("beep");
                    break;
                }
              }
              return db.close();
            });
          }
        }
      }
      test("prewrite hook function receives put op", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          t2.same(op, {
            type: "put",
            key: "beep",
            value: "boop",
            keyEncoding: db.keyEncoding("utf8"),
            valueEncoding: db.valueEncoding("utf8")
          });
        });
        await db.put("beep", "boop");
        await db.batch([{ type: "put", key: "beep", value: "boop" }]);
        await db.batch().put("beep", "boop").write();
        return db.close();
      });
      test("prewrite hook function receives del op", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          t2.same(op, {
            type: "del",
            key: "beep",
            keyEncoding: db.keyEncoding("utf8")
          });
        });
        await db.del("beep");
        await db.batch([{ type: "del", key: "beep" }]);
        await db.batch().del("beep").write();
        return db.close();
      });
      test("prewrite hook function receives put op with custom encodings and userland option", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          t2.same(op, {
            type: "put",
            key: 123,
            // Should not be JSON-encoded
            value: "boop",
            keyEncoding: db.keyEncoding("json"),
            valueEncoding: db.valueEncoding("json"),
            userland: 456
          });
        });
        await db.put(123, "boop", { keyEncoding: "json", valueEncoding: "json", userland: 456 });
        await db.batch([{ type: "put", key: 123, value: "boop", keyEncoding: "json", valueEncoding: "json", userland: 456 }]);
        await db.batch().put(123, "boop", { keyEncoding: "json", valueEncoding: "json", userland: 456 }).write();
        return db.close();
      });
      test("prewrite hook function receives del op with custom encodings and userland option", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          t2.same(op, {
            type: "del",
            key: 123,
            // Should not be JSON-encoded
            keyEncoding: db.keyEncoding("json"),
            userland: 456
          });
        });
        await db.del(123, { keyEncoding: "json", userland: 456 });
        await db.batch([{ type: "del", key: 123, keyEncoding: "json", userland: 456 }]);
        await db.batch().del(123, { keyEncoding: "json", userland: 456 }).write();
        return db.close();
      });
      test("prewrite hook function can modify put operation", async function(t2) {
        t2.plan(10 * 3);
        const db = testCommon.factory({ keyEncoding: "json", valueEncoding: "utf8" });
        db.hooks.prewrite.add(function(op, batch) {
          t2.is(op.keyEncoding, db.keyEncoding("json"));
          t2.is(op.valueEncoding, db.valueEncoding("utf8"));
          op.key = "456";
          op.value = { x: 1 };
          op.keyEncoding = "utf8";
          op.valueEncoding = "json";
          op.userland = 456;
        });
        db.on("write", function(ops) {
          t2.is(ops.length, 1);
          t2.is(ops[0].key, "456");
          t2.same(ops[0].value, { x: 1 });
          t2.is(ops[0].keyEncoding, db.keyEncoding("utf8"));
          t2.is(ops[0].valueEncoding, db.valueEncoding("json"));
          t2.same(ops[0].encodedKey, db.keyEncoding("utf8").encode("456"));
          t2.same(ops[0].encodedValue, db.valueEncoding("json").encode({ x: 1 }));
          t2.is(ops[0].userland, 456);
        });
        await db.put(123, "boop");
        await db.batch([{ type: "put", key: 123, value: "boop" }]);
        await db.batch().put(123, "boop").write();
        return db.close();
      });
      test("prewrite hook function can modify del operation", async function(t2) {
        t2.plan(6 * 3);
        const db = testCommon.factory({ keyEncoding: "json" });
        db.hooks.prewrite.add(function(op, batch) {
          t2.is(op.keyEncoding, db.keyEncoding("json"));
          op.key = "456";
          op.keyEncoding = "utf8";
          op.userland = 456;
        });
        db.on("write", function(ops) {
          t2.is(ops.length, 1);
          t2.is(ops[0].key, "456");
          t2.is(ops[0].keyEncoding, db.keyEncoding("utf8"));
          t2.same(ops[0].encodedKey, db.keyEncoding("utf8").encode("456"));
          t2.is(ops[0].userland, 456);
        });
        await db.del(123);
        await db.batch([{ type: "del", key: 123 }]);
        await db.batch().del(123).write();
        return db.close();
      });
      test("second prewrite hook function sees modified operation of first", async function(t2) {
        t2.plan(6 * 2);
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          t2.is(op.key, "1");
          op.key = "2";
        });
        db.hooks.prewrite.add(function(op, batch) {
          t2.is(op.key, "2");
        });
        await db.put("1", "boop");
        await db.batch([{ type: "put", key: "1", value: "boop" }]);
        await db.batch().put("1", "boop").write();
        await db.del("1");
        await db.batch([{ type: "del", key: "1" }]);
        await db.batch().del("1").write();
        return db.close();
      });
      test("prewrite hook function triggered by put can add put operation", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        const utf8 = db.keyEncoding("utf8");
        const json = db.valueEncoding("json");
        db.hooks.prewrite.add(function(op, batch) {
          batch.add({
            type: "put",
            key: "from-hook",
            value: { abc: 123 },
            valueEncoding: "json"
          });
        });
        db.on("write", function(ops) {
          t2.same(ops, [
            {
              type: "put",
              key: "beep",
              value: "boop",
              keyEncoding: db.keyEncoding("utf8"),
              valueEncoding: db.valueEncoding("utf8"),
              encodedKey: utf8.encode("beep"),
              encodedValue: utf8.encode("boop")
            },
            {
              type: "put",
              key: "from-hook",
              value: { abc: 123 },
              keyEncoding: db.keyEncoding("utf8"),
              valueEncoding: db.valueEncoding("json"),
              encodedKey: utf8.encode("from-hook"),
              encodedValue: json.encode({ abc: 123 })
            }
          ]);
        });
        await db.put("beep", "boop");
        await db.batch([{ type: "put", key: "beep", value: "boop" }]);
        await db.batch().put("beep", "boop").write();
        return db.close();
      });
      test("prewrite hook function triggered by del can add del operation", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        const utf8 = db.keyEncoding("utf8");
        db.hooks.prewrite.add(function(op, batch) {
          batch.add({ type: "del", key: "from-hook" });
        });
        db.on("write", function(ops) {
          t2.same(ops, [
            {
              type: "del",
              key: "beep",
              keyEncoding: db.keyEncoding("utf8"),
              encodedKey: utf8.encode("beep")
            },
            {
              type: "del",
              key: "from-hook",
              keyEncoding: db.keyEncoding("utf8"),
              encodedKey: utf8.encode("from-hook")
            }
          ]);
        });
        await db.del("beep");
        await db.batch([{ type: "del", key: "beep" }]);
        await db.batch().del("beep").write();
        return db.close();
      });
      test("prewrite hook function can add operations with sublevel option", async function(t2) {
        t2.plan(2 * 6);
        const db = testCommon.factory();
        const sublevel = db.sublevel("sub", { keyEncoding: "json", valueEncoding: "json" });
        const utf8 = db.keyEncoding("utf8");
        db.hooks.prewrite.add(function(op, batch) {
          batch.add({ type: "put", key: "from-hook-1", value: { x: 22 }, sublevel });
          batch.add({ type: "del", key: "from-hook-2", sublevel });
        });
        db.on("write", function(ops) {
          t2.is(ops[0].key, "from-input");
          t2.same(ops.slice(1), [
            {
              type: "put",
              key: utf8.encode('!sub!"from-hook-1"'),
              value: utf8.encode('{"x":22}'),
              keyEncoding: db.keyEncoding(sublevel.keyEncoding().format),
              valueEncoding: db.valueEncoding(sublevel.valueEncoding().format),
              encodedKey: utf8.encode('!sub!"from-hook-1"'),
              encodedValue: utf8.encode('{"x":22}'),
              sublevel: null
              // Should be unset
            },
            {
              type: "del",
              key: utf8.encode('!sub!"from-hook-2"'),
              keyEncoding: db.keyEncoding(sublevel.keyEncoding().format),
              encodedKey: utf8.encode('!sub!"from-hook-2"'),
              sublevel: null
              // Should be unset
            }
          ]);
        });
        await db.put("from-input", "abc");
        await db.batch([{ type: "put", key: "from-input", value: "abc" }]);
        await db.batch().put("from-input", "abc").write();
        await db.del("from-input");
        await db.batch([{ type: "del", key: "from-input" }]);
        await db.batch().del("from-input").write();
        return db.close();
      });
      test("prewrite hook function can add operations with descendant sublevel option", async function(t2) {
        t2.plan(20);
        const db = testCommon.factory();
        await db.open();
        const a2 = db.sublevel("a");
        const b = a2.sublevel("b");
        const c2 = b.sublevel("c");
        const utf8 = db.keyEncoding("utf8");
        const put = async (db2, key, opts) => {
          const fn = function(op, batch) {
            batch.add({ type: "put", key, value: "x", ...opts });
          };
          db2.hooks.prewrite.add(fn);
          try {
            await db2.put("0", "0");
          } finally {
            db2.hooks.prewrite.delete(fn);
          }
        };
        const del = async (db2, key, opts) => {
          const fn = function(op, batch) {
            batch.add({ type: "del", key, ...opts });
          };
          db2.hooks.prewrite.add(fn);
          try {
            await db2.del("0");
          } finally {
            db2.hooks.prewrite.delete(fn);
          }
        };
        db.on("write", (ops) => t2.same(ops[1].key, utf8.encode("1"), "got put 1"));
        await put(db, "1", { sublevel: db });
        db.removeAllListeners("write");
        db.on("write", (ops) => t2.same(ops[1].key, utf8.encode("!a!2"), "got put 2"));
        await put(db, "2", { sublevel: a2 });
        await put(a2, "2", { sublevel: a2 });
        db.removeAllListeners("write");
        db.on("write", (ops) => t2.same(ops[1].key, utf8.encode("!a!!b!3"), "got put 3"));
        await put(db, "3", { sublevel: b });
        await put(a2, "3", { sublevel: b });
        await put(b, "3", { sublevel: b });
        db.removeAllListeners("write");
        db.on("write", (ops) => t2.same(ops[1].key, utf8.encode("!a!!b!!c!4"), "got put 4"));
        await put(db, "4", { sublevel: c2 });
        await put(a2, "4", { sublevel: c2 });
        await put(b, "4", { sublevel: c2 });
        await put(c2, "4", { sublevel: c2 });
        db.removeAllListeners("write");
        db.on("write", (ops) => t2.same(ops[1].key, utf8.encode("1"), "got del 1"));
        await del(db, "1", { sublevel: db });
        db.removeAllListeners("write");
        db.on("write", (ops) => t2.same(ops[1].key, utf8.encode("!a!2"), "got del 2"));
        await del(db, "2", { sublevel: a2 });
        await del(a2, "2", { sublevel: a2 });
        db.removeAllListeners("write");
        db.on("write", (ops) => t2.same(ops[1].key, utf8.encode("!a!!b!3"), "got del 3"));
        await del(db, "3", { sublevel: b });
        await del(a2, "3", { sublevel: b });
        await del(b, "3", { sublevel: b });
        db.removeAllListeners("write");
        db.on("write", (ops) => t2.same(ops[1].key, utf8.encode("!a!!b!!c!4"), "got del 4"));
        await del(db, "4", { sublevel: c2 });
        await del(a2, "4", { sublevel: c2 });
        await del(b, "4", { sublevel: c2 });
        await del(c2, "4", { sublevel: c2 });
        return db.close();
      });
      test("prewrite hook is triggered bottom-up for nested sublevels", async function(t2) {
        const db = testCommon.factory();
        const a2 = db.sublevel("a");
        const b = a2.sublevel("b");
        const order = [];
        const triggers = [
          [["b", "a", "root"], () => b.put("a", "a")],
          [["b", "a", "root"], () => b.batch([{ type: "put", key: "a", value: "a" }])],
          [["b", "a", "root"], () => b.batch().put("a", "a").write()],
          [["b", "a", "root"], () => b.del("a")],
          [["b", "a", "root"], () => b.batch([{ type: "del", key: "a" }])],
          [["b", "a", "root"], () => b.batch().del("a").write()],
          [["a", "root"], () => a2.put("a", "a")],
          [["a", "root"], () => a2.batch([{ type: "put", key: "a", value: "a" }])],
          [["a", "root"], () => a2.batch().put("a", "a").write()],
          [["a", "root"], () => a2.del("a")],
          [["a", "root"], () => a2.batch([{ type: "del", key: "a" }])],
          [["a", "root"], () => a2.batch().del("a").write()],
          [["root"], () => db.put("a", "a")],
          [["root"], () => db.batch([{ type: "put", key: "a", value: "a" }])],
          [["root"], () => db.batch().put("a", "a").write()],
          [["root"], () => db.del("a")],
          [["root"], () => db.batch([{ type: "del", key: "a" }])],
          [["root"], () => db.batch().del("a").write()],
          // The sublevel option should not trigger the prewrite hook
          [["root"], () => db.put("a", "a", { sublevel: a2 })],
          [["root"], () => db.batch([{ type: "put", key: "a", value: "a", sublevel: a2 }])],
          [["root"], () => db.batch().put("a", "a", { sublevel: a2 }).write()],
          [["root"], () => db.del("a", { sublevel: a2 })],
          [["root"], () => db.batch([{ type: "del", key: "a", sublevel: a2 }])],
          [["root"], () => db.batch().del("a", { sublevel: a2 }).write()]
        ];
        t2.plan(triggers.length);
        db.hooks.prewrite.add((op, batch) => {
          order.push("root");
        });
        a2.hooks.prewrite.add((op, batch) => {
          order.push("a");
        });
        b.hooks.prewrite.add((op, batch) => {
          order.push("b");
        });
        for (const [expectedOrder, trigger] of triggers) {
          await trigger();
          t2.same(order.splice(0, order.length), expectedOrder);
        }
        return db.close();
      });
      test("db catches invalid operations added by prewrite hook function", async function(t2) {
        const db = testCommon.factory();
        const errEncoding = {
          name: "test",
          format: "utf8",
          encode() {
            throw new Error();
          },
          decode() {
            throw new Error();
          }
        };
        const hookFunctions = [
          (op, batch) => batch.add(),
          (op, batch) => batch.add({}),
          (op, batch) => batch.add({ type: "del" }),
          (op, batch) => batch.add({ type: "del", key: null }),
          (op, batch) => batch.add({ type: "del", key: void 0 }),
          (op, batch) => batch.add({ type: "put", key: "a" }),
          (op, batch) => batch.add({ type: "put", key: "a", value: null }),
          (op, batch) => batch.add({ type: "put", key: "a", value: void 0 }),
          (op, batch) => batch.add({ type: "nope", key: "a", value: "b" }),
          (op, batch) => batch.add({ type: "del", key: "a", keyEncoding: errEncoding }),
          (op, batch) => batch.add({ type: "put", key: "a", value: "b", keyEncoding: errEncoding }),
          (op, batch) => batch.add({ type: "put", key: "a", value: "b", valueEncoding: errEncoding })
        ];
        const triggers = [
          () => db.put("beep", "boop"),
          () => db.batch([{ type: "put", key: "beep", value: "boop" }]),
          () => db.batch().put("beep", "boop").write(),
          () => db.del("beep"),
          () => db.batch([{ type: "del", key: "beep" }]),
          () => db.batch().del("beep").write()
        ];
        t2.plan(hookFunctions.length * triggers.length * 2);
        db.on("write", function(ops) {
          t2.fail("should not write");
        });
        for (const trigger of triggers) {
          for (const fn of hookFunctions) {
            db.hooks.prewrite.add(fn);
            try {
              await trigger();
            } catch (err) {
              t2.is(err.code, "LEVEL_HOOK_ERROR");
            }
            db.hooks.prewrite.delete(fn);
            t2.is(db.hooks.prewrite.noop, true);
          }
        }
        return db.close();
      });
      test("prewrite hook function is called once for every input operation", async function(t2) {
        t2.plan(2);
        const calls = [];
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          calls.push(op.key);
        });
        await db.batch([{ type: "del", key: "1" }, { type: "put", key: "2", value: "123" }]);
        t2.same(calls.splice(0, calls.length), ["1", "2"]);
        await db.batch().del("1").put("2", "123").write();
        t2.same(calls.splice(0, calls.length), ["1", "2"]);
        return db.close();
      });
      test("prewrite hook adds operations after input operations", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          if (op.key === "input1") {
            batch.add({ type: "del", key: "hook1" }).add({ type: "del", key: "hook2" }).add({ type: "put", key: "hook3", value: "foo" });
          }
        });
        db.on("write", function(ops) {
          t2.same(ops.map((op) => op.key), [
            "input1",
            "input2",
            "hook1",
            "hook2",
            "hook3"
          ], "order is correct");
        });
        await db.batch([{ type: "del", key: "input1" }, { type: "put", key: "input2", value: "123" }]);
        await db.batch().del("input1").put("input2", "123").write();
        return db.close();
      });
      test("prewrite hook does not copy input options to added operations", async function(t2) {
        t2.plan(6);
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          batch.add({ type: "put", key: "from-hook-a", value: "xyz" });
          batch.add({ type: "del", key: "from-hook-b" });
        });
        db.on("write", function(ops) {
          const relevant = ops.map((op) => {
            return {
              key: op.key,
              hasOption: "userland" in op,
              keyEncoding: op.keyEncoding.commonName
            };
          });
          t2.same(relevant, [
            {
              key: "input-a",
              keyEncoding: "json",
              hasOption: true
            },
            {
              key: "from-hook-a",
              keyEncoding: "utf8",
              // Should be the database default (2x)
              hasOption: false
            },
            {
              key: "from-hook-b",
              keyEncoding: "utf8",
              hasOption: false
            }
          ]);
        });
        await db.put("input-a", "boop", { keyEncoding: "json", userland: 123 });
        await db.batch([{ type: "put", key: "input-a", value: "boop", keyEncoding: "json", userland: 123 }]);
        await db.batch().put("input-a", "boop", { keyEncoding: "json", userland: 123 }).write();
        await db.del("input-a", { keyEncoding: "json", userland: 123 });
        await db.batch([{ type: "del", key: "input-a", keyEncoding: "json", userland: 123 }]);
        await db.batch().del("input-a", { keyEncoding: "json", userland: 123 }).write();
        return db.close();
      });
      test("error thrown from prewrite hook function is catched", async function(t2) {
        t2.plan(6 * 2);
        const db = testCommon.factory();
        db.hooks.prewrite.add(function(op, batch) {
          throw new Error("test");
        });
        const verify = (err) => {
          t2.is(err.code, "LEVEL_HOOK_ERROR");
          t2.is(err.cause.message, "test");
        };
        await db.batch([{ type: "del", key: "1" }]).catch(verify);
        await db.batch([{ type: "put", key: "1", value: "2" }]).catch(verify);
        const batch1 = db.batch();
        const batch2 = db.batch();
        try {
          batch1.del("1");
        } catch (err) {
          verify(err);
        }
        try {
          batch2.put("1", "2");
        } catch (err) {
          verify(err);
        }
        await batch1.close();
        await batch2.close();
        await db.del("1").catch(verify);
        await db.put("1", "2").catch(verify);
        return db.close();
      });
      test("operations added by prewrite hook function count towards chained batch length", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        await db.open();
        db.hooks.prewrite.add(function(op, batch2) {
          batch2.add({ type: "del", key: "hook1" });
        });
        const batch = db.batch();
        batch.del("input1");
        t2.is(batch.length, 2);
        batch.put("input2", "foo");
        t2.is(batch.length, 4);
        await batch.close();
        return db.close();
      });
      test("operations added by prewrite hook function can be cleared from chained batch", async function(t2) {
        t2.plan(3);
        const db = testCommon.factory();
        await db.open();
        db.hooks.prewrite.add(function(op, batch2) {
          batch2.add({ type: "put", key: "x", value: "y" });
        });
        const batch = db.batch();
        batch.del("a");
        t2.is(batch.length, 2);
        batch.clear();
        t2.is(batch.length, 0);
        db.on("write", t2.fail.bind(t2));
        await batch.write();
        t2.same(await db.keys().all(), [], "did not write to db");
        return db.close();
      });
      test("prewrite hook function is not called for earlier chained batch", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        await db.open();
        const calls = [];
        const batchBefore = db.batch();
        db.hooks.prewrite.add(function(op, batch) {
          calls.push(op.key);
        });
        batchBefore.del("before");
        t2.same(calls, []);
        const batchAfter = db.batch();
        batchAfter.del("after");
        t2.same(calls, ["after"]);
        await Promise.all([batchBefore.close(), batchAfter.close()]);
        return db.close();
      });
      test("prewrite hook function can write to nondescendant sublevel", async function(t2) {
        t2.plan(2);
        const db = testCommon.factory();
        await db.open();
        const books = db.sublevel("books", { valueEncoding: "json" });
        const index = db.sublevel("authors", {
          // Use JSON, which normally doesn't make sense for keys but
          // helps to assert that there's no double encoding happening.
          keyEncoding: "json"
        });
        db.on("write", (ops) => {
          t2.same(ops.map((x) => x.key), ["!books!12", '!authors!"Hesse~12"']);
        });
        books.on("write", (ops) => {
          t2.same(ops.map((x) => x.key), ["12"]);
        });
        index.on("write", (ops) => {
          t2.fail("Did not expect an event on index");
        });
        books.hooks.prewrite.add(function(op, batch) {
          if (op.type === "put") {
            batch.add({
              type: "put",
              // Key structure is synthetic and not relevant to the test
              key: op.value.author + "~" + op.key,
              value: "",
              sublevel: index
            });
          }
        });
        await books.put("12", { title: "Siddhartha", author: "Hesse" });
      });
    };
  }
});

// node_modules/abstract-level/test/index.js
var require_test2 = __commonJS({
  "node_modules/abstract-level/test/index.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var common = require_common();
    var kSublevels = Symbol("sublevels");
    function suite2(options) {
      const testCommon = common(options);
      const test = testCommon.test;
      require_factory_test()(test, testCommon);
      require_manifest_test()(test, testCommon);
      require_open_test().all(test, testCommon);
      if (testCommon.supports.createIfMissing) {
        require_open_create_if_missing_test().all(test, testCommon);
      }
      if (testCommon.supports.errorIfExists) {
        require_open_error_if_exists_test().all(test, testCommon);
      }
      require_put_test().all(test, testCommon);
      require_get_test().all(test, testCommon);
      require_del_test().all(test, testCommon);
      require_put_get_del_test().all(test, testCommon);
      require_get_many_test().all(test, testCommon);
      require_batch_test().all(test, testCommon);
      require_chained_batch_test().all(test, testCommon);
      require_iterator_test().all(test, testCommon);
      require_iterator_range_test().all(test, testCommon);
      require_async_iterator_test().all(test, testCommon);
      require_deferred_open_test().all(test, testCommon);
      require_encoding_test().all(test, testCommon);
      require_encoding_json_test().all(test, testCommon);
      require_encoding_custom_test().all(test, testCommon);
      require_encoding_buffer_test().all(test, testCommon);
      require_encoding_decode_error_test().all(test, testCommon);
      if (testCommon.supports.seek) {
        require_iterator_seek_test().all(test, testCommon);
      }
      if (testCommon.supports.snapshots) {
        require_iterator_snapshot_test().all(test, testCommon);
      } else {
        require_iterator_no_snapshot_test().all(test, testCommon);
      }
      require_clear_test().all(test, testCommon);
      require_clear_range_test().all(test, testCommon);
      require_sublevel_test().all(test, testCommon);
      require_write()(test, testCommon);
      require_postopen()(test, testCommon);
      require_newsub()(test, testCommon);
      require_prewrite()(test, testCommon);
      if (!testCommon.internals[kSublevels]) {
        const factory = testCommon.factory;
        suite2({
          ...testCommon,
          internals: { [kSublevels]: true },
          factory(opts) {
            return factory().sublevel("test", opts);
          }
        });
      }
    }
    suite2.common = common;
    module.exports = suite2;
  }
});

// test/suite.js
init_dirname();
init_buffer2();
init_process2();
var import_test = __toESM(require_test2(), 1);

// src/index.ts
init_dirname();
init_buffer2();
init_process2();
var import_abstract_level = __toESM(require_abstract_level2(), 1);
var D1Level = class extends import_abstract_level.AbstractLevel {
  constructor(d1, options = {}) {
    const { name: name2 = "kv", ...abstractOptions } = options;
    const encodings = { utf8: true, json: false };
    super(
      {
        encodings,
        seek: false,
        snapshots: false,
        streams: false,
        permanence: true
      },
      abstractOptions
    );
    this.d1 = d1;
    this.name = name2;
  }
  name;
  async _open({
    createIfMissing,
    errorIfExists,
    passive
  }) {
    if (!passive) {
      if (createIfMissing) {
        await this.d1.exec(
          `CREATE TABLE IF NOT EXISTS ${this.name} (key TEXT PRIMARY KEY, value TEXT)`
        );
      } else {
        try {
          await this.d1.exec(
            `CREATE TABLE ${this.name} (key TEXT PRIMARY KEY, value TEXT)`
          );
        } catch (err) {
          if (errorIfExists) {
            throw new LevelError("Table already exists", "LEVEL_ERROR_EXISTS");
          }
        }
      }
      await this.d1.exec(
        `CREATE INDEX IF NOT EXISTS idx_${this.name} ON ${this.name}(key)`
      );
    }
  }
  async _get(key) {
    const stmt = this.d1.prepare(
      `SELECT value FROM ${this.name} WHERE key = ?`
    );
    const value = await stmt.bind(key).first("value");
    return value ?? void 0;
  }
  async _getMany(keys) {
    const params = keys.map(() => "?").join();
    const query = `SELECT * FROM ${this.name} WHERE key in (${params})`;
    const stmt = this.d1.prepare(query);
    const rows = await stmt.bind(...keys).all();
    return keys.map(
      (key) => rows.results.find((row) => row.key === key)?.value
    );
  }
  async _put(key, value, options) {
    const stmt = this.d1.prepare(
      `INSERT INTO ${this.name} (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`
    );
    await stmt.bind(key, value).run();
  }
  async _del(key) {
    const stmt = this.d1.prepare(`DELETE FROM ${this.name} WHERE key = ?`);
    await stmt.bind(key).run();
  }
  async _batch(batch, options) {
    const statements = [];
    let curBatch = [];
    let curType = void 0;
    const addStatement = () => {
      if (curType === "put") {
        const params = curBatch.map(() => "(?, ?)").join(", ");
        const query = `INSERT INTO ${this.name} (key, value) VALUES ${params} ON CONFLICT(key) DO UPDATE SET value=excluded.value`;
        statements.push(this.d1.prepare(query).bind(...curBatch.flat()));
      } else if (curType === "del") {
        const params = curBatch.map(() => "?").join();
        const query = `DELETE FROM ${this.name} WHERE key IN (${params})`;
        statements.push(this.d1.prepare(query).bind(...curBatch));
      }
    };
    for (const op of batch) {
      if (curType === void 0) {
        curType = op.type;
      }
      if (curType !== op.type || curBatch.length >= 10) {
        addStatement();
        curBatch = [];
        curType = op.type;
      }
      if (op.type === "put") {
        curBatch.push([op.key, op.value]);
      } else if (op.type === "del") {
        curBatch.push(op.key);
      }
    }
    if (curBatch.length > 0) {
      addStatement();
    }
    if (statements.length) {
      try {
        await this.d1.batch(statements);
      } catch (err) {
        throw err;
      }
    }
  }
  async _clear(options) {
    const { where, params } = rangeQuery({
      ...options,
      order: options.limit && options.limit !== -1
    });
    try {
      await this.d1.prepare(`DELETE FROM ${this.name} ${where}`).bind(...params).run();
    } catch (err) {
      console.log("\u{1F6A8} DELETE", where, options, params);
      throw err;
    }
  }
  _iterator(options) {
    return new D1Iterator(this, options, this.d1, this.name);
  }
};
function rangeQuery(options) {
  const { gt, gte, lt, lte, order, reverse, limit } = options;
  const params = [];
  let where = "";
  if (gte !== void 0) {
    where += ` WHERE key >= ?`;
    params.push(gte);
  } else if (gt !== void 0) {
    where += ` WHERE key > ?`;
    params.push(gt);
  }
  if (lte !== void 0) {
    where += ` ${where ? "AND" : "WHERE"} key <= ?`;
    params.push(lte);
  } else if (lt !== void 0) {
    where += ` ${where ? "AND" : "WHERE"} key < ?`;
    params.push(lt);
  }
  if (order !== false) {
    if (reverse) {
      where += " ORDER BY key DESC";
    } else {
      where += " ORDER BY key ASC";
    }
  }
  if (limit && limit !== -1) {
    where += ` LIMIT ${limit}`;
  }
  return { where, params };
}
var D1Iterator = class extends import_abstract_level.AbstractIterator {
  constructor(db, options, d1, name2) {
    super(db, options);
    this.options = options;
    this.d1 = d1;
    this.name = name2;
  }
  result;
  index = 0;
  async exec() {
    let query = `SELECT key, value FROM ${this.name}`;
    const { where, params } = rangeQuery(this.options);
    const stmt = this.d1.prepare(query + where).bind(...params);
    const rows = await stmt.all();
    return rows.results.map((row) => [row.key, row.value]);
  }
  async _next() {
    if (!this.result) {
      this.result = await this.exec();
    }
    const rows = this.result;
    if (this.index < rows.length) {
      return rows[this.index++];
    }
  }
};
var LevelError = class extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};

// test/suite.js
function suite(it, assert, env2) {
  const test = (name2, specFn) => {
    it(name2, async () => {
      await specFn({
        plan: () => {
        },
        end: () => {
        },
        same: assert.deepEqual,
        fail: assert.fail,
        pass: assert.ok,
        is: assert.equal,
        isNot: assert.notEqual,
        eq: assert.equal,
        ok: assert.ok,
        throws: (fn, expected, msg = "should have thrown") => {
          try {
            fn();
            assert.fail(msg);
          } catch (err) {
            assert.ok(expected(err), msg);
          }
        }
      });
    });
  };
  let i2 = 0;
  (0, import_test.default)({
    test,
    factory(options) {
      return new D1Level(env2.D1, { name: `kv${i2++}`, ...options });
    }
  });
}
export {
  suite
};
/*! Bundled license information:

@jspm/core/nodelibs/browser/buffer.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
