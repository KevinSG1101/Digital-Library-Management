import { Route, Routes, useNavigate } from "react-router-dom";
import AddBook from "../AddBook/AddBook";
import BookList from "../BookList/BookList";
import Genre from "../Genre/Genre";
import Header from "../Header/Header";
import "./Book.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Book() {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState("");
  const [addBookModal, setAddBookModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBookDetails, setEditBookDetails] = useState({});

  const showBooks = () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get("http://localhost:9000/books/getBooks", config)
      .then((response) => {
        setBooks(response.data);
        console.log(response);
      });
  };

  useEffect(() => {
    showBooks();
  }, []);

  const searchBooks = (e) => {
    setFilterBooks(e.target.value);
  };

  const handleSearch = () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get("http://localhost:9000/books/searchBooks/" + filterBooks, config)
      .then((response) => {
        setBooks(response.data);
      });
  };

  const editBook = (book) => {
    setAddBookModal(true);
    setEditBookDetails(book);
    console.log(book);
  };

  return (
    <div>
      <Header></Header>
      <Genre></Genre>

      <div className="book-content">
        <div className="book-header">
          <div className="book-search">
            <input
              className="book-search-bar"
              placeholder="Search For Books"
              name="searchBar"
              onChange={(e) => {
                searchBooks(e);
              }}
            ></input>
            <button className="book-search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <button
            onClick={() => {
              setAddBookModal(true);
              setEditBookDetails({});

            }}
            className="book-add-button"
          >
            Add Books
          </button>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                books={books}
                showBooks={showBooks}
                addBookModal={addBookModal}
                setAddBookModal={setAddBookModal}
                editBook={editBook}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
          {/* <Route path="/add" element={<AddBook />} /> */}
        </Routes>
        <AddBook
          showBooks={showBooks}
          addBookModal={addBookModal}
          setAddBookModal={setAddBookModal}
          editBookDetails={editBookDetails}
          setIsModalOpen={setIsModalOpen}
          setEditBookDetails={setEditBookDetails}
        />
      </div>
    </div>
  );
}

export default Book;
