import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Producao from "./pages/Producao/Producao";
import Financeiro from "./pages/Financeiro/Financeiro";
import Pix from "./pages/Pix/Pix";
import Usuarios from "./pages/Usuarios/Usuarios";
import Notificacoes from "./pages/Notificacoes/Notificacoes";
import FechamentoMensal from "./pages/FechamentoMensal/FechamentoMensal";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/producao"
          element={
            <ProtectedRoute>
              <Producao />
            </ProtectedRoute>
          }
        />

        <Route
          path="/financeiro"
          element={
            <ProtectedRoute>
              <Financeiro />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pix"
          element={
            <ProtectedRoute>
              <Pix />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Usuarios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notificacoes"
          element={
            <ProtectedRoute>
              <Notificacoes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fechamento"
          element={
            <ProtectedRoute>
              <FechamentoMensal />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}