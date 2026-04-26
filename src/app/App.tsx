import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./providers/router";
//import { useTranslation } from "react-i18next"
import { Header } from "../pages/main/layout/header/ui/Header";

function App() {
  // const { t } = useTranslation("common");
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
