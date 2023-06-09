const algoliasearch = require('algoliasearch');
const client = algoliasearch(
    process.env.ALGOLIA_PROVIDER_APPLICATION_ID,
    process.env.ALGOLIA_PROVIDER_ADMIN_API_KEY
);

module.exports = {
    afterUpdate(event) {
        const { result, params } = event;
        console.log('afterUpdate result', result)
        const productIndex = client.initIndex('category')
        const record = {
            objectID: result.id, nodeName: result.strCategory, nodeBody: result.strCategoryDescription, images: result.strCategoryThumb.name
        }
        productIndex.saveObject(record).wait()
        productIndex.setSettings({
            searchableAttributes: [
                'nodeName'
            ]
        })
    },
    afterCreate(event) {
        const { result, params } = event;
        console.log('afterCreate result', result)
        const productIndex = client.initIndex('category')
        const record = {
            objectID: result.id, nodeName: result.strCategory, nodeBody: result.strCategoryDescription, images: result.strCategoryThumb.name
        }
        productIndex.saveObject(record).wait()
        productIndex.setSettings({
            searchableAttributes: [
                'nodeName'
            ]
        })
    },
};
// `http://localhost:1337${result.strCategoryThumb.formats.thumbnail.url}`