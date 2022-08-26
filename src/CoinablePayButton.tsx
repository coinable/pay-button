import React, { forwardRef, MouseEvent } from 'react';
import Solana from './Solana';

import { CoinablePayButtonProps } from './types';

import './styles.scss';

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
    const handleOnClick = async (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault();

      const data = {
        product_id: productId,
        quantity,
        request_currency: requestCurrency,
      };

      try {
        const response = await fetch(
          'https://api.coinablepay.com/v1/api/checkouts/single',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        );
        const resp: Record<string, any> = await response.json();
        if (resp.redirect_url) onSuccess(resp.redirect_url);
        else
          onFailure(
            "Unexpected error, fetch succedded but couldn't get redirect url from Coinable, try again in a few seconds."
          );
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
