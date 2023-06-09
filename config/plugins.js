
module.exports = ({ env }) => ({
    "netlify-deployments": {
        enabled: true,
        config: {
            accessToken: "0eRMMRwLwmZzv1p2RpSstJYGPzg2ABCbNlRzBBWQCYU",
            sites: [
                {
                    name: 'lustrous-melba-53495c',
                    id: "b4d3dab2-4edd-4f2d-9bc1-aa66fbb44cfb",
                    buildHook: "https://api.netlify.com/build_hooks/648305965213fe120f0ab729",
                    branch: 'master' // optional
                }
            ]
        },
    },
});