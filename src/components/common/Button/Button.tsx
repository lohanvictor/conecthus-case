import { Button as ButtonUI } from "@/components/ui/button";

type Props = {
  leftIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Button(props: React.PropsWithChildren<Props>) {
  return (
    <ButtonUI
      className={`cursor-pointer ${props.className}`}
      onClick={props.onClick}
    >
      {Boolean(props.leftIcon) && props.leftIcon}
      {props.children}
    </ButtonUI>
  );
}
