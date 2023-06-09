const algoliasearch = require('algoliasearch');
const client = algoliasearch(
  process.env.ALGOLIA_PROVIDER_APPLICATION_ID,
  process.env.ALGOLIA_PROVIDER_ADMIN_API_KEY
);
const selectData = [
  {
    value: 'product',
    label: 'Product',
    indexName: 'product',
  },
  {
    value: 'page',
    label: 'Page',
    indexName: 'page',
  },
  {
    value: 'project',
    label: 'Project',
    indexName: 'project',
  },
  {
    value: 'vendor',
    label: 'Vendor',
    indexName: 'vendor',
  },
  {
    value: 'category',
    label: 'Category',
    indexName: 'category',
  },
];
const algoliaIndexing = async (
  product,
  page,
  project,
  vendor,
  category,
  bockEntities
) => {
  console.log(process.env.ALGOLIA_PROVIDER_APPLICATION_ID, process.env.ALGOLIA_PROVIDER_ADMIN_API_KEY);
  let productArray = product.map((t) => {
    let strippedHit = t.nodeBody;
    if (strippedHit) strippedHit = strippedHit.replace(/(<([^>]+)>)/gi, '');

    console.log(strippedHit);

    if (t.nodePbItems && t.nodePbItems.length) {
      let f = t.nodePbItems.map((v) => {
        if (v.matches !== null && typeof v.matches === 'object') {
          let c = Object.values(v.matches);
          let allMatches = [];
          c.map((e) => {
            if (e !== null) {
              allMatches.push(...e);
            }

            return e;
          });
          return { ...v, matchess: allMatches };
        } else {
          return v;
        }
      });
      return { ...t, nodePbItems: f, nodeBody: strippedHit };
    } else {
      return {
        ...t,
        nodeBody: strippedHit,
      };
    }
  });

  const productIndex = client.initIndex('product');
  await productIndex.exists().then((result) => {
    if (result) {
      productIndex
        .replaceAllObjects(productArray, {
          autoGenerateObjectIDIfNotExist: true,
          safe: true,
        })
        .then(({ objectIDs }) => {
          productIndex
            .setSettings({
              searchableAttributes: [
                'nodeName',
                'nodePbItems.code',
                'nodePbItems.name',
                'nodePbItems.description',
                'nodePbItems.matchess.field_competitor_pn',
                'nodePbItems.matchess.value',
                'nodeBody',
                'nodeSpecs.fields.field_spec_name',
                'nodeSpecs.fields.field_intro_description',
                'nodeSpecs.fields.field_spec_section.field_items.field_iname',
                'nodeSpecs.fields.field_spec_section.field_items.field_code',
                'nodeSpecs.fields.field_spec_section.field_pull_items.name',
                'nodeSpecs.fields.field_spec_section.field_pull_items.code',
              ],
            })
            .then(() => {
              console.log('product array of objects replaced in algolia');
            });
        });
    } else {
      productIndex
        .saveObjects(productArray, { autoGenerateObjectIDIfNotExist: true })
        .then(({ objectIDs }) => {
          productIndex
            .setSettings({
              searchableAttributes: [
                'nodeName',
                'nodePbItems.code',
                'nodePbItems.name',
                'nodePbItems.description',
                'nodePbItems.matchess.field_competitor_pn',
                'nodePbItems.matchess.value',
                'nodeBody',
                'nodeSpecs.fields.field_spec_name',
                'nodeSpecs.fields.field_intro_description',
                'nodeSpecs.fields.field_spec_section.field_items.field_iname',
                'nodeSpecs.fields.field_spec_section.field_items.field_code',
                'nodeSpecs.fields.field_spec_section.field_pull_items.name',
                'nodeSpecs.fields.field_spec_section.field_pull_items.code',
              ],
            })
            .then(() => {
              console.log('product array of objects uploaded in algolia');
            });
        });
    }
  });

  let pageArray = page.map((i) => {
    return {
      pageUrl: i.pageUrl,
      nodeName: i.pageTitle,
    };
  });
  const pageIndex = client.initIndex('page');

  await pageIndex.exists().then((result) => {
    if (result) {
      pageIndex
        .replaceAllObjects(pageArray, {
          autoGenerateObjectIDIfNotExist: true,
          safe: true,
        })
        .then(({ objectIDs }) => {
          pageIndex
            .setSettings({
              searchableAttributes: ['nodeName', 'pageUrl'],
            })
            .then(() => {
              console.log('page array of objects replaced in algolia');
            });
        });
    } else {
      pageIndex
        .saveObjects(pageArray, { autoGenerateObjectIDIfNotExist: true, safe: true })
        .then(({ objectIDs }) => {
          pageIndex
            .setSettings({
              searchableAttributes: ['nodeName', 'pageUrl'],
            })
            .then(() => {
              console.log('page array of objects uploaded in algolia');
            });
        });
    }
  });

  let projectArray = project.map((i) => {
    let strippedHit = i.body;
    if (strippedHit) strippedHit = strippedHit.replace(/(<([^>]+)>)/gi, '');
    console.log(strippedHit);

    return {
      pageUrl: i.alias,
      nodeName: i.title,
      nodeBody: strippedHit,
      nodeImages: i.images,
    };
  });
  const projectIndex = client.initIndex('project');

  await projectIndex.exists().then((result) => {
    if (result) {
      projectIndex
        .replaceAllObjects(projectArray, {
          autoGenerateObjectIDIfNotExist: true,
          safe: true,
        })
        .then(({ objectIDs }) => {
          projectIndex
            .setSettings({
              searchableAttributes: ['nodeName', 'pageUrl'],
            })
            .then(() => {
              console.log('project array of objects replaced in algolia');
            });
        });
    } else {
      projectIndex
        .saveObjects(projectArray, { autoGenerateObjectIDIfNotExist: true })
        .then(({ objectIDs }) => {
          projectIndex
            .setSettings({
              searchableAttributes: ['nodeName', 'pageUrl'],
            })
            .then(() => {
              console.log('project array of objects uploaded in algolia');
            });
        });
    }
  });

  let vendorArray = vendor.map((i) => {
    let strippedHit = i.body;
    if (strippedHit) strippedHit = strippedHit.replace(/(<([^>]+)>)/gi, '');
    console.log(strippedHit);
    return {
      pageUrl: i.alias,
      nodeName: i.title,
      nodeBody: strippedHit,
      nodeImage: i.logo,
      location: i.location,
    };
  });

  const vendorIndex = client.initIndex('vendor');

  await vendorIndex.exists().then((result) => {
    if (result) {
      vendorIndex
        .replaceAllObjects(vendorArray, {
          autoGenerateObjectIDIfNotExist: true,
          safe: true,
        })
        .then(({ objectIDs }) => {
          vendorIndex
            .setSettings({
              searchableAttributes: ['nodeName'],
            })
            .then(() => {
              console.log('vendor array of objects replaced in algolia');
            });
        });
    } else {
      vendorIndex
        .saveObjects(vendorArray, { autoGenerateObjectIDIfNotExist: true })
        .then(({ objectIDs }) => {
          vendorIndex
            .setSettings({
              searchableAttributes: ['nodeName'],
            })
            .then(() => {
              console.log('vendor array of objects uploaded in algolia');
            });
        });
    }
  });

  let categoryArray = category.map((i) => {
    let strippedHit = i.nodeDesc;
    if (strippedHit) strippedHit = strippedHit.replace(/(<([^>]+)>)/gi, '');
    console.log(strippedHit);
    return {
      pageUrl: i.pageUrl,
      nodeName: i.nodeName,
      nodeBody: strippedHit,
      nodeImage: i.nodeImage,
    };
  });
  const categoryIndex = client.initIndex('category');

  await categoryIndex.exists().then((result) => {
    if (result) {
      categoryIndex
        .replaceAllObjects(categoryArray, {
          autoGenerateObjectIDIfNotExist: true,
          safe: true,
        })
        .then(({ objectIDs }) => {
          categoryIndex
            .setSettings({
              searchableAttributes: ['nodeName'],
            })
            .then(() => {
              console.log('category array of objects replaced in algolia');
            });
        });
    } else {
      categoryIndex
        .saveObjects(categoryArray, { autoGenerateObjectIDIfNotExist: true })
        .then(({ objectIDs }) => {
          categoryIndex
            .setSettings({
              searchableAttributes: ['nodeName'],
            })
            .then(() => {
              console.log('category array of objects uploaded in algolia');
            });
        });
    }
  });
  let allData = [];
  Object.values(bockEntities.v).map((v) => {
    let a = Object.values(v);
    a = a
      .filter((v) => v.hasOwnProperty('matches'))
      .map((v) => {
        let c = Object.values(v.matches);
        let allMatches = [];
        c.map((v) => {
          allMatches.push(...v);
          return v;
        });
        return { ...v, matchess: allMatches };
      });
    allData.push(...a);
    return a;
  });
  console.log(allData);
  const part_competitor = client.initIndex('part_competitor');
  console.log(part_competitor);
  await part_competitor.exists().then((result) => {
    if (result) {
      part_competitor
        .replaceAllObjects(allData, {
          autoGenerateObjectIDIfNotExist: true,
          safe: true,
        })
        .then(({ objectIDs }) => {
          part_competitor
            .setSettings({
              searchableAttributes: [
                'matchess.field_competitor_pn',
                ' matchess.value',
              ],
            })
            .then(() => {
              console.log(
                'indexed in part_competitors array of objects replaced in algolia'
              );
            });
        });
    } else {
      part_competitor
        .saveObjects(allData, { autoGenerateObjectIDIfNotExist: true })
        .then(({ objectIDs }) => {
          part_competitor
            .setSettings({
              searchableAttributes: [
                'matchess.field_competitor_pn',
                ' matchess.value',
              ],
            })
            .then(() => {
              console.log(
                'indexed in part_competitor array of objects uploaded in algolia'
              );
            });
        });
    }
  });

  return 'All index updated';
};

module.exports = algoliaIndexing;
