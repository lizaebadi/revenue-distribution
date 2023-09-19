import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import '../../styles.js/AddForm.css';

const CREATE_SHAREHOLDER_MUTATION = gql`
  mutation CreateShareholder(
    $firstName: String!
    $lastName: String!
    $address: String!
    $iban: String!
    $movieId: Int!
  ) {
    createShareholder(
      data: {
        firstName: $firstName
        lastName: $lastName
        address: $address
        iban: $iban
        movieId: $movieId
      }
    ) {
      id
      firstName
      lastName
    }
  }
`;

const GET_MOVIES_QUERY = gql`
  query GetMovies {
    movies {
      id
      title
    }
  }
`;


const AddShareholderForm = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    address: '',
    iban: '',
    movieId: 0,
  });

  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MOVIES_QUERY);
  const [createShareholder] = useMutation(CREATE_SHAREHOLDER_MUTATION, {
    onCompleted: () => {
      navigate('/admin');
    },
  });

  const handleAddShareholder = async (event) => {
    event.preventDefault();

    createShareholder({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        address: formState.address,
        iban: formState.iban,
        movieId: formState.movieId,
      },
    });
  };

  return (
    <div className="add-container">
      <h3>Add a New Shareholder</h3>
      <form onSubmit={handleAddShareholder}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            value={formState.firstName}
            onChange={(event) =>
              setFormState({
                ...formState,
                firstName: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            value={formState.lastName}
            onChange={(event) =>
              setFormState({
                ...formState,
                lastName: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Address"
            value={formState.address}
            onChange={(event) =>
              setFormState({
                ...formState,
                address: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="IBAN"
            value={formState.iban}
            onChange={(event) =>
              setFormState({
                ...formState,
                iban: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <select
            value={formState.movieId}
            onChange={(event) =>
              setFormState({
                ...formState,
                movieId: parseInt(event.target.value),
              })
            }
          >
            <option value="">Movie ID</option>
            {data.movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.id }
                ({movie.title})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Shareholder</button>
      </form>
    </div>
  );
};

export default AddShareholderForm;
