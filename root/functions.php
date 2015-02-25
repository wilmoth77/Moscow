<?php
/**
 * {%= title %} Includes
 *
 * @package {%= title %}
 *
 * The ${%= title %}_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 */
${%= title %}_includes = array(
  'inc/scripts.php',                // Scripts and stylesheets
  'inc/config.php',                 // Configuration
  'inc/extras.php',                 // Custom functions that act independently of the theme templates (_s)
  //'inc/custom-header.php',        // Implement Custom Header feature (_s)  
  'inc/template-tags.php',          // Custom template tags for this theme (_s) 
  'inc/customizer.php',             // Customizer additions. (_s)
  'inc/jetpack.php',                // Load Jetpack compatibility file. (_s) 
  'inc/theme.php',                  // My temp php file while dividing these up
  'inc/wp_bootstrap_navwalker.php'  // Register Custom Navigation Walker
);

foreach (${%= title %}_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', '{%= title %}'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);