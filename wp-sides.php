<?php
/**
 * Plugin Name: WP Sides
 * Description: A developer's toolkit for creating, adding custom sidebars to the block (Gutenberg) editor.
 * Author: madebygrant.com
 * Author URI: https://madebygrant.com
 * Version: 0.3
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
*/
// ------------------------------------------------------

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// ------------------------------------------------------

const WPSIDES_PLUGIN_VERSION = '0.3';

// ------------------------------------------------------

// Prevent plugin update notifications (if active)
function wpsides_remove_update_notification( $value ) {
	$dir = basename(plugin_dir_path( __FILE__ ));
	if( isset( $value->response[ $dir.'/wp-sides.php' ] ) ) {
		unset( $value->response[ $dir.'/wp-sides.php' ] );
	}
	return $value;
} 
add_filter( 'site_transient_update_plugins', 'wpsides_remove_update_notification' );

// ------------------------------------------------------

// Load files
require_once plugin_dir_path( __FILE__ ) . 'inc/init.php';