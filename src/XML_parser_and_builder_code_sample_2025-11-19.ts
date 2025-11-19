import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const xmlData = `<root><element attr="value">Text</element><element>Another</element></root>`;

const parser = new XMLParser({ ignoreAttributes: false });
const parsedXml = parser.parse(xmlData);

interface XmlObject {
    root: {
        element: ({ attr: string; '#text': string } | string)[];
    };
}

const data: XmlObject = parsedXml as XmlObject;

data.root.element.push({ attr: 'new', '#text': 'Added' });

const builder = new XMLBuilder({ format: true, ignoreAttributes: false });
const newXml = builder.build(data);

console.log(newXml);