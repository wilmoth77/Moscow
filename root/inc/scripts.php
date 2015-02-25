<?php

/**
 * {%= title %} functions and definitions
 *
 * @package {%= title %}
 * 
 * Enqueue scripts and styles.
 * 
 */

function {%= title %}_scripts() {
    $assets = array(
      'css'       => '/public/css/base.min.css',
      'bootstrap-js'      => '/public/js/script.min.js',
      'theme-js'        => '/public/js/theme.min.js',
      'modernizr' => '/public/js/modernizr.js',
      'jquery'    => '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js'
    );
    
    wp_enqueue_style('base-style', get_stylesheet_directory_uri() . $assets['css'], false, filemtime( get_stylesheet_directory() . '/public/css/base.min.css' ), 'all');
     
   /**
   * jQuery is loaded using the same method from HTML5 Boilerplate:
   * Grab Google CDN's latest jQuery with a protocol relative URL; fallback to local if offline
   * It's kept in the header instead of footer to avoid conflicts with plugins.
   */
  if (!is_admin() && current_theme_supports('jquery-cdn')) {
    wp_deregister_script('jquery');
    wp_register_script('jquery', $assets['jquery'], array(), null, false);
    add_filter('script_loader_src', '{%= title %}_jquery_local_fallback', 10, 2);
  }
  
  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
        
  wp_enqueue_script('modernizr', get_template_directory_uri() . $assets['modernizr'], array(), null, false);
  wp_enqueue_script('jquery');
  wp_enqueue_script('bootstrap-js', get_template_directory_uri() . $assets['bootstrap-js'], array(), null, true);
  wp_enqueue_script('theme-js', get_template_directory_uri() . $assets['theme-js'], array('bootstrap-js'), filemtime( get_template_directory() . $assets['theme-js'] ), true);
}
add_action( 'wp_enqueue_scripts', '{%= title %}_scripts' );

// jQuery local fallback
function {%= title %}_jquery_local_fallback($src, $handle = null) {
  static $add_jquery_fallback = false;

  if ($add_jquery_fallback) {
    echo '<script>window.jQuery || document.write(\'<script src="' . get_template_directory_uri() . '/assets/vendor/jquery/dist/jquery.min.js?1.11.1"><\/script>\')</script>' . "\n";
    $add_jquery_fallback = false;
  }

  if ($handle === 'jquery') {
    $add_jquery_fallback = true;
  }

  return $src;
}
add_action('wp_head', '{%= title %}_jquery_local_fallback');