import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ListingDraftState } from '../store/listingDraftSlice';

const LISTING_DRAFT_BACKUP_KEY_OLD = 'listingDraft_backup_json';
const LISTING_DRAFT_BACKUPS_KEY = 'listingDraft_backups_json';

export type ListingDraftBackup = ListingDraftState & { draftId: string };

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function saveListingDraftBackupToLocalStorage(
  draft: ListingDraftState,
): Promise<void> {
  const draftId = draft.draftId ?? `draft_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const normalized: ListingDraftBackup = {
    ...(draft as ListingDraftState),
    draftId,
  };

  const existing = safeParseJson<ListingDraftBackup[]>(
    await AsyncStorage.getItem(LISTING_DRAFT_BACKUPS_KEY),
  );

  const backups = Array.isArray(existing) ? existing : [];
  const idx = backups.findIndex((b) => b.draftId === draftId);
  if (idx >= 0) backups[idx] = normalized;
  else backups.unshift(normalized); // show newest first

  await AsyncStorage.setItem(LISTING_DRAFT_BACKUPS_KEY, JSON.stringify(backups));

  // Optional migration: keep old key in sync for older app versions.
  // This doesn't break anything, but new code should read from LISTING_DRAFT_BACKUPS_KEY.
  await AsyncStorage.setItem(LISTING_DRAFT_BACKUP_KEY_OLD, JSON.stringify(normalized));
}

export async function loadListingDraftBackupFromLocalStorage(): Promise<
  ListingDraftState | null
> {
  const raw = await AsyncStorage.getItem(LISTING_DRAFT_BACKUP_KEY_OLD);
  return safeParseJson<ListingDraftState>(raw);
}

export async function loadListingDraftBackupsFromLocalStorage(): Promise<
  ListingDraftBackup[]
> {
  const fromNew = safeParseJson<ListingDraftBackup[]>(
    await AsyncStorage.getItem(LISTING_DRAFT_BACKUPS_KEY),
  );

  if (Array.isArray(fromNew) && fromNew.length > 0) return fromNew;

  // Backward compatibility: if app has only old single draft saved.
  const oldOne = safeParseJson<ListingDraftState>(
    await AsyncStorage.getItem(LISTING_DRAFT_BACKUP_KEY_OLD),
  );
  if (!oldOne) return [];

  const migrated: ListingDraftBackup[] = [
    {
      ...(oldOne as ListingDraftState),
      draftId:
        (oldOne as ListingDraftState & { draftId?: string }).draftId ??
        `draft_${Date.now()}`,
    },
  ];

  await AsyncStorage.setItem(LISTING_DRAFT_BACKUPS_KEY, JSON.stringify(migrated));
  return migrated;
}

export async function clearListingDraftBackupsFromLocalStorage(): Promise<void> {
  await AsyncStorage.removeItem(LISTING_DRAFT_BACKUPS_KEY);
  await AsyncStorage.removeItem(LISTING_DRAFT_BACKUP_KEY_OLD);
}
