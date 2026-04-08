# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

**edgetunnel** is a Cloudflare Workers/Pages application that provides an edge
computing tunnel solution with support for multiple proxy protocols (VLESS,
Trojan, Shadowsocks) and a built-in admin panel for configuration management.

**Main Entry Point**: [`_worker.js`](_worker.js:1) (5745 lines)

The application handles three main proxy modes:

- **WebSocket**: Standard WebSocket proxy connections
- **gRPC**: gRPC-based proxy (supports gun and multi modes)
- **XHTTP**: HTTP/2 based proxy with stream-one mode

## Architecture

### Request Flow

All requests enter through the main `fetch()` handler at
[`_worker.js:28`](_worker.js:28):

1. **Path-based routing** determines the request type:
   - `/admin` → Admin panel (requires authentication)
   - `/sub` → Subscription generation
   - WebSocket Upgrade → [`处理WS请求()`](_worker.js:1665)
   - POST with gRPC content-type → [`处理gRPC请求()`](_worker.js:1366)
   - POST with x-padding referer → [`处理XHTTP请求()`](_worker.js:1013)

2. **Environment Variables** control behavior (see table below)

3. **Cloudflare KV** stores persistent configuration (`config.json`, `log.json`,
   `cf.json`, `tg.json`)

### Core Functions

- **Proxy Handlers**: [`处理WS请求()`](_worker.js:1665),
  [`处理gRPC请求()`](_worker.js:1366), [`处理XHTTP请求()`](_worker.js:1013)
- **Configuration**: [`读取config_JSON()`](_worker.js:4322) loads defaults from
  KV or environment
- **Subscription Generation**: Lines 557-850 generate configs for Clash,
  Sing-box, Surge, etc.
- **Connection Management**: [`connectDirect()`](_worker.js:2598),
  [`connecttoPry()`](_worker.js:2653) handle outbound connections with optional
  SOCKS5/HTTP proxy chains
- **Protocol Parsing**: [`解析木马请求()`](_worker.js:2287),
  [`解析魏烈思请求()`](_worker.js:2371) parse VLESS/Trojan handshakes

### URL Parameter Override Pattern

The application supports dynamic proxy configuration via URL parameters:

- `/proxyip=proxyip.cmliussss.net` - Override PROXYIP
- `/socks5=user:password@127.0.0.1:1080` - SOCKS5 proxy chain
- `/http=user:password@127.0.0.1:8080` - HTTP proxy chain

See [`反代参数获取()`](_worker.js:5031) for parsing logic.

## Environment Variables

| Variable    | Required | Default                       | Purpose                                           |
| ----------- | -------- | ----------------------------- | ------------------------------------------------- |
| `ADMIN`     | Yes      | -                             | Admin panel password                              |
| `KV`        | Yes      | -                             | KV namespace binding (variable name must be "KV") |
| `KEY`       | No       | "勿动此默认密钥..."           | Subscription key for `/KEY` quick access          |
| `UUID`      | No       | Auto-generated from ADMIN+KEY | Force fixed UUID (must be UUIDv4 format)          |
| `PROXYIP`   | No       | Auto-generated (colo-based)   | Global proxy IP for upstream connections          |
| `URL`       | No       | -                             | Default homepage伪装 URL or "1101"                |
| `GO2SOCKS5` | No       | Built-in whitelist            | Comma-separated domains forcing SOCKS5 routing    |
| `DEBUG`     | No       | false                         | Enable console.log debugging ("1" or "true")      |
| `OFF_LOG`   | No       | false                         | Disable KV log recording ("1" or "true")          |
| `BEST_SUB`  | No       | false                         | Enable as subscription generator ("1" or "true")  |
| `HOST`      | No       | Request hostname              | Additional valid hostnames                        |

## Development Workflow

### Local Testing

```bash
# Using Wrangler (requires wrangler.toml configuration)
npx wrangler dev

# The worker will be available at http://localhost:8787
# Set ADMIN environment variable locally or in wrangler.toml
```

### Deployment

**For Cloudflare Workers:**

1. Copy [`_worker.js`](_worker.js:1) content to Workers editor
2. Add `ADMIN` variable in Settings > Variables
3. Bind KV namespace in Settings > Bindings (variable name: `KV`)
4. Add custom domain in Triggers tab

**For Cloudflare Pages:**

1. Upload repository zip or connect to GitHub
2. Set `ADMIN` in Settings > Environment Variables
3. Bind KV namespace in Settings > Bindings
4. Add custom domain in Custom Domains tab

### Code Style Notes

- Code uses Chinese variable names and comments throughout
- String obfuscation used for sensitive protocol strings (e.g., "v"+"le"+"ss"
  for "vless")
- Proxy mode parameter generation happens at runtime based on
  [`传输协议`](_worker.js:4525) variable scope
- **Important**: When modifying LINK generation, ensure
  [`传输协议`](_worker.js:4525) is defined before use (see bugfix_xhttp_mode.md)

## Common Issues

### Missing Mode Parameter in xhttp

When adding or modifying the subscription link generation, ensure the `传输协议`
variable includes mode parameters:

```javascript
const 传输协议 = config_JSON.传输协议 === "xhttp"
  ? "xhttp&mode=stream-one"
  : (config_JSON.传输协议 === "grpc"
    ? (config_JSON.gRPC模式 === "multi" ? "grpc&mode=multi" : "grpc&mode=gun")
    : "ws");
```

This must be defined before `config_JSON.LINK` is generated. See
[`bugfix_xhttp_mode.md`](bugfix_xhttp_mode.md) for details.

### KV Binding Name

The KV binding variable name MUST be "KV" (uppercase). Changing this will break
configuration storage/retrieval.

### UUID Format

If setting `UUID` environment variable, it must be valid UUIDv4 format or nodes
will fail to connect.

## Related Files

- [`wrangler.toml`](wrangler.toml:1) - Cloudflare Workers configuration
- [`.github/workflows/sync.yml`](.github/workflows/sync.yml:1) - Auto-sync
  workflow for forked repositories
- [`混淆结果.js`](混淆结果.js:1) - Obfuscated version (auto-generated)
