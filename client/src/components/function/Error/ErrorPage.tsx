import { isRouteErrorResponse, useRouteError } from "react-router-dom";

interface Props {
  suppliedError?: string;
}

export default function ErrorPage({ suppliedError }: Props) {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex h-screen flex-col items-center justify-center gap-4"
    >
      <h1 className="text-4xl">Oops 🫤</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {suppliedError ||
          (isRouteErrorResponse(error) && (error.statusText || error.data))}
      </p>
    </div>
  );
}
