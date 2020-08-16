# Optimistic update form

Opdracht:
Maak een app waarbij je optimistisch gebruikers kunt bewerken.

Vaak duurt het even voordat een api-call gedaan is, en om een "snappy" gebruikerservaring te bieden zie je vaak dat de UI alvast 'optimistisch' wordt geupdate.
Meestal gaat de api-call goed en hoef je nadat de call returned niets meer te doen. Soms kan het echter zijn dat er iets niet goed gaat in de api-call (je krijgt een error terug) waarna je de UI weer terug moet draaien.

Elke user heeft de volgende eigenschappen (velden):

- id
- firstName
- lastName
- products (array)

Een product heeft de volgende eigenschappen:

- id
- title

Er is al in `./api.js` een mock-api met calls gemaakt.

## Requirements

Uiteindelijk moeten er 2 schermen komen

### Overzichtscherm

route: "/"
Een tabel of lijst waarin alle users onder elkaar staan met de kolommen: firstName en lastName
Als je op een rij (user) klikt ga je naar de detail pagina
Verder moet er bovenaan een knop "Add user" komen. Als je hier op klikt ga je ook naar de detail pagina (om een user te kunnen toevoegen)

### Detail / Add User scherm

route: "/new" of "/:userId"
Dit scherm kunt dus 2 varianten: Een huidige user bewerken / of een nieuwe user aanmaken. De velden zijn eigenlijk hetzelfde, maar het gedrag van de 'Save' knop zal wel anders werken

- Ik wil de 'firstName' kunnen bewerken
- Ik wil de 'lastName' kunnen bewerken
- Voor products wil ik een multi-select icm auto-complete. Maw, ik wil bestaande producten kunnen selecteren, maar ook on the fly producten toevoegen die nog niet bestaan. Let op: de producten mogen pas aangemaakt worden ('createProduct') wanneer ik op de 'Save' knop druk,
- Bovenaan de pagina moet een delete knop komen. Als ik hier op klik wordt de user verwijdered en keer ik automatisch terug naar de hoofdpagina
- Als ik op opslaan klik en het gaat om een nieuwe gebruiker, wil ik van de route "/new" naar "/:userId" doorverwezen worden
