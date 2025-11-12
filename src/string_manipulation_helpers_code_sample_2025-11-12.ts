namespace StringUtils {
  export const capitalize = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  export const reverse = (str: string): string => {
    return str.split("").reverse().join("");
  };

  export const truncate = (str: string, maxLength: number, suffix = "..."): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + suffix;
  };

  export const slugify = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  export const padLeft = (str: string, length: number, char = " "): string => {
    return char.repeat(Math.max(0, length - str.length)) + str;
  };

  export const padRight = (str: string, length: number, char = " "): string => {
    return str + char.repeat(Math.max(0, length - str.length));
  };

  export const countOccurrences = (str: string, substring: string): number => {
    let count = 0;
    let position = 0;
    while ((position = str.indexOf(substring, position)) !== -1) {
      ++count;
      position += substring.length;
    }
    return count;
  };

  export const isPalindrome = (str: string): boolean => {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversedStr = cleanStr.split("").reverse().join("");
    return cleanStr === reversedStr;
  };
}

export default StringUtils;