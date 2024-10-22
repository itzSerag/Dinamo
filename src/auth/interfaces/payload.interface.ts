import { Role } from '../../common/enums';

export interface JWTPayload {
   // its an MongoDB ObjectID --> we can fix this later
   userId: any;
   username: string;
   role?: Role;
   iat?: number;
   exp?: number;
}
