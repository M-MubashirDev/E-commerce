import { Center, Loader } from "@mantine/core";

export function Spinner() {
  return (
    <div className="w-full h-full p-6 flex justify-center items-center ">
      <Loader type="bars" c={"dark"} color="dark" />
    </div>
  );
}
export function PageSpinner() {
  return (
    <Center className="!w-screen !h-screen !max-w-screen !overflow-hidden">
      <Loader type="bars" color="dark" size="xl" />
    </Center>
  );
}
