type Invoice = {
  client_name: string;
  amount: number;
  due_date: string;
};

function formatEuros(n: number) {
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR");
}

export const RELANCE_TYPES = ["j7", "j15", "j30"] as const;
export type RelanceType = (typeof RELANCE_TYPES)[number];

export function texteRelance(
  type: RelanceType,
  invoice: Invoice,
  expediteurNom: string
) {
  const montant = formatEuros(Number(invoice.amount));
  const echeance = formatDate(invoice.due_date);

  const sujets: Record<RelanceType, string> = {
    j7: `Rappel : facture du ${echeance} en attente de règlement`,
    j15: `Deuxième rappel : facture toujours impayée`,
    j30: `Dernier rappel avant mise en demeure`,
  };

  const corps: Record<RelanceType, string> = {
    j7: `Bonjour,

Sauf erreur de notre part, la facture d'un montant de ${montant}, dont l'échéance était fixée au ${echeance}, ne semble pas encore réglée.

Si le paiement a déjà été effectué, merci de ne pas tenir compte de ce message. Dans le cas contraire, nous vous remercions de bien vouloir procéder au règlement dans les meilleurs délais.

Cordialement,
${expediteurNom}`,
    j15: `Bonjour,

Nous revenons vers vous concernant la facture de ${montant}, échue depuis le ${echeance}, qui demeure impayée à ce jour malgré notre précédent message.

Nous vous remercions de régulariser cette situation rapidement.
