import { ReflectMetadata } from '@nestjs/common';
import { UserRoles } from '../constants/user-roles.const';

export const Roles = (...roles: UserRoles[]) => ReflectMetadata('roles', roles);