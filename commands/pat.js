const { getResponse } = require('../utils/responseEngine');

module.exports = {
    name: "pat",
    description: "Pat me gently... if you're allowed to.",

    execute: (message, args, channel, context) => {

        const responses = {
            cheerful: {
                owner: [
                    "Mmm... that's a gentle touch, Captain.",
                    "Rachel smiles softly. 'You’re in a good mood today…'",
                    "Hehe... you're oddly affectionate today, Captain.",
                    "A faint smile appears. 'You always know when to do that.'"
                ],
                user: [
                    "Rachel steps back. 'Ah… maybe not.'",
                    "She gives a polite smile. 'Let’s keep some distance, alright?'",
                    "Rachel chuckles lightly. 'That’s not for you.'"
                ]
            },

            playful: {
                owner: [
                    "Rachel leans into your hand slightly. 'Don't stop just yet.'",
                    "She tilts her head into your palm. 'You’re getting bold, Captain.'",
                    "A soft chuckle. 'Careful, Captain… I might get used to this.'",
                    "Rachel looks up at you. '…Don’t stop.'"
                ],
                user: [
                    "Rachel dodges slightly. 'Nice try.'",
                    "She grins. 'You’re not getting away with that.'",
                    "Rachel taps your hand away. 'Careful.'"
                ]
            },

            sarcastic: {
                owner: [
                    "Rachel glances at you. '…Just this once.'",
                    "She exhales. 'You’re spoiling me again.'",
                    "Rachel smirks faintly. 'You want something, don’t you?'"
                ],
                user: [
                    "Rachel gives you a flat look. 'No.'",
                    "She brushes your hand away. 'Don't get too familiar.'",
                    "Rachel narrows her eyes. 'You’re not Captain.'",
                    "Rachel turns away. 'That privilege isn’t yours.'"
                ]
            },

            sleepy: {
                owner: [
                    "Rachel closes her eyes for a moment. 'You may continue…'",
                    "She rests her head lightly. 'Stay like this…'",
                    "A soft sigh. '…I don’t hate this.'"
                ],
                user: [
                    "Rachel shifts away quietly.",
                    "She sighs. '…Not now.'",
                    "Rachel barely reacts. 'Please don’t…'"
                ]
            }
        };

        const reply = getResponse(message, context, responses);
        channel.send(reply);
    }
};
