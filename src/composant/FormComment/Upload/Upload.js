import React from 'react';
import {useDropzone} from 'react-dropzone';

function Upload(props) {
  console.log(props)
  const {getRootProps, acceptedFiles} = useDropzone();
  const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>)
  

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <p>Dropzone without click events</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
export default Upload 