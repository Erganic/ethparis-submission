import React from 'react';
import './Header.css'; // You can create a separate CSS file for styling if needed
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="centered-text">Erganism</div>
      <div className="connect-button-container">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;