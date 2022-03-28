import createControls from './create';
const { CheckboxControl, ColorPicker, DatePicker, FontSizePicker, RadioControl, RangeControl, SelectControl, TextControl, TextareaControl, TimePicker, ToggleControl } = wp.components;
const { MediaUpload, URLInput } = wp.blockEditor;

/**
 * Select a control, if it has own meta field
 * @param {string} type The type of control
 * @param {object} additional Additional options to use (optional)
 * @returns {object} Returns the control
 */
const __control = (type, additional) => {

    additional = typeof additional != 'undefined' && additional ? additional : {};

    const options = {
        colour: createControls.single.general( ColorPicker, 'colour', additional ),
        checkbox: createControls.single.general( CheckboxControl, 'boolean', additional ),
        date: createControls.single.general( DatePicker, 'date', additional ),
        fontSize: createControls.single.general( FontSizePicker, 'fontSizes', additional ),
        media: createControls.single.media( MediaUpload, 'media', additional ),
        radio: createControls.single.general( RadioControl, 'radio', additional ),
        range: createControls.single.general( RangeControl, 'string', additional ),
        select: createControls.single.general( SelectControl, 'string', additional ),
        text: createControls.single.general( TextControl, 'string', additional ),
        textURL: createControls.single.general( URLInput, 'string', additional ),
        textarea: createControls.single.general( TextareaControl, 'string', additional ),
        time: createControls.single.general( TimePicker, 'time', additional ),
        toggle: createControls.single.general( ToggleControl, 'boolean', additional )
    };

    return options[type];
}

/**
 * Select a control, if it shares a meta field with others
 * @param {string} type The type of control
 * @param {object} additional Additional options to use (optional)
 * @returns {object} Returns the control
 */
const __groupControl = (type, additional) => {

    additional = typeof additional != 'undefined' && additional ? additional : {};
    
    const options = {
        colour: createControls.group.general( ColorPicker, 'colour', additional ),
        checkbox: createControls.group.general( CheckboxControl, 'boolean', additional ),
        date: createControls.group.general( DatePicker, 'date', additional ),
        fontSize: createControls.group.general( FontSizePicker, 'fontSizes', additional ),
        media: createControls.group.media( MediaUpload, 'media', additional ),
        radio: createControls.group.general( RadioControl, 'radio', additional ),
        range: createControls.group.general( RangeControl, 'string', additional ),
        select: createControls.group.general( SelectControl, 'string', additional ),
        text: createControls.group.general( TextControl, 'string', additional ),
        textURL: createControls.group.general( URLInput, 'string', additional ),
        textarea: createControls.group.general( TextareaControl, 'string', additional ),
        time: createControls.group.general( TimePicker, 'time', additional ),
        toggle: createControls.group.general( ToggleControl, 'boolean', additional )
    };

    return options[type];
}
export {__control, __groupControl};