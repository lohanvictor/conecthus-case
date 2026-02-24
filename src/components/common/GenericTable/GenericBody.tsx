import * as UI from "@/components/ui/table";
import { TableProps } from ".";

export function GenericBody<T>({
  columns,
  data,
  emptyMessage,
}: Pick<TableProps<T>, "columns" | "data" | "emptyMessage">) {
  return (
    <UI.TableBody>
      {data.length === 0 ? (
        <UI.TableRow>
          <UI.TableCell
            colSpan={columns.length}
            className="px-4 py-8 text-center text-muted-foreground"
          >
            {emptyMessage}
          </UI.TableCell>
        </UI.TableRow>
      ) : (
        data.map((item, index) => (
          <UI.TableRow key={index}>
            {columns.map((column) => (
              <UI.TableCell key={column.key} className={column.classCell || ""}>
                {column.render
                  ? column.render(item, index)
                  : String(item[column.key as keyof T] ?? "")}
              </UI.TableCell>
            ))}
          </UI.TableRow>
        ))
      )}
    </UI.TableBody>
  );
}
