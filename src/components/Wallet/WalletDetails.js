import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import '../../styles/WalletDetails.css'

const GET_WALLET_DATA = gql`
  query GetWalletData($shareholderID: Int!) {
    wallet(shareholderID: $shareholderID) {
      shareholder {
        id
        firstName
        lastName
        address
        iban
      }
      balance
      transfers {
        transfer {
          id
          amount
          description
        }
        amountPerShareholder
      }
    }
  }
`;

const WalletDetails = () => {
  const { id } = useParams();
  const [walletData, setWalletData] = useState(null);
  const { loading, error, data } = useQuery(GET_WALLET_DATA, {
    variables: { shareholderID: parseInt(id) },
  });

  useEffect(() => {
    if (data && data.wallet) {
      setWalletData(data.wallet);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!walletData) {
    return <p>No data available for this shareholder.</p>;
  }

  const shareholder = walletData.shareholder;
  const balance = walletData.balance;
  const transfers = walletData.transfers;
  const sortedTransfers = [...transfers].sort((a, b) => b.id - a.id);

  return (
    <div data-cy="wallet-container" className="wallet-container">
      <h2>Shareholder Details</h2>
      <p>
        Name: {shareholder.firstName} {shareholder.lastName}
      </p>
      <p>Address: {shareholder.address}</p>
      <p>IBAN: {shareholder.iban}</p>
      <h2>Current Balance</h2>
      <p>Balance: €{balance} </p>
      <h2>Transfers</h2>
      {sortedTransfers.map((transfer) => (
        <p key={transfer.transfer.id}>
          Amount: €{transfer.transfer.amount} Description:{" "}
          {transfer.transfer.description}
        </p>
      ))}
      <Link to="/wallet">Back to Wallet Selection</Link>
    </div>
  );
};

export default WalletDetails;
