import React, { forwardRef, MouseEvent, useState } from 'react';
import Solana from './Solana';
import { CoinablePayButtonProps } from './types';
import { initiateCheckout } from './utils';

import './styles.scss';

const CoinablePayButton = forwardRef<HTMLButtonElement, CoinablePayButtonProps>(
  (
    {
      children = 'Pay',
      onFailure,
      onSuccess,
      productId,
      quantity = 1,
      requestCurrency = 'USD',
      backgroundColor,
      textColor,
      variant,
      className = 'coinable-pay-button',
      style,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    const handleOnClick = async (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault();

      if (variant && variant.length === 0)
        throw new Error('Please use a valid variant name or remove the prop');

      // Resetting the error to undefined on each new click
      onFailure(undefined);

      let data = {
        product_id: productId,
        variant,
        quantity,
        request_currency: requestCurrency,
      };

      try {
        setLoading(true);
        initiateCheckout(onSuccess, data);

      } catch (error) {
        setLoading(false);
        onFailure(error.message);
      }
    };

    return (
      <button
        ref={ref}
        className={className}
        onClick={handleOnClick}
        disabled={loading}
        style={{ backgroundColor, color: textColor, ...style }}
        {...props}
      >
        {!loading ? (
          <div className="coinable-pay-button-content">
            <Solana />
            {children}
          </div>
        ) : (
          <div className="coinable-spinner" />
        )}
      </button>
    );
  }
);

CoinablePayButton.displayName = 'CoinablePayButton';

export default CoinablePayButton;
