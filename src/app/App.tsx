import { BrowserRouter } from "react-router-dom";
import { CookieConsent } from "../features/cookie-consent/ui/CookieConsent";
import { AppRouter } from "./providers/router";
//import { useTranslation } from "react-i18next"

function App() {
  // const { t } = useTranslation("common");
  return (
    <BrowserRouter>
      <AppRouter />
      <CookieConsent />
    </BrowserRouter>
  );
}

export default App;
