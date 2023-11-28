import ErrorPage from "@components/error/ErrorPage";

export default function PageNotFound() {
  return (
    <ErrorPage
      title="Not Found"
      description="We couldn't find the page you were looking for."
      withGoBack
    />
  );
}
