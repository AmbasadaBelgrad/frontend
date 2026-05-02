import { useTranslation } from "react-i18next";
import styles from "./ProjectsSearch.module.css";

interface ProjectsSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;// Возможность отключить поле поиска в мобильной версии
}

export const ProjectsSearch: React.FC<ProjectsSearchProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  ariaLabel,
  disabled = false,
}) => {
  const { t } = useTranslation("common");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <img
          src="/Watch all.svg"
          alt=""
          className={styles.searchIcon}
          aria-hidden="true"
        />

        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder || t("search.placeholder", "Поиск")}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel || t("search.ariaLabel", "Поиск проектов")}
        />

        {value && (
          <button
            className={styles.searchClear}
            onClick={handleClear}
            aria-label={t("search.clear", "Очистить")}
            type="button"
            disabled={disabled}
          >
            <img
              src="/cross.svg"
              alt=""
              className={styles.clearIcon}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  );
};