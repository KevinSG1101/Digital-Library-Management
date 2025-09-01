import axios from "axios";
import "./BookList.css";
import { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import Swal from "sweetalert2";

function BookList(props) {
  const [showOneBook, setShowOneBook] = useState({});

  function deleteBook(bookTitle) {
    props.setIsModalOpen(false);

    Swal.fire({
      position: "top-end",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };

        axios
          .delete("http://localhost:9000/books/deleteBook/" + bookTitle, config)
          .then((response) => {
            Swal.fire({
              position: "top-end",
              title: "Deleted!",
              text: "Your book has been deleted.",
              icon: "success",
            });
            // Refresh book list
            props.showBooks();
          });
      }
    });
  }

  const bookDetails = (book) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get("http://localhost:9000/books/getOneBook/" + book.bookTitle, config)
      .then((response) => {
        // console.log(response);
        setShowOneBook(response.data);
        props.setIsModalOpen(true);
        console.log(showOneBook);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #42e46d",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div className="book-list">
        <h2>BOOKS</h2>
        <div className="book-container">
          {props.books.map((book) => {
            return (
              <div className="book-wrapper">
                <img
                  className="book-img"
                  src={book.bookImage}
                  alt={book.booktTitle}
                  onClick={() => {
                    bookDetails(book);
                  }}
                ></img>
              </div>
            );
          })}
        </div>
        <Modal
          open={props.isModalOpen}
          onClose={() => {
            props.setIsModalOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p>
              <strong>Title:</strong>
              {showOneBook.bookTitle}
            </p>
            <p>
              <strong>Author:</strong>
              {showOneBook.Author}
            </p>
            <p>
              <strong>Price:</strong>
              {showOneBook.Price}
            </p>
            <p>
              <strong>Genre:</strong>
              {showOneBook.Genre}
            </p>
            <div className="show-book-modal-button-wrapper">
              <button
                className="show-book-modal-button"
                onClick={() => {
                  props.editBook(showOneBook);
                }}
              >
                Edit
              </button>
              <button
                className="show-book-modal-button"
                onClick={() => deleteBook(showOneBook.bookTitle)}
              >
                Delete
              </button>

              <button
                className="show-book-modal-button"
                onClick={() => {
                  props.setIsModalOpen(false);
                }}
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

export default BookList;
