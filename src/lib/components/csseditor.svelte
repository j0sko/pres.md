
<script lang="ts">
  import { onMount } from "svelte";
  import { EditorView, EditorState, basicSetup } from "@codemirror/basic-setup";
  import { css } from "@codemirror/lang-css";

  export let value: string;

  let editor: EditorView;

  onMount(() => {
    const parent = document.getElementById("editor");
    if (parent) {
      editor = new EditorView({
        parent,
        state: EditorState.create({
          doc: value,
          extensions: [
            basicSetup,
            EditorState.tabSize.of(2),
            css(),
          ],
        }),
      });
      editor.dom.addEventListener('keyup', () => {
        value = editor.state.doc.toString();
      })
    }
  });
</script>

<style>
#editor {
  width: 100%;
  height: 100%;
}

 .editor-container {
   height: 50%;

 } 
</style>
<div class="editor-container">
  <div id="editor"></div>
</div>
