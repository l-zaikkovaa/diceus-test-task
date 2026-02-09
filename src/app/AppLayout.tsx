import type { IconType } from "react-icons";
import { HiHome } from "react-icons/hi";
import { HiOutlineDatabase } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOutlineAdjustments } from "react-icons/hi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

import styles from "./AppLayout.module.scss";

type NavItem = {
  id: "dashboard" | "accounts" | "brokers" | "submissions" | "orgs" | "goals" | "admin";
  label: string;
  icon: IconType;
  to?: "/dashboard" | "/account";
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: HiHome, to: "/dashboard" },
  { id: "accounts", label: "Accounts", icon: HiOutlineDatabase, to: "/account" },
  { id: "brokers", label: "Brokers", icon: HiOutlineUsers },
  { id: "submissions", label: "Submissions", icon: HiOutlineDocumentText },
  { id: "orgs", label: "Organizations", icon: HiOutlineOfficeBuilding },
  { id: "goals", label: "Goals & Rules", icon: HiOutlineAdjustments },
  { id: "admin", label: "Admin", icon: HiOutlineShieldCheck },
] satisfies readonly NavItem[];

export function AppLayout() {
  return (
    <>
      <header className={styles.topbar}>
        <div className={styles.greeting}>
          Hi Arthur, welcome! You have <b>12</b> open tasks
        </div>
        <div className={styles.topbarRight}>
          <input className={styles.search} placeholder="Search" />
          <div className={styles.avatar}>AR</div>
        </div>
      </header>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ id, label, icon: Icon, to }) => {
          if (to) {
            return (
              <NavLink
                key={id}
                to={to}
                className={({ isActive }) => `${styles.navPill} ${isActive ? styles.active : ""}`}
              >
                <Icon className={styles.navIcon} aria-hidden />
                <span>{label}</span>
              </NavLink>
            );
          }

          return (
            <button key={id} type="button" className={styles.navPill} onClick={() => {}}>
              <Icon className={styles.navIcon} aria-hidden />
              <span>{label}</span>
            </button>
          );
        })}

        <button type="button" className={styles.navMore} aria-label="More">
          →
        </button>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
