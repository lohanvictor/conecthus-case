type Props = {
  title: string;
};

export function SectionTitle(props: Props) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-sm font-semibold text-foreground whitespace-nowrap">
        {props.title}
      </h2>
      <div className="h-px w-full bg-border" />
    </div>
  );
}
