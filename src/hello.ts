import * as readline from "readline";
const rl = readline.createInterface({
    input:process.stdin,
    output: process.stdout
});

rl.question("Masukan nama Anda: ", (nama: string) => {
    rl.question("Masukan usia Anda: ", (inputUsia: string) => {
        let usia: number = Number(inputUsia);
        rl.question("Masukkan kota asal Anda: ", (kota: string) => {
            console.log("Hallo, " + nama);
            console.log("Usia saya, " + usia)
            console.log("Kota asal saya, " + kota);
            rl.close();
        });
    });
});