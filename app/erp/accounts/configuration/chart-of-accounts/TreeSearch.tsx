"use client";

type Props = {
  query: string;
  onChange: (value: string) => void;
};

export default function TreeSearch({ query, onChange }: Props) {
  return (
    <div className="mb-4">
      <input
        className="w-full rounded border px-3 py-2 text-sm"
        placeholder="بحث في شجرة الحسابات بالاسم أو الكود..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
