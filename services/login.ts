import axios from "axios";
import { create } from "zustand";
import { createAuthCookie } from "@/actions/auth.action";
import { LoginFormType } from "@/helpers/types";

interface LoginStore {
  adminLogin: (values: LoginFormType) => Promise<any>;
}

const useLoginStore = create<LoginStore>((set) => ({
  adminLogin: async (values: LoginFormType) => {
    try {
      const verifyAdminCredentias = await axios.post(
        "http://localhost:3500/admin/login",
        values,
      );

      if (verifyAdminCredentias.status === 200) {
        localStorage.setItem("myauth", verifyAdminCredentias.data.adminId);
      }
      return { success: true };
    } catch (error) {
      console.log("Server error, failed to login ");
    }
  },
}));

export default useLoginStore;
