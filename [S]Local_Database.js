module.exports = {
    name: '[S] SQLite - Local Database',
    section: '# SHDZ - Utilities',

    subtitle(data) {
        const opMap = {
            store: 'Store',
            update: 'Update/Save',
            delete: 'Delete',
        };
        const opLabel = opMap[data.dboperation] || data.dboperation;
        return `[SQLite - DB] ${opLabel}`;
    },

    variableStorage(data, varType) {
        if (parseInt(data.storage, 10) !== varType) return;
        return [data.varName, 'Any'];
    },

fields: ['dboperation', 'collection', 'key', 'fieldName', 'value', 'searchQuery', 'searchByIndex', 'storeKey', 'storeCollection', 'tableName', 'storage', 'varName', 'deleteCollection', 'deleteColumnsToClear', 'deleteKey', 'getColumn', 'conditionColumn', 'conditionValue'],

    html() {
        return `

        <tab-system id="tabs" style="margin-top: 10px;">
            <tab label="SQLite" icon="database">
                <div style="margin-bottom: 12px;">
                    <span class="dbminputlabel">Operation</span>
                    <select id="dboperation" class="round">
                        <option value="store">Store</option>
                        <option value="update">Update/Save</option>
                        <option value="delete">Delete</option>
                    </select>
                </div>
                <div id="updateFieldsDiv" style="margin-bottom: 10px; display:none;">
                    <span class="dbminputlabel">Column to update</span>
                    <span class="dbminputlabel"><b>Jak używać? - <u>Update/Save</u></b>
                      <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="700">
                        <div style="padding: 16px;">
                            <!-- Pierwsze okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column to update</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz kolumnę którą chcesz utworzyć lub dodać do niej wartość</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Drugie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Value to update</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz dane które chcesz wprowadzić do tej kolumny</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz np. kolumnę z ID użytkownika - przejdź do następnego punktu aby dowiedzieć się o co w tym chodzi</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column value to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Kontynuując - chodzi o np. wyszukanie użytkownika w tabeli po jego ID, wpisujesz w <b>"Column to match"</b> <u>"ID"</u> i w tym polu którym opisuje, wprowadzasz ID użytkownika za pomocą np. zmiennej i w ten sposób aktualizujesz dane - danego użytkownika.</li>
                                </ul>
                            </div>
                            </div>
                            <br><br>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 80px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                      </help-icon>
                    </span>
                    <a href="https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.13.1/DB.Browser.for.SQLite-v3.13.1-win64.msi" target="_blank" style="color:#4ea1ff;cursor:pointer;text-decoration:underline;font-weight:bold;margin-left: 10px;">Polecany program do DB</a>
                    <input id="collection" class="round" type="text" placeholder="ex. Age,Name">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Value to update</span>
                    <input id="key" class="round" type="text" placeholder="ex. 1,20,Test">
                </div>
                <div id="storeFieldsDiv" style="margin-bottom: 10px; display:none;">
                    <span class="dbminputlabel">Column(s) to store</span>
                    <span class="dbminputlabel"><b>Jak używać? - <u>Store</u></b>
                      <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="700">
                        <div style="padding: 16px;">
                            <!-- Pierwsze okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column(s) to store</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz z której kolumny ma pobrać dane np. ID</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Drugie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Value(s) to store</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym miejscu zamieszczasz np. ID Użytkownika >> przejdź do następnego punktu</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column to get</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>I gdy wprowadzisz w "<b>Value(s) to store</b>" - np. ID użytkownika a w tym miejscu np. "Age" to pobierze dane z kolumny tego użytkownika - Gdy nie ma danych w danej kolumnie u użytkownika wyświetli się "<u>Brak danych</u>"</li>
                                </ul>
                            </div>
                            </div>
                            <br><br>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 170px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                      </help-icon>
                    </span>
                    <a href="https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.13.1/DB.Browser.for.SQLite-v3.13.1-win64.msi" target="_blank" style="color:#4ea1ff;cursor:pointer;text-decoration:underline;font-weight:bold;margin-left: 10px;">Polecany program do DB</a>
                    <input id="storeCollection" class="round" type="text" placeholder="ex. Age,Name">
                    <br>
                    <span class="dbminputlabel">Value(s) to store</span>
                    <input id="storeKey" class="round" type="text" placeholder="ex. 1,20,Test">
                    <hr class="subtlebar" style="margin-top: 8px; margin-bottom: 4px; width: 100%;">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Column to get</span>
                    <input id="getColumn" class="round" type="text" placeholder="ex. Age">
                </div>
                <div id="deleteFieldsDiv" style="margin-bottom: 10px; display:none;">
                    <span class="dbminputlabel">Column(s) to match</span>
                    <span class="dbminputlabel"><b>Jak używać? - <u>Delete</u></b>
                      <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="700">
                        <div style="padding: 16px;">
                            <!-- Pierwsze okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column(s) to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz kolumnę z której ma usunąć dane [np. ID]</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Drugie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Value(s) to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz [np. ID użytkownika]</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column(s) to clear (optional)</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>A tutaj zamieszczasz którą kolumnę ma usunąć danemu użytkownikowi [np. Age] - gdy wskażesz "<b>Age</b>" to wtedy usunie tylko dane z tej kolumny, gdy nie wskażesz nic - usunie ci cały wynik z "<b>Value(s) to match</b>"</li>
                                </ul>
                            </div>
                            </div>
                            <br><br>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 170px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                      </help-icon>
                    </span>
                    <a href="https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.13.1/DB.Browser.for.SQLite-v3.13.1-win64.msi" target="_blank" style="color:#4ea1ff;cursor:pointer;text-decoration:underline;font-weight:bold;margin-left: 10px;">Polecany program do DB</a>
                    <input id="deleteCollection" class="round" type="text" placeholder="ex. Age,Name">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Value(s) to match</span>
                    <input id="deleteKey" class="round" type="text" placeholder="ex. 1,20,Test">
                    <hr class="subtlebar" style="margin-top: 8px; margin-bottom: 4px; width: 100%;">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Column(s) to clear (optional)</span>
                    <input id="deleteColumnsToClear" class="round" type="text" placeholder="ex. Age">
                </div>
                <div id="updateConditionDiv" style="margin-bottom: 10px; display:none;">
                    <hr class="subtlebar" style="margin-top: 8px; margin-bottom: 8px; width: 100%;">
                    <span class="dbminputlabel">Column to match</span>
                    <input id="conditionColumn" class="round" type="text" placeholder="ex. ID">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Column value to match</span>
                    <input id="conditionValue" class="round" type="text" placeholder="ex. 594974899513327617">
                </div>
            </tab>

            <tab label="Settings" icon="settings">
                <div style="margin-bottom: 10px;">
                    <span class="dbminputlabel">Table name
                      <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="500">
                        <div style="padding: 16px;">
                            <!-- Pierwsze okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>How to use this function?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>This field is used to change the name of the table where you want to insert data. For example, if you want to save a list of automatic channels, you can create a table named "channels" to avoid storing too much information in a single table.</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Drugie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Jak używać tej funkcji?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>To pole służy do zmiany nazwy tabeli, do której chcesz wprowadzać dane. Na przykład, jeśli chcesz zapisać listę kanałów automatycznych, możesz utworzyć tabelę o nazwie „channels”, aby uniknąć przechowywania zbyt wielu informacji w jednej tabeli.</li>
                                </ul>
                            </div>
                            </div>
                            <br><br>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                      </help-icon>
                    </span>
                    <input id="tableName" class="round" type="text" placeholder="ex. users">
                    <br>
                    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
                </div>
            </tab>
        </tab-system>
        `;
    },

    //////////////////////////////////////////////////
    // region ✨ | Init HTML
    //////////////////////////////////////////////////

    init() {
        const { document } = this;
        function updateVisibility(id, visible) {
            const el = document.getElementById(id);
            if (el) el.style.display = visible ? null : 'none';
        }
        function updateFields() {
            const op = document.getElementById('dboperation').value;
            // Hide all field groups first
            updateVisibility('updateFieldsDiv', false);
            updateVisibility('getColumnDiv', false);
            updateVisibility('storeFieldsDiv', false);
            updateVisibility('deleteFieldsDiv', false);
            updateVisibility('updateConditionDiv', false);

            // Show only relevant fields for each operation
            if (op === 'update') {
                updateVisibility('updateFieldsDiv', true);
                updateVisibility('updateConditionDiv', true);
            } else if (op === 'get') {
                updateVisibility('getColumnDiv', true);
            } else if (op === 'store') {
                updateVisibility('storeFieldsDiv', true);
            } else if (op === 'delete') {
                updateVisibility('deleteFieldsDiv', true);
            }
        }
        document.getElementById('dboperation').addEventListener('change', updateFields);
        updateFields();

        // Obsługa kliknięcia w Guide (updateHelpBtn)
        const helpBtn = document.getElementById('updateHelpBtn');
        const helpIcon = document.getElementById('updateHelpIcon');
        if (helpBtn && helpIcon) {
            helpBtn.addEventListener('click', function() {
                helpIcon.click();
            });
        }
    },

    //////////////////////////////////////////////////
    // region 🛠️ | Code SQLite
    //////////////////////////////////////////////////

    async action(cache) {

        const data = cache.actions[cache.index];
        const dboperation = data.dboperation;
        const tableNameRaw = this.evalMessage(data.tableName, cache);
        let tableName = tableNameRaw && tableNameRaw.trim() !== '' ? tableNameRaw.trim() : 'db';
        // Wymuszamy rozszerzenie .sqlite
        if (!tableName.endsWith('.sqlite')) tableName += '.sqlite';
        // Pobierz odpowiednie pola w zależności od operacji
        let columnsRaw, valuesRaw;
        if (dboperation === 'store') {
            columnsRaw = this.evalMessage(data.storeCollection, cache); // Pole: kolumny do store
            valuesRaw = this.evalMessage(data.storeKey, cache); // Wartości do store
        } else if (dboperation === 'delete') {
            columnsRaw = this.evalMessage(data.deleteCollection, cache); // Pole: kolumny do delete
            valuesRaw = this.evalMessage(data.deleteKey, cache); // Wartości do delete
        } else {
            columnsRaw = this.evalMessage(data.collection, cache); // Pole: kolumny do update/save
            valuesRaw = this.evalMessage(data.key, cache); // Wartości do update/save
        }
        const conditionColumn = this.evalMessage(data.conditionColumn, cache); // Kolumna warunku
        const conditionValue = this.evalMessage(data.conditionValue, cache); // Wartość warunku
        const fs = require('fs');
        const path = require('path');
        const sqlite3 = require('sqlite3').verbose();
        const dbDir = path.join(process.cwd(), 'Database');
        if (!fs.existsSync(dbDir)) {
            try {
                fs.mkdirSync(dbDir, { recursive: true });
                console.log(`[sqlite3] Utworzono folder Database: ${dbDir}`);
            } catch (err) {
                console.error(`[sqlite3] Nie można utworzyć folderu Database: ${dbDir}`, err);
            }
        }
        const dbPath = path.join(dbDir, tableName);
        let db = new sqlite3.Database(dbPath);
        let output;

        // Dynamiczne kolumny i wartości
        let columns = columnsRaw ? columnsRaw.split(',').map(c => c.trim()).filter(Boolean) : [];
        let values = valuesRaw ? valuesRaw.split(',').map(v => v.trim()) : [];
        // Dodaj kolumnę warunku jeśli jej nie ma w columns
        if (dboperation === 'update' && conditionColumn && !columns.includes(conditionColumn)) {
            columns.push(conditionColumn);
            values.push(conditionValue);
        }

        // --- Nowa logika dla Update/Save ---
        // Jeśli wybrano Update/Save, ale nie podano warunku, wykonaj INSERT (Save)
        let effectiveOperation = dboperation;
        if (dboperation === 'update') {
            const noCondition = (!conditionColumn || conditionColumn.trim() === '') && (!conditionValue || conditionValue.trim() === '');
            if (noCondition) {
                effectiveOperation = 'save'; // Wymuś INSERT
            }
        }

        // DELETE: pobierz kolumny do wyczyszczenia
        let columnsToClear = [];
        if (dboperation === 'delete') {
            const columnsToClearRaw = this.evalMessage(data.deleteColumnsToClear, cache);
            if (columnsToClearRaw && columnsToClearRaw.trim() !== '') {
                columnsToClear = columnsToClearRaw.split(',').map(c => c.trim()).filter(Boolean);
            }
        }

        // --- AUTOCREATE TABLE IF NOT EXISTS ---
        // Zbierz wszystkie kolumny, które mogą być użyte do utworzenia tabeli
        let allColumns = [...columns];
        if (conditionColumn && !allColumns.includes(conditionColumn)) allColumns.push(conditionColumn);
        if (columnsToClear && Array.isArray(columnsToClear)) {
            columnsToClear.forEach(col => {
                if (!allColumns.includes(col)) allColumns.push(col);
            });
        }
        // Jeśli nie ma żadnych kolumn, domyślna kolumna 'id'
        if (allColumns.length === 0) allColumns = ['id'];
        // Przygotuj CREATE TABLE IF NOT EXISTS
        const tableNameNoExt = tableName.replace('.sqlite','');
        const createCols = allColumns.map(col => `\`${col}\` TEXT`).join(', ');
        const createTableSQL = `CREATE TABLE IF NOT EXISTS \`${tableNameNoExt}\` (${createCols})`;
        try {
            await new Promise((resolve, reject) => {
                db.run(createTableSQL, [], function(err) {
                    if (err) {
                        console.error('[sqlite3] CREATE TABLE ERROR:', err);
                        reject(err);
                    } else {
                        console.log('[sqlite3] CREATE TABLE OK:', createTableSQL);
                        resolve();
                    }
                });
            });
        } catch (err) {
            console.error('[sqlite3] DB CREATE TABLE Error:', err);
        }

        // --- Funkcje pomocnicze ---
        async function insertWithAutoColumns(sql, values, columns, table) {
            return await new Promise((resolve, reject) => {
                db.run(sql, values, async function(err) {
                    if (err && err.message && err.message.includes('no column named')) {
                        // Extract missing column name
                        const match = err.message.match(/no column named ([^ ]+)/);
                        if (match) {
                            const missingCol = match[1];
                            const alterSQL = `ALTER TABLE ${table} ADD COLUMN ${missingCol} TEXT`;
                            console.log('[sqlite3] ALTER TABLE SQL:', alterSQL);
                            db.run(alterSQL, alterErr => {
                                if (alterErr) {
                                    console.error('[sqlite3] ALTER TABLE ERROR:', alterErr);
                                    reject(alterErr);
                                } else {
                                    console.log('[sqlite3] ALTER TABLE OK, retrying INSERT');
                                    // Retry insert
                                    db.run(sql, values, function(retryErr) {
                                        if (retryErr) {
                                            console.error('[sqlite3] RETRY INSERT ERROR:', retryErr);
                                            reject(retryErr);
                                        } else {
                                            console.log('[sqlite3] RETRY INSERT OK, lastID:', this.lastID);
                                            resolve({ lastID: this.lastID });
                                        }
                                    });
                                }
                            });
                        } else {
                            reject(err);
                        }
                    } else if (err) {
                        console.error('[sqlite3] STORE ERROR:', err);
                        reject(err);
                    } else {
                        console.log('[sqlite3] STORE OK, lastID:', this.lastID);
                        resolve({ lastID: this.lastID });
                    }
                });
            });
        }

        async function updateWithAutoColumns(sql, values, columns, table) {
            return await new Promise((resolve, reject) => {
                db.run(sql, values, async function(err) {
                    if (err && err.message && err.message.includes('no such column')) {
                        // Extract missing column name
                        const match = err.message.match(/no such column: ([^ ]+)/);
                        if (match) {
                            const missingCol = match[1];
                            const alterSQL = `ALTER TABLE ${table} ADD COLUMN ${missingCol} TEXT`;
                            console.log('[sqlite3] ALTER TABLE SQL:', alterSQL);
                            db.run(alterSQL, alterErr => {
                                if (alterErr) {
                                    console.error('[sqlite3] ALTER TABLE ERROR:', alterErr);
                                    reject(alterErr);
                                } else {
                                    console.log('[sqlite3] ALTER TABLE OK, retrying UPDATE');
                                    // Retry update
                                    db.run(sql, values, function(retryErr) {
                                        if (retryErr) {
                                            console.error('[sqlite3] RETRY UPDATE ERROR:', retryErr);
                                            reject(retryErr);
                                        } else {
                                            console.log('[sqlite3] RETRY UPDATE OK, changes:', this.changes);
                                            resolve({ changes: this.changes });
                                        }
                                    });
                                }
                            });
                        } else {
                            reject(err);
                        }
                    } else if (err) {
                        console.error('[sqlite3] UPDATE ERROR:', err);
                        reject(err);
                    } else {
                        console.log('[sqlite3] UPDATE OK, changes:', this.changes);
                        resolve({ changes: this.changes });
                    }
                });
            });
        }

        try {
            switch (dboperation) {
                case 'update': {
                    // Jeśli nie podano warunku, wykonaj INSERT (Save)
                    if (!conditionColumn || !conditionValue) {
                        if (columns.length > 0 && values.length > 0) {
                            const placeholders = columns.map(() => '?').join(', ');
                            const insertSql = `INSERT INTO ${tableName.replace('.sqlite','')} (${columns.join(', ')}) VALUES (${placeholders})`;
                            console.log('[sqlite3] SAVE (INSERT) SQL:', insertSql, 'VALUES:', values);
                            output = await insertWithAutoColumns(insertSql, values, columns, tableName.replace('.sqlite',''));
                            console.log('[sqlite3] SAVE (INSERT) result:', output);
                        } else {
                            output = '[sqlite3] SAVE: Missing columns or values.';
                            console.log(output);
                        }
                    } else if (columns.length > 0 && values.length > 0) {
                        // Walidacja kolumny warunku
                        if (!/^\w+$/.test(conditionColumn)) {
                            output = '[sqlite3] UPDATE: Kolumna warunku musi być poprawną nazwą.';
                            console.log(output);
                            break;
                        }
                        // Sprawdź czy istnieje rekord z podaną wartością warunku
                        const checkSql = `SELECT COUNT(*) as cnt FROM ${tableName.replace('.sqlite','')} WHERE ${conditionColumn}=?`;
                        console.log('[sqlite3] CHECK EXISTS SQL:', checkSql, 'VALUE:', conditionValue);
                        const checkExists = await new Promise((resolve, reject) => {
                            db.get(checkSql, [conditionValue], (err, row) => {
                                if (err) {
                                    console.error('[sqlite3] CHECK EXISTS ERROR:', err);
                                    reject(err);
                                } else {
                                    resolve(row && row.cnt > 0);
                                }
                            });
                        });
                        if (!checkExists) {
                            // Dodaj nowy rekord z podaną wartością warunku i resztą wartości
                            // Upewnij się, że kolumna warunku jest w columns
                            let insertColumns = [...columns];
                            let insertValues = [...values];
                            if (!insertColumns.includes(conditionColumn)) {
                                insertColumns.push(conditionColumn);
                                insertValues.push(conditionValue);
                            } else {
                                // Jeśli kolumna warunku już jest w columns, nadpisz jej wartość
                                const idx = insertColumns.indexOf(conditionColumn);
                                insertValues[idx] = conditionValue;
                            }
                            const placeholders = insertColumns.map(() => '?').join(', ');
                            const insertSql = `INSERT INTO ${tableName.replace('.sqlite','')} (${insertColumns.join(', ')}) VALUES (${placeholders})`;
                            console.log('[sqlite3] INSERT (bo brak rekordu) SQL:', insertSql, 'VALUES:', insertValues);
                            output = await insertWithAutoColumns(insertSql, insertValues, insertColumns, tableName.replace('.sqlite',''));
                            console.log('[sqlite3] INSERT (bo brak rekordu) result:', output);
                        } else {
                            // Wykonaj UPDATE jak dotychczas
                            // Ustal setClause tylko dla kolumn bez kolumny warunku
                            const setClause = columns.filter(col => col !== conditionColumn).map((col, i) => `${col}=?`).join(', ');
                            const updateValues = columns.filter(col => col !== conditionColumn).map((col, i) => values[columns.indexOf(col)]);
                            // Dodaj wartość warunku na koniec
                            updateValues.push(conditionValue);
                            const sql = `UPDATE ${tableName.replace('.sqlite','')} SET ${setClause} WHERE ${conditionColumn}=?`;
                            console.log('[sqlite3] UPDATE SQL:', sql, 'VALUES:', updateValues);
                            output = await updateWithAutoColumns(sql, updateValues, columns, tableName.replace('.sqlite',''));
                            console.log('[sqlite3] UPDATE result:', output);
                        }
                    } else {
                        output = '[sqlite3] UPDATE: Missing columns or values.';
                        console.log(output);
                    }
                    break;
                }
                case 'store': {
                    // Pobierz wybraną kolumnę lub cały rekord na podstawie warunku
                    const getColumnRaw = this.evalMessage(data.getColumn, cache);
                    const getColumn = getColumnRaw && getColumnRaw.trim() !== '' ? getColumnRaw.trim() : null;
                    if (getColumn && conditionColumn && values.length > 0) {
                        // Pobierz wybraną kolumnę na podstawie warunku
                        const sql = `SELECT ${getColumn} FROM ${tableName.replace('.sqlite','')} WHERE ${conditionColumn}=?`;
                        console.log('[sqlite3] STORE GET SQL:', sql, 'VALUE:', values[0]);
                        output = await new Promise((resolve, reject) => {
                            db.get(sql, [values[0]], (err, row) => {
                                if (err) {
                                    console.error('[sqlite3] STORE GET ERROR:', err);
                                    reject(err);
                                } else {
                                    console.log('[sqlite3] STORE GET OK, row:', row);
                                    if (!row) {
                                        console.warn('[sqlite3] STORE GET: Brak rekordu dla warunku', conditionColumn, '=', values[0]);
                                        // Dodatkowe logowanie: pokaż wszystkie rekordy z tabeli
                                        const debugSql = `SELECT * FROM ${tableName.replace('.sqlite','')}`;
                                        db.all(debugSql, [], (err2, rows2) => {
                                            if (err2) {
                                                console.error('[sqlite3] DEBUG: Błąd przy pobieraniu wszystkich rekordów:', err2);
                                            } else {
                                                console.log('[sqlite3] DEBUG: Wszystkie rekordy w tabeli:', rows2);
                                            }
                                        });
                                        resolve('Brak danych');
                                    } else if (row[getColumn] === undefined || row[getColumn] === null || row[getColumn] === '') {
                                        resolve('Brak danych');
                                    } else {
                                        resolve(row[getColumn]);
                                    }
                                }
                            });
                        });
                        console.log('[sqlite3] STORE GET result:', output);
                    } else if (getColumn && (!conditionColumn || values.length === 0)) {
                        // Pobierz wybraną kolumnę dla wszystkich rekordów
                        const sql = `SELECT ${getColumn} FROM ${tableName.replace('.sqlite','')}`;
                        console.log('[sqlite3] STORE GET ALL SQL:', sql);
                        output = await new Promise((resolve, reject) => {
                            db.all(sql, [], (err, rows) => {
                                if (err) {
                                    console.error('[sqlite3] STORE GET ALL ERROR:', err);
                                    reject(err);
                                } else {
                                    console.log('[sqlite3] STORE GET ALL OK, rows:', rows);
                                    // Zwróć tablicę wartości tej kolumny
                                    resolve(rows.map(r => r[getColumn]));
                                }
                            });
                        });
                        console.log('[sqlite3] STORE GET ALL result:', output);
                    } else if (!getColumn && conditionColumn && values.length > 0) {
                        // Pobierz cały rekord na podstawie warunku
                        const sql = `SELECT * FROM ${tableName.replace('.sqlite','')} WHERE ${conditionColumn}=?`;
                        console.log('[sqlite3] STORE GET RECORD SQL:', sql, 'VALUE:', values[0]);
                        output = await new Promise((resolve, reject) => {
                            db.get(sql, [values[0]], (err, row) => {
                                if (err) {
                                    console.error('[sqlite3] STORE GET RECORD ERROR:', err);
                                    reject(err);
                                } else {
                                    console.log('[sqlite3] STORE GET RECORD OK, row:', row);
                                    resolve(row || 'Brak danych');
                                }
                            });
                        });
                        console.log('[sqlite3] STORE GET RECORD result:', output);
                    } else {
                        // Pobierz wszystkie rekordy
                        const sql = `SELECT * FROM ${tableName.replace('.sqlite','')}`;
                        console.log('[sqlite3] STORE GET ALL RECORDS SQL:', sql);
                        output = await new Promise((resolve, reject) => {
                            db.all(sql, [], (err, rows) => {
                                if (err) {
                                    console.error('[sqlite3] STORE GET ALL RECORDS ERROR:', err);
                                    reject(err);
                                } else {
                                    console.log('[sqlite3] STORE GET ALL RECORDS OK, rows:', rows);
                                    resolve(rows);
                                }
                            });
                        });
                        console.log('[sqlite3] STORE GET ALL RECORDS result:', output);
                    }
                    break;
                }
                case 'delete': {
                    // DELETE lub CLEAR
                    if (columnsToClear.length > 0 && columns.length === 0) {
                        // CLEAR całej kolumny (wszystkich rekordów)
                        const setClause = columnsToClear.map(col => `${col}=NULL`).join(', ');
                        const sql = `UPDATE ${tableName.replace('.sqlite','')} SET ${setClause}`;
                        console.log('[sqlite3] CLEAR ALL SQL:', sql);
                        output = await new Promise((resolve, reject) => {
                            db.run(sql, [], function(err) {
                                if (err) {
                                    console.error('[sqlite3] CLEAR ALL ERROR:', err);
                                    reject(err);
                                } else {
                                    console.log('[sqlite3] CLEAR ALL OK, changes:', this.changes);
                                    resolve({ changes: this.changes });
                                }
                            });
                        });
                        console.log('[sqlite3] CLEAR ALL result:', output);
                    } else if (columns.length > 0 && values.length > 0) {
                        const where = columns.map((col, i) => `${col}=?`).join(' AND ');
                        if (columnsToClear.length > 0) {
                            // CLEAR wskazanych kolumn (ustaw na NULL)
                            const setClause = columnsToClear.map(col => `${col}=NULL`).join(', ');
                            const sql = `UPDATE ${tableName.replace('.sqlite','')} SET ${setClause} WHERE ${where}`;
                            console.log('[sqlite3] CLEAR SQL:', sql, 'VALUES:', values);
                            output = await new Promise((resolve, reject) => {
                                db.run(sql, values, function(err) {
                                    if (err) {
                                        console.error('[sqlite3] CLEAR ERROR:', err);
                                        reject(err);
                                    } else {
                                        console.log('[sqlite3] CLEAR OK, changes:', this.changes);
                                        resolve({ changes: this.changes });
                                    }
                                });
                            });
                            console.log('[sqlite3] CLEAR result:', output);
                        } else {
                            // DELETE cały rekord
                            const sql = `DELETE FROM ${tableName.replace('.sqlite','')} WHERE ${where}`;
                            console.log('[sqlite3] DELETE SQL:', sql, 'VALUES:', values);
                            output = await new Promise((resolve, reject) => {
                                db.run(sql, values, function(err) {
                                    if (err) {
                                        console.error('[sqlite3] DELETE ERROR:', err);
                                        reject(err);
                                    } else {
                                        console.log('[sqlite3] DELETE OK, changes:', this.changes);
                                        resolve({ changes: this.changes });
                                    }
                                });
                            });
                            console.log('[sqlite3] DELETE result:', output);
                        }
                    }
                    break;
                }
            }
        } catch (err) {
            console.error('[sqlite3] DB Error:', err);
            output = `[sqlite3] Error: ${err.message}`;
        } finally {
            db.close();
            console.log('[sqlite3] DB closed');
        }

        const varName = this.evalMessage(data.varName, cache);
        const storage = parseInt(data.storage, 10);
        this.storeValue(output, storage, varName, cache);
        this.callNextAction(cache);
    },
};