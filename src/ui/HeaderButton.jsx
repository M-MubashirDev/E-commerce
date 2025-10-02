import { Button } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa";

function HeaderButton({ title, handleFunction }) {
  return (
    <Button
      rightSection={<FaArrowRight size={16} />}
      onClick={handleFunction}
      className="flex items-center gap-2"
    >
      {title}
    </Button>
  );
}

export default HeaderButton;
