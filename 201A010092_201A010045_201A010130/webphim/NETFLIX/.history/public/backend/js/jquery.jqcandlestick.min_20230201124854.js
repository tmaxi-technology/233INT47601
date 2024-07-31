/*
jqCandlestick v0.1.0

Copyright (C) 2014 Niels Sonnich Poulsen
http://apakoh.dk

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ (function (e) {
  var t = e(window);
  e.fn.jqCandlestick = function (n) {
    if (n.theme) {
      if (!e.fn.jqCandlestick.themes[n.theme]) throw 'Undefined theme: ' + n.theme;
      n = e.extend(true, {}, e.fn.jqCandlestick.themes[n.theme], n);
    }
    var r = e.extend(true, {}, e.fn.jqCandlestick.defaults, n);
    var i = this;
    i.addClass(r.containerClass);
    var s = e('<canvas/>').attr(r.chartCanvasAttrs).appendTo(i);
    var o = e('<canvas/>').attr(r.crossCanvasAttrs).appendTo(i);
    var u = s.get(0);
    var a = o.get(0);
    if (!u.getContext || !a.getContext) {
      throw 'canvas unsupported';
    }
    var f = r.data;
    var l = r.xAxis.dataOffset;
    f.sort(function (e, t) {
      return e[l] - t[l];
    });
    if (r.xAxis.min == null || r.xAxis.max == null) {
      var c = null;
      var h = null;
      f.forEach(function (e) {
        if (c) c = Math.min(c, e[l]);
        else c = e[l];
        if (h) h = Math.max(h, e[l]);
        else h = e[l];
      });
      if (r.xAxis.min == null) r.xAxis.min = c;
      if (r.xAxis.max == null) r.xAxis.max = h;
    }
    var p = [];
    r.yAxis = [].concat(r.yAxis);
    var d = 0;
    r.yAxis.forEach(function (t) {
      t = e.extend(true, {}, r.yAxisDefaults, t);
      d += t.height;
      var n = { yAxis: t, height: t.height, min: null, max: null, minY: null, maxY: null, series: [] };
      if (t.labels.format.fixed !== null) {
        var i = t.labels.format.fixed;
        n.formatLabel = function (e) {
          if (e != null) return e.toFixed(i);
          else return 'n/a';
        };
      } else if (typeof t.labels.format === 'function') {
        n.formatLabel = t.labels.format;
      } else {
        n.formatLabel = function (e) {
          return e;
        };
      }
      p.push(n);
    });
    p.forEach(function (e) {
      e.height = e.height / d;
    });
    r.series.forEach(function (t) {
      t = e.extend(true, {}, r.seriesDefaults, t);
      var n = p[t.yAxis];
      if (!n) throw 'Undefined y-axis: ' + t.yAxis;
      var i = e.fn.jqCandlestick.types[t.type];
      if (!i) throw 'Unknown plot type: ' + t.type;
      t = e.extend(true, {}, i, t);
      var s = t.dataOffset + i.dataSize;
      f.forEach(function (e) {
        for (var r = t.dataOffset; r < s; r++) {
          if (e[r] == null) throw 'Missing data column: ' + r;
          if (n.min) n.min = Math.min(n.min, e[r]);
          else n.min = e[r];
          if (n.max) n.max = Math.max(n.max, e[r]);
          else n.max = e[r];
        }
      });
      n.series.push(t);
    });
    p.forEach(function (e) {
      var t = Math.pow(10, Math.floor(Math.log(e.max) / Math.log(10)));
      e.max = Math.ceil(e.max / t) * t;
      e.min = Math.floor(e.min / t) * t;
    });
    var v = 0;
    var m = 0;
    var g = function (e) {
      var t = null;
      p.some(function (n) {
        if (e >= n.minY && e <= n.maxY) {
          if (n.min != null && n.max != null) {
            t = n.formatLabel(n.max - ((e - n.minY) / (n.maxY - n.minY)) * (n.max - n.min));
          } else {
            t = 'n/a';
          }
          return true;
        }
        return false;
      });
      return t;
    };
    var y = function (e) {
      return r.xAxis.min + ((e - r.xAxis.minX) / (r.xAxis.maxX - r.xAxis.minX)) * (r.xAxis.max - r.xAxis.min);
    };
    var b = function (e) {
      if (e >= v && e <= m) {
        var t = y(e);
        var n = null;
        var i = null;
        for (var s = 0; s < f.length; s++) {
          var o = Math.abs(f[s][r.xAxis.dataOffset] - t);
          if (i == null || o < i) {
            i = o;
            n = s;
          } else {
            break;
          }
        }
        if (n != null) return f[n];
      }
      return null;
    };
    var w = function (e) {
      return (
        Math.floor(r.xAxis.minX + ((e - r.xAxis.min) / (r.xAxis.max - r.xAxis.min)) * (r.xAxis.maxX - r.xAxis.minX)) +
        0.5
      );
    };
    var E = function (e, t) {
      return Math.floor(e.maxY - ((t - e.min) / (e.max - e.min)) * (e.maxY - e.minY)) + 0.5;
    };
    var S = function () {
      var e = u.getContext('2d');
      var t = u.height;
      var n = t - (p.length + 1) * r.plot.spacing - r.padding.top - r.info.height - r.padding.bottom - r.xAxis.height;
      var i = r.padding.top + r.info.height + r.plot.spacing + 0.5;
      v = 0;
      m = u.width - r.padding.right;
      p.forEach(function (t) {
        t.minY = i;
        i += n * t.height;
        t.maxY = i;
        i += r.plot.spacing;
        e.font = t.yAxis.labels.font ? t.yAxis.labels.font : r.font;
        v = Math.max(v, e.measureText(t.formatLabel(t.min)).width, e.measureText(t.formatLabel(t.max)).width);
      });
      v += r.padding.left + 10 + 0.5;
      r.xAxis.minX = v + r.plot.padding.left;
      r.xAxis.maxX = m - r.plot.padding.right;
      e.textAlign = 'right';
      e.textBaseline = 'middle';
      p.forEach(function (t) {
        e.font = t.yAxis.labels.font ? t.yAxis.labels.font : r.font;
        e.fillStyle = t.yAxis.labels.color;
        e.strokeStyle = t.yAxis.color;
        e.lineWidth = t.yAxis.strokeWidth;
        var n = t.max - t.min;
        var i;
        if (t.yAxis.numTicks != null) {
          i = t.yAxis.numTicks;
        } else {
          i = Math.ceil((t.maxY - t.minY) / t.yAxis.tickDistance);
        }
        var s = (t.maxY - t.minY) / i;
        var o = (t.max - t.min) / i;
        var u = t.minY + s / 2;
        var a = t.max - o / 2;
        for (var f = 0; f < i; f++) {
          e.fillText(t.formatLabel(a), v - 10, u);
          e.beginPath();
          e.moveTo(v, Math.floor(u) + 0.5);
          e.lineTo(m, Math.floor(u) + 0.5);
          e.stroke();
          u += s;
          a -= o;
        }
      });
      if (r.xAxis.height > 0) {
        e.strokeStyle = r.xAxis.color;
        e.lineWidth = r.xAxis.strokeWidth;
        e.beginPath();
        var s = t - r.xAxis.height - r.padding.bottom - 0.5;
        e.moveTo(0, s);
        e.lineTo(u.width, s);
        e.stroke();
        e.font = r.xAxis.labels.font ? r.xAxis.labels.font : r.font;
        e.fillStyle = r.xAxis.labels.color;
        e.textAlign = 'center';
        var o = s + r.xAxis.height / 2;
        var a = r.xAxis.max - r.xAxis.min;
        var l = Math.ceil((r.xAxis.maxX - r.xAxis.minX) / 80);
        var c = a / l;
        var h = c / 6e4;
        var d = h / 60;
        var g = d / 24;
        var y = [
          6e4,
          2 * 6e4,
          5 * 6e4,
          10 * 6e4,
          15 * 6e4,
          30 * 6e4,
          60 * 6e4,
          2 * 60 * 6e4,
          3 * 60 * 6e4,
          6 * 60 * 6e4,
          12 * 60 * 6e4,
          24 * 60 * 6e4,
        ];
        var b = 6e4;
        for (var S = 0; S < y.length; S++) {
          b = y[S];
          if (c <= b) {
            break;
          }
        }
        var x = Math.ceil(r.xAxis.min / b) * b;
        var T = r.xAxis.tickSize;
        for (var N = w(x); N < m; x += b, N = w(x)) {
          var C = new Date(x);
          var k;
          if (C.getHours() == 0 && C.getMinutes() == 0) {
            k = r.xAxis.months[C.getMonth()] + ' ' + C.getDate();
          } else {
            var d = C.getHours();
            if (d < 10) d = '0' + d;
            var h = C.getMinutes();
            if (h < 10) h = '0' + h;
            k = d + ':' + h;
          }
          var L = e.measureText(k).width;
          if (N + L / 2 > m) continue;
          e.fillText(k, N, o);
          e.beginPath();
          if (T != 0) {
            e.moveTo(N, s);
            e.lineTo(N, s - T);
            e.stroke();
          }
        }
      }
      e.fillStyle = '#900';
      p.forEach(function (t) {
        t.series.forEach(function (n) {
          n.draw(e, r, t, n, f, w, E);
        });
      });
    };
    var x = 0;
    var T = 0;
    var N = false;
    t.mousemove(function (e) {
      N = true;
      x = e.pageX - i.offset().left + 0.5;
      T = e.pageY - i.offset().top + 0.5;
    });
    var C = 0;
    var k = 0;
    var L = function () {
      if (i.width() != C || i.height() != k) {
        u.width = i.width();
        u.height = i.height();
        a.width = i.width();
        a.height = i.height();
        C = i.width();
        k = i.height();
        S();
      }
    };
    var A = function () {
      L();
      if (!N) return;
      N = false;
      var e = a.getContext('2d');
      e.strokeStyle = r.cross.color;
      e.lineWidth = r.cross.strokeWidth;
      e.clearRect(0, 0, a.width, a.height);
      if (x < 0 || x >= a.width) return;
      if (T < 0 || T >= a.height) return;
      var t = b(x);
      if (t) {
        x = w(t[r.xAxis.dataOffset]);
      }
      e.beginPath();
      e.moveTo(x, 0);
      e.lineTo(x, a.height);
      e.stroke();
      e.beginPath();
      e.moveTo(0, T);
      e.lineTo(a.width, T);
      e.stroke();
      if (t) {
        e.fillStyle = r.info.color;
        e.font = r.info.font ? r.info.font : r.font;
        if (r.info.position == 'right') e.textAlign = 'right';
        else e.textAlign = 'left';
        if (r.info.position == 'auto') e.textBaseline = 'top';
        else e.textBaseline = 'middle';
        var n = r.padding.top + Math.floor(r.info.height / 2) + 0.5;
        var i = [];
        var s = new Date(t[r.xAxis.dataOffset]);
        i.push(r.xAxis.name + ': ' + r.info.formatDate(s));
        p.forEach(function (e) {
          e.series.forEach(function (n) {
            if (n.dataSize == 1) {
              i.push(n.name + ': ' + e.formatLabel(t[n.dataOffset]));
            } else {
              for (var r = 0; r < n.dataSize; r++) {
                i.push(n.names[r] + ': ' + e.formatLabel(t[n.dataOffset + r]));
              }
            }
          });
        });
        var o = n;
        if (r.info.position == 'right') {
          var u = m;
          i.forEach(function (t) {
            var n = e.measureText(t).width + r.info.spacing;
            if (r.info.wrap == 'auto' && u - n < v) {
              u = m;
              o += r.info.height;
            }
            e.fillText(t, u, o);
            if (r.info.wrap == 'yes') o += r.info.height;
            else u -= n;
          });
        } else {
          var u = v;
          if (r.info.position == 'auto') {
            u = x + 5;
            o = T + 5;
          }
          i.forEach(function (t) {
            var n = e.measureText(t).width + r.info.spacing;
            if (r.info.wrap == 'auto' && u + n > m) {
              if (r.info.position == 'auto') u = x + 5;
              else u = v;
              o += r.info.height;
            }
            e.fillText(t, u, o);
            if (r.info.wrap == 'yes') o += r.info.height;
            else u += n;
          });
        }
      }
      var f = g(T);
      if (f == null) return;
      var l = e.measureText(f).width;
      var c = Math.floor(r.cross.text.height / 2);
      var h = v;
      var d = h - 5;
      var y = h - 10;
      var E = h - (l + 15);
      if (x < h) {
        E = h + (l + 15);
        d = h + 5;
        y = E - 5;
      }
      e.beginPath();
      e.moveTo(E, T - c);
      e.lineTo(d, T - c);
      e.lineTo(h, T);
      e.lineTo(d, T + c + 1);
      e.lineTo(E, T + c + 1);
      e.lineTo(E, T - c);
      e.fillStyle = r.cross.text.background;
      e.fill();
      e.stroke();
      e.fillStyle = r.cross.text.color;
      e.font = r.cross.text.font ? r.cross.text.font : r.font;
      e.textAlign = 'right';
      e.textBaseline = 'middle';
      e.fillText(f, y, T);
    };
    setInterval(A, 1e3 / 60);
    return this;
  };
  e.fn.jqCandlestick.defaults = {
    series: [],
    data: [],
    theme: 'light',
    font: '8pt sans-serif',
    padding: { top: 0, left: 10, bottom: 0, right: 0 },
    plot: { spacing: 5, padding: { top: 0, left: 15, bottom: 0, right: 15 } },
    xAxis: {
      name: 'DATE',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      dataOffset: 0,
      min: null,
      max: null,
      minX: 0,
      maxX: 0,
      height: 20,
      color: '#333',
      strokeWidth: 1,
      tickSize: 5,
      labels: { font: null, color: '#999', format: 'date' },
    },
    yAxis: [{ height: 1 }],
    yAxisDefaults: {
      height: 1,
      color: '#222',
      strokeWidth: 1,
      numTicks: null,
      tickDistance: 40,
      labels: { font: null, color: '#999', format: { fixed: 2 } },
    },
    seriesDefaults: { type: 'point', name: null, names: [], dataOffset: 1, yAxis: 0, color: '#fff' },
    info: {
      color: '#999',
      height: 20,
      font: null,
      spacing: 20,
      position: 'left',
      wrap: 'auto',
      formatDate: function (e) {
        var t = e.getFullYear();
        var n = e.getMonth() + 1;
        if (n < 10) n = '0' + n;
        var r = e.getDate();
        if (r < 10) r = '0' + r;
        var i = e.getHours();
        if (i < 10) i = '0' + i;
        var s = e.getMinutes();
        if (s < 10) s = '0' + s;
        return t + '-' + n + '-' + r + ' ' + i + ':' + s;
      },
    },
    cross: {
      color: 'rgba(255, 255, 255, 0.5)',
      strokeWidth: 1,
      text: { height: 20, background: '#000', font: null, color: '#999' },
    },
    containerClass: 'jqcandlestick-container',
    chartCanvasAttrs: { class: 'jqcandlestick-canvas' },
    crossCanvasAttrs: { class: 'jqcandlestick-canvas' },
  };
  e.fn.jqCandlestick.themes = {
    light: {
      xAxis: { color: '#333', labels: { color: '#222' } },
      yAxisDefaults: { color: '#eee', labels: { color: '#222' } },
      seriesDefaults: { color: '#000' },
      cross: { color: 'rgba(0, 0, 0, 0.5)', text: { background: '#fff', color: '#222' } },
      info: { color: '#222' },
    },
    dark: {
      xAxis: { color: '#333', labels: { color: '#999' } },
      yAxisDefaults: { color: '#222', labels: { color: '#999' } },
      seriesDefaults: { color: '#fff' },
      cross: { color: 'rgba(255, 255, 255, 0.5)', text: { background: '#000', color: '#999' } },
      info: { color: '#999' },
    },
  };
  e.fn.jqCandlestick.types = {
    point: {
      dataSize: 1,
      radius: 3,
      stroke: null,
      strokeWidth: 2,
      draw: function (e, t, n, r, i, s, o) {
        e.fillStyle = r.color;
        e.lineWidth = r.strokeWidth;
        i.forEach(function (i) {
          var u = s(i[t.xAxis.dataOffset]);
          var a = o(n, i[r.dataOffset]);
          e.beginPath();
          e.arc(u, a, r.radius, 0, Math.PI * 2, true);
          e.fill();
          if (r.stroke) {
            e.strokeStyle = r.stroke;
            e.lineWidth = r.strokeWidth;
            e.stroke();
          }
        });
      },
    },
    line: {
      dataSize: 1,
      strokeWidth: 2,
      draw: function (e, t, n, r, i, s, o) {
        e.strokeStyle = r.color;
        e.lineWidth = r.strokeWidth;
        e.beginPath();
        var u = null;
        var a = null;
        i.forEach(function (i) {
          var f = s(i[t.xAxis.dataOffset]);
          var l = o(n, i[r.dataOffset]);
          if (u && a) e.lineTo(f, l);
          else e.moveTo(f, l);
          u = f;
          a = l;
        });
        e.stroke();
      },
    },
    column: {
      dataSize: 1,
      width: 5,
      stroke: null,
      strokeWidth: 1,
      draw: function (e, t, n, r, i, s, o) {
        e.fillStyle = r.color;
        if (r.stroke) {
          e.strokeStyle = r.stroke;
          e.lineWidth = r.strokeWidth;
        }
        i.forEach(function (i) {
          var u = s(i[t.xAxis.dataOffset]);
          var a = o(n, i[r.dataOffset]);
          e.fillRect(Math.floor(u - r.width / 2) + 0.5, a, r.width, n.maxY - a);
          if (r.stroke) e.strokeRect(Math.floor(u - r.width / 2) + 0.5, a, r.width, n.maxY - a);
        });
      },
    },
    candlestick: {
      dataSize: 4,
      names: ['OPEN', 'HIGH', 'LOW', 'CLOSE'],
      width: 5,
      downColor: null,
      downStroke: null,
      downStrokeWidth: 1,
      upColor: null,
      upStroke: null,
      upStrokeWidth: 1,
      draw: function (e, t, n, r, i, s, o) {
        i.forEach(function (i) {
          var u = i[r.dataOffset];
          var a = i[r.dataOffset + 1];
          var f = i[r.dataOffset + 2];
          var l = i[r.dataOffset + 3];
          var c = s(i[t.xAxis.dataOffset]);
          var h = o(n, u);
          var p = o(n, a);
          var d = o(n, f);
          var v = o(n, l);
          var m = Math.floor(r.width / 2);
          e.beginPath();
          e.moveTo(c, p);
          e.strokeStyle = r.color;
          if (v > h) {
            if (r.downColor) e.fillStyle = r.downColor;
            else e.fillStyle = r.color;
            e.fillRect(c - m, h, r.width, v - h);
            if (r.downStroke) {
              e.strokeStyle = r.downStroke;
              e.lineWidth = r.downStrokeWidth;
              e.strokeRect(c - m, h, r.width, v - h);
            }
            e.lineTo(c, h);
            e.moveTo(c, v);
          } else {
            if (r.upColor) {
              e.fillStyle = r.upColor;
              e.fillRect(c - m, v, r.width, h - v);
            }
            if (r.upStroke) e.strokeStyle = r.upStroke;
            else e.strokeStyle = r.color;
            e.lineWidth = r.upStrokeWidth;
            e.strokeRect(c - m, v, r.width, h - v);
            e.lineTo(c, v);
            e.moveTo(c, h);
          }
          e.lineTo(c, d);
          e.stroke();
        });
      },
    },
  };
})(jQuery);
