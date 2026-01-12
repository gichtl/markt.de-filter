# markt.de-filter


Dieses Userscript dient der Fein-Filterung von Anzeigen auf Markt.de. Zusammen mit dem Webblocker uBlock Origin lassen sich damit komfortabel die Suchergebnisse den eigenen Bedürfnissen anpassen.

Getestet auf Firefox. Funktioniert aber ebenso in Chrome.


EInrichtung.
1) Zuerst den Adblocker uBlock Origin installieren. https://github.com/gorhill/uBlock
   
Danach in die Einstellungen und unter "Meine Filter" fügt man folgende Zeilen als Grundstock hinzu:

```
! 05.01.2026 https://erotik.markt.de Highlight Galerie und Top Anzeigen
erotik.markt.de##.clsy-c-search__carousel
erotik.markt.de##.clsy-c-search-topads

! 12.09.2024 erotik.markt.de pushup und vip ausblenden (optional)
!erotik.markt.de##.markt_upselling_pushup
!erotik.markt.de##.markt_upselling_vipBorder

! Asia Filter  FantASIEN
erotik.markt.de##.clsy-c-result-list-item:has-text(/Asia|\bAsien|Viet|Thai|Latina/i)
```


Die Checkbox "Eigene Filter aktivieren" nicht vergessen zu aktivieren.



2) Danach Tampermonkey installieren. https://www.tampermonkey.net/
   
Tampermonkey bietet eine Umgebung um komfortabel Userscripte im Browser laufen zu lassen.


4) Nun das markt.de-filter-script installieren.

Dazu einfach das Script von dieser seite hier laden oder auf https://github.com/gichtl/markt.de-filter/raw/refs/heads/main/markt.de-filter.user.js klicken.

Nun öffnet sich Tampermonkey und fragt ob das Skript installiert werden soll. Das bestätigen.
Darauf wird bei allen Anzeigen in der rechten unteren Ecke "X ausblenden" angezeigt. Klickt man darauf so verschwindet die Anzeige auf Nimmerwiedersehen.
Gleichzeitig erscheint ganz rechts unten "Anzeigen Verwalten". Dort kann man die gelöschten Anzeigen wieder rückgängig machen, oder auch die gesammelten Filter in die Zwischenablage kopieren und bei uBlock origin anfügen. Danach kann man die so übertragenen Filter in dem script löschen.
