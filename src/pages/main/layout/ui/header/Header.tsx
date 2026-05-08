import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { HeaderProps } from "./types";

export const Header = ({ data }: HeaderProps) => {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();

  const isHome = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      const isInsideLang = langRef.current?.contains(target);
      const isInsideMenu = menuRef.current?.contains(target);
      const isInsideBurger = burgerRef.current?.contains(target);

      if (isLangOpen && !isInsideLang) {
        setIsLangOpen(false);
      }

      if (isMenuOpen && !isInsideMenu && !isInsideBurger) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isLangOpen, isMenuOpen]);

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

  if (!data?.site_name) return null;

  const words = data.site_name.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logoSection}>
          {!isHome ? (
            <NavLink to="/" className={styles.logoLink} aria-label="На главную">
              <img
                className={styles.logoImage}
                src="/images/logo.svg"
                alt={data.site_name}
              />
              <span className={styles.logoText}>
                <span className={styles.logoTextFirst}>{firstWord}</span>
                <br />
                {restWords}
              </span>
            </NavLink>
          ) : (
            <div className={styles.logo}>
              <img
                className={styles.logoImage}
                src="/images/logo.svg"
                alt={data.site_name}
              />
              <span className={styles.logoText}>
                <span className={styles.logoTextFirst}>{firstWord}</span>
                <br />
                {restWords}
              </span>
            </div>
          )}
        </div>

        <nav className={styles.headerNav} aria-label="Главное меню">
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                <span className={styles.navLabelDesktop}>
                  {t("header.menu.projects_desktop")}
                </span>
                <span className={styles.navLabelTablet}>
                  {t("header.menu.projects_tablet")}
                </span>
              </NavLink>
            </li>

            <li className={styles.navListItem}>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                {t("header.menu.about")}
              </NavLink>
            </li>

            <li className={styles.navListItem}>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                {t("header.menu.contacts")}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.headerActions}>
          {/* LANGUAGE SWITCHER */}
          <div className={styles.langSwitcher} ref={langRef}>
            <button
              type="button"
              className={styles.langSwitcherButton}
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={() => {
                setIsLangOpen((prev) => !prev);
                setIsMenuOpen(false);
              }}
            >
              <span className={styles.langSwitcherCurrent}>{displayCode}</span>

              <span className={styles.langSwitcherArrow} aria-hidden="true">
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
              className={`${styles.langSwitcherList} ${
                isLangOpen ? styles.langSwitcherListOpen : ""
              }`}
              role="listbox"
              aria-label="Выбор языка"
            >
              {data.languages.map((lang) => (
                <li
                  key={lang.code}
                  className={`${styles.langSwitcherItem} ${
                    i18n.language === lang.code
                      ? styles.langSwitcherItemActive
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
            ref={burgerRef}
            type="button"
            className={`${styles.burgerButton} ${
              isMenuOpen ? styles.burgerButtonOpen : ""
            }`}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setIsLangOpen(false);
            }}
          >
            <span className={styles.burgerButtonMenu} />
            <span className={styles.burgerButtonMenu} />
            <span className={styles.burgerButtonMenu} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        ref={menuRef}
      >
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? `${styles.mobileMenuLink} ${styles.mobileMenuLinkActive}`
              : styles.mobileMenuLink
          }
          onClick={() => setIsMenuOpen(false)}
        >
          {t("header.menu.projects_desktop")}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? `${styles.mobileMenuLink} ${styles.mobileMenuLinkActive}`
              : styles.mobileMenuLink
          }
          onClick={() => setIsMenuOpen(false)}
        >
          {t("header.menu.about")}
        </NavLink>

        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            isActive
              ? `${styles.mobileMenuLink} ${styles.mobileMenuLinkActive}`
              : styles.mobileMenuLink
          }
          onClick={() => setIsMenuOpen(false)}
        >
          {t("header.menu.contacts")}
        </NavLink>
      </div>
    </header>
  );
};