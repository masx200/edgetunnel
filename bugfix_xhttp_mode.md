# Bug修复：xhttp传输协议缺少mode参数

## 问题描述

访问 `/admin/config.json` 后，返回的配置中 `LINK` 字段包含的 vless
URI，当传输协议为 `xhttp` 时，缺少必要的 `mode=stream-one` 参数。

## 问题原因

在 `_worker.js` 文件中：

- 第746-752行定义了包含mode参数的 `传输协议` 变量
- 但第4541行生成 `config_JSON.LINK` 时，直接使用了
  `config_JSON.传输协议`（值仅为"xhttp"），而不是使用已定义的 `传输协议`
  变量（值为"xhttp&mode=stream-one"）
- 两个变量处于不同的作用域，导致生成的URI缺少mode参数

## 修复方案

在 `_worker.js` 第4524行（`config_JSON.LINK` 生成之前）添加 `传输协议`
变量定义：

```javascript
const 传输协议 = config_JSON.传输协议 === "xhttp"
  ? "xhttp&mode=stream-one"
  : (config_JSON.传输协议 === "grpc"
    ? (config_JSON.gRPC模式 === "multi" ? "grpc&mode=multi" : "grpc&mode=gun")
    : "ws");
```

## 修复结果

修复后，生成的 vless URI 正确包含 mode 参数：

```
vless://...&type=xhttp&mode=stream-one&...
```

## 影响范围

- 影响所有使用 xhttp 传输协议的节点配置
- 修复后客户端可以正确识别并使用 xhttp 的 stream-one 模式

## 修复文件

- `_worker.js` （第4524-4531行添加变量定义，第4541行使用该变量）

## 修复时间

2026-04-08
