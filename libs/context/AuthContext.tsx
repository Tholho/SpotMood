import { use, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "../storage/secureStorage";

export type AuthTokens = {
  accessToken: string | null;
  //  refreshToken: string | null;
  //  expiresIn: number | null;
};

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  setSession: (tokens: AuthTokens | null) => void;
  session: AuthTokens | string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  setSession: () => null,
  session: {
    accessToken: null,
    //  refreshToken: null,
    //  expiresIn: null,
  },
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] =
    useStorageState<AuthTokens>("session");
  return (
    <AuthContext
      value={{
        signIn: () => {},
        signOut: () => setSession(null),
        setSession,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
