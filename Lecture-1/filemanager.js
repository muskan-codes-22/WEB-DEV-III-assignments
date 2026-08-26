const fs = require("fs");

const fileName = "myFile.txt";


fs.writeFile(fileName, "Hey first file gurlll", (err) => {
    if (err) {
        console.log("Error creating file");
        return;
    }

    console.log("File created successfully");

    
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            console.log("Error reading file");
            return;
        }

        console.log("File content:", data);

        
        fs.appendFile(fileName, "\nThis line was added later.", (err) => {
            if (err) {
                console.log("Error updating file");
                return;
            }

            console.log("File updated successfully");

            
            fs.unlink(fileName, (err) => {
                if (err) {
                    console.log("Error deleting file");
                    return;
                }

                console.log("File deleted successfully");
            });
        });
    });
});