// --- SupportChat.jsx ---
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SugestaoAfroveg from "./../pages/Cardapio/SugestaoAfroveg"; // ajuste o caminho

// ========== CONFIG ==========
const API_BASE = "https://congolinaria.com.br/api/chat";
const KEY = "congolinaria_conversation_id";
const AUTO_OPEN_DELAY_MS = 600;
const AUTO_OPEN_KEY = "chat_auto_opened_once";

// Se o WAF bloquear requisições do browser, ative o proxy:
const USE_PROXY = false; // <- mude para true se usar /chat-proxy.php
const API_SEND  = USE_PROXY ? "/chat-proxy.php?action=send"    : `${API_BASE}/send.php`;
const API_HIST  = USE_PROXY ? "/chat-proxy.php?action=history" : `${API_BASE}/history.php`;
const API_ROUTE = `${API_BASE}/route.php`; // rota que define unidade e grava apresentação

// ============= MENUS =============
function MainMenu({ onSelect }) {
  return (
    <div className="text-[15px] md:text-[16px] max-w-[85%] bg-gray-100 text-gray-900 px-3 py-2 rounded-xl">
      <div className="font-medium mb-2">Olá! Escolha uma opção:</div>
      <div className="flex flex-col gap-1">
        {[
          ["1", "Cardápio"],
          ["2", "Endereço / Como chegar"],
          ["3", "Horários"],
          ["4", "Preço do rodízio"],
          ["5", "Reservas"],
          ["6", "Delivery"],
          ["7", "Pagamento"],
          ["8", "Atendimento humano"],
          ["9", "Alergênicos / restrições"],
        ].map(([k, label]) => (
          <button
            key={k}
            onClick={()=>onSelect(k)}
            className="w-full text-left px-3 py-2 text-[14px] md:text-[15px] rounded-md border hover:bg-black hover:text-white"
          >
            {k}) {label}
          </button>
        ))}
        <div className="flex flex-col gap-1 pl-3">
          <button onClick={()=>onSelect("9.1")} className="w-full text-left px-3 py-2 text-[14px] md:text-[15px] rounded-md border hover:bg-black hover:text-white">9.1) Sem glúten</button>
          <button onClick={()=>onSelect("9.2")} className="w-full text-left px-3 py-2 text-[14px] md:text-[15px] rounded-md border hover:bg-black hover:text-white">9.2) Sem lactose</button>
        </div>
        <button
          onClick={()=>onSelect("10")}
          className="w-full text-left mt-1 px-3 py-2 text-[14px] md:text-[15px] rounded-md border border-orange-300 hover:bg-orange-600 hover:text-white transition"
        >
          10) ⭐ Sugestões afroveg (com restrições)
        </button>
        <button onClick={()=>onSelect("0")} className="w-full text-left px-3 py-2 text-[14px] md:text-[15px] rounded-md border hover:bg-black hover:text-white">0) Eventos / grupos</button>
      </div>
      <div className="text-[12px] md:text-[13px] text-gray-600 mt-2">Dica: digite 99 para voltar ao menu.</div>
    </div>
  );
}

function AlergenoMenu({ onSelect, onOpenSugestao }) {
  return (
    <div className="text-[15px] md:text-[16px] max-w-[85%] bg-gray-100 text-gray-900 px-3 py-2 rounded-xl">
      <div className="font-medium mb-2">Alergênicos — escolha:</div>
      <div className="flex flex-col gap-1">
        <button onClick={()=>onSelect("9.1")} className="w-full text-left px-3 py-2 text-[14px] md:text-[15px] rounded-md border hover:bg-black hover:text-white">9.1) Sem glúten</button>
        <button onClick={()=>onSelect("9.2")} className="w-full text-left px-3 py-2 text-[14px] md:text-[15px] rounded-md border hover:bg-black hover:text-white">9.2) Sem lactose</button>
        <button onClick={()=>onSelect("9.0")} className="w-full text-left px-3 py-2 text-[14px] md:text-[15px] rounded-md border hover:bg-black hover:text-white">⬅️ Voltar (9.0)</button>
        <button
          onClick={onOpenSugestao}
          className="w-full text-left mt-1 px-3 py-2 text-[14px] md:text-[15px] rounded-md border border-orange-300 hover:bg-orange-600 hover:text-white transition"
        >
          ⭐ Ver sugestões afroveg (com restrições)
        </button>
      </div>
      <div className="text-[12px] md:text-[13px] text-gray-600 mt-2">Dica: 99 volta ao menu principal.</div>
    </div>
  );
}

