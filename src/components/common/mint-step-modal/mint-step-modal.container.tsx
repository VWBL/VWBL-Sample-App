import { StepStatus } from 'vwbl-sdk';
import { MintStepModal as MintStepModalComponent } from './mint-step-modal';
import { VwblContainer } from '../../../container';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onMintClick: () => Promise<void>;
  handleCancelClick: () => void;
  mintStep: StepStatus[];
};

export const MintStepModal: React.FC<Props> = ({ isOpen, onClose, handleCancelClick, onMintClick, mintStep }: Props) => {
  const { vwbl } = VwblContainer.useContainer();

  return (
    <MintStepModalComponent
      isOpen={isOpen}
      signature={vwbl?.signature}
      onClose={onClose}
      mintStep={mintStep}
      handleMintStart={onMintClick}
      handleCancelClick={handleCancelClick}
    />
  );
};
