const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;

async function loadXml() {
  if (xml == undefined) {
    let response = await fetch(
      "http://localhost:8888/library-data.kml",
      {
        method: "get",
        headers: {
          "Content-type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadLibraries() {
  xmldocument = await loadXml(); //retrieve the XML DOM document
  return xmldocument.querySelectorAll("Placemark");

}
async function getLibraryById(id) {
  xmldocument = await loadXml(); //XML DOM document
  return xmldocument.getElementById(id);
}

module.exports = {
  loadLibraries,
  getLibraryById
};