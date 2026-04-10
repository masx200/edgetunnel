import { connect } from "cloudflare:sockets";
let e,
  t,
  n,
  s = "",
  r = null,
  a = !1,
  o = "",
  i = {},
  c = 0,
  l = !0,
  u = !1,
  d = [
    "*tapecontent.net",
    "*cloudatacdn.com",
    "*loadshare.org",
    "*cdn-centaurus.com",
    "scholar.google.com",
  ];
const h = "https://edt-pages.github.io";
var p = {
  async fetch(t, env, ctx) {
    const n = new URL(function (e) {
        const t = (e = e.replace(/%5[Cc]/g, "").replace(/\\/g, "")).indexOf(
            "#",
          ),
          n = -1 === t ? e : e.slice(0, t);
        if (n.includes("?") || !/%3f/i.test(n)) return e;
        const s = -1 === t ? "" : e.slice(t);
        return n.replace(/%3f/i, "?") + s;
      }(t.url)),
      r = t.headers.get("User-Agent") || "null",
      a = (t.headers.get("Upgrade") || "").toLowerCase(),
      o = (t.headers.get("content-type") || "").toLowerCase(),
      i = env.ADMIN || env.admin || env.PASSWORD || env.password || env.pswd ||
        env.TOKEN || env.KEY || env.UUID || env.uuid,
      c = env.KEY || "勿动此默认密钥，有需求请自行通过添加变量KEY进行修改",
      p = await B(i + c),
      f =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      S = env.UUID || env.uuid,
      $ = S && f.test(S) ? S.toLowerCase() : [
        p.slice(0, 8),
        p.slice(8, 12),
        "4" + p.slice(13, 16),
        "8" + p.slice(17, 20),
        p.slice(20),
      ].join("-"),
      A =
        (env.HOST
          ? (await V(env.HOST)).map((e) =>
            e.toLowerCase().replace(/^https?:\/\//, "").split("/")[0].split(
              ":",
            )[0]
          )
          : [n.hostname])[0],
      k = n.pathname.slice(1).toLowerCase();
    if (u = ["1", "true"].includes(env.DEBUG) || u, env.PROXYIP) {
      const e = await V(env.PROXYIP);
      s = e[Math.floor(Math.random() * e.length)], l = !1;
    } else s = (t.cf.colo + ".PrOxYIp.CmLiUsSsS.nEt").toLowerCase();
    const j = t.headers.get("X-Real-IP") || t.headers.get("CF-Connecting-IP") ||
      t.headers.get("X-Forwarded-For") || t.headers.get("True-Client-IP") ||
      t.headers.get("Fly-Client-IP") ||
      t.headers.get("X-Appengine-Remote-Addr") ||
      t.headers.get("X-Forwarded-For") || t.headers.get("X-Real-IP") ||
      t.headers.get("X-Cluster-Client-IP") || t.cf?.clientTcpRtt || "未知IP";
    if (
      env.GO2SOCKS5 && (d = await V(env.GO2SOCKS5)),
        "version" === k && n.searchParams.get("uuid") === $
    ) {
      return new Response(
        JSON.stringify({
          Version: Number(String("2026-04-06 18:42:41").replace(/\D+/g, "")),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json;charset=utf-8" },
        },
      );
    }
    if (i && "websocket" === a) {
      return await Y(n),
        M(`[WebSocket] 命中请求: ${n.pathname}${n.search}`),
        await async function (e, t, n) {
          const s = new WebSocketPair(), [r, a] = Object.values(s);
          a.accept(), a.binaryType = "arraybuffer";
          let o = { socket: null, connectingPromise: null, retryConnect: null },
            i = !1;
          const c = e.headers.get("sec-websocket-protocol") || "",
            l = !!n.searchParams.get("enc");
          let u = !1, d = !1;
          const h = new ReadableStream({
            start(e) {
              const t = (e) => {
                  const t = e?.message || `${e || ""}`;
                  return t.includes("ReadableStream is closed") ||
                    t.includes("The stream is closed") ||
                    t.includes("already closed");
                },
                n = (n) => {
                  if (!u && !d) {
                    try {
                      e.enqueue(n);
                    } catch (n) {
                      if (d = !0, !t(n)) {
                        try {
                          e.error(n);
                        } catch (e) {}
                      }
                    }
                  }
                },
                s = () => {
                  if (!u && !d) {
                    d = !0;
                    try {
                      e.close();
                    } catch (n) {
                      if (!t(n)) {
                        try {
                          e.error(n);
                        } catch (e) {}
                      }
                    }
                  }
                },
                r = (t) => {
                  if (!u && !d) {
                    d = !0;
                    try {
                      e.error(t);
                    } catch (e) {}
                  }
                };
              if (
                a.addEventListener("message", (e) => {
                  n(e.data);
                }),
                  a.addEventListener("close", () => {
                    O(a), s();
                  }),
                  a.addEventListener("error", (e) => {
                    r(e), O(a);
                  }),
                  !l && c
              ) {
                try {
                  const e = atob(c.replace(/-/g, "+").replace(/_/g, "/")),
                    t = new Uint8Array(e.length);
                  for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
                  n(t.buffer);
                } catch (e) {
                  r(e);
                }
              }
            },
            cancel() {
              u = !0, d = !0, O(a);
            },
          });
          let p = null, f = null, S = null, $ = null, A = null;
          const k = () => {
              if (S) {
                try {
                  S.releaseLock();
                } catch (e) {}
                S = null;
              }
              f = null;
            },
            R = async (e, t = !0) => {
              const n = o.socket;
              if (!n) return !1;
              n !== f && (k(), f = n, S = n.writable.getWriter());
              try {
                return await S.write(e), !0;
              } catch (n) {
                if (
                  k(), t && "function" == typeof o.retryConnect
                ) return await o.retryConnect(), await R(e, !1);
                throw n;
              }
            },
            j = async () =>
              $ || (A || (A = (async () => {
                const e = (n.searchParams.get("enc") || "").toLowerCase(),
                  s = m[e] || m["aes-128-gcm"],
                  r = [
                    s,
                    ...Object.values(m).filter((e) => e.method !== s.method),
                  ],
                  o = new Map(),
                  i = (
                    e,
                  ) => (o.has(e.method) || o.set(e.method, x(t, e.keyLen)),
                    o.get(e.method)),
                  c = {
                    buffer: new Uint8Array(0),
                    hasSalt: !1,
                    waitPayloadLength: null,
                    decryptKey: null,
                    nonceCounter: new Uint8Array(b),
                    "加密配置": null,
                  },
                  l = async () => {
                    const t = 2 + y,
                      n = Math.max(...r.map((e) => e.saltLen)),
                      a = 16,
                      o = Math.min(
                        a,
                        Math.max(
                          0,
                          c.buffer.byteLength -
                            (t + Math.min(...r.map((e) => e.saltLen))),
                        ),
                      );
                    for (let n = 0; n <= o; n++) {
                      for (const a of r) {
                        const r = n + a.saltLen + t;
                        if (c.buffer.byteLength < r) continue;
                        const o = c.buffer.subarray(n, n + a.saltLen),
                          l = c.buffer.subarray(n + a.saltLen, r),
                          u = await i(a),
                          d = await P(a, u, o, ["decrypt"]),
                          h = new Uint8Array(b);
                        try {
                          const t = await I(d, h, l);
                          if (2 !== t.byteLength) continue;
                          const o = t[0] << 8 | t[1];
                          if (o < 0 || o > a.maxChunk) continue;
                          return n > 0 &&
                            M(`[SS入站] 检测到前导噪声 ${n}B，已自动对齐`),
                            a.method !== s.method &&
                            M(`[SS入站] URL enc=${
                              e || s.method
                            } 与实际 ${a.method} 不一致，已自动切换`),
                            c.buffer = c.buffer.subarray(r),
                            c.decryptKey = d,
                            c.nonceCounter = h,
                            c.waitPayloadLength = o,
                            c.加密配置 = a,
                            c.hasSalt = !0,
                            !0;
                        } catch (e) {}
                      }
                    }
                    const l = n + t + a;
                    if (c.buffer.byteLength >= l) {
                      throw new Error(
                        `SS handshake decrypt failed (enc=${
                          e || "auto"
                        }, candidates=${r.map((e) => e.method).join("/")})`,
                      );
                    }
                    return !1;
                  },
                  u = {
                    async "输入"(e) {
                      const t = U(e);
                      if (
                        t.byteLength > 0 && (c.buffer = T(c.buffer, t)),
                          !c.hasSalt
                      ) { if (!await l()) return []; }
                      const n = [];
                      for (;;) {
                        if (null === c.waitPayloadLength) {
                          const e = 2 + y;
                          if (c.buffer.byteLength < e) break;
                          const t = c.buffer.subarray(0, e);
                          c.buffer = c.buffer.subarray(e);
                          const n = await I(c.decryptKey, c.nonceCounter, t);
                          if (2 !== n.byteLength) {
                            throw new Error("SS length decrypt failed");
                          }
                          const s = n[0] << 8 | n[1];
                          if (
                            s < 0 || s > c.加密配置.maxChunk
                          ) {
                            throw new Error(`SS payload length invalid: ${s}`);
                          }
                          c.waitPayloadLength = s;
                        }
                        const e = c.waitPayloadLength + y;
                        if (c.buffer.byteLength < e) break;
                        const t = c.buffer.subarray(0, e);
                        c.buffer = c.buffer.subarray(e);
                        const s = await I(c.decryptKey, c.nonceCounter, t);
                        n.push(s), c.waitPayloadLength = null;
                      }
                      return n;
                    },
                  };
                let d = null;
                const h = 32768,
                  p = async () => {
                    if (d) return d;
                    if (!c.加密配置) {
                      throw new Error("SS cipher is not negotiated");
                    }
                    const e = c.加密配置,
                      n = await x(t, e.keyLen),
                      s = crypto.getRandomValues(new Uint8Array(e.saltLen)),
                      r = await P(e, n, s, ["encrypt"]),
                      a = new Uint8Array(b);
                    let o = !1;
                    return d = {
                      async "加密并发送"(t, n) {
                        const i = U(t);
                        if (
                          o || (await n(s), o = !0), 0 === i.byteLength
                        ) return;
                        let c = 0;
                        for (; c < i.byteLength;) {
                          const t = Math.min(c + e.maxChunk, i.byteLength),
                            s = i.subarray(c, t),
                            o = new Uint8Array(2);
                          o[0] = s.byteLength >>> 8 & 255,
                            o[1] = 255 & s.byteLength;
                          const l = await L(r, a, o),
                            u = await L(r, a, s),
                            d = new Uint8Array(l.byteLength + u.byteLength);
                          d.set(l, 0),
                            d.set(u, l.byteLength),
                            await n(d),
                            c = t;
                        }
                      },
                    },
                      d;
                  };
                let f = Promise.resolve();
                const g = (e) => (f = f.then(async () => {
                  if (a.readyState !== WebSocket.OPEN) return;
                  const t = await p();
                  await t.加密并发送(e, async (e) => {
                    e.byteLength > 0 && a.readyState === WebSocket.OPEN &&
                      await D(a, e.buffer);
                  });
                }).catch((e) => {
                  M(`[SS发送] 加密失败: ${e?.message || e}`), O(a);
                }),
                  f);
                return $ = {
                  "入站解密器": u,
                  "回包Socket": {
                    get readyState() {
                      return a.readyState;
                    },
                    send(e) {
                      const t = U(e);
                      if (t.byteLength <= h) return g(t);
                      for (let e = 0; e < t.byteLength; e += h) {
                        g(t.subarray(e, Math.min(e + h, t.byteLength)));
                      }
                      return f;
                    },
                    close() {
                      O(a);
                    },
                  },
                  "首包已建立": !1,
                  "目标主机": "",
                  "目标端口": 0,
                },
                  $;
              })().finally(() => {
                A = null;
              })),
                A),
            H = async (e) => {
              const n = await j();
              let s = null;
              try {
                s = await n.入站解密器.输入(e);
              } catch (e) {
                const t = e?.message || `${e}`;
                if (
                  t.includes("Decryption failed") ||
                  t.includes("SS handshake decrypt failed") ||
                  t.includes("SS length decrypt failed")
                ) return M(`[SS入站] 解密失败，连接关闭: ${t}`), void O(a);
                throw e;
              }
              for (const e of s) {
                let s = !1;
                try {
                  s = await R(e, !1);
                } catch (e) {
                  s = !1;
                }
                if (s) continue;
                if (n.首包已建立 && n.目标主机 && n.目标端口 > 0) {
                  await E(n.目标主机, n.目标端口, e, n.回包Socket, null, o, t);
                  continue;
                }
                const r = U(e);
                if (r.byteLength < 3) throw new Error("invalid ss data");
                const a = r[0];
                let i = 1, c = "";
                if (1 === a) {
                  if (r.byteLength < i + 4 + 2) {
                    throw new Error("invalid ss ipv4 length");
                  }
                  c = `${r[i]}.${r[i + 1]}.${r[i + 2]}.${r[i + 3]}`, i += 4;
                } else if (3 === a) {
                  if (r.byteLength < i + 1) {
                    throw new Error("invalid ss domain length");
                  }
                  const e = r[i];
                  if (i += 1, r.byteLength < i + e + 2) {
                    throw new Error("invalid ss domain data");
                  }
                  c = C.decode(r.subarray(i, i + e)), i += e;
                } else {
                  if (4 !== a) throw new Error(`invalid ss addressType: ${a}`);
                  {
                    if (r.byteLength < i + 16 + 2) {
                      throw new Error("invalid ss ipv6 length");
                    }
                    const e = [],
                      t = new DataView(r.buffer, r.byteOffset + i, 16);
                    for (let n = 0; n < 8; n++) {
                      e.push(t.getUint16(2 * n).toString(16));
                    }
                    c = e.join(":"), i += 16;
                  }
                }
                if (!c) throw new Error(`invalid ss address: ${a}`);
                const l = r[i] << 8 | r[i + 1];
                i += 2;
                const u = r.subarray(i);
                if (N(c)) throw new Error("Speedtest site is blocked");
                n.首包已建立 = !0,
                  n.目标主机 = c,
                  n.目标端口 = l,
                  await E(c, l, u, n.回包Socket, null, o, t);
              }
            };
          return h.pipeTo(
            new WritableStream({
              async write(s) {
                if (i) return await v(s, a, null);
                if ("ss" !== p) {
                  if (!await R(s)) {
                    if (null === p) {
                      if (n.searchParams.get("enc")) p = "ss";
                      else {
                        const e = new Uint8Array(s);
                        p = e.byteLength >= 58 && 13 === e[56] && 10 === e[57]
                          ? "木马"
                          : "魏烈思";
                      }
                      M(`[WS转发] 协议类型: ${p} | 来自: ${n.host} | UA: ${
                        e.headers.get("user-agent") || "未知"
                      }`);
                    }
                    if ("ss" !== p) {
                      if (!await R(s)) {
                        if ("木马" === p) {
                          const e = g(s, t);
                          if (e?.hasError) {
                            throw new Error(
                              e.message || "Invalid trojan request",
                            );
                          }
                          const { port: n, hostname: r, rawClientData: i } = e;
                          if (N(r)) {
                            throw new Error("Speedtest site is blocked");
                          }
                          await E(r, n, i, a, null, o, t);
                        } else {
                          const e = w(s, t);
                          if (e?.hasError) {
                            throw new Error(
                              e.message || "Invalid vless request",
                            );
                          }
                          const {
                            port: n,
                            hostname: r,
                            rawIndex: c,
                            version: l,
                            isUDP: u,
                          } = e;
                          if (N(r)) {
                            throw new Error("Speedtest site is blocked");
                          }
                          if (u) {
                            if (53 !== n) {
                              throw new Error("UDP is not supported");
                            }
                            i = !0;
                          }
                          const d = new Uint8Array([l[0], 0]), h = s.slice(c);
                          if (i) return v(h, a, d);
                          await E(r, n, h, a, d, o, t);
                        }
                      }
                    } else await H(s);
                  }
                } else await H(s);
              },
              close() {
                k();
              },
              abort() {
                k();
              },
            }),
          ).catch((e) => {
            const t = e?.message || `${e}`;
            t.includes("Network connection lost") ||
              t.includes("ReadableStream is closed")
              ? M(`[WS转发] 连接结束: ${t}`)
              : M(`[WS转发] 处理失败: ${t}`),
              k(),
              O(a);
          }),
            new Response(null, { status: 101, webSocket: r });
        }(t, $, n);
    }
    if (i && !k.startsWith("admin/") && "login" !== k && "POST" === t.method) {
      await Y(n);
      const e = t.headers.get("Referer") || "";
      return e.includes("x_padding", 14) || e.includes("x_padding=") ||
          !o.startsWith("application/grpc")
        ? (M(`[XHTTP] 命中请求: ${n.pathname}${n.search}`),
          await async function (e, t) {
            if (!e.body) return new Response("Bad Request", { status: 400 });
            const n = e.body.getReader(),
              s = await async function (e, t) {
                const n = new TextDecoder(),
                  s = ne(t),
                  r = (new TextEncoder()).encode(s),
                  a = (e) => {
                    const s = e.byteLength;
                    if (s < 18) return { "状态": "need_more" };
                    if (R(e.subarray(1, 17)) !== t) {
                      return { "状态": "invalid" };
                    }
                    const r = 18 + e[17];
                    if (s < r + 1) return { "状态": "need_more" };
                    const a = e[r];
                    if (1 !== a && 2 !== a) return { "状态": "invalid" };
                    const o = r + 1;
                    if (s < o + 3) return { "状态": "need_more" };
                    const i = e[o] << 8 | e[o + 1], c = e[o + 2], l = o + 3;
                    let u = -1, d = "";
                    if (1 === c) {
                      if (s < l + 4) return { "状态": "need_more" };
                      d = `${e[l]}.${e[l + 1]}.${e[l + 2]}.${e[l + 3]}`,
                        u = l + 4;
                    } else if (2 === c) {
                      if (s < l + 1) return { "状态": "need_more" };
                      const t = e[l];
                      if (s < l + 1 + t) return { "状态": "need_more" };
                      d = n.decode(e.subarray(l + 1, l + 1 + t)), u = l + 1 + t;
                    } else {
                      if (3 !== c) return { "状态": "invalid" };
                      {
                        if (s < l + 16) return { "状态": "need_more" };
                        const t = [];
                        for (let n = 0; n < 8; n++) {
                          const s = l + 2 * n;
                          t.push((e[s] << 8 | e[s + 1]).toString(16));
                        }
                        d = t.join(":"), u = l + 16;
                      }
                    }
                    return d
                      ? {
                        "状态": "ok",
                        "结果": {
                          "协议": "vless",
                          hostname: d,
                          port: i,
                          isUDP: 2 === a,
                          rawData: e.subarray(u),
                          respHeader: new Uint8Array([e[0], 0]),
                        },
                      }
                      : { "状态": "invalid" };
                  },
                  o = (e) => {
                    const t = e.byteLength;
                    if (t < 58) return { "状态": "need_more" };
                    if (13 !== e[56] || 10 !== e[57]) {
                      return { "状态": "invalid" };
                    }
                    for (let t = 0; t < 56; t++) {
                      if (e[t] !== r[t]) return { "状态": "invalid" };
                    }
                    const s = 58;
                    if (t < s + 2) return { "状态": "need_more" };
                    if (1 !== e[s]) return { "状态": "invalid" };
                    const a = e[s + 1];
                    let o = s + 2, i = "";
                    if (1 === a) {
                      if (t < o + 4) return { "状态": "need_more" };
                      i = `${e[o]}.${e[o + 1]}.${e[o + 2]}.${e[o + 3]}`, o += 4;
                    } else if (3 === a) {
                      if (t < o + 1) return { "状态": "need_more" };
                      const s = e[o];
                      if (t < o + 1 + s) return { "状态": "need_more" };
                      i = n.decode(e.subarray(o + 1, o + 1 + s)), o += 1 + s;
                    } else {
                      if (4 !== a) return { "状态": "invalid" };
                      {
                        if (t < o + 16) return { "状态": "need_more" };
                        const n = [];
                        for (let t = 0; t < 8; t++) {
                          const s = o + 2 * t;
                          n.push((e[s] << 8 | e[s + 1]).toString(16));
                        }
                        i = n.join(":"), o += 16;
                      }
                    }
                    if (!i) return { "状态": "invalid" };
                    if (t < o + 4) return { "状态": "need_more" };
                    const c = e[o] << 8 | e[o + 1];
                    if (13 !== e[o + 2] || 10 !== e[o + 3]) {
                      return { "状态": "invalid" };
                    }
                    const l = o + 4;
                    return {
                      "状态": "ok",
                      "结果": {
                        "协议": "trojan",
                        hostname: i,
                        port: c,
                        isUDP: !1,
                        rawData: e.subarray(l),
                        respHeader: null,
                      },
                    };
                  };
                let i = new Uint8Array(1024), c = 0;
                for (;;) {
                  const { value: t, done: n } = await e.read();
                  if (n) {
                    if (0 === c) return null;
                    break;
                  }
                  const s = t instanceof Uint8Array ? t : new Uint8Array(t);
                  if (c + s.byteLength > i.byteLength) {
                    const e = new Uint8Array(
                      Math.max(2 * i.byteLength, c + s.byteLength),
                    );
                    e.set(i.subarray(0, c)), i = e;
                  }
                  i.set(s, c), c += s.byteLength;
                  const r = i.subarray(0, c), l = o(r);
                  if ("ok" === l.状态) return { ...l.结果, reader: e };
                  const u = a(r);
                  if ("ok" === u.状态) return { ...u.结果, reader: e };
                  if ("invalid" === l.状态 && "invalid" === u.状态) return null;
                }
                const l = i.subarray(0, c), u = o(l);
                if ("ok" === u.状态) return { ...u.结果, reader: e };
                const d = a(l);
                return "ok" === d.状态 ? { ...d.结果, reader: e } : null;
              }(n, t);
            if (!s) {
              try {
                n.releaseLock();
              } catch (e) {}
              return new Response("Invalid request", { status: 400 });
            }
            if (N(s.hostname)) {
              try {
                n.releaseLock();
              } catch (e) {}
              return new Response("Forbidden", { status: 403 });
            }
            if (s.isUDP && 53 !== s.port) {
              try {
                n.releaseLock();
              } catch (e) {}
              return new Response("UDP is not supported", { status: 400 });
            }
            const r = {
              socket: null,
              connectingPromise: null,
              retryConnect: null,
            };
            let a = null, o = null;
            const i = new Headers({
                "Content-Type": "application/octet-stream",
                "X-Accel-Buffering": "no",
                "Cache-Control": "no-store",
              }),
              c = () => {
                if (o) {
                  try {
                    o.releaseLock();
                  } catch (e) {}
                  o = null;
                }
                a = null;
              },
              l = () => {
                const e = r.socket;
                return e
                  ? (e !== a && (c(), a = e, o = e.writable.getWriter()), o)
                  : null;
              };
            return new Response(
              new ReadableStream({
                async start(e) {
                  let a = !1, o = s.respHeader;
                  const i = {
                      readyState: WebSocket.OPEN,
                      send(t) {
                        if (!a) {
                          try {
                            const n = t instanceof Uint8Array
                              ? t
                              : t instanceof ArrayBuffer
                              ? new Uint8Array(t)
                              : ArrayBuffer.isView(t)
                              ? new Uint8Array(
                                t.buffer,
                                t.byteOffset,
                                t.byteLength,
                              )
                              : new Uint8Array(t);
                            e.enqueue(n);
                          } catch (e) {
                            a = !0, this.readyState = WebSocket.CLOSED;
                          }
                        }
                      },
                      close() {
                        if (!a) {
                          a = !0, this.readyState = WebSocket.CLOSED;
                          try {
                            e.close();
                          } catch (e) {}
                        }
                      },
                    },
                    u = async (e, t = !0) => {
                      const n = l();
                      if (!n) return !1;
                      try {
                        return await n.write(e), !0;
                      } catch (n) {
                        if (
                          c(), t && "function" == typeof r.retryConnect
                        ) return await r.retryConnect(), await u(e, !1);
                        throw n;
                      }
                    };
                  try {
                    for (
                      s.isUDP
                        ? s.rawData?.byteLength &&
                          (await v(s.rawData, i, o), o = null)
                        : await E(
                          s.hostname,
                          s.port,
                          s.rawData,
                          i,
                          s.respHeader,
                          r,
                          t,
                        );;
                    ) {
                      const { done: e, value: t } = await n.read();
                      if (e) break;
                      if (t && 0 !== t.byteLength) {
                        if (s.isUDP) await v(t, i, o), o = null;
                        else if (!await u(t)) {
                          throw new Error("Remote socket is not ready");
                        }
                      }
                    }
                    if (!s.isUDP) {
                      const e = l();
                      if (e) {
                        try {
                          await e.close();
                        } catch (e) {}
                      }
                    }
                  } catch (e) {
                    M(`[XHTTP转发] 处理失败: ${e?.message || e}`), O(i);
                  } finally {
                    c();
                    try {
                      n.releaseLock();
                    } catch (e) {}
                  }
                },
                cancel() {
                  c();
                  try {
                    r.socket?.close();
                  } catch (e) {}
                  try {
                    n.releaseLock();
                  } catch (e) {}
                },
              }),
              { status: 200, headers: i },
            );
          }(t, $))
        : (M(`[gRPC] 命中请求: ${n.pathname}${n.search}`),
          await async function (e, t) {
            if (!e.body) return new Response("Bad Request", { status: 400 });
            const n = e.body.getReader(),
              s = { socket: null, connectingPromise: null, retryConnect: null };
            let r = !1, a = null, o = null, i = null, c = 0, l = "";
            const u = new Headers({
                "Content-Type": "application/grpc",
                "X-Accel-Buffering": "no",
                "Cache-Control": "no-store",
                TE: "trailers",
              }),
              d = 65536,
              h = 20;
            return new Response(
              new ReadableStream({
                async start(e) {
                  let u = !1, p = [], f = 0, m = null;
                  const y = {
                      readyState: WebSocket.OPEN,
                      send(e) {
                        if (u) return;
                        const t = e instanceof Uint8Array
                            ? e
                            : new Uint8Array(e),
                          n = [];
                        let s = t.byteLength >>> 0;
                        for (; s > 127;) n.push(127 & s | 128), s >>>= 7;
                        n.push(s);
                        const r = new Uint8Array(n),
                          a = 1 + r.length + t.byteLength,
                          o = new Uint8Array(5 + a);
                        o[0] = 0,
                          o[1] = a >>> 24 & 255,
                          o[2] = a >>> 16 & 255,
                          o[3] = a >>> 8 & 255,
                          o[4] = 255 & a,
                          o[5] = 10,
                          o.set(r, 6),
                          o.set(t, 6 + r.length),
                          p.push(o),
                          f += o.byteLength,
                          f >= d ? b() : m || (m = setTimeout(b, h));
                      },
                      close() {
                        if (this.readyState !== WebSocket.CLOSED) {
                          b(!0), u = !0, this.readyState = WebSocket.CLOSED;
                          try {
                            e.close();
                          } catch (e) {}
                        }
                      },
                    },
                    b = (t = !1) => {
                      if (
                        m && (clearTimeout(m), m = null), !t && u || 0 === f
                      ) return;
                      const n = new Uint8Array(f);
                      let s = 0;
                      for (const e of p) n.set(e, s), s += e.byteLength;
                      p = [], f = 0;
                      try {
                        e.enqueue(n);
                      } catch (e) {
                        u = !0, y.readyState = WebSocket.CLOSED;
                      }
                    },
                    S = async () => {
                      try {
                        const e = String(c), t = l, n = [];
                        n.push(`grpc-status: ${e}`),
                          t && n.push(`grpc-message: ${encodeURIComponent(t)}`);
                        const s = n.join("\r\n") + "\r\n",
                          r = (new TextEncoder()).encode(s),
                          a = [];
                        let o = r.byteLength >>> 0;
                        for (; o > 127;) a.push(127 & o | 128), o >>>= 7;
                        a.push(o);
                        const i = new Uint8Array(a),
                          u = 1 + i.length + r.byteLength,
                          d = new Uint8Array(5 + u);
                        d[0] = 128,
                          d[1] = u >>> 24 & 255,
                          d[2] = u >>> 16 & 255,
                          d[3] = u >>> 8 & 255,
                          d[4] = 255 & u,
                          d[5] = 10,
                          d.set(i, 6),
                          d.set(r, 6 + i.length),
                          p.push(d),
                          f += d.byteLength,
                          b(!0),
                          M(`[gRPC Trailers] 发送状态码=${c}, 消息=${
                            l || "无"
                          }`);
                      } catch (e) {
                        M(`[gRPC Trailers] 发送失败: ${e?.message || e}`);
                      }
                    },
                    $ = async () => {
                      if (!u) {
                        if (
                          b(!0),
                            await S(),
                            u = !0,
                            y.readyState = WebSocket.CLOSED,
                            m && clearTimeout(m),
                            i
                        ) {
                          try {
                            i.releaseLock();
                          } catch (e) {}
                          i = null;
                        }
                        o = null;
                        try {
                          n.releaseLock();
                        } catch (e) {}
                        try {
                          s.socket?.close();
                        } catch (e) {}
                        try {
                          e.close();
                        } catch (e) {}
                      }
                    },
                    C = () => {
                      if (i) {
                        try {
                          i.releaseLock();
                        } catch (e) {}
                        i = null;
                      }
                      o = null;
                    },
                    A = async (e, t = !0) => {
                      const n = s.socket;
                      if (!n) return !1;
                      n !== o && (C(), o = n, i = n.writable.getWriter());
                      try {
                        return await i.write(e), !0;
                      } catch (n) {
                        if (
                          C(), t && "function" == typeof s.retryConnect
                        ) return await s.retryConnect(), await A(e, !1);
                        throw n;
                      }
                    };
                  try {
                    let e = new Uint8Array(0);
                    for (;;) {
                      const { done: o, value: i } = await n.read();
                      if (o) break;
                      if (!i || 0 === i.byteLength) continue;
                      const c = i instanceof Uint8Array ? i : new Uint8Array(i),
                        l = new Uint8Array(e.length + c.length);
                      for (
                        l.set(e, 0), l.set(c, e.length), e = l;
                        e.byteLength >= 5;
                      ) {
                        const n = 5 +
                          (e[1] << 24 >>> 0 | e[2] << 16 | e[3] << 8 | e[4]);
                        if (e.byteLength < n) break;
                        const o = e.slice(5, n);
                        if (e = e.slice(n), !o.byteLength) continue;
                        let i = o;
                        if (i.byteLength >= 2 && 10 === i[0]) {
                          let e = 0, t = 1, n = !1;
                          for (; t < i.length;) {
                            if (!(128 & i[t++])) {
                              n = !0;
                              break;
                            }
                            if (e += 7, e > 35) break;
                          }
                          n && (i = i.slice(t));
                        }
                        if (i.byteLength) {
                          if (r) await v(i, y, null);
                          else if (s.socket) {
                            if (!await A(i)) {
                              throw new Error("Remote socket is not ready");
                            }
                          } else {
                            let e;
                            e = i instanceof ArrayBuffer
                              ? i
                              : ArrayBuffer.isView(i)
                              ? i.buffer.slice(
                                i.byteOffset,
                                i.byteOffset + i.byteLength,
                              )
                              : new Uint8Array(i).buffer;
                            const n = new Uint8Array(e);
                            if (
                              null === a &&
                              (a = n.byteLength >= 58 && 13 === n[56] &&
                                10 === n[57]), a
                            ) {
                              const n = g(e, t);
                              if (n?.hasError) {
                                throw new Error(
                                  n.message || "Invalid trojan request",
                                );
                              }
                              const { port: r, hostname: a, rawClientData: o } =
                                n;
                              if (N(a)) {
                                throw new Error("Speedtest site is blocked");
                              }
                              await E(a, r, o, y, null, s, t);
                            } else {
                              const n = w(e, t);
                              if (n?.hasError) {
                                throw new Error(
                                  n.message || "Invalid vless request",
                                );
                              }
                              const {
                                port: a,
                                hostname: o,
                                rawIndex: i,
                                version: c,
                                isUDP: l,
                              } = n;
                              if (N(o)) {
                                throw new Error("Speedtest site is blocked");
                              }
                              if (l) {
                                if (53 !== a) {
                                  throw new Error("UDP is not supported");
                                }
                                r = !0;
                              }
                              const u = new Uint8Array([c[0], 0]);
                              y.send(u);
                              const d = e.slice(i);
                              r
                                ? await v(d, y, null)
                                : await E(o, a, d, y, null, s, t);
                            }
                          }
                        }
                      }
                      b();
                    }
                  } catch (e) {
                    c = 13,
                      l = e?.message || String(e),
                      M(`[gRPC转发] 处理失败: ${l}`);
                  } finally {
                    C(), await $();
                  }
                },
                cancel() {
                  c = 1, l = "Client cancelled the stream";
                  try {
                    s.socket?.close();
                  } catch (e) {}
                  try {
                    n.releaseLock();
                  } catch (e) {}
                },
              }),
              { status: 200, headers: u },
            );
          }(t, $));
    }
    if ("http:" === n.protocol) {
      return Response.redirect(
        n.href.replace(`http://${n.hostname}`, `https://${n.hostname}`),
        301,
      );
    }
    if (!i) {
      return fetch(h + "/noADMIN").then((e) => {
        const t = new Headers(e.headers);
        return t.set(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        ),
          t.set("Pragma", "no-cache"),
          t.set("Expires", "0"),
          new Response(e.body, {
            status: 404,
            statusText: e.statusText,
            headers: t,
          });
      });
    }
    if (env.KV && "function" == typeof env.KV.get) {
      const s = n.pathname.slice(1);
      if (
        s === c && "勿动此默认密钥，有需求请自行通过添加变量KEY进行修改" !== c
      ) {
        const e = new URLSearchParams(n.search);
        return e.set("token", await B(A + $)),
          new Response("重定向中...", {
            status: 302,
            headers: { Location: `/sub?${e.toString()}` },
          });
      }
      if ("login" === k) {
        const e = t.headers.get("Cookie") || "",
          n = e.split(";").find((e) => e.trim().startsWith("auth="))?.split(
            "=",
          )[1];
        if (n == await B(r + c + i)) {
          return new Response("重定向中...", {
            status: 302,
            headers: { Location: "/admin" },
          });
        }
        if ("POST" === t.method) {
          const e = await t.text();
          if (new URLSearchParams(e).get("password") === i) {
            const e = new Response(JSON.stringify({ success: !0 }), {
              status: 200,
              headers: { "Content-Type": "application/json;charset=utf-8" },
            });
            return e.headers.set(
              "Set-Cookie",
              `auth=${await B(r + c + i)}; Path=/; Max-Age=86400; HttpOnly`,
            ),
              e;
          }
        }
        return fetch(h + "/login");
      }
      if ("admin" === k || k.startsWith("admin/")) {
        const a = t.headers.get("Cookie") || "",
          o = a.split(";").find((e) => e.trim().startsWith("auth="))?.split(
            "=",
          )[1];
        if (!o || o !== await B(r + c + i)) {
          return new Response("重定向中...", {
            status: 302,
            headers: { Location: "/login" },
          });
        }
        if ("admin/log.json" === k) {
          const e = await env.KV.get("log.json") || "[]";
          return new Response(e, {
            status: 200,
            headers: { "Content-Type": "application/json;charset=utf-8" },
          });
        }
        if ("admin/getCloudflareUsage" === s) {
          try {
            const e = await te(
              n.searchParams.get("Email"),
              n.searchParams.get("GlobalAPIKey"),
              n.searchParams.get("AccountID"),
              n.searchParams.get("APIToken"),
            );
            return new Response(JSON.stringify(e, null, 2), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          } catch (e) {
            const t = {
              msg: "查询请求量失败，失败原因：" + e.message,
              error: e.message,
            };
            return new Response(JSON.stringify(t, null, 2), {
              status: 500,
              headers: { "Content-Type": "application/json;charset=utf-8" },
            });
          }
        } else {
          if ("admin/getADDAPI" === s) {
            if (n.searchParams.get("url")) {
              const e = n.searchParams.get("url");
              try {
                new URL(e);
                const t = await X([e], n.searchParams.get("port") || "443");
                let s = t[0].length > 0 ? t[0] : t[1];
                return s = s.map((e) =>
                  e.replace(/#(.+)$/, (e, t) => "#" + decodeURIComponent(t))
                ),
                  new Response(
                    JSON.stringify({ success: !0, data: s }, null, 2),
                    {
                      status: 200,
                      headers: {
                        "Content-Type": "application/json;charset=utf-8",
                      },
                    },
                  );
              } catch (e) {
                const t = {
                  msg: "验证优选API失败，失败原因：" + e.message,
                  error: e.message,
                };
                return new Response(JSON.stringify(t, null, 2), {
                  status: 500,
                  headers: { "Content-Type": "application/json;charset=utf-8" },
                });
              }
            }
            return new Response(
              JSON.stringify({ success: !1, data: [] }, null, 2),
              {
                status: 403,
                headers: { "Content-Type": "application/json;charset=utf-8" },
              },
            );
          }
          if ("admin/check" === k) {
            let e;
            if (n.searchParams.has("socks5")) {
              e = await se("socks5", n.searchParams.get("socks5"));
            } else if (n.searchParams.has("http")) {
              e = await se("http", n.searchParams.get("http"));
            } else {
              if (!n.searchParams.has("https")) {
                return new Response(JSON.stringify({ error: "缺少代理参数" }), {
                  status: 400,
                  headers: { "Content-Type": "application/json;charset=utf-8" },
                });
              }
              e = await se("https", n.searchParams.get("https"));
            }
            return new Response(JSON.stringify(e, null, 2), {
              status: 200,
              headers: { "Content-Type": "application/json;charset=utf-8" },
            });
          }
        }
        if (e = await G(env, A, $, r), "admin/init" === k) {
          try {
            return e = await G(env, A, $, r, !0),
              ctx.waitUntil(F(env, t, j, "Init_Config", e)),
              e.init = "配置已重置为默认值",
              new Response(JSON.stringify(e, null, 2), {
                status: 200,
                headers: { "Content-Type": "application/json;charset=utf-8" },
              });
          } catch (e) {
            const t = {
              msg: "配置重置失败，失败原因：" + e.message,
              error: e.message,
            };
            return new Response(JSON.stringify(t, null, 2), {
              status: 500,
              headers: { "Content-Type": "application/json;charset=utf-8" },
            });
          }
        } else if ("POST" === t.method) {
          if ("admin/config.json" === k) {
            try {
              const n = await t.json();
              return n.UUID && n.HOST
                ? (await env.KV.put("config.json", JSON.stringify(n, null, 2)),
                  ctx.waitUntil(F(env, t, j, "Save_Config", e)),
                  new Response(
                    JSON.stringify({ success: !0, message: "配置已保存" }),
                    {
                      status: 200,
                      headers: {
                        "Content-Type": "application/json;charset=utf-8",
                      },
                    },
                  ))
                : new Response(JSON.stringify({ error: "配置不完整" }), {
                  status: 400,
                  headers: { "Content-Type": "application/json;charset=utf-8" },
                });
            } catch (e) {
              return console.error("保存配置失败:", e),
                new Response(
                  JSON.stringify({ error: "保存配置失败: " + e.message }),
                  {
                    status: 500,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  },
                );
            }
          } else if ("admin/cf.json" === k) {
            try {
              const n = await t.json(),
                s = {
                  Email: null,
                  GlobalAPIKey: null,
                  AccountID: null,
                  APIToken: null,
                  UsageAPI: null,
                };
              if (!n.init || !0 !== n.init) {
                if (n.Email && n.GlobalAPIKey) {
                  s.Email = n.Email, s.GlobalAPIKey = n.GlobalAPIKey;
                } else if (n.AccountID && n.APIToken) {
                  s.AccountID = n.AccountID, s.APIToken = n.APIToken;
                } else {
                  if (!n.UsageAPI) {
                    return new Response(
                      JSON.stringify({ error: "配置不完整" }),
                      {
                        status: 400,
                        headers: {
                          "Content-Type": "application/json;charset=utf-8",
                        },
                      },
                    );
                  }
                  s.UsageAPI = n.UsageAPI;
                }
              }
              return await env.KV.put("cf.json", JSON.stringify(s, null, 2)),
                ctx.waitUntil(F(env, t, j, "Save_Config", e)),
                new Response(
                  JSON.stringify({ success: !0, message: "配置已保存" }),
                  {
                    status: 200,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  },
                );
            } catch (e) {
              return console.error("保存配置失败:", e),
                new Response(
                  JSON.stringify({ error: "保存配置失败: " + e.message }),
                  {
                    status: 500,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  },
                );
            }
          } else if ("admin/tg.json" === k) {
            try {
              const n = await t.json();
              if (n.init && !0 === n.init) {
                const e = { BotToken: null, ChatID: null };
                await env.KV.put("tg.json", JSON.stringify(e, null, 2));
              } else {
                if (!n.BotToken || !n.ChatID) {
                  return new Response(JSON.stringify({ error: "配置不完整" }), {
                    status: 400,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  });
                }
                await env.KV.put("tg.json", JSON.stringify(n, null, 2));
              }
              return ctx.waitUntil(F(env, t, j, "Save_Config", e)),
                new Response(
                  JSON.stringify({ success: !0, message: "配置已保存" }),
                  {
                    status: 200,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  },
                );
            } catch (e) {
              return console.error("保存配置失败:", e),
                new Response(
                  JSON.stringify({ error: "保存配置失败: " + e.message }),
                  {
                    status: 500,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  },
                );
            }
          } else {
            if ("admin/ADD.txt" !== s) {
              return new Response(
                JSON.stringify({ error: "不支持的POST请求路径" }),
                {
                  status: 404,
                  headers: { "Content-Type": "application/json;charset=utf-8" },
                },
              );
            }
            try {
              const n = await t.text();
              return await env.KV.put("ADD.txt", n),
                ctx.waitUntil(F(env, t, j, "Save_Custom_IPs", e)),
                new Response(
                  JSON.stringify({ success: !0, message: "自定义IP已保存" }),
                  {
                    status: 200,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  },
                );
            } catch (e) {
              return console.error("保存自定义IP失败:", e),
                new Response(
                  JSON.stringify({ error: "保存自定义IP失败: " + e.message }),
                  {
                    status: 500,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                  },
                );
            }
          }
        } else {
          if ("admin/config.json" === k) {
            return new Response(JSON.stringify(e, null, 2), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
          if ("admin/ADD.txt" === s) {
            let n = await env.KV.get("ADD.txt") || "null";
            return "null" == n &&
              (n = (await q(
                t,
                e.优选订阅生成.本地IP库.随机数量,
                e.优选订阅生成.本地IP库.指定端口,
                "ss" !== e.协议类型 || e.SS.TLS,
              ))[1]),
              new Response(n, {
                status: 200,
                headers: {
                  "Content-Type": "text/plain;charset=utf-8",
                  asn: t.cf.asn,
                },
              });
          }
          if ("admin/cf.json" === k) {
            return new Response(JSON.stringify(t.cf, null, 2), {
              status: 200,
              headers: { "Content-Type": "application/json;charset=utf-8" },
            });
          }
        }
        return ctx.waitUntil(F(env, t, j, "Admin_Login", e)),
          fetch(h + "/admin" + n.search);
      }
      if ("logout" === k || f.test(k)) {
        const e = new Response("重定向中...", {
          status: 302,
          headers: { Location: "/login" },
        });
        return e.headers.set(
          "Set-Cookie",
          "auth=; Path=/; Max-Age=0; HttpOnly",
        ),
          e;
      }
      if ("sub" === k) {
        const s = await B(A + $),
          a = ["1", "true"].includes(env.BEST_SUB) &&
            "example.com" === n.searchParams.get("host") &&
            "00000000-0000-4000-8000-000000000000" ===
              n.searchParams.get("uuid") &&
            r.toLowerCase().includes("tunnel (https://github.com/cmliu/edge");
        if (n.searchParams.get("token") === s || a) {
          e = await G(env, A, $, r),
            a
              ? ctx.waitUntil(F(env, t, j, "Get_Best_SUB", e, !1))
              : ctx.waitUntil(F(env, t, j, "Get_SUB", e));
          const o = r.toLowerCase(),
            i = 4102329600,
            c = Date.now(),
            l = new Date(c);
          l.setHours(0, 0, 0, 0);
          const u = Math.floor(
            (c - l.getTime()) / 864e5 * 24 * 1099511627776 / 2,
          );
          let d = u, h = u, p = 26388279066624;
          e.CF.Usage.success &&
            (d = e.CF.Usage.pages,
              h = e.CF.Usage.workers,
              p = Number.isFinite(e.CF.Usage.max)
                ? e.CF.Usage.max / 1e3 * 1024
                : 102400);
          const f = {
              "content-type": "text/plain; charset=utf-8",
              "Profile-Update-Interval": e.优选订阅生成.SUBUpdateTime,
              "Profile-web-page-url": n.protocol + "//" + n.host + "/admin",
              "Subscription-Userinfo":
                `upload=${d}; download=${h}; total=${p}; expire=${i}`,
              "Cache-Control": "no-store",
            },
            g = n.searchParams.has("b64") || n.searchParams.has("base64") ||
              t.headers.get("subconverter-request") ||
              t.headers.get("subconverter-version") ||
              o.includes("subconverter") ||
              o.includes("CF-Workers-SUB".toLowerCase()) || a,
            w = g
              ? "mixed"
              : n.searchParams.has("target")
              ? n.searchParams.get("target")
              : n.searchParams.has("clash") || o.includes("clash") ||
                  o.includes("meta") || o.includes("mihomo")
              ? "clash"
              : n.searchParams.has("sb") || n.searchParams.has("singbox") ||
                  o.includes("singbox") || o.includes("sing-box")
              ? "singbox"
              : n.searchParams.has("surge") || o.includes("surge")
              ? "surge&ver=4"
              : n.searchParams.has("quanx") || o.includes("quantumult")
              ? "quanx"
              : n.searchParams.has("loon") || o.includes("loon")
              ? "loon"
              : "mixed";
          o.includes("mozilla") ||
            (f["Content-Disposition"] = `attachment; filename*=utf-8''${
              encodeURIComponent(e.优选订阅生成.SUBNAME)
            }`);
          const m = (n.searchParams.has("surge") || o.includes("surge")) &&
              "ss" !== e.协议类型
            ? "trojan"
            : e.协议类型;
          let y = "";
          if ("mixed" === w) {
            const s = "Shadowrocket" == e.TLS分片
              ? `&fragment=${encodeURIComponent("1,40-60,30-50,tlshello")}`
              : "Happ" == e.TLS分片
              ? `&fragment=${encodeURIComponent("3,1,tlshello")}`
              : "";
            let r = [], i = "", c = [];
            if (!n.searchParams.has("sub") && e.优选订阅生成.local) {
              const n = e.优选订阅生成.本地IP库.随机IP
                  ? (await q(
                    t,
                    e.优选订阅生成.本地IP库.随机数量,
                    e.优选订阅生成.本地IP库.指定端口,
                    "ss" !== m || e.SS.TLS,
                  ))[0]
                  : await env.KV.get("ADD.txt")
                  ? await V(await env.KV.get("ADD.txt"))
                  : (await q(
                    t,
                    e.优选订阅生成.本地IP库.随机数量,
                    e.优选订阅生成.本地IP库.指定端口,
                    "ss" !== m || e.SS.TLS,
                  ))[0],
                s = [],
                a = [],
                o = [];
              for (const e of n) {
                if (e.toLowerCase().startsWith("sub://")) s.push(e);
                else {
                  const t = e.match(/sub\s*=\s*([^\s&#]+)/i);
                  if (t && t[1].trim().includes(".")) {
                    e.toLowerCase().includes("proxyip=true")
                      ? s.push(
                        "sub://" + t[1].trim() + "?proxyip=true" +
                          (e.includes("#") ? "#" + e.split("#")[1] : ""),
                      )
                      : s.push(
                        "sub://" + t[1].trim() +
                          (e.includes("#") ? "#" + e.split("#")[1] : ""),
                      );
                  } else if (e.toLowerCase().startsWith("https://")) s.push(e);
                  else if (e.toLowerCase().includes("://")) {
                    if (e.includes("#")) {
                      const t = e.split("#");
                      o.push(
                        t[0] + "#" +
                          encodeURIComponent(decodeURIComponent(t[1])),
                      );
                    } else o.push(e);
                  } else a.push(e);
                }
              }
              const l = await X(s, "ss" !== m || e.SS.TLS ? "443" : "80"),
                u = [...new Set(o.concat(l[1]))];
              i = u.length > 0 ? u.join("\n") + "\n" : "";
              const d = l[0];
              c = l[3] || [], r = [...new Set(a.concat(d))];
            } else {
              let t = n.searchParams.get("sub") || e.优选订阅生成.SUB;
              const [s, a] = await z(t);
              r = r.concat(s), i += a;
            }
            const l = e.ECH
                ? `&ech=${
                  encodeURIComponent(
                    (e.ECHConfig.SNI ? e.ECHConfig.SNI + "+" : "") +
                      e.ECHConfig.DNS,
                  )
                }`
                : "",
              u = o.includes("loon") || o.includes("surge"),
              d = "xhttp" === e.传输协议
                ? "xhttp&mode=stream-one"
                : "grpc" === e.传输协议
                ? "multi" === e.gRPC模式 ? "grpc&mode=multi" : "grpc&mode=gun"
                : "ws";
            let h = "path", p = "host";
            "grpc" === e.传输协议 && (h = "serviceName", p = "authority"),
              y = i + r.map((t) => {
                const n = t.match(
                  /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/,
                );
                let r, o, i = "443";
                if (!n) {
                  return console.warn(`[订阅内容] 不规范的IP格式已忽略: ${t}`),
                    null;
                }
                r = n[1],
                  i = n[2] ? n[2] : "ss" !== m || e.SS.TLS ? "443" : "80",
                  o = n[3] || r;
                let f = e.完整节点路径;
                if (c.length > 0) {
                  const t = c.find((e) => e.includes(r));
                  t &&
                    (f = `${e.PATH}/proxyip=${t}`.replace(/\/\//g, "/") +
                      (e.启用0RTT ? "?ed=2560" : ""));
                }
                return u && (f = f.replace(/,/g, "%2C")),
                  "ss" !== m || a
                    ? `${m}://00000000-0000-4000-8000-000000000000@${r}:${i}?security=tls&type=${
                      d + l
                    }&${p}=example.com&fp=${e.Fingerprint}&sni=example.com&${h}=${
                      encodeURIComponent(a ? "/" : e.随机路径 ? K(f) : f) + s
                    }&encryption=none${
                      e.跳过证书验证 ? "&insecure=1&allowInsecure=1" : ""
                    }#${encodeURIComponent(o)}`
                    : (f = (f.includes("?")
                      ? f.replace("?", "?enc=" + e.SS.加密方式 + "&")
                      : f + "?enc=" + e.SS.加密方式).replace(/([=,])/g, "\\$1"),
                      g || (f += ";mux=0"),
                      `${m}://${
                        btoa(
                          e.SS.加密方式 +
                            ":00000000-0000-4000-8000-000000000000",
                        )
                      }@${r}:${i}?plugin=v2${
                        encodeURIComponent(
                          "ray-plugin;mode=websocket;host=example.com;path=" +
                            (e.随机路径 ? K(f) : f) + (e.SS.TLS ? ";tls" : ""),
                        ) + l + s
                      }#${encodeURIComponent(o)}`);
              }).filter((e) => null !== e).join("\n");
          } else {
            const t = `${e.订阅转换配置.SUBAPI}/sub?target=${w}&url=${
              encodeURIComponent(
                n.protocol + "//" + n.host + "/sub?target=mixed&token=" + s +
                  (n.searchParams.has("sub") && "" != n.searchParams.get("sub")
                    ? `&sub=${n.searchParams.get("sub")}`
                    : ""),
              )
            }&config=${
              encodeURIComponent(e.订阅转换配置.SUBCONFIG)
            }&emoji=${e.订阅转换配置.SUBEMOJI}&scv=${e.跳过证书验证}`;
            try {
              const r = await fetch(t, {
                headers: {
                  "User-Agent": "Subconverter for " + w +
                    " edgetunnel (https://github.com/cmliu/edgetunnel)",
                },
              });
              if (!r.ok) {
                return new Response("订阅转换后端异常：" + r.statusText, {
                  status: r.status,
                });
              }
              y = await r.text(),
                (n.searchParams.has("surge") || o.includes("surge")) &&
                (y = function (e, t, n) {
                  const s = e.includes("\r\n")
                      ? e.split("\r\n")
                      : e.split("\n"),
                    r = n.随机路径 ? K(n.完整节点路径) : n.完整节点路径;
                  let a = "";
                  for (let e of s) {
                    if (
                      !e.includes("= trojan,") || e.includes("ws=true") ||
                      e.includes("ws-path=")
                    ) a += e + "\n";
                    else {
                      const t = e.split("sni=")[1].split(",")[0],
                        s = `sni=${t}, skip-cert-verify=${n.跳过证书验证}`,
                        o =
                          `sni=${t}, skip-cert-verify=${n.跳过证书验证}, ws=true, ws-path=${
                            r.replace(/,/g, "%2C")
                          }, ws-headers=Host:"${t}"`;
                      a += e.replace(new RegExp(s, "g"), o).replace("[", "")
                        .replace("]", "") + "\n";
                    }
                  }
                  return a =
                    `#!MANAGED-CONFIG ${t} interval=${
                      60 * n.优选订阅生成.SUBUpdateTime * 60
                    } strict=false` + a.substring(a.indexOf("\n")),
                    a;
                }(
                  y,
                  n.protocol + "//" + n.host + "/sub?token=" + s + "&surge",
                  e,
                ));
            } catch (e) {
              return new Response("订阅转换后端异常：" + e.message, {
                status: 403,
              });
            }
          }
          return o.includes("subconverter") || a ||
            (y = function (e, t, n = 2) {
              const s = [...t].sort(() => Math.random() - .5),
                r = "abcdefghijklmnopqrstuvwxyz0123456789";
              let a = 0, o = null;
              return e.replace(/example\.com/g, () => {
                if (a % n === 0) {
                  const e = s[Math.floor(a / n) % s.length];
                  o = e?.includes("*")
                    ? e.replace(/\*/g, () => {
                      let e = "";
                      for (
                        let t = 0;
                        t < Math.floor(14 * Math.random()) + 3;
                        t++
                      ) e += r[Math.floor(36 * Math.random())];
                      return e;
                    })
                    : e;
                }
                return a++, o;
              });
            }(
              y.replace(/00000000-0000-4000-8000-000000000000/g, e.UUID)
                .replace(
                  /MDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtMDAwMDAwMDAwMDAw/g,
                  btoa(e.UUID),
                ),
              e.HOSTS,
            )),
            "mixed" !== w ||
            o.includes("mozilla") && !n.searchParams.has("b64") &&
              !n.searchParams.has("base64") ||
            (y = btoa(y)),
            "singbox" === w
              ? (y = await async function (e, t = {}) {
                const n = t?.UUID || null,
                  s = t?.Fingerprint || "chrome",
                  r = t?.ECHConfig?.SNI || t?.HOST || null,
                  a = t?.ECH && r
                    ? await async function (e) {
                      try {
                        const t = await J(e, "HTTPS");
                        if (!t.length) return "";
                        for (const e of t) {
                          if (65 !== e.type || !e.rdata) continue;
                          const t = e.rdata;
                          let n = 2;
                          for (; n < t.length;) {
                            const e = t[n];
                            if (0 === e) {
                              n++;
                              break;
                            }
                            n += e + 1;
                          }
                          for (; n + 4 <= t.length;) {
                            const e = t[n] << 8 | t[n + 1],
                              s = t[n + 2] << 8 | t[n + 3];
                            if (n += 4, 5 === e) {
                              return btoa(
                                String.fromCharCode(...t.slice(n, n + s)),
                              );
                            }
                            n += s;
                          }
                        }
                        return "";
                      } catch {
                        return "";
                      }
                    }(r)
                    : null,
                  o = e.replace("1.1.1.1", "8.8.8.8").replace(
                    "1.0.0.1",
                    "8.8.4.4",
                  );
                try {
                  let e = JSON.parse(o);
                  Array.isArray(e.inbounds) && e.inbounds.forEach((e) => {
                    if ("tun" === e.type) {
                      const t = [];
                      e.inet4_address && t.push(e.inet4_address),
                        e.inet6_address && t.push(e.inet6_address),
                        t.length > 0 &&
                        (e.address = t,
                          delete e.inet4_address,
                          delete e.inet6_address);
                      const n = [];
                      Array.isArray(e.inet4_route_address) &&
                      n.push(...e.inet4_route_address),
                        Array.isArray(e.inet6_route_address) &&
                        n.push(...e.inet6_route_address),
                        n.length > 0 &&
                        (e.route_address = n,
                          delete e.inet4_route_address,
                          delete e.inet6_route_address);
                      const s = [];
                      Array.isArray(e.inet4_route_exclude_address) &&
                      s.push(...e.inet4_route_exclude_address),
                        Array.isArray(e.inet6_route_exclude_address) &&
                        s.push(...e.inet6_route_exclude_address),
                        s.length > 0 &&
                        (e.route_exclude_address = s,
                          delete e.inet4_route_exclude_address,
                          delete e.inet6_route_exclude_address);
                    }
                  });
                  const t = new Map(),
                    r = (e, n = !1) => {
                      Array.isArray(e) && e.forEach((e) => {
                        if (e.geosite) {
                          const n = Array.isArray(e.geosite)
                            ? e.geosite
                            : [e.geosite];
                          e.rule_set = n.map((e) => {
                            const n = `geosite-${e}`;
                            return t.has(n) || t.set(n, {
                              tag: n,
                              type: "remote",
                              format: "binary",
                              url:
                                `https://gh.090227.xyz/https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-${e}.srs`,
                              download_detour: "DIRECT",
                            }),
                              n;
                          }), delete e.geosite;
                        }
                        if (e.geoip) {
                          const n = Array.isArray(e.geoip)
                            ? e.geoip
                            : [e.geoip];
                          e.rule_set = e.rule_set || [],
                            n.forEach((n) => {
                              const s = `geoip-${n}`;
                              t.has(s) || t.set(s, {
                                tag: s,
                                type: "remote",
                                format: "binary",
                                url:
                                  `https://gh.090227.xyz/https://raw.githubusercontent.com/SagerNet/sing-geoip/rule-set/geoip-${n}.srs`,
                                download_detour: "DIRECT",
                              }), e.rule_set.push(s);
                            }),
                            delete e.geoip;
                        }
                        const s = n ? "server" : "outbound",
                          r = String(e[s]).toUpperCase();
                        "REJECT" !== r && "BLOCK" !== r ||
                          (e.action = "reject", e.method = "drop", delete e[s]);
                      });
                    };
                  e.dns && e.dns.rules && r(e.dns.rules, !0),
                    e.route && e.route.rules && r(e.route.rules, !1),
                    t.size > 0 &&
                    (e.route || (e.route = {}),
                      e.route.rule_set = Array.from(t.values())),
                    e.outbounds || (e.outbounds = []),
                    e.outbounds = e.outbounds.filter((e) =>
                      "REJECT" !== e.tag && "block" !== e.tag
                    );
                  const i = new Set(e.outbounds.map((e) => e.tag));
                  if (
                    i.has("DIRECT") ||
                    (e.outbounds.push({ type: "direct", tag: "DIRECT" }),
                      i.add("DIRECT")), e.dns && e.dns.servers
                  ) {
                    const t = new Set(e.dns.servers.map((e) => e.tag));
                    e.dns.rules && e.dns.rules.forEach((n) => {
                      n.server && !t.has(n.server) &&
                        ("dns_block" === n.server && t.has("block")
                          ? n.server = "block"
                          : n.server.toLowerCase().includes("block") &&
                            !t.has(n.server) &&
                            (e.dns.servers.push({
                              tag: n.server,
                              address: "rcode://success",
                            }),
                              t.add(n.server)));
                    });
                  }
                  return e.outbounds.forEach((e) => {
                    "selector" !== e.type && "urltest" !== e.type ||
                      Array.isArray(e.outbounds) &&
                        (e.outbounds = e.outbounds.filter((e) => {
                          const t = e.toUpperCase();
                          return i.has(e) && "REJECT" !== t && "BLOCK" !== t;
                        }),
                          0 === e.outbounds.length &&
                          e.outbounds.push("DIRECT"));
                  }),
                    n && e.outbounds.forEach((e) => {
                      (e.uuid && e.uuid === n ||
                        e.password && e.password === n) &&
                        (e.tls || (e.tls = { enabled: !0 }),
                          s && (e.tls.utls = { enabled: !0, fingerprint: s }),
                          a &&
                          (e.tls.ech = {
                            enabled: !0,
                            config:
                              `-----BEGIN ECH CONFIGS-----\n${a}\n-----END ECH CONFIGS-----`,
                          }));
                    }),
                    JSON.stringify(e, null, 2);
                } catch (e) {
                  return console.error("Singbox热补丁执行失败:", e),
                    JSON.stringify(JSON.parse(o), null, 2);
                }
              }(y, e),
                f["content-type"] = "application/json; charset=utf-8")
              : "clash" === w && (y = function (e, t = {}) {
                const n = t?.UUID || null,
                  s = Boolean(t?.ECH),
                  r = Array.isArray(t?.HOSTS) ? [...t.HOSTS] : [],
                  a = t?.ECHConfig?.SNI || null,
                  o = t?.ECHConfig?.DNS,
                  i = Boolean(n && s),
                  c = "string" == typeof t?.gRPCUserAgent &&
                      t.gRPCUserAgent.trim()
                    ? t.gRPCUserAgent.trim()
                    : null,
                  l = "grpc" === t?.传输协议 && Boolean(c),
                  u = c ? JSON.stringify(c) : null;
                let d = e.replace(/mode:\s*Rule\b/g, "mode: rule");
                const h =
                    "dns:\n  enable: true\n  default-nameserver:\n    - 223.5.5.5\n    - 119.29.29.29\n    - 114.114.114.114\n  use-hosts: true\n  nameserver:\n    - https://sm2.doh.pub/dns-query\n    - https://dns.alidns.com/dns-query\n  fallback:\n    - 8.8.4.4\n    - 208.67.220.220\n  fallback-filter:\n    geoip: true\n    geoip-code: CN\n    ipcidr:\n      - 240.0.0.0/4\n      - 127.0.0.1/32\n      - 0.0.0.0/32\n    domain:\n      - '+.google.com'\n      - '+.facebook.com'\n      - '+.youtube.com'\n",
                  p = (e) =>
                    e.replace(/grpc-opts:\s*\{([\s\S]*?)\}/i, (e, t) => {
                      if (/grpc-user-agent\s*:/i.test(t)) return e;
                      let n = t.trim();
                      n.endsWith(",") && (n = n.slice(0, -1).trim());
                      return `grpc-opts: {${
                        n
                          ? `${n}, grpc-user-agent: ${u}`
                          : `grpc-user-agent: ${u}`
                      }}`;
                    }),
                  f = (e) =>
                    /(?:^|[,{])\s*network:\s*(?:"grpc"|'grpc'|grpc)(?=\s*(?:[,}\n#]|$))/im
                      .test(e),
                  g = (e) => e.match(/type:\s*(\w+)/)?.[1] || "vless",
                  w = (e, t) => {
                    const n = "trojan" === g(e) ? "password" : "uuid",
                      s = new RegExp(
                        `${n}:\\s*${t ? "([^,}\\n]+)" : "([^\\n]+)"}`,
                      );
                    return e.match(s)?.[1]?.trim() || null;
                  },
                  m = (e, t) => {
                    if (/^\s{2}nameserver-policy:\s*(?:\n|$)/m.test(e)) {
                      return e.replace(
                        /^(\s{2}nameserver-policy:\s*\n)/m,
                        `$1${t}\n`,
                      );
                    }
                    const n = e.split("\n");
                    let s = -1, r = !1;
                    for (let e = 0; e < n.length; e++) {
                      const t = n[e];
                      if (/^dns:\s*$/.test(t)) r = !0;
                      else if (r && /^[a-zA-Z]/.test(t)) {
                        s = e;
                        break;
                      }
                    }
                    const a = `  nameserver-policy:\n${t}`;
                    return -1 !== s ? n.splice(s, 0, a) : n.push(a),
                      n.join("\n");
                  },
                  y = (e) =>
                    !f(e) || /grpc-user-agent\s*:/i.test(e)
                      ? e
                      : /grpc-opts:\s*\{/i.test(e)
                      ? p(e)
                      : e.replace(
                        /\}(\s*)$/,
                        `, grpc-opts: {grpc-user-agent: ${u}}}$1`,
                      ),
                  b = (e, t) => {
                    const n = " ".repeat(t);
                    let s = -1;
                    for (let n = 0; n < e.length; n++) {
                      const r = e[n];
                      if (!r.trim()) continue;
                      if (
                        r.search(/\S/) === t &&
                        (/^\s*grpc-opts:\s*(?:#.*)?$/.test(r) ||
                          /^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/.test(r))
                      ) {
                        s = n;
                        break;
                      }
                    }
                    if (-1 === s) {
                      let t = -1;
                      for (let n = e.length - 1; n >= 0; n--) {
                        if (e[n].trim()) {
                          t = n;
                          break;
                        }
                      }
                      return t >= 0 &&
                        e.splice(
                          t + 1,
                          0,
                          `${n}grpc-opts:`,
                          `${n}  grpc-user-agent: ${u}`,
                        ),
                        e;
                    }
                    const r = e[s];
                    if (/^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/.test(r)) {
                      return /grpc-user-agent\s*:/i.test(r) || (e[s] = p(r)), e;
                    }
                    let a = e.length, o = t + 2, i = !1;
                    for (let n = s + 1; n < e.length; n++) {
                      const s = e[n], r = s.trim();
                      if (!r) continue;
                      const c = s.search(/\S/);
                      if (c <= t) {
                        a = n;
                        break;
                      }
                      if (
                        c > t && o === t + 2 && (o = c),
                          /^grpc-user-agent\s*:/.test(r)
                      ) {
                        i = !0;
                        break;
                      }
                    }
                    return i ||
                      e.splice(a, 0, `${" ".repeat(o)}grpc-user-agent: ${u}`),
                      e;
                  },
                  S = (e, t) => {
                    let n = -1;
                    for (let t = e.length - 1; t >= 0; t--) {
                      if (e[t].trim()) {
                        n = t;
                        break;
                      }
                    }
                    if (n < 0) return e;
                    const s = " ".repeat(t),
                      r = [`${s}ech-opts:`, `${s}  enable: true`];
                    return a && r.push(`${s}  query-server-name: ${a}`),
                      e.splice(n + 1, 0, ...r),
                      e;
                  };
                /^dns:\s*(?:\n|$)/m.test(d) || (d = h + d);
                a && !r.includes(a) && r.push(a);
                if (s && r.length > 0) {
                  const e = r.map((e) =>
                    `    "${e}":${
                      o ? `\n      - ${o}` : ""
                    }\n      - https://doh.cm.edu.kg/CMLiussss`
                  ).join("\n");
                  d = m(d, e);
                }
                if (!i && !l) return d;
                const $ = d.split("\n"), C = [];
                let A = 0;
                for (; A < $.length;) {
                  const e = $[A], t = e.trim();
                  if (t.startsWith("- {")) {
                    let t = e,
                      s = (e.match(/\{/g) || []).length -
                        (e.match(/\}/g) || []).length;
                    for (; s > 0 && A + 1 < $.length;) {
                      A++,
                        t += "\n" + $[A],
                        s += ($[A].match(/\{/g) || []).length -
                          ($[A].match(/\}/g) || []).length;
                    }
                    l && (t = y(t)),
                      i && w(t, !0) === n.trim() &&
                      (t = t.replace(
                        /\}(\s*)$/,
                        `, ech-opts: {enable: true${
                          a ? `, query-server-name: ${a}` : ""
                        }}}$1`,
                      )),
                      C.push(t),
                      A++;
                  } else if (t.startsWith("- name:")) {
                    let t = [e], s = e.search(/\S/), r = s + 2;
                    for (A++; A < $.length;) {
                      const e = $[A], n = e.trim();
                      if (!n) {
                        t.push(e), A++;
                        break;
                      }
                      const r = e.search(/\S/);
                      if (r <= s && n.startsWith("- ")) break;
                      if (r < s && n) break;
                      t.push(e), A++;
                    }
                    let a = t.join("\n");
                    l && f(a) && (t = b(t, r), a = t.join("\n")),
                      i && w(a, !1) === n.trim() && (t = S(t, r)),
                      C.push(...t);
                  } else C.push(e), A++;
                }
                return C.join("\n");
              }(y, e),
                f["content-type"] = "application/x-yaml; charset=utf-8"),
            new Response(y, { status: 200, headers: f });
        }
      } else if ("locations" === k) {
        const e = t.headers.get("Cookie") || "",
          n = e.split(";").find((e) => e.trim().startsWith("auth="))?.split(
            "=",
          )[1];
        if (n && n == await B(r + c + i)) {
          return fetch(
            new Request("https://speed.cloudflare.com/locations", {
              headers: { Referer: "https://speed.cloudflare.com/" },
            }),
          );
        }
      } else if ("robots.txt" === k) {
        return new Response("User-agent: *\nDisallow: /", {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=UTF-8" },
        });
      }
    } else if (!S) {
      return fetch(h + "/noKV").then((e) => {
        const t = new Headers(e.headers);
        return t.set(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        ),
          t.set("Pragma", "no-cache"),
          t.set("Expires", "0"),
          new Response(e.body, {
            status: 404,
            statusText: e.statusText,
            headers: t,
          });
      });
    }
    let H = env.URL || "nginx";
    if (H && "nginx" !== H && "1101" !== H) {
      H = H.trim().replace(/\/$/, ""),
        H.match(/^https?:\/\//i) || (H = "https://" + H),
        H.toLowerCase().startsWith("http://") &&
        (H = "https://" + H.substring(7));
      try {
        const e = new URL(H);
        H = e.protocol + "//" + e.host;
      } catch (e) {
        H = "nginx";
      }
    }
    if ("1101" === H) {
      return new Response(
        await async function (e, t) {
          const n = new Date(),
            s = n.getFullYear() + "-" +
              String(n.getMonth() + 1).padStart(2, "0") + "-" +
              String(n.getDate()).padStart(2, "0") + " " +
              String(n.getHours()).padStart(2, "0") + ":" +
              String(n.getMinutes()).padStart(2, "0") + ":" +
              String(n.getSeconds()).padStart(2, "0"),
            r = Array.from(crypto.getRandomValues(new Uint8Array(8))).map((e) =>
              e.toString(16).padStart(2, "0")
            ).join("");
          return `<!DOCTYPE html>\n\x3c!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]--\x3e\n\x3c!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]--\x3e\n\x3c!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]--\x3e\n\x3c!--[if gt IE 8]>\x3c!--\x3e <html class="no-js" lang="en-US"> \x3c!--<![endif]--\x3e\n<head>\n<title>Worker threw exception | ${e} | Cloudflare</title>\n<meta charset="UTF-8" />\n<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n<meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n<meta name="robots" content="noindex, nofollow" />\n<meta name="viewport" content="width=device-width,initial-scale=1" />\n<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/cf.errors.css" />\n\x3c!--[if lt IE 9]><link rel="stylesheet" id='cf_styles-ie-css' href="/cdn-cgi/styles/cf.errors.ie.css" /><![endif]--\x3e\n<style>body{margin:0;padding:0}</style>\n\n\n\x3c!--[if gte IE 10]>\x3c!--\x3e\n<script>\n  if (!navigator.cookieEnabled) {\n    window.addEventListener('DOMContentLoaded', function () {\n      var cookieEl = document.getElementById('cookie-alert');\n      cookieEl.style.display = 'block';\n    })\n  }\n<\/script>\n\x3c!--<![endif]--\x3e\n\n</head>\n<body>\n    <div id="cf-wrapper">\n        <div class="cf-alert cf-alert-error cf-cookie-error" id="cookie-alert" data-translate="enable_cookies">Please enable cookies.</div>\n        <div id="cf-error-details" class="cf-error-details-wrapper">\n            <div class="cf-wrapper cf-header cf-error-overview">\n                <h1>\n                    <span class="cf-error-type" data-translate="error">Error</span>\n                    <span class="cf-error-code">1101</span>\n                    <small class="heading-ray-id">Ray ID: ${r} &bull; ${s} UTC</small>\n                </h1>\n                <h2 class="cf-subheadline" data-translate="error_desc">Worker threw exception</h2>\n            </div>\x3c!-- /.header --\x3e\n    \n            <section></section>\x3c!-- spacer --\x3e\n    \n            <div class="cf-section cf-wrapper">\n                <div class="cf-columns two">\n                    <div class="cf-column">\n                        <h2 data-translate="what_happened">What happened?</h2>\n                            <p>You've requested a page on a website (${e}) that is on the <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=error_100x" target="_blank">Cloudflare</a> network. An unknown error occurred while rendering the page.</p>\n                    </div>\n                    \n                    <div class="cf-column">\n                        <h2 data-translate="what_can_i_do">What can I do?</h2>\n                            <p><strong>If you are the owner of this website:</strong><br />refer to <a href="https://developers.cloudflare.com/workers/observability/errors/" target="_blank">Workers - Errors and Exceptions</a> and check Workers Logs for ${e}.</p>\n                    </div>\n                    \n                </div>\n            </div>\x3c!-- /.section --\x3e\n    \n            <div class="cf-error-footer cf-wrapper w-240 lg:w-full py-10 sm:py-4 sm:px-8 mx-auto text-center sm:text-left border-solid border-0 border-t border-gray-300">\n    <p class="text-13">\n      <span class="cf-footer-item sm:block sm:mb-1">Cloudflare Ray ID: <strong class="font-semibold"> ${r}</strong></span>\n      <span class="cf-footer-separator sm:hidden">&bull;</span>\n      <span id="cf-footer-item-ip" class="cf-footer-item hidden sm:block sm:mb-1">\n        Your IP:\n        <button type="button" id="cf-footer-ip-reveal" class="cf-footer-ip-reveal-btn">Click to reveal</button>\n        <span class="hidden" id="cf-footer-ip">${t}</span>\n        <span class="cf-footer-separator sm:hidden">&bull;</span>\n      </span>\n      <span class="cf-footer-item sm:block sm:mb-1"><span>Performance &amp; security by</span> <a rel="noopener noreferrer" href="https://www.cloudflare.com/5xx-error-landing" id="brand_link" target="_blank">Cloudflare</a></span>\n      \n    </p>\n    <script>(function(){function d(){var b=a.getElementById("cf-footer-item-ip"),c=a.getElementById("cf-footer-ip-reveal");b&&"classList"in b&&(b.classList.remove("hidden"),c.addEventListener("click",function(){c.classList.add("hidden");a.getElementById("cf-footer-ip").classList.remove("hidden")}))}var a=document;document.addEventListener&&a.addEventListener("DOMContentLoaded",d)})();<\/script>\n  </div>\x3c!-- /.error-footer --\x3e\n\n        </div>\x3c!-- /#cf-error-details --\x3e\n    </div>\x3c!-- /#cf-wrapper --\x3e\n\n     <script>\n    window._cf_translation = {};\n    \n    \n  <\/script> \n</body>\n</html>`;
        }(n.host, j),
        {
          status: 200,
          headers: { "Content-Type": "text/html; charset=UTF-8" },
        },
      );
    }
    try {
      const e = new URL(H), s = new Headers(t.headers);
      s.set("Host", e.host),
        s.set("Referer", e.origin),
        s.set("Origin", e.origin),
        !s.has("User-Agent") && r && "null" !== r && s.set("User-Agent", r);
      const a = await fetch(e.origin + n.pathname + n.search, {
          method: t.method,
          headers: s,
          body: t.body,
          cf: t.cf,
        }),
        o = a.headers.get("content-type") || "";
      if (/text|javascript|json|xml/.test(o)) {
        const t = (await a.text()).replaceAll(e.host, n.host);
        return new Response(t, {
          status: a.status,
          headers: {
            ...Object.fromEntries(a.headers),
            "Cache-Control": "no-store",
          },
        });
      }
      return a;
    } catch (e) {}
    return new Response(
      await async function () {
        return '\n\t<!DOCTYPE html>\n\t<html>\n\t<head>\n\t<title>Welcome to nginx!</title>\n\t<style>\n\t\tbody {\n\t\t\twidth: 35em;\n\t\t\tmargin: 0 auto;\n\t\t\tfont-family: Tahoma, Verdana, Arial, sans-serif;\n\t\t}\n\t</style>\n\t</head>\n\t<body>\n\t<h1>Welcome to nginx!</h1>\n\t<p>If you see this page, the nginx web server is successfully installed and\n\tworking. Further configuration is required.</p>\n\t\n\t<p>For online documentation and support please refer to\n\t<a href="http://nginx.org/">nginx.org</a>.<br/>\n\tCommercial support is available at\n\t<a href="http://nginx.com/">nginx.com</a>.</p>\n\t\n\t<p><em>Thank you for using nginx.</em></p>\n\t</body>\n\t</html>\n\t';
      }(),
      { status: 200, headers: { "Content-Type": "text/html; charset=UTF-8" } },
    );
  },
};
function f(e) {
  return e
    ? "number" == typeof e.byteLength
      ? e.byteLength
      : "number" == typeof e.length
      ? e.length
      : 0
    : 0;
}
function g(e, t) {
  const n = ne(t);
  if (e.byteLength < 56) return { hasError: !0, message: "invalid data" };
  if (
    13 !== new Uint8Array(e.slice(56, 57))[0] ||
    10 !== new Uint8Array(e.slice(57, 58))[0]
  ) return { hasError: !0, message: "invalid header format" };
  if ((new TextDecoder()).decode(e.slice(0, 56)) !== n) {
    return { hasError: !0, message: "invalid password" };
  }
  const s = e.slice(58);
  if (s.byteLength < 6) {
    return { hasError: !0, message: "invalid S5 request data" };
  }
  const r = new DataView(s);
  if (1 !== r.getUint8(0)) {
    return {
      hasError: !0,
      message: "unsupported command, only TCP is allowed",
    };
  }
  const a = r.getUint8(1);
  let o = 0, i = 2, c = "";
  switch (a) {
    case 1:
      o = 4, c = new Uint8Array(s.slice(i, i + o)).join(".");
      break;
    case 3:
      o = new Uint8Array(s.slice(i, i + 1))[0],
        i += 1,
        c = (new TextDecoder()).decode(s.slice(i, i + o));
      break;
    case 4:
      o = 16;
      const e = new DataView(s.slice(i, i + o)), t = [];
      for (let n = 0; n < 8; n++) t.push(e.getUint16(2 * n).toString(16));
      c = t.join(":");
      break;
    default:
      return { hasError: !0, message: `invalid addressType is ${a}` };
  }
  if (!c) {
    return { hasError: !0, message: `address is empty, addressType is ${a}` };
  }
  const l = i + o, u = s.slice(l, l + 2);
  return {
    hasError: !1,
    addressType: a,
    port: new DataView(u).getUint16(0),
    hostname: c,
    rawClientData: s.slice(l + 4),
  };
}
function w(e, t) {
  if (e.byteLength < 24) return { hasError: !0, message: "Invalid data" };
  const n = new Uint8Array(e.slice(0, 1));
  if (R(new Uint8Array(e.slice(1, 17))) !== t) {
    return { hasError: !0, message: "Invalid uuid" };
  }
  const s = new Uint8Array(e.slice(17, 18))[0],
    r = new Uint8Array(e.slice(18 + s, 19 + s))[0];
  let a = !1;
  if (1 === r);
  else {
    if (2 !== r) return { hasError: !0, message: "Invalid command" };
    a = !0;
  }
  const o = 19 + s, i = new DataView(e.slice(o, o + 2)).getUint16(0);
  let c = o + 2, l = 0, u = c + 1, d = "";
  const h = new Uint8Array(e.slice(c, u))[0];
  switch (h) {
    case 1:
      l = 4, d = new Uint8Array(e.slice(u, u + l)).join(".");
      break;
    case 2:
      l = new Uint8Array(e.slice(u, u + 1))[0],
        u += 1,
        d = (new TextDecoder()).decode(e.slice(u, u + l));
      break;
    case 3:
      l = 16;
      const t = [], n = new DataView(e.slice(u, u + l));
      for (let e = 0; e < 8; e++) t.push(n.getUint16(2 * e).toString(16));
      d = t.join(":");
      break;
    default:
      return { hasError: !0, message: `Invalid address type: ${h}` };
  }
  return d
    ? {
      hasError: !1,
      addressType: h,
      port: i,
      hostname: d,
      isUDP: a,
      rawIndex: u + l,
      version: n,
    }
    : { hasError: !0, message: `Invalid address: ${h}` };
}
const m = {
    "aes-128-gcm": {
      method: "aes-128-gcm",
      keyLen: 16,
      saltLen: 16,
      maxChunk: 16383,
      aesLength: 128,
    },
    "aes-256-gcm": {
      method: "aes-256-gcm",
      keyLen: 32,
      saltLen: 32,
      maxChunk: 16383,
      aesLength: 256,
    },
  },
  y = 16,
  b = 12,
  S = (new TextEncoder()).encode("ss-subkey"),
  $ = new TextEncoder(),
  C = new TextDecoder(),
  A = new Map();
function U(e) {
  return e instanceof Uint8Array
    ? e
    : e instanceof ArrayBuffer
    ? new Uint8Array(e)
    : ArrayBuffer.isView(e)
    ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
    : new Uint8Array(e || 0);
}
function T(...e) {
  if (!e || 0 === e.length) return new Uint8Array(0);
  const t = e.map(U),
    n = t.reduce((e, t) => e + t.byteLength, 0),
    s = new Uint8Array(n);
  let r = 0;
  for (const e of t) s.set(e, r), r += e.byteLength;
  return s;
}
function k(e) {
  for (let t = 0; t < e.length; t++) {
    if (e[t] = e[t] + 1 & 255, 0 !== e[t]) return;
  }
}
async function x(e, t) {
  const n = `${t}:${e}`;
  if (A.has(n)) return A.get(n);
  const s = (async () => {
    const n = $.encode(e || "");
    let s = new Uint8Array(0), r = new Uint8Array(0);
    for (; r.byteLength < t;) {
      const e = new Uint8Array(s.byteLength + n.byteLength);
      e.set(s, 0),
        e.set(n, s.byteLength),
        s = new Uint8Array(await crypto.subtle.digest("MD5", e)),
        r = T(r, s);
    }
    return r.slice(0, t);
  })();
  A.set(n, s);
  try {
    return await s;
  } catch (e) {
    throw A.delete(n), e;
  }
}
async function P(e, t, n, s) {
  const r = { name: "HMAC", hash: "SHA-1" },
    a = await crypto.subtle.importKey("raw", n, r, !1, ["sign"]),
    o = new Uint8Array(await crypto.subtle.sign("HMAC", a, t)),
    i = await crypto.subtle.importKey("raw", o, r, !1, ["sign"]),
    c = new Uint8Array(e.keyLen);
  let l = new Uint8Array(0), u = 0, d = 1;
  for (; u < e.keyLen;) {
    const t = T(l, S, new Uint8Array([d]));
    l = new Uint8Array(await crypto.subtle.sign("HMAC", i, t));
    const n = Math.min(l.byteLength, e.keyLen - u);
    c.set(l.subarray(0, n), u), u += n, d += 1;
  }
  return crypto.subtle.importKey(
    "raw",
    c,
    { name: "AES-GCM", length: e.aesLength },
    !1,
    s,
  );
}
async function L(e, t, n) {
  const s = t.slice(),
    r = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: s, tagLength: 128 },
      e,
      n,
    );
  return k(t), new Uint8Array(r);
}
async function I(e, t, n) {
  const s = t.slice(),
    r = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: s, tagLength: 128 },
      e,
      n,
    );
  return k(t), new Uint8Array(r);
}
async function E(e, o, i, u, h, p, g) {
  M(`[TCP转发] 目标: ${e}:${o} | 反代IP: ${s} | 反代兜底: ${
    l ? "是" : "否"
  } | 反代类型: ${r || "proxyip"} | 全局: ${a ? "是" : "否"}`);
  let w = !1;
  async function m(e, t = 1e3) {
    await Promise.race([
      e.opened,
      new Promise((e, n) => setTimeout(() => n(new Error("连接超时")), t)),
    ]);
  }
  async function y(e, t, n = null, s = null, r = !0) {
    let a;
    if (s && s.length > 0) {
      for (let e = 0; e < s.length; e++) {
        const t = (c + e) % s.length, [r, o] = s[t];
        try {
          if (
            M(`[反代连接] 尝试连接到: ${r}:${o} (索引: ${t})`),
              a = connect({ hostname: r, port: o }),
              await m(a),
              f(n) > 0
          ) {
            const e = a.writable.getWriter();
            await e.write(n), e.releaseLock();
          }
          return M(`[反代连接] 成功连接到: ${r}:${o}`), c = t, a;
        } catch (e) {
          M(`[反代连接] 连接失败: ${r}:${o}, 错误: ${e.message}`);
          try {
            a?.close?.();
          } catch (e) {}
          continue;
        }
      }
    }
    if (r) {
      if (a = connect({ hostname: e, port: t }), await m(a), f(n) > 0) {
        const e = a.writable.getWriter();
        await e.write(n), e.releaseLock();
      }
      return a;
    }
    throw O(u),
      new Error("[反代连接] 所有反代连接失败，且未启用反代兜底，连接终止。");
  }
  async function b(a = !0) {
    if (p.connectingPromise) return void await p.connectingPromise;
    const c = a && !w && f(i) > 0,
      d = c ? i : null,
      m = (async () => {
        let a;
        if ("socks5" === r) {
          M(`[SOCKS5代理] 代理到: ${e}:${o}`), a = await H(e, o, d);
        } else if ("http" === r) {
          M(`[HTTP代理] 代理到: ${e}:${o}`), a = await _(e, o, d);
        } else if ("https" === r) {
          M(`[HTTPS代理] 代理到: ${e}:${o}`), a = await _(e, o, d, !0);
        } else {
          M(`[反代连接] 代理到: ${e}:${o}`);
          const r = await async function (
            e,
            s = "dash.cloudflare.com",
            r = "00000000-0000-4000-8000-000000000000",
          ) {
            if (t && n && t === e) {
              M(`[反代解析] 读取缓存 总数: ${n.length}个\n${
                n.map(([e, t], n) => `${n + 1}. ${e}:${t}`).join("\n")
              }`);
            } else {
              function a(e) {
                let t = e, n = 443;
                if (e.includes("]:")) {
                  const s = e.split("]:");
                  t = s[0] + "]", n = parseInt(s[1], 10) || n;
                } else if (e.includes(":") && !e.startsWith("[")) {
                  const s = e.lastIndexOf(":");
                  t = e.slice(0, s), n = parseInt(e.slice(s + 1), 10) || n;
                }
                return [t, n];
              }
              e = e.toLowerCase();
              const o = await V(e);
              let i = [];
              for (const h of o) {
                if (h.includes(".william")) {
                  try {
                    let p = await J(h, "TXT"),
                      f = p.filter((e) => 16 === e.type).map((e) => e.data);
                    if (
                      0 === f.length &&
                      (M(
                        `[反代解析] 默认DoH未获取到TXT记录，切换Google DoH重试 ${h}`,
                      ),
                        p = await J(h, "TXT", "https://dns.google/dns-query"),
                        f = p.filter((e) => 16 === e.type).map((e) => e.data)),
                        f.length > 0
                    ) {
                      let g = f[0];
                      g.startsWith('"') && g.endsWith('"') &&
                        (g = g.slice(1, -1));
                      const w = g.replace(/\\010/g, ",").replace(/\n/g, ",")
                        .split(",").map((e) => e.trim()).filter(Boolean);
                      i.push(...w.map((e) => a(e)));
                    }
                  } catch (m) {
                    console.error("解析William域名失败:", m);
                  }
                } else {
                  let [y, b] = a(h);
                  if (h.includes(".tp")) {
                    const $ = h.match(/\.tp(\d+)/);
                    $ && (b = parseInt($[1], 10));
                  }
                  const S = /^\[?([a-fA-F0-9:]+)\]?$/;
                  if (
                    /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
                      .test(y) || S.test(y)
                  ) i.push([y, b]);
                  else {
                    let [C, A] = await Promise.all([J(y, "A"), J(y, "AAAA")]),
                      U = C.filter((e) => 1 === e.type).map((e) => e.data),
                      T = A.filter((e) => 28 === e.type).map((e) =>
                        `[${e.data}]`
                      ),
                      k = [...U, ...T];
                    0 === k.length &&
                    (M(
                      `[反代解析] 默认DoH未获取到解析结果，切换Google DoH重试 ${y}`,
                    ),
                      [C, A] = await Promise.all([
                        J(y, "A", "https://dns.google/dns-query"),
                        J(y, "AAAA", "https://dns.google/dns-query"),
                      ]),
                      U = C.filter((e) => 1 === e.type).map((e) => e.data),
                      T = A.filter((e) => 28 === e.type).map((e) =>
                        `[${e.data}]`
                      ),
                      k = [...U, ...T]),
                      k.length > 0
                        ? i.push(...k.map((e) => [e, b]))
                        : i.push([y, b]);
                  }
                }
              }
              const c = i.sort((e, t) => e[0].localeCompare(t[0])),
                l = s.includes(".") ? s.split(".").slice(-2).join(".") : s;
              let u = [...l + r].reduce((e, t) => e + t.charCodeAt(0), 0);
              M(`[反代解析] 随机种子: ${u}\n目标站点: ${l}`);
              const d = [...c].sort(() =>
                (u = 1103515245 * u + 12345 & 2147483647) / 2147483647 - .5
              );
              n = d.slice(0, 8),
                M(`[反代解析] 解析完成 总数: ${n.length}个\n${
                  n.map(([e, t], n) => `${n + 1}. ${e}:${t}`).join("\n")
                }`),
                t = e;
            }
            return n;
          }(s, e, g);
          a = await y(atob("UFJPWFlJUC50cDEuMDkwMjI3Lnh5eg=="), 1, d, r, l);
        }
        c && (w = !0),
          p.socket = a,
          a.closed.catch(() => {}).finally(() => O(u)),
          j(a, u, h, null);
      })();
    p.connectingPromise = m;
    try {
      await m;
    } finally {
      p.connectingPromise === m && (p.connectingPromise = null);
    }
  }
  p.retryConnect = async () => b(!w);
  if (
    r &&
    (a ||
      (S = e,
        d.some((e) => new RegExp(`^${e.replace(/\*/g, ".*")}$`, "i").test(S))))
  ) {
    M("[TCP转发] 启用 SOCKS5/HTTP/HTTPS 全局代理");
    try {
      await b();
    } catch (e) {
      throw M(`[TCP转发] SOCKS5/HTTP/HTTPS 代理连接失败: ${e.message}`), e;
    }
  } else {try {
      M(`[TCP转发] 尝试直连到: ${e}:${o}`);
      const t = await y(e, o, i);
      p.socket = t,
        j(t, u, h, async () => {
          p.socket === t && await b();
        });
    } catch (t) {
      M(`[TCP转发] 直连 ${e}:${o} 失败: ${t.message}`), await b();
    }}
  var S;
}
async function v(e, t, n) {
  try {
    const s = connect({ hostname: "8.8.4.4", port: 53 });
    let r = n;
    const a = s.writable.getWriter();
    await a.write(e),
      a.releaseLock(),
      await s.readable.pipeTo(
        new WritableStream({
          async write(e) {
            if (t.readyState === WebSocket.OPEN) {
              if (r) {
                const n = new Uint8Array(r.length + e.byteLength);
                n.set(r, 0), n.set(e, r.length), await D(t, n.buffer), r = null;
              } else await D(t, e);
            }
          },
        }),
      );
  } catch (e) {}
}
function O(e) {
  try {
    e.readyState !== WebSocket.OPEN && e.readyState !== WebSocket.CLOSING ||
      e.close();
  } catch (e) {}
}
function R(e, t = 0) {
  const n = [...e.slice(t, t + 16)].map((e) => e.toString(16).padStart(2, "0"))
    .join("");
  return `${n.substring(0, 8)}-${n.substring(8, 12)}-${n.substring(12, 16)}-${
    n.substring(16, 20)
  }-${n.substring(20)}`;
}
async function D(e, t) {
  const n = e.send(t);
  n && "function" == typeof n.then && await n;
}
async function j(e, t, n, s) {
  let r, a = n, o = !1, i = !1;
  const c = 524288,
    l = 65536,
    u = async (e) => {
      if (t.readyState !== WebSocket.OPEN) {
        throw new Error("ws.readyState is not open");
      }
      if (a) {
        const n = new Uint8Array(a.length + e.byteLength);
        n.set(a, 0), n.set(e, a.length), await D(t, n.buffer), a = null;
      } else await D(t, e);
    };
  try {
    r = e.readable.getReader({ mode: "byob" }), i = !0;
  } catch (t) {
    r = e.readable.getReader();
  }
  try {
    if (i) {
      let e = new ArrayBuffer(c),
        n = 0,
        s = 0,
        a = 2,
        i = null,
        d = null,
        h = !1,
        p = !1;
      const f = async () => {
        if (h) p = !0;
        else {try {
            if (n > 0) {
              const t = new Uint8Array(e.slice(0, n));
              n = 0, await u(t);
            }
          } finally {
            if (p = !1, i && (clearTimeout(i), i = null), d) {
              const e = d;
              d = null, e();
            }
          }}
      };
      for (;;) {
        h = !0;
        const { done: g, value: w } = await r.read(new Uint8Array(e, n, l));
        if (h = !1, g) break;
        if (!w || 0 === w.byteLength) {
          p && await f();
          continue;
        }
        o = !0, e = w.buffer;
        const m = w.byteLength;
        w.byteOffset === n
          ? m < l
            ? (a = 2,
              m < 4096 && (s = 0),
              n > 0 ? (n += m, await f()) : await u(w.slice()))
            : (s += m,
              n += m,
              i || (i = setTimeout(() => {
                f().catch(() => O(t));
              }, a)),
              p && await f(),
              n > 458752 &&
              (s > 52428800 && (a = 20),
                await new Promise((e) => {
                  d = e;
                })))
          : (M(`[BYOB] 偏移异常: 预期=${n}, 实际=${w.byteOffset}`),
            await u(new Uint8Array(w.buffer, w.byteOffset, m).slice()),
            e = new ArrayBuffer(c),
            n = 0,
            s = 0);
      }
      h = !1, await f(), i && (clearTimeout(i), i = null);
    } else {for (;;) {
        const { done: e, value: t } = await r.read();
        if (e) break;
        t && 0 !== t.byteLength &&
          (o = !0, await u(t instanceof Uint8Array ? t : new Uint8Array(t)));
      }}
  } catch (e) {
    O(t);
  } finally {
    try {
      r.cancel();
    } catch (e) {}
    try {
      r.releaseLock();
    } catch (e) {}
  }
  !o && s && await s();
}
function N(e) {
  const t = [atob("c3BlZWQuY2xvdWRmbGFyZS5jb20=")];
  if (t.includes(e)) return !0;
  for (const n of t) if (e.endsWith("." + n) || e === n) return !0;
  return !1;
}
async function H(e, t, n) {
  const { username: s, password: r, hostname: a, port: o } = i,
    c = connect({ hostname: a, port: o }),
    l = c.writable.getWriter(),
    u = c.readable.getReader();
  try {
    const a = s && r ? new Uint8Array([5, 2, 0, 2]) : new Uint8Array([5, 1, 0]);
    await l.write(a);
    let o = await u.read();
    if (o.done || o.value.byteLength < 2) {
      throw new Error("S5 method selection failed");
    }
    const i = new Uint8Array(o.value)[1];
    if (2 === i) {
      if (!s || !r) throw new Error("S5 requires authentication");
      const e = (new TextEncoder()).encode(s),
        t = (new TextEncoder()).encode(r),
        n = new Uint8Array([1, e.length, ...e, t.length, ...t]);
      if (
        await l.write(n),
          o = await u.read(),
          o.done || 0 !== new Uint8Array(o.value)[1]
      ) throw new Error("S5 authentication failed");
    } else if (0 !== i) throw new Error(`S5 unsupported auth method: ${i}`);
    const d = (new TextEncoder()).encode(e),
      h = new Uint8Array([5, 1, 0, 3, d.length, ...d, t >> 8, 255 & t]);
    if (
      await l.write(h),
        o = await u.read(),
        o.done || 0 !== new Uint8Array(o.value)[1]
    ) throw new Error("S5 connection failed");
    return f(n) > 0 && await l.write(n), l.releaseLock(), u.releaseLock(), c;
  } catch (e) {
    try {
      l.releaseLock();
    } catch (e) {}
    try {
      u.releaseLock();
    } catch (e) {}
    try {
      c.close();
    } catch (e) {}
    throw e;
  }
}
async function _(e, t, n, s = !1) {
  const { username: r, password: a, hostname: o, port: c } = i,
    l = s
      ? connect({ hostname: o, port: c }, {
        secureTransport: "on",
        allowHalfOpen: !1,
      })
      : connect({ hostname: o, port: c }),
    u = l.writable.getWriter(),
    d = l.readable.getReader(),
    h = new TextEncoder(),
    p = new TextDecoder();
  try {
    s && await l.opened;
    const o = `CONNECT ${e}:${t} HTTP/1.1\r\nHost: ${e}:${t}\r\n${
      r && a ? `Proxy-Authorization: Basic ${btoa(`${r}:${a}`)}\r\n` : ""
    }User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
    await u.write(h.encode(o)), u.releaseLock();
    let i = new Uint8Array(0), c = -1, g = 0;
    for (; -1 === c && g < 8192;) {
      const { done: e, value: t } = await d.read();
      if (e || !t) {
        throw new Error(
          (s ? "HTTPS" : "HTTP") + " 代理在返回 CONNECT 响应前关闭连接",
        );
      }
      i = new Uint8Array([...i, ...t]), g = i.length;
      const n = i.findIndex((e, t) =>
        t < i.length - 3 && 13 === i[t] && 10 === i[t + 1] && 13 === i[t + 2] &&
        10 === i[t + 3]
      );
      -1 !== n && (c = n + 4);
    }
    if (-1 === c) throw new Error("代理 CONNECT 响应头过长或无效");
    const w = p.decode(i.slice(0, c)).split("\r\n")[0].match(
        /HTTP\/\d\.\d\s+(\d+)/,
      ),
      m = w ? parseInt(w[1], 10) : NaN;
    if (!Number.isFinite(m) || m < 200 || m >= 300) {
      throw new Error(`Connection failed: HTTP ${m}`);
    }
    if (d.releaseLock(), f(n) > 0) {
      const e = l.writable.getWriter();
      await e.write(n), e.releaseLock();
    }
    if (g > c) {
      const { readable: e, writable: t } = new TransformStream(),
        n = t.getWriter();
      return await n.write(i.subarray(c, g)),
        n.releaseLock(),
        l.readable.pipeTo(t).catch(() => {}),
        {
          readable: e,
          writable: l.writable,
          closed: l.closed,
          close: () => l.close(),
        };
    }
    return l;
  } catch (e) {
    try {
      u.releaseLock();
    } catch (e) {}
    try {
      d.releaseLock();
    } catch (e) {}
    try {
      l.close();
    } catch (e) {}
    throw e;
  }
}
function M(...e) {
  u && console.log(...e);
}
async function F(env, e, t, n = "Get_SUB", s, r = !0) {
  try {
    const a = new Date(),
      o = {
        TYPE: n,
        IP: t,
        ASN: `AS${e.cf.asn || "0"} ${e.cf.asOrganization || "Unknown"}`,
        CC: `${e.cf.country || "N/A"} ${e.cf.city || "N/A"}`,
        URL: e.url,
        UA: e.headers.get("User-Agent") || "Unknown",
        TIME: a.getTime(),
      };
    if (s.TG.启用) {
      try {
        const e = await env.KV.get("tg.json"), t = JSON.parse(e);
        if (t?.BotToken && t?.ChatID) {
          const e = new Date(o.TIME).toLocaleString("zh-CN", {
              timeZone: "Asia/Shanghai",
            }),
            n = new URL(o.URL),
            r =
              `<b>#${s.优选订阅生成.SUBNAME} 日志通知</b>\n\n📌 <b>类型：</b>#${o.TYPE}\n🌐 <b>IP：</b><code>${o.IP}</code>\n📍 <b>位置：</b>${o.CC}\n🏢 <b>ASN：</b>${o.ASN}\n🔗 <b>域名：</b><code>${n.host}</code>\n🔍 <b>路径：</b><code>${
                n.pathname + n.search
              }</code>\n🤖 <b>UA：</b><code>${o.UA}</code>\n📅 <b>时间：</b>${e}\n` +
              (s.CF.Usage.success
                ? `📊 <b>请求用量：</b>${s.CF.Usage.total}/${s.CF.Usage.max} <b>${
                  (s.CF.Usage.total / s.CF.Usage.max * 100).toFixed(2)
                }%</b>\n`
                : "");
          await fetch(
            `https://api.telegram.org/bot${t.BotToken}/sendMessage?chat_id=${t.ChatID}&parse_mode=HTML&text=${
              encodeURIComponent(r)
            }`,
            {
              method: "GET",
              headers: {
                Accept: "text/html,application/xhtml+xml,application/xml;",
                "Accept-Encoding": "gzip, deflate, br",
                "User-Agent": o.UA || "Unknown",
              },
            },
          );
        }
      } catch (e) {
        console.error(`读取tg.json出错: ${e.message}`);
      }
    }
    if (!(r = !["1", "true"].includes(env.OFF_LOG) && r)) return;
    let i = [];
    const c = await env.KV.get("log.json"), l = 4;
    if (c) {
      try {
        if (i = JSON.parse(c), Array.isArray(i)) {
          if ("Get_SUB" !== n) {
            const n = a.getTime() - 18e5;
            if (
              i.some((s) =>
                "Get_SUB" !== s.TYPE && s.IP === t && s.URL === e.url &&
                s.UA === (e.headers.get("User-Agent") || "Unknown") &&
                s.TIME >= n
              )
            ) return;
            for (
              i.push(o);
              JSON.stringify(i, null, 2).length > 1024 * l * 1024 &&
              i.length > 0;
            ) i.shift();
          } else {for (
              i.push(o);
              JSON.stringify(i, null, 2).length > 1024 * l * 1024 &&
              i.length > 0;
            ) i.shift();}
        } else i = [o];
      } catch (e) {
        i = [o];
      }
    } else i = [o];
    await env.KV.put("log.json", JSON.stringify(i, null, 2));
  } catch (e) {
    console.error(`日志记录失败: ${e.message}`);
  }
}
function W(e, t = 3, n = 2) {
  if (!e || "string" != typeof e) return e;
  if (e.length <= t + n) return e;
  const s = e.slice(0, t), r = e.slice(-n), a = e.length - t - n;
  return `${s}${"*".repeat(a)}${r}`;
}
async function B(e) {
  const t = new TextEncoder(),
    n = await crypto.subtle.digest("MD5", t.encode(e)),
    s = Array.from(new Uint8Array(n)).map((e) =>
      e.toString(16).padStart(2, "0")
    ).join(""),
    r = await crypto.subtle.digest("MD5", t.encode(s.slice(7, 27)));
  return Array.from(new Uint8Array(r)).map((e) =>
    e.toString(16).padStart(2, "0")
  ).join("").toLowerCase();
}
function K(e = "/") {
  const t = Math.floor(3 * Math.random() + 1),
    n = [
      "about",
      "account",
      "acg",
      "act",
      "activity",
      "ad",
      "ads",
      "ajax",
      "album",
      "albums",
      "anime",
      "api",
      "app",
      "apps",
      "archive",
      "archives",
      "article",
      "articles",
      "ask",
      "auth",
      "avatar",
      "bbs",
      "bd",
      "blog",
      "blogs",
      "book",
      "books",
      "bt",
      "buy",
      "cart",
      "category",
      "categories",
      "cb",
      "channel",
      "channels",
      "chat",
      "china",
      "city",
      "class",
      "classify",
      "clip",
      "clips",
      "club",
      "cn",
      "code",
      "collect",
      "collection",
      "comic",
      "comics",
      "community",
      "company",
      "config",
      "contact",
      "content",
      "course",
      "courses",
      "cp",
      "data",
      "detail",
      "details",
      "dh",
      "directory",
      "discount",
      "discuss",
      "dl",
      "dload",
      "doc",
      "docs",
      "document",
      "documents",
      "doujin",
      "download",
      "downloads",
      "drama",
      "edu",
      "en",
      "ep",
      "episode",
      "episodes",
      "event",
      "events",
      "f",
      "faq",
      "favorite",
      "favourites",
      "favs",
      "feedback",
      "file",
      "files",
      "film",
      "films",
      "forum",
      "forums",
      "friend",
      "friends",
      "game",
      "games",
      "gif",
      "go",
      "go.html",
      "go.php",
      "group",
      "groups",
      "help",
      "home",
      "hot",
      "htm",
      "html",
      "image",
      "images",
      "img",
      "index",
      "info",
      "intro",
      "item",
      "items",
      "ja",
      "jp",
      "jump",
      "jump.html",
      "jump.php",
      "jumping",
      "knowledge",
      "lang",
      "lesson",
      "lessons",
      "lib",
      "library",
      "link",
      "links",
      "list",
      "live",
      "lives",
      "m",
      "mag",
      "magnet",
      "mall",
      "manhua",
      "map",
      "member",
      "members",
      "message",
      "messages",
      "mobile",
      "movie",
      "movies",
      "music",
      "my",
      "new",
      "news",
      "note",
      "novel",
      "novels",
      "online",
      "order",
      "out",
      "out.html",
      "out.php",
      "outbound",
      "p",
      "page",
      "pages",
      "pay",
      "payment",
      "pdf",
      "photo",
      "photos",
      "pic",
      "pics",
      "picture",
      "pictures",
      "play",
      "player",
      "playlist",
      "post",
      "posts",
      "product",
      "products",
      "program",
      "programs",
      "project",
      "qa",
      "question",
      "rank",
      "ranking",
      "read",
      "readme",
      "redirect",
      "redirect.html",
      "redirect.php",
      "reg",
      "register",
      "res",
      "resource",
      "retrieve",
      "sale",
      "search",
      "season",
      "seasons",
      "section",
      "seller",
      "series",
      "service",
      "services",
      "setting",
      "settings",
      "share",
      "shop",
      "show",
      "shows",
      "site",
      "soft",
      "sort",
      "source",
      "special",
      "star",
      "stars",
      "static",
      "stock",
      "store",
      "stream",
      "streaming",
      "streams",
      "student",
      "study",
      "tag",
      "tags",
      "task",
      "teacher",
      "team",
      "tech",
      "temp",
      "test",
      "thread",
      "tool",
      "tools",
      "topic",
      "topics",
      "torrent",
      "trade",
      "travel",
      "tv",
      "txt",
      "type",
      "u",
      "upload",
      "uploads",
      "url",
      "urls",
      "user",
      "users",
      "v",
      "version",
      "video",
      "videos",
      "view",
      "vip",
      "vod",
      "watch",
      "web",
      "wenku",
      "wiki",
      "work",
      "www",
      "zh",
      "zh-cn",
      "zh-tw",
      "zip",
    ].sort(() => .5 - Math.random()).slice(0, t).join("/");
  return "/" === e ? `/${n}` : `/${n + e.replace("/?", "?")}`;
}
async function J(e, t, n = "https://cloudflare-dns.com/dns-query") {
  const s = performance.now();
  M(`[DoH查询] 开始查询 ${e} ${t} via ${n}`);
  try {
    const r = {
        A: 1,
        NS: 2,
        CNAME: 5,
        MX: 15,
        TXT: 16,
        AAAA: 28,
        SRV: 33,
        HTTPS: 65,
      }[t.toUpperCase()] || 1,
      a = ((e) => {
        const t = e.endsWith(".") ? e.slice(0, -1).split(".") : e.split("."),
          n = [];
        for (const e of t) {
          const t = (new TextEncoder()).encode(e);
          n.push(new Uint8Array([t.length]), t);
        }
        n.push(new Uint8Array([0]));
        const s = n.reduce((e, t) => e + t.length, 0), r = new Uint8Array(s);
        let a = 0;
        for (const e of n) r.set(e, a), a += e.length;
        return r;
      })(e),
      o = new Uint8Array(12 + a.length + 4),
      i = new DataView(o.buffer);
    i.setUint16(0, 0),
      i.setUint16(2, 256),
      i.setUint16(4, 1),
      o.set(a, 12),
      i.setUint16(12 + a.length, r),
      i.setUint16(12 + a.length + 2, 1),
      M(`[DoH查询] 发送查询报文 ${e} via ${n} (type=${r}, ${o.length}字节)`);
    const c = await fetch(n, {
      method: "POST",
      headers: {
        "Content-Type": "application/dns-message",
        Accept: "application/dns-message",
      },
      body: o,
    });
    if (!c.ok) {
      return console.warn(
        `[DoH查询] 请求失败 ${e} ${t} via ${n} 响应代码:${c.status}`,
      ),
        [];
    }
    const l = new Uint8Array(await c.arrayBuffer()),
      u = new DataView(l.buffer),
      d = u.getUint16(4),
      h = u.getUint16(6);
    M(`[DoH查询] 收到响应 ${e} ${t} via ${n} (${l.length}字节, ${h}条应答)`);
    const p = (e) => {
      const t = [];
      let n = e, s = !1, r = -1, a = 128;
      for (; n < l.length && a-- > 0;) {
        const e = l[n];
        if (0 === e) {
          s || (r = n + 1);
          break;
        }
        192 & ~e
          ? (t.push((new TextDecoder()).decode(l.slice(n + 1, n + 1 + e))),
            n += e + 1)
          : (s || (r = n + 2), n = (63 & e) << 8 | l[n + 1], s = !0);
      }
      return -1 === r && (r = n + 1), [t.join("."), r];
    };
    let f = 12;
    for (let e = 0; e < d; e++) {
      const [, e] = p(f);
      f = e + 4;
    }
    const g = [];
    for (let e = 0; e < h && f < l.length; e++) {
      const [e, t] = p(f);
      f = t;
      const n = u.getUint16(f);
      f += 2, f += 2;
      const s = u.getUint32(f);
      f += 4;
      const r = u.getUint16(f);
      f += 2;
      const a = l.slice(f, f + r);
      let o;
      if (f += r, 1 === n && 4 === r) o = `${a[0]}.${a[1]}.${a[2]}.${a[3]}`;
      else if (28 === n && 16 === r) {
        const e = [];
        for (let t = 0; t < 16; t += 2) {
          e.push((a[t] << 8 | a[t + 1]).toString(16));
        }
        o = e.join(":");
      } else if (16 === n) {
        let e = 0;
        const t = [];
        for (; e < r;) {
          const n = a[e++];
          t.push((new TextDecoder()).decode(a.slice(e, e + n))), e += n;
        }
        o = t.join("");
      } else if (5 === n) {
        const [e] = p(f - r);
        o = e;
      } else {o = Array.from(a).map((e) => e.toString(16).padStart(2, "0"))
          .join("");}
      g.push({ name: e, type: n, TTL: s, data: o, rdata: a });
    }
    return M(
      `[DoH查询] 查询完成 ${e} ${t} via ${n} ${
        (performance.now() - s).toFixed(2)
      }ms 共${g.length}条结果${
        g.length > 0
          ? "\n" +
            g.map((e, t) =>
              `  ${t + 1}. ${e.name} type=${e.type} TTL=${e.TTL} data=${e.data}`
            ).join("\n")
          : ""
      }`,
    ),
      g;
  } catch (r) {
    const a = (performance.now() - s).toFixed(2);
    return console.error(`[DoH查询] 查询失败 ${e} ${t} via ${n} ${a}ms:`, r),
      [];
  }
}
async function G(env, t, n, s = "Mozilla/5.0", i = !1) {
  const c = atob("UFJPWFlJUA=="),
    l = t,
    u = "https://dns.alidns.com/dns-query",
    h = "cloudflare-ech.com",
    p = "{{IP:PORT}}",
    f = performance.now(),
    g = {
      TIME: (new Date()).toISOString(),
      HOST: l,
      HOSTS: [t],
      UUID: n,
      PATH: "/",
      "协议类型": "vless",
      "传输协议": "ws",
      "gRPC模式": "gun",
      gRPCUserAgent: s,
      "跳过证书验证": !1,
      "启用0RTT": !1,
      "TLS分片": null,
      "随机路径": !1,
      ECH: !1,
      ECHConfig: { DNS: u, SNI: h },
      SS: { "加密方式": "aes-128-gcm", TLS: !0 },
      Fingerprint: "chrome",
      "优选订阅生成": {
        local: !0,
        "本地IP库": { "随机IP": !0, "随机数量": 16, "指定端口": -1 },
        SUB: null,
        SUBNAME: "edgetunnel",
        SUBUpdateTime: 3,
        TOKEN: await B(t + n),
      },
      "订阅转换配置": {
        SUBAPI: "https://SUBAPI.cmliussss.net",
        SUBCONFIG:
          "https://raw.githubusercontent.com/cmliu/ACL4SSR/refs/heads/main/Clash/config/ACL4SSR_Online_Mini_MultiMode_CF.ini",
        SUBEMOJI: !1,
      },
      "反代": {
        [c]: "auto",
        SOCKS5: { "启用": r, "全局": a, "账号": o, "白名单": d },
        "路径模板": {
          [c]: "proxyip=" + p,
          SOCKS5: { "全局": "socks5://" + p, "标准": "socks5=" + p },
          HTTP: { "全局": "http://" + p, "标准": "http=" + p },
        },
      },
      TG: { "启用": !1, BotToken: null, ChatID: null },
      CF: {
        Email: null,
        GlobalAPIKey: null,
        AccountID: null,
        APIToken: null,
        UsageAPI: null,
        Usage: { success: !1, pages: 0, workers: 0, total: 0, max: 1e5 },
      },
    };
  try {
    let t = await env.KV.get("config.json");
    t && 1 != i
      ? e = JSON.parse(t)
      : (await env.KV.put("config.json", JSON.stringify(g, null, 2)), e = g);
  } catch (t) {
    console.error(`读取config_JSON出错: ${t.message}`), e = g;
  }
  e.gRPCUserAgent || (e.gRPCUserAgent = s),
    e.HOST = l,
    e.HOSTS || (e.HOSTS = [t]),
    env.HOST &&
    (e.HOSTS = (await V(env.HOST)).map((e) =>
      e.toLowerCase().replace(/^https?:\/\//, "").split("/")[0].split(":")[0]
    )),
    e.UUID = n,
    e.随机路径 || (e.随机路径 = !1),
    e.启用0RTT || (e.启用0RTT = !1),
    env.PATH
      ? e.PATH = env.PATH.startsWith("/") ? env.PATH : "/" + env.PATH
      : e.PATH || (e.PATH = "/"),
    e.gRPC模式 || (e.gRPC模式 = "gun"),
    e.SS || (e.SS = { "加密方式": "aes-128-gcm", TLS: !1 }),
    e.反代.路径模板?.[c] ||
    (e.反代.路径模板 = {
      [c]: "proxyip=" + p,
      SOCKS5: { "全局": "socks5://" + p, "标准": "socks5=" + p },
      HTTP: { "全局": "http://" + p, "标准": "http=" + p },
    });
  const w = e.反代.路径模板[e.反代.SOCKS5.启用?.toUpperCase()];
  let m = "";
  w && e.反代.SOCKS5.账号
    ? m = (e.反代.SOCKS5.全局 ? w.全局 : w.标准).replace(p, e.反代.SOCKS5.账号)
    : "auto" !== e.反代[c] && (m = e.反代.路径模板[c].replace(p, e.反代[c]));
  let y = "";
  if (m.includes("?")) {
    const [e, t] = m.split("?");
    m = e, y = t;
  }
  e.PATH = e.PATH.replace(m, "").replace("//", "/");
  const b = "/" === e.PATH
      ? ""
      : e.PATH.replace(/\/+(?=\?|$)/, "").replace(/\/+$/, ""),
    [S, ...$] = b.split("?"),
    C = $.length ? "?" + $.join("?") : "",
    A = y ? C ? C + "&" + y : "?" + y : C;
  e.完整节点路径 = (S || "/") + (S && m ? "/" : "") + m + A +
    (e.启用0RTT ? (A ? "&" : "?") + "ed=2560" : ""),
    e.TLS分片 || null === e.TLS分片 || (e.TLS分片 = null);
  const U = "Shadowrocket" == e.TLS分片
    ? `&fragment=${encodeURIComponent("1,40-60,30-50,tlshello")}`
    : "Happ" == e.TLS分片
    ? `&fragment=${encodeURIComponent("3,1,tlshello")}`
    : "";
  e.Fingerprint || (e.Fingerprint = "chrome"),
    e.ECH || (e.ECH = !1),
    e.ECHConfig || (e.ECHConfig = { DNS: u, SNI: h });
  const T = e.ECH
      ? `&ech=${
        encodeURIComponent(
          (e.ECHConfig.SNI ? e.ECHConfig.SNI + "+" : "") + e.ECHConfig.DNS,
        )
      }`
      : "",
    k = "xhttp" === e.传输协议
      ? "xhttp&mode=stream-one"
      : "grpc" === e.传输协议
      ? "multi" === e.gRPC模式 ? "grpc&mode=multi" : "grpc&mode=gun"
      : "ws";
  e.LINK = "ss" === e.协议类型
    ? `${e.协议类型}://${btoa(e.SS.加密方式 + ":" + n)}@${l}:${
      e.SS.TLS ? "443" : "80"
    }?plugin=v2${
      encodeURIComponent(
        `ray-plugin;mode=websocket;host=${l};path=${
          (e.完整节点路径.includes("?")
            ? e.完整节点路径.replace("?", "?enc=" + e.SS.加密方式 + "&")
            : e.完整节点路径 + "?enc=" + e.SS.加密方式) +
          (e.SS.TLS ? ";tls" : "")
        };mux=0`,
      ) + T
    }#${encodeURIComponent(e.优选订阅生成.SUBNAME)}`
    : `${e.协议类型}://${n}@${l}:443?security=tls&type=${
      k + T
    }&host=${l}&fp=${e.Fingerprint}&sni=${l}&path=${
      encodeURIComponent(e.随机路径 ? K(e.完整节点路径) : e.完整节点路径) + U
    }&encryption=none${e.跳过证书验证 ? "&insecure=1&allowInsecure=1" : ""}#${
      encodeURIComponent(e.优选订阅生成.SUBNAME)
    }`, e.优选订阅生成.TOKEN = await B(t + n);
  const x = { BotToken: null, ChatID: null };
  e.TG = { "启用": !!e.TG.启用 && e.TG.启用, ...x };
  try {
    const t = await env.KV.get("tg.json");
    if (t) {
      const n = JSON.parse(t);
      e.TG.ChatID = n.ChatID ? n.ChatID : null,
        e.TG.BotToken = n.BotToken ? W(n.BotToken) : null;
    } else await env.KV.put("tg.json", JSON.stringify(x, null, 2));
  } catch (e) {
    console.error(`读取tg.json出错: ${e.message}`);
  }
  const P = {
    Email: null,
    GlobalAPIKey: null,
    AccountID: null,
    APIToken: null,
    UsageAPI: null,
  };
  e.CF = {
    ...P,
    Usage: { success: !1, pages: 0, workers: 0, total: 0, max: 1e5 },
  };
  try {
    const t = await env.KV.get("cf.json");
    if (t) {
      const n = JSON.parse(t);
      if (n.UsageAPI) {
        try {
          const t = await fetch(n.UsageAPI), s = await t.json();
          e.CF.Usage = s;
        } catch (e) {
          console.error(`请求 CF_JSON.UsageAPI 失败: ${e.message}`);
        }
      } else {
        e.CF.Email = n.Email ? n.Email : null,
          e.CF.GlobalAPIKey = n.GlobalAPIKey ? W(n.GlobalAPIKey) : null,
          e.CF.AccountID = n.AccountID ? W(n.AccountID) : null,
          e.CF.APIToken = n.APIToken ? W(n.APIToken) : null,
          e.CF.UsageAPI = null;
        const t = await te(n.Email, n.GlobalAPIKey, n.AccountID, n.APIToken);
        e.CF.Usage = t;
      }
    } else await env.KV.put("cf.json", JSON.stringify(P, null, 2));
  } catch (e) {
    console.error(`读取cf.json出错: ${e.message}`);
  }
  return e.加载时间 = (performance.now() - f).toFixed(2) + "ms", e;
}
async function q(e, t = 16, n = -1, s = !0) {
  const r = {
      9808: { file: "cmcc", name: "CF移动优选" },
      4837: { file: "cu", name: "CF联通优选" },
      17623: { file: "cu", name: "CF联通优选" },
      17816: { file: "cu", name: "CF联通优选" },
      4134: { file: "ct", name: "CF电信优选" },
    }[e.cf.asn],
    a = r
      ? `https://raw.githubusercontent.com/cmliu/cmliu/main/CF-CIDR/${r.file}.txt`
      : "https://raw.githubusercontent.com/cmliu/cmliu/main/CF-CIDR.txt",
    o = r?.name || "CF官方优选",
    i = s
      ? [443, 2053, 2083, 2087, 2096, 8443]
      : [80, 8080, 8880, 2052, 2082, 2086, 2095];
  let c = [];
  try {
    const e = await fetch(a);
    c = e.ok ? await V(await e.text()) : ["104.16.0.0/13"];
  } catch {
    c = ["104.16.0.0/13"];
  }
  const l = [443, 2053, 2083, 2087, 2096, 8443],
    u = [80, 2052, 2082, 2086, 2095, 8080],
    d = Array.from({ length: t }, (e, t) =>
      `${
        ((e) => {
          const [t, n] = e.split("/"),
            s = 32 - parseInt(n),
            r = ((t.split(".").reduce((e, t, n) =>
                  e | parseInt(t) << 24 - 8 * n, 0) & 4294967295 << s >>> 0) >>>
                  0) + Math.floor(Math.random() * Math.pow(2, s)) >>> 0;
          return [r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r].join(
            ".",
          );
        })(c[Math.floor(Math.random() * c.length)])
      }:${
        -1 === n
          ? i[Math.floor(Math.random() * i.length)]
          : s
          ? n
          : u[l.indexOf(Number(n))] ?? n
      }#${o}${t + 1}`);
  return [d, d.join("\n")];
}
async function V(e) {
  var t = e.replace(/[	"'\r\n]+/g, ",").replace(/,+/g, ",");
  "," == t.charAt(0) && (t = t.slice(1)),
    "," == t.charAt(t.length - 1) && (t = t.slice(0, t.length - 1));
  return t.split(",");
}
async function z(e) {
  let t = [],
    n = "",
    s = e.replace(/^sub:\/\//i, "https://").split("#")[0].split("?")[0];
  /^https?:\/\//i.test(s) || (s = `https://${s}`);
  try {
    s = new URL(s).origin;
  } catch (s) {
    return t.push(`127.0.0.1:1234#${e}优选订阅生成器格式化异常:${s.message}`),
      [t, n];
  }
  const r =
    `${s}/sub?host=example.com&uuid=00000000-0000-4000-8000-000000000000`;
  try {
    const s = await fetch(r, {
      headers: {
        "User-Agent": "v2rayN/edgetunnel (https://github.com/cmliu/edgetunnel)",
      },
    });
    if (!s.ok) {
      return t.push(`127.0.0.1:1234#${e}优选订阅生成器异常:${s.statusText}`),
        [t, n];
    }
    const a = atob(await s.text()),
      o = a.includes("\r\n") ? a.split("\r\n") : a.split("\n");
    for (const e of o) {
      if (e.trim()) {
        if (
          e.includes("00000000-0000-4000-8000-000000000000") &&
          e.includes("example.com")
        ) {
          const n = e.match(/:\/\/[^@]+@([^?]+)/);
          if (n) {
            let s = n[1], r = "";
            const a = e.match(/#(.+)$/);
            a && (r = "#" + decodeURIComponent(a[1])), t.push(s + r);
          }
        } else n += e + "\n";
      }
    }
  } catch (n) {
    t.push(`127.0.0.1:1234#${e}优选订阅生成器异常:${n.message}`);
  }
  return [t, n];
}
async function X(e, t = "443", n = 3e3) {
  if (!e?.length) return [[], [], [], []];
  const s = new Set(), r = new Set();
  let a = "";
  await Promise.allSettled(e.map(async (e) => {
    const o = e.indexOf("#"),
      i = o > -1 ? e.substring(0, o) : e,
      c = o > -1 ? decodeURIComponent(e.substring(o + 1)) : null,
      l = e.toLowerCase().includes("proxyip=true");
    if (i.toLowerCase().startsWith("sub://")) {
      try {
        const [e, t] = await z(i);
        if (c) {
          for (const t of e) {
            const e = t.includes("#") ? `${t} [${c}]` : `${t}#[${c}]`;
            s.add(e), l && r.add(t.split("#")[0]);
          }
        } else for (const t of e) s.add(t), l && r.add(t.split("#")[0]);
        if (t && "string" == typeof t && c) {
          const e = t.replace(
            /([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi,
            (e, t, n) =>
              `${
                t.includes("#")
                  ? `${t}${encodeURIComponent(` [${c}]`)}`
                  : `${t}${encodeURIComponent(`#[${c}]`)}`
              }${n}`,
          );
          a += e;
        } else t && "string" == typeof t && (a += t);
      } catch (e) {}
    } else {try {
        const e = new AbortController(),
          o = setTimeout(() => e.abort(), n),
          u = await fetch(i, { signal: e.signal });
        clearTimeout(o);
        let d = "";
        try {
          const e = await u.arrayBuffer(),
            t = (u.headers.get("content-type") || "").toLowerCase(),
            n = t.match(/charset=([^\s;]+)/i)?.[1]?.toLowerCase() || "";
          let s = ["utf-8", "gb2312"];
          (n.includes("gb") || n.includes("gbk") || n.includes("gb2312")) &&
            (s = ["gb2312", "utf-8"]);
          let r = !1;
          for (const t of s) {
            try {
              const n = new TextDecoder(t).decode(e);
              if (n && n.length > 0 && !n.includes("�")) {
                d = n, r = !0;
                break;
              }
              if (n && n.length > 0) continue;
            } catch (e) {
              continue;
            }
          }
          if (r || (d = await u.text()), !d || 0 === d.trim().length) return;
        } catch (e) {
          return void console.error("Failed to decode response:", e);
        }
        let h = d;
        const p = "string" == typeof d ? d.replace(/\s/g, "") : "";
        if (
          p.length > 0 && p.length % 4 == 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(p)
        ) {
          try {
            const e = new Uint8Array(
              atob(p).split("").map((e) => e.charCodeAt(0)),
            );
            h = new TextDecoder("utf-8").decode(e);
          } catch {}
        }
        if (h.split("#")[0].includes("://")) {
          if (c) {
            const e = h.replace(
              /([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi,
              (e, t, n) =>
                `${
                  t.includes("#")
                    ? `${t}${encodeURIComponent(` [${c}]`)}`
                    : `${t}${encodeURIComponent(`#[${c}]`)}`
                }${n}`,
            );
            a += e + "\n";
          } else a += h + "\n";
          return;
        }
        const f = d.trim().split("\n").map((e) => e.trim()).filter((e) => e),
          g = f.length > 1 && f[0].includes(","),
          w = /^[^\[\]]*:[^\[\]]*:[^\[\]]/,
          m = new URL(i);
        if (g) {
          const e = f[0].split(",").map((e) => e.trim()), n = f.slice(1);
          if (
            e.includes("IP地址") && e.includes("端口") && e.includes("数据中心")
          ) {
            const t = e.indexOf("IP地址"),
              a = e.indexOf("端口"),
              o = e.indexOf("国家") > -1
                ? e.indexOf("国家")
                : e.indexOf("城市") > -1
                ? e.indexOf("城市")
                : e.indexOf("数据中心"),
              i = e.indexOf("TLS");
            n.forEach((e) => {
              const n = e.split(",").map((e) => e.trim());
              if (-1 !== i && "true" !== n[i]?.toLowerCase()) return;
              const u = w.test(n[t]) ? `[${n[t]}]` : n[t],
                d = `${u}:${n[a]}#${n[o]}`;
              if (c) {
                const e = `${d} [${c}]`;
                s.add(e);
              } else s.add(d);
              l && r.add(`${u}:${n[a]}`);
            });
          } else if (
            e.some((e) => e.includes("IP")) && e.some((e) =>
              e.includes("延迟")
            ) && e.some((e) => e.includes("下载速度"))
          ) {
            const a = e.findIndex((e) => e.includes("IP")),
              o = e.findIndex((e) => e.includes("延迟")),
              i = e.findIndex((e) => e.includes("下载速度")),
              u = m.searchParams.get("port") || t;
            n.forEach((e) => {
              const t = e.split(",").map((e) => e.trim()),
                n = w.test(t[a]) ? `[${t[a]}]` : t[a],
                d = `${n}:${u}#CF优选 ${t[o]}ms ${t[i]}MB/s`;
              if (c) {
                const e = `${d} [${c}]`;
                s.add(e);
              } else s.add(d);
              l && r.add(`${n}:${u}`);
            });
          }
        } else {f.forEach((e) => {
            const n = e.indexOf("#"),
              [a, o] = n > -1 ? [e.substring(0, n), e.substring(n)] : [e, ""];
            let i = !1;
            if (a.startsWith("[")) i = /\]:(\d+)$/.test(a);
            else {
              const e = a.lastIndexOf(":");
              i = e > -1 && /^\d+$/.test(a.substring(e + 1));
            }
            const u = m.searchParams.get("port") || t,
              d = i ? e : `${a}:${u}${o}`;
            if (c) {
              const e = d.includes("#") ? `${d} [${c}]` : `${d}#[${c}]`;
              s.add(e);
            } else s.add(d);
            l && r.add(d.split("#")[0]);
          });}
      } catch (e) {}}
  }));
  const o = a.trim()
    ? [...new Set(a.split(/\r?\n/).filter((e) => "" !== e.trim()))]
    : [];
  return [Array.from(s), o, [], Array.from(r)];
}
async function Y(e) {
  const { searchParams: t } = e,
    n = decodeURIComponent(e.pathname),
    c = n.toLowerCase();
  o = t.get("socks5") || t.get("http") || t.get("https") || null,
    a = t.has("globalproxy"),
    t.get("socks5")
      ? r = "socks5"
      : t.get("http")
      ? r = "http"
      : t.get("https") && (r = "https");
  const u = (e, t = !0) => {
      const n = /^(socks5|http|https):\/\/(.+)$/i.exec(e || "");
      return !!n &&
        (r = n[1].toLowerCase(), o = n[2].split("/")[0], t && (a = !0), !0);
    },
    d = (e) => {
      s = e, l = !1;
    },
    h = t.get("proxyip");
  if (null !== h) { if (!u(h)) return d(h); }
  else {
    let e = /\/(socks5?|http|https):\/?\/?([^/?#\s]+)/i.exec(n);
    if (e) {
      const t = e[1].toLowerCase();
      r = "http" === t ? "http" : "https" === t ? "https" : "socks5",
        o = e[2].split("/")[0],
        a = !0;
    } else if (e = /\/(g?s5|socks5|g?http|g?https)=([^/?#\s]+)/i.exec(n)) {
      const t = e[1].toLowerCase();
      o = e[2].split("/")[0],
        r = t.includes("https")
          ? "https"
          : t.includes("http")
          ? "http"
          : "socks5",
        t.startsWith("g") && (a = !0);
    } else if (e = /\/(proxyip[.=]|pyip=|ip=)([^?#\s]+)/.exec(c)) {
      const t = ((e) => {
        if (!e.includes("://")) {
          const t = e.indexOf("/");
          return t > 0 ? e.slice(0, t) : e;
        }
        const t = e.split("://");
        if (2 !== t.length) return e;
        const n = t[1].indexOf("/");
        return n > 0 ? `${t[0]}://${t[1].slice(0, n)}` : e;
      })(e[2]);
      if (!u(t)) return d(t);
    }
  }
  if (o) {
    try {
      i = await ee(o, "https" === r ? 443 : 80),
        r = t.get("socks5")
          ? "socks5"
          : t.get("http")
          ? "http"
          : t.get("https")
          ? "https"
          : r || "socks5";
    } catch (e) {
      console.error("解析SOCKS5地址失败:", e.message), r = null;
    }
  } else r = null;
}
const Z = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i,
  Q = /^\[.*\]$/;
function ee(e, t = 80) {
  const n = e.lastIndexOf("@");
  if (-1 !== n) {
    let t = e.slice(0, n).replaceAll("%3D", "=");
    !t.includes(":") && Z.test(t) && (t = atob(t)),
      e = `${t}@${e.slice(n + 1)}`;
  }
  const s = e.lastIndexOf("@"),
    r = -1 === s ? e : e.slice(s + 1),
    a = -1 === s ? "" : e.slice(0, s),
    [o, i] = a ? a.split(":") : [];
  if (a && !i) {
    throw new Error(
      '无效的 SOCKS 地址格式：认证部分必须是 "username:password" 的形式',
    );
  }
  let c = r, l = t;
  if (r.includes("]:")) {
    const [e, t = ""] = r.split("]:");
    c = e + "]", l = Number(t.replace(/[^\d]/g, ""));
  } else if (!r.startsWith("[")) {
    const e = r.split(":");
    2 === e.length && (c = e[0], l = Number(e[1].replace(/[^\d]/g, "")));
  }
  if (isNaN(l)) throw new Error("无效的 SOCKS 地址格式：端口号必须是数字");
  if (c.includes(":") && !Q.test(c)) {
    throw new Error(
      "无效的 SOCKS 地址格式：IPv6 地址必须用方括号括起来，如 [2001:db8::1]",
    );
  }
  return { username: o, password: i, hostname: c, port: l };
}
async function te(e, t, n, s) {
  const r = "https://api.cloudflare.com/client/v4",
    a = (e) => e?.reduce((e, t) => e + (t?.sum?.requests || 0), 0) || 0,
    o = { "Content-Type": "application/json" };
  try {
    if (!(n || e && t)) {
      return { success: !1, pages: 0, workers: 0, total: 0, max: 1e5 };
    }
    if (!n) {
      const s = await fetch(`${r}/accounts`, {
        method: "GET",
        headers: { ...o, "X-AUTH-EMAIL": e, "X-AUTH-KEY": t },
      });
      if (!s.ok) throw new Error(`账户获取失败: ${s.status}`);
      const a = await s.json();
      if (!a?.result?.length) throw new Error("未找到账户");
      const i = a.result.findIndex((t) =>
        t.name?.toLowerCase().startsWith(e.toLowerCase())
      );
      n = a.result[i >= 0 ? i : 0]?.id;
    }
    const i = new Date();
    i.setUTCHours(0, 0, 0, 0);
    const c = s
        ? { ...o, Authorization: `Bearer ${s}` }
        : { ...o, "X-AUTH-EMAIL": e, "X-AUTH-KEY": t },
      l = await fetch(`${r}/graphql`, {
        method: "POST",
        headers: c,
        body: JSON.stringify({
          query:
            "query getBillingMetrics($AccountID: String!, $filter: AccountWorkersInvocationsAdaptiveFilter_InputObject) {\n\t\t\t\t\tviewer { accounts(filter: {accountTag: $AccountID}) {\n\t\t\t\t\t\tpagesFunctionsInvocationsAdaptiveGroups(limit: 1000, filter: $filter) { sum { requests } }\n\t\t\t\t\t\tworkersInvocationsAdaptive(limit: 10000, filter: $filter) { sum { requests } }\n\t\t\t\t\t} }\n\t\t\t\t}",
          variables: {
            AccountID: n,
            filter: {
              datetime_geq: i.toISOString(),
              datetime_leq: (new Date()).toISOString(),
            },
          },
        }),
      });
    if (!l.ok) throw new Error(`查询失败: ${l.status}`);
    const u = await l.json();
    if (u.errors?.length) throw new Error(u.errors[0].message);
    const d = u?.data?.viewer?.accounts?.[0];
    if (!d) throw new Error("未找到账户数据");
    const h = a(d.pagesFunctionsInvocationsAdaptiveGroups),
      p = a(d.workersInvocationsAdaptive),
      f = h + p,
      g = 1e5;
    return M(`统计结果 - Pages: ${h}, Workers: ${p}, 总计: ${f}, 上限: 100000`),
      { success: !0, pages: h, workers: p, total: f, max: g };
  } catch (e) {
    return console.error("获取使用量错误:", e.message),
      { success: !1, pages: 0, workers: 0, total: 0, max: 1e5 };
  }
}
function ne(e) {
  const t = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298,
    ],
    n = (e, t) => (e >>> t | e << 32 - t) >>> 0,
    s = 8 * (e = unescape(encodeURIComponent(e))).length;
  for (e += String.fromCharCode(128); 8 * e.length % 512 != 448;) {
    e += String.fromCharCode(0);
  }
  const r = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428,
    ],
    a = Math.floor(s / 4294967296),
    o = 4294967295 & s;
  e += String.fromCharCode(
    a >>> 24 & 255,
    a >>> 16 & 255,
    a >>> 8 & 255,
    255 & a,
    o >>> 24 & 255,
    o >>> 16 & 255,
    o >>> 8 & 255,
    255 & o,
  );
  const i = [];
  for (let t = 0; t < e.length; t += 4) {
    i.push(
      e.charCodeAt(t) << 24 | e.charCodeAt(t + 1) << 16 |
        e.charCodeAt(t + 2) << 8 | e.charCodeAt(t + 3),
    );
  }
  for (let e = 0; e < i.length; e += 16) {
    const s = new Array(64).fill(0);
    for (let t = 0; t < 16; t++) s[t] = i[e + t];
    for (let e = 16; e < 64; e++) {
      const t = n(s[e - 15], 7) ^ n(s[e - 15], 18) ^ s[e - 15] >>> 3,
        r = n(s[e - 2], 17) ^ n(s[e - 2], 19) ^ s[e - 2] >>> 10;
      s[e] = s[e - 16] + t + s[e - 7] + r >>> 0;
    }
    let [a, o, c, l, u, d, h, p] = r;
    for (let e = 0; e < 64; e++) {
      const r = p + (n(u, 6) ^ n(u, 11) ^ n(u, 25)) + (u & d ^ ~u & h) + t[e] +
            s[e] >>> 0,
        i = a & o ^ a & c ^ o & c;
      p = h,
        h = d,
        d = u,
        u = l + r >>> 0,
        l = c,
        c = o,
        o = a,
        a = r + ((n(a, 2) ^ n(a, 13) ^ n(a, 22)) + i >>> 0) >>> 0;
    }
    for (let e = 0; e < 8; e++) {
      r[e] = r[e] + (0 === e
            ? a
            : 1 === e
            ? o
            : 2 === e
            ? c
            : 3 === e
            ? l
            : 4 === e
            ? u
            : 5 === e
            ? d
            : 6 === e
            ? h
            : p) >>> 0;
    }
  }
  let c = "";
  for (let e = 0; e < 7; e++) {
    for (let t = 24; t >= 0; t -= 8) {
      c += (r[e] >>> t & 255).toString(16).padStart(2, "0");
    }
  }
  return c;
}
async function se(e = "socks5", t) {
  const n = Date.now();
  try {
    i = await ee(t, "https" === e ? 443 : 80);
  } catch (s) {
    return {
      success: !1,
      error: s.message,
      proxy: e + "://" + t,
      responseTime: Date.now() - n,
    };
  }
  const { username: s, password: r, hostname: a, port: o } = i,
    c = s && r ? `${s}:${r}@${a}:${o}` : `${a}:${o}`;
  try {
    const t = new Uint8Array(0),
      s = "socks5" === e
        ? await H("check.socks5.090227.xyz", 80, t)
        : "https" === e
        ? await _("check.socks5.090227.xyz", 80, t, !0)
        : await _("check.socks5.090227.xyz", 80, t);
    if (!s) {
      return {
        success: !1,
        error: "无法连接到代理服务器",
        proxy: e + "://" + c,
        responseTime: Date.now() - n,
      };
    }
    try {
      const t = s.writable.getWriter(), r = new TextEncoder();
      await t.write(
        r.encode(
          "GET /cdn-cgi/trace HTTP/1.1\r\nHost: check.socks5.090227.xyz\r\nConnection: close\r\n\r\n",
        ),
      ), t.releaseLock();
      const a = s.readable.getReader(), o = new TextDecoder();
      let i = "";
      try {
        for (;;) {
          const { done: e, value: t } = await a.read();
          if (e) break;
          i += o.decode(t, { stream: !0 });
        }
      } finally {
        a.releaseLock();
      }
      return await s.close(), {
        success: !0,
        proxy: e + "://" + c,
        ip: i.match(/ip=(.*)/)[1],
        loc: i.match(/loc=(.*)/)[1],
        responseTime: Date.now() - n,
      };
    } catch (t) {
      try {
        await s.close();
      } catch (e) {
        M("关闭连接时出错:", e);
      }
      return {
        success: !1,
        error: t.message,
        proxy: e + "://" + c,
        responseTime: Date.now() - n,
      };
    }
  } catch (t) {
    return {
      success: !1,
      error: t.message,
      proxy: e + "://" + c,
      responseTime: Date.now() - n,
    };
  }
}
export { p as default };
