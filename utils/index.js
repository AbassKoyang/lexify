export const fetchWordData = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        if (response.ok) {
            return await response.json();
        } else {
            if (response.status === 404) {
                // Word not found, return a 404 status
                return new Response('Word not found.', { status: 404 });
            } else {
                console.log('Error fetching word');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
