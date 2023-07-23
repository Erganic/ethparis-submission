import React, { useState, useEffect } from 'react'
import './NodePopupStyle.css'
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import CoCreatePopup from './CoCreatePopup';

interface PopupProps {
    node: any
    attestationId: string
    onClose: () => void
}

const NodePopup: React.FC<PopupProps> = ({ node, attestationId, onClose }) => {
    const client = new ApolloClient({
        uri: 'https://sepolia.easscan.org/graphql',
        cache: new InMemoryCache(),
    })

    const [attestationDetails, setAttestationDetails] = useState<any>(null);
    const schema = '0x9ab3b6006c32f73b4993c5ca330403c802f52745ecc58eecd0869db7c2b2810c'

    const [coCreatePopupOpen, setCoCreatePopupOpen] = useState(false);

    const handleCoCreateClick = () => {
      setCoCreatePopupOpen(true);
    };

    const handleCoCreateClose = () => {
      setCoCreatePopupOpen(false);
    };

    const handleCoCreate = (ipfs: string, price: number, license: string) => {
      // Do something with the input values here, e.g., save them or perform an action
      console.log('IPFS:', ipfs);
      console.log('Price:', price);
      console.log('License:', license);
      // You can also access attestationDetails.id here
  
      // Close the popup after co-creating (if needed)
      setCoCreatePopupOpen(false);
    };

    const ATTESTATION_QUERY = gql`
    query Query($where: AttestationWhereInput) {
        attestations(where: $where) {
          id
          schemaId
          attester
          recipient
          decodedDataJson
        }
      }`

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await client.query({
              query: ATTESTATION_QUERY,
              variables: { where: { id: { equals: attestationId } } },
            });
    
            if (data && data.attestations) {
              setAttestationDetails(data.attestations[0]);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [client, attestationId]);
    
      // Handle loading state
      if (!attestationDetails) {
        return <div>Loading...</div>;
      }

      
      const decodedData: { name: string; value: { value: any } }[] = JSON.parse(attestationDetails.decodedDataJson);
      const priceValueHex = decodedData.find((item) => item.name === 'price')?.value?.value?.hex;
      const ipfsValue = decodedData.find((item) => item.name === 'ipfs')?.value?.value;
      const licenseValue = decodedData.find((item) => item.name === 'license')?.value?.value;

    return (
        <div className="popup">
            <h2>Node details</h2>
            <img src={ipfsValue} alt="IPFS Image" />
            <p>Node ID: {attestationDetails.id}</p>
            <p>Attester: {attestationDetails.attester}</p>
            <p>License: {licenseValue}</p>
            <p>Price: {ethers.utils.formatEther(priceValueHex)}</p>


            <p>This is the content of the popup.</p>
            
            <button>Buy license</button>
            <button onClick={handleCoCreateClick}>Co-create</button>
            <button onClick={onClose}>Close</button>
            {coCreatePopupOpen && (
              <div className="popup-overlay">
                <CoCreatePopup attestationId={attestationId} onClose={handleCoCreateClose} onCoCreate={handleCoCreate} />
              </div>
            )}
        </div>
  );
};

export default NodePopup;