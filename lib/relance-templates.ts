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

Cordialement,
${expediteurNom}`,
    j30: `Bonjour,

Malgré nos précédentes relances, la facture de ${montant} du ${echeance} reste impayée à ce jour.

Sans règlement de votre part sous 8 jours, nous nous verrons contraints d'engager une procédure de mise en demeure.

Cordialement,
${expediteurNom}`,
  };

  return { sujet: sujets[type], corps: corps[type] };
}

export function texteMiseEnDemeure(
  invoice: Invoice,
  expediteurEmail: string,
  expediteurNom?: string
) {
  const montant = formatEuros(Number(invoice.amount));
  const echeance = formatDate(invoice.due_date);
  const aujourdhui = new Date().toLocaleDateString("fr-FR");
  const nom = expediteurNom || "[À COMPLÉTER — votre nom ou raison sociale]";

  return `${nom}
[À COMPLÉTER — votre adresse]

À l'attention de : ${invoice.client_name}

Fait le ${aujourdhui}

Objet : Mise en demeure de payer — Lettre recommandée avec accusé de réception

${invoice.client_name},

Je vous mets en demeure de me régler, dans un délai de huit (8) jours à compter de la réception de la présente, la somme de ${montant} correspondant à la facture échue le ${echeance}, restée impayée à ce jour malgré plusieurs relances demeurées sans effet.

À défaut de règlement intégral dans ce délai, je me réserve le droit d'engager toute action judiciaire utile au recouvrement de cette créance, incluant les intérêts de retard et les frais de recouvrement qui pourraient s'y ajouter.

Je reste à votre disposition pour tout règlement amiable avant l'expiration de ce délai.

Vous pouvez me contacter à l'adresse suivante : ${expediteurEmail}

Je vous prie d'agréer l'expression de mes salutations distinguées.

[À COMPLÉTER — votre signature]`;
}
