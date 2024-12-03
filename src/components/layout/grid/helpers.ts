const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

/**
 * 
 * @param data 
 * @returns 
 */
export function addNameSpace (data:string) {
    if (data.indexOf(`http://www.w3.org/2000/svg`) < 0) {
      data = data.replace(/<svg/g, `<svg xmlns='http://www.w3.org/2000/svg'`);
    }
  
    return data;
}

/**
 * 
 * @param data 
 * @returns 
 */
export function encodeSVG (data:string) {
    // Use single quotes instead of double to avoid encoding.
    data = data.replace(/"/g, `'`);
    // if (externalQuotesValue === `double`) {
    //   data = data.replace(/"/g, `'`);
    // } else {
    //   data = data.replace(/'/g, `"`);
    // }
  
    data = data.replace(/>\s{1,}</g, `><`);
    data = data.replace(/\s{2,}/g, ` `);

    // Using encodeURIComponent() as replacement function
    // allows to keep result code readable
    return data.replace(symbols, encodeURIComponent);
  }