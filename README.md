# @bloomlabs/permission-calculator

A utility package to manage Discord permission flags using bitwise operations, built for ease of use and flexibility with TypeScript.

## Features

- Define and manage permission flags using `bigint` values.
- Add, remove, and check permissions with an intuitive API.
- Support for resolving permissions by their names or `bigint` values.
- Retrieve a list of permission names from a combined permission value.

## Installation

Install the package:

```bash
npm install @bloomlabs/permission-calculator
```

```bash
yarn add @bloomlabs/permission-calculator
```

```bash
pnpm add @bloomlabs/permission-calculator
```

```bash
bun add @bloomlabs/permission-calculator
```

## Usage

### Importing the Package

```ts
import {
  PermissionFlags,
  PermissionCalculator,
} from "@bloomlabs/permission-calculator";
```

### Creating a Permission Calculator

```ts
// Initialize a PermissionCalculator with default permissions (none)
const permissions = new PermissionCalculator();

// Add permission to SEND_MESSAGES and MANAGE_CHANNELS
permissions.add(["SEND_MESSAGES", "MANAGE_CHANNELS"]);

// Check if a permission is present
console.log(permissions.has("SEND_MESSAGES")); // true

// Remove a permission
permissions.remove("SEND_MESSAGES");

// Get the combined permission value
console.log(permissions.value); // Permission value as bigint

// Get the list of permissions enabled
console.log(permissions.getPermissionsList()); // ['MANAGE_CHANNELS']
```

### Adding and Removing Permissions

```ts
// Add a single permission
permissions.add("BAN_MEMBERS");

// Add multiple permissions
permissions.add(["VIEW_AUDIT_LOG", "KICK_MEMBERS"]);

// Remove a permission
permissions.remove("BAN_MEMBERS");
```

### Checking Permissions

```ts
if (permissions.has("ADMINISTRATOR")) {
  console.log("User has administrator permissions");
}
```

### Static Methods

- **`PermissionCalculator.getPermissionsFromValue(value)`**: Get the list of permission names from a combined permission value.
- **`PermissionCalculator.parsePermissions(value)`**: Parse a permission or an array of permissions into a combined `bigint` value.

```ts
const permissionsList = PermissionCalculator.getPermissionsFromValue(
  permissions.value
);
console.log(permissionsList); // Output: ['VIEW_AUDIT_LOG', 'KICK_MEMBERS']
```

## API Reference

### `PermissionFlags`

A constant object containing all available permission flags. Each flag is a `bigint` value.

### `PermissionCalculator`

A class to manage permissions using bitwise operations.

#### Methods

- **`add(permission: PermissionFlagResolvable): this`**: Adds one or more permissions.
- **`remove(permission: PermissionFlagResolvable): this`**: Removes one or more permissions.
- **`has(permission: PermissionFlagResolvable): boolean`**: Checks if one or more permissions are included.
- **`get value(): bigint`**: Returns the combined permissions as a `bigint`.
- **`getPermissionsList(): string[]`**: Returns a list of permission names included in the current permissions.
- **`static getPermissionsFromValue(value: bigint | string | number | undefined | null): string[]`**: Returns a list of permission names from a combined permission value.
- **`static parse(value: bigint | string | number | undefined | null): bigint`**: Parses a value into a `bigint`.
- **`static parsePermissions(value: PermissionFlagResolvable): bigint`**: Parses a permission or array of permissions into a `bigint`.

## License

This package is licensed under the MIT License. See [LICENSE](./LICENSE) for more details.

---

Enjoy using the `@bloomlabs/permission-calculator` package! Feedback is welcome!
