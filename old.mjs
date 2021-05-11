const fileEditor = document.querySelector('#file-editor');

const fileName = document.querySelector('#file-name');
const saveButton = document.querySelector('#save');
const fileInput = document.querySelector('#file');

fileInput.addEventListener('change', async e => {
  const file = e.target.files[0];
  fileEditor.value = await file.text();
  fileName.innerHTML = file.name;
});
saveButton.addEventListener('click', () => {
  const a = document.createElement("a");
  const file = new Blob([fileEditor.value], {type: 'text/plain'});
  const href = URL.createObjectURL(file);
  a.href = href;
  a.download = fileName.innerHTML;
  a.click();
  URL.revokeObjectURL(href);
});
