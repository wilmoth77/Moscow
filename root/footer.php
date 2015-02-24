<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package {%= title %}
 */
?>
      <hr>

      <footer class="text-center">
      	<a href="<?php echo esc_url( __( 'http://wordpress.org/', '{%= prefix %}' ) ); ?>"><?php printf( __( 'Proudly powered by %s', '{%= prefix %}' ), 'WordPress' ); ?></a>
      	<span class="sep"> | </span>
      	<?php printf( __( 'Theme: %1$s by %2$s.', '{%= prefix %}' ), '{%= title %}', '<a href="http://4digits.net/" rel="designer">4Digits Web Design & Development</a>' ); ?>
      	<p>&copy; <?php bloginfo('name'); ?> <?php echo date('Y'); ?></p>
      </footer>
    </div> <!-- /container -->

<?php wp_footer(); ?>

</body>
</html>

