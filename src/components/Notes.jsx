import React, { useState } from "react";
import { MdSearch, MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
function Notes() {
  const [notes, setNotes] = useState({ id: randomGen(), body: "" });
  const [searchValue, setSearchValue] = useState("");
  function randomGen() {
    return Math.floor(Math.random() * 1000);
  }
  const handleChange = (e) => {
    setNotes((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = () => {
    if (notes.body !== "") {
      let myObj = { id: randomGen(), body: notes.body };
      let old_data = JSON.parse(localStorage.getItem("notes")) || [];
      old_data.push(myObj);
      localStorage.setItem("notes", JSON.stringify(old_data));
      setNotes({
        body: "",
      });
    } else {
      alert("please insert some data");
    }
  };
  const handleDelete = (id) => {
    // let old_data = JSON.parse(localStorage.getItem("notes")) || [];
    // var index;
    // for (var i = 0; i < old_data.length; i++) {
    //   if (old_data[i].id === id) {
    //     index = i;
    //     break;
    //   }
    // }
    // if (index === undefined) return;
    // old_data.splice(index, 1);
    // localStorage.setItem("notes", JSON.stringify(old_data));
  };
  return (
    <div className="container">
      <div className="header">
        <h1>Notes</h1>
      </div>
      <div className="search">
        <MdSearch className="search-icons" size="1.3em" />
        <input
          type="text"
          placeholder="search-notes"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="notes-list">
        {JSON.parse(localStorage.getItem("notes"))
          ? JSON.parse(localStorage.getItem("notes"))
              .filter((note) => {
                if (searchValue === "") {
                  return note;
                } else if (
                  note.body.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return note;
                }
              })
              .map((note) => (
                <div className="note">
                  {note.body}
                  <div className="note-footer">
                    <MdDeleteForever
                      className="delete-icon"
                      size="1.3em"
                      onClick={handleDelete(note.id)}
                    />
                    <GrUpdate className="update-icon" />
                  </div>
                </div>
              ))
          : ""}
      </div>
      <br />
      <div className="note new">
        <textarea
          rows="8"
          cols="10"
          placeholder="Type to add a note"
          name="body"
          value={notes.body}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        ></textarea>
        <div className="note-footer">
          <button className="save" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notes;
