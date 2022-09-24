import React, { forwardRef, MouseEvent, useState } from 'react';
import Solana from './Solana';
import { COINABLE_API_URL } from './constants';
import { getErrorMessage } from './helpers';
import { CoinablePayButtonProps } from './types';

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

        const response = await fetch(
          `${COINABLE_API_URL}/v1/api/checkouts/single`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        );

        const jsonResponse: Record<string, any> = await response.json();

        if (response.status >= 500) {
          throw new Error('Please try again in few minutes.');
        }

        if (response.status !== 200) {
          const errorMessage = getErrorMessage(jsonResponse);
          throw new Error(errorMessage);
        }

        if (jsonResponse.redirect_url) {
          onSuccess(jsonResponse.redirect_url);
        } else {
          throw new Error('Please try again in a few seconds.');
        }
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
