import Link from "next/link";
import styles from "@/styles/Footer.module.scss";
//import styles2 from "@/styles/Global.scss";

export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className="layoutContentContainer">
        <div className={styles.layoutInner}>
          <div className={styles.brandName}>TINH HOA YẾN</div>
          <div className={styles.rights}>
            © 2025 Tinh Hoa Yến. All rights reserved.
          </div>
          <div className={styles.linkWrapper}>
            <Link className={styles.link} href="#">
              Facebook
            </Link>

            <Link className={styles.link} href="#">
              Instagram
            </Link>

            <Link className={styles.link} href="#">
              Zalo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
