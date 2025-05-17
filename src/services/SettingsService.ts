import { API, type ApiService } from '../api/Api';
import { StorageKeys } from '../constants/StorageKeys';
import type { User } from '../model/User';
import type { UserPreferences } from '../model/UserPreferences';
import { StorageService } from './StorageService';

class SettingsService {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  async save(prefs: Partial<UserPreferences>): Promise<UserPreferences> {
    await this.api.saveOrUpdateUser({
      id: prefs.id,
      firstName: prefs.firstName,
      name: prefs.name,
    } as User);

    await StorageService.setItem(
      StorageKeys.USER_PREFERENCES,
      JSON.stringify(prefs)
    );

    const saved = await this.get();
    if (saved === null) {
      return Promise.reject('No prefs');
    } else {
      return Promise.resolve(saved);
    }
  }

  async get(): Promise<UserPreferences | null> {
    const saved = await StorageService.getItem(StorageKeys.USER_PREFERENCES);
    if (saved) {
      return Promise.resolve(JSON.parse(saved) as UserPreferences);
    } else {
      return Promise.resolve(null);
    }
  }

  activityVisible(prefs: UserPreferences | null, activityId: string): boolean {
    if (prefs === null) {
      return true;
    }
    return (
      !!prefs.activities &&
      (!prefs.activities[activityId] || prefs.activities[activityId] === 'yes')
    );
  }
}

export const settingsService = new SettingsService(API);
