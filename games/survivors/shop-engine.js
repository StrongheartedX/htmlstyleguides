// =========================================================================
// SHOP ENGINE — Shared logic for all Survivors shop pages
// Reads configuration from window.SHOP_CONFIG and window.SKILL_TREE_DEF
// =========================================================================

// =========================================================================
// SAVE MANAGER (mirrors engine.js SaveManager, standalone for the shop)
// =========================================================================
var STORAGE_KEY = 'survivors-save';
var SAVE_VERSION = 1;

function defaultSave() {
    return {
        version: SAVE_VERSION,
        gold: 0,
        skillPoints: 0,
        currentWorld: 0,
        inventory: [],
        equipped: [],
        inventorySlots: 6,
        skillTree: {},
        upgrades: {},
        stats: { totalKills: 0, bestTime: 0, runsCompleted: 0 }
    };
}

function loadSave() {
    try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultSave();
        var parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return defaultSave();
        return migrateSave(parsed);
    } catch (e) {
        console.warn('Shop: failed to load save', e);
        return defaultSave();
    }
}

function migrateSave(data) {
    var base = defaultSave();
    return {
        version: SAVE_VERSION,
        gold: typeof data.gold === 'number' ? data.gold : base.gold,
        skillPoints: typeof data.skillPoints === 'number' ? data.skillPoints : base.skillPoints,
        currentWorld: typeof data.currentWorld === 'number' ? data.currentWorld : base.currentWorld,
        inventory: Array.isArray(data.inventory) ? data.inventory : base.inventory,
        equipped: Array.isArray(data.equipped) ? data.equipped.slice(0, 3) : base.equipped,
        inventorySlots: typeof data.inventorySlots === 'number' ? data.inventorySlots : base.inventorySlots,
        skillTree: data.skillTree && typeof data.skillTree === 'object' ? data.skillTree : base.skillTree,
        upgrades: data.upgrades && typeof data.upgrades === 'object' ? data.upgrades : base.upgrades,
        stats: {
            totalKills: (data.stats && typeof data.stats.totalKills === 'number') ? data.stats.totalKills : base.stats.totalKills,
            bestTime: (data.stats && typeof data.stats.bestTime === 'number') ? data.stats.bestTime : base.stats.bestTime,
            runsCompleted: (data.stats && typeof data.stats.runsCompleted === 'number') ? data.stats.runsCompleted : base.stats.runsCompleted
        }
    };
}

function writeSave(data) {
    try {
        var merged = Object.assign(defaultSave(), data);
        merged.version = SAVE_VERSION;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return true;
    } catch (e) {
        console.warn('Shop: failed to write save', e);
        return false;
    }
}

// =========================================================================
// STATE
// =========================================================================
var saveData = loadSave();

function isOwned(itemId) {
    return !!(saveData.upgrades && saveData.upgrades[itemId]);
}

function canAfford(cost) {
    return saveData.gold >= cost;
}

function requirementMet(item) {
    if (!item.requires) return true;
    return isOwned(item.requires);
}

// =========================================================================
// RENDERING
// =========================================================================
function renderHeader() {
    document.getElementById('shop-title').textContent = SHOP_CONFIG.title;
    document.getElementById('shop-subtitle').textContent = SHOP_CONFIG.subtitle;
    document.title = SHOP_CONFIG.title;

    var continueBtn = document.getElementById('continue-btn');
    continueBtn.href = SHOP_CONFIG.nextWorld.url;
    var verb = SHOP_CONFIG.continueVerb || 'Descend into';
    continueBtn.innerHTML = verb + ' ' + SHOP_CONFIG.nextWorld.label + ' \u2192';

    // Set gold icon from config
    var goldIconEl = document.getElementById('gold-icon');
    if (goldIconEl) goldIconEl.innerHTML = SHOP_CONFIG.goldIcon || '&#x2B50;';

    // Set category labels and icons from config
    var cats = SHOP_CONFIG.categories || {};
    if (cats.stats) {
        var catStats = document.querySelector('#cat-stats h2');
        if (catStats) catStats.innerHTML = cats.stats.icon + ' ' + cats.stats.label;
    }
    if (cats.weapons) {
        var catWeapons = document.querySelector('#cat-weapons h2');
        if (catWeapons) catWeapons.innerHTML = cats.weapons.icon + ' ' + cats.weapons.label;
    }
    if (cats.passives) {
        var catPassives = document.querySelector('#cat-passives h2');
        if (catPassives) catPassives.innerHTML = cats.passives.icon + ' ' + cats.passives.label;
    }
    if (cats.skills) {
        var catSkills = document.querySelector('#cat-skilltree h2');
        if (catSkills) catSkills.innerHTML = cats.skills.icon + ' ' + cats.skills.label;
    }
    if (cats.inventory) {
        var catInventory = document.querySelector('#cat-inventory h2');
        if (catInventory) catInventory.innerHTML = cats.inventory.icon + ' ' + cats.inventory.label;
    }
}

