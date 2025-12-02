// web-scraping-helpers.ts

/**
 * Extracts text content from a single HTML element.
 * @param element The HTML element to extract text from.
 * @returns The extracted text content, or null if the element is null.
 */
export const extractText = (element: Element | null): string | null => {
  if (!element) {
    return null;
  }
  return element.textContent ? element.textContent.trim() : null;
};

/**
 * Extracts the value of a specific attribute from an HTML element.
 * @param element The HTML element to extract the attribute from.
 * @param attributeName The name of the attribute to extract.
 * @returns The attribute value, or null if the element or attribute is not found.
 */
export const extractAttribute = (element: Element | null, attributeName: string): string | null => {
  if (!element) {
    return null;
  }
  return element.getAttribute(attributeName);
};

/**
 * Fetches and parses HTML content from a given URL.
 * @param url The URL to fetch.
 * @returns The parsed DOM as a Document, or null if fetching fails.
 */
export const fetchAndParseHTML = async (url: string): Promise<Document | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return null;
    }
    const htmlText = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(htmlText, 'text/html');
  } catch (error) {
    console.error(`Error fetching or parsing ${url}:`, error);
    return null;
  }
};

/**
 * Selects multiple elements from a DOM using a CSS selector.
 * @param document The DOM to search within.
 * @param selector The CSS selector to use.
 * @returns An array of selected HTML elements.
 */
export const selectElements = (document: Document | null, selector: string): Element[] => {
    if (!document) {
        return [];
    }
    return Array.from(document.querySelectorAll(selector));
};

/**
 *  Selects a single element from a DOM using a CSS selector.
 * @param document The DOM to search within.
 * @param selector The CSS selector to use.
 * @returns A single element.
 */
export const selectElement = (document: Document | null, selector: string): Element | null => {
    if (!document) {
        return null;
    }
    return document.querySelector(selector);
};