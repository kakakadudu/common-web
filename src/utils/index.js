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
