import { useEffect, useState } from "react";
import { copyToClipboard } from "../../lib/utils/clipboard";
import { MASK } from "../../lib/utils/format";

type Props = {
  value: string;
  /** When true, the secret is shown regardless of local toggle (reveal-all). */
  forceReveal?: boolean;
  /** Optional confirmation prompt shown before the first reveal. */
  confirmMessage?: string;
  mono?: boolean;
};

export default function SecretReveal({ value, forceReveal, confirmMessage, mono = true }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (forceReveal) setRevealed(true);
  }, [forceReveal]);

  const show = revealed || Boolean(forceReveal);

  const handleReveal = () => {
    if (!show && confirmMessage && !window.confirm(confirmMessage)) return;
    setRevealed((r) => !r);
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`min-w-0 flex-1 break-all text-xs ${mono ? "font-mono" : ""} ${
          show ? "text-slate-200" : "select-none text-slate-500"
        }`}
        title={show ? value : undefined}
      >
        {show ? value : MASK}
      </span>
      <button
        type="button"
        onClick={handleReveal}
        className="shrink-0 rounded border border-ink-600 px-1.5 py-0.5 text-[11px] text-slate-300 hover:border-ink-500"
        aria-label={show ? "Hide" : "Reveal"}
      >
        {show ? "Hide" : "Reveal"}
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded border border-ink-600 px-1.5 py-0.5 text-[11px] text-slate-300 hover:border-ink-500"
        aria-label="Copy"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