function renderPlayerBar() {
    document.getElementById('gold-amount').textContent = saveData.gold;
    document.getElementById('stat-runs').textContent = saveData.stats.runsCompleted;
    document.getElementById('stat-kills').textContent = saveData.stats.totalKills;
    document.getElementById('stat-world').textContent = (saveData.currentWorld || 0) + 1;
    var spEl = document.getElementById('stat-sp');
    if (spEl) spEl.textContent = saveData.skillPoints || 0;
}

function createCard(item, category) {
    var owned = isOwned(item.id);
    var affordable = canAfford(item.cost);
    var reqMet = requirementMet(item);
    var locked = !affordable || !reqMet;

    var card = document.createElement('div');
    card.className = 'item-card' + (owned ? ' item-owned' : '') + (!owned && locked ? ' item-locked' : '');

    var badgeHTML = '';
    if (owned) {
        badgeHTML = '<span class="item-badge badge-owned">Owned</span>';
    } else if (!reqMet) {
        badgeHTML = '<span class="item-badge badge-locked">Locked</span>';
    }

    var purchasedLabel = SHOP_CONFIG.purchasedLabel || 'Purchased';
    card.innerHTML =
        badgeHTML +
        '<div class="item-icon">' + item.icon + '</div>' +
        '<div class="item-name">' + item.name + '</div>' +
        '<div class="item-desc">' + item.desc + '</div>' +
        '<div class="item-cost">' + (owned ? purchasedLabel : item.cost + ' Gold') + '</div>';

    if (!owned) {
        card.addEventListener('click', function () {
            buyItem(item, category);
        });
    }

    return card;
}

function renderGrid(gridId, items, category) {
    var grid = document.getElementById(gridId);
    grid.innerHTML = '';
    items.forEach(function (item) {
        grid.appendChild(createCard(item, category));
    });
}

function renderAll() {
    renderHeader();
    renderPlayerBar();
    renderGrid('grid-stats', SHOP_CONFIG.statUpgrades, 'stat');
    renderGrid('grid-weapons', SHOP_CONFIG.startingWeapons, 'weapon');
    renderGrid('grid-passives', SHOP_CONFIG.passives, 'passive');
    if (typeof renderSkillTree === 'function') renderSkillTree();
    renderInventory();
}

// =========================================================================
// PURCHASE LOGIC
// =========================================================================
function buyItem(item, category) {
    if (isOwned(item.id)) return;
    if (!canAfford(item.cost)) {
        showToast(SHOP_CONFIG.buyFailMsg || 'Not enough gold!');
        return;
    }
    if (!requirementMet(item)) {
        showToast('Requires: ' + item.requires);
        return;
    }

    saveData.gold -= item.cost;
    if (!saveData.upgrades) saveData.upgrades = {};
    saveData.upgrades[item.id] = {
        category: category,
        purchasedAt: Date.now()
    };

    // Store additional metadata depending on category
    if (item.stat) {
        saveData.upgrades[item.id].stat = item.stat;
        if (item.mult !== undefined) saveData.upgrades[item.id].mult = item.mult;
        if (item.bonus !== undefined) saveData.upgrades[item.id].bonus = item.bonus;
    }
    if (item.weaponType) {
        saveData.upgrades[item.id].weaponType = item.weaponType;
    }

    writeSave(saveData);
    renderAll();
    showToast((SHOP_CONFIG.purchaseToast || 'Purchased: ') + item.name);
}

