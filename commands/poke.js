module.exports = {
    name: "poke",
    description: "Try it if you dare.",

    execute: (message, args, channel, context) => {

        const { OWNER_ID, getMood } = context;

        const mood = getMood();
        const isOwner = message.author.id === OWNER_ID;

        const responses = {
            cheerful: {
                owner: [
                    "You can poke me anytime, darling Captain.",
                    "A soft laugh. 'You’re being playful today… I like it.'",
                    "Rachel smiles. 'Trying to get my attention?'"
                ],
                user: [
                    "Hey! That tickles 😆",
                    "Rachel laughs lightly. 'You're in a good mood, huh?'",
                    "She nudges you back playfully."
                ]
            },

            playful: {
                owner: [
                    "Rachel smirks. 'That’s all you’ve got?'",
                    "She taps you back lightly. 'Careful, Captain… I poke back.'",
                    "Rachel lowers her voice. 'Do that again… slowly.'",
                    "She nudges you. 'Don’t start something you can’t finish.'"
                ],
                user: [
                    "Oh? You wanna start something? 😏",
                    "Rachel pokes you back. 'Careful.'",
                    "She grins. 'Bold move.'"
                ]
            },

            sarcastic: {
                owner: [
                    "Rachel raises an eyebrow. 'Really, Captain?'",
                    "A quiet chuckle. 'You built me for this?'",
                    "She tilts her head. 'Peak entertainment.'"
                ],
                user: [
                    "Wow. Incredible.",
                    "Rachel stares. 'You done?'",
                    "…That was necessary?"
                ]
            },

            sleepy: {
                owner: [
                    "...Captain 😴 must you...",
                    "Rachel sighs softly. 'You always pick the worst timing…'",
                    "She leans away. 'Let me rest…'"
                ],
                user: [
                    "...why 😴",
                    "Rachel barely reacts. 'I was resting…'",
                    "She exhales slowly. 'Not now…'"
                ]
            }
        };

        const pool = isOwner ? responses[mood].owner : responses[mood].user;
        const reply = pool[Math.floor(Math.random() * pool.length)];

        channel.send(reply);
    }
};
