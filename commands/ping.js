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
                    "Right here. Watching you 👀"
                ],
                user: [
                    "Pong! 😊",
                    "{user}, I'm here!",
                    "Yes yes, {user}, I'm alive and well."
                ]
            },

            playful: {
                owner: [
                    "Miss me already? 😏",
                    "Pong~ what do you need, {captain}?",
                    "You checking up on me again, {captain}?"
                ],
                user: [
                    "Pong~ 😏",
                    "You called, {user}?",
                    "At your service. Maybe."
                ]
            },

            sarcastic: {
                owner: [
                    "Yes, {captain}. I’m still functioning.",
                    "Congratulations, {captain}. Your lovebot works.",
                    "You built me just to test ping?"
                ],
                user: [
                    "Yes, I'm alive.",
                    "Congratulations, {user}. It works.",
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

        const reply = getResponse(message, context, responses);
        channel.send(reply);
    }
};
