export const keyBy = (items, key) => {
  const result = {};

  items.forEach((item) => {
    const keyValue = item[key];

    result[keyValue] = item;
  });

  return result;
};

export const sort = (items, sortState) => {
  const { key, direction } = sortState;

  return items.sort((a, b) => {
    let valueA = key ? a[key] : a;
    let valueB = key ? b[key] : b;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.charCodeAt();
      valueB = valueB.charCodeAt();
    }

    return direction === 'asc' ? valueA - valueB : valueB - valueA;
  });
};
