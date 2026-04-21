import {create} from "zustand";
import axiosInstance from "../axiosInstance";

interface AuthState {
    isLoggedIn: boolean;
    authLoading: boolean;
    user: {id: string} | null;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    loginLocal: (email: string, password: string) => Promise<void>;
    loginGoogle: () => Promise<void>;
    registerLocal: (name: string, email: string, password: string) => Promise<void>;
}

const useAuth = create<AuthState>((set, get)=>({
    isLoggedIn: false,
    authLoading:false,   
    user:null,

    checkAuth: async () => {
        set({ authLoading: true }); // Start loading
        try{
            const response = await axiosInstance.get("/auth/check-auth");
            set({isLoggedIn: response.data.isAuthenticated, user: response.data.userId ? { id: response.data.userId } : null, authLoading: false});

            // ✅ This gets the latest state from the store
        console.log(get().isLoggedIn, get().user);
        }
        catch(error){
            console.error("Error checking auth:", error);
            set({isLoggedIn: false, user: null, authLoading: false});
        }
    },
    logout: async () => {
        set({ authLoading: true }); // Start loading
        try{
            await axiosInstance.delete("/auth/logout/local");
            set({isLoggedIn: false, user: null, authLoading: false});
        }
        catch(error){
            console.error("Error during logout:", error);
            set({authLoading: false,});
        }
    },
    
    loginLocal: async (email: string, password: string) => {
        set({ authLoading: true }); // Start loading
        try{
            const response = await axiosInstance.post("/auth/login/local", { email, password });
            if(response.status === 200){
                set({isLoggedIn: true, user: response.data.userId ? { id: response.data.userId } : null,});
            }
        }
        catch(error){
            console.error("Error during login:", error);
            set({isLoggedIn: false, user: null});
        }
        set({ authLoading: false }); // End loading
    },

    loginGoogle: async () => {
        set({ authLoading: true }); // Start loading
        try{
            const response = await axiosInstance.get("/auth/login/google");
            if(response.status === 200){
                set({isLoggedIn: true, user: {id: response.data.userId}});
            }
        }
        catch(error){
            console.error("Error during Google login:", error);
            set({isLoggedIn: false, user: null});
        }
        set({ authLoading: false }); // End loading
    },

    registerLocal: async (name: string, email: string, password: string) => {
        set({ authLoading: true }); // Start loading
        try{
            const response = await axiosInstance.post("/auth/register/local", { name, email, password });
                set({isLoggedIn: response.data.isAuthenticated, user: {id: response.data.userId}});

            // return response;
        }
        catch(error){
            console.error("Error during registration:", error);
            set({isLoggedIn: false, user: null, });

            throw error;
        }
        set({ authLoading: false }); // End loading
    },

}));

export default useAuth;