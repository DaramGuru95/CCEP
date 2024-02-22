export function htmlTableToJson(html: any) {
  // const doc: any = new DOMParser()?.parseFromString(html, "text/html");
  // const table: any = doc.querySelector("table");
  // const headings = Array.from(table.querySelectorAll("th")).map((th: any) =>
  //   th.textContent.trim()
  // );
  // const rows: any = Array.from(table.querySelectorAll("tr")).slice(1); // Exclude the header row

  // const data = rows.map((row: any) => {
  //   const rowData = Array.from(row.querySelectorAll("td")).map((td: any) =>
  //     td.textContent.trim()
  //   );
  //   const entry: any = {};
  //   headings.forEach((heading, index) => {
  //     entry[heading] = rowData[index];
  //   });
  //   return entry;
  // });

  // return data;
  const doc: any = new DOMParser().parseFromString(html, "text/html");
  const table = doc.querySelector("table");

  if (!table) {
    // console.error("Table element not found in the HTML string.");
    return null;
  }

  const headings: any = Array.from(table.querySelectorAll("th")).map(
    (th: any) => th.textContent.trim()
  );
  const rows: any = Array.from(table.querySelectorAll("tr")).slice(1); // Exclude the header row

  const headingObject = { headings };

  const data: any = rows.map((row: any) => {
    const rowData: any = Array.from(row.querySelectorAll("td")).map((td: any) =>
      td.textContent.trim()
    );
    const entry: any = {};
    headings.forEach((heading: any, index: any) => {
      entry[heading] = rowData[index];
    });
    return entry;
  });

  return { headings: headingObject, rows: data };
}
