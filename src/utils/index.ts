export const isArray = (data: any) => Array.isArray(data);

export const isEmptyArray = (data: any) => isArray(data) && !data.length;