// =========================================================================
// EXPORT / IMPORT / RESET
// =========================================================================
function exportSave() {
    var json = JSON.stringify(saveData, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(json).then(function () {
            showToast(SHOP_CONFIG.exportToast || 'Save copied to clipboard!');
        }).catch(function () {
            fallbackExport(json);
        });
    } else {
        fallbackExport(json);
    }
}

function fallbackExport(json) {
    var ta = document.getElementById('import-textarea');
    ta.value = json;
    openImportModal();
    ta.select();
    showToast('Save JSON shown in text box. Copy it manually.');
}

function openImportModal() {
    document.getElementById('import-modal').classList.add('active');
}

function closeImportModal() {
    document.getElementById('import-modal').classList.remove('active');
}

function doImport() {
    var raw = document.getElementById('import-textarea').value.trim();
    if (!raw) {
        showToast('Paste a save JSON first.');
        return;
    }
    try {
        var parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || typeof parsed.version !== 'number') {
            showToast('Invalid save format.');
            return;
        }
        saveData = migrateSave(parsed);
        writeSave(saveData);
        closeImportModal();
        renderAll();
        showToast('Save imported successfully!');
    } catch (e) {
        showToast('Failed to parse JSON.');
    }
}

function resetSave() {
    if (!confirm(SHOP_CONFIG.resetConfirm || 'Reset all progress? This cannot be undone.')) return;
    saveData = defaultSave();
    writeSave(saveData);
    renderAll();
    showToast('Save reset.');
}

// =========================================================================
// TOAST
// =========================================================================
var toastTimer = null;
function showToast(msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        el.classList.remove('show');
    }, 2200);
}

// Close import modal on overlay click
document.getElementById('import-modal').addEventListener('click', function (e) {
    if (e.target === this) closeImportModal();
});

// =========================================================================
// SKILL TREE (reads from window.SKILL_TREE_DEF)
// =========================================================================
function getSpentPoints() {
    var st = saveData.skillTree || {};
    return Object.keys(st).filter(function(k) { return st[k]; }).length;
}

function getAvailablePoints() {
    return (saveData.skillPoints || 0) - getSpentPoints();
}

function isSkillUnlocked(skillId) {
    return !!(saveData.skillTree && saveData.skillTree[skillId]);
}

function canUnlockSkill(skillId) {
    if (isSkillUnlocked(skillId)) return false;
    if (getAvailablePoints() <= 0) return false;
    for (var bk in SKILL_TREE_DEF) {
        var nodes = SKILL_TREE_DEF[bk].nodes;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id === skillId) {
                if (i === 0) return true;
                return isSkillUnlocked(nodes[i - 1].id);
            }
        }
    }
    return false;
}

function unlockSkill(skillId) {
    if (!canUnlockSkill(skillId)) return;
    if (!saveData.skillTree) saveData.skillTree = {};
    saveData.skillTree[skillId] = true;
    writeSave(saveData);
    renderSkillTree();
    showToast(SHOP_CONFIG.skillUnlockToast || 'Skill unlocked!');
}

