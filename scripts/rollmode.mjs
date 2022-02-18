const MODULE_NAME = 'rollmode-toggle'
const modes = [
    {
        value: "selfroll",
        keybind: [
            {
                key: 'KeyS',
                modifiers: ['Alt']
            }
        ]
    },
    {value: "publicroll"},
    {value: "gmroll"},
    {value: "blindroll"},
]

function setMode(mode) {
    game.settings.set('core', 'rollMode', mode.value)
    if (game.settings.get(MODULE_NAME, 'notify') === true){
        ui.notifications.info(game.i18n.localize('rollmode-toggle.notification.'+mode.value))
    }
}

Hooks.on('init', () => {
    
    game.settings.register(MODULE_NAME, 'notify', {
        name: game.i18n.localize('rollmode-toggle.settings.notify.name'),
        hint: game.i18n.localize('rollmode-toggle.settings.notify.hint'),
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });
    
    modes.forEach(mode => {
        if (mode.value != 'publicroll'){
            game.keybindings.register(MODULE_NAME, `toggle-${mode.value}`, {
                name: game.i18n.localize('rollmode-toggle.keybinds.toggle.'+mode.value+'.name'),
                hint: game.i18n.localize('rollmode-toggle.keybinds.toggle.'+mode.value+'.hint'),
                editable: mode.keybind || [],
                onDown: () => {
                    if (game.settings.get("core", 'rollMode') !== mode.value) {
                        setMode(mode);
                    } else {
                        setMode(modes[1]);
                    }
                },
            });
        }
    });
    modes.forEach(mode => {
        game.keybindings.register(MODULE_NAME, `set-${mode.value}`, {
            name: game.i18n.localize('rollmode-toggle.keybinds.set.'+mode.value+'.name'),
            hint: game.i18n.localize('rollmode-toggle.keybinds.set.'+mode.value+'.hint'),
            editable: [],
            onDown: () => { setMode(mode) },
        });
    });
    
});
