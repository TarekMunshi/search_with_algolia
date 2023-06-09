const algoliasearch = require('algoliasearch');
const client = algoliasearch(
    process.env.ALGOLIA_PROVIDER_APPLICATION_ID,
    process.env.ALGOLIA_PROVIDER_ADMIN_API_KEY
);
// const index = client.initIndex('post')

// const objects = [{
//     title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//     body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
//     objectID: 1
// },
// {
//     title: 'qui est esse',
//     body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
//     objectID: 2
// }];
// index.saveObjects(objects).then(({ objectIDs }) => {
//     console.log(objectIDs);
// });
module.exports = {
    afterUpdate(event) {
        const { result, params } = event;
        console.log('afterUpdate result', result)
        const productIndex = client.initIndex('post')
        const record = {
            objectID: result.id, title: result.title, body: result.body
        }
        productIndex.saveObject(record).wait()
        productIndex.setSettings({
            searchableAttributes: [
                'title'
            ]
        })
    },
    afterCreate(event) {
        const { result, params } = event;
        // console.log('afterCreate result', result)
        const productIndex = client.initIndex('post')
        const record = {
            objectID: result.id, title: result.title, body: result.body
        }
        productIndex.saveObject(record).wait()
        productIndex.setSettings({
            searchableAttributes: [
                'title'
            ]
        })
    },
};