function renderSkillTree() {
    var svg = document.getElementById('skill-tree-svg');
    svg.innerHTML = '';

    document.getElementById('skill-points-count').textContent = getAvailablePoints();

    var branches = Object.keys(SKILL_TREE_DEF);
    var rowHeight = 90;
    var startY = 50;
    var nodeStartX = 180;
    var nodeSpacingX = 150;
    var nodeRadius = 22;

    for (var bi = 0; bi < branches.length; bi++) {
        var branch = SKILL_TREE_DEF[branches[bi]];
        var cy = startY + bi * rowHeight;

        var labelEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelEl.setAttribute('x', 16);
        labelEl.setAttribute('y', cy + 5);
        labelEl.setAttribute('class', 'branch-label');
        labelEl.setAttribute('fill', branch.color);
        labelEl.textContent = branch.icon + ' ' + branch.label;
        svg.appendChild(labelEl);

        for (var ni = 0; ni < branch.nodes.length; ni++) {
            var nx = nodeStartX + ni * nodeSpacingX;
            var prevUnlocked = ni === 0 ? true : isSkillUnlocked(branch.nodes[ni - 1].id);
            var thisUnlocked = isSkillUnlocked(branch.nodes[ni].id);

            if (ni === 0) {
                var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', 110);
                line.setAttribute('y1', cy);
                line.setAttribute('x2', nx - nodeRadius);
                line.setAttribute('y2', cy);
                line.setAttribute('stroke', branch.color);
                line.setAttribute('class', 'connector ' + (thisUnlocked ? 'active' : 'inactive'));
                svg.appendChild(line);
            } else {
                var prevX = nodeStartX + (ni - 1) * nodeSpacingX;
                var lineConn = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                lineConn.setAttribute('x1', prevX + nodeRadius);
                lineConn.setAttribute('y1', cy);
                lineConn.setAttribute('x2', nx - nodeRadius);
                lineConn.setAttribute('y2', cy);
                lineConn.setAttribute('stroke', branch.color);
                lineConn.setAttribute('class', 'connector ' + (thisUnlocked ? 'active' : 'inactive'));
                svg.appendChild(lineConn);
            }

            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', nx);
            circle.setAttribute('cy', cy);
            circle.setAttribute('r', nodeRadius);
            circle.setAttribute('stroke', branch.color);

            var canUnlock = canUnlockSkill(branch.nodes[ni].id);
            if (thisUnlocked) {
                circle.setAttribute('fill', branch.color);
                circle.setAttribute('class', 'node-circle unlocked');
            } else if (canUnlock) {
                circle.setAttribute('fill', 'rgba(' + hexToRgb(branch.color) + ', 0.15)');
                circle.setAttribute('class', 'node-circle');
                circle.setAttribute('stroke-dasharray', '4 3');
            } else {
                circle.setAttribute('fill', 'rgba(40,40,60,0.6)');
                circle.setAttribute('class', 'node-circle locked');
            }

            (function(node, branchDef, canU) {
                circle.addEventListener('click', function() {
                    if (canU) unlockSkill(node.id);
                    else if (isSkillUnlocked(node.id)) showToast('Already unlocked');
                    else if (getAvailablePoints() <= 0) showToast('No skill points available');
                    else showToast('Unlock previous skills first');
                });
                circle.addEventListener('mouseenter', function(ev) {
                    showSkillTooltip(ev, node, branchDef, canU);
                });
                circle.addEventListener('mousemove', function(ev) {
                    moveSkillTooltip(ev);
                });
                circle.addEventListener('mouseleave', function() {
                    hideSkillTooltip();
                });
            })(branch.nodes[ni], branch, canUnlock);

            svg.appendChild(circle);

            var iconText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            iconText.setAttribute('x', nx);
            iconText.setAttribute('y', cy + 1);
            iconText.setAttribute('text-anchor', 'middle');
            iconText.setAttribute('dominant-baseline', 'middle');
            iconText.setAttribute('font-size', '14');
            iconText.setAttribute('fill', thisUnlocked ? '#fff' : (canUnlock ? branch.color : '#555'));
            iconText.setAttribute('pointer-events', 'none');
            iconText.textContent = (ni + 1);
            svg.appendChild(iconText);

            var nameLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            nameLabel.setAttribute('x', nx);
            nameLabel.setAttribute('y', cy + nodeRadius + 16);
            nameLabel.setAttribute('text-anchor', 'middle');
            nameLabel.setAttribute('class', 'node-label' + (!thisUnlocked && !canUnlock ? ' dimmed' : ''));
            nameLabel.textContent = branch.nodes[ni].name;
            svg.appendChild(nameLabel);
        }
    }
}

function hexToRgb(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return r + ',' + g + ',' + b;
}

var tooltipEl = document.getElementById('skill-tooltip');

function showSkillTooltip(ev, node, branch, canUnlock) {
    var unlocked = isSkillUnlocked(node.id);
    var statusText = unlocked ? 'Unlocked' :
        (canUnlock ? 'Click to unlock (1 point)' :
        (getAvailablePoints() <= 0 ? 'No skill points' : 'Unlock previous first'));
    tooltipEl.innerHTML =
        '<div class="tt-name" style="color:' + branch.color + '">' + node.name + '</div>' +
        '<div>' + node.desc + '</div>' +
        '<div class="tt-status">' + statusText + '</div>';
    tooltipEl.classList.add('visible');
    moveSkillTooltip(ev);
}

function moveSkillTooltip(ev) {
    tooltipEl.style.left = (ev.clientX + 14) + 'px';
    tooltipEl.style.top = (ev.clientY + 14) + 'px';
}

