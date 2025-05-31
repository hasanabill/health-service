import 'next-auth';
import { UserRole } from '@/models/User';

declare module 'next-auth' {
    interface User {
        role: UserRole;
    }

    interface Session {
        user: User & {
            role: UserRole;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: UserRole;
    }
} 