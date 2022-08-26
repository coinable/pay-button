import React, { forwardRef } from 'react';
import Solana from './Solana';

import { CoinablePayButtonProps } from './types';

import './styles.scss';

const CoianblePayButton = forwardRef<HTMLButtonElement, CoinablePayButtonProps>(
  ({ children = 'Pay', ...props }, ref) => {
    return (
      <button ref={ref} className="coinable-pay-button" {...props}>
        <div className="coinable-pay-button-content">
          <Solana />
          {children}
        </div>
      </button>
    );
  }
);

CoianblePayButton.displayName = 'CoinablePayButton';

export default CoianblePayButton;
