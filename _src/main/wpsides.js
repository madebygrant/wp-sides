/**
 * The main file to be compiled
 */

import { __control, __groupControl } from './controls/control-list';
import { __icons } from './icons';
import { __utils } from './utils';

/**
 * The core object to export and used in order to create the sidebars
 */
const wpSides = {
    /**
     * A control that it's own meta field
     * @param {string} type The type of control
     * @param {object} additional Additional options to use (optional)
     * @returns 
     */
    control: (type, additional) => __control(type, additional),

    /**
     * A control that shares a meta field with other
     * @param {string} type The type of control
     * @param {object} additional Additional options to use (optional)
     * @returns 
     */
    groupControl: (type, additional) => __groupControl(type, additional),

    /**
     * Icons for the sidebar
     */
    icons: __icons,

    /**
     * Utility methods that are used within the plugin code
     */
    utils: __utils,

    /**
     * Create the sidebars
     */
    Sidebar: wp.editPost.PluginSidebar,

    /**
     * Add the newly created sidebars to the pages
     */
    AddSidebar: wp.editPost.PluginSidebarMoreMenuItem,

    /**
     * Use to extend the 'Document Settings' panel
     */
    DocumentPanel: wp.editPost.PluginDocumentSettingPanel
}

export default wpSides;