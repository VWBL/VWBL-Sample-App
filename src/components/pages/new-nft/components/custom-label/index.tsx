import { FormLabel, Heading } from '@chakra-ui/react';

type LabelProps = {
  title: string;
  htmlFor: string;
  isRequired: boolean;
};

export const CustomLabel: React.FC<LabelProps> = ({ title, htmlFor, isRequired }) => {
  return (
    <FormLabel display='flex' htmlFor={htmlFor} fontWeight='bold'>
      {title} {isRequired ? '*' : '(Optional)'}
    </FormLabel>
  );
};

CustomLabel.displayName = 'CustomLabel';
