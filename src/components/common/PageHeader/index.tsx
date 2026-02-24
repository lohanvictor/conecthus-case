"use client";

type Props = {
  title: string;
};

export function PageHeader(props: Props) {
  return (
    <header className="w-full h-8">
      <h1>{props.title}</h1>
    </header>
  );
}
