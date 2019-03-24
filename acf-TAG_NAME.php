<?php
	/*
	Plugin Name: Custom Fields: TAG-NAME
	Plugin URI: https://github.com/pedropolisenso/acf-plugin-tag-name
	Description: Custom field for feature tag name
	Version: 1.0.5
	Author: Pedro Polisenso
	Author URI: https://github.com/pedropolisenso
	License: GPLv2 or later
	License URI: http://www.gnu.org/licenses/gpl-2.0.html
	*/

	if( ! defined( 'ABSPATH' ) ) exit;
	if( !class_exists('acf_plugin_TAG_NAME') ) :

	class acf_plugin_TAG_NAME {	
		/*
		*  __construct
		*
		*  This function will setup the class functionality
		*
		*  @type	function
		*  @since	1.0.5
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		function __construct() {
			
			// vars
			$this->settings = array(
				'version'	=> '1.0.5',
				'url'		=> plugin_dir_url( __FILE__ ),
				'path'		=> plugin_dir_path( __FILE__ )
			);
			
			// set text domain
			// https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
			load_plugin_textdomain( 'acf-TAG_NAME', false, plugin_basename( dirname( __FILE__ ) ) . '/lang' ); 
			
			// include field
			add_action('acf/include_field_types', 	array($this, 'include_field_types')); // v5
			add_action('acf/register_fields', 		array($this, 'include_field_types')); // v4
		}

		/*
		*  include_field_types
		*
		*  This function will include the field type class
		*
		*  @type	function
		*  @since	1.0.5
		*
		*  @param	$version (int) major ACF version. Defaults to false
		*  @return	n/a
		*/
		
		function include_field_types( $version = false ) {		
			// support empty $version
			if( !$version ) $version = 4;

			// include
			include_once('fields/acf-TAG_NAME-v' . $version . '.php');
		}
	}

	new acf_plugin_TAG_NAME();

	endif;	
?>