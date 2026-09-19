interface Props {
  label: string;
  value: string;
  description: string;
}

export default function IndicatorCard({ label, value, description }: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#101010] p-5 transition hover:border-neutral-700 hover:bg-[#141414]">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-xs leading-5 text-zinc-600">{description}</p>
    </div>
  );
}