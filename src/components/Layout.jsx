import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div style={styles.app}>
      <Sidebar />

      <div style={styles.content}>
        <Header />

        <main style={styles.main}>
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#F8FAFC",
    fontFamily:
      "'Poppins', sans-serif",
  },

  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: "260px",
  },

  main: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
};