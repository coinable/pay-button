import React, { forwardRef, MouseEvent, useState } from 'react';
import Solana from './Solana';

import { CoinablePayButtonProps } from './types';

import './styles.scss';

export const prod = 'https://api.coinablepay.com';

const CoianblePayButton = forwardRef<HTMLButtonElement, CoinablePayButtonProps>(
  (
    {
      children = 'Pay',
      onFailure,
      onSuccess,
      productId,
      quantity = 1,
      requestCurrency = 'USD',
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    const handleOnClick = async (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault();

      setLoading(true);

      const data = {
        product_id: productId,
        quantity,
        request_currency: requestCurrency,
      };

      try {
        const response = await fetch(
          'http://127.0.0.1:4000/v1/api/checkouts/single',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        );
        const resp: Record<string, any> = await response.json();
        if (resp.redirect_url) onSuccess(resp.redirect_url);
        else {
          onFailure(
            "Unexpected error, fetch succedded but couldn't get redirect url from Coinable, try again in a few seconds."
          );
        }
      } catch (error) {
        onFailure(error.message);
      }
    };

    return (
      <button
        ref={ref}
        className="coinable-pay-button"
        onClick={handleOnClick}
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

CoianblePayButton.displayName = 'CoinablePayButton';

export default CoianblePayButton;
