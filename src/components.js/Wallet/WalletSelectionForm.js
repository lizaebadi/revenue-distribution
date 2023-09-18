import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

const GET_SHAREHOLDERS = gql`
  query GetShareholders {
    shareholders {
      id
      firstName
      lastName
    }
  }
`;

const WalletSelectionForm = () => {
  const [selectedID, setSelectedID] = useState(""); 
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_SHAREHOLDERS);

  useEffect(() => {
    if (data && data.shareholders && data.shareholders.length > 0 ) {
      setSelectedID(data.shareholders[0].id);
    }
  }, [data]);

  const handleSelect = (event) => {
    setSelectedID(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedID) {
      navigate(`/wallet/${selectedID}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Wallet</h1>
      {data.shareholders.length === 0 ? (
        <>
          <p>No shareholders available</p>
          <li><Link to="/admin">Admin View</Link></li>
        </>
    ) : (
      <form onSubmit={handleSubmit}>
        <label>
          View Shareholder Wallet:
          <select value={selectedID} onChange={handleSelect}>
            {data.shareholders.map((shareholder) => (
              <option key={shareholder.id} value={shareholder.id}>
                {shareholder.firstName} {shareholder.lastName} (ID: {shareholder.id})
              </option>
            ))}
          </select>
        </label>
        <button type="submit">View Wallet</button>
      </form>
    )}
    </div>
  );
};

export default WalletSelectionForm;
