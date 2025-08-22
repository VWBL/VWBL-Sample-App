import React, { useState, useEffect } from 'react';

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

interface AdminDashboardContainerProps {
  component: React.ComponentType<{
    gachaStatus: GachaStatusResponse | null;
    isLoading: boolean;
    error: string | null;
    refreshData: () => void;
  }>;
}

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://x92s8btj0m.execute-api.ap-northeast-1.amazonaws.com/pro/admin';

export const AdminDashboardContainer: React.FC<AdminDashboardContainerProps> = ({ component: Component }) => {
  const [gachaStatus, setGachaStatus] = useState<GachaStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGachaStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(ADMIN_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.data) {
        setGachaStatus(data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Failed to fetch gacha status:', err);
      setError(err instanceof Error ? err.message : 'ガチャステータスの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGachaStatus();
  }, []);

  return (
    <Component
      gachaStatus={gachaStatus}
      isLoading={isLoading}
      error={error}
      refreshData={fetchGachaStatus}
    />
  );
};