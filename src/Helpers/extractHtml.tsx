export const extractHtmlAndString = (inputString: any) => {
  // Find the index of the start and end of the HTML content
  const startIndex = inputString.indexOf("<html>");
  const endIndex = inputString.indexOf("</html>") + "</html>".length;

  // Extract the HTML content
  const html = inputString.substring(startIndex, endIndex);

  // Extract the string before and after the HTML content
  const stringBeforeHtml = inputString.substring(0, startIndex);
  const stringAfterHtml = inputString.substring(endIndex);

  return { stringBeforeHtml, html, stringAfterHtml };
};
