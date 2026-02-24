import { Button as ButtonUI } from "@/components/ui/button";

type Props = {
  leftIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Button(props: React.PropsWithChildren<Props>) {
  return (
    <ButtonUI
      className={`cursor-pointer bg-[#0290A4] hover:bg-[#027a8b] ${props.className}`}
      onClick={props.onClick}
    >
      {Boolean(props.leftIcon) && props.leftIcon}
      {props.children}
    </ButtonUI>
  );
}
