import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm", () => {
  test("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<RegistrationForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("validates inputs and enables submit button when data is valid", () => {
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

  test("submits valid registration data", async () => {
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
