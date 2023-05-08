import { Box, Container, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Image, Divider } from '@chakra-ui/react';
import { Button } from '../../../../common/button';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const HowToComponent: React.FC = () => {
  const tabOptions = [{ name: 'Create' }, { name: 'Transfer' }];
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box w={'100%'} my={16}>
      <Text fontSize='4xl' as='b' display={'flex'} justifyContent={'center'} id='howto'>
        How to
      </Text>
      <Text fontSize='md' as='b' mt={4} mb={10} display={'flex'} justifyContent={'center'}>
        {'"'}VWBL NFT{'"'}の発行・送信方法はこちら！早速試してみよう！
      </Text>

      <Tabs size='md' index={tabIndex} onChange={handleTabsChange} colorScheme='black' variant='line' align='center'>
        <TabList justifyContent={'center'}>
          {tabOptions.map((tab, i) => (
            <Tab px={4} key={i} fontWeight='bold' position='relative'>
              <Text px={1}>{`${tab.name}`}</Text>
            </Tab>
          ))}
        </TabList>

        <TabPanels mt={6} maxW='container.lg'>
          <TabPanel>
            <HowToCreate />
          </TabPanel>

          <TabPanel>
            <HowToTransfer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const HowToCreate: React.FC = () => {
  const router = useRouter();
  return (
    <Container maxW='container.lg' my={10}>
      <Box w={'100%'}>
        <Text fontSize='large' my={4} as='b' display={'flex'} justifyContent='center'>
          STEP1 Connect Wallet
        </Text>
        <Text fontSize='md' my={10} w={'60%'} textAlign='left'>
          メニューの「Connect Wallet」クリックし、メタマスクなどの仮想通貨ウォレットを接続する。
        </Text>
        <Image src='/howto_01.png' alt='howto_01' w={400} />
      </Box>
      <Divider my={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} as='b' display={'flex'} justifyContent='center'>
          STEP2 Create Item for Free
        </Text>
        <Text fontSize='md' my={10} textAlign='left' w={'60%'}>
          メニューの「Create」をクリックしVWBL NFT作成ページを開き、デジタルコンテンツの情報を入力する。 全て入力したらページ下部「Create
          Item」ボタンでVWBL NFTを発行する。 アイテムの作成には数分かかる場合があります。
        </Text>
        <Image src='/howto_02.png' alt='howto_02' w={400} />
      </Box>
      <Divider my={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} as='b' display={'flex'} justifyContent='center'>
          STEP3 Check your wallet
        </Text>
        <Text fontSize='md' my={10} textAlign='left' w={'60%'}>
          「My Wallet」をクリックし、保有しているVWBL NFTを表示する。VWBL NFTを選択した後、「View
          Data」をクリックしNFT保有者だけみることができる画像を閲覧する。
        </Text>
        <Image src='/howto_03.png' alt='howto_03' w={400} />
      </Box>
      <Button text='Try demo' width='50%' mt={10} onClick={() => router.push('/create')} />
    </Container>
  );
};

const HowToTransfer: React.FC = () => {
  const router = useRouter();
  return (
    <Container maxW='container.lg' my={10}>
      <Box w={'100%'}>
        <Text fontSize='large' my={4} as='b' display={'flex'} justifyContent='center'>
          STEP1 Connect Wallet
        </Text>
        <Text fontSize='md' my={10} w={'60%'} textAlign='left'>
          メニューの「Connect Wallet」クリックし、メタマスクなどの仮想通貨ウォレットを接続する。
        </Text>
        <Image src='/howto_01.png' alt='howto_01' w={400} />
      </Box>
      <Divider my={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} as='b' display={'flex'} justifyContent='center'>
          STEP2 Check your wallet
        </Text>
        <Text fontSize='md' my={10} textAlign='left' w={'60%'}>
          「My Wallet」をクリックし、保有しているVWBL NFTを表示する。
        </Text>
        <Image src='/howto_03.png' alt='howto_03' w={400} />
      </Box>
      <Divider my={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} as='b' display={'flex'} justifyContent='center'>
          STEP3 Transfer
        </Text>
        <Text fontSize='md' my={10} textAlign='left' w={'60%'}>
          詳細ページに遷移した後、「Transfer」をクリックする。送信先のウォレットアドレスを入力し、送信する。
        </Text>
        <Image src='/howto_04.png' alt='howto_04' w={400} />
      </Box>
      <Button text='My Wallet' width='50%' mt={10} onClick={() => router.push('/account')} />
    </Container>
  );
};