function hideSkillTooltip() {
    tooltipEl.classList.remove('visible');
}

// =========================================================================
// LOOT TABLE (must match engine.js LOOT_TABLE)
// =========================================================================
var LOOT_TABLE = [
    { id: 'loot_rusty_shield',    name: 'Rusty Shield',      rarity: 'common',    icon: '\u26E8', desc: '+5 Max HP' },
    { id: 'loot_old_boots',       name: 'Old Boots',         rarity: 'common',    icon: '\u{1F462}', desc: '+5% Speed' },
    { id: 'loot_cracked_lens',    name: 'Cracked Lens',      rarity: 'common',    icon: '\u{1F50D}', desc: '+10 Pickup Radius' },
    { id: 'loot_torn_gloves',     name: 'Torn Gloves',       rarity: 'common',    icon: '\u{1F9E4}', desc: '+5% Damage' },
    { id: 'loot_dull_whetstone',  name: 'Dull Whetstone',    rarity: 'common',    icon: '\u25C8', desc: '+5% Attack Speed' },
    { id: 'loot_vampiric_ring',   name: 'Vampiric Ring',     rarity: 'rare',      icon: '\u{1F48D}', desc: '2% Lifesteal' },
    { id: 'loot_scope',           name: 'Marksman Scope',    rarity: 'rare',      icon: '\u{1F3AF}', desc: '+10% Crit Chance' },
    { id: 'loot_iron_plate',      name: 'Iron Plate',        rarity: 'rare',      icon: '\u2694', desc: '+10% Defense' },
    { id: 'loot_swift_cloak',     name: 'Swift Cloak',       rarity: 'rare',      icon: '\u{1F9E3}', desc: '+15% Speed' },
    { id: 'loot_emerald_charm',   name: 'Emerald Charm',     rarity: 'rare',      icon: '\u{1F48E}', desc: '+20% XP Gain' },
    { id: 'loot_berserker_gauntlet', name: 'Berserker Gauntlet', rarity: 'epic',  icon: '\u{1F94A}', desc: '+30% Damage below 50% HP' },
    { id: 'loot_magnet_core',     name: 'Magnet Core',       rarity: 'epic',      icon: '\u{1F9F2}', desc: '+50 Pickup Radius' },
    { id: 'loot_crimson_heart',   name: 'Crimson Heart',     rarity: 'epic',      icon: '\u2764', desc: '+40 Max HP, +Regen' },
    { id: 'loot_quicksilver',     name: 'Quicksilver Vial',  rarity: 'epic',      icon: '\u{1F4A7}', desc: '-25% Dash Cooldown' },
    { id: 'loot_war_drum',        name: 'War Drum',          rarity: 'epic',      icon: '\u{1F941}', desc: '+25% Attack Speed' },
    { id: 'loot_phoenix_feather', name: 'Phoenix Feather',   rarity: 'legendary', icon: '\u{1F525}', desc: 'Auto-revive once per run' },
    { id: 'loot_crown_of_thorns', name: 'Crown of Thorns',   rarity: 'legendary', icon: '\u{1F451}', desc: 'Reflect 20% damage taken' },
    { id: 'loot_void_orb',        name: 'Void Orb',          rarity: 'legendary', icon: '\u{1F311}', desc: '+50% Damage, -20% Max HP' }
];

var RARITY_ORDER = { legendary: 0, epic: 1, rare: 2, common: 3 };
var SALVAGE_VALUES = { common: 5, rare: 15, epic: 40, legendary: 100 };

var INV_SLOT_UPGRADES = [
    { slots: 8,  cost: 300 },
    { slots: 10, cost: 750 },
    { slots: 12, cost: 1500 },
    { slots: 16, cost: 3000 },
    { slots: 20, cost: 6000 }
];

// =========================================================================
// INVENTORY SYSTEM
// =========================================================================
function getLootById(id) {
    return LOOT_TABLE.find(function(item) { return item.id === id; }) || null;
}

function isEquipped(itemId) {
    return saveData.equipped && saveData.equipped.indexOf(itemId) !== -1;
}

function equipItem(itemId) {
    if (!saveData.equipped) saveData.equipped = [];
    if (saveData.equipped.length >= 3) {
        showToast('Unequip an item first (max 3)');
        return;
    }
    if (saveData.equipped.indexOf(itemId) !== -1) return;
    saveData.equipped.push(itemId);
    writeSave(saveData);
    renderInventory();
    renderPlayerBar();
    showToast('Equipped!');
}

