# markt.de-filter
Dieses Userscript dient der Fein-Filterung von Anzeigen auf Markt.de. Zusammen mit dem Webblocker uBlock Origin lassen sich damit komfortabel die Suchergebnisse den eigenen Bedürfnissen anpassen und deutlich entschlacken. Übrig bleiben dann nur noch die wenigen Anzeigen die einen wirklich interessieren.

Getestet auf Firefox. Funktioniert aber ebenso in Chrome.


## Einrichtung
### 1) Zuerst den Adblocker uBlock Origin installieren.
https://github.com/gorhill/uBlock
   
Danach in die Einstellungen und unter "Meine Filter" fügt man folgende Zeilen als Grundstock hinzu:

```
! Highlight Galerie und Top Anzeigen
markt.de##.clsy-c-search__carousel
markt.de##.clsy-c-search-topads

! pushup und vip ausblenden (optional)
!markt.de##.markt_upselling_pushup
!markt.de##.markt_upselling_vipBorder

! Länder Filter
markt.de##.clsy-c-result-list-item:has-text(/Asia|\bAsien|Viet|Thai/i)
```
Die Zeilen die mit einem Ausrufezeichen beginnen sind Kommentare.

Die Checkbox "Eigene Filter aktivieren" nicht vergessen zu aktivieren.



### 2) Danach Tampermonkey installieren.
https://www.tampermonkey.net/
   
Tampermonkey bietet eine Umgebung um komfortabel Userscripte im Browser laufen zu lassen.


### 3) Nun das markt.de-filter-script installieren.
Dazu einfach das Script von dieser seite hier laden oder auf https://github.com/gichtl/markt.de-filter/raw/refs/heads/main/markt.de-filter.user.js klicken.\
Dann öffnet sich Tampermonkey und fragt ob das Skript installiert werden soll. Das bestätigen.

## Benutzung
Fortan wird bei allen Anzeigen in der rechten unteren Ecke "X ausblenden" angezeigt. Klickt man darauf so verschwindet die Anzeige auf Nimmerwiedersehen.\
Gleichzeitig erscheint ganz rechts unten auf der Seite "Anzeigen Verwalten". Dort kann man die gelöschten Anzeigen wieder rückgängig machen, oder auch die gesammelten Filter in die Zwischenablage kopieren und bei uBlock origin unter "Meine FIlter" anfügen und dort einfacher verwalten. Danach kann man die so übertragenen Filter in dem Script löschen.
