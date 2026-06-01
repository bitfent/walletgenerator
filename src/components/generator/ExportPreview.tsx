type Props = {
  content: string;
};

export default function ExportPreview({ content }: Props) {
  return (
    <pre className="max-h-80 overflow-auto rounded-lg border border-ink-700 bg-ink-950 p-4 text-xs leading-relaxed">
      <code className="font-mono text-slate-300">{content}</code>
    </pre>
  );
}
