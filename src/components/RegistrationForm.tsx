import { FormEvent, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { registerUser, RegistrationData } from "../api/auth";

export interface RegistrationFormProps {
  onSubmit?: (data: RegistrationData) => void | Promise<void>;
}

/**
 * Форма регистрации.
 * Все поля хранятся в state, а сообщения об ошибках выводит simple-react-validator.
 */
function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [, forceUpdate] = useState(0);

  // useRef нужен, чтобы не создавать новый validator при каждом рендере.
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: {
        forceUpdate: () => forceUpdate((value) => value + 1),
      },
      messages: {
        required: "Поле обязательно",
        email: "Введите корректный email",
        // Пишем число явно, чтобы сообщение было нормальным и тест проверял реальный текст.
        min: "Пароль должен содержать минимум 8 символов",
      },
    }),
  ).current;

  // Для disabled используем простую проверку значений.
  // Сообщения об ошибках при этом всё равно обрабатывает simple-react-validator.
  const formLooksValid =
    login.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 8;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validator.allValid() || !formLooksValid) {
      validator.showMessages();
      forceUpdate((value) => value + 1);
      return;
    }

    const data: RegistrationData = { login, email, password };

    setSending(true);
    setSubmitted(false);

    try {
      await registerUser(data);
      await onSubmit?.(data);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="card">
      <p className="eyebrow">React + TypeScript</p>
      <h1>Registration</h1>
      <p className="lead">Создайте аккаунт, заполнив все поля формы.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="login">Login</label>
        <input
          id="login"
          type="text"
          value={login}
          onChange={(event) => {
            setLogin(event.target.value);
            setSubmitted(false);
          }}
          onBlur={() => {
            validator.showMessageFor("login");
            forceUpdate((value) => value + 1);
          }}
          autoComplete="username"
        />
        <div className="error">
          {validator.message("login", login, "required")}
        </div>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSubmitted(false);
          }}
          onBlur={() => {
            validator.showMessageFor("email");
            forceUpdate((value) => value + 1);
          }}
          autoComplete="email"
        />
        <div className="error">
          {validator.message("email", email, "required|email")}
        </div>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setSubmitted(false);
          }}
          onBlur={() => {
            validator.showMessageFor("password");
            forceUpdate((value) => value + 1);
          }}
          autoComplete="new-password"
        />
        <div className="error">
          {validator.message("password", password, "required|min:8")}
        </div>

        <button type="submit" disabled={!formLooksValid || sending}>
          {sending ? "Sending..." : "Register"}
        </button>

        {submitted && (
          <p className="success" role="status">
            Registration Successful!
          </p>
        )}
      </form>
    </section>
  );
}

export default RegistrationForm;
