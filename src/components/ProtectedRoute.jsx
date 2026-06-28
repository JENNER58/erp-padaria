import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {

    async function loadSession() {

      const { data } =
        await supabase.auth.getSession();

      setSession(data.session);
      setLoading(false);

    }

    loadSession();

    const {
      data: listener
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setSession(session);

      }
    );

    return () => {

      listener.subscription.unsubscribe();

    };

  }, []);

  if (loading) {

    return (
      <div style={styles.loading}>
        Carregando ERP...
      </div>
    );

  }

  if (!session) {

    return <Navigate to="/login" replace />;

  }

  return children;

}

const styles = {

  loading: {

    width: "100vw",
    height: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "20px",

    fontWeight: "600",

    background: "#F8FAFC",

    color: "#2563EB"

  }

};