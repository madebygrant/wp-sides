/**
 * Utility methods that are used within the plugin code
 */

/**
 * Determine if it's a JSON object
 * @param {string} str The string to check
 * @returns {boolean} The boolean result
 */
const isJSON = (str) => {
    try { return (JSON.parse(str) && !!str); } 
    catch (e) { return false; }
};

const __utils = {

    /**
     * Determine if it has JSON structure
     * @param {string} str The string to check
     * @returns {boolean} The boolean result
     */
    hasJSONStructure: (str) => {
        if (typeof str !== 'string') return false;
        try {
            const result = JSON.parse(str);
            return typeof result === 'object' ? true : false;
        } 
        catch (err) {
            return false;
        }
    },

    get: {
        /**
         * Get the sidebar's group meta data
         * @param {string} metaKey The meta's slug
         * @returns {object} The meta data
         */
        groupMeta: (metaKey) => {
            const getMeta = wp.data.select('core/editor').getEditedPostAttribute('meta');
            const getMetaData = getMeta && typeof getMeta != 'undefined' ? getMeta[metaKey] : {};
            return isJSON(getMetaData) ? JSON.parse(getMetaData) : {};
        },

        /**
         * Get the post type of the current post/page been viewed in the editor
         * @returns {string} Return the post type
         */
        postType: () => { return wp.data.select( 'core/editor' ).getCurrentPostType() },

        /**
         * Get the page template used in the current post/page been viewed in the editor
         * @returns {string} Return the page template
         */
        pageTemplate: () => { return wp.data.select( 'core/editor' ).getEditedPostAttribute('template') }
    },
    
    update: {

        /**
         * Update the sidebar's group meta data
         * @param {string} metaKey The meta's slug
         */
        groupMeta: (metaKey, id, value) => {
            const getMeta = wp.data.select('core/editor').getEditedPostAttribute('meta');
            const getMetaData = getMeta && typeof getMeta != 'undefined' ? getMeta[metaKey] : {};
            let data = isJSON(getMetaData) ? JSON.parse(getMetaData) : {};
            data[id] = value;
            wp.data.dispatch('core/editor').editPost({ meta: { [metaKey]: JSON.stringify(data) } });
        }
    }
    
}
export { __utils };