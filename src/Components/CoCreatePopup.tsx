import React, { useState } from 'react';
import './CoCreatePopupStyle.css';

interface CoCreatePopupProps {
  attestationId: string;
  onClose: () => void;
  onCoCreate: (ipfs: string, price: number, license: string) => void;
}

const CoCreatePopup: React.FC<CoCreatePopupProps> = ({ attestationId, onClose, onCoCreate }) => {
  const [ipfs, setIpfs] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [license, setLicense] = useState<string>('');

  const handleCoCreate = () => {
    // Perform any validation if needed
    // Then trigger the onCoCreate function with the input values
    onCoCreate(ipfs, price, license);

    // Close the popup after co-creating
    onClose();
  };

  return (
    <div className="popup">
      <h2>Co-create Popup</h2>
        <p>Derived from: {attestationId}</p>
      <label>
        IPFS:
        <input type="text" value={ipfs} onChange={(e) => setIpfs(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
      </label>
      <br />
      <label>
        License:
        <input type="text" value={license} onChange={(e) => setLicense(e.target.value)} />
      </label>
      <br />
      <button onClick={handleCoCreate}>Co-create</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CoCreatePopup;