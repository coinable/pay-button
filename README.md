# @coinable/pay-button

An easy to use and setup react integration for your application.

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
