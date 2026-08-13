import { Link } from "react-router-dom";

/**
 * Простая навигация между страницами.
 * Ссылка Register ведёт на страницу регистрации.
 */
function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link className="logo" to="/">
          TS Forms
        </Link>

        <nav className="nav" aria-label="Основная навигация">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
