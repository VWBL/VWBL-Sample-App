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

const ADMIN_API_URL = `${process.env.NEXT_PUBLIC_GACHA_API_URL}/pro/admin`;

export const AdminDashboardContainer: React.FC<AdminDashboardContainerProps> = ({ component: Component }) => {
  const [gachaStatus, setGachaStatus] = useState<GachaStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGachaStatus = async () => {
    if (!process.env.NEXT_PUBLIC_GACHA_API_URL) {
      throw new Error(
        '環境変数 NEXT_PUBLIC_GACHA_API_URL が未設定です。.env(<mode>) ファイルに定義してください。'
      );
    }

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

      const payload = data?.data ?? data;
      if (payload && typeof payload === 'object' && 'totalPrizes' in payload) {
        setGachaStatus(payload as GachaStatusResponse);
      } else {
        throw new Error('不正なレスポンス形式です');
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