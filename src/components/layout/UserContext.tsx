'use client';

import React, { createContext, useState } from 'react';

export interface User {
    username: string;
    password: string;
}

interface UserContextType {
    getUser: () => string;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
    getUser: () => '',
    setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const getUser = () => user?.username ?? '';

    return (
        <UserContext.Provider value={{ getUser, setUser }}>
            {children}
        </UserContext.Provider>
    );
};