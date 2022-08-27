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
      onBehalfOf,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    const handleOnClick = async (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault();

      let data = {
        product_id: productId,
        quantity,
        request_currency: requestCurrency,
      };

      if (onBehalfOf) {
        data = Object.assign(
          {
            on_behalf_of: {
              origin_project_key: onBehalfOf.originProjectKey,
              service_charge_rate: onBehalfOf.serviceChargeRate,
            },
          },
          data
        );
      }

      try {
        setLoading(true);

        const response = await fetch(`${prod}/v1/api/checkouts/single`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.status !== 200) {
          throw new Error('Please make sure correct Product id is set.');
        }

        const resp: Record<string, any> = await response.json();

        if (resp.redirect_url) {
          onSuccess(resp.redirect_url);
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
        className="coinable-pay-button"
        onClick={handleOnClick}
        disabled={loading}
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
