import { CSSProperties, ReactNode } from 'react';

export interface CoinablePayButtonProps {
  children?: ReactNode;
  productId: string;
  onSuccess: (redirectLink: string) => void;
  onFailure: (errorMessage: string | undefined) => void;
  quantity?: number;
  requestCurrency?: string;
  backgroundColor?: string;
  variant?: string;
  textColor?: string;
  className?: string;
  style?: CSSProperties;
}
