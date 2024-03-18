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

// Handle the 'exit' event to check if Java was not found
serverProcess.on('exit', async (code) => {
  if (code === 127) {
    console.log('Java not found, attempting to install...');

    try {
      // Use dynamic import to import execa
      const { default: execa } = await import('execa');

      // Use execa to execute a shell command to install Java
      const installJava = await execa.command('sudo apt-get install -y default-jdk');
      
      console.log('Java installed successfully. Restart the script to start the server.');
    } catch (error) {
      console.error('Failed to install Java:', error.message);
    }
  }
});
