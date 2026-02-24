"use client";

import { Button } from "./Button";
import { useRouter } from "next/navigation";

type Props = {
  link?: string;
  disabled?: boolean;
};

export function BackButton(props: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (props.link) {
      router.push(props.link);
    } else {
      router.back();
    }
  };

  return (
    <Button
      leftIcon={{ name: "arrow_back" }}
      variant="secondary"
      onClick={handleClick}
      disabled={props.disabled}
    >
      Voltar
    </Button>
  );
}
