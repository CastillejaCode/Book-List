import React, { useState } from "react";
import { useAddBookMutation } from "../../services/books";

const Form = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");

  const [addBook] = useAddBookMutation();

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      addBook({
        title,
        author,
        rating,
        review,
      });
    } catch (error) {
      console.log(error);
    }

    setTitle("");
    setAuthor("");
    setRating(0);
    setReview("");
  };

  return (
    <div>
      <form onSubmit={submitForm} className="flex flex-col items-start">
        <label htmlFor="title">
          title
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label htmlFor="author">
          author
          <input
            type="text"
            name="author"
            required
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
        <label htmlFor="rating">
          rating
          <input
            type="number"
            min={0}
            max={5}
            required
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
          />
        </label>
        <label htmlFor="review" className="flex flex-col items-start">
          review
          <textarea
            className="border border-gray-800"
            name="review"
            id="review"
            cols={30}
            rows={5}
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;
