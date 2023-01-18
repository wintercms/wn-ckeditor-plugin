<?php namespace Winter\CKEditor\FormWidgets;

use Backend\Classes\FormWidgetBase;
use Winter\CKEditor\Models\Settings;

/**
 * CKEditor Form Widget
 *
 * @TODO:
 * - Investigate integrating with the codeeditor field to manage the source section of
 *   the CKEditor experience.
 *   @see https://www.angrysam.com/ckeditortest/test.cfm
 *   @see https://ckeditor.com/old/forums/CKEditor/ACE-Editor-Plugin-for-CKEditor-Source-View-Replacement-First-Draft
 */
class CKEditor extends FormWidgetBase
{
    /**
     * @inheritDoc
     */
    protected $defaultAlias = 'winter_ckeditor';

    /**
     * @inheritDoc
     */
    public function widgetDetails(): array
    {
        return [
            'name'        => 'winter.ckeditor::lang.formwidgets.ckeditor.name',
            'description' => 'winter.ckeditor::lang.formwidgets.ckeditor.description',
        ];
    }

    /**
     * @inheritDoc
     */
    public function render()
    {
        $this->prepareVars();
        return $this->makePartial('ckeditor');
    }

    /**
     * Prepares the form widget view data
     */
    public function prepareVars()
    {
        $this->vars['name']      = $this->formField->getName();
        $this->vars['value']     = $this->getLoadValue();
        $this->vars['model']     = $this->model;
        $this->vars['width']     = Settings::instance()->form_width;
        $this->vars['height']    = Settings::instance()->form_height;
        $this->vars['toolbar']   = Settings::instance()->toolbar;
        $this->vars['skin']      = Settings::instance()->skin;
        $this->vars['up_public'] = Settings::instance()->up_public;
        $this->vars['language']  = Settings::instance()->language;
    }

    /**
     * @inheritDoc
     */
    public function loadAssets()
    {
        $this->addJs('/plugins/winter/ckeditor/assets/src/ckeditor.js');
        $this->addJs('/plugins/winter/ckeditor/assets/src/adapters/jquery.js');
        $this->addJs('/plugins/winter/ckeditor/formwidgets/ckeditor/assets/js/ckeditor.js', 'Winter.CKEditor');
        $this->addCss('/plugins/winter/ckeditor/formwidgets/ckeditor/assets/css/backend.css', 'Winter.CKEditor');
    }
}
