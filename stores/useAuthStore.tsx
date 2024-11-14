import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthFormProps {
  emailAddress: string;
  password: string;
  username: string;
}

interface AuthStoreInterface {
  client_instance: PocketBase;
  form: AuthFormProps;
  session: RecordAuthResponse<RecordModel> | null;
  isAuthing: boolean;
  isLoggedIn: boolean;
  loadStoredSession: () => Promise<void>;
  clearStoredSession: () => Promise<void>;
  handleValidation: () => boolean;
  handleLogin: () => Promise<void>;
  handleRegister: () => Promise<void>;
  setEmailAddress: (val: string) => void;
  setPassword: (val: string) => void;
  setUsername: (val: string) => void;
  setIsAuthing: (val: boolean) => void;
  clearForm: () => void;
}

const useAuthStore = create<AuthStoreInterface>()(
  immer((set, get) => ({
    client_instance: new PocketBase("https://discotaux.pockethost.io/"),
    form: {
      emailAddress: "",
      password: "",
      username: "",
    },
    session: {
      record: {
        avatar: "",
        collectionId: "",
        collectionName: "",
        created: "",
        email: "",
        emailVisibility: false,
        id: "",
        name: "",
        updated: "",
        username: "",
        verified: false,
      },
      token: "",
    },
    isAuthing: false,
    isLoggedIn: false,
    loadStoredSession: async () => {
      try {
        let session = await AsyncStorage.getItem("@session");
        if (session) {
          set({ isAuthing: true });
          let parsedSession = JSON.parse(session);
          set({ session: parsedSession });
          get().client_instance.authStore.save(parsedSession.token);
          if (get().client_instance.authStore.isValid) {
            try {
              const refreshedData = await get()
                .client_instance.collection("users")
                .authRefresh();

              set({ session: refreshedData });

              await AsyncStorage.setItem(
                "@session",
                JSON.stringify(refreshedData)
              );
              console.log(refreshedData);
              set({ isAuthing: false });
              set({ isLoggedIn: true });
            } catch (error) {
              get().clearStoredSession();
              set({ isAuthing: false, isLoggedIn: false });
            }
          }
        } else {
        }
      } catch (err) {
        return;
      }
    },
    clearStoredSession: async () => {
      await AsyncStorage.removeItem("@session");
    },
    handleValidation: () => {
      const { emailAddress, password } = get().form;
      if (!emailAddress || !password) {
        ToastAndroid.show(
          `Email and Password fields cannot be empty.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailAddress)) {
        ToastAndroid.show(
          `Please enter a valid email address.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return false;
      }

      if (password.length < 8) {
        ToastAndroid.show(
          `Password must be at least 8 characters long.`,
          ToastAndroid.SHORT
        );
        set({ isAuthing: false });
        return false;
      }

      return true;
    },
    handleLogin: async () => {
      let validated = get().handleValidation();
      if (validated) {
        try {
          const authData = await get()
            .client_instance.collection("users")
            .authWithPassword(get().form.emailAddress, get().form.password);
          set({ session: authData });
          await AsyncStorage.setItem("@session", JSON.stringify(authData));
          set({ isAuthing: false });
          set({ isLoggedIn: true });
        } catch (error) {
          set({ isAuthing: false });
          set({ isLoggedIn: false });
          get().clearForm();
          ToastAndroid.show(
            `Login failed, please check your credentials.`,
            ToastAndroid.SHORT
          );
        }
      }
    },
    handleRegister: async () => {
      const validation = get().handleValidation();

      if (validation) {
        try {
          const registrationData = await get()
            .client_instance.collection("users")
            .create({
              email: get().form.emailAddress,
              password: get().form.password,
              passwordConfirm: get().form.password,
              username: get().form.username,
            });

          const authData = await get()
            .client_instance.collection("users")
            .authWithPassword(get().form.emailAddress, get().form.password);

          set({ session: authData });

          await AsyncStorage.setItem("@session", JSON.stringify(authData));
          set({ isAuthing: false, isLoggedIn: true });
        } catch (error) {
          set({ isAuthing: false, isLoggedIn: false });
          get().clearForm();

          ToastAndroid.show(
            `Register failed: ${
              error.details || error.message || "Unknown error occurred"
            }`,
            ToastAndroid.LONG
          );
        }
      }
    },
    setEmailAddress: (val: string) =>
      set({ form: { ...get().form, emailAddress: val } }),
    setPassword: (val: string) =>
      set({ form: { ...get().form, password: val } }),
    setUsername: (val: string) =>
      set({ form: { ...get().form, username: val } }),
    setIsAuthing: (val: boolean) => set({ isAuthing: val }),
    clearForm: () => {
      set({
        form: {
          emailAddress: "",
          password: "",
          username: "",
        },
      });
    },
  }))
);

export default useAuthStore;
