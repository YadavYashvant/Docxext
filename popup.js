document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const viewerContainer = document.getElementById('viewerContainer');
  
    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target.result;
          viewerContainer.innerHTML = content;
        };
        reader.readAsText(file);
      }
    });
  });
  