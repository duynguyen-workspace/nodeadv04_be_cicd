import express from 'express'
import Docker from 'dockerode';

// Hàm để chạy lệnh trong container
const execInContainer = async (containerId, cmd) => {
    const container = docker.getContainer(containerId);
    const exec = await container.exec({
        Cmd: ['sh', '-c', cmd],
        AttachStdout: true,
        AttachStderr: true,
    });
    return new Promise((resolve, reject) => {
        exec.start((err, stream) => {
            if (err) return reject(err);
            let output = '';
            stream.on('data', (data) => output += data.toString());
            stream.on('end', () => resolve(output));
            stream.on('error', (err) => reject(err));
        });
    });
};

let app = express()
app.listen(8888)

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.get("/cicd", (req, res, next) => {
    // Verify token
    token = req.header("Authorization")

    // jwt.decrypt()
    
    next()
} , async (req, res) => {
    try {
        const containerId = "c4abcc469073";
        // Bước 1: Thực hiện `git pull` và `yarn run build`
        const command = 'git pull && yarn run build';
        await execInContainer(containerId, command);
        // Bước 2: Khởi động lại container
        const container = docker.getContainer(containerId);
        await container.restart();
        res.send(`Container restarted successfully.`);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
})

