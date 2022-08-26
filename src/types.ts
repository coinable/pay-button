import { ReactNode } from 'react';

export interface CoinablePayButtonProps {
  children?: ReactNode;
  productId: string;
  onSuccess: (redirectLink: string) => void;
  onFailure: (errorMessage: string) => void;
  quantity?: number;
  requestCurrency?: string;
}
