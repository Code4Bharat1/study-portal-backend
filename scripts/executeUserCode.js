const dockerTester = (req, res) => {
  try {
    const dockerRun = 'timeout 5s docker run -d nodejs-tester'
    const containerID = execSync(dockerRun, { encoding: 'utf-8' });

    const dockerUserCodeInput = `docker cp ./userCode.js ${containerID}:userCode.js`;
    const copyFilesToDocker = execSync(dockerUserCodeInput, { encoding: 'utf-8' });

    const dockerExecuteCommand = `docker exec ${containerID} node index.js`;
    const execute = execSync(dockerExecuteCommand, { encoding: 'utf-8' });

    res.send(`done`);
  } catch (error) {
    // If error running docker command
    res.status(500).send(`Error running docker command: ${error.message}`);
  }
}