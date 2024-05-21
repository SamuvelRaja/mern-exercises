var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
    var c = 0;
    return function() {
        return c < a.length ? {
            done: !1,
            value: a[c++]
        } : {
            done: !0
        }
    }
}
;
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, e) {
    if (a == Array.prototype || a == Object.prototype)
        return a;
    a[c] = e.value;
    return a
}
;
$jscomp.getGlobal = function(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var c = 0; c < a.length; ++c) {
        var e = a[c];
        if (e && e.Math == Math)
            return e
    }
    throw Error("Cannot find global object");
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, c) {
    var e = $jscomp.propertyToPolyfillSymbol[c];
    if (null == e)
        return a[c];
    e = a[e];
    return void 0 !== e ? e : a[c]
};
$jscomp.polyfill = function(a, c, e, b) {
    c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, e, b) : $jscomp.polyfillUnisolated(a, c, e, b))
}
;
$jscomp.polyfillUnisolated = function(a, c, e, b) {
    e = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
        var d = a[b];
        if (!(d in e))
            return;
        e = e[d]
    }
    a = a[a.length - 1];
    b = e[a];
    c = c(b);
    c != b && null != c && $jscomp.defineProperty(e, a, {
        configurable: !0,
        writable: !0,
        value: c
    })
}
;
$jscomp.polyfillIsolated = function(a, c, e, b) {
    var d = a.split(".");
    a = 1 === d.length;
    b = d[0];
    b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var l = 0; l < d.length - 1; l++) {
        var r = d[l];
        if (!(r in b))
            return;
        b = b[r]
    }
    d = d[d.length - 1];
    e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? b[d] : null;
    c = c(e);
    null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {
        configurable: !0,
        writable: !0,
        value: c
    }) : c !== e && (void 0 === $jscomp.propertyToPolyfillSymbol[d] && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d),
    $jscomp.defineProperty(b, $jscomp.propertyToPolyfillSymbol[d], {
        configurable: !0,
        writable: !0,
        value: c
    })))
}
;
$jscomp.initSymbol = function() {}
;
$jscomp.polyfill("Symbol", function(a) {
    if (a)
        return a;
    var c = function(d, l) {
        this.$jscomp$symbol$id_ = d;
        $jscomp.defineProperty(this, "description", {
            configurable: !0,
            writable: !0,
            value: l
        })
    };
    c.prototype.toString = function() {
        return this.$jscomp$symbol$id_
    }
    ;
    var e = 0
      , b = function(d) {
        if (this instanceof b)
            throw new TypeError("Symbol is not a constructor");
        return new c("jscomp_symbol_" + (d || "") + "_" + e++,d)
    };
    return b
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
    if (a)
        return a;
    a = Symbol("Symbol.iterator");
    for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), e = 0; e < c.length; e++) {
        var b = $jscomp.global[c[e]];
        "function" === typeof b && "function" != typeof b.prototype[a] && $jscomp.defineProperty(b.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
            }
        })
    }
    return a
}, "es6", "es3");
$jscomp.iteratorPrototype = function(a) {
    a = {
        next: a
    };
    a[Symbol.iterator] = function() {
        return this
    }
    ;
    return a
}
;
$jscomp.iteratorFromArray = function(a, c) {
    a instanceof String && (a += "");
    var e = 0
      , b = !1
      , d = {
        next: function() {
            if (!b && e < a.length) {
                var l = e++;
                return {
                    value: c(l, a[l]),
                    done: !1
                }
            }
            b = !0;
            return {
                done: !0,
                value: void 0
            }
        }
    };
    d[Symbol.iterator] = function() {
        return d
    }
    ;
    return d
}
;
$jscomp.polyfill("Array.prototype.values", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(c, e) {
            return e
        })
    }
}, "es8", "es3");
$jscomp.findInternal = function(a, c, e) {
    a instanceof String && (a = String(a));
    for (var b = a.length, d = 0; d < b; d++) {
        var l = a[d];
        if (c.call(e, l, d, a))
            return {
                i: d,
                v: l
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(c, e) {
        return $jscomp.findInternal(this, c, e).v
    }
}, "es6", "es3");
function updateSQMLEchart(a, c, e) {
    var b = $("#dateTimeContainer").data().tz;
    c = dayjs.tz(c, b);
    c = c.add(12, "hour");
    if ("day" == e) {
        b = c.add(1, e);
        var d = b.format("YYYY-MM-DD HH:mm:ss");
        c = c.add(-1, e)
    } else
        b = c.add(1, e),
        b = b.add(-1, "day"),
        d = b.format("YYYY-MM-DD HH:mm:ss"),
        c = c.add(-1, "day");
    var l = c.format("YYYY-MM-DD HH:mm:ss");
    $("#currentSQMperiod").html(l + "," + d);
    $.ajax({
        url: "https://www.lightpollutionmap.info/sqm/select.ashx?id=" + a + "&tstart=" + l + "&tend=" + d,
        type: "GET",
        dataType: "json",
        success: function(r) {
            window.SQMchart.data.datasets = [];
            for (var p = [], m = [], v = {}, f = 0; f < r.data.time.length; f++)
                v.x = r.data.time[f],
                v.y = r.data.value[f],
                m.push(v),
                v = {};
            p.push({
                label: "SQM value",
                backgroundColor: "rgba(0, 149, 255, 1)",
                borderColor: "rgba(0, 149, 255, 1)",
                pointStyle: "circle",
                radius: 2,
                pointRadius: 2,
                pointHitRadius: 2,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                yAxisID: "A",
                fill: !1,
                data: m,
                spanGaps: !0,
                lineTension: .1,
                showLine: !1
            });
            f = $("#dateTimeContainer").data();
            m = 180 / Math.PI;
            v = f.lat;
            var k = f.lon
              , n = f.tz
              , y = f.elevation;
            tstart_d = dayjs.tz(l, n);
            tend_d = dayjs.tz(d, n);
            var x = 300;
            "month" == e && (x = 2E3);
            var F = dayjs.duration(tend_d.diff(tstart_d)).asMilliseconds() / x
              , D = []
              , z = {};
            for (f = 0; f < x; f++) {
                var q = tstart_d.clone()
                  , E = q.add((f + 1) * F, "millisecond")
                  , u = new A.JulianDay(E.toDate())
                  , G = A.EclCoord.fromWgs84(v, k, y)
                  , w = A.Moon.topocentricPosition(u, G, !0);
                u = A.Solar.apparentTopocentric(u, G);
                u = A.MoonIllum.phaseAngleEq2(w.eq, u);
                w.illum = A.MoonIllum.illuminated(u);
                w.hz.alt *= m;
                0 <= w.hz.alt && (z.x = E.format("YYYY-MM-DD HH:mm:ss"),
                z.y = w.hz.alt,
                z.illum = 100 * w.illum,
                D.push(z),
                z = {})
            }
            p.push({
                label: "Moon alt.",
                backgroundColor: "rgba(96, 96, 96, 1)",
                borderColor: "rgba(96, 96, 96, 1)",
                pointStyle: "circle",
                radius: 1,
                pointRadius: 1,
                pointHitRadius: 2,
                pointHoverRadius: 3,
                pointHoverBorderWidth: 1,
                yAxisID: "B",
                fill: !1,
                data: D,
                showLine: !1
            });
            window.SQMchart.data.datasets = p;
            window.SQMchart.options = {
                responsive: !0,
                onClick: chartClickEvent,
                onResize: function(h, g) {
                    $("#chart_y_limit_control").css("height", g.height - 125 + "px");
                    $("#chart_x_limit_control").css("width", g.width - 210 + "px");
                    $("#SQMpermalink").css("top", g.height - 13 + "px")
                },
                title: {
                    display: !0,
                    text: "SQM data (" + l + " - " + d + ")",
                    fontSize: 16
                },
                legend: {
                    position: "right",
                    labels: {
                        usePointStyle: !0
                    }
                },
                tooltips: {
                    mode: "nearest",
                    callbacks: {
                        title: function(h, g) {
                            if (0 < h.length)
                                return dayjs(new Date(p[h[0].datasetIndex].data[h[0].index].x)).format("YYYY-MM-DD HH:mm:ss")
                        },
                        label: function(h, g) {
                            var t = g.datasets[h.datasetIndex].label || "";
                            t && (t += ": ");
                            t += (Math.round(100 * h.yLabel) / 100).toFixed(2);
                            return t = -1 < t.indexOf("Moon alt.") ? t + ("\u00b0 (" + (Math.round(10 * g.datasets[h.datasetIndex].data[h.index].illum) / 10).toFixed(1) + "% illum.)") : t + " mag./arc sec\u00b2"
                        }
                    },
                    position: "nearest",
                    intersect: !0
                },
                hover: {
                    mode: "nearest",
                    intersect: !1
                },
                annotation: {
                    annotations: []
                },
                scales: {
                    xAxes: [{
                        id: "C",
                        type: "time",
                        time: {
                            unit: "hour",
                            unitStepSize: 1,
                            displayFormats: {
                                hour: "HH:mm"
                            },
                            min: l,
                            max: d
                        },
                        ticks: {
                            autoSkip: !0
                        },
                        scaleLabel: {
                            display: !0,
                            labelString: "Time"
                        }
                    }],
                    yAxes: [{
                        id: "A",
                        display: !0,
                        position: "left",
                        type: "linear",
                        ticks: {
                            autoSkip: !0,
                            beginAtZero: !1,
                            reverse: !0
                        },
                        scaleLabel: {
                            display: !0,
                            labelString: "MPSAS (mag./arc sec\u00b2)"
                        }
                    }, {
                        id: "B",
                        display: !0,
                        position: "right",
                        type: "linear",
                        ticks: {
                            autoSkip: !0,
                            max: 90,
                            beginAtZero: !0,
                            reverse: !1,
                            callback: function(h, g, t) {
                                return Math.round(10 * h) / 10 + " \u00b0"
                            }
                        },
                        scaleLabel: {
                            display: !0,
                            labelString: "Altitude (degrees)"
                        }
                    }]
                }
            };
            D = 1;
            "month" == e && (D = 10);
            x = [];
            F = [];
            z = (tend_d - tstart_d) / (6E4 * D);
            for (f = w = 0; f < z; f++)
                q = dayjs(q).tz(n),
                E = q.add(1 * (f + 1) * D, "minute"),
                u = new A.JulianDay(E.toDate()),
                G = A.EclCoord.fromWgs84(v, k, y),
                u = A.Solar.topocentricPosition(u, G, !0),
                u.hz.alt *= m,
                -18 > u.hz.alt && 0 == w && (x.push(E.format("YYYY-MM-DD HH:mm:ss")),
                w = 1),
                -18 < u.hz.alt && 1 == w && (F.push(E.format("YYYY-MM-DD HH:mm:ss")),
                w = 0);
            q = [];
            for (f = 0; f < x.length; f++)
                "undefined" != typeof x[f] && "undefined" != typeof F[f] && q.push({
                    drawTime: "beforeDatasetsDraw",
                    type: "box",
                    yScaleID: "B",
                    xScaleID: "C",
                    xMin: x[f],
                    xMax: F[f],
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                });
            window.SQMchart.options.annotation.annotations = q;
            "day" == e ? (window.SQMchart.options.scales.xAxes[0].time.displayFormats = {
                hour: "DD HH:mm"
            },
            window.SQMchart.options.scales.xAxes[0].time.unit = "hour",
            window.SQMchart.options.scales.xAxes[0].scaleLabel.labelString = "Time (hour)",
            window.SQMchart.options.title.text = "SQM data (" + l + " - " + d + ")") : (window.SQMchart.options.scales.xAxes[0].time.displayFormats = {
                day: "DD"
            },
            window.SQMchart.options.scales.xAxes[0].time.unit = "day",
            window.SQMchart.options.scales.xAxes[0].scaleLabel.labelString = "Time (day)",
            window.SQMchart.options.title.text = "SQM data (" + dayjs(new Date(l)).format("YYYY MMMM") + ")");
            window.SQMchart.update();
            f = window.SQMchart.scales.A;
            var B = f.max
              , C = f.min;
            $("#chart_y_limit_control").css("height", $("#canvasContainer").height() - 125 + "px");
            $("#SQMpermalink").css("top", $("#canvasContainer").height() - 13 + "px");
            try {
                $("#chart_y_limit_control").slider("destroy")
            } catch (h) {}
            $("#chart_y_limit_control").slider({
                range: !0,
                animate: "slow",
                orientation: "vertical",
                min: C,
                max: B,
                values: [C, B],
                step: .1,
                change: function(h, g) {
                    h = C + B - g.values[1];
                    g = C + B - g.values[0];
                    var t = $(this).find(".ui-slider-handle");
                    t[0].innerHTML = g.toFixed(1);
                    t[1].innerHTML = h.toFixed(1);
                    window.SQMchart.options.scales.yAxes[0] = {
                        id: "A",
                        display: !0,
                        position: "left",
                        type: "linear",
                        ticks: {
                            autoSkip: !0,
                            beginAtZero: !1,
                            reverse: !0,
                            min: h,
                            max: g
                        },
                        scaleLabel: {
                            display: !0,
                            labelString: "MPSAS (mag./arc sec\u00b2)"
                        }
                    };
                    window.SQMchart.update()
                },
                slide: function(h, g) {
                    h = C + B - g.values[1];
                    g = C + B - g.values[0];
                    var t = $(this).find(".ui-slider-handle");
                    t[0].innerHTML = g.toFixed(1);
                    t[1].innerHTML = h.toFixed(1)
                }
            });
            f = $("#chart_y_limit_control").find(".ui-slider-handle");
            f[0].innerHTML = B.toFixed(1);
            f[1].innerHTML = C.toFixed(1);
            $("#chart_x_limit_control").css("width", $("#canvasContainer").width() - 210 + "px");
            try {
                $("#chart_x_limit_control").slider("destroy")
            } catch (h) {}
            q = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
            if ("month" == e)
                for (m = daysInMonth(tstart_d.clone().add(1, "months").format("M"), tstart_d.format("YYYY")),
                q = [],
                f = 0; f < m; f++)
                    q.push(f + 1);
            $("#chart_x_limit_control").slider({
                range: !0,
                animate: "slow",
                min: 1,
                max: q[q.length - 1],
                values: [1, q[q.length - 1]],
                step: 1,
                change: function(h, g) {
                    h = $(this).find(".ui-slider-handle");
                    "day" == e ? (h[0].innerHTML = g.values[0] + "h",
                    h[1].innerHTML = g.values[1] + "h",
                    h = tstart_d.add(g.values[0] - 1, "hour"),
                    window.SQMchart.options.scales.xAxes[0].time.min = h.format("YYYY-MM-DD HH:mm:ss"),
                    g = tstart_d.add(g.values[1], "hour")) : (h[0].innerHTML = g.values[0],
                    h[1].innerHTML = g.values[1],
                    h = tstart_d.add(g.values[0] - 1, "day"),
                    window.SQMchart.options.scales.xAxes[0].time.min = h.format("YYYY-MM-DD HH:mm:ss"),
                    g = tstart_d.add(g.values[1], "day"));
                    window.SQMchart.options.scales.xAxes[0].time.max = g.format("YYYY-MM-DD HH:mm:ss");
                    window.SQMchart.update()
                },
                slide: function(h, g) {
                    h = $(this).find(".ui-slider-handle");
                    "day" == e ? (h[0].innerHTML = g.values[0] + "h",
                    h[1].innerHTML = g.values[1] + "h") : (h[0].innerHTML = g.values[0],
                    h[1].innerHTML = g.values[1])
                }
            });
            f = $("#chart_x_limit_control").find(".ui-slider-handle");
            "day" == e ? (f[0].innerHTML = "1h",
            f[1].innerHTML = q[q.length - 1] + "h") : (f[0].innerHTML = 1,
            f[1].innerHTML = q[q.length - 1]);
            $(".chartStats").remove();
            $("#chartStats fieldset").append(chartStats(r.data.stats));
            $("#chartStats").fadeIn();
            $("#canvasContainer").is(":visible") || $("#canvasContainer").fadeIn();
            $("#dateTimeContainer").is(":visible") || $("#dateTimeContainer").fadeIn();
            $("#chartStatsExport").click(function() {
                0 == $(".loadingIcon").length && ($("#chartStatsExport").html(""),
                $("#chartStatsExport").append("<div class='loadingIcon' style='height: 24px;width: 24px;display: inline-block;margin-top: -3px;'><object data='https://www.lightpollutionmap.info/img/loading.svg' type='image/svg+xml'></object></div>"),
                $.ajax({
                    url: "https://www.lightpollutionmap.info/sqm/select.ashx?id=" + a + "&tstart=" + $("#currentSQMperiod").html().split(",")[0] + "&tend=" + $("#currentSQMperiod").html().split(",")[1] + "&export=csv",
                    type: "GET",
                    xhrFields: {
                        responseType: "blob"
                    },
                    success: function(h) {
                        var g = document.createElement("a");
                        g.href = window.URL.createObjectURL(h);
                        g.download = "SQM-LE_export.zip";
                        document.body.appendChild(g);
                        g.click();
                        g.remove();
                        window.URL.revokeObjectURL(window.URL.createObjectURL(h));
                        $(".loadingIcon").remove();
                        $("#chartStatsExport").html("Export chart data")
                    }
                }))
            });
            $("#alltimeStatsExport").click(function() {
                0 == $(".loadingIcon").length && ($("#alltimeStatsExport").html(""),
                $("#alltimeStatsExport").append("<div class='loadingIcon' style='height: 24px;width: 24px;display: inline-block;margin-top: -3px;'><object data='https://www.lightpollutionmap.info/img/loading.svg' type='image/svg+xml'></object></div>"),
                $.ajax({
                    url: "https://www.lightpollutionmap.info/sqm/select.ashx?id=" + a + "&export=csv",
                    type: "GET",
                    xhrFields: {
                        responseType: "blob"
                    },
                    success: function(h) {
                        var g = document.createElement("a");
                        g.href = window.URL.createObjectURL(h);
                        g.download = "SQM-LE_export.zip";
                        document.body.appendChild(g);
                        g.click();
                        g.remove();
                        window.URL.revokeObjectURL(window.URL.createObjectURL(h));
                        $(".loadingIcon").remove();
                        $("#alltimeStatsExport").html("Export all data")
                    }
                }))
            })
        }
    })
}
function chartStats(a) {
    var c = "<div class='chartStats chartStats1'>Average</div><div class='chartStats chartStats2'>" + a.avg + "</div>";
    c += "<div class='chartStats chartStats1'>Maximum</div><div class='chartStats chartStats2'>" + a.max + "</div>";
    c += "<div class='chartStats chartStats1'>Minimum</div><div class='chartStats chartStats2'>" + a.min + "</div>";
    c += "<div class='chartStats chartStats1'>Mode</div><div class='chartStats chartStats2'>" + a.mode + "</div>";
    c += "<div class='chartStats chartStats1'>Std. dev</div><div class='chartStats chartStats2'>" + a.stddev + "</div>";
    return c += "<div class='chartStats chartStats1'>Variance</div><div class='chartStats chartStats2'>" + a.variance + "</div>"
}
function daysInMonth(a, c) {
    return (new Date(c,a,0)).getDate()
}
function openSQMLE(a, c, e) {
    $("body").append("<div class='loadingIcon' style='height: 20%;width: 20%;max-height: 70px; max-width:70px;position: absolute;left: calc(50% - 35px);top: calc(50% - 35px);display:none;z-index:100;'><object data='https://www.lightpollutionmap.info/img/loading.svg' type='image/svg+xml'></object></div>");
    $(".loadingIcon").fadeIn();
    $.ajax({
        url: "https://www.lightpollutionmap.info/lib/Chart.bundle.min.js",
        dataType: "script",
        cache: !0,
        success: function() {
            0 == $("#sqm-le_panel").length && ("undefined" != typeof e ? $("#" + e).append("<div id='sqm-le_panel'><div id='sqm-le_panel-closer' class='ol-popup-closer' style='display:none;'></div><div id='sqm-le_panel_content'><div><div id='chart_y_limit_control'></div><div id='canvasContainer' class='chart'><canvas id='canvas' class='chart'></canvas></div></div><div><div id='chart_x_limit_control'></div><div id='currentSQMperiod' style='display:none;'></div><div id='SQMpermalink' title='Copy SQM-LE link to clipboard' class='ui-button' style='position:absolute; left:12px;top:0px;font-family: Arial;height: 32px;width:32px;display:none;'><img style='width: 20px;height: 20px;position: absolute;left: 6px;top: 5px;opacity: 0.6;' src='https://www.lightpollutionmap.info/img/chainlink.png' /></div><div id='dateTimeContainer' style='margin: 0px 0px 0px 10px;    display: inline-block;    float: left;    width: 300px;    line-height: 30px;display:none;'><fieldset class='fieldSet'><legend style='font-size: 18px;'>Time settings</legend><label for='dateTimeContainer_radio-day' style='padding: 0.2em 0.5em;'>Day</label><input type='radio' name='dateTimeContainer_radio' id='dateTimeContainer_radio-day' class='dateTimeContainer_radio' checked><label for='dateTimeContainer_radio-month' style='padding: 0.2em 0.5em;'>Month</label><input type='radio' name='dateTimeContainer_radio' id='dateTimeContainer_radio-month' class='dateTimeContainer_radio'><div id='dateTimeContainer_months_slider_label' style='width: 100%;font-family: Arial;'></div><div id='dateTimeContainer_months_slider' style='width: 100%;' title='Month picker'></div><div id='dateTimeContainer_days' style='width: 100%;margin: 20px 0px 0px 0px;'></div></fieldset></div><div id='chartStats' style='margin: 0px 0px 0px 10px;display: inline-block;float: left;width: 200px;line-height: 30px;display:none;'><fieldset class='fieldSet'><legend style='font-size: 18px;'>Chart statistics</legend></fieldset><div id='chartStatsExport' class='ui-button' style='font-family: Arial;width: calc(100% - 4px);margin-left: 2px;height: 32px;'>Export chart data</div></div><div id='datasetStats' style='margin: 0px 0px 0px 10px;display: inline-block;float: left;width: 200px;line-height: 30px;display:none;'><fieldset class='fieldSet'><legend style='font-size: 18px;'>Alltime statistics</legend></fieldset><div id='alltimeStatsExport' class='ui-button' style='font-family: Arial;width: calc(100% - 4px);margin-left: 2px;height: 32px;'>Export all data</div></div></div></div>") : $("body").append("<div id='sqm-le_panel'><div id='sqm-le_panel-closer' class='ol-popup-closer' style='display:none;'></div><div id='sqm-le_panel_content'><div><div id='chart_y_limit_control'></div><div id='canvasContainer' class='chart'><canvas id='canvas' class='chart'></canvas></div></div><div><div id='chart_x_limit_control'></div><div id='currentSQMperiod' style='display:none;'></div><div id='SQMpermalink' title='Copy SQM-LE link to clipboard' class='ui-button' style='position:absolute; left:12px;top:0px;font-family: Arial;height: 32px;width:32px;display:none;'><img style='width: 20px;height: 20px;position: absolute;left: 6px;top: 5px;opacity: 0.6;' src='https://www.lightpollutionmap.info/img/chainlink.png' /></div><div id='dateTimeContainer' style='margin: 0px 0px 0px 10px;    display: inline-block;    float: left;    width: 300px;    line-height: 30px;display:none;'><fieldset class='fieldSet'><legend style='font-size: 18px;'>Time settings</legend><label for='dateTimeContainer_radio-day' style='padding: 0.2em 0.5em;'>Day</label><input type='radio' name='dateTimeContainer_radio' id='dateTimeContainer_radio-day' class='dateTimeContainer_radio' checked><label for='dateTimeContainer_radio-month' style='padding: 0.2em 0.5em;'>Month</label><input type='radio' name='dateTimeContainer_radio' id='dateTimeContainer_radio-month' class='dateTimeContainer_radio'><div id='dateTimeContainer_months_slider_label' style='width: 100%;font-family: Arial;'></div><div id='dateTimeContainer_months_slider' style='width: 100%;' title='Month picker'></div><div id='dateTimeContainer_days' style='width: 100%;margin: 20px 0px 0px 0px;'></div></fieldset></div><div id='chartStats' style='margin: 0px 0px 0px 10px;display: inline-block;float: left;width: 200px;line-height: 30px;display:none;'><fieldset class='fieldSet'><legend style='font-size: 18px;'>Chart statistics</legend></fieldset><div id='chartStatsExport' class='ui-button' style='font-family: Arial;width: calc(100% - 4px);margin-left: 2px;height: 32px;'>Export chart data</div></div><div id='datasetStats' style='margin: 0px 0px 0px 10px;display: inline-block;float: left;width: 200px;line-height: 30px;display:none;'><fieldset class='fieldSet'><legend style='font-size: 18px;'>Alltime statistics</legend></fieldset><div id='alltimeStatsExport' class='ui-button' style='font-family: Arial;width: calc(100% - 4px);margin-left: 2px;height: 32px;'>Export all data</div></div></div></div>"),
            850 > document.body.clientWidth && (document.querySelector("meta[name=viewport]").setAttribute("content", "width=device-width, initial-scale=0.5"),
            $("#sqm-le_panel-closer").css({
                top: "17px",
                right: "13px",
                transform: "scale(3.0)"
            })),
            $("#SQMpermalink").click(function() {
                var b = window.location.href;
                0 < b.indexOf("&SQM") && (b = b.substring(0, b.indexOf("&SQM")));
                copyTextToClipboard(b + "&SQM=3&ID=" + a)
            }),
            $("#sqm-le_panel").fadeIn(),
            $("#sqm-le_panel-closer").click(function() {
                $("#sqm-le_panel").fadeOut(function() {
                    $(this).remove()
                });
                850 > document.body.clientWidth && document.querySelector("meta[name=viewport]").setAttribute("content", "width=device-width, initial-scale=1")
            }));
            $("input[type=radio][name=dateTimeContainer_radio]").change(function() {
                if ("dateTimeContainer_radio-day" == this.id) {
                    $("#dateTimeContainer_days").fadeIn();
                    var b = $("#dateTimeContainer").data();
                    updateSQMLEchart(a, b.date, "day")
                } else
                    "dateTimeContainer_radio-month" == this.id && ($("#dateTimeContainer_days").fadeOut(),
                    b = $("#dateTimeContainer").data(),
                    updateSQMLEchart(a, b.date, "month"))
            });
            $.when(function() {
                return $.ajax({
                    url: "https://www.lightpollutionmap.info/sqm/stats.ashx?id=" + a,
                    type: "GET",
                    dataType: "json",
                    success: function(b) {}
                })
            }(), function() {
                return $.ajax({
                    url: "https://www.lightpollutionmap.info/input2/gettimezone.aspx?QueryData=" + c[0] + "," + c[1],
                    type: "GET",
                    success: function(b) {}
                })
            }()).done(function(b, d) {
                $("#dateTimeContainer").data("date", b[0].data.months[b[0].data.months.length - 1]);
                $("#dateTimeContainer").data("tz", d[0]);
                $("#dateTimeContainer").data("lon", c[0]);
                $("#dateTimeContainer").data("lat", c[1]);
                $("#dateTimeContainer").data("elevation", b[0].data.elevation);
                $("#dateTimeContainer_months_slider").slider({
                    value: b[0].data.months.length - 1,
                    min: 0,
                    max: b[0].data.months.length - 1,
                    step: 1,
                    change: function(r, p) {
                        $("#dateTimeContainer_days").datepicker("destroy");
                        $("#dateTimeContainer_days").datepicker({
                            beforeShowDay: function(m) {
                                var v = dayjs(m).format("YYYY-MM-DD");
                                v = $.inArray(v, b[0].data.days);
                                var f = $("#dateTimeContainer").data()
                                  , k = f.lat
                                  , n = f.lon
                                  , y = f.tz;
                                f = 180 / Math.PI;
                                m = dayjs.tz(dayjs(m).clone().add(12, "hour"), y);
                                m = new A.JulianDay(m.toDate());
                                y = A.EclCoord.fromWgs84(k, n, 0);
                                k = A.Moon.topocentricPosition(m, y, !0);
                                n = A.Solar.apparentTopocentric(m, y);
                                var x = A.MoonIllum.phaseAngleEq2(k.eq, n);
                                k.illum = A.MoonIllum.illuminated(x);
                                k.hz.alt *= f;
                                m = A.Solar.topocentricPosition(m, y, !0);
                                m.hz.alt *= f;
                                0 < A.MoonIllum.positionAngle(k.eq, n) ? (f = !1,
                                n = "waning") : (f = !0,
                                n = "waxing");
                                k = 100 * k.illum;
                                if (-1 == v)
                                    return [!1, "dateTimeContainer_days-cross", "No readings"];
                                if (1 == f) {
                                    if (0 < k && 10 >= k)
                                        return [!0, "dateTimeContainer_days-ok-1", "Moon " + k.toFixed(0) + "% - " + n];
                                    if (10 < k && 40 >= k)
                                        return [!0, "dateTimeContainer_days-ok-3", "Moon " + k.toFixed(0) + "% - " + n];
                                    if (40 < k && 60 >= k)
                                        return [!0, "dateTimeContainer_days-ok-7", "Moon " + k.toFixed(0) + "% - " + n];
                                    if (60 < k && 90 >= k)
                                        return [!0, "dateTimeContainer_days-ok-17", "Moon " + k.toFixed(0) + "% - " + n]
                                } else {
                                    if (0 < k && 10 >= k)
                                        return [!0, "dateTimeContainer_days-ok-1", "Moon " + k.toFixed(0) + "% - " + n];
                                    if (10 < k && 40 >= k)
                                        return [!0, "dateTimeContainer_days-ok-10", "Moon " + k.toFixed(0) + "% - " + n];
                                    if (40 < k && 60 >= k)
                                        return [!0, "dateTimeContainer_days-ok-21", "Moon " + k.toFixed(0) + "% - " + n];
                                    if (60 < k && 90 >= k)
                                        return [!0, "dateTimeContainer_days-ok-26", "Moon " + k.toFixed(0) + "% - " + n]
                                }
                                if (90 < k)
                                    return [!0, "dateTimeContainer_days-ok-14", "Moon " + k.toFixed(0) + "% - " + n]
                            },
                            onSelect: function(m, v) {
                                m = $(this).datepicker("getDate");
                                updateSQMLEchart(a, dayjs(m).format("YYYY-MM-DD"), "day")
                            }
                        }).datepicker("setDate", new Date(b[0].data.months[p.value]));
                        1 == $("#dateTimeContainer_radio-month").prop("checked") && updateSQMLEchart(a, b[0].data.months[p.value], "month");
                        $("#dateTimeContainer").data("date", b[0].data.months[p.value]);
                        r = $("#dateTimeContainer_days td");
                        for (p = 0; p < r.length; p++)
                            if (0 < r[p].title.length) {
                                r = $(r[p]).children()[0];
                                $(r).removeClass("ui-state-active");
                                break
                            }
                    },
                    slide: function(r, p) {
                        dayjs(new Date(b[0].data.months[p.value])).format("MMMM");
                        dayjs(new Date(b[0].data.months[p.value])).format("YYYY");
                        $("#dateTimeContainer_months_slider_label").html(dayjs(new Date(b[0].data.months[p.value])).format("YYYY") + " " + dayjs(new Date(b[0].data.months[p.value])).format("MMMM"))
                    }
                });
                $("#dateTimeContainer_months_slider").find(".ui-slider-handle").html("&nbsp;&nbsp;&nbsp;");
                $("#dateTimeContainer_months_slider_label").html(dayjs(new Date(b[0].data.months[b[0].data.months.length - 1])).format("YYYY") + " " + dayjs(new Date(b[0].data.months[b[0].data.months.length - 1])).format("MMMM"));
                $(".dateTimeContainer_radio").checkboxradio({
                    icon: !1
                });
                d = $("#dateTimeContainer_months_slider");
                d.slider("value", d.slider("value"));
                $("a.ui-state-active").css("border", "1px solid #c5c5c5");
                d = $("#dateTimeContainer_days td");
                for (var l = 0; l < d.length; l++)
                    if ("No readings" == d[l].title) {
                        d = $(d[l - 1]).children()[0];
                        $(d).addClass("ui-state-active");
                        break
                    }
                d = "<div style='width:115px;display: inline-block;'>Average</div><div style='display: inline-block;'>" + b[0].data.stats.avg + "</div>";
                d += "<div style='width:115px;display: inline-block;'>Maximum</div><div style='display: inline-block;'>" + b[0].data.stats.max + "</div>";
                d += "<div style='width:115px;display: inline-block;'>Minimum</div><div style='display: inline-block;'>" + b[0].data.stats.min + "</div>";
                d += "<div style='width:115px;display: inline-block;'>Mode</div><div style='display: inline-block;'>" + b[0].data.stats.mode + "</div>";
                d += "<div style='width:115px;display: inline-block;'>Std. dev</div><div style='display: inline-block;'>" + b[0].data.stats.stddev + "</div>";
                d += "<div style='width:115px;display: inline-block;'>Variance</div><div style='display: inline-block;'>" + b[0].data.stats.variance + "</div>";
                $("#datasetStats fieldset").append(d);
                $("#datasetStats").fadeIn();
                d = document.getElementById("canvas").getContext("2d");
                window.SQMchart = new Chart(d,{
                    type: "line",
                    data: {
                        datasets: []
                    }
                });
                updateSQMLEchart(a, b[0].data.days[b[0].data.days.length - 1], "day");
                $("#SQMpermalink").fadeIn();
                $(".loadingIcon").fadeOut(500, function() {
                    $(".loadingIcon").remove()
                });
                $("#sqm-le_panel-closer").fadeIn()
            })
        }
    })
}
function chartClickEvent(a, c) {
    c[0] && (a = c[0]._chart.config.data.datasets[0].data[c[0]._index].x,
    $("#chartStats").data("clickTimeISO", a))
}
;