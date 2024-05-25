import { User as ZiggleUser } from '@/api/auth/auth';

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module 'next-auth' {
  interface User extends ZiggleUser {}
  interface Session {
    user: ZiggleUser;
    accessToken: string;
  }
  interface Account {
    expires_in: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    studentNumber: string;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
  }
}
