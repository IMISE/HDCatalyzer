/*Copyright (C) 2024 European Union

 __

Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the

European Commission – subsequent versions of the EUPL (the “Licence”);

You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:

*

https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

*

Unless required by applicable law or agreed to in writing, software distributed under

the Licence is distributed on an “AS IS” basis, WITHOUT WARRANTIES OR CONDITIONS

OF ANY KIND, either express or implied. See the Licence for the specific language

governing permissions and limitations under the Licence.*/

/**
 * Transform a JSON-LD document into Turtle format.
 * @param jsonLd - The JSON-LD document to convert.
 * @returns A Promise that resolves to the Turtle representation of the document.
 */
export async function jsonLdToTurtle(jsonLd: JsonLdObj): Promise<string> {
  // Expand & convert to RDF in n-quads form
  const nQuads = await jsonld.toRDF(jsonLd, { format: 'application/n-quads' });

  // Parse the n-quads into quads
  const parser = new Parser({ format: 'N-Quads' });
  const quads = parser.parse(nQuads as string);

  // Serialize the quads to Turtle format, using the prefixes from the JSON-LD context
  const writer = new Writer({ prefixes: jsonLd['@context'] });
  return new Promise((resolve, reject) => {
    writer.addQuads(quads);
    writer.end((err?: Error, result?: string) => (err ? reject(err) : resolve(result ?? '')));
  });
}

/**
 * Transform a JSON-LD document into N-Triples format.
 * @param jsonLd - The JSON-LD document to convert.
 * @returns A Promise that resolves to the N-Triples representation of the document.
 */
export async function jsonLdToNTriples(jsonLd: JsonLdObj): Promise<string> {
  // Expand & convert to RDF in n-quads form
  const nQuads = await jsonld.toRDF(jsonLd, { format: 'application/n-quads' });

  // Parse the n-quads into quads
  const parser = new Parser({ format: 'N-Quads' });
  const quads = parser.parse(nQuads as string);

  // Serialize the quads to N-Triples format
  const writer = new Writer({ format: 'N-Triples' });
  return new Promise((resolve, reject) => {
    writer.addQuads(quads);
    writer.end((err?: Error, result?: string) => (err ? reject(err) : resolve(result ?? '')));
  });
}

/**
 * Transform a JSON-LD document into RDF/XML format.
 * @param jsonLd - The JSON-LD document to convert.
 * @param url - The URL of the service that converts JSON-LD to RDF/XML.
 * @returns A Promise that resolves to the RDF/XML representation of the document.
 */
export async function jsonLdToRdfXml(jsonLd: JsonLdObj, url: string): Promise<string> {
  return axios
    .post<string>(url, jsonLd, { headers: { 'Content-Type': 'application/ld+json' } })
    .then((res) => res.data);
}

/**
 * Triggers a browser download.
 * @param filename The name of the file to download.
 * @param content The content of the file.
 * @param mime The MIME type of the file. Defaults to 'text/plain'.
 */
export function downloadTextFile(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
