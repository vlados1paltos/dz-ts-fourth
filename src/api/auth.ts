export type RegistrationData = {
  login: string;
  email: string;
  password: string;
};

/**
 * Заглушка регистрации.
 * Имитирует отправку данных на сервер и возвращает успешный ответ.
 */
export async function registerUser(data: RegistrationData): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  console.log("Registration request:", data);

  return { ok: true };
}
