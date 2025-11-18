import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children }) {

  const reduxLogged = useSelector(state => state.login.isLoggedIn);
  const reduxNivel  = useSelector(state => state.login.nivel);

  const lsLogged = localStorage.getItem("isLoggedIn") === "true";
  const lsNivel  = (localStorage.getItem("nivel") || "").toLowerCase().trim();

  // Login válido se Redux OU LocalStorage for true
  const isAuthenticated = reduxLogged || lsLogged;

  // Decide o nível (redux tem prioridade)
  const nivel = (reduxNivel || lsNivel).toLowerCase();

  // Níveis aceitos como admin
  const adminRoles = ["administrador", "admin", "adm", "1"];

  const isAdmin = adminRoles.includes(nivel);

  // ===== DEBUG =====
  console.log("🔐 Protected Debug");
  console.log("Redux isLoggedIn:", reduxLogged);
  console.log("Redux nivel:", reduxNivel);
  console.log("LS isLoggedIn:", lsLogged);
  console.log("LS nivel:", lsNivel);
  console.log("→ isAuthenticated:", isAuthenticated);
  console.log("→ isAdmin:", isAdmin);

  // Se não logou → volta
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se logou mas não é admin → bloqueia
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
