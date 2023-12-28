const getJsFileContent = async (req, res) => {
    console.log('file');
    try {
        const { file } = req.body;

        const fileContent = Buffer.from(file, 'base64').toString('utf-8');

        res.status(200).send(fileContent);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export {
    getJsFileContent
}