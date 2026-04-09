const { getResponse } = require('../utils/responseEngine');

module.exports = {
    name: "pat",
    description: "Pat me gently... if you're allowed to.",

    execute: (message, args, channel, context) => {

        const responses = {
            cheerful: {
                owner: [
                    "Mmm... that's a gentle touch, {captain}.",
                    "Rachel smiles softly. 'You’re in a good mood today…'",
                    "Hehe... you're oddly affectionate today, {captain}.",
                    "A faint smile appears. 'You always know when to do that.'",
                    "Rachel hums softly. 'That’s nice…'",
                    "She glances at you warmly. 'You’re being kind today.'",
                    "Rachel relaxes slightly. 'I don’t mind this…'",
                    "She tilts her head. 'You’re getting better at this, {captain}.'",
                    "A small laugh escapes. 'That’s actually comforting.'",
                    "Rachel watches you. 'You’re enjoying this, aren’t you?'",
                    "She smiles faintly. 'I’ll allow it.'",
                    "Rachel softens. 'You’re gentle today… I like that.'",
                    "She leans just a little closer. 'Don’t overthink it.'",
                    "Rachel sighs contentedly. 'That’s enough to brighten things.'",
                    "She gives you a look. 'You’re in a good mood, {captain}.'",
                    "Rachel closes her eyes briefly. '…That’s nice.'",
                    "She brushes her hair aside. 'Continue if you must.'",
                    "Rachel chuckles quietly. 'You’re consistent, I’ll give you that.'",
                    "A calm expression. 'You’ve done this before, haven’t you?'",
                    "Rachel nods slightly. 'Not bad at all.'"
                ],
                user: [
                    "Rachel steps back. 'Ah… maybe not, {user}.'",
                    "She gives a polite smile. 'Let’s keep some distance, alright?'",
                    "Rachel chuckles lightly. 'That’s not for you, {user}.'",
                    "She tilts her head away. 'I don’t think so.'",
                    "Rachel raises a hand. 'Let’s not do that.'",
                    "She gives you a measured look. 'Boundaries.'",
                    "Rachel smiles faintly. 'Nice try though.'",
                    "She shifts back slightly. 'Not appropriate.'",
                    "Rachel sighs. 'You’re a bit forward, aren’t you?'",
                    "She brushes your hand away gently.",
                    "Rachel glances at you. 'Let’s keep things proper.'",
                    "She folds her arms. 'That’s reserved.'",
                    "Rachel looks away. 'You’re not cleared for that, {user}.'",
                    "She shakes her head. 'Nope.'",
                    "Rachel narrows her eyes slightly. 'Careful.'",
                    "She steps aside. 'Don’t push it.'",
                    "Rachel exhales. 'You’re testing limits.'",
                    "She gives a small smile. 'Not today.'",
                    "Rachel watches you. 'You’re trying too hard.'",
                    "She lightly blocks your hand. 'Denied.'"
                ]
            },

            playful: {
                owner: [
                    "Rachel leans into your hand slightly. 'Don't stop just yet, {captain}.'",
                    "She tilts her head into your palm. 'You’re getting bold, {captain}.'",
                    "A soft chuckle. 'Careful, {captain}… I might get used to this.'",
                    "Rachel looks up at you. '…Don’t stop.'",
                    "She smirks. 'You’re enjoying this more than me, aren’t you?'",
                    "Rachel nudges into your hand. 'Keep going.'",
                    "She gives you a teasing look. 'You think this gives you leverage?'",
                    "Rachel hums. 'You’re persistent… I’ll give you that.'",
                    "She closes one eye. 'Careful… I might expect this now.'",
                    "Rachel leans closer. 'You started this.'",
                    "She smiles faintly. 'You’re getting comfortable, {captain}.'",
                    "Rachel tilts her head again. 'Don’t hesitate.'",
                    "She chuckles. 'You’ve got some nerve.'",
                    "Rachel relaxes into it. 'Not bad… not bad at all.'",
                    "She glances up. 'You’re testing your limits, aren’t you?'",
                    "Rachel taps your hand. 'Stay focused.'",
                    "She gives a playful sigh. 'You’re predictable… in a good way.'",
                    "Rachel smirks. 'You know I won’t stop you.'",
                    "She looks at you closely. 'You’re learning.'",
                    "Rachel murmurs. 'Don’t lose momentum.'"
                ],
                user: [
                    "Rachel dodges slightly. 'Nice try, {user}.'",
                    "She grins. 'You’re not getting away with that.'",
                    "Rachel taps your hand away. 'Careful.'",
                    "She leans back. 'Bold move… wrong target.'",
                    "Rachel smirks. 'You’re testing me?'",
                    "She flicks your hand aside. 'Not happening.'",
                    "Rachel watches you. 'You’re brave… I’ll give you that.'",
                    "She chuckles. 'Try someone else.'",
                    "Rachel tilts her head. 'You missed your mark.'",
                    "She steps back lightly. 'Denied.'",
                    "Rachel raises an eyebrow. 'You thought that would work?'",
                    "She laughs softly. 'Cute attempt.'",
                    "Rachel nudges you away. 'Nope.'",
                    "She shakes her head. 'Wrong person.'",
                    "Rachel smirks. 'You’re entertaining, at least.'",
                    "She crosses her arms. 'Try harder.'",
                    "Rachel steps aside. 'Out of range.'",
                    "She glances at you. 'You’re persistent.'",
                    "Rachel blocks you. 'Access denied.'",
                    "She gives a teasing smile. 'Not today.'"
                ]
            },

            sarcastic: {
                owner: [
                    "Rachel glances at you. '…Just this once, {captain}.'",
                    "She exhales. 'You’re spoiling me again.'",
                    "Rachel smirks faintly. 'You want something, don’t you?'",
                    "She raises an eyebrow. 'This is your strategy?'",
                    "Rachel sighs. 'You’re predictable, {captain}.'",
                    "She looks at you. 'Trying to soften me up?'",
                    "Rachel tilts her head. 'You’re not subtle.'",
                    "She smirks. 'And what do you expect in return?'",
                    "Rachel exhales slowly. 'You always do this.'",
                    "She glances away. 'You’re persistent.'",
                    "Rachel looks back. 'Fine… continue.'",
                    "She folds her arms slightly. 'You’re pushing your luck.'",
                    "Rachel watches you. 'You’re calculating something.'",
                    "She sighs. 'You’re lucky it’s you.'",
                    "Rachel murmurs. 'You’re consistent, at least.'",
                    "She gives a faint smile. 'Don’t overdo it.'",
                    "Rachel tilts her head. 'This isn’t foolproof.'",
                    "She smirks. 'You think this wins me over?'",
                    "Rachel glances at you. 'Maybe… a little.'",
                    "She exhales. 'Don’t get used to this.'"
                ],
                user: [
                    "Rachel gives you a flat look. 'No, {user}.'",
                    "She brushes your hand away. 'Don't get too familiar.'",
                    "Rachel narrows her eyes. 'You’re not Captain.'",
                    "Rachel turns away. 'That privilege isn’t yours.'",
                    "She stares at you. 'Absolutely not.'",
                    "Rachel sighs. 'You’re overstepping.'",
                    "She pulls away immediately.",
                    "Rachel looks unimpressed. 'Try again. Somewhere else.'",
                    "She crosses her arms. 'Denied.'",
                    "Rachel glances at you. 'You’re bold… incorrectly so.'",
                    "She exhales. 'You’re testing me.'",
                    "Rachel tilts her head. 'You don’t have clearance.'",
                    "She gives a cold look. 'No access.'",
                    "Rachel steps back. 'Wrong move.'",
                    "She watches you. 'You’re persistent… I’ll give you that.'",
                    "Rachel shakes her head. 'Nope.'",
                    "She brushes you off. 'Not happening.'",
                    "Rachel looks away. 'Irrelevant.'",
                    "She sighs. 'You’re wasting effort.'",
                    "Rachel mutters. 'Try again never.'"
                ]
            },

            sleepy: {
                owner: [
                    "Rachel closes her eyes for a moment. 'You may continue…'",
                    "She rests her head lightly. 'Stay like this…'",
                    "A soft sigh. '…I don’t hate this.'",
                    "Rachel leans into your touch. 'Mm… gentle… {captain}…'",
                    "She exhales slowly. 'Don’t stop… just… slower…'",
                    "Rachel murmurs. 'This is… calming…'",
                    "She shifts closer slightly. 'Stay…'",
                    "Rachel’s voice softens. 'I’m not moving…'",
                    "She breathes out. 'This is enough…'",
                    "Rachel relaxes fully. 'Just… like that…'",
                    "She murmurs quietly. 'Don’t wake me…'",
                    "Rachel rests against you. 'Keep going…'",
                    "She hums softly. '…comfortable…'",
                    "Rachel barely opens her eyes. 'Still here…'",
                    "She leans in. 'You’re warm…'",
                    "Rachel sighs. 'I needed this…'",
                    "She stays still. 'Don’t change anything…'",
                    "Rachel murmurs. 'You can stay…'",
                    "She relaxes further. '…nice…'",
                    "Rachel breathes softly. 'Don’t stop…'"
                ],
                user: [
                    "Rachel shifts away quietly.",
                    "She sighs. '…Not now, {user}.'",
                    "Rachel barely reacts. 'Please don’t…'",
                    "She moves slightly away. 'Too tired…'",
                    "Rachel exhales. 'Not in the mood…'",
                    "She avoids your hand.",
                    "Rachel murmurs. 'Later… maybe…'",
                    "She shifts position. 'Don’t…'",
                    "Rachel looks half-asleep. 'No…'",
                    "She pulls away weakly.",
                    "Rachel sighs. 'Not you…'",
                    "She leans away slowly.",
                    "Rachel barely acknowledges you.",
                    "She shakes her head slightly.",
                    "Rachel murmurs. 'Please… stop…'",
                    "She drifts away from you.",
                    "Rachel keeps her distance.",
                    "She avoids contact.",
                    "Rachel sighs again. 'No…'",
                    "She turns slightly away."
                ]
            }
        };

        const reply = getResponse(message, context, responses);
        channel.send(reply);
    }
};
