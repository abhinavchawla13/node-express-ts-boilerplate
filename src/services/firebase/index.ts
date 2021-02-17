import admin from 'firebase-admin';
import config from '../../config/config';

export function initializeFirebase(): void {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      clientEmail: config.firebase.clientEmail,
      privateKey: config.firebase.privateKey.replace(/\\n/g, '\n'),
    }),
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createUser(userInfo: any): Promise<admin.auth.UserRecord> {
  return admin.auth().createUser(userInfo);
}

export function verifyIdToken(
  token: string,
): Promise<admin.auth.DecodedIdToken> {
  return admin.auth().verifyIdToken(token);
}
