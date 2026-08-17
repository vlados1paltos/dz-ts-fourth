export type RegistrationData = {
  login: string;
  email: string;
  password: string;
};

const REGISTRATION_URL = "https://jsonplaceholder.typicode.com/users";

/**
 * Отправляет данные регистрации на тестовый API.
 * Используем fetch с POST-запросом, чтобы форма работала так же,
 * как при отправке данных на настоящий сервер.
 */
export async function registerUser(
  data: RegistrationData,
): Promise<{ ok: true }> {
  const response = await fetch(REGISTRATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Если сервер вернул ошибку, передаём её выше в компонент.
  if (!response.ok) {
    throw new Error("Не удалось отправить данные регистрации");
  }

  // Читаем ответ сервера, как при обычной работе с REST API.
  await response.json();

  return { ok: true };
}
