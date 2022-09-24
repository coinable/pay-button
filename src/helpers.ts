export const getErrorMessage = (response: Record<string, any>): string => {
  return (
    response.errors.message ||
    (response.errors.products && response.errors.products[0]) ||
    'Please make sure correct product id is set and is correct.'
  );
};
