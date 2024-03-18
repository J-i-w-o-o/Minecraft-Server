const { spawn } = require('child_process');
const execa = require('execa');

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

// Handle the 'exit' event to check if Java was not found
serverProcess.on('exit', async (code) => {
  if (code === 127) {
    console.log('Java not found, attempting to install...');

    try {
      // Use execa to execute a shell command to install Java
      await execa.command('sudo apt-get install -y default-jdk');
      console.log('Java installed successfully. Restart the script to start the server.');
    } catch (error) {
      console.error('Failed to install Java:', error.message);
    }
  }
});
