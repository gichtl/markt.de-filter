// ==UserScript==
// @name         markt.de Anzeigen-Verwaltung + uBlock Sync
// @namespace    https://tampermonkey.net/
// @version      1.6
// @description  Anzeigen ausblenden, verwalten, löschen und mit uBlock Filterliste syncen
// @match        https://erotik.markt.de/*
// @grant        none
// ==/UserScript==

// xx@match        https://erotik.markt.de/berlin/anzeigen/sie-sucht-ihn/*



(function () {
    'use strict';

    const STORAGE_KEY = 'tm_hidden_lis';
    const LI_SELECTOR = 'li.clsy-c-result-list-item';
    const BTN_CLASS = 'tm-hide-li-btn';

    /* ---------------- Storage ---------------- */

    function loadHidden() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
        catch { return []; }
    }

    function saveHidden(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

    function hideLi(li, id) {
        li.style.display = 'none';
        const hidden = loadHidden();
        if (!hidden.includes(id)) { hidden.push(id); saveHidden(hidden); }
    }

    function showLi(id) {
        const li = document.getElementById(id);
        if (li) li.style.display = '';
    }

    function addHideButton(li) {
        if (!li.matches(LI_SELECTOR)) return;
        if (li.querySelector('.' + BTN_CLASS)) return;

        const id = li.id;
        if (!id) return;

        if (loadHidden().includes(id)) li.style.display = 'none';

        li.style.position ||= 'relative';

        const btn = document.createElement('button');
        btn.textContent = '✕ ausblenden';
        btn.className = BTN_CLASS;

        Object.assign(btn.style, { position: 'absolute', bottom: '5px', right: '5px', zIndex: 9999, fontSize: '12px', cursor: 'pointer' });

        btn.onclick = e => { e.stopPropagation(); hideLi(li, id); };
        li.appendChild(btn);
    }

    function process(root = document) { root.querySelectorAll(LI_SELECTOR).forEach(addHideButton); }

    /* ---------------- GUI ---------------- */

    function openManager() {
        if (document.getElementById('tm-manager')) return;

        const overlay = document.createElement('div');
        overlay.id = 'tm-manager';
        Object.assign(overlay.style, { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 20000, display: 'flex', alignItems: 'center', justifyContent: 'center' });

        const box = document.createElement('div');
        Object.assign(box.style, { background: '#fff', width: '520px', maxHeight: '70vh', overflow: 'auto', padding: '15px', borderRadius: '6px', fontFamily: 'sans-serif' });

        const title = document.createElement('h3'); title.textContent = 'Ausgeblendete Anzeigen';
        box.appendChild(title);

        const list = document.createElement('ul'); list.style.padding = 0; list.style.listStyle = 'none';
        const renderList = () => {
            list.innerHTML = '';
            const hidden = loadHidden();
            if (!hidden.length) { list.textContent = 'Keine ausgeblendeten Anzeigen.'; return; }

            hidden.forEach(id => {
                const li = document.createElement('li');
                li.style.marginBottom = '8px';
                li.innerHTML = `<code>${id}</code> <button data-show>Einblenden</button> <button data-del>Löschen</button>`;

                li.querySelector('[data-show]').onclick = () => showLi(id);
                li.querySelector('[data-del]').onclick = () => {
                    saveHidden(loadHidden().filter(x => x !== id));
                    showLi(id);
                    renderList();
                };

                list.appendChild(li);
            });
        };

        renderList();
        box.appendChild(list);

        // Buttons: uBlock Export
        const exportBtn = document.createElement('button');
        exportBtn.textContent = 'uBlock-Export';
        exportBtn.onclick = () => {
            const filters = loadHidden().map(id => `markt.de###${id}`);
            navigator.clipboard.writeText(filters.join('\n'));
            alert('uBlock-Filter kopiert.');
        };

        // Alle Filter löschen
        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'Alle Filter löschen';
        clearBtn.style.marginLeft = '10px';
        clearBtn.onclick = () => {
            if(confirm('Alle ausgeblendeten Anzeigen wirklich löschen?')) {
                loadHidden().forEach(showLi); // Anzeigen wieder sichtbar
                saveHidden([]);
                renderList();
            }
        };

        // Sync / Download Filterliste
        const syncBtn = document.createElement('button');
        syncBtn.textContent = 'uBlock Sync (Download)';
        syncBtn.style.marginLeft = '10px';
        syncBtn.onclick = () => {
            const filters = loadHidden().map(id => `markt.de###${id}`).join('\n');
            const blob = new Blob([filters], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'marktde_ausgeblendete_anzeigen.txt';
            a.click();
            URL.revokeObjectURL(url);
        };

        // Close
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Schließen';
        closeBtn.style.marginLeft = '10px';
        closeBtn.onclick = () => overlay.remove();

        box.appendChild(exportBtn);
        box.appendChild(clearBtn);
        box.appendChild(syncBtn);
        box.appendChild(closeBtn);

        overlay.appendChild(box);
        document.body.appendChild(overlay);
    }

    function addManagerButton() {
        if (document.getElementById('tm-manager-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'tm-manager-btn';
        btn.textContent = 'Anzeigen verwalten';
        Object.assign(btn.style, { position: 'fixed', bottom: '15px', right: '15px', zIndex: 15000 });
        btn.onclick = openManager;
        document.body.appendChild(btn);
    }

    /* ---------------- Init ---------------- */

    process();
    addManagerButton();

    new MutationObserver(muts => muts.forEach(m =>
        m.addedNodes.forEach(n => n.nodeType === 1 && process(n))
    )).observe(document.body, { childList: true, subtree: true });

})();
