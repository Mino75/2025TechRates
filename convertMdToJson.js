const markdownTable = `
| Role                  | USA (€)      | Western Europe (€) | Eastern Europe (€)  | Asia (€)          | China/Philippines (€) | Latin America (€) | Africa (€)         | Madagascar (€)    |
|-----------------------|--------------|---------------------|----------------------|-------------------|------------------------|--------------------|--------------------|-------------------|
| Product Owners        | 700–1000     | 500–800            | 300–500             | 200–350           | 300–400               | 250–450           | 150–300           | 150–250          |
| UI/UX Designers       | 600–900      | 450–700            | 250–400             | 150–300           | 200–350               | 200–350           | 100–250           | 100–200          |
| Software Developers   | 700–1200     | 500–850            | 300–600             | 200–500           | 250–400               | 200–500           | 200–400           | 200–400          |
| DevOps Engineers      | 750–1300     | 600–900            | 350–650             | 300–500           | 350–600               | 300–600           | 250–450           | 250–400          |
| QA/Testers            | 500–800      | 350–600            | 200–400             | 100–300           | 150–300               | 150–300           | 100–250           | 100–200          |
| AI/ML Engineers       | 900–1500     | 700–1100           | 400–700             | 300–600           | 400–800               | 400–700           | 250–500           | 250–500          |
| Data Analysts         | 600–1000     | 450–800            | 300–500             | 200–400           | 250–450               | 200–400           | 150–300           | 150–300          |
| Teleoperators/Support | 250–500      | 200–400            | 100–250             | 50–150            | 100–200               | 80–150            | 50–150            | 50–100           |
| AI Trainers           | 400–700      | 300–500            | 200–350             | 100–250           | 150–300               | 150–300           | 100–200           | 100–200          |
| Architects            | 1000–1500    | 800–1200           | 500–800             | 300–600           | 500–900               | 400–700           | 300–500           | 300–500          |
`;

function parseMarkdownToArray(markdown) {
    const lines = markdown.trim().split("\n").map(line => line.split("|").map(cell => cell.trim()).filter(cell => cell));
    const headers = lines[0]; // Extract the headers
    const dataRows = lines.slice(2); // Skip headers and separator line
    return { headers, dataRows };
}

function transformToJson({ headers, dataRows }) {
    const regions = [
        { continent: "North America", countriesList: ["USA"] },
        { continent: "Europe", countriesList: ["France"] },
        { continent: "Europe", countriesList: ["Poland", "Ukraine", "Romania"] },
        { continent: "Asia", countriesList: ["Indonesia", "Malaysia", "Vietnam"] },
        { continent: "Asia", countriesList: ["China", "Philippines"] },
        { continent: "South America", countriesList: ["Brazil", "Mexico", "Colombia"] },
        { continent: "Africa", countriesList: ["Nigeria", "Kenya", "South Africa"] },
        { continent: "Africa", countriesList: ["Madagascar"] }
    ];

    const creationDate = "2025-01-03";
    const updateDate = "2025-01-03";

    const result = [];

    dataRows.forEach(row => {
        const role = row[0];
        row.slice(1).forEach((cell, index) => {
            const rates = cell.split("–").map(rate => parseInt(rate.trim(), 10));
            if (!isNaN(rates[0]) && !isNaN(rates[1])) {
                result.push({
                    continent: regions[index].continent,
                    countriesList: regions[index].countriesList,
                    creationDate,
                    updateDate,
                    role,
                    minRateInEuros: rates[0],
                    maxRateInEuros: rates[1],
                });
            }
        });
    });

    return result;
}

const markdownArray = parseMarkdownToArray(markdownTable);
const jsonResult = transformToJson(markdownArray);

console.log(JSON.stringify(jsonResult, null, 2));
