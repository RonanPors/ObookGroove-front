import './LegalNotice.scss';

export default function LegalNotice() {
  return (
    <div className="legal-notice">
      <h1 className="legal-notice_h1 h1">MENTIONS LÉGALES </h1>

      <h2 className="legal-notice_h2 h2">Éditeur du site</h2>
      <section className="legal-notice_section text-corpus">
        <p>
          <b>Éditeur</b> : O’BookGroove
        </p>
        <p>
          <b>Siège social</b> : 5 rue du livre – France
        </p>
        <p>
          <b>Téléphone</b> : +33 1 23 45 67 89
        </p>
        <p>
          <b>Email</b> : dpo@obookgroove.studio
        </p>
        <p>
          <b>Directeur(trice) de la publication</b> : Lorem Ipsum
        </p>
        <p>
          <b>Hébergeur</b> : Digital Ocean – https://www.digitalocean.com/
        </p>
        <p>
          <b>O’BookGroove</b> est une SARL au capital social de - €
        </p>
        <p>
          <b>APE</b> : - Inscrit au RCS de Paris sous le numéro 000 000 000
        </p>
        <p>
          <b>TVA Intra-communautaire</b> : FR00000000000
        </p>
      </section>
    </div>
  );
}
