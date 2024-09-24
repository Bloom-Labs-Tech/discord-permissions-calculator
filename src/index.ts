export const PermissionFlags = {
  CREATE_INSTANT_INVITE: 1n << 0n,
  KICK_MEMBERS: 1n << 1n,
  BAN_MEMBERS: 1n << 2n,
  ADMINISTRATOR: 1n << 3n,
  MANAGE_CHANNELS: 1n << 4n,
  MANAGE_GUILD: 1n << 5n,
  ADD_REACTIONS: 1n << 6n,
  VIEW_AUDIT_LOG: 1n << 7n,
  PRIORITY_SPEAKER: 1n << 8n,
  STREAM: 1n << 9n,
  VIEW_CHANNEL: 1n << 10n,
  SEND_MESSAGES: 1n << 11n,
  SEND_TTS_MESSAGES: 1n << 12n,
  MANAGE_MESSAGES: 1n << 13n,
  EMBED_LINKS: 1n << 14n,
  ATTACH_FILES: 1n << 15n,
  READ_MESSAGE_HISTORY: 1n << 16n,
  MENTION_EVERYONE: 1n << 17n,
  USE_EXTERNAL_EMOJIS: 1n << 18n,
  VIEW_GUILD_INSIGHTS: 1n << 19n,
  CONNECT: 1n << 20n,
  SPEAK: 1n << 21n,
  MUTE_MEMBERS: 1n << 22n,
  DEAFEN_MEMBERS: 1n << 23n,
  MOVE_MEMBERS: 1n << 24n,
  USE_VAD: 1n << 25n,
  CHANGE_NICKNAME: 1n << 26n,
  MANAGE_NICKNAMES: 1n << 27n,
  MANAGE_ROLES: 1n << 28n,
  MANAGE_WEBHOOKS: 1n << 29n,
  MANAGE_GUILD_EXPRESSIONS: 1n << 30n,
  USE_APPLICATION_COMMANDS: 1n << 31n,
  REQUEST_TO_SPEAK: 1n << 32n,
  MANAGE_EVENTS: 1n << 33n,
  MANAGE_THREADS: 1n << 34n,
  CREATE_PUBLIC_THREADS: 1n << 35n,
  CREATE_PRIVATE_THREADS: 1n << 36n,
  USE_EXTERNAL_STICKERS: 1n << 37n,
  SEND_MESSAGES_IN_THREADS: 1n << 38n,
  USE_EMBEDDED_ACTIVITIES: 1n << 39n,
  MODERATE_MEMBERS: 1n << 40n,
  VIEW_CREATOR_MONETIZATION_ANALYTICS: 1n << 41n,
  USE_SOUNDBOARD: 1n << 42n,
  CREATE_GUILD_EXPRESSIONS: 1n << 43n,
  CREATE_EVENTS: 1n << 44n,
  USE_EXTERNAL_SOUNDS: 1n << 45n,
  SEND_VOICE_MESSAGES: 1n << 46n,
  SEND_POLLS: 1n << 49n,
  USE_EXTERNAL_APPS: 1n << 50n,
};

export type PermissionFlags = typeof PermissionFlags;
export type PermissionFlagKeys = keyof PermissionFlags;
type Arrayable<T> = T | T[];
export type PermissionFlagResolvable = Arrayable<bigint> | Arrayable<PermissionFlagKeys>;

export class PermissionCalculator {
  private permissions = 0n;

  constructor(initialPermissions: PermissionFlagResolvable = 0n) {
    this.permissions = PermissionCalculator.parsePermissions(initialPermissions);
  }

  /**
   * Adds permission(s) to the current permissions.
   * @param permission - The permission(s) to add.
   * @returns The PermissionCalculator instance.
   */
  add(permission: PermissionFlagResolvable): this {
    this.permissions |= PermissionCalculator.parsePermissions(permission);
    return this;
  }

  /**
   * Removes permission(s) from the current permissions.
   * @param permission - The permission(s) to remove.
   * @returns The PermissionCalculator instance.
   */
  remove(permission: PermissionFlagResolvable): this {
    this.permissions &= ~PermissionCalculator.parsePermissions(permission);
    return this;
  }

  /**
   * Checks if permission(s) are included in the current permissions.
   * @param permission - The permission(s) to check.
   * @returns True if the permission(s) are included, false otherwise.
   */
  has(permission: PermissionFlagResolvable): boolean {
    const permValue = PermissionCalculator.parsePermissions(permission);
    return (this.permissions & permValue) === permValue;
  }

  /**
   * Gets the combined permission value.
   * @returns The combined permission value as a bigint.
   */
  get value(): bigint {
    return this.permissions;
  }

  /**
   * Gets a list of permission names included in the current permissions.
   * @returns An array of permission names.
   */
  getPermissionsList(): string[] {
    const permissionsList: string[] = [];
    for (const [name, value] of Object.entries(PermissionFlags)) {
      if ((this.permissions & value) === value) {
        permissionsList.push(name);
      }
    }
    return permissionsList;
  }

  /**
   * Static method to get permission names from a given value.
   * @param value - The combined permission value. Can be a bigint, string, number, undefined, or null.
   * @returns An array of permission names.
   */
  static getPermissionsFromValue(value: bigint | string | number | undefined | null): string[] {
    const permissionsList: string[] = [];
    const parsedValue = PermissionCalculator.parse(value);
    for (const [name, permValue] of Object.entries(PermissionFlags)) {
      if ((parsedValue & permValue) === permValue) {
        permissionsList.push(name);
      }
    }
    return permissionsList;
  }

  /**
   * Static method to parse a value into a bigint.
   * @param value - The value to parse. Can be a bigint, string, number, undefined, or null.
   * @returns The parsed value as a bigint.
   */
  static parse(value: bigint | string | number | undefined | null): bigint {
    try {
      return BigInt(value ?? 0);
    } catch (e) {
      return 0n;
    }
  }

  /**
   * Static method to parse permission(s) into a bigint.
   * @param value - The permission(s) to parse.
   * @returns The combined permission value as a bigint.
   */
  static parsePermissions(value: PermissionFlagResolvable): bigint {
    if (Array.isArray(value)) {
      let result = 0n;
      for (const perm of value) {
        result |= PermissionCalculator.parsePermission(perm);
      }
      return result;
    }

    return PermissionCalculator.parsePermission(value);
  }

  /**
   * Static method to parse a single permission into a bigint.
   * @param perm - The permission to parse.
   * @returns The permission value as a bigint.
   */
  static parsePermission(perm: bigint | PermissionFlagKeys): bigint {
    if (typeof perm === 'bigint') {
      return perm;
    }

    if (typeof perm === 'string') {
      const permValue = PermissionFlags[perm];
      if (typeof permValue === 'bigint') {
        return permValue;
      }

      throw new Error(`Invalid permission key: ${perm}`);
    }

    throw new Error(`Invalid permission type: ${typeof perm}`);
  }
}
