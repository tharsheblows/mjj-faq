<?php
/**
 * Plugin Name: MJJ FAQ
 * Version: 0.1-alpha
 * Description: A simple plugin using the WP-API and React to make faqs
 * Author: JJ Jay
 * Text Domain: mjj-faq
 * Domain Path: /languages
 * @package mjj-faq
 */

require_once( plugin_dir_path( __FILE__ ) . 'class-mjj-faq-cpt.php' );
require_once( plugin_dir_path( __FILE__ ) . 'class-mjj-faq-metaboxes.php' );
require_once( plugin_dir_path( __FILE__ ) . 'class-mjj-faq-api.php' );

MJJ_FAQ::get_instance();
MJJ_FAQ_CPT::get_instance();
MJJ_FAQ_Metaboxes::get_instance();
MJJ_FAQ_API::get_instance();

class MJJ_FAQ{

	protected static $instance = null;

	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		} // end if

		return self::$instance;

	} // end get_instance

	private function __construct(){
		add_action( 'wp_enqueue_scripts', array( 'MJJ_FAQ', 'add_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( 'MJJ_FAQ', 'add_styles' ) );

		register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
		register_activation_hook( __FILE__, array( 'MJJ_FAQ', 'mjj_faq_flush_rewrites' ) );
	}

	public static function add_styles() {
		
		if( is_singular( 'mjj_faq' ) ){
			wp_register_style( 'mjj-faq-styles', plugins_url( 'css/mjj-faq.css', __FILE__ ) );
			wp_enqueue_style( 'mjj-faq-styles' );
		}

	}

	public static function add_scripts() {

		if( is_singular( 'mjj_faq' ) ){

			$suffix = ( defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ) ? '' : '.min'; //.min

			wp_register_script( 'mjj-faq-script', plugin_dir_url( __FILE__ ) . 'js/mjj-faq' . $suffix . '.js', array(), '20150506', true );
			wp_localize_script( 'mjj-faq-script', 'faq_object', array( 'ID' => get_the_ID() ) );
			wp_enqueue_script( 'mjj-faq-script' );


		}

	} // end add_scripts

	public static function mjj_faq_flush_rewrites(){
		MJJ_FAQ_CPT::get_instance();
		flush_rewrite_rules();
	}

}

