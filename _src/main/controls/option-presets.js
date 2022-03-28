/**
 * 
 * Option presets for the controls
 * 
 * @param {object} props Pass the 'props' variable when creating the controls
 * @returns Object of preset options
 */
const optionPresets = (props) =>{
    return {
        
        boolean: {
            label: props.title,
            checked: props.metaValue,
            onChange: ( content ) => {
                props.setMetaValue( content );
            }
        },
        
        colour: {
            label: props.title,
            color: props.metaValue,
            onChangeComplete: ( content ) => {
                props.setMetaValue( content.rgb );
            }
        },

        date: {
            //label: props.title,
            currentDate: props.metaValue,
            onChange: ( content ) => {
                props.setMetaValue( content );
            }
        },

        fontSizes: {
            fallbackFontSize: 16,
            value: props.metaValue,
            onChange: ( content ) => {
                props.setMetaValue( content );
            }
        },

        media: {
            value: props.metaValue,				
            onSelect: ( media ) => {
                let preview, obj = {};
                obj.id = media.id;
                obj.type = media.type;
                obj.mime = media.mime;
                obj.alt = media.alt;
                obj.title = media.title;
                obj.width = media.width ? media.width : '';
                obj.height = media.height ? media.height : '';
                obj.name = media.name ? media.name : '';

                if(media.type == 'image'){
                    preview = 'medium' in media.sizes ? media.sizes.medium.url : media.sizes.full.url;
                    obj.preview = preview;
                    props.setMetaValue( JSON.stringify(obj) );
                }
                else{
                    obj.fileLength = media.fileLength ? media.fileLength : '';
                    obj.preview = typeof media.thumb != 'undefined' && media.thumb.src ? media.thumb.src : wpSidesPlugin.images + 'icon-file.svg';
                    obj.url = media.url ? media.url : '';
                    props.setMetaValue( JSON.stringify(obj) );
                }
                
            }
        },

        radio: {
            label: props.title,
            selected: props.metaValue,
            onChange: ( content ) => {
                props.setMetaValue( content );
            }
        },

        string: {
            label: props.title,
            value: props.metaValue,
            onChange: ( content ) => {
                props.setMetaValue( content.toString() );
            }
        },

        time: {
            //label: props.title,
            currentTime: props.metaValue,
            onChange: ( content ) => {
                props.setMetaValue( content );
            }
        },

    }
}

export default optionPresets;