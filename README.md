# @coinable/pay-button

An easy to setup react integration for your application to start accepting SOL and solana tokens (e.g. USDC, DUST, SAMO) today.

The integration works with [Coinable](https://coinablepay.com/), the Web3 eCommerce stack on Solana, that allows users to accept and manage token payments.

Coinable takes care of the processing, organization, and accounting of commerce related transactions, so that users can focus on their product.

To set up an account and create products to use with the pay button, check out the documentation [here](https://docs.coinablepay.com/guides/start-here).

## Installation

via yarn (recommended)

```
yarn add @coinable/pay-button
```

via npm

```
npm install @coinable/pay-button
```

## Basic Usage

```jsx
<PayButton
  productId="tFFvJppGAwLA2RfxGZ2zxP"
  onFailure={(msg) => console.error(msg)}
  onSuccess={(redirectUrl) => {
    window.location.href = redirectUrl;
  }}
/>
```

### Props

| Name              | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `children`        | Component children                                                                         |
| `onFailure`       | Callback for failure response will return a string with the error description              |
| `onSuccess`       | Callback for success response will return a redirect url to the initiated checkout session |
| `productId`       | The id of the product that the checkout session will be initiated for                      |
| `quantity`        | Quantity of the product                                                                    |
| `requestCurrency` | Request currency of the checkout session, list of possible currencies soon                 |
