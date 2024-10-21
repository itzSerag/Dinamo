export interface JWTPayload {
   // its an MongoDB ObjectID --> we can fix this later
   userId: any;
   username: string;
   iat?: number;
   exp?: number;
}
