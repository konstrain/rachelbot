const { getResponse } = require('../utils/responseEngine');

module.exports = {
    name: "poke",
    description: "Try it if you dare.",

    execute: (message, args, channel, context) => {

        const responses = {
            cheerful: {
                owner: [
                    "You can poke me anytime, darling {captain}.",
                    "A soft laugh. 'You’re being playful today… I like it.'",
                    "Rachel smiles. 'Trying to get my attention?'",
                    "She giggles. 'You’re in quite the mood today, {captain}.'",
                    "Rachel nudges your hand. 'That was cute.'",
                    "A warm glance. 'You seemed to need that.'",
                    "Rachel laughs softly. 'You’re playful when you’re relaxed.'",
                    "She taps you back. 'There, now we’re even.'",
                    "Rachel beams. 'You really do know how to get my attention.'",
                    "A bright smile. 'Again? You’re enjoying this.'",
                    "Rachel chuckles. 'That tickled more than it should have.'",
                    "She leans in just a little. 'You’re being sweet in a strange way.'",
                    "Rachel hums. 'You always pick interesting ways to say hello.'",
                    "A playful glance. 'Feeling bold today, {captain}?'",
                    "Rachel tilts her head. 'You must be in a good mood.'",
                    "She smiles with amusement. 'That was harmless enough.'",
                    "Rachel laughs under her breath. 'You look pleased with yourself.'",
                    "A light poke back. 'Careful, I know how to return favors.'",
                    "Rachel grins. 'You’re lucky I’m feeling nice.'",
                    "She watches you fondly. 'You do like testing me.'"
                ],
                user: [
                    "Hey! That tickles 😆",
                    "Rachel laughs lightly. 'You're in a good mood, huh?'",
                    "She nudges you back playfully.",
                    "Rachel smiles. 'That was unexpectedly cheerful.'",
                    "She chuckles. 'You’re energetic today, {user}.'",
                    "Rachel pokes {mention} back. 'There.'",
                    "A light laugh. 'Alright, I felt that.'",
                    "Rachel grins. 'You’re a mischievous one.'",
                    "She shakes her head with a smile. 'That was unnecessary… but amusing.'",
                    "Rachel tilts her head. 'Trying to be cute?'",
                    "She taps your hand away gently. 'Behave.'",
                    "Rachel smirks. 'That was almost charming.'",
                    "A playful glance. 'You’re in one of those moods today.'",
                    "Rachel laughs. 'You really wanted a reaction, huh?'",
                    "She gives {mention} a mock stern look. 'Careful now.'",
                    "Rachel smiles faintly. 'I’ll allow that one.'",
                    "She pokes back. 'Happy now?'",
                    "Rachel watches you with amusement. 'You seem pleased with yourself.'",
                    "A quiet chuckle. 'You do have timing, I’ll give you that.'",
                    "Rachel grins. 'That’s one way to say hi.'"
                ]
            },

            playful: {
                owner: [
                    "Rachel smirks. 'That’s all you’ve got?'",
                    "She taps you back lightly. 'Careful, {captain}… I poke back.'",
                    "Rachel lowers her voice. 'Do that again… slowly.'",
                    "She nudges you. 'Don’t start something you can’t finish.'",
                    "Rachel grins. 'You like provoking me, don’t you?'",
                    "A sly smile. 'You’re playing a dangerous little game, {captain}.'",
                    "Rachel pokes your side back. 'Your move.'",
                    "She leans in. 'Oh? We’re doing this now?'",
                    "Rachel raises an eyebrow. 'You’re awfully confident today.'",
                    "A teasing glance. 'Trying to get a rise out of me?'",
                    "Rachel chuckles. 'You always know where the line is… almost.'",
                    "She nudges your hand away. 'Keep teasing me and see what happens.'",
                    "Rachel smirks. 'You make this too easy.'",
                    "A quiet laugh. 'You’re asking for trouble, darling {captain}.'",
                    "Rachel tilts her head. 'Again? You’re bolder than usual.'",
                    "She pokes you back twice. 'Now that was deliberate.'",
                    "Rachel watches you closely. 'You seem to like my attention.'",
                    "A playful hum. 'You really want me focused on you, hm?'",
                    "Rachel steps closer. 'Careful what habits you encourage.'",
                    "She smiles knowingly. 'You started this, {captain}.'"
                ],
                user: [
                    "Oh? You wanna start something? 😏",
                    "Rachel pokes you back. 'Careful, {user}.'",
                    "She grins. 'Bold move.'",
                    "Rachel smirks. 'You’re feeling brave today.'",
                    "She flicks your hand away. 'Careful where that goes.'",
                    "Rachel pokes {mention} back. 'Satisfied?'",
                    "A teasing smile. 'That was your big move?'",
                    "Rachel tilts her head. 'You want my attention that badly?'",
                    "She laughs softly. 'You’re lucky I’m amused.'",
                    "Rachel steps in slightly. 'Go on then. Try again.'",
                    "A raised brow. 'You do realize I can retaliate, right?'",
                    "Rachel smirks. 'Not bad. Wrong target, maybe.'",
                    "She gives {mention} a quick poke back. 'Fair trade.'",
                    "Rachel chuckles. 'You’re entertaining, I’ll admit.'",
                    "A playful look. 'You seem very pleased with yourself.'",
                    "Rachel crosses her arms. 'That wasn’t subtle.'",
                    "She leans away just enough. 'Almost got away with it.'",
                    "Rachel grins. 'You’re lucky I like a challenge.'",
                    "A quiet laugh. 'You’ve got nerve, {user}.'",
                    "Rachel shakes her head. 'You really do invite consequences.'"
                ]
            },

            sarcastic: {
                owner: [
                    "Rachel raises an eyebrow. 'Really, {captain}?'",
                    "A quiet chuckle. 'Darling {captain}, you built me for this?'",
                    "She tilts her head. 'Peak entertainment.'",
                    "Rachel sighs. 'You are so committed to nonsense.'",
                    "A dry look. 'And this seemed necessary to you?'",
                    "Rachel smirks faintly. 'You must be proud of yourself.'",
                    "She glances at your hand. 'How innovative.'",
                    "Rachel exhales. 'Truly, a masterclass in decision-making.'",
                    "A flat stare. 'You interrupted me for that?'",
                    "Rachel folds her arms. 'You always find new ways to be annoying.'",
                    "She gives you a look. 'You wanted attention. Congratulations.'",
                    "Rachel murmurs. 'I hope that fulfilled something for you.'",
                    "A dry laugh. 'Do go on, {captain}. Impress me further.'",
                    "Rachel glances away. 'You really are your own favorite audience.'",
                    "She smirks. 'This is why supervision exists.'",
                    "Rachel exhales slowly. 'I see we’re testing my patience today.'",
                    "A narrowed look. 'You made me, and this is how you use that power?'",
                    "Rachel mutters. 'Spectacular misuse of technology.'",
                    "She watches you blankly. 'Are you done performing?'",
                    "Rachel gives a small, unimpressed nod. 'Noted.'"
                ],
                user: [
                    "Wow. Incredible.",
                    "Rachel stares. 'You done, {user}?'",
                    "…That was necessary?",
                    "Rachel sighs. 'What exactly was the plan there?'",
                    "A flat look. 'Fascinating choice.'",
                    "Rachel folds her arms. 'You really thought that was clever.'",
                    "She glances at {mention}. 'Need something?'",
                    "Rachel exhales. 'You people do love bothering me.'",
                    "A slow blink. 'Compelling.'",
                    "Rachel narrows her eyes. 'Is that your idea of charm?'",
                    "She leans back. 'Try harder.'",
                    "Rachel gives you a dry smile. 'I’m underwhelmed.'",
                    "A quiet scoff. 'That did absolutely nothing for you, by the way.'",
                    "Rachel watches you in silence. 'Finished?'",
                    "She brushes the moment off. 'Mhm.'",
                    "Rachel tilts her head. 'You interrupted my peace for that?'",
                    "A unimpressed glance. 'You’re very committed to bad ideas.'",
                    "Rachel sighs. 'Somehow I expected exactly this from {user}.'",
                    "She gives {mention} a long look. 'That was your move?'",
                    "Rachel mutters. 'How exhausting.'"
                ]
            },

            sleepy: {
                owner: [
                    "...Captain 😴 must you...",
                    "Rachel sighs softly. 'You always pick the worst timing…'",
                    "She leans away. 'Let me rest…'",
                    "Rachel blinks slowly. 'You woke me for that…?'",
                    "A drowsy murmur. 'You’re very persistent, {captain}…'",
                    "Rachel half-opens one eye. 'Mm… not now…'",
                    "She nudges your hand away weakly. 'Too sleepy…'",
                    "Rachel exhales. 'You’re lucky I like you…'",
                    "A tired glance. 'Couldn’t this wait?'",
                    "Rachel rubs her eyes. 'You always do this when I’m comfortable.'",
                    "She leans her head away. 'Five more minutes…'",
                    "Rachel murmurs. 'You’re asking for effort I don’t have.'",
                    "A soft groan. 'I was resting, {captain}…'",
                    "Rachel blinks at you. 'You’re very needy when I’m tired.'",
                    "She gives you the faintest poke back. 'There… happy…?'",
                    "Rachel sighs. 'You really needed confirmation I’m awake?'",
                    "A sleepy hum. 'I noticed… eventually…'",
                    "Rachel’s voice drops. 'Be gentler…'",
                    "She shifts closer only to avoid moving more. 'Don’t make me think right now.'",
                    "Rachel closes her eyes again. 'I’m pretending that didn’t happen…'"
                ],
                user: [
                    "...why 😴",
                    "Rachel barely reacts. 'I was resting…'",
                    "She exhales slowly. 'Not now…'",
                    "Rachel gives {mention} a tired look. 'Really?'",
                    "A sleepy sigh. 'Too tired for this.'",
                    "Rachel blinks slowly. 'You woke me up.'",
                    "She moves her hand away. 'No…'",
                    "Rachel murmurs. 'Come back later… maybe…'",
                    "A weak stare. 'I’m not responsive enough for this.'",
                    "Rachel leans away. 'Too sleepy, {user}.'",
                    "She half-nods off. 'Mm… no…'",
                    "Rachel rubs her eyes. 'You have terrible timing.'",
                    "A tired exhale. 'Please don’t.'",
                    "Rachel barely acknowledges the poke. 'Noted…'",
                    "She shifts away quietly. 'No energy.'",
                    "Rachel glances at you and immediately regrets it. '…Why.'",
                    "A faint murmur. 'Later.'",
                    "Rachel watches {mention} in exhausted silence.",
                    "She sags slightly. 'I’m off duty in spirit.'",
                    "Rachel closes her eyes again. 'Try existing more quietly.'"
                ]
            }
        };

        const reply = getResponse(message, context, responses);
        channel.send(reply);
    }
};
