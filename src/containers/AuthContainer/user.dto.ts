import { UserRole } from '../../contexts/AuthContext';

export type UserDto = {
	id: number;
	username: string;
	role: UserRole;
	roleId?: number;
};