function unequipItem(itemId) {
    if (!saveData.equipped) return;
    var idx = saveData.equipped.indexOf(itemId);
    if (idx === -1) return;
    saveData.equipped.splice(idx, 1);
    writeSave(saveData);
    renderInventory();
    renderPlayerBar();
    showToast('Unequipped');
}

function salvageItem(itemId) {
    var loot = getLootById(itemId);
    if (!loot) return;
    if (isEquipped(itemId)) {
        showToast('Unequip before salvaging');
        return;
    }
    var goldValue = SALVAGE_VALUES[loot.rarity] || 5;
    var invIdx = saveData.inventory.indexOf(itemId);
    if (invIdx === -1) return;
    saveData.inventory.splice(invIdx, 1);
    saveData.gold += goldValue;
    writeSave(saveData);
    renderInventory();
    renderPlayerBar();
    showToast('Salvaged ' + loot.name + ' for ' + goldValue + 'g');
}

function buyInventorySlots() {
    var currentSlots = saveData.inventorySlots || 6;
    var upgrade = INV_SLOT_UPGRADES.find(function(u) { return u.slots > currentSlots; });
    if (!upgrade) {
        showToast('Inventory fully upgraded!');
        return;
    }
    if (saveData.gold < upgrade.cost) {
        showToast('Not enough gold! Need ' + upgrade.cost + 'g');
        return;
    }
    saveData.gold -= upgrade.cost;
    saveData.inventorySlots = upgrade.slots;
    writeSave(saveData);
    renderInventory();
    renderPlayerBar();
    showToast('Inventory expanded to ' + upgrade.slots + ' slots!');
}

