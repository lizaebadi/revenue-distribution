import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import '../../styles.js/AddForm.css';

const CREATE_MOVIE_MUTATION = gql`
  mutation CreateMovie(
    $title: String!
  ) {
    createMovie(data: {title: $title}) {
      id
      title
    }
  }
`;

const AddMovieForm = () => {
  const [formState, setFormState] = useState({
    title: ''
  });

  const navigate = useNavigate(); 

  const [createMovie] = useMutation(CREATE_MOVIE_MUTATION, {
    onCompleted: (data) => {
      navigate('/admin');
    },
  });

  const handleAddMovie = async (event) => {
    event.preventDefault();

    createMovie({
      variables: {
        title: formState.title,
      },
    });
  };

  return (
    <div className="add-container">
      <h3>Add a New Movie</h3>
      <form
        onSubmit={handleAddMovie}
      >
        <div className="form-group">
          <input
            type="text"
            className="mb2"
            value={formState.title}
            onChange={(event) =>
              setFormState({
                ...formState,
                title: event.target.value
              })
            }
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
