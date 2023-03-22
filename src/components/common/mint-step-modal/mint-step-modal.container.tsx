import { StepStatus } from 'vwbl-sdk';
import { MintStepModal as MintStepModalComponent } from './mint-step-modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onMintClick: () => Promise<void>;
  handleCancelClick: () => void;
  mintStep: StepStatus[];
};

export const MintStepModal: React.FC<Props> = ({ isOpen, onClose, handleCancelClick, onMintClick, mintStep }: Props) => {
  return (
    <MintStepModalComponent
      isOpen={isOpen}
      onClose={onClose}
      mintStep={mintStep}
      handleMintStart={onMintClick}
      handleCancelClick={handleCancelClick}
    />
  );
};
