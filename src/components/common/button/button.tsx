import * as CSS from 'csstype';
import { Button as ChakraButton, Icon, BorderProps, forwardRef, As, TypographyProps, ButtonProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
  loadingText?: string;
  width?: string | number | { [key: string]: CSS.Property.Width | number };
  height?: string | number;
  fontWeight?: TypographyProps['fontWeight'];
  fontSize?: TypographyProps['fontSize'];
  mt?: string | number;
  mb?: string | number;
  mr?: string | number;
  ml?: string | number;
  px?: string | number;
  border?: BorderProps['border'];
  borderRadius?: BorderProps['borderRadius'];
  disabled?: ButtonProps['disabled'];
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
      px,
      border,
      borderRadius,
      disabled,
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
        px={px}
        borderRadius={borderRadius}
        fontSize={fontSize}
        border={isReversed ? '1px solid' : border}
        disabled={disabled}
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
