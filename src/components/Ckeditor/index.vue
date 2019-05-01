<template>
    <div id="ckeditor">
        <div id="toolbar-container"></div>
        <div id="editor">
            <p>This is the initial editor content.</p>
        </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { error } from 'util';
export default {
    name: 'ckeditor',
    data() {
        return {
            editor: null,
        };
    },
    mounted() {
        this.initCKEditor()
    },
    methods: {
        initCKEditor() {
            ClassicEditor.create(document.querySelector('#editor'), {
                ckfinder: {
                    uploadUrl: '/admin/Upload/uploadUrl'
                }
            }).then(editor => {
                const toolbarContainer = document.querySelector('#toolbar-container');
                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                this.editor = editor
            }).catch(error => {
                console.error(error);
            })
        }
    }
}
</script>

