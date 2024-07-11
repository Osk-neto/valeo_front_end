class MockAuthAPI {
  login = async (
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    user: { email: string; password: string } | null;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "user@example.com" && password === "123123") {
          resolve({ success: true, user: { email, password } });
        } else {
          resolve({ success: false, user: null });
        }
      }, 1000);
    });
  };
}

export const mockAuthAPI = new MockAuthAPI();
