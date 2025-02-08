const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const readline = require('readline');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // Sesuaikan dengan lokasi Chrome di Windows
    });    
    const page = await browser.newPage();
    await page.goto('https://www.canva.com/signup');

    // Klik "Continue with email"
    await page.waitForSelector('button');
    await page.evaluate(() => {
        const buttons = [...document.querySelectorAll('button')];
        const targetButton = buttons.find(btn => btn.innerText.includes('Continue with email'));
        if (targetButton) targetButton.click();
    });

    // Klik "Accept all Cookies" jika ada
    await page.waitForSelector('button');
    await page.evaluate(() => {
        const buttons = [...document.querySelectorAll('button')];
        const targetButton = buttons.find(btn => btn.innerText.includes('Accept all cookies'));
        if (targetButton) targetButton.click();
    });    

    // Input email dari user
    rl.question('Masukkan email: ', async (email) => {
        console.log(`Menggunakan Email: ${email}`);
        await page.type('input[name="email"]', email, { delay: 100 });
        
        await page.evaluate(() => {
            const buttons = [...document.querySelectorAll('button')];
            const targetButton = buttons.find(btn => btn.innerText.includes('Continue'));
            if (targetButton) targetButton.click();
        });

        await new Promise(resolve => setTimeout(resolve, 3000));

        // **Tunggu input nama muncul**
        await page.waitForSelector('input[autocomplete="name"]', { timeout: 10000 });
        console.log("Input nama muncul, lanjut klik continue...");

        // Tunggu hingga tombol "Continue" setelah nama muncul dan klik otomatis
        await page.waitForSelector('button');
        await page.evaluate(() => {
            const buttons = [...document.querySelectorAll('button')];
            const targetButton = buttons.find(btn => btn.innerText.includes('Continue'));
            if (targetButton) targetButton.click();
        });
        
        // Input OTP secara manual
        rl.question('Masukkan OTP yang dikirim ke email: ', async (otp) => {
            await page.waitForSelector('input[inputmode="numeric"]');
            await page.type('input[inputmode="numeric"]', otp, { delay: 100 });
            await page.click('button[type="submit"]');
            console.log('OTP submitted!');

        // Redirect ke halaman reset password setelah OTP
            await page.waitForNavigation();
            await page.goto('https://www.canva.com/login/reset/');
            
        // Masukkan email untuk reset password
            await page.waitForSelector('input[name="email"]');
            await page.type('input[name="email"]', email, { delay: 100 });
            
            await page.evaluate(() => {
                const buttons = [...document.querySelectorAll('button')];
                const targetButton = buttons.find(btn => btn.innerText.includes('Continue'));
                if (targetButton) targetButton.click();
            });

        // Tunggu hingga input OTP muncul kembali
            await page.waitForSelector('input[inputmode="numeric"]');
            rl.question('Masukkan OTP reset password: ', async (resetOtp) => {
                await page.type('input[inputmode="numeric"]', resetOtp, { delay: 100 });
                await page.evaluate(() => {
                    const buttons = [...document.querySelectorAll('button')];
                    const targetButton = buttons.find(btn => btn.innerText.includes('Continue'));
                    if (targetButton) targetButton.click();
                });

            await new Promise(resolve => setTimeout(resolve, 1000)); // Tambahkan jeda agar tidak terlalu cepat
                
            // Gunakan metode focus dan type yang lebih natural
            const newPassword = 'Tokito123';

            await page.waitForSelector('input[placeholder="New password"]', { visible: true, timeout: 60000 });
            await page.focus('input[placeholder="New password"]');
            await page.keyboard.type(newPassword, { delay: 50 });

            await page.waitForSelector('input[placeholder="Confirm new password"]', { visible: true, timeout: 60000 });
            await page.focus('input[placeholder="Confirm new password"]');
            await page.keyboard.type(newPassword, { delay: 50 }); 

            console.log('Password baru dimasukkan.');

            // Klik tombol "Set password"
            await page.evaluate(() => {
                const buttons = [...document.querySelectorAll('button')];
                const targetButton = buttons.find(btn => btn.innerText.includes('Set password'));
                if (targetButton) targetButton.click();
            });

            await page.waitForNavigation();
            console.log('Password reset berhasil!');

                // Simpan akun ke file akuncanva.txt
                fs.appendFileSync('akuncanva.txt', `${email}|${newPassword}\n`, 'utf8');
                console.log('Akun disimpan ke akuncanva.txt');

                // Tunggu beberapa detik sebelum menutup browser
                await new Promise(resolve => setTimeout(resolve, 5000));
                await browser.close();
                rl.close();
            });
        });
    });
})();
