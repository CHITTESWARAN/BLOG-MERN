import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const Editor = ({value,onChange}) => {
    
const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['clean'] // Button to clear formatting
    ]
  };
  

  return (
    <ReactQuill
          placeholder="Write your post here..."
          value={value}
          theme={"snow"}
          modules={modules}
          onChange={onChange}
          className="min-h-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
  )
}

export default Editor
