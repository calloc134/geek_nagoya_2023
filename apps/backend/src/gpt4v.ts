// copilotに生成させまくった仮コード

async function sendRequestToGpt4v(apiEndpoint: string, params: any, apiKey: string) {
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    const data = await response.json();
    return data;
}

async function gpt4v() {
    const apiEndpoint = "";
    const apiKey = "";
    const prompt = "";

    let base64_image = "your_base64_image_string_here";
    let url = `data:image/jpeg;base64,${base64_image}`;

    const payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": prompt,
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": url
                }
              }
            ]
          }
        ],
        "max_tokens": 300
    }
    const response = await sendRequestToGpt4v(apiEndpoint, payload, apiKey);
    console.log(response);

    return response;
}