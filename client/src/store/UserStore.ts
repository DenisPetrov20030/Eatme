// stores/userStore.ts
import { UserShort } from "@/types/users/UserShort";
import { create } from "zustand";
import AuthService from "@/services/AuthService";
import { UserRegistration } from "@/types/auth/UserRegistration";
import { UserLogin } from "@/types/auth/UserLogin";

interface UserState {
    user: UserShort | null;
    isAuth: boolean;
    isLoading: boolean;
    setUser: (user: UserShort | null) => void;
    setIsAuth: (value: boolean) => void;
    setIsLoading: (value: boolean) => void;
    registrate: (data: UserRegistration) => void;
    login: (data: UserLogin) => void;
    logout: () => void;
    checkAuth: () => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    isAuth: false,
    isLoading: false,

    setUser: (user) => {
        set({ user });
    },

    setIsAuth: (value) => {
        set({ isAuth: value });
    },

    setIsLoading: (value: boolean) => {
        set({ isLoading: value });
    },

    registrate: async (data) => {
        set({ isLoading: true });
        try {
            const response = await AuthService.registrate(data);
            localStorage.setItem("accessToken", response.tokens.accessToken);
        } catch (e) {
            console.error(e);
        } finally {
            set({ isLoading: false });
        }
    },
    
    login: async (data) => {
        set({ isLoading: true });
        try {
            const response = await AuthService.login(data);
            localStorage.setItem("accessToken", response.tokens.accessToken);
            set({ user: response.user, isAuth: true });
        } catch (e) {
            console.log(e);
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await AuthService.logout();
            localStorage.removeItem('accessToken');
            set({ user: null, isAuth: false });
        } catch (e) {
            console.error(e);
        } finally {
            set({ isLoading: false });
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('accessToken', response.tokens.accessToken);
            set({ user: response.user, isAuth: true });
        } catch (e) {
            console.log(e);
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useUserStore;