// helpers para esconder menu textual do bot
const isBotMenuText = (txt="") => {
  const t = String(txt).toLowerCase();
  return (
    t.includes("escolha uma opção") ||
    t.includes("9.1") || t.includes("9.2") ||
    t.includes("dica: digite 99") ||
    t.startsWith("alergênicos — escolha") ||
    t.startsWith("alergenicos — escolha")
  );
};
const isBotAlergenoMenuText = (txt="") => {
  const t = String(txt).toLowerCase();
  return t.startsWith("alergênicos — escolha") || t.startsWith("alergenicos — escolha");
};

// ========= Card inline para handoff humano =========
function HumanInlineCard({ conversationId, messages, onCancel, onStart }) {
  const [unit, setUnit] = useState("sumare");
  const makeIntro = (u)=>{
    const list = Array.isArray(messages) ? messages : [];
    const lastUser = [...list].reverse().find(m=>m?.sender==='user');
    const unidade = u==='penha'?'Penha':'Sumaré';
    return `Olá! Gostaria de atendimento humano na unidade ${unidade}. Meu nome é ____. ${lastUser?.text ? `Ref.: "${lastUser.text}"` : ''}`;
  };
  const [intro, setIntro] = useState(makeIntro('sumare'));
  useEffect(()=>{ setIntro(makeIntro(unit)); }, [unit]); // eslint-disable-line

  return (
    <div className="max-w-[85%] bg-white border border-gray-200 shadow-sm rounded-xl p-3 text-gray-900">
      <div className="text-[15px] md:text-[16px] font-semibold mb-2">Atendimento humano</div>
      <div className="flex gap-2 mb-2">
        <button onClick={()=>setUnit('sumare')} className={`px-3 py-1.5 text-[13px] md:text-[14px] rounded-md border ${unit==='sumare'?'bg-black text-white border-black':'bg-white hover:bg-gray-50'}`}>Unidade Sumaré</button>
        <button onClick={()=>setUnit('penha')}  className={`px-3 py-1.5 text-[13px] md:text-[14px] rounded-md border ${unit==='penha' ?'bg-black text-white border-black':'bg-white hover:bg-gray-50'}`}>Unidade Penha</button>
      </div>
      <textarea className="w-full min-h-[110px] text-[15px] md:text-[16px] border rounded-md p-2 outline-none" value={intro} onChange={(e)=>setIntro(e.target.value)} />
      <div className="flex justify-end gap-2 mt-2">
        <button onClick={onCancel} className="px-3 py-1.5 text-[13px] md:text-[14px] border rounded-md">Cancelar</button>
        <button onClick={()=>onStart(unit,intro)} className="px-3 py-1.5 text-[13px] md:text-[14px] rounded-md bg-black text-white">Continuar pelo chat</button>
      </div>
    </div>
  );
}

