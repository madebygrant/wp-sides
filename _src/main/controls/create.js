const { __ } = wp.i18n;
const el = wp.element.createElement;
const { withSelect, withDispatch } = wp.data;
const { Button, PanelRow } = wp.components;
import { __utils } from '../utils';
import optionPresets from './option-presets';

// --------------------------------------------------------------------------------

/**
 * Helpers
 * 
 * Functions to aid in creating controls
 */

// --------------------------------------------------------------------------------

/**
 * Generate the controls
 * 
 * @param control Control component via WordPress
 * @param options Determine which option preset to use
 * @param extraOptions Add any additional options to the option preset
 */
const createControls = {

    /**
     * For controls that have their own meta fields
     * 
     * Each control is assigned to a single meta key
     */
    single: {

        /**
         * For most control types
         * 
         * @param {*} control The control component from wp.components
         * @param {string} options The preset options
         * @param {object} extraOptions Additional options to use (optional)
         * @returns The rendered control
         */
        general: (control, options, extraOptions) => {
            return wp.compose.compose([
                withSelect(( select, props ) => {
                    return { 
                        metaValue: select('core/editor').getEditedPostAttribute('meta')[props.metaKey]
                    }
                }),
                withDispatch(( dispatch, props ) => {
                    return { 
                        setMetaValue: (value) => {
                            dispatch('core/editor').editPost({ meta: { [props.metaKey]: value } });
                        }
                    }
                })
                ])( ( props ) => {
                    let controlOptions = optionPresets(props)[options];

                    // Merge the control preset and additonal options
                    if( extraOptions !== false ){
                        controlOptions = Object.assign(controlOptions, extraOptions);
                    }

                    // Render the control
                    return el( PanelRow, { className: "wpsides-row--" + props.id }, el( control, controlOptions ) );
                }
            )
        },

        /**
         * For media type controls
         * 
         * @param {*} control The control component from wp.components
         * @param {string} options The preset options
         * @param {object} extraOptions Additional options to use (optional)
         * @returns The rendered control
         */
        media: (control, options, extraOptions) => {
            return wp.compose.compose([
                withSelect(( select, props ) => {
                    return { 
                        metaValue: select('core/editor').getEditedPostAttribute('meta')[props.metaKey]
                    }
                }),
                withDispatch(( dispatch, props ) => {
                    return { 
                        setMetaValue: (value) => {
                            dispatch('core/editor').editPost({ meta: { [props.metaKey]: value } });
                        }
                    }
                })
                ])( ( props ) => {
                    let controlOptions = optionPresets(props)[options];
        
                    // Merge the control preset and additonal options
                    if( extraOptions !== false ){
                        controlOptions = Object.assign(controlOptions, extraOptions);
                    }

                    // Render a 'Select Media' button
                    controlOptions = Object.assign( 
                        {
                            render: ( { open } ) => (
                                <Button className="wpsides-sidebar-image__button wpsides-sidebar-image__button--select" isPrimary={true} onClick={ open }>
                                    { __('Select Media') }
                                </Button>
                            )
                        },
                        controlOptions 
                    );

                    // Render the control, an image preview and a remove button
                    const imageData = __utils.hasJSONStructure(props.metaValue) ? JSON.parse(props.metaValue) : {},
                        mediaID = imageData.id ? imageData.id : '',
                        mediaPreview = imageData.preview && imageData.preview != '' ? imageData.preview : false,
                        mediaName = imageData.name ? imageData.name : '';
        
                    let imageTagData = mediaPreview ? { className: 'wpsides-sidebar-image__preview', "data-id": mediaID, src: mediaPreview, alt: 'Image Preview' } : {};
        
                    return el( PanelRow, { className: "wpsides-row--" + props.id }, el(
                        'div', { className: 'wpsides-sidebar-media', style: { textAlign: 'center' } },
        
                            el( control, controlOptions ),
                            el('figure', { className: 'wpsides-sidebar-media__preview', style: !mediaPreview ? { display: 'none' } : {} },
                                el('img', imageTagData),
                                el('figcaption', {className: 'wpsides-sidebar-media__name'}, mediaName),
                            ),
                            el('button', 
                                { 
                                    style: !mediaPreview ? { display: 'none' } : {},
                                    className: 'button button-large editor-button wpsides-sidebar-media__button wpsides-sidebar-media__button--remove', 
                                    onClick: () => {
                                        props.setMetaValue( JSON.stringify({}) );
                                    }
                                }, 
                            'Remove')
                    ) );
                }
            )
        }
    },

    /**
     * For a group of controls to be saved into a single metakey.
     * 
     * The data is being stored in an object and saved as a string in the meta key.
     */
    group: {

        /**
         * For most control types
         * 
         * @param {*} control The control component from wp.components
         * @param {string} options The preset options
         * @param {object} extraOptions Additional options to use (optional)
         * @returns The rendered control
         */
        general: (control, options, extraOptions) => {
            return wp.compose.compose([
                withSelect(( select, props ) => {
                    let meta = __utils.get.groupMeta(props.metaKey);

                    return {
                        metaValue: meta[props.id]
                    }
                }),
                withDispatch(( dispatch, props ) => {
                    return { 
                        setMetaValue: (value) => {
                            let meta = __utils.get.groupMeta(props.metaKey);
                            meta[props.id] = value;
                            dispatch('core/editor').editPost({ meta: { [props.metaKey]: JSON.stringify(meta) } });
                        }
                    }
                })
                ])( ( props ) => {
                    let controlOptions = optionPresets(props)[options];
        
                    // Merge the control preset and additonal options
                    if( extraOptions !== false ){
                        controlOptions = Object.assign(controlOptions, extraOptions);
                    }

                    // Render the control
                    return el( PanelRow, { className: "wpsides-row--" + props.id }, el( control, controlOptions ) );
                }
            )
        },

        /**
         * For media type types
         * 
         * @param {*} control The control component from wp.components
         * @param {string} options The preset options
         * @param {object} extraOptions Additional options to use (optional)
         * @returns The rendered control
         */
        media: (control, options, extraOptions) => {
            return wp.compose.compose([
                withSelect(( select, props ) => {
                    let meta = __utils.get.groupMeta(props.metaKey);
                    
                    return {
                        metaValue: meta[props.id]
                    }
                }),
                withDispatch(( dispatch, props ) => {
                    return { 
                        setMetaValue: (value) => {
                            let meta = __utils.get.groupMeta(props.metaKey);
                            if(value != null){
                                meta[props.id] = value;
                            }
                            else{
                                delete meta[props.id];
                            }
                            dispatch('core/editor').editPost({ meta: { [props.metaKey]: JSON.stringify(meta) } });
                        }
                    }
                })
                ])( ( props ) => {
                    let controlOptions = optionPresets(props)[options];
        
                    // Merge the control preset and additonal options
                    if( extraOptions !== false ){
                        controlOptions = Object.assign(controlOptions, extraOptions);
                    }

                    // Render a 'Select Media' button
                    controlOptions = Object.assign( 
                        {
                            render: ( { open } ) => (
                                <Button className="wpsides-sidebar-image__button wpsides-sidebar-image__button--select" isPrimary={true} onClick={ open }>
                                    { __('Select Media') }
                                </Button>
                            )
                        },
                        controlOptions 
                    );

                    // Render the control, an image preview and a remove button
                    const imageData = __utils.hasJSONStructure(props.metaValue) ? JSON.parse(props.metaValue) : {},
                        mediaID = imageData.id ? imageData.id : '',
                        mediaPreview = imageData.preview && imageData.preview != '' ? imageData.preview : false,
                        mediaName = imageData.name ? imageData.name : '';
        
                    let imageTagData = mediaPreview ? { className: 'sidebar-image__preview', "data-id": mediaID, src: mediaPreview, alt: 'Image Preview' } : {};
        
                    return el( PanelRow, { className: "wpsides-row--" + props.id }, el(
                        'div', { className: 'wpsides-sidebar-media', style: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' } },
                            el('label', { className: 'components-base-control__label wpsides-label', style: { alignSelf: 'flex-start', marginBottom: '1rem' } }, props.title),
                            el( control, controlOptions ),
                            el('figure', { className: 'wpsides-sidebar-media__preview', style: !mediaPreview ? { display: 'none' } : { padding: '1rem', margin: '1rem 0' } },
                                el('img', imageTagData),
                                el('figcaption', {className: 'wpsides-sidebar-media__name'}, mediaName),
                            ),
                            el('button', 
                                { 
                                    style: !mediaPreview ? { display: 'none' } : {},
                                    className: 'button button-large editor-button wpsides-sidebar-media__button wpsides-sidebar-media__button--remove', 
                                    onClick: () => {
                                        props.setMetaValue({});
                                    }
                                }, 
                            'Remove')
                    ) );
                }
            )
        }
    }
}

export default createControls;