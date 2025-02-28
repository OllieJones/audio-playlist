<?php
/**
 * Plugin Name:     Audio Playlist Enhancements
 * Plugin URI:      https://github.com/OllieJones/audio-playlist
 * Description:     Add download links to [playlist] shortcodes
 * Author:          Ollie Jones
 * Author URI:      https://github.com/OllieJones/
 * Text Domain:     audio-playlist
 * Domain Path:     /languages
 * Version:         0.9.1
 *
 * @package         Audio_Playlist
 */

namespace Audio_Playlist;

add_action('wp_playlist_scripts', '\Audio_Playlist\scripts', 10,2);

function scripts ( $type, $style ) {
	wp_enqueue_style('audio_playlist',   plugin_dir_url( __FILE__ ) . 'assets/css/audio_playlist.css');
	wp_enqueue_script('audio_playlist',   plugin_dir_url( __FILE__ ) . 'assets/js/audio_playlist.js');

}
