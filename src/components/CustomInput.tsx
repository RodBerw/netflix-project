import { Input, InputProps } from "@nextui-org/input";

export default function CustomInput(props: InputProps) {
  return (
    <Input
      classNames={{ inputWrapper: ["bg-gray-900", "bg-opacity-30"] }}
      variant="faded"
      radius="sm"
      {...props}
    />
  );
}
