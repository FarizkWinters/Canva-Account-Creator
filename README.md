# Canva Account Automation Script

## 📌 Description
This script automates the process of creating a Canva account, verifying OTP, and resetting the password using Puppeteer and Puppeteer Stealth Plugin.

## 🚀 Features
- Automated account creation on Canva.
- OTP input for email verification.
- Password reset automation.
- Saves account details to `akuncanva.txt`.
- Uses Puppeteer with Stealth Plugin to bypass bot detection.

## 🛠️ Requirements
- Node.js installed
- Google Chrome installed
- Puppeteer and dependencies

## 📥 Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/canva-bot.git
   cd canva-bot
   ```
2. Install dependencies:
   ```sh
   npm install puppeteer-extra puppeteer-extra-plugin-stealth readline fs
   ```

## 🔧 Usage
1. Run the script:
   ```sh
   node canva.js
   ```
2. Enter the email when prompted.
3. Enter the OTP received in your email.
4. Enter the reset OTP to change the password.
5. The new password is automatically set to `Tokito123` and saved in `akuncanva.txt`.

## 📝 Notes
- Ensure your internet connection is stable.
- The script runs in non-headless mode for manual OTP input.
- Update the `executablePath` in the script if Chrome is installed in a different location.

## 📜 License
This project is open-source and free to use. Contributions are welcome!

---
👨‍💻 Developed by Your Name

