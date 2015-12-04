<?php

class MJJ_FAQ_Metaboxes{

	protected static $instance = null;

	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		} // end if

		return self::$instance;

	} // end get_instance

	private function __construct(){
		add_action( 'init', array( 'MJJ_FAQ_Metaboxes', 'add_cmb2_actions' ) );
	}

	public static function add_cmb2_actions(){
		
		if( !class_exists( 'CMB2' ) ){
			
			if ( file_exists( plugins_url() . '/cmb2/init.php' ) ) {
				
				require_once plugins_url() . '/cmb2/init.php';
			
			} elseif ( file_exists( plugins_url() . '/CMB2/init.php' ) ) {
				
				require_once plugins_url() . '/CMB2/init.php';
			}

		}

		add_filter( 'cmb2_render_quiz_answer', array( 'MJJ_FAQ_Metaboxes', 'cmb2_render_answer_field_callback' ), 10, 5  );
		add_action( 'cmb2_init', array( 'MJJ_FAQ_Metaboxes', 'register_metaboxes' ) );

		//override the save bit for our quiz meta
		//actually try sanitising it this way then see if it saves: https://github.com/WebDevStudios/CMB2-Snippet-Library/blob/master/custom-field-types/address-field-type.php
		add_filter( 'cmb2_override__mjj_quiz_meta_meta_save', array( 'MJJ_FAQ_Metaboxes', 'cmb2_save_it_correctly' ), 10, 4 );
	}

	// register the metaboxes the normal way
	public static function register_metaboxes(){

    	$prefix = '_mjj_faq';

    	// if I have an issue with losing things, look here: https://github.com/WebDevStudios/CMB2/issues/348
    	// it should be go... 

		$quiz_group = new_cmb2_box( array(
		    'id'           => $prefix . 'box',
		    'title'        => __( 'The FAQ', 'mjj_faq' ),
		    'object_types' => array( 'mjj_faq', ),
		) );

		// the main repeatable field is Question. 
		$quiz_field_id = $quiz_group->add_field( array(
		    'id'          => $prefix . '_meta',
		    'type'        => 'group',
		    'options'     => array(
		        'group_title'   => __( 'Entry {#}', 'mjj_faq' ), // {#} gets replaced by row number
		        'add_button'    => __( 'Add another entry', 'mjj_faq' ),
		        'remove_button' => __( 'Remove entry', 'mjj_faq' ),
		        'sortable'      => true, // beta
		    ),
		) );
		
		// Each question has a question field so you can add the text for the question
		$quiz_group->add_group_field( $quiz_field_id, array(
		    'name'       => __( 'Question', 'mjj_faq' ),
		    'id'         => 'the_question',
		    'type'       => 'text',
		) );

		// Each question can have multiple answers, each with a 
		$quiz_group->add_group_field( $quiz_field_id, array(
		   'name'       => __( 'Answer', 'mjj_faq' ),
		    'id'         => 'the_answer',
		    'type'       => 'textarea',
		) );
		
	}

}