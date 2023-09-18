import React, { useState } from 'react';
import { useQuery,useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Decimal from 'decimal.js/decimal';

const CREATE_TRANSFER_MUTATION = gql`
  mutation CreateTransfer(
    $amount: Decimal!
    $description: String!
    $movieId: Int!
  ) {
    createTransfer(
      data: {
        amount: $amount
        description: $description
        movieId: $movieId
      }
    ) {
      id
      amount
      description
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

const AddTransferForm = () => {
  const [formState, setFormState] = useState({
    amount: new Decimal(0.00),
    description: '',
    movieId: 0,
  });

  const [validationError, setValidationError] = useState(null);

  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MOVIES_QUERY);
  const [createTransfer] = useMutation(CREATE_TRANSFER_MUTATION, {
    onCompleted: () => {
      navigate('/admin');
    },
  });

  const handleAddTransfer = async (event) => {
    event.preventDefault();

    try {
    const decimalValue = new Decimal(formState.amount);

    if (decimalValue.isNaN() || decimalValue.isNegative()) {
        setValidationError("Please enter a valid amount in euros.");
        setTimeout(() => setValidationError(''), 3000);
        return;
      }

      if (!formState.description || formState.movieId === 0) {
        setValidationError("Please fill in all fields.");
        setTimeout(() => setValidationError(''), 3000);
        return;
      }

    createTransfer({
      variables: {
        amount: formState.amount,
        description: formState.description,
        movieId: formState.movieId,
      },
    });

    setFormState({
        amount: new Decimal(0.00),
        description: '',
        movieId: 0,
      });
    } catch (error) {
        // Handle errors related to Decimal parsing here
        console.error(error);
        setValidationError("An unexpected error occurred. Please try again.");
      }
  };

  return (
    <div className="new-transfer-container">
      <h3>Add a New Transfer</h3>
      <form data-cy="transfer-form" onSubmit={handleAddTransfer}>
        <div className="form-group">
          <input 
            type="number"
            step="0.01" 
            min="0" 
            placeholder="Transfer amount"
            value={formState.amount}
            onChange={(event) => {
                const newValue = event.target.value;
                  setFormState({
                    ...formState,
                    amount: newValue,
                  });
                  setValidationError(null); 
                }
            }
            />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            value={formState.description}
            onChange={(event) =>
              setFormState({
                ...formState,
                description: event.target.value,
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
            <option value="">Select Movie ID</option>
            {data?.movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.id}
                ({movie.title})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Transfer</button>
      </form>
      {validationError && <div className="error-message">{validationError}</div>}
    </div>
  );
};

export default AddTransferForm;
