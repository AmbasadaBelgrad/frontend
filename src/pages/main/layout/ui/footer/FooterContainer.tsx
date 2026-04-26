import { useInit } from "../../../../../shared/api/useInit";
import { Footer } from "./index";

export const FooterContainer = () => {
  const { data, loading } = useInit();

  return <Footer data={data} loading={loading} />;
};
