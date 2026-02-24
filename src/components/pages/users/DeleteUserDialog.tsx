import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { User } from "@/services/userService";

type Props = {
    onOpenChange: (open: boolean) => void;
    user: User;
    onCancel: () => void;
    onConfirm: () => void;
};

export function DeleteUserDialog(props: Props) {
  return (
    <ConfirmDialog
      open
      onOpenChange={props.onOpenChange}
      title="Deseja excluir?"
      description={`O usuário ${props.user.name} será excluído.`}
      cancelButton={{
        label: "Cancelar",
        onClick: props.onCancel,
      }}
      confirmButton={{
        label: "Excluir",
        onClick: props.onConfirm,
      }}
    />
  );
}
