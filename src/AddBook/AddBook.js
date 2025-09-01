import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import Swal from "sweetalert2";
import "./AddBook.css";

function AddBook(props) {
  const [booksData, setBooksData] = useState({});

  const handleForm = (e) => {
    console.log(e);
    setBooksData((booksData) => ({
      ...booksData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = (e) => {
    setBooksData((booksData) => ({
      ...booksData,
      bookImage: e.target.files[0],
    }));
  };

  const saveBook = () => {
    const bookFormData = new FormData();
    bookFormData.set("bookId", booksData.bookId);
    bookFormData.set("Author", booksData.Author);
    bookFormData.set("Genre", booksData.Genre);
    bookFormData.set("Price", booksData.Price);
    bookFormData.set("bookTitle", booksData.bookTitle);
    bookFormData.set("bookImage", booksData.bookImage);
    console.log(bookFormData);
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    if (props.editBookDetails.bookTitle) {
      axios
        .put(
          "http://localhost:9000/books/updateBook/" + booksData.bookTitle,
          bookFormData,
          config
        )
        .then((response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Book has been Edited",
            showConfirmButton: false,
            timer: 2000,
          });
          console.log(response);
          props.setAddBookModal(false);
          props.setIsModalOpen(false);
          setBooksData({});
          props.setEditBookDetails({});
        });
    } else {
      axios
        .post("http://localhost:9000/books/addBooks", bookFormData, config)
        .then((response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Book has been Added",
            showConfirmButton: false,
            timer: 2000,
          });
          console.log(response);
          props.showBooks();
          props.setAddBookModal(false);
          props.setEditBookDetails({});
        });
    }
  };

  useEffect(() => {
    if (props.editBookDetails.bookTitle) {
      setBooksData(props.editBookDetails);
      console.log(props.editBookDetails);
    }
  }, [props.editBookDetails]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div>
        <Modal
          open={props.addBookModal}
          onClose={() => props.setAddBookModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="add-modal-title">
              {props.editBookDetails.bookTitle ? (
                <p>Edit Book</p>
              ) : (
                <p>Add Book</p>
              )}
            </div>
            <p>
              <input
                className="add-modal-inputs"
                type="text"
                onChange={handleForm}
                name="bookId"
                value={booksData.bookId ?? ""}
                placeholder="Book ID"
              />
            </p>
            <p>
              <input
                className="add-modal-inputs"
                type="text"
                onChange={handleForm}
                name="bookTitle"
                value={booksData.bookTitle ?? ""}
                placeholder="Book Name"
              />
            </p>
            <p>
              <input
                className="add-modal-inputs"
                type="text"
                onChange={handleForm}
                name="Author"
                value={booksData.Author ?? ""}
                placeholder="Author"
              />
            </p>
            <p>
              <input
                className="add-modal-inputs"
                type="text"
                onChange={handleForm}
                name="Genre"
                value={booksData.Genre ?? ""}
                placeholder="Genre"
              />
            </p>
            <p>
              <input
                className="add-modal-inputs"
                type="text"
                onChange={handleForm}
                name="Price"
                value={booksData.Price ?? ""}
                placeholder="Price"
              />
            </p>

            {props.editBookDetails.bookTitle ? (
              ""
            ) : (
              <p>
                <strong>Upload a Cover</strong>:
                <input type="file" onChange={handleUpload} name="bookImage" />
              </p>
            )}
            <div className="add-modal-button-Wrapper">
              <button
                className="add-modal-buttons"
                onClick={() => {
                  saveBook();
                }}
                type="button"
              >
                Save
              </button>
              <button
                className="add-modal-buttons"
                onClick={() => {
                  props.setAddBookModal(false);
                }}
                type="button"
              >
                Close
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default AddBook;
