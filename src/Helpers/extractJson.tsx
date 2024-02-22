export function extractJson(data: any) {
  const startTag = "START_JSON";
  const endTag = "END_JSON";

  const startIndex = data.indexOf(startTag);
  const endIndex = data.indexOf(endTag);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    // Tags not found or in the wrong order
    return null;
  }

  const jsonString = data
    .substring(startIndex + startTag.length, endIndex)
    .trim();

  try {
    const jsonData = JSON.parse(jsonString);
    return jsonData;
  } catch (error) {
    // JSON parsing error
    // console.error("Error parsing JSON:", error);
    return null;
  }
}
function convertSingleToDoubleQuotes(jsonString: any) {
  // Replace single quotes with double quotes
  const doubleQuotedString = jsonString.replace(/'/g, '"');
  return doubleQuotedString;
}

export function extractArray(input: any) {
  const inputString = input.replace(/\n/g, "");
  const startIndex = inputString.indexOf("[");
  const endIndex = inputString.lastIndexOf("]");
  const startTag = "START_JSON";
  const endTag = "END_JSON";
  const startIndexTag = inputString.indexOf("START_JSON");
  const endIndexTag = inputString.indexOf("END_JSON");

  // Check if END_JSON is present
  if (endIndexTag === -1) {
    // END_JSON is not present, so extract array from START_JSON
    const startTagLength = "START_JSON".length;
    const jsonArrayString = inputString
      .substring(startIndexTag + startTagLength)
      .trim();

    // Remove everything after the last comma
    // const lastCommaIndex = jsonArrayString.lastIndexOf("),");

    // const trimmedArray = jsonArrayString.substring(0, lastCommaIndex);
    // const arrayWithoutParentheses = trimmedArray.replace(/\(|\)/g, "");
    // Remove everything after the last comma
    let lastCommaIndex = jsonArrayString.lastIndexOf("),");

    let trimmedArray = "";
    let arrayWithoutParentheses = "";
    if (lastCommaIndex !== -1) {
      trimmedArray = jsonArrayString.substring(0, lastCommaIndex);

      arrayWithoutParentheses = trimmedArray.replace(/\(|\)/g, "");
    } else {
      lastCommaIndex = jsonArrayString.lastIndexOf("},");
      trimmedArray = jsonArrayString.substring(0, lastCommaIndex);
      arrayWithoutParentheses = trimmedArray.replace(/\(|\)/g, "");
    }

    // Add a closing square bracket at the end
    const finalArrayString = arrayWithoutParentheses + "}]";

    try {
      const jsonary = convertSingleToDoubleQuotes(finalArrayString);

      const jsonArray = JSON.parse(jsonary);
      return jsonArray;
    } catch (error) {
      console.log("error", error);
      // Handle parsing error if needed
      return null;
    }
  }
  // if (endIndexTag === -1) {
  //   // END_JSON is not present, so extract array from START_JSON
  //   const startTagLength = "START_JSON".length;
  //   const jsonArrayString = inputString
  //     .substring(startIndexTag + startTagLength)
  //     .trim();

  //   // Remove everything after the last comma
  //   const lastCommaIndex = jsonArrayString.lastIndexOf(",");

  //   const trimmedArray = jsonArrayString.substring(0, lastCommaIndex);

  //   // Add a closing square bracket at the end
  //   const finalArrayString = trimmedArray + "]";

  //   try {
  //     const jsonary = convertSingleToDoubleQuotes(finalArrayString);

  //     const jsonArray = JSON.parse(jsonary);
  //     return jsonArray;
  //   } catch (error) {
  //     // console.log("error", error);
  //     // Handle parsing error if needed
  //     return null;
  //   }
  // }

  // Extract the JSON array substring
  const jsonArrayString = inputString.substring(startIndex, endIndex + 1);

  // Parse the JSON array string to get the JavaScript array
  try {
    const jsonary = convertSingleToDoubleQuotes(jsonArrayString);
    const jsonArray = JSON.parse(jsonary);
    return jsonArray;
  } catch (error) {
    const startIndex = inputString.indexOf(startTag);
    const endIndex = inputString.indexOf(endTag);

    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
      // Tags not found or in the wrong order
      return null;
    }
    const jsonString = inputString
      .substring(startIndex + startTag.length, endIndex)
      .trim();
    return jsonString;
  }
}

export function extractStringsBeforeAfter(inputText: any) {
  const startIndex = inputText.indexOf("START_JSON");
  const endIndex = inputText.indexOf("END_JSON");

  if (startIndex !== -1 && endIndex !== -1) {
    // Extract the string before "START_JSON" and after "END_JSON"
    const beforeStart = inputText.substring(0, startIndex);
    const afterEnd = inputText.substring(endIndex + "END_JSON".length);

    return {
      beforeStart,
      afterEnd,
    };
  } else if (startIndex !== -1 && endIndex == -1) {
    const beforeStart = inputText.substring(0, startIndex);

    return {
      beforeStart: beforeStart,
      afterEnd: "",
    };
  } else {
    // If "START_JSON" or "END_JSON" is not found, return the original text
    return {
      beforeStart: inputText,
      afterEnd: "",
    };
  }
}
