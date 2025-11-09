import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      pt: {
        translation: {
          title: "Cardápio RDC – COP30",
          addToOrder: "Adicionar ao Pedido",
          tableName: "Nome ou Número da Mesa",
          peopleNumber: "Número de Pessoas",
          observations: "Observações (ex: sem pimenta, alergias...)",
          finalizeOrder: "Finalizar Pedido",
          sendOrder: "Enviar Pedido",
          total: "Total",
          thanks: "Obrigado!",
          receiptTitle: "Recibo – COP30",
          orderSent: "Pedido enviado com sucesso!",
          orderError: "Erro ao enviar o pedido.",
          fillAll: "Preencha todos os campos e adicione pelo menos um item ao pedido."
        }
      },
      fr: {
        translation: {
          title: "Menu RDC – COP30",
          addToOrder: "Ajouter à la commande",
          tableName: "Nom ou numéro de table",
          peopleNumber: "Nombre de personnes",
          observations: "Observations (ex : sans piment, allergies...)",
          finalizeOrder: "Finaliser la commande",
          sendOrder: "Envoyer la commande",
          total: "Total",
          thanks: "Merci !",
          receiptTitle: "Reçu – COP30",
          orderSent: "Commande envoyée avec succès !",
          orderError: "Erreur lors de l'envoi de la commande.",
          fillAll: "Veuillez remplir tous les champs et ajouter au moins un plat."
        }
      },
      en: {
        translation: {
          title: "Menu DRC – COP30",
          addToOrder: "Add to Order",
          tableName: "Table Name or Number",
          peopleNumber: "Number of People",
          observations: "Observations (e.g. no pepper, allergies...)",
          finalizeOrder: "Finalize Order",
          sendOrder: "Send Order",
          total: "Total",
          thanks: "Thank you!",
          receiptTitle: "Receipt – COP30",
          orderSent: "Order sent successfully!",
          orderError: "Error sending order.",
          fillAll: "Please fill all fields and add at least one item."
        }
      }
    }
  });

export default i18n;
