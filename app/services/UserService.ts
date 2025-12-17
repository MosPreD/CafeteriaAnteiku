class UserService {
  async login(email: string, password: string) {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Error de login");
    }

    return res.json();
  }
}

const userService = new UserService();
export default userService;