function renderInventory() {
    var equipped = saveData.equipped || [];
    var inventory = saveData.inventory || [];
    var maxSlots = saveData.inventorySlots || 6;

    var itemCounts = {};
    inventory.forEach(function(id) {
        itemCounts[id] = (itemCounts[id] || 0) + 1;
    });
    var uniqueIds = Object.keys(itemCounts);
    var usedSlots = uniqueIds.length;

    document.getElementById('inv-equip-count').textContent = equipped.length;
    var slotInfo = document.getElementById('inv-slot-info');
    if (slotInfo) slotInfo.textContent = usedSlots + '/' + maxSlots;

    var expandBtn = document.getElementById('inv-expand-btn');
    if (expandBtn) {
        var nextUpgrade = INV_SLOT_UPGRADES.find(function(u) { return u.slots > maxSlots; });
        if (nextUpgrade) {
            expandBtn.textContent = 'Expand to ' + nextUpgrade.slots + ' (' + nextUpgrade.cost + 'g)';
            expandBtn.style.display = 'inline-block';
            expandBtn.disabled = saveData.gold < nextUpgrade.cost;
            expandBtn.style.opacity = saveData.gold >= nextUpgrade.cost ? '1' : '0.5';
        } else {
            expandBtn.textContent = 'Max Slots';
            expandBtn.style.display = 'inline-block';
            expandBtn.disabled = true;
            expandBtn.style.opacity = '0.5';
        }
    }

    var slotsContainer = document.getElementById('equip-slots');
    slotsContainer.innerHTML = '';
    for (var s = 0; s < 3; s++) {
        var slotDiv = document.createElement('div');
        if (s < equipped.length) {
            var loot = getLootById(equipped[s]);
            if (loot) {
                slotDiv.className = 'equip-slot filled rarity-' + loot.rarity;
                slotDiv.style.borderColor = getRarityColor(loot.rarity);
                slotDiv.innerHTML =
                    '<div class="slot-icon">' + loot.icon + '</div>' +
                    '<div class="slot-name">' + loot.name + '</div>';
                (function(id) {
                    slotDiv.addEventListener('click', function() { unequipItem(id); });
                    slotDiv.addEventListener('mouseenter', function(ev) {
                        showInvTooltip(ev, getLootById(id), true, false);
                    });
                    slotDiv.addEventListener('mousemove', function(ev) { moveInvTooltip(ev); });
                    slotDiv.addEventListener('mouseleave', function() { hideInvTooltip(); });
                })(equipped[s]);
            }
        } else {
            slotDiv.className = 'equip-slot slot-empty';
            slotDiv.innerHTML =
                '<div class="slot-icon">+</div>' +
                '<div class="slot-label">Empty</div>';
        }
        slotsContainer.appendChild(slotDiv);
    }

    var grid = document.getElementById('inv-grid');
    grid.innerHTML = '';

    if (inventory.length === 0) {
        var emptyMsg = SHOP_CONFIG.emptyInventoryMsg || 'No items yet...';
        grid.innerHTML = '<div class="inv-empty-msg">' + emptyMsg + '</div>';
        return;
    }

    uniqueIds.sort(function(a, b) {
        var la = getLootById(a);
        var lb = getLootById(b);
        if (!la || !lb) return 0;
        return (RARITY_ORDER[la.rarity] || 99) - (RARITY_ORDER[lb.rarity] || 99);
    });

    uniqueIds.forEach(function(itemId) {
        var loot = getLootById(itemId);
        if (!loot) return;
        var count = itemCounts[itemId];
        var eq = isEquipped(itemId);
        var salvageGold = SALVAGE_VALUES[loot.rarity] || 5;

        var card = document.createElement('div');
        card.className = 'inv-item' + (eq ? ' inv-equipped' : '');

        var countLabel = count > 1 ? ' x' + count : '';
        card.innerHTML =
            (eq ? '<div class="inv-equipped-badge">Equipped</div>' : '') +
            '<div class="inv-icon">' + loot.icon + '</div>' +
            '<div class="inv-name" style="color:' + getRarityColor(loot.rarity) + '">' + loot.name + countLabel + '</div>' +
            '<div class="inv-desc">' + loot.desc + '</div>' +
            '<div class="inv-rarity rarity-' + loot.rarity + '">' + loot.rarity + '</div>' +
            (eq ? '' : '<button class="inv-salvage-btn" title="Salvage for ' + salvageGold + 'g">Salvage ' + salvageGold + 'g</button>');

        (function(id, isEq) {
            card.addEventListener('click', function(ev) {
                if (ev.target.classList.contains('inv-salvage-btn')) return;
                if (isEq) unequipItem(id);
                else equipItem(id);
            });
            card.addEventListener('mouseenter', function(ev) {
                showInvTooltip(ev, getLootById(id), isEq, !isEq);
            });
            card.addEventListener('mousemove', function(ev) { moveInvTooltip(ev); });
            card.addEventListener('mouseleave', function() { hideInvTooltip(); });
        })(itemId, eq);

        var salvBtn = card.querySelector('.inv-salvage-btn');
        if (salvBtn) {
            (function(id) {
                salvBtn.addEventListener('click', function(ev) {
                    ev.stopPropagation();
                    salvageItem(id);
                });
            })(itemId);
        }

        grid.appendChild(card);
    });
}

function getRarityColor(rarity) {
    var colors = { common: '#cccccc', rare: '#4488ff', epic: '#aa44ff', legendary: '#ffcc00' };
    return colors[rarity] || '#cccccc';
}

// Inventory tooltips
var invTooltipEl = document.getElementById('inv-tooltip');

function showInvTooltip(ev, loot, isEquippedItem, showSalvage) {
    if (!loot) return;
    var action = isEquippedItem ? 'Click to unequip' : 'Click to equip';
    var salvageText = showSalvage ? '<div class="tt-salvage">Salvage: ' + (SALVAGE_VALUES[loot.rarity] || 5) + 'g</div>' : '';
    invTooltipEl.innerHTML =
        '<div class="tt-name" style="color:' + getRarityColor(loot.rarity) + '">' + loot.icon + ' ' + loot.name + '</div>' +
        '<div>' + loot.desc + '</div>' +
        salvageText +
        '<div class="tt-action">' + action + '</div>';
    invTooltipEl.classList.add('visible');
    moveInvTooltip(ev);
}

function moveInvTooltip(ev) {
    invTooltipEl.style.left = (ev.clientX + 14) + 'px';
    invTooltipEl.style.top = (ev.clientY + 14) + 'px';
}

function hideInvTooltip() {
    invTooltipEl.classList.remove('visible');
}

// =========================================================================
// INIT
// =========================================================================
renderAll();
