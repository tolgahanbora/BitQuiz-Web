/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

const WalletModal = ({open,onClose}) => {
 

  return (
    <div>
    
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          role="presentation"
          onClick={onClose}
          onKeyDown={onClose}
          sx={{
            outline: 0,
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            position: 'relative',
          }}
        >
          <CloseIcon
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              cursor: 'pointer',
            }}
          />
          <h2 id="modal-modal-title">Lütfen önce cüzdanınızı bağlayınız</h2>
          <div id="modal-modal-description">
            <WalletMultiButton />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default WalletModal;
