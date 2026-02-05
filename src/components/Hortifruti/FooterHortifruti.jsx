import React, { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/horizontal/variacao_chapado.png";

export default function FooterHortifruti() {
  const [categorias, setCategorias] = useState([]);

  // 🔹 Carrega categorias do banco (mesmo endpoint do header)
  useEffect(() => {
    const url = "https://congolinaria.com.br/api/hortifruti_categorias.php";

    axios
      .get(url)
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];

        const norm = arr
          .map((c) => ({
            id: Number(c.id ?? c.categoria_id ?? 0),
            nome: String(c.nome ?? c.titulo ?? c.categoria ?? "").trim(),
            ordem: Number(c.ordem ?? 0),
          }))
          .filter((c) => c.id > 0 && c.nome);

        // ordena por ordem ou nome
        norm.sort((a, b) => {
          if (a.ordem && b.ordem) return a.ordem - b.ordem;
          return a.nome.localeCompare(b.nome, "pt-BR");
        });

        setCategorias(norm);
      })
      .catch(() => {
        // fallback mínimo (caso API falhe)
        setCategorias([
          { id: 1, nome: "Legumes" },
          { id: 2, nome: "Verduras" },
          { id: 6, nome: "Frutas" },
          { id: 3, nome: "Temperos" },
          { id: 4, nome: "Cogumelos" },
          { id: 5, nome: "Castanhas e Grãos" },
        ]);
      });
  }, []);

  // 🔹 Links do footer
  const navLinks = useMemo(() => {
    const links = [{ to: "/hortifruti", label: "Início" }];

    categorias.forEach((c) => {
      links.push({
        to: `/hortifruti?cat=${c.id}`,
        label: c.nome,
      });
    });

    return links;
  }, [categorias]);

  return (
    <footer className="bg-[#144D3A] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* COLUNA 1 */}
        <div>
          <Link to="/hortifruti">
            <img src={logo} className="h-12 mb-4" alt="Hortifruti Congolinaria" />
          </Link>

          <p className="text-sm text-[#E5E7EB]">
            Alimentar o corpo, celebrar a cultura, fortalecer o povo.
          </p>

          <p className="text-xs mt-4 text-[#C9A23F]">
            CNPJ do Congolinaria Empório: 00.000.000/0001-00
          </p>
        </div>

        {/* COLUNA 2 – NAV DINÂMICO */}
        <div>
          <h3 className="font-semibold mb-4 text-[#C9A23F] text-sm uppercase tracking-wide">
            Acesso Rápido
          </h3>

          <ul className="space-y-2 text-sm">
            {navLinks.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.to}
                  end={item.to === "/hortifruti"}
                  className={({ isActive }) =>
                    `transition font-medium ${
                      isActive ? "text-[#C9A23F]" : "text-white"
                    } hover:text-[#C9A23F]`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUNA 3 */}
        <div>
          <h3 className="font-semibold mb-4 text-[#C9A23F] text-sm uppercase tracking-wide">
            Contato
          </h3>

          <p className="text-sm">
            Email:{" "}
            <span className="text-[#C9A23F]">
              hortifruti@congolinaria.com.br
            </span>
          </p>

          <p className="text-sm mt-2">
            Telefone / WhatsApp: (11) 98045-1471
          </p>
        </div>
      </div>

      {/* RODAPÉ FINAL */}
      <div className="bg-[#0A2A1F] text-center py-4 text-xs text-[#C9A23F]">
        © {new Date().getFullYear()} Hortifruti Congolinaria — Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
