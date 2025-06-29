import { User } from '../models/user.model';

export type Gender = 'male' | 'female' | 'other';

export class UserUtils {
  static getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`.trim();
  }

  static getDisplayName(user: User): string {
    const fullName = this.getFullName(user);
    return fullName || user.username || user.email;
  }

  static getInitials(user: User): string {
    const firstName = user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastName = user.lastName?.charAt(0)?.toUpperCase() || '';
    return firstName + lastName || user.username?.charAt(0)?.toUpperCase() || '?';
  }
} 