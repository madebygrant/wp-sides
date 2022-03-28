<?php
namespace WPSides;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/// -------------------------------------------------------

add_action('init', function() {

    register_meta(
        'post', 
        '_page_sidebar_meta', // Underscore prefix required!
        [
            'type' => 'string',
            'show_in_rest' => true,
            'single' => true,
            'auth_callback' => function(){
                return current_user_can('edit_posts');
            }
        ]
    );

});


/// -------------------------------------------------------

if ( ! class_exists( 'WPSides\Scripts' ) ) {

    class Scripts{

        // Load scripts/styles for the backend
        function editor_assets() {
            $file_url = plugins_url( '/_src/js/wpsides.min.js', dirname( __FILE__ ) );

            wp_enqueue_script( 'wpsides', esc_url($file_url), [], WPSIDES_PLUGIN_VERSION, true );
            wp_enqueue_script( 'wpsides-sidebars', plugins_url( '/_src/js/sidebars/sidebar-sample.js', dirname( __FILE__ ) ), [], THEME_VERSION, true );
            
            wp_localize_script( 'wpsides', 'wpSidesPlugin', [
                'load' => esc_url($file_url),
                'images' => esc_url($images_url)
            ]);
        }

        function inline_css(){
            echo '<style class="wp-sides-inline-style">.wp-sides-icon {fill: none !important;}</style>';
        }

        function __construct(){
            add_action( 'enqueue_block_editor_assets', [ $this, 'editor_assets' ] );
            add_action( 'admin_head', [ $this, 'inline_css' ] );
        }

    }

    new \WPSides\Scripts;
}

/// -------------------------------------------------------

if ( ! function_exists( 'WPSides\meta' ) ) {

    function meta($key, $post_id = false){
        $post_id = !$post_id ? (in_the_loop() ? get_the_ID() : get_queried_object_id() ) : $post_id;
        $meta = get_post_meta($post_id, $key, 1);
        
        if($meta){
            $json = json_decode($meta, true);
            if( $meta != $json ){
                $arr = [];
                foreach($json as $key => $val){
                    if($val !== ''){
                        $decoded = json_decode($val);
                        $arr[$key] = $decoded ? $decoded : $val;
                    }
                }
                return $arr;
            }
        }
        return false;
    }

}
