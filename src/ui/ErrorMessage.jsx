import { Alert } from "@mantine/core";

function ErrorMessage({ error }) {
  return (
    <Alert title="Error" color="red" variant="filled" radius="md">
      {error.message}
    </Alert>
  );
}

export default ErrorMessage;
