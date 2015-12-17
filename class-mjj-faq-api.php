<?php

class MJJ_FAQ_API{

	protected static $instance = null;

	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		} // end if

		return self::$instance;

	} // end get_instance

	private function __construct(){
		add_action( 'rest_api_init', array( 'MJJ_FAQ_API', 'register_faq_meta' ) );
	}

	public static function register_faq_meta(){

		register_rest_field( 
			'mjj_faq',
        	'_mjj_faq_meta',
       		array(
        	    'get_callback'    => array( 'MJJ_FAQ_API', 'get_faq_meta'),
        	    'update_callback' => null,
        	    'schema'          => null,
        	)
        );
	}

	public static function get_faq_meta( $object, $field_name, $request ){

		$faq_meta_array = get_post_meta( $object[ 'id' ], $field_name );

		foreach( $faq_meta_array[0] as $faq_meta ){

			foreach( $faq_meta as $key => $value ){
	
				$esc_faq_meta[ $key ] =implode( "\n", array_map( 'sanitize_text_field', explode( "\n", $value ) ) );
			}

			$esc_faq_meta_array[] = $esc_faq_meta;
		}


		return $esc_faq_meta_array;
	}
}