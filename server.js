const { spawn } = require('child_process');

// Path to the Minecraft server JAR file
const jarPath = 'server.jar';

// Command to start the Minecraft server
const command = 'java -Xmx1G -Xms1G -jar ' + jarPath + ' nogui';

// Start the Minecraft server process
const serverProcess = spawn(command, { shell: true });

// Log server output to the console
serverProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

// Log server errors to the console
serverProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});
