import fs from 'fs';

export function loggingMiddleware(req, res,next) {
    const {ip, url, method} = req;
    // console.log(ip+ " "+url+" "+method);
    const startTime = Date.now();

    res.on('finish', () => {
        const { statusCode } = res;
        const duration = Date.now() - startTime;
        const date = new Date().toISOString();
        const localTime = new Date().toLocaleTimeString();
        console.log("Ratnakar Giri " + localTime);

        const infoToWrite = ip+ " - " +method+ " - " +url+ " - " +statusCode+ " - " +date+ " - " +duration+"ms" + "\n";

        console.log(infoToWrite);

        fs.appendFile('access.log', infoToWrite, (err) => {
            if (err) {
                console.log('Access log could not be found');
            }
        });
    });
    next();
}