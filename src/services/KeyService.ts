import { API, type ApiService } from '../api/Api';
import type { RoomKey } from '../model/RoomKey';

class KeyService {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  findAllKeys(): Promise<RoomKey[]> {
    return this.api.findAllKeys();
  }

  updateKey(key: RoomKey): Promise<RoomKey> {
    return this.api.updateKey(key);
  }
}

export const keyService = new KeyService(API);
