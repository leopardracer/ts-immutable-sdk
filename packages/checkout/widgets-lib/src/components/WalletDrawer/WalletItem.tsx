import { MenuItem, MenuItemProps } from '@biom3/react';
import {
  cloneElement, ReactElement, ReactNode, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { EIP6963ProviderInfo } from '@imtbl/checkout-sdk';
import { RawImage } from '../RawImage/RawImage';

export interface WalletItemProps<RC extends ReactElement | undefined = undefined> {
  loading?: boolean;
  recommended?: boolean;
  testId: string;
  providerInfo: EIP6963ProviderInfo;
  onWalletItemClick: () => void;
  rc?: RC;
  size?: MenuItemProps['size'];
  badge?: ReactNode;
  disabled?: boolean;
}

export function WalletItem<
  RC extends ReactElement | undefined = undefined,
>({
  rc = <span />,
  testId,
  loading = false,
  recommended = false,
  providerInfo,
  onWalletItemClick,
  size = 'medium',
  badge,
  disabled,
}: WalletItemProps<RC>) {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);

  return (
    <MenuItem
      rc={cloneElement(rc, {
        onClick: async () => {
          if (loading) return;
          setBusy(true);
          // let the parent handle errors
          try {
            await onWalletItemClick();
          } finally {
            setBusy(false);
          }
        },
      })}
      testId={`${testId}-wallet-list-${providerInfo.rdns}`}
      size={size}
      emphasized
      sx={{ position: 'relative' }}
    >
      <RawImage
        src={providerInfo.icon}
        alt={providerInfo.name}
        sx={{
          position: 'absolute',
          left: 'base.spacing.x3',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      />
      <MenuItem.Label size="medium" sx={{ marginLeft: '65px' }}>
        {providerInfo.name}
      </MenuItem.Label>
      {((recommended || busy) && (
        <MenuItem.Badge
          isAnimated={busy}
          variant={recommended && !busy ? 'emphasis' : 'guidance'}
          badgeContent={busy ? '' : t('wallets.recommended')}
        />
      ))}
      {!busy && badge}
    </MenuItem>
  );
}
