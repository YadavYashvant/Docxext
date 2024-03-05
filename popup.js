document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const viewerContainer = document.getElementById('viewerContainer');

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;
        parseDOCX(content);
      };
      reader.readAsArrayBuffer(file);
    }
  });

  function parseDOCX(data) {
    JSZip.loadAsync(data).then(function(zip) {
      const xmlContent = zip.file("word/document.xml").async("string");
      return xmlContent;
    }).then(function(xml) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");
      const textContent = xmlDoc.getElementsByTagName("w:t")[0].textContent;
      viewerContainer.innerText = textContent;
    }).catch(function(err) {
      console.error(err);
      viewerContainer.innerText = "Error parsing DOCX file.";
    });
  }
});
