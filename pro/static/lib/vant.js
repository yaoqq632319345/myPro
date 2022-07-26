!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports, require('vue'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'vue'], t)
    : t(
        ((e = 'undefined' != typeof globalThis ? globalThis : e || self).vant =
          {}),
        e.Vue
      );
})(this, function (e, t) {
  'use strict';
  function o() {}
  const n = Object.assign,
    a = 'undefined' != typeof window;
  function r(e, t) {
    const o = t.split('.');
    let n = e;
    return (
      o.forEach((e) => {
        var t;
        n = null != (t = n[e]) ? t : '';
      }),
      n
    );
  }
  function l(e, t, o) {
    return t.reduce((t, n) => ((o && void 0 === e[n]) || (t[n] = e[n]), t), {});
  }
  const i = (e) => (Array.isArray(e) ? e : [e]),
    s = null,
    c = [Number, String],
    d = { type: Boolean, default: !0 },
    u = (e) => ({ type: e, required: !0 }),
    p = () => ({ type: Array, default: () => [] }),
    m = (e) => ({ type: Number, default: e }),
    f = (e) => ({ type: c, default: e }),
    v = (e) => ({ type: String, default: e });
  var h = 'undefined' != typeof window;
  function g(e) {
    return h ? requestAnimationFrame(e) : -1;
  }
  function b(e) {
    h && cancelAnimationFrame(e);
  }
  function y(e) {
    g(() => g(e));
  }
  var w = (e, t) => ({
      top: 0,
      left: 0,
      right: e,
      bottom: t,
      width: e,
      height: t,
    }),
    x = (e) => {
      const o = t.unref(e);
      if (o === window) {
        const e = o.innerWidth,
          t = o.innerHeight;
        return w(e, t);
      }
      return (null == o ? void 0 : o.getBoundingClientRect)
        ? o.getBoundingClientRect()
        : w(0, 0);
    };
  function V(e) {
    const o = t.inject(e, null);
    if (o) {
      const e = t.getCurrentInstance(),
        { link: n, unlink: a, internalChildren: r } = o;
      n(e), t.onUnmounted(() => a(e));
      return { parent: o, index: t.computed(() => r.indexOf(e)) };
    }
    return { parent: null, index: t.ref(-1) };
  }
  function N(e, o, n) {
    const a = (function (e) {
      const o = [],
        n = (e) => {
          Array.isArray(e) &&
            e.forEach((e) => {
              var a;
              t.isVNode(e) &&
                (o.push(e),
                (null == (a = e.component) ? void 0 : a.subTree) &&
                  (o.push(e.component.subTree),
                  n(e.component.subTree.children)),
                e.children && n(e.children));
            });
        };
      return n(e), o;
    })(e.subTree.children);
    n.sort((e, t) => a.indexOf(e.vnode) - a.indexOf(t.vnode));
    const r = n.map((e) => e.proxy);
    o.sort((e, t) => r.indexOf(e) - r.indexOf(t));
  }
  function C(e) {
    const o = t.reactive([]),
      n = t.reactive([]),
      a = t.getCurrentInstance();
    return {
      children: o,
      linkChildren: (r) => {
        t.provide(
          e,
          Object.assign(
            {
              link: (e) => {
                e.proxy && (n.push(e), o.push(e.proxy), N(a, o, n));
              },
              unlink: (e) => {
                const t = n.indexOf(e);
                o.splice(t, 1), n.splice(t, 1);
              },
              children: o,
              internalChildren: n,
            },
            r
          )
        );
      },
    };
  }
  var k,
    S,
    T = 1e3,
    B = 6e4,
    D = 36e5,
    O = 24 * D;
  function I(e) {
    let o, n, a, r;
    const l = t.ref(e.time),
      i = t.computed(() => {
        return {
          total: (e = l.value),
          days: Math.floor(e / O),
          hours: Math.floor((e % O) / D),
          minutes: Math.floor((e % D) / B),
          seconds: Math.floor((e % B) / T),
          milliseconds: Math.floor(e % T),
        };
        var e;
      }),
      s = () => {
        (a = !1), b(o);
      },
      c = () => Math.max(n - Date.now(), 0),
      d = (t) => {
        var o, n;
        (l.value = t),
          null == (o = e.onChange) || o.call(e, i.value),
          0 === t && (s(), null == (n = e.onFinish) || n.call(e));
      },
      u = () => {
        o = g(() => {
          a && (d(c()), l.value > 0 && u());
        });
      },
      p = () => {
        o = g(() => {
          if (a) {
            const o = c();
            (e = o),
              (t = l.value),
              (Math.floor(e / 1e3) !== Math.floor(t / 1e3) || 0 === o) && d(o),
              l.value > 0 && p();
          }
          var e, t;
        });
      },
      m = () => {
        h && (e.millisecond ? u() : p());
      };
    return (
      t.onBeforeUnmount(s),
      t.onActivated(() => {
        r && ((a = !0), (r = !1), m());
      }),
      t.onDeactivated(() => {
        a && (s(), (r = !0));
      }),
      {
        start: () => {
          a || ((n = Date.now() + l.value), (a = !0), m());
        },
        pause: s,
        reset: (t = e.time) => {
          s(), (l.value = t);
        },
        current: i,
      }
    );
  }
  function A(e) {
    let o;
    t.onMounted(() => {
      e(),
        t.nextTick(() => {
          o = !0;
        });
    }),
      t.onActivated(() => {
        o && e();
      });
  }
  function P(e, o, n = {}) {
    if (!h) return;
    const { target: a = window, passive: r = !1, capture: l = !1 } = n;
    let i;
    const s = (n) => {
        const a = t.unref(n);
        a &&
          !i &&
          (a.addEventListener(e, o, { capture: l, passive: r }), (i = !0));
      },
      c = (n) => {
        const a = t.unref(n);
        a && i && (a.removeEventListener(e, o, l), (i = !1));
      };
    t.onUnmounted(() => c(a)),
      t.onDeactivated(() => c(a)),
      A(() => s(a)),
      t.isRef(a) &&
        t.watch(a, (e, t) => {
          c(t), s(e);
        });
  }
  function z(e, o, n = {}) {
    if (!h) return;
    const { eventName: a = 'click' } = n;
    P(
      a,
      (n) => {
        const a = t.unref(e);
        a && !a.contains(n.target) && o(n);
      },
      { target: document }
    );
  }
  var E,
    $ = /scroll|auto|overlay/i,
    M = h ? window : void 0;
  function L(e) {
    return 'HTML' !== e.tagName && 'BODY' !== e.tagName && 1 === e.nodeType;
  }
  function F(e, t = M) {
    let o = e;
    for (; o && o !== t && L(o); ) {
      const { overflowY: e } = window.getComputedStyle(o);
      if ($.test(e)) return o;
      o = o.parentNode;
    }
    return t;
  }
  function H(e, o = M) {
    const n = t.ref();
    return (
      t.onMounted(() => {
        e.value && (n.value = F(e.value, o));
      }),
      n
    );
  }
  var R = Symbol('van-field');
  function j(e) {
    const o = t.inject(R, null);
    o &&
      !o.customValue.value &&
      ((o.customValue.value = e),
      t.watch(e, () => {
        o.resetValidation(), o.validateWithTrigger('onChange');
      }));
  }
  const W = (e) => null != e,
    q = (e) => 'function' == typeof e,
    U = (e) => null !== e && 'object' == typeof e,
    Y = (e) => U(e) && q(e.then) && q(e.catch),
    X = (e) =>
      '[object Date]' === Object.prototype.toString.call(e) &&
      !Number.isNaN(e.getTime());
  function G(e) {
    return (
      (e = e.replace(/[^-|\d]/g, '')),
      /^((\+86)|(86))?(1)\d{10}$/.test(e) || /^0[0-9-]{10,13}$/.test(e)
    );
  }
  const _ = (e) => 'number' == typeof e || /^\d+(\.\d+)?$/.test(e);
  function Z(e) {
    const t = 'scrollTop' in e ? e.scrollTop : e.pageYOffset;
    return Math.max(t, 0);
  }
  function K(e, t) {
    'scrollTop' in e ? (e.scrollTop = t) : e.scrollTo(e.scrollX, t);
  }
  function J() {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }
  function Q(e) {
    K(window, e), K(document.body, e);
  }
  function ee(e, t) {
    if (e === window) return 0;
    const o = t ? Z(t) : J();
    return x(e).top + o;
  }
  const te =
    !!a && /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  function oe() {
    te && Q(J());
  }
  const ne = (e) => e.stopPropagation();
  function ae(e, t) {
    ('boolean' != typeof e.cancelable || e.cancelable) && e.preventDefault(),
      t && ne(e);
  }
  function re(e) {
    const o = t.unref(e);
    if (!o) return !1;
    const n = window.getComputedStyle(o),
      a = 'none' === n.display,
      r = null === o.offsetParent && 'fixed' !== n.position;
    return a || r;
  }
  const { width: le, height: ie } = (function () {
    if (!k && ((k = t.ref(0)), (S = t.ref(0)), h)) {
      const e = () => {
        (k.value = window.innerWidth), (S.value = window.innerHeight);
      };
      e(),
        window.addEventListener('resize', e, { passive: !0 }),
        window.addEventListener('orientationchange', e, { passive: !0 });
    }
    return { width: k, height: S };
  })();
  function se(e) {
    if (W(e)) return _(e) ? `${e}px` : String(e);
  }
  function ce(e) {
    if (W(e)) {
      if (Array.isArray(e)) return { width: se(e[0]), height: se(e[1]) };
      const t = se(e);
      return { width: t, height: t };
    }
  }
  function de(e) {
    const t = {};
    return void 0 !== e && (t.zIndex = +e), t;
  }
  let ue;
  function pe(e) {
    return (
      +(e = e.replace(/rem/g, '')) *
      (function () {
        if (!ue) {
          const e = document.documentElement,
            t = e.style.fontSize || window.getComputedStyle(e).fontSize;
          ue = parseFloat(t);
        }
        return ue;
      })()
    );
  }
  function me(e) {
    if ('number' == typeof e) return e;
    if (a) {
      if (e.includes('rem')) return pe(e);
      if (e.includes('vw'))
        return (function (e) {
          return (+(e = e.replace(/vw/g, '')) * le.value) / 100;
        })(e);
      if (e.includes('vh'))
        return (function (e) {
          return (+(e = e.replace(/vh/g, '')) * ie.value) / 100;
        })(e);
    }
    return parseFloat(e);
  }
  const fe = /-(\w)/g,
    ve = (e) => e.replace(fe, (e, t) => t.toUpperCase());
  function he(e, t = 2) {
    let o = e + '';
    for (; o.length < t; ) o = '0' + o;
    return o;
  }
  const ge = (e, t, o) => Math.min(Math.max(e, t), o);
  function be(e, t, o) {
    const n = e.indexOf(t);
    return -1 === n
      ? e
      : '-' === t && 0 !== n
      ? e.slice(0, n)
      : e.slice(0, n + 1) + e.slice(n).replace(o, '');
  }
  function ye(e, t = !0, o = !0) {
    e = t ? be(e, '.', /\./g) : e.split('.')[0];
    const n = t ? /[^-0-9.]/g : /[^-0-9]/g;
    return (e = o ? be(e, '-', /-/g) : e.replace(/-/, '')).replace(n, '');
  }
  function we(e, t) {
    const o = 10 ** 10;
    return Math.round((e + t) * o) / o;
  }
  const { hasOwnProperty: xe } = Object.prototype;
  function Ve(e, t) {
    return (
      Object.keys(t).forEach((o) => {
        !(function (e, t, o) {
          const n = t[o];
          W(n) &&
            (xe.call(e, o) && U(n) ? (e[o] = Ve(Object(e[o]), n)) : (e[o] = n));
        })(e, t, o);
      }),
      e
    );
  }
  const Ne = t.ref('zh-CN'),
    Ce = t.reactive({
      'zh-CN': {
        name: '姓名',
        tel: '电话',
        save: '保存',
        confirm: '确认',
        cancel: '取消',
        delete: '删除',
        loading: '加载中...',
        noCoupon: '暂无优惠券',
        nameEmpty: '请填写姓名',
        addContact: '添加联系人',
        telInvalid: '请填写正确的电话',
        vanCalendar: {
          end: '结束',
          start: '开始',
          title: '日期选择',
          weekdays: ['日', '一', '二', '三', '四', '五', '六'],
          monthTitle: (e, t) => `${e}年${t}月`,
          rangePrompt: (e) => `最多选择 ${e} 天`,
        },
        vanCascader: { select: '请选择' },
        vanPagination: { prev: '上一页', next: '下一页' },
        vanPullRefresh: {
          pulling: '下拉即可刷新...',
          loosing: '释放即可刷新...',
        },
        vanSubmitBar: { label: '合计:' },
        vanCoupon: {
          unlimited: '无门槛',
          discount: (e) => `${e}折`,
          condition: (e) => `满${e}元可用`,
        },
        vanCouponCell: { title: '优惠券', count: (e) => `${e}张可用` },
        vanCouponList: {
          exchange: '兑换',
          close: '不使用',
          enable: '可用',
          disabled: '不可用',
          placeholder: '输入优惠码',
        },
        vanAddressEdit: {
          area: '地区',
          postal: '邮政编码',
          areaEmpty: '请选择地区',
          addressEmpty: '请填写详细地址',
          postalEmpty: '邮政编码不正确',
          addressDetail: '详细地址',
          defaultAddress: '设为默认收货地址',
        },
        vanAddressList: { add: '新增地址' },
      },
    }),
    ke = {
      messages: () => Ce[Ne.value],
      use(e, t) {
        (Ne.value = e), this.add({ [e]: t });
      },
      add(e = {}) {
        Ve(Ce, e);
      },
    };
  var Se = ke;
  function Te(e) {
    const t = ve(e) + '.';
    return (e, ...o) => {
      const n = Se.messages(),
        a = r(n, t + e) || r(n, e);
      return q(a) ? a(...o) : a;
    };
  }
  function Be(e, t) {
    return t
      ? 'string' == typeof t
        ? ` ${e}--${t}`
        : Array.isArray(t)
        ? t.reduce((t, o) => t + Be(e, o), '')
        : Object.keys(t).reduce((o, n) => o + (t[n] ? Be(e, n) : ''), '')
      : '';
  }
  function De(e) {
    return (t, o) => (
      t && 'string' != typeof t && ((o = t), (t = '')),
      `${(t = t ? `${e}__${t}` : e)}${Be(t, o)}`
    );
  }
  function Oe(e) {
    const t = `van-${e}`;
    return [t, De(t), Te(t)];
  }
  const Ie = 'van-hairline',
    Ae = `${Ie}--top`,
    Pe = `${Ie}--left`,
    ze = `${Ie}--bottom`,
    Ee = `${Ie}--surround`,
    $e = `${Ie}--top-bottom`,
    Me = `${Ie}-unset--top-bottom`,
    Le = 'van-haptics-feedback',
    Fe = Symbol('van-form');
  function He(e, { args: t = [], done: n, canceled: a }) {
    if (e) {
      const r = e.apply(null, t);
      Y(r)
        ? r
            .then((e) => {
              e ? n() : a && a();
            })
            .catch(o)
        : r
        ? n()
        : a && a();
    } else n();
  }
  function Re(e) {
    return (
      (e.install = (t) => {
        const { name: o } = e;
        t.component(o, e), t.component(ve(`-${o}`), e);
      }),
      e
    );
  }
  const je = (e, o) => {
    const n = t.ref(),
      a = () => {
        n.value = x(e).height;
      };
    return (
      t.onMounted(() => {
        if ((t.nextTick(a), o))
          for (let e = 1; e <= 3; e++) setTimeout(a, 100 * e);
      }),
      n
    );
  };
  function We(e, o) {
    const n = je(e, !0);
    return (e) =>
      t.createVNode(
        'div',
        {
          class: o('placeholder'),
          style: { height: n.value ? `${n.value}px` : void 0 },
        },
        [e()]
      );
  }
  const [qe, Ue] = Oe('action-bar'),
    Ye = Symbol(qe),
    Xe = { placeholder: Boolean, safeAreaInsetBottom: d };
  const Ge = Re(
    t.defineComponent({
      name: qe,
      props: Xe,
      setup(e, { slots: o }) {
        const n = t.ref(),
          a = We(n, Ue),
          { linkChildren: r } = C(Ye);
        r();
        const l = () => {
          var a;
          return t.createVNode(
            'div',
            {
              ref: n,
              class: [Ue(), { 'van-safe-area-bottom': e.safeAreaInsetBottom }],
            },
            [null == (a = o.default) ? void 0 : a.call(o)]
          );
        };
        return () => (e.placeholder ? a(l) : l());
      },
    })
  );
  function _e(e) {
    const o = t.getCurrentInstance();
    o && n(o.proxy, e);
  }
  const Ze = { to: [String, Object], url: String, replace: Boolean };
  function Ke({ to: e, url: t, replace: o, $router: n }) {
    e && n
      ? n[o ? 'replace' : 'push'](e)
      : t && (o ? location.replace(t) : (location.href = t));
  }
  function Je() {
    const e = t.getCurrentInstance().proxy;
    return () => Ke(e);
  }
  const [Qe, et] = Oe('badge'),
    tt = {
      dot: Boolean,
      max: c,
      tag: v('div'),
      color: String,
      offset: Array,
      content: c,
      showZero: d,
      position: v('top-right'),
    };
  const ot = Re(
      t.defineComponent({
        name: Qe,
        props: tt,
        setup(e, { slots: o }) {
          const n = () => {
              if (o.content) return !0;
              const { content: t, showZero: n } = e;
              return W(t) && '' !== t && (n || 0 !== t);
            },
            a = () => {
              const { dot: t, max: a, content: r } = e;
              if (!t && n())
                return o.content
                  ? o.content()
                  : W(a) && _(r) && +r > a
                  ? `${a}+`
                  : r;
            },
            r = t.computed(() => {
              const t = { background: e.color };
              if (e.offset) {
                const [n, a] = e.offset;
                o.default
                  ? ((t.top = se(a)),
                    (t.right =
                      'number' == typeof n
                        ? se(-n)
                        : n.startsWith('-')
                        ? n.replace('-', '')
                        : `-${n}`))
                  : ((t.marginTop = se(a)), (t.marginLeft = se(n)));
              }
              return t;
            }),
            l = () => {
              if (n() || e.dot)
                return t.createVNode(
                  'div',
                  {
                    class: et([e.position, { dot: e.dot, fixed: !!o.default }]),
                    style: r.value,
                  },
                  [a()]
                );
            };
          return () => {
            if (o.default) {
              const { tag: n } = e;
              return t.createVNode(
                n,
                { class: et('wrapper') },
                { default: () => [o.default(), l()] }
              );
            }
            return l();
          };
        },
      })
    ),
    [nt, at] = Oe('config-provider'),
    rt = Symbol(nt),
    lt = { tag: v('div'), themeVars: Object, iconPrefix: String };
  var it = t.defineComponent({
    name: nt,
    props: lt,
    setup(e, { slots: o }) {
      const n = t.computed(() => {
        if (e.themeVars)
          return (function (e) {
            const t = {};
            return (
              Object.keys(e).forEach((o) => {
                var n;
                t[
                  `--van-${
                    ((n = o),
                    n
                      .replace(/([A-Z])/g, '-$1')
                      .toLowerCase()
                      .replace(/^-/, ''))
                  }`
                ] = e[o];
              }),
              t
            );
          })(e.themeVars);
      });
      return (
        t.provide(rt, e),
        () =>
          t.createVNode(
            e.tag,
            { class: at(), style: n.value },
            {
              default: () => {
                var e;
                return [null == (e = o.default) ? void 0 : e.call(o)];
              },
            }
          )
      );
    },
  });
  const [st, ct] = Oe('icon'),
    dt = {
      dot: Boolean,
      tag: v('i'),
      name: String,
      size: c,
      badge: c,
      color: String,
      badgeProps: Object,
      classPrefix: String,
    };
  const ut = Re(
      t.defineComponent({
        name: st,
        props: dt,
        setup(e, { slots: o }) {
          const n = t.inject(rt, null),
            a = t.computed(
              () => e.classPrefix || (null == n ? void 0 : n.iconPrefix) || ct()
            );
          return () => {
            const { tag: n, dot: r, name: l, size: i, badge: s, color: c } = e,
              d = ((e) => (null == e ? void 0 : e.includes('/')))(l);
            return t.createVNode(
              ot,
              t.mergeProps(
                {
                  dot: r,
                  tag: n,
                  class: [a.value, d ? '' : `${a.value}-${l}`],
                  style: { color: c, fontSize: se(i) },
                  content: s,
                },
                e.badgeProps
              ),
              {
                default: () => {
                  var e;
                  return [
                    null == (e = o.default) ? void 0 : e.call(o),
                    d &&
                      t.createVNode(
                        'img',
                        { class: ct('image'), src: l },
                        null
                      ),
                  ];
                },
              }
            );
          };
        },
      })
    ),
    [pt, mt] = Oe('loading'),
    ft = Array(12)
      .fill(null)
      .map((e, o) =>
        t.createVNode('i', { class: mt('line', String(o + 1)) }, null)
      ),
    vt = t.createVNode(
      'svg',
      { class: mt('circular'), viewBox: '25 25 50 50' },
      [
        t.createVNode(
          'circle',
          { cx: '50', cy: '50', r: '20', fill: 'none' },
          null
        ),
      ]
    ),
    ht = {
      size: c,
      type: v('circular'),
      color: String,
      vertical: Boolean,
      textSize: c,
      textColor: String,
    };
  const gt = Re(
      t.defineComponent({
        name: pt,
        props: ht,
        setup(e, { slots: o }) {
          const a = t.computed(() => n({ color: e.color }, ce(e.size))),
            r = () => {
              var n;
              if (o.default)
                return t.createVNode(
                  'span',
                  {
                    class: mt('text'),
                    style: {
                      fontSize: se(e.textSize),
                      color: null != (n = e.textColor) ? n : e.color,
                    },
                  },
                  [o.default()]
                );
            };
          return () => {
            const { type: o, vertical: n } = e;
            return t.createVNode(
              'div',
              {
                class: mt([o, { vertical: n }]),
                'aria-live': 'polite',
                'aria-busy': !0,
              },
              [
                t.createVNode(
                  'span',
                  { class: mt('spinner', o), style: a.value },
                  ['spinner' === o ? ft : vt]
                ),
                r(),
              ]
            );
          };
        },
      })
    ),
    [bt, yt] = Oe('button'),
    wt = n({}, Ze, {
      tag: v('button'),
      text: String,
      icon: String,
      type: v('default'),
      size: v('normal'),
      color: String,
      block: Boolean,
      plain: Boolean,
      round: Boolean,
      square: Boolean,
      loading: Boolean,
      hairline: Boolean,
      disabled: Boolean,
      iconPrefix: String,
      nativeType: v('button'),
      loadingSize: c,
      loadingText: String,
      loadingType: String,
      iconPosition: v('left'),
    });
  const xt = Re(
      t.defineComponent({
        name: bt,
        props: wt,
        emits: ['click'],
        setup(e, { emit: o, slots: n }) {
          const a = Je(),
            r = () =>
              e.loading
                ? n.loading
                  ? n.loading()
                  : t.createVNode(
                      gt,
                      {
                        size: e.loadingSize,
                        type: e.loadingType,
                        class: yt('loading'),
                      },
                      null
                    )
                : n.icon
                ? t.createVNode('div', { class: yt('icon') }, [n.icon()])
                : e.icon
                ? t.createVNode(
                    ut,
                    {
                      name: e.icon,
                      class: yt('icon'),
                      classPrefix: e.iconPrefix,
                    },
                    null
                  )
                : void 0,
            l = () => {
              let o;
              if (
                ((o = e.loading
                  ? e.loadingText
                  : n.default
                  ? n.default()
                  : e.text),
                o)
              )
                return t.createVNode('span', { class: yt('text') }, [o]);
            },
            i = () => {
              const { color: t, plain: o } = e;
              if (t) {
                const e = { color: o ? t : 'white' };
                return (
                  o || (e.background = t),
                  t.includes('gradient') ? (e.border = 0) : (e.borderColor = t),
                  e
                );
              }
            },
            s = (t) => {
              e.loading ? ae(t) : e.disabled || (o('click', t), a());
            };
          return () => {
            const {
                tag: o,
                type: n,
                size: a,
                block: c,
                round: d,
                plain: u,
                square: p,
                loading: m,
                disabled: f,
                hairline: v,
                nativeType: h,
                iconPosition: g,
              } = e,
              b = [
                yt([
                  n,
                  a,
                  {
                    plain: u,
                    block: c,
                    round: d,
                    square: p,
                    loading: m,
                    disabled: f,
                    hairline: v,
                  },
                ]),
                { [Ee]: v },
              ];
            return t.createVNode(
              o,
              { type: h, class: b, style: i(), disabled: f, onClick: s },
              {
                default: () => [
                  t.createVNode('div', { class: yt('content') }, [
                    'left' === g && r(),
                    l(),
                    'right' === g && r(),
                  ]),
                ],
              }
            );
          };
        },
      })
    ),
    [Vt, Nt] = Oe('action-bar-button'),
    Ct = n({}, Ze, {
      type: String,
      text: String,
      icon: String,
      color: String,
      loading: Boolean,
      disabled: Boolean,
    });
  const kt = Re(
      t.defineComponent({
        name: Vt,
        props: Ct,
        setup(e, { slots: o }) {
          const n = Je(),
            { parent: a, index: r } = V(Ye),
            l = t.computed(() => {
              if (a) {
                const e = a.children[r.value - 1];
                return !(e && 'isButton' in e);
              }
            }),
            i = t.computed(() => {
              if (a) {
                const e = a.children[r.value + 1];
                return !(e && 'isButton' in e);
              }
            });
          return (
            _e({ isButton: !0 }),
            () => {
              const {
                type: a,
                icon: r,
                text: s,
                color: c,
                loading: d,
                disabled: u,
              } = e;
              return t.createVNode(
                xt,
                {
                  class: Nt([a, { last: i.value, first: l.value }]),
                  size: 'large',
                  type: a,
                  icon: r,
                  color: c,
                  loading: d,
                  disabled: u,
                  onClick: n,
                },
                { default: () => [o.default ? o.default() : s] }
              );
            }
          );
        },
      })
    ),
    [St, Tt] = Oe('action-bar-icon'),
    Bt = n({}, Ze, {
      dot: Boolean,
      text: String,
      icon: String,
      color: String,
      badge: c,
      iconClass: s,
      badgeProps: Object,
      iconPrefix: String,
    });
  const Dt = Re(
      t.defineComponent({
        name: St,
        props: Bt,
        setup(e, { slots: o }) {
          const n = Je();
          V(Ye);
          const a = () => {
            const {
              dot: n,
              badge: a,
              icon: r,
              color: l,
              iconClass: i,
              badgeProps: s,
              iconPrefix: c,
            } = e;
            return o.icon
              ? t.createVNode(
                  ot,
                  t.mergeProps({ dot: n, class: Tt('icon'), content: a }, s),
                  { default: o.icon }
                )
              : t.createVNode(
                  ut,
                  {
                    tag: 'div',
                    dot: n,
                    name: r,
                    badge: a,
                    color: l,
                    class: [Tt('icon'), i],
                    badgeProps: s,
                    classPrefix: c,
                  },
                  null
                );
          };
          return () =>
            t.createVNode(
              'div',
              { role: 'button', class: Tt(), tabindex: 0, onClick: n },
              [a(), o.default ? o.default() : e.text]
            );
        },
      })
    ),
    Ot = {
      show: Boolean,
      zIndex: c,
      overlay: d,
      duration: c,
      teleport: [String, Object],
      lockScroll: d,
      lazyRender: d,
      beforeClose: Function,
      overlayStyle: Object,
      overlayClass: s,
      transitionAppear: Boolean,
      closeOnClickOverlay: d,
    },
    It = Object.keys(Ot);
  function At() {
    const e = t.ref(0),
      o = t.ref(0),
      n = t.ref(0),
      a = t.ref(0),
      r = t.ref(0),
      l = t.ref(0),
      i = t.ref(''),
      s = () => {
        (n.value = 0),
          (a.value = 0),
          (r.value = 0),
          (l.value = 0),
          (i.value = '');
      };
    return {
      move: (t) => {
        const s = t.touches[0];
        (n.value = (s.clientX < 0 ? 0 : s.clientX) - e.value),
          (a.value = s.clientY - o.value),
          (r.value = Math.abs(n.value)),
          (l.value = Math.abs(a.value));
        var c, d;
        (!i.value || (r.value < 10 && l.value < 10)) &&
          (i.value =
            ((c = r.value),
            (d = l.value),
            c > d ? 'horizontal' : d > c ? 'vertical' : ''));
      },
      start: (t) => {
        s(), (e.value = t.touches[0].clientX), (o.value = t.touches[0].clientY);
      },
      reset: s,
      startX: e,
      startY: o,
      deltaX: n,
      deltaY: a,
      offsetX: r,
      offsetY: l,
      direction: i,
      isVertical: () => 'vertical' === i.value,
      isHorizontal: () => 'horizontal' === i.value,
    };
  }
  let Pt = 0;
  const zt = 'van-overflow-hidden';
  function Et(e) {
    const o = t.ref(!1);
    return (
      t.watch(
        e,
        (e) => {
          e && (o.value = e);
        },
        { immediate: !0 }
      ),
      (e) => () => o.value ? e() : null
    );
  }
  const $t = Symbol();
  function Mt(e) {
    const o = t.inject($t, null);
    o &&
      t.watch(o, (t) => {
        t && e();
      });
  }
  const [Lt, Ft] = Oe('overlay'),
    Ht = {
      show: Boolean,
      zIndex: c,
      duration: c,
      className: s,
      lockScroll: d,
      lazyRender: d,
      customStyle: Object,
    };
  const Rt = Re(
      t.defineComponent({
        name: Lt,
        props: Ht,
        setup(e, { slots: a }) {
          const r = Et(() => e.show || !e.lazyRender),
            l = (e) => {
              ae(e, !0);
            },
            i = r(() => {
              var r;
              const i = n(de(e.zIndex), e.customStyle);
              return (
                W(e.duration) && (i.animationDuration = `${e.duration}s`),
                t.withDirectives(
                  t.createVNode(
                    'div',
                    {
                      style: i,
                      class: [Ft(), e.className],
                      onTouchmove: e.lockScroll ? l : o,
                    },
                    [null == (r = a.default) ? void 0 : r.call(a)]
                  ),
                  [[t.vShow, e.show]]
                )
              );
            });
          return () =>
            t.createVNode(
              t.Transition,
              { name: 'van-fade', appear: !0 },
              { default: i }
            );
        },
      })
    ),
    jt = n({}, Ot, {
      round: Boolean,
      position: v('center'),
      closeIcon: v('cross'),
      closeable: Boolean,
      transition: String,
      iconPrefix: String,
      closeOnPopstate: Boolean,
      closeIconPosition: v('top-right'),
      safeAreaInsetTop: Boolean,
      safeAreaInsetBottom: Boolean,
    }),
    [Wt, qt] = Oe('popup');
  let Ut = 2e3;
  const Yt = Re(
      t.defineComponent({
        name: Wt,
        inheritAttrs: !1,
        props: jt,
        emits: [
          'open',
          'close',
          'opened',
          'closed',
          'keydown',
          'update:show',
          'click-overlay',
          'click-close-icon',
        ],
        setup(e, { emit: o, attrs: n, slots: a }) {
          let r, l;
          const i = t.ref(),
            s = t.ref(),
            c = Et(() => e.show || !e.lazyRender),
            d = t.computed(() => {
              const t = { zIndex: i.value };
              if (W(e.duration)) {
                t[
                  'center' === e.position
                    ? 'animationDuration'
                    : 'transitionDuration'
                ] = `${e.duration}s`;
              }
              return t;
            }),
            u = () => {
              r ||
                (void 0 !== e.zIndex && (Ut = +e.zIndex),
                (r = !0),
                (i.value = ++Ut),
                o('open'));
            },
            p = () => {
              r &&
                He(e.beforeClose, {
                  done() {
                    (r = !1), o('close'), o('update:show', !1);
                  },
                });
            },
            m = (t) => {
              o('click-overlay', t), e.closeOnClickOverlay && p();
            },
            f = () => {
              if (e.overlay)
                return t.createVNode(
                  Rt,
                  {
                    show: e.show,
                    class: e.overlayClass,
                    zIndex: i.value,
                    duration: e.duration,
                    customStyle: e.overlayStyle,
                    onClick: m,
                  },
                  { default: a['overlay-content'] }
                );
            },
            v = (e) => {
              o('click-close-icon', e), p();
            },
            h = () => {
              if (e.closeable)
                return t.createVNode(
                  ut,
                  {
                    role: 'button',
                    tabindex: 0,
                    name: e.closeIcon,
                    class: [qt('close-icon', e.closeIconPosition), Le],
                    classPrefix: e.iconPrefix,
                    onClick: v,
                  },
                  null
                );
            },
            g = () => o('opened'),
            b = () => o('closed'),
            y = (e) => o('keydown', e),
            w = c(() => {
              var o;
              const {
                round: r,
                position: l,
                safeAreaInsetTop: i,
                safeAreaInsetBottom: c,
              } = e;
              return t.withDirectives(
                t.createVNode(
                  'div',
                  t.mergeProps(
                    {
                      ref: s,
                      style: d.value,
                      class: [
                        qt({ round: r, [l]: l }),
                        { 'van-safe-area-top': i, 'van-safe-area-bottom': c },
                      ],
                      onKeydown: y,
                    },
                    n
                  ),
                  [null == (o = a.default) ? void 0 : o.call(a), h()]
                ),
                [[t.vShow, e.show]]
              );
            }),
            x = () => {
              const { position: o, transition: n, transitionAppear: a } = e,
                r = 'center' === o ? 'van-fade' : `van-popup-slide-${o}`;
              return t.createVNode(
                t.Transition,
                { name: n || r, appear: a, onAfterEnter: g, onAfterLeave: b },
                { default: w }
              );
            };
          return (
            t.watch(
              () => e.show,
              (e) => {
                e &&
                  !r &&
                  (u(),
                  0 === n.tabindex &&
                    t.nextTick(() => {
                      var e;
                      null == (e = s.value) || e.focus();
                    })),
                  !e && r && ((r = !1), o('close'));
              }
            ),
            _e({ popupRef: s }),
            (function (e, o) {
              const n = At(),
                a = (t) => {
                  n.move(t);
                  const o = n.deltaY.value > 0 ? '10' : '01',
                    a = F(t.target, e.value),
                    { scrollHeight: r, offsetHeight: l, scrollTop: i } = a;
                  let s = '11';
                  0 === i
                    ? (s = l >= r ? '00' : '01')
                    : i + l >= r && (s = '10'),
                    '11' === s ||
                      !n.isVertical() ||
                      parseInt(s, 2) & parseInt(o, 2) ||
                      ae(t, !0);
                },
                r = () => {
                  document.addEventListener('touchstart', n.start),
                    document.addEventListener('touchmove', a, { passive: !1 }),
                    Pt || document.body.classList.add(zt),
                    Pt++;
                },
                l = () => {
                  Pt &&
                    (document.removeEventListener('touchstart', n.start),
                    document.removeEventListener('touchmove', a),
                    Pt--,
                    Pt || document.body.classList.remove(zt));
                },
                i = () => o() && l();
              A(() => o() && r()),
                t.onDeactivated(i),
                t.onBeforeUnmount(i),
                t.watch(o, (e) => {
                  e ? r() : l();
                });
            })(s, () => e.show && e.lockScroll),
            P('popstate', () => {
              e.closeOnPopstate && (p(), (l = !1));
            }),
            t.onMounted(() => {
              e.show && u();
            }),
            t.onActivated(() => {
              l && (o('update:show', !0), (l = !1));
            }),
            t.onDeactivated(() => {
              e.show && e.teleport && (p(), (l = !0));
            }),
            t.provide($t, () => e.show),
            () =>
              e.teleport
                ? t.createVNode(
                    t.Teleport,
                    { to: e.teleport },
                    { default: () => [f(), x()] }
                  )
                : t.createVNode(t.Fragment, null, [f(), x()])
          );
        },
      })
    ),
    [Xt, Gt] = Oe('action-sheet'),
    _t = n({}, Ot, {
      title: String,
      round: d,
      actions: p(),
      closeIcon: v('cross'),
      closeable: d,
      cancelText: String,
      description: String,
      closeOnPopstate: d,
      closeOnClickAction: Boolean,
      safeAreaInsetBottom: d,
    }),
    Zt = [...It, 'round', 'closeOnPopstate', 'safeAreaInsetBottom'];
  const Kt = Re(
    t.defineComponent({
      name: Xt,
      props: _t,
      emits: ['select', 'cancel', 'update:show'],
      setup(e, { slots: o, emit: n }) {
        const a = (e) => n('update:show', e),
          r = () => {
            a(!1), n('cancel');
          },
          i = () => {
            if (e.title)
              return t.createVNode('div', { class: Gt('header') }, [
                e.title,
                e.closeable &&
                  t.createVNode(
                    ut,
                    { name: e.closeIcon, class: [Gt('close'), Le], onClick: r },
                    null
                  ),
              ]);
          },
          s = () => {
            if (o.cancel || e.cancelText)
              return [
                t.createVNode('div', { class: Gt('gap') }, null),
                t.createVNode(
                  'button',
                  { type: 'button', class: Gt('cancel'), onClick: r },
                  [o.cancel ? o.cancel() : e.cancelText]
                ),
              ];
          },
          c = (e, n) =>
            e.loading
              ? t.createVNode(gt, { class: Gt('loading-icon') }, null)
              : o.action
              ? o.action({ action: e, index: n })
              : [
                  t.createVNode('span', { class: Gt('name') }, [e.name]),
                  e.subname &&
                    t.createVNode('div', { class: Gt('subname') }, [e.subname]),
                ],
          d = (o, r) => {
            const {
              color: l,
              loading: i,
              callback: s,
              disabled: d,
              className: u,
            } = o;
            return t.createVNode(
              'button',
              {
                type: 'button',
                style: { color: l },
                class: [Gt('item', { loading: i, disabled: d }), u],
                onClick: () => {
                  d ||
                    i ||
                    (s && s(o),
                    e.closeOnClickAction && a(!1),
                    t.nextTick(() => n('select', o, r)));
                },
              },
              [c(o, r)]
            );
          },
          u = () => {
            if (e.description || o.description) {
              const n = o.description ? o.description() : e.description;
              return t.createVNode('div', { class: Gt('description') }, [n]);
            }
          };
        return () =>
          t.createVNode(
            Yt,
            t.mergeProps(
              { class: Gt(), position: 'bottom', 'onUpdate:show': a },
              l(e, Zt)
            ),
            {
              default: () => {
                var n;
                return [
                  i(),
                  u(),
                  t.createVNode('div', { class: Gt('content') }, [
                    e.actions.map(d),
                    null == (n = o.default) ? void 0 : n.call(o),
                  ]),
                  s(),
                ];
              },
            }
          );
      },
    })
  );
  function Jt(e) {
    if (!W(e)) return e;
    if (Array.isArray(e)) return e.map((e) => Jt(e));
    if (U(e)) {
      const t = {};
      return (
        Object.keys(e).forEach((o) => {
          t[o] = Jt(e[o]);
        }),
        t
      );
    }
    return e;
  }
  const [Qt, eo] = Oe('picker-column');
  const to = Symbol(Qt),
    oo = (e) => U(e) && e.disabled;
  var no = t.defineComponent({
    name: Qt,
    props: {
      textKey: u(String),
      readonly: Boolean,
      allowHtml: Boolean,
      className: s,
      itemHeight: u(Number),
      defaultIndex: m(0),
      swipeDuration: u(c),
      initialOptions: p(),
      visibleItemCount: u(c),
    },
    emits: ['change'],
    setup(e, { emit: o, slots: n }) {
      let a, r, l, i, s;
      const c = t.ref(),
        d = t.reactive({
          index: e.defaultIndex,
          offset: 0,
          duration: 0,
          options: Jt(e.initialOptions),
        }),
        u = At(),
        p = () => d.options.length,
        m = () => (e.itemHeight * (+e.visibleItemCount - 1)) / 2,
        f = (t, n) => {
          const r =
              -(t =
                ((e) => {
                  for (let t = (e = ge(e, 0, p())); t < p(); t++)
                    if (!oo(d.options[t])) return t;
                  for (let t = e - 1; t >= 0; t--)
                    if (!oo(d.options[t])) return t;
                })(t) || 0) * e.itemHeight,
            l = () => {
              t !== d.index && ((d.index = t), n && o('change', t));
            };
          a && r !== d.offset ? (s = l) : l(), (d.offset = r);
        },
        v = (t) => {
          JSON.stringify(t) !== JSON.stringify(d.options) &&
            ((d.options = Jt(t)), f(e.defaultIndex));
        },
        h = (t) => (U(t) && e.textKey in t ? t[e.textKey] : t),
        g = (t) => ge(Math.round(-t / e.itemHeight), 0, p() - 1),
        b = () => {
          (a = !1), (d.duration = 0), s && (s(), (s = null));
        },
        y = (t) => {
          if (!e.readonly) {
            if ((u.start(t), a)) {
              const e = (function (e) {
                const { transform: t } = window.getComputedStyle(e),
                  o = t.slice(7, t.length - 1).split(', ')[5];
                return Number(o);
              })(c.value);
              (d.offset = Math.min(0, e - m())), (r = d.offset);
            } else r = d.offset;
            (d.duration = 0), (l = Date.now()), (i = r), (s = null);
          }
        },
        w = (t) => {
          if (e.readonly) return;
          u.move(t),
            u.isVertical() && ((a = !0), ae(t, !0)),
            (d.offset = ge(
              r + u.deltaY.value,
              -p() * e.itemHeight,
              e.itemHeight
            ));
          const o = Date.now();
          o - l > 300 && ((l = o), (i = d.offset));
        },
        x = () => {
          if (e.readonly) return;
          const t = d.offset - i,
            o = Date.now() - l;
          if (o < 300 && Math.abs(t) > 15)
            return void ((t, o) => {
              const n = Math.abs(t / o);
              t = d.offset + (n / 0.003) * (t < 0 ? -1 : 1);
              const a = g(t);
              (d.duration = +e.swipeDuration), f(a, !0);
            })(t, o);
          const n = g(d.offset);
          (d.duration = 200),
            f(n, !0),
            setTimeout(() => {
              a = !1;
            }, 0);
        },
        N = () => {
          const o = { height: `${e.itemHeight}px` };
          return d.options.map((r, l) => {
            const i = h(r),
              c = oo(r),
              u = {
                role: 'button',
                style: o,
                tabindex: c ? -1 : 0,
                class: eo('item', { disabled: c, selected: l === d.index }),
                onClick: () =>
                  ((t) => {
                    a ||
                      e.readonly ||
                      ((s = null), (d.duration = 200), f(t, !0));
                  })(l),
              },
              p = {
                class: 'van-ellipsis',
                [e.allowHtml ? 'innerHTML' : 'textContent']: i,
              };
            return t.createVNode('li', u, [
              n.option ? n.option(r) : t.createVNode('div', p, null),
            ]);
          });
        };
      return (
        f(d.index),
        V(to),
        _e({
          state: d,
          setIndex: f,
          getValue: () => d.options[d.index],
          setValue: (e) => {
            const { options: t } = d;
            for (let o = 0; o < t.length; o++) if (h(t[o]) === e) return f(o);
          },
          setOptions: v,
          hasOptions: () => d.options.length,
          stopMomentum: b,
        }),
        t.watch(() => e.initialOptions, v),
        t.watch(
          () => e.defaultIndex,
          (e) => f(e)
        ),
        () =>
          t.createVNode(
            'div',
            {
              class: [eo(), e.className],
              onTouchstart: y,
              onTouchmove: w,
              onTouchend: x,
              onTouchcancel: x,
            },
            [
              t.createVNode(
                'ul',
                {
                  ref: c,
                  style: {
                    transform: `translate3d(0, ${d.offset + m()}px, 0)`,
                    transitionDuration: `${d.duration}ms`,
                    transitionProperty: d.duration ? 'all' : 'none',
                  },
                  class: eo('wrapper'),
                  onTransitionend: b,
                },
                [N()]
              ),
            ]
          )
      );
    },
  });
  const [ao, ro, lo] = Oe('picker'),
    io = {
      title: String,
      loading: Boolean,
      readonly: Boolean,
      allowHtml: Boolean,
      itemHeight: f(44),
      showToolbar: d,
      swipeDuration: f(1e3),
      visibleItemCount: f(6),
      cancelButtonText: String,
      confirmButtonText: String,
    },
    so = n({}, io, {
      columns: p(),
      valueKey: String,
      defaultIndex: f(0),
      toolbarPosition: v('top'),
      columnsFieldNames: Object,
    });
  const co = Re(
      t.defineComponent({
        name: ao,
        props: so,
        emits: ['confirm', 'cancel', 'change'],
        setup(e, { emit: o, slots: n }) {
          'production' !== process.env.NODE_ENV &&
            (n.default &&
              console.warn(
                '[Vant] Picker: "default" slot is deprecated, please use "toolbar" slot instead.'
              ),
            e.valueKey &&
              console.warn(
                '[Vant] Picker: "valueKey" prop is deprecated, please use "columnsFieldNames" prop instead.'
              ));
          const a = t.ref(!1),
            r = t.ref([]),
            l = t.computed(() => {
              const { columnsFieldNames: t } = e;
              return {
                text: (null == t ? void 0 : t.text) || e.valueKey || 'text',
                values: (null == t ? void 0 : t.values) || 'values',
                children: (null == t ? void 0 : t.children) || 'children',
              };
            }),
            { children: i, linkChildren: s } = C(to);
          s();
          const c = t.computed(() => me(e.itemHeight)),
            d = t.computed(() => {
              const t = e.columns[0];
              if ('object' == typeof t) {
                if (l.value.children in t) return 'cascade';
                if (l.value.values in t) return 'object';
              }
              return 'plain';
            }),
            u = () => i.map((e) => e.state.index),
            p = (e, t) => {
              const o = i[e];
              o && (o.setOptions(t), (a.value = !0));
            },
            m = (t) => {
              let o = { [l.value.children]: e.columns };
              const n = u();
              for (let e = 0; e <= t; e++) o = o[l.value.children][n[e]];
              for (; o && o[l.value.children]; )
                t++,
                  p(t, o[l.value.children]),
                  (o = o[l.value.children][o.defaultIndex || 0]);
            },
            f = (e) => i[e],
            v = (e) => {
              const t = f(e);
              if (t) return t.getValue();
            },
            h = (e, t) => {
              const o = f(e);
              o && (o.setValue(t), 'cascade' === d.value && m(e));
            },
            g = (e) => {
              const t = f(e);
              if (t) return t.state.index;
            },
            b = (e, t) => {
              const o = f(e);
              o && (o.setIndex(t), 'cascade' === d.value && m(e));
            },
            y = () => i.map((e) => e.getValue()),
            w = (e) => {
              'plain' === d.value ? o(e, v(0), g(0)) : o(e, y(), u());
            },
            x = () => {
              i.forEach((e) => e.stopMomentum()), w('confirm');
            },
            V = () => w('cancel'),
            N = () => {
              const o = e.cancelButtonText || lo('cancel');
              return t.createVNode(
                'button',
                { type: 'button', class: [ro('cancel'), Le], onClick: V },
                [n.cancel ? n.cancel() : o]
              );
            },
            k = () => {
              const o = e.confirmButtonText || lo('confirm');
              return t.createVNode(
                'button',
                { type: 'button', class: [ro('confirm'), Le], onClick: x },
                [n.confirm ? n.confirm() : o]
              );
            },
            S = () => {
              if (e.showToolbar) {
                const o = n.toolbar || n.default;
                return t.createVNode('div', { class: ro('toolbar') }, [
                  o
                    ? o()
                    : [
                        N(),
                        n.title
                          ? n.title()
                          : e.title
                          ? t.createVNode(
                              'div',
                              { class: [ro('title'), 'van-ellipsis'] },
                              [e.title]
                            )
                          : void 0,
                        k(),
                      ],
                ]);
              }
            },
            T = () =>
              r.value.map((a, r) => {
                var i;
                return t.createVNode(
                  no,
                  {
                    textKey: l.value.text,
                    readonly: e.readonly,
                    allowHtml: e.allowHtml,
                    className: a.className,
                    itemHeight: c.value,
                    defaultIndex:
                      null != (i = a.defaultIndex) ? i : +e.defaultIndex,
                    swipeDuration: e.swipeDuration,
                    initialOptions: a[l.value.values],
                    visibleItemCount: e.visibleItemCount,
                    onChange: () =>
                      ((e) => {
                        'cascade' === d.value && m(e),
                          'plain' === d.value
                            ? o('change', v(0), g(0))
                            : o('change', y(), e);
                      })(r),
                  },
                  { option: n.option }
                );
              }),
            B = (e) => {
              if (a.value) {
                const o = { height: `${c.value}px` },
                  n = { backgroundSize: `100% ${(e - c.value) / 2}px` };
                return [
                  t.createVNode('div', { class: ro('mask'), style: n }, null),
                  t.createVNode(
                    'div',
                    { class: [Me, ro('frame')], style: o },
                    null
                  ),
                ];
              }
            },
            D = () => {
              const o = c.value * +e.visibleItemCount,
                n = { height: `${o}px` };
              return t.createVNode(
                'div',
                { class: ro('columns'), style: n, onTouchmove: ae },
                [T(), B(o)]
              );
            };
          return (
            t.watch(
              () => e.columns,
              () => {
                const { columns: t } = e;
                'plain' === d.value
                  ? (r.value = [{ [l.value.values]: t }])
                  : 'cascade' === d.value
                  ? (() => {
                      var t;
                      const o = [];
                      let n = { [l.value.children]: e.columns };
                      for (; n && n[l.value.children]; ) {
                        const a = n[l.value.children];
                        let r =
                          null != (t = n.defaultIndex) ? t : +e.defaultIndex;
                        for (; a[r] && a[r].disabled; ) {
                          if (!(r < a.length - 1)) {
                            r = 0;
                            break;
                          }
                          r++;
                        }
                        o.push({
                          [l.value.values]: n[l.value.children],
                          className: n.className,
                          defaultIndex: r,
                        }),
                          (n = a[r]);
                      }
                      r.value = o;
                    })()
                  : (r.value = t),
                  (a.value =
                    r.value.some(
                      (e) => e[l.value.values] && 0 !== e[l.value.values].length
                    ) || i.some((e) => e.hasOptions));
              },
              { immediate: !0 }
            ),
            _e({
              confirm: x,
              getValues: y,
              setValues: (e) => {
                e.forEach((e, t) => {
                  h(t, e);
                });
              },
              getIndexes: u,
              setIndexes: (e) => {
                e.forEach((e, t) => {
                  b(t, e);
                });
              },
              getColumnIndex: g,
              setColumnIndex: b,
              getColumnValue: v,
              setColumnValue: h,
              getColumnValues: (e) => {
                const t = f(e);
                if (t) return t.state.options;
              },
              setColumnValues: p,
            }),
            () => {
              var o, a;
              return t.createVNode('div', { class: ro() }, [
                'top' === e.toolbarPosition ? S() : null,
                e.loading
                  ? t.createVNode(gt, { class: ro('loading') }, null)
                  : null,
                null == (o = n['columns-top']) ? void 0 : o.call(n),
                D(),
                null == (a = n['columns-bottom']) ? void 0 : a.call(n),
                'bottom' === e.toolbarPosition ? S() : null,
              ]);
            }
          );
        },
      })
    ),
    [uo, po] = Oe('area'),
    mo = '000000',
    fo = [
      'title',
      'cancel',
      'confirm',
      'toolbar',
      'columns-top',
      'columns-bottom',
    ],
    vo = [
      'title',
      'loading',
      'readonly',
      'itemHeight',
      'swipeDuration',
      'visibleItemCount',
      'cancelButtonText',
      'confirmButtonText',
    ],
    ho = n({}, io, {
      value: String,
      columnsNum: f(3),
      columnsPlaceholder: p(),
      areaList: { type: Object, default: () => ({}) },
      isOverseaCode: { type: Function, default: (e) => '9' === e[0] },
    });
  const go = Re(
      t.defineComponent({
        name: uo,
        props: ho,
        emits: ['change', 'confirm', 'cancel'],
        setup(e, { emit: o, slots: n }) {
          const a = t.ref(),
            r = t.reactive({
              code: e.value,
              columns: [{ values: [] }, { values: [] }, { values: [] }],
            }),
            i = t.computed(() => {
              const { areaList: t } = e;
              return {
                province: t.province_list || {},
                city: t.city_list || {},
                county: t.county_list || {},
              };
            }),
            s = t.computed(() => {
              const { columnsPlaceholder: t } = e;
              return {
                province: t[0] || '',
                city: t[1] || '',
                county: t[2] || '',
              };
            }),
            c = (t, o) => {
              let n = [];
              if ('province' !== t && !o) return n;
              const a = i.value[t];
              if (
                ((n = Object.keys(a).map((e) => ({ code: e, name: a[e] }))),
                o &&
                  ('city' === t && e.isOverseaCode(o) && (o = '9'),
                  (n = n.filter((e) => 0 === e.code.indexOf(o)))),
                s.value[t] && n.length)
              ) {
                let e = '';
                'city' === t
                  ? (e = mo.slice(2, 4))
                  : 'county' === t && (e = mo.slice(4, 6)),
                  n.unshift({ code: o + e, name: s.value[t] });
              }
              return n;
            },
            d = (t, o) => {
              let n = o.length;
              'province' === t && (n = e.isOverseaCode(o) ? 1 : 2),
                'city' === t && (n = 4),
                (o = o.slice(0, n));
              const a = c(t, n > 2 ? o.slice(0, n - 2) : '');
              for (let e = 0; e < a.length; e++)
                if (a[e].code.slice(0, n) === o) return e;
              return 0;
            },
            u = () => {
              const t = a.value;
              if (!t) return;
              let o =
                r.code ||
                (() => {
                  if (e.columnsPlaceholder.length) return mo;
                  const { county: t, city: o } = i.value,
                    n = Object.keys(t);
                  if (n[0]) return n[0];
                  const a = Object.keys(o);
                  return a[0] ? a[0] : '';
                })();
              const n = c('province'),
                l = c('city', o.slice(0, 2));
              t.setColumnValues(0, n),
                t.setColumnValues(1, l),
                l.length &&
                  '00' === o.slice(2, 4) &&
                  !e.isOverseaCode(o) &&
                  ([{ code: o }] = l),
                t.setColumnValues(2, c('county', o.slice(0, 4))),
                t.setIndexes([d('province', o), d('city', o), d('county', o)]);
            },
            p = (t) =>
              t.map(
                (t, o) => (
                  t &&
                    (((t = Jt(t)).code && t.name !== e.columnsPlaceholder[o]) ||
                      ((t.code = ''), (t.name = ''))),
                  t
                )
              ),
            m = () => {
              if (a.value) {
                const e = a.value.getValues().filter(Boolean);
                return p(e);
              }
              return [];
            },
            f = (e, t) => {
              if (((r.code = e[t].code), u(), a.value)) {
                const e = p(a.value.getValues());
                o('change', e, t);
              }
            },
            v = (e, t) => {
              u(), o('confirm', p(e), t);
            },
            h = (...e) => o('cancel', ...e);
          return (
            t.onMounted(u),
            t.watch(
              () => e.value,
              (e) => {
                (r.code = e), u();
              }
            ),
            t.watch(() => e.areaList, u, { deep: !0 }),
            t.watch(
              () => e.columnsNum,
              () => {
                t.nextTick(u);
              }
            ),
            _e({
              reset: (e = '') => {
                (r.code = e), u();
              },
              getArea: () => {
                const t = m(),
                  o = {
                    code: '',
                    country: '',
                    province: '',
                    city: '',
                    county: '',
                  };
                if (!t.length) return o;
                const n = t.map((e) => e.name),
                  a = t.filter((e) => e.code);
                return (
                  (o.code = a.length ? a[a.length - 1].code : ''),
                  e.isOverseaCode(o.code)
                    ? ((o.country = n[1] || ''), (o.province = n[2] || ''))
                    : ((o.province = n[0] || ''),
                      (o.city = n[1] || ''),
                      (o.county = n[2] || '')),
                  o
                );
              },
              getValues: m,
            }),
            () => {
              const o = r.columns.slice(0, +e.columnsNum);
              return t.createVNode(
                co,
                t.mergeProps(
                  {
                    ref: a,
                    class: po(),
                    columns: o,
                    columnsFieldNames: { text: 'name' },
                    onChange: f,
                    onCancel: h,
                    onConfirm: v,
                  },
                  l(e, vo)
                ),
                l(n, fo)
              );
            }
          );
        },
      })
    ),
    [bo, yo] = Oe('cell'),
    wo = {
      icon: String,
      size: String,
      title: c,
      value: c,
      label: c,
      center: Boolean,
      isLink: Boolean,
      border: d,
      required: Boolean,
      iconPrefix: String,
      valueClass: s,
      labelClass: s,
      titleClass: s,
      titleStyle: null,
      arrowDirection: String,
      clickable: { type: Boolean, default: null },
    },
    xo = n({}, wo, Ze);
  const Vo = Re(
      t.defineComponent({
        name: bo,
        props: xo,
        setup(e, { slots: o }) {
          const n = Je(),
            a = () => {
              if (o.label || W(e.label))
                return t.createVNode(
                  'div',
                  { class: [yo('label'), e.labelClass] },
                  [o.label ? o.label() : e.label]
                );
            },
            r = () => {
              if (o.title || W(e.title))
                return t.createVNode(
                  'div',
                  { class: [yo('title'), e.titleClass], style: e.titleStyle },
                  [
                    o.title
                      ? o.title()
                      : t.createVNode('span', null, [e.title]),
                    a(),
                  ]
                );
            },
            l = () => {
              const n = o.value || o.default;
              if (n || W(e.value)) {
                const a = o.title || W(e.title);
                return t.createVNode(
                  'div',
                  { class: [yo('value', { alone: !a }), e.valueClass] },
                  [n ? n() : t.createVNode('span', null, [e.value])]
                );
              }
            },
            i = () => {
              if (o['right-icon']) return o['right-icon']();
              if (e.isLink) {
                const o = e.arrowDirection
                  ? `arrow-${e.arrowDirection}`
                  : 'arrow';
                return t.createVNode(
                  ut,
                  { name: o, class: yo('right-icon') },
                  null
                );
              }
            };
          return () => {
            var a, s;
            const { size: c, center: d, border: u, isLink: p, required: m } = e,
              f = null != (a = e.clickable) ? a : p,
              v = { center: d, required: m, clickable: f, borderless: !u };
            return (
              c && (v[c] = !!c),
              t.createVNode(
                'div',
                {
                  class: yo(v),
                  role: f ? 'button' : void 0,
                  tabindex: f ? 0 : void 0,
                  onClick: n,
                },
                [
                  o.icon
                    ? o.icon()
                    : e.icon
                    ? t.createVNode(
                        ut,
                        {
                          name: e.icon,
                          class: yo('left-icon'),
                          classPrefix: e.iconPrefix,
                        },
                        null
                      )
                    : void 0,
                  r(),
                  l(),
                  i(),
                  null == (s = o.extra) ? void 0 : s.call(o),
                ]
              )
            );
          };
        },
      })
    ),
    [No, Co] = Oe('form'),
    ko = {
      colon: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      showError: Boolean,
      labelWidth: c,
      labelAlign: String,
      inputAlign: String,
      scrollToError: Boolean,
      validateFirst: Boolean,
      submitOnEnter: d,
      showErrorMessage: d,
      errorMessageAlign: String,
      validateTrigger: { type: [String, Array], default: 'onBlur' },
    };
  const So = Re(
    t.defineComponent({
      name: No,
      props: ko,
      emits: ['submit', 'failed'],
      setup(e, { emit: o, slots: n }) {
        const { children: a, linkChildren: r } = C(Fe),
          l = (e) => (e ? a.filter((t) => e.includes(t.name)) : a),
          i = (t) => {
            return 'string' == typeof t
              ? ((e) => {
                  const t = a.find((t) => t.name === e);
                  return t
                    ? new Promise((e, o) => {
                        t.validate().then((t) => {
                          t ? o(t) : e();
                        });
                      })
                    : Promise.reject();
                })(t)
              : e.validateFirst
              ? ((o = t),
                new Promise((e, t) => {
                  const n = [];
                  l(o)
                    .reduce(
                      (e, t) =>
                        e.then(() => {
                          if (!n.length)
                            return t.validate().then((e) => {
                              e && n.push(e);
                            });
                        }),
                      Promise.resolve()
                    )
                    .then(() => {
                      n.length ? t(n) : e();
                    });
                }))
              : ((e) =>
                  new Promise((t, o) => {
                    const n = l(e);
                    Promise.all(n.map((e) => e.validate())).then((e) => {
                      (e = e.filter(Boolean)).length ? o(e) : t();
                    });
                  }))(t);
            var o;
          },
          s = (e, t) => {
            a.some((o) => o.name === e && (o.$el.scrollIntoView(t), !0));
          },
          c = () =>
            a.reduce((e, t) => ((e[t.name] = t.formValue.value), e), {}),
          d = () => {
            const t = c();
            i()
              .then(() => o('submit', t))
              .catch((n) => {
                o('failed', { values: t, errors: n }),
                  e.scrollToError && n[0].name && s(n[0].name);
              });
          },
          u = (e) => {
            ae(e), d();
          };
        return (
          r({ props: e }),
          _e({
            submit: d,
            validate: i,
            getValues: c,
            scrollToField: s,
            resetValidation: (e) => {
              'string' == typeof e && (e = [e]);
              l(e).forEach((e) => {
                e.resetValidation();
              });
            },
            getValidationStatus: () =>
              a.reduce(
                (e, t) => ((e[t.name] = t.getValidationStatus()), e),
                {}
              ),
          }),
          () => {
            var e;
            return t.createVNode('form', { class: Co(), onSubmit: u }, [
              null == (e = n.default) ? void 0 : e.call(n),
            ]);
          }
        );
      },
    })
  );
  function To(e, t) {
    return (
      (!t.required ||
        !(function (e) {
          return Array.isArray(e) ? !e.length : 0 !== e && !e;
        })(e)) &&
      !(t.pattern && !t.pattern.test(String(e)))
    );
  }
  function Bo(e, t) {
    const { message: o } = t;
    return q(o) ? o(e, t) : o || '';
  }
  function Do({ target: e }) {
    e.composing = !0;
  }
  function Oo({ target: e }) {
    e.composing && ((e.composing = !1), e.dispatchEvent(new Event('input')));
  }
  function Io(e) {
    return [...e].length;
  }
  let Ao = 0;
  function Po() {
    const e = t.getCurrentInstance(),
      { name: o = 'unknown' } = (null == e ? void 0 : e.type) || {};
    return 'test' === process.env.NODE_ENV ? o : `${o}-${++Ao}`;
  }
  const [zo, Eo] = Oe('field'),
    $o = {
      id: String,
      name: String,
      leftIcon: String,
      rightIcon: String,
      autofocus: Boolean,
      clearable: Boolean,
      maxlength: c,
      formatter: Function,
      clearIcon: v('clear'),
      modelValue: f(''),
      inputAlign: String,
      placeholder: String,
      autocomplete: String,
      errorMessage: String,
      enterkeyhint: String,
      clearTrigger: v('focus'),
      formatTrigger: v('onChange'),
      error: { type: Boolean, default: null },
      disabled: { type: Boolean, default: null },
      readonly: { type: Boolean, default: null },
    },
    Mo = n({}, wo, $o, {
      rows: c,
      type: v('text'),
      rules: Array,
      autosize: [Boolean, Object],
      labelWidth: c,
      labelClass: s,
      labelAlign: String,
      showWordLimit: Boolean,
      errorMessageAlign: String,
      colon: { type: Boolean, default: null },
    });
  const Lo = Re(
    t.defineComponent({
      name: zo,
      props: Mo,
      emits: [
        'blur',
        'focus',
        'clear',
        'keypress',
        'click-input',
        'end-validate',
        'start-validate',
        'click-left-icon',
        'click-right-icon',
        'update:modelValue',
      ],
      setup(e, { emit: o, slots: n }) {
        const a = Po(),
          r = t.reactive({
            status: 'unvalidated',
            focused: !1,
            validateMessage: '',
          }),
          l = t.ref(),
          s = t.ref(),
          { parent: c } = V(Fe),
          d = () => {
            var t;
            return String(null != (t = e.modelValue) ? t : '');
          },
          u = (t) =>
            W(e[t]) ? e[t] : c && W(c.props[t]) ? c.props[t] : void 0,
          p = t.computed(() => {
            const t = u('readonly');
            if (e.clearable && !t) {
              const t = '' !== d(),
                o =
                  'always' === e.clearTrigger ||
                  ('focus' === e.clearTrigger && r.focused);
              return t && o;
            }
            return !1;
          }),
          m = t.computed(() => (s.value && n.input ? s.value() : e.modelValue)),
          f = (e) =>
            e.reduce(
              (e, t) =>
                e.then(() => {
                  if ('failed' === r.status) return;
                  let { value: e } = m;
                  return (
                    t.formatter && (e = t.formatter(e, t)),
                    To(e, t)
                      ? t.validator
                        ? (function (e, t) {
                            return new Promise((o) => {
                              const n = t.validator(e, t);
                              Y(n) ? n.then(o) : o(n);
                            });
                          })(e, t).then((o) => {
                            o && 'string' == typeof o
                              ? ((r.status = 'failed'), (r.validateMessage = o))
                              : !1 === o &&
                                ((r.status = 'failed'),
                                (r.validateMessage = Bo(e, t)));
                          })
                        : void 0
                      : ((r.status = 'failed'),
                        void (r.validateMessage = Bo(e, t)))
                  );
                }),
              Promise.resolve()
            ),
          v = () => {
            (r.status = 'unvalidated'), (r.validateMessage = '');
          },
          h = () => o('end-validate', { status: r.status }),
          g = (t = e.rules) =>
            new Promise((n) => {
              v(),
                t
                  ? (o('start-validate'),
                    f(t).then(() => {
                      'failed' === r.status
                        ? (n({ name: e.name, message: r.validateMessage }), h())
                        : ((r.status = 'passed'), n(), h());
                    }))
                  : n();
            }),
          b = (t) => {
            if (c && e.rules) {
              const { validateTrigger: o } = c.props,
                n = i(o).includes(t),
                a = e.rules.filter((e) =>
                  e.trigger ? i(e.trigger).includes(t) : n
                );
              a.length && g(a);
            }
          },
          y = (t, n = 'onChange') => {
            if (
              ((t = ((t) => {
                const { maxlength: o } = e;
                if (W(o) && Io(t) > o) {
                  const e = d();
                  return e && Io(e) === +o
                    ? e
                    : (function (e, t) {
                        return [...e].slice(0, t).join('');
                      })(t, +o);
                }
                return t;
              })(t)),
              'number' === e.type || 'digit' === e.type)
            ) {
              const o = 'number' === e.type;
              t = ye(t, o, o);
            }
            e.formatter && n === e.formatTrigger && (t = e.formatter(t)),
              l.value && l.value.value !== t && (l.value.value = t),
              t !== e.modelValue && o('update:modelValue', t);
          },
          w = (e) => {
            e.target.composing || y(e.target.value);
          },
          x = () => {
            var e;
            return null == (e = l.value) ? void 0 : e.blur();
          },
          N = () => {
            const t = l.value;
            'textarea' === e.type &&
              e.autosize &&
              t &&
              (function (e, t) {
                const o = J();
                e.style.height = 'auto';
                let n = e.scrollHeight;
                if (U(t)) {
                  const { maxHeight: e, minHeight: o } = t;
                  void 0 !== e && (n = Math.min(n, e)),
                    void 0 !== o && (n = Math.max(n, o));
                }
                n && ((e.style.height = `${n}px`), Q(o));
              })(t, e.autosize);
          },
          C = (e) => {
            (r.focused = !0),
              o('focus', e),
              t.nextTick(N),
              u('readonly') && x();
          },
          k = (e) => {
            u('readonly') ||
              ((r.focused = !1),
              y(d(), 'onBlur'),
              o('blur', e),
              b('onBlur'),
              t.nextTick(N),
              oe());
          },
          S = (e) => o('click-input', e),
          T = (e) => o('click-left-icon', e),
          B = (e) => o('click-right-icon', e),
          D = (e) => {
            ae(e), o('update:modelValue', ''), o('clear', e);
          },
          O = t.computed(() =>
            'boolean' == typeof e.error
              ? e.error
              : !(!c || !c.props.showError || 'failed' !== r.status) || void 0
          ),
          I = t.computed(() => {
            const e = u('labelWidth');
            if (e) return { width: se(e) };
          }),
          A = (t) => {
            if (13 === t.keyCode) {
              (c && c.props.submitOnEnter) || 'textarea' === e.type || ae(t),
                'search' === e.type && x();
            }
            o('keypress', t);
          },
          P = () => e.id || `${a}-input`,
          z = () => {
            const o = Eo('control', [
              u('inputAlign'),
              {
                error: O.value,
                custom: !!n.input,
                'min-height': 'textarea' === e.type && !e.autosize,
              },
            ]);
            if (n.input)
              return t.createVNode('div', { class: o, onClick: S }, [
                n.input(),
              ]);
            const r = {
              id: P(),
              ref: l,
              name: e.name,
              rows: void 0 !== e.rows ? +e.rows : void 0,
              class: o,
              disabled: u('disabled'),
              readonly: u('readonly'),
              autofocus: e.autofocus,
              placeholder: e.placeholder,
              autocomplete: e.autocomplete,
              enterkeyhint: e.enterkeyhint,
              'aria-labelledby': e.label ? `${a}-label` : void 0,
              onBlur: k,
              onFocus: C,
              onInput: w,
              onClick: S,
              onChange: Oo,
              onKeypress: A,
              onCompositionend: Oo,
              onCompositionstart: Do,
            };
            return 'textarea' === e.type
              ? t.createVNode('textarea', r, null)
              : t.createVNode(
                  'input',
                  t.mergeProps(
                    'number' === (i = e.type)
                      ? { type: 'text', inputmode: 'decimal' }
                      : 'digit' === i
                      ? { type: 'tel', inputmode: 'numeric' }
                      : { type: i },
                    r
                  ),
                  null
                );
            var i;
          },
          E = () => {
            const o = n['right-icon'];
            if (e.rightIcon || o)
              return t.createVNode(
                'div',
                { class: Eo('right-icon'), onClick: B },
                [
                  o
                    ? o()
                    : t.createVNode(
                        ut,
                        { name: e.rightIcon, classPrefix: e.iconPrefix },
                        null
                      ),
                ]
              );
          },
          $ = () => {
            if (e.showWordLimit && e.maxlength) {
              const o = Io(d());
              return t.createVNode('div', { class: Eo('word-limit') }, [
                t.createVNode('span', { class: Eo('word-num') }, [o]),
                t.createTextVNode('/'),
                e.maxlength,
              ]);
            }
          },
          M = () => {
            if (c && !1 === c.props.showErrorMessage) return;
            const o = e.errorMessage || r.validateMessage;
            if (o) {
              const e = n['error-message'],
                a = u('errorMessageAlign');
              return t.createVNode('div', { class: Eo('error-message', a) }, [
                e ? e({ message: o }) : o,
              ]);
            }
          },
          L = () => [
            t.createVNode('div', { class: Eo('body') }, [
              z(),
              p.value &&
                t.createVNode(
                  ut,
                  { name: e.clearIcon, class: Eo('clear'), onTouchstart: D },
                  null
                ),
              E(),
              n.button &&
                t.createVNode('div', { class: Eo('button') }, [n.button()]),
            ]),
            $(),
            M(),
          ];
        return (
          _e({
            blur: x,
            focus: () => {
              var e;
              return null == (e = l.value) ? void 0 : e.focus();
            },
            validate: g,
            formValue: m,
            resetValidation: v,
            getValidationStatus: () => r.status,
          }),
          t.provide(R, {
            customValue: s,
            resetValidation: v,
            validateWithTrigger: b,
          }),
          t.watch(
            () => e.modelValue,
            () => {
              y(d()), v(), b('onChange'), t.nextTick(N);
            }
          ),
          t.onMounted(() => {
            y(d(), e.formatTrigger), t.nextTick(N);
          }),
          () => {
            const o = u('disabled'),
              r = u('labelAlign'),
              l = (() => {
                const o = u('colon') ? ':' : '';
                return n.label
                  ? [n.label(), o]
                  : e.label
                  ? t.createVNode('label', { id: `${a}-label`, for: P() }, [
                      e.label + o,
                    ])
                  : void 0;
              })(),
              i = (() => {
                const o = n['left-icon'];
                if (e.leftIcon || o)
                  return t.createVNode(
                    'div',
                    { class: Eo('left-icon'), onClick: T },
                    [
                      o
                        ? o()
                        : t.createVNode(
                            ut,
                            { name: e.leftIcon, classPrefix: e.iconPrefix },
                            null
                          ),
                    ]
                  );
              })();
            return t.createVNode(
              Vo,
              {
                size: e.size,
                icon: e.leftIcon,
                class: Eo({ error: O.value, disabled: o, [`label-${r}`]: r }),
                center: e.center,
                border: e.border,
                isLink: e.isLink,
                clickable: e.clickable,
                titleStyle: I.value,
                valueClass: Eo('value'),
                titleClass: [
                  Eo('label', [r, { required: e.required }]),
                  e.labelClass,
                ],
                arrowDirection: e.arrowDirection,
              },
              {
                icon: i ? () => i : null,
                title: l ? () => l : null,
                value: L,
                extra: n.extra,
              }
            );
          }
        );
      },
    })
  );
  function Fo() {
    const e = t.reactive({ show: !1 }),
      o = (t) => {
        e.show = t;
      },
      a = (t) => {
        n(e, t, { transitionAppear: !0 }), o(!0);
      },
      r = () => o(!1);
    return (
      _e({ open: a, close: r, toggle: o }),
      { open: a, close: r, state: e, toggle: o }
    );
  }
  function Ho(e) {
    const o = t.createApp(e),
      n = document.createElement('div');
    return (
      document.body.appendChild(n),
      {
        instance: o.mount(n),
        unmount() {
          o.unmount(), document.body.removeChild(n);
        },
      }
    );
  }
  let Ro = 0;
  const [jo, Wo] = Oe('toast'),
    qo = [
      'show',
      'overlay',
      'teleport',
      'transition',
      'overlayClass',
      'overlayStyle',
      'closeOnClickOverlay',
    ],
    Uo = {
      icon: String,
      show: Boolean,
      type: v('text'),
      overlay: Boolean,
      message: c,
      iconSize: c,
      duration: m(2e3),
      position: v('middle'),
      teleport: [String, Object],
      className: s,
      iconPrefix: String,
      transition: v('van-fade'),
      loadingType: String,
      forbidClick: Boolean,
      overlayClass: s,
      overlayStyle: Object,
      closeOnClick: Boolean,
      closeOnClickOverlay: Boolean,
    };
  var Yo = t.defineComponent({
    name: jo,
    props: Uo,
    emits: ['update:show'],
    setup(e, { emit: o }) {
      let n,
        a = !1;
      const r = () => {
          const t = e.show && e.forbidClick;
          a !== t &&
            ((a = t),
            a
              ? (Ro || document.body.classList.add('van-toast--unclickable'),
                Ro++)
              : Ro &&
                (Ro--,
                Ro ||
                  document.body.classList.remove('van-toast--unclickable')));
        },
        i = (e) => o('update:show', e),
        s = () => {
          e.closeOnClick && i(!1);
        },
        c = () => clearTimeout(n),
        d = () => {
          const {
            icon: o,
            type: n,
            iconSize: a,
            iconPrefix: r,
            loadingType: l,
          } = e;
          return o || 'success' === n || 'fail' === n
            ? t.createVNode(
                ut,
                { name: o || n, size: a, class: Wo('icon'), classPrefix: r },
                null
              )
            : 'loading' === n
            ? t.createVNode(
                gt,
                { class: Wo('loading'), size: a, type: l },
                null
              )
            : void 0;
        },
        u = () => {
          const { type: o, message: n } = e;
          if (W(n) && '' !== n)
            return 'html' === o
              ? t.createVNode(
                  'div',
                  { key: 0, class: Wo('text'), innerHTML: String(n) },
                  null
                )
              : t.createVNode('div', { class: Wo('text') }, [n]);
        };
      return (
        t.watch(() => [e.show, e.forbidClick], r),
        t.watch(
          () => [e.show, e.type, e.message, e.duration],
          () => {
            c(),
              e.show &&
                e.duration > 0 &&
                (n = setTimeout(() => {
                  i(!1);
                }, e.duration));
          }
        ),
        t.onMounted(r),
        t.onUnmounted(r),
        () =>
          t.createVNode(
            Yt,
            t.mergeProps(
              {
                class: [Wo([e.position, { [e.type]: !e.icon }]), e.className],
                lockScroll: !1,
                onClick: s,
                onClosed: c,
                'onUpdate:show': i,
              },
              l(e, qo)
            ),
            { default: () => [d(), u()] }
          )
      );
    },
  });
  const Xo = {
    icon: '',
    type: 'text',
    message: '',
    className: '',
    overlay: !1,
    onClose: void 0,
    onOpened: void 0,
    duration: 2e3,
    teleport: 'body',
    iconSize: void 0,
    iconPrefix: void 0,
    position: 'middle',
    transition: 'van-fade',
    forbidClick: !1,
    loadingType: void 0,
    overlayClass: '',
    overlayStyle: void 0,
    closeOnClick: !1,
    closeOnClickOverlay: !1,
  };
  let Go = [],
    _o = !1,
    Zo = n({}, Xo);
  const Ko = new Map();
  function Jo(e) {
    return U(e) ? e : { message: e };
  }
  function Qo() {
    if (!Go.length || _o) {
      const e = (function () {
        const { instance: e, unmount: o } = Ho({
          setup() {
            const n = t.ref(''),
              { open: a, state: r, close: l, toggle: i } = Fo(),
              s = () => {
                _o && ((Go = Go.filter((t) => t !== e)), o());
              };
            return (
              t.watch(n, (e) => {
                r.message = e;
              }),
              (t.getCurrentInstance().render = () => {
                const e = { onClosed: s, 'onUpdate:show': i };
                return t.createVNode(Yo, t.mergeProps(r, e), null);
              }),
              { open: a, clear: l, message: n }
            );
          },
        });
        return e;
      })();
      Go.push(e);
    }
    return Go[Go.length - 1];
  }
  function en(e = {}) {
    if (!a) return {};
    const t = Qo(),
      o = Jo(e);
    return t.open(n({}, Zo, Ko.get(o.type || Zo.type), o)), t;
  }
  const tn = (e) => (t) => en(n({ type: e }, Jo(t)));
  (en.loading = tn('loading')),
    (en.success = tn('success')),
    (en.fail = tn('fail')),
    (en.clear = (e) => {
      var t;
      Go.length &&
        (e
          ? (Go.forEach((e) => {
              e.clear();
            }),
            (Go = []))
          : _o
          ? null == (t = Go.shift()) || t.clear()
          : Go[0].clear());
    }),
    (en.setDefaultOptions = function (e, t) {
      'string' == typeof e ? Ko.set(e, t) : n(Zo, e);
    }),
    (en.resetDefaultOptions = (e) => {
      'string' == typeof e ? Ko.delete(e) : ((Zo = n({}, Xo)), Ko.clear());
    }),
    (en.allowMultiple = (e = !0) => {
      _o = e;
    }),
    (en.install = (e) => {
      e.use(Re(Yo)), (e.config.globalProperties.$toast = en);
    });
  const [on, nn] = Oe('switch'),
    an = {
      size: c,
      loading: Boolean,
      disabled: Boolean,
      modelValue: s,
      activeColor: String,
      inactiveColor: String,
      activeValue: { type: s, default: !0 },
      inactiveValue: { type: s, default: !1 },
    };
  const rn = Re(
      t.defineComponent({
        name: on,
        props: an,
        emits: ['change', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          const a = () => e.modelValue === e.activeValue,
            r = () => {
              if (!e.disabled && !e.loading) {
                const t = a() ? e.inactiveValue : e.activeValue;
                o('update:modelValue', t), o('change', t);
              }
            },
            l = () => {
              if (e.loading) {
                const o = a() ? e.activeColor : e.inactiveColor;
                return t.createVNode(
                  gt,
                  { class: nn('loading'), color: o },
                  null
                );
              }
              if (n.node) return n.node();
            };
          return (
            j(() => e.modelValue),
            () => {
              var o;
              const {
                  size: i,
                  loading: s,
                  disabled: c,
                  activeColor: d,
                  inactiveColor: u,
                } = e,
                p = a(),
                m = { fontSize: se(i), backgroundColor: p ? d : u };
              return t.createVNode(
                'div',
                {
                  role: 'switch',
                  class: nn({ on: p, loading: s, disabled: c }),
                  style: m,
                  tabindex: c ? void 0 : 0,
                  'aria-checked': p,
                  onClick: r,
                },
                [
                  t.createVNode('div', { class: nn('node') }, [l()]),
                  null == (o = n.background) ? void 0 : o.call(n),
                ]
              );
            }
          );
        },
      })
    ),
    [ln, sn] = Oe('address-edit-detail'),
    cn = Oe('address-edit')[2];
  var dn = t.defineComponent({
    name: ln,
    props: {
      show: Boolean,
      rows: c,
      value: String,
      rules: Array,
      focused: Boolean,
      maxlength: c,
      searchResult: Array,
      showSearchResult: Boolean,
    },
    emits: ['blur', 'focus', 'input', 'select-search'],
    setup(e, { emit: o }) {
      const n = t.ref(),
        a = () => e.focused && e.searchResult && e.showSearchResult,
        r = () => {
          if (!a()) return;
          const { searchResult: n } = e;
          return n.map((n) =>
            t.createVNode(
              Vo,
              {
                clickable: !0,
                key: n.name + n.address,
                icon: 'location-o',
                label: n.address,
                class: sn('search-item'),
                border: !1,
                onClick: () =>
                  ((e) => {
                    o('select-search', e),
                      o('input', `${e.address || ''} ${e.name || ''}`.trim());
                  })(n),
              },
              {
                title: () =>
                  ((o) => {
                    if (o.name) {
                      const n = o.name.replace(
                        e.value,
                        `<span class=${sn('keyword')}>${e.value}</span>`
                      );
                      return t.createVNode('div', { innerHTML: n }, null);
                    }
                  })(n),
              }
            )
          );
        },
        l = (e) => o('blur', e),
        i = (e) => o('focus', e),
        s = (e) => o('input', e);
      return () => {
        if (e.show)
          return t.createVNode(t.Fragment, null, [
            t.createVNode(
              Lo,
              {
                autosize: !0,
                clearable: !0,
                ref: n,
                class: sn(),
                rows: e.rows,
                type: 'textarea',
                rules: e.rules,
                label: cn('addressDetail'),
                border: !a(),
                maxlength: e.maxlength,
                modelValue: e.value,
                placeholder: cn('addressDetail'),
                onBlur: l,
                onFocus: i,
                'onUpdate:modelValue': s,
              },
              null
            ),
            r(),
          ]);
      };
    },
  });
  const [un, pn, mn] = Oe('address-edit'),
    fn = {
      name: '',
      tel: '',
      city: '',
      county: '',
      country: '',
      province: '',
      areaCode: '',
      isDefault: !1,
      postalCode: '',
      addressDetail: '',
    },
    vn = {
      areaList: Object,
      isSaving: Boolean,
      isDeleting: Boolean,
      validator: Function,
      showArea: d,
      showDetail: d,
      showDelete: Boolean,
      showPostal: Boolean,
      disableArea: Boolean,
      searchResult: Array,
      telMaxlength: c,
      showSetDefault: Boolean,
      saveButtonText: String,
      areaPlaceholder: String,
      deleteButtonText: String,
      showSearchResult: Boolean,
      detailRows: f(1),
      detailMaxlength: f(200),
      areaColumnsPlaceholder: p(),
      addressInfo: { type: Object, default: () => n({}, fn) },
      telValidator: { type: Function, default: G },
      postalValidator: { type: Function, default: (e) => /^\d{6}$/.test(e) },
    };
  const hn = Re(
      t.defineComponent({
        name: un,
        props: vn,
        emits: [
          'save',
          'focus',
          'delete',
          'click-area',
          'change-area',
          'change-detail',
          'select-search',
          'change-default',
        ],
        setup(e, { emit: o, slots: a }) {
          const r = t.ref(),
            l = t.reactive({}),
            i = t.ref(!1),
            s = t.ref(!1),
            c = t.computed(
              () => U(e.areaList) && Object.keys(e.areaList).length
            ),
            d = t.computed(() => {
              const {
                country: e,
                province: t,
                city: o,
                county: n,
                areaCode: a,
              } = l;
              if (a) {
                const a = [e, t, o, n];
                return (
                  t && t === o && a.splice(1, 1), a.filter(Boolean).join('/')
                );
              }
              return '';
            }),
            u = t.computed(() => {
              var t;
              return (
                (null == (t = e.searchResult) ? void 0 : t.length) && s.value
              );
            }),
            p = () => {
              if (r.value) {
                const e = r.value.getArea();
                (e.areaCode = e.code), delete e.code, n(l, e);
              }
            },
            m = (e) => {
              (s.value = 'addressDetail' === e), o('focus', e);
            },
            f = t.computed(() => {
              const { validator: t, telValidator: o, postalValidator: n } = e,
                a = (e, o) => ({
                  validator: (n) => {
                    if (t) {
                      const o = t(e, n);
                      if (o) return o;
                    }
                    return !!n || o;
                  },
                });
              return {
                name: [a('name', mn('nameEmpty'))],
                tel: [
                  a('tel', mn('telInvalid')),
                  { validator: o, message: mn('telInvalid') },
                ],
                areaCode: [a('areaCode', mn('areaEmpty'))],
                addressDetail: [a('addressDetail', mn('addressEmpty'))],
                postalCode: [
                  a('addressDetail', mn('postalEmpty')),
                  { validator: n, message: mn('postalEmpty') },
                ],
              };
            }),
            v = () => o('save', l),
            h = (e) => {
              (l.addressDetail = e), o('change-detail', e);
            },
            g = (e) => {
              (e = e.filter(Boolean)).some((e) => !e.code)
                ? en(mn('areaEmpty'))
                : ((i.value = !1), p(), o('change-area', e));
            },
            b = () => o('delete', l),
            y = (e) => {
              (l.areaCode = e || ''), e && t.nextTick(p);
            },
            w = () => {
              setTimeout(() => {
                s.value = !1;
              });
            },
            x = () => {
              if (e.showSetDefault) {
                const e = {
                  'right-icon': () =>
                    t.createVNode(
                      rn,
                      {
                        modelValue: l.isDefault,
                        'onUpdate:modelValue': (e) => (l.isDefault = e),
                        size: '24',
                        onChange: (e) => o('change-default', e),
                      },
                      null
                    ),
                };
                return t.withDirectives(
                  t.createVNode(
                    Vo,
                    {
                      center: !0,
                      title: mn('defaultAddress'),
                      class: pn('default'),
                    },
                    e
                  ),
                  [[t.vShow, !u.value]]
                );
              }
            };
          return (
            _e({
              getArea: () => {
                var e;
                return (null == (e = r.value) ? void 0 : e.getValues()) || [];
              },
              setAreaCode: y,
              setAddressDetail: (e) => {
                l.addressDetail = e;
              },
            }),
            t.watch(
              () => e.areaList,
              () => y(l.areaCode)
            ),
            t.watch(
              () => e.addressInfo,
              (e) => {
                n(l, fn, e), y(e.areaCode);
              },
              { deep: !0, immediate: !0 }
            ),
            () => {
              const { disableArea: n } = e;
              return t.createVNode(
                So,
                { class: pn(), onSubmit: v },
                {
                  default: () => {
                    var p;
                    return [
                      t.createVNode('div', { class: pn('fields') }, [
                        t.createVNode(
                          Lo,
                          {
                            modelValue: l.name,
                            'onUpdate:modelValue': (e) => (l.name = e),
                            clearable: !0,
                            label: mn('name'),
                            rules: f.value.name,
                            placeholder: mn('name'),
                            onFocus: () => m('name'),
                          },
                          null
                        ),
                        t.createVNode(
                          Lo,
                          {
                            modelValue: l.tel,
                            'onUpdate:modelValue': (e) => (l.tel = e),
                            clearable: !0,
                            type: 'tel',
                            label: mn('tel'),
                            rules: f.value.tel,
                            maxlength: e.telMaxlength,
                            placeholder: mn('tel'),
                            onFocus: () => m('tel'),
                          },
                          null
                        ),
                        t.withDirectives(
                          t.createVNode(
                            Lo,
                            {
                              readonly: !0,
                              label: mn('area'),
                              'is-link': !n,
                              modelValue: d.value,
                              rules: f.value.areaCode,
                              placeholder: e.areaPlaceholder || mn('area'),
                              onFocus: () => m('areaCode'),
                              onClick: () => {
                                o('click-area'), (i.value = !n);
                              },
                            },
                            null
                          ),
                          [[t.vShow, e.showArea]]
                        ),
                        t.createVNode(
                          dn,
                          {
                            show: e.showDetail,
                            rows: e.detailRows,
                            rules: f.value.addressDetail,
                            value: l.addressDetail,
                            focused: s.value,
                            maxlength: e.detailMaxlength,
                            searchResult: e.searchResult,
                            showSearchResult: e.showSearchResult,
                            onBlur: w,
                            onFocus: () => m('addressDetail'),
                            onInput: h,
                            'onSelect-search': (e) => o('select-search', e),
                          },
                          null
                        ),
                        e.showPostal &&
                          t.withDirectives(
                            t.createVNode(
                              Lo,
                              {
                                modelValue: l.postalCode,
                                'onUpdate:modelValue': (e) =>
                                  (l.postalCode = e),
                                type: 'tel',
                                rules: f.value.postalCode,
                                label: mn('postal'),
                                maxlength: '6',
                                placeholder: mn('postal'),
                                onFocus: () => m('postalCode'),
                              },
                              null
                            ),
                            [[t.vShow, !u.value]]
                          ),
                        null == (p = a.default) ? void 0 : p.call(a),
                      ]),
                      x(),
                      t.withDirectives(
                        t.createVNode('div', { class: pn('buttons') }, [
                          t.createVNode(
                            xt,
                            {
                              block: !0,
                              round: !0,
                              type: 'danger',
                              text: e.saveButtonText || mn('save'),
                              class: pn('button'),
                              loading: e.isSaving,
                              nativeType: 'submit',
                            },
                            null
                          ),
                          e.showDelete &&
                            t.createVNode(
                              xt,
                              {
                                block: !0,
                                round: !0,
                                class: pn('button'),
                                loading: e.isDeleting,
                                text: e.deleteButtonText || mn('delete'),
                                onClick: b,
                              },
                              null
                            ),
                        ]),
                        [[t.vShow, !u.value]]
                      ),
                      t.createVNode(
                        Yt,
                        {
                          show: i.value,
                          'onUpdate:show': (e) => (i.value = e),
                          round: !0,
                          teleport: 'body',
                          position: 'bottom',
                          lazyRender: !1,
                        },
                        {
                          default: () => [
                            t.createVNode(
                              go,
                              {
                                ref: r,
                                value: l.areaCode,
                                loading: !c.value,
                                areaList: e.areaList,
                                columnsPlaceholder: e.areaColumnsPlaceholder,
                                onConfirm: g,
                                onCancel: () => {
                                  i.value = !1;
                                },
                              },
                              null
                            ),
                          ],
                        }
                      ),
                    ];
                  },
                }
              );
            }
          );
        },
      })
    ),
    [gn, bn] = Oe('radio-group'),
    yn = {
      disabled: Boolean,
      iconSize: c,
      direction: String,
      modelValue: s,
      checkedColor: String,
    },
    wn = Symbol(gn);
  const xn = Re(
      t.defineComponent({
        name: gn,
        props: yn,
        emits: ['change', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          const { linkChildren: a } = C(wn);
          return (
            t.watch(
              () => e.modelValue,
              (e) => o('change', e)
            ),
            a({ props: e, updateValue: (e) => o('update:modelValue', e) }),
            j(() => e.modelValue),
            () => {
              var o;
              return t.createVNode(
                'div',
                { class: bn([e.direction]), role: 'radiogroup' },
                [null == (o = n.default) ? void 0 : o.call(n)]
              );
            }
          );
        },
      })
    ),
    [Vn, Nn] = Oe('tag'),
    Cn = {
      size: String,
      mark: Boolean,
      show: d,
      type: v('default'),
      color: String,
      plain: Boolean,
      round: Boolean,
      textColor: String,
      closeable: Boolean,
    };
  const kn = Re(
      t.defineComponent({
        name: Vn,
        props: Cn,
        emits: ['close'],
        setup(e, { slots: o, emit: n }) {
          const a = (e) => {
              e.stopPropagation(), n('close', e);
            },
            r = () => {
              var n;
              const {
                  type: r,
                  mark: l,
                  plain: i,
                  round: s,
                  size: c,
                  closeable: d,
                } = e,
                u = { mark: l, plain: i, round: s };
              c && (u[c] = c);
              const p =
                d &&
                t.createVNode(
                  ut,
                  { name: 'cross', class: [Nn('close'), Le], onClick: a },
                  null
                );
              return t.createVNode(
                'span',
                {
                  style: e.plain
                    ? { color: e.textColor || e.color, borderColor: e.color }
                    : { color: e.textColor, background: e.color },
                  class: Nn([u, r]),
                },
                [null == (n = o.default) ? void 0 : n.call(o), p]
              );
            };
          return () =>
            t.createVNode(
              t.Transition,
              { name: e.closeable ? 'van-fade' : void 0 },
              { default: () => [e.show ? r() : null] }
            );
        },
      })
    ),
    Sn = {
      name: s,
      shape: v('round'),
      disabled: Boolean,
      iconSize: c,
      modelValue: s,
      checkedColor: String,
      labelPosition: String,
      labelDisabled: Boolean,
    };
  var Tn = t.defineComponent({
    props: n({}, Sn, {
      bem: u(Function),
      role: String,
      parent: Object,
      checked: Boolean,
      bindGroup: d,
    }),
    emits: ['click', 'toggle'],
    setup(e, { emit: o, slots: n }) {
      const a = t.ref(),
        r = (t) => {
          if (e.parent && e.bindGroup) return e.parent.props[t];
        },
        l = t.computed(() => r('disabled') || e.disabled),
        i = t.computed(() => r('direction')),
        s = t.computed(() => {
          const t = e.checkedColor || r('checkedColor');
          if (t && e.checked && !l.value)
            return { borderColor: t, backgroundColor: t };
        }),
        c = (t) => {
          const { target: n } = t,
            r = a.value,
            i = r === n || (null == r ? void 0 : r.contains(n));
          l.value || (!i && e.labelDisabled) || o('toggle'), o('click', t);
        },
        d = () => {
          const { bem: o, shape: i, checked: c } = e,
            d = e.iconSize || r('iconSize');
          return t.createVNode(
            'div',
            {
              ref: a,
              class: o('icon', [i, { disabled: l.value, checked: c }]),
              style: { fontSize: se(d) },
            },
            [
              n.icon
                ? n.icon({ checked: c, disabled: l.value })
                : t.createVNode(ut, { name: 'success', style: s.value }, null),
            ]
          );
        },
        u = () => {
          if (n.default)
            return t.createVNode(
              'span',
              {
                class: e.bem('label', [e.labelPosition, { disabled: l.value }]),
              },
              [n.default()]
            );
        };
      return () => {
        const o = 'left' === e.labelPosition ? [u(), d()] : [d(), u()];
        return t.createVNode(
          'div',
          {
            role: e.role,
            class: e.bem([
              { disabled: l.value, 'label-disabled': e.labelDisabled },
              i.value,
            ]),
            tabindex: l.value ? void 0 : 0,
            'aria-checked': e.checked,
            onClick: c,
          },
          [o]
        );
      };
    },
  });
  const [Bn, Dn] = Oe('radio');
  const On = Re(
      t.defineComponent({
        name: Bn,
        props: Sn,
        emits: ['update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          const { parent: a } = V(wn),
            r = () => {
              a ? a.updateValue(e.name) : o('update:modelValue', e.name);
            };
          return () =>
            t.createVNode(
              Tn,
              t.mergeProps(
                {
                  bem: Dn,
                  role: 'radio',
                  parent: a,
                  checked: (a ? a.props.modelValue : e.modelValue) === e.name,
                  onToggle: r,
                },
                e
              ),
              l(n, ['default', 'icon'])
            );
        },
      })
    ),
    [In, An] = Oe('address-item');
  var Pn = t.defineComponent({
    name: In,
    props: {
      address: u(Object),
      disabled: Boolean,
      switchable: Boolean,
      defaultTagText: String,
    },
    emits: ['edit', 'click', 'select'],
    setup(e, { slots: o, emit: a }) {
      const r = () => {
          e.switchable && a('select'), a('click');
        },
        l = () =>
          t.createVNode(
            ut,
            {
              name: 'edit',
              class: An('edit'),
              onClick: (e) => {
                e.stopPropagation(), a('edit'), a('click');
              },
            },
            null
          ),
        i = () => {
          const { address: n, disabled: a, switchable: r } = e,
            l = [
              t.createVNode('div', { class: An('name') }, [
                `${n.name} ${n.tel}`,
                o.tag
                  ? o.tag(e.address)
                  : e.address.isDefault && e.defaultTagText
                  ? t.createVNode(
                      kn,
                      { type: 'danger', round: !0, class: An('tag') },
                      { default: () => [e.defaultTagText] }
                    )
                  : void 0,
              ]),
              t.createVNode('div', { class: An('address') }, [n.address]),
            ];
          return r && !a
            ? t.createVNode(
                On,
                { name: n.id, iconSize: 18 },
                { default: () => [l] }
              )
            : l;
        };
      return () => {
        var a;
        const { disabled: s } = e;
        return t.createVNode(
          'div',
          { class: An({ disabled: s }), onClick: r },
          [
            t.createVNode(
              Vo,
              { border: !1, valueClass: An('value') },
              { value: i, 'right-icon': l }
            ),
            null == (a = o.bottom)
              ? void 0
              : a.call(o, n({}, e.address, { disabled: s })),
          ]
        );
      };
    },
  });
  const [zn, En, $n] = Oe('address-list'),
    Mn = {
      list: p(),
      modelValue: c,
      switchable: d,
      disabledText: String,
      disabledList: p(),
      addButtonText: String,
      defaultTagText: String,
    };
  const Ln = Re(
      t.defineComponent({
        name: zn,
        props: Mn,
        emits: [
          'add',
          'edit',
          'select',
          'click-item',
          'edit-disabled',
          'select-disabled',
          'update:modelValue',
        ],
        setup(e, { slots: o, emit: n }) {
          const a = (a, r) => {
            if (a)
              return a.map((a, l) =>
                ((a, r, l) =>
                  t.createVNode(
                    Pn,
                    {
                      key: a.id,
                      address: a,
                      disabled: l,
                      switchable: e.switchable,
                      defaultTagText: e.defaultTagText,
                      onEdit: () => n(l ? 'edit-disabled' : 'edit', a, r),
                      onClick: () => n('click-item', a, r),
                      onSelect: () => {
                        n(l ? 'select-disabled' : 'select', a, r),
                          l || n('update:modelValue', a.id);
                      },
                    },
                    { bottom: o['item-bottom'], tag: o.tag }
                  ))(a, l, r)
              );
          };
          return () => {
            var r, l;
            const i = a(e.list),
              s = a(e.disabledList, !0),
              c =
                e.disabledText &&
                t.createVNode('div', { class: En('disabled-text') }, [
                  e.disabledText,
                ]);
            return t.createVNode('div', { class: En() }, [
              null == (r = o.top) ? void 0 : r.call(o),
              t.createVNode(
                xn,
                { modelValue: e.modelValue },
                { default: () => [i] }
              ),
              c,
              s,
              null == (l = o.default) ? void 0 : l.call(o),
              t.createVNode(
                'div',
                { class: [En('bottom'), 'van-safe-area-bottom'] },
                [
                  t.createVNode(
                    xt,
                    {
                      round: !0,
                      block: !0,
                      type: 'danger',
                      text: e.addButtonText || $n('add'),
                      class: En('add'),
                      onClick: () => n('add'),
                    },
                    null
                  ),
                ]
              ),
            ]);
          };
        },
      })
    ),
    [Fn, Hn, Rn] = Oe('calendar');
  function jn(e, t) {
    const o = e.getFullYear(),
      n = t.getFullYear();
    if (o === n) {
      const o = e.getMonth(),
        n = t.getMonth();
      return o === n ? 0 : o > n ? 1 : -1;
    }
    return o > n ? 1 : -1;
  }
  function Wn(e, t) {
    const o = jn(e, t);
    if (0 === o) {
      const o = e.getDate(),
        n = t.getDate();
      return o === n ? 0 : o > n ? 1 : -1;
    }
    return o;
  }
  const qn = (e) => new Date(e),
    Un = (e) => (Array.isArray(e) ? e.map(qn) : qn(e));
  function Yn(e, t) {
    const o = qn(e);
    return o.setDate(o.getDate() + t), o;
  }
  const Xn = (e) => Yn(e, -1),
    Gn = (e) => Yn(e, 1),
    _n = () => {
      const e = new Date();
      return e.setHours(0, 0, 0, 0), e;
    };
  function Zn() {
    const e = t.ref([]),
      o = [];
    t.onBeforeUpdate(() => {
      e.value = [];
    });
    return [
      e,
      (t) => (
        o[t] ||
          (o[t] = (o) => {
            e.value[t] = o;
          }),
        o[t]
      ),
    ];
  }
  const Kn = n({}, io, {
      filter: Function,
      columnsOrder: Array,
      formatter: { type: Function, default: (e, t) => t },
    }),
    Jn = Object.keys(io);
  function Qn(e, t) {
    if (e < 0) return [];
    const o = Array(e);
    let n = -1;
    for (; ++n < e; ) o[n] = t(n);
    return o;
  }
  const ea = (e, t) => 32 - new Date(e, t - 1, 32).getDate(),
    ta = (e, t) => {
      const o = ['setValues', 'setIndexes', 'setColumnIndex', 'setColumnValue'];
      return new Proxy(e, {
        get: (e, n) =>
          o.includes(n)
            ? (...o) => {
                e[n](...o), t();
              }
            : e[n],
      });
    },
    [oa] = Oe('calendar-day');
  var na = t.defineComponent({
    name: oa,
    props: {
      item: u(Object),
      color: String,
      index: Number,
      offset: m(0),
      rowHeight: String,
    },
    emits: ['click'],
    setup(e, { emit: o, slots: n }) {
      const a = t.computed(() => {
          var t;
          const { item: o, index: n, color: a, offset: r, rowHeight: l } = e,
            i = { height: l };
          if ('placeholder' === o.type) return (i.width = '100%'), i;
          if ((0 === n && (i.marginLeft = (100 * r) / 7 + '%'), a))
            switch (o.type) {
              case 'end':
              case 'start':
              case 'start-end':
              case 'multiple-middle':
              case 'multiple-selected':
                i.background = a;
                break;
              case 'middle':
                i.color = a;
            }
          return (
            r + ((null == (t = o.date) ? void 0 : t.getDate()) || 1) > 28 &&
              (i.marginBottom = 0),
            i
          );
        }),
        r = () => {
          'disabled' !== e.item.type && o('click', e.item);
        },
        l = () => {
          const { topInfo: o } = e.item;
          if (o || n['top-info'])
            return t.createVNode('div', { class: Hn('top-info') }, [
              n['top-info'] ? n['top-info'](e.item) : o,
            ]);
        },
        i = () => {
          const { bottomInfo: o } = e.item;
          if (o || n['bottom-info'])
            return t.createVNode('div', { class: Hn('bottom-info') }, [
              n['bottom-info'] ? n['bottom-info'](e.item) : o,
            ]);
        },
        s = () => {
          const { item: o, color: n, rowHeight: a } = e,
            { type: r, text: s } = o,
            c = [l(), s, i()];
          return 'selected' === r
            ? t.createVNode(
                'div',
                {
                  class: Hn('selected-day'),
                  style: { width: a, height: a, background: n },
                },
                [c]
              )
            : c;
        };
      return () => {
        const { type: o, className: n } = e.item;
        return 'placeholder' === o
          ? t.createVNode('div', { class: Hn('day'), style: a.value }, null)
          : t.createVNode(
              'div',
              {
                role: 'gridcell',
                style: a.value,
                class: [Hn('day', o), n],
                tabindex: 'disabled' === o ? void 0 : -1,
                onClick: r,
              },
              [s()]
            );
      };
    },
  });
  const [aa] = Oe('calendar-month'),
    ra = {
      date: u(Date),
      type: String,
      color: String,
      minDate: u(Date),
      maxDate: u(Date),
      showMark: Boolean,
      rowHeight: c,
      formatter: Function,
      lazyRender: Boolean,
      currentDate: [Date, Array],
      allowSameDay: Boolean,
      showSubtitle: Boolean,
      showMonthTitle: Boolean,
      firstDayOfWeek: Number,
    };
  var la = t.defineComponent({
    name: aa,
    props: ra,
    emits: ['click', 'update-height'],
    setup(e, { emit: o, slots: n }) {
      const [a, r] = (function (e = !1) {
          const o = t.ref(e);
          return [
            o,
            (e = !o.value) => {
              o.value = e;
            },
          ];
        })(),
        i = t.ref(),
        s = t.ref(),
        c = je(s),
        d = t.computed(() => {
          return (
            (t = e.date), Rn('monthTitle', t.getFullYear(), t.getMonth() + 1)
          );
          var t;
        }),
        u = t.computed(() => se(e.rowHeight)),
        p = t.computed(() => {
          const t = e.date.getDay();
          return e.firstDayOfWeek ? (t + 7 - e.firstDayOfWeek) % 7 : t;
        }),
        m = t.computed(() => ea(e.date.getFullYear(), e.date.getMonth() + 1)),
        f = t.computed(() => a.value || !e.lazyRender),
        v = (t) => {
          const { type: o, minDate: n, maxDate: a, currentDate: r } = e;
          if (Wn(t, n) < 0 || Wn(t, a) > 0) return 'disabled';
          if (null === r) return '';
          if (Array.isArray(r)) {
            if ('multiple' === o)
              return ((t) => {
                const o = (t) => e.currentDate.some((e) => 0 === Wn(e, t));
                if (o(t)) {
                  const e = Xn(t),
                    n = Gn(t),
                    a = o(e),
                    r = o(n);
                  return a && r
                    ? 'multiple-middle'
                    : a
                    ? 'end'
                    : r
                    ? 'start'
                    : 'multiple-selected';
                }
                return '';
              })(t);
            if ('range' === o)
              return ((t) => {
                const [o, n] = e.currentDate;
                if (!o) return '';
                const a = Wn(t, o);
                if (!n) return 0 === a ? 'start' : '';
                const r = Wn(t, n);
                return e.allowSameDay && 0 === a && 0 === r
                  ? 'start-end'
                  : 0 === a
                  ? 'start'
                  : 0 === r
                  ? 'end'
                  : a > 0 && r < 0
                  ? 'middle'
                  : '';
              })(t);
          } else if ('single' === o) return 0 === Wn(t, r) ? 'selected' : '';
          return '';
        },
        h = (t) => {
          if ('range' === e.type) {
            if ('start' === t || 'end' === t) return Rn(t);
            if ('start-end' === t) return `${Rn('start')}/${Rn('end')}`;
          }
        },
        g = () => {
          if (e.showMonthTitle)
            return t.createVNode('div', { class: Hn('month-title') }, [
              d.value,
            ]);
        },
        b = () => {
          if (e.showMark && f.value)
            return t.createVNode('div', { class: Hn('month-mark') }, [
              e.date.getMonth() + 1,
            ]);
        },
        y = t.computed(() => {
          const e = Math.ceil((m.value + p.value) / 7);
          return Array(e).fill({ type: 'placeholder' });
        }),
        w = t.computed(() => {
          const t = [],
            o = e.date.getFullYear(),
            n = e.date.getMonth();
          for (let a = 1; a <= m.value; a++) {
            const r = new Date(o, n, a),
              l = v(r);
            let i = { date: r, type: l, text: a, bottomInfo: h(l) };
            e.formatter && (i = e.formatter(i)), t.push(i);
          }
          return t;
        }),
        V = t.computed(() => w.value.filter((e) => 'disabled' === e.type)),
        N = (a, r) =>
          t.createVNode(
            na,
            {
              item: a,
              index: r,
              color: e.color,
              offset: p.value,
              rowHeight: u.value,
              onClick: (e) => o('click', e),
            },
            l(n, ['top-info', 'bottom-info'])
          );
      return (
        _e({
          getTitle: () => d.value,
          getHeight: () => c.value,
          setVisible: r,
          scrollToDate: (e, t) => {
            if (i.value) {
              const o = x(i.value),
                n = y.value.length,
                a =
                  ((Math.ceil((t.getDate() + p.value) / 7) - 1) * o.height) / n;
              K(e, o.top + a + e.scrollTop - x(e).top);
            }
          },
          disabledDays: V,
        }),
        () =>
          t.createVNode('div', { class: Hn('month'), ref: s }, [
            g(),
            t.createVNode('div', { ref: i, role: 'grid', class: Hn('days') }, [
              b(),
              (f.value ? w : y).value.map(N),
            ]),
          ])
      );
    },
  });
  const [ia] = Oe('calendar-header');
  var sa = t.defineComponent({
    name: ia,
    props: {
      title: String,
      subtitle: String,
      showTitle: Boolean,
      showSubtitle: Boolean,
      firstDayOfWeek: Number,
    },
    emits: ['click-subtitle'],
    setup(e, { slots: o, emit: n }) {
      const a = () => {
          if (e.showTitle) {
            const n = e.title || Rn('title'),
              a = o.title ? o.title() : n;
            return t.createVNode('div', { class: Hn('header-title') }, [a]);
          }
        },
        r = (e) => n('click-subtitle', e),
        l = () => {
          if (e.showSubtitle) {
            const n = o.subtitle ? o.subtitle() : e.subtitle;
            return t.createVNode(
              'div',
              { class: Hn('header-subtitle'), onClick: r },
              [n]
            );
          }
        },
        i = () => {
          const { firstDayOfWeek: o } = e,
            n = Rn('weekdays'),
            a = [...n.slice(o, 7), ...n.slice(0, o)];
          return t.createVNode('div', { class: Hn('weekdays') }, [
            a.map((e) => t.createVNode('span', { class: Hn('weekday') }, [e])),
          ]);
        };
      return () =>
        t.createVNode('div', { class: Hn('header') }, [a(), l(), i()]);
    },
  });
  const ca = {
    show: Boolean,
    type: v('single'),
    title: String,
    color: String,
    round: d,
    readonly: Boolean,
    poppable: d,
    maxRange: f(null),
    position: v('bottom'),
    teleport: [String, Object],
    showMark: d,
    showTitle: d,
    formatter: Function,
    rowHeight: c,
    confirmText: String,
    rangePrompt: String,
    lazyRender: d,
    showConfirm: d,
    defaultDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: d,
    closeOnPopstate: d,
    showRangePrompt: d,
    confirmDisabledText: String,
    closeOnClickOverlay: d,
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: d,
    minDate: { type: Date, validator: X, default: _n },
    maxDate: {
      type: Date,
      validator: X,
      default: () => {
        const e = _n();
        return new Date(e.getFullYear(), e.getMonth() + 6, e.getDate());
      },
    },
    firstDayOfWeek: { type: c, default: 0, validator: (e) => e >= 0 && e <= 6 },
  };
  const da = Re(
      t.defineComponent({
        name: Fn,
        props: ca,
        emits: [
          'select',
          'confirm',
          'unselect',
          'month-show',
          'over-range',
          'update:show',
          'click-subtitle',
        ],
        setup(e, { emit: o, slots: n }) {
          const a = (t, o = e.minDate, n = e.maxDate) =>
              -1 === Wn(t, o) ? o : 1 === Wn(t, n) ? n : t,
            r = (t = e.defaultDate) => {
              const { type: o, minDate: n, maxDate: r } = e;
              if (null === t) return t;
              const l = _n();
              if ('range' === o) {
                Array.isArray(t) || (t = []);
                return [a(t[0] || l, n, Xn(r)), a(t[1] || l, Gn(n))];
              }
              return 'multiple' === o
                ? Array.isArray(t)
                  ? t.map((e) => a(e))
                  : [a(l)]
                : ((t && !Array.isArray(t)) || (t = l), a(t));
            };
          let i;
          const s = t.ref(),
            c = t.ref(''),
            d = t.ref(r()),
            [u, p] = Zn(),
            m = t.computed(() =>
              e.firstDayOfWeek ? +e.firstDayOfWeek % 7 : 0
            ),
            f = t.computed(() => {
              const t = [],
                o = new Date(e.minDate);
              if (e.lazyRender && !e.show && e.poppable) return t;
              o.setDate(1);
              do {
                t.push(new Date(o)), o.setMonth(o.getMonth() + 1);
              } while (1 !== jn(o, e.maxDate));
              return t;
            }),
            v = t.computed(() => {
              if (d.value) {
                if ('range' === e.type) return !d.value[0] || !d.value[1];
                if ('multiple' === e.type) return !d.value.length;
              }
              return !d.value;
            }),
            h = () => {
              const e = Z(s.value),
                t = e + i,
                n = f.value.map((e, t) => u.value[t].getHeight());
              if (t > n.reduce((e, t) => e + t, 0) && e > 0) return;
              let a,
                r = 0;
              const l = [-1, -1];
              for (let i = 0; i < f.value.length; i++) {
                const s = u.value[i];
                r <= t &&
                  r + n[i] >= e &&
                  ((l[1] = i),
                  a || ((a = s), (l[0] = i)),
                  u.value[i].showed ||
                    ((u.value[i].showed = !0),
                    o('month-show', { date: s.date, title: s.getTitle() }))),
                  (r += n[i]);
              }
              f.value.forEach((e, t) => {
                const o = t >= l[0] - 1 && t <= l[1] + 1;
                u.value[t].setVisible(o);
              }),
                a && (c.value = a.getTitle());
            },
            b = (e) => {
              g(() => {
                f.value.some(
                  (t, o) =>
                    0 === jn(t, e) &&
                    (s.value && u.value[o].scrollToDate(s.value, e), !0)
                ),
                  h();
              });
            },
            y = () => {
              if (!e.poppable || e.show)
                if (d.value) {
                  const t = 'single' === e.type ? d.value : d.value[0];
                  b(t);
                } else g(h);
            },
            w = () => {
              (e.poppable && !e.show) ||
                (g(() => {
                  i = Math.floor(x(s).height);
                }),
                y());
            },
            V = (e = r()) => {
              (d.value = e), y();
            },
            N = () => {
              var e;
              return o('confirm', null != (e = d.value) ? e : Un(d.value));
            },
            C = (t, n) => {
              const a = (e) => {
                (d.value = e), o('select', Un(e));
              };
              if (n && 'range' === e.type) {
                const n = ((t) => {
                  const { maxRange: n, rangePrompt: a, showRangePrompt: r } = e;
                  return !(
                    n &&
                    (function (e) {
                      const t = e[0].getTime();
                      return (e[1].getTime() - t) / 864e5 + 1;
                    })(t) > n &&
                    (r && en(a || Rn('rangePrompt', n)), o('over-range'), 1)
                  );
                })(t);
                if (!n) return void a([t[0], Yn(t[0], +e.maxRange - 1)]);
              }
              a(t), n && !e.showConfirm && N();
            },
            k = t.computed(() =>
              u.value.reduce((e, t) => {
                var o, n;
                return (
                  e.push(
                    ...(null !=
                    (n = null == (o = t.disabledDays) ? void 0 : o.value)
                      ? n
                      : [])
                  ),
                  e
                );
              }, [])
            ),
            S = (t) => {
              if (e.readonly || !t.date) return;
              const { date: n } = t,
                { type: a } = e;
              if ('range' === a) {
                if (!d.value) return void C([n]);
                const [t, o] = d.value;
                if (t && !o) {
                  const o = Wn(n, t);
                  if (1 === o) {
                    const e = ((e, t, o) => {
                      var n;
                      return null ==
                        (n = e.find(
                          (e) => -1 === Wn(t, e.date) && -1 === Wn(e.date, o)
                        ))
                        ? void 0
                        : n.date;
                    })(k.value, t, n);
                    if (e) {
                      const o = Xn(e);
                      -1 === Wn(t, o) ? C([t, o]) : C([n]);
                    } else C([t, n], !0);
                  } else -1 === o ? C([n]) : e.allowSameDay && C([n, n], !0);
                } else C([n]);
              } else if ('multiple' === a) {
                if (!d.value) return void C([n]);
                const t = d.value,
                  a = t.findIndex((e) => 0 === Wn(e, n));
                if (-1 !== a) {
                  const [e] = t.splice(a, 1);
                  o('unselect', qn(e));
                } else
                  e.maxRange && t.length >= e.maxRange
                    ? en(e.rangePrompt || Rn('rangePrompt', e.maxRange))
                    : C([...t, n]);
              } else C(n, !0);
            },
            T = (e) => o('update:show', e),
            B = (o, a) => {
              const r = 0 !== a || !e.showSubtitle;
              return t.createVNode(
                la,
                t.mergeProps(
                  {
                    ref: p(a),
                    date: o,
                    currentDate: d.value,
                    showMonthTitle: r,
                    firstDayOfWeek: m.value,
                  },
                  l(e, [
                    'type',
                    'color',
                    'minDate',
                    'maxDate',
                    'showMark',
                    'formatter',
                    'rowHeight',
                    'lazyRender',
                    'showSubtitle',
                    'allowSameDay',
                  ]),
                  { onClick: S }
                ),
                l(n, ['top-info', 'bottom-info'])
              );
            },
            D = () => {
              if (n.footer) return n.footer();
              if (e.showConfirm) {
                const o = n['confirm-text'],
                  a = v.value,
                  r = a ? e.confirmDisabledText : e.confirmText;
                return t.createVNode(
                  xt,
                  {
                    round: !0,
                    block: !0,
                    type: 'danger',
                    color: e.color,
                    class: Hn('confirm'),
                    disabled: a,
                    nativeType: 'button',
                    onClick: N,
                  },
                  {
                    default: () => [
                      o ? o({ disabled: a }) : r || Rn('confirm'),
                    ],
                  }
                );
              }
            },
            O = () =>
              t.createVNode('div', { class: Hn() }, [
                t.createVNode(
                  sa,
                  {
                    title: e.title,
                    subtitle: c.value,
                    showTitle: e.showTitle,
                    showSubtitle: e.showSubtitle,
                    firstDayOfWeek: m.value,
                    'onClick-subtitle': (e) => o('click-subtitle', e),
                  },
                  l(n, ['title', 'subtitle'])
                ),
                t.createVNode(
                  'div',
                  { ref: s, class: Hn('body'), onScroll: h },
                  [f.value.map(B)]
                ),
                t.createVNode(
                  'div',
                  {
                    class: [
                      Hn('footer'),
                      { 'van-safe-area-bottom': e.safeAreaInsetBottom },
                    ],
                  },
                  [D()]
                ),
              ]);
          return (
            t.watch(() => e.show, w),
            t.watch(
              () => [e.type, e.minDate, e.maxDate],
              () => V(r(d.value))
            ),
            t.watch(
              () => e.defaultDate,
              (e = null) => {
                (d.value = e), y();
              }
            ),
            _e({ reset: V, scrollToDate: b, getSelectedDate: () => d.value }),
            A(w),
            () =>
              e.poppable
                ? t.createVNode(
                    Yt,
                    {
                      show: e.show,
                      class: Hn('popup'),
                      round: e.round,
                      position: e.position,
                      closeable: e.showTitle || e.showSubtitle,
                      teleport: e.teleport,
                      closeOnPopstate: e.closeOnPopstate,
                      safeAreaInsetTop: e.safeAreaInsetTop,
                      closeOnClickOverlay: e.closeOnClickOverlay,
                      'onUpdate:show': T,
                    },
                    { default: O }
                  )
                : O()
          );
        },
      })
    ),
    [ua, pa] = Oe('image'),
    ma = {
      src: String,
      alt: String,
      fit: String,
      position: String,
      round: Boolean,
      width: c,
      height: c,
      radius: c,
      lazyLoad: Boolean,
      iconSize: c,
      showError: d,
      errorIcon: v('photo-fail'),
      iconPrefix: String,
      showLoading: d,
      loadingIcon: v('photo'),
    };
  const fa = Re(
      t.defineComponent({
        name: ua,
        props: ma,
        emits: ['load', 'error'],
        setup(e, { emit: o, slots: n }) {
          const r = t.ref(!1),
            l = t.ref(!0),
            i = t.ref(),
            { $Lazyload: s } = t.getCurrentInstance().proxy,
            c = t.computed(() => {
              const t = { width: se(e.width), height: se(e.height) };
              return (
                W(e.radius) &&
                  ((t.overflow = 'hidden'), (t.borderRadius = se(e.radius))),
                t
              );
            });
          t.watch(
            () => e.src,
            () => {
              (r.value = !1), (l.value = !0);
            }
          );
          const d = (e) => {
              (l.value = !1), o('load', e);
            },
            u = (e) => {
              (r.value = !0), (l.value = !1), o('error', e);
            },
            p = (o, n, a) =>
              a
                ? a()
                : t.createVNode(
                    ut,
                    {
                      name: o,
                      size: e.iconSize,
                      class: n,
                      classPrefix: e.iconPrefix,
                    },
                    null
                  ),
            m = () => {
              if (r.value || !e.src) return;
              const o = {
                alt: e.alt,
                class: pa('img'),
                style: { objectFit: e.fit, objectPosition: e.position },
              };
              return e.lazyLoad
                ? t.withDirectives(
                    t.createVNode('img', t.mergeProps({ ref: i }, o), null),
                    [[t.resolveDirective('lazy'), e.src]]
                  )
                : t.createVNode(
                    'img',
                    t.mergeProps({ src: e.src, onLoad: d, onError: u }, o),
                    null
                  );
            },
            f = ({ el: e }) => {
              const o = () => {
                e === i.value && l.value && d();
              };
              i.value ? o() : t.nextTick(o);
            },
            v = ({ el: e }) => {
              e !== i.value || r.value || u();
            };
          return (
            s &&
              a &&
              (s.$on('loaded', f),
              s.$on('error', v),
              t.onBeforeUnmount(() => {
                s.$off('loaded', f), s.$off('error', v);
              })),
            () => {
              var o;
              return t.createVNode(
                'div',
                { class: pa({ round: e.round }), style: c.value },
                [
                  m(),
                  l.value && e.showLoading
                    ? t.createVNode('div', { class: pa('loading') }, [
                        p(e.loadingIcon, pa('loading-icon'), n.loading),
                      ])
                    : r.value && e.showError
                    ? t.createVNode('div', { class: pa('error') }, [
                        p(e.errorIcon, pa('error-icon'), n.error),
                      ])
                    : void 0,
                  null == (o = n.default) ? void 0 : o.call(n),
                ]
              );
            }
          );
        },
      })
    ),
    [va, ha] = Oe('card'),
    ga = {
      tag: String,
      num: c,
      desc: String,
      thumb: String,
      title: String,
      price: c,
      centered: Boolean,
      lazyLoad: Boolean,
      currency: v('¥'),
      thumbLink: String,
      originPrice: c,
    };
  const ba = Re(
    t.defineComponent({
      name: va,
      props: ga,
      emits: ['click-thumb'],
      setup(e, { slots: o, emit: n }) {
        const a = () => {
            if (o.tag || e.tag)
              return t.createVNode('div', { class: ha('tag') }, [
                o.tag
                  ? o.tag()
                  : t.createVNode(
                      kn,
                      { mark: !0, type: 'danger' },
                      { default: () => [e.tag] }
                    ),
              ]);
          },
          r = () => {
            if (o.thumb || e.thumb)
              return t.createVNode(
                'a',
                {
                  href: e.thumbLink,
                  class: ha('thumb'),
                  onClick: (e) => n('click-thumb', e),
                },
                [
                  o.thumb
                    ? o.thumb()
                    : t.createVNode(
                        fa,
                        {
                          src: e.thumb,
                          fit: 'cover',
                          width: '100%',
                          height: '100%',
                          lazyLoad: e.lazyLoad,
                        },
                        null
                      ),
                  a(),
                ]
              );
          },
          l = () => {
            const o = e.price.toString().split('.');
            return t.createVNode('div', null, [
              t.createVNode('span', { class: ha('price-currency') }, [
                e.currency,
              ]),
              t.createVNode('span', { class: ha('price-integer') }, [o[0]]),
              t.createTextVNode('.'),
              t.createVNode('span', { class: ha('price-decimal') }, [o[1]]),
            ]);
          };
        return () => {
          var n, a, i;
          const s = o.num || W(e.num),
            c = o.price || W(e.price),
            d = o['origin-price'] || W(e.originPrice),
            u = s || c || d || o.bottom,
            p =
              c &&
              t.createVNode('div', { class: ha('price') }, [
                o.price ? o.price() : l(),
              ]),
            m =
              d &&
              t.createVNode('div', { class: ha('origin-price') }, [
                o['origin-price']
                  ? o['origin-price']()
                  : `${e.currency} ${e.originPrice}`,
              ]),
            f =
              s &&
              t.createVNode('div', { class: ha('num') }, [
                o.num ? o.num() : `x${e.num}`,
              ]),
            v =
              o.footer &&
              t.createVNode('div', { class: ha('footer') }, [o.footer()]),
            h =
              u &&
              t.createVNode('div', { class: ha('bottom') }, [
                null == (n = o['price-top']) ? void 0 : n.call(o),
                p,
                m,
                f,
                null == (a = o.bottom) ? void 0 : a.call(o),
              ]);
          return t.createVNode('div', { class: ha() }, [
            t.createVNode('div', { class: ha('header') }, [
              r(),
              t.createVNode(
                'div',
                { class: ha('content', { centered: e.centered }) },
                [
                  t.createVNode('div', null, [
                    o.title
                      ? o.title()
                      : e.title
                      ? t.createVNode(
                          'div',
                          { class: [ha('title'), 'van-multi-ellipsis--l2'] },
                          [e.title]
                        )
                      : void 0,
                    o.desc
                      ? o.desc()
                      : e.desc
                      ? t.createVNode(
                          'div',
                          { class: [ha('desc'), 'van-ellipsis'] },
                          [e.desc]
                        )
                      : void 0,
                    null == (i = o.tags) ? void 0 : i.call(o),
                  ]),
                  h,
                ]
              ),
            ]),
            v,
          ]);
        };
      },
    })
  );
  const [ya, wa] = Oe('sticky'),
    xa = {
      zIndex: c,
      position: v('top'),
      container: Object,
      offsetTop: f(0),
      offsetBottom: f(0),
    };
  const Va = Re(
      t.defineComponent({
        name: ya,
        props: xa,
        emits: ['scroll', 'change'],
        setup(e, { emit: o, slots: r }) {
          const l = t.ref(),
            i = H(l),
            s = t.reactive({ fixed: !1, width: 0, height: 0, transform: 0 }),
            c = t.computed(() =>
              me('top' === e.position ? e.offsetTop : e.offsetBottom)
            ),
            d = t.computed(() => {
              const { fixed: e, height: t, width: o } = s;
              if (e) return { width: `${o}px`, height: `${t}px` };
            }),
            u = t.computed(() => {
              if (!s.fixed) return;
              const t = n(de(e.zIndex), {
                width: `${s.width}px`,
                height: `${s.height}px`,
                [e.position]: `${c.value}px`,
              });
              return (
                s.transform &&
                  (t.transform = `translate3d(0, ${s.transform}px, 0)`),
                t
              );
            }),
            p = () => {
              if (!l.value || re(l)) return;
              const { container: t, position: n } = e,
                a = x(l),
                r = Z(window);
              if (((s.width = a.width), (s.height = a.height), 'top' === n))
                if (t) {
                  const e = x(t),
                    o = e.bottom - c.value - s.height;
                  (s.fixed = c.value > a.top && e.bottom > 0),
                    (s.transform = o < 0 ? o : 0);
                } else s.fixed = c.value > a.top;
              else {
                const { clientHeight: e } = document.documentElement;
                if (t) {
                  const o = x(t),
                    n = e - o.top - c.value - s.height;
                  (s.fixed = e - c.value < a.bottom && e > o.top),
                    (s.transform = n < 0 ? -n : 0);
                } else s.fixed = e - c.value < a.bottom;
              }
              ((e) => {
                o('scroll', { scrollTop: e, isFixed: s.fixed });
              })(r);
            };
          return (
            t.watch(
              () => s.fixed,
              (e) => o('change', e)
            ),
            P('scroll', p, { target: i }),
            (function (e, o) {
              if (!a || !window.IntersectionObserver) return;
              const n = new IntersectionObserver(
                  (e) => {
                    o(e[0].intersectionRatio > 0);
                  },
                  { root: document.body }
                ),
                r = () => {
                  e.value && n.unobserve(e.value);
                };
              t.onDeactivated(r),
                t.onBeforeUnmount(r),
                A(() => {
                  e.value && n.observe(e.value);
                });
            })(l, p),
            () => {
              var e;
              return t.createVNode('div', { ref: l, style: d.value }, [
                t.createVNode(
                  'div',
                  { class: wa({ fixed: s.fixed }), style: u.value },
                  [null == (e = r.default) ? void 0 : e.call(r)]
                ),
              ]);
            }
          );
        },
      })
    ),
    [Na, Ca] = Oe('tab');
  var ka = t.defineComponent({
    name: Na,
    props: {
      id: String,
      dot: Boolean,
      type: String,
      color: String,
      title: String,
      badge: c,
      shrink: Boolean,
      isActive: Boolean,
      disabled: Boolean,
      controls: String,
      scrollable: Boolean,
      activeColor: String,
      inactiveColor: String,
      showZeroBadge: d,
    },
    setup(e, { slots: o }) {
      const n = t.computed(() => {
          const t = {},
            {
              type: o,
              color: n,
              disabled: a,
              isActive: r,
              activeColor: l,
              inactiveColor: i,
            } = e;
          n &&
            'card' === o &&
            ((t.borderColor = n),
            a || (r ? (t.backgroundColor = n) : (t.color = n)));
          const s = r ? l : i;
          return s && (t.color = s), t;
        }),
        a = () => {
          const n = t.createVNode(
            'span',
            { class: Ca('text', { ellipsis: !e.scrollable }) },
            [o.title ? o.title() : e.title]
          );
          return e.dot || (W(e.badge) && '' !== e.badge)
            ? t.createVNode(
                ot,
                { dot: e.dot, content: e.badge, showZero: e.showZeroBadge },
                { default: () => [n] }
              )
            : n;
        };
      return () =>
        t.createVNode(
          'div',
          {
            id: e.id,
            role: 'tab',
            class: [
              Ca([
                e.type,
                {
                  grow: e.scrollable && !e.shrink,
                  shrink: e.shrink,
                  active: e.isActive,
                  disabled: e.disabled,
                },
              ]),
            ],
            style: n.value,
            tabindex: e.disabled ? void 0 : e.isActive ? 0 : -1,
            'aria-selected': e.isActive,
            'aria-disabled': e.disabled || void 0,
            'aria-controls': e.controls,
          },
          [a()]
        );
    },
  });
  const [Sa, Ta] = Oe('swipe'),
    Ba = {
      loop: d,
      width: c,
      height: c,
      vertical: Boolean,
      autoplay: f(0),
      duration: f(500),
      touchable: d,
      lazyRender: Boolean,
      initialSwipe: f(0),
      indicatorColor: String,
      showIndicators: d,
      stopPropagation: d,
    },
    Da = Symbol(Sa);
  const Oa = Re(
      t.defineComponent({
        name: Sa,
        props: Ba,
        emits: ['change'],
        setup(e, { emit: o, slots: n }) {
          const a = t.ref(),
            r = t.reactive({
              rect: null,
              width: 0,
              height: 0,
              offset: 0,
              active: 0,
              swiping: !1,
            }),
            l = At(),
            { children: i, linkChildren: s } = C(Da),
            c = t.computed(() => i.length),
            d = t.computed(() => r[e.vertical ? 'height' : 'width']),
            u = t.computed(() =>
              e.vertical ? l.deltaY.value : l.deltaX.value
            ),
            p = t.computed(() => {
              if (r.rect) {
                return (
                  (e.vertical ? r.rect.height : r.rect.width) -
                  d.value * c.value
                );
              }
              return 0;
            }),
            m = t.computed(() => Math.ceil(Math.abs(p.value) / d.value)),
            f = t.computed(() => c.value * d.value),
            v = t.computed(() => (r.active + c.value) % c.value),
            g = t.computed(() => {
              const t = e.vertical ? 'vertical' : 'horizontal';
              return l.direction.value === t;
            }),
            b = t.computed(() => {
              const t = {
                transitionDuration: `${r.swiping ? 0 : e.duration}ms`,
                transform: `translate${e.vertical ? 'Y' : 'X'}(${r.offset}px)`,
              };
              if (d.value) {
                const o = e.vertical ? 'height' : 'width',
                  n = e.vertical ? 'width' : 'height';
                (t[o] = `${f.value}px`), (t[n] = e[n] ? `${e[n]}px` : '');
              }
              return t;
            }),
            w = (t, o = 0) => {
              let n = t * d.value;
              e.loop || (n = Math.min(n, -p.value));
              let a = o - n;
              return e.loop || (a = ge(a, p.value, 0)), a;
            },
            x = ({ pace: t = 0, offset: n = 0, emitChange: a }) => {
              if (c.value <= 1) return;
              const { active: l } = r,
                s = ((t) => {
                  const { active: o } = r;
                  return t
                    ? e.loop
                      ? ge(o + t, -1, c.value)
                      : ge(o + t, 0, m.value)
                    : o;
                })(t),
                d = w(s, n);
              if (e.loop) {
                if (i[0] && d !== p.value) {
                  const e = d < p.value;
                  i[0].setOffset(e ? f.value : 0);
                }
                if (i[c.value - 1] && 0 !== d) {
                  const e = d > 0;
                  i[c.value - 1].setOffset(e ? -f.value : 0);
                }
              }
              (r.active = s),
                (r.offset = d),
                a && s !== l && o('change', v.value);
            },
            V = () => {
              (r.swiping = !0),
                r.active <= -1
                  ? x({ pace: c.value })
                  : r.active >= c.value && x({ pace: -c.value });
            },
            N = () => {
              V(),
                l.reset(),
                y(() => {
                  (r.swiping = !1), x({ pace: 1, emitChange: !0 });
                });
            };
          let k;
          const S = () => clearTimeout(k),
            T = () => {
              S(),
                e.autoplay > 0 &&
                  c.value > 1 &&
                  (k = setTimeout(() => {
                    N(), T();
                  }, +e.autoplay));
            },
            B = (o = +e.initialSwipe) => {
              if (!a.value) return;
              const n = () => {
                var t, n;
                if (!re(a)) {
                  const o = {
                    width: a.value.offsetWidth,
                    height: a.value.offsetHeight,
                  };
                  (r.rect = o),
                    (r.width = +(null != (t = e.width) ? t : o.width)),
                    (r.height = +(null != (n = e.height) ? n : o.height));
                }
                c.value && (o = Math.min(c.value - 1, o)),
                  (r.active = o),
                  (r.swiping = !0),
                  (r.offset = w(o)),
                  i.forEach((e) => {
                    e.setOffset(0);
                  }),
                  T();
              };
              re(a) ? t.nextTick().then(n) : n();
            },
            D = () => B(r.active);
          let O;
          const I = (t) => {
              e.touchable && (l.start(t), (O = Date.now()), S(), V());
            },
            A = (t) => {
              e.touchable &&
                r.swiping &&
                (l.move(t),
                g.value && (ae(t, e.stopPropagation), x({ offset: u.value })));
            },
            P = () => {
              if (!e.touchable || !r.swiping) return;
              const t = Date.now() - O,
                o = u.value / t;
              if (
                (Math.abs(o) > 0.25 || Math.abs(u.value) > d.value / 2) &&
                g.value
              ) {
                const t = e.vertical ? l.offsetY.value : l.offsetX.value;
                let o = 0;
                (o = e.loop
                  ? t > 0
                    ? u.value > 0
                      ? -1
                      : 1
                    : 0
                  : -Math[u.value > 0 ? 'ceil' : 'floor'](u.value / d.value)),
                  x({ pace: o, emitChange: !0 });
              } else u.value && x({ pace: 0 });
              (r.swiping = !1), T();
            },
            z = (o, n) => {
              const a = n === v.value,
                r = a ? { backgroundColor: e.indicatorColor } : void 0;
              return t.createVNode(
                'i',
                { style: r, class: Ta('indicator', { active: a }) },
                null
              );
            };
          return (
            _e({
              prev: () => {
                V(),
                  l.reset(),
                  y(() => {
                    (r.swiping = !1), x({ pace: -1, emitChange: !0 });
                  });
              },
              next: N,
              state: r,
              resize: D,
              swipeTo: (t, o = {}) => {
                V(),
                  l.reset(),
                  y(() => {
                    let n;
                    (n =
                      e.loop && t === c.value
                        ? 0 === r.active
                          ? 0
                          : t
                        : t % c.value),
                      o.immediate
                        ? y(() => {
                            r.swiping = !1;
                          })
                        : (r.swiping = !1),
                      x({ pace: n - r.active, emitChange: !0 });
                  });
              },
            }),
            s({ size: d, props: e, count: c, activeIndicator: v }),
            t.watch(
              () => e.initialSwipe,
              (e) => B(+e)
            ),
            t.watch(c, () => B(r.active)),
            t.watch(() => e.autoplay, T),
            t.watch([le, ie], D),
            t.watch(
              (function () {
                if (!E && ((E = t.ref('visible')), h)) {
                  const e = () => {
                    E.value = document.hidden ? 'hidden' : 'visible';
                  };
                  e(), window.addEventListener('visibilitychange', e);
                }
                return E;
              })(),
              (e) => {
                'visible' === e ? T() : S();
              }
            ),
            t.onMounted(B),
            t.onActivated(() => B(r.active)),
            Mt(() => B(r.active)),
            t.onDeactivated(S),
            t.onBeforeUnmount(S),
            () => {
              var o;
              return t.createVNode('div', { ref: a, class: Ta() }, [
                t.createVNode(
                  'div',
                  {
                    style: b.value,
                    class: Ta('track', { vertical: e.vertical }),
                    onTouchstart: I,
                    onTouchmove: A,
                    onTouchend: P,
                    onTouchcancel: P,
                  },
                  [null == (o = n.default) ? void 0 : o.call(n)]
                ),
                n.indicator
                  ? n.indicator({ active: v.value, total: c.value })
                  : e.showIndicators && c.value > 1
                  ? t.createVNode(
                      'div',
                      { class: Ta('indicators', { vertical: e.vertical }) },
                      [Array(c.value).fill('').map(z)]
                    )
                  : void 0,
              ]);
            }
          );
        },
      })
    ),
    [Ia, Aa] = Oe('tabs');
  var Pa = t.defineComponent({
    name: Ia,
    props: {
      count: u(Number),
      inited: Boolean,
      animated: Boolean,
      duration: u(c),
      swipeable: Boolean,
      lazyRender: Boolean,
      currentIndex: u(Number),
    },
    emits: ['change'],
    setup(e, { emit: o, slots: n }) {
      const a = t.ref(),
        r = (e) => o('change', e),
        l = () => {
          var o;
          const l = null == (o = n.default) ? void 0 : o.call(n);
          return e.animated || e.swipeable
            ? t.createVNode(
                Oa,
                {
                  ref: a,
                  loop: !1,
                  class: Aa('track'),
                  duration: 1e3 * +e.duration,
                  touchable: e.swipeable,
                  lazyRender: e.lazyRender,
                  showIndicators: !1,
                  onChange: r,
                },
                { default: () => [l] }
              )
            : l;
        },
        i = (t) => {
          const o = a.value;
          o && o.state.active !== t && o.swipeTo(t, { immediate: !e.inited });
        };
      return (
        t.watch(() => e.currentIndex, i),
        t.onMounted(() => {
          i(e.currentIndex);
        }),
        () =>
          t.createVNode(
            'div',
            { class: Aa('content', { animated: e.animated || e.swipeable }) },
            [l()]
          )
      );
    },
  });
  const [za, Ea] = Oe('tabs'),
    $a = {
      type: v('line'),
      color: String,
      border: Boolean,
      sticky: Boolean,
      shrink: Boolean,
      active: f(0),
      duration: f(0.3),
      animated: Boolean,
      ellipsis: d,
      swipeable: Boolean,
      scrollspy: Boolean,
      offsetTop: f(0),
      background: String,
      lazyRender: d,
      lineWidth: c,
      lineHeight: c,
      beforeChange: Function,
      swipeThreshold: f(5),
      titleActiveColor: String,
      titleInactiveColor: String,
    },
    Ma = Symbol(za);
  var La = t.defineComponent({
    name: za,
    props: $a,
    emits: [
      'click',
      'change',
      'scroll',
      'disabled',
      'rendered',
      'click-tab',
      'update:active',
    ],
    setup(e, { emit: o, slots: n }) {
      var a, r;
      if ('production' !== process.env.NODE_ENV) {
        const e =
          null == (r = null == (a = t.getCurrentInstance()) ? void 0 : a.vnode)
            ? void 0
            : r.props;
        e &&
          'onClick' in e &&
          console.warn(
            '[Vant] Tabs: "click" event is deprecated, using "click-tab" instead.'
          ),
          e &&
            'onDisabled' in e &&
            console.warn(
              '[Vant] Tabs: "disabled" event is deprecated, using "click-tab" instead.'
            );
      }
      let i, s, c;
      const d = t.ref(),
        u = t.ref(),
        p = t.ref(),
        m = Po(),
        f = H(d),
        [v, h] = Zn(),
        { children: b, linkChildren: y } = C(Ma),
        w = t.reactive({
          inited: !1,
          position: '',
          lineStyle: {},
          currentIndex: -1,
        }),
        V = t.computed(
          () => b.length > e.swipeThreshold || !e.ellipsis || e.shrink
        ),
        N = t.computed(() => ({
          borderColor: e.color,
          background: e.background,
        })),
        k = (e, t) => {
          var o;
          return null != (o = e.name) ? o : t;
        },
        S = t.computed(() => {
          const e = b[w.currentIndex];
          if (e) return k(e, w.currentIndex);
        }),
        T = t.computed(() => me(e.offsetTop)),
        B = t.computed(() => (e.sticky ? T.value + i : 0)),
        D = (t) => {
          const o = u.value,
            n = v.value;
          if (!(V.value && o && n && n[w.currentIndex])) return;
          const a = n[w.currentIndex].$el;
          !(function (e, t, o) {
            let n = 0;
            const a = e.scrollLeft,
              r = 0 === o ? 1 : Math.round((1e3 * o) / 16);
            !(function o() {
              (e.scrollLeft += (t - a) / r), ++n < r && g(o);
            })();
          })(
            o,
            a.offsetLeft - (o.offsetWidth - a.offsetWidth) / 2,
            t ? 0 : +e.duration
          );
        },
        O = () => {
          const o = w.inited;
          t.nextTick(() => {
            const t = v.value;
            if (!t || !t[w.currentIndex] || 'line' !== e.type || re(d.value))
              return;
            const n = t[w.currentIndex].$el,
              { lineWidth: a, lineHeight: r } = e,
              l = n.offsetLeft + n.offsetWidth / 2,
              i = {
                width: se(a),
                backgroundColor: e.color,
                transform: `translateX(${l}px) translateX(-50%)`,
              };
            if ((o && (i.transitionDuration = `${e.duration}s`), W(r))) {
              const e = se(r);
              (i.height = e), (i.borderRadius = e);
            }
            w.lineStyle = i;
          });
        },
        I = (t) => {
          const n = ((e) => {
            const t = e < w.currentIndex ? -1 : 1;
            for (; e >= 0 && e < b.length; ) {
              if (!b[e].disabled) return e;
              e += t;
            }
          })(t);
          if (!W(n)) return;
          const a = b[n],
            r = k(a, n),
            l = null !== w.currentIndex;
          (w.currentIndex = n),
            r !== e.active &&
              (o('update:active', r), l && o('change', r, a.title));
        },
        z = (e) => {
          const t = b.find((t, o) => k(t, o) === e),
            o = t ? b.indexOf(t) : 0;
          I(o);
        },
        E = (t = !1) => {
          if (e.scrollspy) {
            const o = b[w.currentIndex].$el;
            if (o && f.value) {
              const n = ee(o, f.value) - B.value;
              (s = !0),
                (function (e, t, o, n) {
                  let a = Z(e);
                  const r = a < t,
                    l = 0 === o ? 1 : Math.round((1e3 * o) / 16),
                    i = (t - a) / l;
                  !(function o() {
                    (a += i),
                      ((r && a > t) || (!r && a < t)) && (a = t),
                      K(e, a),
                      (r && a < t) || (!r && a > t) ? g(o) : n && g(n);
                  })();
                })(f.value, n, t ? 0 : +e.duration, () => {
                  s = !1;
                });
            }
          }
        },
        $ = (e) => {
          (c = e.isFixed), o('scroll', e);
        },
        M = () =>
          b.map((n, a) =>
            t.createVNode(
              ka,
              t.mergeProps(
                {
                  key: n.id,
                  id: `${m}-${a}`,
                  ref: h(a),
                  type: e.type,
                  color: e.color,
                  style: n.titleStyle,
                  class: n.titleClass,
                  shrink: e.shrink,
                  isActive: a === w.currentIndex,
                  controls: n.id,
                  scrollable: V.value,
                  activeColor: e.titleActiveColor,
                  inactiveColor: e.titleInactiveColor,
                  onClick: (t) =>
                    ((t, n, a) => {
                      const { title: r, disabled: l } = b[n],
                        i = k(b[n], n);
                      l
                        ? o('disabled', i, r)
                        : (He(e.beforeChange, {
                            args: [i],
                            done: () => {
                              I(n), E();
                            },
                          }),
                          o('click', i, r),
                          Ke(t)),
                        o('click-tab', {
                          name: i,
                          title: r,
                          event: a,
                          disabled: l,
                        });
                    })(n, a, t),
                },
                l(n, ['dot', 'badge', 'title', 'disabled', 'showZeroBadge'])
              ),
              { title: n.$slots.title }
            )
          ),
        L = () => {
          if ('line' === e.type && b.length)
            return t.createVNode(
              'div',
              { class: Ea('line'), style: w.lineStyle },
              null
            );
        },
        F = () => {
          var o, a;
          const { type: r, border: l } = e;
          return t.createVNode(
            'div',
            { ref: p, class: [Ea('wrap'), { [$e]: 'line' === r && l }] },
            [
              t.createVNode(
                'div',
                {
                  ref: u,
                  role: 'tablist',
                  class: Ea('nav', [
                    r,
                    { shrink: e.shrink, complete: V.value },
                  ]),
                  style: N.value,
                  'aria-orientation': 'horizontal',
                },
                [
                  null == (o = n['nav-left']) ? void 0 : o.call(n),
                  M(),
                  L(),
                  null == (a = n['nav-right']) ? void 0 : a.call(n),
                ]
              ),
            ]
          );
        };
      t.watch([() => e.color, le], O),
        t.watch(
          () => e.active,
          (e) => {
            e !== S.value && z(e);
          }
        ),
        t.watch(
          () => b.length,
          () => {
            w.inited &&
              (z(e.active),
              O(),
              t.nextTick(() => {
                D(!0);
              }));
          }
        ),
        t.watch(
          () => w.currentIndex,
          () => {
            D(), O(), c && !e.scrollspy && Q(Math.ceil(ee(d.value) - T.value));
          }
        );
      return (
        _e({
          resize: O,
          scrollTo: (e) => {
            t.nextTick(() => {
              z(e), E(!0);
            });
          },
        }),
        t.onActivated(O),
        Mt(O),
        A(() => {
          z(e.active),
            t.nextTick(() => {
              (w.inited = !0), p.value && (i = x(p.value).height), D(!0);
            });
        }),
        P(
          'scroll',
          () => {
            if (e.scrollspy && !s) {
              const e = (() => {
                for (let e = 0; e < b.length; e++) {
                  const { top: t } = x(b[e].$el);
                  if (t > B.value) return 0 === e ? 0 : e - 1;
                }
                return b.length - 1;
              })();
              I(e);
            }
          },
          { target: f }
        ),
        y({
          id: m,
          props: e,
          setLine: O,
          onRendered: (e, t) => o('rendered', e, t),
          currentName: S,
          scrollIntoView: D,
        }),
        () => {
          var o;
          return t.createVNode('div', { ref: d, class: Ea([e.type]) }, [
            e.sticky
              ? t.createVNode(
                  Va,
                  { container: d.value, offsetTop: T.value, onScroll: $ },
                  {
                    default: () => {
                      var e;
                      return [
                        F(),
                        null == (e = n['nav-bottom']) ? void 0 : e.call(n),
                      ];
                    },
                  }
                )
              : [F(), null == (o = n['nav-bottom']) ? void 0 : o.call(n)],
            t.createVNode(
              Pa,
              {
                count: b.length,
                inited: w.inited,
                animated: e.animated,
                duration: e.duration,
                swipeable: e.swipeable,
                lazyRender: e.lazyRender,
                currentIndex: w.currentIndex,
                onChange: I,
              },
              {
                default: () => {
                  var e;
                  return [null == (e = n.default) ? void 0 : e.call(n)];
                },
              }
            ),
          ]);
        }
      );
    },
  });
  const Fa = Symbol(),
    [Ha, Ra] = Oe('swipe-item');
  const ja = Re(
      t.defineComponent({
        name: Ha,
        setup(e, { slots: o }) {
          let n;
          const a = t.reactive({ offset: 0, inited: !1, mounted: !1 }),
            { parent: r, index: l } = V(Da);
          if (!r)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error(
                '[Vant] <SwipeItem> must be a child component of <Swipe>.'
              )
            );
          const i = t.computed(() => {
              const e = {},
                { vertical: t } = r.props;
              return (
                r.size.value &&
                  (e[t ? 'height' : 'width'] = `${r.size.value}px`),
                a.offset &&
                  (e.transform = `translate${t ? 'Y' : 'X'}(${a.offset}px)`),
                e
              );
            }),
            s = t.computed(() => {
              const { loop: e, lazyRender: t } = r.props;
              if (!t || n) return !0;
              if (!a.mounted) return !1;
              const o = r.activeIndicator.value,
                i = r.count.value - 1,
                s = 0 === o && e ? i : o - 1,
                c = o === i && e ? 0 : o + 1;
              return (n = l.value === o || l.value === s || l.value === c), n;
            });
          return (
            t.onMounted(() => {
              t.nextTick(() => {
                a.mounted = !0;
              });
            }),
            _e({
              setOffset: (e) => {
                a.offset = e;
              },
            }),
            () => {
              var e;
              return t.createVNode('div', { class: Ra(), style: i.value }, [
                s.value ? (null == (e = o.default) ? void 0 : e.call(o)) : null,
              ]);
            }
          );
        },
      })
    ),
    [Wa, qa] = Oe('tab'),
    Ua = n({}, Ze, {
      dot: Boolean,
      name: c,
      badge: c,
      title: String,
      disabled: Boolean,
      titleClass: s,
      titleStyle: [String, Object],
      showZeroBadge: d,
    });
  const Ya = Re(
      t.defineComponent({
        name: Wa,
        props: Ua,
        setup(e, { slots: o }) {
          const n = Po(),
            a = t.ref(!1),
            { parent: r, index: l } = V(Ma);
          if (!r)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error('[Vant] <Tab> must be a child component of <Tabs>.')
            );
          const i = () => {
              var t;
              return null != (t = e.name) ? t : l.value;
            },
            s = t.computed(() => {
              const o = i() === r.currentName.value;
              return (
                o &&
                  !a.value &&
                  ((a.value = !0),
                  r.props.lazyRender &&
                    t.nextTick(() => {
                      r.onRendered(i(), e.title);
                    })),
                o
              );
            });
          return (
            t.watch(
              () => e.title,
              () => {
                r.setLine(), r.scrollIntoView();
              }
            ),
            t.provide(Fa, s),
            () => {
              var e;
              const i = `${r.id}-${l.value}`,
                {
                  animated: c,
                  swipeable: d,
                  scrollspy: u,
                  lazyRender: p,
                } = r.props;
              if (!o.default && !c) return;
              const m = u || s.value;
              if (c || d)
                return t.createVNode(
                  ja,
                  {
                    id: n,
                    role: 'tabpanel',
                    class: qa('panel-wrapper', { inactive: !s.value }),
                    tabindex: s.value ? 0 : -1,
                    'aria-hidden': !s.value,
                    'aria-labelledby': i,
                  },
                  {
                    default: () => {
                      var e;
                      return [
                        t.createVNode('div', { class: qa('panel') }, [
                          null == (e = o.default) ? void 0 : e.call(o),
                        ]),
                      ];
                    },
                  }
                );
              const f =
                a.value || u || !p
                  ? null == (e = o.default)
                    ? void 0
                    : e.call(o)
                  : null;
              return (
                _e({ id: n }),
                t.withDirectives(
                  t.createVNode(
                    'div',
                    {
                      id: n,
                      role: 'tabpanel',
                      class: qa('panel'),
                      tabindex: m ? 0 : -1,
                      'aria-labelledby': i,
                    },
                    [f]
                  ),
                  [[t.vShow, m]]
                )
              );
            }
          );
        },
      })
    ),
    Xa = Re(La),
    [Ga, _a, Za] = Oe('cascader'),
    Ka = {
      title: String,
      options: p(),
      closeable: d,
      swipeable: d,
      closeIcon: v('cross'),
      showHeader: d,
      modelValue: c,
      fieldNames: Object,
      placeholder: String,
      activeColor: String,
    };
  const Ja = Re(
      t.defineComponent({
        name: Ga,
        props: Ka,
        emits: ['close', 'change', 'finish', 'click-tab', 'update:modelValue'],
        setup(e, { slots: o, emit: a }) {
          const r = t.ref([]),
            l = t.ref(0),
            {
              text: i,
              value: s,
              children: c,
            } = n(
              { text: 'text', value: 'value', children: 'children' },
              e.fieldNames
            ),
            d = (e, t) => {
              for (const o of e) {
                if (o[s] === t) return [o];
                if (o[c]) {
                  const e = d(o[c], t);
                  if (e) return [o, ...e];
                }
              }
            },
            u = () => {
              const { options: o, modelValue: n } = e;
              if (void 0 !== n) {
                const e = d(o, n);
                if (e) {
                  let n = o;
                  return (
                    (r.value = e.map((e) => {
                      const t = { options: n, selected: e },
                        o = n.find((t) => t[s] === e[s]);
                      return o && (n = o[c]), t;
                    })),
                    n && r.value.push({ options: n, selected: null }),
                    void t.nextTick(() => {
                      l.value = r.value.length - 1;
                    })
                  );
                }
              }
              r.value = [{ options: o, selected: null }];
            },
            p = () => a('close'),
            m = ({ name: e, title: t }) => a('click-tab', e, t),
            f = (n, d, u) => {
              const { disabled: p } = n,
                m = !(!d || n[s] !== d[s]),
                f = n.color || (m ? e.activeColor : void 0),
                v = o.option
                  ? o.option({ option: n, selected: m })
                  : t.createVNode('span', null, [n[i]]);
              return t.createVNode(
                'li',
                {
                  role: 'menuitemradio',
                  class: [
                    _a('option', { selected: m, disabled: p }),
                    n.className,
                  ],
                  style: { color: f },
                  tabindex: p ? void 0 : m ? 0 : -1,
                  'aria-checked': m,
                  'aria-disabled': p || void 0,
                  onClick: () =>
                    ((e, o) => {
                      if (e.disabled) return;
                      if (
                        ((r.value[o].selected = e),
                        r.value.length > o + 1 &&
                          (r.value = r.value.slice(0, o + 1)),
                        e[c])
                      ) {
                        const n = { options: e[c], selected: null };
                        r.value[o + 1] ? (r.value[o + 1] = n) : r.value.push(n),
                          t.nextTick(() => {
                            l.value++;
                          });
                      }
                      const n = r.value.map((e) => e.selected).filter(Boolean);
                      a('update:modelValue', e[s]);
                      const i = {
                        value: e[s],
                        tabIndex: o,
                        selectedOptions: n,
                      };
                      a('change', i), e[c] || a('finish', i);
                    })(n, u),
                },
                [
                  v,
                  m
                    ? t.createVNode(
                        ut,
                        { name: 'success', class: _a('selected-icon') },
                        null
                      )
                    : null,
                ]
              );
            },
            v = (e, o, n) =>
              t.createVNode('ul', { role: 'menu', class: _a('options') }, [
                e.map((e) => f(e, o, n)),
              ]),
            h = (n, a) => {
              const { options: r, selected: l } = n,
                s = e.placeholder || Za('select'),
                c = l ? l[i] : s;
              return t.createVNode(
                Ya,
                { title: c, titleClass: _a('tab', { unselected: !l }) },
                {
                  default: () => {
                    var e, t;
                    return [
                      null == (e = o['options-top'])
                        ? void 0
                        : e.call(o, { tabIndex: a }),
                      v(r, l, a),
                      null == (t = o['options-bottom'])
                        ? void 0
                        : t.call(o, { tabIndex: a }),
                    ];
                  },
                }
              );
            };
          return (
            u(),
            t.watch(() => e.options, u, { deep: !0 }),
            t.watch(
              () => e.modelValue,
              (e) => {
                if (void 0 !== e) {
                  if (
                    r.value
                      .map((e) => {
                        var t;
                        return null == (t = e.selected) ? void 0 : t[s];
                      })
                      .includes(e)
                  )
                    return;
                }
                u();
              }
            ),
            () =>
              t.createVNode('div', { class: _a() }, [
                e.showHeader
                  ? t.createVNode('div', { class: _a('header') }, [
                      t.createVNode('h2', { class: _a('title') }, [
                        o.title ? o.title() : e.title,
                      ]),
                      e.closeable
                        ? t.createVNode(
                            ut,
                            {
                              name: e.closeIcon,
                              class: [_a('close-icon'), Le],
                              onClick: p,
                            },
                            null
                          )
                        : null,
                    ])
                  : null,
                t.createVNode(
                  Xa,
                  {
                    active: l.value,
                    'onUpdate:active': (e) => (l.value = e),
                    shrink: !0,
                    animated: !0,
                    class: _a('tabs'),
                    color: e.activeColor,
                    swipeable: e.swipeable,
                    'onClick-tab': m,
                  },
                  { default: () => [r.value.map(h)] }
                ),
              ])
          );
        },
      })
    ),
    [Qa, er] = Oe('cell-group'),
    tr = { title: String, inset: Boolean, border: d };
  const or = Re(
      t.defineComponent({
        name: Qa,
        inheritAttrs: !1,
        props: tr,
        setup(e, { slots: o, attrs: n }) {
          const a = () => {
            var a;
            return t.createVNode(
              'div',
              t.mergeProps(
                {
                  class: [
                    er({ inset: e.inset }),
                    { [$e]: e.border && !e.inset },
                  ],
                },
                n
              ),
              [null == (a = o.default) ? void 0 : a.call(o)]
            );
          };
          return () =>
            e.title || o.title
              ? t.createVNode(t.Fragment, null, [
                  t.createVNode(
                    'div',
                    { class: er('title', { inset: e.inset }) },
                    [o.title ? o.title() : e.title]
                  ),
                  a(),
                ])
              : a();
        },
      })
    ),
    [nr, ar] = Oe('checkbox-group'),
    rr = {
      max: c,
      disabled: Boolean,
      iconSize: c,
      direction: String,
      modelValue: p(),
      checkedColor: String,
    },
    lr = Symbol(nr);
  var ir = t.defineComponent({
    name: nr,
    props: rr,
    emits: ['change', 'update:modelValue'],
    setup(e, { emit: o, slots: n }) {
      const { children: a, linkChildren: r } = C(lr),
        l = (e) => o('update:modelValue', e);
      return (
        t.watch(
          () => e.modelValue,
          (e) => o('change', e)
        ),
        _e({
          toggleAll: (e = {}) => {
            'boolean' == typeof e && (e = { checked: e });
            const { checked: t, skipDisabled: o } = e,
              n = a
                .filter(
                  (e) =>
                    !!e.props.bindGroup &&
                    (e.props.disabled && o
                      ? e.checked.value
                      : null != t
                      ? t
                      : !e.checked.value)
                )
                .map((e) => e.name);
            l(n);
          },
        }),
        j(() => e.modelValue),
        r({ props: e, updateValue: l }),
        () => {
          var o;
          return t.createVNode('div', { class: ar([e.direction]) }, [
            null == (o = n.default) ? void 0 : o.call(n),
          ]);
        }
      );
    },
  });
  const [sr, cr] = Oe('checkbox'),
    dr = n({}, Sn, { bindGroup: d });
  const ur = Re(
      t.defineComponent({
        name: sr,
        props: dr,
        emits: ['change', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          const { parent: a } = V(lr),
            r = t.computed(() =>
              a && e.bindGroup
                ? -1 !== a.props.modelValue.indexOf(e.name)
                : !!e.modelValue
            ),
            i = (t = !r.value) => {
              a && e.bindGroup
                ? ((t) => {
                    const { name: o } = e,
                      { max: n, modelValue: r } = a.props,
                      l = r.slice();
                    if (t)
                      (n && l.length >= n) ||
                        l.includes(o) ||
                        (l.push(o), e.bindGroup && a.updateValue(l));
                    else {
                      const t = l.indexOf(o);
                      -1 !== t &&
                        (l.splice(t, 1), e.bindGroup && a.updateValue(l));
                    }
                  })(t)
                : o('update:modelValue', t);
            };
          return (
            t.watch(
              () => e.modelValue,
              (e) => o('change', e)
            ),
            _e({ toggle: i, props: e, checked: r }),
            j(() => e.modelValue),
            () =>
              t.createVNode(
                Tn,
                t.mergeProps(
                  {
                    bem: cr,
                    role: 'checkbox',
                    parent: a,
                    checked: r.value,
                    onToggle: i,
                  },
                  e
                ),
                l(n, ['default', 'icon'])
              )
          );
        },
      })
    ),
    pr = Re(ir),
    [mr, fr] = Oe('circle');
  let vr = 0;
  const hr = (e) => Math.min(Math.max(+e, 0), 100);
  const gr = {
    text: String,
    size: c,
    fill: v('none'),
    rate: f(100),
    speed: f(0),
    color: [String, Object],
    clockwise: d,
    layerColor: String,
    currentRate: m(0),
    strokeWidth: f(40),
    strokeLinecap: String,
    startPosition: v('top'),
  };
  const br = Re(
      t.defineComponent({
        name: mr,
        props: gr,
        emits: ['update:currentRate'],
        setup(e, { emit: o, slots: n }) {
          const a = 'van-circle-' + vr++,
            r = t.computed(() => +e.strokeWidth + 1e3),
            l = t.computed(() =>
              (function (e, t) {
                const o = e ? 1 : 0;
                return `M ${t / 2} ${
                  t / 2
                } m 0, -500 a 500, 500 0 1, ${o} 0, 1000 a 500, 500 0 1, ${o} 0, -1000`;
              })(e.clockwise, r.value)
            ),
            i = t.computed(() => {
              const t = { top: 0, right: 90, bottom: 180, left: 270 }[
                e.startPosition
              ];
              if (t) return { transform: `rotate(${t}deg)` };
            });
          t.watch(
            () => e.rate,
            (t) => {
              let n;
              const a = Date.now(),
                r = e.currentRate,
                l = hr(t),
                i = Math.abs((1e3 * (r - l)) / +e.speed),
                s = () => {
                  const e = Date.now(),
                    t = Math.min((e - a) / i, 1) * (l - r) + r;
                  o('update:currentRate', hr(parseFloat(t.toFixed(1)))),
                    (l > r ? t < l : t > l) && (n = g(s));
                };
              e.speed ? (n && b(n), (n = g(s))) : o('update:currentRate', l);
            },
            { immediate: !0 }
          );
          const s = () => {
              const { strokeWidth: o, currentRate: n, strokeLinecap: r } = e,
                i = (3140 * n) / 100,
                s = U(e.color) ? `url(#${a})` : e.color,
                c = {
                  stroke: s,
                  strokeWidth: +o + 1 + 'px',
                  strokeLinecap: r,
                  strokeDasharray: `${i}px 3140px`,
                };
              return t.createVNode(
                'path',
                { d: l.value, style: c, class: fr('hover'), stroke: s },
                null
              );
            },
            c = () => {
              const o = {
                fill: e.fill,
                stroke: e.layerColor,
                strokeWidth: `${e.strokeWidth}px`,
              };
              return t.createVNode(
                'path',
                { class: fr('layer'), style: o, d: l.value },
                null
              );
            },
            d = () => {
              const { color: o } = e;
              if (!U(o)) return;
              const n = Object.keys(o)
                .sort((e, t) => parseFloat(e) - parseFloat(t))
                .map((e, n) =>
                  t.createVNode(
                    'stop',
                    { key: n, offset: e, 'stop-color': o[e] },
                    null
                  )
                );
              return t.createVNode('defs', null, [
                t.createVNode(
                  'linearGradient',
                  { id: a, x1: '100%', y1: '0%', x2: '0%', y2: '0%' },
                  [n]
                ),
              ]);
            };
          return () =>
            t.createVNode('div', { class: fr(), style: ce(e.size) }, [
              t.createVNode(
                'svg',
                { viewBox: `0 0 ${r.value} ${r.value}`, style: i.value },
                [d(), c(), s()]
              ),
              n.default
                ? n.default()
                : e.text
                ? t.createVNode('div', { class: fr('text') }, [e.text])
                : void 0,
            ]);
        },
      })
    ),
    [yr, wr] = Oe('row'),
    xr = Symbol(yr),
    Vr = {
      tag: v('div'),
      wrap: d,
      align: String,
      gutter: f(0),
      justify: String,
    };
  var Nr = t.defineComponent({
    name: yr,
    props: Vr,
    setup(e, { slots: o }) {
      const { children: n, linkChildren: a } = C(xr),
        r = t.computed(() => {
          const e = [[]];
          let t = 0;
          return (
            n.forEach((o, n) => {
              (t += Number(o.span)),
                t > 24 ? (e.push([n]), (t -= 24)) : e[e.length - 1].push(n);
            }),
            e
          );
        });
      return (
        a({
          spaces: t.computed(() => {
            const t = Number(e.gutter),
              o = [];
            return t
              ? (r.value.forEach((e) => {
                  const n = (t * (e.length - 1)) / e.length;
                  e.forEach((e, a) => {
                    if (0 === a) o.push({ right: n });
                    else {
                      const a = t - o[e - 1].right,
                        r = n - a;
                      o.push({ left: a, right: r });
                    }
                  });
                }),
                o)
              : o;
          }),
        }),
        () => {
          const { tag: n, wrap: a, align: r, justify: l } = e;
          return t.createVNode(
            n,
            {
              class: wr({ [`align-${r}`]: r, [`justify-${l}`]: l, nowrap: !a }),
            },
            {
              default: () => {
                var e;
                return [null == (e = o.default) ? void 0 : e.call(o)];
              },
            }
          );
        }
      );
    },
  });
  const [Cr, kr] = Oe('col'),
    Sr = { tag: v('div'), span: f(0), offset: c };
  const Tr = Re(
      t.defineComponent({
        name: Cr,
        props: Sr,
        setup(e, { slots: o }) {
          const { parent: n, index: a } = V(xr),
            r = t.computed(() => {
              if (!n) return;
              const { spaces: e } = n;
              if (e && e.value && e.value[a.value]) {
                const { left: t, right: o } = e.value[a.value];
                return {
                  paddingLeft: t ? `${t}px` : null,
                  paddingRight: o ? `${o}px` : null,
                };
              }
            });
          return () => {
            const { tag: n, span: a, offset: l } = e;
            return t.createVNode(
              n,
              { style: r.value, class: kr({ [a]: a, [`offset-${l}`]: l }) },
              {
                default: () => {
                  var e;
                  return [null == (e = o.default) ? void 0 : e.call(o)];
                },
              }
            );
          };
        },
      })
    ),
    [Br, Dr] = Oe('collapse'),
    Or = Symbol(Br),
    Ir = {
      border: d,
      accordion: Boolean,
      modelValue: { type: [String, Number, Array], default: '' },
    };
  const Ar = Re(
      t.defineComponent({
        name: Br,
        props: Ir,
        emits: ['change', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          const { linkChildren: a, children: r } = C(Or),
            l = (e) => {
              o('change', e), o('update:modelValue', e);
            };
          return (
            _e({
              toggleAll: (t = {}) => {
                if (e.accordion) return;
                'boolean' == typeof t && (t = { expanded: t });
                const { expanded: o, skipDisabled: n } = t,
                  a = r
                    .filter((e) =>
                      e.disabled && n
                        ? e.expanded.value
                        : null != o
                        ? o
                        : !e.expanded.value
                    )
                    .map((e) => e.itemName.value);
                l(a);
              },
            }),
            a({
              toggle: (t, o) => {
                const { accordion: n, modelValue: a } = e;
                l(
                  n
                    ? t === a
                      ? ''
                      : t
                    : o
                    ? a.concat(t)
                    : a.filter((e) => e !== t)
                );
              },
              isExpanded: (t) => {
                const { accordion: o, modelValue: n } = e;
                return (
                  !(
                    'production' !== process.env.NODE_ENV &&
                    !(function (e, t) {
                      return t && Array.isArray(e)
                        ? (console.error(
                            '[Vant] Collapse: "v-model" should not be Array in accordion mode'
                          ),
                          !1)
                        : !(
                            !t &&
                            !Array.isArray(e) &&
                            (console.error(
                              '[Vant] Collapse: "v-model" should be Array in non-accordion mode'
                            ),
                            1)
                          );
                    })(n, o)
                  ) && (o ? n === t : n.includes(t))
                );
              },
            }),
            () => {
              var o;
              return t.createVNode(
                'div',
                { class: [Dr(), { [$e]: e.border }] },
                [null == (o = n.default) ? void 0 : o.call(n)]
              );
            }
          );
        },
      })
    ),
    [Pr, zr] = Oe('collapse-item'),
    Er = ['icon', 'title', 'value', 'label', 'right-icon'],
    $r = n({}, wo, {
      name: c,
      isLink: d,
      disabled: Boolean,
      readonly: Boolean,
      lazyRender: d,
    });
  const Mr = Re(
      t.defineComponent({
        name: Pr,
        props: $r,
        setup(e, { slots: o }) {
          const n = t.ref(),
            a = t.ref(),
            { parent: r, index: i } = V(Or);
          if (!r)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error(
                '[Vant] <CollapseItem> must be a child component of <Collapse>.'
              )
            );
          const s = t.computed(() => {
              var t;
              return null != (t = e.name) ? t : i.value;
            }),
            c = t.computed(() => r.isExpanded(s.value)),
            d = t.ref(c.value),
            u = Et(() => d.value || !e.lazyRender),
            p = () => {
              c.value ? n.value && (n.value.style.height = '') : (d.value = !1);
            };
          t.watch(c, (e, o) => {
            if (null === o) return;
            e && (d.value = !0);
            (e ? t.nextTick : g)(() => {
              if (!a.value || !n.value) return;
              const { offsetHeight: t } = a.value;
              if (t) {
                const o = `${t}px`;
                (n.value.style.height = e ? '0' : o),
                  y(() => {
                    n.value && (n.value.style.height = e ? o : '0');
                  });
              } else p();
            });
          });
          const m = (e = !c.value) => {
              r.toggle(s.value, e);
            },
            f = () => {
              e.disabled || e.readonly || m();
            },
            v = () => {
              const { border: n, disabled: a, readonly: r } = e,
                i = l(e, Object.keys(wo));
              return (
                r && (i.isLink = !1),
                (a || r) && (i.clickable = !1),
                t.createVNode(
                  Vo,
                  t.mergeProps(
                    {
                      role: 'button',
                      class: zr('title', {
                        disabled: a,
                        expanded: c.value,
                        borderless: !n,
                      }),
                      'aria-expanded': String(c.value),
                      onClick: f,
                    },
                    i
                  ),
                  l(o, Er)
                )
              );
            },
            h = u(() => {
              var e;
              return t.withDirectives(
                t.createVNode(
                  'div',
                  { ref: n, class: zr('wrapper'), onTransitionend: p },
                  [
                    t.createVNode('div', { ref: a, class: zr('content') }, [
                      null == (e = o.default) ? void 0 : e.call(o),
                    ]),
                  ]
                ),
                [[t.vShow, d.value]]
              );
            });
          return (
            _e({ toggle: m, expanded: c, itemName: s }),
            () =>
              t.createVNode(
                'div',
                { class: [zr({ border: i.value && e.border })] },
                [v(), h()]
              )
          );
        },
      })
    ),
    Lr = Re(it),
    [Fr, Hr, Rr] = Oe('contact-card'),
    jr = {
      tel: String,
      name: String,
      type: v('add'),
      addText: String,
      editable: d,
    };
  const Wr = Re(
      t.defineComponent({
        name: Fr,
        props: jr,
        emits: ['click'],
        setup(e, { emit: o }) {
          const n = (t) => {
              e.editable && o('click', t);
            },
            a = () =>
              'add' === e.type
                ? e.addText || Rr('addContact')
                : [
                    t.createVNode('div', null, [`${Rr('name')}：${e.name}`]),
                    t.createVNode('div', null, [`${Rr('tel')}：${e.tel}`]),
                  ];
          return () =>
            t.createVNode(
              Vo,
              {
                center: !0,
                icon: 'edit' === e.type ? 'contact' : 'add-square',
                class: Hr([e.type]),
                border: !1,
                isLink: e.editable,
                valueClass: Hr('value'),
                onClick: n,
              },
              { value: a }
            );
        },
      })
    ),
    [qr, Ur, Yr] = Oe('contact-edit'),
    Xr = { tel: '', name: '' },
    Gr = {
      isEdit: Boolean,
      isSaving: Boolean,
      isDeleting: Boolean,
      showSetDefault: Boolean,
      setDefaultLabel: String,
      contactInfo: { type: Object, default: () => n({}, Xr) },
      telValidator: { type: Function, default: G },
    };
  const _r = Re(
      t.defineComponent({
        name: qr,
        props: Gr,
        emits: ['save', 'delete', 'change-default'],
        setup(e, { emit: o }) {
          const a = t.reactive(n({}, Xr, e.contactInfo)),
            r = () => {
              e.isSaving || o('save', a);
            },
            l = () => o('delete', a),
            i = () =>
              t.createVNode(
                rn,
                {
                  modelValue: a.isDefault,
                  'onUpdate:modelValue': (e) => (a.isDefault = e),
                  size: 24,
                  onChange: (e) => o('change-default', e),
                },
                null
              ),
            s = () => {
              if (e.showSetDefault)
                return t.createVNode(
                  Vo,
                  {
                    title: e.setDefaultLabel,
                    class: Ur('switch-cell'),
                    border: !1,
                  },
                  { 'right-icon': i }
                );
            };
          return (
            t.watch(
              () => e.contactInfo,
              (e) => n(a, Xr, e)
            ),
            () =>
              t.createVNode(
                So,
                { class: Ur(), onSubmit: r },
                {
                  default: () => [
                    t.createVNode('div', { class: Ur('fields') }, [
                      t.createVNode(
                        Lo,
                        {
                          modelValue: a.name,
                          'onUpdate:modelValue': (e) => (a.name = e),
                          clearable: !0,
                          label: Yr('name'),
                          rules: [{ required: !0, message: Yr('nameEmpty') }],
                          maxlength: '30',
                          placeholder: Yr('name'),
                        },
                        null
                      ),
                      t.createVNode(
                        Lo,
                        {
                          modelValue: a.tel,
                          'onUpdate:modelValue': (e) => (a.tel = e),
                          clearable: !0,
                          type: 'tel',
                          label: Yr('tel'),
                          rules: [
                            {
                              validator: e.telValidator,
                              message: Yr('telInvalid'),
                            },
                          ],
                          placeholder: Yr('tel'),
                        },
                        null
                      ),
                    ]),
                    s(),
                    t.createVNode('div', { class: Ur('buttons') }, [
                      t.createVNode(
                        xt,
                        {
                          block: !0,
                          round: !0,
                          type: 'danger',
                          text: Yr('save'),
                          class: Ur('button'),
                          loading: e.isSaving,
                          nativeType: 'submit',
                        },
                        null
                      ),
                      e.isEdit &&
                        t.createVNode(
                          xt,
                          {
                            block: !0,
                            round: !0,
                            text: Yr('delete'),
                            class: Ur('button'),
                            loading: e.isDeleting,
                            onClick: l,
                          },
                          null
                        ),
                    ]),
                  ],
                }
              )
          );
        },
      })
    ),
    [Zr, Kr, Jr] = Oe('contact-list'),
    Qr = {
      list: Array,
      addText: String,
      modelValue: s,
      defaultTagText: String,
    };
  const el = Re(
    t.defineComponent({
      name: Zr,
      props: Qr,
      emits: ['add', 'edit', 'select', 'update:modelValue'],
      setup(e, { emit: o }) {
        const n = (n, a) =>
          t.createVNode(
            Vo,
            {
              key: n.id,
              isLink: !0,
              center: !0,
              class: Kr('item'),
              valueClass: Kr('item-value'),
              onClick: () => {
                o('update:modelValue', n.id), o('select', n, a);
              },
            },
            {
              icon: () =>
                t.createVNode(
                  ut,
                  {
                    name: 'edit',
                    class: Kr('edit'),
                    onClick: (e) => {
                      e.stopPropagation(), o('edit', n, a);
                    },
                  },
                  null
                ),
              value: () => {
                const o = [`${n.name}，${n.tel}`];
                return (
                  n.isDefault &&
                    e.defaultTagText &&
                    o.push(
                      t.createVNode(
                        kn,
                        { type: 'danger', round: !0, class: Kr('item-tag') },
                        { default: () => [e.defaultTagText] }
                      )
                    ),
                  o
                );
              },
              'right-icon': () =>
                t.createVNode(
                  On,
                  { class: Kr('radio'), name: n.id, iconSize: 16 },
                  null
                ),
            }
          );
        return () =>
          t.createVNode('div', { class: Kr() }, [
            t.createVNode(
              xn,
              { modelValue: e.modelValue, class: Kr('group') },
              { default: () => [e.list && e.list.map(n)] }
            ),
            t.createVNode(
              'div',
              { class: [Kr('bottom'), 'van-safe-area-bottom'] },
              [
                t.createVNode(
                  xt,
                  {
                    round: !0,
                    block: !0,
                    type: 'danger',
                    class: Kr('add'),
                    text: e.addText || Jr('addContact'),
                    onClick: () => o('add'),
                  },
                  null
                ),
              ]
            ),
          ]);
      },
    })
  );
  const [tl, ol] = Oe('count-down'),
    nl = {
      time: f(0),
      format: v('HH:mm:ss'),
      autoStart: d,
      millisecond: Boolean,
    };
  const al = Re(
    t.defineComponent({
      name: tl,
      props: nl,
      emits: ['change', 'finish'],
      setup(e, { emit: o, slots: n }) {
        const {
            start: a,
            pause: r,
            reset: l,
            current: i,
          } = I({
            time: +e.time,
            millisecond: e.millisecond,
            onChange: (e) => o('change', e),
            onFinish: () => o('finish'),
          }),
          s = t.computed(() =>
            (function (e, t) {
              const { days: o } = t;
              let { hours: n, minutes: a, seconds: r, milliseconds: l } = t;
              if (
                (e.includes('DD')
                  ? (e = e.replace('DD', he(o)))
                  : (n += 24 * o),
                e.includes('HH') ? (e = e.replace('HH', he(n))) : (a += 60 * n),
                e.includes('mm') ? (e = e.replace('mm', he(a))) : (r += 60 * a),
                e.includes('ss')
                  ? (e = e.replace('ss', he(r)))
                  : (l += 1e3 * r),
                e.includes('S'))
              ) {
                const t = he(l, 3);
                e = e.includes('SSS')
                  ? e.replace('SSS', t)
                  : e.includes('SS')
                  ? e.replace('SS', t.slice(0, 2))
                  : e.replace('S', t.charAt(0));
              }
              return e;
            })(e.format, i.value)
          ),
          c = () => {
            l(+e.time), e.autoStart && a();
          };
        return (
          t.watch(() => e.time, c, { immediate: !0 }),
          _e({ start: a, pause: r, reset: c }),
          () =>
            t.createVNode('div', { role: 'timer', class: ol() }, [
              n.default ? n.default(i.value) : s.value,
            ])
        );
      },
    })
  );
  function rl(e) {
    const t = new Date(1e3 * e);
    return `${t.getFullYear()}.${he(t.getMonth() + 1)}.${he(t.getDate())}`;
  }
  const ll = (e) => (e / 100).toFixed(e % 100 == 0 ? 0 : e % 10 == 0 ? 1 : 2),
    [il, sl, cl] = Oe('coupon');
  const dl = Re(
      t.defineComponent({
        name: il,
        props: {
          chosen: Boolean,
          coupon: u(Object),
          disabled: Boolean,
          currency: v('¥'),
        },
        setup(e) {
          const o = t.computed(() => {
              const { startAt: t, endAt: o } = e.coupon;
              return `${rl(t)} - ${rl(o)}`;
            }),
            n = t.computed(() => {
              const { coupon: o, currency: n } = e;
              if (o.valueDesc)
                return [
                  o.valueDesc,
                  t.createVNode('span', null, [o.unitDesc || '']),
                ];
              if (o.denominations) {
                const e = ll(o.denominations);
                return [t.createVNode('span', null, [n]), ` ${e}`];
              }
              return o.discount
                ? cl(
                    'discount',
                    ((a = o.discount) / 10).toFixed(a % 10 == 0 ? 0 : 1)
                  )
                : '';
              var a;
            }),
            a = t.computed(() => {
              const t = ll(e.coupon.originCondition || 0);
              return '0' === t ? cl('unlimited') : cl('condition', t);
            });
          return () => {
            const { chosen: r, coupon: l, disabled: i } = e,
              s = (i && l.reason) || l.description;
            return t.createVNode('div', { class: sl({ disabled: i }) }, [
              t.createVNode('div', { class: sl('content') }, [
                t.createVNode('div', { class: sl('head') }, [
                  t.createVNode('h2', { class: sl('amount') }, [n.value]),
                  t.createVNode('p', { class: sl('condition') }, [
                    l.condition || a.value,
                  ]),
                ]),
                t.createVNode('div', { class: sl('body') }, [
                  t.createVNode('p', { class: sl('name') }, [l.name]),
                  t.createVNode('p', { class: sl('valid') }, [o.value]),
                  !i &&
                    t.createVNode(
                      ur,
                      { class: sl('corner'), modelValue: r },
                      null
                    ),
                ]),
              ]),
              s && t.createVNode('p', { class: sl('description') }, [s]),
            ]);
          };
        },
      })
    ),
    [ul, pl, ml] = Oe('coupon-cell'),
    fl = {
      title: String,
      border: d,
      editable: d,
      coupons: p(),
      currency: v('¥'),
      chosenCoupon: f(-1),
    };
  function vl({ coupons: e, chosenCoupon: t, currency: o }) {
    const n = e[+t];
    if (n) {
      let e = 0;
      return (
        W(n.value)
          ? ({ value: e } = n)
          : W(n.denominations) && (e = n.denominations),
        `-${o} ${(e / 100).toFixed(2)}`
      );
    }
    return 0 === e.length ? ml('noCoupon') : ml('count', e.length);
  }
  const hl = Re(
      t.defineComponent({
        name: ul,
        props: fl,
        setup: (e) => () => {
          const o = e.coupons[+e.chosenCoupon];
          return t.createVNode(
            Vo,
            {
              class: pl(),
              value: vl(e),
              title: e.title || ml('title'),
              border: e.border,
              isLink: e.editable,
              valueClass: pl('value', { selected: o }),
            },
            null
          );
        },
      })
    ),
    gl = (e) => `van-empty-${e}`,
    bl = (e) => `url(#${gl(e)})`,
    yl = (e, o, n) =>
      t.createVNode(
        'stop',
        { 'stop-color': e, offset: `${o}%`, 'stop-opacity': n },
        null
      ),
    wl = (e, t) => [yl(e, 0), yl(t, 100)],
    xl = (e) => [
      t.createVNode('defs', null, [
        t.createVNode(
          'radialGradient',
          {
            id: gl(e),
            cx: '50%',
            cy: '54%',
            fx: '50%',
            fy: '54%',
            r: '297%',
            gradientTransform: 'matrix(-.16 0 0 -.33 .58 .72)',
          },
          [yl('#EBEDF0', 0), yl('#F2F3F5', 100, 0.3)]
        ),
      ]),
      t.createVNode(
        'ellipse',
        { fill: bl(e), opacity: '.8', cx: '80', cy: '140', rx: '46', ry: '8' },
        null
      ),
    ],
    Vl = () => [
      t.createVNode('defs', null, [
        t.createVNode(
          'linearGradient',
          { id: gl('a'), x1: '64%', y1: '100%', x2: '64%' },
          [yl('#FFF', 0, 0.5), yl('#F2F3F5', 100)]
        ),
      ]),
      t.createVNode('g', { opacity: '.8' }, [
        t.createVNode(
          'path',
          { d: 'M36 131V53H16v20H2v58h34z', fill: bl('a') },
          null
        ),
        t.createVNode(
          'path',
          { d: 'M123 15h22v14h9v77h-31V15z', fill: bl('a') },
          null
        ),
      ]),
    ],
    Nl = () => [
      t.createVNode('defs', null, [
        t.createVNode(
          'linearGradient',
          { id: gl('b'), x1: '64%', y1: '97%', x2: '64%', y2: '0%' },
          [yl('#F2F3F5', 0, 0.3), yl('#F2F3F5', 100)]
        ),
      ]),
      t.createVNode('g', { opacity: '.8' }, [
        t.createVNode(
          'path',
          {
            d: 'M87 6c3 0 7 3 8 6a8 8 0 1 1-1 16H80a7 7 0 0 1-8-6c0-4 3-7 6-7 0-5 4-9 9-9Z',
            fill: bl('b'),
          },
          null
        ),
        t.createVNode(
          'path',
          {
            d: 'M19 23c2 0 3 1 4 3 2 0 4 2 4 4a4 4 0 0 1-4 3v1h-7v-1l-1 1c-2 0-3-2-3-4 0-1 1-3 3-3 0-2 2-4 4-4Z',
            fill: bl('b'),
          },
          null
        ),
      ]),
    ],
    [Cl, kl] = Oe('empty'),
    Sl = {
      error: () =>
        t.createVNode('svg', { viewBox: '0 0 160 160' }, [
          t.createVNode('defs', null, [
            t.createVNode(
              'linearGradient',
              { x1: '50%', x2: '50%', y2: '100%', id: gl(8) },
              [wl('#EAEDF1', '#DCDEE0')]
            ),
          ]),
          Vl(),
          Nl(),
          xl('c'),
          t.createVNode(
            'path',
            {
              d: 'm59 60 21 21 21-21h3l9 9v3L92 93l21 21v3l-9 9h-3l-21-21-21 21h-3l-9-9v-3l21-21-21-21v-3l9-9h3Z',
              fill: bl(8),
            },
            null
          ),
        ]),
      search: () =>
        t.createVNode('svg', { viewBox: '0 0 160 160' }, [
          t.createVNode('defs', null, [
            t.createVNode(
              'linearGradient',
              { x1: '50%', y1: '100%', x2: '50%', id: gl(9) },
              [wl('#EEE', '#D8D8D8')]
            ),
            t.createVNode(
              'linearGradient',
              { x1: '100%', y1: '50%', y2: '50%', id: gl(10) },
              [wl('#F2F3F5', '#DCDEE0')]
            ),
            t.createVNode(
              'linearGradient',
              { x1: '50%', x2: '50%', y2: '100%', id: gl(11) },
              [wl('#F2F3F5', '#DCDEE0')]
            ),
            t.createVNode(
              'linearGradient',
              { x1: '50%', x2: '50%', y2: '100%', id: gl(12) },
              [wl('#FFF', '#F7F8FA')]
            ),
          ]),
          Vl(),
          Nl(),
          xl('d'),
          t.createVNode(
            'g',
            { transform: 'rotate(-45 113 -4)', fill: 'none' },
            [
              t.createVNode(
                'rect',
                {
                  fill: bl(9),
                  x: '24',
                  y: '52.8',
                  width: '5.8',
                  height: '19',
                  rx: '1',
                },
                null
              ),
              t.createVNode(
                'rect',
                {
                  fill: bl(10),
                  x: '22.1',
                  y: '67.3',
                  width: '9.9',
                  height: '28',
                  rx: '1',
                },
                null
              ),
              t.createVNode(
                'circle',
                {
                  stroke: bl(11),
                  'stroke-width': '8',
                  cx: '27',
                  cy: '27',
                  r: '27',
                },
                null
              ),
              t.createVNode(
                'circle',
                { fill: bl(12), cx: '27', cy: '27', r: '16' },
                null
              ),
              t.createVNode(
                'path',
                {
                  d: 'M37 7c-8 0-15 5-16 12',
                  stroke: bl(11),
                  'stroke-width': '3',
                  opacity: '.5',
                  'stroke-linecap': 'round',
                  transform: 'rotate(45 29 13)',
                },
                null
              ),
            ]
          ),
        ]),
      network: () =>
        t.createVNode('svg', { viewBox: '0 0 160 160' }, [
          t.createVNode('defs', null, [
            t.createVNode(
              'linearGradient',
              { id: gl(1), x1: '64%', y1: '100%', x2: '64%' },
              [yl('#FFF', 0, 0.5), yl('#F2F3F5', 100)]
            ),
            t.createVNode(
              'linearGradient',
              { id: gl(2), x1: '50%', x2: '50%', y2: '84%' },
              [yl('#EBEDF0', 0), yl('#DCDEE0', 100, 0)]
            ),
            t.createVNode(
              'linearGradient',
              { id: gl(3), x1: '100%', x2: '100%', y2: '100%' },
              [wl('#EAEDF0', '#DCDEE0')]
            ),
            t.createVNode(
              'radialGradient',
              {
                id: gl(4),
                cx: '50%',
                cy: '0%',
                fx: '50%',
                fy: '0%',
                r: '100%',
                gradientTransform: 'matrix(0 1 -.54 0 .5 -.5)',
              },
              [yl('#EBEDF0', 0), yl('#FFF', 100, 0)]
            ),
          ]),
          t.createVNode('g', { fill: 'none' }, [
            Vl(),
            t.createVNode('path', { fill: bl(4), d: 'M0 139h160v21H0z' }, null),
            t.createVNode(
              'path',
              {
                d: 'M80 54a7 7 0 0 1 3 13v27l-2 2h-2a2 2 0 0 1-2-2V67a7 7 0 0 1 3-13z',
                fill: bl(2),
              },
              null
            ),
            t.createVNode(
              'g',
              { opacity: '.6', 'stroke-linecap': 'round', 'stroke-width': '7' },
              [
                t.createVNode(
                  'path',
                  { d: 'M64 47a19 19 0 0 0-5 13c0 5 2 10 5 13', stroke: bl(3) },
                  null
                ),
                t.createVNode(
                  'path',
                  { d: 'M53 36a34 34 0 0 0 0 48', stroke: bl(3) },
                  null
                ),
                t.createVNode(
                  'path',
                  { d: 'M95 73a19 19 0 0 0 6-13c0-5-2-9-6-13', stroke: bl(3) },
                  null
                ),
                t.createVNode(
                  'path',
                  { d: 'M106 84a34 34 0 0 0 0-48', stroke: bl(3) },
                  null
                ),
              ]
            ),
            t.createVNode('g', { transform: 'translate(31 105)' }, [
              t.createVNode(
                'rect',
                { fill: '#EBEDF0', width: '98', height: '34', rx: '2' },
                null
              ),
              t.createVNode(
                'rect',
                {
                  fill: '#FFF',
                  x: '9',
                  y: '8',
                  width: '80',
                  height: '18',
                  rx: '1.1',
                },
                null
              ),
              t.createVNode(
                'rect',
                {
                  fill: '#EBEDF0',
                  x: '15',
                  y: '12',
                  width: '18',
                  height: '6',
                  rx: '1.1',
                },
                null
              ),
            ]),
          ]),
        ]),
      default: () =>
        t.createVNode('svg', { viewBox: '0 0 160 160' }, [
          t.createVNode('defs', null, [
            t.createVNode(
              'linearGradient',
              { x1: '50%', x2: '50%', y2: '100%', id: gl(5) },
              [wl('#F2F3F5', '#DCDEE0')]
            ),
            t.createVNode(
              'linearGradient',
              { x1: '95%', y1: '48%', x2: '5.5%', y2: '51%', id: gl(6) },
              [wl('#EAEDF1', '#DCDEE0')]
            ),
            t.createVNode(
              'linearGradient',
              { y1: '45%', x2: '100%', y2: '54%', id: gl(7) },
              [wl('#EAEDF1', '#DCDEE0')]
            ),
          ]),
          Vl(),
          Nl(),
          t.createVNode('g', { transform: 'translate(36 50)', fill: 'none' }, [
            t.createVNode('g', { transform: 'translate(8)' }, [
              t.createVNode(
                'rect',
                {
                  fill: '#EBEDF0',
                  opacity: '.6',
                  x: '38',
                  y: '13',
                  width: '36',
                  height: '53',
                  rx: '2',
                },
                null
              ),
              t.createVNode(
                'rect',
                { fill: bl(5), width: '64', height: '66', rx: '2' },
                null
              ),
              t.createVNode(
                'rect',
                {
                  fill: '#FFF',
                  x: '6',
                  y: '6',
                  width: '52',
                  height: '55',
                  rx: '1',
                },
                null
              ),
              t.createVNode(
                'g',
                { transform: 'translate(15 17)', fill: bl(6) },
                [
                  t.createVNode(
                    'rect',
                    { width: '34', height: '6', rx: '1' },
                    null
                  ),
                  t.createVNode('path', { d: 'M0 14h34v6H0z' }, null),
                  t.createVNode(
                    'rect',
                    { y: '28', width: '34', height: '6', rx: '1' },
                    null
                  ),
                ]
              ),
            ]),
            t.createVNode(
              'rect',
              { fill: bl(7), y: '61', width: '88', height: '28', rx: '1' },
              null
            ),
            t.createVNode(
              'rect',
              {
                fill: '#F7F8FA',
                x: '29',
                y: '72',
                width: '30',
                height: '6',
                rx: '1',
              },
              null
            ),
          ]),
        ]),
    },
    Tl = {
      image: v('default'),
      imageSize: [Number, String, Array],
      description: String,
    };
  const Bl = Re(
      t.defineComponent({
        name: Cl,
        props: Tl,
        setup(e, { slots: o }) {
          const n = () => {
              const n = o.description ? o.description() : e.description;
              if (n)
                return t.createVNode('p', { class: kl('description') }, [n]);
            },
            a = () => {
              if (o.default)
                return t.createVNode('div', { class: kl('bottom') }, [
                  o.default(),
                ]);
            };
          return () => {
            return t.createVNode('div', { class: kl() }, [
              t.createVNode(
                'div',
                { class: kl('image'), style: ce(e.imageSize) },
                [
                  o.image
                    ? o.image()
                    : (null == (r = Sl[e.image]) ? void 0 : r.call(Sl)) ||
                      t.createVNode('img', { src: e.image }, null),
                ]
              ),
              n(),
              a(),
            ]);
            var r;
          };
        },
      })
    ),
    [Dl, Ol, Il] = Oe('coupon-list'),
    Al = {
      code: v(''),
      coupons: p(),
      currency: v('¥'),
      showCount: d,
      emptyImage: String,
      chosenCoupon: m(-1),
      enabledTitle: String,
      disabledTitle: String,
      disabledCoupons: p(),
      showExchangeBar: d,
      showCloseButton: d,
      closeButtonText: String,
      inputPlaceholder: String,
      exchangeMinLength: m(1),
      exchangeButtonText: String,
      displayedCouponIndex: m(-1),
      exchangeButtonLoading: Boolean,
      exchangeButtonDisabled: Boolean,
    };
  const Pl = Re(
      t.defineComponent({
        name: Dl,
        props: Al,
        emits: ['change', 'exchange', 'update:code'],
        setup(e, { emit: o, slots: n }) {
          const [a, r] = Zn(),
            l = t.ref(),
            i = t.ref(),
            s = t.ref(0),
            c = t.ref(0),
            d = t.ref(e.code),
            u = t.computed(
              () =>
                !e.exchangeButtonLoading &&
                (e.exchangeButtonDisabled ||
                  !d.value ||
                  d.value.length < e.exchangeMinLength)
            ),
            p = () => {
              const e = x(l).height,
                t = x(i).height + 44;
              c.value = (e > t ? e : ie.value) - t;
            },
            m = () => {
              o('exchange', d.value), e.code || (d.value = '');
            },
            f = (e) => {
              t.nextTick(() => {
                var t;
                return null == (t = a.value[e]) ? void 0 : t.scrollIntoView();
              });
            },
            v = () =>
              t.createVNode(
                Bl,
                { image: e.emptyImage },
                {
                  default: () => [
                    t.createVNode('p', { class: Ol('empty-tip') }, [
                      Il('noCoupon'),
                    ]),
                  ],
                }
              ),
            h = () => {
              if (e.showExchangeBar)
                return t.createVNode(
                  'div',
                  { ref: i, class: Ol('exchange-bar') },
                  [
                    t.createVNode(
                      Lo,
                      {
                        modelValue: d.value,
                        'onUpdate:modelValue': (e) => (d.value = e),
                        clearable: !0,
                        border: !1,
                        class: Ol('field'),
                        placeholder: e.inputPlaceholder || Il('placeholder'),
                        maxlength: '20',
                      },
                      null
                    ),
                    t.createVNode(
                      xt,
                      {
                        plain: !0,
                        type: 'danger',
                        class: Ol('exchange'),
                        text: e.exchangeButtonText || Il('exchange'),
                        loading: e.exchangeButtonLoading,
                        disabled: u.value,
                        onClick: m,
                      },
                      null
                    ),
                  ]
                );
            },
            g = () => {
              const { coupons: a } = e,
                l = e.showCount ? ` (${a.length})` : '',
                i = (e.enabledTitle || Il('enable')) + l;
              return t.createVNode(
                Ya,
                { title: i },
                {
                  default: () => {
                    var l;
                    return [
                      t.createVNode(
                        'div',
                        {
                          class: Ol('list', {
                            'with-bottom': e.showCloseButton,
                          }),
                          style: { height: `${c.value}px` },
                        },
                        [
                          a.map((n, a) =>
                            t.createVNode(
                              dl,
                              {
                                key: n.id,
                                ref: r(a),
                                coupon: n,
                                chosen: a === e.chosenCoupon,
                                currency: e.currency,
                                onClick: () => o('change', a),
                              },
                              null
                            )
                          ),
                          !a.length && v(),
                          null == (l = n['list-footer']) ? void 0 : l.call(n),
                        ]
                      ),
                    ];
                  },
                }
              );
            },
            b = () => {
              const { disabledCoupons: o } = e,
                a = e.showCount ? ` (${o.length})` : '',
                r = (e.disabledTitle || Il('disabled')) + a;
              return t.createVNode(
                Ya,
                { title: r },
                {
                  default: () => {
                    var a;
                    return [
                      t.createVNode(
                        'div',
                        {
                          class: Ol('list', {
                            'with-bottom': e.showCloseButton,
                          }),
                          style: { height: `${c.value}px` },
                        },
                        [
                          o.map((o) =>
                            t.createVNode(
                              dl,
                              {
                                disabled: !0,
                                key: o.id,
                                coupon: o,
                                currency: e.currency,
                              },
                              null
                            )
                          ),
                          !o.length && v(),
                          null == (a = n['disabled-list-footer'])
                            ? void 0
                            : a.call(n),
                        ]
                      ),
                    ];
                  },
                }
              );
            };
          return (
            t.watch(
              () => e.code,
              (e) => {
                d.value = e;
              }
            ),
            t.watch(ie, p),
            t.watch(d, (e) => o('update:code', e)),
            t.watch(() => e.displayedCouponIndex, f),
            t.onMounted(() => {
              p(), f(e.displayedCouponIndex);
            }),
            () =>
              t.createVNode('div', { ref: l, class: Ol() }, [
                h(),
                t.createVNode(
                  Xa,
                  {
                    active: s.value,
                    'onUpdate:active': (e) => (s.value = e),
                    class: Ol('tab'),
                  },
                  { default: () => [g(), b()] }
                ),
                t.createVNode('div', { class: Ol('bottom') }, [
                  t.withDirectives(
                    t.createVNode(
                      xt,
                      {
                        round: !0,
                        block: !0,
                        type: 'danger',
                        class: Ol('close'),
                        text: e.closeButtonText || Il('close'),
                        onClick: () => o('change', -1),
                      },
                      null
                    ),
                    [[t.vShow, e.showCloseButton]]
                  ),
                ]),
              ])
          );
        },
      })
    ),
    [zl] = Oe('time-picker');
  var El = t.defineComponent({
    name: zl,
    props: n({}, Kn, {
      minHour: f(0),
      maxHour: f(23),
      minMinute: f(0),
      maxMinute: f(59),
      modelValue: String,
    }),
    emits: ['confirm', 'cancel', 'change', 'update:modelValue'],
    setup(e, { emit: o, slots: n }) {
      const a = (t) => {
          const { minHour: o, maxHour: n, maxMinute: a, minMinute: r } = e;
          t || (t = `${he(o)}:${he(r)}`);
          let [l, i] = t.split(':');
          return (
            (l = he(ge(+l, +o, +n))), (i = he(ge(+i, +r, +a))), `${l}:${i}`
          );
        },
        r = t.ref(),
        i = t.ref(a(e.modelValue)),
        s = t.computed(() => [
          { type: 'hour', range: [+e.minHour, +e.maxHour] },
          { type: 'minute', range: [+e.minMinute, +e.maxMinute] },
        ]),
        c = t.computed(() =>
          s.value.map(({ type: t, range: o }) => {
            let n = Qn(o[1] - o[0] + 1, (e) => he(o[0] + e));
            return e.filter && (n = e.filter(t, n)), { type: t, values: n };
          })
        ),
        d = t.computed(() =>
          c.value.map((t) => ({
            values: t.values.map((o) => e.formatter(t.type, o)),
          }))
        ),
        u = () => {
          const o = i.value.split(':'),
            n = [e.formatter('hour', o[0]), e.formatter('minute', o[1])];
          t.nextTick(() => {
            var e;
            null == (e = r.value) || e.setValues(n);
          });
        },
        p = () => {
          const [e, t] = r.value.getIndexes(),
            [o, n] = c.value,
            l = o.values[e] || o.values[0],
            s = n.values[t] || n.values[0];
          (i.value = a(`${l}:${s}`)), u();
        },
        m = () => o('confirm', i.value),
        f = () => o('cancel'),
        v = () => {
          p(),
            t.nextTick(() => {
              t.nextTick(() => o('change', i.value));
            });
        };
      return (
        t.onMounted(() => {
          u(), t.nextTick(p);
        }),
        t.watch(d, u),
        t.watch(() => [e.filter, e.maxHour, e.minMinute, e.maxMinute], p),
        t.watch(
          () => e.minHour,
          () => {
            t.nextTick(p);
          }
        ),
        t.watch(i, (e) => o('update:modelValue', e)),
        t.watch(
          () => e.modelValue,
          (e) => {
            (e = a(e)) !== i.value && ((i.value = e), u());
          }
        ),
        _e({ getPicker: () => r.value && ta(r.value, p) }),
        () =>
          t.createVNode(
            co,
            t.mergeProps(
              {
                ref: r,
                columns: d.value,
                onChange: v,
                onCancel: f,
                onConfirm: m,
              },
              l(e, Jn)
            ),
            n
          )
      );
    },
  });
  const $l = new Date().getFullYear(),
    [Ml] = Oe('date-picker');
  var Ll = t.defineComponent({
    name: Ml,
    props: n({}, Kn, {
      type: v('datetime'),
      modelValue: Date,
      minDate: {
        type: Date,
        default: () => new Date($l - 10, 0, 1),
        validator: X,
      },
      maxDate: {
        type: Date,
        default: () => new Date($l + 10, 11, 31),
        validator: X,
      },
    }),
    emits: ['confirm', 'cancel', 'change', 'update:modelValue'],
    setup(e, { emit: o, slots: n }) {
      const a = (t) => {
          if (X(t)) {
            const o = ge(t.getTime(), e.minDate.getTime(), e.maxDate.getTime());
            return new Date(o);
          }
        },
        r = t.ref(),
        i = t.ref(a(e.modelValue)),
        s = (t, o) => {
          const n = e[`${t}Date`],
            a = n.getFullYear();
          let r = 1,
            l = 1,
            i = 0,
            s = 0;
          return (
            'max' === t &&
              ((r = 12),
              (l = ea(o.getFullYear(), o.getMonth() + 1)),
              (i = 23),
              (s = 59)),
            o.getFullYear() === a &&
              ((r = n.getMonth() + 1),
              o.getMonth() + 1 === r &&
                ((l = n.getDate()),
                o.getDate() === l &&
                  ((i = n.getHours()),
                  o.getHours() === i && (s = n.getMinutes())))),
            {
              [`${t}Year`]: a,
              [`${t}Month`]: r,
              [`${t}Date`]: l,
              [`${t}Hour`]: i,
              [`${t}Minute`]: s,
            }
          );
        },
        c = t.computed(() => {
          const {
              maxYear: t,
              maxDate: o,
              maxMonth: n,
              maxHour: a,
              maxMinute: r,
            } = s('max', i.value || e.minDate),
            {
              minYear: l,
              minDate: c,
              minMonth: d,
              minHour: u,
              minMinute: p,
            } = s('min', i.value || e.minDate);
          let m = [
            { type: 'year', range: [l, t] },
            { type: 'month', range: [d, n] },
            { type: 'day', range: [c, o] },
            { type: 'hour', range: [u, a] },
            { type: 'minute', range: [p, r] },
          ];
          switch (e.type) {
            case 'date':
              m = m.slice(0, 3);
              break;
            case 'year-month':
              m = m.slice(0, 2);
              break;
            case 'month-day':
              m = m.slice(1, 3);
              break;
            case 'datehour':
              m = m.slice(0, 4);
          }
          if (e.columnsOrder) {
            const t = e.columnsOrder.concat(m.map((e) => e.type));
            m.sort((e, o) => t.indexOf(e.type) - t.indexOf(o.type));
          }
          return m;
        }),
        d = t.computed(() =>
          c.value.map(({ type: t, range: o }) => {
            let n = Qn(o[1] - o[0] + 1, (e) => he(o[0] + e));
            return e.filter && (n = e.filter(t, n)), { type: t, values: n };
          })
        ),
        u = t.computed(() =>
          d.value.map((t) => ({
            values: t.values.map((o) => e.formatter(t.type, o)),
          }))
        ),
        p = () => {
          const o = i.value || e.minDate,
            { formatter: n } = e,
            a = d.value.map((e) => {
              switch (e.type) {
                case 'year':
                  return n('year', `${o.getFullYear()}`);
                case 'month':
                  return n('month', he(o.getMonth() + 1));
                case 'day':
                  return n('day', he(o.getDate()));
                case 'hour':
                  return n('hour', he(o.getHours()));
                case 'minute':
                  return n('minute', he(o.getMinutes()));
                default:
                  return '';
              }
            });
          t.nextTick(() => {
            var e;
            null == (e = r.value) || e.setValues(a);
          });
        },
        m = () => {
          const { type: t } = e,
            o = r.value.getIndexes(),
            n = (e) => {
              let t = 0;
              d.value.forEach((o, n) => {
                e === o.type && (t = n);
              });
              const { values: n } = d.value[t];
              return (function (e) {
                if (!e) return 0;
                for (; Number.isNaN(parseInt(e, 10)); ) {
                  if (!(e.length > 1)) return 0;
                  e = e.slice(1);
                }
                return parseInt(e, 10);
              })(n[o[t]]);
            };
          let l, s, c;
          'month-day' === t
            ? ((l = (i.value || e.minDate).getFullYear()),
              (s = n('month')),
              (c = n('day')))
            : ((l = n('year')),
              (s = n('month')),
              (c = 'year-month' === t ? 1 : n('day')));
          const u = ea(l, s);
          c = c > u ? u : c;
          let p = 0,
            m = 0;
          'datehour' === t && (p = n('hour')),
            'datetime' === t && ((p = n('hour')), (m = n('minute')));
          const f = new Date(l, s - 1, c, p, m);
          i.value = a(f);
        },
        f = () => {
          o('update:modelValue', i.value), o('confirm', i.value);
        },
        v = () => o('cancel'),
        h = () => {
          m(),
            t.nextTick(() => {
              m(), t.nextTick(() => o('change', i.value));
            });
        };
      return (
        t.onMounted(() => {
          p(), t.nextTick(m);
        }),
        t.watch(u, p),
        t.watch(i, (e, t) => o('update:modelValue', t ? e : null)),
        t.watch(
          () => [e.filter, e.minDate, e.maxDate],
          () => {
            t.nextTick(m);
          }
        ),
        t.watch(
          () => e.modelValue,
          (e) => {
            var t;
            (e = a(e)) &&
              e.valueOf() !== (null == (t = i.value) ? void 0 : t.valueOf()) &&
              (i.value = e);
          }
        ),
        _e({ getPicker: () => r.value && ta(r.value, m) }),
        () =>
          t.createVNode(
            co,
            t.mergeProps(
              {
                ref: r,
                columns: u.value,
                onChange: h,
                onCancel: v,
                onConfirm: f,
              },
              l(e, Jn)
            ),
            n
          )
      );
    },
  });
  const [Fl, Hl] = Oe('datetime-picker'),
    Rl = Object.keys(El.props),
    jl = Object.keys(Ll.props),
    Wl = n({}, El.props, Ll.props, { modelValue: [String, Date] });
  const ql = Re(
      t.defineComponent({
        name: Fl,
        props: Wl,
        setup(e, { attrs: o, slots: n }) {
          const a = t.ref();
          return (
            _e({
              getPicker: () => {
                var e;
                return null == (e = a.value) ? void 0 : e.getPicker();
              },
            }),
            () => {
              const r = 'time' === e.type,
                i = r ? El : Ll,
                s = l(e, r ? Rl : jl);
              return t.createVNode(
                i,
                t.mergeProps({ ref: a, class: Hl() }, s, o),
                n
              );
            }
          );
        },
      })
    ),
    [Ul, Yl, Xl] = Oe('dialog'),
    Gl = n({}, Ot, {
      title: String,
      theme: String,
      width: c,
      message: [String, Function],
      callback: Function,
      allowHtml: Boolean,
      className: s,
      transition: v('van-dialog-bounce'),
      messageAlign: String,
      closeOnPopstate: d,
      showCancelButton: Boolean,
      cancelButtonText: String,
      cancelButtonColor: String,
      cancelButtonDisabled: Boolean,
      confirmButtonText: String,
      confirmButtonColor: String,
      confirmButtonDisabled: Boolean,
      showConfirmButton: d,
      closeOnClickOverlay: Boolean,
    }),
    _l = [...It, 'transition', 'closeOnPopstate'];
  var Zl = t.defineComponent({
    name: Ul,
    props: Gl,
    emits: ['confirm', 'cancel', 'keydown', 'update:show'],
    setup(e, { emit: n, slots: a }) {
      const r = t.ref(),
        i = t.reactive({ confirm: !1, cancel: !1 }),
        s = (e) => n('update:show', e),
        c = (t) => {
          var o;
          s(!1), null == (o = e.callback) || o.call(e, t);
        },
        d = (t) => () => {
          e.show &&
            (n(t),
            e.beforeClose
              ? ((i[t] = !0),
                He(e.beforeClose, {
                  args: [t],
                  done() {
                    c(t), (i[t] = !1);
                  },
                  canceled() {
                    i[t] = !1;
                  },
                }))
              : c(t));
        },
        u = d('cancel'),
        p = d('confirm'),
        m = t.withKeys(
          (t) => {
            var a, l;
            if (
              t.target !==
              (null == (l = null == (a = r.value) ? void 0 : a.popupRef)
                ? void 0
                : l.value)
            )
              return;
            ({
              Enter: e.showConfirmButton ? p : o,
              Escape: e.showCancelButton ? u : o,
            }[t.key](),
              n('keydown', t));
          },
          ['enter', 'esc']
        ),
        f = () => {
          const o = a.title ? a.title() : e.title;
          if (o)
            return t.createVNode(
              'div',
              { class: Yl('header', { isolated: !e.message && !a.default }) },
              [o]
            );
        },
        v = (o) => {
          const { message: n, allowHtml: a, messageAlign: r } = e,
            l = Yl('message', { 'has-title': o, [r]: r }),
            i = q(n) ? n() : n;
          return a && 'string' == typeof i
            ? t.createVNode('div', { class: l, innerHTML: i }, null)
            : t.createVNode('div', { class: l }, [i]);
        },
        h = () => {
          if (a.default)
            return t.createVNode('div', { class: Yl('content') }, [
              a.default(),
            ]);
          const { title: o, message: n, allowHtml: r } = e;
          if (n) {
            const e = !(!o && !a.title);
            return t.createVNode(
              'div',
              { key: r ? 1 : 0, class: Yl('content', { isolated: !e }) },
              [v(e)]
            );
          }
        },
        g = () =>
          a.footer
            ? a.footer()
            : 'round-button' === e.theme
            ? t.createVNode(
                Ge,
                { class: Yl('footer') },
                {
                  default: () => [
                    e.showCancelButton &&
                      t.createVNode(
                        kt,
                        {
                          type: 'warning',
                          text: e.cancelButtonText || Xl('cancel'),
                          class: Yl('cancel'),
                          color: e.cancelButtonColor,
                          loading: i.cancel,
                          disabled: e.cancelButtonDisabled,
                          onClick: u,
                        },
                        null
                      ),
                    e.showConfirmButton &&
                      t.createVNode(
                        kt,
                        {
                          type: 'danger',
                          text: e.confirmButtonText || Xl('confirm'),
                          class: Yl('confirm'),
                          color: e.confirmButtonColor,
                          loading: i.confirm,
                          disabled: e.confirmButtonDisabled,
                          onClick: p,
                        },
                        null
                      ),
                  ],
                }
              )
            : t.createVNode('div', { class: [Ae, Yl('footer')] }, [
                e.showCancelButton &&
                  t.createVNode(
                    xt,
                    {
                      size: 'large',
                      text: e.cancelButtonText || Xl('cancel'),
                      class: Yl('cancel'),
                      style: { color: e.cancelButtonColor },
                      loading: i.cancel,
                      disabled: e.cancelButtonDisabled,
                      onClick: u,
                    },
                    null
                  ),
                e.showConfirmButton &&
                  t.createVNode(
                    xt,
                    {
                      size: 'large',
                      text: e.confirmButtonText || Xl('confirm'),
                      class: [Yl('confirm'), { [Pe]: e.showCancelButton }],
                      style: { color: e.confirmButtonColor },
                      loading: i.confirm,
                      disabled: e.confirmButtonDisabled,
                      onClick: p,
                    },
                    null
                  ),
              ]);
      return () => {
        const { width: o, title: n, theme: a, message: i, className: c } = e;
        return t.createVNode(
          Yt,
          t.mergeProps(
            {
              ref: r,
              role: 'dialog',
              class: [Yl([a]), c],
              style: { width: se(o) },
              tabindex: 0,
              'aria-labelledby': n || i,
              onKeydown: m,
              'onUpdate:show': s,
            },
            l(e, _l)
          ),
          { default: () => [f(), h(), g()] }
        );
      };
    },
  });
  let Kl;
  function Jl(e) {
    return a
      ? new Promise((o, a) => {
          Kl ||
            (function () {
              const e = {
                setup() {
                  const { state: e, toggle: o } = Fo();
                  return () =>
                    t.createVNode(
                      Zl,
                      t.mergeProps(e, { 'onUpdate:show': o }),
                      null
                    );
                },
              };
              ({ instance: Kl } = Ho(e));
            })(),
            Kl.open(
              n({}, Jl.currentOptions, e, {
                callback: (e) => {
                  ('confirm' === e ? o : a)(e);
                },
              })
            );
        })
      : Promise.resolve();
  }
  (Jl.defaultOptions = {
    title: '',
    width: '',
    theme: null,
    message: '',
    overlay: !0,
    callback: null,
    teleport: 'body',
    className: '',
    allowHtml: !1,
    lockScroll: !0,
    transition: void 0,
    beforeClose: null,
    overlayClass: '',
    overlayStyle: void 0,
    messageAlign: '',
    cancelButtonText: '',
    cancelButtonColor: null,
    cancelButtonDisabled: !1,
    confirmButtonText: '',
    confirmButtonColor: null,
    confirmButtonDisabled: !1,
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnPopstate: !0,
    closeOnClickOverlay: !1,
  }),
    (Jl.currentOptions = n({}, Jl.defaultOptions)),
    (Jl.alert = Jl),
    (Jl.confirm = (e) => Jl(n({ showCancelButton: !0 }, e))),
    (Jl.close = () => {
      Kl && Kl.toggle(!1);
    }),
    (Jl.setDefaultOptions = (e) => {
      n(Jl.currentOptions, e);
    }),
    (Jl.resetDefaultOptions = () => {
      Jl.currentOptions = n({}, Jl.defaultOptions);
    }),
    (Jl.Component = Re(Zl)),
    (Jl.install = (e) => {
      e.use(Jl.Component), (e.config.globalProperties.$dialog = Jl);
    });
  const [Ql, ei] = Oe('divider'),
    ti = { dashed: Boolean, hairline: d, contentPosition: v('center') };
  const oi = Re(
      t.defineComponent({
        name: Ql,
        props: ti,
        setup:
          (e, { slots: o }) =>
          () => {
            var n;
            return t.createVNode(
              'div',
              {
                role: 'separator',
                class: ei({
                  dashed: e.dashed,
                  hairline: e.hairline,
                  [`content-${e.contentPosition}`]: !!o.default,
                }),
              },
              [null == (n = o.default) ? void 0 : n.call(o)]
            );
          },
      })
    ),
    [ni, ai] = Oe('dropdown-menu'),
    ri = {
      overlay: d,
      zIndex: c,
      duration: f(0.2),
      direction: v('down'),
      activeColor: String,
      closeOnClickOutside: d,
      closeOnClickOverlay: d,
    },
    li = Symbol(ni);
  var ii = t.defineComponent({
    name: ni,
    props: ri,
    setup(e, { slots: o }) {
      const n = Po(),
        a = t.ref(),
        r = t.ref(),
        l = t.ref(0),
        { children: i, linkChildren: s } = C(li),
        c = H(a),
        d = t.computed(() => i.some((e) => e.state.showWrapper)),
        u = t.computed(() => {
          if (d.value && W(e.zIndex)) return { zIndex: +e.zIndex + 1 };
        }),
        p = () => {
          if (r.value) {
            const t = x(r);
            'down' === e.direction
              ? (l.value = t.bottom)
              : (l.value = ie.value - t.top);
          }
        },
        m = (o, a) => {
          const { showPopup: r } = o.state,
            { disabled: l, titleClass: s } = o;
          return t.createVNode(
            'div',
            {
              id: `${n}-${a}`,
              role: 'button',
              tabindex: l ? void 0 : 0,
              class: [ai('item', { disabled: l }), { [Le]: !l }],
              onClick: () => {
                var e;
                l ||
                  ((e = a),
                  i.forEach((t, o) => {
                    o === e
                      ? (p(), t.toggle())
                      : t.state.showPopup && t.toggle(!1, { immediate: !0 });
                  }));
              },
            },
            [
              t.createVNode(
                'span',
                {
                  class: [
                    ai('title', {
                      down: r === ('down' === e.direction),
                      active: r,
                    }),
                    s,
                  ],
                  style: { color: r ? e.activeColor : '' },
                },
                [
                  t.createVNode('div', { class: 'van-ellipsis' }, [
                    o.renderTitle(),
                  ]),
                ]
              ),
            ]
          );
        };
      return (
        s({ id: n, props: e, offset: l }),
        z(a, () => {
          e.closeOnClickOutside &&
            i.forEach((e) => {
              e.toggle(!1);
            });
        }),
        P(
          'scroll',
          () => {
            d.value && p();
          },
          { target: c }
        ),
        () => {
          var e;
          return t.createVNode('div', { ref: a, class: ai() }, [
            t.createVNode(
              'div',
              { ref: r, style: u.value, class: ai('bar', { opened: d.value }) },
              [i.map(m)]
            ),
            null == (e = o.default) ? void 0 : e.call(o),
          ]);
        }
      );
    },
  });
  const [si, ci] = Oe('dropdown-item'),
    di = {
      title: String,
      options: p(),
      disabled: Boolean,
      teleport: [String, Object],
      lazyRender: d,
      modelValue: s,
      titleClass: s,
    };
  const ui = Re(
      t.defineComponent({
        name: si,
        props: di,
        emits: [
          'open',
          'opened',
          'close',
          'closed',
          'change',
          'update:modelValue',
        ],
        setup(e, { emit: o, slots: n }) {
          const a = t.reactive({
              showPopup: !1,
              transition: !0,
              showWrapper: !1,
            }),
            { parent: r, index: l } = V(li);
          if (!r)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error(
                '[Vant] <DropdownItem> must be a child component of <DropdownMenu>.'
              )
            );
          const i = (e) => () => o(e),
            s = i('open'),
            c = i('close'),
            d = i('opened'),
            u = () => {
              (a.showWrapper = !1), o('closed');
            },
            p = (t) => {
              e.teleport && t.stopPropagation();
            },
            m = (n) => {
              const { activeColor: l } = r.props,
                i = n.value === e.modelValue;
              return t.createVNode(
                Vo,
                {
                  role: 'menuitem',
                  key: n.value,
                  icon: n.icon,
                  title: n.text,
                  class: ci('option', { active: i }),
                  style: { color: i ? l : '' },
                  tabindex: i ? 0 : -1,
                  clickable: !0,
                  onClick: () => {
                    (a.showPopup = !1),
                      n.value !== e.modelValue &&
                        (o('update:modelValue', n.value), o('change', n.value));
                  },
                },
                {
                  value: () => {
                    if (i)
                      return t.createVNode(
                        ut,
                        { class: ci('icon'), color: l, name: 'success' },
                        null
                      );
                  },
                }
              );
            },
            f = () => {
              const { offset: o } = r,
                {
                  zIndex: i,
                  overlay: f,
                  duration: v,
                  direction: h,
                  closeOnClickOverlay: g,
                } = r.props,
                b = de(i);
              return (
                'down' === h
                  ? (b.top = `${o.value}px`)
                  : (b.bottom = `${o.value}px`),
                t.withDirectives(
                  t.createVNode(
                    'div',
                    { style: b, class: ci([h]), onClick: p },
                    [
                      t.createVNode(
                        Yt,
                        {
                          show: a.showPopup,
                          'onUpdate:show': (e) => (a.showPopup = e),
                          role: 'menu',
                          class: ci('content'),
                          overlay: f,
                          position: 'down' === h ? 'top' : 'bottom',
                          duration: a.transition ? v : 0,
                          lazyRender: e.lazyRender,
                          overlayStyle: { position: 'absolute' },
                          'aria-labelledby': `${r.id}-${l.value}`,
                          closeOnClickOverlay: g,
                          onOpen: s,
                          onClose: c,
                          onOpened: d,
                          onClosed: u,
                        },
                        {
                          default: () => {
                            var t;
                            return [
                              e.options.map(m),
                              null == (t = n.default) ? void 0 : t.call(n),
                            ];
                          },
                        }
                      ),
                    ]
                  ),
                  [[t.vShow, a.showWrapper]]
                )
              );
            };
          return (
            _e({
              state: a,
              toggle: (e = !a.showPopup, t = {}) => {
                e !== a.showPopup &&
                  ((a.showPopup = e),
                  (a.transition = !t.immediate),
                  e && (a.showWrapper = !0));
              },
              renderTitle: () => {
                if (n.title) return n.title();
                if (e.title) return e.title;
                const t = e.options.find((t) => t.value === e.modelValue);
                return t ? t.text : '';
              },
            }),
            () =>
              e.teleport
                ? t.createVNode(
                    t.Teleport,
                    { to: e.teleport },
                    { default: () => [f()] }
                  )
                : f()
          );
        },
      })
    ),
    pi = Re(ii),
    [mi, fi] = Oe('grid'),
    vi = {
      square: Boolean,
      center: d,
      border: d,
      gutter: c,
      reverse: Boolean,
      iconSize: c,
      direction: String,
      clickable: Boolean,
      columnNum: f(4),
    },
    hi = Symbol(mi);
  const gi = Re(
      t.defineComponent({
        name: mi,
        props: vi,
        setup(e, { slots: o }) {
          const { linkChildren: n } = C(hi);
          return (
            n({ props: e }),
            () => {
              var n;
              return t.createVNode(
                'div',
                {
                  style: { paddingLeft: se(e.gutter) },
                  class: [fi(), { [Ae]: e.border && !e.gutter }],
                },
                [null == (n = o.default) ? void 0 : n.call(o)]
              );
            }
          );
        },
      })
    ),
    [bi, yi] = Oe('grid-item'),
    wi = n({}, Ze, {
      dot: Boolean,
      text: String,
      icon: String,
      badge: c,
      iconColor: String,
      iconPrefix: String,
      badgeProps: Object,
    });
  const xi = Re(
      t.defineComponent({
        name: bi,
        props: wi,
        setup(e, { slots: o }) {
          const { parent: n, index: a } = V(hi),
            r = Je();
          if (!n)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error(
                '[Vant] <GridItem> must be a child component of <Grid>.'
              )
            );
          const l = t.computed(() => {
              const { square: e, gutter: t, columnNum: o } = n.props,
                r = 100 / +o + '%',
                l = { flexBasis: r };
              if (e) l.paddingTop = r;
              else if (t) {
                const e = se(t);
                (l.paddingRight = e), a.value >= o && (l.marginTop = e);
              }
              return l;
            }),
            i = t.computed(() => {
              const { square: e, gutter: t } = n.props;
              if (e && t) {
                const e = se(t);
                return { right: e, bottom: e, height: 'auto' };
              }
            });
          return () => {
            const {
                center: a,
                border: s,
                square: c,
                gutter: d,
                reverse: u,
                direction: p,
                clickable: m,
              } = n.props,
              f = [
                yi('content', [
                  p,
                  {
                    center: a,
                    square: c,
                    reverse: u,
                    clickable: m,
                    surround: s && d,
                  },
                ]),
                { [Ie]: s },
              ];
            return t.createVNode(
              'div',
              { class: [yi({ square: c })], style: l.value },
              [
                t.createVNode(
                  'div',
                  {
                    role: m ? 'button' : void 0,
                    class: f,
                    style: i.value,
                    tabindex: m ? 0 : void 0,
                    onClick: r,
                  },
                  [
                    o.default
                      ? o.default()
                      : [
                          o.icon
                            ? t.createVNode(
                                ot,
                                t.mergeProps(
                                  { dot: e.dot, content: e.badge },
                                  e.badgeProps
                                ),
                                { default: o.icon }
                              )
                            : e.icon
                            ? t.createVNode(
                                ut,
                                {
                                  dot: e.dot,
                                  name: e.icon,
                                  size: n.props.iconSize,
                                  badge: e.badge,
                                  class: yi('icon'),
                                  color: e.iconColor,
                                  badgeProps: e.badgeProps,
                                  classPrefix: e.iconPrefix,
                                },
                                null
                              )
                            : void 0,
                          o.text
                            ? o.text()
                            : e.text
                            ? t.createVNode('span', { class: yi('text') }, [
                                e.text,
                              ])
                            : void 0,
                        ],
                  ]
                ),
              ]
            );
          };
        },
      })
    ),
    Vi = (e) =>
      Math.sqrt(
        (e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2
      ),
    Ni = Oe('image-preview')[1];
  var Ci = t.defineComponent({
    props: {
      src: String,
      show: Boolean,
      active: Number,
      minZoom: u(c),
      maxZoom: u(c),
      rootWidth: u(Number),
      rootHeight: u(Number),
    },
    emits: ['scale', 'close'],
    setup(e, { emit: o }) {
      const n = t.reactive({
          scale: 1,
          moveX: 0,
          moveY: 0,
          moving: !1,
          zooming: !1,
          imageRatio: 0,
          displayWidth: 0,
          displayHeight: 0,
        }),
        a = At(),
        r = t.computed(() => {
          const { rootWidth: t, rootHeight: o } = e,
            a = o / t;
          return n.imageRatio > a;
        }),
        l = t.computed(() => {
          const { scale: e, moveX: t, moveY: o, moving: a, zooming: r } = n,
            l = { transitionDuration: r || a ? '0s' : '.3s' };
          if (1 !== e) {
            const n = t / e,
              a = o / e;
            l.transform = `scale(${e}, ${e}) translate(${n}px, ${a}px)`;
          }
          return l;
        }),
        i = t.computed(() => {
          if (n.imageRatio) {
            const { rootWidth: t, rootHeight: o } = e,
              a = r.value ? o / n.imageRatio : t;
            return Math.max(0, (n.scale * a - t) / 2);
          }
          return 0;
        }),
        s = t.computed(() => {
          if (n.imageRatio) {
            const { rootWidth: t, rootHeight: o } = e,
              a = r.value ? o : t * n.imageRatio;
            return Math.max(0, (n.scale * a - o) / 2);
          }
          return 0;
        }),
        c = (t) => {
          (t = ge(t, +e.minZoom, +e.maxZoom + 1)) !== n.scale &&
            ((n.scale = t), o('scale', { scale: t, index: e.active }));
        },
        d = () => {
          c(1), (n.moveX = 0), (n.moveY = 0);
        };
      let u, p, m, f, v, h, g;
      const b = (e) => {
          const { touches: t } = e,
            { offsetX: o } = a;
          a.start(e),
            (u = t.length),
            (p = n.moveX),
            (m = n.moveY),
            (g = Date.now()),
            (n.moving = 1 === u && 1 !== n.scale),
            (n.zooming = 2 === u && !o.value),
            n.zooming && ((f = n.scale), (v = Vi(e.touches)));
        },
        y = (e) => {
          const { touches: t } = e;
          if ((a.move(e), (n.moving || n.zooming) && ae(e, !0), n.moving)) {
            const { deltaX: e, deltaY: t } = a,
              o = e.value + p,
              r = t.value + m;
            (n.moveX = ge(o, -i.value, i.value)),
              (n.moveY = ge(r, -s.value, s.value));
          }
          if (n.zooming && 2 === t.length) {
            const e = Vi(t);
            c((f * e) / v);
          }
        },
        w = () => {
          if (u > 1) return;
          const { offsetX: e, offsetY: t } = a,
            r = Date.now() - g;
          e.value < 5 &&
            t.value < 5 &&
            r < 250 &&
            (h
              ? (clearTimeout(h),
                (h = null),
                (() => {
                  const e = n.scale > 1 ? 1 : 2;
                  c(e), (n.moveX = 0), (n.moveY = 0);
                })())
              : (h = setTimeout(() => {
                  o('close'), (h = null);
                }, 250)));
        },
        x = (t) => {
          let o = !1;
          (n.moving || n.zooming) &&
            ((o = !0),
            n.moving && p === n.moveX && m === n.moveY && (o = !1),
            t.touches.length ||
              (n.zooming &&
                ((n.moveX = ge(n.moveX, -i.value, i.value)),
                (n.moveY = ge(n.moveY, -s.value, s.value)),
                (n.zooming = !1)),
              (n.moving = !1),
              (p = 0),
              (m = 0),
              (f = 1),
              n.scale < 1 && d(),
              n.scale > e.maxZoom && (n.scale = +e.maxZoom))),
            ae(t, o),
            w(),
            a.reset();
        },
        V = (e) => {
          const { naturalWidth: t, naturalHeight: o } = e.target;
          n.imageRatio = o / t;
        };
      return (
        t.watch(() => e.active, d),
        t.watch(
          () => e.show,
          (e) => {
            e || d();
          }
        ),
        () => {
          const o = {
            loading: () => t.createVNode(gt, { type: 'spinner' }, null),
          };
          return t.createVNode(
            ja,
            {
              class: Ni('swipe-item'),
              onTouchstart: b,
              onTouchmove: y,
              onTouchend: x,
              onTouchcancel: x,
            },
            {
              default: () => [
                t.createVNode(
                  fa,
                  {
                    src: e.src,
                    fit: 'contain',
                    class: Ni('image', { vertical: r.value }),
                    style: l.value,
                    onLoad: V,
                  },
                  o
                ),
              ],
            }
          );
        }
      );
    },
  });
  const [ki, Si] = Oe('image-preview'),
    Ti = ['show', 'transition', 'overlayStyle', 'closeOnPopstate'],
    Bi = {
      show: Boolean,
      loop: d,
      images: p(),
      minZoom: f(1 / 3),
      maxZoom: f(3),
      overlay: d,
      closeable: Boolean,
      showIndex: d,
      className: s,
      closeIcon: v('clear'),
      transition: String,
      beforeClose: Function,
      overlayClass: s,
      overlayStyle: Object,
      swipeDuration: f(300),
      startPosition: f(0),
      showIndicators: Boolean,
      closeOnPopstate: d,
      closeIconPosition: v('top-right'),
    };
  var Di = t.defineComponent({
    name: ki,
    props: Bi,
    emits: ['scale', 'close', 'closed', 'change', 'update:show'],
    setup(e, { emit: o, slots: n }) {
      const a = t.ref(),
        r = t.reactive({ active: 0, rootWidth: 0, rootHeight: 0 }),
        i = () => {
          if (a.value) {
            const e = x(a.value.$el);
            (r.rootWidth = e.width),
              (r.rootHeight = e.height),
              a.value.resize();
          }
        },
        s = (e) => o('scale', e),
        c = (e) => o('update:show', e),
        d = () => {
          He(e.beforeClose, { args: [r.active], done: () => c(!1) });
        },
        u = (e) => {
          e !== r.active && ((r.active = e), o('change', e));
        },
        p = () => {
          if (e.showIndex)
            return t.createVNode('div', { class: Si('index') }, [
              n.index
                ? n.index({ index: r.active })
                : `${r.active + 1} / ${e.images.length}`,
            ]);
        },
        m = () => {
          if (n.cover)
            return t.createVNode('div', { class: Si('cover') }, [n.cover()]);
        },
        f = () => {
          if (e.closeable)
            return t.createVNode(
              ut,
              {
                role: 'button',
                name: e.closeIcon,
                class: [Si('close-icon', e.closeIconPosition), Le],
                onClick: d,
              },
              null
            );
        },
        v = () => o('closed'),
        h = (e, t) => {
          var o;
          return null == (o = a.value) ? void 0 : o.swipeTo(e, t);
        };
      return (
        _e({ swipeTo: h }),
        t.onMounted(i),
        t.watch([le, ie], i),
        t.watch(
          () => e.startPosition,
          (e) => u(+e)
        ),
        t.watch(
          () => e.show,
          (n) => {
            const { images: a, startPosition: l } = e;
            n
              ? (u(+l),
                t.nextTick(() => {
                  i(), h(+l, { immediate: !0 });
                }))
              : o('close', { index: r.active, url: a[r.active] });
          }
        ),
        () =>
          t.createVNode(
            Yt,
            t.mergeProps(
              {
                class: [Si(), e.className],
                overlayClass: [Si('overlay'), e.overlayClass],
                onClosed: v,
                'onUpdate:show': c,
              },
              l(e, Ti)
            ),
            {
              default: () => [
                f(),
                t.createVNode(
                  Oa,
                  {
                    ref: a,
                    lazyRender: !0,
                    loop: e.loop,
                    class: Si('swipe'),
                    duration: e.swipeDuration,
                    initialSwipe: e.startPosition,
                    showIndicators: e.showIndicators,
                    indicatorColor: 'white',
                    onChange: u,
                  },
                  {
                    default: () => [
                      e.images.map((o) =>
                        t.createVNode(
                          Ci,
                          {
                            src: o,
                            show: e.show,
                            active: r.active,
                            maxZoom: e.maxZoom,
                            minZoom: e.minZoom,
                            rootWidth: r.rootWidth,
                            rootHeight: r.rootHeight,
                            onScale: s,
                            onClose: d,
                          },
                          null
                        )
                      ),
                    ],
                  }
                ),
                p(),
                m(),
              ],
            }
          )
      );
    },
  });
  let Oi;
  const Ii = {
    loop: !0,
    images: [],
    maxZoom: 3,
    minZoom: 1 / 3,
    onScale: void 0,
    onClose: void 0,
    onChange: void 0,
    teleport: 'body',
    className: '',
    showIndex: !0,
    closeable: !1,
    closeIcon: 'clear',
    transition: void 0,
    beforeClose: void 0,
    overlayStyle: void 0,
    overlayClass: void 0,
    startPosition: 0,
    swipeDuration: 300,
    showIndicators: !1,
    closeOnPopstate: !0,
    closeIconPosition: 'top-right',
  };
  const Ai = (e, o = 0) => {
    if (a)
      return (
        Oi ||
          ({ instance: Oi } = Ho({
            setup() {
              const { state: e, toggle: o } = Fo(),
                n = () => {
                  e.images = [];
                };
              return () =>
                t.createVNode(
                  Di,
                  t.mergeProps(e, { onClosed: n, 'onUpdate:show': o }),
                  null
                );
            },
          })),
        (e = Array.isArray(e) ? { images: e, startPosition: o } : e),
        Oi.open(n({}, Ii, e)),
        Oi
      );
  };
  (Ai.Component = Re(Di)),
    (Ai.install = (e) => {
      e.use(Ai.Component);
    });
  const [Pi, zi] = Oe('index-bar'),
    Ei = {
      sticky: d,
      zIndex: c,
      teleport: [String, Object],
      highlightColor: String,
      stickyOffsetTop: m(0),
      indexList: {
        type: Array,
        default: function () {
          const e = 'A'.charCodeAt(0);
          return Array(26)
            .fill('')
            .map((t, o) => String.fromCharCode(e + o));
        },
      },
    },
    $i = Symbol(Pi);
  var Mi = t.defineComponent({
    name: Pi,
    props: Ei,
    emits: ['select', 'change'],
    setup(e, { emit: o, slots: n }) {
      const a = t.ref(),
        r = t.ref(''),
        l = At(),
        i = H(a),
        { children: s, linkChildren: c } = C($i);
      let d;
      c({ props: e });
      const u = t.computed(() => {
          if (W(e.zIndex)) return { zIndex: +e.zIndex + 1 };
        }),
        p = t.computed(() => {
          if (e.highlightColor) return { color: e.highlightColor };
        }),
        m = (t, o) => {
          for (let n = s.length - 1; n >= 0; n--) {
            const a = n > 0 ? o[n - 1].height : 0;
            if (t + (e.sticky ? a + e.stickyOffsetTop : 0) >= o[n].top)
              return n;
          }
          return -1;
        },
        f = (e) => s.find((t) => String(t.index) === e),
        v = () => {
          if (re(a)) return;
          const { sticky: t, indexList: o } = e,
            n = Z(i.value),
            l = x(i),
            c = s.map((e) => e.getRect(i.value, l));
          let u = -1;
          if (d) {
            const e = f(d);
            if (e) {
              const t = e.getRect(i.value, l);
              u = m(t.top, c);
            }
          } else u = m(n, c);
          (r.value = o[u]),
            t &&
              s.forEach((t, o) => {
                const { state: a, $el: r } = t;
                if (o === u || o === u - 1) {
                  const e = r.getBoundingClientRect();
                  (a.left = e.left), (a.width = e.width);
                } else (a.left = null), (a.width = null);
                if (o === u)
                  (a.active = !0),
                    (a.top = Math.max(e.stickyOffsetTop, c[o].top - n) + l.top);
                else if (o === u - 1 && '' === d) {
                  const e = c[u].top - n;
                  (a.active = e > 0), (a.top = e + l.top - c[o].height);
                } else a.active = !1;
              }),
            (d = '');
        },
        h = () => {
          t.nextTick(v);
        };
      P('scroll', v, { target: i }),
        t.onMounted(h),
        t.watch(() => e.indexList, h),
        t.watch(r, (e) => {
          e && o('change', e);
        });
      const g = (t) => {
          d = String(t);
          const n = f(d);
          if (n) {
            const t = Z(i.value),
              a = x(i),
              { offsetHeight: r } = document.documentElement;
            if (t === r - a.height) return void v();
            n.$el.scrollIntoView(),
              e.sticky && e.stickyOffsetTop && Q(J() - e.stickyOffsetTop),
              o('select', n.index);
          }
        },
        b = (e) => {
          const { index: t } = e.dataset;
          t && g(t);
        },
        y = (e) => {
          b(e.target);
        };
      let w;
      const V = (e) => {
          if ((l.move(e), l.isVertical())) {
            ae(e);
            const { clientX: t, clientY: o } = e.touches[0],
              n = document.elementFromPoint(t, o);
            if (n) {
              const { index: e } = n.dataset;
              e && w !== e && ((w = e), b(n));
            }
          }
        },
        N = () =>
          t.createVNode(
            'div',
            {
              class: zi('sidebar'),
              style: u.value,
              onClick: y,
              onTouchstart: l.start,
              onTouchmove: V,
            },
            [
              e.indexList.map((e) => {
                const o = e === r.value;
                return t.createVNode(
                  'span',
                  {
                    class: zi('index', { active: o }),
                    style: o ? p.value : void 0,
                    'data-index': e,
                  },
                  [e]
                );
              }),
            ]
          );
      return (
        _e({ scrollTo: g }),
        () => {
          var o;
          return t.createVNode('div', { ref: a, class: zi() }, [
            e.teleport
              ? t.createVNode(
                  t.Teleport,
                  { to: e.teleport },
                  { default: () => [N()] }
                )
              : N(),
            null == (o = n.default) ? void 0 : o.call(n),
          ]);
        }
      );
    },
  });
  const [Li, Fi] = Oe('index-anchor'),
    Hi = { index: c };
  const Ri = Re(
      t.defineComponent({
        name: Li,
        props: Hi,
        setup(e, { slots: o }) {
          const a = t.reactive({
              top: 0,
              left: null,
              rect: { top: 0, height: 0 },
              width: null,
              active: !1,
            }),
            r = t.ref(),
            { parent: l } = V($i);
          if (!l)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error(
                '[Vant] <IndexAnchor> must be a child component of <IndexBar>.'
              )
            );
          const i = () => a.active && l.props.sticky,
            s = t.computed(() => {
              const { zIndex: e, highlightColor: t } = l.props;
              if (i())
                return n(de(e), {
                  left: a.left ? `${a.left}px` : void 0,
                  width: a.width ? `${a.width}px` : void 0,
                  transform: a.top ? `translate3d(0, ${a.top}px, 0)` : void 0,
                  color: t,
                });
            });
          return (
            _e({
              state: a,
              getRect: (e, t) => {
                const o = x(r);
                return (
                  (a.rect.height = o.height),
                  e === window || e === document.body
                    ? (a.rect.top = o.top + J())
                    : (a.rect.top = o.top + Z(e) - t.top),
                  a.rect
                );
              },
            }),
            () => {
              const n = i();
              return t.createVNode(
                'div',
                {
                  ref: r,
                  style: { height: n ? `${a.rect.height}px` : void 0 },
                },
                [
                  t.createVNode(
                    'div',
                    { style: s.value, class: [Fi({ sticky: n }), { [ze]: n }] },
                    [o.default ? o.default() : e.index]
                  ),
                ]
              );
            }
          );
        },
      })
    ),
    ji = Re(Mi),
    [Wi, qi, Ui] = Oe('list'),
    Yi = {
      error: Boolean,
      offset: f(300),
      loading: Boolean,
      finished: Boolean,
      errorText: String,
      direction: v('down'),
      loadingText: String,
      finishedText: String,
      immediateCheck: d,
    };
  const Xi = Re(
      t.defineComponent({
        name: Wi,
        props: Yi,
        emits: ['load', 'update:error', 'update:loading'],
        setup(e, { emit: o, slots: n }) {
          const a = t.ref(!1),
            r = t.ref(),
            l = t.ref(),
            i = t.inject(Fa, null),
            s = H(r),
            c = () => {
              t.nextTick(() => {
                if (
                  a.value ||
                  e.finished ||
                  e.error ||
                  !1 === (null == i ? void 0 : i.value)
                )
                  return;
                const { offset: t, direction: n } = e,
                  c = x(s);
                if (!c.height || re(r)) return;
                let d = !1;
                const u = x(l);
                (d =
                  'up' === n ? c.top - u.top <= t : u.bottom - c.bottom <= t),
                  d && ((a.value = !0), o('update:loading', !0), o('load'));
              });
            },
            d = () => {
              if (e.finished) {
                const o = n.finished ? n.finished() : e.finishedText;
                if (o)
                  return t.createVNode('div', { class: qi('finished-text') }, [
                    o,
                  ]);
              }
            },
            u = () => {
              o('update:error', !1), c();
            },
            p = () => {
              if (e.error) {
                const o = n.error ? n.error() : e.errorText;
                if (o)
                  return t.createVNode(
                    'div',
                    {
                      role: 'button',
                      class: qi('error-text'),
                      tabindex: 0,
                      onClick: u,
                    },
                    [o]
                  );
              }
            },
            m = () => {
              if (a.value && !e.finished)
                return t.createVNode('div', { class: qi('loading') }, [
                  n.loading
                    ? n.loading()
                    : t.createVNode(
                        gt,
                        { class: qi('loading-icon') },
                        { default: () => [e.loadingText || Ui('loading')] }
                      ),
                ]);
            };
          return (
            t.watch(() => [e.loading, e.finished, e.error], c),
            i &&
              t.watch(i, (e) => {
                e && c();
              }),
            t.onUpdated(() => {
              a.value = e.loading;
            }),
            t.onMounted(() => {
              e.immediateCheck && c();
            }),
            _e({ check: c }),
            P('scroll', c, { target: s }),
            () => {
              var o;
              const i = null == (o = n.default) ? void 0 : o.call(n),
                s = t.createVNode(
                  'div',
                  { ref: l, class: qi('placeholder') },
                  null
                );
              return t.createVNode(
                'div',
                { ref: r, role: 'feed', class: qi(), 'aria-busy': a.value },
                [
                  'down' === e.direction ? i : s,
                  m(),
                  d(),
                  p(),
                  'up' === e.direction ? i : s,
                ]
              );
            }
          );
        },
      })
    ),
    [Gi, _i] = Oe('nav-bar'),
    Zi = {
      title: String,
      fixed: Boolean,
      zIndex: c,
      border: d,
      leftText: String,
      rightText: String,
      leftArrow: Boolean,
      placeholder: Boolean,
      safeAreaInsetTop: Boolean,
    };
  const Ki = Re(
      t.defineComponent({
        name: Gi,
        props: Zi,
        emits: ['click-left', 'click-right'],
        setup(e, { emit: o, slots: n }) {
          const a = t.ref(),
            r = We(a, _i),
            l = (e) => o('click-left', e),
            i = (e) => o('click-right', e),
            s = () => {
              const { title: o, fixed: r, border: s, zIndex: c } = e,
                d = de(c),
                u = e.leftArrow || e.leftText || n.left,
                p = e.rightText || n.right;
              return t.createVNode(
                'div',
                {
                  ref: a,
                  style: d,
                  class: [
                    _i({ fixed: r }),
                    { [ze]: s, 'van-safe-area-top': e.safeAreaInsetTop },
                  ],
                },
                [
                  t.createVNode('div', { class: _i('content') }, [
                    u &&
                      t.createVNode(
                        'div',
                        { class: [_i('left'), Le], onClick: l },
                        [
                          n.left
                            ? n.left()
                            : [
                                e.leftArrow &&
                                  t.createVNode(
                                    ut,
                                    { class: _i('arrow'), name: 'arrow-left' },
                                    null
                                  ),
                                e.leftText &&
                                  t.createVNode('span', { class: _i('text') }, [
                                    e.leftText,
                                  ]),
                              ],
                        ]
                      ),
                    t.createVNode(
                      'div',
                      { class: [_i('title'), 'van-ellipsis'] },
                      [n.title ? n.title() : o]
                    ),
                    p &&
                      t.createVNode(
                        'div',
                        { class: [_i('right'), Le], onClick: i },
                        [
                          n.right
                            ? n.right()
                            : t.createVNode('span', { class: _i('text') }, [
                                e.rightText,
                              ]),
                        ]
                      ),
                  ]),
                ]
              );
            };
          return () => (e.fixed && e.placeholder ? r(s) : s());
        },
      })
    ),
    [Ji, Qi] = Oe('notice-bar'),
    es = {
      text: String,
      mode: String,
      color: String,
      delay: f(1),
      speed: f(60),
      leftIcon: String,
      wrapable: Boolean,
      background: String,
      scrollable: { type: Boolean, default: null },
    };
  const ts = Re(
      t.defineComponent({
        name: Ji,
        props: es,
        emits: ['close', 'replay'],
        setup(e, { emit: o, slots: n }) {
          let a,
            r = 0,
            l = 0;
          const i = t.ref(),
            s = t.ref(),
            c = t.reactive({ show: !0, offset: 0, duration: 0 }),
            d = (t) => {
              'closeable' === e.mode && ((c.show = !1), o('close', t));
            },
            u = () => {
              if (n['right-icon']) return n['right-icon']();
              const o =
                'closeable' === e.mode
                  ? 'cross'
                  : 'link' === e.mode
                  ? 'arrow'
                  : void 0;
              return o
                ? t.createVNode(
                    ut,
                    { name: o, class: Qi('right-icon'), onClick: d },
                    null
                  )
                : void 0;
            },
            p = () => {
              (c.offset = r),
                (c.duration = 0),
                g(() => {
                  y(() => {
                    (c.offset = -l),
                      (c.duration = (l + r) / +e.speed),
                      o('replay');
                  });
                });
            },
            m = () => {
              const o = !1 === e.scrollable && !e.wrapable,
                a = {
                  transform: c.offset ? `translateX(${c.offset}px)` : '',
                  transitionDuration: `${c.duration}s`,
                };
              return t.createVNode(
                'div',
                { ref: i, role: 'marquee', class: Qi('wrap') },
                [
                  t.createVNode(
                    'div',
                    {
                      ref: s,
                      style: a,
                      class: [Qi('content'), { 'van-ellipsis': o }],
                      onTransitionend: p,
                    },
                    [n.default ? n.default() : e.text]
                  ),
                ]
              );
            },
            f = () => {
              const { delay: t, speed: o, scrollable: n } = e,
                d = W(t) ? 1e3 * +t : 0;
              (r = 0),
                (l = 0),
                (c.offset = 0),
                (c.duration = 0),
                clearTimeout(a),
                (a = setTimeout(() => {
                  if (!i.value || !s.value || !1 === n) return;
                  const e = x(i).width,
                    t = x(s).width;
                  (n || t > e) &&
                    y(() => {
                      (r = e), (l = t), (c.offset = -l), (c.duration = l / +o);
                    });
                }, d));
            };
          return (
            Mt(f),
            A(f),
            P('pageshow', f),
            _e({ reset: f }),
            t.watch(() => [e.text, e.scrollable], f),
            () => {
              const { color: o, wrapable: a, background: r } = e;
              return t.withDirectives(
                t.createVNode(
                  'div',
                  {
                    role: 'alert',
                    class: Qi({ wrapable: a }),
                    style: { color: o, background: r },
                  },
                  [
                    n['left-icon']
                      ? n['left-icon']()
                      : e.leftIcon
                      ? t.createVNode(
                          ut,
                          { class: Qi('left-icon'), name: e.leftIcon },
                          null
                        )
                      : void 0,
                    m(),
                    u(),
                  ]
                ),
                [[t.vShow, c.show]]
              );
            }
          );
        },
      })
    ),
    [os, ns] = Oe('notify'),
    as = n({}, Ot, {
      type: v('danger'),
      color: String,
      message: c,
      position: v('top'),
      className: s,
      background: String,
      lockScroll: Boolean,
    });
  var rs = t.defineComponent({
    name: os,
    props: as,
    emits: ['update:show'],
    setup(e, { emit: o, slots: n }) {
      const a = (e) => o('update:show', e);
      return () =>
        t.createVNode(
          Yt,
          {
            show: e.show,
            class: [ns([e.type]), e.className],
            style: { color: e.color, background: e.background },
            overlay: !1,
            position: e.position,
            duration: 0.2,
            lockScroll: e.lockScroll,
            'onUpdate:show': a,
          },
          { default: () => [n.default ? n.default() : e.message] }
        );
    },
  });
  let ls, is;
  function ss(e) {
    var o;
    if (a)
      return (
        is ||
          ({ instance: is } = Ho({
            setup() {
              const { state: e, toggle: o } = Fo();
              return () =>
                t.createVNode(
                  rs,
                  t.mergeProps(e, { 'onUpdate:show': o }),
                  null
                );
            },
          })),
        (e = n({}, ss.currentOptions, U((o = e)) ? o : { message: o })),
        is.open(e),
        clearTimeout(ls),
        e.duration > 0 && (ls = window.setTimeout(ss.clear, e.duration)),
        is
      );
  }
  (ss.clear = () => {
    is && is.toggle(!1);
  }),
    (ss.currentOptions = {
      type: 'danger',
      color: void 0,
      message: '',
      onClose: void 0,
      onClick: void 0,
      onOpened: void 0,
      duration: 3e3,
      position: void 0,
      className: '',
      lockScroll: !1,
      background: void 0,
    }),
    (ss.setDefaultOptions = (e) => {
      n(ss.currentOptions, e);
    }),
    (ss.resetDefaultOptions = () => {
      ss.currentOptions = {
        type: 'danger',
        color: void 0,
        message: '',
        onClose: void 0,
        onClick: void 0,
        onOpened: void 0,
        duration: 3e3,
        position: void 0,
        className: '',
        lockScroll: !1,
        background: void 0,
      };
    }),
    (ss.Component = Re(rs)),
    (ss.install = (e) => {
      e.use(ss.Component), (e.config.globalProperties.$notify = ss);
    });
  const [cs, ds] = Oe('key'),
    us = t.createVNode(
      'svg',
      { class: ds('collapse-icon'), viewBox: '0 0 30 24' },
      [
        t.createVNode(
          'path',
          {
            d: 'M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z',
            fill: 'currentColor',
          },
          null
        ),
      ]
    ),
    ps = t.createVNode(
      'svg',
      { class: ds('delete-icon'), viewBox: '0 0 32 22' },
      [
        t.createVNode(
          'path',
          {
            d: 'M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z',
            fill: 'currentColor',
          },
          null
        ),
      ]
    );
  var ms = t.defineComponent({
    name: cs,
    props: {
      type: String,
      text: c,
      color: String,
      wider: Boolean,
      large: Boolean,
      loading: Boolean,
    },
    emits: ['press'],
    setup(e, { emit: o, slots: n }) {
      const a = t.ref(!1),
        r = At(),
        l = (e) => {
          r.start(e), (a.value = !0);
        },
        i = (e) => {
          r.move(e), r.direction.value && (a.value = !1);
        },
        s = (t) => {
          a.value &&
            (n.default || ae(t), (a.value = !1), o('press', e.text, e.type));
        },
        c = () => {
          if (e.loading)
            return t.createVNode(gt, { class: ds('loading-icon') }, null);
          const o = n.default ? n.default() : e.text;
          switch (e.type) {
            case 'delete':
              return o || ps;
            case 'extra':
              return o || us;
            default:
              return o;
          }
        };
      return () =>
        t.createVNode(
          'div',
          {
            class: ds('wrapper', { wider: e.wider }),
            onTouchstart: l,
            onTouchmove: i,
            onTouchend: s,
            onTouchcancel: s,
          },
          [
            t.createVNode(
              'div',
              {
                role: 'button',
                tabindex: 0,
                class: ds([
                  e.color,
                  {
                    large: e.large,
                    active: a.value,
                    delete: 'delete' === e.type,
                  },
                ]),
              },
              [c()]
            ),
          ]
        );
    },
  });
  const [fs, vs] = Oe('number-keyboard'),
    hs = {
      show: Boolean,
      title: String,
      theme: v('default'),
      zIndex: c,
      teleport: [String, Object],
      maxlength: f(1 / 0),
      modelValue: v(''),
      transition: d,
      blurOnClose: d,
      showDeleteKey: d,
      randomKeyOrder: Boolean,
      closeButtonText: String,
      deleteButtonText: String,
      closeButtonLoading: Boolean,
      hideOnClickOutside: d,
      safeAreaInsetBottom: d,
      extraKey: { type: [String, Array], default: '' },
    };
  const gs = Re(
      t.defineComponent({
        name: fs,
        props: hs,
        emits: [
          'show',
          'hide',
          'blur',
          'input',
          'close',
          'delete',
          'update:modelValue',
        ],
        setup(e, { emit: o, slots: n }) {
          const a = t.ref(),
            r = () => {
              const t = Array(9)
                .fill('')
                .map((e, t) => ({ text: t + 1 }));
              return (
                e.randomKeyOrder &&
                  (function (e) {
                    for (let t = e.length - 1; t > 0; t--) {
                      const o = Math.floor(Math.random() * (t + 1)),
                        n = e[t];
                      (e[t] = e[o]), (e[o] = n);
                    }
                  })(t),
                t
              );
            },
            l = t.computed(() =>
              'custom' === e.theme
                ? (() => {
                    const t = r(),
                      { extraKey: o } = e,
                      n = Array.isArray(o) ? o : [o];
                    return (
                      1 === n.length
                        ? t.push(
                            { text: 0, wider: !0 },
                            { text: n[0], type: 'extra' }
                          )
                        : 2 === n.length &&
                          t.push(
                            { text: n[0], type: 'extra' },
                            { text: 0 },
                            { text: n[1], type: 'extra' }
                          ),
                      t
                    );
                  })()
                : [
                    ...r(),
                    { text: e.extraKey, type: 'extra' },
                    { text: 0 },
                    {
                      text: e.showDeleteKey ? e.deleteButtonText : '',
                      type: e.showDeleteKey ? 'delete' : '',
                    },
                  ]
            ),
            i = () => {
              e.show && o('blur');
            },
            s = () => {
              o('close'), e.blurOnClose && i();
            },
            c = () => o(e.show ? 'show' : 'hide'),
            d = (t, n) => {
              if ('' === t) return void ('extra' === n && i());
              const a = e.modelValue;
              'delete' === n
                ? (o('delete'),
                  o('update:modelValue', a.slice(0, a.length - 1)))
                : 'close' === n
                ? s()
                : a.length < e.maxlength &&
                  (o('input', t), o('update:modelValue', a + t));
            },
            u = () => {
              if ('custom' === e.theme)
                return t.createVNode('div', { class: vs('sidebar') }, [
                  e.showDeleteKey &&
                    t.createVNode(
                      ms,
                      {
                        large: !0,
                        text: e.deleteButtonText,
                        type: 'delete',
                        onPress: d,
                      },
                      { delete: n.delete }
                    ),
                  t.createVNode(
                    ms,
                    {
                      large: !0,
                      text: e.closeButtonText,
                      type: 'close',
                      color: 'blue',
                      loading: e.closeButtonLoading,
                      onPress: d,
                    },
                    null
                  ),
                ]);
            };
          return (
            t.watch(
              () => e.show,
              (t) => {
                e.transition || o(t ? 'show' : 'hide');
              }
            ),
            e.hideOnClickOutside && z(a, i, { eventName: 'touchstart' }),
            () => {
              const o = (() => {
                  const { title: o, theme: a, closeButtonText: r } = e,
                    l = n['title-left'],
                    i = r && 'default' === a;
                  if (o || i || l)
                    return t.createVNode('div', { class: vs('header') }, [
                      l &&
                        t.createVNode('span', { class: vs('title-left') }, [
                          l(),
                        ]),
                      o && t.createVNode('h2', { class: vs('title') }, [o]),
                      i &&
                        t.createVNode(
                          'button',
                          {
                            type: 'button',
                            class: [vs('close'), Le],
                            onClick: s,
                          },
                          [r]
                        ),
                    ]);
                })(),
                r = t.createVNode(
                  t.Transition,
                  { name: e.transition ? 'van-slide-up' : '' },
                  {
                    default: () => [
                      t.withDirectives(
                        t.createVNode(
                          'div',
                          {
                            ref: a,
                            style: de(e.zIndex),
                            class: vs({
                              unfit: !e.safeAreaInsetBottom,
                              'with-title': !!o,
                            }),
                            onTouchstart: ne,
                            onAnimationend: c,
                            onWebkitAnimationEnd: c,
                          },
                          [
                            o,
                            t.createVNode('div', { class: vs('body') }, [
                              t.createVNode('div', { class: vs('keys') }, [
                                l.value.map((e) => {
                                  const o = {};
                                  return (
                                    'delete' === e.type &&
                                      (o.default = n.delete),
                                    'extra' === e.type &&
                                      (o.default = n['extra-key']),
                                    t.createVNode(
                                      ms,
                                      {
                                        key: e.text,
                                        text: e.text,
                                        type: e.type,
                                        wider: e.wider,
                                        color: e.color,
                                        onPress: d,
                                      },
                                      o
                                    )
                                  );
                                }),
                              ]),
                              u(),
                            ]),
                          ]
                        ),
                        [[t.vShow, e.show]]
                      ),
                    ],
                  }
                );
              return e.teleport
                ? t.createVNode(
                    t.Teleport,
                    { to: e.teleport },
                    { default: () => [r] }
                  )
                : r;
            }
          );
        },
      })
    ),
    [bs, ys, ws] = Oe('pagination'),
    xs = (e, t, o) => ({ number: e, text: t, active: o }),
    Vs = {
      mode: v('multi'),
      prevText: String,
      nextText: String,
      pageCount: f(0),
      modelValue: m(0),
      totalItems: f(0),
      showPageSize: f(5),
      itemsPerPage: f(10),
      forceEllipses: Boolean,
    };
  const Ns = Re(
      t.defineComponent({
        name: bs,
        props: Vs,
        emits: ['change', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          const a = t.computed(() => {
              const { pageCount: t, totalItems: o, itemsPerPage: n } = e,
                a = +t || Math.ceil(+o / +n);
              return Math.max(1, a);
            }),
            r = t.computed(() => {
              const t = [],
                o = a.value,
                n = +e.showPageSize,
                { modelValue: r, forceEllipses: l } = e;
              let i = 1,
                s = o;
              const c = n < o;
              c &&
                ((i = Math.max(r - Math.floor(n / 2), 1)),
                (s = i + n - 1),
                s > o && ((s = o), (i = s - n + 1)));
              for (let e = i; e <= s; e++) {
                const o = xs(e, e, e === r);
                t.push(o);
              }
              if (c && n > 0 && l) {
                if (i > 1) {
                  const e = xs(i - 1, '...');
                  t.unshift(e);
                }
                if (s < o) {
                  const e = xs(s + 1, '...');
                  t.push(e);
                }
              }
              return t;
            }),
            l = (t, n) => {
              (t = ge(t, 1, a.value)),
                e.modelValue !== t &&
                  (o('update:modelValue', t), n && o('change', t));
            };
          t.watchEffect(() => l(e.modelValue));
          const i = () => {
              const { mode: o, modelValue: a } = e,
                r = n['prev-text'],
                i = 1 === a;
              return t.createVNode(
                'li',
                {
                  class: [
                    ys('item', {
                      disabled: i,
                      border: 'simple' === o,
                      prev: !0,
                    }),
                    Ee,
                  ],
                },
                [
                  t.createVNode(
                    'button',
                    {
                      type: 'button',
                      disabled: i,
                      onClick: () => l(a - 1, !0),
                    },
                    [r ? r() : e.prevText || ws('prev')]
                  ),
                ]
              );
            },
            s = () => {
              const { mode: o, modelValue: r } = e,
                i = n['next-text'],
                s = r === a.value;
              return t.createVNode(
                'li',
                {
                  class: [
                    ys('item', {
                      disabled: s,
                      border: 'simple' === o,
                      next: !0,
                    }),
                    Ee,
                  ],
                },
                [
                  t.createVNode(
                    'button',
                    {
                      type: 'button',
                      disabled: s,
                      onClick: () => l(r + 1, !0),
                    },
                    [i ? i() : e.nextText || ws('next')]
                  ),
                ]
              );
            };
          return () =>
            t.createVNode('nav', { role: 'navigation', class: ys() }, [
              t.createVNode('ul', { class: ys('items') }, [
                i(),
                'simple' === e.mode
                  ? t.createVNode('li', { class: ys('page-desc') }, [
                      n.pageDesc ? n.pageDesc() : `${e.modelValue}/${a.value}`,
                    ])
                  : r.value.map((e) =>
                      t.createVNode(
                        'li',
                        {
                          class: [
                            ys('item', { active: e.active, page: !0 }),
                            Ee,
                          ],
                        },
                        [
                          t.createVNode(
                            'button',
                            {
                              type: 'button',
                              'aria-current': e.active || void 0,
                              onClick: () => l(e.number, !0),
                            },
                            [n.page ? n.page(e) : e.text]
                          ),
                        ]
                      )
                    ),
                s(),
              ]),
            ]);
        },
      })
    ),
    [Cs, ks] = Oe('password-input'),
    Ss = {
      info: String,
      mask: d,
      value: v(''),
      gutter: c,
      length: f(6),
      focused: Boolean,
      errorInfo: String,
    };
  const Ts = Re(
    t.defineComponent({
      name: Cs,
      props: Ss,
      emits: ['focus'],
      setup(e, { emit: o }) {
        const n = (e) => {
            e.stopPropagation(), o('focus', e);
          },
          a = () => {
            const o = [],
              { mask: n, value: a, length: r, gutter: l, focused: i } = e;
            for (let e = 0; e < r; e++) {
              const r = a[e],
                s = 0 !== e && !l,
                c = i && e === a.length;
              let d;
              0 !== e && l && (d = { marginLeft: se(l) }),
                o.push(
                  t.createVNode(
                    'li',
                    {
                      class: [{ [Pe]: s }, ks('item', { focus: c })],
                      style: d,
                    },
                    [
                      n
                        ? t.createVNode(
                            'i',
                            { style: { visibility: r ? 'visible' : 'hidden' } },
                            null
                          )
                        : r,
                      c && t.createVNode('div', { class: ks('cursor') }, null),
                    ]
                  )
                );
            }
            return o;
          };
        return () => {
          const o = e.errorInfo || e.info;
          return t.createVNode('div', { class: ks() }, [
            t.createVNode(
              'ul',
              { class: [ks('security'), { [Ee]: !e.gutter }], onTouchstart: n },
              [a()]
            ),
            o &&
              t.createVNode(
                'div',
                { class: ks(e.errorInfo ? 'error-info' : 'info') },
                [o]
              ),
          ]);
        };
      },
    })
  );
  function Bs(e) {
    if (null == e) return window;
    if ('[object Window]' !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function Ds(e) {
    return e instanceof Bs(e).Element || e instanceof Element;
  }
  function Os(e) {
    return e instanceof Bs(e).HTMLElement || e instanceof HTMLElement;
  }
  function Is(e) {
    return (
      'undefined' != typeof ShadowRoot &&
      (e instanceof Bs(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var As = Math.round;
  function Ps(e, t) {
    void 0 === t && (t = !1);
    var o = e.getBoundingClientRect(),
      n = 1,
      a = 1;
    if (Os(e) && t) {
      var r = e.offsetHeight,
        l = e.offsetWidth;
      l > 0 && (n = As(o.width) / l || 1), r > 0 && (a = As(o.height) / r || 1);
    }
    return {
      width: o.width / n,
      height: o.height / a,
      top: o.top / a,
      right: o.right / n,
      bottom: o.bottom / a,
      left: o.left / n,
      x: o.left / n,
      y: o.top / a,
    };
  }
  function zs(e) {
    var t = Bs(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function Es(e) {
    return e ? (e.nodeName || '').toLowerCase() : null;
  }
  function $s(e) {
    return (
      (Ds(e) ? e.ownerDocument : e.document) || window.document
    ).documentElement;
  }
  function Ms(e) {
    return Bs(e).getComputedStyle(e);
  }
  function Ls(e) {
    var t = Ms(e),
      o = t.overflow,
      n = t.overflowX,
      a = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(o + a + n);
  }
  function Fs(e, t, o) {
    void 0 === o && (o = !1);
    var n,
      a,
      r = Os(t),
      l =
        Os(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            o = As(t.width) / e.offsetWidth || 1,
            n = As(t.height) / e.offsetHeight || 1;
          return 1 !== o || 1 !== n;
        })(t),
      i = $s(t),
      s = Ps(e, l),
      c = { scrollLeft: 0, scrollTop: 0 },
      d = { x: 0, y: 0 };
    return (
      (r || (!r && !o)) &&
        (('body' !== Es(t) || Ls(i)) &&
          (c =
            (n = t) !== Bs(n) && Os(n)
              ? { scrollLeft: (a = n).scrollLeft, scrollTop: a.scrollTop }
              : zs(n)),
        Os(t)
          ? (((d = Ps(t, !0)).x += t.clientLeft), (d.y += t.clientTop))
          : i &&
            (d.x = (function (e) {
              return Ps($s(e)).left + zs(e).scrollLeft;
            })(i))),
      {
        x: s.left + c.scrollLeft - d.x,
        y: s.top + c.scrollTop - d.y,
        width: s.width,
        height: s.height,
      }
    );
  }
  function Hs(e) {
    return 'html' === Es(e)
      ? e
      : e.assignedSlot || e.parentNode || (Is(e) ? e.host : null) || $s(e);
  }
  function Rs(e) {
    return ['html', 'body', '#document'].indexOf(Es(e)) >= 0
      ? e.ownerDocument.body
      : Os(e) && Ls(e)
      ? e
      : Rs(Hs(e));
  }
  function js(e, t) {
    var o;
    void 0 === t && (t = []);
    var n = Rs(e),
      a = n === (null == (o = e.ownerDocument) ? void 0 : o.body),
      r = Bs(n),
      l = a ? [r].concat(r.visualViewport || [], Ls(n) ? n : []) : n,
      i = t.concat(l);
    return a ? i : i.concat(js(Hs(l)));
  }
  function Ws(e) {
    return ['table', 'td', 'th'].indexOf(Es(e)) >= 0;
  }
  function qs(e) {
    return Os(e) && 'fixed' !== Ms(e).position ? e.offsetParent : null;
  }
  function Us(e) {
    for (var t = Bs(e), o = qs(e); o && Ws(o) && 'static' === Ms(o).position; )
      o = qs(o);
    return o &&
      ('html' === Es(o) || ('body' === Es(o) && 'static' === Ms(o).position))
      ? t
      : o ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf('firefox');
            if (
              -1 !== navigator.userAgent.indexOf('Trident') &&
              Os(e) &&
              'fixed' === Ms(e).position
            )
              return null;
            var o = Hs(e);
            for (
              Is(o) && (o = o.host);
              Os(o) && ['html', 'body'].indexOf(Es(o)) < 0;

            ) {
              var n = Ms(o);
              if (
                'none' !== n.transform ||
                'none' !== n.perspective ||
                'paint' === n.contain ||
                -1 !== ['transform', 'perspective'].indexOf(n.willChange) ||
                (t && 'filter' === n.willChange) ||
                (t && n.filter && 'none' !== n.filter)
              )
                return o;
              o = o.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var Ys = 'top',
    Xs = 'bottom',
    Gs = 'right',
    _s = 'left',
    Zs = 'auto',
    Ks = 'start',
    Js = 'end',
    Qs = [].concat([Ys, Xs, Gs, _s], [Zs]).reduce(function (e, t) {
      return e.concat([t, t + '-' + Ks, t + '-' + Js]);
    }, []),
    ec = [
      'beforeRead',
      'read',
      'afterRead',
      'beforeMain',
      'main',
      'afterMain',
      'beforeWrite',
      'write',
      'afterWrite',
    ];
  function tc(e) {
    var t = new Map(),
      o = new Set(),
      n = [];
    function a(e) {
      o.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!o.has(e)) {
              var n = t.get(e);
              n && a(n);
            }
          }),
        n.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        o.has(e.name) || a(e);
      }),
      n
    );
  }
  function oc(e) {
    for (
      var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), n = 1;
      n < t;
      n++
    )
      o[n - 1] = arguments[n];
    return [].concat(o).reduce(function (e, t) {
      return e.replace(/%s/, t);
    }, e);
  }
  var nc =
      'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
    ac = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
  function rc(e) {
    return e.split('-')[0];
  }
  function lc(e) {
    return e.split('-')[1];
  }
  var ic =
      'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
    sc = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
  function cc() {
    for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
      t[o] = arguments[o];
    return !t.some(function (e) {
      return !(e && 'function' == typeof e.getBoundingClientRect);
    });
  }
  function dc(e) {
    void 0 === e && (e = {});
    var t = e,
      o = t.defaultModifiers,
      n = void 0 === o ? [] : o,
      a = t.defaultOptions,
      r = void 0 === a ? sc : a;
    return function (e, t, o) {
      void 0 === o && (o = r);
      var a,
        l,
        i = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, sc, r),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        s = [],
        c = !1,
        d = {
          state: i,
          setOptions: function (o) {
            var a = 'function' == typeof o ? o(i.options) : o;
            u(),
              (i.options = Object.assign({}, r, i.options, a)),
              (i.scrollParents = {
                reference: Ds(e)
                  ? js(e)
                  : e.contextElement
                  ? js(e.contextElement)
                  : [],
                popper: js(t),
              });
            var l = (function (e) {
              var t = tc(e);
              return ec.reduce(function (e, o) {
                return e.concat(
                  t.filter(function (e) {
                    return e.phase === o;
                  })
                );
              }, []);
            })(
              (function (e) {
                var t = e.reduce(function (e, t) {
                  var o = e[t.name];
                  return (
                    (e[t.name] = o
                      ? Object.assign({}, o, t, {
                          options: Object.assign({}, o.options, t.options),
                          data: Object.assign({}, o.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(n, i.options.modifiers))
            );
            ((i.orderedModifiers = l.filter(function (e) {
              return e.enabled;
            })),
            (function (e) {
              e.forEach(function (t) {
                []
                  .concat(Object.keys(t), ac)
                  .filter(function (e, t, o) {
                    return o.indexOf(e) === t;
                  })
                  .forEach(function (o) {
                    switch (o) {
                      case 'name':
                        'string' != typeof t.name &&
                          console.error(
                            oc(
                              nc,
                              String(t.name),
                              '"name"',
                              '"string"',
                              '"' + String(t.name) + '"'
                            )
                          );
                        break;
                      case 'enabled':
                        'boolean' != typeof t.enabled &&
                          console.error(
                            oc(
                              nc,
                              t.name,
                              '"enabled"',
                              '"boolean"',
                              '"' + String(t.enabled) + '"'
                            )
                          );
                        break;
                      case 'phase':
                        ec.indexOf(t.phase) < 0 &&
                          console.error(
                            oc(
                              nc,
                              t.name,
                              '"phase"',
                              'either ' + ec.join(', '),
                              '"' + String(t.phase) + '"'
                            )
                          );
                        break;
                      case 'fn':
                        'function' != typeof t.fn &&
                          console.error(
                            oc(
                              nc,
                              t.name,
                              '"fn"',
                              '"function"',
                              '"' + String(t.fn) + '"'
                            )
                          );
                        break;
                      case 'effect':
                        null != t.effect &&
                          'function' != typeof t.effect &&
                          console.error(
                            oc(
                              nc,
                              t.name,
                              '"effect"',
                              '"function"',
                              '"' + String(t.fn) + '"'
                            )
                          );
                        break;
                      case 'requires':
                        null == t.requires ||
                          Array.isArray(t.requires) ||
                          console.error(
                            oc(
                              nc,
                              t.name,
                              '"requires"',
                              '"array"',
                              '"' + String(t.requires) + '"'
                            )
                          );
                        break;
                      case 'requiresIfExists':
                        Array.isArray(t.requiresIfExists) ||
                          console.error(
                            oc(
                              nc,
                              t.name,
                              '"requiresIfExists"',
                              '"array"',
                              '"' + String(t.requiresIfExists) + '"'
                            )
                          );
                        break;
                      case 'options':
                      case 'data':
                        break;
                      default:
                        console.error(
                          'PopperJS: an invalid property has been provided to the "' +
                            t.name +
                            '" modifier, valid properties are ' +
                            ac
                              .map(function (e) {
                                return '"' + e + '"';
                              })
                              .join(', ') +
                            '; but "' +
                            o +
                            '" was provided.'
                        );
                    }
                    t.requires &&
                      t.requires.forEach(function (o) {
                        null ==
                          e.find(function (e) {
                            return e.name === o;
                          }) &&
                          console.error(
                            oc(
                              'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
                              String(t.name),
                              o,
                              o
                            )
                          );
                      });
                  });
              });
            })(
              ((c = [].concat(l, i.options.modifiers)),
              (p = function (e) {
                return e.name;
              }),
              (m = new Set()),
              c.filter(function (e) {
                var t = p(e);
                if (!m.has(t)) return m.add(t), !0;
              }))
            ),
            rc(i.options.placement) === Zs) &&
              (i.orderedModifiers.find(function (e) {
                return 'flip' === e.name;
              }) ||
                console.error(
                  [
                    'Popper: "auto" placements require the "flip" modifier be',
                    'present and enabled to work.',
                  ].join(' ')
                ));
            var c,
              p,
              m,
              f = Ms(t);
            return (
              [f.marginTop, f.marginRight, f.marginBottom, f.marginLeft].some(
                function (e) {
                  return parseFloat(e);
                }
              ) &&
                console.warn(
                  [
                    'Popper: CSS "margin" styles cannot be used to apply padding',
                    'between the popper and its reference element or boundary.',
                    'To replicate margin, use the `offset` modifier, as well as',
                    'the `padding` option in the `preventOverflow` and `flip`',
                    'modifiers.',
                  ].join(' ')
                ),
              i.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  o = e.options,
                  n = void 0 === o ? {} : o,
                  a = e.effect;
                if ('function' == typeof a) {
                  var r = a({ state: i, name: t, instance: d, options: n }),
                    l = function () {};
                  s.push(r || l);
                }
              }),
              d.update()
            );
          },
          forceUpdate: function () {
            if (!c) {
              var e = i.elements,
                t = e.reference,
                o = e.popper;
              if (cc(t, o)) {
                var n, a, r, l;
                (i.rects = {
                  reference: Fs(t, Us(o), 'fixed' === i.options.strategy),
                  popper:
                    ((n = o),
                    (a = Ps(n)),
                    (r = n.offsetWidth),
                    (l = n.offsetHeight),
                    Math.abs(a.width - r) <= 1 && (r = a.width),
                    Math.abs(a.height - l) <= 1 && (l = a.height),
                    { x: n.offsetLeft, y: n.offsetTop, width: r, height: l }),
                }),
                  (i.reset = !1),
                  (i.placement = i.options.placement),
                  i.orderedModifiers.forEach(function (e) {
                    return (i.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var s = 0, u = 0; u < i.orderedModifiers.length; u++) {
                  if ((s += 1) > 100) {
                    console.error(
                      'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.'
                    );
                    break;
                  }
                  if (!0 !== i.reset) {
                    var p = i.orderedModifiers[u],
                      m = p.fn,
                      f = p.options,
                      v = void 0 === f ? {} : f,
                      h = p.name;
                    'function' == typeof m &&
                      (i =
                        m({ state: i, options: v, name: h, instance: d }) || i);
                  } else (i.reset = !1), (u = -1);
                }
              } else console.error(ic);
            }
          },
          update:
            ((a = function () {
              return new Promise(function (e) {
                d.forceUpdate(), e(i);
              });
            }),
            function () {
              return (
                l ||
                  (l = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (l = void 0), e(a());
                    });
                  })),
                l
              );
            }),
          destroy: function () {
            u(), (c = !0);
          },
        };
      if (!cc(e, t)) return console.error(ic), d;
      function u() {
        s.forEach(function (e) {
          return e();
        }),
          (s = []);
      }
      return (
        d.setOptions(o).then(function (e) {
          !c && o.onFirstUpdate && o.onFirstUpdate(e);
        }),
        d
      );
    };
  }
  var uc = { passive: !0 };
  var pc = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
  function mc(e) {
    var t,
      o = e.popper,
      n = e.popperRect,
      a = e.placement,
      r = e.variation,
      l = e.offsets,
      i = e.position,
      s = e.gpuAcceleration,
      c = e.adaptive,
      d = e.roundOffsets,
      u = e.isFixed,
      p = l.x,
      m = void 0 === p ? 0 : p,
      f = l.y,
      v = void 0 === f ? 0 : f,
      h = 'function' == typeof d ? d({ x: m, y: v }) : { x: m, y: v };
    (m = h.x), (v = h.y);
    var g = l.hasOwnProperty('x'),
      b = l.hasOwnProperty('y'),
      y = _s,
      w = Ys,
      x = window;
    if (c) {
      var V = Us(o),
        N = 'clientHeight',
        C = 'clientWidth';
      if (
        (V === Bs(o) &&
          'static' !== Ms((V = $s(o))).position &&
          'absolute' === i &&
          ((N = 'scrollHeight'), (C = 'scrollWidth')),
        a === Ys || ((a === _s || a === Gs) && r === Js))
      )
        (w = Xs),
          (v -=
            (u && V === x && x.visualViewport
              ? x.visualViewport.height
              : V[N]) - n.height),
          (v *= s ? 1 : -1);
      if (a === _s || ((a === Ys || a === Xs) && r === Js))
        (y = Gs),
          (m -=
            (u && V === x && x.visualViewport ? x.visualViewport.width : V[C]) -
            n.width),
          (m *= s ? 1 : -1);
    }
    var k,
      S = Object.assign({ position: i }, c && pc),
      T =
        !0 === d
          ? (function (e) {
              var t = e.x,
                o = e.y,
                n = window.devicePixelRatio || 1;
              return { x: As(t * n) / n || 0, y: As(o * n) / n || 0 };
            })({ x: m, y: v })
          : { x: m, y: v };
    return (
      (m = T.x),
      (v = T.y),
      s
        ? Object.assign(
            {},
            S,
            (((k = {})[w] = b ? '0' : ''),
            (k[y] = g ? '0' : ''),
            (k.transform =
              (x.devicePixelRatio || 1) <= 1
                ? 'translate(' + m + 'px, ' + v + 'px)'
                : 'translate3d(' + m + 'px, ' + v + 'px, 0)'),
            k)
          )
        : Object.assign(
            {},
            S,
            (((t = {})[w] = b ? v + 'px' : ''),
            (t[y] = g ? m + 'px' : ''),
            (t.transform = ''),
            t)
          )
    );
  }
  var fc = dc({
    defaultModifiers: [
      {
        name: 'eventListeners',
        enabled: !0,
        phase: 'write',
        fn: function () {},
        effect: function (e) {
          var t = e.state,
            o = e.instance,
            n = e.options,
            a = n.scroll,
            r = void 0 === a || a,
            l = n.resize,
            i = void 0 === l || l,
            s = Bs(t.elements.popper),
            c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
          return (
            r &&
              c.forEach(function (e) {
                e.addEventListener('scroll', o.update, uc);
              }),
            i && s.addEventListener('resize', o.update, uc),
            function () {
              r &&
                c.forEach(function (e) {
                  e.removeEventListener('scroll', o.update, uc);
                }),
                i && s.removeEventListener('resize', o.update, uc);
            }
          );
        },
        data: {},
      },
      {
        name: 'popperOffsets',
        enabled: !0,
        phase: 'read',
        fn: function (e) {
          var t = e.state,
            o = e.name;
          t.modifiersData[o] = (function (e) {
            var t,
              o = e.reference,
              n = e.element,
              a = e.placement,
              r = a ? rc(a) : null,
              l = a ? lc(a) : null,
              i = o.x + o.width / 2 - n.width / 2,
              s = o.y + o.height / 2 - n.height / 2;
            switch (r) {
              case Ys:
                t = { x: i, y: o.y - n.height };
                break;
              case Xs:
                t = { x: i, y: o.y + o.height };
                break;
              case Gs:
                t = { x: o.x + o.width, y: s };
                break;
              case _s:
                t = { x: o.x - n.width, y: s };
                break;
              default:
                t = { x: o.x, y: o.y };
            }
            var c = r
              ? (function (e) {
                  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
                })(r)
              : null;
            if (null != c) {
              var d = 'y' === c ? 'height' : 'width';
              switch (l) {
                case Ks:
                  t[c] = t[c] - (o[d] / 2 - n[d] / 2);
                  break;
                case Js:
                  t[c] = t[c] + (o[d] / 2 - n[d] / 2);
              }
            }
            return t;
          })({
            reference: t.rects.reference,
            element: t.rects.popper,
            strategy: 'absolute',
            placement: t.placement,
          });
        },
        data: {},
      },
      {
        name: 'computeStyles',
        enabled: !0,
        phase: 'beforeWrite',
        fn: function (e) {
          var t = e.state,
            o = e.options,
            n = o.gpuAcceleration,
            a = void 0 === n || n,
            r = o.adaptive,
            l = void 0 === r || r,
            i = o.roundOffsets,
            s = void 0 === i || i,
            c = Ms(t.elements.popper).transitionProperty || '';
          l &&
            ['transform', 'top', 'right', 'bottom', 'left'].some(function (e) {
              return c.indexOf(e) >= 0;
            }) &&
            console.warn(
              [
                'Popper: Detected CSS transitions on at least one of the following',
                'CSS properties: "transform", "top", "right", "bottom", "left".',
                '\n\n',
                'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
                'for smooth transitions, or remove these properties from the CSS',
                'transition declaration on the popper element if only transitioning',
                'opacity or background-color for example.',
                '\n\n',
                'We recommend using the popper element as a wrapper around an inner',
                'element that can have any CSS property transitioned for animations.',
              ].join(' ')
            );
          var d = {
            placement: rc(t.placement),
            variation: lc(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: a,
            isFixed: 'fixed' === t.options.strategy,
          };
          null != t.modifiersData.popperOffsets &&
            (t.styles.popper = Object.assign(
              {},
              t.styles.popper,
              mc(
                Object.assign({}, d, {
                  offsets: t.modifiersData.popperOffsets,
                  position: t.options.strategy,
                  adaptive: l,
                  roundOffsets: s,
                })
              )
            )),
            null != t.modifiersData.arrow &&
              (t.styles.arrow = Object.assign(
                {},
                t.styles.arrow,
                mc(
                  Object.assign({}, d, {
                    offsets: t.modifiersData.arrow,
                    position: 'absolute',
                    adaptive: !1,
                    roundOffsets: s,
                  })
                )
              )),
            (t.attributes.popper = Object.assign({}, t.attributes.popper, {
              'data-popper-placement': t.placement,
            }));
        },
        data: {},
      },
      {
        name: 'applyStyles',
        enabled: !0,
        phase: 'write',
        fn: function (e) {
          var t = e.state;
          Object.keys(t.elements).forEach(function (e) {
            var o = t.styles[e] || {},
              n = t.attributes[e] || {},
              a = t.elements[e];
            Os(a) &&
              Es(a) &&
              (Object.assign(a.style, o),
              Object.keys(n).forEach(function (e) {
                var t = n[e];
                !1 === t
                  ? a.removeAttribute(e)
                  : a.setAttribute(e, !0 === t ? '' : t);
              }));
          });
        },
        effect: function (e) {
          var t = e.state,
            o = {
              popper: {
                position: t.options.strategy,
                left: '0',
                top: '0',
                margin: '0',
              },
              arrow: { position: 'absolute' },
              reference: {},
            };
          return (
            Object.assign(t.elements.popper.style, o.popper),
            (t.styles = o),
            t.elements.arrow && Object.assign(t.elements.arrow.style, o.arrow),
            function () {
              Object.keys(t.elements).forEach(function (e) {
                var n = t.elements[e],
                  a = t.attributes[e] || {},
                  r = Object.keys(
                    t.styles.hasOwnProperty(e) ? t.styles[e] : o[e]
                  ).reduce(function (e, t) {
                    return (e[t] = ''), e;
                  }, {});
                Os(n) &&
                  Es(n) &&
                  (Object.assign(n.style, r),
                  Object.keys(a).forEach(function (e) {
                    n.removeAttribute(e);
                  }));
              });
            }
          );
        },
        requires: ['computeStyles'],
      },
    ],
  });
  var vc = {
    name: 'offset',
    enabled: !0,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: function (e) {
      var t = e.state,
        o = e.options,
        n = e.name,
        a = o.offset,
        r = void 0 === a ? [0, 0] : a,
        l = Qs.reduce(function (e, o) {
          return (
            (e[o] = (function (e, t, o) {
              var n = rc(e),
                a = [_s, Ys].indexOf(n) >= 0 ? -1 : 1,
                r =
                  'function' == typeof o
                    ? o(Object.assign({}, t, { placement: e }))
                    : o,
                l = r[0],
                i = r[1];
              return (
                (l = l || 0),
                (i = (i || 0) * a),
                [_s, Gs].indexOf(n) >= 0 ? { x: i, y: l } : { x: l, y: i }
              );
            })(o, t.rects, r)),
            e
          );
        }, {}),
        i = l[t.placement],
        s = i.x,
        c = i.y;
      null != t.modifiersData.popperOffsets &&
        ((t.modifiersData.popperOffsets.x += s),
        (t.modifiersData.popperOffsets.y += c)),
        (t.modifiersData[n] = l);
    },
  };
  const [hc, gc] = Oe('popover'),
    bc = [
      'show',
      'overlay',
      'duration',
      'teleport',
      'overlayStyle',
      'overlayClass',
      'closeOnClickOverlay',
    ],
    yc = {
      show: Boolean,
      theme: v('light'),
      overlay: Boolean,
      actions: p(),
      trigger: v('click'),
      duration: c,
      showArrow: d,
      placement: v('bottom'),
      iconPrefix: String,
      overlayClass: s,
      overlayStyle: Object,
      closeOnClickAction: d,
      closeOnClickOverlay: d,
      closeOnClickOutside: d,
      offset: { type: Array, default: () => [0, 8] },
      teleport: { type: [String, Object], default: 'body' },
    };
  const wc = Re(
      t.defineComponent({
        name: hc,
        props: yc,
        emits: ['select', 'touchstart', 'update:show'],
        setup(e, { emit: o, slots: a, attrs: r }) {
          let i;
          const s = t.ref(),
            c = t.ref(),
            d = () => ({
              placement: e.placement,
              modifiers: [
                {
                  name: 'computeStyles',
                  options: { adaptive: !1, gpuAcceleration: !1 },
                },
                n({}, vc, { options: { offset: e.offset } }),
              ],
            }),
            u = () => {
              t.nextTick(() => {
                e.show &&
                  (i
                    ? i.setOptions(d())
                    : (i =
                        s.value && c.value
                          ? fc(s.value, c.value.popupRef.value, d())
                          : null));
              });
            },
            p = (e) => o('update:show', e),
            m = () => {
              'click' === e.trigger && p(!e.show);
            },
            f = (e) => {
              e.stopPropagation(), o('touchstart', e);
            },
            v = (o, n) =>
              a.action
                ? a.action({ action: o, index: n })
                : [
                    o.icon &&
                      t.createVNode(
                        ut,
                        {
                          name: o.icon,
                          classPrefix: e.iconPrefix,
                          class: gc('action-icon'),
                        },
                        null
                      ),
                    t.createVNode('div', { class: [gc('action-text'), ze] }, [
                      o.text,
                    ]),
                  ],
            h = (n, a) => {
              const { icon: r, color: l, disabled: i, className: s } = n;
              return t.createVNode(
                'div',
                {
                  role: 'menuitem',
                  class: [gc('action', { disabled: i, 'with-icon': r }), s],
                  style: { color: l },
                  tabindex: i ? void 0 : 0,
                  'aria-disabled': i || void 0,
                  onClick: () =>
                    ((t, n) => {
                      t.disabled ||
                        (o('select', t, n), e.closeOnClickAction && p(!1));
                    })(n, a),
                },
                [v(n, a)]
              );
            };
          return (
            t.onMounted(u),
            t.onBeforeUnmount(() => {
              i && (i.destroy(), (i = null));
            }),
            t.watch(() => [e.show, e.offset, e.placement], u),
            z(
              s,
              () => {
                !e.closeOnClickOutside ||
                  (e.overlay && !e.closeOnClickOverlay) ||
                  p(!1);
              },
              { eventName: 'touchstart' }
            ),
            () => {
              var o;
              return t.createVNode(t.Fragment, null, [
                t.createVNode(
                  'span',
                  { ref: s, class: gc('wrapper'), onClick: m },
                  [null == (o = a.reference) ? void 0 : o.call(a)]
                ),
                t.createVNode(
                  Yt,
                  t.mergeProps(
                    {
                      ref: c,
                      class: gc([e.theme]),
                      position: '',
                      transition: 'van-popover-zoom',
                      lockScroll: !1,
                      onTouchstart: f,
                      'onUpdate:show': p,
                    },
                    r,
                    l(e, bc)
                  ),
                  {
                    default: () => [
                      e.showArrow &&
                        t.createVNode('div', { class: gc('arrow') }, null),
                      t.createVNode(
                        'div',
                        { role: 'menu', class: gc('content') },
                        [a.default ? a.default() : e.actions.map(h)]
                      ),
                    ],
                  }
                ),
              ]);
            }
          );
        },
      })
    ),
    [xc, Vc] = Oe('progress'),
    Nc = {
      color: String,
      inactive: Boolean,
      pivotText: String,
      textColor: String,
      showPivot: d,
      pivotColor: String,
      trackColor: String,
      strokeWidth: c,
      percentage: { type: c, default: 0, validator: (e) => e >= 0 && e <= 100 },
    };
  const Cc = Re(
      t.defineComponent({
        name: xc,
        props: Nc,
        setup(e) {
          const o = t.computed(() => (e.inactive ? void 0 : e.color)),
            n = () => {
              const {
                  textColor: n,
                  pivotText: a,
                  pivotColor: r,
                  percentage: l,
                } = e,
                i = null != a ? a : `${l}%`;
              if (e.showPivot && i) {
                const a = {
                  color: n,
                  left: +l + '%',
                  transform: `translate(-${+l}%,-50%)`,
                  background: r || o.value,
                };
                return t.createVNode(
                  'span',
                  { style: a, class: Vc('pivot', { inactive: e.inactive }) },
                  [i]
                );
              }
            };
          return () => {
            const { trackColor: a, percentage: r, strokeWidth: l } = e,
              i = { background: a, height: se(l) },
              s = { width: `${r}%`, background: o.value };
            return t.createVNode('div', { class: Vc(), style: i }, [
              t.createVNode(
                'span',
                { class: Vc('portion', { inactive: e.inactive }), style: s },
                null
              ),
              n(),
            ]);
          };
        },
      })
    ),
    [kc, Sc, Tc] = Oe('pull-refresh'),
    Bc = ['pulling', 'loosing', 'success'],
    Dc = {
      disabled: Boolean,
      modelValue: Boolean,
      headHeight: f(50),
      successText: String,
      pullingText: String,
      loosingText: String,
      loadingText: String,
      pullDistance: c,
      successDuration: f(500),
      animationDuration: f(300),
    };
  const Oc = Re(
      t.defineComponent({
        name: kc,
        props: Dc,
        emits: ['change', 'refresh', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          let a;
          const r = t.ref(),
            l = H(r),
            i = t.reactive({ status: 'normal', distance: 0, duration: 0 }),
            s = At(),
            c = () => {
              if (50 !== e.headHeight) return { height: `${e.headHeight}px` };
            },
            d = () =>
              'loading' !== i.status && 'success' !== i.status && !e.disabled,
            u = (t, n) => {
              const a = +(e.pullDistance || e.headHeight);
              (i.distance = t),
                (i.status = n
                  ? 'loading'
                  : 0 === t
                  ? 'normal'
                  : t < a
                  ? 'pulling'
                  : 'loosing'),
                o('change', { status: i.status, distance: t });
            },
            p = () => {
              const { status: t } = i;
              return 'normal' === t ? '' : e[`${t}Text`] || Tc(t);
            },
            m = () => {
              const { status: e, distance: o } = i;
              if (n[e]) return n[e]({ distance: o });
              const a = [];
              return (
                Bc.includes(e) &&
                  a.push(t.createVNode('div', { class: Sc('text') }, [p()])),
                'loading' === e &&
                  a.push(
                    t.createVNode(gt, { class: Sc('loading') }, { default: p })
                  ),
                a
              );
            },
            f = (e) => {
              (a = 0 === Z(l.value)), a && ((i.duration = 0), s.start(e));
            },
            v = (e) => {
              d() && f(e);
            },
            h = (t) => {
              if (d()) {
                a || f(t);
                const { deltaY: o } = s;
                s.move(t),
                  a &&
                    o.value >= 0 &&
                    s.isVertical() &&
                    (ae(t),
                    u(
                      ((t) => {
                        const o = +(e.pullDistance || e.headHeight);
                        return (
                          t > o &&
                            (t =
                              t < 2 * o
                                ? o + (t - o) / 2
                                : 1.5 * o + (t - 2 * o) / 4),
                          Math.round(t)
                        );
                      })(o.value)
                    ));
              }
            },
            g = () => {
              a &&
                s.deltaY.value &&
                d() &&
                ((i.duration = +e.animationDuration),
                'loosing' === i.status
                  ? (u(+e.headHeight, !0),
                    o('update:modelValue', !0),
                    t.nextTick(() => o('refresh')))
                  : u(0));
            };
          return (
            t.watch(
              () => e.modelValue,
              (t) => {
                (i.duration = +e.animationDuration),
                  t
                    ? u(+e.headHeight, !0)
                    : n.success || e.successText
                    ? ((i.status = 'success'),
                      setTimeout(() => {
                        u(0);
                      }, +e.successDuration))
                    : u(0, !1);
              }
            ),
            () => {
              var e;
              const o = {
                transitionDuration: `${i.duration}ms`,
                transform: i.distance
                  ? `translate3d(0,${i.distance}px, 0)`
                  : '',
              };
              return t.createVNode('div', { ref: r, class: Sc() }, [
                t.createVNode(
                  'div',
                  {
                    class: Sc('track'),
                    style: o,
                    onTouchstart: v,
                    onTouchmove: h,
                    onTouchend: g,
                    onTouchcancel: g,
                  },
                  [
                    t.createVNode('div', { class: Sc('head'), style: c() }, [
                      m(),
                    ]),
                    null == (e = n.default) ? void 0 : e.call(n),
                  ]
                ),
              ]);
            }
          );
        },
      })
    ),
    [Ic, Ac] = Oe('rate');
  const Pc = {
    size: c,
    icon: v('star'),
    color: String,
    count: f(5),
    gutter: c,
    readonly: Boolean,
    disabled: Boolean,
    voidIcon: v('star-o'),
    allowHalf: Boolean,
    voidColor: String,
    touchable: d,
    iconPrefix: String,
    modelValue: m(0),
    disabledColor: String,
  };
  const zc = Re(
      t.defineComponent({
        name: Ic,
        props: Pc,
        emits: ['change', 'update:modelValue'],
        setup(e, { emit: o }) {
          const n = At(),
            [a, r] = Zn(),
            l = t.ref(),
            i = () => e.readonly || e.disabled || !e.touchable,
            s = t.computed(() =>
              Array(+e.count)
                .fill('')
                .map((t, o) =>
                  (function (e, t, o, n) {
                    if (e >= t) return { status: 'full', value: 1 };
                    if (e + 0.5 >= t && o && !n)
                      return { status: 'half', value: 0.5 };
                    if (e + 1 >= t && o && n) {
                      const o = 10 ** 10;
                      return {
                        status: 'half',
                        value: Math.round((e - t + 1) * o) / o,
                      };
                    }
                    return { status: 'void', value: 0 };
                  })(e.modelValue, o + 1, e.allowHalf, e.readonly)
                )
            );
          let c,
            d,
            u = Number.MAX_SAFE_INTEGER,
            p = Number.MIN_SAFE_INTEGER;
          const m = () => {
              d = x(l);
              const t = a.value.map(x);
              (c = []),
                t.forEach((t, o) => {
                  (u = Math.min(t.top, u)),
                    (p = Math.max(t.top, p)),
                    e.allowHalf
                      ? c.push(
                          {
                            score: o + 0.5,
                            left: t.left,
                            top: t.top,
                            height: t.height,
                          },
                          {
                            score: o + 1,
                            left: t.left + t.width / 2,
                            top: t.top,
                            height: t.height,
                          }
                        )
                      : c.push({
                          score: o + 1,
                          left: t.left,
                          top: t.top,
                          height: t.height,
                        });
                });
            },
            f = (t, o) => {
              for (let e = c.length - 1; e > 0; e--)
                if (o >= d.top && o <= d.bottom) {
                  if (
                    t > c[e].left &&
                    o >= c[e].top &&
                    o <= c[e].top + c[e].height
                  )
                    return c[e].score;
                } else {
                  const n = o < d.top ? u : p;
                  if (t > c[e].left && c[e].top === n) return c[e].score;
                }
              return e.allowHalf ? 0.5 : 1;
            },
            v = (t) => {
              e.disabled ||
                e.readonly ||
                t === e.modelValue ||
                (o('update:modelValue', t), o('change', t));
            },
            h = (e) => {
              i() || (n.start(e), m());
            },
            g = (e) => {
              if (!i() && (n.move(e), n.isHorizontal())) {
                const { clientX: t, clientY: o } = e.touches[0];
                ae(e), v(f(t, o));
              }
            },
            b = (o, n) => {
              const {
                  icon: a,
                  size: l,
                  color: i,
                  count: s,
                  gutter: c,
                  voidIcon: d,
                  disabled: u,
                  voidColor: p,
                  allowHalf: h,
                  iconPrefix: g,
                  disabledColor: b,
                } = e,
                y = n + 1,
                w = 'full' === o.status,
                x = 'void' === o.status,
                V = h && o.value > 0 && o.value < 1;
              let N;
              c && y !== +s && (N = { paddingRight: se(c) });
              return t.createVNode(
                'div',
                {
                  key: n,
                  ref: r(n),
                  role: 'radio',
                  style: N,
                  class: Ac('item'),
                  tabindex: u ? void 0 : 0,
                  'aria-setsize': s,
                  'aria-posinset': y,
                  'aria-checked': !x,
                  onClick: (e) => {
                    m(), v(h ? f(e.clientX, e.clientY) : y);
                  },
                },
                [
                  t.createVNode(
                    ut,
                    {
                      size: l,
                      name: w ? a : d,
                      class: Ac('icon', { disabled: u, full: w }),
                      color: u ? b : w ? i : p,
                      classPrefix: g,
                    },
                    null
                  ),
                  V &&
                    t.createVNode(
                      ut,
                      {
                        size: l,
                        style: { width: o.value + 'em' },
                        name: x ? d : a,
                        class: Ac('icon', ['half', { disabled: u, full: !x }]),
                        color: u ? b : x ? p : i,
                        classPrefix: g,
                      },
                      null
                    ),
                ]
              );
            };
          return (
            j(() => e.modelValue),
            () =>
              t.createVNode(
                'div',
                {
                  ref: l,
                  role: 'radiogroup',
                  class: Ac({ readonly: e.readonly, disabled: e.disabled }),
                  tabindex: e.disabled ? void 0 : 0,
                  'aria-disabled': e.disabled,
                  'aria-readonly': e.readonly,
                  onTouchstart: h,
                  onTouchmove: g,
                },
                [s.value.map(b)]
              )
          );
        },
      })
    ),
    Ec = Re(Nr),
    [$c, Mc, Lc] = Oe('search'),
    Fc = n({}, $o, {
      label: String,
      shape: v('square'),
      leftIcon: v('search'),
      clearable: d,
      actionText: String,
      background: String,
      showAction: Boolean,
    });
  const Hc = Re(
      t.defineComponent({
        name: $c,
        props: Fc,
        emits: [
          'blur',
          'focus',
          'clear',
          'search',
          'cancel',
          'click-input',
          'click-left-icon',
          'click-right-icon',
          'update:modelValue',
        ],
        setup(e, { emit: o, slots: a, attrs: r }) {
          const i = Po(),
            s = t.ref(),
            c = () => {
              a.action || (o('update:modelValue', ''), o('cancel'));
            },
            d = (t) => {
              13 === t.keyCode && (ae(t), o('search', e.modelValue));
            },
            u = () => e.id || `${i}-input`,
            p = () => {
              if (a.label || e.label)
                return t.createVNode(
                  'label',
                  { class: Mc('label'), for: u() },
                  [a.label ? a.label() : e.label]
                );
            },
            m = () => {
              if (e.showAction) {
                const o = e.actionText || Lc('cancel');
                return t.createVNode(
                  'div',
                  {
                    class: Mc('action'),
                    role: 'button',
                    tabindex: 0,
                    onClick: c,
                  },
                  [a.action ? a.action() : o]
                );
              }
            },
            f = (e) => o('blur', e),
            v = (e) => o('focus', e),
            h = (e) => o('clear', e),
            g = (e) => o('click-input', e),
            b = (e) => o('click-left-icon', e),
            y = (e) => o('click-right-icon', e),
            w = Object.keys($o),
            x = () => {
              const i = n({}, r, l(e, w), { id: u() });
              return t.createVNode(
                Lo,
                t.mergeProps(
                  {
                    ref: s,
                    type: 'search',
                    class: Mc('field'),
                    border: !1,
                    onBlur: f,
                    onFocus: v,
                    onClear: h,
                    onKeypress: d,
                    'onClick-input': g,
                    'onClick-left-icon': b,
                    'onClick-right-icon': y,
                    'onUpdate:modelValue': (e) => o('update:modelValue', e),
                  },
                  i
                ),
                l(a, ['left-icon', 'right-icon'])
              );
            };
          return (
            _e({
              focus: () => {
                var e;
                return null == (e = s.value) ? void 0 : e.focus();
              },
              blur: () => {
                var e;
                return null == (e = s.value) ? void 0 : e.blur();
              },
            }),
            () => {
              var o;
              return t.createVNode(
                'div',
                {
                  class: Mc({ 'show-action': e.showAction }),
                  style: { background: e.background },
                },
                [
                  null == (o = a.left) ? void 0 : o.call(a),
                  t.createVNode('div', { class: Mc('content', e.shape) }, [
                    p(),
                    x(),
                  ]),
                  m(),
                ]
              );
            }
          );
        },
      })
    ),
    Rc = [...It, 'round', 'closeOnPopstate', 'safeAreaInsetBottom'],
    jc = {
      qq: 'qq',
      link: 'link-o',
      weibo: 'weibo',
      qrcode: 'qr',
      poster: 'photo-o',
      wechat: 'wechat',
      'weapp-qrcode': 'miniprogram-o',
      'wechat-moments': 'wechat-moments',
    },
    [Wc, qc, Uc] = Oe('share-sheet'),
    Yc = n({}, Ot, {
      title: String,
      round: d,
      options: p(),
      cancelText: String,
      description: String,
      closeOnPopstate: d,
      safeAreaInsetBottom: d,
    });
  const Xc = Re(
      t.defineComponent({
        name: Wc,
        props: Yc,
        emits: ['cancel', 'select', 'update:show'],
        setup(e, { emit: o, slots: n }) {
          const a = (e) => o('update:show', e),
            r = () => {
              a(!1), o('cancel');
            },
            i = () => {
              const o = n.title ? n.title() : e.title,
                a = n.description ? n.description() : e.description;
              if (o || a)
                return t.createVNode('div', { class: qc('header') }, [
                  o && t.createVNode('h2', { class: qc('title') }, [o]),
                  a && t.createVNode('span', { class: qc('description') }, [a]),
                ]);
            },
            s = (e) =>
              jc[e]
                ? t.createVNode('div', { class: qc('icon', [e]) }, [
                    t.createVNode(ut, { name: jc[e] || e }, null),
                  ])
                : t.createVNode(
                    'img',
                    { src: e, class: qc('image-icon') },
                    null
                  ),
            c = (e, n) => {
              const { name: a, icon: r, className: l, description: i } = e;
              return t.createVNode(
                'div',
                {
                  role: 'button',
                  tabindex: 0,
                  class: [qc('option'), l, Le],
                  onClick: () => ((e, t) => o('select', e, t))(e, n),
                },
                [
                  s(r),
                  a && t.createVNode('span', { class: qc('name') }, [a]),
                  i &&
                    t.createVNode('span', { class: qc('option-description') }, [
                      i,
                    ]),
                ]
              );
            },
            d = (e, o) =>
              t.createVNode('div', { class: qc('options', { border: o }) }, [
                e.map(c),
              ]),
            u = () => {
              const { options: t } = e;
              return Array.isArray(t[0])
                ? t.map((e, t) => d(e, 0 !== t))
                : d(t);
            },
            p = () => {
              var o;
              const a = null != (o = e.cancelText) ? o : Uc('cancel');
              if (n.cancel || a)
                return t.createVNode(
                  'button',
                  { type: 'button', class: qc('cancel'), onClick: r },
                  [n.cancel ? n.cancel() : a]
                );
            };
          return () =>
            t.createVNode(
              Yt,
              t.mergeProps(
                { class: qc(), position: 'bottom', 'onUpdate:show': a },
                l(e, Rc)
              ),
              { default: () => [i(), u(), p()] }
            );
        },
      })
    ),
    [Gc, _c] = Oe('sidebar'),
    Zc = Symbol(Gc),
    Kc = { modelValue: f(0) };
  const Jc = Re(
      t.defineComponent({
        name: Gc,
        props: Kc,
        emits: ['change', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          const { linkChildren: a } = C(Zc),
            r = () => +e.modelValue;
          return (
            a({
              getActive: r,
              setActive: (e) => {
                e !== r() && (o('update:modelValue', e), o('change', e));
              },
            }),
            () => {
              var e;
              return t.createVNode('div', { role: 'tablist', class: _c() }, [
                null == (e = n.default) ? void 0 : e.call(n),
              ]);
            }
          );
        },
      })
    ),
    [Qc, ed] = Oe('sidebar-item'),
    td = n({}, Ze, {
      dot: Boolean,
      title: String,
      badge: c,
      disabled: Boolean,
      badgeProps: Object,
    });
  const od = Re(
      t.defineComponent({
        name: Qc,
        props: td,
        emits: ['click'],
        setup(e, { emit: o, slots: n }) {
          const a = Je(),
            { parent: r, index: l } = V(Zc);
          if (!r)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error(
                '[Vant] <SidebarItem> must be a child component of <Sidebar>.'
              )
            );
          const i = () => {
            e.disabled || (o('click', l.value), r.setActive(l.value), a());
          };
          return () => {
            const { dot: o, badge: a, title: s, disabled: c } = e,
              d = l.value === r.getActive();
            return t.createVNode(
              'div',
              {
                role: 'tab',
                class: ed({ select: d, disabled: c }),
                tabindex: c ? void 0 : 0,
                'aria-selected': d,
                onClick: i,
              },
              [
                t.createVNode(
                  ot,
                  t.mergeProps(
                    { dot: o, class: ed('text'), content: a },
                    e.badgeProps
                  ),
                  { default: () => [n.title ? n.title() : s] }
                ),
              ]
            );
          };
        },
      })
    ),
    [nd, ad] = Oe('skeleton'),
    rd = '100%',
    ld = {
      row: f(0),
      title: Boolean,
      round: Boolean,
      avatar: Boolean,
      loading: d,
      animate: d,
      avatarSize: c,
      titleWidth: c,
      avatarShape: v('round'),
      rowWidth: { type: [Number, String, Array], default: rd },
    };
  const id = Re(
      t.defineComponent({
        name: nd,
        inheritAttrs: !1,
        props: ld,
        setup(e, { slots: o, attrs: n }) {
          const a = () => {
              if (e.avatar)
                return t.createVNode(
                  'div',
                  {
                    class: ad('avatar', e.avatarShape),
                    style: ce(e.avatarSize),
                  },
                  null
                );
            },
            r = () => {
              if (e.title)
                return t.createVNode(
                  'h3',
                  { class: ad('title'), style: { width: se(e.titleWidth) } },
                  null
                );
            },
            l = (t) => {
              const { rowWidth: o } = e;
              return o === rd && t === +e.row - 1
                ? '60%'
                : Array.isArray(o)
                ? o[t]
                : o;
            };
          return () => {
            var i;
            return e.loading
              ? t.createVNode(
                  'div',
                  t.mergeProps(
                    { class: ad({ animate: e.animate, round: e.round }) },
                    n
                  ),
                  [
                    a(),
                    t.createVNode('div', { class: ad('content') }, [
                      r(),
                      Array(+e.row)
                        .fill('')
                        .map((e, o) =>
                          t.createVNode(
                            'div',
                            { class: ad('row'), style: { width: se(l(o)) } },
                            null
                          )
                        ),
                    ]),
                  ]
                )
              : null == (i = o.default)
              ? void 0
              : i.call(o);
          };
        },
      })
    ),
    [sd, cd] = Oe('slider'),
    dd = {
      min: f(0),
      max: f(100),
      step: f(1),
      range: Boolean,
      reverse: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      vertical: Boolean,
      barHeight: c,
      buttonSize: c,
      activeColor: String,
      inactiveColor: String,
      modelValue: { type: [Number, Array], default: 0 },
    };
  const ud = Re(
      t.defineComponent({
        name: sd,
        props: dd,
        emits: ['change', 'drag-end', 'drag-start', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          let a, r, l;
          const i = t.ref(),
            s = t.ref(),
            c = At(),
            d = t.computed(() => Number(e.max) - Number(e.min)),
            u = t.computed(() => {
              const t = e.vertical ? 'width' : 'height';
              return { background: e.inactiveColor, [t]: se(e.barHeight) };
            }),
            p = (t) => e.range && Array.isArray(t),
            m = () => {
              const { modelValue: t, min: o } = e;
              return p(t)
                ? (100 * (t[1] - t[0])) / d.value + '%'
                : (100 * (t - Number(o))) / d.value + '%';
            },
            f = t.computed(() => {
              const t = {
                [e.vertical ? 'height' : 'width']: m(),
                background: e.activeColor,
              };
              s.value && (t.transition = 'none');
              return (
                (t[
                  e.vertical
                    ? e.reverse
                      ? 'bottom'
                      : 'top'
                    : e.reverse
                    ? 'right'
                    : 'left'
                ] = (() => {
                  const { modelValue: t, min: o } = e;
                  return p(t)
                    ? (100 * (t[0] - Number(o))) / d.value + '%'
                    : '0%';
                })()),
                t
              );
            }),
            v = (t) => {
              const o = +e.min,
                n = +e.max,
                a = +e.step;
              t = ge(t, o, n);
              return we(o, Math.round((t - o) / a) * a);
            },
            h = (e, t) => JSON.stringify(e) === JSON.stringify(t),
            g = (t, n) => {
              (t = p(t)
                ? ((t) => {
                    var o, n;
                    const a = null != (o = t[0]) ? o : Number(e.min),
                      r = null != (n = t[1]) ? n : Number(e.max);
                    return a > r ? [r, a] : [a, r];
                  })(t).map(v)
                : v(t)),
                h(t, e.modelValue) || o('update:modelValue', t),
                n && !h(t, l) && o('change', t);
            },
            b = (t) => {
              if ((t.stopPropagation(), e.disabled || e.readonly)) return;
              const { min: o, reverse: n, vertical: a, modelValue: r } = e,
                l = x(i),
                s = a ? l.height : l.width,
                c =
                  Number(o) +
                  ((a
                    ? n
                      ? l.bottom - t.clientY
                      : t.clientY - l.top
                    : n
                    ? l.right - t.clientX
                    : t.clientX - l.left) /
                    s) *
                    d.value;
              if (p(r)) {
                const [e, t] = r;
                g(c <= (e + t) / 2 ? [c, t] : [e, c], !0);
              } else g(c, !0);
            },
            y = (t) => {
              if (e.disabled || e.readonly) return;
              'start' === s.value && o('drag-start', t),
                ae(t, !0),
                c.move(t),
                (s.value = 'dragging');
              const n = x(i);
              let u =
                ((e.vertical ? c.deltaY.value : c.deltaX.value) /
                  (e.vertical ? n.height : n.width)) *
                d.value;
              if ((e.reverse && (u = -u), p(l))) {
                const t = e.reverse ? 1 - a : a;
                r[t] = l[t] + u;
              } else r = l + u;
              g(r);
            },
            w = (t) => {
              e.disabled ||
                e.readonly ||
                ('dragging' === s.value && (g(r, !0), o('drag-end', t)),
                (s.value = ''));
            },
            V = (t) => {
              if ('number' == typeof t) {
                return cd('button-wrapper', ['left', 'right'][t]);
              }
              return cd('button-wrapper', e.reverse ? 'left' : 'right');
            },
            N = (o, a) => {
              if ('number' == typeof a) {
                const e = n[0 === a ? 'left-button' : 'right-button'];
                if (e) return e({ value: o });
              }
              return n.button
                ? n.button({ value: o })
                : t.createVNode(
                    'div',
                    { class: cd('button'), style: ce(e.buttonSize) },
                    null
                  );
            },
            C = (o) => {
              const n = 'number' == typeof o ? e.modelValue[o] : e.modelValue;
              return t.createVNode(
                'div',
                {
                  role: 'slider',
                  class: V(o),
                  tabindex: e.disabled ? void 0 : 0,
                  'aria-valuemin': e.min,
                  'aria-valuenow': n,
                  'aria-valuemax': e.max,
                  'aria-disabled': e.disabled || void 0,
                  'aria-readonly': e.readonly || void 0,
                  'aria-orientation': e.vertical ? 'vertical' : 'horizontal',
                  onTouchstart: (t) => {
                    'number' == typeof o && (a = o),
                      ((t) => {
                        e.disabled ||
                          e.readonly ||
                          (c.start(t),
                          (r = e.modelValue),
                          (l = p(r) ? r.map(v) : v(r)),
                          (s.value = 'start'));
                      })(t);
                  },
                  onTouchmove: y,
                  onTouchend: w,
                  onTouchcancel: w,
                  onClick: ne,
                },
                [N(n, o)]
              );
            };
          return (
            g(e.modelValue),
            j(() => e.modelValue),
            () =>
              t.createVNode(
                'div',
                {
                  ref: i,
                  style: u.value,
                  class: cd({ vertical: e.vertical, disabled: e.disabled }),
                  onClick: b,
                },
                [
                  t.createVNode('div', { class: cd('bar'), style: f.value }, [
                    e.range ? [C(0), C(1)] : C(),
                  ]),
                ]
              )
          );
        },
      })
    ),
    [pd, md] = Oe('steps'),
    fd = {
      active: f(0),
      direction: v('horizontal'),
      activeIcon: v('checked'),
      iconPrefix: String,
      finishIcon: String,
      activeColor: String,
      inactiveIcon: String,
      inactiveColor: String,
    },
    vd = Symbol(pd);
  var hd = t.defineComponent({
    name: pd,
    props: fd,
    emits: ['click-step'],
    setup(e, { emit: o, slots: n }) {
      const { linkChildren: a } = C(vd);
      return (
        a({ props: e, onClickStep: (e) => o('click-step', e) }),
        () => {
          var o;
          return t.createVNode('div', { class: md([e.direction]) }, [
            t.createVNode('div', { class: md('items') }, [
              null == (o = n.default) ? void 0 : o.call(n),
            ]),
          ]);
        }
      );
    },
  });
  const [gd, bd] = Oe('step');
  const yd = Re(
      t.defineComponent({
        name: gd,
        setup(e, { slots: o }) {
          const { parent: n, index: a } = V(vd);
          if (!n)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error(
                '[Vant] <Step> must be a child component of <Steps>.'
              )
            );
          const r = n.props,
            l = () => {
              const e = +r.active;
              return a.value < e
                ? 'finish'
                : a.value === e
                ? 'process'
                : 'waiting';
            },
            i = () => 'process' === l(),
            s = t.computed(() => ({
              background: 'finish' === l() ? r.activeColor : r.inactiveColor,
            })),
            c = t.computed(() =>
              i()
                ? { color: r.activeColor }
                : 'waiting' === l()
                ? { color: r.inactiveColor }
                : void 0
            ),
            d = () => n.onClickStep(a.value),
            u = () => {
              const {
                iconPrefix: e,
                finishIcon: n,
                activeIcon: a,
                activeColor: c,
                inactiveIcon: d,
              } = r;
              return i()
                ? o['active-icon']
                  ? o['active-icon']()
                  : t.createVNode(
                      ut,
                      {
                        class: bd('icon', 'active'),
                        name: a,
                        color: c,
                        classPrefix: e,
                      },
                      null
                    )
                : 'finish' === l() && (n || o['finish-icon'])
                ? o['finish-icon']
                  ? o['finish-icon']()
                  : t.createVNode(
                      ut,
                      {
                        class: bd('icon', 'finish'),
                        name: n,
                        color: c,
                        classPrefix: e,
                      },
                      null
                    )
                : o['inactive-icon']
                ? o['inactive-icon']()
                : d
                ? t.createVNode(
                    ut,
                    { class: bd('icon'), name: d, classPrefix: e },
                    null
                  )
                : t.createVNode(
                    'i',
                    { class: bd('circle'), style: s.value },
                    null
                  );
            };
          return () => {
            var e;
            const n = l();
            return t.createVNode(
              'div',
              { class: [Ie, bd([r.direction, { [n]: n }])] },
              [
                t.createVNode(
                  'div',
                  {
                    class: bd('title', { active: i() }),
                    style: c.value,
                    onClick: d,
                  },
                  [null == (e = o.default) ? void 0 : e.call(o)]
                ),
                t.createVNode(
                  'div',
                  { class: bd('circle-container'), onClick: d },
                  [u()]
                ),
                t.createVNode(
                  'div',
                  { class: bd('line'), style: s.value },
                  null
                ),
              ]
            );
          };
        },
      })
    ),
    [wd, xd] = Oe('stepper'),
    Vd = (e, t) => String(e) === String(t),
    Nd = {
      min: f(1),
      max: f(1 / 0),
      name: f(''),
      step: f(1),
      theme: String,
      integer: Boolean,
      disabled: Boolean,
      showPlus: d,
      showMinus: d,
      showInput: d,
      longPress: d,
      allowEmpty: Boolean,
      modelValue: c,
      inputWidth: c,
      buttonSize: c,
      placeholder: String,
      disablePlus: Boolean,
      disableMinus: Boolean,
      disableInput: Boolean,
      beforeChange: Function,
      defaultValue: f(1),
      decimalLength: c,
    };
  const Cd = Re(
      t.defineComponent({
        name: wd,
        props: Nd,
        emits: [
          'plus',
          'blur',
          'minus',
          'focus',
          'change',
          'overlimit',
          'update:modelValue',
        ],
        setup(e, { emit: o }) {
          const n = (t) => {
            const { min: o, max: n, allowEmpty: a, decimalLength: r } = e;
            return (
              (a && '' === t) ||
                ((t = '' === (t = ye(String(t), !e.integer)) ? 0 : +t),
                (t = Number.isNaN(t) ? +o : t),
                (t = Math.max(Math.min(+n, t), +o)),
                W(r) && (t = t.toFixed(+r))),
              t
            );
          };
          let a;
          const r = t.ref(),
            l = t.ref(
              (() => {
                var t;
                const a = null != (t = e.modelValue) ? t : e.defaultValue,
                  r = n(a);
                return Vd(r, e.modelValue) || o('update:modelValue', r), r;
              })()
            ),
            i = t.computed(
              () => e.disabled || e.disableMinus || l.value <= +e.min
            ),
            s = t.computed(
              () => e.disabled || e.disablePlus || l.value >= +e.max
            ),
            c = t.computed(() => ({
              width: se(e.inputWidth),
              height: se(e.buttonSize),
            })),
            d = t.computed(() => ce(e.buttonSize)),
            u = (t) => {
              e.beforeChange
                ? He(e.beforeChange, {
                    args: [t],
                    done() {
                      l.value = t;
                    },
                  })
                : (l.value = t);
            },
            p = () => {
              if (('plus' === a && s.value) || ('minus' === a && i.value))
                return void o('overlimit', a);
              const t = 'minus' === a ? -e.step : +e.step,
                r = n(we(+l.value, t));
              u(r), o(a);
            },
            m = (t) => {
              const o = t.target,
                { value: n } = o,
                { decimalLength: a } = e;
              let r = ye(String(n), !e.integer);
              if (W(a) && r.includes('.')) {
                const e = r.split('.');
                r = `${e[0]}.${e[1].slice(0, +a)}`;
              }
              e.beforeChange
                ? (o.value = String(l.value))
                : Vd(n, r) || (o.value = r);
              const i = r === String(+r);
              u(i ? +r : r);
            },
            f = (t) => {
              var n;
              e.disableInput
                ? null == (n = r.value) || n.blur()
                : o('focus', t);
            },
            v = (e) => {
              const a = e.target,
                r = n(a.value);
              (a.value = String(r)),
                (l.value = r),
                t.nextTick(() => {
                  o('blur', e), oe();
                });
            };
          let h, g;
          const b = () => {
              g = setTimeout(() => {
                p(), b();
              }, 200);
            },
            y = (t) => {
              e.longPress && (clearTimeout(g), h && ae(t));
            },
            w = (t) => {
              e.disableInput && ae(t);
            },
            x = (t) => ({
              onClick: (e) => {
                ae(e), (a = t), p();
              },
              onTouchstart: () => {
                (a = t),
                  e.longPress &&
                    ((h = !1),
                    clearTimeout(g),
                    (g = setTimeout(() => {
                      (h = !0), p(), b();
                    }, 600)));
              },
              onTouchend: y,
              onTouchcancel: y,
            });
          return (
            t.watch(
              () => [e.max, e.min, e.integer, e.decimalLength],
              () => {
                const e = n(l.value);
                Vd(e, l.value) || (l.value = e);
              }
            ),
            t.watch(
              () => e.modelValue,
              (e) => {
                Vd(e, l.value) || (l.value = n(e));
              }
            ),
            t.watch(l, (t) => {
              o('update:modelValue', t), o('change', t, { name: e.name });
            }),
            j(() => e.modelValue),
            () =>
              t.createVNode('div', { role: 'group', class: xd([e.theme]) }, [
                t.withDirectives(
                  t.createVNode(
                    'button',
                    t.mergeProps(
                      {
                        type: 'button',
                        style: d.value,
                        class: [
                          xd('minus', { disabled: i.value }),
                          { [Le]: !i.value },
                        ],
                        'aria-disabled': i.value || void 0,
                      },
                      x('minus')
                    ),
                    null
                  ),
                  [[t.vShow, e.showMinus]]
                ),
                t.withDirectives(
                  t.createVNode(
                    'input',
                    {
                      ref: r,
                      type: e.integer ? 'tel' : 'text',
                      role: 'spinbutton',
                      class: xd('input'),
                      value: l.value,
                      style: c.value,
                      disabled: e.disabled,
                      readonly: e.disableInput,
                      inputmode: e.integer ? 'numeric' : 'decimal',
                      placeholder: e.placeholder,
                      'aria-valuemax': e.max,
                      'aria-valuemin': e.min,
                      'aria-valuenow': l.value,
                      onBlur: v,
                      onInput: m,
                      onFocus: f,
                      onMousedown: w,
                    },
                    null
                  ),
                  [[t.vShow, e.showInput]]
                ),
                t.withDirectives(
                  t.createVNode(
                    'button',
                    t.mergeProps(
                      {
                        type: 'button',
                        style: d.value,
                        class: [
                          xd('plus', { disabled: s.value }),
                          { [Le]: !s.value },
                        ],
                        'aria-disabled': s.value || void 0,
                      },
                      x('plus')
                    ),
                    null
                  ),
                  [[t.vShow, e.showPlus]]
                ),
              ])
          );
        },
      })
    ),
    kd = Re(hd),
    [Sd, Td, Bd] = Oe('submit-bar'),
    Dd = {
      tip: String,
      label: String,
      price: Number,
      tipIcon: String,
      loading: Boolean,
      currency: v('¥'),
      disabled: Boolean,
      textAlign: String,
      buttonText: String,
      buttonType: v('danger'),
      buttonColor: String,
      suffixLabel: String,
      placeholder: Boolean,
      decimalLength: f(2),
      safeAreaInsetBottom: d,
    };
  const Od = Re(
      t.defineComponent({
        name: Sd,
        props: Dd,
        emits: ['submit'],
        setup(e, { emit: o, slots: n }) {
          const a = t.ref(),
            r = We(a, Td),
            l = () => {
              const {
                price: o,
                label: n,
                currency: a,
                textAlign: r,
                suffixLabel: l,
                decimalLength: i,
              } = e;
              if ('number' == typeof o) {
                const e = (o / 100).toFixed(+i).split('.'),
                  s = i ? `.${e[1]}` : '';
                return t.createVNode(
                  'div',
                  { class: Td('text'), style: { textAlign: r } },
                  [
                    t.createVNode('span', null, [n || Bd('label')]),
                    t.createVNode('span', { class: Td('price') }, [
                      a,
                      t.createVNode('span', { class: Td('price-integer') }, [
                        e[0],
                      ]),
                      s,
                    ]),
                    l &&
                      t.createVNode('span', { class: Td('suffix-label') }, [l]),
                  ]
                );
              }
            },
            i = () => {
              var o;
              const { tip: a, tipIcon: r } = e;
              if (n.tip || a)
                return t.createVNode('div', { class: Td('tip') }, [
                  r &&
                    t.createVNode(ut, { class: Td('tip-icon'), name: r }, null),
                  a && t.createVNode('span', { class: Td('tip-text') }, [a]),
                  null == (o = n.tip) ? void 0 : o.call(n),
                ]);
            },
            s = () => o('submit'),
            c = () => {
              var o, r;
              return t.createVNode(
                'div',
                {
                  ref: a,
                  class: [
                    Td(),
                    { 'van-safe-area-bottom': e.safeAreaInsetBottom },
                  ],
                },
                [
                  null == (o = n.top) ? void 0 : o.call(n),
                  i(),
                  t.createVNode('div', { class: Td('bar') }, [
                    null == (r = n.default) ? void 0 : r.call(n),
                    l(),
                    n.button
                      ? n.button()
                      : t.createVNode(
                          xt,
                          {
                            round: !0,
                            type: e.buttonType,
                            text: e.buttonText,
                            class: Td('button', e.buttonType),
                            color: e.buttonColor,
                            loading: e.loading,
                            disabled: e.disabled,
                            onClick: s,
                          },
                          null
                        ),
                  ]),
                ]
              );
            };
          return () => (e.placeholder ? r(c) : c());
        },
      })
    ),
    [Id, Ad] = Oe('swipe-cell'),
    Pd = {
      name: f(''),
      disabled: Boolean,
      leftWidth: c,
      rightWidth: c,
      beforeClose: Function,
      stopPropagation: Boolean,
    };
  const zd = Re(
      t.defineComponent({
        name: Id,
        props: Pd,
        emits: ['open', 'close', 'click'],
        setup(e, { emit: o, slots: n }) {
          let a, r, l;
          const i = t.ref(),
            s = t.ref(),
            c = t.ref(),
            d = t.reactive({ offset: 0, dragging: !1 }),
            u = At(),
            p = (e) => (e.value ? x(e).width : 0),
            m = t.computed(() => (W(e.leftWidth) ? +e.leftWidth : p(s))),
            f = t.computed(() => (W(e.rightWidth) ? +e.rightWidth : p(c))),
            v = (t) => {
              (d.offset = 'left' === t ? m.value : -f.value),
                a || ((a = !0), o('open', { name: e.name, position: t }));
            },
            h = (t) => {
              (d.offset = 0),
                a && ((a = !1), o('close', { name: e.name, position: t }));
            },
            g = (t) => {
              e.disabled || ((l = d.offset), u.start(t));
            },
            b = (t) => {
              if (e.disabled) return;
              const { deltaX: o } = u;
              if ((u.move(t), u.isHorizontal())) {
                (r = !0), (d.dragging = !0);
                (!a || o.value * l < 0) && ae(t, e.stopPropagation),
                  (d.offset = ge(o.value + l, -f.value, m.value));
              }
            },
            y = () => {
              d.dragging &&
                ((d.dragging = !1),
                ((e) => {
                  const t = Math.abs(d.offset),
                    o = a ? 0.85 : 0.15,
                    n = 'left' === e ? m.value : f.value;
                  n && t > n * o ? v(e) : h(e);
                })(d.offset > 0 ? 'left' : 'right'),
                setTimeout(() => {
                  r = !1;
                }, 0));
            },
            w = (t = 'outside') => {
              o('click', t),
                a &&
                  !r &&
                  He(e.beforeClose, {
                    args: [{ name: e.name, position: t }],
                    done: () => h(t),
                  });
            },
            V = (e, t) => (o) => {
              t && o.stopPropagation(), w(e);
            },
            N = (e, o) => {
              const a = n[e];
              if (a)
                return t.createVNode(
                  'div',
                  { ref: o, class: Ad(e), onClick: V(e, !0) },
                  [a()]
                );
            };
          return (
            _e({ open: v, close: h }),
            z(i, () => w('outside'), { eventName: 'touchstart' }),
            () => {
              var e;
              const o = {
                transform: `translate3d(${d.offset}px, 0, 0)`,
                transitionDuration: d.dragging ? '0s' : '.6s',
              };
              return t.createVNode(
                'div',
                {
                  ref: i,
                  class: Ad(),
                  onClick: V('cell', r),
                  onTouchstart: g,
                  onTouchmove: b,
                  onTouchend: y,
                  onTouchcancel: y,
                },
                [
                  t.createVNode('div', { class: Ad('wrapper'), style: o }, [
                    N('left', s),
                    null == (e = n.default) ? void 0 : e.call(n),
                    N('right', c),
                  ]),
                ]
              );
            }
          );
        },
      })
    ),
    [Ed, $d] = Oe('tabbar'),
    Md = {
      route: Boolean,
      fixed: d,
      border: d,
      zIndex: c,
      placeholder: Boolean,
      activeColor: String,
      beforeChange: Function,
      inactiveColor: String,
      modelValue: f(0),
      safeAreaInsetBottom: { type: Boolean, default: null },
    },
    Ld = Symbol(Ed);
  const Fd = Re(
      t.defineComponent({
        name: Ed,
        props: Md,
        emits: ['change', 'update:modelValue'],
        setup(e, { emit: o, slots: n }) {
          const a = t.ref(),
            { linkChildren: r } = C(Ld),
            l = We(a, $d),
            i = () => {
              var t;
              return null != (t = e.safeAreaInsetBottom) ? t : e.fixed;
            },
            s = () => {
              var o;
              const { fixed: r, zIndex: l, border: s } = e;
              return t.createVNode(
                'div',
                {
                  ref: a,
                  role: 'tablist',
                  style: de(l),
                  class: [
                    $d({ fixed: r }),
                    { [$e]: s, 'van-safe-area-bottom': i() },
                  ],
                },
                [null == (o = n.default) ? void 0 : o.call(n)]
              );
            };
          return (
            r({
              props: e,
              setActive: (t, n) => {
                He(e.beforeChange, {
                  args: [t],
                  done() {
                    o('update:modelValue', t), o('change', t), n();
                  },
                });
              },
            }),
            () => (e.fixed && e.placeholder ? l(s) : s())
          );
        },
      })
    ),
    [Hd, Rd] = Oe('tabbar-item'),
    jd = n({}, Ze, {
      dot: Boolean,
      icon: String,
      name: c,
      badge: c,
      badgeProps: Object,
      iconPrefix: String,
    });
  const Wd = Re(
      t.defineComponent({
        name: Hd,
        props: jd,
        emits: ['click'],
        setup(e, { emit: o, slots: n }) {
          const a = Je(),
            r = t.getCurrentInstance().proxy,
            { parent: l, index: i } = V(Ld);
          if (!l)
            return void (
              'production' !== process.env.NODE_ENV &&
              console.error(
                '[Vant] <TabbarItem> must be a child component of <Tabbar>.'
              )
            );
          const s = t.computed(() => {
              var t;
              const { route: o, modelValue: n } = l.props;
              if (o && '$route' in r) {
                const { $route: t } = r,
                  { to: o } = e,
                  n = U(o) ? o : { path: o };
                return !!t.matched.find((e) => {
                  const t = 'path' in n && n.path === e.path,
                    o = 'name' in n && n.name === e.name;
                  return t || o;
                });
              }
              return (null != (t = e.name) ? t : i.value) === n;
            }),
            c = (t) => {
              var n;
              s.value || l.setActive(null != (n = e.name) ? n : i.value, a),
                o('click', t);
            },
            d = () =>
              n.icon
                ? n.icon({ active: s.value })
                : e.icon
                ? t.createVNode(
                    ut,
                    { name: e.icon, classPrefix: e.iconPrefix },
                    null
                  )
                : void 0;
          return () => {
            var o;
            const { dot: a, badge: r } = e,
              { activeColor: i, inactiveColor: u } = l.props,
              p = s.value ? i : u;
            return t.createVNode(
              'div',
              {
                role: 'tab',
                class: Rd({ active: s.value }),
                style: { color: p },
                tabindex: 0,
                'aria-selected': s.value,
                onClick: c,
              },
              [
                t.createVNode(
                  ot,
                  t.mergeProps(
                    { dot: a, class: Rd('icon'), content: r },
                    e.badgeProps
                  ),
                  { default: d }
                ),
                t.createVNode('div', { class: Rd('text') }, [
                  null == (o = n.default)
                    ? void 0
                    : o.call(n, { active: s.value }),
                ]),
              ]
            );
          };
        },
      })
    ),
    [qd, Ud] = Oe('tree-select'),
    Yd = {
      max: f(1 / 0),
      items: p(),
      height: f(300),
      selectedIcon: v('success'),
      mainActiveIndex: f(0),
      activeId: { type: [Number, String, Array], default: 0 },
    };
  const Xd = Re(
      t.defineComponent({
        name: qd,
        props: Yd,
        emits: [
          'click-nav',
          'click-item',
          'update:activeId',
          'update:mainActiveIndex',
        ],
        setup(e, { emit: o, slots: n }) {
          const a = (t) =>
              Array.isArray(e.activeId)
                ? e.activeId.includes(t)
                : e.activeId === t,
            r = (n) =>
              t.createVNode(
                'div',
                {
                  key: n.id,
                  class: [
                    'van-ellipsis',
                    Ud('item', { active: a(n.id), disabled: n.disabled }),
                  ],
                  onClick: () => {
                    if (n.disabled) return;
                    let t;
                    if (Array.isArray(e.activeId)) {
                      t = e.activeId.slice();
                      const o = t.indexOf(n.id);
                      -1 !== o
                        ? t.splice(o, 1)
                        : t.length < e.max && t.push(n.id);
                    } else t = n.id;
                    o('update:activeId', t), o('click-item', n);
                  },
                },
                [
                  n.text,
                  a(n.id) &&
                    t.createVNode(
                      ut,
                      { name: e.selectedIcon, class: Ud('selected') },
                      null
                    ),
                ]
              ),
            l = (e) => {
              o('update:mainActiveIndex', e);
            },
            i = (e) => o('click-nav', e),
            s = () => {
              const o = e.items.map((e) =>
                t.createVNode(
                  od,
                  {
                    dot: e.dot,
                    title: e.text,
                    badge: e.badge,
                    class: [Ud('nav-item'), e.className],
                    disabled: e.disabled,
                    onClick: i,
                  },
                  null
                )
              );
              return t.createVNode(
                Jc,
                {
                  class: Ud('nav'),
                  modelValue: e.mainActiveIndex,
                  onChange: l,
                },
                { default: () => [o] }
              );
            },
            c = () => {
              if (n.content) return n.content();
              const t = e.items[+e.mainActiveIndex] || {};
              return t.children ? t.children.map(r) : void 0;
            };
          return () =>
            t.createVNode(
              'div',
              { class: Ud(), style: { height: se(e.height) } },
              [s(), t.createVNode('div', { class: Ud('content') }, [c()])]
            );
        },
      })
    ),
    [Gd, _d, Zd] = Oe('uploader');
  function Kd(e, t) {
    return new Promise((o) => {
      if ('file' === t) return void o();
      const n = new FileReader();
      (n.onload = (e) => {
        o(e.target.result);
      }),
        'dataUrl' === t ? n.readAsDataURL(e) : 'text' === t && n.readAsText(e);
    });
  }
  function Jd(e, t) {
    return i(e).some((e) => !!e.file && (q(t) ? t(e.file) : e.file.size > t));
  }
  const Qd = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  function eu(e) {
    return (
      !!e.isImage ||
      (e.file && e.file.type
        ? 0 === e.file.type.indexOf('image')
        : e.url
        ? ((t = e.url), Qd.test(t))
        : 'string' == typeof e.content && 0 === e.content.indexOf('data:image'))
    );
    var t;
  }
  var tu = t.defineComponent({
    props: {
      name: c,
      item: u(Object),
      index: Number,
      imageFit: String,
      lazyLoad: Boolean,
      deletable: Boolean,
      previewSize: [Number, String, Array],
      beforeDelete: Function,
    },
    emits: ['delete', 'preview'],
    setup(e, { emit: o, slots: a }) {
      const r = () => {
          const { status: o, message: n } = e.item;
          if ('uploading' === o || 'failed' === o) {
            const e =
                'failed' === o
                  ? t.createVNode(
                      ut,
                      { name: 'close', class: _d('mask-icon') },
                      null
                    )
                  : t.createVNode(gt, { class: _d('loading') }, null),
              a = W(n) && '' !== n;
            return t.createVNode('div', { class: _d('mask') }, [
              e,
              a && t.createVNode('div', { class: _d('mask-message') }, [n]),
            ]);
          }
        },
        l = (t) => {
          const { name: n, item: a, index: r, beforeDelete: l } = e;
          t.stopPropagation(),
            He(l, {
              args: [a, { name: n, index: r }],
              done: () => o('delete'),
            });
        },
        i = () => o('preview'),
        s = () => {
          if (e.deletable && 'uploading' !== e.item.status) {
            const e = a['preview-delete'];
            return t.createVNode(
              'div',
              {
                role: 'button',
                class: _d('preview-delete', { shadow: !e }),
                tabindex: 0,
                'aria-label': Zd('delete'),
                onClick: l,
              },
              [
                e
                  ? e()
                  : t.createVNode(
                      ut,
                      { name: 'cross', class: _d('preview-delete-icon') },
                      null
                    ),
              ]
            );
          }
        },
        c = () => {
          if (a['preview-cover']) {
            const { index: o, item: r } = e;
            return t.createVNode('div', { class: _d('preview-cover') }, [
              a['preview-cover'](n({ index: o }, r)),
            ]);
          }
        },
        d = () => {
          const { item: o, lazyLoad: n, imageFit: a, previewSize: r } = e;
          return eu(o)
            ? t.createVNode(
                fa,
                {
                  fit: a,
                  src: o.content || o.url,
                  class: _d('preview-image'),
                  width: Array.isArray(r) ? r[0] : r,
                  height: Array.isArray(r) ? r[1] : r,
                  lazyLoad: n,
                  onClick: i,
                },
                { default: c }
              )
            : t.createVNode(
                'div',
                { class: _d('file'), style: ce(e.previewSize) },
                [
                  t.createVNode(
                    ut,
                    { class: _d('file-icon'), name: 'description' },
                    null
                  ),
                  t.createVNode(
                    'div',
                    { class: [_d('file-name'), 'van-ellipsis'] },
                    [o.file ? o.file.name : o.url]
                  ),
                  c(),
                ]
              );
        };
      return () =>
        t.createVNode('div', { class: _d('preview') }, [d(), r(), s()]);
    },
  });
  const ou = {
    name: f(''),
    accept: v('image/*'),
    capture: String,
    multiple: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    lazyLoad: Boolean,
    maxCount: f(1 / 0),
    imageFit: v('cover'),
    resultType: v('dataUrl'),
    uploadIcon: v('photograph'),
    uploadText: String,
    deletable: d,
    afterRead: Function,
    showUpload: d,
    modelValue: p(),
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String, Array],
    previewImage: d,
    previewOptions: Object,
    previewFullImage: d,
    maxSize: { type: [Number, String, Function], default: 1 / 0 },
  };
  const nu = Re(
      t.defineComponent({
        name: Gd,
        props: ou,
        emits: [
          'delete',
          'oversize',
          'click-upload',
          'close-preview',
          'click-preview',
          'update:modelValue',
        ],
        setup(e, { emit: o, slots: a }) {
          const r = t.ref(),
            s = [],
            c = (t = e.modelValue.length) => ({ name: e.name, index: t }),
            d = () => {
              r.value && (r.value.value = '');
            },
            u = (n) => {
              if ((d(), Jd(n, e.maxSize))) {
                if (!Array.isArray(n)) return void o('oversize', n, c());
                {
                  const t = (function (e, t) {
                    const o = [],
                      n = [];
                    return (
                      e.forEach((e) => {
                        Jd(e, t) ? n.push(e) : o.push(e);
                      }),
                      { valid: o, invalid: n }
                    );
                  })(n, e.maxSize);
                  if (((n = t.valid), o('oversize', t.invalid, c()), !n.length))
                    return;
                }
              }
              (n = t.reactive(n)),
                o('update:modelValue', [...e.modelValue, ...i(n)]),
                e.afterRead && e.afterRead(n, c());
            },
            p = (t) => {
              const { maxCount: o, modelValue: n, resultType: a } = e;
              if (Array.isArray(t)) {
                const e = +o - n.length;
                t.length > e && (t = t.slice(0, e)),
                  Promise.all(t.map((e) => Kd(e, a))).then((e) => {
                    const o = t.map((t, o) => {
                      const n = { file: t, status: '', message: '' };
                      return e[o] && (n.content = e[o]), n;
                    });
                    u(o);
                  });
              } else
                Kd(t, a).then((e) => {
                  const o = { file: t, status: '', message: '' };
                  e && (o.content = e), u(o);
                });
            },
            m = (t) => {
              const { files: o } = t.target;
              if (e.disabled || !o || !o.length) return;
              const n = 1 === o.length ? o[0] : [].slice.call(o);
              if (e.beforeRead) {
                const t = e.beforeRead(n, c());
                if (!t) return void d();
                if (Y(t))
                  return void t
                    .then((e) => {
                      p(e || n);
                    })
                    .catch(d);
              }
              p(n);
            };
          let f;
          const v = () => o('close-preview'),
            h = (r, i) => {
              const d = [
                  'imageFit',
                  'deletable',
                  'previewSize',
                  'beforeDelete',
                ],
                u = n(l(e, d), l(r, d, !0));
              return t.createVNode(
                tu,
                t.mergeProps(
                  {
                    item: r,
                    index: i,
                    onClick: () => o('click-preview', r, c(i)),
                    onDelete: () =>
                      ((t, n) => {
                        const a = e.modelValue.slice(0);
                        a.splice(n, 1),
                          o('update:modelValue', a),
                          o('delete', t, c(n));
                      })(r, i),
                    onPreview: () =>
                      ((t) => {
                        if (e.previewFullImage) {
                          const o = e.modelValue.filter(eu),
                            a = o
                              .map(
                                (e) => (
                                  e.file &&
                                    !e.url &&
                                    'failed' !== e.status &&
                                    ((e.url = URL.createObjectURL(e.file)),
                                    s.push(e.url)),
                                  e.url
                                )
                              )
                              .filter(Boolean);
                          f = Ai(
                            n(
                              {
                                images: a,
                                startPosition: o.indexOf(t),
                                onClose: v,
                              },
                              e.previewOptions
                            )
                          );
                        }
                      })(r),
                  },
                  l(e, ['name', 'lazyLoad']),
                  u
                ),
                l(a, ['preview-cover', 'preview-delete'])
              );
            },
            g = () => {
              if (e.previewImage) return e.modelValue.map(h);
            },
            b = (e) => o('click-upload', e),
            y = () => {
              if (e.modelValue.length >= e.maxCount || !e.showUpload) return;
              const o = e.readonly
                ? null
                : t.createVNode(
                    'input',
                    {
                      ref: r,
                      type: 'file',
                      class: _d('input'),
                      accept: e.accept,
                      capture: e.capture,
                      multiple: e.multiple,
                      disabled: e.disabled,
                      onChange: m,
                    },
                    null
                  );
              return a.default
                ? t.createVNode(
                    'div',
                    { class: _d('input-wrapper'), onClick: b },
                    [a.default(), o]
                  )
                : t.createVNode(
                    'div',
                    {
                      class: _d('upload', { readonly: e.readonly }),
                      style: ce(e.previewSize),
                      onClick: b,
                    },
                    [
                      t.createVNode(
                        ut,
                        { name: e.uploadIcon, class: _d('upload-icon') },
                        null
                      ),
                      e.uploadText &&
                        t.createVNode('span', { class: _d('upload-text') }, [
                          e.uploadText,
                        ]),
                      o,
                    ]
                  );
            };
          return (
            t.onBeforeUnmount(() => {
              s.forEach((e) => URL.revokeObjectURL(e));
            }),
            _e({
              chooseFile: () => {
                r.value && !e.disabled && r.value.click();
              },
              closeImagePreview: () => {
                f && f.close();
              },
            }),
            j(() => e.modelValue),
            () =>
              t.createVNode('div', { class: _d() }, [
                t.createVNode(
                  'div',
                  { class: _d('wrapper', { disabled: e.disabled }) },
                  [g(), y()]
                ),
              ])
          );
        },
      })
    ),
    au =
      h &&
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype,
    ru = 'event',
    lu = 'observer';
  function iu(e, t) {
    if (!e.length) return;
    const o = e.indexOf(t);
    return o > -1 ? e.splice(o, 1) : void 0;
  }
  function su(e, t) {
    if ('IMG' !== e.tagName || !e.getAttribute('data-srcset')) return;
    let o = e.getAttribute('data-srcset');
    const n = e.parentNode.offsetWidth * t;
    let a, r, l;
    o = o.trim().split(',');
    const i = o.map(
      (e) => (
        (e = e.trim()),
        (a = e.lastIndexOf(' ')),
        -1 === a
          ? ((r = e), (l = 999998))
          : ((r = e.substr(0, a)),
            (l = parseInt(e.substr(a + 1, e.length - a - 2), 10))),
        [l, r]
      )
    );
    i.sort((e, t) => {
      if (e[0] < t[0]) return 1;
      if (e[0] > t[0]) return -1;
      if (e[0] === t[0]) {
        if (-1 !== t[1].indexOf('.webp', t[1].length - 5)) return 1;
        if (-1 !== e[1].indexOf('.webp', e[1].length - 5)) return -1;
      }
      return 0;
    });
    let s,
      c = '';
    for (let d = 0; d < i.length; d++) {
      (s = i[d]), (c = s[1]);
      const e = i[d + 1];
      if (e && e[0] < n) {
        c = s[1];
        break;
      }
      if (!e) {
        c = s[1];
        break;
      }
    }
    return c;
  }
  const cu = (e = 1) => (h && window.devicePixelRatio) || e;
  function du() {
    if (!h) return !1;
    let e = !0;
    try {
      const t = document.createElement('canvas');
      t.getContext &&
        t.getContext('2d') &&
        (e = 0 === t.toDataURL('image/webp').indexOf('data:image/webp'));
    } catch (t) {
      e = !1;
    }
    return e;
  }
  function uu(e, t, o) {
    e.addEventListener(t, o, { capture: !1, passive: !0 });
  }
  function pu(e, t, o) {
    e.removeEventListener(t, o, !1);
  }
  const mu = (e, t, o) => {
    const n = new Image();
    if (!e || !e.src) return o(new Error('image src is required'));
    (n.src = e.src),
      e.cors && (n.crossOrigin = e.cors),
      (n.onload = () =>
        t({
          naturalHeight: n.naturalHeight,
          naturalWidth: n.naturalWidth,
          src: n.src,
        })),
      (n.onerror = (e) => o(e));
  };
  class fu {
    constructor({ max: e }) {
      (this.options = { max: e || 100 }), (this.caches = []);
    }
    has(e) {
      return this.caches.indexOf(e) > -1;
    }
    add(e) {
      this.has(e) ||
        (this.caches.push(e),
        this.caches.length > this.options.max && this.free());
    }
    free() {
      this.caches.shift();
    }
  }
  class vu {
    constructor({
      el: e,
      src: t,
      error: o,
      loading: n,
      bindType: a,
      $parent: r,
      options: l,
      cors: i,
      elRenderer: s,
      imageCache: c,
    }) {
      (this.el = e),
        (this.src = t),
        (this.error = o),
        (this.loading = n),
        (this.bindType = a),
        (this.attempt = 0),
        (this.cors = i),
        (this.naturalHeight = 0),
        (this.naturalWidth = 0),
        (this.options = l),
        (this.$parent = r),
        (this.elRenderer = s),
        (this.imageCache = c),
        (this.performanceData = { loadStart: 0, loadEnd: 0 }),
        this.filter(),
        this.initState(),
        this.render('loading', !1);
    }
    initState() {
      'dataset' in this.el
        ? (this.el.dataset.src = this.src)
        : this.el.setAttribute('data-src', this.src),
        (this.state = { loading: !1, error: !1, loaded: !1, rendered: !1 });
    }
    record(e) {
      this.performanceData[e] = Date.now();
    }
    update({ src: e, loading: t, error: o }) {
      const n = this.src;
      (this.src = e),
        (this.loading = t),
        (this.error = o),
        this.filter(),
        n !== this.src && ((this.attempt = 0), this.initState());
    }
    checkInView() {
      const e = x(this.el);
      return (
        e.top < window.innerHeight * this.options.preLoad &&
        e.bottom > this.options.preLoadTop &&
        e.left < window.innerWidth * this.options.preLoad &&
        e.right > 0
      );
    }
    filter() {
      Object.keys(this.options.filter).forEach((e) => {
        this.options.filter[e](this, this.options);
      });
    }
    renderLoading(e) {
      (this.state.loading = !0),
        mu(
          { src: this.loading, cors: this.cors },
          () => {
            this.render('loading', !1), (this.state.loading = !1), e();
          },
          () => {
            e(),
              (this.state.loading = !1),
              'production' === process.env.NODE_ENV ||
                this.options.silent ||
                console.warn(
                  `[@vant/lazyload] load failed with loading image(${this.loading})`
                );
          }
        );
    }
    load(e = o) {
      return this.attempt > this.options.attempt - 1 && this.state.error
        ? ('production' === process.env.NODE_ENV ||
            this.options.silent ||
            console.log(
              `[@vant/lazyload] ${this.src} tried too more than ${this.options.attempt} times`
            ),
          void e())
        : this.state.rendered && this.state.loaded
        ? void 0
        : this.imageCache.has(this.src)
        ? ((this.state.loaded = !0),
          this.render('loaded', !0),
          (this.state.rendered = !0),
          e())
        : void this.renderLoading(() => {
            var t, o;
            this.attempt++,
              null == (o = (t = this.options.adapter).beforeLoad) ||
                o.call(t, this, this.options),
              this.record('loadStart'),
              mu(
                { src: this.src, cors: this.cors },
                (t) => {
                  (this.naturalHeight = t.naturalHeight),
                    (this.naturalWidth = t.naturalWidth),
                    (this.state.loaded = !0),
                    (this.state.error = !1),
                    this.record('loadEnd'),
                    this.render('loaded', !1),
                    (this.state.rendered = !0),
                    this.imageCache.add(this.src),
                    e();
                },
                (e) => {
                  !this.options.silent && console.error(e),
                    (this.state.error = !0),
                    (this.state.loaded = !1),
                    this.render('error', !1);
                }
              );
          });
    }
    render(e, t) {
      this.elRenderer(this, e, t);
    }
    performance() {
      let e = 'loading',
        t = 0;
      return (
        this.state.loaded &&
          ((e = 'loaded'),
          (t =
            (this.performanceData.loadEnd - this.performanceData.loadStart) /
            1e3)),
        this.state.error && (e = 'error'),
        { src: this.src, state: e, time: t }
      );
    }
    $destroy() {
      (this.el = null),
        (this.src = null),
        (this.error = null),
        (this.loading = null),
        (this.bindType = null),
        (this.attempt = 0);
    }
  }
  const hu =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    gu = [
      'scroll',
      'wheel',
      'mousewheel',
      'resize',
      'animationend',
      'transitionend',
      'touchmove',
    ],
    bu = { rootMargin: '0px', threshold: 0 };
  function yu() {
    return class {
      constructor({
        preLoad: e,
        error: t,
        throttleWait: o,
        preLoadTop: n,
        dispatchEvent: a,
        loading: r,
        attempt: l,
        silent: i = !0,
        scale: s,
        listenEvents: c,
        filter: d,
        adapter: u,
        observer: p,
        observerOptions: m,
      }) {
        (this.mode = ru),
          (this.listeners = []),
          (this.targetIndex = 0),
          (this.targets = []),
          (this.options = {
            silent: i,
            dispatchEvent: !!a,
            throttleWait: o || 200,
            preLoad: e || 1.3,
            preLoadTop: n || 0,
            error: t || hu,
            loading: r || hu,
            attempt: l || 3,
            scale: s || cu(s),
            ListenEvents: c || gu,
            supportWebp: du(),
            filter: d || {},
            adapter: u || {},
            observer: !!p,
            observerOptions: m || bu,
          }),
          this.initEvent(),
          (this.imageCache = new fu({ max: 200 })),
          (this.lazyLoadHandler = (function (e, t) {
            let o = null,
              n = 0;
            return function (...a) {
              if (o) return;
              const r = () => {
                (n = Date.now()), (o = !1), e.apply(this, a);
              };
              Date.now() - n >= t ? r() : (o = setTimeout(r, t));
            };
          })(this.lazyLoadHandler.bind(this), this.options.throttleWait)),
          this.setMode(this.options.observer ? lu : ru);
      }
      config(e = {}) {
        Object.assign(this.options, e);
      }
      performance() {
        return this.listeners.map((e) => e.performance());
      }
      addLazyBox(e) {
        this.listeners.push(e),
          h &&
            (this.addListenerTarget(window),
            this.observer && this.observer.observe(e.el),
            e.$el &&
              e.$el.parentNode &&
              this.addListenerTarget(e.$el.parentNode));
      }
      add(e, o, n) {
        if (this.listeners.some((t) => t.el === e))
          return this.update(e, o), t.nextTick(this.lazyLoadHandler);
        const a = this.valueFormatter(o.value);
        let { src: r } = a;
        t.nextTick(() => {
          (r = su(e, this.options.scale) || r),
            this.observer && this.observer.observe(e);
          const l = Object.keys(o.modifiers)[0];
          let i;
          l &&
            ((i = n.context.$refs[l]),
            (i = i ? i.$el || i : document.getElementById(l))),
            i || (i = F(e));
          const s = new vu({
            bindType: o.arg,
            $parent: i,
            el: e,
            src: r,
            loading: a.loading,
            error: a.error,
            cors: a.cors,
            elRenderer: this.elRenderer.bind(this),
            options: this.options,
            imageCache: this.imageCache,
          });
          this.listeners.push(s),
            h && (this.addListenerTarget(window), this.addListenerTarget(i)),
            this.lazyLoadHandler(),
            t.nextTick(() => this.lazyLoadHandler());
        });
      }
      update(e, o, n) {
        const a = this.valueFormatter(o.value);
        let { src: r } = a;
        r = su(e, this.options.scale) || r;
        const l = this.listeners.find((t) => t.el === e);
        l
          ? l.update({ src: r, error: a.error, loading: a.loading })
          : this.add(e, o, n),
          this.observer &&
            (this.observer.unobserve(e), this.observer.observe(e)),
          this.lazyLoadHandler(),
          t.nextTick(() => this.lazyLoadHandler());
      }
      remove(e) {
        if (!e) return;
        this.observer && this.observer.unobserve(e);
        const t = this.listeners.find((t) => t.el === e);
        t &&
          (this.removeListenerTarget(t.$parent),
          this.removeListenerTarget(window),
          iu(this.listeners, t),
          t.$destroy());
      }
      removeComponent(e) {
        e &&
          (iu(this.listeners, e),
          this.observer && this.observer.unobserve(e.el),
          e.$parent &&
            e.$el.parentNode &&
            this.removeListenerTarget(e.$el.parentNode),
          this.removeListenerTarget(window));
      }
      setMode(e) {
        au || e !== lu || (e = ru),
          (this.mode = e),
          e === ru
            ? (this.observer &&
                (this.listeners.forEach((e) => {
                  this.observer.unobserve(e.el);
                }),
                (this.observer = null)),
              this.targets.forEach((e) => {
                this.initListen(e.el, !0);
              }))
            : (this.targets.forEach((e) => {
                this.initListen(e.el, !1);
              }),
              this.initIntersectionObserver());
      }
      addListenerTarget(e) {
        if (!e) return;
        let t = this.targets.find((t) => t.el === e);
        return (
          t
            ? t.childrenCount++
            : ((t = {
                el: e,
                id: ++this.targetIndex,
                childrenCount: 1,
                listened: !0,
              }),
              this.mode === ru && this.initListen(t.el, !0),
              this.targets.push(t)),
          this.targetIndex
        );
      }
      removeListenerTarget(e) {
        this.targets.forEach((t, o) => {
          t.el === e &&
            (t.childrenCount--,
            t.childrenCount ||
              (this.initListen(t.el, !1),
              this.targets.splice(o, 1),
              (t = null)));
        });
      }
      initListen(e, t) {
        this.options.ListenEvents.forEach((o) =>
          (t ? uu : pu)(e, o, this.lazyLoadHandler)
        );
      }
      initEvent() {
        (this.Event = { listeners: { loading: [], loaded: [], error: [] } }),
          (this.$on = (e, t) => {
            this.Event.listeners[e] || (this.Event.listeners[e] = []),
              this.Event.listeners[e].push(t);
          }),
          (this.$once = (e, t) => {
            const o = (...n) => {
              this.$off(e, o), t.apply(this, n);
            };
            this.$on(e, o);
          }),
          (this.$off = (e, t) => {
            if (t) iu(this.Event.listeners[e], t);
            else {
              if (!this.Event.listeners[e]) return;
              this.Event.listeners[e].length = 0;
            }
          }),
          (this.$emit = (e, t, o) => {
            this.Event.listeners[e] &&
              this.Event.listeners[e].forEach((e) => e(t, o));
          });
      }
      lazyLoadHandler() {
        const e = [];
        this.listeners.forEach((t) => {
          (t.el && t.el.parentNode) || e.push(t);
          t.checkInView() && t.load();
        }),
          e.forEach((e) => {
            iu(this.listeners, e), e.$destroy();
          });
      }
      initIntersectionObserver() {
        au &&
          ((this.observer = new IntersectionObserver(
            this.observerHandler.bind(this),
            this.options.observerOptions
          )),
          this.listeners.length &&
            this.listeners.forEach((e) => {
              this.observer.observe(e.el);
            }));
      }
      observerHandler(e) {
        e.forEach((e) => {
          e.isIntersecting &&
            this.listeners.forEach((t) => {
              if (t.el === e.target) {
                if (t.state.loaded) return this.observer.unobserve(t.el);
                t.load();
              }
            });
        });
      }
      elRenderer(e, t, o) {
        if (!e.el) return;
        const { el: n, bindType: a } = e;
        let r;
        switch (t) {
          case 'loading':
            r = e.loading;
            break;
          case 'error':
            r = e.error;
            break;
          default:
            ({ src: r } = e);
        }
        if (
          (a
            ? (n.style[a] = 'url("' + r + '")')
            : n.getAttribute('src') !== r && n.setAttribute('src', r),
          n.setAttribute('lazy', t),
          this.$emit(t, e, o),
          this.options.adapter[t] && this.options.adapter[t](e, this.options),
          this.options.dispatchEvent)
        ) {
          const o = new CustomEvent(t, { detail: e });
          n.dispatchEvent(o);
        }
      }
      valueFormatter(e) {
        let t = e,
          { loading: o, error: n } = this.options;
        return (
          U(e) &&
            ('production' === process.env.NODE_ENV ||
              e.src ||
              this.options.silent ||
              console.error('[@vant/lazyload] miss src with ' + e),
            ({ src: t } = e),
            (o = e.loading || this.options.loading),
            (n = e.error || this.options.error)),
          { src: t, loading: o, error: n }
        );
      }
    };
  }
  var wu = (e) => ({
    props: { tag: { type: String, default: 'div' } },
    emits: ['show'],
    render() {
      return t.h(
        this.tag,
        this.show && this.$slots.default ? this.$slots.default() : null
      );
    },
    data: () => ({ el: null, state: { loaded: !1 }, show: !1 }),
    mounted() {
      (this.el = this.$el), e.addLazyBox(this), e.lazyLoadHandler();
    },
    beforeUnmount() {
      e.removeComponent(this);
    },
    methods: {
      checkInView() {
        const t = x(this.$el);
        return (
          h &&
          t.top < window.innerHeight * e.options.preLoad &&
          t.bottom > 0 &&
          t.left < window.innerWidth * e.options.preLoad &&
          t.right > 0
        );
      },
      load() {
        (this.show = !0), (this.state.loaded = !0), this.$emit('show', this);
      },
      destroy() {
        return this.$destroy;
      },
    },
  });
  const xu = { selector: 'img' };
  class Vu {
    constructor({ el: e, binding: t, vnode: o, lazy: n }) {
      (this.el = null),
        (this.vnode = o),
        (this.binding = t),
        (this.options = {}),
        (this.lazy = n),
        (this.queue = []),
        this.update({ el: e, binding: t });
    }
    update({ el: e, binding: t }) {
      (this.el = e), (this.options = Object.assign({}, xu, t.value));
      this.getImgs().forEach((e) => {
        this.lazy.add(
          e,
          Object.assign({}, this.binding, {
            value: {
              src: 'dataset' in e ? e.dataset.src : e.getAttribute('data-src'),
              error:
                ('dataset' in e
                  ? e.dataset.error
                  : e.getAttribute('data-error')) || this.options.error,
              loading:
                ('dataset' in e
                  ? e.dataset.loading
                  : e.getAttribute('data-loading')) || this.options.loading,
            },
          }),
          this.vnode
        );
      });
    }
    getImgs() {
      return Array.from(this.el.querySelectorAll(this.options.selector));
    }
    clear() {
      this.getImgs().forEach((e) => this.lazy.remove(e)),
        (this.vnode = null),
        (this.binding = null),
        (this.lazy = null);
    }
  }
  class Nu {
    constructor({ lazy: e }) {
      (this.lazy = e), (this.queue = []);
    }
    bind(e, t, o) {
      const n = new Vu({ el: e, binding: t, vnode: o, lazy: this.lazy });
      this.queue.push(n);
    }
    update(e, t, o) {
      const n = this.queue.find((t) => t.el === e);
      n && n.update({ el: e, binding: t, vnode: o });
    }
    unbind(e) {
      const t = this.queue.find((t) => t.el === e);
      t && (t.clear(), iu(this.queue, t));
    }
  }
  var Cu = (e) => ({
    props: { src: [String, Object], tag: { type: String, default: 'img' } },
    render(e) {
      return e(
        this.tag,
        { attrs: { src: this.renderSrc } },
        this.$slots.default
      );
    },
    data: () => ({
      el: null,
      options: { src: '', error: '', loading: '', attempt: e.options.attempt },
      state: { loaded: !1, error: !1, attempt: 0 },
      renderSrc: '',
    }),
    watch: {
      src() {
        this.init(), e.addLazyBox(this), e.lazyLoadHandler();
      },
    },
    created() {
      this.init(), (this.renderSrc = this.options.loading);
    },
    mounted() {
      (this.el = this.$el), e.addLazyBox(this), e.lazyLoadHandler();
    },
    beforeUnmount() {
      e.removeComponent(this);
    },
    methods: {
      init() {
        const { src: t, loading: o, error: n } = e.valueFormatter(this.src);
        (this.state.loaded = !1),
          (this.options.src = t),
          (this.options.error = n),
          (this.options.loading = o),
          (this.renderSrc = this.options.loading);
      },
      checkInView() {
        const t = x(this.$el);
        return (
          t.top < window.innerHeight * e.options.preLoad &&
          t.bottom > 0 &&
          t.left < window.innerWidth * e.options.preLoad &&
          t.right > 0
        );
      },
      load(t = o) {
        if (this.state.attempt > this.options.attempt - 1 && this.state.error)
          return (
            'production' === process.env.NODE_ENV ||
              e.options.silent ||
              console.log(
                `[@vant/lazyload] ${this.options.src} tried too more than ${this.options.attempt} times`
              ),
            void t()
          );
        const { src: n } = this.options;
        mu(
          { src: n },
          ({ src: e }) => {
            (this.renderSrc = e), (this.state.loaded = !0);
          },
          () => {
            this.state.attempt++,
              (this.renderSrc = this.options.error),
              (this.state.error = !0);
          }
        );
      },
    },
  });
  const ku = {
      install(e, t = {}) {
        const o = new (yu())(t),
          n = new Nu({ lazy: o });
        (e.config.globalProperties.$Lazyload = o),
          t.lazyComponent && e.component('LazyComponent', wu(o)),
          t.lazyImage && e.component('LazyImage', Cu(o)),
          e.directive('lazy', {
            beforeMount: o.add.bind(o),
            updated: o.update.bind(o),
            unmounted: o.remove.bind(o),
          }),
          e.directive('lazy-container', {
            beforeMount: n.bind.bind(n),
            updated: n.update.bind(n),
            unmounted: n.unbind.bind(n),
          });
      },
    },
    Su = '3.5.3';
  function Tu(e) {
    [
      Ge,
      kt,
      Dt,
      Kt,
      hn,
      Ln,
      go,
      ot,
      xt,
      da,
      ba,
      Ja,
      Vo,
      or,
      ur,
      pr,
      br,
      Tr,
      Ar,
      Mr,
      Lr,
      Wr,
      _r,
      el,
      al,
      dl,
      hl,
      Pl,
      ql,
      Jl,
      oi,
      ui,
      pi,
      Bl,
      Lo,
      So,
      gi,
      xi,
      ut,
      fa,
      Ai,
      Ri,
      ji,
      Xi,
      gt,
      ke,
      Ki,
      ts,
      ss,
      gs,
      Rt,
      Ns,
      Ts,
      co,
      wc,
      Yt,
      Cc,
      Oc,
      On,
      xn,
      zc,
      Ec,
      Hc,
      Xc,
      Jc,
      od,
      id,
      ud,
      yd,
      Cd,
      kd,
      Va,
      Od,
      Oa,
      zd,
      ja,
      rn,
      Ya,
      Fd,
      Wd,
      Xa,
      kn,
      en,
      Xd,
      nu,
    ].forEach((t) => {
      t.install ? e.use(t) : t.name && e.component(t.name, t);
    });
  }
  var Bu = { install: Tu, version: Su };
  (e.ActionBar = Ge),
    (e.ActionBarButton = kt),
    (e.ActionBarIcon = Dt),
    (e.ActionSheet = Kt),
    (e.AddressEdit = hn),
    (e.AddressList = Ln),
    (e.Area = go),
    (e.Badge = ot),
    (e.Button = xt),
    (e.Calendar = da),
    (e.Card = ba),
    (e.Cascader = Ja),
    (e.Cell = Vo),
    (e.CellGroup = or),
    (e.Checkbox = ur),
    (e.CheckboxGroup = pr),
    (e.Circle = br),
    (e.Col = Tr),
    (e.Collapse = Ar),
    (e.CollapseItem = Mr),
    (e.ConfigProvider = Lr),
    (e.ContactCard = Wr),
    (e.ContactEdit = _r),
    (e.ContactList = el),
    (e.CountDown = al),
    (e.Coupon = dl),
    (e.CouponCell = hl),
    (e.CouponList = Pl),
    (e.DatetimePicker = ql),
    (e.Dialog = Jl),
    (e.Divider = oi),
    (e.DropdownItem = ui),
    (e.DropdownMenu = pi),
    (e.Empty = Bl),
    (e.Field = Lo),
    (e.Form = So),
    (e.Grid = gi),
    (e.GridItem = xi),
    (e.Icon = ut),
    (e.Image = fa),
    (e.ImagePreview = Ai),
    (e.IndexAnchor = Ri),
    (e.IndexBar = ji),
    (e.Lazyload = ku),
    (e.List = Xi),
    (e.Loading = gt),
    (e.Locale = ke),
    (e.NavBar = Ki),
    (e.NoticeBar = ts),
    (e.Notify = ss),
    (e.NumberKeyboard = gs),
    (e.Overlay = Rt),
    (e.Pagination = Ns),
    (e.PasswordInput = Ts),
    (e.Picker = co),
    (e.Popover = wc),
    (e.Popup = Yt),
    (e.Progress = Cc),
    (e.PullRefresh = Oc),
    (e.Radio = On),
    (e.RadioGroup = xn),
    (e.Rate = zc),
    (e.Row = Ec),
    (e.Search = Hc),
    (e.ShareSheet = Xc),
    (e.Sidebar = Jc),
    (e.SidebarItem = od),
    (e.Skeleton = id),
    (e.Slider = ud),
    (e.Step = yd),
    (e.Stepper = Cd),
    (e.Steps = kd),
    (e.Sticky = Va),
    (e.SubmitBar = Od),
    (e.Swipe = Oa),
    (e.SwipeCell = zd),
    (e.SwipeItem = ja),
    (e.Switch = rn),
    (e.Tab = Ya),
    (e.Tabbar = Fd),
    (e.TabbarItem = Wd),
    (e.Tabs = Xa),
    (e.Tag = kn),
    (e.Toast = en),
    (e.TreeSelect = Xd),
    (e.Uploader = nu),
    (e.default = Bu),
    (e.install = Tu),
    (e.version = Su),
    Object.defineProperties(e, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' },
    });
});
