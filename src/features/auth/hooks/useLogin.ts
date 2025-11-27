import { useState } from "react";
import { LoginService } from "../services/loginService";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: any) => {
    setLoading(true);
    setError(null);

    const { error } = await LoginService(data);

    if (error) setError(error.message);

    setLoading(false);
  };

  return { login, loading, error };
}
