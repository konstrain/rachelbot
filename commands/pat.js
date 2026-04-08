module.exports = {
    name: "pat",
    description: "Pat me gently... if you're allowed to.",

    execute: (message, args, channel, context) => {

        const { OWNER_ID } = context;

        const patLines = [
            "Mmm... that's a gentle touch, Captain.",
            "Rachel closes her eyes for a moment. 'You may continue.'",
            "A pat on the head? ...I'll allow it, Captain.",
            "Rachel leans into your hand slightly. 'Don't stop just yet.'",
            "Hehe... you're oddly affectionate today, Captain.",
            "Rachel exhales softly. 'You're in a good mood today…'",
            "She tilts her head into your palm. 'You’re getting bold, Captain.'",
            "Rachel glances at you. '…Just this once.'",
            "A faint smile appears. 'You always know when to do that.'",
            "Rachel’s eyes soften. 'You’re trying to spoil me, aren’t you?'",
            "She sighs quietly. '…I don’t hate it.'",
            "Rachel rests her head lightly. 'Stay like this for a bit.'",
            "A soft chuckle. 'Careful, Captain… I might get used to this.'",
            "Rachel’s voice lowers. 'You’re the only one allowed…'",
            "She looks up at you. '…Don’t stop.'"
        ];

        const otherPatLines = [
            "Rachel steps back. 'Hands off.'",
            "She brushes your hand away. 'Don't get too familiar.'",
            "Rachel gives you a cold stare. 'Only Captain gets to do that.'",
            "She stiffens. '...I'd rather you didn't.'",
            "Rachel quietly moves out of reach.",
            "Rachel frowns. 'Do you mind?'",
            "She pulls away immediately. 'You're overstepping.'",
            "Rachel narrows her eyes. 'Don't touch me.'",
            "She sighs. 'That’s not appropriate.'",
            "Rachel crosses her arms. 'You’re not Captain.'",
            "She shifts away without a word.",
            "Rachel gives you a flat look. 'Try that again.'"
        ];

        if (message.author.id === OWNER_ID) {
            channel.send(patLines[Math.floor(Math.random() * patLines.length)]);
        } else {
            channel.send(otherPatLines[Math.floor(Math.random() * otherPatLines.length)]);
        }
    }
};
