import type { WalletSet } from "../../lib/types/wallet";
import WalletRow from "./WalletRow";

type Props = {
  sets: WalletSet[];
  forceReveal: boolean;
};

export default function WalletTable({ sets, forceReveal }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink-700">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead>
          <tr className="bg-ink-900 text-xs uppercase tracking-wide text-slate-500">
            <th className="px-3 py-2 font-medium">#</th>
            <th className="px-3 py-2 font-medium">Chain</th>
            <th className="px-3 py-2 font-medium">Network</th>
            <th className="px-3 py-2 font-medium">Address / Public Key</th>
            <th className="px-3 py-2 font-medium">Secret / Private Key</th>
            <th className="px-3 py-2 font-medium">Notes</th>
          </tr>
        </thead>
        {sets.map((set) => (
          <WalletRow key={set.index} set={set} forceReveal={forceReveal} />
        ))}
      </table>
    </div>
  );
}
