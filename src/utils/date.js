// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    "M+": this.getMonth() + 1, // 月份从 0 开始，需要加 1
    "d+": this.getDate(), // 日期
    "h+": this.getHours(), // 小时（24 小时制）
    "H+": this.getHours() % 12 || 12, // 小时（12 小时制）
    "m+": this.getMinutes(), // 分钟
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
    t: this.getHours() < 12 ? "AM" : "PM", // 上午/下午
  };

  // 处理年份
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  // 处理其他格式
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return format;
};
