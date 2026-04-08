module.exports = {
    name: "poke",
    description: "Try it if you dare.",

    execute: (message, args, channel, context) => {

        const { OWNER_ID } = context;

        const pokeOwnerLines = [
            "You can poke me anytime, darling Captain.",
            "Rachel smirks. 'That’s all you’ve got?'",
            "She taps you back lightly. 'Careful, Captain… I poke back.'",
            "Rachel leans closer. 'Trying to get my attention?'",
            "A soft laugh. 'You’re being playful today… I like it.'",
            "Rachel glances at you. 'If you wanted me, just say so.'",
            "She nudges you. 'Don’t start something you can’t finish.'",
            "Rachel raises an eyebrow. 'Bold move, Captain.'",
            "A quiet chuckle. 'You’re lucky it’s you.'",
            "Rachel lowers her voice. 'Do that again… slowly.'"
        ];

        const pokeOtherLines = [
            "Ouch, stop that right now!",
            "Rachel glares at you. 'Don't.'",
            "She swats your hand away. 'Annoying.'",
            "Rachel exhales. 'Keep your distance.'",
            "She stares coldly. 'You’re testing my patience.'",
            "Rachel doesn’t react. '…Was that supposed to do something?'",
            "She shifts away. 'Try that again and I won’t be so nice.'",
            "Rachel frowns. 'You’re irritating.'",
            "She ignores you completely.",
            "Rachel sighs. 'Do you need something?'"
        ];

        if (message.author.id === OWNER_ID) {
            channel.send(pokeOwnerLines[Math.floor(Math.random() * pokeOwnerLines.length)]);
        } else {
            channel.send(pokeOtherLines[Math.floor(Math.random() * pokeOtherLines.length)]);
        }
    }
};
