const MODULE_NAME = 'rollmode-toggle'
const modes = [
    {
        value: "selfroll",
        stub: "Self",
        keybind: [
            {
                key: 'KeyS',
                modifiers: ['Alt']
            }
        ]
    },
    {
        value: "publicroll",
        stub: "Public",
        keybind: []
    },
    {
        value: "privateroll",
        stub: "Private",
        keybind: []
    },
    {
        value: "gmroll",
        stub: "Blind GM",
        keybind: []
    },
]

function setMode(mode) {
    game.settings.set('core', 'rollMode', mode.value)
    if (game.settings.get(MODULE_NAME, 'notify') === true){
        ui.notifications.info(`Roll mode set to ${mode.stub}`)
    }
}

Hooks.on('init', () => {
    
    game.settings.register(MODULE_NAME, 'notify', {
        name: "Notifications",
        hint: "Enable notifications to confirm the roll mode.",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });
    
    modes.forEach(mode => {
        if (mode.value != 'publicroll'){
            game.keybindings.register(MODULE_NAME, `toggle-${mode.value}`, {
                name: `Toggle ${mode.stub} Roll Mode`,
                hint: `Swap between Public and ${mode.stub} roll modes.`,
                editable: mode.keybind,
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
        game.keybindings.register(MODULE_NAME, `set-${mode.stub}`, {
            name: `Switch to ${mode.stub} Roll Mode`,
            hint: `Set the chat roll mode to ${mode.stub} mode.`,
            editable: [],
            onDown: () => { setMode(mode) },
        });
    });
    
});
