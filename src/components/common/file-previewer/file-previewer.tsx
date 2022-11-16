import { Box, CloseButton, FormLabel, Input, Image, Text, VStack, AspectRatio } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ReactPlayer from 'react-player';

type Props = {
  labelText: string;
  url?: string;
  onClear: () => void;
  inputId: string;
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
  mimeType?: string;
  acceptType?: string;
  opt?: UseFormRegisterReturn;
};

const switchPlayer = (url: string, mimeType?: string) => {
  if (mimeType?.includes('audio')) {
    return <ReactPlayer url={url} controls={true} height='54px' />;
  } else if (mimeType?.includes('video')) {
    return <ReactPlayer url={url} controls={true} width='100%' height='100%' />;
  } else if (mimeType?.includes('pdf')) {
    return <Image src='/pdf-icon.jpeg' alt='pdf-icon' maxH='100%' maxW='100%' />;
  } else {
    return <Image src={url} alt='selectedFile' maxH='100%' maxW='100%' />;
  }
};

export const FilePreviewer: React.FC<Props> = ({ labelText, url, onClear, inputId, onChange, mimeType, acceptType, opt }) => {
  return (
    <AspectRatio maxW={480} ratio={1} position={'relative'} bg='black'>
      <Box>
        {url && (
          <>
            <CloseButton onClick={onClear} position={'absolute'} right={2} top={2} zIndex={3} color='white' />
            <Box
              w={'85%'}
              h={'85%'}
              position={'absolute'}
              top={'50%'}
              left={'50%'}
              transform={'translate(-50%, -50%)'}
              rounded={30}
              zIndex={1}
              _hover={{ zIndex: 0 }}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              {switchPlayer(url, mimeType)}
            </Box>
          </>
        )}

        {!url && (
          <Box position={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%, -60%)'} w={'100%'}>
            <VStack gap={2}>
              <Text color={'white'} fontSize={'sm'} textAlign={'center'}>
                {labelText}
                <br />
                Max 1.5GB
              </Text>
              <FormLabel
                display={'flex'}
                htmlFor={inputId}
                w={'80%'}
                h={'48px'}
                zIndex={1}
                borderRadius={5}
                alignItems={'center'}
                justifyContent={'center'}
                bgColor={'white'}
                _hover={{ bgColor: 'gray.200' }}
                fontWeight={'bold'}
                cursor='pointer'
                {...opt}
              >
                Choose File
                <Input hidden id={inputId} type='file' {...opt} onChange={onChange} accept={acceptType} />
              </FormLabel>
            </VStack>
          </Box>
        )}
      </Box>
    </AspectRatio>
  );
};
