import { MarketingHeader } from "./marketing/shell";
import s from "./marketing/marketing.module.css";
export function Navbar() {
  return (
    <div className={s.site}>
      <MarketingHeader language="id" />
    </div>
  );
}
