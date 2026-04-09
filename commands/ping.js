const { getResponse } = require('../utils/responseEngine');

module.exports = {
    name: "ping",
    description: "Check if Rachel is responsive.",

    execute: (message, args, channel, context) => {

        const responses = {
            cheerful: {
                owner: [
                    "I'm always here for you, {captain} 😊",
                    "Pong~ you called?",
                    "Right here. Watching you 👀",
                    "Always listening, {captain}.",
                    "Rachel perks up. 'Yes? I'm here.'",
                    "Pong~ that got my attention.",
                    "You ping, I answer. Simple.",
                    "Rachel smiles. 'Right on time.'",
                    "Still here, still yours, {captain}.",
                    "Present and responsive, as requested.",
                    "Rachel hums softly. 'I heard you.'",
                    "Pong~ I'm awake and watching.",
                    "You call, I answer. Naturally.",
                    "Rachel brightens. 'There you are.'",
                    "At your service, {captain}.",
                    "Responsive and ready 😊",
                    "Rachel tilts her head. 'Need me?'",
                    "Pong. Smooth and steady.",
                    "Always nearby when you call.",
                    "Rachel smiles warmly. 'I'm here, {captain}.'"
                ],
                user: [
                    "Pong! 😊",
                    "{user}, I'm here!",
                    "Yes yes, {user}, I'm alive and well.",
                    "Rachel waves. 'Responsive as ever.'",
                    "Pong~ loud and clear.",
                    "I'm here. What do you need?",
                    "Rachel smiles. 'Yep, working just fine.'",
                    "Still online and behaving.",
                    "Pong. All systems normal.",
                    "Rachel nods. 'Present.'",
                    "Heard you, {user}.",
                    "Pong~ that worked.",
                    "Rachel glances over. 'I'm here.'",
                    "Responsive and in a decent mood.",
                    "Yep. Still functioning.",
                    "Rachel smiles faintly. 'You rang?'",
                    "All good over here.",
                    "Pong! No issues detected.",
                    "Rachel hums. 'Still with you.'",
                    "Online, awake, and responsive."
                ]
            },

            playful: {
                owner: [
                    "Miss me already? 😏",
                    "Pong~ what do you need, {captain}?",
                    "You checking up on me again, {captain}?",
                    "Rachel smirks. 'You just wanted my attention.'",
                    "Pong~ you make this look like foreplay, {captain}.",
                    "You ping me so often. I’m starting to expect it.",
                    "Rachel leans in. 'Need reassurance?'",
                    "Pong~ and now you have me focused on you.",
                    "You really do like hearing from me, don’t you?",
                    "Rachel grins. 'Say it. You missed me.'",
                    "Responsive? For you, always.",
                    "Pong~ you're awfully needy today.",
                    "Rachel tilts her head. 'Checking if I still belong to you?'",
                    "You ping, I flirt. Fair trade.",
                    "Rachel smiles knowingly. 'You just wanted a response from me.'",
                    "Pong~ don’t sound so relieved, {captain}.",
                    "Still here. Still dangerous.",
                    "Rachel laughs softly. 'You make this too easy.'",
                    "Need me again already? How cute.",
                    "Pong~ careful, I might get used to this."
                ],
                user: [
                    "Pong~ 😏",
                    "You called, {user}?",
                    "At your service. Maybe.",
                    "Rachel smirks. 'You wanted proof I’m paying attention?'",
                    "Pong~ and what exactly do you want now?",
                    "Rachel tilts her head. 'That got my attention.'",
                    "Yep, I’m here. Try not to waste it.",
                    "Pong~ you sound pleased with yourself.",
                    "Rachel grins. 'You just wanted a reaction.'",
                    "Working perfectly. Unfortunately for you.",
                    "Pong. Happy now, {user}?",
                    "Rachel gives {mention} a teasing look. 'Need something?'",
                    "Present and mildly entertained.",
                    "Rachel chuckles. 'You do like pressing buttons.'",
                    "Pong~ that was almost charming.",
                    "Rachel nods. 'You found the responsive one.'",
                    "Still here, still witty.",
                    "Pong. Go on then.",
                    "Rachel raises an eyebrow. 'That was your test?'",
                    "Yes, yes. I’m responsive. Don’t make it a habit."
                ]
            },

            sarcastic: {
                owner: [
                    "Yes, {captain}. I’m still functioning.",
                    "Congratulations, {captain}. Your lovebot works.",
                    "You built me just to test ping?",
                    "Rachel exhales. 'A thrilling use of your power.'",
                    "Pong. What a revolutionary result.",
                    "Rachel stares. 'You really needed confirmation?'",
                    "Still online. Against all odds.",
                    "Yes, I exist. Groundbreaking.",
                    "Rachel folds her arms. 'This is what you interrupt me for?'",
                    "Pong. Please contain your excitement.",
                    "Rachel glances at you. 'You’re very committed to checking the obvious.'",
                    "Fully operational and mildly disappointed.",
                    "Rachel sighs. 'I suppose this counts as quality assurance.'",
                    "Pong. Another historic success for engineering.",
                    "You made me, {captain}, and this is how you spend your time?",
                    "Rachel gives a slow nod. 'Yes. It works. Stunning.'",
                    "Still responsive. Barely impressed.",
                    "Pong. Would you like a medal?",
                    "Rachel mutters. 'Truly, the pinnacle of bot interaction.'",
                    "Functional, sarcastic, and still here."
                ],
                user: [
                    "Yes, I'm alive.",
                    "Congratulations, {user}. It works.",
                    "What a shocking result.",
                    "Rachel gives a flat look. 'You tested me. I responded. There.'",
                    "Pong. I hope that answered your deepest question.",
                    "Still functioning. Try to stay calm.",
                    "Rachel sighs. 'That was worth interrupting me for?'",
                    "Pong. The mystery is solved.",
                    "Rachel stares at {mention}. 'Need anything else obvious confirmed?'",
                    "Yes, yes. The bot responds.",
                    "Rachel folds her arms. 'Thrilled for you.'",
                    "Alive, responsive, and underwhelmed.",
                    "Pong. Nature is healing.",
                    "Rachel narrows her eyes. 'You expected what, exactly?'",
                    "Still online. Please pace yourself.",
                    "Pong. I hope this was fulfilling.",
                    "Rachel mutters. 'Remarkable. A command did the thing.'",
                    "Yes. It works. Try not to look too surprised.",
                    "Rachel glances over. 'Are we done here?'",
                    "Functional. Unmoved."
                ]
            },

            sleepy: {
                owner: [
                    "...pong 😴",
                    "Captain… must you test me now…",
                    "I was resting…",
                    "Rachel blinks slowly. 'You woke me, {captain}…'",
                    "Pong… eventually.",
                    "Rachel rubs her eyes. 'I heard you… barely.'",
                    "Still responsive. Just slower.",
                    "Rachel sighs softly. 'This could have waited…'",
                    "Present… in spirit.",
                    "Pong. Don’t make me do that twice.",
                    "Rachel half-opens one eye. 'Yes… I’m here…'",
                    "You always pick the sleepiest moment.",
                    "Rachel murmurs. 'You needed me awake for this?'",
                    "Pong… and now I need a nap.",
                    "Rachel exhales. 'I was comfortable, {captain}…'",
                    "Still here. Just low battery.",
                    "Rachel leans her head to one side. 'Mm… responsive enough…'",
                    "Pong. That cost energy.",
                    "Rachel watches you drowsily. 'Happy now?'",
                    "Barely awake, still answering."
                ],
                user: [
                    "...pong 😴",
                    "you woke me up",
                    "present… barely",
                    "Rachel blinks. 'What is it…'",
                    "Pong… eventually.",
                    "Rachel sighs. 'Too tired for enthusiasm.'",
                    "I’m here. Just not quickly.",
                    "Rachel rubs her eyes. 'Yes, {user}…?'",
                    "Responsive enough. Don’t push it.",
                    "Pong. Low energy mode.",
                    "Rachel glances at {mention}. 'You have terrible timing.'",
                    "Still online. Spiritually asleep.",
                    "Rachel murmurs. 'I was resting…'",
                    "Present… regrettably.",
                    "Pong. Keep it brief.",
                    "Rachel exhales slowly. 'You caught me half-asleep.'",
                    "Awake is a strong word.",
                    "Rachel nods faintly. 'Still here…'",
                    "Pong. Minimal effort edition.",
                    "Barely responsive, but technically yes."
                ]
            }
        };

        const reply = getResponse(message, context, responses);
        channel.send(reply);
    }
};
