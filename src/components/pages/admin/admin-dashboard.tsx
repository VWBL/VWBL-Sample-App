import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Divider,
  Code,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { AdminDashboardContainer } from './admin-dashboard.container';

interface PrizeItemStatus {
  type: string;
  title: string;
  totalCount: number;
  remainingCount: number;
  allocatedCount: number;
  winnerAddresses: string[];
}

interface GachaStatusResponse {
  totalPrizes: number;
  remainingPrizes: number;
  allocatedPrizes: number;
  prizeItems: PrizeItemStatus[];
  lastUpdated: string;
}

type AdminDashboardComponentProps = {
  gachaStatus: GachaStatusResponse | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
};

const getPrizeRarity = (type: string): { color: string; label: string } => {
  switch (type) {
    case 'meat':
      return { color: 'red', label: 'レジェンダリー' };
    case 'physical_blockchain':
      return { color: 'purple', label: 'エピック' };
    case 'crypto':
      return { color: 'blue', label: 'レア' };
    case 'physical_bitcoin':
      return { color: 'green', label: 'アンコモン' };
    case 'miss':
      return { color: 'gray', label: 'コモン' };
    default:
      return { color: 'gray', label: '不明' };
  }
};

const WinnersSection: React.FC<{ prize: PrizeItemStatus }> = ({ prize }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const rarity = getPrizeRarity(prize.type);
  
  const entries = useMemo(
    () => prize.winnerAddresses.map((addr, i) => ({ addr, i })),
    [prize.winnerAddresses]
  );
  const filteredEntries = useMemo(
    () =>
      entries.filter(e =>
        e.addr.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [entries, searchTerm]
  );
  // ハズレ以外は全件表示、ハズレのみ20件制限
  const isLimitedDisplay = prize.type === 'miss';
  const displayedEntries =
    isLimitedDisplay && !showAll ? filteredEntries.slice(0, 20) : filteredEntries;
  const hasMore = isLimitedDisplay && filteredEntries.length > 20;
  
  return (
    <Box>
      <HStack mb={3} justify="space-between">
        <HStack>
          <Badge colorScheme={rarity.color} fontSize="sm">
            {prize.title}
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {prize.winnerAddresses.length}名が当選
          </Text>
        </HStack>
        
        {prize.winnerAddresses.length > 5 && (
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="アドレスで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="sm"
            />
          </InputGroup>
        )}
      </HStack>
      
      <VStack align="stretch" spacing={2} pl={4}>
        {displayedEntries.map(({ addr, i }) => (
          <HStack key={`${prize.type}-${i}`}>
            <Text fontSize="sm" width="80px">#{i + 1}</Text>
            <Code fontSize="sm" p={2} borderRadius="md">
              {addr}
            </Code>
          </HStack>
        ))}
        
        {hasMore && !showAll && filteredEntries.length > 20 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(true)}
            leftIcon={<ChevronDownIcon />}
            alignSelf="flex-start"
            mt={2}
          >
            さらに表示 ({filteredEntries.length - 20}件)
          </Button>
        )}
        
        {showAll && hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(false)}
            leftIcon={<ChevronUpIcon />}
            alignSelf="flex-start"
            mt={2}
          >
            折りたたみ
          </Button>
        )}
        
        {searchTerm && filteredEntries.length === 0 && (
          <Text fontSize="sm" color="gray.500" textAlign="center" py={4}>
            該当するアドレスが見つかりません
          </Text>
        )}
      </VStack>
      
      <Divider mt={4} />
    </Box>
  );
};

export const AdminDashboardComponent: React.FC<AdminDashboardComponentProps> = ({
  gachaStatus,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8} centerContent>
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" />
          <Text>ガチャステータスを読み込み中...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  if (!gachaStatus) {
    return null;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            ガチャ管理ダッシュボード
          </Heading>
          <Text color="gray.600">
            最終更新: {new Date(gachaStatus.lastUpdated).toLocaleString('ja-JP')}
          </Text>
        </Box>

        {/* 全体統計 */}
        <Card>
          <CardHeader>
            <Heading size="md">全体統計</Heading>
          </CardHeader>
          <CardBody>
            <HStack spacing={8} justify="center">
              <Stat textAlign="center">
                <StatLabel>総景品数</StatLabel>
                <StatNumber>{gachaStatus.totalPrizes}</StatNumber>
              </Stat>
              <Stat textAlign="center">
                <StatLabel>配布済み</StatLabel>
                <StatNumber color="red.500">{gachaStatus.allocatedPrizes}</StatNumber>
                <StatHelpText>
                  {gachaStatus.totalPrizes > 0
                    ? ((gachaStatus.allocatedPrizes / gachaStatus.totalPrizes) * 100).toFixed(1)
                    : '0.0'}%
                </StatHelpText>
              </Stat>
              <Stat textAlign="center">
                <StatLabel>残り</StatLabel>
                <StatNumber color="green.500">{gachaStatus.remainingPrizes}</StatNumber>
                <StatHelpText>
                  {gachaStatus.totalPrizes > 0
                    ? ((gachaStatus.remainingPrizes / gachaStatus.totalPrizes) * 100).toFixed(1)
                    : '0.0'}%
                </StatHelpText>
              </Stat>
            </HStack>
            <Box mt={4}>
              <Progress
                value={
                  gachaStatus.totalPrizes > 0
                    ? (gachaStatus.allocatedPrizes / gachaStatus.totalPrizes) * 100
                    : 0
                }
                colorScheme="purple"
                size="lg"
                borderRadius="md"
              />
            </Box>
          </CardBody>
        </Card>

        {/* 景品別詳細 */}
        <Card>
          <CardHeader>
            <Heading size="md">景品別詳細</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>景品名</Th>
                  <Th>配布状況</Th>
                  <Th>進捗</Th>
                  <Th>当選者数</Th>
                </Tr>
              </Thead>
              <Tbody>
                {gachaStatus.prizeItems.map((prize) => {
                  const rarity = getPrizeRarity(prize.type);
                  const progressPercent =
                    prize.totalCount > 0
                      ? (prize.allocatedCount / prize.totalCount) * 100
                      : 0;
                  
                  return (
                    <Tr key={prize.type}>
                      <Td>
                        <Text fontWeight="bold">{prize.title}</Text>
                      </Td>
                      <Td>
                        <Text>
                          {prize.allocatedCount} / {prize.totalCount}
                        </Text>
                      </Td>
                      <Td width="200px">
                        <Progress
                          value={progressPercent}
                          colorScheme={rarity.color}
                          size="sm"
                          borderRadius="md"
                        />
                        <Text fontSize="xs" mt={1}>
                          {progressPercent.toFixed(1)}%
                        </Text>
                      </Td>
                      <Td>
                        <Text>{prize.winnerAddresses.length}人</Text>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* 当選者一覧 */}
        <Card>
          <CardHeader>
            <Heading size="md">当選者一覧</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              {gachaStatus.prizeItems
                .filter(prize => prize.winnerAddresses.length > 0)
                .map((prize) => {
                  return <WinnersSection key={prize.type} prize={prize} />;
                })}
              
              {gachaStatus.prizeItems.every(prize => prize.winnerAddresses.length === 0) && (
                <Text textAlign="center" color="gray.500">
                  まだ誰も当選していません
                </Text>
              )}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export const AdminDashboard: React.FC = () => {
  return <AdminDashboardContainer component={AdminDashboardComponent} />;
};