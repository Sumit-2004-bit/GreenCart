import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =====================================================
     LOAD USER SESSION
     ===================================================== */

  useEffect(function () {
    const savedUser = localStorage.getItem("greencart_user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("greencart_user");
      }
    }

    setLoading(false);
  }, []);

  /* =====================================================
     REGISTER
     ===================================================== */

  function register(name, email, password) {
    const existingUser = localStorage.getItem("greencart_account");

    if (existingUser) {
      const account = JSON.parse(existingUser);

      if (account.email === email) {
        return {
          success: false,

          message: "An account with this email already exists.",
        };
      }
    }

    const account = {
      name,

      email,

      password,
    };

    localStorage.setItem(
      "greencart_account",

      JSON.stringify(account),
    );

    const loggedInUser = {
      name,

      email,
    };

    localStorage.setItem(
      "greencart_user",

      JSON.stringify(loggedInUser),
    );

    setUser(loggedInUser);

    return {
      success: true,

      message: "Account created successfully!",
    };
  }

  /* =====================================================
     LOGIN
     ===================================================== */

  function login(email, password) {
    const savedAccount = localStorage.getItem("greencart_account");

    if (!savedAccount) {
      return {
        success: false,

        message: "No account found. Please register first.",
      };
    }

    const account = JSON.parse(savedAccount);

    if (account.email !== email || account.password !== password) {
      return {
        success: false,

        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      name: account.name,

      email: account.email,
    };

    localStorage.setItem(
      "greencart_user",

      JSON.stringify(loggedInUser),
    );

    setUser(loggedInUser);

    return {
      success: true,

      message: "Welcome back!",
    };
  }

  /* =====================================================
     LOGOUT
     ===================================================== */

  function logout() {
    localStorage.removeItem("greencart_user");

    setUser(null);

    return {
      success: true,

      message: "You have been logged out successfully.",
    };
  }

  /* =====================================================
     CONTEXT VALUE
     ===================================================== */

  const value = {
    user,

    loading,

    register,

    login,

    logout,

    isLoggedIn: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
