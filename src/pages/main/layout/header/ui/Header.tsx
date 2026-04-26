import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useInit } from "../../../../../shared/api/useInit";

export const Header = () => {
  const { data, loading, error } = useInit();
  console.log("init", { data, loading, error });
  console.log(data);

  const { t, i18n } = useTranslation("common");
  const location = useLocation();

  const isHome = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const langRef = useRef<HTMLDivElement | null>(null); // Закрытие меню при смене страницы
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Закрытие dropdown языка по Escape

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLangOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
    setIsLangOpen(false);
  };

  const currentLangCode = i18n.language;

  const displayCode =
    currentLangCode === "sr-Latn" || currentLangCode === "sr-Cyrl"
      ? "sr"
      : currentLangCode;

  if (loading) return null;
  if (error) return null;
  if (!data?.site_name) return null;

  const words = data.site_name.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <header className="header">
      <div className="header__top">
        <div className="logo-section">
          {!isHome ? (
            <NavLink to="/" className="logo-link" aria-label="На главную">
              <img src="/images/logo.svg" alt={data.site_name} />
              <span className="logo__text">
                <span className="logo__text-first">{firstWord}</span>{" "}
                {restWords}
              </span>
            </NavLink>
          ) : (
            <div className="logo">
              <img src="/images/logo.svg" alt={data.site_name} />
              <span className="logo__text">
                <span className="logo__text-first">{firstWord}</span>{" "}
                {restWords}
              </span>
            </div>
          )}
        </div>
        <nav className="header__nav" aria-label="Главное меню">
          <ul className="nav-list">
            <li className="nav-list__item">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                <span className="nav-label nav-label--desktop">
                  {t("header.menu.projects_desktop")}
                </span>
                <span className="nav-label nav-label--tablet">
                  {t("header.menu.projects_tablet")}
                </span>
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                {t("header.menu.about")}
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                {t("header.menu.contacts")}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__actions">
          {/* LANGUAGE SWITCHER */}
          <div className="lang-switcher" ref={langRef}>
            <button
              type="button"
              className="lang-switcher__button"
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen((prev) => !prev)}
            >
              <span className="lang-switcher__current">{displayCode}</span>
              <span className="lang-switcher__arrow" aria-hidden="true">
                {isLangOpen ? (
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.92822 0L13.8564 12H1.95503e-05L6.92822 0Z"
                      fill="white"
                      fillOpacity="0.5"
                    />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.92822 12L13.8564 0H1.95503e-05L6.92822 12Z"
                      fill="white"
                      fillOpacity="0.5"
                    />
                  </svg>
                )}
              </span>
            </button>
            <ul
              className={`lang-switcher__list ${
                isLangOpen ? "lang-switcher__list--open" : ""
              }`}
              role="listbox"
              aria-label="Выбор языка"
            >
              {data.languages.map((lang) => (
                <li
                  key={lang.code}
                  className={`lang-switcher__item ${
                    i18n.language === lang.code
                      ? "lang-switcher__item--active"
                      : ""
                  }`}
                  role="option"
                  aria-selected={i18n.language === lang.code}
                  tabIndex={0}
                  onClick={() => changeLang(lang.code)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      changeLang(lang.code);
                    }
                  }}
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          </div>
          {/* BURGER */}
          <button
            type="button"
            className={`burger-button ${
              isMenuOpen ? "burger-button--open" : ""
            }`}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="burger-button__menu" />
            <span className="burger-button__menu" />
            <span className="burger-button__menu" />
          </button>
        </div>
      </div>
      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`}>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          {t("header.menu.projects_desktop")}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          {t("header.menu.about")}
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          {t("header.menu.contacts")}
        </NavLink>
      </div>
    </header>
  );
};
