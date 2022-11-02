import { Button as ChakraButton, Icon, BorderProps, forwardRef, As, TypographyProps, ButtonProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
  loadingText?: string;
  width?: string | number;
  height?: string | number;
  fontWeight?: TypographyProps['fontWeight'];
  fontSize?: TypographyProps['fontSize'];
  mt?: string | number;
  mb?: string | number;
  mr?: string | number;
  ml?: string | number;
  border?: BorderProps['border'];
  borderRadius?: BorderProps['borderRadius'];
  disalbed?: ButtonProps['disabled'];
  onClick?: () => void;
  isReversed?: boolean;
  icon?: IconType;
  as?: As;
};

export const Button: React.FC<Props> = forwardRef(
  (
    {
      text,
      type,
      isLoading,
      loadingText,
      width,
      height,
      fontWeight,
      fontSize,
      mt,
      mb,
      mr,
      ml,
      border,
      borderRadius,
      disalbed,
      onClick,
      isReversed,
      icon,
      as,
    },
    ref,
  ) => {
    return (
      <ChakraButton
        ref={ref}
        type={type}
        isLoading={isLoading}
        loadingText={loadingText}
        w={width}
        h={height}
        fontWeight={fontWeight}
        bg={isReversed ? 'white' : 'black'}
        color={isReversed ? 'black' : 'white'}
        mt={mt}
        mb={mb}
        mr={mr}
        ml={ml}
        borderRadius={borderRadius}
        fontSize={fontSize}
        border={isReversed ? '1px solid' : border}
        disabled={disalbed}
        _hover={{ opacity: 0.7 }}
        onClick={onClick}
        as={as}
      >
        {icon && <Icon as={icon} mr={2} />}
        {text}
      </ChakraButton>
    );
  },
);
