import * as UI from "@/components/ui/table";
import { TableProps } from ".";

export function GenericHeader<T>({ columns }: Pick<TableProps<T>, "columns">) {
  return (
    <UI.TableHeader>
      <UI.TableRow>
        {columns.map((column) => (
          <UI.TableHead key={column.key} className={column.classHeader || ""}>
            {column.label}
          </UI.TableHead>
        ))}
      </UI.TableRow>
    </UI.TableHeader>
  );
}
