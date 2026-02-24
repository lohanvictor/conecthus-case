import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  path: {
    label: string;
    href: string;
  }[];
};

export function Breadcrumb(props: Props) {
  if (props.path.length === 0) return null;
  return (
    <div className="flex items-center gap-2">
      {props.path.map((item) => (
        <Fragment key={item.href}>
          <Link
            href={item.href}
            className="text-sm text-gray-500"
          >
            <span className="text-sm text-gray-500">{item.label}</span>
          </Link>
          <ChevronRight className="size-4 last:hidden" />
        </Fragment>
      ))}
    </div>
  );
}