// ===================== PRINCIPAL =====================
export default function SupportChat(){
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState(localStorage.getItem(KEY) || "");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const pollingRef = useRef(null);

  // Modo humano (sem bot)
  const [humanMode, setHumanMode] = useState(false);
  const [showHumanInline, setShowHumanInline] = useState(false);

  // Sugestões Afroveg inline
  const [showSugestao, setShowSugestao] = useState(false);

  // Som
  const audioRef = useRef(null);
  const chimeOnceRef = useRef(false);
  const playChime = () => {
    const el = audioRef.current; if (!el) return;
    el.currentTime = 0; const p = el.play();
    if (p?.catch) p.catch(()=> {
      const once = ()=>{ el.currentTime=0; el.play().catch(()=>{}); document.removeEventListener("pointerdown", once); };
      document.addEventListener("pointerdown", once, { once:true, passive:true });
    });
  };

  // ====== FECHAR CHAT ======
  const closeChat = () => setOpen(false);
  // ESC para fechar
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ====== ANTI-DUPLICAÇÃO ======
  const serverLastIdRef = useRef(0);
  function mergeMessages(prevList, incomingList) {
    const prev = Array.isArray(prevList) ? [...prevList] : [];
    const incoming = Array.isArray(incomingList) ? incomingList : [];

    const norm = (s) => String(s ?? "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[^\p{L}\p{N}\s]/gu, "");

    incoming.forEach(inc => {
      for (let i = prev.length - 1; i >= 0; i--) {
        const p = prev[i];
        if (p?.temp && p.sender === inc.sender && norm(p.text) === norm(inc.text)) {
          prev.splice(i, 1);
        }
      }
    });

    const haveId = new Set(prev.filter(m => !m?.temp && m?.id != null).map(m => m.id));
    incoming.forEach(inc => { if (!haveId.has(inc.id)) prev.push(inc); });

    const maxServerId = prev
      .filter(m => !m?.temp && typeof m?.id === "number")
      .reduce((acc, m) => Math.max(acc, m.id), serverLastIdRef.current || 0);
    serverLastIdRef.current = maxServerId;

    const realKey = new Set(prev.filter(m => !m?.temp).map(m => m.sender + "||" + norm(m.text)));
    for (let i = prev.length - 1; i >= 0; i--) {
      const p = prev[i];
      if (p?.temp && realKey.has(p.sender + "||" + norm(p.text))) prev.splice(i, 1);
    }

    return prev;
  }

  // ===== Autoabrir 1x por aba =====
  useEffect(() => {
    const already = sessionStorage.getItem(AUTO_OPEN_KEY);
    const t = setTimeout(() => {
      if (!already) {
        setOpen(true);
        playChime();
        chimeOnceRef.current = true;
        sessionStorage.setItem(AUTO_OPEN_KEY, "1");
      }
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (open && !chimeOnceRef.current) { chimeOnceRef.current = true; playChime(); }
  }, [open]);

  // carregar histórico ao abrir
  useEffect(() => {
    if (!open || !conversationId) return;
    fetch(`${API_HIST}?conversation_id=${encodeURIComponent(conversationId)}&after_id=0`)
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data?.messages) ? data.messages : [];
        setMessages(arr);
        serverLastIdRef.current = arr.length ? arr[arr.length-1].id : 0;
      }).catch(()=>{});
  }, [open, conversationId]);

  // polling
  useEffect(() => {
    if (!open || !conversationId) return;
    pollingRef.current = setInterval(() => {
      fetch(`${API_HIST}?conversation_id=${encodeURIComponent(conversationId)}&after_id=${serverLastIdRef.current}`)
        .then(r => r.json())
        .then(data => {
          const incoming = Array.isArray(data?.messages) ? data.messages : [];
          if (incoming.length) setMessages(prev => mergeMessages(prev, incoming));
        }).catch(()=>{});
    }, 2000);
    return () => clearInterval(pollingRef.current);
  }, [open, conversationId]);

  // refresh imediato
  async function refreshNow() {
    if (!conversationId) return;
    try {
      const r = await fetch(`${API_HIST}?conversation_id=${encodeURIComponent(conversationId)}&after_id=${serverLastIdRef.current}`);
      const data = await r.json();
      const incoming = Array.isArray(data?.messages) ? data.messages : [];
      if (incoming.length) setMessages(prev => mergeMessages(prev, incoming));
      setMessages(prev => mergeMessages(prev, []));
    } catch {}
  }

  // intercepta itens de menu que abrem componentes especiais
  const handleMenuSelect = (choice) => {
    const c = String(choice).trim().toLowerCase();
    if (c === "8") { setShowHumanInline(true); return; }
    if (c === "10" || c.includes("sugest")) { setShowSugestao(true); return; }
    sendMessage(choice);
  };

  const sendMessage = async (forcedText) => {
    const text = (forcedText ?? input).trim();
    if (!text) return;
    const tempId = Date.now();

    setMessages(m => [
      ...(Array.isArray(m)?m:[]),
      { id: tempId, temp: true, sender: "user", text, created_at: new Date().toISOString() }
    ]);
    setInput("");

    try {
      const form = new FormData();
      form.append("text", text);
      if (conversationId) form.append("conversation_id", conversationId);
      if (humanMode) form.append("human","1");

      const { data } = await axios.post(API_SEND, form, { headers: { Accept: "application/json" } });

      if (data?.conversation_id && data.conversation_id !== conversationId) {
        setConversationId(data.conversation_id);
        localStorage.setItem(KEY, data.conversation_id);
      }

      await refreshNow();
    } catch (e) {
      setMessages(m => [...(Array.isArray(m)?m:[]), {
        id: Date.now()+1, sender: "bot",
        text: "Tivemos um problema ao enviar. Tente novamente.",
        created_at: new Date().toISOString()
      }]);
    }
  };

  // ====== DETECÇÃO CONTEXTUAL DE MENUS ======
  const msgsSafe = Array.isArray(messages) ? messages : [];
  const lastBot = [...msgsSafe].reverse().find(m => m.sender !== "user");
  const lastUser = [...msgsSafe].reverse().find(m => m.sender === "user");
  const botTxt  = (lastBot?.text || "").toLowerCase();
  const userTxt = (lastUser?.text || "").toLowerCase();

  const renderMainMenu =
    !msgsSafe.length ||
    /^(menu|voltar|retornar|99|00)$/.test(userTxt) ||
    /(escolha uma opc|menu|opções|opcoes)/.test(botTxt);

  const renderAlergeno =
    /(alerg[eê]nicos).*(escolha)/.test(botTxt) || /^9(\.|-| )0$/.test(userTxt);

  const botAlergenoInfo = /sem gl(u|ú)ten|sem lactose/.test(lastBot?.text || "");

  return (
    <>
      <audio ref={audioRef} src="/chat-chime.mp3" preload="auto" />

      {/* botão flutuante */}
      <button
        onClick={()=>setOpen(v=>!v)}
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg p-4 bg-black text-white hover:opacity-90"
        aria-label="Abrir chat de atendimento"
      >
        💬
      </button>

      {open && (
        // Backdrop: clique fora fecha
        <div
          className="fixed inset-0 z-40"
          onClick={closeChat}
          aria-hidden="true"
        >
          {/* Janela do chat */}
          <div
            className="
              absolute right-4 bottom-6 z-50
              w-[92vw] md:w-[420px] h-[68vh] md:h-[72vh] max-h-[78vh]
              bg-white rounded-2xl border shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              flex flex-col
              text-[15px] md:text-[16px] leading-relaxed
            "
            onClick={(e)=>e.stopPropagation()} // não fechar ao clicar dentro
            role="dialog"
            aria-label="Chat de atendimento Congolinaria"
          >
            {/* header */}
            <div className="px-4 py-3 border-b flex items-center gap-3">
              <div className="flex-1">
                <div className="text-base md:text-lg font-semibold">Congolinaria • Atendimento</div>
                <div className="text-[12px] md:text-[13px] text-gray-600">Respostas automáticas • humano sob demanda</div>
              </div>

              {humanMode && (
                <button
                  onClick={()=>setHumanMode(false)}
                  className="text-[12px] md:text-[13px] px-2 py-1 rounded border hover:bg-black hover:text-white"
                  title="Voltar a falar com o bot"
                >
                  ↩️ Bot
                </button>
              )}

              {/* Botão fechar (X) */}
              <button
                onClick={closeChat}
                aria-label="Fechar chat"
                title="Fechar"
                className="shrink-0 grid place-items-center w-10 h-10 rounded-full border hover:bg-gray-50"
              >
                <span className="text-2xl md:text-[28px] leading-none font-bold">&times;</span>
              </button>
            </div>

            {/* mensagens */}
            <div className="px-3 py-2 flex-1 overflow-y-auto space-y-2">
              {!msgsSafe.length && <MainMenu onSelect={handleMenuSelect} />}

              {msgsSafe.map((m) => {
                if (!m) return null;
                const isBot = m.sender !== "user";
                const hideMenuBubble =
                  isBot && renderMainMenu && isBotMenuText(m.text);
                const hideAlergenoBubble =
                  isBot && renderAlergeno && isBotAlergenoMenuText(m.text);
                if (hideMenuBubble || hideAlergenoBubble) return null;

                return (
                  <div
                    key={m.id ?? m.tmpId ?? Math.random()}
                    className={`text-[15px] md:text-[16px] max-w-[85%] ${
                      m.sender === "user" ? "ml-auto text-white bg-black" : "bg-gray-100 text-gray-900"
                    } px-3 py-2 rounded-xl`}
                  >
                    {String(m.text ?? "")}
                    {m.temp && <span className="ml-2 text-[11px] opacity-70">enviando…</span>}
                  </div>
                );
              })}

              {msgsSafe.length > 0 && renderMainMenu && <MainMenu onSelect={handleMenuSelect} />}
              {msgsSafe.length > 0 && renderAlergeno && (
                <AlergenoMenu
                  onSelect={handleMenuSelect}
                  onOpenSugestao={() => setShowSugestao(true)}
                />
              )}

              {botAlergenoInfo && !showSugestao && (
                <div className="max-w-[85%]">
                  <button
                    onClick={()=>setShowSugestao(true)}
                    className="px-3 py-2 text-[14px] md:text-[15px] rounded-md border border-orange-300 hover:bg-orange-600 hover:text-white"
                  >
                    ⭐ Ver sugestões afroveg compatíveis
                  </button>
                </div>
              )}

              {/* Sugestões Afroveg inline */}
              {showSugestao && (
                <div className="max-w-[85%] bg-white border border-orange-200 shadow-sm rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[15px] md:text-[16px] font-semibold">Sugestões afroveg personalizadas</div>
                    <button
                      onClick={()=>setShowSugestao(false)}
                      className="text-gray-600 hover:text-black text-2xl leading-none"
                      aria-label="Fechar"
                    >
                      ×
                    </button>
                  </div>
                  <SugestaoAfroveg />
                </div>
              )}

              {/* Card inline de handoff humano */}
              {showHumanInline && (
                <HumanInlineCard
                  conversationId={conversationId}
                  messages={messages}
                  onCancel={()=>setShowHumanInline(false)}
                  onStart={async (unit, intro) => {
                    try {
                      await fetch(API_ROUTE, {
                        method: 'POST',
                        headers: { 'Content-Type':'application/json' },
                        body: JSON.stringify({ conversation_id: conversationId, unit, intro })
                      });
                    } catch {}

                    setHumanMode(true);
                    setShowHumanInline(false);

                    setMessages(m => [...(Array.isArray(m)?m:[]), {
                      id: Date.now()+1, sender: "bot",
                      text: `Conectando você à equipe da unidade ${unit==='penha'?'Penha':'Sumaré'}…`,
                      created_at: new Date().toISOString()
                    }]);

                    await refreshNow();
                  }}
                />
              )}
            </div>

            {/* chip menu */}
            <div className="px-3 pb-2">
              <button
                onClick={()=>handleMenuSelect("menu")}
                className="w-full text-left px-3 py-2 rounded-lg border text-[14px] md:text-[15px] hover:bg-black hover:text-white transition"
              >
                ≡ Ver menu
              </button>
            </div>

            {/* footer */}
            <div className="p-2 border-t flex gap-2">
              <input
                className="flex-1 text-[15px] md:text-[16px] border rounded-xl px-3 py-2 outline-none placeholder:text-gray-600"
                value={input}
                onChange={e=>setInput(e.target.value)}
                placeholder={humanMode ? "Fale com o atendente…" : "Escreva sua mensagem…"}
                onKeyDown={e=>{ if(e.key==='Enter') sendMessage(); }}
              />
              <button onClick={()=>sendMessage()} className="px-3 py-2 rounded-xl bg-black text-white text-[14px] md:text-[15px]">
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
