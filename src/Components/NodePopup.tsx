import React, { useState, useEffect } from 'react'
import './NodePopupStyle.css'
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { ethers } from 'ethers';





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
            <p>Node ID: {attestationDetails.id}</p>
            <p>Attester: {attestationDetails.attester}</p>
            <p>License: {licenseValue}</p>
            <p>IPFS: {ipfsValue}</p>
            <p>Price: {ethers.utils.formatEther(priceValueHex)}</p>


            <p>This is the content of the popup.</p>
            <button onClick={onClose}>Close</button>
        </div>
  );
};

export default NodePopup;