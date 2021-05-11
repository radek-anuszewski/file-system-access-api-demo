const fileEditor = document.querySelector('#file-editor');
const loadFile = document.querySelector('#load-file-new-way');
const saveFileToCurrent = document.querySelector('#save-to-current');
const saveFileToNew = document.querySelector('#save-to-new');

const options = {
  excludeAcceptAllOption: true,
  types: [
    {
      description: 'Simple text files',
      accept: {
        'text/plain': ['.txt'],
      },
    },
  ],
};

let handler = null;

loadFile.addEventListener('click', async () => {
  [handler] = await window.showOpenFilePicker(options);
  const file = await handler.getFile();
  fileEditor.value = await file.text();
});

const saveFile = async handler => {
  const writable = await handler.createWritable();
  await writable.write(fileEditor.value);
  return writable.close();
}

saveFileToCurrent.addEventListener('click', async () => {
  await saveFile(handler);
});

saveFileToNew.addEventListener('click', async () => {
  const newHandler = await window.showSaveFilePicker(options);
  await saveFile(newHandler);
});
