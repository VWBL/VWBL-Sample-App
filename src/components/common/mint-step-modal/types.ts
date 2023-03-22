import { StepStatus } from 'vwbl-sdk';

export type Props = {
  isOpen: boolean;
  mintStep: StepStatus[];
  onClose: () => void;
  handleCancelClick: () => void;
  handleMintStart: () => void;
};

export type MintStepProps = {
  mintStep: StepStatus[];
  handleMintStart: () => void;
};
