import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { editGoalThunk } from "../../../store/goals";
import { editTaskThunk } from "../../../store/tasks";
import "./Notes.css";

const quillRef = React.createRef(null);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      [{ direction: "rtl" }],
      ["link", "image", "video"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["code-block", "formula"],
      ["clean"],
    ],
    handlers: {
      image: async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          const file = input.files[0];
          const data = new FormData();
          data.append("image", file);
          const res = await fetch("/api/images", {
            method: "POST",
            body: data,
          });
          const responseData = await res.json();
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            const url = responseData.image_url;
            quill.focus();
            quill.insertEmbed(range.index, "image", url, "user");
          }

          // const quillEditor = quillRef.current?.getEditor();
          // if (quillEditor) {
          //   const range = quillEditor.getSelection(true);
          //   if (range) {
          //     const url = responseData.image_url;
          //     quillRef.current.getEditor().focus();
          //     quillRef.current
          //       .getEditor()
          //       .insertEmbed(range.index, "image", url, "user");
          //   }
          // }
        };
      },
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "script",
  "direction",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
  "code-block",
  "formula",
];

export default function Notes({ taskBool, item }) {
  const [value, setValue] = useState(item?.notes || "");
  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();
    console.log("checking OG item", item);
    const newItem = {
      ...item,
      notes: value,
      completed: item.completed ? true : false,
    };
    console.log("checking new item", newItem);

    if (taskBool) {
      dispatch(editTaskThunk(newItem, newItem.id));
    } else {
      dispatch(editGoalThunk(newItem, newItem.id));
    }
  };

  return (
    <div className="note-page-container">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={(val) => setValue(val)}
        modules={modules}
        formats={formats}
        className={"react-quil"}
        placeholder={"Write a note here..."}
      />
      <button className="note-section-save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
