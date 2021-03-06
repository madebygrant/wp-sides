# WP Sides

A WordPress plugin and developer's toolkit for creating, adding custom sidebars to the block (Gutenberg) editor.

### Contents

 - [Instructions](#instructions)
 - [Enqueue 'WP Sides' sidebar JS files](#enqueue-wp-sides-sidebar-js-files)
 - [Sidebar JS file](#sidebar-js-file)
 - [Retrieve the sidebar meta data](#retrieve-the-sidebar-meta-data)
 - [Available Controls](#available-controls)
 - [Available Icons](#available-icons)

### Instructions
1. Download and install the plugin
2. Activate the plugin
3. Enqueue a valid 'WP Sides' sidebar JS file

### Enqueue 'WP Sides' sidebar JS files
Enqueue the sidebar files into the block editor. You can use this example code below in your theme's functions.php file: 

```php
add_action( 'enqueue_block_editor_assets', function(){
	wp_enqueue_script( 
      'wpsides-sidebar-sample', 
      get_theme_file_uri('assets/js/sidebar-sample.js'), 
      [],
      1.0, 
      true 
    );
});
```
*Note: In the example above, change the location to where your sidebar JS file is located.*

### Sidebar JS file
To see how the controls work and to implement them, please look at the [sample file](../main/assets/js/sidebars/sidebar-sample.js). It contains all the available controls and how to have several groups of controls in a single sidebar. 

Some knowledge in React and development experience with the block editor would be beneficial.

[A link to the sample sidebar file](../main/assets/js/sidebars/sidebar-sample.js)

### Retrieve the sidebar meta data
The plugin includes a method to retrieve the meta data of the sidebars to use in your themes. It returns an array of the meta data.

- $metaKey: The meta key of the sidebar meta field is required.
- $postID: The post ID is required. Pass the post ID of the page/post you want to fetch the meta field data from.

```php
$meta = \WPSides\meta($metaKey, $postID);
```

### Available Controls
- Colour Select
- Checkbox
- Date field
- Font size
- Media
- Radio buttons
- Range
- Select field
- Text input
- URL text input
- Textarea field
- Time
- Toggle button

### Available Icons
You can assign different icons to the sidebars. Here's some that are included with the plugin.

To use: *wpSides.icons.**icon_slug_here***

- *Slider*: **slider**
- *Pen icon in a circle*: **edit_circle**
- *'I' icon in a circle*: **info_circle**
- *Lightning bolt*: **lightning**
- *Sliders*: **sliders**
- *Smiley face*: **smiley**
- *Star*: **star**
- *Star in a circle*: **star_circle**
- *Toggles*: **toggles**