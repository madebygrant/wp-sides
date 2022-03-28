const el = wp.element.createElement;

/**
 * Render the icons as SVG elements
 * 
 * @param {array} layers The inner layers of the SVG
 * @param {*} svgOptions The primary options of the SVG
 * @returns 
 */
const renderIcon = (layers, svgOptions) => {
    const svgDefaults = { width: 24, height: 24, fill: "none", viewBox: "0 0 15 15", xmlns: "http://www.w3.org/2000/svg", className: 'wp-sides-icon' };
    svgOptions = !svgOptions ? {} : svgOptions;

    let children = [],
        svg = Object.assign(svgDefaults, svgOptions);

    if( Array.isArray(layers) ){
        layers.forEach( (opt) => {
            children.push(el('path', opt ));
        });

        return el('svg', svg,
            children
        );
    }
};

const __icons = {

    // Slider
    slider: renderIcon(
        [
            {
                d: "m4.798 6.596h14.403v10.892h-14.403z"
            }, 
            {
                d: "m22.406 6.59h4.153v10.892h-4.153z"
            }, 
            {
                d: "m-1.783 6.59h3.934v10.892h-3.934z"
            }
        ],
        {
            fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": ".35"
        }
    ),

    // Edit icon in a circle
    edit_circle: renderIcon([
        {
            d: "M4.5 8.5l-.354-.354L4 8.293V8.5h.5zm4-4l.354-.354a.5.5 0 00-.708 0L8.5 4.5zm2 2l.354.354a.5.5 0 000-.708L10.5 6.5zm-4 4v.5h.207l.147-.146L6.5 10.5zm-2 0H4a.5.5 0 00.5.5v-.5zm3 3.5A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0zM4.854 8.854l4-4-.708-.708-4 4 .708.708zm3.292-4l2 2 .708-.708-2-2-.708.708zm2 1.292l-4 4 .708.708 4-4-.708-.708zM6.5 10h-2v1h2v-1zm-1.5.5v-2H4v2h1z", 
            fill: "currentColor"
        }
    ]),

    // Information icon in a circle
    info_circle: renderIcon([
        { 
            d: "M7 4.5V5h1v-.5H7zm1-.01v-.5H7v.5h1zM8 11V7H7v4h1zm0-6.5v-.01H7v.01h1zM6 8h1.5V7H6v1zm0 3h3v-1H6v1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zM1 7.5A6.5 6.5 0 017.5 1V0A7.5 7.5 0 000 7.5h1zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zm0 1A7.5 7.5 0 0015 7.5h-1A6.5 6.5 0 017.5 14v1z", 
            fill: "currentColor" 
        }
    ]),

    // Lightning bolt
    lightning: renderIcon(
        [
            {
                d: "M14.36 2.067A1 1 0 0115 3v6h5a1 1 0 01.74 1.673l-10 11A1 1 0 019 21v-6H4a1 1 0 01-.74-1.673l10-11a1 1 0 011.1-.26zM6.26 13H10a1 1 0 011 1v4.413L17.74 11H14a1 1 0 01-1-1V5.587L6.26 13z"
            },
        ], 
        {
            fill: "currentColor", viewBox: "0 0 24 24"
        }
    ),

    // Sliders
    sliders: renderIcon([
        {
            d: "M15 3.5H6.5m0 0a2 2 0 10-4 0m4 0a2 2 0 11-4 0m0 0H0m15 8h-2.5m0 0a2 2 0 10-4 0m4 0a2 2 0 11-4 0m0 0H0", 
            stroke: "currentColor" 
        }
    ]),

    // Smiley face
    smile: renderIcon([
        {
            d: "M4.9 8.7l-.3-.4-.8.6.3.4.8-.6zm6 .6l.3-.4-.8-.6-.3.4.8.6zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0zM4 6h1V5H4v1zm6 0h1V5h-1v1zm.1 2.7a3.25 3.25 0 01-5.2 0l-.8.6c1.7 2.267 5.1 2.267 6.8 0l-.8-.6z", 
            fill: "currentColor"
        }
    ]),

    // Star
    star: renderIcon([
        { 
            d: "M7.5 12.04l-4.326 2.275L4 9.497.5 6.086l4.837-.703L7.5 1l2.163 4.383 4.837.703L11 9.497l.826 4.818L7.5 12.041z", 
            stroke: "currentColor" 
        }
    ]),

    // Star in a circle
    star_circle: renderIcon([
        {
            d: "M7.5 9.804l.242-.437a.5.5 0 00-.484 0l.242.437zM5.337 11l-.494-.08a.5.5 0 00.736.518L5.337 11zm.413-2.533l.493.08a.5.5 0 00-.135-.429l-.358.35zM4 6.674l-.075-.495a.5.5 0 00-.283.844L4 6.673zm2.418-.37l.076.495a.5.5 0 00.377-.282l-.453-.213zM7.5 4l.453-.212a.5.5 0 00-.906 0L7.5 4zm1.082 2.304l-.453.213a.5.5 0 00.377.282l.076-.495zm2.418.37l.358.349a.5.5 0 00-.283-.844L11 6.674zM9.25 8.467l-.358-.349a.5.5 0 00-.135.43l.493-.08zM9.663 11l-.242.438a.5.5 0 00.736-.519L9.663 11zM7.258 9.367l-2.163 1.195.484.876 2.163-1.196-.484-.875zM5.83 11.08l.413-2.532-.986-.161-.414 2.532.987.162zm.278-2.962l-1.75-1.794-.716.699 1.75 1.793.716-.698zm-2.033-.95l2.419-.37-.151-.988-2.418.37.15.988zm2.796-.651l1.082-2.305-.906-.424-1.081 2.304.905.425zm.176-2.305L8.13 6.517l.905-.425-1.081-2.304-.906.424zM8.507 6.8l2.418.369.15-.989-2.418-.369-.15.989zm2.135-.475l-1.75 1.794.716.698 1.75-1.793-.716-.699zM8.757 8.548l.413 2.533.987-.162-.414-2.532-.986.16zm1.148 2.014L7.742 9.367l-.484.875 2.163 1.196.484-.876zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0z", 
            fill: "currentColor"
        }
    ]),

    // Toggles
    toggles: renderIcon([
        { d: "M3.5 2.5a1 1 0 110 2 1 1 0 010-2z", stroke: "currentColor" },
        { d: "M11.5.5h-8a3 3 0 000 6h8a3 3 0 100-6zm0 12a1 1 0 110-2 1 1 0 010 2z", stroke: "currentColor" },
        { d: "M3.5 14.5h8a3 3 0 100-6h-8a3 3 0 000 6z", stroke: "currentColor" },
    ]),

}

export { __icons };