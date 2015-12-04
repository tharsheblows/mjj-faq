<?php 

class MJJ_FAQ_CPT{

	protected static $instance = null;

	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		} // end if

		return self::$instance;

	} // end get_instance

	private function __construct(){
		add_action( 'init', array( 'MJJ_FAQ_CPT', 'create_post_types' ) );
		add_filter( 'the_content', array( 'MJJ_FAQ_CPT', 'add_div' ) );
	}

	public static function create_post_types(){
		register_post_type( 'mjj_faq',
			array(
				'labels' => array(
					'name' => __( 'MJJ_FAQs' ),
					'singular_name' => __( 'FAQ' ),
					'add_new' => 'Add New',
					'add_new_item' => 'Add New FAQ',
					'edit_item' => 'Edit FAQ',
					'new_item' => 'New FAQ',
				    'all_items' => 'All FAQs',
					'view_item' => 'View FAQs',
					'search_items' => 'Search FAQ',
					'not_found' =>  'No FAQs found',
					'not_found_in_trash' => 'No FAQs found in Trash',
					'parent_item_colon' => '',
					'menu_name' => 'FAQs'
				),
				'supports' => array('title', 'editor', 'thumbnail' ),
				'public' => true,
				'hierarchical' => false,
				'has_archive' => true,
				'rewrite' => array('slug' => 'frequently-asked-questions'),
				'menu_position' => 5,
				'show_in_rest'       => true,
        		'rest_base'          => 'mjj-faq-api',
        		'rest_controller_class' => 'WP_REST_Posts_Controller',
			)
		);
	}

	public static function add_div( $content ){
		
		if( is_singular( 'mjj_faq' )  ){
			$content .= '<div id="mjj-faq"></div>';
		}

		return $content;
	}
}