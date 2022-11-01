import { getErrorMessage } from './helpers';
import { COINABLE_API_URL } from './constants';


export const initiateCheckout = async (onSuccess: (redirect_uri: string) => void, data: Record<string, any>) => {
  const { variant } = data;

  if (variant && variant.length === 0)
  throw new Error('Please use a valid variant name or remove the prop');
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
    throw new Error('please try again in few minutes.')
  }
  
  if (response.status !== 200) {
    const errorMessage = getErrorMessage(jsonResponse)
    throw new Error(errorMessage);
  }
  
  if (jsonResponse.redirect_url) {
    onSuccess(jsonResponse.redirect_url);
  } else {
      throw new Error('Please try again in a few seaconds.');
    }
}