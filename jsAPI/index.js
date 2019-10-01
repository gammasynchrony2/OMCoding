const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
    console.log(request.body);
    const data = request.body;
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    })
})

app.listen(3000, () => console.log('listening on 3000'));

// resume at video 2.4