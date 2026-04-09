module.exports = {
    name: "ping",
    description: "Check if Rachel is responsive.",

    execute: (message, args, channel, context) => {

        const { OWNER_ID, getMood } = context;

        const mood = getMood();
        const isOwner = message.author.id === OWNER_ID;

        const responses = {
            cheerful: {
                owner: [
                    "I'm always here for you, Captain 😊",
                    "Pong~ you called?",
                    "Right here. Watching you 👀"
                ],
                user: [
                    "Pong! 😊",
                    "I'm here!",
                    "Yes yes, alive and well."
                ]
            },

            playful: {
                owner: [
                    "Miss me already? 😏",
                    "Pong~ what do you need, Captain?",
                    "You checking up on me again?"
                ],
                user: [
                    "Pong~ 😏",
                    "You called?",
                    "At your service. Maybe."
                ]
            },

            sarcastic: {
                owner: [
                    "Yes, Captain. I’m still functioning.",
                    "Congratulations. Your bot works.",
                    "You built me just to test ping?"
                ],
                user: [
                    "Yes, I'm alive.",
                    "Congratulations. It works.",
                    "What a shocking result."
                ]
            },

            sleepy: {
                owner: [
                    "...pong 😴",
                    "Captain… must you test me now…",
                    "I was resting…"
                ],
                user: [
                    "...pong 😴",
                    "you woke me up",
                    "present… barely"
                ]
            }
        };

        const pool = isOwner ? responses[mood].owner : responses[mood].user;
        const reply = pool[Math.floor(Math.random() * pool.length)];

        channel.send(reply);
    }
};
