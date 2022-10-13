<?php namespace Winter\CKEditor;

use Backend;
use Backend\Models\UserRole;
use System\Classes\PluginBase;
use System\Classes\SettingsManager;

/**
 * CKEditor Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * Returns information about this plugin.
     */
    public function pluginDetails(): array
    {
        return [
            'name'        => 'winter.ckeditor::lang.plugin.name',
            'description' => 'winter.ckeditor::lang.plugin.description',
            'homepage'    => 'https://github.com/wintercms/wn-ckeditor-plugin',
            'author'      => 'Winter CMS',
            'icon'        => 'icon-paperclip',
        ];
    }

    /**
     * Register method, called when the plugin is first registered.
     */
    public function register(): void
    {

    }

    /**
     * Boot method, called right before the request route.
     */
    public function boot(): void
    {

    }

    /**
     * Registers any backend FormWidgets implemented in this plugin.
     */
    public function registerFormWidgets(): array
    {
        return [
            \Winter\CKEditor\FormWidgets\CKEditor::class => 'ckeditor',
        ];
    }

    /**
     * Registers any settings provided by this plugin.
     */
    public function registerSettings(): array
    {
        return [
            'settings' => [
                'label'       => 'winter.ckeditor::lang.plugin.name',
                'description' => 'winter.ckeditor::lang.models.settings.description',
                'icon'        => 'icon-paperclip',
                'context'     => 'mysettings',
                'category'    =>  SettingsManager::CATEGORY_MYSETTINGS,
                'class'       => \Winter\CKEditor\Models\Settings::class,
            ]
        ];
    }

    /**
     * Registers any backend permissions used by this plugin.
     */
    public function registerPermissions(): array
    {
        return [
            'winter.ckeditor.manage_preferences' => [
                'tab' => 'winter.ckeditor::lang.plugin.name',
                'label' => 'winter.ckeditor::lang.permissions.manage_preferences',
                'roles' => [UserRole::CODE_DEVELOPER, UserRole::CODE_PUBLISHER],
            ],
        ];
    }
}
