import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  maxLength?: number;
  currentLength?: number;
}

export function TextInput({
  label,
  error,
  maxLength,
  currentLength,
  className,
  id,
  ...props
}: TextInputProps) {
  const showCounter = maxLength != null && currentLength != null;
  const overLimit = showCounter && currentLength > maxLength;

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} aria-invalid={!!error} className={className} {...props} />
      <div className={`min-h-4 flex ${showCounter ? "justify-between" : ""}`}>
        <span className="text-xs text-destructive">
          {error && (!overLimit || error !== `Máximo de ${maxLength} caracteres`)
            ? error
            : ""}
        </span>
        {showCounter && (
          <span
            className={`text-[0.65rem] ml-auto ${
              overLimit ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
