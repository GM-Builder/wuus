import { MarketingFooter } from "./marketing/shell";
import s from "./marketing/marketing.module.css";
export function Footer() {
  return (
    <div className={s.site}>
      <MarketingFooter language="id" />
    </div>
  );
}
