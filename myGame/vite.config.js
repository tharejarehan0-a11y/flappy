
import { defineConfig } from "vite";

const kaplayCongrats = () => {
    return {
        name: "vite-plugin-kaplay-hello",
        buildEnd() {
            const line =
                "---------------------------------------------------------";
            const msg = "yayayyay i built this";

            process.stdout.write(`\n${line}\n${msg}\n${line}\n`);
        },
    };
};

export default defineConfig({
    base: "./",

    server: {
        port: 3001,
    },

    build: {
        sourcemap: true,
    },

    plugins: [
        kaplayCongrats(),
    ],
});
