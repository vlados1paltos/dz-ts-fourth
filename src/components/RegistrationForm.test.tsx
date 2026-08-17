import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import RegistrationForm from "./RegistrationForm";

// В тестах реальный запрос в интернет не нужен,
// поэтому fetch подменяем и проверяем сам факт правильной отправки данных.
const fetchMock = jest.fn() as jest.MockedFunction<typeof fetch>;

beforeEach(() => {
  globalThis.fetch = fetchMock;

  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ id: 1 }),
  } as Response);
});

afterEach(() => {
  fetchMock.mockReset();
});

describe("RegistrationForm", () => {
  test("renders correctly and matches snapshot", () => {
    // Snapshot фиксирует структуру формы и помогает заметить случайные изменения разметки.
    const { asFragment } = render(<RegistrationForm />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("validates inputs and enables submit button when data is valid", () => {
    // Проверяем главный сценарий валидации:
    // сначала кнопка заблокирована, после корректного заполнения становится активной.
    render(<RegistrationForm />);

    const loginInput = screen.getByLabelText(/login/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /register/i });

    expect(submitButton).toBeDisabled();

    fireEvent.change(loginInput, { target: { value: "TestUser" } });
    fireEvent.blur(loginInput);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.blur(passwordInput);

    expect(submitButton).not.toBeDisabled();
  });

  test("shows validation messages for incorrect data", () => {
    // Передаём заведомо неправильные значения и проверяем,
    // что пользователь получает понятные сообщения об ошибках.
    render(<RegistrationForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "wrong-email" } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText(/корректный email/i)).toBeInTheDocument();
    expect(screen.getByText(/минимум 8 символов/i)).toBeInTheDocument();
  });

  test("submits valid registration data with fetch request", async () => {
    // Проверяем полный сценарий отправки:
    // данные передаются через fetch POST-запросом и вызывается внешний onSubmit.
    const onSubmit = jest.fn();

    render(<RegistrationForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/login/i), {
      target: { value: "TestUser" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: "TestUser",
            email: "test@example.com",
            password: "password123",
          }),
        },
      );
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        login: "TestUser",
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(
      await screen.findByText(/registration successful/i),
    ).toBeInTheDocument();
  });
});
