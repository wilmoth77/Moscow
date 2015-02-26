<?php

/**
 * {%= title %} Configuration
 *
 * @package {%= title %}
 * 
 * Enable theme features 
 * Soil items require the soil plugin https://github.com/roots/soil
 * 
 */

add_theme_support('soil-clean-up');         // Enable clean up from Soil
add_theme_support('soil-relative-urls');    // Enable relative URLs from Soil
add_theme_support('soil-nice-search');      // Enable /?s= to /search/ redirect from Soil
add_theme_support('soil-disable-trackbacks');   // Remove trackback/pingback functionality
add_theme_support('bootstrap-gallery');     // Enable Bootstrap's thumbnails component on [gallery]
add_theme_support('jquery-cdn');            // Enable to load jQuery from the Google CDN