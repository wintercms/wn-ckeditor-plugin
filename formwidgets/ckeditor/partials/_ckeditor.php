<?php if ($this->previewMode): ?>

    <div class="form-control">
        <?= $value ?>
    </div>

<?php else: ?>

    <div data-control="wysiwyg"
        data-width="<?= $width; ?>"
        data-height="<?= $height; ?>"
        data-toolbar="<?= (trim($toolbar) == ''? 'Basic' : ucfirst($toolbar)); ?>"
        data-theme="<?= (trim($skin) == '' ? 'winter' : $skin); ?>"
        data-lang="<?= (trim($language) == '' ? 'en' : $language); ?>"
    >
        <textarea name="<?= $name ?>" id="<?= $this->getId('textarea') ?>"><?= e($value) ?></textarea>
    </div>

<?php endif ?>
