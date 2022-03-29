<?php
namespace WPSides;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/// -------------------------------------------------------

if ( !class_exists( 'WPSides\Scripts' ) ) {

    class Scripts{

        // Load scripts/styles for the backend
        function editor_assets() {
            $file_url = plugins_url( '/assets/js/wpsides.min.js', dirname( __FILE__ ) );
            $images_url = plugins_url( '/assets/images/', dirname( __FILE__ ) );

            wp_enqueue_script( 'wpsides', esc_url($file_url), [], WPSIDES_PLUGIN_VERSION, true );
            wp_localize_script( 'wpsides', 'wpSidesPlugin', [
                'load' => esc_url($file_url),
                'images' => esc_url($images_url)
            ]);
        }

        /// ---------------------------

        function add_type_attribute($tag, $handle, $src) {
            if ( 'wpsides' !== $handle ) {
                return $tag;
            }
            $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
            return $tag;
        }

        function __construct(){
            add_action( 'enqueue_block_editor_assets', [ $this, 'editor_assets' ] );
            add_filter( 'script_loader_tag', [ $this, 'add_type_attribute'] , 10, 3 );
        }

    }

    new \WPSides\Scripts;
}

/// -------------------------------------------------------

//if ( !function_exists( 'WPSides\style' ) ) {

    add_action( 'admin_head', function(){
        echo "<style class='wp-sides'>
        *[class*='wpsides-row'] .block-editor-url-input input[type=text]{ border: 1px solid #757575 !important; border-radius: 2px; width: 100%; }
        *[class*='wpsides-row'] .components-truncate{ text-overflow: unset !important; white-space: normal !important; }
        </style>";
    });
//}

/// -------------------------------------------------------

if ( !function_exists( 'WPSides\meta' ) ) {

    /**
     * Get the sidebar meta data
     * 
     * @param string $key The meta key
     * @param int $post_id The post ID
     * 
     * @return array Returns an array
     */
    function meta($key, $post_id = false){
        $post_id = !$post_id ? ( in_the_loop() ? get_the_ID() : get_queried_object_id() ) : $post_id;
        $meta = get_post_meta($post_id, $key, 1);
        
        if($meta){
            $json = json_decode($meta, true);
            if( $meta != $json ){
                $arr = [];
                foreach($json as $key => $val){
                    if(is_string($val) && $val !== ''){
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