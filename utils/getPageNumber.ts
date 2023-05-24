export const getPageNumber = (url: string) => {
  const regex = /\d+/;

  return regex.exec(url) as RegExpExecArray;
};
