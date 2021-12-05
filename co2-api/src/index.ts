import { app } from './app';

require('dotenv').config();

async function main() {
    // Check config variables
    if (!process.env.PORT) {
        throw new Error('PORT configuration variable is not set.');
    }

     // Start server
     const server = app.listen(process.env.PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
    });
}

main();