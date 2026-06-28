import styles from "./Layout.module.css";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <div className={styles.app}>
      <Sidebar />

      <div className={styles.content}>
        <Header />

        <main className={styles.main}>
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}