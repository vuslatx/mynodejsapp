const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
    try {
        const apiUrl = 'https://brutalist.report/api/v1/articles/discord';
        const response = await axios.get(apiUrl);
        const articles = response.data.articles;
        
        let htmlContent = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>API Data</title></head><body>';
        
        articles.forEach(article => {
            htmlContent += `<h3><a href="${article.url}">${article.title}</a></h3>`;
        });
        
        htmlContent += '</body></html>';
        
        res.send(htmlContent);
    } catch (error) {
        console.error(error);
        res.status(500).send('Bir hata oluştu.');
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
