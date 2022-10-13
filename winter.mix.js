/* eslint-disable */
const mix = require('laravel-mix');
/* eslint-enable */

mix.setPublicPath(__dirname)
    // Copy over the CKEditor vendor assets
    .copy('node_modules/ckeditor', 'assets/vendor/ckeditor')

    // Copy over the CKEditor plugins we provide
    .copy('assets/src/plugins', 'assets/dist/vendor/ckeditor/plugins')