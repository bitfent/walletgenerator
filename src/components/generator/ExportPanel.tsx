import { useMemo, useState } from "react";
import type { WalletSet } from "../../lib/types/wallet";
import { EXPORT_SPECS, serialize, type ExportFormat } from "../../lib/exports";
import { downloadFile } from "../../lib/utils/download";
import { copyToClipboard } from "../../lib/utils/clipboard";
import ExportPreview from "./ExportPreview";

type Props = {
  sets: WalletSet[];
};

export default function ExportPanel({ sets }: Props) {
  const [format, setFormat] = useState<ExportFormat>("env");
  const [copied, setCopied] = useState(false);

  const spec = EXPORT_SPECS.find((s) => s.id === format)!;
  const content = useMemo(() => serialize(format, sets), [format, sets]);

  const handleCopy = async () => {
    if (await copyToClipboard(content)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Export</h3>
          <p className="text-sm text-slate-400">
            Drop these straight into your stack. Generated locally — never uploaded.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={handleCopy} className="btn-ghost">
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => downloadFile(spec.filename, content, spec.mime)}
            className="btn-primary"
          >
            Download {spec.filename}
          </button>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {EXPORT_SPECS.map((s) => {
          const active = s.id === format;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setFormat(s.id)}
              aria-pressed={active}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-accent-500 bg-accent-500/10 text-white"
                  : "border-ink-600 bg-ink-800 text-slate-300 hover:border-ink-500"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <ExportPreview content={content} />
    </div>
  );
}
