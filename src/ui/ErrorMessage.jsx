import { Alert } from "@mantine/core";

function ErrorMessage({ error }) {
  console.log(error);
  return (
    <Alert title="Error" color="red" variant="filled" radius="md">
      {error}
    </Alert>
  );
}

export default ErrorMessage;
