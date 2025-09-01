import "./Genre.css";
import { ReactComponent as Books } from "../assets/Book.svg";

function Genre() {
  return (
    <div className="genre">
      <div className="buttons-wrapper">
        <button className="genre-button">
          <Books className="book-logo" />
          Horror
        </button>
        <button className="genre-button">
          <Books className="book-logo" /> Comedy
        </button>
        <button className="genre-button">
          <Books className="book-logo" /> Fantasy
        </button>
      </div>
    </div>
  );
}

export default Genre;
