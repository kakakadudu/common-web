/**
 * 快捷选择时间
 * @param {key, filters} options
 * @returns
 */
export function pickerOptions(options = { key: null, filters: [] }) {
  const { key, filters } = options;
  const shortcuts = [
    {
      text: "今天",
      value: () => {
        if (key != null) key.value++;
        const end = new Date();
        const start = new Date();
        start.setTime(start.setHours(0, 0, 0, 0));
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: "昨天",
      value: () => {
        if (key != null) key.value++;
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: "近3天",
      value: () => {
        if (key != null) key.value++;
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 2);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: "近7天",
      value: () => {
        if (key != null) key.value++;
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: "本月",
      value: () => {
        if (key != null) key.value++;
        const end = new Date();
        const start = new Date();
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: "上个月",
      value: () => {
        if (key != null) key.value++;
        const end = new Date();
        const start = new Date();
        start.setDate(1);
        start.setMonth(start.getMonth() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: "近三月",
      value: () => {
        if (key != null) key.value++;
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 3);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
  ];
  shortcuts.filter((item) => {
    return !filters.includes(item.text);
  });
  return shortcuts;
}


// 读取文件信息宽高
export function fileInfo(file) {
  return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = function (e) {
            const dataURL = e.target.result;
            // 创建一个 Image 对象
            const img = new Image();
            // 当图片加载完成时，获取图片的宽度和高度
            img.onload = function () {
                 const width = this.width;
                 const height = this.height;
                 resolve({ width, height });
            };
            // 设置图片的 src 为数据 URL
            img.src = dataURL;
       };
       // 读取文件
       reader.readAsDataURL(file);
  });
}

// 计算等比高度
export function getEqualHeight(width, height) {
  const num = (width / 720).toFixed(2);
  const eqHeight = parseInt(height / Number(num));
  return eqHeight;
}