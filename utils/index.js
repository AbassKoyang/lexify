export const fetchWord = async (word) => {
    try {
        // Fetches the word data from the server. Returns a promise that resolves to the data if successful, or rejects with an error message
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok ){
        return await response.json();
    } else{
        throw new Error ('Could not find word!')
        console.log('Error fetching word')
    }
    } catch (error) {
        throw new Error ('Could not find word!')
        console.log('Error fetching word')
    }
};