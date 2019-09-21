const sendHelp = message => {
  const helpString = `
   Useable commands:
   **GitHub**
   - <https://github.com/roostermagic/raidbot3000>
   `;

  message.react('✅');
  message.author.send(helpString);
};

module.exports = { sendHelp };
