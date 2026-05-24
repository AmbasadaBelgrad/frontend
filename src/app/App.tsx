import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./providers/query/QueryProvider";
import { AppRouter } from "./providers/router";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";
//import { useTranslation } from "react-i18next"

function App() {
  // const { t } = useTranslation("common");
  return (
    <QueryProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryProvider>
  );
}

export default App;
