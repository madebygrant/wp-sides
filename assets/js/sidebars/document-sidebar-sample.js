/**
 * Extend the Document sidebar - Sample
 * 
 * Requires the 'WP Sides' plugin to be activated.
 * Tested with 'WP Sides' version: 0.3
 */
(async () => {

    let { wpSides } = await import(wpSidesPlugin.load); // Import the WP Sides controls

    const { __ } = wp.i18n;
    const el = wp.element.createElement;
    const { DocumentPanel, groupControl, utils } = wpSides;

    const DocumentSidebarExtended = () => {

        const details = {
            title: __('Document Sidebar Option'),
            metaKey: '_doc_sidebar_meta'
        };

        /**
         * Get the sidebar meta data, post type and page template of the current page
         */
        const get = {
            meta: utils.get.groupMeta(details.metaKey),
            postType: utils.get.postType(),
            pageTemplate: utils.get.pageTemplate()
        };

        /**
         * Restrict to specific post types
         */
        /*
        const allowedPostTypes = [ 'page' ];
        if( !allowedPostTypes.includes(get.postType) ){
            return null;
        }
        */

        /**
         * Restrict to specific page templates
         */
        /*
        const allowedPageTemplates = [ 'some-template' ];
        if( !allowedPageTemplates.includes(get.pageTemplate) ){
            return null;
        }
        */

        return (
            el(
                DocumentPanel,
                {
                    className: 'doc-sidebar-opt',
                    title: details.title
                },
                
                el( 
                    groupControl('text'),
                    {
                        title : __('Sample Text'),
                        metaKey: details.metaKey,
                    }
                ),

            )
        )
    }

    // -------------------------------------------

    // Add to document sidebar
    wp.plugins.registerPlugin( 'document-sidebar-extended', {
        render:  DocumentSidebarExtended,
        icon: ''
    } );

})();