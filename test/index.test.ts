import { describe, expect, it } from 'bun:test';
import { PermissionCalculator, PermissionFlags } from '../src';

describe('PermissionCalculator', () => {
  it('should initialize with default permissions', () => {
    const calculator = new PermissionCalculator();
    expect(calculator.value).toBe(0n);
  });

  it('should initialize with specified permissions', () => {
    const calculator = new PermissionCalculator(PermissionFlags.ADMINISTRATOR);
    expect(calculator.value).toBe(PermissionFlags.ADMINISTRATOR);
  });

  it('should add a permission', () => {
    const calculator = new PermissionCalculator();
    calculator.add(PermissionFlags.KICK_MEMBERS);
    expect(calculator.value).toBe(PermissionFlags.KICK_MEMBERS);
  });

  it('should add multiple permissions', () => {
    const calculator = new PermissionCalculator();
    calculator.add([PermissionFlags.KICK_MEMBERS, PermissionFlags.BAN_MEMBERS]);
    expect(calculator.value).toBe(PermissionFlags.KICK_MEMBERS | PermissionFlags.BAN_MEMBERS);
  });

  it('should remove a permission', () => {
    const calculator = new PermissionCalculator(PermissionFlags.KICK_MEMBERS);
    calculator.remove(PermissionFlags.KICK_MEMBERS);
    expect(calculator.value).toBe(0n);
  });

  it('should remove multiple permissions', () => {
    const calculator = new PermissionCalculator([PermissionFlags.KICK_MEMBERS, PermissionFlags.BAN_MEMBERS]);
    calculator.remove([PermissionFlags.KICK_MEMBERS, PermissionFlags.BAN_MEMBERS]);
    expect(calculator.value).toBe(0n);
  });

  it('should check if permissions are present', () => {
    const calculator = new PermissionCalculator([PermissionFlags.KICK_MEMBERS, PermissionFlags.BAN_MEMBERS]);
    expect(calculator.has(PermissionFlags.KICK_MEMBERS)).toBe(true);
    expect(calculator.has(PermissionFlags.BAN_MEMBERS)).toBe(true);
    expect(calculator.has(PermissionFlags.ADMINISTRATOR)).toBe(false);
  });

  it('should get the list of permissions', () => {
    const calculator = new PermissionCalculator([PermissionFlags.KICK_MEMBERS, PermissionFlags.BAN_MEMBERS]);
    const permissionsList = calculator.getPermissionsList();
    expect(permissionsList).toEqual(['KICK_MEMBERS', 'BAN_MEMBERS']);
  });

  it('should get permissions from value', () => {
    const permissionsList = PermissionCalculator.getPermissionsFromValue(
      PermissionFlags.ADMINISTRATOR | PermissionFlags.BAN_MEMBERS,
    );
    permissionsList.sort();
    expect(permissionsList).toEqual(['ADMINISTRATOR', 'BAN_MEMBERS']);
  });

  it('should parse permission from string', () => {
    const perm = PermissionCalculator.parsePermission('ADMINISTRATOR');
    expect(perm).toBe(PermissionFlags.ADMINISTRATOR);
  });

  it('should parse permission from bigint', () => {
    const perm = PermissionCalculator.parsePermission(PermissionFlags.KICK_MEMBERS);
    expect(perm).toBe(PermissionFlags.KICK_MEMBERS);
  });

  it('should throw error for invalid permission key', () => {
    // @ts-expect-error Testing invalid input
    expect(() => PermissionCalculator.parsePermission('INVALID_KEY')).toThrowError(
      'Invalid permission key: INVALID_KEY',
    );
  });

  it('should throw error for invalid permission type', () => {
    // @ts-expect-error Testing invalid input
    expect(() => PermissionCalculator.parsePermission(123)).toThrowError('Invalid permission type: number');
  });

  it('should parse permissions from array of strings', () => {
    const perms = PermissionCalculator.parsePermissions(['KICK_MEMBERS', 'BAN_MEMBERS']);
    expect(perms).toBe(PermissionFlags.KICK_MEMBERS | PermissionFlags.BAN_MEMBERS);
  });

  it('should parse permissions from array of bigints', () => {
    const perms = PermissionCalculator.parsePermissions([PermissionFlags.KICK_MEMBERS, PermissionFlags.BAN_MEMBERS]);
    expect(perms).toBe(PermissionFlags.KICK_MEMBERS | PermissionFlags.BAN_MEMBERS);
  });

  it('should handle empty permission input', () => {
    const perms = PermissionCalculator.parsePermissions([]);
    expect(perms).toBe(0n);
  });

  it('should return the correct bigint value from parse()', () => {
    const parsedValue = PermissionCalculator.parse('123');
    expect(parsedValue).toBe(123n);
  });

  it('should return 0n for invalid bigint strings in parse()', () => {
    const parsedValue = PermissionCalculator.parse('invalid');
    expect(parsedValue).toBe(0n);
  });
});
