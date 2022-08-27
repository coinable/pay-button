import { ReactNode } from 'react';

export type OnBehalfOf = {
  originProjectKey: string;
  serviceChargeRate: number;
};

export interface CoinablePayButtonProps {
  children?: ReactNode;
  productId: string;
  onSuccess: (redirectLink: string) => void;
  onFailure: (errorMessage: string) => void;
  quantity?: number;
  requestCurrency?: string;
  onBehalfOf?: OnBehalfOf;
}
